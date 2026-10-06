import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Activity, Cpu, Users, Database } from "lucide-react";
import { CtaBand } from "@/components/site/cta-band";
import { JsonLd } from "@/components/site/json-ld";
import { LinkButton } from "@/components/ui/button";
import { Section, SectionHeader } from "@/components/ui/section";
import { site, absoluteUrl } from "@/lib/site";

const title = "Managed Follow-Up & Workflow Systems";

export const metadata: Metadata = {
  title: { absolute: `TKO Solutions | ${title}` },
  description: "Managed follow-up for real-estate agents and small teams. TKO sets up a practical daily workflow around your contacts and supported tools, then keeps it working.",
  alternates: { canonical: "/" },
  openGraph: {
    title: title,
    description: "Managed follow-up for real-estate agents and small teams. TKO sets up a practical daily workflow around your contacts and supported tools, then keeps it working.",
    url: absoluteUrl("/"),
    images: [{ url: site.socialImage, width: 1200, height: 630, alt: "TKO Solutions: business operating systems for growing companies." }],
  },
};

const failureStates = [
  {
    title: "Leadership & Ownership Gaps",
    description: "Programs stall where workstreams meet; nobody owns the whole.",
    icon: Users,
  },
  {
    title: "AI Stuck in Experimentation",
    description: "Brilliant pilots in sandboxes that cannot safely take production actions.",
    icon: Cpu,
  },
  {
    title: "The Human API Bottleneck",
    description: "Key operators spending half their time manually reconciling data and context.",
    icon: Activity,
  },
  {
    title: "Data Without Action",
    description: "Systems of record that passively collect records without driving next-best actions.",
    icon: Database,
  }
] as const;

const actionLoop = [
  "Signal", "Fact", "State", "Decision", "Action", "Outcome", "Feedback"
] as const;

const commercialPillars = [
  {
    title: "Advisory",
    href: "/services",
    description: "Transformation Diagnostics, Operating Model Design, Execution Authority.",
  },
  {
    title: "Managed Follow-Up",
    href: "/products/ambient-crm",
    description: "A 30-day pilot to establish a usable follow-up process around your existing contacts and supported tools. $5,000, with optional ongoing support.",
  },
  {
    title: "Sectors",
    href: "/healthcare",
    description: "Regulated, high-consequence environments (Healthcare, Financial Services, Real Estate).",
  }
] as const;

export default function HomePage() {
  return (
    <>
      <JsonLd data={{ "@context": "https://schema.org", "@type": "WebPage", name: `TKO Solutions | ${title}`, url: absoluteUrl("/"), description: "TKO builds operating systems for work that has outgrown the way it is currently run." }} />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-midnight text-white">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgb(var(--accent-rgb)/0.18),_transparent_58%)]" />
        <div className="relative mx-auto w-full max-w-7xl px-6 py-16 lg:px-8 lg:py-24">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary-light">Managed follow-up for real-estate agents &amp; small teams</p>
          <h1 className="mt-6 max-w-5xl text-[2rem] font-bold leading-[1.08] tracking-tight sm:text-5xl lg:text-[4rem]">
            Your next conversation shouldn’t depend on remembering every last detail.
          </h1>
          <p className="mt-8 max-w-[70ch] text-lg leading-8 text-white/75 sm:text-xl sm:leading-9">
            You already have contacts, conversations, and tools. TKO helps turn them into a consistent daily follow-up process: who needs attention, what matters, and what to do next. Todd Kovalsky sets up the workflow and keeps it working, with important communications staying in your hands.
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <LinkButton href="/products/ambient-crm" ctaLocation="homepage_hero">Explore Managed Follow-Up</LinkButton>
            <LinkButton href="/selected-work/from-crm-to-operating-system" ctaLocation="homepage_hero" eventName="secondary_cta_click" variant="secondary" className="border-white/35 text-white hover:border-white/60 hover:bg-white/10">See RachelOS</LinkButton>
          </div>
        </div>
      </section>

      {/* The Problem Section */}
      <Section className="!py-14 md:!py-20">
        <SectionHeader eyebrow="The Executive Problem" title="The 4 universal failure states" description="Systems of record without systems of action. Data is stored, but human handoffs stall decisions." />
        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {failureStates.map((state) => (
            <article key={state.title} className="flex gap-4 rounded-xl border border-border bg-white p-6 md:p-8">
              <div className="flex-shrink-0">
                <state.icon className="size-8 text-primary" aria-hidden="true" />
              </div>
              <div>
                <h3 className="text-xl font-semibold">{state.title}</h3>
                <p className="mt-3 text-base leading-7 text-muted">{state.description}</p>
              </div>
            </article>
          ))}
        </div>
      </Section>

      {/* The System of Action Loop */}
      <Section className="bg-surface !py-14 md:!py-24 text-center">
        <div className="mx-auto max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.12em] text-primary">The Operating Model</p>
          <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">Signal to Outcome</h2>
        </div>
        <div className="mt-14 flex flex-col md:flex-row flex-wrap items-center justify-center gap-4">
          {actionLoop.map((step, index) => (
            <div key={step} className="flex flex-col md:flex-row items-center gap-4">
              <div className="flex h-14 min-w-[120px] items-center justify-center rounded-lg border border-primary/20 bg-white px-6 text-base font-bold shadow-sm transition-all hover:border-primary">
                {step}
              </div>
              {index < actionLoop.length - 1 && (
                <ArrowRight className="text-primary size-6 rotate-90 md:rotate-0" aria-hidden="true" />
              )}
            </div>
          ))}
        </div>
      </Section>

      {/* The Commercial Architecture */}
      <Section className="!py-14 md:!py-24">
        <SectionHeader eyebrow="Ways to work together" title="Start with one useful change." description="Choose managed follow-up, a broader workflow project, or a specialist assessment." />
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {commercialPillars.map((pillar) => (
            <Link key={pillar.title} href={pillar.href} className="group flex flex-col rounded-xl border border-border bg-white p-8 transition-colors hover:border-primary/50 hover:shadow-sm">
              <h3 className="text-2xl font-bold">{pillar.title}</h3>
              <p className="mt-4 flex-1 text-base leading-7 text-muted">{pillar.description}</p>
              <div className="mt-8 flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.08em] text-primary">
                Explore {pillar.title} <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </div>
            </Link>
          ))}
        </div>
      </Section>

      {/* Inspectable Proof Strip */}
      <Section className="bg-midnight text-white !py-14 md:!py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 md:text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.12em] text-primary-light">Dual Proof Strip</p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">Evidence &amp; Working Systems</h2>
          </div>
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-xl border border-white/20 bg-white/5 p-8 backdrop-blur-sm sm:p-10">
              <p className="text-sm font-semibold uppercase tracking-[0.12em] text-white/50 mb-4">Enterprise Healthcare</p>
              <h3 className="text-2xl font-bold text-white">Rural prior-authorization waiver &amp; multi-workstream governance</h3>
              <Link href="/healthcare" className="group mt-8 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.08em] text-primary-light hover:text-white transition-colors">
                View Healthcare Practice <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </Link>
            </div>
            <div className="rounded-xl border border-white/20 bg-white/5 p-8 backdrop-blur-sm sm:p-10">
              <p className="text-sm font-semibold uppercase tracking-[0.12em] text-white/50 mb-4">Software / Product</p>
              <h3 className="text-2xl font-bold text-white">RachelOS: a working follow-up system</h3>
              <Link href="/selected-work/from-crm-to-operating-system" className="group mt-8 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.08em] text-primary-light hover:text-white transition-colors">
                See How RachelOS Works <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </Section>

      {/* Executive Conversion Band */}
      <CtaBand
        title="Start with the follow-up that keeps slipping."
        description="Bring your current CRM, one recurring problem, and the person who owns the process. We’ll check whether a bounded pilot is a fit."
        primaryHref="/contact?offer=managed-follow-up"
        primaryLabel="Discuss a Follow-Up Pilot"
        secondaryHref="/services"
        secondaryLabel="Explore Advisory Engagements"
      />
    </>
  );
}
