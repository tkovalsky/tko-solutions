import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Zap } from "lucide-react";
import { CaseStudyCards, ServiceCards } from "@/components/site/cards";
import { CtaBand } from "@/components/site/cta-band";
import { Founder } from "@/components/site/founder";
import { Hero } from "@/components/site/hero";
import { IndustryPattern } from "@/components/site/industry-pattern";
import { JsonLd } from "@/components/site/json-ld";
import { OperatingFramework } from "@/components/site/operating-framework";
import { ProblemGrid } from "@/components/site/problem-grid";
import { Section, SectionHeader } from "@/components/ui/section";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "The Missing Layer Between Data and Action",
  description:
    "TKO Solutions builds Operational Intelligence Systems that help teams turn existing data into priorities, decisions, and trusted next actions.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "The Missing Layer Between Data and Action",
    description:
      "Most organizations collect information. TKO helps them identify what matters, who needs attention, and what should happen next.",
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
            "Operational Intelligence Systems that turn existing data into priorities, decisions, and action.",
        }}
      />

      <Hero />

      <Section>
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <SectionHeader
              eyebrow="The Business Problem"
              title="Your organization has data. It lacks a decision system."
              description="Dashboards show activity. CRMs store history. Reports summarize what happened. The missing layer is the one that tells leaders what matters, who needs attention, and what action should happen next."
            />
            <Link
              href="/industries"
              className="mt-8 inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
            >
              See where this shows up
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
          <ProblemGrid />
        </div>
      </Section>

      <Section className="bg-surface">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <SectionHeader
            eyebrow="Featured Proof"
            title="RachelOS proves the decision-system problem in a live operating environment."
            description="RachelOS is evidence that TKO has built the layer between relationship data and action in a live operating environment: operational memory, priority surfacing, action queues, and human-approved AI support."
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
              TKO built an Operational Intelligence System that captures
              relationship knowledge, preserves institutional memory, surfaces
              priorities, recommends actions, and supports execution with
              human-approved AI.
            </p>
            <Link
              href="/case-studies/from-crm-to-operating-system"
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
          eyebrow="Industries"
          title="Different industries. The same gap between information and action."
          description="Healthcare, Financial Services, Technology, and Private Equity all face the same operating problem when workflow complexity outruns decision visibility."
        />
        <div className="mt-12">
          <IndustryPattern />
        </div>
      </Section>

      <Section>
        <SectionHeader
          eyebrow="Proof"
          title="RachelOS is featured proof. Enterprise work supports the pattern."
          description="The case studies are sequenced to show the problem first, RachelOS as live proof second, and anonymized enterprise healthcare work as supporting credibility."
        />
        <div className="mt-12">
          <CaseStudyCards />
        </div>
      </Section>

      <Section className="bg-surface">
        <SectionHeader
          eyebrow="Services"
          title="Diagnose the decision gap. Then build or govern the system."
          description="The Operational Diagnostic is the paid front door. Build and Fractional Advisor engagements follow when evidence shows what should be built, governed, or improved."
        />
        <div className="mt-12">
          <ServiceCards />
        </div>
      </Section>

      <Section>
        <Founder />
      </Section>

      <CtaBand
        title="Data does not create decisions by itself."
        description="TKO helps leadership teams identify what matters, who needs attention, and what action should happen next."
      />
    </>
  );
}
