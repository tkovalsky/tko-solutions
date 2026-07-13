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
  title: "AI Delivery Assessment",
  description:
    "A fixed-scope assessment that maps what your operation has actually built, activated, and validated — and ranks the constraints blocking throughput — before anyone proposes building anything.",
  alternates: { canonical: "/assessment/ai-delivery" },
  openGraph: {
    title: "AI Delivery Assessment",
    description:
      "The same evidence method used to audit RachelOS, applied to your operation: implementation over configuration over production records over documentation.",
    url: absoluteUrl("/assessment/ai-delivery"),
  },
};

const engageSignals = [
  "AI has been mandated or budgeted, but no one can say which workflow it should govern or what human approval looks like.",
  "Something was already 'built with AI' — internally or by a vendor — and leadership cannot tell whether it is a production system or a demo.",
  "Capabilities exist but sit unused: implemented is being confused with activated, and activated with validated.",
  "Follow-up work depends on one person as the integration layer between the systems of record.",
];

const audiences = [
  "COO, VP Operations, or Director of Operations accountable for throughput where work crosses tools and handoffs.",
  "Founder or CEO deciding whether an operator-led, AI-assisted build is credible for a real operating system.",
  "VP Product or Head of Product evaluating what AI-assisted delivery can and cannot compress.",
  "Transformation leader who needs a governed AI adoption pattern with audit trails and human accountability.",
];

const outputs = [
  "A Built / Activated / Validated map of your current tools, workflows, and any AI usage — the same four-status honesty scale RachelOS grades itself on.",
  "A ranked constraint list showing what is actually blocking throughput, with evidence for each ranking.",
  "An evidence-hierarchy audit: what implementation, configuration, and production records prove — as opposed to what documentation claims.",
  "Governance findings: where human approval points, activation gates, and audit trails exist and where they are missing.",
  "Knowledge-concentration findings: where the full picture lives in one person and what mitigates it.",
  "An executive briefing with the next highest-leverage move and a recommendation to stop, deepen, or build.",
];

const methodProof = [
  "This method found a cohort of captured-but-never-contacted leads in TKO's own reference system — a finding worth more than any feature.",
  "It measured a 2.2% email-first reply rate and reranked the operating priorities around conversation creation instead of more software.",
  "It classified every capability as implemented, activated, validated, or unvalidated — and published the failures, including dormant integrations and a silently missed automation day.",
];

export default function AiDeliveryAssessmentPage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: "AI Delivery Assessment",
          provider: { "@type": "Organization", name: "TKO Solutions" },
          serviceType: "AI Delivery Assessment",
          areaServed: "United States",
          url: absoluteUrl("/assessment/ai-delivery"),
        }}
      />
      <PageHero
        eyebrow="Entry Engagement"
        title="Audit the evidence before you fund the build."
        description="The AI Delivery Assessment applies the evidence method behind the RachelOS case study to your operation: a Built / Activated / Validated map of what you have, and a ranked list of what is actually constraining it — before anyone proposes building anything."
        primaryHref="/contact"
        primaryLabel="Book an operating performance conversation"
        secondaryHref="/selected-work/rachelos-delivery-model"
        secondaryLabel="Read the delivery-model case study"
      />

      <Section className="bg-surface">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeader
            eyebrow="When To Engage"
            title="Start when 'we should use AI' has no evidence under it."
            description="This is not a tool-selection exercise. It is for leaders who need to know what their operation has actually proven — and what an AI-assisted build would require — before committing spend."
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
            title="The sponsor owns an operating decision."
            description="The strongest engagements have a concrete workflow under pressure and a leader accountable for choosing the next move."
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
          eyebrow="Assessment Outputs"
          title="A decision-ready evidence package."
          description="The output is not a maturity score or a tool recommendation. It is the same audit TKO runs on its own systems, applied to yours."
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
            eyebrow="Method Proof"
            title="The method is demonstrated, not described."
            description="Every step of this assessment was run first on RachelOS — TKO's own production system — and the findings were published, including the unflattering ones."
          />
          <ul className="grid gap-3">
            {methodProof.map((item) => (
              <li key={item} className="border border-border p-5 text-base leading-7 text-muted">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section className="bg-surface">
        <SectionHeader
          eyebrow="Next-Step Process"
          title="A short path to an informed decision."
          description="The assessment creates evidence for a decision. It does not create an obligation to build."
        />
        <ol className="mt-12 grid gap-4 md:grid-cols-3">
          {[
            ["1. Intake", "Describe the operation, the tools and workflows in play, any AI already in use, and the decision leadership needs to make."],
            ["2. Fit conversation", "Confirm the problem is concrete and that an evidence audit can produce a useful decision."],
            ["3. Fixed-scope assessment", "Receive the Built / Activated / Validated map, the ranked constraints, and the briefing — then decide whether to stop, deepen, or build."],
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
          Book an operating performance conversation
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
        </Link>
      </Section>

      <CtaBand
        title="Bring the operation, not the org chart."
        description="The first step is a focused intake. TKO will assess whether the problem is ready for a fixed-scope evidence audit."
        primaryHref="/contact"
        primaryLabel="Book an operating performance conversation"
      />
    </>
  );
}
