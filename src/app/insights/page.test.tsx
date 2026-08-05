import { render, screen, within } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import InsightsPage from "./page";

const insightState = vi.hoisted(() => ({
  byCluster: new Map<string, Array<Record<string, unknown>>>(),
}));

vi.mock("@/lib/insights", () => ({
  getInsightsByCluster: () => insightState.byCluster,
}));

describe("InsightsPage", () => {
  it("groups published guides under their problem cluster", () => {
    insightState.byCluster = new Map([
      [
        "prior-authorization-operations",
        [
          insight("featured", "Featured Guide", "2026-06-01", true, 2),
          insight("standard", "Standard Guide", "2026-07-01", false, 0),
        ],
      ],
    ]);

    const { container } = render(<InsightsPage />);

    // Clusters are h2; the guides inside them are h3.
    expect(screen.getByRole("heading", { level: 2, name: "Prior authorization operations" })).toBeInTheDocument();

    const cluster = container.querySelector("#prior-authorization-operations");
    const guideHeadings = within(cluster as HTMLElement).getAllByRole("heading", { level: 3 });
    expect(guideHeadings.map((heading) => heading.textContent)).toEqual([
      "Featured Guide",
      "Standard Guide",
    ]);
    expect(screen.getByText("Featured")).toBeInTheDocument();
    expect(screen.getAllByText("3 min read")).toHaveLength(2);
    expect(screen.getByText("Based on 2 sources")).toBeInTheDocument();
  });

  it("renders guides that carry no cluster under an 'Other guides' heading", () => {
    insightState.byCluster = new Map([
      ["unclustered", [insight("legacy", "Legacy Guide", "2026-05-01", false, 1)]],
    ]);

    render(<InsightsPage />);

    expect(screen.getByRole("heading", { level: 2, name: "Other guides" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 3, name: "Legacy Guide" })).toBeInTheDocument();
  });

  it("hides clusters that have no published guide", () => {
    insightState.byCluster = new Map([
      ["prior-authorization-operations", [insight("only", "Only Guide", "2026-06-01", false, 1)]],
    ]);

    render(<InsightsPage />);

    expect(
      screen.queryByRole("heading", { name: "Stalled healthcare transformation" }),
    ).not.toBeInTheDocument();
  });

  it("renders an empty state when no guides exist", () => {
    insightState.byCluster = new Map();

    render(<InsightsPage />);

    expect(
      screen.getByRole("heading", { name: "Guides appear here once they pass review." }),
    ).toBeInTheDocument();
  });
});

function insight(
  slug: string,
  title: string,
  date: string,
  featured: boolean,
  sourceCount: number,
) {
  return {
    slug,
    title,
    date,
    featured,
    sourceCount,
    description: `${title} description.`,
    readingTime: 3,
  };
}
