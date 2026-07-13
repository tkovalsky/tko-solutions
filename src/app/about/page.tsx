import type { Metadata } from "next";
import { CtaBand } from "@/components/site/cta-band";
import { PageHero } from "@/components/site/page-hero";
import { Section, SectionHeader } from "@/components/ui/section";
import { truthFramework } from "@/lib/content";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "TKO brings operator-led experience in healthcare transformation, workflow recovery, and live operating-system builds to complex business performance problems.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About TKO Solutions",
    description:
      "TKO helps leaders find the constraints holding performance back and build systems that improve execution.",
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
    title: "Operating systems for better execution",
    description:
      "The practical conclusion: critical context becomes visible, priorities are clear, ownership is explicit, and the business can execute without relying on a few people to reconstruct reality.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title="Built for leaders who need the business to run better—not just sound more modern."
        description="TKO brings an operator's point of view to performance problems: where execution breaks down, decisions slow, revenue leaks, and critical knowledge is trapped in a few people."
      />
      <Section>
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeader
            eyebrow="Accumulation"
            title="The work runs from high-stakes healthcare operations to live revenue systems."
            description="TKO's point of view was earned through modernization, recovery, workflow governance, and product-building work—not invented as an AI consulting category."
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
            title="Experience in environments where execution, accountability, and risk matter."
            description="The relevant credential is hands-on work in complex organizations where operational friction, delayed decisions, and adoption gaps have real consequences."
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
            title="Start with the questions that expose the constraint."
            description="The method connects an executive concern to the evidence, ownership, and operating change required to improve the result."
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
          title="RachelOS shows the work in a live revenue environment."
          description="RachelOS supports a South Florida real-estate business with relationship memory, prioritized daily work, automated nurture, and human-approved AI assistance. It has supported three closed transactions to date."
        />
      </Section>
      <CtaBand />
    </>
  );
}
