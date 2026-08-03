import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import OiTodayPage from "./page";
import { ANCHORS } from "./opportunity-card";
import { tifDb } from "@/lib/tif/db";

vi.mock("@/lib/tif/db", () => ({
  tifDb: {
    oiOpportunity: { findMany: vi.fn() },
    oiActivity: { findMany: vi.fn() },
    oiNextAction: { updateMany: vi.fn() },
    oiSignal: { count: vi.fn(), findMany: vi.fn() },
    oiOrganization: { findMany: vi.fn() },
  },
}));

vi.mock("./actions", () => ({
  completeNextAction: vi.fn(),
  dismissOpportunity: vi.fn(),
  snoozeOpportunity: vi.fn(),
}));

const mockedDb = vi.mocked(tifDb);

beforeEach(() => {
  vi.clearAllMocks();
  mockedDb.oiActivity.findMany.mockResolvedValue([]);
  mockedDb.oiSignal.count.mockResolvedValue(0);
  mockedDb.oiSignal.findMany.mockResolvedValue([]);
  mockedDb.oiOrganization.findMany.mockResolvedValue([]);
});

describe("OiTodayPage", () => {
  it("renders the header before capped opportunity cards and removes the placeholder", async () => {
    mockedDb.oiOpportunity.findMany.mockResolvedValue(
      Array.from({ length: 6 }, (_, index) => opportunity(`opp-${index}`, { pe: 1000 - index })),
    );

    const { container } = render(await OiTodayPage());

    expect(screen.queryByText("Today arrives in POIS-110")).not.toBeInTheDocument();
    expect(screen.getByText(/Oct 1/)).toBeInTheDocument();
    expect(screen.getAllByRole("article")).toHaveLength(5);
    expect(container.querySelector("header")?.compareDocumentPosition(screen.getAllByRole("article")[0])).toBe(Node.DOCUMENT_POSITION_FOLLOWING);
  });

  it("restores expired snoozed actions to open before building the queue", async () => {
    const expired = opportunity("expired", {
      nextActions: [
        {
          id: "action-expired",
          status: "snoozed",
          type: "prepare_outreach",
          description: "Prepare outreach",
          rationale: "All prerequisites are met.",
          estimatedMinutes: 20,
          dueAt: new Date("2026-08-01T12:00:00Z"),
          snoozedUntil: new Date("2026-07-31T12:00:00Z"),
          completedAt: null,
        },
      ],
    });
    mockedDb.oiOpportunity.findMany.mockResolvedValue([expired]);

    render(await OiTodayPage());

    expect(mockedDb.oiNextAction.updateMany).toHaveBeenCalledWith({
      where: { id: { in: ["action-expired"] }, status: "snoozed" },
      data: { status: "open", snoozedUntil: null },
    });
    expect(screen.getByText("Opportunity expired")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Complete" })).toBeInTheDocument();
  });

  it("orders overdue opportunities above all other cards", async () => {
    mockedDb.oiOpportunity.findMany.mockResolvedValue([
      opportunity("future", { title: "Future Action", pe: 1000, dueAt: "2026-08-10T12:00:00Z" }),
      opportunity("overdue", { title: "Overdue Action", pe: 10, dueAt: "2026-07-01T12:00:00Z" }),
    ]);

    render(await OiTodayPage());

    const articles = screen.getAllByRole("article");
    expect(articles[0]).toHaveTextContent("Overdue Action");
  });

  it("deep-links Start to the correct workbench anchor for the action type", async () => {
    mockedDb.oiOpportunity.findMany.mockResolvedValue([
      opportunity("opp-1", { actionType: "close_research_gap" }),
    ]);

    render(await OiTodayPage());

    expect(screen.getByRole("link", { name: "Start" })).toHaveAttribute("href", "/tif/oi/opportunities/opp-1#gaps");
  });

  it("maps every Today action anchor to an existing workbench section", () => {
    expect(new Set(Object.values(ANCHORS))).toEqual(new Set(["overview", "initiative", "evidence", "gaps", "stakeholders", "log"]));
    expect(ANCHORS.select_offer).toBe("overview");
    expect(ANCHORS.prepare_outreach).toBe("stakeholders");
    expect(ANCHORS.review_draft).toBe("evidence");
    expect(ANCHORS.send_outreach).toBe("stakeholders");
    expect(ANCHORS.submit_application).toBe("overview");
    expect(ANCHORS.send_proposal).toBe("overview");
  });

  it("renders awaiting manual outreach when prepare outreach completed without an open successor", async () => {
    mockedDb.oiOpportunity.findMany.mockResolvedValue([
      opportunity("opp-1", {
        nextActions: [
          {
            id: "action-opp-1",
            status: "completed",
            type: "prepare_outreach",
            description: "Prepare outreach",
            rationale: "All prerequisites are met.",
            estimatedMinutes: 20,
            dueAt: null,
            completedAt: new Date("2026-08-01T12:00:00Z"),
          },
        ],
      }),
    ]);

    render(await OiTodayPage());

    expect(screen.getByText(/Awaiting manual outreach/)).toBeInTheDocument();
    expect(screen.getByText(/log the reply or follow-up/)).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "Complete" })).not.toBeInTheDocument();
  });

  it("renders a directive empty state without congratulatory text", async () => {
    mockedDb.oiOpportunity.findMany.mockResolvedValue([]);

    render(await OiTodayPage());

    expect(screen.getByText("Nothing queued.")).toBeInTheDocument();
    expect(screen.getByText(/Add a source/)).toBeInTheDocument();
    expect(screen.queryByText(/caught up/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/congrat/i)).not.toBeInTheDocument();
  });

  it("renders new signals count, top three signals, and intake link while excluding tier 3 from the count", async () => {
    mockedDb.oiOpportunity.findMany.mockResolvedValue([]);
    mockedDb.oiSignal.count.mockResolvedValue(4);
    mockedDb.oiSignal.findMany.mockResolvedValue([
      signal("signal-1", { tier: "tier_1", summary: "Senior transformation role", organizationName: "Alpha Health" }),
      signal("signal-2", { tier: "tier_2", summary: "Operational problem stated", organizationName: "Beta Care" }),
      signal("signal-3", { tier: "tier_1", summary: "Modernization announcement", organizationName: "Care Gamma" }),
    ]);

    render(await OiTodayPage());

    expect(screen.getByText("New signals")).toBeInTheDocument();
    expect(screen.getByText("4 untriaged")).toBeInTheDocument();
    expect(screen.getByText("Tier 1 · Alpha Health", { exact: false })).toBeInTheDocument();
    expect(screen.getByText("Tier 2 · Beta Care", { exact: false })).toBeInTheDocument();
    expect(screen.getByText("Modernization announcement")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Go to intake →" })).toHaveAttribute("href", "/tif/oi/intake");
    expect(mockedDb.oiSignal.count).toHaveBeenCalledWith({
      where: {
        status: { in: ["captured", "classified"] },
        tier: { in: ["tier_1", "tier_2"] },
      },
    });
    expect(mockedDb.oiSignal.findMany).toHaveBeenCalledWith(
      expect.objectContaining({
        where: {
          status: { in: ["captured", "classified"] },
          tier: { in: ["tier_1", "tier_2"] },
        },
        take: 3,
      }),
    );
  });

  it("renders watched accounts collapsed by default with days watched", async () => {
    mockedDb.oiOpportunity.findMany.mockResolvedValue([]);
    mockedDb.oiOrganization.findMany.mockResolvedValue([
      {
        id: "org-1",
        name: "Watched Health",
        updatedAt: new Date(Date.now() - 2 * 86_400_000),
        signals: [{ updatedAt: new Date(Date.now() - 3 * 86_400_000) }],
      },
    ]);

    const { container } = render(await OiTodayPage());

    expect(screen.getByText("Watch")).toBeInTheDocument();
    expect(screen.getByText("1 watched accounts")).toBeInTheDocument();
    expect(screen.getByText("expand")).toBeInTheDocument();
    expect(container.querySelector("details")?.hasAttribute("open")).toBe(false);
    expect(screen.getByText("Watched Health")).toBeInTheDocument();
    expect(screen.getByText("3 days watched")).toBeInTheDocument();
    expect(mockedDb.oiOrganization.findMany).toHaveBeenCalledWith(
      expect.objectContaining({
        where: { isWatched: true },
      }),
    );
  });

  it("renders explicit empty states for new signals and watch", async () => {
    mockedDb.oiOpportunity.findMany.mockResolvedValue([]);

    render(await OiTodayPage());

    expect(screen.getByText("No Tier 1 or Tier 2 signals are waiting for triage.")).toBeInTheDocument();
    expect(screen.getByText("No accounts are being watched.")).toBeInTheDocument();
  });
});

function opportunity(
  id: string,
  overrides: {
    title?: string;
    pe?: number;
    dueAt?: string;
    actionType?: "prepare_outreach" | "close_research_gap";
    nextActions?: Array<{
      id: string;
      status: string;
      type: "prepare_outreach" | "close_research_gap";
      description: string;
      rationale: string;
      estimatedMinutes: number;
      dueAt: Date | null;
      snoozedUntil?: Date | null;
      completedAt?: Date | null;
    }>;
  } = {},
) {
  return {
    id,
    title: overrides.title ?? `Opportunity ${id}`,
    type: "consulting",
    status: "researching",
    lastActivityAt: new Date("2026-07-01T12:00:00Z"),
    organization: { name: `Org ${id}` },
    initiative: { confidence: 80, hypothesis: "Evidence moved." },
    currentScore: {
      fitScore: 90,
      evidenceScore: 80,
      accessScore: 40,
      urgencyScore: 10,
      estimatedValue: 54_000,
      conversionProbability: 60,
      expectedValue: 32_400,
      estimatedHours: 6.4,
      priorityEfficiency: overrides.pe ?? 500,
    },
    nextActions: overrides.nextActions ?? [
      {
        id: `action-${id}`,
        status: "open",
        type: overrides.actionType ?? "prepare_outreach",
        description: "Prepare outreach",
        rationale: "All prerequisites are met.",
        estimatedMinutes: 20,
        dueAt: new Date(overrides.dueAt ?? "2099-08-01T12:00:00Z"),
        snoozedUntil: null,
        completedAt: null,
      },
    ],
  };
}

function signal(
  id: string,
  overrides: {
    tier?: "tier_1" | "tier_2";
    summary?: string;
    organizationName?: string;
  } = {},
) {
  return {
    id,
    tier: overrides.tier ?? "tier_1",
    summary: overrides.summary ?? `Signal ${id}`,
    occurredAt: new Date("2026-08-01T12:00:00Z"),
    createdAt: new Date("2026-08-01T12:00:00Z"),
    organization: { name: overrides.organizationName ?? `Org ${id}` },
  };
}
