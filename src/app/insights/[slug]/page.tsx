import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { CtaBand } from "@/components/site/cta-band";
import { JsonLd } from "@/components/site/json-ld";
import { PageHero } from "@/components/site/page-hero";
import { Card } from "@/components/ui/card";
import { Section, SectionHeader } from "@/components/ui/section";
import { getInsight, getInsights, getRelatedInsights, type Insight } from "@/lib/insights";
import { getGuideCluster } from "@/lib/guide-clusters";
import { getOffer, offerHref, offers, PROGRAM_RECOVERY_CONVERSATION } from "@/lib/offers";
import { absoluteUrl, site } from "@/lib/site";

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
      images: [{ url: site.socialImage, width: 1200, height: 630, alt: "TKO Solutions healthcare transformation guides." }],
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
  // Every guide maps to one offer. Falling back to the Executive Diagnostic keeps the
  // page renderable for legacy guides authored before the brief existed.
  const offer = getOffer(insight.brief?.offer ?? "") ?? offers[0];
  const cluster = getGuideCluster(insight.brief?.cluster ?? "");
  const ctaLabel = insight.brief?.cta ?? site.cta;

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
        eyebrow={cluster ? cluster.name : "Guide"}
        title={insight.title}
        description={insight.description}
        primaryHref={offerHref(offer.slug)}
        primaryLabel={`See the ${offer.name}`}
        secondaryHref={PROGRAM_RECOVERY_CONVERSATION.href}
        secondaryLabel={ctaLabel}
      />
      <Section>
        <div className="max-w-[72ch]">
          <p className="flex flex-wrap items-center gap-x-3 gap-y-2 border-b border-border pb-5 text-sm font-semibold uppercase tracking-[0.1em] text-muted">
            <time dateTime={insight.date}>{formatDate(insight.date)}</time>
            <span aria-hidden="true">·</span>
            <span>{insight.readingTime} min read</span>
            {insight.sourceCount > 0 ? (
              <>
                <span aria-hidden="true">·</span>
                <span className="text-primary">Based on {insight.sourceCount} sources</span>
              </>
            ) : null}
          </p>
          <article
            className="prose-tko mt-10"
            dangerouslySetInnerHTML={{ __html: insight.html }}
          />
        </div>
      </Section>
      {related.length > 0 ? (
        <Section className="bg-surface">
          <SectionHeader eyebrow="Related guides" title="More operating patterns." />
          <div className="mt-10 grid gap-4 lg:grid-cols-3">
            {related.map((relatedInsight) => (
              <RelatedInsightCard key={relatedInsight.slug} insight={relatedInsight} />
            ))}
          </div>
        </Section>
      ) : null}
      <CtaBand
        title={`If this describes your situation, the ${offer.name} is the vehicle.`}
        description={offer.summary}
        primaryHref={offerHref(offer.slug)}
        primaryLabel={`See the ${offer.name}`}
        secondaryHref={PROGRAM_RECOVERY_CONVERSATION.href}
        secondaryLabel={ctaLabel}
      />
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
        Read guide
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
