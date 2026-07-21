import type { Metadata } from "next";
import { CtaBand } from "@/components/site/cta-band";
import { JsonLd } from "@/components/site/json-ld";
import { PageHero } from "@/components/site/page-hero";
import { LinkButton } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Section, SectionHeader } from "@/components/ui/section";
import { absoluteUrl, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Prior Authorization Engagements",
  description:
    "One fixed-fee Diagnostic and one bounded 90-day implementation path for prior authorization operations.",
  alternates: { canonical: "/services" },
  openGraph: {
    title: "Prior Authorization Engagements | TKO Solutions",
    description:
      "Diagnose the workflow, then improve only what the evidence supports.",
    url: absoluteUrl("/services"),
    images: [{ url: site.socialImage, width: 1200, height: 630, alt: "TKO Solutions prior authorization performance advisory." }],
  },
};

const engagements = [
  {
    step: "Step 1 · Start here",
    title: "Prior Authorization Performance Diagnostic",
    duration: "15 business days",
    price: "$25,000 fixed fee",
    description:
      "For healthcare operations leaders who need to understand what is driving delay, rework, denials, or staff dependency—and make a decision before investing further.",
    outputs:
      "Measured baseline, workflow and exception map, root-cause analysis, target workflow, KPI definitions, 90-day plan, and executive readout.",
    href: "/services/diagnostic",
    cta: "See Diagnostic Scope & Pricing",
  },
  {
    step: "Step 2 · Continue when warranted",
    title: "90-Day Prior Authorization Improvement Sprint",
    duration: "12 weeks",
    price: "$65,000–$95,000",
    description:
      "For Diagnostic clients ready to implement one prioritized workflow change with a named owner, defined measures, and a controlled pilot.",
    outputs:
      "Working playbook, explicit roles and escalation, standard work, measures, bounded workflow changes, training, pilot evidence, and handoff.",
    href: "/services/operating-system-build",
    cta: "Discuss the 90-Day Sprint",
  },
];

export default function ServicesPage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "TKO Solutions prior authorization engagements",
          url: absoluteUrl("/services"),
          itemListElement: engagements.map((engagement, index) => ({
            "@type": "ListItem",
            position: index + 1,
            item: {
              "@type": "Service",
              name: engagement.title,
              url: absoluteUrl(engagement.href),
              provider: { "@type": "Organization", name: site.name },
            },
          })),
        }}
      />
      <PageHero
        eyebrow="Engagements"
        title="Diagnose the workflow. Then improve what the evidence supports."
        description="One fixed-fee Diagnostic and one bounded 90-day implementation path for prior authorization operations. No open-ended advisory retainer. No platform pitch. No implementation before the baseline is credible."
        primaryHref="/services/diagnostic"
        primaryLabel="See Scope & Pricing"
        secondaryHref="/contact"
        secondaryLabel={site.cta}
      />

      <Section className="bg-surface !py-14 md:!py-20">
        <div className="grid gap-5 lg:grid-cols-2">
          {engagements.map((engagement) => (
            <Card key={engagement.title} className="flex flex-col">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">
                {engagement.step}
              </p>
              <h2 className="mt-5 text-3xl font-semibold leading-tight">{engagement.title}</h2>
              <dl className="mt-6 grid grid-cols-2 gap-4 border-y border-border py-5 text-sm">
                <div>
                  <dt className="text-muted">Duration</dt>
                  <dd className="mt-1 font-semibold">{engagement.duration}</dd>
                </div>
                <div>
                  <dt className="text-muted">Commercial model</dt>
                  <dd className="mt-1 font-semibold">{engagement.price}</dd>
                </div>
              </dl>
              <p className="mt-6 text-base leading-7 text-muted">{engagement.description}</p>
              <p className="mt-5 text-sm leading-6 text-foreground">
                <span className="font-semibold text-primary">Outputs: </span>
                {engagement.outputs}
              </p>
              <LinkButton href={engagement.href} className="mt-8 self-start">
                {engagement.cta}
              </LinkButton>
            </Card>
          ))}
        </div>
      </Section>

      <Section className="!py-14 md:!py-20">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeader
            eyebrow="Why the sequence matters"
            title="The Diagnostic protects the decision. The Sprint protects the implementation."
            description="The Diagnostic prevents a premature technology decision. The Sprint prevents the recommendation from ending as a slide deck. Each has a separate scope and decision gate."
          />
          <div className="space-y-5 text-base leading-7 text-muted">
            <p>
              TKO may recommend internal execution, an existing vendor, a specialist
              partner, no further implementation, or the 90-Day Sprint. The Diagnostic
              does not obligate the client to retain TKO for implementation.
            </p>
            <p>
              TKO is not an outsourced authorization department, staff-augmentation
              provider, clinical-policy advisor, law firm, EHR replacement team, or
              general-purpose AI consultancy. Sensitive data handling, specialist
              partners, travel, licenses, integrations, and expanded scope are agreed separately.
            </p>
          </div>
        </div>
      </Section>

      <CtaBand
        title="Is the Diagnostic the right starting point?"
        description="Describe the operating pressure and the decision leadership needs to make. Todd will respond within one business day."
        primaryLabel={site.cta}
        secondaryHref="/services/diagnostic"
        secondaryLabel="See Scope & Pricing"
      />
    </>
  );
}
