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

const title = "Build the Operating System Your Business Is Missing";

export const metadata: Metadata = {
  title: { absolute: `TKO Solutions | ${title}` },
  description: site.description,
  alternates: { canonical: "/" },
  openGraph: {
    title: "Your business should not need you to remember everything.",
    description: site.description,
    url: absoluteUrl("/"),
    images: [{ url: site.socialImage, width: 1200, height: 630, alt: "TKO Solutions: business operating systems for growing companies." }],
  },
};

const symptoms = [
  ["Good opportunities go quiet", "The lead, request, or follow-up exists somewhere, but nobody owns what should happen next."],
  ["The team waits for you", "People can do the work, but the context and judgment needed to move it forward still live with the owner or COO."],
  ["The CRM records more than it runs", "It stores activity, but it does not give the team a reliable way to decide what matters today."],
  ["People connect the tools by hand", "The real workflow lives between the inbox, spreadsheets, the CRM, and conversations nobody else can see."],
  ["Automation added motion, not control", "More reminders and integrations made the stack busier without making ownership or decisions clearer."],
  ["One absence changes everything", "When a key person is unavailable, the work slows because part of the operating system left with them."],
] as const;

const missingLayer = [
  "One shared view of what is happening",
  "Clear ownership for the next step",
  "Rules for routine decisions",
  "A short list of what needs attention",
  "A simple way to see whether the fix worked",
] as const;

const method = [
  ["See the work", "Follow one important flow end to end and find where it slows, disappears, or waits for one person."],
  ["Choose the first fix", "Define the smallest useful change: a clearer state, a better handoff, a queue, a rule, or a missing connection."],
  ["Build it into the work", "Use the tools you already have where they fit. Add only the layer the team actually needs."],
  ["Measure and improve", "Compare the new way of working with the starting point, then decide what is worth fixing next."],
] as const;

const rachelosBuild = [
  ["Make the work visible", "Bring lead activity, relationship context, and next steps into one working view."],
  ["Keep the context", "Turn what one person remembers into information the system and the team can use."],
  ["Support the next action", "Show what needs attention and give the operator a practical place to act."],
  ["Keep judgment human", "Use automation to prepare the work without pretending every relationship decision should be automatic."],
] as const;

const builds = [
  ["Lead and customer follow-up", "Clear ownership, next steps, and a workable way to find the relationships that need attention."],
  ["Action queues", "One useful view of today's work instead of another dashboard people have to interpret."],
  ["CRM operating layers", "Simple states, rules, and handoffs that make the CRM useful to the people doing the work."],
  ["Institutional memory", "Important context captured in the workflow instead of depending on one person's recall."],
  ["Practical automation", "Routine preparation, reminders, and routing where they remove work without removing judgment."],
  ["Management visibility", "A small set of measures connected to an owner and a decision, not reporting for its own sake."],
] as const;

const differences = [
  ["Start with the operating problem", "The first question is where work gets stuck, not which software to buy."],
  ["Diagnosis and build stay together", "The person who learns how the business works is also responsible for turning that understanding into a working system."],
  ["Use what already works", "A new platform is not the default. The goal is to make the current stack behave like one system."],
  ["Leave the team with something usable", "The work includes the rules, ownership, documentation, and training needed to keep it useful."],
] as const;

export default function HomePage() {
  return (
    <>
      <JsonLd data={{ "@context": "https://schema.org", "@type": "WebPage", name: `TKO Solutions | ${title}`, url: absoluteUrl("/"), description: site.description }} />

      <section className="relative overflow-hidden bg-midnight text-white">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgb(var(--accent-rgb)/0.18),_transparent_58%)]" />
        <div className="relative mx-auto grid w-full max-w-7xl gap-12 px-6 py-16 lg:grid-cols-[1.2fr_0.8fr] lg:px-8 lg:py-24">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary-light">Operating systems for growing businesses</p>
            <h1 className="mt-6 max-w-4xl text-4xl font-bold leading-[1.04] tracking-tight sm:text-6xl lg:text-[4.25rem]">Your business should not need you to remember everything.</h1>
            <p className="mt-7 max-w-[62ch] text-lg leading-8 text-white/75 sm:text-xl sm:leading-9">When leads, decisions, and follow-up live across a CRM, inboxes, spreadsheets, and people&apos;s heads, growth creates more chasing instead of more control. TKO finds the bottleneck and builds the practical system that gets the work moving.</p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <LinkButton href={CONSTRAINT_CALL.href} ctaLocation="homepage_hero">{CONSTRAINT_CALL.label}</LinkButton>
              <LinkButton href={site.secondaryCtaHref} ctaLocation="homepage_hero" eventName="secondary_cta_click" variant="secondary" className="border-white/35 text-white hover:border-white/60 hover:bg-white/10">{site.secondaryCta}</LinkButton>
            </div>
            <p className="mt-6 text-sm text-white/55">For owner-led businesses that have outgrown the way work gets done today.</p>
          </div>
          <div className="self-end border-l border-white/25 pl-6 lg:pl-8">
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-primary-light">The pattern</p>
            <p className="mt-5 text-2xl font-semibold leading-snug">When work lives between the tools,<br />people become the system.</p>
            <p className="mt-5 text-sm leading-6 text-white/65">Someone notices the signal, carries the context, decides what matters, and makes sure it happens. TKO turns that invisible job into a way of working the team can see and use.</p>
          </div>
        </div>
      </section>

      <Section className="!py-14 md:!py-18">
        <SectionHeader eyebrow="Sound familiar?" title="The business grew. The way the work gets done did not." description="The gaps show up as missed follow-up, slow decisions, repeated questions, and too much work routing through a few people." />
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
          <SectionHeader eyebrow="What is missing" title="The tools are there. The operating layer is not." description="The CRM, inbox, spreadsheets, and apps each hold part of the picture. The missing piece is the shared logic that turns that information into ownership, priorities, and next steps." />
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
        <SectionHeader eyebrow="How TKO works" title="Fix the bottleneck, not the whole company." description="Start with one important flow, build the smallest useful operating loop, and expand only when it earns the right to grow." />
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
            <SectionHeader eyebrow="Built, not just advised" title="RachelOS started with the same problem." description="The tools existed, but the operating logic lived in one person's head: which relationships mattered, what had happened, and what should happen next. I designed and built the layer that made that work visible and usable." />
            <ol className="mt-8 border-t border-border">
              {rachelosBuild.map(([stage, body], index) => (
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
          <SectionHeader eyebrow="Who you'll work with" title="Todd Kovalsky. One person from diagnosis through build." description="I have spent more than twenty years across operations, product, and systems delivery. TKO brings that experience into one focused engagement instead of splitting the problem across an advisor, a developer, and an automation vendor." />
          <div>
            <ul className="grid gap-3 sm:grid-cols-2">
              {[
                "20+ years across operations, product, and complex systems delivery",
                "Designed and built RachelOS, a working operating system for relationship-driven work",
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
        <SectionHeader eyebrow="Why TKO" title="The diagnosis and the build stay connected." description="The job is not to install more software. It is to understand how the work really moves and turn that into a system people can use." />
        <div className="mt-10 border-t border-border">
          {differences.map(([option, gap]) => (
            <div key={option} className="grid gap-2 border-b border-border py-5 sm:grid-cols-[14rem_1fr] sm:gap-8">
              <p className="text-base font-semibold">{option}</p>
              <p className="text-base leading-7 text-muted">{gap}</p>
            </div>
          ))}
        </div>
      </Section>

      <CtaBand title="Tell me what's stuck." description={CONSTRAINT_CALL.summary} secondaryHref="/services/constraint-diagnostic" secondaryLabel="See the Diagnostic" />
    </>
  );
}
