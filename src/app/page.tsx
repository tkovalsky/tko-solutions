import type { Metadata } from "next";
import { CredibilityStrip } from "@/components/site/credibility-strip";
import { CtaBand } from "@/components/site/cta-band";
import { JsonLd } from "@/components/site/json-ld";
import { LinkButton } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Section, SectionHeader } from "@/components/ui/section";
import { offerHref, offers, PROGRAM_RECOVERY_CONVERSATION, SPECIALIST_CONVERSATION } from "@/lib/offers";
import { absoluteUrl, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Healthcare Transformation Program Recovery",
  description: site.description,
  alternates: { canonical: "/" },
  openGraph: {
    title: "Is the program recoverable, or are you about to fund the same failure faster?",
    description: site.description,
    url: absoluteUrl("/"),
    images: [{ url: site.socialImage, width: 1200, height: 630, alt: "TKO Solutions healthcare transformation program recovery." }],
  },
};

const symptoms = [
  "Every workstream reports green and nothing has changed in the operation.",
  "A second consecutive milestone has slipped and the explanations do not agree.",
  "A large automation or AI investment is proposed on top of a workflow nobody has mapped.",
  "Critical decisions have been waiting on a committee for a quarter or more.",
  "A new executive has inherited the program and needs an independent read.",
  "The business case was approved against assumptions nobody has revisited.",
];

const whyTko = [
  {
    title: "Direct senior accountability",
    body: "One accountable senior leader in the room from week one — not a partner who appears at the readout and a team you have not met. The person who diagnoses the problem is the person who signs the finding.",
  },
  {
    title: "Fast, fixed-scope diagnosis",
    body: "Three weeks and a fixed fee, not a discovery phase billed by the quarter. A diagnosis that takes six months is describing a program that no longer exists in that form.",
  },
  {
    title: "Operational and implementation depth",
    body: "Twenty years across regulated operations, healthcare product, interoperability, and enterprise transformation — plus a production system built and operated end to end. The recommendations come from someone who has had to make them work.",
  },
  {
    title: "An honest read on AI",
    body: "Whether AI is appropriate is one of the questions answered, not the assumption the work starts from. Automating a workflow whose authority model was never written down makes the ambiguity faster, not cheaper.",
  },
  {
    title: "No staffing pyramid",
    body: "TKO does not sell a bench, a ramp, or a follow-on implementation team. If the right answer is internal execution, an existing vendor, or stopping the program, that is the answer you get.",
  },
  {
    title: "No technology-first recommendation",
    body: "The operating problem is established before a platform, vendor, or automation decision is discussed. Sequencing is the difference between a program that changes the operation and one that changes the screens.",
  },
];

const audience = [
  "Health plans and payers",
  "Healthcare services organizations",
  "PE-backed provider platforms",
  "Managed-care organizations",
  "Large provider organizations",
  "Consultancies and system integrators",
];

export default function HomePage() {
  const recoveryReview = offers[0];

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "TKO Solutions | Healthcare Transformation Program Recovery",
          url: absoluteUrl("/"),
          description: site.description,
        }}
      />

      <section className="relative overflow-hidden bg-midnight text-white">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgb(var(--accent-rgb)/0.18),_transparent_58%)]"
        />
        <div className="relative mx-auto w-full max-w-7xl px-6 py-14 sm:py-16 lg:px-8 lg:py-20">
          <div className="max-w-4xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary-light">
              Healthcare transformation recovery
            </p>
            <h1 className="mt-5 max-w-3xl text-4xl font-bold leading-[1.04] tracking-tight sm:text-6xl lg:text-7xl">
              Every workstream is green. Nothing has changed.
            </h1>
            <p className="mt-6 max-w-[65ch] text-lg leading-8 text-white/70 sm:text-xl sm:leading-9">
              TKO recovers healthcare transformation programs that are behind, over budget, or
              about to fund automation on top of a workflow that does not work yet — for health
              plans, healthcare services organizations, managed-care organizations, and PE-backed
              provider platforms.
            </p>
            <p className="mt-6 max-w-[62ch] border-l-2 border-primary-light/50 pl-5 text-base leading-8 text-white/60">
              Twenty years inside large consulting firms and enterprise healthcare, including
              prior authorization, utilization management, CMS interoperability, and
              transformation delivery. That background is why the answer here is a direct one:
              whether the program is actually recoverable, and what it will cost to find out the
              slow way. One accountable senior leader — not a pyramid, a staffing ramp, or a
              quarter-long discovery phase.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <LinkButton href={PROGRAM_RECOVERY_CONVERSATION.href} ctaLocation="homepage_hero">
                {site.cta}
              </LinkButton>
              <LinkButton
                href={SPECIALIST_CONVERSATION.href}
                ctaLocation="homepage_hero"
                variant="secondary"
                className="border-white/35 text-white hover:border-white/60 hover:bg-white/10"
              >
                {site.secondaryCta}
              </LinkButton>
            </div>
          </div>
        </div>
      </section>

      <section aria-label="Engagement terms" className="border-b border-border bg-surface">
        <div className="mx-auto grid w-full max-w-7xl gap-3 px-6 py-6 text-sm font-semibold sm:grid-cols-2 lg:grid-cols-4 lg:px-8">
          <p>3-week Recovery Review</p>
          <p>$18,000–$25,000 fixed fee</p>
          <p>Fractional lead from $15,000/mo</p>
          <p>Principal-led throughout</p>
        </div>
      </section>

      <Section className="!py-14 md:!py-18">
        <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr]">
          <SectionHeader
            eyebrow="The recognizable problem"
            title="Programs rarely fail inside a workstream. They fail at the seams."
            description="Workstream status answers a local question honestly. Nobody owns the enterprise one — whether the pieces are converging into an operating change. Risk migrates to the boundaries, and the boundaries have no reporting line."
          />
          <ul className="grid gap-3">
            {symptoms.map((symptom) => (
              <li key={symptom} className="border border-border bg-white p-5 text-base leading-7 text-muted">
                {symptom}
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section className="bg-surface !py-14 md:!py-18" id="why-tko">
        <SectionHeader
          eyebrow="Why TKO"
          title="Why hire one senior person instead of a firm."
          description="A large firm sells a team and bills the ramp. That is the right purchase for some problems. It is the wrong purchase when the question is whether the program should continue at all."
        />
        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {whyTko.map((reason) => (
            <Card key={reason.title}>
              <h3 className="text-xl font-semibold leading-tight">{reason.title}</h3>
              <p className="mt-4 text-base leading-7 text-muted">{reason.body}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section className="!py-14 md:!py-18">
        <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr]">
          <div>
            <SectionHeader
              eyebrow="Start here"
              title={recoveryReview.name}
              description={recoveryReview.question}
            />
            <dl className="mt-7 grid grid-cols-2 gap-4 border-y border-border py-5 text-sm">
              <div>
                <dt className="text-muted">Duration</dt>
                <dd className="mt-1 font-semibold">{recoveryReview.duration}</dd>
              </div>
              <div>
                <dt className="text-muted">Fee</dt>
                <dd className="mt-1 font-semibold">{recoveryReview.commercial}</dd>
              </div>
            </dl>
            <LinkButton href={offerHref(recoveryReview.slug)} className="mt-7">
              See Scope &amp; Pricing
            </LinkButton>
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.12em] text-primary">You leave with</p>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2">
              {recoveryReview.deliverables.map((output) => (
                <li key={output} className="border border-border bg-white p-5 text-sm leading-6 text-foreground">
                  {output}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <CredibilityStrip />

      <Section className="!py-14 md:!py-18">
        <SectionHeader
          eyebrow="Healthcare proof"
          title="Enterprise healthcare experience, with the claim boundary stated."
          description="Prior authorization, utilization management, healthcare transformation, operational recovery, and CMS interoperability — described as mechanism and role. Employment history establishes experience, not employer or client endorsement, and no quantified client outcome is claimed."
        />
        <div className="mt-10 grid gap-4 lg:grid-cols-3">
          <Card>
            <p className="text-sm font-semibold uppercase tracking-[0.1em] text-muted">
              Prior authorization &amp; UM
            </p>
            <h3 className="mt-4 text-xl font-semibold leading-tight">
              Waiver Enablement via Advanced Notification
            </h3>
            <p className="mt-4 text-base leading-7 text-muted">
              Program delivery for a path that removed traditional authorization review for
              qualifying provider-code combinations while preserving the operational record
              downstream claims processing required.
            </p>
            <p className="mt-4 text-sm leading-6 text-muted">
              Delivery and coordination role. Qualification methodology and medical policy were
              owned by separate teams. No scale or outcome is claimed.
            </p>
            <LinkButton href="/selected-work/prior-authorization-modernization" variant="secondary" className="mt-6">
              Review the Experience
            </LinkButton>
          </Card>
          <Card>
            <p className="text-sm font-semibold uppercase tracking-[0.1em] text-muted">
              Transformation recovery
            </p>
            <h3 className="mt-4 text-xl font-semibold leading-tight">Enterprise Program Recovery</h3>
            <p className="mt-4 text-base leading-7 text-muted">
              Multi-workstream healthcare modernization across claims, care management, provider
              experience, clinical workflow, eligibility, and member operations — where healthy
              local status coexisted with unresolved portfolio risk.
            </p>
            <p className="mt-4 text-sm leading-6 text-muted">
              Qualitative operating mechanism only. No client, cost, delivery-time, or outcome
              metric is published.
            </p>
            <LinkButton href="/selected-work/enterprise-care-management-modernization" variant="secondary" className="mt-6">
              Review the Experience
            </LinkButton>
          </Card>
          <Card>
            <p className="text-sm font-semibold uppercase tracking-[0.1em] text-muted">
              Interoperability
            </p>
            <h3 className="mt-4 text-xl font-semibold leading-tight">Regulated Implementation</h3>
            <p className="mt-4 text-base leading-7 text-muted">
              Payer-facing CMS Cures Act and FHIR interoperability ownership, connecting technical
              exchange to onboarding, access control, auditability, and operating governance.
            </p>
            <p className="mt-4 text-sm leading-6 text-muted">
              Establishes relevant regulated-implementation experience, not a claimed client result.
            </p>
            <LinkButton href="/selected-work/healthcare-interoperability-platform" variant="secondary" className="mt-6">
              Review the Experience
            </LinkButton>
          </Card>
        </div>
      </Section>

      <Section className="bg-surface !py-14 md:!py-18">
        <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-start">
          <SectionHeader
            eyebrow="Secondary proof"
            title="He builds, not only advises."
            description="RachelOS is a deployed, founder-built operating system with durable memory, prioritized work, visible missing information, and human-approved AI. It is secondary proof and it carries a stated boundary: one founder-operated, non-healthcare environment. It does not establish enterprise scale, healthcare compliance, or a causal financial outcome."
          />
          <Card>
            <p className="text-base leading-7 text-muted">
              Its relevance is narrow and specific: a buyer can inspect how Todd turns fragmented
              work into explicit workflow, evidence, controls, and handoff-ready operating
              artifacts — the same discipline applied after a Recovery Review.
            </p>
            <LinkButton href="/selected-work/from-crm-to-operating-system" variant="secondary" className="mt-6">
              Inspect the System
            </LinkButton>
          </Card>
        </div>
      </Section>

      <Section className="!py-14 md:!py-18">
        <div className="grid gap-4 lg:grid-cols-2">
          <Card>
            <p className="text-sm font-semibold uppercase tracking-[0.1em] text-primary">Who this is for</p>
            <ul className="mt-5 space-y-3 text-base leading-7 text-muted">
              {audience.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </Card>
          <Card>
            <p className="text-sm font-semibold uppercase tracking-[0.1em] text-muted">Not a fit</p>
            <ul className="mt-5 space-y-3 text-base leading-7 text-muted">
              <li>General interest in AI without a program or workflow under pressure.</li>
              <li>A request for outsourced staffing, a software platform, or an EHR implementation team.</li>
              <li>A search for guaranteed savings before any baseline exists.</li>
              <li>Enterprise-wide scope with no bounded starting point and no accountable executive.</li>
            </ul>
          </Card>
        </div>
      </Section>

      <CtaBand
        title="Get an independent read before the next funding decision."
        description={PROGRAM_RECOVERY_CONVERSATION.summary}
        primaryLabel={site.cta}
        secondaryHref="/services"
        secondaryLabel="Compare All Three Offers"
      />
    </>
  );
}
