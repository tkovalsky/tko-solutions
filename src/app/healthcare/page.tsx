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
  title: "Healthcare Executive Strategy & Implementation",
  description:
    "TKO helps healthcare leaders turn prior authorization, utilization management, and transformation risk into working operating models, products, and production systems.",
  alternates: { canonical: "/healthcare" },
  openGraph: {
    title: "Healthcare Executive Strategy & Implementation",
    description:
      "Executive strategy through implementation for healthcare leaders working through administrative burden, exception handling, workflow governance, and transformation risk.",
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
    body: "Examine whether decision rights, approvals, exceptions, and evidence are operating in daily work—not merely documented.",
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
    href: "/services/enterprise-ai",
    label: "Explore AI delivery assessment",
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
          name: "TKO Healthcare Executive Strategy & Implementation",
          url: absoluteUrl("/healthcare"),
          description:
            "Executive strategy through implementation for healthcare leaders: prior authorization, utilization management, workflow governance, transformation recovery, and human-controlled AI.",
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
        eyebrow="Healthcare Executive Strategy"
        title="Healthcare leaders don't need another strategy. They need one that survives implementation."
        description="TKO helps healthcare executives turn complex operating problems—prior authorization, utilization management, care management, interoperability, and transformation risk—into working operating models, products, and AI-enabled systems that hold up in production."
        primaryHref="/contact"
        primaryLabel="Discuss an Active Initiative"
        secondaryHref="/selected-work"
        secondaryLabel="Review Selected Work"
      />

      <Section className="bg-surface">
        <SectionHeader
          eyebrow="Evidence boundary"
          title="Operating experience is not a product claim or a case-study result."
          description="The healthcare material on this site documents recurring operating patterns. It does not disclose a client workflow, patient information, payer rule, measured outcome, compliance certification, or deployed healthcare product. RachelOS remains the separate, direct proof of an implemented operating system."
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
        primaryLabel="Discuss an Active Initiative"
        secondaryHref="/selected-work"
        secondaryLabel="Review Selected Work"
      />
    </>
  );
}
