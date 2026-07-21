import type { Metadata } from "next";
import { CtaBand } from "@/components/site/cta-band";
import { JsonLd } from "@/components/site/json-ld";
import { LinkButton } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Section, SectionHeader } from "@/components/ui/section";
import { absoluteUrl, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Independent Transformation Recovery & Execution Advisory",
  description: site.description,
  alternates: { canonical: "/" },
  openGraph: {
    title: "Regain control of transformation programs under pressure",
    description: site.description,
    url: absoluteUrl("/"),
    images: [
      {
        url: site.socialImage,
        width: 1200,
        height: 630,
        alt: "TKO Solutions transformation recovery and execution advisory.",
      },
    ],
  },
};

const credibility = [
  "20+ years across regulated operations, product, technology, and enterprise transformation",
  "Healthcare transformation and interoperability depth",
  "Cross-workstream program recovery",
  "Principal-led and vendor-neutral",
];

const pressureQuestions = [
  "What is actually true?",
  "Where is delivery risk accumulating?",
  "Which decisions and owners are missing?",
  "What should be reset, narrowed, funded, stopped, or escalated?",
  "What must happen in the next 90 days?",
];

const proofPillars = [
  {
    title: "Enterprise healthcare modernization",
    description:
      "Cross-functional delivery across care management, claims, provider experience, clinical workflow, eligibility, and member operations.",
  },
  {
    title: "Regulated product delivery",
    description:
      "Payer-facing interoperability ownership connecting CMS and FHIR requirements to access, auditability, governance, and operating behavior.",
  },
  {
    title: "Financial and wealth operations",
    description:
      "High-consequence operational, product, platform, and transaction environments.",
  },
  {
    title: "Hands-on implementation",
    description:
      "Founder-built operating systems demonstrating traceability, controls, human approval, and disciplined AI use.",
  },
];

const primaryOffers = [
  {
    step: "01 · Rapid independent view",
    title: "Program Pressure Test",
    duration: "5–7 business days",
    price: "$7,500–$12,500",
    description:
      "An executive exposure memo, five critical risks, decision-aging view, recovery options, and a recommendation on whether a full diagnostic is warranted.",
    href: "/contact",
    cta: "Request a Program Review",
  },
  {
    step: "02 · Establish the fact base",
    title: "Transformation Recovery Diagnostic",
    duration: "15 business days",
    price: "$25,000–$40,000 fixed fee",
    description:
      "A trusted baseline, dependency and decision map, root-cause view, recovery choices, re-baselining requirements, and a measurable 90-day recovery plan.",
    href: "/services/diagnostic",
    cta: "See the 15-Day Diagnostic",
  },
  {
    step: "03 · Mobilize the recovery",
    title: "90-Day Recovery Mobilization",
    duration: "12 weeks",
    price: "$75,000–$150,000+",
    description:
      "Senior recovery leadership to reset the plan, decisions, vendors, workstreams, operating readiness, measures, and transition to accountable owners.",
    href: "/services/operating-system-build",
    cta: "See Recovery Mobilization",
  },
];

const secondaryOffers = [
  {
    title: "AI Initiative Readiness & Control Review",
    duration: "10–20 business days",
    price: "$20,000–$45,000",
    description:
      "For an active AI initiative with unresolved value, workflow ownership, controls, adoption, or human decision boundaries.",
    href: "/services#ai-review",
  },
  {
    title: "Fractional Transformation Executive",
    duration: "Three-month minimum",
    price: "$15,000–$30,000 per month",
    description:
      "Ongoing senior accountability for governance, portfolio decisions, vendor challenge, sponsor reporting, and team coaching.",
    href: "/services#fractional",
  },
];

export default function HomePage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "TKO Solutions | Transformation Recovery & Execution Advisory",
          url: absoluteUrl("/"),
          description: site.description,
        }}
      />

      <section className="relative overflow-hidden bg-midnight text-white">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgb(var(--accent-rgb)/0.18),_transparent_58%)]"
        />
        <div className="relative mx-auto w-full max-w-7xl px-6 py-14 sm:py-16 lg:px-8 lg:py-20">
          <div className="max-w-5xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary-light">
              Independent transformation recovery advisory
            </p>
            <h1 className="mt-5 max-w-5xl text-4xl font-bold leading-[1.04] tracking-tight sm:text-6xl lg:text-7xl">
              Regain control of transformation programs that are slipping, stalled,
              or no longer trusted.
            </h1>
            <p className="mt-6 max-w-[72ch] text-lg leading-8 text-white/70 sm:text-xl sm:leading-9">
              TKO gives executive sponsors an independent view of delivery reality,
              resets ownership, decisions, vendors, and sequencing, and mobilizes a
              measurable 90-day recovery—led personally by Todd Kovalsky.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <LinkButton href="/contact" ctaLocation="homepage_hero">
                {site.cta}
              </LinkButton>
              <LinkButton
                href="/services/diagnostic"
                ctaLocation="homepage_hero"
                variant="secondary"
                className="border-white/35 text-white hover:border-white/60 hover:bg-white/10"
              >
                See the 15-Day Recovery Diagnostic
              </LinkButton>
            </div>
          </div>
        </div>
      </section>

      <section aria-label="TKO credibility" className="border-b border-border bg-surface">
        <ul className="mx-auto grid w-full max-w-7xl gap-3 px-6 py-6 text-sm font-semibold sm:grid-cols-2 lg:grid-cols-4 lg:px-8">
          {credibility.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <Section className="!py-14 md:!py-20">
        <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr]">
          <SectionHeader
            eyebrow="When control is slipping"
            title="The program can be busy and still be losing control."
            description="Workstreams report progress, but critical dependencies remain unresolved. Decisions age. Vendors disagree about the cause. Milestones move without an accepted baseline. Benefits remain disconnected from delivery activity."
          />
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.12em] text-primary">
              Leadership needs to answer
            </p>
            <ul className="mt-5 grid gap-3">
              {pressureQuestions.map((question) => (
                <li key={question} className="border border-border bg-white p-5 text-base font-semibold leading-7">
                  {question}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <Section className="bg-surface !py-14 md:!py-20">
        <SectionHeader
          eyebrow="Relevant operating experience"
          title="Experience across the environments where execution becomes difficult."
        />
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {proofPillars.map((pillar) => (
            <Card key={pillar.title}>
              <h3 className="text-2xl font-semibold">{pillar.title}</h3>
              <p className="mt-4 text-base leading-7 text-muted">{pillar.description}</p>
            </Card>
          ))}
        </div>
        <p className="mt-6 max-w-4xl text-xs leading-5 text-muted">
          Employment experience establishes relevant scope and accountability. It is
          not presented as employer endorsement or an attributable TKO client result.
        </p>
        <LinkButton href="/selected-work" variant="secondary" className="mt-7">
          Review Selected Work
        </LinkButton>
      </Section>

      <Section className="!py-14 md:!py-20">
        <SectionHeader
          eyebrow="Primary offers"
          title="Start with the smallest engagement that protects the decision."
          description="Three fixed, concrete scopes create a clear progression from independent exposure review to fact-based recovery and hands-on mobilization."
        />
        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {primaryOffers.map((offer) => (
            <Card key={offer.title} className="flex flex-col">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">
                {offer.step}
              </p>
              <h3 className="mt-5 text-2xl font-semibold leading-tight">{offer.title}</h3>
              <dl className="mt-5 border-y border-border py-4 text-sm">
                <div className="flex justify-between gap-4">
                  <dt className="text-muted">Duration</dt>
                  <dd className="text-right font-semibold">{offer.duration}</dd>
                </div>
                <div className="mt-2 flex justify-between gap-4">
                  <dt className="text-muted">Fee</dt>
                  <dd className="text-right font-semibold">{offer.price}</dd>
                </div>
              </dl>
              <p className="mt-5 flex-1 text-base leading-7 text-muted">{offer.description}</p>
              <LinkButton href={offer.href} className="mt-7 self-start">
                {offer.cta}
              </LinkButton>
            </Card>
          ))}
        </div>

        <div className="mt-12 border-t border-border pt-10">
          <p className="text-sm font-semibold uppercase tracking-[0.12em] text-primary">
            Secondary engagement paths
          </p>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            {secondaryOffers.map((offer) => (
              <Card key={offer.title}>
                <h3 className="text-xl font-semibold">{offer.title}</h3>
                <p className="mt-3 text-sm font-semibold text-foreground">
                  {offer.duration} · {offer.price}
                </p>
                <p className="mt-3 text-base leading-7 text-muted">{offer.description}</p>
                <LinkButton href={offer.href} variant="secondary" className="mt-6">
                  Review This Engagement Path
                </LinkButton>
              </Card>
            ))}
          </div>
        </div>
      </Section>

      <Section className="bg-surface !py-14 md:!py-20">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <SectionHeader
            eyebrow="Principal-led delivery"
            title="Senior operator accountability—not a junior assessment team or slide-deck handoff."
            description="Todd Kovalsky has spent more than 20 years working where operations, product, technology, vendors, governance, and executive decisions collide. He leads the fact-finding, diagnosis, executive readout, and recovery mobilization personally."
          />
          <Card>
            <p className="text-sm font-semibold uppercase tracking-[0.1em] text-primary">
              Todd Kovalsky
            </p>
            <p className="mt-4 text-2xl font-semibold">
              Transformation Recovery &amp; Execution Advisor
            </p>
            <p className="mt-4 text-base leading-7 text-muted">
              Independent and vendor-neutral, with healthcare as the primary
              specialization and experience across regulated operating environments.
            </p>
            <LinkButton href="/founder" variant="secondary" className="mt-6">
              About Todd
            </LinkButton>
          </Card>
        </div>
      </Section>

      <CtaBand
        secondaryHref={`mailto:${site.email}`}
        secondaryLabel="Email Todd Directly"
      />
    </>
  );
}
