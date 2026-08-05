import type { Metadata } from "next";
import { CredibilityStrip } from "@/components/site/credibility-strip";
import { CtaBand } from "@/components/site/cta-band";
import { EvidenceNoteLink } from "@/components/site/evidence-note";
import { JsonLd } from "@/components/site/json-ld";
import { LinkButton } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Section, SectionHeader } from "@/components/ui/section";
import { offerHref, offers, PROGRAM_RECOVERY_CONVERSATION, SPECIALIST_CONVERSATION } from "@/lib/offers";
import { READINESS_CHECK_PATH } from "@/lib/readiness-check";
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
    title: "I lead the work myself",
    body: "The person who interviews your team, reads your program artifacts, and writes the diagnosis is the person who signs it. There is no engagement team to onboard and no partner who appears only at the readout.",
  },
  {
    title: "Three weeks to a written answer",
    body: "A diagnosis that takes six months describes a program that no longer exists in that form. Three weeks is enough to read what exists, interview the people who know, and take a position.",
  },
  {
    title: "Twenty years of operating depth",
    body: "Regulated operations, healthcare product ownership, CMS interoperability, and enterprise transformation delivery, plus a production system I built and operate. I have had to make recommendations like these work.",
  },
  {
    title: "A direct answer on AI",
    body: "Whether AI is appropriate here is one of the questions I answer. Automating a workflow whose authority model was never written down makes the ambiguity faster and more expensive.",
  },
  {
    title: "No bench to sell you",
    body: "TKO has no staffing ramp and no implementation team waiting downstream. If the right answer is internal execution, your existing vendor, or stopping the program, that is what the report says.",
  },
  {
    title: "The operating problem comes first",
    body: "I establish what is actually failing before any platform, vendor, or automation decision is discussed. Sequencing is what separates a program that changes the operation from one that changes the screens.",
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
            <p className="mt-6 max-w-[68ch] text-lg leading-8 text-white/70 sm:text-xl sm:leading-9">
              I recover healthcare transformation programs that are behind, over budget, or about
              to fund automation on top of a workflow that does not work yet. One question comes
              first: whether the program is actually recoverable, and what the next ninety days
              should contain.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <LinkButton href={PROGRAM_RECOVERY_CONVERSATION.href} ctaLocation="homepage_hero">
                {site.cta}
              </LinkButton>
              <LinkButton
                href={READINESS_CHECK_PATH}
                ctaLocation="homepage_hero"
                variant="secondary"
                className="border-white/35 text-white hover:border-white/60 hover:bg-white/10"
              >
                Use the Readiness Check
              </LinkButton>
            </div>
            <p className="mt-6 text-sm leading-6 text-white/50">
              Not ready for a conversation? The Readiness Check is twelve questions you can work
              through with your own leadership. No email required.
            </p>
          </div>
        </div>
      </section>

      <section aria-label="Engagement terms" className="border-b border-border bg-surface">
        <div className="mx-auto grid w-full max-w-7xl gap-3 px-6 py-6 text-sm font-semibold sm:grid-cols-2 lg:grid-cols-4 lg:px-8">
          <p>3-week Recovery Review</p>
          <p>$18,000–$25,000 fixed fee</p>
          <p>Personally led, start to finish</p>
          <p>One program, one sponsor</p>
        </div>
      </section>

      <Section className="!py-14 md:!py-18">
        <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr]">
          <SectionHeader
            eyebrow="The recognizable problem"
            title="Programs fail at the seams, where nobody reports."
            description="Workstream status answers a local question honestly. The enterprise question, whether the pieces are converging into an operating change, belongs to nobody. Risk accumulates at the boundaries and surfaces a quarter after it started."
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

      <Section className="bg-surface !py-14 md:!py-18" id="the-review">
        <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr]">
          <div>
            <SectionHeader
              eyebrow="The core engagement"
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
            <p className="mt-6 text-base leading-7 text-muted">{recoveryReview.feeBoundary}</p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <LinkButton href={offerHref(recoveryReview.slug)}>See Scope &amp; Pricing</LinkButton>
              <LinkButton href={`${offerHref(recoveryReview.slug)}#what-it-produces`} variant="secondary">
                What It Produces
              </LinkButton>
            </div>
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

      <Section className="!py-14 md:!py-18" id="why-tko">
        <SectionHeader
          eyebrow="Why TKO"
          title="Why hire one senior person instead of a firm."
          description="A large firm sells a team and bills the ramp, which is the right purchase for some problems. It is the wrong purchase when the question is whether the program should continue at all."
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

      <CredibilityStrip />

      <Section className="!py-14 md:!py-18">
        <SectionHeader
          eyebrow="Healthcare experience"
          title="Where the judgment comes from."
          description="Prior authorization, utilization management, transformation recovery, and CMS interoperability, inside enterprise healthcare organizations."
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
              owned by separate teams.
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
              experience, clinical workflow, eligibility, and member operations, where healthy local
              status coexisted with unresolved portfolio risk.
            </p>
            <LinkButton href="/selected-work/enterprise-care-management-modernization" variant="secondary" className="mt-6">
              Review the Experience
            </LinkButton>
          </Card>
          <Card>
            <p className="text-sm font-semibold uppercase tracking-[0.1em] text-muted">Interoperability</p>
            <h3 className="mt-4 text-xl font-semibold leading-tight">Regulated Implementation</h3>
            <p className="mt-4 text-base leading-7 text-muted">
              Payer-facing CMS Cures Act and FHIR interoperability ownership, connecting technical
              exchange to onboarding, access control, auditability, and operating governance.
            </p>
            <LinkButton href="/selected-work/healthcare-interoperability-platform" variant="secondary" className="mt-6">
              Review the Experience
            </LinkButton>
          </Card>
        </div>
        <p className="mt-8 max-w-[72ch] text-sm leading-6 text-muted">
          These describe my role and the operating mechanism. Employment history establishes
          experience, not employer or client endorsement, and confidential client outcomes stay
          unpublished.
        </p>
        <EvidenceNoteLink className="mt-2" />
      </Section>

      <Section className="bg-surface !py-14 md:!py-18">
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

      <Section className="!py-12 md:!py-14">
        <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
          <div className="max-w-[72ch]">
            <p className="text-sm font-semibold uppercase tracking-[0.1em] text-muted">
              Supporting evidence
            </p>
            <p className="mt-4 text-base leading-7 text-muted">
              RachelOS is an operating system I built and run independently. It demonstrates how I
              make workflow, evidence, approvals, and handoffs explicit. That is the same
              discipline I apply after a Recovery Review.
            </p>
          </div>
          <LinkButton href="/selected-work/from-crm-to-operating-system" variant="secondary">
            Inspect the System
          </LinkButton>
        </div>
      </Section>

      <CtaBand
        title="Get an independent read before the next funding decision."
        description={PROGRAM_RECOVERY_CONVERSATION.summary}
        primaryLabel={site.cta}
        secondaryHref={READINESS_CHECK_PATH}
        secondaryLabel="Use the Readiness Check"
      />

      <section aria-label="For consulting firms" className="border-t border-border bg-surface">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-6 py-8 sm:flex-row sm:items-center sm:justify-between lg:px-8">
          <p className="max-w-[60ch] text-base leading-7 text-muted">
            For consultancies and integrators: I take subcontract work on accounts you already
            hold, delivered under your agreement and brand.
          </p>
          <LinkButton href={SPECIALIST_CONVERSATION.href} variant="secondary" ctaLocation="homepage_specialist">
            {site.secondaryCta}
          </LinkButton>
        </div>
      </section>
    </>
  );
}
