import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { JsonLd } from "@/components/site/json-ld";
import { PageHero } from "@/components/site/page-hero";
import { Card } from "@/components/ui/card";
import { Section, SectionHeader } from "@/components/ui/section";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Founder Proof Hub",
  description:
    "An evidence-led diligence path through Todd Kovalsky's operating experience, built systems, decisions, healthcare advisory background, and claim boundaries.",
  alternates: { canonical: "/proof/founder" },
  openGraph: {
    title: "Founder Proof Hub",
    description:
      "Inspect the operating experience, built systems, decisions, evidence, and limits behind TKO Solutions.",
    url: absoluteUrl("/proof/founder"),
  },
};

const proofPaths = [
  ["What I have built", "RachelOS is the direct, inspectable proof of memory, priority, human approval, and system health in an operating system.", "/founder/what-i-have-built"],
  ["What I have owned and learned", "Founder decisions, limitations, and evidence levels explain where responsibility, implementation, and hypotheses differ.", "/founder/what-i-have-owned"],
  ["Healthcare advisory background", "Healthcare authority is grounded in bounded operating experience across complex workflows and transformation governance.", "/founder/healthcare"],
  ["Services", "One accountable path from strategy to production makes the operating question, required inputs, and expected decision tangible.", "/services"],
  ["Claim boundaries", "Evidence strength controls what can be said: observed, implemented, measured, validated, and hypothesis are different states.", "/proof"],
];

export default function FounderProofPage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ProfilePage",
          name: "Todd Kovalsky Founder Proof Hub",
          url: absoluteUrl("/proof/founder"),
          mainEntity: {
            "@type": "Person",
            name: "Todd Kovalsky",
            jobTitle: "Founder and Operator",
            worksFor: { "@type": "Organization", name: "TKO Solutions" },
          },
        }}
      />
      <PageHero
        eyebrow="Founder proof hub"
        title="A diligence path through the work—not a list of claims."
        description="This hub separates operating experience, direct implementation proof, difficult decisions, and future hypotheses so an executive can inspect the evidence relevant to the decision at hand."
        primaryHref="/proof/rachelos"
        primaryLabel="Inspect RachelOS"
        secondaryHref="/healthcare"
        secondaryLabel="Review healthcare authority"
      />
      <Section>
        <SectionHeader
          eyebrow="How to use this hub"
          title="Follow the proof most relevant to your operating question."
          description="The record does not claim that every operating pattern has been validated in every industry. It shows what was observed, what was implemented, and where the evidence stops."
        />
        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {proofPaths.map(([title, body, href]) => (
            <Card key={title}>
              <h2 className="text-xl font-semibold">{title}</h2>
              <p className="mt-4 text-base leading-7 text-muted">{body}</p>
              <Link href={href} className="group mt-6 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.08em] text-primary hover:text-primary-dark">
                Review evidence
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </Link>
            </Card>
          ))}
        </div>
      </Section>
      <Section id="timeline" className="bg-surface">
        <SectionHeader
          eyebrow="Executive timeline"
          title="Healthcare operating experience, a live reference system, and evidence-led authority production."
          description="The timeline is intentionally capability-based until founder-approved titles, dates, role boundaries, and any permissible organization names are added to the evidence ledger."
        />
      </Section>
      <Section id="experience">
        <SectionHeader
          eyebrow="Executive experience atlas"
          title="Reusable operating patterns across healthcare, delivery, governance, and product work."
          description="Prior authorization, utilization management, care management, interoperability, regulatory delivery, workflow modernization, and transformation governance are advisory experience. RachelOS is the direct system implementation reference."
        />
      </Section>
      <Section id="capabilities" className="bg-surface">
        <SectionHeader
          eyebrow="Capability atlas"
          title="The commercial use is diagnostic and advisory—not a claim of universal delivery capacity."
          description="The public path starts with an assessment because the evidence supports identifying workflow, governance, dependency, and AI-control conditions before promising a larger intervention."
        />
      </Section>
      <Section id="evidence">
        <SectionHeader
          eyebrow="Evidence & claim ledger"
          title="A claim may not outrun its source."
          description="Implemented RachelOS controls are distinct from healthcare operating background. Measured outcomes, named clients, portfolio scale, and repeatable product claims are not used unless their source and permission are explicitly approved."
        />
      </Section>
      <Section id="downloads" className="bg-surface">
        <SectionHeader
          eyebrow="Download center"
          title="Review-ready tools will appear here after human approval."
          description="The first candidates are a decision-rights checklist, exception-routing ladder, and executive operating-review one-pager. No client material or unapproved case study is offered for download."
        />
      </Section>
    </>
  );
}
