import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  ShieldCheck,
  Cpu,
  CheckCircle2,
  Lock,
} from "lucide-react";
import { CtaBand } from "@/components/site/cta-band";
import { JsonLd } from "@/components/site/json-ld";
import { LinkButton } from "@/components/ui/button";
import { Section, SectionHeader } from "@/components/ui/section";
import { VideoEmbed } from "@/components/media/video-embed";
import { site, absoluteUrl } from "@/lib/site";

const title = "Enterprise Transformation & Governed AI Operating Systems";
const description =
  "Todd Kovalsky translates healthcare mandates into executable payer workflows, and replaces commoditized lead aggregators with governed, high-consideration AI operating systems.";

export const metadata: Metadata = {
  title: { absolute: `TKO Solutions | ${title}` },
  description,
  alternates: { canonical: "/" },
  openGraph: {
    title,
    description,
    url: absoluteUrl("/"),
    images: [
      {
        url: site.socialImage,
        width: 1200,
        height: 630,
        alt: "TKO Solutions: Enterprise Transformation & Governed AI Operating Systems.",
      },
    ],
  },
};

const implementationChain = [
  "Policy",
  "Obligation",
  "Capability",
  "Workflow",
  "System",
  "Control",
  "Owner",
  "Evidence",
  "Outcome",
] as const;

const rachelosProofScreens = [
  {
    title: "Exact-Message Human Approval",
    subtitle: "Zero autonomous sends",
    description:
      "Model outputs draft outreach with cited facts, but an authenticated human operator approves the exact message before a single byte leaves the server.",
    image: "/proof/rachelos/human-approval.png",
  },
  {
    title: "The Canonical Priority Queue",
    subtitle: "Computed next-best action",
    description:
      "A deterministic queue recomputing active work and relationship state across 114 database migrations. No unowned leads or buried follow-up.",
    image: "/proof/rachelos/canonical-queue.png",
  },
  {
    title: "Computed Relationship Memory",
    subtitle: "Institutional continuity",
    description:
      "Persistent timeline, source quote provenance, and open intelligence gaps held inside the operating system, rather than trapped in an employee's head.",
    image: "/proof/rachelos/relationship-memory.png",
  },
  {
    title: "System Health & Orchestration",
    subtitle: "Observable daily runs",
    description:
      "Scheduled jobs, failure classification, audit spans with correlation IDs, and rate-limit alarms. Running software with inspectable telemetry.",
    image: "/proof/rachelos/system-health.png",
  },
];

export default function HomePage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ProfessionalService",
          name: "TKO Solutions",
          url: absoluteUrl("/"),
          description,
          founder: {
            "@type": "Person",
            name: "Todd Kovalsky",
            url: absoluteUrl("/founder"),
            jobTitle: "Founder & Principal",
          },
        }}
      />

      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-midnight text-white">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgb(var(--accent-rgb)/0.22),_transparent_60%)]"
        />
        <div className="relative mx-auto w-full max-w-7xl px-6 py-16 lg:px-8 lg:py-24">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary-light/30 bg-primary/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-primary-light">
            <ShieldCheck className="size-3.5" />
            20 Years of Regulated Operations · Human Approval Before AI Outreach
          </div>

          <h1 className="mt-6 max-w-5xl text-[2.25rem] font-bold leading-[1.06] tracking-tight sm:text-5xl lg:text-[4.25rem]">
            When work gets complex, model calls are cheap.{" "}
            <span className="text-primary-light">
              Decision governance is what prevents disaster.
            </span>
          </h1>

          <p className="mt-8 max-w-[72ch] text-lg leading-8 text-white/80 sm:text-xl sm:leading-9">
            Todd Kovalsky spent 20 years in high-consequence enterprise operations: Apollo Global
            Management after the 2008 restructuring cycle, Goldman Sachs Asset Management at
            Sapient, JPMorgan, and national health plan transformations. TKO constructs the
            deterministic fact layers, exception workflows, and human approval gates required to
            run mission-critical operations safely.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
            <LinkButton
              href="/healthcare/impact-assessment"
              ctaLocation="homepage_hero"
              className="bg-primary hover:bg-primary-dark"
            >
              Inspect the Healthcare Decision Lab
            </LinkButton>
            <LinkButton
              href="/selected-work/from-crm-to-operating-system"
              ctaLocation="homepage_hero"
              variant="secondary"
              className="border-white/35 text-white hover:border-white/60 hover:bg-white/10"
            >
              See RachelOS Architecture (~2,400 Commits)
            </LinkButton>
          </div>

          {/* Quick Founder Credibility Strip */}
          <div className="mt-12 grid grid-cols-2 gap-4 border-t border-white/15 pt-8 sm:grid-cols-4">
            <div>
              <p className="text-2xl font-bold tracking-tight text-white">20+ Years</p>
              <p className="mt-1 text-xs uppercase tracking-wider text-white/60">
                Regulated Operations
              </p>
            </div>
            <div>
              <p className="text-2xl font-bold tracking-tight text-white">~2,400</p>
              <p className="mt-1 text-xs uppercase tracking-wider text-white/60">
                RachelOS Commits
              </p>
            </div>
            <div>
              <p className="text-2xl font-bold tracking-tight text-white">0 Sends</p>
              <p className="mt-1 text-xs uppercase tracking-wider text-white/60">
                Autonomous AI Outreach
              </p>
            </div>
            <div>
              <p className="text-2xl font-bold tracking-tight text-white">Single Principal</p>
              <p className="mt-1 text-xs uppercase tracking-wider text-white/60">
                No Delegated Associates
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* THE FOUNDER NARRATIVE: THE OPERATOR WHO WALKED AWAY FROM SLOP */}
      <Section className="border-t border-border !py-16 md:!py-24">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-primary">
              The Industry Contrast
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              Between Big SI Slide Decks and Fragile AI Wrappers.
            </h2>
            <div className="mt-6 space-y-4 text-base leading-7 text-muted">
              <p>
                The market is drowning in two extremes:
              </p>
              <ul className="space-y-3">
                <li className="flex gap-3">
                  <span className="font-semibold text-foreground">1. Corporate Advisory Fluff:</span>
                  Multi-million dollar roadmaps from legacy consultancies that produce 80-slide decks
                  while delivery teams remain paralyzed by unmodeled exception paths.
                </li>
                <li className="flex gap-3">
                  <span className="font-semibold text-foreground">2. Twitter AI Agency Slop:</span>
                  Fragile Zapier webhooks and unmonitored ChatGPT API wrappers sold with zero
                  governance, zero audit logging, and zero understanding of regulatory liability.
                </li>
              </ul>
              <p className="border-l-2 border-primary pl-4 font-medium text-foreground">
                TKO represents the third way: an enterprise operator who writes code, understands
                reconciliation under pressure, and bounds automation with deterministic controls.
              </p>
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-surface p-8 md:p-10">
            <h3 className="text-xl font-semibold">The Core Thesis</h3>
            <p className="mt-3 text-sm leading-6 text-muted">
              Why autonomous AI fails in high-stakes businesses—and what actually works:
            </p>
            <div className="mt-6 space-y-4">
              <div className="rounded-xl border border-border bg-white p-5">
                <div className="flex items-center gap-2.5 font-semibold text-foreground">
                  <Cpu className="size-5 text-primary" />
                  <span>Model Calls Are Commodities</span>
                </div>
                <p className="mt-2 text-sm leading-6 text-muted">
                  Calling Claude or GPT is a commodity utility. The value sits in what precedes and
                  succeeds the call: the deterministic fact extractors, entity reconciliation,
                  provenance tracking, and failure classification.
                </p>
              </div>

              <div className="rounded-xl border border-border bg-white p-5">
                <div className="flex items-center gap-2.5 font-semibold text-foreground">
                  <Lock className="size-5 text-primary" />
                  <span>Fail-Closed Human Approval Gate</span>
                </div>
                <p className="mt-2 text-sm leading-6 text-muted">
                  When a model hallucinates in a demo, people laugh. When it hallucinates in a $20M
                  transaction or a clinical determination, you face regulatory investigation. In our
                  systems, model-drafted messages require authenticated human approval. Zero
                  autonomous sends.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* THE TWO COMMERCIAL ENGINES */}
      <Section className="bg-surface !py-16 md:!py-24">
        <SectionHeader
          eyebrow="Commercial Architecture"
          title="The Two Operating Engines"
          description="Fixed-price, principal-led engagements built around undeniable operational proof."
        />

        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          {/* ENGINE A: ENTERPRISE HEALTHCARE */}
          <article className="flex flex-col rounded-2xl border-2 border-border bg-white p-8 transition-shadow hover:shadow-md md:p-10">
            <div className="flex items-center justify-between gap-4">
              <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
                Commercial Engine A
              </span>
              <span className="text-sm font-bold text-foreground">$15,000 Fixed · 3–4 Weeks</span>
            </div>

            <h3 className="mt-6 text-2xl font-bold">
              Enterprise Transformation &amp; Readiness Sprint
            </h3>
            <p className="mt-3 text-sm font-medium text-primary">
              For Health Plans, Payers &amp; Regulated Healthcare Organizations
            </p>

            <p className="mt-4 text-base leading-7 text-muted">
              For leaders facing CMS-0057-F, state prior-authorization mandates, or core platform
              migrations. When the executive dashboard is reported green, but nobody can produce the
              traceable claims artifacts that prove clinical review was safely waived.
            </p>

            <div className="mt-6 border-y border-border py-5">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted">
                The 9-Part Implementation Chain
              </p>
              <p className="mt-2 text-xs font-mono font-medium text-foreground">
                Policy → Obligation → Capability → Workflow → System → Control → Owner → Evidence →
                Outcome
              </p>
            </div>

            <ul className="mt-6 space-y-2.5 text-sm text-muted">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" />
                <span>Obligation Register &amp; Cross-System Impact Map</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" />
                <span>Gap, Dependency, and Accountable Ownership Matrix</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" />
                <span>Executable Implementation Backlog with traceable acceptance criteria</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" />
                <span>Synthetic Decision Lab trace without PHI</span>
              </li>
            </ul>

            <div className="mt-8 flex flex-col gap-3 pt-4 sm:flex-row sm:items-center">
              <LinkButton
                href="/services/regulatory-implementation-readiness-sprint"
                ctaLocation="engine_a_card"
              >
                Explore the Readiness Sprint
              </LinkButton>
              <Link
                href="/healthcare/impact-assessment"
                className="text-center text-sm font-semibold text-primary hover:underline sm:text-left"
              >
                Run Decision Lab Trace →
              </Link>
            </div>
          </article>

          {/* ENGINE B: OWNED DEMAND & GOVERNED AI */}
          <article className="flex flex-col rounded-2xl border-2 border-primary/30 bg-white p-8 transition-shadow hover:shadow-md md:p-10">
            <div className="flex items-center justify-between gap-4">
              <span className="rounded-full bg-midnight px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white">
                Commercial Engine B
              </span>
              <span className="text-sm font-bold text-foreground">
                $7.5K–$15K Build + $1.5K–$3K/mo
              </span>
            </div>

            <h3 className="mt-6 text-2xl font-bold">
              Owned Demand &amp; Governed AI Engine (RachelOS)
            </h3>
            <p className="mt-3 text-sm font-medium text-primary">
              For Wealth Advisory (RIAs), Boutique Practices &amp; High-Consideration Firms
            </p>

            <p className="mt-4 text-base leading-7 text-muted">
              For firms closing $50,000 to $500,000+ fee transactions tired of the aggregator trap:
              paying Zillow, SmartAsset, or Angi $40,000+/year for commoditized leads auctioned to
              four competitors simultaneously.
            </p>

            <div className="mt-6 border-y border-border py-5">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted">
                The Governed Operating Model
              </p>
              <p className="mt-2 text-xs font-mono font-medium text-foreground">
                Research-Phase Capture → Computed Relationship Graph → Fail-Closed Human Approval Cockpit
              </p>
            </div>

            <ul className="mt-6 space-y-2.5 text-sm text-muted">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" />
                <span>Captures buyers 60 days before form-fills via long-form domain authority</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" />
                <span>Computed relationship graph with source quote provenance</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" />
                <span>Deterministic Canonical Queue replacing human memory</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" />
                <span>Exact-message human approval cockpit · Zero autonomous sends</span>
              </li>
            </ul>

            <div className="mt-8 flex flex-col gap-3 pt-4 sm:flex-row sm:items-center">
              <LinkButton
                href="/private-client-os"
                ctaLocation="engine_b_card"
              >
                Explore Private Client OS
              </LinkButton>
              <Link
                href="/selected-work/from-crm-to-operating-system"
                className="text-center text-sm font-semibold text-primary hover:underline sm:text-left"
              >
                Inspect RachelOS Codebase →
              </Link>
            </div>
          </article>
        </div>
      </Section>

      {/* RACHELOS LIVING PROOF: SCREENSHOT & VIDEO WALKTHROUGHS */}
      <Section className="!py-16 md:!py-24">
        <SectionHeader
          eyebrow="Living Technical Proof"
          title="Inside RachelOS: ~2,400 Commits in Production"
          description="RachelOS is a single-operator production proof asset. These redacted screenshots show its workflows and system health; they are snapshots, not live telemetry. AI outreach requires human approval, with zero autonomous outbound sends."
        />

        {/* Video Embed Slot */}
        <div className="mt-10">
          <VideoEmbed
            title="Why I Turned Off Autonomous AI: Inside the Governed Approval Cockpit"
            caption="Todd Kovalsky demonstrates the RachelOS approval state machine, 3-second Anthropic timeouts, and why client-facing sends require an authenticated human signature."
          />
        </div>

        {/* 4 Core Screenshot Walkthroughs */}
        <div className="mt-14 grid gap-8 sm:grid-cols-2">
          {rachelosProofScreens.map((screen) => (
            <article
              key={screen.title}
              className="overflow-hidden rounded-xl border border-border bg-white shadow-sm"
            >
              <div className="relative aspect-[16/10] border-b border-border bg-surface">
                <Image
                  src={screen.image}
                  alt={screen.title}
                  fill
                  className="object-cover object-top"
                  sizes="(min-width: 1024px) 50vw, 100vw"
                />
              </div>
              <div className="p-6 md:p-8">
                <p className="text-xs font-semibold uppercase tracking-wider text-primary">
                  {screen.subtitle}
                </p>
                <h3 className="mt-2 text-xl font-bold">{screen.title}</h3>
                <p className="mt-3 text-sm leading-6 text-muted">{screen.description}</p>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-12 text-center">
          <LinkButton
            href="/selected-work/from-crm-to-operating-system"
            variant="secondary"
            ctaLocation="proof_section"
          >
            Read the Full RachelOS Case Study &amp; Technical Breakdown
          </LinkButton>
        </div>
      </Section>

      {/* THE IMPLEMENTATION CHAIN */}
      <Section className="bg-surface !py-16 md:!py-24 text-center">
        <div className="mx-auto max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">
            Execution Rigor
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            The 9-Link Implementation Chain
          </h2>
          <p className="mt-4 text-base leading-7 text-muted">
            The method used to reconstruct operational truth across complex payer transformations:
          </p>
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-3">
          {implementationChain.map((link, idx) => (
            <div key={link} className="flex items-center gap-3">
              <span className="flex h-12 items-center justify-center rounded-lg border border-border bg-white px-5 text-sm font-bold shadow-sm transition-colors hover:border-primary">
                {link}
              </span>
              {idx < implementationChain.length - 1 && (
                <ArrowRight className="size-4 text-primary" aria-hidden="true" />
              )}
            </div>
          ))}
        </div>
      </Section>

      {/* FINAL EXECUTIVE CTA BAND */}
      <CtaBand
        title="Ready to turn complex obligations into executable systems?"
        description="Bring one regulatory deadline under pressure or one high-consideration pipeline losing momentum. Work directly with Todd Kovalsky."
        primaryHref="/contact"
        primaryLabel="Book an Executive Discussion"
        secondaryHref="/services"
        secondaryLabel="Compare Service Ladders"
      />
    </>
  );
}
