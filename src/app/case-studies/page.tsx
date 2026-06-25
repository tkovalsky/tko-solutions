import type { Metadata } from "next";
import { CaseStudyCards } from "@/components/site/cards";
import { CtaBand } from "@/components/site/cta-band";
import { PageHero } from "@/components/site/page-hero";
import { Section, SectionHeader } from "@/components/ui/section";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Case Studies",
  description:
    "TKO case studies led by RachelOS, a live proof point for Operational Intelligence Systems that turn data into decisions and action.",
  alternates: { canonical: "/case-studies" },
  openGraph: {
    title: "Case Studies",
    description:
      "RachelOS featured proof, plus anonymized enterprise healthcare work that supports the Operational Intelligence pattern.",
    url: absoluteUrl("/case-studies"),
  },
};

export default function CaseStudiesPage() {
  return (
    <>
      <PageHero
        eyebrow="Case Studies"
        title="Proof that the decision-system gap can be solved."
        description="Start with the problem: organizations have data but lack a trusted way to decide what matters, who needs attention, and what happens next. RachelOS is the featured case study because it proves TKO has solved that problem in a live operating environment."
      />
      <Section>
        <CaseStudyCards />
      </Section>
      <Section className="bg-surface">
        <SectionHeader
          eyebrow="Proof Governance"
          title="Evidence is stated carefully."
          description="RachelOS is framed as live operating proof. Enterprise healthcare examples are anonymized and avoid inflated or unverifiable metrics unless attribution is confirmed."
        />
      </Section>
      <CtaBand />
    </>
  );
}
