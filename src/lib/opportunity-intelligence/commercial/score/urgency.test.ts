import { describe, expect, it } from "vitest";
import { scoreUrgency } from "./urgency";

const AS_OF = new Date("2026-08-01T12:00:00Z");

describe("scoreUrgency", () => {
  it("scores all urgency signals and caps the axis at 100", () => {
    const result = scoreUrgency({
      facts: [
        fact("urgency", "cms regulatory mandate deadline first 90 days stalled delayed fiscal year end concentrated hiring"),
        fact("hiring", "3+ related roles multiple roles"),
      ],
      roleProfile: { closesAt: "2026-08-10T12:00:00Z" },
      rfpProfile: { submissionDeadlineAt: "2026-08-20T12:00:00Z" },
      asOf: AS_OF,
    });

    expect(result.total).toBe(100);
    expect(points(result, "regulatory_deadline")).toBe(30);
    expect(points(result, "posting_closes")).toBe(25);
    expect(points(result, "rfp_deadline")).toBe(30);
    expect(points(result, "new_executive")).toBe(20);
    expect(points(result, "concentrated_hiring")).toBe(15);
    expect(points(result, "stalled_program")).toBe(20);
    expect(points(result, "fiscal_year_end")).toBe(10);
  });

  it("scores stated urgency when it is not one of the stronger named signals", () => {
    const result = scoreUrgency({
      facts: [fact("urgency", "buyer asked for a decision this month")],
      roleProfile: { closesAt: "2026-08-16T12:00:00Z" },
      rfpProfile: { submissionDeadlineAt: "2026-08-23T12:00:00Z" },
      asOf: AS_OF,
    });

    expect(result.total).toBe(15);
    expect(points(result, "stated_urgency")).toBe(15);
    expect(points(result, "posting_closes")).toBe(0);
    expect(points(result, "rfp_deadline")).toBe(0);
  });

  it("scores zero when no timing evidence exists", () => {
    const result = scoreUrgency({ facts: [], roleProfile: null, rfpProfile: null, asOf: AS_OF });

    expect(result.total).toBe(0);
    expect(result.components.every((component) => component.points === 0)).toBe(true);
  });
});

function fact(field: string, normalizedValue: string) {
  return { field, value: normalizedValue, normalizedValue, basis: "stated" as const, confidence: 90, isOperatorOverride: false };
}

function points(result: ReturnType<typeof scoreUrgency>, key: string) {
  return result.components.find((component) => component.key === key)?.points;
}
