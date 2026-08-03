import { describe, expect, it } from "vitest";
import { conversionProbability, remainingHours, scorePriority } from "./priority";

describe("priority scoring", () => {
  it("applies probability multipliers and the 60% cap", () => {
    expect(
      conversionProbability({
        opportunity: { type: "consulting" },
        fitScore: 90,
        evidenceScore: 90,
        accessScore: 80,
        estimatedValue: 54_000,
        relationshipType: "warm_history",
      }),
    ).toBe(60);
  });

  it("applies downward probability multipliers and clamps overrides", () => {
    expect(
      conversionProbability({
        opportunity: { type: "consulting" },
        fitScore: 30,
        evidenceScore: 30,
        accessScore: 10,
        estimatedValue: 54_000,
        incumbentIdentified: true,
        compBelowFloor: true,
      }),
    ).toBe(1);
    expect(conversionProbability(base({ opportunity: { type: "consulting", conversionProbabilityOverride: 99 } }))).toBe(60);
    expect(conversionProbability(base({ opportunity: { type: "consulting", conversionProbabilityOverride: 0 } }))).toBe(1);
  });

  it("uses RFP prime/sub base probability and incumbent penalty", () => {
    expect(conversionProbability(base({ opportunity: { type: "rfp" }, rfpBiddingRole: "prime" }))).toBe(5);
    expect(conversionProbability(base({ opportunity: { type: "rfp" }, rfpBiddingRole: "sub" }))).toBe(12);
    expect(conversionProbability(base({ opportunity: { type: "rfp" }, rfpBiddingRole: "sub", incumbentIdentified: true }))).toBe(6);
  });

  it("computes remaining effort from base hours, reductions, increases, and overrides", () => {
    expect(remainingHours(base({ opportunity: { type: "consulting" } }))).toBe(11.5);
    expect(remainingHours(base({ opportunity: { type: "consulting" }, initiativeResearched: true, stakeholderIdentified: true }))).toBe(6.4);
    expect(remainingHours(base({ opportunity: { type: "consulting" }, evidenceScore: 30 }))).toBe(17.3);
    expect(remainingHours(base({ opportunity: { type: "consulting", estimatedHoursOverride: 4.44 } }))).toBe(4.4);
  });

  it("computes expected value and priority efficiency", () => {
    expect(
      scorePriority({
        opportunity: { type: "consulting" },
        fitScore: 90,
        evidenceScore: 90,
        accessScore: 80,
        estimatedValue: 54_000,
        relationshipType: "warm_history",
        initiativeResearched: true,
        stakeholderIdentified: true,
      }),
    ).toEqual({
      conversionProbability: 60,
      expectedValue: 32_400,
      estimatedHours: 6.4,
      priorityEfficiency: 5_063,
    });
  });

  it("keeps null expected value when value is unknown", () => {
    expect(scorePriority(base({ estimatedValue: null })).expectedValue).toBeNull();
    expect(scorePriority(base({ estimatedValue: null })).priorityEfficiency).toBeNull();
  });
});

function base(overrides: Partial<Parameters<typeof scorePriority>[0]> = {}) {
  return {
    opportunity: { type: "consulting" },
    fitScore: 60,
    evidenceScore: 60,
    accessScore: 50,
    estimatedValue: 10_000,
    ...overrides,
    opportunity: { type: "consulting", ...overrides.opportunity },
  };
}
