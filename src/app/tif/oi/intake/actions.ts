"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { inferInitiatives } from "@/lib/opportunity-intelligence/intelligence/initiative-inference";
import { ingestPastedOpportunity } from "@/lib/opportunity-intelligence/intake/ingest";
import { tifDb } from "@/lib/tif/db";

const INTAKE_PATH = "/tif/oi/intake";

const intakeSchema = z.object({
  rawContent: z.string().trim().min(200, "Too short to extract from"),
  canonicalUrl: z
    .string()
    .trim()
    .optional()
    .transform((value) => (value ? value : undefined))
    .pipe(z.string().url("Enter a valid source URL.").optional()),
  organizationName: z.string().trim().min(1, "Organization is required."),
  title: z.string().trim().min(1, "Role / context is required."),
});

const sourceReviewSchema = z.object({
  sourceId: z.string().trim().min(1),
  opportunityId: z.string().trim().min(1),
});

function redirectWithError(message: string): never {
  redirect(`${INTAKE_PATH}?error=${encodeURIComponent(message)}`);
}

export async function captureManualIntake(formData: FormData) {
  if (formData.get("intent") === "reviewDuplicate") {
    const sourceId = z.string().trim().min(1).parse(formData.get("sourceId"));
    const opportunityId = z.string().trim().min(1).parse(formData.get("opportunityId"));
    redirect(
      `${INTAKE_PATH}?capture=reviewed&sourceId=${encodeURIComponent(
        sourceId,
      )}&opportunityId=${encodeURIComponent(opportunityId)}`,
    );
  }

  const parsed = intakeSchema.safeParse({
    rawContent: formData.get("rawContent"),
    canonicalUrl: formData.get("canonicalUrl") || undefined,
    organizationName: formData.get("organizationName"),
    title: formData.get("title"),
  });

  if (!parsed.success) {
    redirectWithError(parsed.error.issues[0]?.message ?? "Invalid intake input.");
  }

  let result;
  try {
    result = await ingestPastedOpportunity(
      {
        organization: { name: parsed.data.organizationName },
        title: parsed.data.title,
        rawContent: parsed.data.rawContent,
        canonicalUrl: parsed.data.canonicalUrl,
      },
      tifDb,
    );
  } catch (error) {
    redirectWithError(error instanceof Error ? error.message : "Intake failed.");
  }

  revalidatePath(INTAKE_PATH);
  const capture = result.duplicate ? "duplicate" : "created";
  redirect(
    `${INTAKE_PATH}?capture=${capture}&sourceId=${encodeURIComponent(
      result.sourceId,
    )}&opportunityId=${encodeURIComponent(result.opportunityId)}`,
  );
}

export async function promoteProposedInitiative(formData: FormData) {
  const parsed = sourceReviewSchema.parse({
    sourceId: formData.get("sourceId"),
    opportunityId: formData.get("opportunityId"),
  });

  await tifDb.$transaction(async (tx) => {
    const source = await tx.oiSource.findUniqueOrThrow({
      where: { id: parsed.sourceId },
      include: {
        organization: {
          include: {
            signals: {
              include: { source: true },
              orderBy: [{ occurredAt: "desc" }, { createdAt: "desc" }],
            },
            initiatives: true,
          },
        },
      },
    });

    const proposals = inferInitiatives({
      accountName: source.organization.name,
      signals: source.organization.signals,
      existingInitiatives: source.organization.initiatives,
    });
    const proposal = proposals[0];
    if (!proposal) {
      throw new Error("No proposed initiative is available to promote.");
    }

    const initiative = proposal.attachToInitiativeId
      ? await tx.oiInitiative.update({
          where: { id: proposal.attachToInitiativeId },
          data: {
            status: "evidenced",
            confidence: Math.round(proposal.confidence * 100),
            lastEvidenceAt: latestSignalDate(proposal.supportingSignals),
          },
        })
      : await tx.oiInitiative.create({
          data: {
            name: proposal.name,
            status: "evidenced",
            category: proposal.category,
            hypothesis: proposal.hypothesis,
            hypothesisBasis: "inferred",
            confidence: Math.round(proposal.confidence * 100),
            domainTags: proposal.domainTags,
            likelyOwnerRoles: proposal.likelyOwnerRoles,
            organizationId: source.organizationId,
            lastEvidenceAt: latestSignalDate(proposal.supportingSignals),
            approvedAt: new Date(),
            approvedBy: "operator",
          },
        });

    for (const signal of proposal.supportingSignals) {
      await tx.oiInitiativeSignal.upsert({
        where: {
          initiativeId_signalId: {
            initiativeId: initiative.id,
            signalId: signal.id,
          },
        },
        update: {},
        create: {
          initiativeId: initiative.id,
          signalId: signal.id,
          contribution: signal.summary,
          addedBy: "operator",
        },
      });
    }
  });

  revalidatePath(INTAKE_PATH);
  redirectToReview(parsed);
}

export async function promoteSignal(formData: FormData) {
  const parsed = sourceReviewSchema.parse({
    sourceId: formData.get("sourceId"),
    opportunityId: formData.get("opportunityId"),
  });
  const selectedTypes = z
    .array(z.enum(["fte", "consulting", "fractional", "assessment", "partnership", "rfp"]))
    .parse(formData.getAll("opportunityType"));

  if (selectedTypes.length === 0) {
    redirectWithError("Select at least one opportunity type to promote.");
  }

  await tifDb.$transaction(async (tx) => {
    const source = await tx.oiSource.findUniqueOrThrow({
      where: { id: parsed.sourceId },
      include: {
        organization: true,
        signals: true,
        opportunity: true,
      },
    });
    const signal = source.signals[0];
    if (!signal) {
      throw new Error("Source is missing its classified signal.");
    }

    let initiativeId: string | undefined;
    if (formData.get("approveInitiative") === "on") {
      const orgSignals = await tx.oiSignal.findMany({
        where: { organizationId: source.organizationId },
        include: { source: true },
        orderBy: [{ occurredAt: "desc" }, { createdAt: "desc" }],
      });
      const existingInitiatives = await tx.oiInitiative.findMany({
        where: { organizationId: source.organizationId },
      });
      const proposal = inferInitiatives({
        accountName: source.organization.name,
        signals: orgSignals,
        existingInitiatives,
      })[0];
      if (proposal) {
        const initiative = proposal.attachToInitiativeId
          ? await tx.oiInitiative.findUniqueOrThrow({ where: { id: proposal.attachToInitiativeId } })
          : await tx.oiInitiative.create({
              data: {
                name: proposal.name,
                status: "evidenced",
                category: proposal.category,
                hypothesis: proposal.hypothesis,
                hypothesisBasis: "inferred",
                confidence: Math.round(proposal.confidence * 100),
                domainTags: proposal.domainTags,
                likelyOwnerRoles: proposal.likelyOwnerRoles,
                organizationId: source.organizationId,
                lastEvidenceAt: latestSignalDate(proposal.supportingSignals),
                approvedAt: new Date(),
                approvedBy: "operator",
              },
            });
        initiativeId = initiative.id;
        for (const supportingSignal of proposal.supportingSignals) {
          await tx.oiInitiativeSignal.upsert({
            where: {
              initiativeId_signalId: {
                initiativeId: initiative.id,
                signalId: supportingSignal.id,
              },
            },
            update: {},
            create: {
              initiativeId: initiative.id,
              signalId: supportingSignal.id,
              contribution: supportingSignal.summary,
              addedBy: "operator",
            },
          });
        }
      }
    }

    for (const type of selectedTypes) {
      const opportunity = await tx.oiOpportunity.create({
        data: {
          organizationId: source.organizationId,
          initiativeId,
          title: `${source.organization.name} ${type} opportunity`,
          type,
          status: "identified",
          firstSignalAt: signal.occurredAt ?? signal.createdAt,
        },
      });
      await tx.oiOpportunitySource.create({
        data: {
          opportunityId: opportunity.id,
          sourceId: source.id,
          isPrimary: true,
        },
      });
    }

    await tx.oiSignal.update({
      where: { id: signal.id },
      data: { status: "promoted" },
    });
  });

  revalidatePath(INTAKE_PATH);
  redirectToReview(parsed);
}

export async function dismissSignal(formData: FormData) {
  const parsed = sourceReviewSchema.parse({
    sourceId: formData.get("sourceId"),
    opportunityId: formData.get("opportunityId"),
  });
  const reason = z.string().trim().min(1, "Dismiss reason is required.").safeParse(formData.get("reason"));
  if (!reason.success) {
    redirectWithError(reason.error.issues[0]?.message ?? "Dismiss reason is required.");
  }

  await tifDb.oiSignal.updateMany({
    where: { sourceId: parsed.sourceId },
    data: {
      status: "dismissed",
      dismissedReason: reason.data,
      dismissedAt: new Date(),
    },
  });

  revalidatePath(INTAKE_PATH);
  redirectToReview(parsed);
}

export async function watchAccount(formData: FormData) {
  const parsed = sourceReviewSchema.parse({
    sourceId: formData.get("sourceId"),
    opportunityId: formData.get("opportunityId"),
  });

  await tifDb.$transaction(async (tx) => {
    const source = await tx.oiSource.findUniqueOrThrow({
      where: { id: parsed.sourceId },
      select: { organizationId: true },
    });
    await tx.oiOrganization.update({
      where: { id: source.organizationId },
      data: { isWatched: true },
    });
    await tx.oiSignal.updateMany({
      where: { sourceId: parsed.sourceId },
      data: { status: "watched" },
    });
  });

  revalidatePath(INTAKE_PATH);
  redirectToReview(parsed);
}

function redirectToReview(params: z.infer<typeof sourceReviewSchema>): never {
  redirect(
    `${INTAKE_PATH}?capture=reviewed&sourceId=${encodeURIComponent(
      params.sourceId,
    )}&opportunityId=${encodeURIComponent(params.opportunityId)}`,
  );
}

function latestSignalDate(signals: Array<{ occurredAt: Date | null; createdAt?: Date | null }>) {
  const dates = signals.map((signal) => signal.occurredAt ?? signal.createdAt ?? new Date(0));
  return new Date(Math.max(...dates.map((date) => date.getTime())));
}
