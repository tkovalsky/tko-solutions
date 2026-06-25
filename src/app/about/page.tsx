import type { Metadata } from "next";
import { CtaBand } from "@/components/site/cta-band";
import { PageHero } from "@/components/site/page-hero";
import { Section, SectionHeader } from "@/components/ui/section";
import { truthFramework } from "@/lib/content";
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

const phases = [
  {
    title: "Enterprise healthcare transformation",
    description:
      "Complex payer and provider workflows where operational burden, compliance, and adoption all matter.",
  },
  {
    title: "Program recovery and governance",
    description:
      "Modernization work where teams can report progress while risk accumulates between dependencies.",
  },
  {
    title: "Workflow modernization",
    description:
      "Prior authorization, care management, interoperability, escalation, and exception-heavy operating models.",
  },
  {
    title: "Decision systems",
    description:
      "Operating models that turn signals, facts, state, priority, and human approval into trusted next action.",
  },
  {
    title: "RachelOS",
    description:
      "A live system proving that relationship knowledge can become operational memory, priority logic, and human-approved AI action.",
  },
  {
    title: "Operational intelligence",
    description:
      "The category conclusion: AI is useful when it is embedded in governed workflow and decision discipline.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title="The category came after the operating work."
        description="TKO is led from an operator's point of view. The work starts with how decisions actually get made, where workflow breaks down, what knowledge is trapped in people, and where AI can help without taking control."
      />
      <Section>
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeader
            eyebrow="Accumulation"
            title="The story runs from healthcare operating complexity to live decision systems."
            description="Operational intelligence is not the starting claim. It is the conclusion earned from years of modernization, recovery, workflow, governance, and product-building work."
          />
          <ol className="grid gap-3">
            {phases.map((phase, index) => (
              <li key={phase.title} className="grid gap-5 border border-border p-5 sm:grid-cols-[4rem_1fr]">
                <span className="text-sm font-semibold uppercase tracking-[0.14em] text-primary">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <h2 className="text-xl font-semibold">{phase.title}</h2>
                  <p className="mt-2 text-sm leading-6 text-muted">{phase.description}</p>
                </div>
              </li>
            ))}
          </ol>
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
