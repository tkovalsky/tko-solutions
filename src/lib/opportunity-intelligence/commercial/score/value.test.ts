import { describe, expect, it } from "vitest";
import { estimateValue } from "./value";

describe("estimateValue", () => {
  it.each([
    ["assessment", 30_500],
    ["consulting", 54_000],
    ["fractional", 222_000],
    ["partnership", 37_000],
    ["fte", 287_500],
  ])("uses the default %s value band", (type, expected) => {
    expect(estimateValue({ opportunity: { type }, offer: null, rfpProfile: null })).toBe(expected);
  });

  it("uses explicit opportunity value bounds over default offer bounds", () => {
    expect(
      estimateValue({
        opportunity: { type: "consulting", estimatedValueLow: 40_000, estimatedValueHigh: 60_000 },
        offer: null,
        rfpProfile: null,
      }),
    ).toBe(81_500);
  });

  it("uses explicit offer expansion arithmetic", () => {
    expect(
      estimateValue({
        opportunity: { type: "assessment" },
        offer: { valueLow: 6_500, valueHigh: 6_500, expansionProbability: 0.4, followOnValue: 60_000 },
        rfpProfile: null,
      }),
    ).toBe(30_500);
  });

  it("annualizes RFP value and halves sub-bid value", () => {
    expect(
      estimateValue({
        opportunity: { type: "rfp" },
        offer: null,
        rfpProfile: { contractValue: 2_400_000, contractYears: 3, biddingRole: "prime" },
      }),
    ).toBe(800_000);
    expect(
      estimateValue({
        opportunity: { type: "rfp" },
        offer: null,
        rfpProfile: { contractValue: 2_400_000, contractYears: 3, biddingRole: "sub" },
      }),
    ).toBe(400_000);
  });

  it("returns null when neither defaults nor complete bounds exist", () => {
    expect(estimateValue({ opportunity: { type: "unknown" }, offer: null, rfpProfile: null })).toBeNull();
  });
});
