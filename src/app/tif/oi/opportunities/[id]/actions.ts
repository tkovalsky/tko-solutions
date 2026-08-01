"use server";

import type { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { TODD_CAPABILITY_PROFILE_V2 } from "@/lib/opportunity-intelligence/capability-profile";
import { canTransition } from "@/lib/opportunity-intelligence/commercial/lifecycle";
import { persistOpportunityScore, scoreOpportunity } from "@/lib/opportunity-intelligence/commercial/score";
import { captureDecision } from "@/lib/opportunity-intelligence/action/decision";
import { tifDb } from "@/lib/tif/db";

const statusSchema = z.object({
  opportunityId: z.string().trim().min(1),
  toStatus: z.enum([
    "identified",
    "qualifying",
    "reviewing",
    "qualified",
    "researching",
    "dismissed",
    "paused",
    "outreach_ready",
    "contacted",
    "conversation",
    "nurturing",
    "diagnostic_scoped",
    "proposal_sent",
    "capability_shared",
    "agreement_discussion",
    "application_ready",
    "applied",
    "recruiter_screen",
    "hiring_manager",
    "interview_loop",
    "offer",
    "no_response",
    "rfp_intake",
    "seeking_partner",
    "bid_as_prime",
    "bid_as_sub",
    "no_bid",
    "submitted",
    "shortlisted",
    "won",
    "accepted",
    "lost",
    "declined",
    "rejected",
    "closed",
  ]),
  reason: z.string().trim().optional(),
  decisionType: z.enum([
    "promote_signal",
    "dismiss_signal",
    "qualify_opportunity",
    "disqualify_opportunity",
    "pause_opportunity",
    "close_opportunity",
  ]).optional(),
  decision: z.string().trim().optional(),
  decisionReason: z.string().trim().optional(),
  decisionConfidence: z.enum(["low", "medium", "high"]).optional(),
  expectedOutcome: z.string().trim().optional(),
});

const opportunityIdSchema = z.object({
  opportunityId: z.string().trim().min(1),
});

const hypothesisSchema = opportunityIdSchema.extend({
  hypothesis: z.string().trim().min(1, "Hypothesis is required."),
});

const gapResolutionSchema = opportunityIdSchema.extend({
  gapId: z.string().trim().min(1),
  field: z.string().trim().min(1, "Fact field is required."),
  finding: z.string().trim().min(1, "Finding is required."),
});

const factSchema = opportunityIdSchema.extend({
  field: z.string().trim().min(1, "Fact field is required."),
  value: z.string().trim().min(1, "Fact value is required."),
  confidence: z.coerce.number().int().min(1).max(100).default(85),
});

export async function updateOpportunityStatus(formData: FormData) {
  const parsed = statusSchema.parse({
    opportunityId: formData.get("opportunityId"),
    toStatus: formData.get("toStatus"),
    reason: formData.get("reason") || undefined,
    decisionType: formData.get("decisionType") || undefined,
    decision: formData.get("decision") || undefined,
    decisionReason: formData.get("decisionReason") || undefined,
    decisionConfidence: formData.get("decisionConfidence") || undefined,
    expectedOutcome: formData.get("expectedOutcome") || undefined,
  });
  const path = workbenchPath(parsed.opportunityId);
  const opportunity = await tifDb.oiOpportunity.findUniqueOrThrow({
    where: { id: parsed.opportunityId },
    select: { id: true, type: true, status: true },
  });
  const transition = canTransition({
    type: opportunity.type,
    from: opportunity.status,
    to: parsed.toStatus,
    reason: parsed.reason,
  });
  if (!transition.ok) {
    redirect(`${path}?statusError=${encodeURIComponent(transition.blockingReason)}`);
  }

  await tifDb.$transaction(async (tx) => {
    if (parsed.decisionType) {
      await captureDecision(tx, {
        opportunityId: parsed.opportunityId,
        type: parsed.decisionType,
        decision: parsed.decision ?? parsed.toStatus,
        reason: parsed.decisionReason ?? "",
        confidence: parsed.decisionConfidence ?? "medium",
        expectedOutcome: parsed.expectedOutcome,
      });
    }
    await tx.oiOpportunity.update({
      where: { id: parsed.opportunityId },
      data: { status: parsed.toStatus, lastActivityAt: new Date() },
    });
    await tx.oiActivity.create({
      data: {
        opportunityId: parsed.opportunityId,
        type: "status_change",
        occurredAt: new Date(),
        summary: `Status changed from ${opportunity.status} to ${parsed.toStatus}.`,
        fromStatus: opportunity.status,
        toStatus: parsed.toStatus,
        reason: parsed.reason,
      },
    });
  });

  revalidatePath(path);
}

export async function approveInitiative(formData: FormData) {
  const parsed = opportunityIdSchema.parse({ opportunityId: formData.get("opportunityId") });
  const opportunity = await tifDb.oiOpportunity.findUniqueOrThrow({
    where: { id: parsed.opportunityId },
    select: { initiativeId: true },
  });
  if (!opportunity.initiativeId) return;
  const initiativeId = opportunity.initiativeId;
  const decision = z
    .object({
      decisionReason: z.string().trim().min(1, "Decision reason is required."),
      decisionConfidence: z.enum(["low", "medium", "high"]).default("medium"),
      expectedOutcome: z.string().trim().optional(),
    })
    .parse({
      decisionReason: formData.get("decisionReason"),
      decisionConfidence: formData.get("decisionConfidence") || "medium",
      expectedOutcome: formData.get("expectedOutcome") || undefined,
    });
  await tifDb.$transaction(async (tx) => {
    await captureDecision(tx, {
      opportunityId: parsed.opportunityId,
      type: "promote_signal",
      decision: "promote",
      reason: decision.decisionReason,
      confidence: decision.decisionConfidence,
      expectedOutcome: decision.expectedOutcome,
    });
    await tx.oiInitiative.update({
      where: { id: initiativeId },
      data: { status: "evidenced", approvedAt: new Date(), approvedBy: "operator" },
    });
  });
  revalidatePath(workbenchPath(parsed.opportunityId));
}

export async function editInitiativeHypothesis(formData: FormData) {
  const parsed = hypothesisSchema.parse({
    opportunityId: formData.get("opportunityId"),
    hypothesis: formData.get("hypothesis"),
  });
  const opportunity = await tifDb.oiOpportunity.findUniqueOrThrow({
    where: { id: parsed.opportunityId },
    select: { initiativeId: true },
  });
  if (!opportunity.initiativeId) return;
  await tifDb.oiInitiative.update({
    where: { id: opportunity.initiativeId },
    data: {
      hypothesis: parsed.hypothesis,
      hypothesisBasis: "operator",
      approvedAt: new Date(),
      approvedBy: "operator",
    },
  });
  revalidatePath(workbenchPath(parsed.opportunityId));
}

export async function resolveResearchGap(formData: FormData) {
  const parsed = gapResolutionSchema.parse({
    opportunityId: formData.get("opportunityId"),
    gapId: formData.get("gapId"),
    field: formData.get("field"),
    finding: formData.get("finding"),
  });

  await tifDb.$transaction(async (tx) => {
    await tx.oiOpportunityFact.create({
      data: {
        opportunityId: parsed.opportunityId,
        field: parsed.field,
        value: parsed.finding,
        normalizedValue: parsed.finding.toLowerCase(),
        basis: "operator",
        confidence: 100,
        isOperatorOverride: true,
      },
    });
    await tx.oiResearchGap.update({
      where: { id: parsed.gapId },
      data: {
        status: "resolved",
        resolution: parsed.finding,
        resolvedAt: new Date(),
      },
    });
    await recomputeScoreInTransaction(tx, parsed.opportunityId);
  });

  revalidatePath(workbenchPath(parsed.opportunityId));
}

export async function dismissResearchGap(formData: FormData) {
  const parsed = z
    .object({
      opportunityId: z.string().trim().min(1),
      gapId: z.string().trim().min(1),
      operatorNotes: z.string().trim().optional(),
    })
    .parse({
      opportunityId: formData.get("opportunityId"),
      gapId: formData.get("gapId"),
      operatorNotes: formData.get("operatorNotes") || undefined,
    });
  await tifDb.oiResearchGap.update({
    where: { id: parsed.gapId },
    data: { status: "dismissed", operatorNotes: parsed.operatorNotes, resolvedAt: new Date() },
  });
  revalidatePath(workbenchPath(parsed.opportunityId));
}

export async function addOperatorFact(formData: FormData) {
  const parsed = factSchema.parse({
    opportunityId: formData.get("opportunityId"),
    field: formData.get("field"),
    value: formData.get("value"),
    confidence: formData.get("confidence") || 85,
  });
  await tifDb.oiOpportunityFact.create({
    data: {
      opportunityId: parsed.opportunityId,
      field: parsed.field,
      value: parsed.value,
      normalizedValue: parsed.value.toLowerCase(),
      basis: "operator",
      confidence: parsed.confidence,
      isOperatorOverride: true,
    },
  });
  await recomputeScoreAction(parsed.opportunityId);
}

export async function recomputeScore(formData: FormData) {
  const parsed = opportunityIdSchema.parse({ opportunityId: formData.get("opportunityId") });
  await recomputeScoreAction(parsed.opportunityId);
}

async function recomputeScoreAction(opportunityId: string) {
  await tifDb.$transaction(async (tx) => {
    await recomputeScoreInTransaction(tx, opportunityId);
  });
  revalidatePath(workbenchPath(opportunityId));
}

async function recomputeScoreInTransaction(tx: Prisma.TransactionClient, opportunityId: string) {
  const input = await loadScoreInput(tx, opportunityId);
  const score = scoreOpportunity(input);
  return persistOpportunityScore(tx, opportunityId, score, {
    opportunityId,
    recomputedAt: new Date().toISOString(),
    factCount: input.facts.length,
    researchGapCount: input.researchGaps.length,
  });
}

async function loadScoreInput(tx: Prisma.TransactionClient, opportunityId: string) {
  const opportunity = await tx.oiOpportunity.findUniqueOrThrow({
    where: { id: opportunityId },
    include: {
      organization: { select: { tier: true } },
      initiative: true,
      facts: true,
      sourceLinks: { include: { source: true } },
      researchGaps: true,
      offer: true,
      roleProfile: true,
      stakeholders: {
        include: {
          person: {
            include: {
              contactPoints: true,
            },
          },
        },
      },
    },
  });

  return {
    opportunity: {
      id: opportunity.id,
      type: opportunity.type,
      status: opportunity.status,
      estimatedValueLow: opportunity.estimatedValueLow,
      estimatedValueHigh: opportunity.estimatedValueHigh,
      conversionProbabilityOverride: opportunity.conversionProbability,
      estimatedHoursOverride: opportunity.estimatedHours ? Number(opportunity.estimatedHours) : null,
      disqualifiedReason: opportunity.disqualifiedReason,
      lastActivityAt: opportunity.lastActivityAt,
    },
    facts: opportunity.facts,
    initiative: opportunity.initiative
      ? {
          status: opportunity.initiative.status,
          confidence: opportunity.initiative.confidence,
          category: opportunity.initiative.category,
          domainTags: opportunity.initiative.domainTags,
          approvedAt: opportunity.initiative.approvedAt,
          lastEvidenceAt: opportunity.initiative.lastEvidenceAt,
        }
      : null,
    stakeholders: opportunity.stakeholders,
    sources: opportunity.sourceLinks.map((link) => ({
      publishedAt: link.source.publishedAt,
      retrievedAt: link.source.retrievedAt,
      isPrimary: link.isPrimary,
    })),
    researchGaps: opportunity.researchGaps,
    offer: opportunity.offer,
    roleProfile: opportunity.roleProfile,
    rfpProfile: null,
    profile: TODD_CAPABILITY_PROFILE_V2,
    organization: opportunity.organization,
    asOf: new Date(),
  };
}

function workbenchPath(opportunityId: string) {
  return `/tif/oi/opportunities/${opportunityId}`;
}
