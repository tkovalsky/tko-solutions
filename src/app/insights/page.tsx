import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/site/page-hero";
import { CtaBand } from "@/components/site/cta-band";
import { Card } from "@/components/ui/card";
import { Section, SectionHeader } from "@/components/ui/section";
import { getInsightsByCluster, type Insight } from "@/lib/insights";
import { guideClusters } from "@/lib/guide-clusters";
import { CONSTRAINT_CALL } from "@/lib/offers";
import { absoluteUrl, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Guides",
  description:
    "Practical notes for owners and operators on follow-up, handoffs, owner bottlenecks, useful systems, and where automation helps or gets in the way.",
  alternates: { canonical: "/insights" },
  openGraph: {
    title: "Guides",
    description:
      "Guides for the problems growing businesses actually have.",
    url: absoluteUrl("/insights"),
    images: [{ url: site.socialImage, width: 1200, height: 630, alt: "TKO Solutions guides." }],
  },
};

export default function InsightsPage() {
  const byCluster = getInsightsByCluster();
  // Only clusters that already have a real guide are rendered. Empty clusters are
  // a content plan, not a public promise.
  const populated = guideClusters.filter((cluster) => (byCluster.get(cluster.slug) ?? []).length > 0);
  const unclustered = byCluster.get("unclustered") ?? [];
  const total = [...byCluster.values()].reduce((count, guides) => count + guides.length, 0);

  return (
    <>
      <PageHero
        eyebrow="Guides"
        title="Notes on making the business easier to run."
        description="Practical thinking on owner bottlenecks, follow-up, handoffs, operating systems, and using automation without losing judgment."
        primaryHref={CONSTRAINT_CALL.href}
        primaryLabel={site.cta}
        secondaryHref="/selected-work"
        secondaryLabel="See RachelOS"
      />

      {total > 0 ? (
        <Section>
          <div className="space-y-16">
            {populated.map((cluster) => (
              <div key={cluster.slug} id={cluster.slug}>
                <SectionHeader
                  eyebrow="Problem"
                  title={cluster.name}
                  description={cluster.executiveProblem}
                />
                <div className="mt-8 grid gap-4 lg:grid-cols-2">
                  {(byCluster.get(cluster.slug) ?? []).map((insight) => (
                    <InsightCard key={insight.slug} insight={insight} />
                  ))}
                </div>
              </div>
            ))}
            {unclustered.length > 0 ? (
              <div>
                <SectionHeader eyebrow="Additional" title="Other guides" />
                <div className="mt-8 grid gap-4 lg:grid-cols-2">
                  {unclustered.map((insight) => (
                    <InsightCard key={insight.slug} insight={insight} />
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        </Section>
      ) : (
        <Section>
          <div className="border border-dashed border-border bg-surface p-8 md:p-10">
            <SectionHeader
              eyebrow="No Published Guides"
              title="Guides appear here once they pass review."
              description="Add a markdown file to src/content/insights with a complete guide brief and status: published. The guide-brief validation gate blocks publication until every required field and a named human reviewer are recorded."
            />
          </div>
        </Section>
      )}

      <CtaBand description={CONSTRAINT_CALL.summary} secondaryHref="/services/constraint-diagnostic" secondaryLabel="See the Diagnostic" />
    </>
  );
}

function InsightCard({ insight }: { insight: Insight }) {
  return (
    <Card className="flex min-h-72 flex-col rounded-lg">
      <div className="flex flex-wrap gap-x-3 gap-y-2 text-sm font-semibold uppercase tracking-[0.1em] text-muted">
        <time dateTime={insight.date}>{formatDate(insight.date)}</time>
        <span>{insight.readingTime} min read</span>
      </div>
      {insight.featured ? (
        <p className="mt-5 text-sm font-semibold uppercase tracking-[0.1em] text-primary">Featured</p>
      ) : null}
      <h3 className="mt-5 text-2xl font-semibold leading-tight">{insight.title}</h3>
      <p className="mt-4 text-base leading-7 text-muted">{insight.description}</p>
      <Link
        href={`/insights/${insight.slug}`}
        className="group mt-auto inline-flex items-center gap-2 pt-8 text-sm font-semibold uppercase tracking-[0.08em] text-primary transition-colors hover:text-primary-dark"
      >
        Read guide
        <ArrowRight className="size-4 shrink-0 transition-transform group-hover:translate-x-1" aria-hidden="true" />
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
