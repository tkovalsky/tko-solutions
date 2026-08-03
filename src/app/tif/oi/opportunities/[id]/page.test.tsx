import { cleanup, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import OpportunityWorkbenchPage from "./page";
import { tifDb } from "@/lib/tif/db";

vi.mock("@/lib/tif/db", () => ({
  tifDb: {
    oiOpportunity: {
      findUnique: vi.fn(),
    },
    oiOffer: {
      findMany: vi.fn(),
    },
  },
}));

vi.mock("next/navigation", () => ({
  notFound: vi.fn(() => {
    throw new Error("NOT_FOUND");
  }),
}));

vi.mock("./actions", () => ({
  addContactPoint: vi.fn(),
  addOperatorFact: vi.fn(),
  addStakeholder: vi.fn(),
  approveInitiative: vi.fn(),
  dismissResearchGap: vi.fn(),
  editInitiativeHypothesis: vi.fn(),
  markDoNotContact: vi.fn(),
  recomputeScore: vi.fn(),
  resolveResearchGap: vi.fn(),
  selectOffer: vi.fn(),
  selectStakeholder: vi.fn(),
  updateOpportunityStatus: vi.fn(),
  updateStakeholder: vi.fn(),
}));

const mockedDb = vi.mocked(tifDb);

beforeEach(() => {
  vi.clearAllMocks();
  mockedDb.oiOpportunity.findUnique.mockResolvedValue(opportunityFixture());
  mockedDb.oiOffer.findMany.mockResolvedValue(offerCatalogueFixture());
});

describe("OpportunityWorkbenchPage", () => {
  it("renders anchored jump navigation with all four workbench sections", async () => {
    render(
      await OpportunityWorkbenchPage({
        params: Promise.resolve({ id: "opp-1" }),
        searchParams: Promise.resolve({}),
      }),
    );

    expect(screen.getByRole("link", { name: "Initiative" })).toHaveAttribute("href", "#initiative");
    expect(screen.getByRole("link", { name: "Evidence" })).toHaveAttribute("href", "#evidence");
    expect(screen.getByRole("link", { name: "Gaps" })).toHaveAttribute("href", "#gaps");
    expect(screen.getByRole("link", { name: "Stakeholders" })).toHaveAttribute("href", "#stakeholders");
    expect(screen.getByRole("link", { name: "Log" })).toHaveAttribute("href", "#log");
    // Offer selection is now a real workbench section — it is the surface that lets a
    // consulting opportunity clear the `select_offer` next action.
    expect(screen.getByRole("link", { name: "Offer" })).toHaveAttribute("href", "#offer");
    expect(screen.queryByText("Outreach")).not.toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Overview" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Initiative" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Evidence" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Research gaps" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Stakeholders" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Timeline" })).toBeInTheDocument();
    for (const id of ["overview", "initiative", "evidence", "gaps", "stakeholders", "offer", "log"]) {
      expect(document.getElementById(id)).toBeInTheDocument();
    }
  });

  it("renders stakeholder suggestions, contact provenance, and selected controls", async () => {
    render(
      await OpportunityWorkbenchPage({
        params: Promise.resolve({ id: "opp-1" }),
        searchParams: Promise.resolve({}),
      }),
    );

    expect(screen.getByText("Suggested roles not yet filled")).toBeInTheDocument();
    expect(screen.getAllByRole("option", { name: "executive sponsor" }).length).toBeGreaterThan(0);
    expect(screen.getByText(/email: sarah@example.com · publicly_listed/)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Selected" })).toBeInTheDocument();
  });

  it("keeps inferred hypotheses visually distinct from stated facts", async () => {
    render(
      await OpportunityWorkbenchPage({
        params: Promise.resolve({ id: "opp-1" }),
        searchParams: Promise.resolve({}),
      }),
    );

    expect(screen.getByText(/Hypothesis:/)).toHaveClass("hypothesis-inferred");
    expect(screen.getByText(/business_problem:/).closest("details")).toHaveClass("fact-stated");
    expect(screen.getByText(/ownership:/).closest("details")).toHaveClass("fact-inferred");
  });

  it("surfaces blocked transition reasons from the status action", async () => {
    render(
      await OpportunityWorkbenchPage({
        params: Promise.resolve({ id: "opp-1" }),
        searchParams: Promise.resolve({ statusError: "A reason is required to move an opportunity to paused." }),
      }),
    );

    expect(screen.getByText("A reason is required to move an opportunity to paused.")).toBeInTheDocument();
  });

  it("surfaces visible workbench action errors", async () => {
    render(
      await OpportunityWorkbenchPage({
        params: Promise.resolve({ id: "opp-1" }),
        searchParams: Promise.resolve({ actionError: "Fact field is required." }),
      }),
    );

    expect(screen.getByText("Fact field is required.")).toBeInTheDocument();
  });

  it("renders awaiting manual outreach when prepare outreach completed without an open successor", async () => {
    mockedDb.oiOpportunity.findUnique.mockResolvedValue({
      ...opportunityFixture(),
      nextActions: [
        {
          id: "action-1",
          status: "completed",
          type: "prepare_outreach",
          description: "Prepare outreach",
          rationale: "All gates met",
          completedAt: new Date("2026-08-01T12:00:00Z"),
        },
      ],
    });

    render(
      await OpportunityWorkbenchPage({
        params: Promise.resolve({ id: "opp-1" }),
        searchParams: Promise.resolve({}),
      }),
    );

    expect(screen.getByText(/Next action: Awaiting manual outreach/)).toBeInTheDocument();
    expect(screen.getByText(/send it outside POIS, then log the reply or follow-up/)).toBeInTheDocument();
  });

  it("opens decision capture controls for all current decision points", async () => {
    render(
      await OpportunityWorkbenchPage({
        params: Promise.resolve({ id: "opp-1" }),
        searchParams: Promise.resolve({}),
      }),
    );

    for (const label of ["Promote", "Qualify", "Dismiss", "Disqualify", "Pause", "Close"]) {
      expect(screen.getAllByText(label).length).toBeGreaterThan(0);
    }
    expect(screen.getAllByPlaceholderText("Decision reason")).toHaveLength(6);
  });

  it("renders a timeline from existing history and an empty hint when none exists", async () => {
    render(
      await OpportunityWorkbenchPage({
        params: Promise.resolve({ id: "opp-1" }),
        searchParams: Promise.resolve({}),
      }),
    );

    expect(screen.getByText("Delays platform rollout by 18 months")).toBeInTheDocument();
    expect(screen.getByText(/Status changed from identified to qualified/)).toBeInTheDocument();

    cleanup();
    mockedDb.oiOpportunity.findUnique.mockResolvedValue({ ...opportunityFixture(), initiative: null, activities: [], decisions: [] });
    render(
      await OpportunityWorkbenchPage({
        params: Promise.resolve({ id: "opp-1" }),
        searchParams: Promise.resolve({}),
      }),
    );
    expect(screen.getByText(/No timeline history yet/)).toBeInTheDocument();
  });

  it("offers every seeded offer as a selectable option when none is chosen", async () => {
    render(
      await OpportunityWorkbenchPage({
        params: Promise.resolve({ id: "opp-1" }),
        searchParams: Promise.resolve({}),
      }),
    );

    expect(screen.getByText(/No offer is selected/)).toBeInTheDocument();
    expect(screen.getByRole("radio", { name: /Operational Recovery Assessment/ })).toBeInTheDocument();
    expect(screen.getByRole("radio", { name: /Fractional Operational Advisor/ })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Select offer" })).toBeInTheDocument();
    expect(mockedDb.oiOffer.findMany).toHaveBeenCalledWith(
      expect.objectContaining({ where: { isActive: true } }),
    );
  });

  it("shows the selected offer and pre-checks it in the change form", async () => {
    mockedDb.oiOpportunity.findUnique.mockResolvedValue({
      ...opportunityFixture(),
      offer: {
        id: "offer-1",
        name: "Operational Recovery Assessment",
        kind: "assessment",
        description: "Two-week diagnostic of a stalled program.",
        valueLow: 18_000,
        valueHigh: 26_000,
        isRecurring: false,
        typicalWeeks: 2,
      },
    });

    render(
      await OpportunityWorkbenchPage({
        params: Promise.resolve({ id: "opp-1" }),
        searchParams: Promise.resolve({}),
      }),
    );

    expect(screen.queryByText(/No offer is selected/)).not.toBeInTheDocument();
    expect(screen.getByRole("radio", { name: /Operational Recovery Assessment/ })).toBeChecked();
    expect(screen.getByRole("button", { name: "Change offer" })).toBeInTheDocument();
  });

  it("tells Todd how to seed the catalogue when no active offers exist", async () => {
    mockedDb.oiOffer.findMany.mockResolvedValue([]);

    render(
      await OpportunityWorkbenchPage({
        params: Promise.resolve({ id: "opp-1" }),
        searchParams: Promise.resolve({}),
      }),
    );

    expect(screen.getByText(/No active offers are seeded/)).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "Select offer" })).not.toBeInTheDocument();
  });

  it("hides the offer section for an FTE opportunity, which never derives select_offer", async () => {
    mockedDb.oiOpportunity.findUnique.mockResolvedValue({ ...opportunityFixture(), type: "fte" });

    render(
      await OpportunityWorkbenchPage({
        params: Promise.resolve({ id: "opp-1" }),
        searchParams: Promise.resolve({}),
      }),
    );

    expect(screen.queryByRole("link", { name: "Offer" })).not.toBeInTheDocument();
    expect(document.getElementById("offer")).not.toBeInTheDocument();
    expect(mockedDb.oiOffer.findMany).not.toHaveBeenCalled();
  });
});

function offerCatalogueFixture() {
  return [
    {
      id: "offer-1",
      name: "Operational Recovery Assessment",
      kind: "assessment",
      description: "Two-week diagnostic of a stalled program.",
      valueLow: 18_000,
      valueHigh: 26_000,
      isRecurring: false,
      typicalWeeks: 2,
    },
    {
      id: "offer-2",
      name: "Fractional Operational Advisor",
      kind: "fractional",
      description: "Ongoing operating cadence for an executive team.",
      valueLow: 144_000,
      valueHigh: 300_000,
      isRecurring: true,
      typicalWeeks: null,
    },
  ];
}

function opportunityFixture() {
  const createdAt = new Date("2026-08-01T12:00:00Z");
  return {
    id: "opp-1",
    title: "Care Management Platform Recovery",
    type: "consulting",
    status: "researching",
    offer: null,
    operatorThesis: "Worth pursuing",
    organization: { id: "org-1", name: "Regional Payer Health" },
    currentScore: {
      fitScore: 94,
      evidenceScore: 90,
      accessScore: 82,
      urgencyScore: 20,
      estimatedValue: 54_000,
      conversionProbability: 60,
      expectedValue: 32_400,
      estimatedHours: 6.4,
      priorityEfficiency: 5063,
      scorePolicyVersion: "pois-v1",
      capabilityProfileVersion: "todd-v2",
      createdAt,
      components: [],
    },
    nextActions: [
      {
        id: "action-1",
        status: "open",
        type: "prepare_outreach",
        description: "Prepare outreach",
        rationale: "All gates met",
        completedAt: null,
      },
    ],
    initiative: {
      id: "initiative-1",
      name: "Care management platform implementation recovery",
      status: "evidenced",
      confidence: 88,
      approvedAt: createdAt,
      hypothesisBasis: "inferred",
      hypothesis: "The delay indicates implementation governance failure.",
      signalLinks: [
        {
          signalId: "signal-1",
          signal: {
            id: "signal-1",
            summary: "Delays platform rollout by 18 months",
            occurredAt: new Date("2026-07-01T12:00:00Z"),
            createdAt,
            source: { canonicalUrl: "https://example.com/source" },
          },
        },
      ],
      opportunities: [
        {
          id: "opp-1",
          type: "consulting",
          title: "Care Management Platform Recovery",
          status: "researching",
          currentScore: { priorityEfficiency: 5063 },
          updatedAt: createdAt,
        },
        {
          id: "opp-2",
          type: "fte",
          title: "VP Program Delivery",
          status: "identified",
          currentScore: { priorityEfficiency: 310 },
          updatedAt: createdAt,
        },
      ],
    },
    stakeholders: [
      {
        id: "stakeholder-1",
        role: "operational_owner",
        authority: "high",
        relationshipType: "warm_history",
        warmPathNotes: "prior colleague",
        relevanceToTodd: "Led an analogous recovery",
        roleEvidenceUrl: "https://example.com/person",
        roleEvidenceLabel: "Company bio",
        roleConfidence: 100,
        accessScore: 82,
        isSelected: true,
        selectedAt: createdAt,
        personId: "person-1",
        person: {
          id: "person-1",
          name: "Sarah Chen",
          title: "VP Operations",
          doNotContact: false,
          contactPoints: [
            {
              id: "contact-1",
              type: "email",
              value: "sarah@example.com",
              provenance: "publicly_listed",
              status: "active",
            },
          ],
        },
      },
    ],
    facts: [
      {
        id: "fact-1",
        field: "business_problem",
        value: "the rollout has been delayed by 18 months",
        basis: "stated",
        confidence: 95,
        evidence: {
          excerpt: "the rollout has been delayed by 18 months",
          startOffset: 1204,
          endOffset: 1251,
          source: { canonicalUrl: "https://example.com/source" },
        },
      },
      {
        id: "fact-2",
        field: "ownership",
        value: "VP Ops likely owns remediation",
        basis: "inferred",
        confidence: 60,
        evidence: null,
      },
    ],
    researchGaps: [
      {
        id: "gap-1",
        status: "open",
        question: "Is there an incumbent SI already engaged?",
        reason: "A retained incumbent changes the wedge.",
        suggestedSources: ["company newsroom"],
        resolution: null,
      },
    ],
    activities: [
      {
        id: "activity-1",
        type: "status_change",
        summary: "Status changed.",
        fromStatus: "identified",
        toStatus: "qualified",
        occurredAt: new Date("2026-07-02T12:00:00Z"),
        externalRef: null,
      },
    ],
    decisions: [],
  };
}
