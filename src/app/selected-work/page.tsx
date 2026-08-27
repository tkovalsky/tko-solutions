import type { Metadata } from "next";
import { CaseStudyCards } from "@/components/site/cards";
import { CtaBand } from "@/components/site/cta-band";
import { EvidenceNote } from "@/components/site/evidence-note";
import { PageHero } from "@/components/site/page-hero";
import { Section, SectionHeader } from "@/components/ui/section";
import { absoluteUrl, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Selected Work",
  description:
    "Enterprise healthcare transformation programs—prior authorization, provider eligibility, care management, and interoperability—described by the role I actually held, plus a governed decision system I built and run.",
  alternates: { canonical: "/selected-work" },
  openGraph: {
    title: "Selected Work | TKO Solutions",
    description: "The healthcare programs behind the practice, and my role in each.",
    url: absoluteUrl("/selected-work"),
    images: [{ url: site.socialImage, width: 1200, height: 630, alt: "TKO Solutions selected work." }],
  },
};

export default function SelectedWorkPage() {
  return (
    <>
      <PageHero
        eyebrow="Selected work"
        title="Six problems I was in the middle of."
        description="Enterprise healthcare programs where the outcome crossed more teams than any single plan covered—prior authorization, provider eligibility, care management, interoperability—plus a governed decision system I built and run myself."
        primaryHref="/contact"
        primaryLabel="Discuss a Transformation"
        secondaryHref="/services"
        secondaryLabel="Compare Engagements"
      />

      <Section>
        <SectionHeader
          title="Start with the operating problem closest to yours."
          description="Each case covers what was happening, why it was hard, what I owned, what I changed, and what it means for a program like yours."
        />
        <div className="mt-10">
          <CaseStudyCards />
        </div>
      </Section>

      <Section id="how-to-read-this-evidence" className="bg-surface !py-12 md:!py-16">
        <EvidenceNote />
      </Section>

      <CtaBand
        title="Bring one operating problem under pressure."
        description="I will help determine what is actually happening, which control or dependency matters, and what leadership should do next."
        primaryLabel="Discuss a Transformation"
        secondaryHref="/services"
        secondaryLabel="Compare Engagements"
      />
    </>
  );
}
