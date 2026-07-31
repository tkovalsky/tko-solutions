import { describe, expect, it } from "vitest";
import { planResearchGapReconciliation } from "./research-gaps";

describe("planResearchGapReconciliation", () => {
  it("preserves resolved and dismissed operator decisions on rerun", () => {
    const plan = planResearchGapReconciliation(
      [
        { id: "resolved", gapKey: "reporting_line_missing", status: "resolved" },
        { id: "dismissed", gapKey: "technology_missing", status: "dismissed" },
      ],
      [
        {
          gapKey: "reporting_line_missing",
          question: "Who owns this?",
          reason: "Sponsor proximity matters.",
        },
        {
          gapKey: "technology_missing",
          question: "What technology?",
          reason: "Technology changes fit.",
        },
      ],
    );

    expect(plan.create).toEqual([]);
    expect(plan.autoResolveIds).toEqual([]);
  });

  it("auto-resolves an open gap when new evidence fills it", () => {
    const plan = planResearchGapReconciliation(
      [{ id: "gap-1", gapKey: "technology_missing", status: "open" }],
      [],
    );

    expect(plan.autoResolveIds).toEqual(["gap-1"]);
  });
});
