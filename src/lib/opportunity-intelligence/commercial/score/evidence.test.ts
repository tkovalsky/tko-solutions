import { describe, expect, it } from "vitest";
import { scoreEvidence } from "./evidence";

const AS_OF = new Date("2026-08-01T12:00:00Z");

describe("scoreEvidence", () => {
  it("scores the full evidence axis when every proof input is present", () => {
    const result = scoreEvidence({
      facts: [
        fact("business_problem", "stated problem", "stated", 90),
        fact("technology", "FHIR", "inferred", 70),
      ],
      initiative: { status: "evidenced", approvedAt: null },
      stakeholders: [{ roleEvidenceUrl: "https://example.com/person", roleConfidence: 80 }],
      sources: [
        { publishedAt: "2026-07-20T12:00:00Z", retrievedAt: "2026-07-21T12:00:00Z", isPrimary: true },
        { publishedAt: "2026-07-18T12:00:00Z", retrievedAt: "2026-07-19T12:00:00Z", isPrimary: false },
      ],
      researchGaps: [],
      asOf: AS_OF,
    });

    expect(result.total).toBe(100);
    expect(points(result, "verified_offsets")).toBe(15);
    expect(points(result, "primary_source")).toBe(10);
    expect(points(result, "recent_source")).toBe(10);
    expect(points(result, "stated_problem")).toBe(15);
    expect(points(result, "approved_initiative")).toBe(15);
    expect(points(result, "sourced_stakeholder")).toBe(15);
    expect(points(result, "no_blocking_gaps")).toBe(10);
    expect(points(result, "independent_sources")).toBe(10);
  });

  it("scores zero for missing proof inputs except no-blocking-gaps", () => {
    const result = scoreEvidence({
      facts: [fact("business_problem", "inferred problem", "inferred", 70)],
      initiative: null,
      stakeholders: [],
      sources: [{ publishedAt: "2026-05-01T12:00:00Z", isPrimary: false }],
      researchGaps: [],
      asOf: AS_OF,
    });

    expect(result.total).toBe(10);
    expect(points(result, "no_blocking_gaps")).toBe(10);
    expect(points(result, "recent_source")).toBe(0);
    expect(points(result, "independent_sources")).toBe(0);
  });

  it("removes no-blocking-gaps credit when a blocking gap is open", () => {
    const result = scoreEvidence({
      facts: [],
      initiative: null,
      stakeholders: [],
      sources: [],
      researchGaps: [{ status: "open", blocksOutreach: true }],
      asOf: AS_OF,
    });

    expect(result.total).toBe(0);
    expect(points(result, "no_blocking_gaps")).toBe(0);
  });
});

function fact(field: string, normalizedValue: string, basis: "stated" | "inferred" | "operator", confidence: number) {
  return { field, value: normalizedValue, normalizedValue, basis, confidence, isOperatorOverride: basis === "operator" };
}

function points(result: ReturnType<typeof scoreEvidence>, key: string) {
  return result.components.find((component) => component.key === key)?.points;
}
