import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import ScorePanel from "./score-panel";

describe("ScorePanel", () => {
  it("renders the worked-example arithmetic from the score snapshot", async () => {
    const user = userEvent.setup();
    render(
      <ScorePanel
        opportunityType="consulting"
        score={{
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
          createdAt: new Date("2026-07-31T06:12:00Z"),
          components: [
            { key: "problem", label: "Funded problem fit", points: 20, maxPoints: 20, reason: "Stated problem aligns with todd-v2" },
            { key: "access", label: "Access", points: 82, maxPoints: 100, reason: "Best stakeholder access score for the opportunity." },
            { key: "access.warm_history_multiplier", label: "Warm history multiplier", points: 250, maxPoints: 250, reason: "Warm history contributes a x2.5 probability multiplier." },
            { key: "access.high_access_multiplier", label: "High-access multiplier", points: 140, maxPoints: 140, reason: "Access score at or above 70 contributes a x1.4 probability multiplier." },
            { key: "access.probability_cap", label: "Probability cap", points: 60, maxPoints: 60, reason: "Combined access and fit contribution is capped at 60% probability." },
          ],
        }}
      />,
    );

    await user.click(screen.getByRole("button", { name: /Why this ranks here/i }));

    expect(screen.getByText(/Probability = 0\.15 base x 2\.5 warm history x 1\.4 high-access x 1\.3 evidence x 1\.3 fit = 0\.887, capped at 60%; current result 60%/)).toBeInTheDocument();
    expect(screen.getByText("Expected value = $54,000 x 0.60 = $32,400")).toBeInTheDocument();
    expect(screen.getByText("Remaining hours = 11.5 x 0.7 researched x 0.8 known-stakeholder = 6.4")).toBeInTheDocument();
    expect(screen.getByText("Priority efficiency = $32,400 / 6.4 = $5,063/hr")).toBeInTheDocument();
    expect(screen.getByText("Warm history multiplier")).toBeInTheDocument();
    expect(screen.getByText("High-access multiplier")).toBeInTheDocument();
    expect(screen.queryByText(/Worked example arithmetic check/)).not.toBeInTheDocument();
  });

  it("renders different arithmetic for a different opportunity", async () => {
    const user = userEvent.setup();
    render(
      <ScorePanel
        opportunityType="assessment"
        score={{
          fitScore: 62,
          evidenceScore: 55,
          accessScore: 38,
          urgencyScore: 15,
          estimatedValue: 30_500,
          conversionProbability: 22,
          expectedValue: 6_710,
          estimatedHours: 6,
          priorityEfficiency: 1118,
          scorePolicyVersion: "pois-v1",
          capabilityProfileVersion: "todd-v2",
          createdAt: new Date("2026-07-31T06:12:00Z"),
          components: [
            { key: "problem", label: "Problem fit", points: 12, maxPoints: 20, reason: "Moderate fit." },
            { key: "access", label: "Access", points: 38, maxPoints: 100, reason: "Best stakeholder access score for the opportunity." },
          ],
        }}
      />,
    );

    await user.click(screen.getByRole("button", { name: /Why this ranks here/i }));

    expect(screen.getByText("Expected value = $30,500 x 0.22 = $6,710")).toBeInTheDocument();
    expect(screen.getByText("Remaining hours = 6.0")).toBeInTheDocument();
    expect(screen.getByText("Priority efficiency = $6,710 / 6.0 = $1,118/hr")).toBeInTheDocument();
    expect(screen.queryByText("Expected value = $54,000 x 0.60 = $32,400")).not.toBeInTheDocument();
  });
});
