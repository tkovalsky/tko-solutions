import type { OiOpportunityType } from "@prisma/client";

export type PipelineSummaryOpportunity = {
  type: OiOpportunityType;
  currentScore?: { expectedValue?: number | string | { toNumber(): number } | null } | null;
};

const INCOME_TARGET = 300_000;

export function buildPipelineSummary(opportunities: PipelineSummaryOpportunity[]) {
  const expectedValueTotal = opportunities.reduce((total, opportunity) => total + numeric(opportunity.currentScore?.expectedValue), 0);
  return {
    expectedValueTotal,
    incomeReplacement: expectedValueTotal / INCOME_TARGET,
    livePathCount: new Set(opportunities.map((opportunity) => opportunity.type)).size,
  };
}

function numeric(value?: number | string | { toNumber(): number } | null) {
  if (typeof value === "number") return value;
  if (typeof value === "string") return Number(value);
  if (value && typeof value === "object" && "toNumber" in value) return value.toNumber();
  return 0;
}
