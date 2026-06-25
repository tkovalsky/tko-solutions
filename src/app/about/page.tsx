import type { Metadata } from "next";
import { CtaBand } from "@/components/site/cta-band";
import { PageHero } from "@/components/site/page-hero";
import { Card } from "@/components/ui/card";
import { Section, SectionHeader } from "@/components/ui/section";
import { industries, truthFramework } from "@/lib/content";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "About TKO Solutions and Todd: operator-first operational intelligence work grounded in enterprise healthcare leadership, workflow transformation, and RachelOS proof.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About TKO Solutions",
    description:
      "Todd builds systems that help organizations make better operational decisions.",
    url: absoluteUrl("/about"),
  },
};

const credibility = [
  "Enterprise healthcare leadership",
  "Large-scale modernization programs",
  "Workflow transformation",
  "Operational execution",
  "Prior authorization and administrative burden",
  "Care management and healthcare operations",
  "Interoperability and compliance-driven operating change",
  "RachelOS as a real-world proof point",
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title="I build systems that help organizations make better operational decisions."
        description="TKO is led from an operator's point of view. The work starts with how decisions actually get made, where workflow breaks down, what knowledge is trapped in people, and what action should happen next."
      />
      <Section>
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeader
            eyebrow="Operator First"
            title="The credibility is operational before it is technical."
            description="Todd's background spans enterprise healthcare leadership, modernization programs, workflow transformation, and operational execution. Technology matters, but only after the operating problem is understood."
          />
          <div className="grid gap-3 sm:grid-cols-2">
            {industries.map((industry) => (
              <Card key={industry.title}>
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">
                  {industry.priority}
                </p>
                <h2 className="mt-5 text-xl font-semibold">{industry.title}</h2>
                <p className="mt-3 text-sm leading-6 text-muted">
                  {industry.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </Section>
      <Section className="bg-surface">
          <SectionHeader
            eyebrow="Credibility"
            title="Experience in environments where decisions, workflows, and accountability matter."
            description="The relevant credential is not generic consulting language. It is direct experience helping complex organizations modernize work, reduce operational friction, and improve execution visibility."
        />
        <div className="mt-12 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {credibility.map((item) => (
            <div key={item} className="border border-border bg-white p-5">
              <p className="font-semibold">{item}</p>
            </div>
          ))}
        </div>
      </Section>
      <Section>
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeader
            eyebrow="Method"
            title="Operational Intelligence starts by asking better operating questions."
            description="The method connects executive concern to workflow evidence, decision analysis, prioritization, and implementation."
          />
          <ol className="space-y-3">
            {truthFramework.map((item, index) => (
              <li key={item} className="grid gap-5 border border-border p-5 sm:grid-cols-[4rem_1fr]">
                <span className="text-sm font-semibold uppercase tracking-[0.14em] text-muted">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <p className="font-semibold">{item}</p>
              </li>
            ))}
          </ol>
        </div>
      </Section>
      <Section className="bg-surface">
        <SectionHeader
          eyebrow="Proof"
          title="RachelOS shows the work in a live operating environment."
          description="RachelOS proves the same principle outside a slide deck: capture operational knowledge, preserve memory, surface priorities, recommend actions, and keep humans in approval."
        />
      </Section>
      <CtaBand />
    </>
  );
}
