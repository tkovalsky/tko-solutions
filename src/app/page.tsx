import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Zap } from "lucide-react";
import { CredibilityStrip } from "@/components/site/credibility-strip";
import { CtaBand } from "@/components/site/cta-band";
import { EngagementPath } from "@/components/site/engagement-path";
import { Hero } from "@/components/site/hero";
import { JsonLd } from "@/components/site/json-ld";
import { ProblemGrid } from "@/components/site/problem-grid";
import { ArrowLink } from "@/components/ui/arrow-link";
import { Card } from "@/components/ui/card";
import { Section, SectionHeader } from "@/components/ui/section";
import { caseStudies } from "@/lib/content";
import { absoluteUrl, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Transformation & Program Recovery for Healthcare & Regulated Operations",
  description:
    "TKO is an independent transformation and program recovery advisor for healthcare and regulated operations. Find where large initiatives are actually failing, and what to fix first, with evidence you can inspect.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Transformation & Program Recovery",
    description:
      "Independent, evidence-based assessment of where transformation and modernization programs are actually failing, and what to fix first.",
    url: absoluteUrl("/"),
  },
};

const strategyLadder = [
  {
    stage: "Strategy",
    description:
      "Name the executive decision and the operating problem it has to resolve.",
  },
  {
    stage: "Operating Model",
    description:
      "Define decision rights, ownership, escalation, and how work should actually run.",
  },
  {
    stage: "Product",
    description:
      "Build the AI-enabled systems the operating model requires, not a generic platform.",
  },
  {
    stage: "Implementation",
    description:
      "Put it into production with human control, adoption, and measurable results.",
  },
];

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
            "Independent transformation and program recovery for healthcare and regulated operations: evidence-based assessment of where large initiatives are actually failing.",
        }}
      />

      <Hero />

      <CredibilityStrip />

      <Section className="!py-16 md:!py-20">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <SectionHeader
              eyebrow="The Operating Problem"
              title="Complex operations don't fail from bad strategy. They fail between strategy and execution."
              description="The gap usually lives in the handoff from executive decision to operating model to system to daily work. That is where capacity disappears, customers wait, revenue leaks, and leaders lose the ability to act with confidence."
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
                  <span className="font-semibold text-primary">Evidence scope: </span>
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
        <SectionHeader
          eyebrow="How TKO works"
          title="Assessment first, then only the work the evidence supports."
          description="TKO diagnoses where the initiative is failing before recommending a fix. When deeper work is warranted it runs across four stages, strategy, operating model, product, and implementation, but the default first step is a bounded assessment, not a full program."
        />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {strategyLadder.map((step, index) => (
            <Card key={step.stage}>
              <p className="text-sm font-semibold uppercase tracking-[0.1em] text-primary">
                {String(index + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-4 text-xl font-semibold">{step.stage}</h3>
              <p className="mt-3 text-base leading-7 text-muted">{step.description}</p>
            </Card>
          ))}
        </div>

        <div className="mt-14 grid gap-10 border-t border-border pt-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.1em] text-muted">
              Method &amp; Evidence Proof
            </p>
            <h3 className="mt-4 text-2xl font-semibold leading-tight">
              RachelOS: proof the evidence method holds in production.
            </h3>
            <p className="mt-4 text-base leading-7 text-muted">
              RachelOS is the reference implementation of how TKO works, not the
              product TKO sells. It is a live system, built and audited in
              public, where every capability is graded implemented, activated,
              validated, or unvalidated. It shows the same evidence discipline
              TKO brings to a transformation or program assessment. What
              transfers is the method and its governance, not the software.
            </p>
            <ArrowLink href="/proof/rachelos" className="mt-6">
              Review the RachelOS evidence
            </ArrowLink>
            <ArrowLink href="/proof/transfer" className="mt-3">
              Why this matters outside real estate
            </ArrowLink>
          </div>
          <div className="grid gap-4 lg:grid-cols-3">
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
        </div>
      </Section>

      <Section className="!py-16 md:!py-20">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <SectionHeader
            eyebrow="Healthcare Background"
            title="The same failure pattern appears wherever executive strategy crosses teams."
            description="Healthcare transformation, complex service delivery, and enterprise operations all expose the same problem: strategy is set, but the operating model, product, and implementation needed to carry it out never fully arrive."
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
              <span className="font-semibold text-primary">Operating lesson: </span>
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
            Why TKO
          </p>
          <h2 className="text-3xl font-semibold leading-tight tracking-tight text-white md:text-5xl">
            Most programs do not fail for lack of a plan. They fail where the work crosses teams.
          </h2>
          <p className="mt-6 text-lg leading-8 text-white/60">
            Status reports show green while risk accumulates between workstreams.
            TKO finds where the work is actually stuck, who owns the next
            decision, and what to fix before more budget is committed.
          </p>
        </div>
        <p className="mt-10 flex max-w-[65ch] items-start gap-3 text-sm leading-6 text-white/50">
          <Zap className="mt-0.5 size-4 shrink-0 text-primary-light" aria-hidden="true" />
          AI matters only when it improves a real workflow with clear ownership
          and human accountability. It is one tool among several, never the
          reason to engage TKO.
        </p>
      </Section>

      <Section className="bg-surface !py-16 md:!py-20">
        <SectionHeader
          eyebrow="Engagement Path"
          title="Engagement starts small and sequential: assessment first, build only when the case is clear."
          description="Every engagement begins with a fixed-scope assessment of the operating problem and the decision it is blocking. Deeper work follows only when the evidence supports it."
        />
        <div className="mt-10">
          <EngagementPath />
        </div>
      </Section>
      <CtaBand
        title="Bring the initiative that is not landing."
        description="Describe the transformation, program, or workflow under pressure. TKO will help determine where execution is breaking down and what deserves action first."
        primaryLabel={site.cta}
        secondaryHref="/selected-work"
        secondaryLabel="Review Selected Work"
      />
    </>
  );
}
