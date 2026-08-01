import type { OiNextActionStatus, OiOpportunityStatus, OiOpportunityType } from "@prisma/client";
import { isTerminalOpportunityStatus } from "@/lib/opportunity-intelligence/commercial/lifecycle";

export type TodayQueueOpportunity = {
  id: string;
  type: OiOpportunityType;
  status: OiOpportunityStatus;
  lastActivityAt?: Date | string | null;
  initiative?: { confidence?: number | null } | null;
  currentScore?: {
    priorityEfficiency?: number | string | { toNumber(): number } | null;
    urgencyScore?: number | null;
  } | null;
  nextActions?: Array<{
    status: OiNextActionStatus;
    dueAt?: Date | string | null;
    snoozedUntil?: Date | string | null;
  }>;
};

const MAX_TODAY_QUEUE = 5;
const MIN_INITIATIVE_CONFIDENCE = 30;
const PATH_DIVERSITY_PE_FLOOR = 300;
const SUPPRESSED_STATUSES = new Set<OiOpportunityStatus>(["dismissed", "paused"]);

export function buildTodayQueue<T extends TodayQueueOpportunity>(opportunities: T[], asOf: Date): T[] {
  const eligible = opportunities.filter((opportunity) => isEligibleForToday(opportunity, asOf));
  const ranked = [...eligible].sort((left, right) => compareTodayOpportunities(left, right, asOf));
  return enforcePathDiversity(ranked, eligible).slice(0, MAX_TODAY_QUEUE);
}

export function isEligibleForToday(opportunity: TodayQueueOpportunity, asOf: Date) {
  if (SUPPRESSED_STATUSES.has(opportunity.status) || isTerminalOpportunityStatus(opportunity.status)) return false;
  if ((opportunity.initiative?.confidence ?? 0) < MIN_INITIATIVE_CONFIDENCE) return false;
  if (opportunity.nextActions?.some((action) => isSnoozed(action, asOf))) return false;
  return true;
}

export function isOverdueToday(opportunity: TodayQueueOpportunity, asOf: Date) {
  return Boolean(
    opportunity.nextActions?.some(
      (action) => action.status === "open" && action.dueAt && new Date(action.dueAt).getTime() < asOf.getTime(),
    ),
  );
}

function compareTodayOpportunities(left: TodayQueueOpportunity, right: TodayQueueOpportunity, asOf: Date) {
  const leftOverdue = isOverdueToday(left, asOf);
  const rightOverdue = isOverdueToday(right, asOf);
  if (leftOverdue !== rightOverdue) return leftOverdue ? -1 : 1;

  const leftPe = numeric(left.currentScore?.priorityEfficiency);
  const rightPe = numeric(right.currentScore?.priorityEfficiency);
  const higherPe = Math.max(leftPe, rightPe);
  const lowerPe = Math.min(leftPe, rightPe);
  if (higherPe > 0 && lowerPe / higherPe >= 0.85) {
    const urgencyDelta = (right.currentScore?.urgencyScore ?? 0) - (left.currentScore?.urgencyScore ?? 0);
    if (urgencyDelta !== 0) return urgencyDelta;
  }
  if (rightPe !== leftPe) return rightPe - leftPe;

  return dateMs(left.lastActivityAt) - dateMs(right.lastActivityAt);
}

function enforcePathDiversity<T extends TodayQueueOpportunity>(ranked: T[], eligible: T[]) {
  const top = ranked.slice(0, MAX_TODAY_QUEUE);
  const hasConsulting = top.some((opportunity) => opportunity.type === "consulting");
  const hasFte = top.some((opportunity) => opportunity.type === "fte");
  const consultingCandidate = eligible.find(
    (opportunity) => opportunity.type === "consulting" && numeric(opportunity.currentScore?.priorityEfficiency) > PATH_DIVERSITY_PE_FLOOR,
  );
  const fteCandidate = eligible.find(
    (opportunity) => opportunity.type === "fte" && numeric(opportunity.currentScore?.priorityEfficiency) > PATH_DIVERSITY_PE_FLOOR,
  );

  if (top.length < MAX_TODAY_QUEUE || (hasConsulting && hasFte) || !consultingCandidate || !fteCandidate) return top;

  const replacement = hasConsulting ? fteCandidate : consultingCandidate;
  if (top.some((opportunity) => opportunity.id === replacement.id)) return top;
  return [...top.slice(0, MAX_TODAY_QUEUE - 1), replacement];
}

function isSnoozed(action: { status: OiNextActionStatus; snoozedUntil?: Date | string | null }, asOf: Date) {
  return action.status === "snoozed" || Boolean(action.snoozedUntil && new Date(action.snoozedUntil).getTime() > asOf.getTime());
}

function numeric(value: TodayQueueOpportunity["currentScore"] extends infer Score ? Score extends object ? Score[keyof Score] : never : never) {
  if (typeof value === "number") return value;
  if (typeof value === "string") return Number(value);
  if (value && typeof value === "object" && "toNumber" in value) return value.toNumber();
  return 0;
}

function dateMs(value?: Date | string | null) {
  return value ? new Date(value).getTime() : 0;
}
