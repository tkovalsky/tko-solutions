import type { OiOpportunityStatus, OiOpportunityType } from "@prisma/client";
import { describe, expect, it } from "vitest";
import {
  canTransition,
  decisionTypeForStatus,
  isTerminalOpportunityStatus,
  requiresDecisionCapture,
  validTargetsFor,
} from "./lifecycle";

const validByType: Record<OiOpportunityType, Array<[OiOpportunityStatus, OiOpportunityStatus]>> = {
  consulting: [
    ["identified", "qualifying"],
    ["qualifying", "qualified"],
    ["qualified", "researching"],
    ["researching", "outreach_ready"],
    ["outreach_ready", "contacted"],
    ["contacted", "conversation"],
    ["contacted", "nurturing"],
    ["conversation", "diagnostic_scoped"],
    ["diagnostic_scoped", "proposal_sent"],
    ["proposal_sent", "won"],
    ["proposal_sent", "lost"],
    ["researching", "paused"],
    ["conversation", "paused"],
    ["paused", "researching"],
  ],
  fractional: [
    ["identified", "qualifying"],
    ["qualifying", "qualified"],
    ["qualified", "researching"],
    ["researching", "outreach_ready"],
    ["outreach_ready", "contacted"],
    ["contacted", "conversation"],
    ["conversation", "diagnostic_scoped"],
    ["diagnostic_scoped", "proposal_sent"],
    ["proposal_sent", "won"],
    ["proposal_sent", "lost"],
  ],
  assessment: [
    ["identified", "qualifying"],
    ["qualifying", "qualified"],
    ["qualified", "researching"],
    ["researching", "outreach_ready"],
    ["outreach_ready", "contacted"],
    ["contacted", "conversation"],
    ["conversation", "diagnostic_scoped"],
    ["diagnostic_scoped", "proposal_sent"],
    ["proposal_sent", "won"],
    ["proposal_sent", "lost"],
  ],
  fte: [
    ["identified", "qualifying"],
    ["qualifying", "qualified"],
    ["qualified", "researching"],
    ["researching", "application_ready"],
    ["application_ready", "applied"],
    ["applied", "recruiter_screen"],
    ["applied", "no_response"],
    ["recruiter_screen", "hiring_manager"],
    ["recruiter_screen", "rejected"],
    ["hiring_manager", "interview_loop"],
    ["interview_loop", "offer"],
    ["interview_loop", "rejected"],
    ["offer", "accepted"],
    ["offer", "declined"],
  ],
  rfp: [
    ["identified", "rfp_intake"],
    ["rfp_intake", "qualifying"],
    ["qualifying", "no_bid"],
    ["qualifying", "bid_as_prime"],
    ["qualifying", "seeking_partner"],
    ["seeking_partner", "bid_as_sub"],
    ["seeking_partner", "no_bid"],
    ["bid_as_prime", "submitted"],
    ["bid_as_sub", "submitted"],
    ["submitted", "shortlisted"],
    ["submitted", "lost"],
    ["shortlisted", "won"],
    ["shortlisted", "lost"],
  ],
  partnership: [
    ["identified", "qualifying"],
    ["qualifying", "qualified"],
    ["qualified", "researching"],
    ["researching", "outreach_ready"],
    ["outreach_ready", "contacted"],
    ["contacted", "capability_shared"],
    ["contacted", "nurturing"],
    ["capability_shared", "agreement_discussion"],
    ["agreement_discussion", "won"],
    ["agreement_discussion", "lost"],
  ],
};

describe("canTransition", () => {
  it("accepts every valid transition by opportunity type", () => {
    for (const [type, transitions] of Object.entries(validByType) as Array<[OiOpportunityType, Array<[OiOpportunityStatus, OiOpportunityStatus]>]>) {
      for (const [from, to] of transitions) {
        expect(canTransition({ type, from, to, reason: "because" })).toEqual({ ok: true, requiresReason: to === "paused" || terminal(to) });
      }
    }
  });

  it("rejects invalid transitions by opportunity type", () => {
    expect(canTransition({ type: "consulting", from: "researching", to: "applied" })).toMatchObject({ ok: false });
    expect(canTransition({ type: "fte", from: "applied", to: "proposal_sent" })).toMatchObject({ ok: false });
    expect(canTransition({ type: "rfp", from: "qualifying", to: "qualified" })).toMatchObject({ ok: false });
    expect(canTransition({ type: "partnership", from: "agreement_discussion", to: "accepted", reason: "done" })).toMatchObject({ ok: false });
  });

  it("requires a reason for paused and terminal statuses", () => {
    expect(canTransition({ type: "consulting", from: "researching", to: "paused" })).toMatchObject({
      ok: false,
      blockingReason: "A reason is required to move an opportunity to paused.",
    });
    expect(canTransition({ type: "consulting", from: "proposal_sent", to: "won" })).toMatchObject({
      ok: false,
      blockingReason: "A reason is required to move an opportunity to won.",
    });
    expect(canTransition({ type: "consulting", from: "proposal_sent", to: "won", reason: "signed" })).toEqual({
      ok: true,
      requiresReason: true,
    });
  });

  it("exposes valid targets for the workbench status control", () => {
    expect(validTargetsFor("assessment", "contacted")).toEqual(["conversation", "nurturing", "closed", "dismissed"]);
  });

  it("allows close and dismiss from every non-terminal status and treats closed as terminal", () => {
    for (const type of opportunityTypes) {
      for (const status of nonTerminalStatuses) {
        expect(canTransition({ type, from: status, to: "closed", reason: "done" })).toEqual({
          ok: true,
          requiresReason: true,
        });
        expect(canTransition({ type, from: status, to: "dismissed", reason: "not a fit" })).toEqual({
          ok: true,
          requiresReason: true,
        });
      }
    }

    expect(isTerminalOpportunityStatus("closed")).toBe(true);
    expect(canTransition({ type: "consulting", from: "closed", to: "researching", reason: "reopen" })).toMatchObject({
      ok: false,
      blockingReason: "Cannot transition from terminal status closed.",
    });
  });

  it("allows pause and un-pause for fte, rfp, and partnership", () => {
    expect(canTransition({ type: "fte", from: "applied", to: "paused", reason: "waiting" })).toEqual({
      ok: true,
      requiresReason: true,
    });
    expect(canTransition({ type: "fte", from: "paused", to: "researching" })).toEqual({
      ok: true,
      requiresReason: false,
    });
    expect(canTransition({ type: "rfp", from: "submitted", to: "paused", reason: "waiting" })).toEqual({
      ok: true,
      requiresReason: true,
    });
    expect(canTransition({ type: "rfp", from: "paused", to: "rfp_intake" })).toEqual({
      ok: true,
      requiresReason: false,
    });
    expect(canTransition({ type: "partnership", from: "contacted", to: "paused", reason: "waiting" })).toEqual({
      ok: true,
      requiresReason: true,
    });
    expect(canTransition({ type: "partnership", from: "paused", to: "researching" })).toEqual({
      ok: true,
      requiresReason: false,
    });
  });
});

describe("decision capture gating", () => {
  it("requires decision capture for exactly the pause and terminal statuses", () => {
    expect(requiresDecisionCapture("paused")).toBe(true);
    for (const status of ["closed", "dismissed", "won", "accepted", "lost", "declined", "rejected", "no_bid", "no_response"] as const) {
      expect(requiresDecisionCapture(status)).toBe(true);
    }
    for (const status of ["qualified", "researching", "contacted", "conversation", "applied"] as const) {
      expect(requiresDecisionCapture(status)).toBe(false);
    }
  });

  it("maps every decision-requiring status to a decision type so no transition can skip capture", () => {
    const allStatuses: OiOpportunityStatus[] = [
      ...nonTerminalStatuses,
      "closed",
      "dismissed",
      "won",
      "accepted",
      "lost",
      "declined",
      "rejected",
      "no_bid",
      "no_response",
    ];
    for (const status of allStatuses) {
      if (!requiresDecisionCapture(status)) continue;
      expect(decisionTypeForStatus(status)).not.toBeNull();
    }
  });

  it("derives the same decision type the workbench buttons declare", () => {
    expect(decisionTypeForStatus("qualified")).toBe("qualify_opportunity");
    expect(decisionTypeForStatus("dismissed")).toBe("disqualify_opportunity");
    expect(decisionTypeForStatus("paused")).toBe("pause_opportunity");
    expect(decisionTypeForStatus("closed")).toBe("close_opportunity");
    expect(decisionTypeForStatus("won")).toBe("close_opportunity");
    expect(decisionTypeForStatus("researching")).toBeNull();
  });
});

function terminal(status: OiOpportunityStatus) {
  return ["closed", "dismissed", "won", "accepted", "lost", "declined", "rejected", "no_bid", "no_response"].includes(status);
}

const opportunityTypes: OiOpportunityType[] = ["consulting", "fractional", "assessment", "fte", "rfp", "partnership"];
const nonTerminalStatuses: OiOpportunityStatus[] = [
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
