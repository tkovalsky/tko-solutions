import type { Metadata } from "next";
import { CtaBand } from "@/components/site/cta-band";
import { Faq } from "@/components/site/faq";
import { JsonLd } from "@/components/site/json-ld";
import { PageHero } from "@/components/site/page-hero";
import { Card } from "@/components/ui/card";
import { Section, SectionHeader } from "@/components/ui/section";
import { absoluteUrl, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Prior Authorization Performance Diagnostic",
  description:
    "A $25,000 fixed-fee, 15-business-day Diagnostic that gives healthcare leadership a measured prior-authorization baseline, root-cause view, target workflow, and 90-day improvement plan.",
  alternates: { canonical: "/services/diagnostic" },
  openGraph: {
    title: "Prior Authorization Performance Diagnostic",
    description:
      "Find the operational causes of prior-authorization delay, rework, denials, and staff dependency.",
    url: absoluteUrl("/services/diagnostic"),
    images: [{ url: site.socialImage, width: 1200, height: 630, alt: "TKO Solutions prior authorization performance advisory." }],
  },
};

const triggers = [
  "Denials, turnaround time, backlog, or staff effort are moving in the wrong direction.",
  "Different locations, specialties, payers, or team members produce inconsistent results.",
  "Critical payer or escalation knowledge lives with a few experienced people.",
  "Leadership is considering automation, a vendor change, centralization, or more headcount without a trusted baseline.",
  "Teams disagree about whether the problem is documentation, workflow, capacity, policy, technology, or ownership.",
];

const questions = [
  "Where does a case first become incomplete, delayed, or likely to require rework?",
  "Which denial and exception patterns are operationally addressable?",
  "How much staff effort is consumed by touches, follow-up, escalation, and reconstruction?",
  "Which payer, specialty, location, or evidence patterns explain meaningful variation?",
  "Where are decision rights or escalation rules unclear?",
  "Which knowledge dependencies create continuity risk?",
  "What should be standardized, automated, measured, stopped, or left under human judgment?",
];

const plan = [
  {
    period: "Days 1–3",
    title: "Frame and baseline",
    description:
      "Confirm the decision, scope, evidence boundary, stakeholder set, KPI definitions, and available baseline.",
  },
  {
    period: "Days 4–8",
    title: "Trace the work",
    description:
      "Interview stakeholders and map intake, documentation, routing, payer variation, exceptions, escalation, follow-up, and rework.",
  },
  {
    period: "Days 9–11",
    title: "Diagnose and size",
    description:
      "Separate symptoms from addressable causes, establish responsible opportunity ranges, and test where technology or controlled automation may help.",
  },
  {
    period: "Days 12–14",
    title: "Design and sequence",
    description:
      "Create the target workflow, clarify decision rights, define measures, and prioritize the 90-day backlog.",
  },
  {
    period: "Day 15",
    title: "Executive readout",
    description:
      "Present the evidence, tradeoffs, recommendation, and decision required. Final artifacts incorporate agreed factual corrections.",
  },
];

const deliverables = [
  "Executive decision brief",
  "Baseline scorecard and KPI definitions",
  "Current-state workflow and exception map",
  "Denial, rework, handoff, and delay driver analysis",
  "Decision-rights and escalation map",
  "Key-person dependency register",
  "Target workflow and operating requirements",
  "Prioritized improvement backlog",
  "90-day roadmap with owners, measures, and decision gates",
];

const faqs = [
  {
    q: "Do we need clean data or production-system access?",
    a: "No. Existing reports, appropriately de-identified examples, workflow documents, and stakeholder interviews are enough to begin. No production-system access or PHI ingestion is required for the standard scope.",
  },
  {
    q: "Is this an AI or software assessment?",
    a: "No. The Diagnostic starts with the prior-authorization workflow and measurable operating problem. Automation or AI is considered only after workflow stability, evidence, exceptions, decision rights, controls, and expected value are understood.",
  },
  {
    q: "Does the Diagnostic guarantee denial reduction or savings?",
    a: "No. It does not guarantee denial, cost, staffing, reimbursement, or revenue results. It creates the baseline and implementation case required to set a responsible target.",
  },
  {
    q: "Do we have to retain TKO for implementation?",
    a: "No. TKO may recommend internal execution, an existing vendor, a specialist partner, no further implementation, or the 90-Day Sprint. The Diagnostic creates no implementation obligation.",
  },
  {
    q: "What happens if the scope is broader than one workflow?",
    a: "The proposal will narrow the work to one organization and one defined PA workflow or specialty/payer segment. Additional workflow families, interviews, data remediation, or specialist needs require a revised scope.",
  },
];

export default function DiagnosticPage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: "Prior Authorization Performance Diagnostic",
          description: metadata.description,
          url: absoluteUrl("/services/diagnostic"),
          provider: { "@type": "Organization", name: site.name, url: site.url },
          serviceType: "Prior authorization operations diagnostic",
          areaServed: "United States",
          providerMobility: "remote",
          audience: {
            "@type": "BusinessAudience",
            audienceType: "Specialty medical groups, MSOs, and provider-side healthcare operators",
          },
          offers: {
            "@type": "Offer",
            price: "25000",
            priceCurrency: "USD",
            url: absoluteUrl("/services/diagnostic"),
            description: "Fixed fee for a 15-business-day, principal-led Diagnostic.",
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
        eyebrow="Flagship engagement"
        title="Find the operational causes of prior-authorization delay, rework, denials, and staff dependency."
        description="A fixed-fee, principal-led Diagnostic that gives leadership a measured baseline, root-cause view, and 90-day improvement plan."
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
            <p className="mt-4 text-2xl font-semibold">$25,000 fixed</p>
          </Card>
          <Card>
            <p className="text-sm font-semibold uppercase tracking-[0.1em] text-muted">Scope</p>
            <p className="mt-4 text-xl font-semibold">One PA workflow or segment</p>
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
            eyebrow="Buyer fit"
            title="Buy this when leadership needs a defensible next decision."
            description="The standard scope covers one organization, one defined prior-authorization workflow or specialty/payer segment, up to 10 stakeholder interviews, and one executive sponsor."
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
          title="A measured view of where work breaks and what leadership can change."
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
            description="No production-system access is required for the standard scope. Do not submit PHI through the website."
          />
          <div className="space-y-5 text-base leading-7 text-muted">
            <p>
              One executive sponsor; one bounded workflow; a working client contact;
              access to 6–10 stakeholders; and existing volume, approval/denial,
              reason, turnaround, payer, specialty, and staffing evidence where available.
            </p>
            <p>
              TKO also reviews current workflow documents, standard work, queue reports,
              and selected appropriately de-identified examples. The proposal records
              evidence availability and any material limitations before work begins.
            </p>
          </div>
        </div>
      </Section>

      <Section className="bg-surface !py-14 md:!py-20">
        <SectionHeader
          eyebrow="15-business-day plan"
          title="A bounded path from evidence to executive decision."
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
          title="The concrete decision package."
          description="The work succeeds when leadership accepts one fact base, agrees on the top priorities, assigns accountable owners, and can decide what to fund within 10 business days of the readout."
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
            <h2 className="mt-4 text-3xl font-semibold">$25,000 fixed fee</h2>
            <p className="mt-4 text-base leading-7 text-muted">
              50% at scheduling and 50% at executive readout. Travel, unusual data
              remediation, clinical or coding specialists, expanded interviews, and
              additional workflow families require a revised scope.
            </p>
            <p className="mt-4 text-base leading-7 text-muted">
              The Diagnostic does not obligate the client to buy implementation. TKO
              may recommend internal execution, an existing vendor, a specialist partner,
              no further implementation, or the 90-Day Sprint.
            </p>
          </Card>
          <Card>
            <p className="text-sm font-semibold uppercase tracking-[0.1em] text-primary">Exclusions and claim boundary</p>
            <p className="mt-4 text-base leading-7 text-muted">
              The standard scope excludes PHI ingestion by default, clinical criteria
              or medical-necessity decisions, legal or regulatory advice, payer contracting,
              claims adjudication, production integrations, vendor procurement, custom
              software, and implementation.
            </p>
            <p className="mt-4 text-base font-semibold leading-7 text-foreground">
              The Diagnostic does not guarantee denial, cost, staffing, reimbursement,
              or revenue results. It creates the baseline and implementation case required
              to set a responsible target.
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
        description="The first call is a 30-minute working conversation with Todd about the trigger, workflow boundary, evidence, sponsor, timing, and decision leadership needs to make."
        primaryLabel={site.cta}
        secondaryHref="#scope-and-pricing"
        secondaryLabel="See Scope & Pricing"
      />
    </>
  );
}
