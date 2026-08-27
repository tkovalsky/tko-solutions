import type { Metadata } from "next";
import { CtaBand } from "@/components/site/cta-band";
import { JsonLd } from "@/components/site/json-ld";
import { PageHero } from "@/components/site/page-hero";
import { LinkButton } from "@/components/ui/button";
import { Section, SectionHeader } from "@/components/ui/section";
import { offerHref, offers, TRANSFORMATION_CONVERSATION } from "@/lib/offers";
import { absoluteUrl, site } from "@/lib/site";

export const metadata: Metadata = { title: "Healthcare Transformation Advisory Services", description: "A land-and-expand advisory ladder from paid diagnostic through operating-model design to execution authority on complex healthcare transformations.", alternates: { canonical: "/services" }, openGraph: { title: "Healthcare Transformation Advisory Services | TKO Solutions", description: "Start with a bounded problem. Expand only when evidence supports it.", url: absoluteUrl("/services"), images: [{ url: site.socialImage, width: 1200, height: 630, alt: "TKO Solutions advisory services." }] } };

export default function ServicesPage() {
  return (
    <>
      <JsonLd data={{ "@context": "https://schema.org", "@type": "ItemList", name: "TKO Solutions advisory services", url: absoluteUrl("/services"), itemListElement: offers.map((offer, index) => ({ "@type": "ListItem", position: index + 1, item: { "@type": "Service", name: offer.name, url: absoluteUrl(offerHref(offer.slug)), provider: { "@type": "Organization", name: site.name } } })) }} />
      <PageHero eyebrow="Advisory services" title="Start with a bounded problem. Expand only when the evidence supports it." description="TKO is designed for paid discovery, executable future-state design, and accountability for execution on transformations no single team owns—not hourly freelancing, staff augmentation, or an open-ended consulting bench." primaryHref="/contact" primaryLabel="Discuss a Transformation" secondaryHref="/services/executive-diagnostic" secondaryLabel="Start with a Diagnostic" />

      <Section className="bg-surface !py-14 md:!py-20">
        <ol className="space-y-5">
          {offers.map((offer, index) => (
            <li key={offer.slug} className="grid gap-6 border border-border bg-white p-6 md:grid-cols-[4rem_1fr_1.4fr_0.65fr] md:p-8">
              <p className="font-mono text-sm font-semibold text-primary">{String(index + 1).padStart(2, "0")}</p>
              <div><p className="text-xs font-semibold uppercase tracking-[0.12em] text-primary">{offer.step}</p><h2 className="mt-3 text-2xl font-semibold leading-tight">{offer.name}</h2><p className="mt-4 text-sm font-semibold">{offer.duration}<br />{offer.commercial}</p></div>
              <div><p className="text-lg font-semibold leading-7">{offer.question}</p><p className="mt-4 text-base leading-7 text-muted">{offer.summary}</p><p className="mt-4 text-sm leading-6 text-muted"><span className="font-semibold text-foreground">Expansion decision: </span>{offer.expansionPath}</p></div>
              <LinkButton href={offerHref(offer.slug)} variant="secondary" className="self-start">See Scope</LinkButton>
            </li>
          ))}
        </ol>
      </Section>

      <Section>
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeader eyebrow="Commercial model" title="Price the problem and accountability—not the founder’s hours." description="TKO estimates effort internally. Public scopes are priced around the problem, outcome, access, complexity, and risk reduction." />
          <div className="space-y-5 text-base leading-7 text-muted"><p>Every engagement states the objective, deliverables, timeline, client responsibilities, included access, exclusions, and the decision for handoff or expansion.</p><p>The diagnostic delivers meaningful standalone value. Its commercial purpose is also to establish evidence: quantify the problem, reveal the true scope, and determine whether future-state design or implementation support is justified.</p><p>TKO does not sell Jira administration, outsourced staffing, generic AI consulting, or unlimited fractional labor.</p></div>
        </div>
      </Section>

      <Section id="delivery-partners" className="bg-surface !py-14 md:!py-18">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]"><SectionHeader eyebrow="Delivery partners" title="TKO can work alongside internal teams and established firms." description="Todd can define the operating model, govern decisions and dependencies, and provide healthcare specialist depth while the appropriate internal, engineering, or integration teams retain delivery accountability." /><div><p className="text-base leading-7 text-muted">Partner arrangements are scoped around a named transformation and capability need. TKO is not marketed as low-cost subcontract labor and does not publish an hourly rate card.</p><LinkButton href="/contact?intent=partner" variant="secondary" className="mt-7">Discuss Delivery-Partner Support</LinkButton></div></div>
      </Section>

      <CtaBand title="Start with the decision leadership needs to make." description={TRANSFORMATION_CONVERSATION.summary} primaryLabel="Discuss a Transformation" secondaryHref="/services/executive-diagnostic" secondaryLabel="Start with a Diagnostic" />
    </>
  );
}
