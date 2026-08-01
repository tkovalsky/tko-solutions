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
});
