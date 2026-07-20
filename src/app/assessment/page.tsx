import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CtaBand } from "@/components/site/cta-band";
import { JsonLd } from "@/components/site/json-ld";
import { PageHero } from "@/components/site/page-hero";
import { Card } from "@/components/ui/card";
import { Section, SectionHeader } from "@/components/ui/section";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Operational Recovery Assessment",
  description:
    "A fixed-scope, one-week assessment for leaders who need to identify hidden work, workflow bottlenecks, decision latency, and the next highest-leverage move.",
  alternates: { canonical: "/assessment" },
  openGraph: {
    title: "Operational Recovery Assessment",
    description:
      "Identify the workflow constraint before committing to a larger transformation, technology, or AI initiative.",
    url: absoluteUrl("/assessment"),
  },
};

const engageSignals = [
  "A workflow is under pressure, but leadership cannot agree on where the real constraint is.",
  "Work depends on a few people to reconstruct context, route exceptions, or decide what matters next.",
  "A transformation program has activity and reporting but lacks a trusted view of dependencies, risk, or required decisions.",
  "AI or automation is being considered, but the workflow, authority model, and human approval points are not explicit.",
];

const audiences = [
  "CEO or business owner with growth, execution, or revenue-protection pressure.",
  "COO, VP Operations, or transformation leader responsible for throughput and accountability.",
  "CIO or product executive who needs technology investment tied to an operating problem.",
  "Healthcare operations leader working through administrative burden, workflow modernization, or complex exception handling.",
];

const outputs = [
  "Current-state workflow map: what is supposed to happen, what actually happens, and where work stalls.",
  "Bottleneck and decision-latency analysis across handoffs, ownership, exceptions, and escalation.",
  "Knowledge-concentration and human API dependency findings where critical operating context lives in people.",
  "Operational risk and visibility gap assessment, including where reports hide rather than surface the problem.",
  "AI readiness and control model: where assistance may help and where workflow design must come first.",
  "Executive briefing with the next highest-leverage move and a recommendation to stop, deepen, or build.",
];

const expectedInputs = [
  "Existing workflow documentation, process notes, reports, dashboards, and backlog or status artifacts.",
  "Examples of stalled work, rework, missed handoffs, exceptions, or decisions that took too long.",
  "Interviews with the people closest to the workflow and the sponsor who needs to make the next decision.",
  "Available operating signals, not a new platform, integration, or perfectly clean dataset.",
];

const engagementScope = [
  ["Fixed scope", "One workflow or operating problem under real pressure."],
  ["One week", "Focused review, interviews, analysis, and an executive briefing."],
  ["Fixed scope", "A bounded first step before a deeper diagnostic or build is considered."],
];

export default function AssessmentPage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: "Operational Recovery Assessment",
          provider: { "@type": "Organization", name: "TKO Solutions" },
          serviceType: "Operational Recovery Assessment",
          areaServed: "United States",
          url: absoluteUrl("/assessment"),
        }}
      />
      <PageHero
        eyebrow="Executive operating review"
        title="Find the constraint before you fund the solution."
        description="The Operational Recovery Assessment is a focused engagement for leaders who need to identify the bottleneck, decision gap, or key-person dependency reducing performance, and decide what is worth fixing first."
        primaryHref="/contact"
        primaryLabel="Find Your Highest-Leverage Workflow"
        secondaryHref="/proof/rachelos"
        secondaryLabel="Review built-system proof"
      />

      <Section className="border-b border-border !py-10 md:!py-12">
        <div className="grid gap-3 md:grid-cols-3">
          {engagementScope.map(([title, description]) => (
            <div key={title} className="border border-border bg-white p-5">
              <p className="text-sm font-semibold uppercase tracking-[0.1em] text-primary">{title}</p>
              <p className="mt-3 text-base leading-7 text-muted">{description}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section className="bg-surface">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeader
            eyebrow="When To Engage"
            title="Start when a business problem is concrete."
            description="This is for leadership teams that need to understand what is reducing throughput, consuming capacity, delaying decisions, or exposing revenue before choosing what to fix, fund, automate, or redesign."
          />
          <div className="grid gap-3">
            {engageSignals.map((signal) => (
              <div key={signal} className="border border-border bg-white p-5 text-base leading-7 text-muted">
                {signal}
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section>
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeader
            eyebrow="Who Should Engage"
            title="The sponsor owns a business decision, not just a technology initiative."
            description="The strongest engagements have a visible trigger, access to operating evidence, and a leader accountable for improving the result."
          />
          <div className="grid gap-3 md:grid-cols-2">
            {audiences.map((audience) => (
              <Card key={audience} className="rounded-lg">
                <p className="text-base leading-7 text-muted">{audience}</p>
              </Card>
            ))}
          </div>
        </div>
      </Section>

      <Section className="bg-surface">
        <SectionHeader
          eyebrow="Diagnostic Outputs"
          title="A decision-ready view of what is hurting performance."
          description="The output is not a maturity score or tool recommendation. It gives leadership a clear view of the constraint, its exposure, and a defensible next step."
        />
        <div className="mt-12 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {outputs.map((output) => (
            <div key={output} className="border border-border bg-white p-5 text-base leading-7 text-muted">
              {output}
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeader
            eyebrow="Expected Inputs"
            title="Start with the evidence already available."
            description="A recovery assessment does not require a clean-data program, a new platform, or a finished business case. It needs enough operating evidence to inspect the actual workflow."
          />
          <ul className="grid gap-3">
            {expectedInputs.map((input) => (
              <li key={input} className="border border-border p-5 text-base leading-7 text-muted">
                {input}
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section className="bg-surface">
        <SectionHeader
          eyebrow="Next-Step Process"
          title="A short path to an informed decision."
          description="The assessment creates evidence for a decision. It does not create an obligation to buy a diagnostic, build, or ongoing advisory engagement."
        />
        <ol className="mt-12 grid gap-4 md:grid-cols-3">
          {[
            ["1. Intake", "Describe the operating problem, workflow scope, evidence available, and decision leadership needs to make."],
            ["2. Fit conversation", "Confirm that the issue is concrete and that an assessment can produce a useful decision."],
            ["3. Fixed-scope assessment", "Review the workflow, deliver the executive briefing, then decide whether to stop, deepen, or build."],
          ].map(([title, description]) => (
            <li key={title} className="border border-border bg-white p-6">
              <h2 className="text-2xl font-semibold">{title}</h2>
              <p className="mt-4 text-base leading-7 text-muted">{description}</p>
            </li>
          ))}
        </ol>
        <Link
          href="/contact"
          className="group mt-10 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.08em] text-primary hover:text-primary-dark"
        >
          Find Your Highest-Leverage Workflow
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
        </Link>
      </Section>

      <CtaBand
        title="Bring the workflow under pressure."
        description="The first step is a focused intake. TKO will assess whether the problem is ready for a fixed-scope recovery engagement."
        primaryHref="/contact"
        primaryLabel="Find Your Highest-Leverage Workflow"
      />
    </>
  );
}
