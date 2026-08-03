import type { OiDecisionType, OiOpportunityStatus, OiOpportunityType } from "@prisma/client";

export type TransitionResult =
  | { ok: true; requiresReason: boolean }
  | { ok: false; blockingReason: string; requiresReason: boolean };

const TERMINAL_STATUSES = new Set<OiOpportunityStatus>([
  "closed",
  "dismissed",
  "won",
  "accepted",
  "lost",
  "declined",
  "rejected",
  "no_bid",
  "no_response",
]);

const SHARED_TRANSITIONS: Partial<Record<OiOpportunityStatus, OiOpportunityStatus[]>> = {
  identified: ["qualifying"],
  reviewing: ["qualifying"],
  qualifying: ["qualified"],
};

const TYPE_TRANSITIONS: Record<OiOpportunityType, Partial<Record<OiOpportunityStatus, OiOpportunityStatus[]>>> = {
  consulting: {
    qualified: ["researching"],
    researching: ["outreach_ready", "paused"],
    outreach_ready: ["contacted"],
    contacted: ["conversation", "nurturing"],
    conversation: ["diagnostic_scoped", "paused"],
    diagnostic_scoped: ["proposal_sent"],
    proposal_sent: ["won", "lost"],
    nurturing: ["contacted"],
    paused: ["researching"],
  },
  fractional: {
    qualified: ["researching"],
    researching: ["outreach_ready", "paused"],
    outreach_ready: ["contacted"],
    contacted: ["conversation", "nurturing"],
    conversation: ["diagnostic_scoped", "paused"],
    diagnostic_scoped: ["proposal_sent"],
    proposal_sent: ["won", "lost"],
    nurturing: ["contacted"],
    paused: ["researching"],
  },
  assessment: {
    qualified: ["researching"],
    researching: ["outreach_ready", "paused"],
    outreach_ready: ["contacted"],
    contacted: ["conversation", "nurturing"],
    conversation: ["diagnostic_scoped", "paused"],
    diagnostic_scoped: ["proposal_sent"],
    proposal_sent: ["won", "lost"],
    nurturing: ["contacted"],
    paused: ["researching"],
  },
  fte: {
    qualified: ["researching"],
    researching: ["application_ready", "paused"],
    application_ready: ["applied"],
    applied: ["recruiter_screen", "no_response", "paused"],
    recruiter_screen: ["hiring_manager", "rejected", "paused"],
    hiring_manager: ["interview_loop", "paused"],
    interview_loop: ["offer", "rejected", "paused"],
    offer: ["accepted", "declined", "paused"],
    paused: ["researching"],
  },
  rfp: {
    identified: ["rfp_intake"],
    rfp_intake: ["qualifying"],
    qualifying: ["no_bid", "bid_as_prime", "seeking_partner", "paused"],
    seeking_partner: ["bid_as_sub", "no_bid", "paused"],
    bid_as_prime: ["submitted", "paused"],
    bid_as_sub: ["submitted", "paused"],
    submitted: ["shortlisted", "lost", "paused"],
    shortlisted: ["won", "lost", "paused"],
    paused: ["rfp_intake"],
  },
  partnership: {
    qualified: ["researching"],
    researching: ["outreach_ready", "paused"],
    outreach_ready: ["contacted"],
    contacted: ["capability_shared", "nurturing", "paused"],
    capability_shared: ["agreement_discussion", "paused"],
    agreement_discussion: ["won", "lost", "paused"],
    nurturing: ["contacted"],
    paused: ["researching"],
  },
};

const ALL_NON_TERMINAL_STATUSES: OiOpportunityStatus[] = [
  "identified",
  "reviewing",
  "qualifying",
  "qualified",
  "researching",
  "paused",
  "outreach_ready",
  "contacted",
  "conversation",
  "nurturing",
  "diagnostic_scoped",
  "proposal_sent",
  "capability_shared",
  "agreement_discussion",
  "application_ready",
  "applied",
  "recruiter_screen",
  "hiring_manager",
  "interview_loop",
  "offer",
  "rfp_intake",
  "seeking_partner",
  "bid_as_prime",
  "bid_as_sub",
  "submitted",
  "shortlisted",
];

export function canTransition(input: {
  type: OiOpportunityType;
  from: OiOpportunityStatus;
  to: OiOpportunityStatus;
  reason?: string | null;
}): TransitionResult {
  const requiresReason = input.to === "paused" || TERMINAL_STATUSES.has(input.to);
  if (input.from === input.to) {
    return { ok: false, blockingReason: "Opportunity is already in that status.", requiresReason };
  }

  if (TERMINAL_STATUSES.has(input.from)) {
    return { ok: false, blockingReason: `Cannot transition from terminal status ${input.from}.`, requiresReason };
  }

  const validTargets = validTargetsFor(input.type, input.from);
  if (!validTargets.includes(input.to)) {
    return {
      ok: false,
      blockingReason: `${input.type} opportunities cannot transition from ${input.from} to ${input.to}.`,
      requiresReason,
    };
  }

  if (requiresReason && !input.reason?.trim()) {
    return { ok: false, blockingReason: `A reason is required to move an opportunity to ${input.to}.`, requiresReason };
  }

  return { ok: true, requiresReason };
}

export function validTargetsFor(type: OiOpportunityType, from: OiOpportunityStatus): OiOpportunityStatus[] {
  if (TERMINAL_STATUSES.has(from)) return [];
  const shared = type === "rfp" ? [] : SHARED_TRANSITIONS[from] ?? [];
  const specific = TYPE_TRANSITIONS[type][from] ?? [];
  const universal = ALL_NON_TERMINAL_STATUSES.includes(from) ? (["closed", "dismissed"] as OiOpportunityStatus[]) : [];
  return [...new Set([...shared, ...specific, ...universal])];
}

export function isTerminalOpportunityStatus(status: OiOpportunityStatus) {
  return TERMINAL_STATUSES.has(status);
}

// Rule 9: pausing or terminating an opportunity commits Todd's time and reputation, so the
// prediction must be recorded before the outcome is known. This is the same predicate
// `canTransition` uses for `requiresReason` — a decision-requiring transition and a
// reason-requiring transition are deliberately the same set.
export function requiresDecisionCapture(status: OiOpportunityStatus) {
  return status === "paused" || TERMINAL_STATUSES.has(status);
}

// Derived server-side so every route into a lifecycle transition writes the same decision
// type, whether it came from a decision-gated control or the generic status form.
const DECISION_TYPE_BY_STATUS: Partial<Record<OiOpportunityStatus, OiDecisionType>> = {
  qualified: "qualify_opportunity",
  dismissed: "disqualify_opportunity",
  paused: "pause_opportunity",
  closed: "close_opportunity",
  won: "close_opportunity",
  accepted: "close_opportunity",
  lost: "close_opportunity",
  declined: "close_opportunity",
  rejected: "close_opportunity",
  no_bid: "close_opportunity",
  no_response: "close_opportunity",
};

export function decisionTypeForStatus(status: OiOpportunityStatus): OiDecisionType | null {
  return DECISION_TYPE_BY_STATUS[status] ?? null;
}
