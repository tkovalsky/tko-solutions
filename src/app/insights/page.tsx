import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/site/page-hero";
import { AuthorityLinks } from "@/components/site/authority-links";
import { Card } from "@/components/ui/card";
import { Section, SectionHeader } from "@/components/ui/section";
import { getInsightsByCluster, type Insight } from "@/lib/insights";
import { guideClusters } from "@/lib/guide-clusters";
import { PROGRAM_RECOVERY_CONVERSATION } from "@/lib/offers";
import { absoluteUrl, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Guides",
  description:
    "Evidence-backed guides on stalled healthcare transformation, prior authorization operations, decision rights, and where AI genuinely helps, organized by the executive problem each one addresses.",
  alternates: { canonical: "/insights" },
  openGraph: {
    title: "Guides",
    description:
      "Guides organized around the expensive executive problems they address.",
    url: absoluteUrl("/insights"),
    images: [{ url: site.socialImage, width: 1200, height: 630, alt: "TKO Solutions healthcare transformation guides." }],
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
        title="Written for the problem, not for the algorithm."
        description="Each guide addresses one expensive executive problem, states a point of view, separates evidence from inference, and says where AI helps and where it adds risk. Fewer guides, each worth forwarding."
        primaryHref={PROGRAM_RECOVERY_CONVERSATION.href}
        primaryLabel={site.cta}
        secondaryHref="/selected-work"
        secondaryLabel="Review the Evidence"
      />

      {total > 0 ? (
        <Section>
          <div className="space-y-16">
            {populated.map((cluster) => (
              <div key={cluster.slug} id={cluster.slug}>
                <SectionHeader
                  eyebrow="Problem cluster"
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

      <AuthorityLinks current="/insights" />
    </>
  );
}

function InsightCard({ insight }: { insight: Insight }) {
  return (
    <Card className="flex min-h-72 flex-col rounded-lg">
      <div className="flex flex-wrap gap-x-3 gap-y-2 text-sm font-semibold uppercase tracking-[0.1em] text-muted">
        <time dateTime={insight.date}>{formatDate(insight.date)}</time>
        <span>{insight.readingTime} min read</span>
        {insight.sourceCount > 0 ? <span>Based on {insight.sourceCount} sources</span> : null}
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
