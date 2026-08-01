import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { deriveNextAction, type NextActionInput } from "./next-action";

const AS_OF = new Date("2026-08-01T12:00:00Z");

const base: NextActionInput = {
  opportunity: { type: "consulting", offerId: "offer-1", lastActivityAt: AS_OF },
  initiative: { status: "evidenced", approvedAt: AS_OF },
  researchGaps: [],
  stakeholders: [{ isSelected: true }],
  roleProfile: { isComplete: true },
  draft: { exists: true, approved: true, sent: true },
  asOf: AS_OF,
};

function withInput(overrides: Partial<NextActionInput>) {
  return {
    ...base,
    ...overrides,
    opportunity: { ...base.opportunity, ...overrides.opportunity },
  };
}

describe("deriveNextAction", () => {
  it.each([
    ["approve_initiative", withInput({ initiative: null })],
    ["close_research_gap", withInput({ researchGaps: [{ status: "open", blocksOutreach: true }] })],
    ["identify_stakeholder", withInput({ stakeholders: [] })],
    ["select_stakeholder", withInput({ stakeholders: [{ isSelected: false }] })],
    ["select_offer", withInput({ opportunity: { type: "consulting", offerId: null } })],
    ["complete_role_profile", withInput({ opportunity: { type: "fte" }, roleProfile: { isComplete: false } })],
    ["prepare_outreach", withInput({ draft: { exists: false } })],
    ["review_draft", withInput({ draft: { exists: true, approved: false } })],
    ["send_outreach", withInput({ draft: { exists: true, approved: true, sent: false } })],
    ["follow_up", withInput({ followUpDue: true })],
    ["log_conversation", withInput({ replyReceived: true })],
    [
      "bid_no_bid_decision",
      withInput({
        opportunity: { type: "rfp" },
        rfpProfile: { submissionDeadlineAt: new Date("2026-08-05T12:00:00Z") },
        draft: { exists: true, approved: true, sent: true },
      }),
    ],
  ])("derives %s", (type, input) => {
    expect(deriveNextAction(input).type).toBe(type);
  });

  it("uses first-match-wins ordering", () => {
    const result = deriveNextAction(withInput({ initiative: null, stakeholders: [], researchGaps: [{ status: "open", blocksOutreach: true }] }));
    expect(result.type).toBe("approve_initiative");
  });

  it("implements the 14-day stale rule", () => {
    const result = deriveNextAction(
      withInput({
        opportunity: { lastActivityAt: new Date("2026-07-17T12:00:00Z") },
        draft: { exists: true, approved: true, sent: true },
      }),
    );
    expect(result.type).toBe("review_stale");
    expect(result.estimatedMinutes).toBe(5);
  });

  it("preserves the existing partial unique index for one open action per opportunity", () => {
    const migration = readFileSync(
      "prisma/migrations/20260731192634_add_pois_core/migration.sql",
      "utf8",
    );
    expect(migration).toContain('CREATE UNIQUE INDEX "OiNextAction_one_open_per_opportunity"');
    expect(migration).toContain('ON "OiNextAction" ("opportunityId") WHERE "status" = \'open\'');
  });
});
