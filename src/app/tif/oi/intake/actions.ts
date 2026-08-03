"use server";

import type { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { captureDecision } from "@/lib/opportunity-intelligence/action/decision";
import { TODD_CAPABILITY_PROFILE_V2 } from "@/lib/opportunity-intelligence/capability-profile";
import { deriveNextAction } from "@/lib/opportunity-intelligence/commercial/next-action";
import { persistOpportunityScore, scoreOpportunity } from "@/lib/opportunity-intelligence/commercial/score";
import { inferInitiatives } from "@/lib/opportunity-intelligence/intelligence/initiative-inference";
import { ingestPastedOpportunity } from "@/lib/opportunity-intelligence/intake/ingest";
import { tifDb } from "@/lib/tif/db";

const INTAKE_PATH = "/tif/oi/intake";
type TransactionClient = Prisma.TransactionClient;

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

const decisionCaptureSchema = z.object({
  decisionReason: z.string().trim().min(1, "Decision reason is required."),
  decisionConfidence: z.enum(["low", "medium", "high"]).default("medium"),
  expectedOutcome: z.string().trim().optional(),
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
  const decision = decisionCaptureSchema.parse({
    decisionReason: formData.get("decisionReason"),
    decisionConfidence: formData.get("decisionConfidence") || "medium",
    expectedOutcome: formData.get("expectedOutcome") || undefined,
  });

  let reviewOpportunityId = parsed.opportunityId;
  await tifDb.$transaction(async (tx) => {
    await captureDecision(tx, {
      opportunityId: parsed.opportunityId,
      type: "promote_signal",
      decision: selectedTypes.join(","),
      reason: decision.decisionReason,
      confidence: decision.decisionConfidence,
      expectedOutcome: decision.expectedOutcome,
    });

    const source = await tx.oiSource.findUniqueOrThrow({
      where: { id: parsed.sourceId },
      include: {
        organization: true,
        signals: true,
        opportunity: {
          include: {
            facts: true,
            evidence: true,
            researchGaps: true,
          },
        },
      },
    });
    const signal = source.signals[0];
    if (!signal) {
      throw new Error("Source is missing its classified signal.");
    }
    if (!source.opportunity || source.opportunity.id !== parsed.opportunityId) {
      throw new Error("Source is missing its staging opportunity.");
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

    const stagingFacts = source.opportunity.facts;
    const stagingResearchGaps = source.opportunity.researchGaps;
    const primaryType = selectedTypes[0];
    const primaryOpportunity = await tx.oiOpportunity.update({
      where: { id: parsed.opportunityId },
      data: {
        initiativeId,
        title: `${source.organization.name} ${primaryType} opportunity`,
        type: primaryType,
        status: "identified",
        firstSignalAt: signal.occurredAt ?? signal.createdAt,
      },
    });
    reviewOpportunityId = primaryOpportunity.id;
    await upsertOpportunitySource(tx, primaryOpportunity.id, source.id);
    await scoreAndCreateNextAction(tx, {
      opportunity: primaryOpportunity,
      initiativeId,
      sourceId: source.id,
      promotedFromOpportunityId: parsed.opportunityId,
      organizationTier: source.organization.tier,
    });

    for (const type of selectedTypes.slice(1)) {
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
      await upsertOpportunitySource(tx, opportunity.id, source.id);
      await copyOpportunityEvidenceSet(tx, {
        toOpportunityId: opportunity.id,
        facts: stagingFacts,
        researchGaps: stagingResearchGaps,
      });
      await scoreAndCreateNextAction(tx, {
        opportunity,
        initiativeId,
        sourceId: source.id,
        promotedFromOpportunityId: parsed.opportunityId,
        organizationTier: source.organization.tier,
      });
    }

    await tx.oiSignal.update({
      where: { id: signal.id },
      data: { status: "promoted" },
    });
  });

  revalidatePath(INTAKE_PATH);
  redirectToReview({ ...parsed, opportunityId: reviewOpportunityId });
}

export async function dismissSignal(formData: FormData) {
  const parsed = sourceReviewSchema.parse({
    sourceId: formData.get("sourceId"),
    opportunityId: formData.get("opportunityId"),
  });
  const reason = z.string().trim().min(1, "Dismiss reason is required.").safeParse(formData.get("decisionReason") || formData.get("reason"));
  if (!reason.success) {
    redirectWithError(reason.error.issues[0]?.message ?? "Dismiss reason is required.");
  }
  const decision = decisionCaptureSchema.parse({
    decisionReason: reason.data,
    decisionConfidence: formData.get("decisionConfidence") || "medium",
    expectedOutcome: formData.get("expectedOutcome") || undefined,
  });

  await tifDb.$transaction(async (tx) => {
    await captureDecision(tx, {
      opportunityId: parsed.opportunityId,
      type: "dismiss_signal",
      decision: "dismiss",
      reason: decision.decisionReason,
      confidence: decision.decisionConfidence,
      expectedOutcome: decision.expectedOutcome,
    });
    await tx.oiSignal.updateMany({
      where: { sourceId: parsed.sourceId },
      data: {
        status: "dismissed",
        dismissedReason: decision.decisionReason,
        dismissedAt: new Date(),
      },
    });
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

async function upsertOpportunitySource(tx: TransactionClient, opportunityId: string, sourceId: string) {
  await tx.oiOpportunitySource.upsert({
    where: {
      opportunityId_sourceId: {
        opportunityId,
        sourceId,
      },
    },
    update: { isPrimary: true },
    create: {
      opportunityId,
      sourceId,
      isPrimary: true,
    },
  });
}

async function copyOpportunityEvidenceSet(
  tx: TransactionClient,
  input: {
    toOpportunityId: string;
    facts: Array<{
      field: string;
      value: string;
      normalizedValue: string;
      ordinal: number;
      basis: "stated" | "inferred" | "operator";
      confidence: number;
      isOperatorOverride: boolean;
      aiGenerated: boolean;
      aiModel: string | null;
      promptVersion: string | null;
      evidenceId: string | null;
    }>;
    researchGaps: Array<{
      gapKey: string;
      question: string;
      reason: string;
      status: "open" | "resolved" | "dismissed";
      resolution: string | null;
      operatorNotes: string | null;
      resolvedAt: Date | null;
      priority: number;
      blocksOutreach: boolean;
      suggestedSources: string[];
    }>;
  },
) {
  if (input.facts.length > 0) {
    await tx.oiOpportunityFact.createMany({
      data: input.facts.map((fact) => ({
        opportunityId: input.toOpportunityId,
        field: fact.field,
        value: fact.value,
        normalizedValue: fact.normalizedValue,
        ordinal: fact.ordinal,
        basis: fact.basis,
        confidence: fact.confidence,
        isOperatorOverride: fact.isOperatorOverride,
        aiGenerated: fact.aiGenerated,
        aiModel: fact.aiModel,
        promptVersion: fact.promptVersion,
        evidenceId: fact.evidenceId,
      })),
    });
  }
  if (input.researchGaps.length > 0) {
    await tx.oiResearchGap.createMany({
      data: input.researchGaps.map((gap) => ({
        opportunityId: input.toOpportunityId,
        gapKey: gap.gapKey,
        question: gap.question,
        reason: gap.reason,
        status: gap.status,
        resolution: gap.resolution,
        operatorNotes: gap.operatorNotes,
        resolvedAt: gap.resolvedAt,
        priority: gap.priority,
        blocksOutreach: gap.blocksOutreach,
        suggestedSources: gap.suggestedSources,
      })),
    });
  }
}

async function scoreAndCreateNextAction(
  tx: TransactionClient,
  input: {
    opportunity: {
      id: string;
      type: string;
      status: string;
      estimatedValueLow?: number | null;
      estimatedValueHigh?: number | null;
      conversionProbability?: number | null;
      estimatedHours?: { toNumber(): number } | number | null;
      disqualifiedReason?: string | null;
      offerId?: string | null;
      lastActivityAt?: Date | null;
      createdAt?: Date;
    };
    initiativeId?: string;
    sourceId: string;
    promotedFromOpportunityId: string;
    organizationTier?: number | null;
  },
) {
  const [facts, researchGaps, sourceLinks] = await Promise.all([
    tx.oiOpportunityFact.findMany({
      where: { opportunityId: input.opportunity.id },
      select: {
        field: true,
        value: true,
        normalizedValue: true,
        basis: true,
        confidence: true,
        isOperatorOverride: true,
      },
    }),
    tx.oiResearchGap.findMany({
      where: { opportunityId: input.opportunity.id },
      select: { status: true, blocksOutreach: true },
    }),
    tx.oiOpportunitySource.findMany({
      where: { opportunityId: input.opportunity.id },
      include: { source: { select: { publishedAt: true, retrievedAt: true } } },
    }),
  ]);
  const asOf = new Date();
  const score = scoreOpportunity({
    opportunity: {
      id: input.opportunity.id,
      type: input.opportunity.type,
      status: input.opportunity.status,
      estimatedValueLow: input.opportunity.estimatedValueLow,
      estimatedValueHigh: input.opportunity.estimatedValueHigh,
      conversionProbabilityOverride: input.opportunity.conversionProbability,
      estimatedHoursOverride: input.opportunity.estimatedHours ? Number(input.opportunity.estimatedHours) : null,
      disqualifiedReason: input.opportunity.disqualifiedReason,
    },
    facts,
    initiative: input.initiativeId
      ? {
          status: "evidenced",
          approvedAt: asOf,
        }
      : null,
    stakeholders: [],
    sources: sourceLinks.map((link) => ({
      publishedAt: link.source.publishedAt,
      retrievedAt: link.source.retrievedAt,
      isPrimary: link.isPrimary,
    })),
    researchGaps,
    offer: null,
    roleProfile: null,
    rfpProfile: null,
    profile: TODD_CAPABILITY_PROFILE_V2,
    organization: { tier: input.organizationTier },
    asOf,
  });
  await persistOpportunityScore(tx, input.opportunity.id, score, {
    sourceId: input.sourceId,
    promotedFromOpportunityId: input.promotedFromOpportunityId,
    factCount: facts.length,
  });
  const nextAction = deriveNextAction({
    opportunity: {
      type: input.opportunity.type,
      status: input.opportunity.status,
      offerId: input.opportunity.offerId,
      lastActivityAt: input.opportunity.lastActivityAt ?? input.opportunity.createdAt,
    },
    initiative: input.initiativeId ? { status: "evidenced", approvedAt: asOf } : null,
    researchGaps,
    stakeholders: [],
    roleProfile: null,
    draft: { exists: false },
    asOf,
  });
  const existingOpenAction = await tx.oiNextAction.findFirst({
    where: { opportunityId: input.opportunity.id, status: "open" },
    select: { id: true },
  });
  if (!existingOpenAction) {
    await tx.oiNextAction.create({
      data: {
        opportunityId: input.opportunity.id,
        type: nextAction.type,
        description: nextAction.description,
        rationale: nextAction.rationale,
        estimatedMinutes: nextAction.estimatedMinutes,
        dueAt: nextAction.dueAt,
      },
    });
  }
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
