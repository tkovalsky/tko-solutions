import { describe, expect, it, vi } from "vitest";
import { filterPipeline, isStaleNextAction } from "./page";

vi.mock("@/lib/tif/db", () => ({
  tifDb: {
    oiOpportunity: {
      findMany: vi.fn(),
    },
  },
}));

const AS_OF = new Date("2026-08-01T12:00:00Z");

describe("opportunity pipeline filters", () => {
  it("composes path and state filters, then sorts by PE", () => {
    const rows = filterPipeline(
      [
        opportunity("consulting-1", "consulting", "researching", 1000, "Example A"),
        opportunity("fte-1", "fte", "qualified", 310, "Example B"),
        opportunity("fte-2", "fte", "contacted", 700, "Example C"),
      ],
      { path: "fte", state: "active", sort: "pe" },
      AS_OF,
    );

    expect(rows.map((row) => row.id)).toEqual(["fte-2", "fte-1"]);
  });

  it("fires stale detection at the 14 day boundary", () => {
    expect(isStaleNextAction(actionDaysOld(13), AS_OF)).toBe(false);
    expect(isStaleNextAction(actionDaysOld(14), AS_OF)).toBe(true);
    expect(isStaleNextAction(actionDaysOld(15), AS_OF)).toBe(true);
  });

  it("counts missing open next actions through the no-action fixture shape", () => {
    const rows = [
      opportunity("has-action", "assessment", "researching", 10, "Example A"),
      { ...opportunity("no-action", "assessment", "researching", 20, "Example B"), nextActions: [] },
    ];

    expect(rows.filter((row) => !row.nextActions.some((action) => action.status === "open")).map((row) => row.id)).toEqual([
      "no-action",
    ]);
  });
});

function actionDaysOld(days: number) {
  return {
    id: `action-${days}`,
    status: "open" as const,
    type: "prepare_outreach",
    description: "Prepare outreach",
    createdAt: new Date(AS_OF.getTime() - days * 86_400_000),
    updatedAt: new Date(AS_OF.getTime() - days * 86_400_000),
  };
}

function opportunity(id: string, type: "consulting" | "fte" | "assessment", status: "researching" | "qualified" | "contacted", pe: number, account: string) {
  return {
    id,
    title: `${account} opportunity`,
    type,
    status,
    organization: { name: account },
    currentScore: {
      priorityEfficiency: pe,
      fitScore: 80,
      evidenceScore: 80,
      accessScore: 50,
      urgencyScore: 10,
    },
    nextActions: [actionDaysOld(1)],
  };
}
