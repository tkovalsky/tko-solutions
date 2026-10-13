import type { OiNextActionStatus, OiOpportunityStatus, OiOpportunityType } from "@prisma/client";
import { isTerminalOpportunityStatus } from "@/lib/opportunity-intelligence/commercial/lifecycle";

export type PipelineOpportunity = {
  id: string;
  title: string;
  type: OiOpportunityType;
  status: OiOpportunityStatus;
  organization: { name: string };
  currentScore: {
    priorityEfficiency: unknown;
    fitScore: number;
    evidenceScore: number;
    accessScore: number;
    urgencyScore: number;
    isDisqualified: boolean;
    disqualifyingRules: string[];
  } | null;
  nextActions: Array<{
    id: string;
    status: OiNextActionStatus;
    type: string;
    description: string;
    snoozedUntil?: Date | null;
    completedAt?: Date | null;
    updatedAt: Date;
    createdAt: Date;
  }>;
};

function scoreNumber(value: unknown): number {
  if (typeof value === "number") return value;
  if (value && typeof value === "object" && "toNumber" in value && typeof value.toNumber === "function") {
    return value.toNumber();
  }
  return 0;
}

export function isStaleNextAction(action: { status: OiNextActionStatus; updatedAt: Date }, asOf: Date) {
  return action.status === "open" && asOf.getTime() - action.updatedAt.getTime() >= 14 * 86_400_000;
}

export function isAwaitingManualOutreach(opportunity: Pick<PipelineOpportunity, "nextActions">) {
  const hasOpenAction = opportunity.nextActions.some((action) => action.status === "open");
  const latestCompletedAction = opportunity.nextActions.find((action) => action.status === "completed");
  return !hasOpenAction && latestCompletedAction?.type === "prepare_outreach";
}

export function isCurrentlySnoozed(opportunity: Pick<PipelineOpportunity, "nextActions">, asOf: Date) {
  return opportunity.nextActions.some(
    (action) => action.status === "snoozed" && action.snoozedUntil && action.snoozedUntil.getTime() > asOf.getTime(),
  );
}

export function needsNextActionRepair(opportunity: Pick<PipelineOpportunity, "status" | "nextActions">, asOf: Date) {
  return (
    !isTerminalOpportunityStatus(opportunity.status) &&
    opportunity.status !== "dismissed" &&
    opportunity.status !== "paused" &&
    !isAwaitingManualOutreach(opportunity) &&
    !isCurrentlySnoozed(opportunity, asOf) &&
    !opportunity.nextActions.some((action) => action.status === "open")
  );
}

export function isActivePipelineOpportunity(opportunity: Pick<PipelineOpportunity, "status" | "currentScore">) {
  return (
    !isTerminalOpportunityStatus(opportunity.status) &&
    opportunity.status !== "dismissed" &&
    opportunity.status !== "paused" &&
    !opportunity.currentScore?.isDisqualified
  );
}

export function filterPipeline(
  opportunities: PipelineOpportunity[],
  filters: { path: string; state: string; sort: string },
  asOf: Date,
) {
  const filtered = opportunities.filter((opportunity) => {
    const openAction = opportunity.nextActions.find((action) => action.status === "open");
    const pathMatches = filters.path === "all" || opportunity.type === filters.path;
    const stateMatches =
      filters.state === "active"
        ? isActivePipelineOpportunity(opportunity)
        : filters.state === "needs_action"
          ? Boolean(openAction)
          : filters.state === "waiting"
            ? opportunity.status === "contacted" || opportunity.status === "nurturing" || opportunity.status === "submitted"
            : filters.state === "stale"
              ? Boolean(openAction && isStaleNextAction(openAction, asOf))
              : filters.state === "disqualified"
                ? Boolean(opportunity.currentScore?.isDisqualified)
                : filters.state === "closed"
                  ? isTerminalOpportunityStatus(opportunity.status)
                  : true;
    return pathMatches && stateMatches;
  });

  return [...filtered].sort((left, right) => {
    if (filters.sort === "pe") {
      return scoreNumber(right.currentScore?.priorityEfficiency) - scoreNumber(left.currentScore?.priorityEfficiency);
    }
    return left.organization.name.localeCompare(right.organization.name);
  });
}
