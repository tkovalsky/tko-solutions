export type OfferBand = {
  slug?: string | null;
  kind?: string | null;
  valueLow: number;
  valueHigh: number;
  isRecurring?: boolean | null;
  expansionProbability?: number | null;
  followOnValue?: number | null;
};

export type ValueScoreInput = {
  opportunity: {
    type: string;
    estimatedValueLow?: number | null;
    estimatedValueHigh?: number | null;
  };
  offer: OfferBand | null;
  rfpProfile?: { contractValue?: number | null; contractYears?: number | null; biddingRole?: "prime" | "sub" | null } | null;
};

const DEFAULTS: Record<string, OfferBand> = {
  assessment: { valueLow: 5_000, valueHigh: 8_000, expansionProbability: 0.4, followOnValue: 60_000 },
  consulting: { valueLow: 15_000, valueHigh: 30_000, expansionProbability: 0.35, followOnValue: 90_000 },
  fractional: { valueLow: 144_000, valueHigh: 300_000, isRecurring: true },
  partnership: { valueLow: 10_000, valueHigh: 40_000, expansionProbability: 0.3, followOnValue: 40_000 },
  fte: { valueLow: 225_000, valueHigh: 350_000, isRecurring: true },
};

function midpoint(low: number, high: number) {
  return (low + high) / 2;
}

export function estimateValue(input: ValueScoreInput) {
  if (input.rfpProfile?.contractValue && input.rfpProfile.contractYears) {
    const annual = input.rfpProfile.contractValue / input.rfpProfile.contractYears;
    return Math.round(input.rfpProfile.biddingRole === "sub" ? annual * 0.5 : annual);
  }
  const band = input.offer ?? DEFAULTS[input.opportunity.type];
  const low = input.opportunity.estimatedValueLow ?? band?.valueLow ?? null;
  const high = input.opportunity.estimatedValueHigh ?? band?.valueHigh ?? null;
  if (low === null || high === null) return null;
  const base = input.opportunity.type === "fractional" ? midpoint(low, high) : midpoint(low, high);
  const expansion = (band?.expansionProbability ?? 0) * (band?.followOnValue ?? 0);
  return Math.round(base + expansion);
}
