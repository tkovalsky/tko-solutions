import { describe, expect, it } from "vitest";
import { composeDraft } from "./draft-composer";

describe("TIF core draft composer", () => {
  it("composes a pre-license commercial corridor page from the CRE framework", () => {
    const result = composeDraft({
      framework: "cre_tenant_rep",
      artifact: "cre_corridor_page",
      voice: "commercial_operator",
      inputs: {
        market: "South Florida",
        corridor: "Congress Avenue",
        operatorType: "medical and service operators",
        licenseStatus: "pre_license",
        licensedReferralPartner: "Rachel's licensed commercial teammate",
        fieldObservations: ["VERIFY dated access and parking observation."],
      },
    });

    expect(result.title).toContain("Congress Avenue");
    expect(result.markdown).toContain("intelligenceSource: cre-intelligence");
    expect(result.markdown).toContain("Pre-license boundary");
    expect(result.markdown).toContain("Rachel's licensed commercial teammate");
    expect(result.suggestedPath).toContain("src/content/commercial/");
  });

  it("composes a business transferability page without valuation promises", () => {
    const result = composeDraft({
      framework: "business_exit",
      artifact: "transferability_assessment_page",
      voice: "todd",
      inputs: {
        market: "South Florida",
        businessType: "owner-led professional services firm",
        exitHorizon: "24-36 months",
        licenseStatus: "pre_license",
      },
    });

    expect(result.markdown).toContain("Business Transferability Assessment");
    expect(result.markdown).toContain("not a valuation");
    expect(result.markdown).toContain("no engagement guarantees a transaction or valuation outcome");
  });

  it("rejects a commercial framework without market context", () => {
    expect(() => composeDraft({
      framework: "cre_tenant_rep",
      artifact: "cre_area_page",
      voice: "todd",
      inputs: {},
    })).toThrow("inputs.market");
  });
});
