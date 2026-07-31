import { describe, expect, it } from "vitest";
import type { OpportunityFactForScoring } from "../../contracts";
import { scoreOpportunityFit } from "./fit";

const fact = (field: string, value: string): OpportunityFactForScoring => ({
  field,
  value,
  normalizedValue: value.toLowerCase(),
  basis: "stated",
  confidence: 90,
  isOperatorOverride: false,
});

describe("scoreOpportunityFit", () => {
  it("is deterministic, versioned, and separate from completeness", () => {
    const facts = [
      fact("business_problem", "Prior authorization operational recovery"),
      fact("transformation_language", "Enterprise transformation and modernization"),
      fact("responsibility", "Lead and deliver implementation"),
      fact("technology", "FHIR"),
      fact("urgency", "First 90 days"),
      fact("reporting_line", "Reports to the COO"),
      fact("compensation", "$250,000 per year"),
    ];

    const first = scoreOpportunityFit({ facts });
    const second = scoreOpportunityFit({ facts });

    expect(first).toEqual(second);
    expect(first.total).toBe(100);
    expect(first.completeness).toBe(100);
    expect(first.scorePolicyVersion).toBe("opportunity-fit-v1");
    expect(first.capabilityProfileVersion).toBe("todd-v1");
  });

  it("scores missing evidence as zero without hiding incomplete inputs", () => {
    const result = scoreOpportunityFit({
      facts: [fact("responsibility", "Lead delivery")],
    });

    expect(result.total).toBeLessThan(30);
    expect(result.completeness).toBe(14);
    expect(result.components.find((item) => item.key === "compensation")?.points).toBe(0);
  });
});
