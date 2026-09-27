import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";
import { CtaBand } from "@/components/site/cta-band";
import { JsonLd } from "@/components/site/json-ld";
import { LinkButton } from "@/components/ui/button";
import { Section, SectionHeader } from "@/components/ui/section";
import { CONSTRAINT_CALL, offerHref, offers } from "@/lib/offers";
import { absoluteUrl, site } from "@/lib/site";

const title = "Business Operating Systems for Growing Companies";

export const metadata: Metadata = {
  title: { absolute: `TKO Solutions | ${title}` },
  description: site.description,
  alternates: { canonical: "/" },
  openGraph: {
    title: "Your business has systems. A person is still the operating system.",
    description: site.description,
    url: absoluteUrl("/"),
    images: [{ url: site.socialImage, width: 1200, height: 630, alt: "TKO Solutions: business operating systems for growing companies." }],
  },
};

const symptoms = [
  ["Leads go quiet", "They come in, someone means to follow up, and nobody can say which ones mattered or where they went."],
  ["Everything routes through you", "The owner or COO is the only place where the whole picture exists, so every decision waits on one calendar."],
  ["The CRM is a filing cabinet", "It holds records. It doesn't tell anyone what to do next, and half the team doesn't trust what's in it."],
  ["People are the integration", "Hours every week go to copying information between the CRM, the inbox, spreadsheets, and whatever else was bought."],
  ["AI made it messier", "New tools, new subscriptions, new logins. Nothing measurable changed about how the work gets done."],
  ["Knowledge walks out the door", "When one person is out or leaves, part of how the business works goes with them."],
] as const;

const missingLayer = [
  "What is true right now",
  "What matters most",
  "What should happen next",
  "Who does it, and by when",
  "Whether it worked",
] as const;

const method = [
  ["Find the constraint", "Trace where leads, work, and decisions actually stall, and what that costs in money and hours."],
  ["Build the fix", "Build the missing operating layer on the tools you already have: statuses, rules, queues, automation, and AI with human approval."],
  ["Prove it", "Measure against a baseline taken before anything changed. If the numbers didn't move, we say so."],
  ["Find the next one", "Remove one constraint and the next becomes visible. The system grows with the business instead of pretending to be finished."],
] as const;

const constraintTimeline = [
  ["Foundation", "Every call, text, email, and site visit lands in one relationship record. Facts are kept separate from guesses."],
  ["Visibility", "One ranked queue and a daily email answer the only question that matters each morning: who needs attention, and why."],
  ["Follow-up", "The system drafts outreach and flags missing information. A person approves anything that goes out."],
  ["Conversion (now)", "The constraint moved. The work now is measuring and improving every step from first response to closed deal and referral."],
] as const;

const builds = [
  ["Lead and revenue follow-up systems", "Every lead gets a status, an owner, and a next action. Nothing ages silently."],
  ["A daily action queue", "One ranked list of what needs attention today and why, assembled from the CRM, inbox, and pipeline."],
  ["A CRM your team trusts", "Stages that mean something, data rules that hold, and next actions instead of empty fields."],
  ["AI that drafts, people who decide", "Drafting, summarizing, and sorting handled automatically, with a person approving anything consequential."],
  ["Institutional memory", "The facts about customers, deals, and processes that live in one person's head, captured where the team works."],
  ["Reporting tied to action", "Every number has an owner, a threshold, and a next step when it moves the wrong way."],
] as const;

const alternatives = [
  ["A consultant", "Diagnoses the problem and leaves a plan. Nobody builds it, so the business drifts back."],
  ["An automation agency", "Connects your tools quickly, and automates the broken steps along with the good ones."],
  ["A developer", "Builds what you specify. The hard part is the specification, because the logic lives in your head."],
  ["Another AI tool", "Adds one more system to a stack that is already fragmented."],
  ["A new operations hire", "Six figures and months to impact, and rarely someone who can both run the operation and build the system."],
] as const;

export default function HomePage() {
  return (
    <>
      <JsonLd data={{ "@context": "https://schema.org", "@type": "WebPage", name: `TKO Solutions | ${title}`, url: absoluteUrl("/"), description: site.description }} />

      <section className="relative overflow-hidden bg-midnight text-white">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgb(var(--accent-rgb)/0.18),_transparent_58%)]" />
        <div className="relative mx-auto grid w-full max-w-7xl gap-12 px-6 py-16 lg:grid-cols-[1.2fr_0.8fr] lg:px-8 lg:py-24">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary-light">Business operating systems for growing companies</p>
            <h1 className="mt-6 max-w-4xl text-4xl font-bold leading-[1.04] tracking-tight sm:text-6xl lg:text-[4.25rem]">Your business has systems. A person is still the operating system.</h1>
            <p className="mt-7 max-w-[62ch] text-lg leading-8 text-white/75 sm:text-xl sm:leading-9">CRM, email, spreadsheets, a dozen apps, maybe some AI. But deciding what matters, what happens next, and who does it still runs through you and a few key people. TKO finds where that is costing you, builds the missing operating layer, and proves it changed the numbers.</p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <LinkButton href={CONSTRAINT_CALL.href} ctaLocation="homepage_hero">{CONSTRAINT_CALL.label}</LinkButton>
              <LinkButton href={site.secondaryCtaHref} ctaLocation="homepage_hero" eventName="secondary_cta_click" variant="secondary" className="border-white/35 text-white hover:border-white/60 hover:bg-white/10">{site.secondaryCta}</LinkButton>
            </div>
            <p className="mt-6 text-sm text-white/55">For owner-led and growing businesses, typically $5M+ in revenue.</p>
          </div>
          <div className="self-end border-l border-white/25 pl-6 lg:pl-8">
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-primary-light">The pattern</p>
            <p className="mt-5 text-2xl font-semibold leading-snug">Your systems hold the information.<br />A person holds the judgment.</p>
            <p className="mt-5 text-sm leading-6 text-white/65">Someone has to notice the signal, remember the history, decide what matters, and make sure it happens. When that someone is you, the business can only move as fast as your calendar.</p>
          </div>
        </div>
      </section>

      <Section className="!py-14 md:!py-18">
        <SectionHeader eyebrow="Sound familiar?" title="The problem is rarely a missing tool." description="It's the work between the tools, done by people, from memory." />
        <div className="mt-10 grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {symptoms.map(([heading, body]) => (
            <article key={heading} className="bg-white p-6">
              <h3 className="text-lg font-semibold">{heading}</h3>
              <p className="mt-3 text-base leading-7 text-muted">{body}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section className="bg-surface !py-14 md:!py-20">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <SectionHeader eyebrow="Why it happens" title="You have systems of record. You're missing the system of action." description="Your tools are good at storing what happened. None of them decide what should happen next. So a person does that job every day: reconciling, remembering, prioritizing, chasing. That work is invisible until the person is busy, out, or gone." />
          <div className="border border-border bg-white p-6 md:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted">Your systems</p>
            <p className="mt-2 text-base font-semibold">CRM · inbox · spreadsheets · apps · AI tools</p>
            <div className="my-5 border-l-2 border-primary pl-5">
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-primary">The missing operating layer</p>
              <ul className="mt-3 space-y-2">
                {missingLayer.map((item) => <li key={item} className="text-base leading-6">{item}</li>)}
              </ul>
            </div>
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted">Your team</p>
            <p className="mt-2 text-base font-semibold">The right work, done on time, by the right person</p>
          </div>
        </div>
      </Section>

      <Section className="!py-14 md:!py-18">
        <SectionHeader eyebrow="How TKO works" title="Find the constraint. Build the fix. Prove it. Repeat." description="No imaginary end state. Real businesses change, so the constraint moves. The system moves with it." />
        <ol className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {method.map(([heading, body], index) => (
            <li key={heading} className="border-t-2 border-primary bg-surface p-6">
              <p className="font-mono text-sm text-primary">{String(index + 1).padStart(2, "0")}</p>
              <h3 className="mt-3 text-xl font-semibold">{heading}</h3>
              <p className="mt-3 text-sm leading-6 text-muted">{body}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section className="bg-surface !py-14 md:!py-20">
        <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-start">
          <div>
            <SectionHeader eyebrow="Proof: RachelOS" title="When the owner was the operating system." description="A South Florida real-estate business had a CRM, notes, emails, texts, a website, and plenty of leads. The judgment that connected them lived in one person: who mattered, what had happened, what to send, and when to follow up. I built the system that holds that judgment now, and I still run it." />
            <ol className="mt-8 border-t border-border">
              {constraintTimeline.map(([stage, body], index) => (
                <li key={stage} className="grid gap-2 border-b border-border py-4 sm:grid-cols-[2rem_9rem_1fr]">
                  <span className="font-mono text-sm text-primary">{index + 1}</span>
                  <p className="font-semibold">{stage}</p>
                  <p className="text-sm leading-6 text-muted">{body}</p>
                </li>
              ))}
            </ol>
            <Link href={site.secondaryCtaHref} data-conversion-event="case_study_view" data-cta-location="homepage_proof" data-case-study="from-crm-to-operating-system" className="group mt-8 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.08em] text-primary hover:text-primary-dark">
              Read the full case <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden />
            </Link>
          </div>
          <figure className="border border-border bg-white p-3">
            <div className="relative aspect-[4/5] overflow-hidden bg-white">
              <Image src="/proof/rachelos/today-work.png" alt="RachelOS Today screen: one ranked queue, a lead overdue by 12 days, missing facts flagged, and the next question to ask." fill priority={false} className="object-cover object-[62%_0%]" sizes="(min-width: 1024px) 60vw, 160vw" />
            </div>
            <figcaption className="px-2 pb-1 pt-3 text-sm leading-6 text-muted">The morning view: one queue, ranked by the system. Overdue follow-up, missing facts, and the next question to ask are all on one screen. Contact details are redacted.</figcaption>
          </figure>
        </div>
      </Section>

      <Section className="!py-14 md:!py-18">
        <SectionHeader eyebrow="What gets built" title="Named for what changes, not for the software." />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {builds.map(([heading, body]) => (
            <article key={heading} className="border-l-2 border-primary bg-surface p-6">
              <h3 className="text-lg font-semibold">{heading}</h3>
              <p className="mt-3 text-sm leading-6 text-muted">{body}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section className="bg-surface !py-14 md:!py-20">
        <SectionHeader eyebrow="How engagements work" title="Start small. Expand only when it's working." description="Every step is useful on its own, is priced up front, and makes the next decision obvious." />
        <ol className="mt-12 border-t border-border">
          {offers.map((offer, index) => (
            <li key={offer.slug} className="grid gap-4 border-b border-border py-7 md:grid-cols-[3rem_0.9fr_1.4fr_0.6fr_auto] md:items-center">
              <span className="font-mono text-sm text-primary">{String(index + 1).padStart(2, "0")}</span>
              <div><p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted">{offer.step}</p><h3 className="mt-1 text-xl font-semibold">{offer.name}</h3></div>
              <p className="text-sm leading-6 text-muted">{offer.question}</p>
              <p className="text-sm font-semibold">{offer.duration}<br /><span className="text-primary">{offer.commercial}</span></p>
              <LinkButton href={offerHref(offer.slug)} variant="secondary" eventName="secondary_cta_click" ctaLocation="homepage_ladder">Details</LinkButton>
            </li>
          ))}
        </ol>
      </Section>

      <Section className="!py-14 md:!py-18">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeader eyebrow="Who you'll work with" title="Todd Kovalsky. The person who diagnoses it builds it." description="I've spent twenty years inside operations that had to work: loan settlement at Apollo, asset-management platform programs at Sapient, advisor and CRM platforms at FolioDynamix, and large healthcare programs with dozens of teams and systems. The pattern was the same everywhere. The information existed. Someone still had to turn it into the next action by hand." />
          <div>
            <ul className="grid gap-3 sm:grid-cols-2">
              {[
                "Operations, product, and program leadership across financial services and healthcare",
                "Built and runs RachelOS: 1,600+ commits, 100+ recorded design decisions, and a daily production run",
                "Works across process, data, CRM, automation, and AI instead of one specialty",
                "One principal on every engagement, and deliberately few clients at a time",
              ].map((item) => <li key={item} className="border-l-2 border-primary bg-surface p-5 text-sm leading-6 text-muted">{item}</li>)}
            </ul>
            <div className="mt-7 flex flex-wrap gap-3">
              <LinkButton href="/founder" variant="secondary" eventName="secondary_cta_click" ctaLocation="homepage_founder">About Todd</LinkButton>
              <a href={site.linkedin} target="_blank" rel="noreferrer" data-conversion-event="linkedin_click" data-cta-location="homepage_founder" data-cta-label="LinkedIn" className="inline-flex min-h-11 items-center justify-center gap-2 border border-foreground/20 px-5 text-sm font-semibold uppercase tracking-[0.08em] transition-colors hover:border-foreground/40 hover:bg-foreground/[0.03]">LinkedIn <ExternalLink className="size-4" aria-hidden /></a>
            </div>
          </div>
        </div>
      </Section>

      <Section className="bg-surface !py-14 md:!py-18">
        <SectionHeader eyebrow="Why not just…" title="Each alternative owns one slice. The problem lives between them." />
        <div className="mt-10 border-t border-border">
          {alternatives.map(([option, gap]) => (
            <div key={option} className="grid gap-2 border-b border-border py-5 sm:grid-cols-[14rem_1fr] sm:gap-8">
              <p className="text-base font-semibold">{option}</p>
              <p className="text-base leading-7 text-muted">{gap}</p>
            </div>
          ))}
          <div className="grid gap-2 py-5 sm:grid-cols-[14rem_1fr] sm:gap-8">
            <p className="text-base font-semibold text-primary">TKO</p>
            <p className="text-base font-semibold leading-7">Finds the constraint across process, people, data, and technology, builds the fix, measures it, and keeps going.</p>
          </div>
        </div>
      </Section>

      <CtaBand title="Tell me what's stuck." description={CONSTRAINT_CALL.summary} secondaryHref="/services/constraint-diagnostic" secondaryLabel="See the Diagnostic" />
    </>
  );
}
