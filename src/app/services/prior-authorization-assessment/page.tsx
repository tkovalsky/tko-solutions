import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CtaBand } from "@/components/site/cta-band";
import { Faq } from "@/components/site/faq";
import { JsonLd } from "@/components/site/json-ld";
import { PageHero } from "@/components/site/page-hero";
import { Card } from "@/components/ui/card";
import { Section, SectionHeader } from "@/components/ui/section";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Prior Authorization Operational Assessment",
  description:
    "A fixed-scope healthcare workflow assessment that diagnoses administrative burden, denials, exception handling, and human dependency risk in prior authorization — before automation, AI, FHIR, or Gold Card work.",
  alternates: { canonical: "/services/prior-authorization-assessment" },
  openGraph: {
    title: "Prior Authorization Operational Assessment",
    description:
      "Diagnose operational quality in prior authorization: administrative burden, denial drivers, exception patterns, Human API dependency, and Gold Card readiness.",
    url: absoluteUrl("/services/prior-authorization-assessment"),
  },
};

const inputs = [
  "Prior authorization submissions",
  "Denial reasons",
  "Specialty mix",
  "Payer mix",
  "Workflow documentation",
  "Staffing model",
];

const outputs = [
  {
    title: "Administrative Burden Analysis",
    description:
      "Volume, effort, turnaround time, and exception frequency across the authorization workflow.",
  },
  {
    title: "Denial Analysis",
    description:
      "Documentation, coding, eligibility, and medical-necessity drivers behind denials.",
  },
  {
    title: "Exception Analysis",
    description:
      "Repeat patterns, recurring bottlenecks, and the escalation paths the team relies on.",
  },
  {
    title: "Human API Risk Analysis",
    description:
      "Who knows payer-specific rules, handles exceptions, performs escalations, and trains staff — and what happens if they leave.",
  },
  {
    title: "Gold Card Readiness Assessment",
    description:
      "Approval quality, workflow standardization, documentation quality, and operational maturity. Readiness is an output of operational quality, not a product.",
  },
];

const humanApiSignals = [
  "Know payer-specific workflows",
  "Know escalation paths",
  "Know exception handling",
  "Know documentation requirements",
];

const relatedReadings = [
  {
    title: "Prior Authorization Is a Decision-Rights Problem",
    href: "/insights/prior-authorization-is-a-decision-rights-problem",
    description:
      "Why exception authority and escalation logic must be mapped before automation can help.",
  },
  {
    title: "Prior Authorization Is an Operational Quality Problem",
    href: "/insights/prior-authorization-operational-quality-problem",
    description:
      "Why Gold Card readiness follows from cleaner workflow quality, not the other way around.",
  },
];

const buyerQuestions = [
  "Why are we getting denied?",
  "Why does authorization take so long?",
  "Why is staff spending hours on manual work?",
  "Why do some providers get approved and others do not?",
  "Why do certain payers constantly create friction?",
  "Why is work dependent on specific people?",
];

const faqs = [
  {
    q: "Is this a Gold Card, prior authorization, or claims platform?",
    a: "No. This is an operational assessment, not software. It does not include a Gold Card platform, prior authorization automation product, FHIR infrastructure, claims integration, or payer technology product. It diagnoses operational quality before any of those decisions.",
  },
  {
    q: "How is this different from the Operational Recovery Assessment?",
    a: "It is the same fixed-scope, one-week assessment motion, specialized for prior authorization. It uses PA submissions, denial reasons, payer mix, and staffing as inputs, and produces administrative burden, denial, exception, Human API, and Gold Card readiness findings.",
  },
  {
    q: "Do we need AI or automation in place first?",
    a: "No. Prior authorization is a workflow modernization problem before it is an AI problem. AI and automation help only after the workflow is decomposed into decision tiers, escalation paths, audit requirements, exception handling, and human review points.",
  },
  {
    q: "Do you need verified outcome metrics from us?",
    a: "The assessment works from your existing PA submissions, denial reasons, and workflow documentation. TKO does not publish your savings, turnaround, denial-rate, or program results without your explicit approval.",
  },
];

export default function PriorAuthorizationAssessmentPage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: "Prior Authorization Operational Assessment",
          provider: { "@type": "Organization", name: "TKO Solutions" },
          serviceType: "Prior Authorization Operational Assessment",
          areaServed: "United States",
          offers: {
            "@type": "Offer",
            priceSpecification: {
              "@type": "PriceSpecification",
              priceCurrency: "USD",
              minPrice: 5000,
              maxPrice: 8000,
            },
          },
        }}
      />

      <PageHero
        eyebrow="Tier-1 Healthcare Assessment"
        title="Prior Authorization is a workflow problem before it is an automation problem."
        description="A fixed-scope assessment for prior authorization, utilization management, and provider operations leaders. It diagnoses administrative burden, denial drivers, exception handling, and human dependency risk — so you can fix operational quality before spending on AI, automation, FHIR, or Gold Card programs."
        primaryHref="/contact"
        primaryLabel="Schedule a Prior Authorization Assessment"
        secondaryHref="/services/recovery-assessment"
        secondaryLabel="See the Operational Recovery Assessment"
      />

      <Section>
        <div className="grid gap-6 md:grid-cols-3">
          <Card>
            <p className="text-sm font-semibold uppercase tracking-[0.1em] text-muted">
              Investment
            </p>
            <p className="mt-4 text-3xl font-semibold">$5K-$8K</p>
          </Card>
          <Card>
            <p className="text-sm font-semibold uppercase tracking-[0.1em] text-muted">
              Timeline
            </p>
            <p className="mt-4 text-3xl font-semibold">1 week</p>
          </Card>
          <Card>
            <p className="text-sm font-semibold uppercase tracking-[0.1em] text-muted">
              Service Role
            </p>
            <p className="mt-4 text-2xl font-semibold">Healthcare assessment wedge</p>
          </Card>
        </div>
      </Section>

      <Section className="bg-surface">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <SectionHeader
            eyebrow="The Wedge"
            title="Gold Card eligibility is not the problem. Operational quality is the problem."
            description="Practice administrators do not wake up asking for Gold Card programs, FHIR integrations, or prior authorization platforms. They feel administrative burden, denial friction, staff dependency, and workflow inconsistency first."
          />
          <ul className="grid gap-3">
            {buyerQuestions.map((question) => (
              <li
                key={question}
                className="border border-border bg-white p-5 text-muted"
              >
                {question}
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section>
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeader
            eyebrow="Inputs"
            title="What the assessment works from."
            description="The assessment uses operational evidence you already have. No new platform, integration, or instrumentation is required to begin."
          />
          <div className="grid gap-3 sm:grid-cols-2">
            {inputs.map((input) => (
              <div key={input} className="border border-border p-5">
                <p className="font-semibold">{input}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section className="bg-surface">
        <SectionHeader
          eyebrow="Outputs"
          title="Five operational findings, not a platform pitch."
        />
        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {outputs.map((output) => (
            <Card key={output.title}>
              <h3 className="text-xl font-semibold">{output.title}</h3>
              <p className="mt-4 text-base leading-7 text-muted">
                {output.description}
              </p>
            </Card>
          ))}
        </div>
      </Section>

      <Section>
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <SectionHeader
            eyebrow="The Human API"
            title="Organizations often believe they have a workflow. In reality they have a person."
            description="Every authorization team typically contains one or two people who carry the operating model in their heads. That dependency is one of healthcare's strongest hidden operational risks."
          />
          <div>
            <ul className="grid gap-3">
              {humanApiSignals.map((signal) => (
                <li
                  key={signal}
                  className="border border-border bg-white p-5 text-muted"
                >
                  {signal}
                </li>
              ))}
            </ul>
            <p className="mt-6 max-w-[60ch] text-base leading-7 text-muted">
              The assessment makes that dependency visible — who holds payer-specific
              knowledge, who handles exceptions, who escalates, who trains — and what
              breaks if they become unavailable.
            </p>
          </div>
        </div>
      </Section>

      <Section className="bg-surface">
        <SectionHeader eyebrow="FAQ" title="Questions buyers should resolve before intake." />
        <div className="mt-10">
          <Faq items={faqs} />
        </div>
      </Section>

      <Section>
        <SectionHeader
          eyebrow="Related Reading"
          title="Prior authorization operating patterns."
          description="These articles explain the decision-rights and operational-quality issues the assessment is designed to make visible."
        />
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {relatedReadings.map((reading) => (
            <Card key={reading.href}>
              <h2 className="text-2xl font-semibold">{reading.title}</h2>
              <p className="mt-4 text-base leading-7 text-muted">{reading.description}</p>
              <Link
                href={reading.href}
                className="group mt-6 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.08em] text-primary transition-colors hover:text-primary-dark"
              >
                Read insight
                <ArrowRight
                  className="size-4 shrink-0 transition-transform group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </Link>
            </Card>
          ))}
        </div>
      </Section>

      <CtaBand
        title="Diagnose operational quality before you buy automation."
        description="The Prior Authorization Operational Assessment maps administrative burden, denial drivers, exception patterns, and human dependency risk in one fixed-scope week — and shows leadership the next highest-leverage move."
        primaryLabel="Schedule a Prior Authorization Assessment"
        secondaryHref="/services/recovery-assessment"
        secondaryLabel="See the Operational Recovery Assessment"
      />
    </>
  );
}
