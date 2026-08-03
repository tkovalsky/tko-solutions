import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import OpportunityCard from "./opportunity-card";

const AS_OF = new Date("2026-08-01T12:00:00Z");

describe("OpportunityCard", () => {
  it("renders a populated card with the Start anchor and actions", () => {
    render(<OpportunityCard opportunity={opportunity()} asOf={AS_OF} />);

    expect(screen.getByText("Example Health")).toBeInTheDocument();
    expect(screen.getByText("Care platform recovery")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Start" })).toHaveAttribute("href", "/tif/oi/opportunities/opp-1#stakeholders");
    expect(screen.getByRole("link", { name: "Open workbench" })).toHaveAttribute("href", "/tif/oi/opportunities/opp-1");
    expect(screen.getByRole("button", { name: "Complete" })).toBeInTheDocument();
    expect(screen.getByText(/Value \$54,000 · 60% · EV \$32,400 · 6.4 hrs remaining/)).toBeInTheDocument();
  });

  it("renders empty score and no-action states without action controls", () => {
    render(
      <OpportunityCard
        opportunity={{
          ...opportunity(),
          currentScore: null,
          initiative: null,
          nextActions: [],
        }}
        asOf={AS_OF}
      />,
    );

    expect(screen.getByText(/consulting · \$0\/hr/i)).toBeInTheDocument();
    expect(screen.getByText("Next: No open next action")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Start" })).toHaveAttribute("href", "/tif/oi/opportunities/opp-1#overview");
    expect(screen.queryByRole("button", { name: "Complete" })).not.toBeInTheDocument();
  });
});

function opportunity() {
  return {
    id: "opp-1",
    title: "Care platform recovery",
    type: "consulting" as const,
    organization: { name: "Example Health" },
    currentScore: {
      fitScore: 94,
      evidenceScore: 90,
      accessScore: 82,
      estimatedValue: 54_000,
      conversionProbability: 60,
      expectedValue: 32_400,
      estimatedHours: 6.4,
      priorityEfficiency: 5_063,
    },
    initiative: { hypothesis: "Program stalled publicly." },
    nextActions: [
      {
        id: "action-1",
        type: "prepare_outreach" as const,
        description: "Prepare outreach",
        rationale: "All gates are met.",
        estimatedMinutes: 20,
        dueAt: new Date("2026-08-02T12:00:00Z"),
        status: "open" as const,
        completedAt: null,
      },
    ],
  };
}
