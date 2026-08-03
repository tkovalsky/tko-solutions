import { describe, expect, it, vi } from "vitest";
import { filterPipeline, isActivePipelineOpportunity, isAwaitingManualOutreach, isCurrentlySnoozed, isStaleNextAction, needsNextActionRepair } from "./page";

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

  it("excludes disqualified opportunities from Active and lists them under Disqualified", () => {
    const active = opportunity("active", "consulting", "researching", 1000, "Example A");
    const disqualified = {
      ...opportunity("disqualified", "consulting", "researching", 0, "Example B"),
      currentScore: {
        ...opportunity("disqualified", "consulting", "researching", 0, "Example B").currentScore,
        isDisqualified: true,
        disqualifyingRules: ["DQ_VALUE_FLOOR"],
      },
    };

    expect(filterPipeline([active, disqualified], { path: "all", state: "active", sort: "pe" }, AS_OF).map((row) => row.id)).toEqual(["active"]);
    expect(filterPipeline([active, disqualified], { path: "all", state: "disqualified", sort: "pe" }, AS_OF).map((row) => row.id)).toEqual(["disqualified"]);
    expect(disqualified.currentScore.disqualifyingRules).toEqual(["DQ_VALUE_FLOOR"]);
  });

  it("uses the same active predicate for the pipeline header count", () => {
    const rows = [
      opportunity("active", "assessment", "researching", 10, "Example A"),
      { ...opportunity("closed", "assessment", "closed", 20, "Example B"), status: "closed" as const },
      {
        ...opportunity("disqualified", "assessment", "researching", 30, "Example C"),
        currentScore: {
          ...opportunity("disqualified", "assessment", "researching", 30, "Example C").currentScore,
          isDisqualified: true,
          disqualifyingRules: ["DQ_NO_ACCESS_PATH"],
        },
      },
    ];

    expect(rows.filter(isActivePipelineOpportunity).map((row) => row.id)).toEqual(["active"]);
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

    expect(rows.filter((row) => needsNextActionRepair(row, AS_OF)).map((row) => row.id)).toEqual([
      "no-action",
    ]);
  });

  it("excludes awaiting manual outreach from the missing next action defect row", () => {
    const awaiting = {
      ...opportunity("awaiting", "consulting", "researching", 20, "Example B"),
      nextActions: [
        {
          ...actionDaysOld(1),
          status: "completed" as const,
          type: "prepare_outreach",
          completedAt: new Date("2026-08-01T12:00:00Z"),
        },
      ],
    };

    expect(isAwaitingManualOutreach(awaiting)).toBe(true);
    expect(needsNextActionRepair(awaiting, AS_OF)).toBe(false);
  });

  it("excludes currently snoozed opportunities from the missing next action defect row", () => {
    const snoozed = {
      ...opportunity("snoozed", "consulting", "researching", 20, "Example C"),
      nextActions: [
        {
          ...actionDaysOld(1),
          status: "snoozed" as const,
          snoozedUntil: new Date("2026-08-04T12:00:00Z"),
        },
      ],
    };

    expect(isCurrentlySnoozed(snoozed, AS_OF)).toBe(true);
    expect(needsNextActionRepair(snoozed, AS_OF)).toBe(false);
  });
});

function actionDaysOld(days: number) {
  return {
    id: `action-${days}`,
    status: "open" as const,
    type: "prepare_outreach",
    description: "Prepare outreach",
    snoozedUntil: null,
    completedAt: null,
    createdAt: new Date(AS_OF.getTime() - days * 86_400_000),
    updatedAt: new Date(AS_OF.getTime() - days * 86_400_000),
  };
}

function opportunity(id: string, type: "consulting" | "fte" | "assessment", status: "researching" | "qualified" | "contacted" | "closed", pe: number, account: string) {
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
      isDisqualified: false,
      disqualifyingRules: [],
    },
    nextActions: [actionDaysOld(1)],
  };
}
