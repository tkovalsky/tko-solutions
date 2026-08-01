export type PriorityInput = {
  opportunity: {
    type: string;
    conversionProbabilityOverride?: number | null;
    estimatedHoursOverride?: number | null;
    status?: string | null;
  };
  fitScore: number;
  evidenceScore: number;
  accessScore: number;
  estimatedValue: number | null;
  relationshipType?: string | null;
  incumbentIdentified?: boolean;
  rfpBiddingRole?: "prime" | "sub" | null;
  compBelowFloor?: boolean;
  initiativeResearched?: boolean;
  stakeholderIdentified?: boolean;
};

const BASE_PROBABILITY: Record<string, number> = {
  fte: 0.08,
  consulting: 0.15,
  assessment: 0.22,
  fractional: 0.1,
  partnership: 0.18,
  rfp: 0.05,
  rfp_sub: 0.12,
};

const BASE_HOURS: Record<string, number> = {
  fte: 24.5,
  consulting: 11.5,
  assessment: 6,
  fractional: 14.5,
  partnership: 6.5,
  rfp: 37,
  rfp_sub: 13,
};

export function conversionProbability(input: PriorityInput) {
  if (input.opportunity.conversionProbabilityOverride !== null && input.opportunity.conversionProbabilityOverride !== undefined) {
    return Math.min(60, Math.max(1, Math.round(input.opportunity.conversionProbabilityOverride)));
  }
  const rfpSub = input.opportunity.type === "rfp" && input.rfpBiddingRole === "sub";
  let probability = BASE_PROBABILITY[rfpSub ? "rfp_sub" : input.opportunity.type] ?? 0.1;
  if (input.opportunity.type === "rfp") {
    if (input.incumbentIdentified) probability *= 0.5;
    return Math.min(60, Math.max(1, Math.round(probability * 100)));
  }
  if (input.relationshipType === "warm_referral") probability *= 2;
  if (input.relationshipType === "warm_history") probability *= 2.5;
  if (input.relationshipType === "existing_client") probability *= 3;
  if (input.accessScore >= 70) probability *= 1.4;
  if (input.accessScore < 30) probability *= 0.5;
  if (input.evidenceScore >= 75) probability *= 1.3;
  if (input.evidenceScore < 50) probability *= 0.6;
  if (input.fitScore >= 80) probability *= 1.3;
  if (input.fitScore < 45) probability *= 0.4;
  if (input.incumbentIdentified) probability *= 0.5;
  if (input.compBelowFloor) probability *= 0.3;
  return Math.min(60, Math.max(1, Math.round(probability * 100)));
}

export function remainingHours(input: PriorityInput) {
  if (input.opportunity.estimatedHoursOverride !== null && input.opportunity.estimatedHoursOverride !== undefined) {
    return Math.round(input.opportunity.estimatedHoursOverride * 10) / 10;
  }
  const rfpSub = input.opportunity.type === "rfp" && input.rfpBiddingRole === "sub";
  let hours = BASE_HOURS[rfpSub ? "rfp_sub" : input.opportunity.type] ?? 10;
  if (input.initiativeResearched) hours *= 0.7;
  if (input.stakeholderIdentified) hours *= 0.8;
  if (input.opportunity.type !== "rfp" && input.evidenceScore < 50) hours *= 1.5;
  return Math.round(hours * 10) / 10;
}

export function scorePriority(input: PriorityInput) {
  const probability = conversionProbability(input);
  const expectedValue = input.estimatedValue === null ? null : Math.round(input.estimatedValue * (probability / 100));
  const hours = remainingHours(input);
  return {
    conversionProbability: probability,
    expectedValue,
    estimatedHours: hours,
    priorityEfficiency: expectedValue === null ? null : Math.round(expectedValue / hours),
  };
}
