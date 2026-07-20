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
  title: "Healthcare Transformation & Program Recovery",
  description:
    "TKO helps healthcare leaders find where prior authorization, utilization management, and modernization programs are actually failing, and what to fix first, with evidence you can inspect.",
  alternates: { canonical: "/healthcare" },
  openGraph: {
    title: "Healthcare Transformation & Program Recovery",
    description:
      "Independent transformation and program recovery for healthcare leaders: administrative burden, prior authorization, workflow governance, and transformation risk.",
    url: absoluteUrl("/healthcare"),
  },
};

const authorityAreas = [
  {
    title: "Prior authorization operational quality",
    body: "Map where documentation, authority, exception routing, and human review create variation before funding automation or a new platform.",
    href: "/services/prior-authorization-assessment",
    label: "Explore the PA assessment",
  },
  {
    title: "Workflow governance and regulatory delivery",
    body: "Examine whether decision rights, approvals, exceptions, and evidence are operating in daily work, not merely documented.",
    href: "/services/recovery-assessment",
    label: "Explore Recovery Assessment",
  },
  {
    title: "Transformation recovery",
    body: "Make the dependency layer, constraints, and required executive decisions visible when local status does not explain enterprise risk.",
    href: "/services/recovery-assessment",
    label: "See recovery approach",
  },
  {
    title: "Human-controlled AI",
    body: "Use source authority, human approval, and visible system health as controls before asking AI to influence an operational workflow.",
    href: "/services/recovery-assessment",
    label: "Explore the AI readiness path",
  },
];

const insights = [
  {
    title: "Prior Authorization Is a Decision-Rights Problem",
    href: "/insights/prior-authorization-is-a-decision-rights-problem",
  },
  {
    title: "Prior Authorization Is an Operational Quality Problem",
    href: "/insights/prior-authorization-operational-quality-problem",
  },
  {
    title: "Operational Intelligence vs Reporting",
    href: "/insights/operational-intelligence-vs-reporting",
  },
];

export default function HealthcarePage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "TKO Healthcare Transformation & Program Recovery",
          url: absoluteUrl("/healthcare"),
          description:
            "Independent transformation and program recovery for healthcare leaders: prior authorization, utilization management, workflow governance, transformation recovery, and human-controlled AI.",
          about: [
            "Prior Authorization",
            "Utilization Management",
            "Healthcare Workflow Governance",
            "Transformation Recovery",
            "Human-in-the-Loop AI",
          ],
        }}
      />
      <PageHero
        eyebrow="Healthcare"
        title="See where your healthcare transformation is actually failing."
        description="TKO helps healthcare leaders find where prior authorization, utilization management, care management, interoperability, and modernization programs are stalling, who carries the risk, and what to fix first. The same program-recovery method applies across regulated operations."
        primaryHref="/contact"
        primaryLabel="Find Your Highest-Leverage Workflow"
        secondaryHref="/selected-work"
        secondaryLabel="Review Selected Work"
      />

      <Section className="bg-surface">
        <SectionHeader
          eyebrow="Where TKO works in healthcare"
          title="Two decades inside payer operations, prior authorization, and interoperability."
          description="Active in the provider-experience domain, where gold-card programs reduce administrative burden by narrowing prior authorization and bypassing medical-necessity review for selected codes. Earlier work owned CMS Cures Act and FHIR interoperability for payers. This is where the program-recovery method is sharpest."
        />
      </Section>

      <Section>
        <SectionHeader
          eyebrow="Where to start"
          title="Start with the decision underneath the visible symptom."
          description="The work is designed for leaders deciding whether to stabilize a workflow, clarify authority, examine delivery risk, or determine whether automation and AI have the operating controls they need."
        />
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {authorityAreas.map((area) => (
            <Card key={area.title}>
              <h2 className="text-2xl font-semibold">{area.title}</h2>
              <p className="mt-4 text-base leading-7 text-muted">{area.body}</p>
              <Link
                href={area.href}
                className="group mt-6 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.08em] text-primary hover:text-primary-dark"
              >
                {area.label}
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </Link>
            </Card>
          ))}
        </div>
      </Section>

      <Section className="bg-surface">
        <SectionHeader
          eyebrow="Operating patterns"
          title="The recurring failure is that the person becomes the operating system."
          description="Across these settings, critical knowledge, prioritization, and exception routing can live in individual heads. The diagnostic job is to make the facts, authority, escalation path, and next action visible enough to review and improve."
        />
        <div className="mt-10 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {[
            "Decision rights are implicit.",
            "Exceptions depend on informal routing.",
            "Priority changes with who is working.",
            "Status obscures dependency risk.",
            "Modernization changes tools but not the operating model.",
            "AI is proposed before controls are designed.",
          ].map((pattern) => (
            <div key={pattern} className="border border-border bg-white p-5 text-base leading-7 text-muted">
              {pattern}
            </div>
          ))}
        </div>
        <p className="mt-8 max-w-[70ch] text-sm leading-6 text-muted">
          This page documents recurring operating patterns from that experience.
          It discloses no client workflow, patient information, payer rule, or
          measured outcome. RachelOS is the separate, directly inspectable proof
          of an implemented system.
        </p>
      </Section>

      <Section>
        <SectionHeader
          eyebrow="Related reading"
          title="Evidence-led notes for healthcare and executive operators."
        />
        <div className="mt-10 grid gap-4 lg:grid-cols-3">
          {insights.map((insight) => (
            <Card key={insight.href}>
              <h2 className="text-xl font-semibold leading-tight">{insight.title}</h2>
              <Link
                href={insight.href}
                className="group mt-6 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.08em] text-primary hover:text-primary-dark"
              >
                Read insight
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </Link>
            </Card>
          ))}
        </div>
      </Section>

      <CtaBand
        title="Bring the workflow and the decision under pressure."
        description="Start with a focused assessment when the immediate question is where work stalls, who carries the missing context, and what leadership should do before another technology investment."
        primaryLabel="Find Your Highest-Leverage Workflow"
        secondaryHref="/selected-work"
        secondaryLabel="Review Selected Work"
      />
    </>
  );
}
