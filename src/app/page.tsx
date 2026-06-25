import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Zap } from "lucide-react";
import { ServiceCards } from "@/components/site/cards";
import { CtaBand } from "@/components/site/cta-band";
import { Hero } from "@/components/site/hero";
import { JsonLd } from "@/components/site/json-ld";
import { OperatingFramework } from "@/components/site/operating-framework";
import { ProblemGrid } from "@/components/site/problem-grid";
import { Card } from "@/components/ui/card";
import { Section, SectionHeader } from "@/components/ui/section";
import { caseStudies } from "@/lib/content";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Operational Knowledge Systems for Complex Workflows",
  description:
    "TKO builds Operational Knowledge Systems for complex workflows where critical knowledge, decisions, and context live inside people instead of systems.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Operational Knowledge Systems for Complex Workflows",
    description:
      "Healthcare workflow modernization is the primary market wedge, backed by RachelOS proof and transferable operating-system methodology.",
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
            "Operational Knowledge Systems for complex workflows where critical knowledge, decisions, and context live inside people instead of systems.",
        }}
      />

      <Hero />

      <Section>
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <SectionHeader
              eyebrow="Primary Market"
              title="Healthcare Workflow Modernization"
              description="Healthcare is the primary market wedge because the work is complex, regulated, cross-functional, and full of human API dependency."
            />
            <ul className="mt-6 space-y-2 text-base leading-7 text-muted">
              <li>
                <Link
                  href="/services/prior-authorization-assessment"
                  className="font-medium text-foreground hover:text-primary hover:underline"
                >
                  Prior Authorization
                </Link>
              </li>
              <li>Utilization Management</li>
              <li>Administrative Burden</li>
              <li>AI Adoption</li>
              <li>Transformation Recovery</li>
            </ul>
            <Link
              href="/services/prior-authorization-assessment"
              className="mt-8 inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
            >
              Start with the Prior Authorization assessment
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
          <ProblemGrid />
        </div>
      </Section>

      <Section className="bg-surface">
        <SectionHeader
          eyebrow="Proof Ladder / 1"
          title="Healthcare Transformation Experience"
          description="TKO's healthcare credibility sits in prior authorization, utilization management, care management, interoperability, regulatory programs, multi-team governance, and transformation recovery."
        />
        <div className="mt-12 grid gap-4 lg:grid-cols-3">
          {caseStudies
            .filter((study) => study.industry === "Healthcare")
            .map((study) => (
              <Card key={study.slug}>
                <p className="text-sm font-semibold uppercase tracking-[0.1em] text-muted">
                  {study.proofLevel}
                </p>
                <h3 className="mt-5 text-2xl font-semibold">{study.title}</h3>
                <p className="mt-4 text-base leading-7 text-muted">{study.problem}</p>
                <Link
                  href={`/selected-work/${study.slug}`}
                  className="mt-8 inline-flex items-center gap-1.5 text-sm font-semibold uppercase tracking-[0.08em] text-primary"
                >
                  View selected work
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
              </Card>
            ))}
        </div>
      </Section>

      <Section>
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <SectionHeader
            eyebrow="Proof Ladder / 2"
            title="RachelOS proves TKO can build the operating layer."
            description="RachelOS is evidence that TKO has built the layer between scattered signals and action: operational memory, source-aware facts, priority surfacing, action queues, intelligence gaps, and human-approved AI support."
          />
          <div className="border border-border bg-white p-7">
            <p className="text-sm font-semibold uppercase tracking-[0.1em] text-primary">
              Problem
            </p>
            <p className="mt-3 text-base leading-7 text-muted">
              A business had 100+ relationships, fragmented information,
              inconsistent follow-up, knowledge trapped in one person&apos;s head,
              and no trusted next action.
            </p>
            <p className="mt-6 text-sm font-semibold uppercase tracking-[0.1em] text-primary">
              System
            </p>
            <p className="mt-3 text-base leading-7 text-muted">
              TKO built a governed operating layer that captures relationship
              knowledge, preserves institutional memory, surfaces priorities,
              recommends actions, and supports execution with human-approved AI.
            </p>
            <Link
              href="/selected-work/from-crm-to-operating-system"
              className="mt-8 inline-flex items-center gap-1.5 text-sm font-semibold uppercase tracking-[0.08em] text-primary"
            >
              See how RachelOS works
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </Section>

      <Section className="bg-surface">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <SectionHeader
            eyebrow="Proof Ladder / 3"
            title="The operating-knowledge pattern travels beyond healthcare."
            description="CRE Intelligence demonstrates method portability: market observations, entity facts, analyst judgment, risks, opportunities, recommendations, and reports can become reusable decision assets instead of staying trapped in one analyst."
          />
          <Card>
            <p className="text-sm font-semibold uppercase tracking-[0.1em] text-muted">
              Method portability
            </p>
            <h3 className="mt-5 text-2xl font-semibold">CRE Intelligence Model</h3>
            <p className="mt-4 text-base leading-7 text-muted">
              This is supporting proof, not a separate service line. It shows the
              same human API pattern in a different domain: expert judgment
              becomes structured facts, state, recommendations, comparisons, and
              reusable decision assets.
            </p>
            <Link
              href="/selected-work/cre-intelligence-model"
              className="mt-8 inline-flex items-center gap-1.5 text-sm font-semibold uppercase tracking-[0.08em] text-primary"
            >
              View CRE proof
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </Card>
        </div>
      </Section>

      <Section className="border-t-0 bg-midnight text-white">
        <div className="max-w-[65ch]">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.14em] text-primary-light">
            Proof Ladder / 4
          </p>
          <h2 className="text-3xl font-semibold leading-tight tracking-tight text-white md:text-5xl">
            Operating System Methodology
          </h2>
          <p className="mt-6 text-lg leading-8 text-white/60">
            Existing tools already capture signals. An Operational Knowledge
            System preserves memory, resolves facts, shows current state,
            identifies priority, recommends next action, routes human approval,
            and records outcomes.
          </p>
        </div>
        <div className="mt-14">
          <OperatingFramework />
        </div>
        <p className="mt-10 flex max-w-[65ch] items-start gap-3 text-sm leading-6 text-white/50">
          <Zap className="mt-0.5 size-4 shrink-0 text-primary-light" aria-hidden="true" />
          AI is useful only when it is tied to workflow, decision rights, and
          human approval. It supports the system; it is not the category.
        </p>
      </Section>

      <Section className="bg-surface">
        <SectionHeader
          eyebrow="Services"
          title="Start with recovery. Build only when the workflow truth is visible."
          description="The Operational Recovery Assessment is the low-friction entry point. The Operational Truth Diagnostic goes deeper when the workflow needs more evidence. Build and advisory work follow only when the operating problem is clear."
        />
        <div className="mt-12">
          <ServiceCards />
        </div>
      </Section>
      <CtaBand
        title="If critical work depends on human APIs, start with the recovery assessment."
        description="In one fixed-scope week, TKO maps the workflow, identifies bottlenecks and dependency risk, assesses AI readiness, and gives leadership the next highest-leverage move."
      />
    </>
  );
}
