import { beforeEach, describe, expect, it, vi } from "vitest";
import { completeNextAction, dismissOpportunity, snoozeOpportunity } from "./actions";
import { tifDb } from "@/lib/tif/db";

vi.mock("next/cache", () => ({ revalidatePath: vi.fn() }));

vi.mock("@/lib/tif/db", () => ({
  tifDb: {
    $transaction: vi.fn(),
    oiNextAction: { updateMany: vi.fn() },
  },
}));

const mockedDb = vi.mocked(tifDb);

beforeEach(() => {
  vi.clearAllMocks();
});

describe("Today actions", () => {
  it("snoozes without requiring a reason", async () => {
    const formData = new FormData();
    formData.set("opportunityId", "opp-1");
    formData.set("duration", "3d");

    await snoozeOpportunity(formData);

    expect(mockedDb.oiNextAction.updateMany).toHaveBeenCalledWith({
      where: { opportunityId: "opp-1", status: "open" },
      data: expect.objectContaining({ status: "snoozed" }),
    });
  });

  it("rejects an empty dismiss reason", async () => {
    const formData = new FormData();
    formData.set("opportunityId", "opp-1");
    formData.set("decisionReason", " ");

    await expect(dismissOpportunity(formData)).rejects.toThrow();
  });

  it("captures a disqualify decision before dismissing an opportunity from Today", async () => {
    const tx = {
      oiOpportunity: {
        findUniqueOrThrow: vi
          .fn()
          .mockResolvedValueOnce({ id: "opp-1", type: "consulting", status: "researching" })
          .mockResolvedValueOnce({
            id: "opp-1",
            currentScore: {
              id: "score-1",
              expectedValue: 1000,
              estimatedHours: 2,
              conversionProbability: 25,
            },
          }),
        update: vi.fn(),
      },
      oiDecision: {
        create: vi.fn(),
      },
      oiNextAction: {
        updateMany: vi.fn(),
      },
      oiActivity: {
        create: vi.fn(),
      },
    };
    mockedDb.$transaction.mockImplementationOnce(async (callback) => callback(tx));
    const formData = new FormData();
    formData.set("opportunityId", "opp-1");
    formData.set("decisionReason", "Not worth pursuing.");
    formData.set("decisionConfidence", "high");
    formData.set("expectedOutcome", "No conversion.");

    await dismissOpportunity(formData);

    expect(tx.oiDecision.create).toHaveBeenCalledWith({
      data: expect.objectContaining({
        opportunityId: "opp-1",
        type: "disqualify_opportunity",
        decision: "dismissed",
        reason: "Not worth pursuing.",
        confidence: "high",
        expectedOutcome: "No conversion.",
        scoreIdAtDecision: "score-1",
        expectedValue: 1000,
        expectedEffortHours: 2,
        expectedProbability: 25,
      }),
    });
    expect(tx.oiOpportunity.update).toHaveBeenCalledWith({
      where: { id: "opp-1" },
      data: expect.objectContaining({
        status: "dismissed",
        disqualifiedReason: "Not worth pursuing.",
      }),
    });
  });

  it("rejects Today dismissal when the lifecycle transition is blocked", async () => {
    const tx = {
      oiOpportunity: {
        findUniqueOrThrow: vi.fn().mockResolvedValue({ id: "opp-1", type: "consulting", status: "closed" }),
        update: vi.fn(),
      },
      oiDecision: {
        create: vi.fn(),
      },
      oiNextAction: {
        updateMany: vi.fn(),
      },
      oiActivity: {
        create: vi.fn(),
      },
    };
    mockedDb.$transaction.mockImplementationOnce(async (callback) => callback(tx));
    const formData = new FormData();
    formData.set("opportunityId", "opp-1");
    formData.set("decisionReason", "Not worth pursuing.");
    formData.set("decisionConfidence", "medium");

    await expect(dismissOpportunity(formData)).rejects.toThrow("Cannot transition from terminal status closed.");
    expect(tx.oiDecision.create).not.toHaveBeenCalled();
    expect(tx.oiOpportunity.update).not.toHaveBeenCalled();
  });

  it("completes the current action and creates the derived successor action", async () => {
    const tx = {
      oiOpportunity: {
        findUniqueOrThrow: vi.fn().mockResolvedValue({
          id: "opp-1",
          type: "consulting",
          status: "researching",
          offerId: null,
          lastActivityAt: null,
          initiative: { status: "evidenced", approvedAt: new Date("2026-08-01T12:00:00Z") },
          researchGaps: [],
          stakeholders: [],
          roleProfile: null,
          currentScore: { evidenceScore: 80, accessScore: 0 },
        }),
        update: vi.fn(),
      },
      oiNextAction: {
        update: vi.fn().mockResolvedValue({
          type: "close_research_gap",
          description: "Close the blocking research gap",
        }),
        create: vi.fn(),
      },
      oiActivity: {
        create: vi.fn(),
      },
    };
    mockedDb.$transaction.mockImplementationOnce(async (callback) => callback(tx));
    const formData = new FormData();
    formData.set("opportunityId", "opp-1");
    formData.set("nextActionId", "action-1");

    await completeNextAction(formData);

    expect(tx.oiNextAction.update).toHaveBeenCalledWith({
      where: { id: "action-1" },
      data: expect.objectContaining({ status: "completed" }),
      select: { type: true, description: true },
    });
    expect(tx.oiNextAction.create).toHaveBeenCalledWith({
      data: expect.objectContaining({
        opportunityId: "opp-1",
        type: "identify_stakeholder",
      }),
    });
    expect(tx.oiActivity.create).toHaveBeenCalledWith({
      data: expect.objectContaining({
        opportunityId: "opp-1",
        type: "note",
        summary: "Completed next action: Close the blocking research gap.",
      }),
    });
    expect(tx.oiOpportunity.update).toHaveBeenCalledWith({
      where: { id: "opp-1" },
      data: { lastActivityAt: expect.any(Date) },
    });
  });

  it("completes prepare outreach without creating a duplicate prepare outreach action", async () => {
    const tx = {
      oiOpportunity: {
        findUniqueOrThrow: vi.fn().mockResolvedValue({
          id: "opp-1",
          type: "consulting",
          status: "researching",
          offerId: "offer-1",
          lastActivityAt: null,
          initiative: { status: "evidenced", approvedAt: new Date("2026-08-01T12:00:00Z") },
          researchGaps: [],
          stakeholders: [{ isSelected: true }],
          roleProfile: null,
          currentScore: { evidenceScore: 80, accessScore: 80 },
        }),
        update: vi.fn(),
      },
      oiNextAction: {
        update: vi.fn().mockResolvedValue({
          type: "prepare_outreach",
          description: "Prepare outreach",
        }),
        create: vi.fn(),
      },
      oiActivity: {
        create: vi.fn(),
      },
    };
    mockedDb.$transaction.mockImplementationOnce(async (callback) => callback(tx));
    const formData = new FormData();
    formData.set("opportunityId", "opp-1");
    formData.set("nextActionId", "action-1");

    await completeNextAction(formData);

    expect(tx.oiNextAction.update).toHaveBeenCalledWith({
      where: { id: "action-1" },
      data: expect.objectContaining({ status: "completed" }),
      select: { type: true, description: true },
    });
    expect(tx.oiNextAction.create).not.toHaveBeenCalled();
    expect(tx.oiActivity.create).toHaveBeenCalledWith({
      data: expect.objectContaining({
        opportunityId: "opp-1",
        type: "note",
        summary: "Completed next action: Prepare outreach.",
      }),
    });
  });

  it("keeps select_offer open when it is completed without an offer actually being selected", async () => {
    const tx = {
      oiOpportunity: {
        findUniqueOrThrow: vi.fn().mockResolvedValue({
          id: "opp-1",
          type: "consulting",
          status: "researching",
          offerId: null,
          lastActivityAt: null,
          initiative: { status: "evidenced", approvedAt: new Date("2026-08-01T12:00:00Z") },
          researchGaps: [],
          stakeholders: [{ isSelected: true }],
          roleProfile: null,
          currentScore: { evidenceScore: 80, accessScore: 80 },
        }),
        update: vi.fn(),
      },
      oiNextAction: {
        update: vi.fn().mockResolvedValue({
          type: "select_offer",
          description: "Select the offer",
        }),
        create: vi.fn(),
      },
      oiActivity: {
        create: vi.fn(),
      },
    };
    mockedDb.$transaction.mockImplementationOnce(async (callback) => callback(tx));
    const formData = new FormData();
    formData.set("opportunityId", "opp-1");
    formData.set("nextActionId", "action-1");

    await completeNextAction(formData);

    // Unlike the D-032 outreach hand-off, the precondition is genuinely unmet, so the
    // opportunity must not be left with zero open next actions.
    expect(tx.oiNextAction.create).toHaveBeenCalledWith({
      data: expect.objectContaining({
        opportunityId: "opp-1",
        status: "open",
        type: "select_offer",
      }),
    });
  });

  it("advances to prepare_outreach when select_offer is completed after an offer is selected", async () => {
    const tx = {
      oiOpportunity: {
        findUniqueOrThrow: vi.fn().mockResolvedValue({
          id: "opp-1",
          type: "consulting",
          status: "researching",
          offerId: "offer-1",
          lastActivityAt: null,
          initiative: { status: "evidenced", approvedAt: new Date("2026-08-01T12:00:00Z") },
          researchGaps: [],
          stakeholders: [{ isSelected: true }],
          roleProfile: null,
          currentScore: { evidenceScore: 80, accessScore: 80 },
        }),
        update: vi.fn(),
      },
      oiNextAction: {
        update: vi.fn().mockResolvedValue({
          type: "select_offer",
          description: "Select the offer",
        }),
        create: vi.fn(),
      },
      oiActivity: {
        create: vi.fn(),
      },
    };
    mockedDb.$transaction.mockImplementationOnce(async (callback) => callback(tx));
    const formData = new FormData();
    formData.set("opportunityId", "opp-1");
    formData.set("nextActionId", "action-1");

    await completeNextAction(formData);

    expect(tx.oiNextAction.create).toHaveBeenCalledWith({
      data: expect.objectContaining({
        opportunityId: "opp-1",
        status: "open",
        type: "prepare_outreach",
      }),
    });
  });
});
