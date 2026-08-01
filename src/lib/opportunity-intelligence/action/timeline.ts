export type TimelineOpportunityInput = {
  initiative?: {
    signalLinks?: Array<{
      signal: {
        id: string;
        summary: string;
        occurredAt?: Date | string | null;
        createdAt?: Date | string | null;
        source?: { canonicalUrl?: string | null } | null;
      };
    }>;
  } | null;
  activities?: Array<{
    id: string;
    type: string;
    summary: string;
    occurredAt: Date | string;
    fromStatus?: string | null;
    toStatus?: string | null;
    externalRef?: string | null;
  }>;
  decisions?: Array<{
    id: string;
    type: string;
    decision: string;
    reason: string;
    createdAt: Date | string;
  }>;
};

export type TimelineEntry = {
  id: string;
  kind: "signal" | "activity" | "status_change" | "decision";
  occurredAt: Date;
  label: string;
  sourceHref: string | null;
};

export function buildTimeline(opportunity: TimelineOpportunityInput): TimelineEntry[] {
  const signals =
    opportunity.initiative?.signalLinks?.map((link) => ({
      id: `signal:${link.signal.id}`,
      kind: "signal" as const,
      occurredAt: new Date(link.signal.occurredAt ?? link.signal.createdAt ?? 0),
      label: link.signal.summary,
      sourceHref: link.signal.source?.canonicalUrl ?? null,
    })) ?? [];

  const activities =
    opportunity.activities?.map((activity) => ({
      id: `activity:${activity.id}`,
      kind: activity.type === "status_change" ? ("status_change" as const) : ("activity" as const),
      occurredAt: new Date(activity.occurredAt),
      label:
        activity.type === "status_change" && activity.fromStatus && activity.toStatus
          ? `Status changed from ${activity.fromStatus} to ${activity.toStatus}`
          : activity.summary,
      sourceHref: activity.externalRef ?? null,
    })) ?? [];

  const decisions =
    opportunity.decisions?.map((decision) => ({
      id: `decision:${decision.id}`,
      kind: "decision" as const,
      occurredAt: new Date(decision.createdAt),
      label: `${decision.type}: ${decision.decision}. ${decision.reason}`,
      sourceHref: null,
    })) ?? [];

  return [...signals, ...activities, ...decisions].sort((left, right) => left.occurredAt.getTime() - right.occurredAt.getTime());
}
