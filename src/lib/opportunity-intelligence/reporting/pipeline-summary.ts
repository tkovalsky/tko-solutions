import type { OiOpportunityStatus, OiOpportunityType } from "@prisma/client";
import { isTerminalOpportunityStatus } from "@/lib/opportunity-intelligence/commercial/lifecycle";

export type PipelineSummaryOpportunity = {
  type: OiOpportunityType;
  status: OiOpportunityStatus;
  currentScore?: { expectedValue?: number | string | { toNumber(): number } | null } | null;
};

const INCOME_TARGET = 300_000;

export function buildPipelineSummary(opportunities: PipelineSummaryOpportunity[]) {
  const active = opportunities.filter(isActiveSummaryOpportunity);
  const expectedValueTotal = active.reduce((total, opportunity) => total + numeric(opportunity.currentScore?.expectedValue), 0);
  return {
    expectedValueTotal,
    incomeReplacement: expectedValueTotal / INCOME_TARGET,
    livePathCount: new Set(active.map((opportunity) => opportunity.type)).size,
  };
}

function isActiveSummaryOpportunity(opportunity: PipelineSummaryOpportunity) {
  return !isTerminalOpportunityStatus(opportunity.status) && opportunity.status !== "dismissed" && opportunity.status !== "paused";
}

function numeric(value?: number | string | { toNumber(): number } | null) {
  if (typeof value === "number") return value;
  if (typeof value === "string") return Number(value);
  if (value && typeof value === "object" && "toNumber" in value) return value.toNumber();
  return 0;
}
