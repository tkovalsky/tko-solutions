import type { Metadata } from "next";
import { CaseStudyCards } from "@/components/site/cards";
import { CtaBand } from "@/components/site/cta-band";
import { PageHero } from "@/components/site/page-hero";
import { Section, SectionHeader } from "@/components/ui/section";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Selected Work",
  description:
    "Selected work organized around workflow modernization, transformation recovery, operational knowledge, governed AI, enterprise delivery, and regulated operations.",
  alternates: { canonical: "/selected-work" },
  openGraph: {
    title: "Selected Work",
    description:
      "Evidence-led work showing how TKO turns stalled workflows, fragmented signals, and AI adoption pressure into governed next action.",
    url: absoluteUrl("/selected-work"),
  },
};

export default function SelectedWorkPage() {
  return (
    <>
      <PageHero
        eyebrow="Selected Work"
        title="Proof organized around the operating problem, not an industry claim."
        description="The record spans workflow modernization, transformation recovery, operational knowledge systems, enterprise product and platform delivery, complex financial and regulated workflows, AI-assisted decision support, interoperability, and governance."
      />
      <Section>
        <CaseStudyCards />
      </Section>
      <Section className="bg-surface">
        <SectionHeader
          eyebrow="Common Pattern"
          title="The domain changes. The operating failure repeats."
          description="Across relationship operations, healthcare, financial services, investment workflows, enterprise programs, and property intelligence, the missing layer is a governed path from signal to fact, state, priority, human approval, action, and outcome. Employment history and public program context do not imply employer or client endorsement."
        />
      </Section>
      <CtaBand
        title="Use the evidence to choose the next move."
        description="The Assessment helps teams identify where workflow, governance, human API dependency, or AI adoption risk should be addressed first."
      />
    </>
  );
}
