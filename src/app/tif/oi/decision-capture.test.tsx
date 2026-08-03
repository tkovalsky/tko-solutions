import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import DecisionCapture from "./decision-capture";

describe("DecisionCapture", () => {
  it("renders prediction fields with empty score values", () => {
    render(
      <DecisionCapture
        action={vi.fn()}
        opportunityId="opp-1"
        type="pause_opportunity"
        decision="paused"
        label="Pause"
        currentScore={null}
      />,
    );

    expect(screen.getAllByText("Pause")).toHaveLength(2);
    expect(screen.getByDisplayValue("$0")).toBeInTheDocument();
    expect(screen.getByDisplayValue("0.0 hrs")).toBeInTheDocument();
    expect(screen.getByDisplayValue("0%")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Decision reason")).toBeRequired();
  });

  it("renders hidden decision fields, score snapshot values, and custom children", () => {
    const { container } = render(
      <DecisionCapture
        action={vi.fn()}
        opportunityId="opp-1"
        type="close_opportunity"
        decision="closed"
        label="Close"
        currentScore={{ expectedValue: 32_400, estimatedHours: 6.4, conversionProbability: 60 }}
      >
        <input type="hidden" name="toStatus" value="closed" />
      </DecisionCapture>,
    );

    expect(container.querySelector('input[name="opportunityId"]')).toHaveValue("opp-1");
    expect(container.querySelector('input[name="decisionType"]')).toHaveValue("close_opportunity");
    expect(container.querySelector('input[name="decision"]')).toHaveValue("closed");
    expect(container.querySelector('input[name="toStatus"]')).toHaveValue("closed");
    expect(screen.getByDisplayValue("$32,400")).toBeInTheDocument();
    expect(screen.getByDisplayValue("6.4 hrs")).toBeInTheDocument();
    expect(screen.getByDisplayValue("60%")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Close" })).toBeInTheDocument();
  });
});
