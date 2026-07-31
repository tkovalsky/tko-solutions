import { describe, expect, it } from "vitest";
import {
  scoreStakeholderAccess,
  type StakeholderAccessInput,
} from "./access";

const highAccess: StakeholderAccessInput = {
  seniority: "vice_president",
  budgetAuthority: 3,
  hiringAuthority: 3,
  transformationRelevance: 3,
  relationshipStrength: 0,
  sourceConfidence: 3,
  sourcePublishedAt: new Date("2026-06-23T00:00:00.000Z"),
};

describe("scoreStakeholderAccess", () => {
  it("preserves the fresh Director+ budget-owner access score", () => {
    const result = scoreStakeholderAccess(highAccess, new Date("2026-07-29T00:00:00.000Z"));

    expect(result.score).toBe(49);
    expect(result.components.some((component) => component.key === "budget")).toBe(true);
  });

  it("preserves the stale-role access penalty", () => {
    const result = scoreStakeholderAccess(
      { ...highAccess, sourcePublishedAt: new Date("2024-01-01T00:00:00.000Z") },
      new Date("2026-07-29T00:00:00.000Z"),
    );

    expect(result.score).toBe(43);
    expect(result.warnings).toContain("Reverify the person's current title before contact.");
  });

  it("preserves do-not-contact as a hard warning without changing numeric components", () => {
    const result = scoreStakeholderAccess(
      { ...highAccess, doNotContact: true },
      new Date("2026-07-29T00:00:00.000Z"),
    );

    expect(result.score).toBe(49);
    expect(result.warnings).toContain("This person is marked do not contact.");
  });

  it("preserves penalties for unverified non-Director roles", () => {
    const result = scoreStakeholderAccess(
      {
        ...highAccess,
        seniority: "other",
        sourceConfidence: 0,
        budgetAuthority: 0,
        hiringAuthority: 0,
      },
      new Date("2026-07-29T00:00:00.000Z"),
    );

    expect(result.score).toBe(0);
    expect(result.warnings).toContain("Verify that the person is currently Director level or above.");
  });

  it("defaults new access components to zero", () => {
    const result = scoreStakeholderAccess(highAccess, new Date("2026-07-29T00:00:00.000Z"));

    expect(result.components.find((component) => component.key === "warm_path")?.points).toBe(0);
    expect(result.components.find((component) => component.key === "role_clarity")?.points).toBe(0);
    expect(result.components.find((component) => component.key === "contact_reachable")?.points).toBe(0);
  });

  it("adds warm path in isolation", () => {
    const cold = scoreStakeholderAccess(highAccess, new Date("2026-07-29T00:00:00.000Z"));
    const warm = scoreStakeholderAccess(
      { ...highAccess, warmPath: "warm_referral" },
      new Date("2026-07-29T00:00:00.000Z"),
    );

    expect(warm.score - cold.score).toBe(15);
  });

  it("adds role clarity in isolation", () => {
    const unclear = scoreStakeholderAccess(highAccess, new Date("2026-07-29T00:00:00.000Z"));
    const clear = scoreStakeholderAccess(
      { ...highAccess, roleClarity: "economic_buyer" },
      new Date("2026-07-29T00:00:00.000Z"),
    );

    expect(clear.score - unclear.score).toBe(10);
  });

  it("adds contact reachability in isolation", () => {
    const missing = scoreStakeholderAccess(highAccess, new Date("2026-07-29T00:00:00.000Z"));
    const reachable = scoreStakeholderAccess(
      { ...highAccess, contactReachable: true },
      new Date("2026-07-29T00:00:00.000Z"),
    );

    expect(reachable.score - missing.score).toBe(8);
  });
});
