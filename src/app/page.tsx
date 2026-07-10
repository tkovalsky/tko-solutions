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
  title: "Where Complex Workflows Stall",
  description:
    "TKO helps healthcare and complex-operations leaders identify hidden work, recover stalled workflows, and decide what to fix before committing to the next solution.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Where Complex Workflows Stall",
    description:
      "Make hidden work visible, recover stalled workflows, and build systems of action from evidence.",
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
              title="Work crosses systems. The decision does not."
              description="Teams are busy, dashboards are current, and governance meetings are happening. The real problem is the work between handoffs, exceptions, and disputed facts—where leadership cannot see the constraint clearly enough to act."
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
              <li>Decision latency</li>
              <li>Human API dependency</li>
              <li>Workflow recovery</li>
              <li>Systems of action</li>
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
            title="RachelOS proves the operating pattern in a live environment."
            description="It is a founder-built system in daily use: relationship memory, source-aware facts, priority surfacing, action queues, intelligence gaps, and human approval before AI-assisted action."
          />
          <Card className="w-full max-w-2xl justify-self-start">
            <p className="text-sm font-semibold uppercase tracking-[0.1em] text-primary">
              Problem
            </p>
            <p className="mt-3 text-base leading-7 text-muted">
              A relationship-driven business had fragmented information,
              inconsistent follow-up, knowledge trapped in one person&apos;s head,
              and no trusted next action.
            </p>
            <p className="mt-6 text-sm font-semibold uppercase tracking-[0.1em] text-primary">
              System
            </p>
            <p className="mt-3 text-base leading-7 text-muted">
              TKO built a governed operating layer that preserves relationship
              knowledge, surfaces priority, produces a trusted action queue, and
              keeps AI-assisted recommendations behind human approval.
            </p>
            <p className="mt-5 border-t border-border pt-5 text-sm leading-6 text-foreground">
              <span className="font-semibold text-primary">Direct proof — </span>
              Durable memory, a canonical queue, and a human approval gate are visible in the built system.
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
            title="The operating failure repeats across high-stakes work."
            description="Healthcare transformation experience supplies the operating context: prior authorization, utilization management, care management, interoperability, regulatory programs, and multi-team governance all expose the same hidden-work and decision-latency pattern."
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
            Start with operating truth, not a platform.
          </h2>
          <p className="mt-6 text-lg leading-8 text-white/60">
            Existing tools already capture signals. An Operational Knowledge
            System preserves memory, resolves facts, shows current state,
            identifies priority, recommends next action, routes human approval,
            and records outcomes.
          </p>
        </div>
        <div className="mt-10">
          <OperatingFramework />
        </div>
        <p className="mt-8 flex max-w-[65ch] items-start gap-3 text-sm leading-6 text-white/50">
          <Zap className="mt-0.5 size-4 shrink-0 text-primary-light" aria-hidden="true" />
          AI is useful only when it is tied to workflow, decision rights, and
          human approval. It supports the system; it is not the category.
        </p>
      </Section>

      <Section className="bg-surface !py-16 md:!py-20">
        <SectionHeader
          eyebrow="Engagement Path"
          title="Start with recovery. Build only when the workflow truth is visible."
          description="The one-week Operational Recovery Assessment is the fixed-scope first step. It identifies the operating constraint, the decision leadership needs to make, and whether a deeper diagnostic or build is justified."
        />
        <div className="mt-10">
          <ServiceCards />
        </div>
      </Section>
      <CtaBand
        title="If execution depends on hidden work, start with the recovery assessment."
        description="In one fixed-scope week, TKO maps the workflow, identifies the decision-latency pattern, assesses dependency risk, and gives leadership the next highest-leverage move."
      />
    </>
  );
}
