import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CtaBand } from "@/components/site/cta-band";
import { Faq } from "@/components/site/faq";
import { JsonLd } from "@/components/site/json-ld";
import { PageHero } from "@/components/site/page-hero";
import { LinkButton } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Section, SectionHeader } from "@/components/ui/section";
import {
  getOffer,
  offers,
  offerHref,
  PROGRAM_RECOVERY_CONVERSATION,
  SPECIALIST_CONVERSATION,
} from "@/lib/offers";
import { absoluteUrl, site } from "@/lib/site";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return offers.map((offer) => ({ slug: offer.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const offer = getOffer(slug);

  if (!offer) {
    return {};
  }

  return {
    title: offer.name,
    description: offer.metaDescription,
    alternates: { canonical: offerHref(offer.slug) },
    openGraph: {
      title: `${offer.name} | ${site.name}`,
      description: offer.metaDescription,
      url: absoluteUrl(offerHref(offer.slug)),
      images: [
        {
          url: site.socialImage,
          width: 1200,
          height: 630,
          alt: `${site.name} — ${offer.name}.`,
        },
      ],
    },
  };
}

export default async function OfferPage({ params }: Params) {
  const { slug } = await params;
  const offer = getOffer(slug);

  if (!offer) {
    notFound();
  }

  const isSpecialist = offer.slug === "specialist-subcontract";
  const primaryHref = isSpecialist ? SPECIALIST_CONVERSATION.href : PROGRAM_RECOVERY_CONVERSATION.href;
  const otherOffers = offers.filter((candidate) => candidate.slug !== offer.slug);

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: offer.name,
          description: offer.metaDescription,
          url: absoluteUrl(offerHref(offer.slug)),
          serviceType: "Healthcare transformation advisory",
          provider: { "@type": "Organization", name: site.name, url: site.url },
        }}
      />

      <PageHero
        eyebrow={offer.step}
        title={offer.question}
        description={offer.summary}
        primaryHref={primaryHref}
        primaryLabel={offer.ctaLabel}
        secondaryHref="/services"
        secondaryLabel="Compare All Three Offers"
      />

      <section aria-label="Commercial terms" className="border-y border-border bg-surface">
        <div className="mx-auto grid w-full max-w-7xl gap-3 px-6 py-6 text-sm font-semibold sm:grid-cols-3 lg:px-8">
          <p>{offer.duration}</p>
          <p>{offer.commercial}</p>
          <p>Principal-led, one accountable senior leader</p>
        </div>
      </section>

      <Section className="!py-14 md:!py-18">
        <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr]">
          <SectionHeader eyebrow="Who this is for" title="The buyer and the moment." description={offer.audience} />
          <ul className="grid gap-3">
            {offer.triggers.map((trigger) => (
              <li key={trigger} className="border border-border bg-white p-5 text-base leading-7 text-muted">
                {trigger}
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section className="bg-surface !py-14 md:!py-18">
        <SectionHeader
          eyebrow="What you get"
          title={isSpecialist ? "Capability brought to your engagement." : "What the engagement produces."}
        />
        <ul className="mt-10 grid gap-3 sm:grid-cols-2">
          {offer.deliverables.map((deliverable) => (
            <li key={deliverable} className="border border-border bg-white p-5 text-base leading-7 text-foreground">
              {deliverable}
            </li>
          ))}
        </ul>
      </Section>

      <Section className="!py-14 md:!py-18">
        <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr]">
          <SectionHeader
            eyebrow="Scope boundaries"
            title="What this engagement is not."
            description="Stated up front so the scope conversation is short and the proposal contains no surprises."
          />
          <ul className="grid gap-3">
            {offer.boundaries.map((boundary) => (
              <li key={boundary} className="border-l-2 border-border bg-surface p-5 text-base leading-7 text-muted">
                {boundary}
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section className="bg-surface !py-14 md:!py-18">
        <SectionHeader eyebrow="Questions" title="What buyers ask before committing." />
        <div className="mt-10">
          <Faq items={offer.faqs} />
        </div>
      </Section>

      <Section className="!py-14 md:!py-18">
        <SectionHeader eyebrow="The other two" title="If this is not the right vehicle." />
        <div className="mt-10 grid gap-4 lg:grid-cols-2">
          {otherOffers.map((other) => (
            <Card key={other.slug} className="flex flex-col">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">{other.step}</p>
              <h3 className="mt-4 text-2xl font-semibold leading-tight">{other.name}</h3>
              <p className="mt-4 text-base leading-7 text-muted">{other.question}</p>
              <p className="mt-4 text-sm font-semibold text-foreground">
                {other.duration} · {other.commercial}
              </p>
              <LinkButton href={offerHref(other.slug)} variant="secondary" className="mt-7 self-start">
                {other.name}
              </LinkButton>
            </Card>
          ))}
        </div>
      </Section>

      <CtaBand
        title={
          isSpecialist
            ? "Describe the engagement and the window."
            : "Start with a 45-minute Program Recovery Conversation."
        }
        description={
          isSpecialist
            ? "Tell Todd about the account, the capability gap, and the timing. He will respond within one business day with current availability."
            : PROGRAM_RECOVERY_CONVERSATION.summary
        }
        primaryHref={primaryHref}
        primaryLabel={offer.ctaLabel}
        secondaryHref="/services"
        secondaryLabel="Compare All Three Offers"
      />
    </>
  );
}
