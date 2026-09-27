import type { Metadata } from "next";
import { CtaBand } from "@/components/site/cta-band";
import { JsonLd } from "@/components/site/json-ld";
import { PageHero } from "@/components/site/page-hero";
import { LinkButton } from "@/components/ui/button";
import { Section, SectionHeader } from "@/components/ui/section";
import { CONSTRAINT_CALL, offerHref, offers } from "@/lib/offers";
import { absoluteUrl, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Services and Pricing",
  description:
    "A fixed-price diagnostic to find the constraint, a build to fix it, and monthly operation to keep it working. Published prices for growing businesses.",
  alternates: { canonical: "/services" },
  openGraph: {
    title: "Services and Pricing | TKO Solutions",
    description: "Find the constraint. Build the fix. Keep it working.",
    url: absoluteUrl("/services"),
    images: [{ url: site.socialImage, width: 1200, height: 630, alt: "TKO Solutions services and pricing." }],
  },
};

export default function ServicesPage() {
  return (
    <>
      <JsonLd data={{ "@context": "https://schema.org", "@type": "ItemList", name: "TKO Solutions services", url: absoluteUrl("/services"), itemListElement: offers.map((offer, index) => ({ "@type": "ListItem", position: index + 1, item: { "@type": "Service", name: offer.name, description: offer.metaDescription, url: absoluteUrl(offerHref(offer.slug)), provider: { "@type": "ProfessionalService", name: site.name, url: site.url } } })) }} />
      <PageHero eyebrow="Services and pricing" title="Find the constraint. Build the fix. Keep it working." description="Three steps, each priced up front and useful on its own. Most clients start with the diagnostic. Nobody is locked into the next step." primaryHref={CONSTRAINT_CALL.href} primaryLabel={CONSTRAINT_CALL.label} secondaryHref="/services/constraint-diagnostic" secondaryLabel="See the Diagnostic" />

      <Section className="bg-surface !py-14 md:!py-20">
        <ol className="space-y-5">
          {offers.map((offer, index) => (
            <li key={offer.slug} className="grid gap-6 border border-border bg-white p-6 md:grid-cols-[4rem_1fr_1.4fr_0.65fr] md:p-8">
              <p className="font-mono text-sm font-semibold text-primary">{String(index + 1).padStart(2, "0")}</p>
              <div><p className="text-xs font-semibold uppercase tracking-[0.12em] text-primary">{offer.step}</p><h2 className="mt-3 text-2xl font-semibold leading-tight">{offer.name}</h2><p className="mt-4 text-sm font-semibold">{offer.duration}<br />{offer.commercial}</p></div>
              <div><p className="text-lg font-semibold leading-7">{offer.question}</p><p className="mt-4 text-base leading-7 text-muted">{offer.summary}</p><p className="mt-4 text-sm leading-6 text-muted"><span className="font-semibold text-foreground">What comes next: </span>{offer.expansionPath}</p></div>
              <LinkButton href={offerHref(offer.slug)} variant="secondary" eventName="secondary_cta_click" ctaLocation="services_ladder" className="self-start">See Scope</LinkButton>
            </li>
          ))}
        </ol>
      </Section>

      <Section>
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeader eyebrow="How pricing works" title="You pay for the problem solved, not for hours." description="Every engagement states the objective, the metric it should move, what's in and out of scope, and what you own at the end, before any work starts." />
          <div className="space-y-5 text-base leading-7 text-muted">
            <p>The diagnostic is the smallest useful step. It shows where the business is losing time and money, puts a number on it using your own data, and ends with a fixed-price plan for the first fix. If building isn&apos;t worth it, the report says so.</p>
            <p>Builds are fixed-price per phase. I build on the tools you already use wherever possible, so the money goes into the operating layer rather than a migration.</p>
            <p>Operate & Improve exists because systems drift. The business changes, and someone has to keep the system matched to how work is actually done.</p>
            <p>Need senior operating help beyond the system itself? A fractional operating-partner arrangement is available for a small number of clients, and is scoped individually.</p>
          </div>
        </div>
      </Section>

      <Section className="bg-surface !py-14 md:!py-18">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeader eyebrow="Not a fit" title="What TKO doesn't do." />
          <ul className="border-t border-border">
            {[
              "Hourly staff augmentation or an open-ended bench of consultants.",
              "Chatbots or AI pilots with no operating change behind them.",
              "Replacing your CRM because a vendor said so.",
              "Fully autonomous systems where a person's judgment belongs.",
              "General IT support.",
            ].map((item) => <li key={item} className="border-b border-border py-4 text-base leading-7 text-muted">{item}</li>)}
          </ul>
        </div>
      </Section>

      <CtaBand description={CONSTRAINT_CALL.summary} secondaryHref="/selected-work/from-crm-to-operating-system" secondaryLabel="See How RachelOS Was Built" />
    </>
  );
}
