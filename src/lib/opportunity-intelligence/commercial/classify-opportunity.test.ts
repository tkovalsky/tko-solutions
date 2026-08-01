import { describe, expect, it } from "vitest";
import { classifyOpportunity } from "./classify-opportunity";

describe("classifyOpportunity", () => {
  it("classifies a Director-level payer posting as FTE and consulting when compensation is below floor", () => {
    const candidates = classifyOpportunity({
      sourceType: "job_posting",
      signalType: "senior_role_posting",
      rawContent: "Director, Prior Authorization Transformation. Compensation $190k - $210k. Own PA program.",
      organization: { kind: "payer" },
    });

    expect(candidates).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ type: "fte", disqualified: true, disqualifyingRule: "compensation_floor" }),
        expect.objectContaining({ type: "consulting", disqualified: false }),
      ]),
    );
  });

  it("classifies a Director-level payer posting above floor as FTE and consulting", () => {
    expect(
      classifyOpportunity({
        sourceType: "job_posting",
        signalType: "senior_role_posting",
        rawContent: "Director, Care Management Transformation. Compensation $240k - $270k.",
        organization: { kind: "payer" },
      }).map((candidate) => candidate.type),
    ).toEqual(["fte", "consulting"]);
  });

  it("returns no candidate for a lone leadership appointment", () => {
    expect(
      classifyOpportunity({
        sourceType: "company_announcement",
        signalType: "leadership_appointment",
        rawContent: "Jane Smith was appointed chief operating officer.",
      }),
    ).toEqual([]);
  });

  it("classifies procurement domains as RFP candidates", () => {
    expect(
      classifyOpportunity({
        sourceType: "other",
        signalType: "rfp_published",
        rawContent: "Supplier notice",
        canonicalUrl: "https://procurement.example.com/bids/123",
      }),
    ).toEqual([expect.objectContaining({ type: "rfp" })]);
  });

  it("covers transformation, stalled program, partnership, and fractional rules", () => {
    expect(
      classifyOpportunity({
        sourceType: "company_announcement",
        signalType: "transformation_announcement",
        rawContent: "Transformation announced.",
      }).map((candidate) => candidate.type),
    ).toEqual(["consulting", "assessment"]);
    expect(
      classifyOpportunity({
        sourceType: "company_announcement",
        signalType: "stalled_program",
        rawContent: "Program is stalled.",
      }),
    ).toEqual([expect.objectContaining({ type: "consulting" })]);
    expect(
      classifyOpportunity({
        sourceType: "company_announcement",
        signalType: "general_news",
        rawContent: "Consulting firm needs senior capability.",
        organization: { kind: "consulting" },
      }),
    ).toEqual([expect.objectContaining({ type: "partnership" })]);
    expect(
      classifyOpportunity({
        sourceType: "company_announcement",
        signalType: "general_news",
        rawContent: "Seeking fractional advisor support.",
      }),
    ).toEqual([expect.objectContaining({ type: "fractional" })]);
  });
});
