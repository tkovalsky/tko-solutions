import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";
import { CtaBand } from "@/components/site/cta-band";
import { JsonLd } from "@/components/site/json-ld";
import { PageHero } from "@/components/site/page-hero";
import { LinkButton } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Section, SectionHeader } from "@/components/ui/section";
import { absoluteUrl, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Healthcare Transformation Recovery",
  description:
    "TKO helps healthcare executive teams recover transformation programs, translate interoperability and regulatory requirements into operating behavior, and improve bounded workflows including prior authorization.",
  alternates: { canonical: "/healthcare" },
  openGraph: {
    title: "Healthcare Transformation Recovery | TKO Solutions",
    description:
      "Healthcare transformation, interoperability, regulated operations, workflow execution, and a dedicated Prior Authorization Performance Diagnostic.",
    url: absoluteUrl("/healthcare"),
    images: [
      {
        url: site.socialImage,
        width: 1200,
        height: 630,
        alt: "TKO Solutions healthcare transformation recovery specialization.",
      },
    ],
  },
};

const healthcarePressures = [
  {
    title: "Enterprise transformation recovery",
    body: "Multi-workstream programs lose control when claims, care management, provider experience, clinical workflow, eligibility, member operations, technology, vendors, and adoption move on different baselines.",
  },
  {
    title: "Interoperability and regulated product delivery",
    body: "FHIR, access, auditability, governance, onboarding, and operating ownership must work together. An API or compliance plan alone does not create reliable operating behavior.",
  },
  {
    title: "Regulated workflow execution",
    body: "Administrative and clinical-adjacent work depends on complete evidence, explicit decision authority, reliable escalation, controls, adoption, and measures the operator can sustain.",
  },
  {
    title: "Prior authorization performance",
    body: "Inconsistent intake, documentation, payer handling, follow-up, exceptions, and escalation create delay, rework, avoidable denials, backlog, and dependence on experienced staff.",
  },
];

const credibility = [
  ["Enterprise healthcare modernization", "Experience across delivery governance, executive reporting, dependencies, payer operations, clinical and administrative workflows, and cross-functional alignment."],
  ["Healthcare interoperability", "Verified product ownership covering CMS Cures Act, FHIR, access control, auditability, data governance, and payer-facing requirements."],
  ["Prior authorization and utilization management", "Experience with payer/provider coordination, review tiers, exceptions, escalation, auditability, and human decision points."],
  ["Implementation under controls", "Founder-built operating systems provide inspectable evidence of source authority, workflow design, human approval, operating health, and bounded AI assistance."],
];

const diagnosticQuestions = [
  "Where does a request first become incomplete, delayed, or likely to require rework?",
  "Which payer, specialty, location, or exception patterns explain meaningful variation?",
  "Where do experienced staff compensate for unclear standard work, evidence, or escalation?",
  "Which measures are credible enough to govern a 90-day improvement?",
  "What should be standardized, controlled, automated, or deliberately left under human judgment?",
];

const diagnosticOutputs = [
  "Executive decision brief",
  "Baseline scorecard and KPI definitions",
  "Current-state workflow and exception map",
  "Denial, rework, handoff, and delay driver analysis",
  "Decision-rights and escalation map",
  "Target workflow and operating requirements",
  "Prioritized backlog and 90-day roadmap",
];

export default function HealthcarePage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "Healthcare Transformation Recovery",
          url: absoluteUrl("/healthcare"),
          description: metadata.description,
          about: [
            "Healthcare Transformation",
            "Healthcare Interoperability",
            "Regulated Operations",
            "Prior Authorization",
            "Utilization Management",
          ],
        }}
      />
      <PageHero
        eyebrow="Primary specialization"
        title="Healthcare transformation recovery, grounded in regulated operations and workflow execution."
        description="Healthcare is TKO's primary credibility base and first outbound market. Todd brings experience across enterprise modernization, payer and provider operations, interoperability, regulated product delivery, prior authorization, and controlled implementation."
        primaryHref="/contact"
        primaryLabel={site.cta}
        secondaryHref="#prior-authorization-diagnostic"
        secondaryLabel="See the PA Diagnostic"
      />

      <Section className="bg-surface !py-12 md:!py-16">
        <div className="grid gap-5 md:grid-cols-3">
          <Credential title="Primary market" body="Healthcare transformation and regulated operations" />
          <Credential title="Vertical diagnostic" body="15 business days · $25,000 fixed fee" />
          <Credential title="Delivery model" body="Principal-led and vendor-neutral" />
        </div>
      </Section>

      <Section>
        <SectionHeader
          eyebrow="Where healthcare execution breaks"
          title="Programs and workflows fail at the boundaries between policy, product, technology, operations, vendors, and adoption."
          description="TKO establishes the operating fact base, makes ownership and decisions explicit, and turns regulated requirements into an executable recovery or workflow plan."
        />
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {healthcarePressures.map((item) => (
            <Card key={item.title}>
              <h2 className="text-2xl font-semibold">{item.title}</h2>
              <p className="mt-4 text-base leading-7 text-muted">{item.body}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section className="bg-surface">
        <SectionHeader
          eyebrow="Relevant healthcare experience"
          title="Operations, product, regulation, technology, and implementation in one operating view."
          description="The credibility is the intersection of these environments, not a claim that every prior role produced a publishable TKO client result."
        />
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {credibility.map(([title, body]) => (
            <Card key={title} className="bg-white">
              <h2 className="text-xl font-semibold">{title}</h2>
              <p className="mt-3 text-sm leading-6 text-muted">{body}</p>
            </Card>
          ))}
        </div>
        <p className="mt-6 max-w-4xl text-xs leading-5 text-muted">
          Employment experience establishes relevant scope and accountability. It is
          not presented as employer endorsement or an attributable TKO client result.
        </p>
        <Link
          href="/selected-work"
          className="group mt-8 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.08em] text-primary hover:text-primary-dark"
        >
          Review Selected Work
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
        </Link>
      </Section>

      <Section id="prior-authorization-diagnostic" className="scroll-mt-24">
        <div className="grid gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
          <div>
            <SectionHeader
              eyebrow="Healthcare-specific offer"
              title="Prior Authorization Performance Diagnostic"
              description="A fixed-fee, 15-business-day engagement for one defined prior-authorization workflow or specialty/payer segment. Leadership gets a measured baseline and a decision on what to fix, fund, automate, stop, or defer."
            />
            <dl className="mt-7 grid grid-cols-2 gap-4 border-y border-border py-5 text-sm">
              <div>
                <dt className="text-muted">Duration</dt>
                <dd className="mt-1 font-semibold">15 business days</dd>
              </div>
              <div>
                <dt className="text-muted">Fee</dt>
                <dd className="mt-1 font-semibold">$25,000 fixed</dd>
              </div>
              <div>
                <dt className="text-muted">Scope</dt>
                <dd className="mt-1 font-semibold">One PA workflow or segment</dd>
              </div>
              <div>
                <dt className="text-muted">Delivery</dt>
                <dd className="mt-1 font-semibold">Principal-led</dd>
              </div>
            </dl>
            <LinkButton href="/contact" className="mt-7">
              Request a Confidential Program Review
            </LinkButton>
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.12em] text-primary">
              Questions answered
            </p>
            <ul className="mt-5 grid gap-3">
              {diagnosticQuestions.map((question) => (
                <li key={question} className="border border-border bg-white p-5 text-base leading-7 text-muted">
                  {question}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-12">
          <p className="text-sm font-semibold uppercase tracking-[0.12em] text-primary">
            Concrete deliverables
          </p>
          <div className="mt-5 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {diagnosticOutputs.map((output) => (
              <div key={output} className="border border-border p-5 text-sm font-semibold">
                {output}
              </div>
            ))}
          </div>
          <p className="mt-6 text-sm leading-6 text-muted">
            The Diagnostic does not guarantee denial, cost, staffing, reimbursement,
            or revenue results. It establishes the baseline and implementation case
            required to set a responsible target.
          </p>
        </div>
      </Section>

      <Section className="bg-surface !py-12 md:!py-16">
        <div className="grid gap-8 lg:grid-cols-[1.25fr_0.75fr] lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.1em] text-primary">Regulatory context</p>
            <h2 className="mt-4 text-3xl font-semibold">Interoperability requirements increase the need for operating clarity.</h2>
            <p className="mt-4 max-w-[70ch] text-base leading-7 text-muted">
              CMS-0057-F advances prior-authorization process and API requirements for
              impacted payers. That technology and policy context is important, but it
              does not replace workflow design, evidence quality, exception handling,
              ownership, controls, or adoption.
            </p>
          </div>
          <a
            href="https://www.cms.gov/initiatives/burden-reduction/overview/interoperability/policies-regulations/cms-interoperability-prior-authorization-final-rule-cms-0057-f"
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-11 items-center justify-center gap-2 border border-border bg-white px-5 text-sm font-semibold uppercase tracking-[0.08em] text-foreground hover:border-primary hover:text-primary"
          >
            Review the CMS rule
            <ExternalLink className="size-4" aria-hidden="true" />
          </a>
        </div>
      </Section>

      <CtaBand
        title="Bring the healthcare program or workflow leadership needs to recover."
        description="Share what changed, where execution is under pressure, and what decision is required within 90 days. Todd will determine whether the PA Diagnostic, a recovery engagement, or another path is warranted."
        secondaryHref="#prior-authorization-diagnostic"
        secondaryLabel="See the PA Diagnostic"
      />
    </>
  );
}

function Credential({ title, body }: { title: string; body: string }) {
  return (
    <div className="border border-border bg-white p-5">
      <p className="text-xs font-semibold uppercase tracking-[0.12em] text-primary">{title}</p>
      <p className="mt-3 text-base font-semibold leading-7">{body}</p>
    </div>
  );
}
