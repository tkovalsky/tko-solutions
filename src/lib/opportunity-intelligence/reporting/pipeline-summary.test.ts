import { describe, expect, it } from "vitest";
import { buildPipelineSummary } from "./pipeline-summary";

describe("buildPipelineSummary", () => {
  it("computes income replacement as expectedValueTotal divided by 300000", () => {
    const summary = buildPipelineSummary([
      { type: "consulting", status: "researching", currentScore: { expectedValue: 60_000 } },
      { type: "fte", status: "qualified", currentScore: { expectedValue: 30_000 } },
    ]);

    expect(summary.expectedValueTotal).toBe(90_000);
    expect(summary.incomeReplacement).toBe(0.3);
    expect(summary.livePathCount).toBe(2);
  });

  it("excludes dismissed, paused, and terminal opportunities", () => {
    const summary = buildPipelineSummary([
      { type: "consulting", status: "researching", currentScore: { expectedValue: 60_000 } },
      { type: "consulting", status: "dismissed", currentScore: { expectedValue: 40_000 } },
      { type: "fte", status: "paused", currentScore: { expectedValue: 30_000 } },
      { type: "assessment", status: "closed", currentScore: { expectedValue: 20_000 } },
      { type: "partnership", status: "lost", currentScore: { expectedValue: 10_000 } },
    ]);

    expect(summary.expectedValueTotal).toBe(60_000);
    expect(summary.incomeReplacement).toBe(0.2);
    expect(summary.livePathCount).toBe(1);
  });
});
