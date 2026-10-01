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
    "Workflow systems, CRM integrations, automation, and practical AI applications. Explore diagnostic, build, and ongoing support options with clear pricing.",
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
      <PageHero eyebrow="Services and pricing" title="From a recurring problem to a working system." description="Bring a follow-up gap, a manual process, or an AI use case. If the problem needs investigation, start with a diagnostic. If the workflow and goal are clear, we can scope a build directly." primaryHref={CONSTRAINT_CALL.href} primaryLabel={CONSTRAINT_CALL.label} secondaryHref="/services/operating-system-build" secondaryLabel="Explore a Build" />

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
            <p>Builds are fixed-price by phase. We define the workflow, tools, users, review steps, and result before implementation. You own the code, configuration, and documentation.</p>
            <p>Planning for next year? We can discuss the project now and agree on a start date against your priorities and my availability.</p>
            <p>Operate & Improve is optional. It keeps the system matched to the business after launch, without turning the engagement into open-ended consulting.</p>
          </div>
        </div>
      </Section>

      <Section className="bg-surface !py-14 md:!py-18">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeader eyebrow="A useful starting point" title="The project needs a place to land." />
          <ul className="border-t border-border">
            {[
              "One specific workflow or use case that matters to the business.",
              "An owner or team leader who can make decisions about the work.",
              "Access to the people and tools involved in the process.",
              "A clear place for the team to review, use, and maintain the result.",
              "A start date and scope that fit both your priorities and available capacity.",
            ].map((item) => <li key={item} className="border-b border-border py-4 text-base leading-7 text-muted">{item}</li>)}
          </ul>
        </div>
      </Section>

      <CtaBand description={CONSTRAINT_CALL.summary} secondaryHref="/selected-work/from-crm-to-operating-system" secondaryLabel="See How RachelOS Was Built" />
    </>
  );
}
