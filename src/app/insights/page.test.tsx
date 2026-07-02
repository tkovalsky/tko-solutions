import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import InsightsPage from "./page";

const insightState = vi.hoisted(() => ({
  items: [] as Array<Record<string, unknown>>,
}));

vi.mock("@/lib/insights", () => ({
  getInsights: () => insightState.items,
}));

describe("InsightsPage", () => {
  it("lists published articles in library order with reading time and source count", () => {
    insightState.items = [
      insight("featured", "Featured Insight", "2026-06-01", true, 2),
      insight("standard", "Standard Insight", "2026-07-01", false, 0),
    ];

    render(<InsightsPage />);

    const headings = screen.getAllByRole("heading", { level: 2 });
    expect(headings.map((heading) => heading.textContent)).toEqual([
      "Featured Insight",
      "Standard Insight",
    ]);
    expect(screen.getByText("Featured")).toBeInTheDocument();
    expect(screen.getAllByText("3 min read")).toHaveLength(2);
    expect(screen.getByText("Based on 2 sources")).toBeInTheDocument();
  });

  it("renders an empty state when no insights exist", () => {
    insightState.items = [];

    render(<InsightsPage />);

    expect(
      screen.getByRole("heading", {
        name: "Insights will appear here when markdown articles are added.",
      }),
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
