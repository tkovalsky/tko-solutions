import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Zap } from "lucide-react";
import { ServiceCards } from "@/components/site/cards";
import { CtaBand } from "@/components/site/cta-band";
import { Hero } from "@/components/site/hero";
import { JsonLd } from "@/components/site/json-ld";
import { OperatingFramework } from "@/components/site/operating-framework";
import { ProblemGrid } from "@/components/site/problem-grid";
import { ArrowLink } from "@/components/ui/arrow-link";
import { Card } from "@/components/ui/card";
import { Section, SectionHeader } from "@/components/ui/section";
import { caseStudies } from "@/lib/content";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Find the Constraints Holding Performance Back",
  description:
    "TKO helps leaders identify operational bottlenecks, decision gaps, and revenue leakage—then build systems that improve execution.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Find the Constraints Holding Performance Back",
    description:
      "Find bottlenecks, reduce execution drag, and build systems that make the business run better.",
    url: absoluteUrl("/"),
  },
};

const rachelosProofStrip = [
  {
    title: "Queue",
    image: "/proof/rachelos/canonical-queue.png",
    alt: "RachelOS queue showing ranked leads, action counts, and queue sections.",
  },
  {
    title: "Approval",
    image: "/proof/rachelos/human-approval.png",
    alt: "RachelOS human approval surface for relationship updates and recommended questions.",
  },
  {
    title: "Memory",
    image: "/proof/rachelos/relationship-memory.png",
    alt: "RachelOS relationship memory workspace showing current reality and next action.",
  },
];

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
            "Operational recovery for complex workflows where critical knowledge, decisions, and context live inside people instead of systems.",
        }}
      />

      <Hero />

      <Section className="!py-16 md:!py-20">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <SectionHeader
              eyebrow="The Operating Problem"
              title="The work is getting done. The business is still losing time, margin, and momentum."
              description="The drag is usually hidden between handoffs, exceptions, and delayed decisions. That is where capacity disappears, customers wait, revenue leaks, and leaders lose the ability to act with confidence."
            />
            <ul className="mt-6 space-y-2 text-base leading-7 text-muted">
              <li>
                <Link
                  href="/problems"
                  className="font-medium text-foreground hover:text-primary hover:underline"
                >
                  Operational bottlenecks
                </Link>
              </li>
              <li>Slow or unclear decisions</li>
              <li>Key-person dependency</li>
              <li>Revenue and capacity leakage</li>
              <li>Transformation spend without operational improvement</li>
            </ul>
            <ArrowLink href="/problems" className="mt-8">
              Explore the operating problems
            </ArrowLink>
          </div>
          <ProblemGrid />
        </div>

        <div className="mt-10 grid gap-4 lg:grid-cols-3">
          {caseStudies
            .filter((study) => study.industry === "Healthcare")
            .slice(0, 2)
            .map((study) => (
              <Card key={study.slug}>
                <p className="text-sm font-semibold uppercase tracking-[0.1em] text-muted">
                  {study.proofLevel}
                </p>
                <h3 className="mt-5 text-2xl font-semibold">{study.title}</h3>
                <p className="mt-4 text-base leading-7 text-muted">{study.problem}</p>
                <p className="mt-5 border-t border-border pt-5 text-sm leading-6 text-foreground">
                  <span className="font-semibold text-primary">Evidence scope — </span>
                  {study.evidence[0]}
                </p>
                <ArrowLink href={`/selected-work/${study.slug}`} className="mt-8">
                  View selected work
                </ArrowLink>
              </Card>
            ))}
        </div>
      </Section>

      <Section className="bg-surface !py-16 md:!py-20">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <SectionHeader
            eyebrow="Built Proof"
            title="RachelOS proves TKO can turn scattered information into daily revenue work."
            description="RachelOS is a live South Florida real-estate operating system. It preserves relationship context, surfaces the next priority, automates nurture, and keeps AI-assisted recommendations under human control."
          />
          <Card className="w-full max-w-2xl justify-self-start">
            <p className="text-sm font-semibold uppercase tracking-[0.1em] text-primary">
              Problem
            </p>
            <p className="mt-3 text-base leading-7 text-muted">
              A real estate business had fragmented information, inconsistent
              follow-up, knowledge trapped in one person&apos;s head, and no reliable
              way to see which relationship or transaction needed attention next.
            </p>
            <p className="mt-6 text-sm font-semibold uppercase tracking-[0.1em] text-primary">
              System
            </p>
            <p className="mt-3 text-base leading-7 text-muted">
              TKO built the operating system: durable relationship memory, a
              prioritized action queue, automated email nurture, and human-approved
              AI assistance for the work that requires judgment.
            </p>
            <p className="mt-5 border-t border-border pt-5 text-sm leading-6 text-foreground">
              <span className="font-semibold text-primary">Direct proof — </span>
              The live site has supported three closed transactions—one rental with
              future purchase intent, one sale, and one purchase—alongside active
              conversations and automated nurture.
            </p>
            <ArrowLink href="/proof/rachelos" className="mt-8">
              Review the RachelOS evidence
            </ArrowLink>
          </Card>
        </div>
        <div className="mt-10 grid gap-4 lg:grid-cols-3">
          {rachelosProofStrip.map((asset) => (
            <figure
              key={asset.title}
              className="overflow-hidden border border-border bg-white"
            >
              <div className="relative aspect-[4/3] bg-background">
                <Image
                  src={asset.image}
                  alt={asset.alt}
                  fill
                  className="object-cover object-top"
                  sizes="(min-width: 1024px) 33vw, 100vw"
                />
              </div>
              <figcaption className="border-t border-border px-5 py-4 text-sm font-semibold text-foreground">
                RachelOS {asset.title}
              </figcaption>
            </figure>
          ))}
        </div>
      </Section>

      <Section className="!py-16 md:!py-20">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <SectionHeader
            eyebrow="Healthcare Background"
            title="The same failure pattern appears wherever execution crosses teams."
            description="Healthcare transformation, complex service delivery, and revenue operations all expose the same problem: critical context is fragmented, exceptions are handled manually, and leaders cannot see the next decision soon enough."
          />
          <Card className="w-full max-w-2xl justify-self-start">
            <p className="text-sm font-semibold uppercase tracking-[0.1em] text-muted">
              Advisory background
            </p>
            <h3 className="mt-5 text-2xl font-semibold">Healthcare Transformation</h3>
            <p className="mt-4 text-base leading-7 text-muted">
              Prior authorization redesign, care-management modernization, and
              interoperability work show why the same operating pattern matters
              where administrative burden, exception handling, auditability, and
              multi-team dependencies are real constraints.
            </p>
            <p className="mt-5 border-t border-border pt-5 text-sm leading-6 text-foreground">
              <span className="font-semibold text-primary">Operating lesson — </span>
              Identify the dependency, make the decision path explicit, and build
              only after the operating truth is visible.
            </p>
            <ArrowLink href="/proof" className="mt-8">
              Review the proof registry
            </ArrowLink>
          </Card>
        </div>
      </Section>

      <Section className="border-t-0 bg-midnight text-white !py-16 md:!py-20">
        <div className="max-w-[65ch]">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.14em] text-primary-light">
            Methodology
          </p>
          <h2 className="text-3xl font-semibold leading-tight tracking-tight text-white md:text-5xl">
            Fix the constraint before you fund the solution.
          </h2>
          <p className="mt-6 text-lg leading-8 text-white/60">
            Your business may not need another platform. It needs a clear view of
            what is blocking performance, who owns the next decision, and the
            smallest change that will improve the result.
          </p>
        </div>
        <div className="mt-10">
          <OperatingFramework />
        </div>
        <p className="mt-8 flex max-w-[65ch] items-start gap-3 text-sm leading-6 text-white/50">
          <Zap className="mt-0.5 size-4 shrink-0 text-primary-light" aria-hidden="true" />
          AI is useful only when it improves a real workflow with clear ownership
          and human accountability. It is a tool—not the reason to engage TKO.
        </p>
      </Section>

      <Section className="bg-surface !py-16 md:!py-20">
        <SectionHeader
          eyebrow="Engagement Path"
          title="Start with the operating problem. Build only when the business case is clear."
          description="TKO begins by identifying the constraint, the business decision it is blocking, and the highest-leverage move—before recommending a larger transformation or technology investment."
        />
        <div className="mt-10">
          <ServiceCards />
        </div>
      </Section>
      <CtaBand
        title="Your team already knows where it hurts. TKO finds what is causing it."
        description="Start with an executive conversation about the workflow, revenue process, or transformation effort that is not performing the way it should."
      />
    </>
  );
}
