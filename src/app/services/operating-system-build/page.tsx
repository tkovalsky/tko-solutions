import type { Metadata } from "next";
import { CtaBand } from "@/components/site/cta-band";
import { JsonLd } from "@/components/site/json-ld";
import { PageHero } from "@/components/site/page-hero";
import { Card } from "@/components/ui/card";
import { Section, SectionHeader } from "@/components/ui/section";
import { absoluteUrl, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "90-Day Prior Authorization Improvement Sprint",
  description:
    "A bounded 12-week, $65,000–$95,000 implementation that turns an accepted prior-authorization Diagnostic into one working workflow improvement, controlled pilot, and team handoff.",
  alternates: { canonical: "/services/operating-system-build" },
  openGraph: {
    title: "90-Day Prior Authorization Improvement Sprint",
    description:
      "Turn the Diagnostic into a working prior-authorization improvement in 90 days.",
    url: absoluteUrl("/services/operating-system-build"),
    images: [{ url: site.socialImage, width: 1200, height: 630, alt: "TKO Solutions prior authorization performance advisory." }],
  },
};

const prerequisites = [
  "A measurable problem and accepted Diagnostic baseline",
  "One prioritized prior-authorization workflow or segment",
  "An accountable executive sponsor and client owner",
  "A defined improvement hypothesis and target measures",
  "Practical access to workflow, technology, compliance, and frontline stakeholders",
];

const targetChanges = [
  "Intake and evidence standards are explicit.",
  "Roles, handoffs, decision rights, and escalation paths are operating.",
  "Critical payer- and specialty-specific knowledge is maintainable by the team.",
  "Priority and exception handling are clear to the people doing the work.",
  "A small set of measures is reviewed at an agreed operating cadence.",
  "One bounded segment has piloted the change and produced adoption and performance evidence.",
  "Any automation or AI has a defined source, control, human-review point, and failure path.",
];

const workstreams = [
  {
    title: "Workflow and standard work",
    description:
      "Finalize the target case path, reduce unnecessary touches, and define what must be complete before work advances.",
  },
  {
    title: "Ownership and exception handling",
    description:
      "Assign decisions, escalation thresholds, service expectations, and closure responsibility.",
  },
  {
    title: "Shared operating knowledge",
    description:
      "Document critical payer, specialty, evidence, and escalation knowledge in a form the team can maintain.",
  },
  {
    title: "Measures and cadence",
    description:
      "Implement the scorecard, review rhythm, issue log, and decision process the client owner will sustain.",
  },
  {
    title: "Controlled technology enablement",
    description:
      "Configure existing tools, write requirements, or pilot bounded automation where appropriate. TKO does not sell a platform or force an AI use case into the scope.",
  },
];

const plan = [
  ["Weeks 1–2", "Confirm target design, owners, measures, dependencies, and pilot segment."],
  ["Weeks 3–5", "Build standard work, rules, roles, exception paths, and agreed tool requirements or configuration."],
  ["Weeks 6–8", "Train the pilot team, launch the bounded change, and observe adoption and failure modes."],
  ["Weeks 9–10", "Correct workflow and control gaps; compare early evidence with the accepted baseline."],
  ["Weeks 11–12", "Finalize handoff, sustainment cadence, remaining backlog, and the executive decision on scale."],
];

const measures = [
  "Touches per case",
  "Staff minutes per case",
  "Clean-submission rate",
  "First-pass approval",
  "Avoidable denial rate",
  "Median turnaround time",
  "Aged exceptions",
  "Escalation cycle time",
  "Workflow adherence",
  "Training completion and adoption",
];

export default function ImprovementSprintPage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: "90-Day Prior Authorization Improvement Sprint",
          description: metadata.description,
          url: absoluteUrl("/services/operating-system-build"),
          provider: { "@type": "Organization", name: site.name, url: site.url },
          serviceType: "Prior authorization workflow implementation",
          areaServed: "United States",
          providerMobility: "remote",
          offers: {
            "@type": "AggregateOffer",
            lowPrice: "65000",
            highPrice: "95000",
            priceCurrency: "USD",
            offerCount: "1",
            url: absoluteUrl("/services/operating-system-build"),
          },
        }}
      />

      <PageHero
        eyebrow="Diagnostic follow-on"
        title="Turn the Diagnostic into a working prior-authorization improvement in 90 days."
        description="12 weeks · $65,000–$95,000 · One prioritized workflow · Available after the Diagnostic"
        primaryHref="/contact"
        primaryLabel="Discuss the 90-Day Sprint"
        secondaryHref="/services/diagnostic"
        secondaryLabel="See the Diagnostic"
      />

      <Section className="bg-surface !py-14 md:!py-20">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeader
            eyebrow="Entry criteria"
            title="Implementation begins only after the case is credible."
            description="The Sprint is available after the TKO Diagnostic, or an equivalent evidence base accepted by TKO, establishes the workflow, owner, baseline, and measurable opportunity."
          />
          <ul className="grid gap-3">
            {prerequisites.map((item) => (
              <li key={item} className="border border-border bg-white p-5 text-base leading-7 text-muted">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section className="!py-14 md:!py-20">
        <SectionHeader
          eyebrow="Target change"
          title="What should be operating by day 90."
          description="The Sprint implements one bounded workflow improvement. It does not attempt an enterprise-wide transformation."
        />
        <div className="mt-10 grid gap-3 md:grid-cols-2">
          {targetChanges.map((change) => (
            <div key={change} className="border border-border p-5 text-base leading-7 text-muted">
              {change}
            </div>
          ))}
        </div>
      </Section>

      <Section className="bg-surface !py-14 md:!py-20">
        <SectionHeader
          eyebrow="Workstreams"
          title="One operating change, implemented across the parts that must hold together."
        />
        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {workstreams.map((workstream) => (
            <Card key={workstream.title}>
              <h2 className="text-xl font-semibold">{workstream.title}</h2>
              <p className="mt-3 text-base leading-7 text-muted">{workstream.description}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section className="!py-14 md:!py-20">
        <SectionHeader eyebrow="12-week plan" title="A controlled pilot before a decision to scale." />
        <ol className="mt-10 grid gap-3">
          {plan.map(([period, description]) => (
            <li key={period} className="grid gap-4 border border-border p-5 sm:grid-cols-[8rem_1fr]">
              <p className="text-sm font-semibold uppercase tracking-[0.1em] text-primary">{period}</p>
              <p className="text-base leading-7 text-muted">{description}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section className="bg-surface !py-14 md:!py-20">
        <div className="grid gap-5 lg:grid-cols-2">
          <Card>
            <p className="text-sm font-semibold uppercase tracking-[0.1em] text-primary">TKO responsibilities</p>
            <ul className="mt-5 space-y-3 text-base leading-7 text-muted">
              <li>Lead target-workflow, standard-work, role, and exception design.</li>
              <li>Establish the agreed measurement and pilot cadence.</li>
              <li>Configure existing tools or produce implementation-ready requirements only as scoped.</li>
              <li>Design controlled automation only when approved by the evidence and client controls.</li>
              <li>Train the pilot team and deliver handoff and sustainment materials.</li>
            </ul>
          </Card>
          <Card>
            <p className="text-sm font-semibold uppercase tracking-[0.1em] text-primary">Client responsibilities</p>
            <ul className="mt-5 space-y-3 text-base leading-7 text-muted">
              <li>Name an executive sponsor and accountable workflow owner.</li>
              <li>Provide timely access to frontline staff, data, and system owners.</li>
              <li>Complete required compliance, privacy, security, and clinical review.</li>
              <li>Provide baseline and pilot data for the agreed measures.</li>
              <li>Make pilot decisions within two business days or agree to re-sequencing.</li>
            </ul>
          </Card>
        </div>
      </Section>

      <Section className="!py-14 md:!py-20">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeader
            eyebrow="Pilot measures"
            title="Select two to four measures from the Diagnostic baseline."
            description="The final target and measurement period are set from the accepted baseline. TKO does not promise a result before that evidence exists."
          />
          <div className="grid gap-3 sm:grid-cols-2">
            {measures.map((measure) => (
              <div key={measure} className="border border-border p-4 text-sm font-semibold">
                {measure}
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section className="bg-surface !py-14 md:!py-20">
        <div className="grid gap-5 lg:grid-cols-2">
          <Card>
            <p className="text-sm font-semibold uppercase tracking-[0.1em] text-primary">Commercial range</p>
            <h2 className="mt-4 text-3xl font-semibold">$65,000–$95,000</h2>
            <p className="mt-4 text-base leading-7 text-muted">
              The Diagnostic determines the final fixed fee. Technology licenses,
              vendor services, travel, clinical or coding specialists, production
              integrations, and scope expansion are separate.
            </p>
          </Card>
          <Card>
            <p className="text-sm font-semibold uppercase tracking-[0.1em] text-primary">Exclusions and claim boundary</p>
            <p className="mt-4 text-base leading-7 text-muted">
              The Sprint excludes EHR replacement, a full custom software platform,
              managed PA services, staffing, payer contracting, clinical-decision
              services, and broad enterprise transformation.
            </p>
            <p className="mt-4 text-base font-semibold leading-7 text-foreground">
              TKO does not guarantee savings, denial reduction, reimbursement,
              staffing reduction, clinical outcomes, or compliance results.
            </p>
          </Card>
        </div>
      </Section>

      <CtaBand
        title="Implementation starts with an accepted baseline."
        description="If the Diagnostic is complete, discuss the prioritized workflow, accountable owner, target measures, and practical 90-day boundary."
        primaryLabel="Discuss the 90-Day Sprint"
        secondaryHref="/services/diagnostic"
        secondaryLabel="See the Diagnostic"
      />
    </>
  );
}
