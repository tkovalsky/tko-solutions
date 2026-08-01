import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import ExecutiveBriefPage from "./page";
import { getExecutiveBrief } from "@/lib/opportunity-intelligence/action/executive-brief";

vi.mock("@/lib/opportunity-intelligence/action/executive-brief", async () => {
  const actual = await vi.importActual<typeof import("@/lib/opportunity-intelligence/action/executive-brief")>(
    "@/lib/opportunity-intelligence/action/executive-brief",
  );
  return {
    ...actual,
    getExecutiveBrief: vi.fn(),
  };
});

vi.mock("@/app/tif/oi/opportunities/[id]/actions", () => ({
  addPersonFact: vi.fn(),
}));

vi.mock("next/navigation", () => ({
  notFound: vi.fn(() => {
    throw new Error("NOT_FOUND");
  }),
}));

const mockedBrief = vi.mocked(getExecutiveBrief);

beforeEach(() => {
  vi.clearAllMocks();
  mockedBrief.mockResolvedValue(briefFixture());
});

describe("ExecutiveBriefPage", () => {
  it("renders all 13 executive brief sections with basis and confidence", async () => {
    render(await ExecutiveBriefPage({ params: Promise.resolve({ id: "person-1" }) }));

    for (const heading of [
      "Career",
      "Responsibilities",
      "Recent Announcements",
      "Known Initiatives",
      "Likely Priorities",
      "Likely Kpis",
      "Public Interviews",
      "Conference Talks",
      "Authority",
      "Relationship",
      "Warm Path",
      "Recommended Approach",
      "Research Gaps",
    ]) {
      expect(screen.getByRole("heading", { name: heading })).toBeInTheDocument();
    }
    expect(screen.getAllByText(/stated 95%/).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/inferred 55%/)[0]).toHaveClass("text-muted");
  });

  it("renders research prompts for empty sections", async () => {
    render(await ExecutiveBriefPage({ params: Promise.resolve({ id: "person-1" }) }));

    expect(screen.getByText(/Research: Search the person's name/)).toBeInTheDocument();
    expect(screen.getByText(/Research: Check AHIP/)).toBeInTheDocument();
  });
});

function briefFixture() {
  const item = (text: string, basis: "stated" | "operator" | "inferred" = "stated", confidence = 95) => ({
    text,
    basis,
    confidence,
    sourceUrl: null,
  });
  const section = (items: ReturnType<typeof item>[], prompt: string | null = null) => ({ items, isEmpty: items.length === 0, gapPrompt: prompt });
  return {
    person: {
      id: "person-1",
      name: "Sarah Chen",
      title: "VP Operations",
      organizationName: "Regional Payer Health",
      contactPoints: [{ type: "email", value: "sarah@example.com", provenance: "publicly_listed", status: "active" }],
    },
    stakeholder: {
      role: "operational_owner",
      authority: "high",
      relationshipType: "warm_history",
      accessScore: 82,
      isSelected: true,
      opportunityId: "opp-1",
      opportunityTitle: "Care Management Platform Recovery",
      accountName: "Regional Payer Health",
    },
    sections: {
      career: section([item("VP Operations at Regional Payer Health")]),
      responsibilities: section([item("Owns delivery", "operator", 90)]),
      recentAnnouncements: section([item("Platform delayed")]),
      knownInitiatives: section([item("Care management recovery")]),
      likelyPriorities: section([item("Stabilize delivery", "inferred", 55)]),
      likelyKpis: section([item("Time-to-milestone", "inferred", 55)]),
      publicInterviews: section([], "Search the person's name with payer trade press and podcast archives."),
      conferenceTalks: section([], "Check AHIP, HLTH, ViVE, and vendor speaker lists."),
      authority: section([item("Role operational owner", "operator", 100)]),
      relationship: section([item("warm_history", "operator", 100)]),
      warmPath: section([item("Direct prior colleague", "operator", 100)]),
      recommendedApproach: section([item("Lead with the delay", "inferred", 55)]),
      researchGaps: section([item("Is there an incumbent?", "operator", 100)]),
    },
  };
}
