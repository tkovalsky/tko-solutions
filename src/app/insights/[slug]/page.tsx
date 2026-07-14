import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { CtaBand } from "@/components/site/cta-band";
import { AuthorityLinks } from "@/components/site/authority-links";
import { JsonLd } from "@/components/site/json-ld";
import { PageHero } from "@/components/site/page-hero";
import { Card } from "@/components/ui/card";
import { Section, SectionHeader } from "@/components/ui/section";
import { getInsight, getInsights, getRelatedInsights, type Insight } from "@/lib/insights";
import { absoluteUrl } from "@/lib/site";

type Params = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getInsights().map((insight) => ({ slug: insight.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const insight = getInsight(slug);

  if (!insight) return {};

  return {
    title: insight.title,
    description: insight.description,
    alternates: { canonical: `/insights/${insight.slug}` },
    openGraph: {
      title: insight.title,
      description: insight.description,
      type: "article",
      publishedTime: insight.date,
      url: absoluteUrl(`/insights/${insight.slug}`),
    },
  };
}

export default async function InsightPage({ params }: Params) {
  const { slug } = await params;
  const insight = getInsight(slug);

  if (!insight) {
    notFound();
  }

  const related = getRelatedInsights(insight.slug);

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: insight.title,
          description: insight.description,
          datePublished: insight.date,
          url: absoluteUrl(`/insights/${insight.slug}`),
          publisher: { "@type": "Organization", name: "TKO Solutions" },
        }}
      />
      <PageHero
        eyebrow="Insight"
        title={insight.title}
        description={insight.description}
        primaryHref="/contact"
        primaryLabel="Discuss an Active Initiative"
        secondaryHref="/selected-work"
        secondaryLabel="Review Selected Work"
      />
      <Section>
        <div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr]">
          <aside className="space-y-4">
            <Card className="rounded-lg">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">
                Published
              </p>
              <time dateTime={insight.date} className="mt-4 block text-xl font-semibold">
                {formatDate(insight.date)}
              </time>
            </Card>
            <Card className="rounded-lg">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">
                Reading Time
              </p>
              <p className="mt-4 text-xl font-semibold">{insight.readingTime} min read</p>
            </Card>
            {insight.sourceCount > 0 ? (
              <Card className="rounded-lg">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">
                  Evidence
                </p>
                <p className="mt-4 text-xl font-semibold">
                  Based on {insight.sourceCount} sources
                </p>
              </Card>
            ) : null}
          </aside>
          <article
            className="prose-tko"
            dangerouslySetInnerHTML={{ __html: insight.html }}
          />
        </div>
      </Section>
      {related.length > 0 ? (
        <Section className="bg-surface">
          <SectionHeader eyebrow="Related Insights" title="More operating patterns." />
          <div className="mt-10 grid gap-4 lg:grid-cols-3">
            {related.map((relatedInsight) => (
              <RelatedInsightCard key={relatedInsight.slug} insight={relatedInsight} />
            ))}
          </div>
        </Section>
      ) : null}
      <AuthorityLinks current={`/insights/${insight.slug}`} />
      <CtaBand secondaryHref="/selected-work" secondaryLabel="Review Selected Work" />
    </>
  );
}

function RelatedInsightCard({ insight }: { insight: Insight }) {
  return (
    <Card className="rounded-lg">
      <p className="text-sm font-semibold uppercase tracking-[0.1em] text-muted">
        {formatDate(insight.date)} / {insight.readingTime} min read
      </p>
      <h2 className="mt-5 text-xl font-semibold leading-tight">{insight.title}</h2>
      <p className="mt-4 text-sm leading-6 text-muted">{insight.description}</p>
      <Link
        href={`/insights/${insight.slug}`}
        className="group mt-6 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.08em] text-primary transition-colors hover:text-primary-dark"
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
