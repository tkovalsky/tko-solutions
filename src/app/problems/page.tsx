import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CtaBand } from "@/components/site/cta-band";
import { JsonLd } from "@/components/site/json-ld";
import { PageHero } from "@/components/site/page-hero";
import { Card } from "@/components/ui/card";
import { Section, SectionHeader } from "@/components/ui/section";
import { problems } from "@/lib/content";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Where Complex Workflows Stall",
  description:
    "See the hidden-work, decision-latency, dependency, and workflow-visibility problems that keep complex operations from moving with confidence.",
  alternates: { canonical: "/problems" },
  openGraph: {
    title: "Where Complex Workflows Stall",
    description:
      "Executive operating problems that keep work hidden, decisions slow, and accountability unclear.",
    url: absoluteUrl("/problems"),
  },
};

const relatedGuides = [
  {
    title: "Operational Intelligence vs. Reporting",
    href: "/insights/operational-intelligence-vs-reporting",
    description: "Why reporting activity does not reliably surface the next decision.",
  },
  {
    title: "Human APIs Become Organizational Bottlenecks",
    href: "/insights/human-apis-become-organizational-bottlenecks",
    description: "How knowledge concentration turns a capable person into a point of failure.",
  },
  {
    title: "Prior Authorization Is a Decision-Rights Problem",
    href: "/insights/prior-authorization-is-a-decision-rights-problem",
    description: "A healthcare operating pattern where workflow, exceptions, and authority collide.",
  },
];

export default function ProblemsPage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "Where Complex Workflows Stall",
          url: absoluteUrl("/problems"),
          description:
            "Executive operating problems that TKO diagnoses before recommending a system, tool, or automation.",
        }}
      />
      <PageHero
        eyebrow="Executive Discoverability"
        title="Your teams are working. Leadership still cannot see where the work is stuck."
        description="The issue is rarely effort or another dashboard. It is the hidden work between systems, handoffs, exceptions, and decisions that no one owns clearly enough to fix."
        primaryHref="/contact"
        primaryLabel="Discuss an Active Initiative"
        secondaryHref="/selected-work"
        secondaryLabel="Review Selected Work"
      />

      <Section className="bg-surface">
        <SectionHeader
          eyebrow="The Problems"
          title="Different symptoms. One missing operating layer."
          description="These problems look separate in a status meeting. In the workflow, they are usually connected: important context is scattered, decisions slow down, and action depends on manual reconstruction."
        />
        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {problems.map((problem) => (
            <Card key={problem.title} className="rounded-lg">
              <h2 className="text-2xl font-semibold">{problem.title}</h2>
              <p className="mt-4 text-base leading-7 text-muted">{problem.description}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section>
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeader
          eyebrow="What TKO Looks For"
          title="A visible symptom is not always the constraint."
          description="The assessment compares the intended workflow with the work people actually do, then identifies where context, authority, or a trusted next decision is missing."
          />
          <ol className="grid gap-3">
            {[
              "Work that requires manual reconstruction before someone can act.",
              "Handoffs, exceptions, or escalation paths that depend on specific people.",
              "Status reporting that describes activity but not current operational risk or required decision.",
              "Priorities that change by meeting, inbox, or the loudest request.",
              "AI or automation pressure without a clear authority, approval, or measurement model.",
            ].map((finding, index) => (
              <li key={finding} className="grid gap-5 border border-border p-5 sm:grid-cols-[3rem_1fr]">
                <span className="text-sm font-semibold uppercase tracking-[0.1em] text-primary">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <p className="text-base leading-7 text-muted">{finding}</p>
              </li>
            ))}
          </ol>
        </div>
      </Section>

      <Section className="bg-surface">
        <SectionHeader
          eyebrow="Guides"
          title="Read the pattern before choosing the fix."
          description="These guides explain the operating patterns behind the hub. They are not separate services or P1 problem pages."
        />
        <div className="mt-10 grid gap-4 lg:grid-cols-3">
          {relatedGuides.map((guide) => (
            <Card key={guide.href} className="flex min-h-64 flex-col rounded-lg">
              <h2 className="text-2xl font-semibold">{guide.title}</h2>
              <p className="mt-4 text-base leading-7 text-muted">{guide.description}</p>
              <Link
                href={guide.href}
                className="group mt-auto inline-flex items-center gap-2 pt-8 text-sm font-semibold uppercase tracking-[0.08em] text-primary hover:text-primary-dark"
              >
                Read guide
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </Link>
            </Card>
          ))}
        </div>
      </Section>

      <CtaBand
        title="Bring the workflow that is already under pressure."
        description="The recovery assessment identifies the hidden constraint, the decision-latency pattern, the dependency risk, and the next highest-leverage move."
      />
    </>
  );
}
