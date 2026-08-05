import type { Metadata } from "next";
import { CtaBand } from "@/components/site/cta-band";
import { JsonLd } from "@/components/site/json-ld";
import { PageHero } from "@/components/site/page-hero";
import { LinkButton } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Section, SectionHeader } from "@/components/ui/section";
import {
  offerHref,
  offers,
  PROGRAM_RECOVERY_CONVERSATION,
  SPECIALIST_CONVERSATION,
} from "@/lib/offers";
import { absoluteUrl, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Engagements",
  description:
    "Three ways to work with TKO: a fixed-fee Program Recovery Review, a Fractional Transformation Lead engagement, and specialist subcontract capacity for consultancies and integrators.",
  alternates: { canonical: "/services" },
  openGraph: {
    title: `Engagements | ${site.name}`,
    description:
      "A three-week fixed-fee recovery diagnosis, fractional senior leadership, or specialist subcontract capacity.",
    url: absoluteUrl("/services"),
    images: [{ url: site.socialImage, width: 1200, height: 630, alt: "TKO Solutions healthcare transformation engagements." }],
  },
};

export default function ServicesPage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "TKO Solutions engagements",
          url: absoluteUrl("/services"),
          itemListElement: offers.map((offer, index) => ({
            "@type": "ListItem",
            position: index + 1,
            item: {
              "@type": "Service",
              name: offer.name,
              url: absoluteUrl(offerHref(offer.slug)),
              provider: { "@type": "Organization", name: site.name },
            },
          })),
        }}
      />

      <PageHero
        eyebrow="Engagements"
        title="Three ways to work together. No open-ended retainer."
        description="Every engagement has a fixed scope, a stated commercial model, and one accountable senior leader. There is no staffing ramp, no discovery phase to fund, and no obligation to continue after a diagnosis."
        primaryHref={PROGRAM_RECOVERY_CONVERSATION.href}
        primaryLabel={site.cta}
        secondaryHref={SPECIALIST_CONVERSATION.href}
        secondaryLabel={site.secondaryCta}
      />

      <Section className="bg-surface !py-14 md:!py-20">
        <div className="grid gap-5 lg:grid-cols-3">
          {offers.map((offer) => (
            <Card key={offer.slug} className="flex flex-col">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">{offer.step}</p>
              <h2 className="mt-5 text-2xl font-semibold leading-tight">{offer.name}</h2>
              <dl className="mt-6 grid gap-4 border-y border-border py-5 text-sm">
                <div>
                  <dt className="text-muted">Duration</dt>
                  <dd className="mt-1 font-semibold">{offer.duration}</dd>
                </div>
                <div>
                  <dt className="text-muted">Commercial model</dt>
                  <dd className="mt-1 font-semibold">{offer.commercial}</dd>
                </div>
              </dl>
              <p className="mt-6 text-base leading-7 text-muted">{offer.summary}</p>
              <LinkButton href={offerHref(offer.slug)} className="mt-8 self-start">
                {offer.shortName} Detail
              </LinkButton>
            </Card>
          ))}
        </div>
      </Section>

      <Section className="!py-14 md:!py-20">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeader
            eyebrow="Start here"
            title="The Program Recovery Conversation."
            description={PROGRAM_RECOVERY_CONVERSATION.summary}
          />
          <div>
            <ul className="grid gap-3">
              {PROGRAM_RECOVERY_CONVERSATION.outputs.map((output) => (
                <li key={output} className="border border-border bg-white p-5 text-base leading-7 text-foreground">
                  {output}
                </li>
              ))}
            </ul>
            <p className="mt-6 border-l-2 border-border bg-surface p-5 text-sm leading-6 text-muted">
              {PROGRAM_RECOVERY_CONVERSATION.boundary}
            </p>
            <LinkButton href={PROGRAM_RECOVERY_CONVERSATION.href} className="mt-7">
              {site.cta}
            </LinkButton>
          </div>
        </div>
      </Section>

      <Section className="bg-surface !py-14 md:!py-20">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeader
            eyebrow="How the three relate"
            title="Diagnose, then hold it, or reinforce someone else's team."
            description="The three offers are not a funnel you are expected to walk. Most engagements use one."
          />
          <div className="space-y-5 text-base leading-7 text-muted">
            <p>
              The <strong className="font-semibold text-foreground">Program Recovery Review</strong> answers
              whether a program is recoverable and what should happen next. It creates no obligation to
              continue. TKO may recommend internal execution, an existing vendor, a specialist partner, or no
              further investment.
            </p>
            <p>
              The <strong className="font-semibold text-foreground">Fractional Transformation Lead</strong>{" "}
              engagement applies where the recovery plan is understood but no one senior is accountable for
              executing it. It is the primary recurring engagement.
            </p>
            <p>
              The <strong className="font-semibold text-foreground">Specialist Subcontract</strong> is sold to
              consultancies and integrators rather than to end clients, and is delivered under the prime
              firm&rsquo;s agreement and brand.
            </p>
            <p>
              TKO is not an outsourced authorization department, a staff-augmentation provider, a
              clinical-policy or legal advisor, an EHR implementation team, or a general-purpose AI
              consultancy. Sensitive data handling, specialist partners, travel, licenses, and expanded scope
              are agreed separately.
            </p>
          </div>
        </div>
      </Section>

      <CtaBand
        title="Which of the three fits the problem you actually have?"
        description="Describe the program, the pressure, and the decision leadership needs to make. Todd will respond within one business day and say plainly whether TKO is the right help."
        primaryLabel={site.cta}
        secondaryHref={SPECIALIST_CONVERSATION.href}
        secondaryLabel={site.secondaryCta}
      />
    </>
  );
}
