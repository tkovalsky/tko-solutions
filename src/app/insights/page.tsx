import type { Metadata } from "next";
import { CtaBand } from "@/components/site/cta-band";
import { PageHero } from "@/components/site/page-hero";
import { Card } from "@/components/ui/card";
import { Section, SectionHeader } from "@/components/ui/section";
import { contentPillars } from "@/lib/content";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Insights",
  description:
    "TKO authority content architecture for Operational Intelligence, workflow optimization, operational excellence, revenue operations, healthcare operations, and human-in-the-loop AI.",
  alternates: { canonical: "/insights" },
  openGraph: {
    title: "Insights",
    description:
      "Executive operating pain, not generic AI content. The insights architecture supports future MDX articles on operational decision making.",
    url: absoluteUrl("/insights"),
  },
};

const funnelNotes = [
  {
    title: "Problem-Aware",
    text: "Articles help leaders recognize the gap between available data and trusted operational decisions.",
  },
  {
    title: "Solution-Aware",
    text: "Articles explain Operational Intelligence as the layer that turns workflow evidence into priorities, attention, and action.",
  },
  {
    title: "Vendor-Aware",
    text: "Proof and case-study content helps warm leads validate TKO before starting the Diagnostic.",
  },
];

export default function InsightsPage() {
  return (
    <>
      <PageHero
        eyebrow="Insights"
        title="Authority content around executive operating pain."
        description="TKO insights are designed around operational intelligence, workflow optimization, operational excellence, revenue operations, healthcare operations, process modernization, and human-in-the-loop AI. Articles are MDX-ready, but no empty article inventory is published."
      />
      <Section>
        <SectionHeader
          eyebrow="Content Pillars"
          title="The category architecture for future articles."
          description="Each pillar routes back to the Operational Diagnostic when the reader has an active operating problem."
        />
        <div className="mt-12 grid gap-3 md:grid-cols-2 lg:grid-cols-5">
          {contentPillars.map((pillar) => (
            <Card key={pillar} className="p-5">
              <h2 className="text-lg font-semibold">{pillar}</h2>
            </Card>
          ))}
        </div>
      </Section>
      <Section className="bg-surface">
        <SectionHeader
          eyebrow="Funnel Role"
          title="Insights support warm-lead validation before they become a content machine."
        />
        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {funnelNotes.map((note) => (
            <Card key={note.title}>
              <h2 className="text-2xl font-semibold">{note.title}</h2>
              <p className="mt-4 text-base leading-7 text-muted">{note.text}</p>
            </Card>
          ))}
        </div>
      </Section>
      <Section>
        <SectionHeader
          eyebrow="MDX Architecture"
          title="Future articles can be added as MDX without redesigning the site."
          description="The implementation supports `.mdx` page extensions and shared MDX components. Article pages should be published only when actual content exists."
        />
      </Section>
      <CtaBand />
    </>
  );
}
