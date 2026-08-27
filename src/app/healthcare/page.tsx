import type { Metadata } from "next";
import { CtaBand } from "@/components/site/cta-band";
import { PageHero } from "@/components/site/page-hero";
import { LinkButton } from "@/components/ui/button";
import { Section, SectionHeader } from "@/components/ui/section";
import { absoluteUrl, site } from "@/lib/site";

export const metadata: Metadata = { title: "Healthcare Transformation Practice", description: "Healthcare operating-model advisory across administrative burden, provider operations, utilization management, governed AI, and transformation execution.", alternates: { canonical: "/healthcare" }, openGraph: { title: "Healthcare Transformation Practice | TKO Solutions", description: "Make complex, regulated healthcare change executable.", url: absoluteUrl("/healthcare"), images: [{ url: site.socialImage, width: 1200, height: 630, alt: "TKO Solutions healthcare transformation practice." }] } };

const domains = [
  ["Administrative burden & provider experience", "Expose manual work, rework, appeals, delay, escalation, and provider touchpoints—then determine which controls are necessary and which work can change."],
  ["Utilization management & prior authorization", "Redesign review tiers, evidence requirements, decision rights, exceptions, escalation, auditability, and differentiated controls before automating."],
  ["Enterprise workflow modernization", "Connect claims, provider, clinical, product, data, integration, and release dependencies into one executable operating model."],
  ["Governed AI-enabled operations", "Define where models assist, where humans decide, how low-confidence work routes, what is audited, and how outcomes improve future decisions."],
] as const;

const buyerSignals = ["Prior-authorization reform or Gold Card legislation", "CMS or interoperability implementation requirements", "Provider dissatisfaction or relations pressure", "Operating-cost or administrative-burden mandates", "AI, workflow, or platform modernization", "Vendor replacement or major enterprise transformation", "Acquisition, integration, or new executive leadership"];

export default function HealthcarePage() {
  return (
    <>
      <PageHero eyebrow="Healthcare practice" title="The pressure is rising. The controls still matter." description="TKO helps health plans, healthcare services organizations, managed-care organizations, provider platforms, and large provider organizations redesign complex workflows without increasing clinical, compliance, financial, or operational risk." primaryHref="/contact" primaryLabel="Discuss a Transformation" secondaryHref="/selected-work" secondaryLabel="Review the Evidence" />

      <Section className="!py-14 md:!py-18"><div className="grid gap-12 lg:grid-cols-[0.72fr_1.28fr]"><SectionHeader eyebrow="The transformation problem" title="Administrative burden is a control-design problem." description="Eliminating a step is easy. Determining what purpose it served, what risk it controlled, and what operating mechanism should replace it is the real work." /><div className="space-y-5 text-lg leading-8 text-muted"><p>Healthcare workflows evolved through regulation, product variation, local exceptions, platform constraints, and organizational handoffs. The burden appears in one department. The cause often sits somewhere else.</p><p>TKO maps the work, evidence, decisions, controls, dependencies, exception paths, and outcomes as one system—then turns that model into a practical sequence for change.</p><p className="font-semibold text-foreground">Reduce the burden. Preserve the control. Redesign the system.</p></div></div></Section>

      <Section className="bg-surface !py-14 md:!py-20"><SectionHeader eyebrow="Where TKO works" title="Problem domains, not narrow product categories." /><div className="mt-10 border-t border-border">{domains.map(([title, body], index) => <article key={title} className="grid gap-4 border-b border-border py-7 md:grid-cols-[3rem_0.75fr_1.25fr]"><span className="font-mono text-sm text-primary">0{index + 1}</span><h2 className="text-2xl font-semibold">{title}</h2><p className="text-base leading-7 text-muted">{body}</p></article>)}</div></Section>

      <Section><div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]"><SectionHeader eyebrow="Domain and capability" title="Prior authorization is evidence. Operating-model transformation is the capability." description="Prior authorization, utilization management, provider experience, and interoperability provide credibility and market wedges. The transferable capability is redesigning and executing complex regulated operating models." /><div><ul className="grid gap-3 sm:grid-cols-2">{["Payer and provider operations", "Utilization management and prior authorization", "Claims-related and clinical-administrative workflows", "FHIR, APIs, data flows, and interoperability", "Rules, decisioning, analytics, and automation", "Human-in-the-loop and fail-closed controls", "Governance, dependencies, testing, and readiness", "Transformation execution and recovery"].map((item) => <li key={item} className="border-l-2 border-primary bg-surface p-4 text-sm leading-6">{item}</li>)}</ul><LinkButton href="/approach" variant="secondary" className="mt-8">Explore the Approach</LinkButton></div></div></Section>

      <Section className="bg-surface"><div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]"><SectionHeader eyebrow="When to engage" title="Signals that an operating model is under pressure." description="TKO is most useful when an external or internal signal implies a deeper workflow, control, dependency, or execution problem." /><ul className="border-t border-border">{buyerSignals.map((item) => <li key={item} className="border-b border-border py-4 text-base leading-7 text-muted">{item}</li>)}</ul></div></Section>

      <Section><div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]"><SectionHeader eyebrow="Defensible experience" title="Enterprise healthcare work, described by role." description="Todd has led governance, delivery orchestration, dependency management, reporting, readiness, testing coordination, escalation, and cross-team alignment; influenced design and implementation choices; and supported strategies and architectures owned elsewhere." /><div><p className="text-base leading-7 text-muted">Evidence includes prior-authorization and provider initiatives, large governance environments, dozens of interdependent applications and workstreams, CMS/FHIR interoperability product ownership, and a live independent governed-decision system.</p><LinkButton href="/selected-work" className="mt-8">Review Selected Work</LinkButton></div></div></Section>

      <CtaBand title="What is changing—and where is the operating model starting to break?" description="Bring one bounded transformation, workflow, or decision under pressure." primaryLabel="Discuss a Transformation" secondaryHref="/services" secondaryLabel="Compare Engagements" />
    </>
  );
}
