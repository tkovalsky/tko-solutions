import type { Prisma } from "@prisma/client";
import type { TODD_CAPABILITY_PROFILE_V2 } from "../../capability-profile";
import type { OpportunityFactForScoring, OpportunityScoreComponent } from "../../contracts";
import { disqualifyOpportunity } from "./disqualify";
import { scoreEvidence } from "./evidence";
import { scoreOpportunityFit } from "./fit";
import { scorePriority } from "./priority";
import { scoreUrgency } from "./urgency";
import { estimateValue, type OfferBand } from "./value";

export type ToddCapabilityProfileV2 = typeof TODD_CAPABILITY_PROFILE_V2;

export type StakeholderScoreInput = {
  role?: string | null;
  authority?: string | null;
  relationshipType?: string | null;
  roleEvidenceUrl?: string | null;
  roleConfidence?: number | null;
  isSelected?: boolean | null;
  person?: {
    seniority?: string | null;
    budgetAuthority?: number | null;
    hiringAuthority?: number | null;
    transformationRelevance?: number | null;
    relationshipStrength?: number | null;
    sourceConfidence?: number | null;
    doNotContact?: boolean | null;
    contactPoints?: Array<{ provenance?: string | null; status?: string | null }>;
  } | null;
};

export type RoleProfileScoreInput = {
  compMax?: number | null;
  seniorityBand?: string | null;
  remoteCompatible?: boolean | null;
  postingIsOpen?: boolean | null;
  postingLastCheckedAt?: Date | string | null;
  closesAt?: Date | string | null;
  applicationUrl?: string | null;
};

export type RfpProfileScoreInput = {
  contractValue?: number | null;
  contractYears?: number | null;
  biddingRole?: "prime" | "sub" | null;
  submissionDeadlineAt?: Date | string | null;
  preparedResponseExists?: boolean | null;
  canQualify?: boolean | null;
  mandatoryConferenceMissed?: boolean | null;
  incumbentIdentified?: boolean | null;
};

export type ScoreInput = {
  opportunity: {
    id?: string;
    type: string;
    status?: string | null;
    estimatedValueLow?: number | null;
    estimatedValueHigh?: number | null;
    conversionProbabilityOverride?: number | null;
    estimatedHoursOverride?: number | null;
    disqualifiedReason?: string | null;
    lastActivityAt?: Date | string | null;
  };
  facts: OpportunityFactForScoring[];
  initiative: {
    status?: string | null;
    confidence?: number | null;
    category?: string | null;
    domainTags?: string[] | null;
    approvedAt?: Date | string | null;
    lastEvidenceAt?: Date | string | null;
  } | null;
  stakeholders: StakeholderScoreInput[];
  sources: Array<{ publishedAt?: Date | string | null; isPrimary?: boolean | null; retrievedAt?: Date | string | null }>;
  researchGaps: Array<{ status?: string | null; blocksOutreach?: boolean | null }>;
  offer: OfferBand | null;
  roleProfile: RoleProfileScoreInput | null;
  rfpProfile: RfpProfileScoreInput | null;
  profile: ToddCapabilityProfileV2;
  organization?: { tier?: number | null } | null;
  asOf: Date;
};

export type ScoreResult = {
  isDisqualified: boolean;
  disqualifyingRules: string[];
  fitScore: number;
  evidenceScore: number;
  accessScore: number;
  urgencyScore: number;
  total: number;
  completeness: number;
  estimatedValue: number | null;
  conversionProbability: number | null;
  expectedValue: number | null;
  estimatedHours: number | null;
  priorityEfficiency: number | null;
  components: OpportunityScoreComponent[];
  warnings: string[];
  scorePolicyVersion: "pois-v1";
  capabilityProfileVersion: "todd-v2";
};

export type PersistScoreClient = {
  oiScore: {
    create(args: { data: Prisma.OiScoreUncheckedCreateInput }): Promise<{ id: string }>;
  };
  oiOpportunity: {
    update(args: { where: { id: string }; data: { currentScoreId: string } }): Promise<unknown>;
  };
};

const ROLE_POINTS: Record<string, number> = {
  economic_buyer: 10,
  executive_sponsor: 8,
  operational_owner: 6,
  hiring_manager: 8,
  recruiter: 2,
  influencer: 3,
  blocker: -10,
};

export function scoreOpportunity(input: ScoreInput): ScoreResult {
  const fit = scoreOpportunityFit({ facts: input.facts });
  const evidence = scoreEvidence({
    facts: input.facts,
    initiative: input.initiative,
    stakeholders: input.stakeholders,
    sources: input.sources,
    researchGaps: input.researchGaps,
    asOf: input.asOf,
  });
  const accessScore = scoreStakeholderAccess(input.stakeholders);
  const relationshipType = strongestRelationship(input.stakeholders);
  const urgency = scoreUrgency({
    facts: input.facts,
    roleProfile: input.roleProfile,
    rfpProfile: input.rfpProfile,
    asOf: input.asOf,
  });
  const hasWarmPath = input.stakeholders.some(
    (stakeholder) =>
      stakeholder.relationshipType === "warm_referral" ||
      stakeholder.relationshipType === "warm_history" ||
      stakeholder.relationshipType === "existing_client",
  );
  const disqualified = disqualifyOpportunity({
    opportunity: input.opportunity,
    fitScore: fit.total,
    organization: input.organization,
    stakeholders: input.stakeholders,
    roleProfile: input.roleProfile,
    rfpProfile: input.rfpProfile,
    hasWarmPath,
    hasApplicationUrl: Boolean(input.roleProfile?.applicationUrl),
    asOf: input.asOf,
  });
  const estimatedValue = estimateValue({
    opportunity: input.opportunity,
    offer: input.offer,
    rfpProfile: input.rfpProfile,
  });
  const priority = disqualified.isDisqualified
    ? {
        conversionProbability: null,
        expectedValue: null,
        estimatedHours: null,
        priorityEfficiency: null,
      }
    : scorePriority({
        opportunity: input.opportunity,
        fitScore: fit.total,
        evidenceScore: evidence.total,
        accessScore,
        estimatedValue,
        relationshipType,
        incumbentIdentified: Boolean(input.rfpProfile?.incumbentIdentified),
        rfpBiddingRole: input.rfpProfile?.biddingRole,
        compBelowFloor: input.opportunity.type === "fte" && disqualified.rules.includes("DQ_COMP_FLOOR"),
        initiativeResearched: Boolean(input.initiative?.lastEvidenceAt),
        stakeholderIdentified: input.stakeholders.some((stakeholder) => stakeholder.isSelected),
      });

  const total = Math.round(
    fit.total * 0.35 + evidence.total * 0.2 + accessScore * 0.2 + urgency.total * 0.1 + (priority.priorityEfficiency ? 15 : 0),
  );

  return {
    isDisqualified: disqualified.isDisqualified,
    disqualifyingRules: disqualified.rules,
    fitScore: fit.total,
    evidenceScore: evidence.total,
    accessScore,
    urgencyScore: urgency.total,
    total: Math.min(100, total),
    completeness: fit.completeness,
    estimatedValue: disqualified.isDisqualified ? null : estimatedValue,
    conversionProbability: priority.conversionProbability,
    expectedValue: priority.expectedValue,
    estimatedHours: priority.estimatedHours,
    priorityEfficiency: priority.priorityEfficiency,
    components: [
      ...fit.components,
      ...evidence.components.map((component) => ({ ...component, key: `evidence.${component.key}` })),
      ...urgency.components.map((component) => ({ ...component, key: `urgency.${component.key}` })),
      {
        key: "access",
        label: "Access",
        points: accessScore,
        maxPoints: 100,
        reason: "Best stakeholder access score for the opportunity.",
      },
      ...accessComponents({ accessScore, relationshipType, conversionProbability: priority.conversionProbability }),
    ],
    warnings: disqualified.rules,
    scorePolicyVersion: "pois-v1",
    capabilityProfileVersion: "todd-v2",
  };
}

export async function persistOpportunityScore(
  client: PersistScoreClient,
  opportunityId: string,
  score: ScoreResult,
  inputSnapshot: Prisma.InputJsonValue,
) {
  const snapshot = await client.oiScore.create({
    data: {
      opportunityId,
      total: score.total,
      completeness: score.completeness,
      components: score.components as Prisma.InputJsonValue,
      inputSnapshot,
      scorePolicyVersion: score.scorePolicyVersion,
      capabilityProfileVersion: score.capabilityProfileVersion,
      fitScore: score.fitScore,
      evidenceScore: score.evidenceScore,
      accessScore: score.accessScore,
      urgencyScore: score.urgencyScore,
      estimatedValue: score.estimatedValue,
      conversionProbability: score.conversionProbability,
      expectedValue: score.expectedValue,
      estimatedHours: score.estimatedHours,
      priorityEfficiency: score.priorityEfficiency,
      isDisqualified: score.isDisqualified,
      disqualifyingRules: score.disqualifyingRules,
    },
  });
  await client.oiOpportunity.update({
    where: { id: opportunityId },
    data: { currentScoreId: snapshot.id },
  });
  return snapshot;
}

function scoreStakeholderAccess(stakeholders: StakeholderScoreInput[]) {
  if (stakeholders.length === 0) return 0;
  return Math.max(...stakeholders.map(scoreOneStakeholder));
}

function scoreOneStakeholder(stakeholder: StakeholderScoreInput) {
  const person = stakeholder.person;
  let score = seniorityScore(person?.seniority);
  score += Math.min(3, person?.budgetAuthority ?? 0) * 4;
  score += Math.min(3, person?.hiringAuthority ?? 0) * 3;
  score += Math.min(3, person?.transformationRelevance ?? 0) * 4;
  score += Math.min(3, person?.relationshipStrength ?? 0) * 4;
  score += Math.min(3, person?.sourceConfidence ?? 0) * 2;
  if (stakeholder.relationshipType === "warm_referral") score += 15;
  if (stakeholder.relationshipType === "warm_history") score += 20;
  if (stakeholder.relationshipType === "existing_client") score += 25;
  score += ROLE_POINTS[stakeholder.role ?? ""] ?? 0;
  if (person?.contactPoints?.some((point) => point.status === "active" && point.provenance !== "pattern_inferred")) {
    score += 8;
  }
  if (person?.seniority === "other") score -= 20;
  if ((person?.budgetAuthority ?? 0) === 0 && (person?.hiringAuthority ?? 0) === 0) score -= 8;
  if ((person?.sourceConfidence ?? 0) === 0) score -= 10;
  return Math.min(100, Math.max(0, score));
}

function seniorityScore(seniority?: string | null) {
  if (seniority === "director") return 8;
  if (seniority === "vice_president") return 10;
  if (seniority === "senior_vice_president") return 12;
  if (seniority === "c_suite") return 10;
  return 0;
}

function strongestRelationship(stakeholders: StakeholderScoreInput[]) {
  if (stakeholders.some((stakeholder) => stakeholder.relationshipType === "existing_client")) return "existing_client";
  if (stakeholders.some((stakeholder) => stakeholder.relationshipType === "warm_history")) return "warm_history";
  if (stakeholders.some((stakeholder) => stakeholder.relationshipType === "warm_referral")) return "warm_referral";
  return "cold";
}

function accessComponents({
  accessScore,
  relationshipType,
  conversionProbability,
}: {
  accessScore: number;
  relationshipType: string;
  conversionProbability: number | null;
}): OpportunityScoreComponent[] {
  const components: OpportunityScoreComponent[] = [];
  if (relationshipType === "warm_history") {
    components.push({
      key: "access.warm_history_multiplier",
      label: "Warm history multiplier",
      points: 250,
      maxPoints: 250,
      reason: "Warm history contributes a x2.5 probability multiplier.",
    });
  } else if (relationshipType === "warm_referral") {
    components.push({
      key: "access.warm_referral_multiplier",
      label: "Warm referral multiplier",
      points: 200,
      maxPoints: 200,
      reason: "Warm referral contributes a x2.0 probability multiplier.",
    });
  } else if (relationshipType === "existing_client") {
    components.push({
      key: "access.existing_client_multiplier",
      label: "Existing client multiplier",
      points: 300,
      maxPoints: 300,
      reason: "Existing client access contributes a x3.0 probability multiplier.",
    });
  }
  if (accessScore >= 70) {
    components.push({
      key: "access.high_access_multiplier",
      label: "High-access multiplier",
      points: 140,
      maxPoints: 140,
      reason: "Access score at or above 70 contributes a x1.4 probability multiplier.",
    });
  }
  if (conversionProbability === 60) {
    components.push({
      key: "access.probability_cap",
      label: "Probability cap",
      points: 60,
      maxPoints: 60,
      reason: "Combined access and fit contribution is capped at 60% probability.",
    });
  }
  return components;
}
