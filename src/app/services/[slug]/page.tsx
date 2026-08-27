import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CtaBand } from "@/components/site/cta-band";
import { Faq } from "@/components/site/faq";
import { JsonLd } from "@/components/site/json-ld";
import { PageHero } from "@/components/site/page-hero";
import { LinkButton } from "@/components/ui/button";
import { Section, SectionHeader } from "@/components/ui/section";
import { getOffer, offers, offerHref, TRANSFORMATION_CONVERSATION } from "@/lib/offers";
import { absoluteUrl, site } from "@/lib/site";

type Params = { params: Promise<{ slug: string }> };
export function generateStaticParams() { return offers.map((offer) => ({ slug: offer.slug })); }
export async function generateMetadata({ params }: Params): Promise<Metadata> { const offer = getOffer((await params).slug); if (!offer) return {}; return { title: offer.name, description: offer.metaDescription, alternates: { canonical: offerHref(offer.slug) }, openGraph: { title: `${offer.name} | ${site.name}`, description: offer.metaDescription, url: absoluteUrl(offerHref(offer.slug)), images: [{ url: site.socialImage, width: 1200, height: 630, alt: `${site.name}: ${offer.name}.` }] } }; }

export default async function OfferPage({ params }: Params) {
  const offer = getOffer((await params).slug); if (!offer) notFound();
  const otherOffers = offers.filter((item) => item.slug !== offer.slug);
  return (
    <>
      <JsonLd data={{ "@context": "https://schema.org", "@type": "Service", name: offer.name, description: offer.metaDescription, url: absoluteUrl(offerHref(offer.slug)), serviceType: "Healthcare transformation and operating-model advisory", provider: { "@type": "Organization", name: site.name, url: site.url } }} />
      <PageHero eyebrow={`${offer.level} · ${offer.step}`} title={offer.question} description={offer.summary} primaryHref="/contact" primaryLabel={offer.ctaLabel} secondaryHref="/services" secondaryLabel="Compare Services" />
      <section aria-label="Commercial terms" className="border-y border-border bg-surface"><div className="mx-auto grid w-full max-w-7xl gap-3 px-6 py-6 text-sm font-semibold sm:grid-cols-3 lg:px-8"><p>{offer.duration}</p><p>{offer.commercial}</p><p>Principal-led with explicit scope boundaries</p></div></section>

      <Section className="!py-14 md:!py-18"><div className="grid gap-10 lg:grid-cols-[0.78fr_1.22fr]"><SectionHeader eyebrow="The buyer and the moment" title="Who this is for." description={offer.audience} /><ul className="border-t border-border">{offer.triggers.map((trigger) => <li key={trigger} className="border-b border-border py-5 text-base leading-7 text-muted">{trigger}</li>)}</ul></div></Section>

      <Section className="bg-surface !py-14 md:!py-18" id="what-it-produces"><SectionHeader eyebrow="Outputs" title="What the engagement produces." /><ul className="mt-10 grid gap-3 sm:grid-cols-2">{offer.deliverables.map((item) => <li key={item} className="border border-border bg-white p-5 text-base leading-7">{item}</li>)}</ul>{offer.timeline ? <ol className="mt-12 grid gap-4 lg:grid-cols-3">{offer.timeline.map((step) => <li key={step.period} className="border-t-2 border-primary bg-white p-6"><p className="text-xs font-semibold uppercase tracking-[0.12em] text-primary">{step.period}</p><h3 className="mt-3 text-xl font-semibold">{step.title}</h3><p className="mt-3 text-sm leading-6 text-muted">{step.description}</p></li>)}</ol> : null}{offer.feeFraming ? <p className="mt-10 max-w-[72ch] border-l-2 border-primary bg-white p-6 text-base leading-7"><span className="font-semibold">What sets the fee. </span>{offer.feeFraming}</p> : null}<p className="mt-6 max-w-[72ch] border-l-2 border-primary bg-white p-6 text-base leading-7"><span className="font-semibold">What the starting price assumes. </span>{offer.feeBoundary}</p></Section>

      <Section><div className="grid gap-10 lg:grid-cols-[0.78fr_1.22fr]"><SectionHeader eyebrow="Boundaries" title="What this engagement is not." description="Stated before contracting so access, accountability, and expansion decisions are explicit." /><div><ul className="space-y-3">{offer.boundaries.map((item) => <li key={item} className="border-l-2 border-border bg-surface p-5 text-base leading-7 text-muted">{item}</li>)}</ul><p className="mt-6 text-base leading-7"><span className="font-semibold">Expansion path: </span>{offer.expansionPath}</p></div></div></Section>

      <Section className="bg-surface"><SectionHeader eyebrow="Capabilities" title="What this engagement draws on." /><div className="mt-8 flex flex-wrap gap-3">{offer.capabilityTags.map((tag) => <span key={tag} className="border border-border bg-white px-4 py-3 text-sm font-semibold">{tag}</span>)}</div><div className="mt-12"><Faq items={offer.faqs} /></div></Section>

      <Section className="!py-14"><SectionHeader eyebrow="Other entry points" title="Use the smallest engagement that can answer the question." /><div className="mt-8 grid gap-3 sm:grid-cols-2">{otherOffers.map((item) => <LinkButton key={item.slug} href={offerHref(item.slug)} variant="secondary">{item.name} · {item.commercial}</LinkButton>)}</div></Section>
      <CtaBand title="Start with the transformation question." description={TRANSFORMATION_CONVERSATION.summary} primaryLabel={offer.ctaLabel} secondaryHref="/services" secondaryLabel="Compare Services" />
    </>
  );
}
