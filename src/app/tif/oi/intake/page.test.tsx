import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { tifDb } from "@/lib/tif/db";
import OiIntakePage, { dynamic, metadata } from "./page";

vi.mock("@/lib/tif/db", () => ({
  tifDb: {
    oiOpportunity: {
      findUnique: vi.fn(),
    },
    oiSignal: {
      findMany: vi.fn(),
    },
  },
}));

vi.mock("./actions", () => ({
  captureManualIntake: vi.fn(),
  dismissSignal: vi.fn(),
  promoteProposedInitiative: vi.fn(),
  promoteSignal: vi.fn(),
  watchAccount: vi.fn(),
}));

const reviewFixture = {
  id: "opportunity-1",
  title: "Director, Healthcare Transformation",
  organization: {
    name: "Example Health",
    domain: "example.com",
    website: "https://example.com",
    tier: 1,
    isWatched: false,
    kind: "payer",
    signals: [
      {
        id: "signal-1",
        tier: "tier_1",
        signalType: "senior_role_posting",
        summary: "Director, Healthcare Transformation",
        occurredAt: new Date("2026-07-31T12:00:00Z"),
        createdAt: new Date("2026-07-31T12:00:00Z"),
        domainTags: ["interoperability", "workflow_modernization"],
        source: {
          canonicalUrl: "https://example.com/jobs/123",
          retrievedAt: new Date("2026-07-31T12:00:00Z"),
        },
      },
    ],
    initiatives: [],
  },
  facts: [
    {
      id: "fact-1",
      field: "technology",
      value: "FHIR",
      normalizedValue: "fhir",
      confidence: 95,
      evidence: {
        excerpt: "Own delivery using FHIR.",
        startOffset: 20,
        endOffset: 44,
      },
    },
  ],
  researchGaps: [
    {
      id: "gap-1",
      question: "Who owns or sponsors this work?",
      reason: "Budget authority is not yet clear.",
    },
  ],
  currentScore: {
    id: "score-1",
    fitScore: 100,
    evidenceScore: 65,
    accessScore: 0,
    urgencyScore: 50,
    priorityEfficiency: 939,
    estimatedValue: 40250,
    conversionProbability: 14,
    expectedValue: 5635,
    estimatedHours: 6,
    isDisqualified: false,
    disqualifyingRules: [],
  },
  nextActions: [
    {
      id: "action-1",
      type: "identify_stakeholder",
      description: "Identify the right stakeholder",
      rationale: "No stakeholder is identified for this opportunity.",
      estimatedMinutes: 15,
      dueAt: new Date("2026-08-01T12:00:00Z"),
    },
  ],
  sources: [
    {
      id: "source-1",
      sourceType: "job_posting",
      canonicalUrl: "https://example.com/jobs/123",
      rawContent:
        "Director, Healthcare Transformation. Reports to the COO. Own delivery using FHIR and workflow modernization. Compensation is $240,000 per year.",
      publishedAt: new Date("2026-07-31T12:00:00Z"),
      retrievedAt: new Date("2026-07-31T12:00:00Z"),
      signals: [
        {
          id: "signal-1",
          tier: "tier_1",
          signalType: "senior_role_posting",
          summary: "Director, Healthcare Transformation",
          occurredAt: new Date("2026-07-31T12:00:00Z"),
          createdAt: new Date("2026-07-31T12:00:00Z"),
          domainTags: ["interoperability", "workflow_modernization"],
        },
      ],
    },
  ],
  sourceLinks: [],
};

function triageSignal(overrides: Record<string, unknown> = {}) {
  return {
    id: "triage-signal-1",
    tier: "tier_1",
    signalType: "senior_role_posting",
    status: "captured",
    summary: "New transformation role opened",
    occurredAt: new Date("2026-08-01T12:00:00Z"),
    createdAt: new Date("2026-08-01T12:00:00Z"),
    confidence: 91,
    domainTags: ["workflow_modernization"],
    source: {
      id: "source-1",
      opportunityId: "opportunity-1",
      canonicalUrl: "https://example.com/jobs/123",
    },
    organization: {
      name: "Example Health",
      initiatives: [
        {
          id: "initiative-1",
          name: "Workflow modernization",
          confidence: 78,
        },
      ],
    },
    ...overrides,
  };
}

function getTriageFindManyMock() {
  return vi.mocked(tifDb.oiSignal.findMany);
}

describe("OiIntakePage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(tifDb.oiOpportunity.findUnique).mockResolvedValue(reviewFixture as never);
    getTriageFindManyMock().mockResolvedValue([]);
  });

  it("keeps intake out of search indexes and forces dynamic rendering", () => {
    expect(metadata.robots).toEqual({ index: false, follow: false });
    expect(dynamic).toBe("force-dynamic");
  });

  it("renders exactly the four manual intake fields in the empty state", async () => {
    render(await OiIntakePage({ searchParams: Promise.resolve({}) }));

    expect(screen.getByLabelText("Source content")).toBeInTheDocument();
    expect(screen.getByLabelText("Source URL / reference")).toBeInTheDocument();
    expect(screen.getByLabelText("Organization")).toBeInTheDocument();
    expect(screen.getByLabelText("Role / context")).toBeInTheDocument();
    expect(screen.getAllByRole("textbox")).toHaveLength(4);
    expect(screen.getByText(/Captured facts and research gaps/)).toBeInTheDocument();
  });

  it("renders extracted facts, source quotes, and gaps for review", async () => {
    render(
      await OiIntakePage({
        searchParams: Promise.resolve({
          capture: "created",
          sourceId: "source-1",
          opportunityId: "opportunity-1",
        }),
      }),
    );

    expect(screen.getByText("Example Health · Director, Healthcare Transformation")).toBeInTheDocument();
    expect(screen.getByText("Tier 1 · Senior role posting · strength 100")).toBeInTheDocument();
    expect(screen.getByText("Review candidates")).toBeInTheDocument();
    expect(screen.getByText("Fit 100 · Evidence 65 · Access 0 · $939/hr")).toBeInTheDocument();
    expect(screen.getByText(/Value \$40,250 × probability 14% = EV \$5,635 over 6.0h/)).toBeInTheDocument();
    expect(screen.getByText("identify stakeholder")).toBeInTheDocument();
    expect(screen.getByText("15 min · due Aug 1, 2026")).toBeInTheDocument();
    expect(screen.getByText("FHIR")).toBeInTheDocument();
    expect(screen.getByText("Own delivery using FHIR.")).toBeInTheDocument();
    expect(screen.getByText("Who owns or sponsors this work?")).toBeInTheDocument();
  });

  it("renders untriaged signals below the capture form using the default tier 1 filter", async () => {
    getTriageFindManyMock().mockResolvedValue([
      triageSignal({ id: "newer", summary: "Newest signal", occurredAt: new Date("2026-08-01T12:00:00Z") }),
      triageSignal({ id: "older", summary: "Older signal", occurredAt: new Date("2026-07-30T12:00:00Z") }),
    ] as never);

    render(await OiIntakePage({ searchParams: Promise.resolve({}) }));

    expect(screen.getByText("Untriaged signals")).toBeInTheDocument();
    expect(screen.getAllByText("Tier 1")).toHaveLength(2);
    expect(screen.getAllByText("Example Health")).toHaveLength(2);
    expect(screen.getAllByText("strength 91")).toHaveLength(2);
    expect(screen.getByText("Newest signal")).toBeInTheDocument();
    expect(screen.getByText("Older signal")).toBeInTheDocument();
    expect(screen.getAllByText("Matching initiative: Workflow modernization · confidence 78%")).toHaveLength(2);
    expect(getTriageFindManyMock()).toHaveBeenCalledWith(
      expect.objectContaining({
        where: {
          status: { in: ["captured", "classified"] },
          tier: "tier_1",
        },
        orderBy: [{ occurredAt: "desc" }, { createdAt: "desc" }],
      }),
    );
  });

  it("hides tier 3 signals by default and shows them under all", async () => {
    getTriageFindManyMock().mockResolvedValue([
      triageSignal({
        id: "tier-3",
        tier: "tier_3",
        summary: "Lower-priority market signal",
      }),
    ] as never);

    render(await OiIntakePage({ searchParams: Promise.resolve({ triage: "all" }) }));

    expect(screen.getByText("Tier 3")).toBeInTheDocument();
    expect(screen.getByText("Lower-priority market signal")).toBeInTheDocument();
    expect(getTriageFindManyMock()).toHaveBeenCalledWith(
      expect.objectContaining({
        where: {
          status: { in: ["captured", "classified"] },
        },
      }),
    );
  });

  it("excludes promoted, dismissed, and watched signals from the triage queue query", async () => {
    render(await OiIntakePage({ searchParams: Promise.resolve({}) }));

    expect(getTriageFindManyMock()).toHaveBeenCalledWith(
      expect.objectContaining({
        where: expect.objectContaining({
          status: { in: ["captured", "classified"] },
        }),
      }),
    );
  });

  it("renders promote, watch, and dismiss controls per triage row", async () => {
    getTriageFindManyMock().mockResolvedValue([triageSignal()] as never);

    render(await OiIntakePage({ searchParams: Promise.resolve({}) }));

    expect(screen.getByRole("button", { name: "Promote" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Watch" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Dismiss" })).toBeInTheDocument();
    expect(screen.getByLabelText("Reason")).toBeRequired();
  });

  it("renders a directive for an empty triage queue", async () => {
    render(await OiIntakePage({ searchParams: Promise.resolve({}) }));

    expect(screen.getByText(/Paste a source above/)).toBeInTheDocument();
    expect(screen.queryByText(/congrat/i)).not.toBeInTheDocument();
  });
});
