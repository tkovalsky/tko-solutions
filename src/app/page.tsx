import type { Metadata } from "next";
import { CaseStudyCards, ServiceCards } from "@/components/site/cards";
import { CtaBand } from "@/components/site/cta-band";
import { SystemFlow, TruthFramework } from "@/components/site/framework";
import { JsonLd } from "@/components/site/json-ld";
import { PageHero } from "@/components/site/page-hero";
import { Section, SectionHeader } from "@/components/ui/section";
import { absoluteUrl } from "@/lib/site";
import { industries, problems, proofNotes } from "@/lib/content";

export const metadata: Metadata = {
  title: "Operational Intelligence Systems for Complex Organizations",
  description:
    "TKO Solutions helps complex organizations see where work is actually failing and build Operational Intelligence Systems that keep work visible, governed, and actionable.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Operational Intelligence Systems for Complex Organizations",
    description:
      "See where complex work is actually failing. Establish operational truth. Build systems that continue running after the engagement ends.",
    url: absoluteUrl("/"),
  },
};

export default function HomePage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "TKO Solutions",
          url: absoluteUrl("/"),
          description:
            "Operational Intelligence Systems for complex organizations.",
        }}
      />
      <PageHero
        eyebrow="TKO Solutions"
        title="Operational Intelligence Systems for Complex Organizations"
        description="TKO helps leaders see where work is actually failing, establish operational truth, and build systems that turn scattered signals into governed facts, trusted next actions, human approval, and measurable outcomes."
        primaryHref="/contact"
        primaryLabel="Start the Diagnostic"
        secondaryHref="/case-studies"
        secondaryLabel="View Case Studies"
      />

      <Section>
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeader
            eyebrow="Problem Architecture"
            title="The issue is not effort. It is visibility into actual work."
            description="TKO organizes expertise around operating problems, not industries. Healthcare is the launch wedge because these problems are urgent and proof-backed there."
          />
          <div className="grid gap-3 md:grid-cols-2">
            {problems.map((problem) => (
              <article key={problem.title} className="border border-border p-5">
                <h3 className="text-lg font-semibold">{problem.title}</h3>
                <p className="mt-3 text-sm leading-6 text-muted">
                  {problem.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </Section>

      <Section className="bg-surface">
        <SectionHeader
          eyebrow="Operational Truth Framework"
          title="A disciplined way to separate reported progress from operational truth."
          description="The framework identifies the gap between what is supposed to happen and what actually happens, then turns that gap into recovery priorities."
        />
        <div className="mt-12">
          <TruthFramework />
        </div>
      </Section>

      <Section>
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <SectionHeader
            eyebrow="How TKO Works"
            title="Signals become memory. Memory becomes facts. Facts become action."
            description="The RachelOS architecture demonstrates the system pattern: preserve operational signals, extract governed facts, expose current state, surface one trusted next action, and keep a human in approval."
          />
          <div>
            <SystemFlow />
            <p className="mt-8 max-w-[65ch] text-base leading-7 text-muted">
              AI is a controlled mechanism inside the operating system. It does not
              replace human decision authority, and it does not become the category.
            </p>
          </div>
        </div>
      </Section>

      <Section className="bg-surface">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeader
            eyebrow="Proof"
            title="Healthcare proof first. Secondary industries support the pattern."
            description="The proof architecture is intentionally conservative: production system proof, anonymized enterprise healthcare work, and cross-industry pattern recognition."
          />
          <div className="space-y-3">
            {proofNotes.map((note) => (
              <div key={note} className="border border-border bg-white p-5">
                <p className="text-base leading-7 text-muted">{note}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-14">
          <CaseStudyCards />
        </div>
      </Section>

      <Section>
        <SectionHeader
          eyebrow="Service Ladder"
          title="One entry point. Two downstream paths."
          description="The Diagnostic is the paid front door. Build and Fractional Advisor engagements follow when operational truth identifies what should be built or governed."
        />
        <div className="mt-12">
          <ServiceCards />
        </div>
      </Section>

      <Section className="bg-surface">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeader
            eyebrow="Founder Credibility"
            title="Pattern recognition across complex operating environments."
            description="The same operating failures appear in healthcare, wealth management, asset management, capital markets, and enterprise operations: work crosses boundaries faster than leaders can observe, govern, and act on it."
          />
          <div className="grid gap-3 sm:grid-cols-2">
            {industries.map((industry) => (
              <article key={industry.title} className="border border-border bg-white p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">
                  {industry.priority}
                </p>
                <h3 className="mt-5 text-xl font-semibold">{industry.title}</h3>
                <p className="mt-3 text-sm leading-6 text-muted">
                  {industry.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </Section>

      <CtaBand />
    </>
  );
}

