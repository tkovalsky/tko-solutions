import type { OiOpportunityStatus, OiOpportunityType } from "@prisma/client";

export type TransitionResult =
  | { ok: true; requiresReason: boolean }
  | { ok: false; blockingReason: string; requiresReason: boolean };

const TERMINAL_STATUSES = new Set<OiOpportunityStatus>([
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
  identified: ["qualifying", "dismissed"],
  reviewing: ["qualifying", "dismissed"],
  qualifying: ["qualified", "dismissed"],
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
    researching: ["application_ready"],
    application_ready: ["applied"],
    applied: ["recruiter_screen", "no_response"],
    recruiter_screen: ["hiring_manager", "rejected"],
    hiring_manager: ["interview_loop"],
    interview_loop: ["offer", "rejected"],
    offer: ["accepted", "declined"],
  },
  rfp: {
    identified: ["rfp_intake", "dismissed"],
    rfp_intake: ["qualifying"],
    qualifying: ["no_bid", "bid_as_prime", "seeking_partner"],
    seeking_partner: ["bid_as_sub", "no_bid"],
    bid_as_prime: ["submitted"],
    bid_as_sub: ["submitted"],
    submitted: ["shortlisted", "lost"],
    shortlisted: ["won", "lost"],
  },
  partnership: {
    qualified: ["researching"],
    researching: ["outreach_ready"],
    outreach_ready: ["contacted"],
    contacted: ["capability_shared", "nurturing"],
    capability_shared: ["agreement_discussion"],
    agreement_discussion: ["won", "lost"],
    nurturing: ["contacted"],
  },
};

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
  const shared = type === "rfp" ? [] : SHARED_TRANSITIONS[from] ?? [];
  const specific = TYPE_TRANSITIONS[type][from] ?? [];
  return [...new Set([...shared, ...specific])];
}

export function isTerminalOpportunityStatus(status: OiOpportunityStatus) {
  return TERMINAL_STATUSES.has(status);
}
