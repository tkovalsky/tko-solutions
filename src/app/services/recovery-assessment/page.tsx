import type { Metadata } from "next";
import Image, { type StaticImageData } from "next/image";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { CtaBand } from "@/components/site/cta-band";
import { Faq } from "@/components/site/faq";
import { JsonLd } from "@/components/site/json-ld";
import { LinkButton } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Section, SectionHeader } from "@/components/ui/section";
import { absoluteUrl } from "@/lib/site";
import queueImage from "../../../../content/proof/rachelos/01-canonical-queue-send-text.png.jpg";
import digestImage from "../../../../content/proof/rachelos/02-daily-digest-daily-action-engine.png";
import approvalImage from "../../../../content/proof/rachelos/03-human-approval-surface-needs-rachel.png";

export const metadata: Metadata = {
  title: "Operational Recovery Assessment",
  description:
    "A one-week, fixed-scope Operational Recovery Assessment for leaders whose workflows depend on a few key people. $5K-$8K, six deliverables, executive briefing.",
  alternates: { canonical: "/services/recovery-assessment" },
  openGraph: {
    title: "Operational Recovery Assessment",
    description:
      "Book a one-week, $5K-$8K assessment that maps workflow stalls, key-person dependency, AI readiness, operational risk, and the next highest-leverage move.",
    url: absoluteUrl("/services/recovery-assessment"),
  },
};

const fitSignals = [
  "COO, VP Operations, VP Revenue, or Customer Success leader with an active workflow stall.",
  "PE operating partner or owner-operator trying to see where execution risk is building.",
  "Relationship-driven business where critical judgment, follow-up, and escalation live in a few heads.",
  "Healthcare operations leader working from warm or referral context, framed as advisory experience.",
];

const disqualifiers = [
  "Not a commodity automation sprint.",
  "Not a model-selection project.",
  "Not a platform commitment.",
];

const deliverables = [
  "Workflow map",
  "Bottleneck analysis",
  "Dependency analysis",
  "AI readiness assessment",
  "Operational risk assessment",
  "Executive briefing",
];

const timeline = [
  {
    day: "Day 1",
    title: "Scope",
    description:
      "Confirm the workflow under pressure, the operating questions leadership needs answered, and the evidence available this week.",
  },
  {
    day: "Days 2-3",
    title: "Interviews and evidence",
    description:
      "Review the current process, handoffs, reports, exceptions, key-person dependencies, and places where status hides risk.",
  },
  {
    day: "Day 4",
    title: "Analysis",
    description:
      "Synthesize workflow visibility, bottlenecks, dependency risk, AI readiness, and operational exposure into a clear assessment.",
  },
  {
    day: "Day 5",
    title: "Readout",
    description:
      "Deliver the executive briefing and the single highest-leverage next move. No obligation to continue.",
  },
];

const outcomes = [
  "A clear, evidence-based view of the top three places work stalls.",
  "Identification of the key-person dependency and the risk it creates.",
  "An honest read on where AI can safely help with human approval, and where it cannot yet.",
  "The single highest-leverage next move for leadership to decide on.",
];

const proofItems: {
  title: string;
  description: string;
  image: StaticImageData;
  alt: string;
}[] = [
  {
    title: "Canonical Queue",
    description:
      "A daily view of who needs attention, why they matter, and what action should happen next.",
    image: queueImage,
    alt: "RachelOS canonical queue showing prioritized contacts and next actions.",
  },
  {
    title: "Daily Digest",
    description:
      "A working operating rhythm that turns signals into a concise daily action surface.",
    image: digestImage,
    alt: "RachelOS daily digest screen showing relationship and follow-up priorities.",
  },
  {
    title: "Human Approval",
    description:
      "Recommendations stop at the human approval gate before any sensitive action goes out.",
    image: approvalImage,
    alt: "RachelOS Needs Rachel approval surface showing review before action.",
  },
];

const path = [
  {
    title: "Assessment",
    description:
      "One fixed week to establish the operating truth and the next highest-leverage move.",
  },
  {
    title: "Diagnostic",
    description:
      "A deeper investigation when the problem needs stronger evidence, prioritization, and implementation design.",
  },
  {
    title: "Build",
    description:
      "A governed Operational Knowledge System when the right system shape is already clear.",
  },
  {
    title: "Advisory",
    description:
      "Ongoing operator-to-operator support when leadership needs help keeping the work governed.",
  },
];

const faqs = [
  {
    q: "How long does the assessment take?",
    a: "The assessment is one week, fixed scope. The week covers scope, interviews and evidence review, analysis, synthesis, and an executive readout.",
  },
  {
    q: "What access do you need?",
    a: "TKO needs access to the workflow evidence already available: process notes, reports, handoff points, examples of stalled work, and interviews with the people closest to the workflow. No new platform or integration is required.",
  },
  {
    q: "How is confidentiality handled?",
    a: "The assessment is treated as confidential operating work. TKO does not publish client names, metrics, screenshots, or internal findings without explicit approval.",
  },
  {
    q: "What happens after the assessment?",
    a: "You receive the executive briefing and the recommended next move. If there is a fit, the path can continue into a Diagnostic, Build, or Advisory engagement. There is no obligation to continue.",
  },
  {
    q: "Is this an AI or software implementation?",
    a: "No. The assessment diagnoses the operating problem before implementation. It identifies where AI or automation may help with human approval, and where the workflow is not ready for it yet.",
  },
];

export default function RecoveryAssessmentPage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: "Operational Recovery Assessment",
          provider: { "@type": "Organization", name: "TKO Solutions" },
          serviceType: "Operational Recovery Assessment",
          areaServed: "United States",
          offers: {
            "@type": "Offer",
            priceSpecification: {
              "@type": "PriceSpecification",
              priceCurrency: "USD",
              minPrice: 5000,
              maxPrice: 8000,
            },
          },
        }}
      />

      <section className="border-b border-border py-16 md:py-24">
        <div className="mx-auto grid w-full max-w-7xl gap-12 px-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:px-8">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.1em] text-primary">
              Operational Recovery Assessment
            </p>
            <h1 className="mt-5 max-w-4xl text-5xl font-bold leading-[1.03] tracking-tight text-foreground md:text-7xl">
              Your operation runs on a few key people. When they are out, it stalls.
            </h1>
            <p className="mt-8 max-w-[68ch] text-xl leading-9 text-muted">
              Your operation has data, tools, and process, but critical work still runs
              through a few key people. When they are overloaded or unavailable, execution
              slows down and risk becomes hard to see.
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <LinkButton href="/contact">
                Book a 30-minute discovery call
                <ArrowRight className="size-4" aria-hidden="true" />
              </LinkButton>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
            <Card className="rounded-lg">
              <p className="text-sm font-semibold uppercase tracking-[0.1em] text-muted">
                Timeline
              </p>
              <p className="mt-3 text-4xl font-semibold">1 week</p>
              <p className="mt-3 text-sm leading-6 text-muted">Fixed scope.</p>
            </Card>
            <Card className="rounded-lg">
              <p className="text-sm font-semibold uppercase tracking-[0.1em] text-muted">
                Investment
              </p>
              <p className="mt-3 text-4xl font-semibold">$5K-$8K</p>
              <p className="mt-3 text-sm leading-6 text-muted">
                Set before the assessment starts.
              </p>
            </Card>
            <Card className="rounded-lg">
              <p className="text-sm font-semibold uppercase tracking-[0.1em] text-muted">
                Output
              </p>
              <p className="mt-3 text-2xl font-semibold">Executive briefing</p>
              <p className="mt-3 text-sm leading-6 text-muted">
                Plus the six operating deliverables below.
              </p>
            </Card>
          </div>
        </div>
      </section>

      <Section>
        <div className="grid gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
          <SectionHeader
            eyebrow="Problem Statement"
            title="The failure mode is usually not the tool stack. It is the human API."
            description="Knowledge lives in heads instead of systems. Who needs attention cannot be answered without a meeting. Status looks green while risk builds. AI pilots demo well, but nothing changes because the operating truth was never mapped."
          />
          <div className="border-l-4 border-l-primary bg-surface p-6 md:p-8">
            <p className="text-2xl font-semibold leading-snug text-foreground">
              {"Human -> Knowledge -> Judgment -> Action"}
            </p>
            <p className="mt-5 text-base leading-7 text-muted">
              The assessment exposes where that chain depends on specific people and
              converts the issue into findings leadership can act on: workflow visibility,
              ownership clarity, decision latency, reporting quality, automation
              opportunities, AI readiness, and knowledge concentration.
            </p>
          </div>
        </div>
      </Section>

      <Section className="bg-surface">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeader
            eyebrow="Who It Is For"
            title="For leaders with a real operating stall, not a general interest in AI."
            description="The best fit is a funded team with a workflow under pressure, a visible trigger, and a need to decide what deserves deeper spend."
          />
          <div>
            <div className="grid gap-3">
              {fitSignals.map((signal) => (
                <div key={signal} className="border border-border bg-white p-5">
                  <p className="text-base leading-7 text-muted">{signal}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 grid gap-3 md:grid-cols-3">
              {disqualifiers.map((item) => (
                <div
                  key={item}
                  className="border border-border bg-background p-4 text-sm font-semibold text-foreground"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      <Section>
        <SectionHeader
          eyebrow="What The Assessment Is"
          title="Six deliverables in one fixed-scope week."
          description="The work is constrained on purpose. It creates enough evidence for leadership to see where the operation stalls, where key-person risk is concentrated, and what should happen next."
        />
        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {deliverables.map((deliverable, index) => (
            <Card key={deliverable} className="rounded-lg">
              <p className="text-sm font-semibold uppercase tracking-[0.1em] text-primary">
                {String(index + 1).padStart(2, "0")}
              </p>
              <h2 className="mt-4 text-2xl font-semibold">{deliverable}</h2>
            </Card>
          ))}
        </div>
      </Section>

      <Section className="bg-surface">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeader
            eyebrow="Timeline"
            title="A one-week assessment, not open-ended consulting drift."
            description="The price expectation is $5K-$8K. Scope, access, and timing are confirmed after the 30-minute discovery call."
          />
          <ol className="grid gap-3">
            {timeline.map((step) => (
              <li
                key={step.day}
                className="grid gap-5 border border-border bg-white p-5 sm:grid-cols-[6rem_1fr]"
              >
                <span className="text-sm font-semibold uppercase tracking-[0.1em] text-primary">
                  {step.day}
                </span>
                <div>
                  <h3 className="text-lg font-semibold">{step.title}</h3>
                  <p className="mt-2 text-base leading-7 text-muted">
                    {step.description}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </Section>

      <Section>
        <div className="mb-10 grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <SectionHeader
            eyebrow="RachelOS Proof"
            title="Backed by a deployed Operational Knowledge System."
            description="RachelOS is not a slideware example. It is a working system that turns signals into memory, priority, recommendation, human approval, action, and outcome."
          />
          <div className="border border-border bg-surface p-6">
            <p className="text-sm font-semibold uppercase tracking-[0.1em] text-primary">
              Deployed proof
            </p>
            <p className="mt-3 text-2xl font-semibold">
              Runs daily. Human-approved. Built around the same operating pattern this
              assessment looks for.
            </p>
          </div>
        </div>
        <div className="grid gap-4 lg:grid-cols-3">
          {proofItems.map((item) => (
            <Card key={item.title} className="overflow-hidden rounded-lg p-0">
              <div className="relative h-72 border-b border-border bg-surface md:h-80">
                <Image
                  src={item.image}
                  alt={item.alt}
                  fill
                  className="object-cover object-top"
                  sizes="(min-width: 1024px) 33vw, 100vw"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold">{item.title}</h3>
                <p className="mt-3 text-base leading-7 text-muted">
                  {item.description}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </Section>

      <Section className="bg-surface">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeader
            eyebrow="Outcomes"
            title="What the buyer walks away with."
            description="The assessment does not invent a business case. It gives leadership a grounded operating view and a clear next decision."
          />
          <ul className="grid gap-3">
            {outcomes.map((outcome) => (
              <li
                key={outcome}
                className="flex gap-4 border border-border bg-white p-5 text-muted"
              >
                <CheckCircle2
                  className="mt-1 size-5 shrink-0 text-primary"
                  aria-hidden="true"
                />
                <span className="text-base leading-7">{outcome}</span>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section>
        <SectionHeader
          eyebrow="Next Step"
          title="Book the discovery call. Then decide whether the fixed week is a fit."
          description="The first step is a 30-minute discovery call, not a hard sell into the assessment. If the workflow problem is concrete and there is mutual fit, TKO confirms the one-week scope, price, start date, and access needed."
        />
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <LinkButton href="/contact">
            Book a 30-minute discovery call
            <ArrowRight className="size-4" aria-hidden="true" />
          </LinkButton>
        </div>
        <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {path.map((step, index) => (
            <Card key={step.title} className="rounded-lg">
              <p className="text-sm font-semibold uppercase tracking-[0.1em] text-primary">
                {String(index + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-4 text-2xl font-semibold">{step.title}</h3>
              <p className="mt-4 text-base leading-7 text-muted">{step.description}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section className="bg-surface">
        <SectionHeader eyebrow="FAQ" title="Questions buyers should resolve before intake." />
        <div className="mt-10">
          <Faq items={faqs} />
        </div>
      </Section>

      <CtaBand
        title="Use the Assessment to decide what deserves deeper spend."
        description="One fixed-scope week maps the operating stall, the dependency risk, the AI readiness question, and the highest-leverage next move. The CTA is the discovery call that qualifies whether the assessment is the right next step."
        primaryHref="/contact"
        primaryLabel="Book a 30-minute discovery call"
        secondaryHref={null}
        secondaryLabel={null}
      />
    </>
  );
}
