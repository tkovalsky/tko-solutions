import type { Metadata } from "next";
import { CtaBand } from "@/components/site/cta-band";
import { JsonLd } from "@/components/site/json-ld";
import { PageHero } from "@/components/site/page-hero";
import { LinkButton } from "@/components/ui/button";
import { Section, SectionHeader } from "@/components/ui/section";
import { absoluteUrl, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Approach | Healthcare Operating Model Transformation",
  description: "How TKO makes administrative friction, controls, dependencies, decisions, and governed automation visible before implementation.",
  alternates: { canonical: "/approach" },
  openGraph: { title: "The TKO Approach", description: "Reduce the burden. Preserve the control. Redesign the system.", url: absoluteUrl("/approach"), images: [{ url: site.socialImage, width: 1200, height: 630, alt: "The TKO healthcare transformation approach." }] },
};

const methods = [
  ["01", "Administrative Friction Diagnostic", "Map transactions, reviews, approvals, escalations, handoffs, provider touchpoints, and manual decisions. Classify each as necessary, automatable, delegatable, or eliminable, then quantify the burden."],
  ["02", "Risk-Adjusted Operations", "Make oversight proportional to demonstrated risk and performance through qualification, segmentation, differentiated controls, monitoring, governance, and requalification."],
  ["03", "Friction Economics", "Translate volume, manual effort, rework, cycle time, escalation, appeals, provider burden, and member impact into an investment case leadership can evaluate."],
  ["04", "Transformation Dependency Model", "Expose business, application, integration, release, policy, funding, and ownership dependencies—then identify the critical path, collisions, decision gaps, and readiness risk."],
  ["05", "Operational Truth and Execution Control", "Reconstruct who owns what, find the work no team claims, name the unresolved decisions preventing closure, test reported status against evidence rather than assertion, and define what ready means before anyone declares it."],
  ["06", "Governed Decision Systems", "Design the full loop: signal, evidence, decision, guardrail, action, exception, human intervention, outcome, and feedback."],
] as const;

export default function ApproachPage() {
  return (
    <>
      <JsonLd data={{ "@context": "https://schema.org", "@type": "WebPage", name: "The TKO Approach", url: absoluteUrl("/approach"), description: metadata.description }} />
      <PageHero eyebrow="The TKO approach" title="Redesign the system before you accelerate it." description="Healthcare organizations are under pressure to eliminate administrative burden. They cannot simply eliminate controls. TKO determines what work is necessary, what can change, how decisions remain governed, and how the resulting model becomes executable." primaryHref="/contact" primaryLabel="Discuss a Transformation" secondaryHref="/services/executive-diagnostic" secondaryLabel="Start with a Diagnostic" />

      <Section className="bg-surface !py-14 md:!py-18">
        <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr]">
          <SectionHeader eyebrow="Core thesis" title="Reduce the burden. Preserve the control. Redesign the system." description="The work is not indiscriminate process removal. It is deliberate control design tied to evidence, risk, operating ownership, and measurable outcomes." />
          <ol className="border-t border-border">
            {methods.map(([number, title, body]) => (
              <li key={title} className="grid gap-3 border-b border-border py-7 sm:grid-cols-[4rem_1fr]">
                <p className="font-mono text-sm font-semibold text-primary">{number}</p>
                <div><h2 className="text-2xl font-semibold tracking-tight">{title}</h2><p className="mt-3 max-w-[68ch] text-base leading-7 text-muted">{body}</p></div>
              </li>
            ))}
          </ol>
        </div>
      </Section>

      <Section>
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeader eyebrow="Governed AI" title="The hard part is the decision system around the model." description="A model call is not an operating model. Safe automation requires explicit evidence, authority, confidence boundaries, exception routing, auditability, human review, outcome measurement, and feedback." />
          <div className="border border-border bg-white p-6 md:p-8">
            <ol className="grid gap-3 text-base font-semibold sm:grid-cols-2">
              {["Signal", "Structured evidence", "Current state", "Priority", "Recommendation", "Human review when needed", "Action", "Outcome and feedback"].map((item, index) => <li key={item} className="flex gap-3 border-b border-border pb-3"><span className="font-mono text-primary">{String(index + 1).padStart(2, "0")}</span><span>{item}</span></li>)}
            </ol>
          </div>
        </div>
        <LinkButton href="/selected-work/from-crm-to-operating-system" variant="secondary" className="mt-10">Inspect the RachelOS Evidence</LinkButton>
      </Section>

      <CtaBand title="Bring the messy problem." description="Start with the workflow, decision, or transformation under pressure. TKO will help determine what must change before implementation accelerates." primaryLabel="Discuss a Transformation" secondaryHref="/services" secondaryLabel="See the Advisory Ladder" />
    </>
  );
}
