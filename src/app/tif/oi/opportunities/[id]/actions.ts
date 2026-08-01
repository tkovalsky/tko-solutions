"use server";

import type { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { TODD_CAPABILITY_PROFILE_V2 } from "@/lib/opportunity-intelligence/capability-profile";
import { canTransition } from "@/lib/opportunity-intelligence/commercial/lifecycle";
import { deriveNextAction } from "@/lib/opportunity-intelligence/commercial/next-action";
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

const roleSchema = z.enum([
  "economic_buyer",
  "executive_sponsor",
  "operational_owner",
  "technical_owner",
  "hiring_manager",
  "recruiter",
  "champion",
  "influencer",
  "procurement",
  "partner",
  "blocker",
  "unknown",
]);

const authoritySchema = z.enum(["none", "low", "medium", "high", "unknown"]);
const relationshipSchema = z.enum(["cold", "warm_referral", "warm_history", "existing_client"]);

const stakeholderSchema = opportunityIdSchema.extend({
  stakeholderId: z.string().trim().optional(),
  personName: z.string().trim().min(1, "Person name is required."),
  title: z.string().trim().min(1, "Title is required."),
  role: roleSchema.default("unknown"),
  authority: authoritySchema.default("unknown"),
  relationshipType: relationshipSchema.default("cold"),
  roleEvidenceUrl: z.string().trim().optional(),
  roleEvidenceLabel: z.string().trim().optional(),
  roleConfidence: z.coerce.number().int().min(1).max(100).default(50),
  operatorConfirmed: z.coerce.boolean().default(false),
  warmPathNotes: z.string().trim().optional(),
  relevanceToTodd: z.string().trim().optional(),
});

const stakeholderIdSchema = opportunityIdSchema.extend({
  stakeholderId: z.string().trim().min(1),
});

const contactPointSchema = opportunityIdSchema.extend({
  personId: z.string().trim().min(1),
  type: z.enum(["email", "phone", "linkedin", "other"]),
  value: z.string().trim().min(1, "Contact value is required."),
  provenance: z.enum(["pattern_inferred", "provider_discovered", "publicly_listed", "directly_provided", "verified_deliverable"]),
  sourceLabel: z.string().trim().optional(),
});

const personFactSchema = z.object({
  personId: z.string().trim().min(1),
  field: z.enum(["career", "responsibilities", "public_interviews", "conference_talks"]),
  value: z.string().trim().min(1, "Fact value is required."),
  basis: z.enum(["stated", "inferred", "operator"]).default("operator"),
  confidence: z.coerce.number().int().min(1).max(100).default(85),
  sourceLabel: z.string().trim().optional(),
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
    await recomputeScoreInTransaction(tx, parsed.opportunityId);
    await refreshNextAction(tx, parsed.opportunityId);
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
    await refreshNextAction(tx, parsed.opportunityId);
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
  await tifDb.$transaction(async (tx) => {
    await tx.oiResearchGap.update({
      where: { id: parsed.gapId },
      data: { status: "dismissed", operatorNotes: parsed.operatorNotes, resolvedAt: new Date() },
    });
    await recomputeScoreInTransaction(tx, parsed.opportunityId);
    await refreshNextAction(tx, parsed.opportunityId);
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
  await tifDb.$transaction(async (tx) => {
    await tx.oiOpportunityFact.create({
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
    await recomputeScoreInTransaction(tx, parsed.opportunityId);
    await refreshNextAction(tx, parsed.opportunityId);
  });
  revalidatePath(workbenchPath(parsed.opportunityId));
}

export async function addStakeholder(formData: FormData) {
  const parsed = stakeholderSchema.parse({
    opportunityId: formData.get("opportunityId"),
    personName: formData.get("personName"),
    title: formData.get("title"),
    role: formData.get("role") || "unknown",
    authority: formData.get("authority") || "unknown",
    relationshipType: formData.get("relationshipType") || "cold",
    roleEvidenceUrl: formData.get("roleEvidenceUrl") || undefined,
    roleEvidenceLabel: formData.get("roleEvidenceLabel") || undefined,
    roleConfidence: formData.get("roleConfidence") || 50,
    operatorConfirmed: formData.get("operatorConfirmed") === "on",
    warmPathNotes: formData.get("warmPathNotes") || undefined,
    relevanceToTodd: formData.get("relevanceToTodd") || undefined,
  });
  await tifDb.$transaction(async (tx) => {
    const opportunity = await tx.oiOpportunity.findUniqueOrThrow({
      where: { id: parsed.opportunityId },
      select: { organizationId: true },
    });
    const person = await tx.oiPerson.upsert({
      where: {
        organizationId_name_title: {
          organizationId: opportunity.organizationId,
          name: parsed.personName,
          title: parsed.title,
        },
      },
      update: {},
      create: {
        organizationId: opportunity.organizationId,
        name: parsed.personName,
        title: parsed.title,
        seniority: inferSeniority(parsed.title),
        sourceConfidence: parsed.operatorConfirmed ? parsed.roleConfidence : 0,
      },
    });
    await tx.oiStakeholder.upsert({
      where: {
        opportunityId_personId: {
          opportunityId: parsed.opportunityId,
          personId: person.id,
        },
      },
      update: stakeholderData(parsed),
      create: {
        ...stakeholderData(parsed),
        opportunityId: parsed.opportunityId,
        personId: person.id,
      },
    });
    await recomputeScoreInTransaction(tx, parsed.opportunityId);
    await refreshNextAction(tx, parsed.opportunityId);
  });
  revalidateWorkbenchSurfaces(parsed.opportunityId);
}

export async function updateStakeholder(formData: FormData) {
  const parsed = stakeholderSchema.required({ stakeholderId: true }).parse({
    opportunityId: formData.get("opportunityId"),
    stakeholderId: formData.get("stakeholderId"),
    personName: formData.get("personName"),
    title: formData.get("title"),
    role: formData.get("role") || "unknown",
    authority: formData.get("authority") || "unknown",
    relationshipType: formData.get("relationshipType") || "cold",
    roleEvidenceUrl: formData.get("roleEvidenceUrl") || undefined,
    roleEvidenceLabel: formData.get("roleEvidenceLabel") || undefined,
    roleConfidence: formData.get("roleConfidence") || 50,
    operatorConfirmed: formData.get("operatorConfirmed") === "on",
    warmPathNotes: formData.get("warmPathNotes") || undefined,
    relevanceToTodd: formData.get("relevanceToTodd") || undefined,
  });
  await tifDb.$transaction(async (tx) => {
    const stakeholder = await tx.oiStakeholder.update({
      where: { id: parsed.stakeholderId },
      data: stakeholderData(parsed),
      select: { personId: true },
    });
    await tx.oiPerson.update({
      where: { id: stakeholder.personId },
      data: {
        name: parsed.personName,
        title: parsed.title,
        seniority: inferSeniority(parsed.title),
      },
    });
    await recomputeScoreInTransaction(tx, parsed.opportunityId);
    await refreshNextAction(tx, parsed.opportunityId);
  });
  revalidateWorkbenchSurfaces(parsed.opportunityId);
}

export async function selectStakeholder(formData: FormData) {
  const parsed = stakeholderIdSchema.parse({
    opportunityId: formData.get("opportunityId"),
    stakeholderId: formData.get("stakeholderId"),
  });
  await tifDb.$transaction(async (tx) => {
    const stakeholder = await tx.oiStakeholder.findUniqueOrThrow({
      where: { id: parsed.stakeholderId },
      include: { person: true },
    });
    if (stakeholder.person.doNotContact) {
      throw new Error("A do-not-contact stakeholder cannot be selected.");
    }
    if (!stakeholder.roleEvidenceUrl && !stakeholder.roleEvidenceLabel && stakeholder.roleConfidence < 100) {
      throw new Error("Selection requires role evidence or explicit operator confirmation.");
    }
    await tx.oiStakeholder.updateMany({
      where: { opportunityId: parsed.opportunityId, isSelected: true },
      data: { isSelected: false, selectedAt: null },
    });
    await tx.oiStakeholder.update({
      where: { id: parsed.stakeholderId },
      data: { isSelected: true, selectedAt: new Date() },
    });
    await recomputeScoreInTransaction(tx, parsed.opportunityId);
    await refreshNextAction(tx, parsed.opportunityId);
  });
  revalidateWorkbenchSurfaces(parsed.opportunityId);
}

export async function markDoNotContact(formData: FormData) {
  const parsed = stakeholderIdSchema.parse({
    opportunityId: formData.get("opportunityId"),
    stakeholderId: formData.get("stakeholderId"),
  });
  await tifDb.$transaction(async (tx) => {
    const stakeholder = await tx.oiStakeholder.findUniqueOrThrow({
      where: { id: parsed.stakeholderId },
      select: { personId: true },
    });
    await tx.oiPerson.update({
      where: { id: stakeholder.personId },
      data: { doNotContact: true },
    });
    await tx.oiStakeholder.update({
      where: { id: parsed.stakeholderId },
      data: { isSelected: false, selectedAt: null },
    });
    await recomputeScoreInTransaction(tx, parsed.opportunityId);
    await refreshNextAction(tx, parsed.opportunityId);
  });
  revalidateWorkbenchSurfaces(parsed.opportunityId);
}

export async function addContactPoint(formData: FormData) {
  const parsed = contactPointSchema.parse({
    opportunityId: formData.get("opportunityId"),
    personId: formData.get("personId"),
    type: formData.get("type"),
    value: formData.get("value"),
    provenance: formData.get("provenance"),
    sourceLabel: formData.get("sourceLabel") || undefined,
  });
  await tifDb.$transaction(async (tx) => {
    await tx.oiContactPoint.create({
      data: {
        personId: parsed.personId,
        type: parsed.type,
        value: parsed.value,
        provenance: parsed.provenance,
        sourceLabel: parsed.sourceLabel,
      },
    });
    await recomputeScoreInTransaction(tx, parsed.opportunityId);
    await refreshNextAction(tx, parsed.opportunityId);
  });
  revalidatePath(workbenchPath(parsed.opportunityId));
}

export async function addPersonFact(formData: FormData) {
  const parsed = personFactSchema.parse({
    personId: formData.get("personId"),
    field: formData.get("field"),
    value: formData.get("value"),
    basis: formData.get("basis") || "operator",
    confidence: formData.get("confidence") || 85,
    sourceLabel: formData.get("sourceLabel") || undefined,
  });
  await tifDb.oiOpportunityFact.create({
    data: {
      personId: parsed.personId,
      field: parsed.field,
      value: parsed.value,
      normalizedValue: parsed.value.toLowerCase(),
      basis: parsed.basis,
      confidence: parsed.confidence,
      isOperatorOverride: parsed.basis === "operator",
    },
  });
  revalidatePath(`/tif/oi/people/${parsed.personId}`);
}

export async function recomputeScore(formData: FormData) {
  const parsed = opportunityIdSchema.parse({ opportunityId: formData.get("opportunityId") });
  await recomputeScoreAction(parsed.opportunityId);
}

async function recomputeScoreAction(opportunityId: string) {
  await tifDb.$transaction(async (tx) => {
    await recomputeScoreInTransaction(tx, opportunityId);
    await refreshNextAction(tx, opportunityId);
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

async function refreshNextAction(tx: Prisma.TransactionClient, opportunityId: string) {
  const input = await loadScoreInput(tx, opportunityId);
  const next = deriveNextAction({
    opportunity: {
      type: input.opportunity.type,
      status: input.opportunity.status,
      offerId: input.opportunity.offerId,
      lastActivityAt: input.opportunity.lastActivityAt,
    },
    initiative: input.initiative,
    researchGaps: input.researchGaps,
    stakeholders: input.stakeholders,
    roleProfile: input.roleProfile
      ? { isComplete: Boolean(input.roleProfile.compMax && input.roleProfile.reportsToTitle) }
      : null,
    rfpProfile: input.rfpProfile,
    draft: { exists: false },
    asOf: input.asOf,
  });
  const existingOpenAction = await tx.oiNextAction.findFirst({
    where: { opportunityId, status: "open" },
    select: { id: true, type: true, description: true, dueAt: true },
  });
  if (
    existingOpenAction &&
    existingOpenAction.type === next.type &&
    existingOpenAction.description === next.description &&
    sameDueAt(existingOpenAction.dueAt, next.dueAt)
  ) {
    return;
  }
  if (existingOpenAction) {
    await tx.oiNextAction.updateMany({
      where: { opportunityId, status: "open" },
      data: { status: "cancelled" },
    });
  }
  await tx.oiNextAction.create({
    data: {
      opportunityId,
      type: next.type,
      status: "open",
      description: next.description,
      rationale: next.rationale,
      estimatedMinutes: next.estimatedMinutes,
      dueAt: next.dueAt,
    },
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
      offerId: opportunity.offerId,
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

function sameDueAt(left?: Date | string | null, right?: Date | string | null) {
  if (!left && !right) return true;
  if (!left || !right) return false;
  return new Date(left).getTime() === new Date(right).getTime();
}

function workbenchPath(opportunityId: string) {
  return `/tif/oi/opportunities/${opportunityId}`;
}

function revalidateWorkbenchSurfaces(opportunityId: string) {
  revalidatePath(workbenchPath(opportunityId));
  revalidatePath("/tif/oi/opportunities");
  revalidatePath("/tif/oi/today");
}

function stakeholderData(parsed: z.infer<typeof stakeholderSchema>) {
  return {
    role: parsed.role,
    authority: parsed.authority,
    relationshipType: parsed.relationshipType,
    roleEvidenceUrl: parsed.roleEvidenceUrl,
    roleEvidenceLabel: parsed.roleEvidenceLabel,
    roleConfidence: parsed.operatorConfirmed ? 100 : parsed.roleConfidence,
    roleVerifiedAt: parsed.operatorConfirmed ? new Date() : undefined,
    warmPathNotes: parsed.warmPathNotes,
    relevanceToTodd: parsed.relevanceToTodd,
  };
}

function inferSeniority(title: string) {
  const normalized = title.toLowerCase();
  if (/\b(chief|ceo|coo|cio|cto|cfo|cmo|cxo)\b/.test(normalized)) return "c_suite";
  if (normalized.includes("senior vice president") || normalized.includes("svp")) return "senior_vice_president";
  if (normalized.includes("vice president") || normalized.includes("vp")) return "vice_president";
  if (normalized.includes("director")) return "director";
  return "other";
}
