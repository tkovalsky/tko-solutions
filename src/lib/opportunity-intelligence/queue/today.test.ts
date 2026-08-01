import { describe, expect, it } from "vitest";
import { buildTodayQueue, isSnoozed } from "./today";

const asOf = new Date("2026-08-01T12:00:00Z");

describe("buildTodayQueue", () => {
  it("caps the queue at five opportunities", () => {
    const queue = buildTodayQueue(Array.from({ length: 7 }, (_, index) => opportunity(`opp-${index}`, { pe: 1000 - index })), asOf);

    expect(queue).toHaveLength(5);
  });

  it.each([
    ["dismissed", opportunity("dismissed", { status: "dismissed" })],
    ["paused", opportunity("paused", { status: "paused" })],
    ["terminal", opportunity("terminal", { status: "won" })],
    ["snoozed", opportunity("snoozed", { actionStatus: "snoozed", snoozedUntil: "2026-08-04T12:00:00Z" })],
  ])("suppresses %s opportunities", (_label, candidate) => {
    expect(buildTodayQueue([candidate, opportunity("active")], asOf).map((item) => item.id)).toEqual(["active"]);
  });

  it("excludes opportunities whose initiative confidence is below 0.30", () => {
    expect(buildTodayQueue([opportunity("low", { confidence: 29 }), opportunity("ok", { confidence: 30 })], asOf)).toHaveLength(1);
  });

  it("orders overdue opportunities ahead of higher-PE work", () => {
    const queue = buildTodayQueue(
      [
        opportunity("higher-pe", { pe: 1000, dueAt: "2026-08-03T12:00:00Z" }),
        opportunity("overdue", { pe: 100, dueAt: "2026-07-31T12:00:00Z" }),
      ],
      asOf,
    );

    expect(queue[0].id).toBe("overdue");
  });

  it("forces at least one FTE item when pure PE ranking would return five consulting items", () => {
    const consulting = Array.from({ length: 5 }, (_, index) => opportunity(`consulting-${index}`, { pe: 1000 - index, type: "consulting" }));
    const queue = buildTodayQueue([...consulting, opportunity("fte-1", { pe: 350, type: "fte" })], asOf);

    expect(queue).toHaveLength(5);
    expect(queue.some((item) => item.type === "fte")).toBe(true);
  });

  it.each([
    ["3d", "2026-08-04T12:00:00Z"],
    ["1w", "2026-08-08T12:00:00Z"],
    ["2w", "2026-08-15T12:00:00Z"],
  ])("suppresses only before %s snooze expiry and requeues at the boundary", (_duration, expiry) => {
    const candidate = opportunity("snoozed", { actionStatus: "snoozed", snoozedUntil: expiry });
    const oneSecondBefore = new Date(new Date(expiry).getTime() - 1_000);
    const atExpiry = new Date(expiry);
    const oneSecondAfter = new Date(new Date(expiry).getTime() + 1_000);

    expect(isSnoozed(candidate.nextActions[0], oneSecondBefore)).toBe(true);
    expect(buildTodayQueue([candidate], oneSecondBefore)).toEqual([]);

    expect(isSnoozed(candidate.nextActions[0], atExpiry)).toBe(false);
    expect(buildTodayQueue([candidate], atExpiry).map((item) => item.id)).toEqual(["snoozed"]);

    expect(isSnoozed(candidate.nextActions[0], oneSecondAfter)).toBe(false);
    expect(buildTodayQueue([candidate], oneSecondAfter).map((item) => item.id)).toEqual(["snoozed"]);
  });
});

function opportunity(
  id: string,
  overrides: {
    type?: "consulting" | "fte";
    status?: "researching" | "dismissed" | "paused" | "won";
    pe?: number;
    confidence?: number;
    dueAt?: string;
    actionStatus?: "open" | "snoozed";
    snoozedUntil?: string;
  } = {},
) {
  return {
    id,
    type: overrides.type ?? "consulting",
    status: overrides.status ?? "researching",
    lastActivityAt: "2026-07-01T12:00:00Z",
    initiative: { confidence: overrides.confidence ?? 80 },
    currentScore: { priorityEfficiency: overrides.pe ?? 500, urgencyScore: 10 },
    nextActions: [
      {
        status: overrides.actionStatus ?? "open",
        dueAt: overrides.dueAt ?? "2026-08-02T12:00:00Z",
        snoozedUntil: overrides.snoozedUntil,
      },
    ],
  };
}
