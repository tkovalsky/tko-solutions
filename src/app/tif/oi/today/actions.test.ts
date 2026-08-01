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
    formData.set("reason", " ");

    await expect(dismissOpportunity(formData)).rejects.toThrow();
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
});
