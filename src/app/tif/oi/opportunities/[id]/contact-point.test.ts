import { beforeEach, describe, expect, it, vi } from "vitest";
import { isContactPointOutreachEligible } from "@/lib/opportunity-intelligence/intelligence/contact-point";
import { addContactPoint } from "./actions";
import { tifDb } from "@/lib/tif/db";

vi.mock("next/cache", () => ({
  revalidatePath: vi.fn(),
}));

vi.mock("@/lib/tif/db", () => ({
  tifDb: {
    $transaction: vi.fn(),
    oiContactPoint: {
      create: vi.fn(),
    },
    oiOpportunity: {
      findUniqueOrThrow: vi.fn(),
      update: vi.fn(),
    },
    oiScore: {
      create: vi.fn().mockResolvedValue({ id: "score-1" }),
    },
  },
}));

vi.mock("@/lib/opportunity-intelligence/commercial/score", () => ({
  scoreOpportunity: vi.fn(() => ({ components: [], scorePolicyVersion: "pois-v1", capabilityProfileVersion: "todd-v2" })),
  persistOpportunityScore: vi.fn(),
}));

const mockedDb = vi.mocked(tifDb);

beforeEach(() => {
  vi.clearAllMocks();
});

describe("contact-point provenance", () => {
  it("rejects a submitted contact point without provenance", async () => {
    const formData = new FormData();
    formData.set("opportunityId", "opp-1");
    formData.set("personId", "person-1");
    formData.set("type", "email");
    formData.set("value", "person@example.com");

    await expect(addContactPoint(formData)).rejects.toThrow();
    expect(mockedDb.oiContactPoint.create).not.toHaveBeenCalled();
  });

  it("stores pattern-inferred contact points but excludes them from outreach eligibility", async () => {
    const tx = {
      oiContactPoint: { create: vi.fn() },
      oiOpportunity: { findUniqueOrThrow: vi.fn().mockResolvedValue(scoreInputOpportunity()), update: vi.fn() },
      oiNextAction: {
        findFirst: vi.fn().mockResolvedValue({
          id: "next-1",
          type: "close_research_gap",
          description: "Close the blocking research gap",
          dueAt: new Date("2026-07-31T12:00:00Z"),
        }),
        updateMany: vi.fn(),
        create: vi.fn(),
      },
      oiScore: { create: vi.fn().mockResolvedValue({ id: "score-1" }) },
    };
    mockedDb.$transaction.mockImplementationOnce(async (callback) =>
      callback(tx),
    );
    const formData = new FormData();
    formData.set("opportunityId", "opp-1");
    formData.set("personId", "person-1");
    formData.set("type", "email");
    formData.set("value", "person@example.com");
    formData.set("provenance", "pattern_inferred");

    await addContactPoint(formData);

    expect(tx.oiContactPoint.create).toHaveBeenCalledWith({
      data: expect.objectContaining({ personId: "person-1", provenance: "pattern_inferred" }),
    });
    expect(tx.oiNextAction.updateMany).toHaveBeenCalledWith({
      where: { opportunityId: "opp-1", status: "open" },
      data: { status: "cancelled" },
    });
    expect(isContactPointOutreachEligible({ status: "active", provenance: "pattern_inferred" })).toBe(false);
  });
});

function scoreInputOpportunity() {
  return {
    id: "opp-1",
    type: "consulting",
    status: "researching",
    offerId: null,
    estimatedValueLow: null,
    estimatedValueHigh: null,
    conversionProbability: null,
    estimatedHours: null,
    disqualifiedReason: null,
    lastActivityAt: null,
    organization: { tier: 1 },
    initiative: null,
    facts: [],
    sourceLinks: [],
    researchGaps: [],
    offer: null,
    roleProfile: null,
    stakeholders: [],
  };
}
