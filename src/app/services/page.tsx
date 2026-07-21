import type { Metadata } from "next";
import { CtaBand } from "@/components/site/cta-band";
import { JsonLd } from "@/components/site/json-ld";
import { PageHero } from "@/components/site/page-hero";
import { LinkButton } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Section, SectionHeader } from "@/components/ui/section";
import { absoluteUrl, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Transformation Recovery Services",
  description:
    "Fixed, principal-led engagements that help executive sponsors establish delivery reality, choose a recovery path, and mobilize measurable execution.",
  alternates: { canonical: "/services" },
  openGraph: {
    title: "Transformation Recovery Services | TKO Solutions",
    description:
      "Start with the smallest engagement that protects the next executive decision.",
    url: absoluteUrl("/services"),
    images: [
      {
        url: site.socialImage,
        width: 1200,
        height: 630,
        alt: "TKO Solutions transformation recovery services.",
      },
    ],
  },
};

const primaryOffers = [
  {
    step: "Step 1 · Rapid review",
    title: "Program Pressure Test",
    duration: "5–7 business days",
    price: "$7,500–$12,500",
    problem:
      "The sponsor suspects a program is drifting but does not yet have support or budget for a full recovery diagnostic.",
    scope:
      "One program; sponsor interview; 3–5 stakeholder interviews; review of status, RAID, plan, governance, and vendor evidence.",
    outputs:
      "Executive exposure memo; five critical risks; decision-aging view; recovery options; recommended diagnostic scope.",
    href: "/contact",
    cta: "Request a Program Review",
  },
  {
    step: "Step 2 · Establish the fact base",
    title: "Transformation Recovery Diagnostic",
    duration: "15 business days",
    price: "$25,000–$40,000 fixed fee",
    problem:
      "Leadership cannot reconcile status, milestones, dependencies, vendors, decisions, benefits, and operational readiness into one trusted program view.",
    scope:
      "One major program or bounded portfolio; 8–12 interviews; evidence review across delivery, governance, ownership, vendors, adoption, and value.",
    outputs:
      "Accepted baseline; dependency and decision map; delivery-confidence assessment; root causes; recovery choices; re-baselining requirements; 90-day plan; executive readout.",
    href: "/services/diagnostic",
    cta: "See Diagnostic Scope & Pricing",
  },
  {
    step: "Step 3 · Mobilize recovery",
    title: "90-Day Recovery Mobilization",
    duration: "12 weeks",
    price: "$75,000–$150,000+",
    problem:
      "A diagnostic exists, but the organization needs senior leadership to stabilize and reset execution.",
    scope:
      "One program; recovery office; re-baseline; decision governance; vendor reset; workstream alignment; operational-readiness and adoption plan.",
    outputs:
      "Recovery charter; integrated plan; accountable ownership; dependency controls; executive dashboard; vendor actions; benefits baseline; operating cadence; transition package.",
    href: "/services/operating-system-build",
    cta: "See Recovery Mobilization",
  },
];

const secondaryOffers = [
  {
    id: "ai-review",
    title: "AI Initiative Readiness & Control Review",
    duration: "10–20 business days",
    price: "$20,000–$45,000",
    description:
      "For one active AI initiative or workflow where value, data and process readiness, authority, controls, vendor claims, adoption, or measurement remain unresolved.",
    outputs:
      "Value hypothesis, readiness scorecard, human-control model, failure-path register, pilot boundary, governance requirements, and a 90-day implementation decision.",
  },
  {
    id: "fractional",
    title: "Fractional Transformation Executive",
    duration: "Three-month minimum",
    price: "$15,000–$30,000 per month",
    description:
      "Ongoing senior accountability when a mid-market, regulated, PE-backed, or advisory organization needs transformation leadership without permanent overhead or a large-firm team.",
    outputs:
      "Decision agenda, governance leadership, risk and dependency view, vendor challenge, sponsor briefings, operating cadence, team coaching, and benefits tracking.",
  },
];

export default function ServicesPage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "TKO Solutions transformation recovery services",
          url: absoluteUrl("/services"),
          itemListElement: primaryOffers.map((offer, index) => ({
            "@type": "ListItem",
            position: index + 1,
            item: {
              "@type": "Service",
              name: offer.title,
              url: absoluteUrl(offer.href),
              provider: { "@type": "Organization", name: site.name },
            },
          })),
        }}
      />
      <PageHero
        eyebrow="Transformation recovery services"
        title="Start with the smallest engagement that protects the decision."
        description="TKO uses fixed, concrete scopes to move from an independent read of program pressure to a trusted recovery decision and, when needed, hands-on mobilization. Each stage has its own decision gate."
        primaryHref="/contact"
        primaryLabel={site.cta}
        secondaryHref="/services/diagnostic"
        secondaryLabel="See the 15-Day Recovery Diagnostic"
      />

      <Section className="bg-surface !py-14 md:!py-20">
        <SectionHeader
          eyebrow="Three primary offers"
          title="A clear progression from exposure review to measurable recovery."
        />
        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {primaryOffers.map((offer) => (
            <Card key={offer.title} className="flex flex-col">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">
                {offer.step}
              </p>
              <h2 className="mt-5 text-3xl font-semibold leading-tight">{offer.title}</h2>
              <dl className="mt-6 grid gap-4 border-y border-border py-5 text-sm">
                <div>
                  <dt className="text-muted">Duration</dt>
                  <dd className="mt-1 font-semibold">{offer.duration}</dd>
                </div>
                <div>
                  <dt className="text-muted">Commercial model</dt>
                  <dd className="mt-1 font-semibold">{offer.price}</dd>
                </div>
              </dl>
              <p className="mt-6 text-base leading-7 text-muted">{offer.problem}</p>
              <p className="mt-5 text-sm leading-6 text-foreground">
                <span className="font-semibold text-primary">Scope: </span>
                {offer.scope}
              </p>
              <p className="mt-4 flex-1 text-sm leading-6 text-foreground">
                <span className="font-semibold text-primary">Outputs: </span>
                {offer.outputs}
              </p>
              <LinkButton href={offer.href} className="mt-8 self-start">
                {offer.cta}
              </LinkButton>
            </Card>
          ))}
        </div>
      </Section>

      <Section className="!py-14 md:!py-20">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeader
            eyebrow="Secondary engagement paths"
            title="Use a specialist path when the trigger is narrower or the leadership need is ongoing."
            description="AI readiness and fractional leadership are visible engagement models, not additional firm-wide entry offers. They are scoped after a confidential review or trusted referral."
          />
          <div className="grid gap-5">
            {secondaryOffers.map((offer) => (
              <Card key={offer.title} id={offer.id} className="scroll-mt-28">
                <h2 className="text-2xl font-semibold">{offer.title}</h2>
                <p className="mt-3 text-sm font-semibold">
                  {offer.duration} · {offer.price}
                </p>
                <p className="mt-4 text-base leading-7 text-muted">{offer.description}</p>
                <p className="mt-4 text-sm leading-6 text-foreground">
                  <span className="font-semibold text-primary">Outputs: </span>
                  {offer.outputs}
                </p>
                <LinkButton href="/contact" variant="secondary" className="mt-6">
                  Discuss This Engagement Path
                </LinkButton>
              </Card>
            ))}
          </div>
        </div>
      </Section>

      <Section className="bg-surface !py-14 md:!py-20">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeader
            eyebrow="Healthcare specialization"
            title="Prior authorization remains a concrete healthcare offer."
            description="The Prior Authorization Performance Diagnostic is a healthcare-specific variant of the Transformation Recovery Diagnostic. Its defensible scope and pricing remain on the Healthcare page."
          />
          <Card>
            <h2 className="text-2xl font-semibold">Prior Authorization Performance Diagnostic</h2>
            <p className="mt-4 text-base leading-7 text-muted">
              A fixed-fee, 15-business-day diagnostic for one defined
              prior-authorization workflow or specialty/payer segment.
            </p>
            <LinkButton href="/healthcare#prior-authorization-diagnostic" className="mt-6">
              Review the Healthcare Offer
            </LinkButton>
          </Card>
        </div>
      </Section>

      <CtaBand
        secondaryHref="/services/diagnostic"
        secondaryLabel="See the 15-Day Recovery Diagnostic"
      />
    </>
  );
}
