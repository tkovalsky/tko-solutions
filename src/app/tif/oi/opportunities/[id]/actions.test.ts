import { beforeEach, describe, expect, it, vi } from "vitest";
import { redirect } from "next/navigation";
import { canTransition } from "@/lib/opportunity-intelligence/commercial/lifecycle";
import { persistOpportunityScore, scoreOpportunity } from "@/lib/opportunity-intelligence/commercial/score";
import { isContactPointOutreachEligible } from "@/lib/opportunity-intelligence/intelligence/contact-point";
import { tifDb } from "@/lib/tif/db";
import {
  addContactPoint,
  addOperatorFact,
  addPersonFact,
  addStakeholder,
  dismissResearchGap,
  markDoNotContact,
  resolveResearchGap,
  selectOffer,
  selectStakeholder,
  updateOpportunityStatus,
  updateStakeholder,
} from "./actions";

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
    oiOpportunityFact: {
      create: vi.fn(),
    },
    oiResearchGap: {
      update: vi.fn(),
    },
    oiContactPoint: {
      create: vi.fn(),
    },
    oiOffer: {
      findUnique: vi.fn(),
    },
    oiSource: {
      findUnique: vi.fn(),
    },
    oiEvidence: {
      upsert: vi.fn(),
    },
  },
}));

const mockedDb = vi.mocked(tifDb);
const mockedTransition = vi.mocked(canTransition);
const mockedPersist = vi.mocked(persistOpportunityScore);

beforeEach(() => {
  vi.clearAllMocks();
  vi.useRealTimers();
  mockedDb.oiOpportunity.findUniqueOrThrow.mockResolvedValue({ id: "opp-1", type: "consulting", status: "researching" });
  mockedDb.oiOffer.findUnique.mockResolvedValue({
    id: "offer-1",
    name: "Operational Recovery Assessment",
    isActive: true,
  });
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
      oiNextAction: nextActionTx({
        type: "close_research_gap",
        description: "Close the blocking research gap",
      }),
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
    expect(tx.oiNextAction.updateMany).toHaveBeenCalledWith({
      where: { opportunityId: "opp-1", status: "open" },
      data: { status: "cancelled" },
    });
    expect(tx.oiNextAction.create).toHaveBeenCalledWith({
      data: expect.objectContaining({
        opportunityId: "opp-1",
        status: "open",
        type: "approve_initiative",
        description: "Approve the initiative",
      }),
    });
  });

  it("prevents selecting a stakeholder with no evidence and no operator confirmation", async () => {
    const tx = {
      oiStakeholder: {
        findUniqueOrThrow: vi.fn().mockResolvedValue({
          id: "stakeholder-1",
          roleEvidenceUrl: null,
          roleEvidenceLabel: null,
          roleConfidence: 50,
          person: { doNotContact: false },
        }),
        updateMany: vi.fn(),
        update: vi.fn(),
      },
      oiOpportunity: {
        findUniqueOrThrow: vi.fn().mockResolvedValue(scoreInputOpportunity()),
        update: vi.fn(),
      },
      oiScore: { create: vi.fn().mockResolvedValue({ id: "score-1" }) },
    };
    mockedDb.$transaction.mockImplementationOnce(async (callback) => callback(tx));
    const formData = new FormData();
    formData.set("opportunityId", "opp-1");
    formData.set("stakeholderId", "stakeholder-1");

    await expect(selectStakeholder(formData)).rejects.toThrow(
      "REDIRECT:/tif/oi/opportunities/opp-1?actionError=Selection%20requires%20role%20evidence%20or%20explicit%20operator%20confirmation.",
    );
    expect(tx.oiStakeholder.update).not.toHaveBeenCalled();
  });

  it("prevents selecting a do-not-contact stakeholder", async () => {
    const tx = {
      oiStakeholder: {
        findUniqueOrThrow: vi.fn().mockResolvedValue({
          id: "stakeholder-1",
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

    await expect(selectStakeholder(formData)).rejects.toThrow(
      "REDIRECT:/tif/oi/opportunities/opp-1?actionError=A%20do-not-contact%20stakeholder%20cannot%20be%20selected.",
    );
    expect(tx.oiStakeholder.update).not.toHaveBeenCalled();
  });

  it("redirects invalid operator fact input to a visible workbench message", async () => {
    const formData = new FormData();
    formData.set("opportunityId", "opp-1");
    formData.set("field", " ");
    formData.set("value", "No incumbent SI found.");

    await expect(addOperatorFact(formData)).rejects.toThrow(
      "REDIRECT:/tif/oi/opportunities/opp-1?actionError=Fact%20field%20is%20required.",
    );
    expect(mockedDb.$transaction).not.toHaveBeenCalled();
  });

  it("requires contact point provenance and excludes pattern-inferred contact points from outreach eligibility", async () => {
    const missing = new FormData();
    missing.set("opportunityId", "opp-1");
    missing.set("personId", "person-1");
    missing.set("type", "email");
    missing.set("value", "person@example.com");

    await expect(addContactPoint(missing)).rejects.toThrow(
      "REDIRECT:/tif/oi/opportunities/opp-1?actionError=Invalid%20option%3A%20expected%20one%20of%20%22pattern_inferred%22%7C%22provider_discovered%22%7C%22publicly_listed%22%7C%22directly_provided%22%7C%22verified_deliverable%22",
    );
    expect(isContactPointOutreachEligible({ status: "active", provenance: "pattern_inferred" })).toBe(false);
    expect(isContactPointOutreachEligible({ status: "active", provenance: "publicly_listed" })).toBe(true);
  });

  it("adds a stakeholder and replaces identify-stakeholder with select-stakeholder", async () => {
    const tx = workbenchTx({
      existingAction: {
        type: "identify_stakeholder",
        description: "Identify the right stakeholder",
      },
      scoreInput: scoreInputOpportunity({
        initiative: { status: "active", approvedAt: new Date("2026-08-01T12:00:00Z") },
        stakeholders: [{ isSelected: false }],
      }),
    });
    mockedDb.$transaction.mockImplementationOnce(async (callback) => callback(tx));

    await addStakeholder(stakeholderForm());

    expect(tx.oiNextAction.updateMany).toHaveBeenCalledBefore(tx.oiNextAction.create);
    expect(tx.oiNextAction.create).toHaveBeenCalledWith({
      data: expect.objectContaining({
        type: "select_stakeholder",
        description: "Select the target stakeholder",
      }),
    });
  });

  it("selects a stakeholder and replaces select-stakeholder with select-offer", async () => {
    const tx = workbenchTx({
      existingAction: {
        type: "select_stakeholder",
        description: "Select the target stakeholder",
      },
      scoreInput: scoreInputOpportunity({
        initiative: { status: "active", approvedAt: new Date("2026-08-01T12:00:00Z") },
        stakeholders: [{ isSelected: true }],
      }),
    });
    tx.oiStakeholder.findUniqueOrThrow.mockResolvedValue({
      id: "stakeholder-1",
      roleEvidenceUrl: "https://example.com",
      roleEvidenceLabel: null,
      roleConfidence: 100,
      person: { doNotContact: false },
    });
    mockedDb.$transaction.mockImplementationOnce(async (callback) => callback(tx));

    const formData = new FormData();
    formData.set("opportunityId", "opp-1");
    formData.set("stakeholderId", "stakeholder-1");
    await selectStakeholder(formData);

    expect(tx.oiNextAction.updateMany).toHaveBeenCalledBefore(tx.oiNextAction.create);
    expect(tx.oiNextAction.create).toHaveBeenCalledWith({
      data: expect.objectContaining({
        type: "select_offer",
        description: "Select the offer",
      }),
    });
  });

  it("re-derives the next action on status change", async () => {
    mockedTransition.mockReturnValueOnce({ ok: true, requiresReason: false });
    const tx = workbenchTx({
      existingAction: {
        type: "review_stale",
        description: "Review stale opportunity",
      },
      scoreInput: scoreInputOpportunity({
        status: "qualified",
        initiative: { status: "active", approvedAt: new Date("2026-08-01T12:00:00Z") },
        stakeholders: [{ isSelected: true }],
      }),
    });
    mockedDb.$transaction.mockImplementationOnce(async (callback) => callback(tx));
    const formData = new FormData();
    formData.set("opportunityId", "opp-1");
    formData.set("toStatus", "qualified");

    await updateOpportunityStatus(formData);

    expect(tx.oiNextAction.updateMany).toHaveBeenCalledBefore(tx.oiNextAction.create);
    expect(tx.oiNextAction.create).toHaveBeenCalledWith({
      data: expect.objectContaining({
        type: "select_offer",
        description: "Select the offer",
      }),
    });
  });

  it.each([
    ["qualify_opportunity", "qualified"],
    ["disqualify_opportunity", "dismissed"],
    ["close_opportunity", "closed"],
    ["pause_opportunity", "paused"],
  ] as const)("captures a %s decision with the score snapshot", async (decisionType, toStatus) => {
    mockedTransition.mockReturnValueOnce({ ok: true, requiresReason: ["dismissed", "closed", "paused"].includes(toStatus) });
    const tx = workbenchTx({
      existingAction: {
        type: "review_stale",
        description: "Review stale opportunity",
      },
      scoreInput: scoreInputOpportunity({
        status: toStatus,
        initiative: { status: "active", approvedAt: new Date("2026-08-01T12:00:00Z") },
        stakeholders: [{ isSelected: true }],
      }),
    });
    tx.oiOpportunity.findUniqueOrThrow
      .mockResolvedValueOnce({
        id: "opp-1",
        currentScore: {
          id: "score-current",
          expectedValue: 1200,
          estimatedHours: 3,
          conversionProbability: 40,
        },
      })
      .mockResolvedValue(scoreInputOpportunity({
        status: toStatus,
        initiative: { status: "active", approvedAt: new Date("2026-08-01T12:00:00Z") },
        stakeholders: [{ isSelected: true }],
      }));
    mockedDb.$transaction.mockImplementationOnce(async (callback) => callback(tx));
    const formData = new FormData();
    formData.set("opportunityId", "opp-1");
    formData.set("toStatus", toStatus);
    formData.set("decisionType", decisionType);
    formData.set("decision", toStatus);
    formData.set("decisionReason", "Operator made this decision.");
    formData.set("decisionConfidence", "high");
    formData.set("expectedOutcome", "Expected result.");

    await updateOpportunityStatus(formData);

    expect(mockedTransition).toHaveBeenCalledWith(
      expect.objectContaining({
        to: toStatus,
        reason: "Operator made this decision.",
      }),
    );
    expect(tx.oiDecision.create).toHaveBeenCalledWith({
      data: expect.objectContaining({
        opportunityId: "opp-1",
        type: decisionType,
        decision: toStatus,
        reason: "Operator made this decision.",
        confidence: "high",
        expectedOutcome: "Expected result.",
        scoreIdAtDecision: "score-current",
        expectedValue: 1200,
        expectedEffortHours: 3,
        expectedProbability: 40,
      }),
    });
  });

  it("does not create a new row when the derived action is unchanged", async () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-08-01T12:00:00Z"));
    const createdAt = new Date("2026-07-31T12:00:00Z");
    const dueAt = new Date("2026-08-01T12:00:00Z");
    const tx = workbenchTx({
      existingAction: {
        type: "approve_initiative",
        description: "Approve the initiative",
        dueAt,
        createdAt,
      },
      scoreInput: scoreInputOpportunity(),
    });
    mockedDb.$transaction.mockImplementationOnce(async (callback) => callback(tx));

    await addOperatorFact(factForm());

    expect(tx.oiNextAction.updateMany).not.toHaveBeenCalled();
    expect(tx.oiNextAction.create).not.toHaveBeenCalled();
    expect(tx.oiNextAction.findFirst).toHaveBeenCalledWith({
      where: { opportunityId: "opp-1", status: "open" },
      select: { id: true, type: true, description: true, dueAt: true },
    });
  });

  it.each([
    ["resolveResearchGap", () => resolveResearchGap(gapForm()), (tx: ReturnType<typeof workbenchTx>) => tx],
    ["dismissResearchGap", () => dismissResearchGap(dismissGapForm()), (tx: ReturnType<typeof workbenchTx>) => tx],
    ["addOperatorFact", () => addOperatorFact(factForm()), (tx: ReturnType<typeof workbenchTx>) => tx],
    ["addStakeholder", () => addStakeholder(stakeholderForm()), (tx: ReturnType<typeof workbenchTx>) => tx],
    ["updateStakeholder", () => updateStakeholder(stakeholderForm("stakeholder-1")), (tx: ReturnType<typeof workbenchTx>) => tx],
    ["selectStakeholder", () => selectStakeholder(selectStakeholderForm()), (tx: ReturnType<typeof workbenchTx>) => {
      tx.oiStakeholder.findUniqueOrThrow.mockResolvedValue({
        id: "stakeholder-1",
        roleEvidenceUrl: "https://example.com",
        roleEvidenceLabel: null,
        roleConfidence: 100,
        person: { doNotContact: false },
      });
      return tx;
    }],
    ["markDoNotContact", () => markDoNotContact(selectStakeholderForm()), (tx: ReturnType<typeof workbenchTx>) => tx],
    ["addContactPoint", () => addContactPoint(contactPointForm()), (tx: ReturnType<typeof workbenchTx>) => tx],
    ["updateOpportunityStatus", () => {
      mockedTransition.mockReturnValueOnce({ ok: true, requiresReason: false });
      const formData = new FormData();
      formData.set("opportunityId", "opp-1");
      formData.set("toStatus", "qualified");
      return updateOpportunityStatus(formData);
    }, (tx: ReturnType<typeof workbenchTx>) => tx],
  ])("%s cancels the open next action before creating the successor", async (_name, action, prepareTx) => {
    const tx = prepareTx(
      workbenchTx({
        existingAction: {
          type: "close_research_gap",
          description: "Close the blocking research gap",
        },
        scoreInput: scoreInputOpportunity({
          initiative: { status: "active", approvedAt: new Date("2026-08-01T12:00:00Z") },
          stakeholders: [{ isSelected: false }],
        }),
      }),
    );
    mockedDb.$transaction.mockImplementationOnce(async (callback) => callback(tx));

    await action();

    expect(tx.oiNextAction.updateMany).toHaveBeenCalledWith({
      where: { opportunityId: "opp-1", status: "open" },
      data: { status: "cancelled" },
    });
    expect(tx.oiNextAction.updateMany).toHaveBeenCalledBefore(tx.oiNextAction.create);
    expect(tx.oiNextAction.create).toHaveBeenCalledTimes(1);
  });

  it("selects an offer and advances the consulting opportunity past select_offer", async () => {
    const tx = workbenchTx({
      existingAction: {
        type: "select_offer",
        description: "Select the offer",
      },
      // The score input reflects post-selection state: initiative approved, stakeholder
      // selected, offer now set.
      scoreInput: scoreInputOpportunity({
        offerId: "offer-1",
        offer: { valueLow: 18_000, valueHigh: 26_000 },
        initiative: { status: "active", approvedAt: new Date("2026-08-01T12:00:00Z") },
        stakeholders: [{ isSelected: true }],
      }),
    });
    mockedDb.$transaction.mockImplementationOnce(async (callback) => callback(tx));

    const formData = new FormData();
    formData.set("opportunityId", "opp-1");
    formData.set("offerId", "offer-1");
    await selectOffer(formData);

    expect(tx.oiOpportunity.update).toHaveBeenCalledWith({
      where: { id: "opp-1" },
      data: expect.objectContaining({ offerId: "offer-1" }),
    });
    expect(tx.oiActivity.create).toHaveBeenCalledWith({
      data: expect.objectContaining({
        opportunityId: "opp-1",
        summary: "Selected offer: Operational Recovery Assessment.",
      }),
    });
    expect(tx.oiNextAction.updateMany).toHaveBeenCalledBefore(tx.oiNextAction.create);
    expect(tx.oiNextAction.create).toHaveBeenCalledWith({
      data: expect.objectContaining({
        opportunityId: "opp-1",
        status: "open",
        type: "prepare_outreach",
      }),
    });
  });

  it("rejects an offer id that does not resolve to an active offer", async () => {
    mockedDb.oiOffer.findUnique.mockResolvedValueOnce({ id: "offer-1", name: "Retired offer", isActive: false });
    const formData = new FormData();
    formData.set("opportunityId", "opp-1");
    formData.set("offerId", "offer-1");

    await expect(selectOffer(formData)).rejects.toThrow(
      "REDIRECT:/tif/oi/opportunities/opp-1?actionError=That%20offer%20is%20not%20active.",
    );
    expect(mockedDb.$transaction).not.toHaveBeenCalled();
  });

  it("rejects an offer selection with no offer id", async () => {
    const formData = new FormData();
    formData.set("opportunityId", "opp-1");

    await expect(selectOffer(formData)).rejects.toThrow(
      "REDIRECT:/tif/oi/opportunities/opp-1?actionError=An%20offer%20is%20required.",
    );
    expect(mockedDb.$transaction).not.toHaveBeenCalled();
  });

  it("blocks a pause transition that carries no decision reason", async () => {
    mockedTransition.mockReturnValueOnce({ ok: true, requiresReason: true });
    const formData = new FormData();
    formData.set("opportunityId", "opp-1");
    formData.set("toStatus", "paused");

    await expect(updateOpportunityStatus(formData)).rejects.toThrow(
      "REDIRECT:/tif/oi/opportunities/opp-1?statusError=A%20decision%20reason%20is%20required%20to%20move%20an%20opportunity%20to%20paused.",
    );
    expect(mockedDb.$transaction).not.toHaveBeenCalled();
  });

  it.each(["paused", "dismissed", "closed"] as const)(
    "captures a decision for a %s transition made from the generic status form",
    async (toStatus) => {
      mockedTransition.mockReturnValueOnce({ ok: true, requiresReason: true });
      const tx = workbenchTx({
        existingAction: { type: "review_stale", description: "Review stale opportunity" },
        scoreInput: scoreInputOpportunity({ status: toStatus }),
      });
      tx.oiOpportunity.findUniqueOrThrow
        .mockResolvedValueOnce({
          id: "opp-1",
          currentScore: {
            id: "score-current",
            expectedValue: 1200,
            estimatedHours: 3,
            conversionProbability: 40,
          },
        })
        .mockResolvedValue(scoreInputOpportunity({ status: toStatus }));
      mockedDb.$transaction.mockImplementationOnce(async (callback) => callback(tx));

      // No decisionType and no decisionReason — only the generic form's `reason` field.
      const formData = new FormData();
      formData.set("opportunityId", "opp-1");
      formData.set("toStatus", toStatus);
      formData.set("reason", "No budget confirmed this quarter.");

      await updateOpportunityStatus(formData);

      expect(tx.oiDecision.create).toHaveBeenCalledWith({
        data: expect.objectContaining({
          opportunityId: "opp-1",
          type: toStatus === "paused" ? "pause_opportunity" : toStatus === "dismissed" ? "disqualify_opportunity" : "close_opportunity",
          reason: "No budget confirmed this quarter.",
          scoreIdAtDecision: "score-current",
          expectedValue: 1200,
        }),
      });
    },
  );

  it("writes person facts with only personId set", async () => {
    const formData = new FormData();
    formData.set("personId", "person-1");
    formData.set("field", "career");
    formData.set("value", "VP Operations at Regional Payer Health");
    formData.set("basis", "operator");
    formData.set("confidence", "90");

    await addPersonFact(formData);

    expect(mockedDb.oiOpportunityFact.create).toHaveBeenCalledWith({
      data: expect.objectContaining({
        personId: "person-1",
        basis: "operator",
        confidence: 90,
      }),
    });
    expect(mockedDb.oiOpportunityFact.create.mock.calls[0][0].data).not.toHaveProperty("opportunityId");
    expect(mockedDb.oiOpportunityFact.create.mock.calls[0][0].data).not.toHaveProperty("initiativeId");
  });

  it("rejects a stated person fact submitted with no source reference", async () => {
    const formData = new FormData();
    formData.set("personId", "person-1");
    formData.set("field", "career");
    formData.set("value", "VP Operations at Regional Payer Health");
    formData.set("basis", "stated");
    formData.set("confidence", "95");

    await expect(addPersonFact(formData)).rejects.toThrow(
      /A stated fact requires sourceId, startOffset, endOffset, and excerpt/,
    );
    expect(mockedDb.oiOpportunityFact.create).not.toHaveBeenCalled();
  });

  it("rejects a stated person fact whose offsets do not resolve in the source text", async () => {
    mockedDb.oiSource.findUnique.mockResolvedValue({
      id: "source-1",
      rawContent: "Sarah Chen leads care management operations.",
    });
    const formData = new FormData();
    formData.set("personId", "person-1");
    formData.set("field", "career");
    formData.set("value", "Runs the PMO");
    formData.set("basis", "stated");
    formData.set("sourceId", "source-1");
    formData.set("startOffset", "0");
    formData.set("endOffset", "11");
    formData.set("excerpt", "Runs the PMO");

    await expect(addPersonFact(formData)).rejects.toThrow(
      "Stated fact offsets do not resolve to the supplied excerpt in the source text.",
    );
    expect(mockedDb.oiEvidence.upsert).not.toHaveBeenCalled();
    expect(mockedDb.oiOpportunityFact.create).not.toHaveBeenCalled();
  });

  it("rejects a stated person fact pointing at a source that does not exist", async () => {
    mockedDb.oiSource.findUnique.mockResolvedValue(null);
    const formData = new FormData();
    formData.set("personId", "person-1");
    formData.set("field", "career");
    formData.set("value", "Sarah Chen");
    formData.set("basis", "stated");
    formData.set("sourceId", "missing-source");
    formData.set("startOffset", "0");
    formData.set("endOffset", "10");
    formData.set("excerpt", "Sarah Chen");

    await expect(addPersonFact(formData)).rejects.toThrow("A stated fact requires an existing source.");
    expect(mockedDb.oiOpportunityFact.create).not.toHaveBeenCalled();
  });

  it("accepts a stated person fact whose offsets round-trip against the source", async () => {
    mockedDb.oiSource.findUnique.mockResolvedValue({
      id: "source-1",
      rawContent: "Sarah Chen leads care management operations.",
    });
    mockedDb.oiEvidence.upsert.mockResolvedValue({ id: "evidence-1" });
    const formData = new FormData();
    formData.set("personId", "person-1");
    formData.set("field", "career");
    formData.set("value", "Sarah Chen");
    formData.set("basis", "stated");
    formData.set("sourceId", "source-1");
    formData.set("startOffset", "0");
    formData.set("endOffset", "10");
    formData.set("excerpt", "Sarah Chen");

    await addPersonFact(formData);

    expect(mockedDb.oiEvidence.upsert).toHaveBeenCalledWith(
      expect.objectContaining({
        where: {
          sourceId_startOffset_endOffset: { sourceId: "source-1", startOffset: 0, endOffset: 10 },
        },
      }),
    );
    expect(mockedDb.oiOpportunityFact.create).toHaveBeenCalledWith({
      data: expect.objectContaining({
        personId: "person-1",
        basis: "stated",
        evidenceId: "evidence-1",
        isOperatorOverride: false,
      }),
    });
  });
});

function workbenchTx({
  existingAction,
  scoreInput = scoreInputOpportunity(),
}: {
  existingAction: { type: string; description: string; dueAt?: Date | null; createdAt?: Date };
  scoreInput?: ReturnType<typeof scoreInputOpportunity>;
}) {
  return {
    oiOpportunityFact: {
      create: vi.fn(),
    },
    oiResearchGap: {
      update: vi.fn(),
    },
    oiOpportunity: {
      findUniqueOrThrow: vi.fn().mockResolvedValue(scoreInput),
      update: vi.fn(),
    },
    oiActivity: {
      create: vi.fn(),
    },
    oiDecision: {
      create: vi.fn(),
    },
    oiContactPoint: {
      create: vi.fn(),
    },
    oiPerson: {
      upsert: vi.fn().mockResolvedValue({ id: "person-1" }),
      update: vi.fn(),
    },
    oiStakeholder: {
      upsert: vi.fn(),
      update: vi.fn().mockResolvedValue({ personId: "person-1" }),
      updateMany: vi.fn(),
      findUniqueOrThrow: vi.fn().mockResolvedValue({ personId: "person-1" }),
    },
    oiNextAction: nextActionTx(existingAction),
    oiScore: {
      create: vi.fn().mockResolvedValue({ id: "score-1" }),
    },
  };
}

function nextActionTx(existingAction: { type: string; description: string; dueAt?: Date | null; createdAt?: Date }) {
  return {
    findFirst: vi.fn().mockResolvedValue({
      id: "next-1",
      type: existingAction.type,
      description: existingAction.description,
      dueAt: existingAction.dueAt ?? new Date("2026-07-31T12:00:00Z"),
      createdAt: existingAction.createdAt ?? new Date("2026-07-30T12:00:00Z"),
    }),
    updateMany: vi.fn(),
    create: vi.fn(),
  };
}

function gapForm() {
  const formData = new FormData();
  formData.set("opportunityId", "opp-1");
  formData.set("gapId", "gap-1");
  formData.set("field", "incumbent");
  formData.set("finding", "No incumbent SI found.");
  return formData;
}

function dismissGapForm() {
  const formData = new FormData();
  formData.set("opportunityId", "opp-1");
  formData.set("gapId", "gap-1");
  formData.set("operatorNotes", "Not needed.");
  return formData;
}

function factForm() {
  const formData = new FormData();
  formData.set("opportunityId", "opp-1");
  formData.set("field", "incumbent");
  formData.set("value", "No incumbent SI found.");
  formData.set("confidence", "90");
  return formData;
}

function stakeholderForm(stakeholderId?: string) {
  const formData = new FormData();
  formData.set("opportunityId", "opp-1");
  if (stakeholderId) formData.set("stakeholderId", stakeholderId);
  formData.set("personName", "Taylor Buyer");
  formData.set("title", "VP Operations");
  formData.set("role", "economic_buyer");
  formData.set("authority", "high");
  formData.set("relationshipType", "cold");
  formData.set("roleConfidence", "100");
  formData.set("operatorConfirmed", "on");
  return formData;
}

function selectStakeholderForm() {
  const formData = new FormData();
  formData.set("opportunityId", "opp-1");
  formData.set("stakeholderId", "stakeholder-1");
  return formData;
}

function contactPointForm() {
  const formData = new FormData();
  formData.set("opportunityId", "opp-1");
  formData.set("personId", "person-1");
  formData.set("type", "email");
  formData.set("value", "person@example.com");
  formData.set("provenance", "publicly_listed");
  return formData;
}

function scoreInputOpportunity(overrides: Partial<ReturnType<typeof scoreInputOpportunity>> = {}) {
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
    ...overrides,
  };
}
