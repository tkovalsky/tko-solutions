import { describe, expect, it } from "vitest";
import { buildRecentChanges } from "./changes";

describe("buildRecentChanges", () => {
  it("returns changes inside the last 48 hours capped at six", () => {
    const asOf = new Date("2026-08-01T12:00:00Z");
    const changes = Array.from({ length: 8 }, (_, index) => ({
      id: `change-${index}`,
      label: `Change ${index}`,
      changedAt: new Date(asOf.getTime() - index * 60 * 60 * 1000),
    }));

    const result = buildRecentChanges([...changes, { id: "old", label: "Old", changedAt: "2026-07-29T11:00:00Z" }], asOf);

    expect(result).toHaveLength(6);
    expect(result.map((change) => change.id)).not.toContain("old");
    expect(result[0].id).toBe("change-0");
  });

  it("includes changes exactly at the 48-hour boundary and excludes one millisecond before it", () => {
    const asOf = new Date("2026-08-01T12:00:00Z");
    const result = buildRecentChanges(
      [
        { id: "boundary", label: "Boundary", changedAt: new Date(asOf.getTime() - 48 * 60 * 60 * 1000) },
        { id: "too-old", label: "Too old", changedAt: new Date(asOf.getTime() - 48 * 60 * 60 * 1000 - 1) },
        { id: "future", label: "Future", changedAt: new Date(asOf.getTime() + 1) },
      ],
      asOf,
    );

    expect(result.map((change) => change.id)).toEqual(["boundary"]);
  });

  it("keeps the six newest changes after sorting", () => {
    const asOf = new Date("2026-08-01T12:00:00Z");
    const changes = Array.from({ length: 7 }, (_, index) => ({
      id: `change-${index}`,
      label: `Change ${index}`,
      changedAt: new Date(asOf.getTime() - (6 - index) * 60 * 1000),
    }));

    expect(buildRecentChanges(changes, asOf).map((change) => change.id)).toEqual([
      "change-6",
      "change-5",
      "change-4",
      "change-3",
      "change-2",
      "change-1",
    ]);
  });
});
