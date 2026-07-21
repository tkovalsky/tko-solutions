import type { Metadata } from "next";
import { CtaBand } from "@/components/site/cta-band";
import { Faq } from "@/components/site/faq";
import { JsonLd } from "@/components/site/json-ld";
import { PageHero } from "@/components/site/page-hero";
import { Card } from "@/components/ui/card";
import { Section, SectionHeader } from "@/components/ui/section";
import { absoluteUrl, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Transformation Recovery Diagnostic",
  description:
    "A 15-business-day, $25,000–$40,000 fixed-fee diagnostic that gives executive sponsors a trusted delivery baseline, recovery choices, and a measurable 90-day plan.",
  alternates: { canonical: "/services/diagnostic" },
  openGraph: {
    title: "Transformation Recovery Diagnostic",
    description:
      "Establish delivery reality and make a defensible decision about what to continue, reset, narrow, renegotiate, or stop.",
    url: absoluteUrl("/services/diagnostic"),
    images: [
      {
        url: site.socialImage,
        width: 1200,
        height: 630,
        alt: "TKO Solutions Transformation Recovery Diagnostic.",
      },
    ],
  },
};

const triggers = [
  "Status reports no longer reconcile with milestone confidence or operating readiness.",
  "Workstreams, vendors, or executives disagree about the cause of delay or the credible recovery path.",
  "Dependencies and decisions age without a single accountable owner or escalation path.",
  "Leadership is considering another replan, vendor change, funding request, scope reduction, or leadership change without a trusted baseline.",
  "Delivery activity remains disconnected from adoption, benefits, or the operational change the program was funded to produce.",
];

const questions = [
  "What is actually true about scope, milestones, dependencies, decisions, vendors, adoption, and value?",
  "Where is delivery risk accumulating, and which issues are symptoms rather than causes?",
  "Which decisions, owners, and escalation paths are missing or ineffective?",
  "What must be re-baselined, narrowed, funded, stopped, renegotiated, or escalated?",
  "What should leadership expect to be operating within the next 90 days?",
  "Can the current team and vendor model execute the recovery, or does accountability need to change?",
];

const plan = [
  {
    period: "Days 1–3",
    title: "Frame the executive decision",
    description:
      "Confirm the sponsor, program boundary, evidence set, stakeholder map, known constraints, and the decision the diagnostic must protect.",
  },
  {
    period: "Days 4–8",
    title: "Establish delivery reality",
    description:
      "Interview stakeholders and reconcile plans, status, RAID, governance, vendors, dependencies, decisions, adoption, and value evidence.",
  },
  {
    period: "Days 9–11",
    title: "Diagnose the control failures",
    description:
      "Separate symptoms from root causes and assess delivery confidence, ownership, decision latency, sequencing, vendor performance, and operational readiness.",
  },
  {
    period: "Days 12–14",
    title: "Build recovery choices",
    description:
      "Define re-baselining requirements, recovery scenarios, accountable ownership, decision gates, and the measurable 90-day sequence.",
  },
  {
    period: "Day 15",
    title: "Executive readout",
    description:
      "Present the fact base, material exposures, choices, recommendation, and immediate decisions. Final artifacts incorporate agreed factual corrections.",
  },
];

const deliverables = [
  "Executive exposure and decision brief",
  "Accepted delivery baseline",
  "Dependency and decision map",
  "Delivery-confidence assessment",
  "Root-cause analysis",
  "Ownership and governance reset",
  "Vendor and sequencing actions",
  "Recovery choices and tradeoffs",
  "Re-baselining requirements",
  "Measurable 90-day recovery plan",
];

const faqs = [
  {
    q: "Is the Diagnostic an audit or a PMO maturity assessment?",
    a: "No. It is a decision-focused intervention for one major program or bounded portfolio. The work establishes delivery reality, identifies the control failures that matter, and defines a practical recovery path.",
  },
  {
    q: "Do we need clean data or a perfect integrated plan?",
    a: "No. Existing plans, status reports, RAID logs, decision records, vendor materials, operating evidence, and stakeholder interviews are enough to begin. Evidence gaps are made explicit rather than hidden.",
  },
  {
    q: "Is this an AI or software assessment?",
    a: "No. Technology and AI may be part of the program, but the Diagnostic focuses on the business decision, delivery system, ownership, controls, operational readiness, and measurable value.",
  },
  {
    q: "Does the Diagnostic guarantee schedule, cost, or benefit recovery?",
    a: "No. It provides the accepted baseline, recovery choices, accountable plan, and decision gates required to set responsible targets. TKO does not promise results before that evidence exists.",
  },
  {
    q: "Do we have to retain TKO for mobilization?",
    a: "No. TKO may recommend internal execution, the existing vendor, a specialist partner, a leadership change, a narrowed scope, no further investment, or 90-Day Recovery Mobilization. The Diagnostic creates no implementation obligation.",
  },
];

export default function DiagnosticPage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: "Transformation Recovery Diagnostic",
          description: metadata.description,
          url: absoluteUrl("/services/diagnostic"),
          provider: { "@type": "Organization", name: site.name, url: site.url },
          serviceType: "Transformation recovery diagnostic",
          areaServed: "United States",
          providerMobility: "remote",
          audience: {
            "@type": "BusinessAudience",
            audienceType:
              "Executive sponsors, COOs, CIOs, transformation leaders, and operating partners",
          },
          offers: {
            "@type": "AggregateOffer",
            lowPrice: "25000",
            highPrice: "40000",
            priceCurrency: "USD",
            offerCount: "1",
            url: absoluteUrl("/services/diagnostic"),
          },
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((faq) => ({
            "@type": "Question",
            name: faq.q,
            acceptedAnswer: { "@type": "Answer", text: faq.a },
          })),
        }}
      />

      <PageHero
        eyebrow="Core advisory offer"
        title="Establish what is true before leadership commits to another plan."
        description="A 15-business-day, principal-led diagnostic for one major program or bounded portfolio. Executive sponsors leave with a trusted baseline, recovery choices, and a measurable 90-day plan."
        primaryHref="/contact"
        primaryLabel={site.cta}
        secondaryHref="#scope-and-pricing"
        secondaryLabel="See Scope & Pricing"
      />

      <Section id="scope-and-pricing" className="bg-surface !py-10 md:!py-12">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <p className="text-sm font-semibold uppercase tracking-[0.1em] text-muted">Duration</p>
            <p className="mt-4 text-2xl font-semibold">15 business days</p>
          </Card>
          <Card>
            <p className="text-sm font-semibold uppercase tracking-[0.1em] text-muted">Fee</p>
            <p className="mt-4 text-2xl font-semibold">$25,000–$40,000</p>
          </Card>
          <Card>
            <p className="text-sm font-semibold uppercase tracking-[0.1em] text-muted">Scope</p>
            <p className="mt-4 text-xl font-semibold">One major program or bounded portfolio</p>
          </Card>
          <Card>
            <p className="text-sm font-semibold uppercase tracking-[0.1em] text-muted">Delivery</p>
            <p className="mt-4 text-xl font-semibold">Principal-led, remote by default</p>
          </Card>
        </div>
      </Section>

      <Section className="!py-14 md:!py-20">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeader
            eyebrow="Buyer triggers"
            title="Buy this when the next executive decision needs an independent fact base."
            description="The standard scope includes one executive sponsor, one major program or bounded portfolio, 8–12 stakeholder interviews, and focused evidence review."
          />
          <ul className="grid gap-3">
            {triggers.map((trigger) => (
              <li key={trigger} className="border border-border p-5 text-base leading-7 text-muted">
                {trigger}
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section className="bg-surface !py-14 md:!py-20">
        <SectionHeader
          eyebrow="Questions answered"
          title="One trusted view of delivery reality and the choices leadership can make."
        />
        <div className="mt-10 grid gap-3 md:grid-cols-2">
          {questions.map((question) => (
            <div key={question} className="border border-border bg-white p-5 text-base leading-7 text-muted">
              {question}
            </div>
          ))}
        </div>
      </Section>

      <Section className="!py-14 md:!py-20">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeader
            eyebrow="Client inputs"
            title="What TKO needs from the client."
            description="One executive sponsor, timely access to 8–12 stakeholders, and the best available program evidence. Do not submit confidential or sensitive program material through the website."
          />
          <div className="space-y-5 text-base leading-7 text-muted">
            <p>
              TKO reviews current plans, status reporting, RAID and decision logs,
              governance materials, vendor commitments, budget and benefits evidence,
              adoption or operational-readiness materials, and selected working artifacts.
            </p>
            <p>
              The proposal records the evidence boundary, access assumptions, known
              limitations, and any privacy, security, regulatory, or specialist needs
              before the engagement begins.
            </p>
          </div>
        </div>
      </Section>

      <Section className="bg-surface !py-14 md:!py-20">
        <SectionHeader
          eyebrow="15-business-day plan"
          title="A bounded path from competing explanations to an executive decision."
        />
        <ol className="mt-10 grid gap-3">
          {plan.map((step) => (
            <li key={step.period} className="grid gap-4 border border-border bg-white p-5 sm:grid-cols-[8rem_1fr]">
              <p className="text-sm font-semibold uppercase tracking-[0.1em] text-primary">{step.period}</p>
              <div>
                <h3 className="text-lg font-semibold">{step.title}</h3>
                <p className="mt-2 text-base leading-7 text-muted">{step.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </Section>

      <Section className="!py-14 md:!py-20">
        <SectionHeader
          eyebrow="Deliverables"
          title="The concrete recovery decision package."
          description="The work succeeds when leadership accepts one fact base, understands the material exposures and choices, assigns accountable owners, and can act on the 90-day recovery sequence."
        />
        <div className="mt-10 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {deliverables.map((deliverable) => (
            <div key={deliverable} className="border border-border p-5 font-semibold">
              {deliverable}
            </div>
          ))}
        </div>
      </Section>

      <Section className="bg-surface !py-14 md:!py-20">
        <div className="grid gap-5 lg:grid-cols-2">
          <Card>
            <p className="text-sm font-semibold uppercase tracking-[0.1em] text-primary">Commercial terms</p>
            <h2 className="mt-4 text-3xl font-semibold">$25,000–$40,000 fixed fee</h2>
            <p className="mt-4 text-base leading-7 text-muted">
              The final scope and fee reflect program complexity, stakeholder count,
              evidence condition, and the decision boundary. Travel, specialist support,
              unusual data remediation, expanded interviews, and additional programs are separate.
            </p>
          </Card>
          <Card>
            <p className="text-sm font-semibold uppercase tracking-[0.1em] text-primary">Exclusions and claim boundary</p>
            <p className="mt-4 text-base leading-7 text-muted">
              The standard scope excludes implementation, production-system access,
              legal or regulatory advice, forensic accounting, formal assurance,
              vendor procurement, custom software, and open-ended portfolio transformation.
            </p>
            <p className="mt-4 text-base font-semibold leading-7 text-foreground">
              The Diagnostic does not guarantee schedule, cost, benefit, adoption, or
              compliance results. It creates the fact base and recovery plan required
              to set responsible targets.
            </p>
          </Card>
        </div>
      </Section>

      <Section className="!py-14 md:!py-20">
        <SectionHeader eyebrow="FAQ" title="Questions to resolve before engaging." />
        <div className="mt-10">
          <Faq items={faqs} />
        </div>
      </Section>

      <CtaBand
        title="Decide whether this is the right 15-day scope."
        description="The first call is a confidential 30-minute working conversation with Todd about the trigger, program boundary, evidence, sponsor, timing, and decision leadership needs to make."
        secondaryHref="#scope-and-pricing"
        secondaryLabel="See Scope & Pricing"
      />
    </>
  );
}
