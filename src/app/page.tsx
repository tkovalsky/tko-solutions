import type { Metadata } from "next";
import { CredibilityStrip } from "@/components/site/credibility-strip";
import { CtaBand } from "@/components/site/cta-band";
import { JsonLd } from "@/components/site/json-ld";
import { LinkButton } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Section, SectionHeader } from "@/components/ui/section";
import { absoluteUrl, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Prior Authorization Performance Advisory",
  description: site.description,
  alternates: { canonical: "/" },
  openGraph: {
    title: "Fix the workflow before you fund more automation",
    description: site.description,
    url: absoluteUrl("/"),
    images: [{ url: site.socialImage, width: 1200, height: 630, alt: "TKO Solutions prior authorization performance advisory." }],
  },
};

const symptoms = [
  "Staff touch the same case repeatedly before it can move.",
  "Turnaround varies by payer, specialty, location, or employee.",
  "Denials are counted without separating avoidable operational causes.",
  "Experienced staff remain the only reliable escalation path.",
  "Automation is proposed before the workflow is stable enough to automate.",
];

const diagnosticOutputs = [
  "A measured baseline and agreed KPI definitions",
  "A current-state workflow and exception map",
  "A denial, rework, handoff, and delay driver analysis",
  "Clear decision-rights and escalation gaps",
  "A target workflow and prioritized improvement backlog",
  "A 90-day roadmap and executive decision brief",
];

const process = [
  {
    title: "Establish the baseline",
    description:
      "Confirm the workflow, sponsor, decision, available evidence, and measures that matter.",
  },
  {
    title: "Find the operating causes",
    description:
      "Compare the documented process with actual routing, exceptions, workarounds, and payer- or specialty-specific variation.",
  },
  {
    title: "Decide what changes next",
    description:
      "Size responsible opportunity ranges, redesign the priority workflow, assign ownership, and sequence a 90-day plan.",
  },
];

export default function HomePage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "TKO Solutions | Prior Authorization Performance",
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
          <div className="max-w-4xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary-light">
              Prior authorization performance
            </p>
            <h1 className="mt-5 max-w-3xl text-4xl font-bold leading-[1.04] tracking-tight sm:text-6xl lg:text-7xl">
              Fix the workflow before you fund more automation.
            </h1>
            <p className="mt-6 max-w-[65ch] text-lg leading-8 text-white/70 sm:text-xl sm:leading-9">
              TKO helps specialty medical groups and healthcare operators identify
              the operational causes of prior-authorization delays, denials, rework,
              and staff dependency—then turn the evidence into a practical 90-day
              improvement plan.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <LinkButton href="/contact" ctaLocation="homepage_hero">{site.cta}</LinkButton>
              <LinkButton
                href="/services/diagnostic"
                ctaLocation="homepage_hero"
                variant="secondary"
                className="border-white/35 text-white hover:border-white/60 hover:bg-white/10"
              >
                See Scope &amp; Pricing
              </LinkButton>
            </div>
          </div>
        </div>
      </section>

      <section aria-label="Diagnostic commercial terms" className="border-b border-border bg-surface">
        <div className="mx-auto grid w-full max-w-7xl gap-3 px-6 py-6 text-sm font-semibold sm:grid-cols-2 lg:grid-cols-4 lg:px-8">
          <p>15 business days</p>
          <p>$25,000 fixed fee</p>
          <p>One defined PA workflow</p>
          <p>Principal-led</p>
        </div>
      </section>

      <Section className="!py-14 md:!py-18">
        <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr]">
          <SectionHeader
            eyebrow="The operating cost"
            title="The queue is the symptom. The cost starts earlier."
            description="Prior authorization becomes expensive when incomplete intake, inconsistent documentation, payer-specific workarounds, unclear escalation, and manual follow-up compound across cases."
          />
          <ul className="grid gap-3">
            {symptoms.map((symptom) => (
              <li key={symptom} className="border border-border bg-white p-5 text-base leading-7 text-muted">
                {symptom}
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section className="bg-surface !py-14 md:!py-18">
        <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr]">
          <div>
            <SectionHeader
              eyebrow="Start here"
              title="Prior Authorization Performance Diagnostic"
              description="A fixed-fee, 15-business-day engagement for one defined prior-authorization workflow or specialty/payer segment. Leadership gets a common fact base and a decision on what to fix, fund, automate, stop, or defer."
            />
            <dl className="mt-7 grid grid-cols-2 gap-4 border-y border-border py-5 text-sm">
              <div>
                <dt className="text-muted">Duration</dt>
                <dd className="mt-1 font-semibold">15 business days</dd>
              </div>
              <div>
                <dt className="text-muted">Fee</dt>
                <dd className="mt-1 font-semibold">$25,000 fixed</dd>
              </div>
            </dl>
            <LinkButton href="/services/diagnostic" className="mt-7">
              See Scope &amp; Pricing
            </LinkButton>
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.12em] text-primary">
              You leave with
            </p>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2">
              {diagnosticOutputs.map((output) => (
                <li key={output} className="border border-border bg-white p-5 text-sm leading-6 text-foreground">
                  {output}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <Section className="!py-14 md:!py-18">
        <SectionHeader
          eyebrow="15-business-day process"
          title="From competing explanations to one fundable decision."
          description="The work starts with operating evidence. Automation or AI is considered only after the workflow, exceptions, decision rights, controls, and measures are understood."
        />
        <ol className="mt-10 grid gap-4 lg:grid-cols-3">
          {process.map((step, index) => (
            <Card key={step.title}>
              <p className="text-sm font-semibold uppercase tracking-[0.1em] text-primary">
                {String(index + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-4 text-xl font-semibold">{step.title}</h3>
              <p className="mt-3 text-base leading-7 text-muted">{step.description}</p>
            </Card>
          ))}
        </ol>
      </Section>

      <CredibilityStrip />

      <Section className="!py-14 md:!py-18">
        <SectionHeader
          eyebrow="Relevant healthcare experience"
          title="Healthcare operating context, with the claim boundary stated."
          description="Todd’s experience includes prior authorization and utilization-management workflows, payer/provider operations, CMS interoperability, delivery governance, and enterprise healthcare transformation. Employment history is not employer or client endorsement."
        />
        <div className="mt-10 grid gap-4 lg:grid-cols-2">
          <Card>
            <p className="text-sm font-semibold uppercase tracking-[0.1em] text-muted">
              Prior authorization
            </p>
            <h3 className="mt-4 text-2xl font-semibold">Prior Authorization Workflow Modernization</h3>
            <p className="mt-4 text-base leading-7 text-muted">
              Experience redesigning review tiers, escalation, auditability, and
              human approval so leadership could distinguish where machine
              assistance could help from where human judgment had to remain.
            </p>
            <p className="mt-4 text-sm leading-6 text-muted">
              No client name, quantified outcome, or employer endorsement is claimed.
            </p>
            <LinkButton href="/selected-work/prior-authorization-modernization" variant="secondary" className="mt-6">
              Review the Experience
            </LinkButton>
          </Card>
          <Card>
            <p className="text-sm font-semibold uppercase tracking-[0.1em] text-muted">
              Healthcare interoperability
            </p>
            <h3 className="mt-4 text-2xl font-semibold">Governance Embedded in Workflow</h3>
            <p className="mt-4 text-base leading-7 text-muted">
              Payer-facing CMS interoperability work connected technical exchange
              to onboarding, access control, auditability, and operating governance.
            </p>
            <p className="mt-4 text-sm leading-6 text-muted">
              This establishes relevant operating experience, not a claimed TKO client result.
            </p>
            <LinkButton href="/selected-work/healthcare-interoperability-platform" variant="secondary" className="mt-6">
              Review the Experience
            </LinkButton>
          </Card>
        </div>
      </Section>

      <Section className="bg-surface !py-14 md:!py-18">
        <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-start">
          <SectionHeader
            eyebrow="Diagnostic follow-on"
            title="90-Day Prior Authorization Improvement Sprint"
            description="If the Diagnostic establishes a credible baseline, accountable owner, and measurable opportunity, TKO can stay through one bounded implementation and controlled pilot."
          />
          <Card>
            <dl className="grid grid-cols-2 gap-4 border-b border-border pb-5 text-sm">
              <div>
                <dt className="text-muted">Duration</dt>
                <dd className="mt-1 font-semibold">12 weeks</dd>
              </div>
              <div>
                <dt className="text-muted">Typical fee</dt>
                <dd className="mt-1 font-semibold">$65,000–$95,000</dd>
              </div>
            </dl>
            <p className="mt-5 text-base leading-7 text-muted">
              Redesign one priority workflow, make ownership and escalation explicit,
              establish measures, pilot the change, and hand it to the team. Automation
              or AI is used only where the evidence and control model support it.
            </p>
            <LinkButton href="/services/operating-system-build" className="mt-6">
              Discuss the 90-Day Sprint
            </LinkButton>
          </Card>
        </div>
      </Section>

      <Section className="!py-14 md:!py-18">
        <div className="grid gap-4 lg:grid-cols-2">
          <Card>
            <p className="text-sm font-semibold uppercase tracking-[0.1em] text-primary">A good fit</p>
            <ul className="mt-5 space-y-3 text-base leading-7 text-muted">
              <li>Prior-authorization performance is an active operating or revenue priority.</li>
              <li>One executive owns the decision.</li>
              <li>Basic volume, denial, turnaround, payer, specialty, and staffing evidence is available or can be assembled.</li>
              <li>Leadership is prepared to act on the result.</li>
            </ul>
          </Card>
          <Card>
            <p className="text-sm font-semibold uppercase tracking-[0.1em] text-muted">Not a fit</p>
            <ul className="mt-5 space-y-3 text-base leading-7 text-muted">
              <li>General interest in AI without a defined workflow.</li>
              <li>A request for outsourced PA staffing or a software platform.</li>
              <li>A search for guaranteed savings or denial reduction before a baseline exists.</li>
              <li>An enterprise-wide transformation scope without a bounded starting point.</li>
            </ul>
          </Card>
        </div>
      </Section>

      <CtaBand
        title="Bring the prior-authorization workflow leadership needs to improve."
        description="Share what changed, where performance is under pressure, and what decision is approaching. Todd will reply within one business day and, if there is a plausible fit, schedule a 30-minute working conversation."
        primaryLabel={site.cta}
        secondaryHref="/services/diagnostic"
        secondaryLabel="See Scope & Pricing"
      />
    </>
  );
}
