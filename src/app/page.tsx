import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Zap } from "lucide-react";
import { CaseStudyCards, ServiceCards } from "@/components/site/cards";
import { CtaBand } from "@/components/site/cta-band";
import { Founder } from "@/components/site/founder";
import { Hero } from "@/components/site/hero";
import { JsonLd } from "@/components/site/json-ld";
import { OperatingFramework } from "@/components/site/operating-framework";
import { ProblemGrid } from "@/components/site/problem-grid";
import { Section, SectionHeader } from "@/components/ui/section";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "The Missing Layer Between Data and Action",
  description:
    "TKO helps Director+ healthcare and enterprise operations leaders decide where AI and workflow spend should go, then build governed decision layers.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "The Missing Layer Between Data and Action",
    description:
      "For leaders with AI budgets and unclear spend paths: diagnose where complex work stalls, then build the governed decision layer.",
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
            "Operational Truth Diagnostics and decision-layer builds for healthcare and enterprise operations leaders with AI or workflow budget.",
        }}
      />

      <Hero />

      <Section>
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <SectionHeader
              eyebrow="The Business Problem"
              title="Your organization has AI budget. It still may not know what to fix."
              description="Most teams do not fail because they lack tools. They fail because work stalls between systems, meetings, dashboards, and a few key people. TKO starts by finding the workflow truth before larger AI spend is committed."
            />
            <Link
              href="/services/diagnostic"
              className="mt-8 inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
            >
              See the diagnostic
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
          <ProblemGrid />
        </div>
      </Section>

      <Section>
        <SectionHeader
          eyebrow="Selected Work"
          title="The point of view is earned from work across healthcare, program recovery, and RachelOS."
          description="The evidence starts with real operating problems: prior authorization complexity, enterprise dependency risk, interoperability governance, and a live relationship operating system that proves the pattern travels."
        />
        <div className="mt-12">
          <CaseStudyCards />
        </div>
      </Section>

      <Section className="bg-surface">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <SectionHeader
            eyebrow="Featured Proof"
            title="RachelOS proves the human-API problem in a live operating environment."
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
              TKO built a decision layer that captures
              relationship knowledge, preserves institutional memory, surfaces
              priorities, recommends actions, and supports execution with
              human-approved AI.
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

      <Section className="border-t-0 bg-midnight text-white">
        <div className="max-w-[65ch]">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.14em] text-primary-light">
            Operational Intelligence System
          </p>
          <h2 className="text-3xl font-semibold leading-tight tracking-tight text-white md:text-5xl">
            The decision layer between data and action.
          </h2>
          <p className="mt-6 text-lg leading-8 text-white/60">
            Existing tools already capture signals. The Operational Intelligence
            layer preserves memory, resolves facts, shows current state,
            identifies priorities, routes human approval, and moves teams toward
            the next action.
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
          title="Diagnose where to spend. Then build or govern the system."
          description="The Recovery Assessment gives fast spend clarity. The Operational Truth Diagnostic goes deeper when the workflow needs more evidence. Build and Fractional Advisor engagements follow when the next system or governance model is clear."
        />
        <div className="mt-12">
          <ServiceCards />
        </div>
      </Section>

      <Section>
        <Founder />
      </Section>

      <CtaBand
        title="Do not spend the AI budget before the operating truth is visible."
        description="TKO helps leadership teams identify where work stalls, where AI can safely help, and what action should happen next."
      />
    </>
  );
}
