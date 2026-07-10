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
  title: "Operational Bottlenecks and Workflow Recovery",
  description:
    "TKO helps leaders diagnose hidden work, decision latency, human API dependency, workflow friction, and operational visibility gaps before larger transformation spend.",
  alternates: { canonical: "/problems" },
  openGraph: {
    title: "Operational Bottlenecks and Workflow Recovery",
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
          name: "Operational Bottlenecks and Workflow Recovery",
          url: absoluteUrl("/problems"),
          description:
            "Executive operating problems that TKO diagnoses before recommending a system, tool, or automation.",
        }}
      />
      <PageHero
        eyebrow="Executive Discoverability"
        title="The work is moving. The operating truth is hidden."
        description="Leaders rarely need another status report. They need to see where work stalls, why decisions slow down, which person has become the undocumented system, and what should happen next."
        primaryHref="/assessment"
        primaryLabel="Explore the Operational Recovery Assessment"
        secondaryHref="/proof"
        secondaryLabel="Review the evidence"
      />

      <Section className="bg-surface">
        <SectionHeader
          eyebrow="The Problems"
          title="The failures are different on the surface. The operating pattern is the same."
          description="Information is captured, but the path from signal to accountable action is not designed, governed, or visible. These are the problem types TKO investigates."
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
            title="A visible symptom is not always the operating constraint."
            description="The assessment starts with the real workflow: what is supposed to happen, what actually happens, where work waits, who supplies missing context, and which decision no system currently produces."
          />
          <ol className="grid gap-3">
            {[
              "Work that requires manual reconstruction before someone can act.",
              "Handoffs, exceptions, or escalation paths that depend on specific people.",
              "Status reporting that describes activity but not current operational risk.",
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
          title="Existing guidance for leaders diagnosing the problem."
          description="These evidence-led guides provide operating context without creating unsupported claims or prematurely packaging an unfinished capability."
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
        title="Start with the workflow that is already under pressure."
        description="The Operational Recovery Assessment identifies the bottleneck, the decision-latency pattern, the dependency risk, and the next highest-leverage move."
      />
    </>
  );
}
