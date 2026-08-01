export type NextActionInput = {
  opportunity: {
    type: string;
    status?: string | null;
    offerId?: string | null;
    lastActivityAt?: Date | string | null;
  };
  initiative: { status?: string | null; approvedAt?: Date | string | null } | null;
  researchGaps: Array<{ status?: string | null; blocksOutreach?: boolean | null }>;
  stakeholders: Array<{ isSelected?: boolean | null }>;
  roleProfile?: { isComplete?: boolean | null } | null;
  score?: { evidenceScore?: number | null; accessScore?: number | null } | null;
  draft?: { exists?: boolean; approved?: boolean; sent?: boolean } | null;
  followUpDue?: boolean;
  replyReceived?: boolean;
  rfpProfile?: { submissionDeadlineAt?: Date | string | null; bidDecision?: string | null } | null;
  asOf: Date;
};

export type DerivedNextAction = {
  type:
    | "approve_initiative"
    | "close_research_gap"
    | "identify_stakeholder"
    | "select_stakeholder"
    | "select_offer"
    | "complete_role_profile"
    | "prepare_outreach"
    | "review_draft"
    | "send_outreach"
    | "follow_up"
    | "log_conversation"
    | "bid_no_bid_decision"
    | "review_stale";
  description: string;
  rationale: string;
  estimatedMinutes: number;
  dueAt: Date | null;
};

function daysUntil(asOf: Date, value?: Date | string | null) {
  if (!value) return null;
  return Math.ceil((new Date(value).getTime() - asOf.getTime()) / 86_400_000);
}

function daysSince(asOf: Date, value?: Date | string | null) {
  if (!value) return null;
  return Math.floor((asOf.getTime() - new Date(value).getTime()) / 86_400_000);
}

function action(
  type: DerivedNextAction["type"],
  description: string,
  rationale: string,
  estimatedMinutes: number,
  dueAt: Date | null = null,
): DerivedNextAction {
  return { type, description, rationale, estimatedMinutes, dueAt };
}

export function deriveNextAction(input: NextActionInput): DerivedNextAction {
  const initiativeApproved =
    input.initiative?.status === "active" ||
    input.initiative?.status === "evidenced" ||
    Boolean(input.initiative?.approvedAt);
  if (!initiativeApproved) {
    return action("approve_initiative", "Approve the initiative", "No approved initiative is linked yet.", 5, input.asOf);
  }
  if (input.researchGaps.some((gap) => gap.status === "open" && gap.blocksOutreach)) {
    return action("close_research_gap", "Close the blocking research gap", "A blocking research gap prevents outreach.", 20, input.asOf);
  }
  if (input.stakeholders.length === 0) {
    return action("identify_stakeholder", "Identify the right stakeholder", "No stakeholder is identified for this opportunity.", 15, input.asOf);
  }
  if (!input.stakeholders.some((stakeholder) => stakeholder.isSelected)) {
    return action("select_stakeholder", "Select the target stakeholder", "A stakeholder exists, but none is selected.", 5, input.asOf);
  }
  if (["consulting", "assessment", "fractional", "partnership"].includes(input.opportunity.type) && !input.opportunity.offerId) {
    return action("select_offer", "Select the offer", "Consulting opportunities need an offer before outreach.", 5, input.asOf);
  }
  if (input.opportunity.type === "fte" && !input.roleProfile?.isComplete) {
    return action("complete_role_profile", "Complete the role profile", "The FTE role profile is incomplete.", 10, input.asOf);
  }
  const rfpDays = daysUntil(input.asOf, input.rfpProfile?.submissionDeadlineAt);
  if (input.opportunity.type === "rfp" && rfpDays !== null && rfpDays < 7 && !input.rfpProfile?.bidDecision) {
    return action("bid_no_bid_decision", "Make the bid or no-bid decision", "The RFP deadline is inside seven days.", 20, input.asOf);
  }
  if (!input.draft?.exists) {
    return action("prepare_outreach", "Prepare outreach", "All prerequisites are met and no draft exists.", 20, input.asOf);
  }
  if (input.draft.exists && !input.draft.approved) {
    return action("review_draft", "Review the outreach draft", "A draft exists but has not been approved.", 10, input.asOf);
  }
  if (input.draft.approved && !input.draft.sent) {
    return action("send_outreach", "Send the approved outreach", "The draft is approved but has not been sent.", 5, input.asOf);
  }
  if (input.followUpDue) {
    return action("follow_up", "Follow up", "Follow-up is due.", 10, input.asOf);
  }
  if (input.replyReceived) {
    return action("log_conversation", "Log the conversation", "A reply was received and needs to be captured.", 5, input.asOf);
  }
  const inactiveDays = daysSince(input.asOf, input.opportunity.lastActivityAt);
  if (inactiveDays !== null && inactiveDays >= 14) {
    return action("review_stale", "Review stale opportunity", "No activity has been recorded in 14 days.", 5, input.asOf);
  }
  return action("prepare_outreach", "Prepare outreach", "No later workflow action is due.", 20, input.asOf);
}
