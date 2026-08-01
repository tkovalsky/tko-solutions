export type DisqualifyInput = {
  opportunity: {
    type: string;
    estimatedValueLow?: number | null;
    estimatedValueHigh?: number | null;
    disqualifiedReason?: string | null;
  };
  fitScore?: number;
  organization?: { tier?: number | null } | null;
  stakeholders?: Array<{ person?: { doNotContact?: boolean | null } | null }> | null;
  roleProfile?: {
    compMax?: number | null;
    seniorityBand?: string | null;
    remoteCompatible?: boolean | null;
    postingIsOpen?: boolean | null;
    postingLastCheckedAt?: Date | string | null;
  } | null;
  rfpProfile?: {
    submissionDeadlineAt?: Date | string | null;
    preparedResponseExists?: boolean | null;
    canQualify?: boolean | null;
    mandatoryConferenceMissed?: boolean | null;
  } | null;
  hasWarmPath?: boolean;
  hasApplicationUrl?: boolean;
  asOf: Date;
};

export type DisqualifyResult = {
  isDisqualified: boolean;
  rules: string[];
};

function daysUntil(asOf: Date, value?: Date | string | null) {
  if (!value) return null;
  return Math.ceil((new Date(value).getTime() - asOf.getTime()) / 86_400_000);
}

function daysSince(asOf: Date, value?: Date | string | null) {
  if (!value) return null;
  return Math.floor((asOf.getTime() - new Date(value).getTime()) / 86_400_000);
}

export function disqualifyOpportunity(input: DisqualifyInput): DisqualifyResult {
  const rules: string[] = [];
  const type = input.opportunity.type;
  const compMax = input.roleProfile?.compMax ?? input.opportunity.estimatedValueHigh ?? null;
  if (type === "fte" && compMax !== null && compMax < 225_000) {
    rules.push("DQ_COMP_FLOOR");
  }
  if (type === "fte" && input.roleProfile?.seniorityBand && !/director|vp|vice|svp|chief|executive/i.test(input.roleProfile.seniorityBand)) {
    rules.push("DQ_SENIORITY");
  }
  if (type === "fte" && input.roleProfile?.remoteCompatible === false) {
    rules.push("DQ_ONSITE_REQUIRED");
  }
  if ((input.stakeholders?.length ?? 0) > 0 && input.stakeholders?.every((stakeholder) => stakeholder.person?.doNotContact)) {
    rules.push("DQ_DO_NOT_CONTACT");
  }
  const rfpDays = daysUntil(input.asOf, input.rfpProfile?.submissionDeadlineAt);
  if (type === "rfp" && rfpDays !== null && rfpDays < 5 && !input.rfpProfile?.preparedResponseExists) {
    rules.push("DQ_RFP_DEADLINE");
  }
  if (type === "rfp" && input.rfpProfile?.canQualify === false) {
    rules.push("DQ_RFP_CANNOT_QUALIFY");
  }
  if (type === "rfp" && input.rfpProfile?.mandatoryConferenceMissed) {
    rules.push("DQ_RFP_MANDATORY_CONF_MISSED");
  }
  const lastCheckedDays = daysSince(input.asOf, input.roleProfile?.postingLastCheckedAt);
  if (type === "fte" && (input.roleProfile?.postingIsOpen === false || (lastCheckedDays !== null && lastCheckedDays > 30))) {
    rules.push("DQ_STALE_POSTING");
  }
  if (type === "consulting" && (input.opportunity.estimatedValueHigh ?? 0) > 0 && (input.opportunity.estimatedValueHigh ?? 0) < 5_000) {
    rules.push("DQ_VALUE_FLOOR");
  }
  if ((input.stakeholders?.length ?? 0) === 0 && !input.hasWarmPath && !input.hasApplicationUrl) {
    rules.push("DQ_NO_ACCESS_PATH");
  }
  if ((input.organization?.tier ?? 1) >= 3 && (input.fitScore ?? 100) < 40) {
    rules.push("DQ_OUT_OF_SCOPE");
  }
  return { isDisqualified: rules.length > 0, rules };
}
