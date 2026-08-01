import { describe, expect, it, vi } from "vitest";
import { captureDecision } from "./decision";

describe("captureDecision", () => {
  it("requires a reason and pre-fills prediction fields from the current score", async () => {
    const client = {
      oiOpportunity: {
        findUniqueOrThrow: vi.fn().mockResolvedValue({
          id: "opp-1",
          currentScore: {
            id: "score-1",
            expectedValue: 32_400,
            estimatedHours: 6.4,
            conversionProbability: 60,
          },
        }),
      },
      oiDecision: {
        create: vi.fn().mockResolvedValue({ id: "decision-1" }),
      },
    };

    await captureDecision(client, {
      opportunityId: "opp-1",
      type: "qualify_opportunity",
      decision: "qualified",
      reason: "Meets the evidence bar.",
      confidence: "medium",
    });

    expect(client.oiDecision.create).toHaveBeenCalledWith({
      data: expect.objectContaining({
        scoreIdAtDecision: "score-1",
        expectedValue: 32_400,
        expectedEffortHours: 6.4,
        expectedProbability: 60,
      }),
    });
    await expect(
      captureDecision(client, {
        opportunityId: "opp-1",
        type: "pause_opportunity",
        decision: "paused",
        reason: " ",
        confidence: "low",
      }),
    ).rejects.toThrow("Decision reason is required.");
  });

  it("creates a new row for a later reversal instead of editing the existing decision", async () => {
    const client = {
      oiOpportunity: {
        findUniqueOrThrow: vi.fn().mockResolvedValue({ id: "opp-1", currentScore: null }),
      },
      oiDecision: {
        create: vi.fn().mockResolvedValue({ id: "decision" }),
      },
    };

    await captureDecision(client, {
      opportunityId: "opp-1",
      type: "pause_opportunity",
      decision: "paused",
      reason: "Waiting on buyer.",
      confidence: "low",
    });
    await captureDecision(client, {
      opportunityId: "opp-1",
      type: "qualify_opportunity",
      decision: "qualified",
      reason: "Buyer replied.",
      confidence: "high",
    });

    expect(client.oiDecision.create).toHaveBeenCalledTimes(2);
  });
});
