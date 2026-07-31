export const STAKEHOLDER_ACCESS_POLICY_VERSION = "stakeholder-access-v1";

export type OiSeniority =
  | "director"
  | "vice_president"
  | "senior_vice_president"
  | "c_suite"
  | "other";

export type OiRelationshipType =
  | "cold"
  | "warm_referral"
  | "warm_history"
  | "existing_client";

export type OiStakeholderAccessRole =
  | "economic_buyer"
  | "exec_sponsor"
  | "executive_sponsor"
  | "operational_owner"
  | "hiring_manager"
  | "recruiter"
  | "influencer"
  | "blocker"
  | "technical_owner"
  | "champion"
  | "procurement"
  | "partner"
  | "unknown";

export type StakeholderAccessInput = {
  seniority: OiSeniority;
  budgetAuthority: number;
  hiringAuthority: number;
  transformationRelevance: number;
  relationshipStrength: number;
  sourceConfidence: number;
  sourcePublishedAt?: Date | null;
  doNotContact?: boolean;
  warmPath?: OiRelationshipType;
  roleClarity?: OiStakeholderAccessRole;
  contactReachable?: boolean;
};

export type ScoreComponent = {
  key: string;
  label: string;
  points: number;
  reason: string;
};

export type StakeholderAccessResult = {
  score: number;
  components: ScoreComponent[];
  warnings: string[];
  policyVersion: typeof STAKEHOLDER_ACCESS_POLICY_VERSION;
};

const SENIORITY_POINTS: Record<OiSeniority, number> = {
  director: 8,
  vice_president: 10,
  senior_vice_president: 12,
  c_suite: 10,
  other: 0,
};

const WARM_PATH_POINTS: Record<OiRelationshipType, number> = {
  cold: 0,
  warm_referral: 15,
  warm_history: 20,
  existing_client: 25,
};

const ROLE_CLARITY_POINTS: Record<OiStakeholderAccessRole, number> = {
  economic_buyer: 10,
  exec_sponsor: 8,
  executive_sponsor: 8,
  operational_owner: 6,
  hiring_manager: 8,
  recruiter: 2,
  influencer: 3,
  blocker: -10,
  technical_owner: 0,
  champion: 0,
  procurement: 0,
  partner: 0,
  unknown: 0,
};

export function scoreStakeholderAccess(
  input: StakeholderAccessInput,
  asOf = new Date(),
): StakeholderAccessResult {
  const components: ScoreComponent[] = [];
  const warnings: string[] = [];
  const add = (key: string, label: string, points: number, reason: string) => {
    components.push({ key, label, points, reason });
  };

  add(
    "seniority",
    "Director+ authority",
    SENIORITY_POINTS[input.seniority],
    input.seniority === "other"
      ? "The role is not yet verified as Director+."
      : `The role is classified as ${formatSeniority(input.seniority)}.`,
  );
  add(
    "budget",
    "Budget authority",
    boundedLevel(input.budgetAuthority) * 4,
    `Operator-assessed budget authority is ${boundedLevel(input.budgetAuthority)}/3.`,
  );
  add(
    "hiring",
    "Hiring authority",
    boundedLevel(input.hiringAuthority) * 3,
    `Operator-assessed hiring influence is ${boundedLevel(input.hiringAuthority)}/3.`,
  );
  add(
    "transformation",
    "Transformation relevance",
    boundedLevel(input.transformationRelevance) * 4,
    `Relevance to transformation, workflow, product, or operating-model work is ${boundedLevel(input.transformationRelevance)}/3.`,
  );
  add(
    "relationship",
    "Relationship access",
    boundedLevel(input.relationshipStrength) * 4,
    boundedLevel(input.relationshipStrength)
      ? `Relationship strength is ${boundedLevel(input.relationshipStrength)}/3.`
      : "No warm path is recorded.",
  );
  add(
    "source",
    "Evidence confidence",
    boundedLevel(input.sourceConfidence) * 2,
    `Source confidence is ${boundedLevel(input.sourceConfidence)}/3.`,
  );

  if (input.seniority === "other") {
    add("seniority_penalty", "Seniority gate", -20, "Director+ authority is required.");
    warnings.push("Verify that the person is currently Director level or above.");
  }
  if (input.budgetAuthority === 0 && input.hiringAuthority === 0) {
    add(
      "authority_penalty",
      "Authority gap",
      -8,
      "No budget or hiring authority has been established.",
    );
    warnings.push("Research whether this person owns budget or can sponsor a hire.");
  }
  if (input.sourceConfidence === 0) {
    add("source_penalty", "Missing source", -10, "No reliable public or operator source is linked.");
    warnings.push("Add a public professional source before outreach.");
  }

  const stale = sourceIsStale(input.sourcePublishedAt, asOf);
  if (stale) {
    add(
      "freshness_penalty",
      "Source freshness",
      -6,
      "The current-role source is more than 12 months old.",
    );
    warnings.push("Reverify the person's current title before contact.");
  }
  if (input.doNotContact) {
    warnings.push("This person is marked do not contact.");
  }

  add(
    "warm_path",
    "Warm path",
    input.warmPath ? WARM_PATH_POINTS[input.warmPath] : 0,
    input.warmPath && input.warmPath !== "cold"
      ? `Warm path is ${input.warmPath.replaceAll("_", " ")}.`
      : "No warm path is recorded.",
  );
  add(
    "role_clarity",
    "Role clarity",
    input.roleClarity ? ROLE_CLARITY_POINTS[input.roleClarity] : 0,
    input.roleClarity && input.roleClarity !== "unknown"
      ? `Stakeholder role is ${input.roleClarity.replaceAll("_", " ")}.`
      : "Stakeholder role is not yet clear.",
  );
  add(
    "contact_reachable",
    "Contact reachable",
    input.contactReachable ? 8 : 0,
    input.contactReachable
      ? "An active contact point exists with sufficient provenance."
      : "No reachable active contact point has been recorded.",
  );

  const rawScore = components.reduce((sum, component) => sum + component.points, 0);
  return {
    score: Math.max(0, Math.min(100, rawScore)),
    components,
    warnings,
    policyVersion: STAKEHOLDER_ACCESS_POLICY_VERSION,
  };
}

export function formatSeniority(value: OiSeniority): string {
  return {
    director: "Director",
    vice_president: "Vice President",
    senior_vice_president: "Senior Vice President",
    c_suite: "C-suite",
    other: "Unverified",
  }[value];
}

function boundedLevel(value: number): number {
  return Math.max(0, Math.min(3, Math.round(value)));
}

function sourceIsStale(sourcePublishedAt: Date | null | undefined, asOf: Date): boolean {
  if (!sourcePublishedAt) return false;
  const age = asOf.getTime() - sourcePublishedAt.getTime();
  return age > 365 * 24 * 60 * 60 * 1000;
}
