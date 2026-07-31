import { describe, expect, it } from "vitest";
import { extractOpportunity, verifyEvidenceOffsets } from "./extract";

const SOURCE = `Vice President, Healthcare Transformation
Reports directly to the COO and will lead a rapid modernization of payer operations.
Own delivery of a new operating model using FHIR, Epic, and Snowflake.
The program must reduce prior authorization turnaround costs in the first 90 days.
Compensation: $220,000 - $275,000 per year.`;

describe("extractOpportunity", () => {
  it("extracts repeated facts while retaining byte-exact source offsets", () => {
    const result = extractOpportunity(SOURCE);
    const technologies = result.facts.filter((fact) => fact.field === "technology");

    expect(technologies.map((fact) => fact.value)).toEqual(["Snowflake", "Epic", "FHIR"]);
    expect(result.facts.every((fact) => verifyEvidenceOffsets(SOURCE, fact))).toBe(true);
    for (const fact of result.facts) {
      expect(SOURCE.slice(fact.startOffset, fact.endOffset)).toBe(fact.excerpt);
    }
  });

  it("creates a thesis gap instead of synthesizing a commercial conclusion", () => {
    const result = extractOpportunity(SOURCE);

    expect(result.researchGaps).toContainEqual(
      expect.objectContaining({ gapKey: "opportunity_thesis_missing" }),
    );
    expect(result.facts.some((fact) => fact.field === "opportunity_thesis")).toBe(false);
  });

  it("creates stable, field-specific gaps for missing thesis inputs", () => {
    const result = extractOpportunity("Director of Operations");
    const keys = result.researchGaps.map((gap) => gap.gapKey);

    expect(keys).toContain("reporting_line_missing");
    expect(keys).toContain("business_problem_missing");
    expect(keys).toContain("technology_missing");
    expect(keys).toContain("opportunity_thesis_missing");
  });
});
