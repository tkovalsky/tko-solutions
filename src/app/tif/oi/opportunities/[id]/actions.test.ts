import { beforeEach, describe, expect, it, vi } from "vitest";
import { redirect } from "next/navigation";
import { canTransition } from "@/lib/opportunity-intelligence/commercial/lifecycle";
import { persistOpportunityScore, scoreOpportunity } from "@/lib/opportunity-intelligence/commercial/score";
import { tifDb } from "@/lib/tif/db";
import { resolveResearchGap, updateOpportunityStatus } from "./actions";

vi.mock("next/cache", () => ({
  revalidatePath: vi.fn(),
}));

vi.mock("next/navigation", () => ({
  redirect: vi.fn((url: string) => {
    throw new Error(`REDIRECT:${url}`);
  }),
}));

vi.mock("@/lib/opportunity-intelligence/commercial/lifecycle", async () => {
  const actual = await vi.importActual<typeof import("@/lib/opportunity-intelligence/commercial/lifecycle")>(
    "@/lib/opportunity-intelligence/commercial/lifecycle",
  );
  return {
    ...actual,
    canTransition: vi.fn(actual.canTransition),
  };
});

vi.mock("@/lib/opportunity-intelligence/commercial/score", () => ({
  scoreOpportunity: vi.fn(() => ({
    isDisqualified: false,
    disqualifyingRules: [],
    fitScore: 10,
    evidenceScore: 10,
    accessScore: 0,
    urgencyScore: 0,
    total: 10,
    completeness: 50,
    estimatedValue: 100,
    conversionProbability: 10,
    expectedValue: 10,
    estimatedHours: 1,
    priorityEfficiency: 10,
    components: [],
    warnings: [],
    scorePolicyVersion: "pois-v1",
    capabilityProfileVersion: "todd-v2",
  })),
  persistOpportunityScore: vi.fn(),
}));

vi.mock("@/lib/tif/db", () => ({
  tifDb: {
    $transaction: vi.fn(),
    oiOpportunity: {
      findUniqueOrThrow: vi.fn(),
    },
  },
}));

const mockedDb = vi.mocked(tifDb);
const mockedTransition = vi.mocked(canTransition);
const mockedPersist = vi.mocked(persistOpportunityScore);

beforeEach(() => {
  vi.clearAllMocks();
  mockedDb.oiOpportunity.findUniqueOrThrow.mockResolvedValue({ id: "opp-1", type: "consulting", status: "researching" });
  mockedPersist.mockResolvedValue({ id: "score-1" });
});

describe("workbench actions", () => {
  it("surfaces the specific lifecycle blocking reason to Todd", async () => {
    mockedTransition.mockReturnValueOnce({
      ok: false,
      blockingReason: "A reason is required to move an opportunity to paused.",
      requiresReason: true,
    });
    const formData = new FormData();
    formData.set("opportunityId", "opp-1");
    formData.set("toStatus", "paused");

    await expect(updateOpportunityStatus(formData)).rejects.toThrow(
      "REDIRECT:/tif/oi/opportunities/opp-1?statusError=A%20reason%20is%20required%20to%20move%20an%20opportunity%20to%20paused.",
    );
    expect(redirect).toHaveBeenCalled();
  });

  it("resolves a research gap, creates an operator override fact, and rescores in one transaction", async () => {
    const tx = {
      oiOpportunityFact: {
        create: vi.fn(),
      },
      oiResearchGap: {
        update: vi.fn(),
      },
      oiOpportunity: {
        findUniqueOrThrow: vi.fn().mockResolvedValue(scoreInputOpportunity()),
        update: vi.fn(),
      },
      oiScore: {
        create: vi.fn().mockResolvedValue({ id: "score-1" }),
      },
    };
    mockedDb.$transaction.mockImplementationOnce(async (callback) => callback(tx));
    const formData = new FormData();
    formData.set("opportunityId", "opp-1");
    formData.set("gapId", "gap-1");
    formData.set("field", "incumbent");
    formData.set("finding", "No incumbent SI found.");

    await resolveResearchGap(formData);

    expect(tx.oiOpportunityFact.create).toHaveBeenCalledWith({
      data: expect.objectContaining({
        opportunityId: "opp-1",
        field: "incumbent",
        value: "No incumbent SI found.",
        basis: "operator",
        isOperatorOverride: true,
      }),
    });
    expect(tx.oiResearchGap.update).toHaveBeenCalledWith({
      where: { id: "gap-1" },
      data: expect.objectContaining({
        status: "resolved",
        resolution: "No incumbent SI found.",
      }),
    });
    expect(scoreOpportunity).toHaveBeenCalled();
    expect(mockedPersist).toHaveBeenCalledWith(tx, "opp-1", expect.any(Object), expect.objectContaining({ opportunityId: "opp-1" }));
  });
});

function scoreInputOpportunity() {
  return {
    id: "opp-1",
    type: "consulting",
    status: "researching",
    estimatedValueLow: null,
    estimatedValueHigh: null,
    conversionProbability: null,
    estimatedHours: null,
    disqualifiedReason: null,
    lastActivityAt: null,
    organization: { tier: 1 },
    initiative: null,
    facts: [
      {
        field: "business_problem",
        value: "Platform delay",
        normalizedValue: "platform delay",
        basis: "operator",
        confidence: 90,
        isOperatorOverride: true,
      },
    ],
    sourceLinks: [],
    researchGaps: [],
    offer: null,
    roleProfile: null,
    stakeholders: [],
  };
}
