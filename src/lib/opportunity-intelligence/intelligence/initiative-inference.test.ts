import { describe, expect, it } from "vitest";
import { applyDecay, confidenceFor, inferInitiatives } from "./initiative-inference";

describe("initiative inference", () => {
  it("reproduces the fixed confidence table", () => {
    expect(confidenceFor([signal("tier_2")])).toBe(0.3);
    expect(confidenceFor([signal("tier_2"), signal("tier_2")])).toBe(0.4);
    expect(confidenceFor([signal("tier_1")])).toBe(0.45);
    expect(confidenceFor([signal("tier_1"), signal("tier_2")])).toBe(0.62);
    expect(confidenceFor([signal("tier_1"), signal("tier_1")])).toBe(0.78);
    expect(confidenceFor([signal("tier_1"), signal("tier_1"), signal("tier_2")])).toBe(0.88);
  });

  it("does not propose a single Tier 2 signal alone", () => {
    expect(
      inferInitiatives({
        accountName: "Humana",
        signals: [fullSignal("one", "tier_2", daysAgo(1))],
      }),
    ).toEqual([]);
  });

  it("handles the 90-day clustering boundary at 89, 90, and 91 days", () => {
    const asOf = new Date("2026-07-31T12:00:00Z");
    expect(clusterSupportAt(89, asOf)).toBe(2);
    expect(clusterSupportAt(90, asOf)).toBe(2);
    expect(clusterSupportAt(91, asOf)).toBe(1);
  });

  it("applies decay of 0.10 per 90 days with a 0.20 floor", () => {
    const asOf = new Date("2026-07-31T12:00:00Z");
    expect(applyDecay(0.88, daysAgo(90, asOf), asOf)).toBe(0.78);
    expect(applyDecay(0.88, daysAgo(180, asOf), asOf)).toBe(0.68);
    expect(applyDecay(0.3, daysAgo(900, asOf), asOf)).toBe(0.2);
  });

  it("attaches to an existing initiative when tags overlap", () => {
    const proposals = inferInitiatives({
      accountName: "Humana",
      signals: [fullSignal("one", "tier_1", daysAgo(1))],
      existingInitiatives: [{ id: "initiative-1", name: "Existing PA initiative", domainTags: ["prior_authorization"] }],
    });

    expect(proposals[0]).toEqual(expect.objectContaining({ attachToInitiativeId: "initiative-1" }));
  });

  it("generates the documented deterministic initiative name", () => {
    expect(
      inferInitiatives({
        accountName: "Humana",
        signals: [fullSignal("one", "tier_1", daysAgo(1))],
      })[0]?.name,
    ).toBe("Humana — prior authorization initiative");
  });
});

function clusterSupportAt(daysBetween: number, asOf: Date) {
  return inferInitiatives({
    accountName: "Humana",
    signals: [fullSignal("one", "tier_1", asOf), fullSignal("two", "tier_1", daysAgo(daysBetween, asOf))],
    asOf,
  })[0]?.supportingSignals.length ?? 0;
}

function signal(tier: "tier_1" | "tier_2") {
  return { tier };
}

function fullSignal(id: string, tier: "tier_1" | "tier_2", occurredAt: Date) {
  return {
    id,
    tier,
    signalType: "senior_role_posting",
    summary: id,
    occurredAt,
    domainTags: ["prior_authorization"],
  };
}

function daysAgo(days: number, asOf = new Date()) {
  return new Date(asOf.getTime() - days * 86_400_000);
}
