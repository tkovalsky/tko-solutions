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

      <Hero />

      <Section>
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <SectionHeader
              eyebrow="Problem Architecture"
              title="The issue is not effort. It is visibility into actual work."
              description="TKO organizes expertise around operating problems, not industries. Healthcare is the launch wedge because these problems are urgent and proof-backed there."
            />
            <Link
              href="/industries"
              className="mt-8 inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
            >
              See how we think about problems
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
          <ProblemGrid />
        </div>
      </Section>

      <Section className="border-t-0 bg-midnight text-white">
        <div className="max-w-[65ch]">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.14em] text-primary-light">
            Operating Intelligence Framework
          </p>
          <h2 className="text-3xl font-semibold leading-tight tracking-tight text-white md:text-5xl">
            The system that turns scattered signals into governed action.
          </h2>
          <p className="mt-6 text-lg leading-8 text-white/60">
            This is the TKO operating model: signals become memory, memory becomes
            governed facts, facts become visible state, state produces one canonical
            action, a human approves it, and results are measured as outcomes.
          </p>
        </div>
        <div className="mt-14">
          <OperatingFramework />
        </div>
        <p className="mt-10 flex max-w-[65ch] items-start gap-3 text-sm leading-6 text-white/50">
          <Zap className="mt-0.5 size-4 shrink-0 text-primary-light" aria-hidden="true" />
          AI is a controlled mechanism inside the operating system. It does not replace
          human decision authority, and it does not become the category.
        </p>
      </Section>

      <Section className="bg-surface">
        <SectionHeader
          eyebrow="Industries"
          title="Different industries. The same invisible operating failure."
          description="TKO is not organized as separate vertical businesses. Healthcare, Financial Services, Wealth and Asset Management, and Capital Markets Operations are examples of one operational complexity pattern."
        />
        <div className="mt-12">
          <IndustryPattern />
        </div>
      </Section>

      <Section>
        <SectionHeader
          eyebrow="Proof"
          title="Healthcare proof first. Secondary industries support the pattern."
          description="Production system proof, anonymized enterprise healthcare work, and cross-industry pattern recognition."
        />
        <div className="mt-12">
          <CaseStudyCards />
        </div>
      </Section>

      <Section className="bg-surface">
        <SectionHeader
          eyebrow="Service Ladder"
          title="One entry point. Two downstream paths."
          description="The Diagnostic is the paid front door. Build and Fractional Advisor engagements follow when operational truth identifies what should be built or governed."
        />
        <div className="mt-12">
          <ServiceCards />
        </div>
      </Section>

      <Section>
        <Founder />
      </Section>

      <CtaBand
        title="Technology won't fix what you can't see."
        description="TKO brings clarity to complexity so organizations can move with confidence."
      />
    </>
  );
}
