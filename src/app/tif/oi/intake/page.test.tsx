import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import OiIntakePage from "./page";

vi.mock("@/lib/tif/db", () => ({
  tifDb: {
    oiOpportunity: {
      findUnique: vi.fn().mockResolvedValue({
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
      }),
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
    expect(screen.getByText("Tier 1 · Senior role posting · strength 100")).toBeInTheDocument();
    expect(screen.getByText("Review candidates")).toBeInTheDocument();
    expect(screen.getByText("FHIR")).toBeInTheDocument();
    expect(screen.getByText("Own delivery using FHIR.")).toBeInTheDocument();
    expect(screen.getByText("Who owns or sponsors this work?")).toBeInTheDocument();
  });
});
