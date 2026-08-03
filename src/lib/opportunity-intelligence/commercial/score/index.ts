import type { Prisma } from "@prisma/client";
import type { TODD_CAPABILITY_PROFILE_V2 } from "../../capability-profile";
import type { OpportunityFactForScoring, OpportunityScoreComponent } from "../../contracts";
import {
  scoreStakeholderAccess as scoreSingleStakeholderAccess,
  type ScoreComponent as StakeholderAccessComponent,
  type StakeholderAccessInput,
} from "./access";
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
    sourcePublishedAt?: Date | string | null;
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

const ACCESS_COMPONENT_MAX_POINTS: Record<string, number> = {
  seniority: 12,
  budget: 12,
  hiring: 9,
  transformation: 12,
  relationship: 12,
  source: 6,
  seniority_penalty: 0,
  authority_penalty: 0,
  source_penalty: 0,
  freshness_penalty: 0,
  warm_path: 25,
  role_clarity: 10,
  contact_reachable: 8,
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
  const access = scoreBestStakeholderAccess(input.stakeholders, input.asOf);
  const accessScore = access.score;
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
      ...access.components.map(toOpportunityAccessComponent),
      ...accessComponents({ accessScore, relationshipType, conversionProbability: priority.conversionProbability }),
    ],
    warnings: [...disqualified.rules, ...access.warnings],
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

function scoreBestStakeholderAccess(stakeholders: StakeholderScoreInput[], asOf: Date) {
  if (stakeholders.length === 0) {
    return { score: 0, components: [] as StakeholderAccessComponent[], warnings: [] as string[] };
  }
  return stakeholders
    .map((stakeholder) => scoreSingleStakeholderAccess(toStakeholderAccessInput(stakeholder), asOf))
    .reduce((best, result) => (result.score > best.score ? result : best));
}

function toStakeholderAccessInput(stakeholder: StakeholderScoreInput): StakeholderAccessInput {
  const person = stakeholder.person;
  return {
    seniority: normalizeSeniority(person?.seniority),
    budgetAuthority: person?.budgetAuthority ?? 0,
    hiringAuthority: person?.hiringAuthority ?? 0,
    transformationRelevance: person?.transformationRelevance ?? 0,
    relationshipStrength: person?.relationshipStrength ?? 0,
    sourceConfidence: person?.sourceConfidence ?? 0,
    sourcePublishedAt: normalizeDate(person?.sourcePublishedAt),
    doNotContact: Boolean(person?.doNotContact),
    warmPath: normalizeRelationship(stakeholder.relationshipType),
    roleClarity: normalizeStakeholderRole(stakeholder.role),
    contactReachable: Boolean(
      person?.contactPoints?.some((point) => point.status === "active" && point.provenance !== "pattern_inferred"),
    ),
  };
}

function normalizeSeniority(value?: string | null): StakeholderAccessInput["seniority"] {
  if (value === "director" || value === "vice_president" || value === "senior_vice_president" || value === "c_suite") {
    return value;
  }
  return "other";
}

function normalizeRelationship(value?: string | null): StakeholderAccessInput["warmPath"] {
  if (value === "warm_referral" || value === "warm_history" || value === "existing_client") {
    return value;
  }
  return "cold";
}

function normalizeStakeholderRole(value?: string | null): StakeholderAccessInput["roleClarity"] {
  if (
    value === "economic_buyer" ||
    value === "exec_sponsor" ||
    value === "executive_sponsor" ||
    value === "operational_owner" ||
    value === "hiring_manager" ||
    value === "recruiter" ||
    value === "influencer" ||
    value === "blocker" ||
    value === "technical_owner" ||
    value === "champion" ||
    value === "procurement" ||
    value === "partner"
  ) {
    return value;
  }
  return "unknown";
}

function normalizeDate(value?: Date | string | null) {
  if (!value) return null;
  const date = value instanceof Date ? value : new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
}

function toOpportunityAccessComponent(component: StakeholderAccessComponent): OpportunityScoreComponent {
  return {
    key: `access.${component.key}`,
    label: component.label,
    points: component.points,
    maxPoints: ACCESS_COMPONENT_MAX_POINTS[component.key] ?? Math.max(0, component.points),
    reason: component.reason,
  };
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
