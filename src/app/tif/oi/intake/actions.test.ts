import { beforeEach, describe, expect, it, vi } from "vitest";
import { captureManualIntake, dismissSignal, promoteSignal } from "./actions";
import { ingestPastedOpportunity } from "@/lib/opportunity-intelligence/intake/ingest";
import { tifDb } from "@/lib/tif/db";

vi.mock("next/cache", () => ({
  revalidatePath: vi.fn(),
}));

vi.mock("next/navigation", () => ({
  redirect: vi.fn((url: string) => {
    throw new Error(`REDIRECT:${url}`);
  }),
}));

vi.mock("@/lib/opportunity-intelligence/intake/ingest", () => ({
  ingestPastedOpportunity: vi.fn(),
}));

vi.mock("@/lib/tif/db", () => ({
  tifDb: {
    $transaction: vi.fn(),
  },
}));

const mockedIngest = vi.mocked(ingestPastedOpportunity);
const mockedDb = vi.mocked(tifDb);

const LONG_SOURCE = `${"Director, Healthcare Transformation. ".repeat(8)}
Reports to the COO and owns immediate modernization using FHIR. Compensation is $240,000 per year.`;

beforeEach(() => {
  vi.clearAllMocks();
  mockedIngest.mockResolvedValue({
    created: true,
    duplicate: false,
    sourceId: "source-1",
    opportunityId: "opportunity-1",
    scoreId: "score-1",
    facts: [],
    gaps: [],
  });
});

describe("captureManualIntake", () => {
  it("rejects invalid source content with a visible redirect error", async () => {
    const formData = validForm();
    formData.set("rawContent", "Too short.");

    await expect(captureManualIntake(formData)).rejects.toThrow(
      "REDIRECT:/tif/oi/intake?error=Too%20short%20to%20extract%20from",
    );
    expect(mockedIngest).not.toHaveBeenCalled();
  });

  it("calls ingestion and redirects to the created review state", async () => {
    await expect(captureManualIntake(validForm())).rejects.toThrow(
      "REDIRECT:/tif/oi/intake?capture=created&sourceId=source-1&opportunityId=opportunity-1",
    );

    expect(mockedIngest).toHaveBeenCalledWith(
      {
        organization: { name: "Example Health" },
        title: "Director, Healthcare Transformation",
        rawContent: LONG_SOURCE,
        sourceType: "pasted_text",
        canonicalUrl: "https://example.com/jobs/123",
        publishedAt: null,
        allowDuplicateVersion: false,
      },
      tifDb,
    );
  });

  it("passes source type and published date into ingestion", async () => {
    const formData = validForm();
    formData.set("sourceType", "job_posting");
    formData.set("publishedAt", "2026-07-15");

    await expect(captureManualIntake(formData)).rejects.toThrow(
      "REDIRECT:/tif/oi/intake?capture=created&sourceId=source-1&opportunityId=opportunity-1",
    );

    expect(mockedIngest).toHaveBeenCalledWith(
      expect.objectContaining({
        sourceType: "job_posting",
        publishedAt: new Date("2026-07-15T00:00:00"),
      }),
      tifDb,
    );
  });

  it("shows the duplicate review state without silently creating a new source", async () => {
    mockedIngest.mockResolvedValue({
      created: false,
      duplicate: true,
      sourceId: "source-existing",
      opportunityId: "opportunity-existing",
      scoreId: "score-existing",
      facts: [],
      gaps: [],
    });

    await expect(captureManualIntake(validForm())).rejects.toThrow(
      "REDIRECT:/tif/oi/intake?capture=duplicate&sourceId=source-existing&opportunityId=opportunity-existing",
    );
  });

  it("captures a new source version when Capture anyway is submitted", async () => {
    mockedIngest.mockResolvedValue({
      created: true,
      duplicate: false,
      sourceId: "source-new",
      opportunityId: "opportunity-existing",
      scoreId: "score-new",
      facts: [],
      gaps: [],
    });
    const formData = validForm();
    formData.set("intent", "captureAnyway");

    await expect(captureManualIntake(formData)).rejects.toThrow(
      "REDIRECT:/tif/oi/intake?capture=created&sourceId=source-new&opportunityId=opportunity-existing",
    );

    expect(mockedIngest).toHaveBeenCalledWith(
      expect.objectContaining({
        allowDuplicateVersion: true,
      }),
      tifDb,
    );
  });
});

describe("dismissSignal", () => {
  it("rejects an empty dismiss reason", async () => {
    const formData = new FormData();
    formData.set("sourceId", "source-1");
    formData.set("opportunityId", "opportunity-1");
    formData.set("decisionReason", " ");

    await expect(dismissSignal(formData)).rejects.toThrow(
      "REDIRECT:/tif/oi/intake?error=Dismiss%20reason%20is%20required.",
    );
  });

  it("captures a dismiss-signal decision before dismissing the signal", async () => {
    const tx = {
      oiOpportunity: {
        findUniqueOrThrow: vi.fn().mockResolvedValue({
          id: "opportunity-1",
          currentScore: {
            id: "score-1",
            expectedValue: 1000,
            estimatedHours: 2,
            conversionProbability: 30,
          },
        }),
      },
      oiDecision: {
        create: vi.fn(),
      },
      oiSignal: {
        updateMany: vi.fn(),
      },
    };
    mockedDb.$transaction.mockImplementationOnce(async (callback) => callback(tx));
    const formData = new FormData();
    formData.set("sourceId", "source-1");
    formData.set("opportunityId", "opportunity-1");
    formData.set("decisionReason", "Not relevant.");
    formData.set("decisionConfidence", "high");
    formData.set("expectedOutcome", "No pursuit.");

    await expect(dismissSignal(formData)).rejects.toThrow(
      "REDIRECT:/tif/oi/intake?capture=reviewed&sourceId=source-1&opportunityId=opportunity-1",
    );

    expect(tx.oiDecision.create).toHaveBeenCalledWith({
      data: expect.objectContaining({
        opportunityId: "opportunity-1",
        type: "dismiss_signal",
        decision: "dismiss",
        reason: "Not relevant.",
        confidence: "high",
        expectedOutcome: "No pursuit.",
        scoreIdAtDecision: "score-1",
      }),
    });
    expect(tx.oiSignal.updateMany).toHaveBeenCalledWith({
      where: { sourceId: "source-1" },
      data: expect.objectContaining({
        status: "dismissed",
        dismissedReason: "Not relevant.",
      }),
    });
  });
});

describe("promoteSignal", () => {
  it("rejects malformed input when no opportunity type is selected", async () => {
    const formData = new FormData();
    formData.set("sourceId", "source-1");
    formData.set("opportunityId", "opportunity-1");

    await expect(promoteSignal(formData)).rejects.toThrow(
      "REDIRECT:/tif/oi/intake?error=Select%20at%20least%20one%20opportunity%20type%20to%20promote.",
    );
    expect(mockedDb.$transaction).not.toHaveBeenCalled();
  });

  it("creates exactly one open next action for a promoted opportunity", async () => {
    const tx = {
      oiSource: {
        findUniqueOrThrow: vi.fn().mockResolvedValue({
          id: "source-1",
          publishedAt: new Date("2026-08-01T12:00:00Z"),
          retrievedAt: new Date("2026-08-01T12:00:00Z"),
          organizationId: "org-1",
          organization: { id: "org-1", name: "Example Health", tier: 1, signals: [], initiatives: [] },
          signals: [{ id: "signal-1", occurredAt: new Date("2026-08-01T12:00:00Z"), createdAt: new Date("2026-08-01T12:00:00Z") }],
          opportunity: { id: "opportunity-1", facts: [], evidence: [], researchGaps: [] },
        }),
      },
      oiOpportunity: {
        findUniqueOrThrow: vi.fn().mockResolvedValue({
          id: "opportunity-1",
          currentScore: {
            id: "score-1",
            expectedValue: 1000,
            estimatedHours: 2,
            conversionProbability: 30,
          },
        }),
        create: vi.fn(),
        update: vi.fn().mockResolvedValue({
          id: "opportunity-1",
          type: "assessment",
          status: "identified",
          estimatedValueLow: null,
          estimatedValueHigh: null,
          conversionProbability: null,
          estimatedHours: null,
          disqualifiedReason: null,
          offerId: null,
          lastActivityAt: null,
          createdAt: new Date("2026-08-01T12:00:00Z"),
        }),
      },
      oiOpportunitySource: {
        upsert: vi.fn().mockResolvedValue({}),
        findMany: vi.fn().mockResolvedValue([
          {
            isPrimary: true,
            source: { publishedAt: new Date("2026-08-01T12:00:00Z"), retrievedAt: new Date("2026-08-01T12:00:00Z") },
          },
        ]),
      },
      oiOpportunityFact: {
        findMany: vi.fn().mockResolvedValue([]),
        createMany: vi.fn(),
      },
      oiResearchGap: {
        findMany: vi.fn().mockResolvedValue([]),
        createMany: vi.fn(),
      },
      oiScore: {
        create: vi.fn().mockResolvedValue({ id: "score-1" }),
      },
      oiNextAction: {
        findFirst: vi.fn().mockResolvedValue(null),
        create: vi.fn().mockResolvedValue({ id: "action-1" }),
      },
      oiSignal: {
        update: vi.fn().mockResolvedValue({}),
      },
      oiDecision: {
        create: vi.fn(),
      },
    };
    mockedDb.$transaction.mockImplementationOnce(async (callback) => callback(tx));
    const formData = new FormData();
    formData.set("sourceId", "source-1");
    formData.set("opportunityId", "opportunity-1");
    formData.append("opportunityType", "assessment");
    formData.set("decisionReason", "Worth pursuing.");
    formData.set("decisionConfidence", "medium");

    await expect(promoteSignal(formData)).rejects.toThrow(
      "REDIRECT:/tif/oi/intake?capture=reviewed&sourceId=source-1&opportunityId=opportunity-1",
    );
    expect(tx.oiOpportunity.create).not.toHaveBeenCalled();
    expect(tx.oiDecision.create).toHaveBeenCalledWith({
      data: expect.objectContaining({
        opportunityId: "opportunity-1",
        type: "promote_signal",
        decision: "assessment",
        reason: "Worth pursuing.",
        confidence: "medium",
        scoreIdAtDecision: "score-1",
      }),
    });
    expect(tx.oiOpportunity.update).toHaveBeenCalledWith({
      where: { id: "opportunity-1" },
      data: expect.objectContaining({
        title: "Example Health assessment opportunity",
        type: "assessment",
        status: "identified",
      }),
    });
    expect(tx.oiOpportunitySource.upsert).toHaveBeenCalledWith({
      where: {
        opportunityId_sourceId: {
          opportunityId: "opportunity-1",
          sourceId: "source-1",
        },
      },
      update: { isPrimary: true },
      create: {
        opportunityId: "opportunity-1",
        sourceId: "source-1",
        isPrimary: true,
      },
    });
    expect(tx.oiNextAction.findFirst).toHaveBeenCalledWith({
      where: { opportunityId: "opportunity-1", status: "open" },
      select: { id: true },
    });
    expect(tx.oiNextAction.create).toHaveBeenCalledTimes(1);
    expect(tx.oiNextAction.create).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({
          opportunityId: "opportunity-1",
          type: "approve_initiative",
          estimatedMinutes: 5,
        }),
      }),
    );
  });

  it("converts the staging opportunity and copies facts and gaps to additional selected types", async () => {
    const fact = {
      field: "business_problem",
      value: "Claims modernization is delayed.",
      normalizedValue: "claims modernization is delayed.",
      ordinal: 0,
      basis: "stated",
      confidence: 95,
      isOperatorOverride: false,
      aiGenerated: false,
      aiModel: null,
      promptVersion: null,
      evidenceId: "evidence-1",
    };
    const gap = {
      gapKey: "stakeholder_missing",
      question: "Who owns the work?",
      reason: "Outreach needs an owner.",
      status: "open",
      resolution: null,
      operatorNotes: null,
      resolvedAt: null,
      priority: 2,
      blocksOutreach: true,
      suggestedSources: ["leadership page"],
    };
    const tx = {
      oiSource: {
        findUniqueOrThrow: vi.fn().mockResolvedValue({
          id: "source-1",
          publishedAt: new Date("2026-08-01T12:00:00Z"),
          retrievedAt: new Date("2026-08-01T12:00:00Z"),
          organizationId: "org-1",
          organization: { id: "org-1", name: "Example Health", tier: 1, signals: [], initiatives: [] },
          signals: [{ id: "signal-1", occurredAt: new Date("2026-08-01T12:00:00Z"), createdAt: new Date("2026-08-01T12:00:00Z") }],
          opportunity: { id: "opportunity-1", facts: [fact], evidence: [{ id: "evidence-1" }], researchGaps: [gap] },
        }),
      },
      oiOpportunity: {
        findUniqueOrThrow: vi.fn().mockResolvedValue({
          id: "opportunity-1",
          currentScore: {
            id: "score-1",
            expectedValue: 1000,
            estimatedHours: 2,
            conversionProbability: 30,
          },
        }),
        update: vi.fn().mockResolvedValue({
          id: "opportunity-1",
          type: "consulting",
          status: "identified",
          estimatedValueLow: null,
          estimatedValueHigh: null,
          conversionProbability: null,
          estimatedHours: null,
          disqualifiedReason: null,
          offerId: null,
          lastActivityAt: null,
          createdAt: new Date("2026-08-01T12:00:00Z"),
        }),
        create: vi.fn().mockResolvedValue({
          id: "opportunity-2",
          type: "assessment",
          status: "identified",
          estimatedValueLow: null,
          estimatedValueHigh: null,
          conversionProbability: null,
          estimatedHours: null,
          disqualifiedReason: null,
          offerId: null,
          lastActivityAt: null,
          createdAt: new Date("2026-08-01T12:00:00Z"),
        }),
      },
      oiOpportunitySource: {
        upsert: vi.fn().mockResolvedValue({}),
        findMany: vi.fn().mockResolvedValue([
          {
            isPrimary: true,
            source: { publishedAt: new Date("2026-08-01T12:00:00Z"), retrievedAt: new Date("2026-08-01T12:00:00Z") },
          },
        ]),
      },
      oiOpportunityFact: {
        findMany: vi
          .fn()
          .mockResolvedValueOnce([fact])
          .mockResolvedValueOnce([fact]),
        createMany: vi.fn(),
      },
      oiResearchGap: {
        findMany: vi
          .fn()
          .mockResolvedValueOnce([{ status: "open", blocksOutreach: true }])
          .mockResolvedValueOnce([{ status: "open", blocksOutreach: true }]),
        createMany: vi.fn(),
      },
      oiScore: {
        create: vi.fn().mockResolvedValue({ id: "score-1" }),
      },
      oiNextAction: {
        findFirst: vi.fn().mockResolvedValue(null),
        create: vi.fn().mockResolvedValue({ id: "action-1" }),
      },
      oiSignal: {
        update: vi.fn().mockResolvedValue({}),
      },
      oiDecision: {
        create: vi.fn(),
      },
    };
    mockedDb.$transaction.mockImplementationOnce(async (callback) => callback(tx));
    const formData = new FormData();
    formData.set("sourceId", "source-1");
    formData.set("opportunityId", "opportunity-1");
    formData.append("opportunityType", "consulting");
    formData.append("opportunityType", "assessment");
    formData.set("decisionReason", "Two viable paths.");
    formData.set("decisionConfidence", "high");

    await expect(promoteSignal(formData)).rejects.toThrow(
      "REDIRECT:/tif/oi/intake?capture=reviewed&sourceId=source-1&opportunityId=opportunity-1",
    );

    expect(tx.oiOpportunity.update).toHaveBeenCalledWith({
      where: { id: "opportunity-1" },
      data: expect.objectContaining({
        type: "consulting",
        status: "identified",
      }),
    });
    expect(tx.oiDecision.create).toHaveBeenCalledWith({
      data: expect.objectContaining({
        opportunityId: "opportunity-1",
        type: "promote_signal",
        decision: "consulting,assessment",
        reason: "Two viable paths.",
        confidence: "high",
      }),
    });
    expect(tx.oiOpportunity.create).toHaveBeenCalledTimes(1);
    expect(tx.oiOpportunitySource.upsert).toHaveBeenCalledTimes(2);
    expect(tx.oiOpportunityFact.createMany).toHaveBeenCalledWith({
      data: [
        expect.objectContaining({
          opportunityId: "opportunity-2",
          field: "business_problem",
          evidenceId: "evidence-1",
        }),
      ],
    });
    expect(tx.oiResearchGap.createMany).toHaveBeenCalledWith({
      data: [
        expect.objectContaining({
          opportunityId: "opportunity-2",
          gapKey: "stakeholder_missing",
          blocksOutreach: true,
        }),
      ],
    });
  });
});

function validForm() {
  const formData = new FormData();
  formData.set("rawContent", LONG_SOURCE);
  formData.set("canonicalUrl", "https://example.com/jobs/123");
  formData.set("organizationName", "Example Health");
  formData.set("title", "Director, Healthcare Transformation");
  return formData;
}
