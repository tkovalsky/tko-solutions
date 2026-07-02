import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/site/page-hero";
import { Card } from "@/components/ui/card";
import { Section, SectionHeader } from "@/components/ui/section";
import { getInsights, type Insight } from "@/lib/insights";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Insights",
  description:
    "TKO insights on healthcare workflow modernization, operational recovery, governance, and AI adoption grounded in operating evidence.",
  alternates: { canonical: "/insights" },
  openGraph: {
    title: "Insights",
    description:
      "Evidence-led TKO insights on workflow modernization, operational recovery, governance, and AI adoption.",
    url: absoluteUrl("/insights"),
  },
};

export default function InsightsPage() {
  const insights = getInsights();

  return (
    <>
      <PageHero
        eyebrow="Insights"
        title="Operational patterns, written plainly."
        description="Evidence-led notes on stalled workflows, decision latency, human API dependency, and the governance required before automation or AI can improve execution."
      />
      <Section>
        {insights.length > 0 ? (
          <div className="grid gap-4 lg:grid-cols-2">
            {insights.map((insight) => (
              <InsightCard key={insight.slug} insight={insight} />
            ))}
          </div>
        ) : (
          <div className="border border-dashed border-border bg-surface p-8 md:p-10">
            <SectionHeader
              eyebrow="No Published Insights"
              title="Insights will appear here when markdown articles are added."
              description="Add a published markdown file to src/content/insights and rebuild the site to publish the article."
            />
          </div>
        )}
      </Section>
    </>
  );
}

function InsightCard({ insight }: { insight: Insight }) {
  return (
    <Card className="flex min-h-80 flex-col rounded-lg">
      <div className="flex flex-wrap gap-x-3 gap-y-2 text-sm font-semibold uppercase tracking-[0.1em] text-muted">
        <time dateTime={insight.date}>{formatDate(insight.date)}</time>
        <span>{insight.readingTime} min read</span>
        {insight.sourceCount > 0 ? <span>Based on {insight.sourceCount} sources</span> : null}
      </div>
      {insight.featured ? (
        <p className="mt-5 text-sm font-semibold uppercase tracking-[0.1em] text-primary">
          Featured
        </p>
      ) : null}
      <h2 className="mt-5 text-2xl font-semibold leading-tight">{insight.title}</h2>
      <p className="mt-4 text-base leading-7 text-muted">{insight.description}</p>
      <Link
        href={`/insights/${insight.slug}`}
        className="group mt-auto inline-flex items-center gap-2 pt-8 text-sm font-semibold uppercase tracking-[0.08em] text-primary transition-colors hover:text-primary-dark"
      >
        Read insight
        <ArrowRight
          className="size-4 shrink-0 transition-transform group-hover:translate-x-1"
          aria-hidden="true"
        />
      </Link>
    </Card>
  );
}

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(date));
}
