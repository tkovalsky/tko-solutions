import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/site/json-ld";
import { PageHero } from "@/components/site/page-hero";
import { LinkButton } from "@/components/ui/button";
import { Section, SectionHeader } from "@/components/ui/section";
import { getOffer } from "@/lib/offers";
import { absoluteUrl, site } from "@/lib/site";
import type { Solution } from "@/lib/solutions";

// Every solution page sets its own canonical; the root layout deliberately has none.
export function solutionMetadata(solution: Solution): Metadata {
  return {
    title: solution.metaTitle,
    description: solution.metaDescription,
    alternates: { canonical: solution.path },
    openGraph: {
      title: `${solution.metaTitle} | ${site.name}`,
      description: solution.metaDescription,
      url: absoluteUrl(solution.path),
      images: [{ url: site.socialImage, width: 1200, height: 630, alt: `${site.name}: ${solution.eyebrow}.` }],
    },
  };
}

export function SolutionPage({ solution }: { solution: Solution }) {
  const blueprint = getOffer("execution-gap-blueprint")!;
  return (
    <>
      <JsonLd data={{ "@context": "https://schema.org", "@type": "WebPage", name: solution.metaTitle, description: solution.metaDescription, url: absoluteUrl(solution.path), isPartOf: { "@type": "WebSite", name: site.name, url: site.url } }} />
      <PageHero eyebrow={solution.eyebrow} title={solution.title} description={solution.problem} primaryHref={solution.cta.href} primaryLabel={solution.cta.label} secondaryHref={solution.cta.secondaryHref} secondaryLabel={solution.cta.secondaryLabel} />

      {solution.status ? (
        <section aria-label="Status of this application" className="border-y border-border bg-surface">
          <p className="mx-auto w-full max-w-7xl px-6 py-5 text-sm leading-6 lg:px-8"><span className="font-semibold">Proposed application. </span>{solution.status}</p>
        </section>
      ) : null}

      <Section className="!py-14 md:!py-18">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <SectionHeader eyebrow="What it costs" title="The operational consequences." />
            <ul className="mt-8 border-t border-border">{solution.consequences.map((item) => <li key={item} className="border-b border-border py-4 text-base leading-7 text-muted">{item}</li>)}</ul>
          </div>
          <div>
            <SectionHeader eyebrow="Why it happens" title="The usual root causes." />
            <ul className="mt-8 border-t border-border">{solution.rootCauses.map((item) => <li key={item} className="border-b border-border py-4 text-base leading-7 text-muted">{item}</li>)}</ul>
          </div>
        </div>
      </Section>

      <Section className="bg-surface !py-14 md:!py-18">
        <SectionHeader eyebrow="How TKO diagnoses it" title="Follow the work, then fix the smallest thing that matters." />
        <ol className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {solution.diagnosis.map((item, index) => (
            <li key={item.step} className="border-t-2 border-primary bg-white p-6">
              <p className="font-mono text-sm font-semibold text-primary">{String(index + 1).padStart(2, "0")}</p>
              <h3 className="mt-2 text-lg font-semibold">{item.step}</h3>
              <p className="mt-2 text-sm leading-6 text-muted">{item.description}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section className="!py-14 md:!py-18">
        <SectionHeader eyebrow={solution.example.label} title={solution.example.title} />
        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <div className="rounded-xl border border-border bg-surface p-6">
            <h3 className="text-xs font-semibold uppercase tracking-[0.12em] text-muted">Before</h3>
            <ul className="mt-4 space-y-3">{solution.example.before.map((item) => <li key={item} className="text-base leading-7">{item}</li>)}</ul>
          </div>
          <div className="rounded-xl border-2 border-primary bg-white p-6">
            <h3 className="text-xs font-semibold uppercase tracking-[0.12em] text-primary">With an operating layer</h3>
            <ul className="mt-4 space-y-3">{solution.example.after.map((item) => <li key={item} className="text-base leading-7">{item}</li>)}</ul>
          </div>
        </div>
      </Section>

      <Section className="bg-surface !py-14 md:!py-18">
        <SectionHeader eyebrow="Evidence you can inspect" title="What backs this up, and what it does not prove." />
        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          {solution.evidence.map((item) => (
            <article key={item.href} className="flex flex-col rounded-xl border border-border bg-white p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-primary">{item.kind}</p>
              <h3 className="mt-2 text-xl font-semibold">{item.title}</h3>
              <p className="mt-3 flex-1 text-base leading-7 text-muted">{item.description}</p>
              <Link href={item.href} className="mt-4 inline-flex min-h-11 items-center text-sm font-semibold text-primary hover:underline">Inspect it →</Link>
            </article>
          ))}
        </div>
      </Section>

      <Section className="!py-14 md:!py-18">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeader eyebrow="Boundaries" title="What this is not." />
          <ul className="space-y-3">{solution.boundaries.map((item) => <li key={item} className="border-l-2 border-border bg-surface p-5 text-base leading-7 text-muted">{item}</li>)}</ul>
        </div>
      </Section>

      <Section className="bg-surface !py-14">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <SectionHeader eyebrow="Where to start" title="The right next step." description={solution.cta.note} />
            <p className="mt-4 text-sm font-semibold text-primary">Execution Gap Blueprint: {blueprint.commercial} · {blueprint.duration}</p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <LinkButton href={solution.cta.href} ctaLocation={`solution_${solution.slug}`}>{solution.cta.label}</LinkButton>
              <LinkButton href={solution.cta.secondaryHref} variant="secondary" eventName="secondary_cta_click" ctaLocation={`solution_${solution.slug}`}>{solution.cta.secondaryLabel}</LinkButton>
            </div>
          </div>
          <nav aria-label="Related">
            <h3 className="text-xs font-semibold uppercase tracking-[0.12em] text-muted">Related</h3>
            <ul className="mt-3 border-t border-border">{solution.related.map((item) => <li key={item.href} className="border-b border-border"><Link href={item.href} className="flex min-h-12 items-center text-sm font-semibold hover:text-primary hover:underline">{item.label}</Link></li>)}</ul>
          </nav>
        </div>
      </Section>

    </>
  );
}
