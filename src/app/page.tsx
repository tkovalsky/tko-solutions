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
import { ProofMediaSlots } from "@/components/site/proof-media-slots";
import { site, absoluteUrl } from "@/lib/site";
import { getOffer } from "@/lib/offers";

const readiness = getOffer("regulatory-implementation-readiness-sprint")!;
const ownedDemand = getOffer("operating-system-build")!;
const support = getOffer("operate-and-improve")!;

const title = "Healthcare Readiness & Owned Demand";
const description =
  "Trace healthcare obligations to workflows, controls, owners, and evidence. Build owned buyer education and follow-up with human-reviewed AI drafting.";

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
        alt: "TKO Solutions: Healthcare Readiness & Owned Demand.",
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
    title: "Operator Review",
    subtitle: "Known context and open questions",
    description:
      "This snapshot shows the operator reviewing relationship context and missing information. Exact-message approval is a separate, code-backed control.",
    image: "/proof/rachelos/human-approval.png",
  },
  {
    title: "The Canonical Priority Queue",
    subtitle: "Computed next-best action",
    description:
      "A daily action view groups work by the next step and makes missing qualification information visible. This screenshot does not prove a measured outcome.",
    image: "/proof/rachelos/canonical-queue.png",
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
            Todd Kovalsky · Founder &amp; Principal
          </div>

          <h1 className="mt-6 max-w-5xl text-[2.25rem] font-bold leading-[1.06] tracking-tight sm:text-5xl lg:text-[4.25rem]">
            I turn complex operations into{" "}
            <span className="text-primary-light">
              work that gets done.
            </span>
          </h1>

          <p className="mt-6 text-xl font-semibold leading-8 text-white/90 sm:text-2xl">Clear decisions. Working systems. One accountable principal.</p>

          <p className="mt-8 max-w-[72ch] text-lg leading-8 text-white/80 sm:text-xl sm:leading-9">
            I bring 20+ years across operations, product, and healthcare transformation to two
            kinds of work: making a healthcare mandate executable, and building an owned client
            pipeline with governed AI. I map the decisions, design the controls, and deliver the
            agreed scope. You work with me from the first conversation through handoff.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
            <LinkButton
              href="/contact"
              ctaLocation="homepage_hero"
              className="bg-primary hover:bg-primary-dark"
            >
              Discuss Your Project
            </LinkButton>
            <LinkButton
              href="/selected-work"
              ctaLocation="homepage_hero"
              variant="secondary"
              className="border-white/35 text-white hover:border-white/60 hover:bg-white/10"
            >
              Inspect My Work
            </LinkButton>
          </div>

          {/* Quick Founder Credibility Strip */}
          <div className="mt-12 grid grid-cols-2 gap-4 border-t border-white/15 pt-8 sm:grid-cols-4">
            <div>
              <p className="text-2xl font-bold tracking-tight text-white">20+ Years</p>
              <p className="mt-1 text-xs uppercase tracking-wider text-white/60">
                Operations &amp; Product Experience
              </p>
            </div>
            <div>
              <p className="text-2xl font-bold tracking-tight text-white">RachelOS</p>
              <p className="mt-1 text-xs uppercase tracking-wider text-white/60">
                Single-Operator Proof
              </p>
            </div>
            <div>
              <p className="text-2xl font-bold tracking-tight text-white">Human Review</p>
              <p className="mt-1 text-xs uppercase tracking-wider text-white/60">
                Before AI Outreach
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
              Work you can inspect
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              Name the owner. Show the handoff. Record the evidence.
            </h2>
            <div className="mt-6 space-y-4 text-base leading-7 text-muted">
              <p>A green status report does not show what happens when a rule is missing, a vendor handoff fails, or a client asks something the record cannot answer.</p>
              <p>I follow the work across team and system boundaries. I identify the missing rule, handoff, or owner, then turn the finding into a specific delivery plan. Every proposed change has an acceptance test and a way to check whether it helped.</p>
              <p>My background spans regulated operations, product ownership, and healthcare transformation. RachelOS shows how I turn that operating detail into working rules and screens.</p>
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-surface p-8 md:p-10">
            <h3 className="text-xl font-semibold">The Core Thesis</h3>
            <p className="mt-3 text-sm leading-6 text-muted">
              Model calls are cheap. The surrounding decision system is the work:
            </p>
            <div className="mt-6 space-y-4">
              <div className="rounded-xl border border-border bg-white p-5">
                <div className="flex items-center gap-2.5 font-semibold text-foreground">
                  <Cpu className="size-5 text-primary" />
                  <span>Model Calls Are Commodities</span>
                </div>
                <p className="mt-2 text-sm leading-6 text-muted">
                  A useful model draft needs recorded facts, visible gaps, a permitted action, and an
                  accountable reviewer. Deterministic rules control workflow state; model output
                  remains proposed prose.
                </p>
              </div>

              <div className="rounded-xl border border-border bg-white p-5">
                <div className="flex items-center gap-2.5 font-semibold text-foreground">
                  <Lock className="size-5 text-primary" />
                  <span>Fail-Closed Human Approval Gate</span>
                </div>
                <p className="mt-2 text-sm leading-6 text-muted">
                  RachelOS routes AI-assisted outreach through review of the exact message. Its
                  model wrapper records attempts and classifies failures. These controls make
                  review and failure handling explicit; they do not guarantee factual accuracy.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* THE TWO COMMERCIAL ENGINES */}
      <Section className="bg-surface !py-16 md:!py-24">
        <SectionHeader
          eyebrow="Choose the work you need"
          title="Healthcare readiness and owned demand"
          description="Two bounded engagements. Clear outputs, pricing, and ownership before work starts."
        />

        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          {/* ENGINE A: ENTERPRISE HEALTHCARE */}
          <article className="flex flex-col rounded-2xl border-2 border-border bg-white p-8 transition-shadow hover:shadow-md md:p-10">
            <div className="flex items-center justify-between gap-4">
              <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
                Commercial Engine A
              </span>
              <span className="text-sm font-bold text-foreground">{readiness.commercial}</span>
            </div>

            <h3 className="mt-6 text-2xl font-bold">
              {readiness.name}
            </h3>
            <p className="mt-3 text-sm font-medium text-primary">
              For Health Plans, Payers &amp; Regulated Healthcare Organizations
            </p>

            <p className="mt-4 text-base leading-7 text-muted">
              For leaders facing CMS-0057-F, state prior-authorization mandates, or core platform
              transitions. Trace one approved obligation through the affected teams and systems,
              then identify the missing controls, owners, dependencies, and release evidence.
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
                <span>A sponsor readout and baseline plan; inspect the synthetic lab before engaging</span>
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
                {ownedDemand.commercial}<br />{support.commercial} optional
              </span>
            </div>

            <h3 className="mt-6 text-2xl font-bold">
              {ownedDemand.name}
            </h3>
            <p className="mt-3 text-sm font-medium text-primary">
              For Wealth Advisory (RIAs), Boutique Practices &amp; High-Consideration Firms
            </p>

            <p className="mt-4 text-base leading-7 text-muted">
              For wealth advisory firms, luxury services, and boutique practices that rely on
              third-party leads and scattered follow-up. Build useful buyer content, inquiry capture,
              and an accountable next step on channels you control.
            </p>

            <div className="mt-6 border-y border-border py-5">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted">
                The Governed Operating Model
              </p>
              <p className="mt-2 text-xs font-mono font-medium text-foreground">
                Buyer Education → Permission-Based Inquiry → Relationship Context → Human-Reviewed Action
              </p>
            </div>

            <ul className="mt-6 space-y-2.5 text-sm text-muted">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" />
                <span>Buyer education that answers research questions before an inquiry</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" />
                <span>Recorded relationship context with known facts and open questions</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" />
                <span>A daily action view with accountable next steps</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" />
                <span>Exact-message human review for AI-assisted outreach</span>
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
                Inspect RachelOS Proof →
              </Link>
            </div>
          </article>
        </div>
      </Section>

      {/* RACHELOS LIVING PROOF: SCREENSHOT & VIDEO WALKTHROUGHS */}
      <Section className="!py-16 md:!py-24">
        <SectionHeader
          eyebrow="Living Technical Proof"
          title="Inspect the RachelOS workflow"
          description="RachelOS is an independent, single-operator system. These snapshots show interface behavior. Its code backs separate controls for human review and recorded model attempts; neither establishes healthcare deployment or client results."
        />

        {/* Video Embed Slot */}
        <div className="mt-10">
          <ProofMediaSlots kind="all" />
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
                  className="object-contain object-top"
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
        title="Bring the work that needs an accountable owner."
        description="Bring one regulatory deadline under pressure or one high-consideration pipeline losing momentum. Work directly with Todd Kovalsky."
        primaryHref="/contact"
        primaryLabel="Discuss Your Project"
        secondaryHref="/services"
        secondaryLabel="Scope and Pricing"
      />
    </>
  );
}
