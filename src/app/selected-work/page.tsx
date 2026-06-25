import type { Metadata } from "next";
import { CaseStudyCards } from "@/components/site/cards";
import { CtaBand } from "@/components/site/cta-band";
import { PageHero } from "@/components/site/page-hero";
import { Section, SectionHeader } from "@/components/ui/section";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Selected Work",
  description:
    "Selected TKO work across healthcare workflow modernization, enterprise program recovery, interoperability governance, and RachelOS.",
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
        title="Evidence before category."
        description="TKO's point of view is built from operating work: healthcare workflow modernization, enterprise program recovery, interoperability governance, and RachelOS as live proof that the same pattern works outside the enterprise."
      />
      <Section>
        <CaseStudyCards />
      </Section>
      <Section className="bg-surface">
        <SectionHeader
          eyebrow="Common Pattern"
          title="The work changes domains. The operating failure repeats."
          description="Teams have systems, dashboards, meetings, and now AI interest. The missing layer is the governed path from signal to fact, state, priority, human approval, action, and outcome."
        />
      </Section>
      <CtaBand
        title="Use the evidence to choose the next move."
        description="The Diagnostic helps funded teams decide where workflow, governance, or AI spend should go first."
      />
    </>
  );
}
