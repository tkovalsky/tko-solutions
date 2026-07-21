import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import InsightPage, { generateMetadata, generateStaticParams } from "./page";

const insightState = vi.hoisted(() => ({
  items: [] as Array<Record<string, unknown>>,
}));

vi.mock("next/navigation", () => ({
  notFound: () => {
    throw new Error("NEXT_NOT_FOUND");
  },
}));

vi.mock("@/lib/insights", () => ({
  getInsights: () => insightState.items,
  getInsight: (slug: string) =>
    insightState.items.find((insight) => insight.slug === slug) ?? null,
  getRelatedInsights: (slug: string) =>
    insightState.items.filter((insight) => insight.slug !== slug).slice(0, 3),
}));

describe("InsightPage", () => {
  it("generates static params for published insights", () => {
    insightState.items = [insight("first", "First"), insight("second", "Second")];

    expect(generateStaticParams()).toEqual([{ slug: "first" }, { slug: "second" }]);
  });

  it("generates metadata with canonical and OpenGraph values", async () => {
    insightState.items = [insight("first", "First")];

    await expect(
      generateMetadata({ params: Promise.resolve({ slug: "first" }) }),
    ).resolves.toMatchObject({
      title: "First",
      description: "First description.",
      alternates: { canonical: "/insights/first" },
      openGraph: {
        title: "First",
        description: "First description.",
        type: "article",
        publishedTime: "2026-06-01",
      },
    });
  });

  it("renders markdown HTML, source metadata, related insights, and the Recovery Assessment CTA", async () => {
    insightState.items = [insight("first", "First"), insight("related", "Related")];

    render(await InsightPage({ params: Promise.resolve({ slug: "first" }) }));

    expect(screen.getByRole("heading", { name: "First" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Rendered Markdown" })).toBeInTheDocument();
    expect(screen.getByText("2 min read")).toBeInTheDocument();
    expect(screen.getByText("Based on 2 sources")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Related" })).toBeInTheDocument();
    expect(screen.getAllByText("See the Recovery Diagnostic").length).toBeGreaterThan(0);
  });

  it("returns a 404 for unknown slugs", async () => {
    insightState.items = [];

    await expect(
      InsightPage({ params: Promise.resolve({ slug: "missing" }) }),
    ).rejects.toThrow("NEXT_NOT_FOUND");
  });
});

function insight(slug: string, title: string) {
  return {
    slug,
    title,
    description: `${title} description.`,
    date: "2026-06-01",
    sourceCount: 2,
    readingTime: 2,
    html: "<h2>Rendered Markdown</h2><p>Body text.</p>",
  };
}
