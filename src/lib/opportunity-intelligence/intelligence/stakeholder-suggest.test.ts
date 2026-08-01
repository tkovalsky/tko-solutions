import { describe, expect, it } from "vitest";
import { INITIATIVE_CATEGORIES, suggestStakeholderRoles } from "./stakeholder-suggest";

describe("suggestStakeholderRoles", () => {
  it("returns at least two suggested roles for every initiative category", () => {
    for (const category of INITIATIVE_CATEGORIES) {
      expect(suggestStakeholderRoles(category)).toHaveLength(4);
    }
  });

  it("adds hiring manager for FTE opportunities", () => {
    expect(suggestStakeholderRoles("care_management", "fte")).toContain("hiring_manager");
  });
});
