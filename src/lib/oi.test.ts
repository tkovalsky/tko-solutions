import { describe, expect, it } from "vitest";
import {
  countLookalikeOverlap,
  scoreOpportunity,
  uniqueTags,
  type OiScoreInput,
} from "./oi";

const highFit: OiScoreInput = {
  seniority: "vice_president",
  organizationKind: "payer",
  mode: "consulting",
  targetMonthlyValue: 25_000,
  budgetAuthority: 3,
  hiringAuthority: 3,
  transformationRelevance: 3,
  relationshipStrength: 0,
  sourceConfidence: 3,
  sourcePublishedAt: new Date("2026-06-23T00:00:00.000Z"),
  domainTags: ["payer", "utilization-management", "digital-transformation"],
  lookalikeOverlapCount: 3,
};

describe("scoreOpportunity", () => {
  it("ranks a fresh Director+ budget owner as contact ready", () => {
    const result = scoreOpportunity(highFit, new Date("2026-07-29T00:00:00.000Z"));

    expect(result.score).toBeGreaterThanOrEqual(70);
    expect(result.readiness).toBe("contact_ready");
    expect(result.nextAction).toContain("professional contact path");
    expect(result.components.some((component) => component.key === "budget")).toBe(true);
  });

  it("keeps a high-fit but stale profile in research", () => {
    const result = scoreOpportunity(
      { ...highFit, sourcePublishedAt: new Date("2024-01-01T00:00:00.000Z") },
      new Date("2026-07-29T00:00:00.000Z"),
    );

    expect(result.readiness).toBe("research_ready");
    expect(result.warnings).toContain("Reverify the person's current title before contact.");
  });

  it("blocks a do-not-contact record even when the fit is high", () => {
    const result = scoreOpportunity(
      { ...highFit, doNotContact: true },
      new Date("2026-07-29T00:00:00.000Z"),
    );

    expect(result.readiness).toBe("blocked");
    expect(result.nextAction).toContain("Do not contact");
  });

  it("penalizes unverified non-Director roles", () => {
    const result = scoreOpportunity(
      {
        ...highFit,
        seniority: "other",
        sourceConfidence: 0,
        budgetAuthority: 0,
        hiringAuthority: 0,
      },
      new Date("2026-07-29T00:00:00.000Z"),
    );

    expect(result.score).toBeLessThan(70);
    expect(result.readiness).toBe("research_ready");
    expect(result.warnings).toContain("Verify that the person is currently Director level or above.");
  });
});

describe("lookalike helpers", () => {
  it("counts normalized, unique overlap", () => {
    expect(
      countLookalikeOverlap(
        ["Payer", "AI", "payer", "utilization-management"],
        ["payer", "enterprise-transformation", "ai"],
      ),
    ).toBe(2);
  });

  it("normalizes duplicate tags", () => {
    expect(uniqueTags([" Payer ", "payer", "", "AI"])).toEqual(["payer", "ai"]);
  });
});
