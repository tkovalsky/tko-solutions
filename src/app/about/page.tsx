import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CtaBand } from "@/components/site/cta-band";
import { LinkButton } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Section, SectionHeader } from "@/components/ui/section";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Todd Kovalsky | Founder & Operator",
  description:
    "Todd Kovalsky is the founder of TKO Solutions and builder of RachelOS. He helps leaders identify operating constraints and build systems that improve execution.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "Todd Kovalsky | Founder & Operator",
    description:
      "The operating decisions, systems, evidence, and claim boundaries behind TKO, RachelOS, and the BoundOS product hypothesis.",
    url: absoluteUrl("/about"),
  },
};

const owned = [
  "Operating visibility: identifying where executive reporting failed to expose dependencies, stalled decisions, and execution risk.",
  "Workflow and governance design: defining decision tiers, escalation paths, approval points, and accountability for exception-heavy work.",
  "Product and system design: turning fragmented signals into durable memory, current state, prioritized work, and reviewable recommendations.",
  "Production operation: building and operating RachelOS with scheduled runs, health checks, human approval gates, and visible limitations.",
  "AI activation decisions: deciding where AI can draft or recommend—and where it must not act without human review.",
  "Program recovery: making the dependency layer visible when multi-team work drifted away from the executive story being reported.",
];

const built = [
  ["RachelOS", "A live operating system for relationship memory, priority, human-approved AI assistance, automated nurture, and daily action."],
  ["Recommendation mechanisms", "Context-aware recommendations that remain reviewable operating inputs rather than autonomous behavior."],
  ["Lead intelligence", "Signals, durable relationship memory, source-aware facts, current state, intelligence gaps, and next-best questions."],
  ["Workflow orchestration", "A canonical queue, daily focus, scheduled operating rhythm, and system-health controls."],
  ["Governance mechanisms", "Source authority, human approval points, activation gates, decision rights, and observable system behavior."],
  ["Healthcare operating models", "Decision tiers, escalation, auditability, exception handling, onboarding, and operating cadence for complex work."],
];

const decisions = [
  {
    title: "Choosing an operating system over a better CRM view",
    body: "The problem was not missing records. It was that relationship context, priority, and next action still had to be reconstructed by one person. The decision was to build RachelOS around durable memory, priority, recommendation, human approval, and action—not simply improve storage.",
    lesson: "The product was a trusted answer to “what should happen next?”",
  },
  {
    title: "Refusing fully autonomous outbound AI",
    body: "AI could draft or recommend outreach, but relationship-sensitive errors and factual uncertainty made autonomous action the wrong tradeoff. RachelOS keeps AI-assisted outbound action behind a human approval gate.",
    lesson: "Governance is part of the product—not a policy attached later.",
  },
  {
    title: "Letting production behavior change the priority",
    body: "A documented 2.2% email-first reply rate was evidence that more email automation was not the right answer. The operating priority shifted toward creating conversations, rather than building more software around an underperforming path.",
    lesson: "Production evidence should overrule an attractive product narrative.",
  },
];

const wrong = [
  ["A cleaner CRM would solve follow-up.", "The information existed, but priority and next action still had to be reconstructed manually. RachelOS moved toward memory, prioritization, and a daily operating loop."],
  ["Built capabilities meant product maturity.", "Some capabilities remained dormant, unvalidated, or unsafe to activate. Built, activated, and validated became separate states."],
  ["Scheduled automation could be assumed to be working.", "A missed automation run made observability a production requirement: health checks, run records, and visible failure states."],
  ["AI could be treated as an action engine.", "Source authority and human approval became explicit controls because a relationship-sensitive error has a real business consequence."],
];

const ladder = [
  ["Observed repeatedly", "A useful operating pattern, not a universal result.", "Key-person dependency and decision-latency patterns."],
  ["Implemented personally", "A working mechanism Todd designed, built, or operated.", "RachelOS memory, priority, approval, and health controls."],
  ["Measured", "A defined production fact for a specific context and period.", "The documented 2.2% email-first reply rate; owner-confirmed transaction activity."],
  ["Validated in multiple environments", "Evidence across separate operating contexts.", "Not yet established for a BoundOS product claim."],
  ["Still a hypothesis", "A plausible idea that has not earned a repeatable claim.", "BoundOS as a future repeatable platform."],
];

const linkedinUrl = process.env.NEXT_PUBLIC_LINKEDIN_URL;

export default function AboutPage() {
  return (
    <>
      <section className="border-b border-border py-16 md:py-24">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-[0.1em] text-primary">Founder & operator</p>
          <div className="mt-5 grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
            <div>
              <h1 className="max-w-4xl text-5xl font-bold leading-[1.03] tracking-tight text-foreground md:text-7xl">
                Todd Kovalsky builds operating systems for businesses that cannot afford to run on memory, meetings, and manual reconstruction.
              </h1>
              <p className="mt-8 max-w-[65ch] text-xl leading-9 text-muted">
                Founder of TKO Solutions and builder of RachelOS. Todd works where operations, systems, product decisions, and accountability collide.
              </p>
            </div>
            <Card className="bg-surface">
              <p className="text-sm font-semibold uppercase tracking-[0.1em] text-primary">Start with the evidence</p>
              <p className="mt-4 text-lg leading-8 text-muted">RachelOS is a live production reference system: durable relationship memory, prioritized work, automated nurture, human-approved AI assistance, and visible system health.</p>
              <Link href="/proof/rachelos" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.08em] text-primary hover:text-primary-dark">
                Inspect RachelOS proof <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </Card>
          </div>
          <nav aria-label="Founder evidence navigation" className="mt-10 flex gap-x-5 gap-y-3 overflow-x-auto border-t border-border pt-5 text-sm font-semibold text-primary">
            <a href="#narrative" className="shrink-0 hover:underline">How I think</a>
            <a href="#owned" className="shrink-0 hover:underline">What I have owned</a>
            <a href="#built" className="shrink-0 hover:underline">What I have built</a>
            <a href="#decisions" className="shrink-0 hover:underline">Difficult decisions</a>
            <a href="#evidence" className="shrink-0 hover:underline">Evidence & limits</a>
          </nav>
        </div>
      </section>

      <Section id="narrative" className="bg-surface">
        <SectionHeader eyebrow="Founder narrative" title="The repeated problem was never a lack of software." />
        <div className="mt-10 max-w-[75ch] space-y-6 text-lg leading-8 text-muted">
          <p>Across healthcare transformation work and relationship-driven business operations, the recurring failure was between systems: critical context lived in a few experienced people, teams rebuilt the same picture in every meeting, and status reporting did not identify the next decision.</p>
          <p>Todd starts with the operating reality—where work stalls, where decisions wait, who carries the missing context, what information is trusted, and what consequence the business is absorbing while the problem remains unresolved.</p>
          <p>RachelOS was built because existing tools could store activity but could not reliably answer the daily operating question: who needs attention now, why, and what should happen next?</p>
        </div>
      </Section>

      <Section id="owned">
        <SectionHeader eyebrow="What I have owned" title="I am most useful when someone needs one person accountable for seeing the whole operating problem." description="The work is defined by responsibility: making the tradeoffs visible, deciding what should be built or changed, and staying accountable for whether the result can actually be used." />
        <div className="mt-10 grid gap-3 md:grid-cols-2">
          {owned.map((item) => <Card key={item}><p className="text-base leading-7 text-muted">{item}</p></Card>)}
        </div>
      </Section>

      <Section id="built" className="bg-surface">
        <SectionHeader eyebrow="What I have built" title="Systems that make hard work visible, governable, and easier to execute." />
        <div className="mt-10 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {built.map(([title, body]) => <Card key={title}><h3 className="text-xl font-semibold">{title}</h3><p className="mt-3 text-base leading-7 text-muted">{body}</p></Card>)}
        </div>
      </Section>

      <Section id="decisions">
        <SectionHeader eyebrow="Difficult decisions" title="The work is not choosing the most impressive feature. It is choosing the right operating tradeoff." />
        <div className="mt-10 grid gap-4 lg:grid-cols-3">
          {decisions.map((item) => <Card key={item.title}><h3 className="text-xl font-semibold">{item.title}</h3><p className="mt-4 text-base leading-7 text-muted">{item.body}</p><p className="mt-5 border-t border-border pt-5 text-sm leading-6 text-foreground"><span className="font-semibold text-primary">Lesson — </span>{item.lesson}</p></Card>)}
        </div>
        <Link href="/selected-work/rachelos-delivery-model" className="mt-8 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.08em] text-primary hover:text-primary-dark">Read the AI-assisted delivery record <ArrowRight className="size-4" aria-hidden="true" /></Link>
      </Section>

      <Section className="bg-surface">
        <SectionHeader eyebrow="What I got wrong" title="A feature, deployment, or AI demo is not proof that a business problem is solved." />
        <div className="mt-10 grid gap-3 md:grid-cols-2">
          {wrong.map(([assumption, response]) => <Card key={assumption}><h3 className="text-xl font-semibold">{assumption}</h3><p className="mt-3 text-base leading-7 text-muted">{response}</p></Card>)}
        </div>
      </Section>

      <Section id="evidence">
        <SectionHeader eyebrow="Credibility ladder" title="What I know, what I have built, what I have measured, and what I am still testing." description="One production system does not justify a broad product or outcome claim. The evidence matters as much as the idea." />
        <div className="mt-10 overflow-x-auto border border-border">
          <table className="min-w-[760px] w-full text-left text-sm">
            <thead className="bg-surface text-foreground"><tr><th className="p-4 font-semibold">Level</th><th className="p-4 font-semibold">Meaning</th><th className="p-4 font-semibold">Current evidence</th></tr></thead>
            <tbody>{ladder.map(([level, meaning, evidence]) => <tr key={level} className="border-t border-border"><td className="p-4 font-semibold">{level}</td><td className="p-4 leading-6 text-muted">{meaning}</td><td className="p-4 leading-6 text-muted">{evidence}</td></tr>)}</tbody>
          </table>
        </div>
      </Section>

      <Section className="bg-surface">
        <SectionHeader eyebrow="Founder evidence map" title="Follow the evidence most relevant to your question." />
        <div className="mt-10 grid gap-3 md:grid-cols-2">
          <EvidenceLink title="How I think" body="Operating principles, difficult decisions, and what production evidence changed." href="#decisions" label="Review difficult decisions" />
          <EvidenceLink title="What I have built" body="RachelOS production proof and the evidence-backed delivery record." href="/proof/rachelos" label="Inspect RachelOS" />
          <EvidenceLink title="Healthcare operating experience" body="Decision rights, exception handling, auditability, and dependency risk." href="/services/prior-authorization-assessment" label="Review prior authorization work" />
          <EvidenceLink title="How I work" body="A focused operating review that identifies the constraint, exposure, and next decision." href="/services/recovery-assessment" label="Review the Recovery Assessment" />
          <EvidenceLink title="What remains unproven" body="BoundOS is a product hypothesis informed by RachelOS—not a mature SaaS claim." href="/proof/rachelos" label="Review proof boundaries" />
        </div>
      </Section>

      <Section>
        <div className="grid gap-10 border border-border bg-surface p-8 md:grid-cols-[1.2fr_auto] md:items-center md:p-12">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.1em] text-primary">Continue the conversation</p>
            <h2 className="mt-4 text-3xl font-semibold leading-tight tracking-tight md:text-4xl">Follow the operating record—or bring the business problem under pressure.</h2>
            <p className="mt-4 max-w-[60ch] text-lg leading-8 text-muted">Todd publishes decisions, systems, failures, and lessons from real operating work. For a concrete performance problem, start with an operating performance conversation.</p>
          </div>
          <div className="flex flex-col gap-3">
            {linkedinUrl ? <a href={linkedinUrl} target="_blank" rel="noreferrer" className="inline-flex min-h-11 items-center justify-center border border-primary bg-primary px-5 text-sm font-semibold uppercase tracking-[0.08em] text-white hover:bg-primary-dark">Connect with Todd on LinkedIn</a> : <LinkButton href="/contact">Connect with Todd</LinkButton>}
            <LinkButton href="/contact" variant="secondary">Book an operating conversation</LinkButton>
          </div>
        </div>
      </Section>

      <CtaBand />
    </>
  );
}

function EvidenceLink({ title, body, href, label }: { title: string; body: string; href: string; label: string }) {
  return <Card><h3 className="text-xl font-semibold">{title}</h3><p className="mt-3 text-base leading-7 text-muted">{body}</p><Link href={href} className="mt-6 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.08em] text-primary hover:text-primary-dark">{label}<ArrowRight className="size-4" aria-hidden="true" /></Link></Card>;
}
