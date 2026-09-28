import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CtaBand } from "@/components/site/cta-band";
import { Faq } from "@/components/site/faq";
import { JsonLd } from "@/components/site/json-ld";
import { PageHero } from "@/components/site/page-hero";
import { LinkButton } from "@/components/ui/button";
import { Section, SectionHeader } from "@/components/ui/section";
import { CONSTRAINT_CALL, getOffer, offers, offerHref } from "@/lib/offers";
import { absoluteUrl, site } from "@/lib/site";

type Params = { params: Promise<{ slug: string }> };
export function generateStaticParams() { return offers.map((offer) => ({ slug: offer.slug })); }
export async function generateMetadata({ params }: Params): Promise<Metadata> { const offer = getOffer((await params).slug); if (!offer) return {}; return { title: offer.name, description: offer.metaDescription, alternates: { canonical: offerHref(offer.slug) }, openGraph: { title: `${offer.name} | ${site.name}`, description: offer.metaDescription, url: absoluteUrl(offerHref(offer.slug)), images: [{ url: site.socialImage, width: 1200, height: 630, alt: `${site.name}: ${offer.name}.` }] } }; }

export default async function OfferPage({ params }: Params) {
  const offer = getOffer((await params).slug); if (!offer) notFound();
  const otherOffers = offers.filter((item) => item.slug !== offer.slug);
  return (
    <>
      <JsonLd data={{ "@context": "https://schema.org", "@type": "Service", name: offer.name, description: offer.metaDescription, url: absoluteUrl(offerHref(offer.slug)), serviceType: "Business operating system design and implementation", provider: { "@type": "ProfessionalService", name: site.name, url: site.url }, areaServed: "United States", offers: { "@type": "Offer", price: offer.startingPrice.replace(/[^0-9]/g, ""), priceCurrency: "USD", description: offer.commercial } }} />
      <PageHero eyebrow={`${offer.level} · ${offer.step}`} title={offer.question} description={offer.summary} primaryHref={CONSTRAINT_CALL.href} primaryLabel={offer.ctaLabel} secondaryHref="/services" secondaryLabel="All Services and Pricing" />
      <section aria-label="Commercial terms" className="border-y border-border bg-surface"><div className="mx-auto grid w-full max-w-7xl gap-3 px-6 py-6 text-sm font-semibold sm:grid-cols-3 lg:px-8"><p>{offer.duration}</p><p>{offer.commercial}</p><p>One principal · Scope agreed in writing</p></div></section>

      <Section className="!py-14 md:!py-18"><div className="grid gap-10 lg:grid-cols-[0.78fr_1.22fr]"><SectionHeader eyebrow="Who it’s for" title="When this is the right step." description={offer.audience} /><ul className="border-t border-border">{offer.triggers.map((trigger) => <li key={trigger} className="border-b border-border py-5 text-base leading-7 text-muted">{trigger}</li>)}</ul></div></Section>

      <Section className="bg-surface !py-14 md:!py-18" id="what-it-produces"><SectionHeader eyebrow="Outputs" title="What you get." /><ul className="mt-10 grid gap-3 sm:grid-cols-2">{offer.deliverables.map((item) => <li key={item} className="border border-border bg-white p-5 text-base leading-7">{item}</li>)}</ul>{offer.timeline ? <ol className="mt-12 grid gap-4 lg:grid-cols-3">{offer.timeline.map((step) => <li key={step.period} className="border-t-2 border-primary bg-white p-6"><p className="text-xs font-semibold uppercase tracking-[0.12em] text-primary">{step.period}</p><h3 className="mt-3 text-xl font-semibold">{step.title}</h3><p className="mt-3 text-sm leading-6 text-muted">{step.description}</p></li>)}</ol> : null}<div className="mt-10 max-w-[72ch] border-l-2 border-primary bg-white p-6"><h3 className="text-base font-semibold">Pricing</h3>{offer.feeFraming ? <p className="mt-3 text-base leading-7">{offer.feeFraming}</p> : null}<p className="mt-3 text-base leading-7 text-muted">{offer.feeBoundary}</p></div></Section>

      <Section><div className="grid gap-10 lg:grid-cols-[0.78fr_1.22fr]"><SectionHeader eyebrow="Boundaries" title="The fine print, up front." description="Stated before any contract, so scope and expectations are clear." /><div><ul className="space-y-3">{offer.boundaries.map((item) => <li key={item} className="border-l-2 border-border bg-surface p-5 text-base leading-7 text-muted">{item}</li>)}</ul><p className="mt-6 text-base leading-7"><span className="font-semibold">What comes next: </span>{offer.expansionPath}</p></div></div></Section>

      <Section className="bg-surface"><SectionHeader eyebrow="Typical work" title="What this usually involves." /><div className="mt-8 flex flex-wrap gap-3">{offer.capabilityTags.map((tag) => <span key={tag} className="border border-border bg-white px-4 py-3 text-sm font-semibold">{tag}</span>)}</div><div className="mt-12"><Faq items={offer.faqs} /></div></Section>

      <Section className="!py-14"><SectionHeader eyebrow="The other steps" title="Start with the smallest step that answers the question." /><div className="mt-8 grid gap-3 sm:grid-cols-2">{otherOffers.map((item) => <LinkButton key={item.slug} href={offerHref(item.slug)} variant="secondary">{item.name} · {item.commercial}</LinkButton>)}</div></Section>
      <CtaBand description={CONSTRAINT_CALL.summary} primaryLabel={offer.ctaLabel} secondaryHref="/selected-work/from-crm-to-operating-system" secondaryLabel="See How RachelOS Was Built" />
    </>
  );
}
