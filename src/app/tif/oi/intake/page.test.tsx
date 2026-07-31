import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import OiIntakePage from "./page";

vi.mock("@/lib/tif/db", () => ({
  tifDb: {
    oiOpportunity: {
      findUnique: vi.fn().mockResolvedValue({
        id: "opportunity-1",
        title: "Director, Healthcare Transformation",
        organization: { name: "Example Health" },
        facts: [
          {
            id: "fact-1",
            field: "technology",
            value: "FHIR",
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
        sources: [{ id: "source-1" }],
      }),
    },
  },
}));

vi.mock("./actions", () => ({
  captureManualIntake: vi.fn(),
}));

describe("OiIntakePage", () => {
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
    expect(screen.getByText("FHIR")).toBeInTheDocument();
    expect(screen.getByText("Own delivery using FHIR.")).toBeInTheDocument();
    expect(screen.getByText("Who owns or sponsors this work?")).toBeInTheDocument();
  });
});
