import { describe, expect, it, vi } from "vitest";
import { selectStakeholder } from "./actions";
import { tifDb } from "@/lib/tif/db";

vi.mock("next/cache", () => ({
  revalidatePath: vi.fn(),
}));

vi.mock("@/lib/opportunity-intelligence/commercial/score", () => ({
  scoreOpportunity: vi.fn(() => ({ components: [], scorePolicyVersion: "pois-v1", capabilityProfileVersion: "todd-v2" })),
  persistOpportunityScore: vi.fn(),
}));

vi.mock("@/lib/tif/db", () => ({
  tifDb: {
    $transaction: vi.fn(),
  },
}));

const mockedDb = vi.mocked(tifDb);

describe("stakeholder selection", () => {
  it("rejects selection without evidence or operator confirmation", async () => {
    const tx = {
      oiStakeholder: {
        findUniqueOrThrow: vi.fn().mockResolvedValue({
          roleEvidenceUrl: null,
          roleEvidenceLabel: null,
          roleConfidence: 50,
          person: { doNotContact: false },
        }),
        updateMany: vi.fn(),
        update: vi.fn(),
      },
    };
    mockedDb.$transaction.mockImplementationOnce(async (callback) => callback(tx));
    const formData = new FormData();
    formData.set("opportunityId", "opp-1");
    formData.set("stakeholderId", "stakeholder-1");

    await expect(selectStakeholder(formData)).rejects.toThrow("Selection requires role evidence or explicit operator confirmation.");
    expect(tx.oiStakeholder.update).not.toHaveBeenCalled();
  });

  it("rejects selection when the person is marked do-not-contact", async () => {
    const tx = {
      oiStakeholder: {
        findUniqueOrThrow: vi.fn().mockResolvedValue({
          roleEvidenceUrl: "https://example.com",
          roleEvidenceLabel: null,
          roleConfidence: 100,
          person: { doNotContact: true },
        }),
        updateMany: vi.fn(),
        update: vi.fn(),
      },
    };
    mockedDb.$transaction.mockImplementationOnce(async (callback) => callback(tx));
    const formData = new FormData();
    formData.set("opportunityId", "opp-1");
    formData.set("stakeholderId", "stakeholder-1");

    await expect(selectStakeholder(formData)).rejects.toThrow("A do-not-contact stakeholder cannot be selected.");
    expect(tx.oiStakeholder.update).not.toHaveBeenCalled();
  });
});
