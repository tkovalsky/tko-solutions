import type { Metadata } from "next";
import { CaseStudyCards } from "@/components/site/cards";
import { CtaBand } from "@/components/site/cta-band";
import { PageHero } from "@/components/site/page-hero";
import { Section, SectionHeader } from "@/components/ui/section";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Case Studies",
  description:
    "TKO case studies organized by operational complexity pattern, proof level, related problem, and related service.",
  alternates: { canonical: "/case-studies" },
  openGraph: {
    title: "Case Studies",
    description:
      "Production system proof and anonymized enterprise healthcare work for Operational Intelligence Systems.",
    url: absoluteUrl("/case-studies"),
  },
};

export default function CaseStudiesPage() {
  return (
    <>
      <PageHero
        eyebrow="Case Studies"
        title="Proof organized by operating problem, not only by industry."
        description="Each case study follows the same structure: situation, operational complexity pattern, what was invisible, what was stalled, the Operational Truth Framework application, system built, outcome, and evidence status."
      />
      <Section>
        <CaseStudyCards />
      </Section>
      <Section className="bg-surface">
        <SectionHeader
          eyebrow="Proof Governance"
          title="Evidence status is part of the architecture."
          description="Production system proof, anonymized enterprise proof, and gated attribution are handled deliberately so the site can build credibility without overclaiming."
        />
      </Section>
      <CtaBand />
    </>
  );
}

