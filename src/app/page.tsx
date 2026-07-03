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
import { caseStudies, getCaseStudy } from "@/lib/content";
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

function requireCaseStudy(slug: string) {
  const study = getCaseStudy(slug);

  if (!study) {
    throw new Error(`Missing case study: ${slug}`);
  }

  return study;
}

const rachelProof = requireCaseStudy("from-crm-to-operating-system");
const creProof = requireCaseStudy("cre-intelligence-model");

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
            "Operational Knowledge Systems for complex workflows where critical knowledge, decisions, and context live inside people instead of systems.",
        }}
      />

      <Hero />

      <Section className="!py-16 md:!py-20">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <SectionHeader
              eyebrow="Healthcare Credibility"
              title="Healthcare workflow modernization, grounded in operating reality."
              description="Healthcare is the primary market wedge because the work is complex, regulated, cross-functional, and full of human API dependency. TKO's credibility sits in prior authorization, utilization management, care management, interoperability, regulatory programs, multi-team governance, and transformation recovery."
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
            <ArrowLink href="/services/prior-authorization-assessment" className="mt-8">
              Start with the Prior Authorization assessment
            </ArrowLink>
          </div>
          <ProblemGrid />
        </div>

        <div className="mt-10 grid gap-4 lg:grid-cols-3">
          {caseStudies
            .filter((study) => study.industry === "Healthcare")
            .map((study) => (
              <Card key={study.slug}>
                <p className="text-sm font-semibold uppercase tracking-[0.1em] text-muted">
                  {study.proofLevel}
                </p>
                <h3 className="mt-5 text-2xl font-semibold">{study.title}</h3>
                <p className="mt-4 text-base leading-7 text-muted">{study.problem}</p>
                <p className="mt-5 border-t border-border pt-5 text-sm leading-6 text-foreground">
                  <span className="font-semibold text-primary">Outcome — </span>
                  {study.outcome}
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
            eyebrow="Proof Ladder / 1"
            title="RachelOS proves TKO can build the operating layer."
            description="RachelOS is evidence that TKO has built the layer between scattered signals and action: operational memory, source-aware facts, priority surfacing, action queues, intelligence gaps, and human-approved AI support."
          />
          <Card className="w-full max-w-2xl justify-self-start">
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
            <p className="mt-5 border-t border-border pt-5 text-sm leading-6 text-foreground">
              <span className="font-semibold text-primary">Outcome — </span>
              {rachelProof.outcome}
            </p>
            <ArrowLink href="/selected-work/from-crm-to-operating-system" className="mt-8">
              See how RachelOS works
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
            eyebrow="Proof Ladder / 2"
            title="The operating-knowledge pattern travels beyond healthcare."
            description="CRE Intelligence demonstrates method portability: market observations, entity facts, analyst judgment, risks, opportunities, recommendations, and reports can become reusable decision assets instead of staying trapped in one analyst."
          />
          <Card className="w-full max-w-2xl justify-self-start">
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
            <p className="mt-5 border-t border-border pt-5 text-sm leading-6 text-foreground">
              <span className="font-semibold text-primary">Outcome — </span>
              {creProof.outcome}
            </p>
            <ArrowLink href="/selected-work/cre-intelligence-model" className="mt-8">
              View CRE proof
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
            Operating System Methodology
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
          eyebrow="Services"
          title="Start with recovery. Build only when the workflow truth is visible."
          description="The Operational Recovery Assessment is the low-friction entry point. The Operational Truth Diagnostic goes deeper when the workflow needs more evidence. Build and advisory work follow only when the operating problem is clear."
        />
        <div className="mt-10">
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
