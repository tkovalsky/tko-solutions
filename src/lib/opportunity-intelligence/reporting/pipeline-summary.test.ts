import { describe, expect, it } from "vitest";
import { buildPipelineSummary } from "./pipeline-summary";

describe("buildPipelineSummary", () => {
  it("computes income replacement as expectedValueTotal divided by 300000", () => {
    const summary = buildPipelineSummary([
      { type: "consulting", currentScore: { expectedValue: 60_000 } },
      { type: "fte", currentScore: { expectedValue: 30_000 } },
    ]);

    expect(summary.expectedValueTotal).toBe(90_000);
    expect(summary.incomeReplacement).toBe(0.3);
    expect(summary.livePathCount).toBe(2);
  });
});
