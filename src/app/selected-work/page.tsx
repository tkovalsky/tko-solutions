import type { Metadata } from "next";
import { CaseStudyCards } from "@/components/site/cards";
import { CtaBand } from "@/components/site/cta-band";
import { PageHero } from "@/components/site/page-hero";
import { Section, SectionHeader } from "@/components/ui/section";
import { absoluteUrl, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Selected Work & Evidence",
  description:
    "Relevant evidence from enterprise program recovery, healthcare transformation, regulated product delivery, financial and wealth operations, and inspectable implementation discipline.",
  alternates: { canonical: "/selected-work" },
  openGraph: {
    title: "Selected Work & Evidence",
    description:
      "Experience and inspectable implementation evidence behind TKO's transformation recovery advisory.",
    url: absoluteUrl("/selected-work"),
    images: [
      {
        url: site.socialImage,
        width: 1200,
        height: 630,
        alt: "TKO Solutions selected transformation recovery work and evidence.",
      },
    ],
  },
};

const evidenceDomains = [
  ["Enterprise program recovery", "Cross-workstream healthcare modernization experience establishes context for dependencies, decisions, governance, executive reporting, and recovery sequencing."],
  ["Healthcare transformation", "Prior authorization, utilization management, payer and provider operations, care management, interoperability, and administrative workflow change establish the primary specialization."],
  ["Regulated product delivery", "Payer-facing interoperability work connects technical requirements with access, auditability, governance, onboarding, and operating behavior."],
  ["Financial and wealth operations", "Credit, fund, investment, advisor-platform, trading, settlement, product, and platform experience establishes portability across high-consequence operating environments."],
  ["Inspectable implementation discipline", "RachelOS shows direct, founder-built workflow, source authority, traceability, human approval, system health, and controlled AI mechanisms."],
];

export default function SelectedWorkPage() {
  return (
    <>
      <PageHero
        eyebrow="Selected work & evidence"
        title="Relevant operating experience and inspectable implementation discipline."
        description="TKO's public record combines employment-based enterprise experience, founder-built operating proof, and supporting method evidence. Each case explains the environment, Todd's role, intervention, relevance, and the boundary of what can be claimed."
        primaryHref="/services/diagnostic"
        primaryLabel="See the Recovery Diagnostic"
        secondaryHref="/contact"
        secondaryLabel={site.cta}
      />

      <Section className="bg-surface !py-12 md:!py-16">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {evidenceDomains.map(([title, body]) => (
            <div key={title} className="border border-border bg-white p-6">
              <h2 className="text-xl font-semibold">{title}</h2>
              <p className="mt-3 text-sm leading-6 text-muted">{body}</p>
            </div>
          ))}
        </div>
        <p className="mt-6 max-w-4xl text-xs leading-5 text-muted">
          Employment experience establishes relevant scope and accountability. It is
          not presented as employer endorsement or an attributable TKO client result.
          Founder-built and method evidence is identified separately.
        </p>
      </Section>

      <Section>
        <SectionHeader
          eyebrow="Evidence record"
          title="Start with the case closest to the execution question."
          description="The intervention and buyer relevance come first. Each record then states the public evidence available and the limits on attribution, scale, and outcome claims."
        />
        <div className="mt-10">
          <CaseStudyCards />
        </div>
      </Section>

      <Section id="method-portability" className="bg-surface">
        <SectionHeader
          eyebrow="Does the method apply here?"
          title="The method transfers only at the operating-mechanism level."
          description="Recovery, healthcare, financial-services, and supporting proof environments share structural problems: work crosses systems and roles, exceptions depend on experienced staff, decisions and dependencies age, and leadership needs reliable evidence before changing the plan. Domain logic and performance claims do not transfer automatically."
        />
      </Section>

      <CtaBand
        title="Use the evidence to decide whether an independent recovery view is warranted."
        description="Bring one program under pressure and the executive decision required within 90 days. TKO will determine whether a rapid Pressure Test, full Recovery Diagnostic, or another path is appropriate."
        secondaryHref="/services/diagnostic"
        secondaryLabel="See the Recovery Diagnostic"
      />
    </>
  );
}
