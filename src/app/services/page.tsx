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
    "A focused diagnostic, a fixed-price build, and ongoing care for growing businesses that have outgrown the way work gets done today.",
  alternates: { canonical: "/services" },
  openGraph: {
    title: "Services and Pricing | TKO Solutions",
    description: "Start with what is stuck. Build the first useful fix. Keep it working as the business changes.",
    url: absoluteUrl("/services"),
    images: [{ url: site.socialImage, width: 1200, height: 630, alt: "TKO Solutions services and pricing." }],
  },
};

export default function ServicesPage() {
  return (
    <>
      <JsonLd data={{ "@context": "https://schema.org", "@type": "ItemList", name: "TKO Solutions services", url: absoluteUrl("/services"), itemListElement: offers.map((offer, index) => ({ "@type": "ListItem", position: index + 1, item: { "@type": "Service", name: offer.name, description: offer.metaDescription, url: absoluteUrl(offerHref(offer.slug)), provider: { "@type": "ProfessionalService", name: site.name, url: site.url } } })) }} />
      <PageHero eyebrow="Services and pricing" title="Start with what is stuck. Build only what helps." description="Three straightforward ways to work together. Start with the diagnostic if the problem is not clear; start with a build if it is. Each step is useful on its own." primaryHref={CONSTRAINT_CALL.href} primaryLabel={CONSTRAINT_CALL.label} secondaryHref="/services/constraint-diagnostic" secondaryLabel="See the Diagnostic" />

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
          <SectionHeader eyebrow="How pricing works" title="Clear scope before the work starts." description="Every engagement states the problem, the outcome we are aiming for, what is in and out of scope, and what you own at the end." />
          <div className="space-y-5 text-base leading-7 text-muted">
            <p>The diagnostic is the smallest useful step when the business feels stuck but the first fix is not obvious.</p>
            <p>Builds are fixed-price by phase. I use the tools you already have wherever they fit, so the work goes into the missing workflow rather than an unnecessary migration.</p>
            <p>Operate & Improve is optional. It keeps the system matched to the business after launch, without turning the engagement into open-ended consulting.</p>
          </div>
        </div>
      </Section>

      <Section className="bg-surface !py-14 md:!py-18">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeader eyebrow="Not a fit" title="What this is not." />
          <ul className="border-t border-border">
            {[
              "Hourly staff augmentation or an open-ended bench of consultants.",
              "An AI pilot looking for a business problem.",
              "Replacing your CRM because a vendor said so.",
              "Automation for decisions that still need human judgment.",
              "General IT support.",
            ].map((item) => <li key={item} className="border-b border-border py-4 text-base leading-7 text-muted">{item}</li>)}
          </ul>
        </div>
      </Section>

      <CtaBand description={CONSTRAINT_CALL.summary} secondaryHref="/selected-work/from-crm-to-operating-system" secondaryLabel="See How RachelOS Was Built" />
    </>
  );
}
