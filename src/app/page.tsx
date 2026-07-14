import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Zap } from "lucide-react";
import { ServiceCards } from "@/components/site/cards";
import { CtaBand } from "@/components/site/cta-band";
import { Hero } from "@/components/site/hero";
import { JsonLd } from "@/components/site/json-ld";
import { ProblemGrid } from "@/components/site/problem-grid";
import { ArrowLink } from "@/components/ui/arrow-link";
import { Card } from "@/components/ui/card";
import { Section, SectionHeader } from "@/components/ui/section";
import { caseStudies } from "@/lib/content";
import { absoluteUrl, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Executive Strategy Through Implementation",
  description:
    "TKO helps healthcare and enterprise leaders turn complex operating problems into working strategy, operating models, products, and AI-enabled systems—from executive decision through production implementation.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Executive Strategy Through Implementation",
    description:
      "Strategy, operating model, product, and implementation—one accountable path from executive decision to production.",
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
      "Build the AI-enabled systems the operating model requires—not a generic platform.",
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
            "Executive strategy through implementation for complex operations: strategy, operating model, product, and production implementation.",
        }}
      />

      <Hero />

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
        <SectionHeader
          eyebrow="How TKO Works"
          title="Strategy → Operating Model → Product → Implementation."
          description="One accountable path from executive decision to production system. Most engagements start at the stage the business actually needs—not at the top of a generic methodology."
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
              Supporting Proof
            </p>
            <h3 className="mt-4 text-2xl font-semibold leading-tight">
              RachelOS: Product and Implementation, in production.
            </h3>
            <p className="mt-4 text-base leading-7 text-muted">
              RachelOS is a live South Florida real-estate operating system—one
              proof point for how TKO carries a strategy through to a running
              product. It preserves relationship context, surfaces the next
              priority, automates nurture, and keeps AI-assisted recommendations
              under human control.
            </p>
            <ArrowLink href="/proof/rachelos" className="mt-6">
              Review the RachelOS evidence
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
            Why TKO
          </p>
          <h2 className="text-3xl font-semibold leading-tight tracking-tight text-white md:text-5xl">
            Executives don&apos;t lack strategy. They lack a partner who will carry it through implementation.
          </h2>
          <p className="mt-6 text-lg leading-8 text-white/60">
            A strategy deck does not change how work runs. TKO stays accountable
            through the operating model, the product build, and the production
            implementation—the stages where most transformation spend stalls.
          </p>
        </div>
        <p className="mt-10 flex max-w-[65ch] items-start gap-3 text-sm leading-6 text-white/50">
          <Zap className="mt-0.5 size-4 shrink-0 text-primary-light" aria-hidden="true" />
          AI is useful only when it improves a real workflow with clear ownership
          and human accountability. It is a tool—not the reason to engage TKO.
        </p>
      </Section>

      <Section className="bg-surface !py-16 md:!py-20">
        <SectionHeader
          eyebrow="Engagement Path"
          title="Start at the stage the business needs. Build only when the case is clear."
          description="TKO begins by identifying the operating problem, the executive decision it is blocking, and the highest-leverage stage—strategy, operating model, product, or implementation—before recommending a larger build."
        />
        <div className="mt-10">
          <ServiceCards />
        </div>
      </Section>
      <CtaBand
        title="Your strategy is only as good as what gets built and shipped."
        description="Bring the operating problem, decision, or system that needs to move from strategy to production. TKO will help determine what deserves action first."
        primaryLabel={site.cta}
        secondaryHref="/selected-work"
        secondaryLabel="Review Selected Work"
      />
    </>
  );
}
