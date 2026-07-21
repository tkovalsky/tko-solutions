import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";
import { CtaBand } from "@/components/site/cta-band";
import { JsonLd } from "@/components/site/json-ld";
import { PageHero } from "@/components/site/page-hero";
import { Card } from "@/components/ui/card";
import { Section, SectionHeader } from "@/components/ui/section";
import { absoluteUrl, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Prior Authorization Operations for Specialty Medical Groups",
  description:
    "TKO helps specialty medical groups, MSOs, and provider-side healthcare operators identify the workflow causes of prior-authorization delay, rework, denials, and staff dependency.",
  alternates: { canonical: "/healthcare" },
  openGraph: {
    title: "Prior Authorization Operations | TKO Solutions",
    description:
      "Healthcare operating experience behind a fixed-fee prior-authorization workflow Diagnostic.",
    url: absoluteUrl("/healthcare"),
    images: [{ url: site.socialImage, width: 1200, height: 630, alt: "TKO Solutions prior authorization performance advisory." }],
  },
};

const operatingProblems = [
  {
    title: "Prior authorization",
    body: "Requests move through inconsistent intake, documentation, payer handling, follow-up, exception, and escalation paths. The cost appears as delay, rework, denials, backlog, and dependence on experienced staff.",
  },
  {
    title: "Utilization management",
    body: "Review work depends on complete evidence, explicit prioritization, defined decision authority, and reliable escalation. Technology does not resolve those operating requirements by itself.",
  },
  {
    title: "Interoperability",
    body: "FHIR and data exchange can improve information availability. They do not determine who owns the next action, how conflicting evidence is resolved, or how exceptions move through the operating workflow.",
  },
  {
    title: "Administrative transformation",
    body: "Programs stall when workstream status hides cross-functional dependencies, adoption risk, and decisions that no single team owns. The same problem appears inside a PA workflow at a smaller scale.",
  },
];

const credibility = [
  ["Prior authorization and utilization management", "Experience with payer/provider coordination, review tiers, exceptions, escalation, auditability, and human decision points."],
  ["Healthcare interoperability", "Verified product ownership covering CMS Cures Act, FHIR, access control, auditability, governance, and payer-facing requirements."],
  ["Enterprise healthcare transformation", "Experience in delivery governance, executive reporting, dependency management, workflow transformation, and AI-enabled operating improvement."],
  ["Implementation under controls", "RachelOS supplies inspectable, non-healthcare evidence of workflow design, source authority, human approval, operating health, and bounded AI assistance."],
];

const diagnosticQuestions = [
  "Where does a request first become incomplete, delayed, or likely to require rework?",
  "Which payer, specialty, location, or exception patterns explain meaningful variation?",
  "Where do experienced staff compensate for unclear standard work or escalation?",
  "Which measures are credible enough to govern a 90-day improvement?",
  "What should be standardized, controlled, automated, or deliberately left under human judgment?",
];

export default function HealthcarePage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "Prior Authorization Operations for Specialty Medical Groups",
          url: absoluteUrl("/healthcare"),
          description: metadata.description,
          about: ["Prior Authorization", "Utilization Management", "Provider Operations", "Healthcare Interoperability", "Administrative Burden"],
        }}
      />
      <PageHero
        eyebrow="Healthcare specialization"
        title="Prior authorization is the commercial focus. Healthcare operating experience is the foundation."
        description="TKO works with specialty medical groups, MSOs, and provider-side healthcare operators when prior-authorization delay, rework, denials, inconsistent payer handling, or staff dependency is creating an expensive operating problem. The first engagement is a 15-business-day Diagnostic—not a broad transformation program or technology pitch."
        primaryHref="/contact"
        primaryLabel="Request a Diagnostic Fit Call"
        secondaryHref="/services/diagnostic"
        secondaryLabel="See Scope & Pricing"
      />

      <Section className="bg-surface !py-12 md:!py-16">
        <div className="grid gap-5 md:grid-cols-3">
          <Credential title="Primary specialization" body="Provider-side prior-authorization performance" />
          <Credential title="Starting engagement" body="15 business days · $25,000 fixed fee" />
          <Credential title="Operating principle" body="Fix the workflow before funding more automation" />
        </div>
      </Section>

      <Section>
        <SectionHeader
          eyebrow="Recognizable operating problems"
          title="The technology layer is only one part of the work."
          description="Prior authorization is the entry wedge because it makes the operating failure concrete and measurable. Related healthcare experience matters when it helps leadership understand workflow, evidence, authority, controls, and implementation—not as a separate menu of services."
        />
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {operatingProblems.map((item) => (
            <Card key={item.title}>
              <h2 className="text-2xl font-semibold">{item.title}</h2>
              <p className="mt-4 text-base leading-7 text-muted">{item.body}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section className="bg-surface">
        <SectionHeader
          eyebrow="Why Todd is relevant"
          title="Operations, product, regulation, technology, and implementation in one operating view."
          description="The credibility is the intersection, not a claim that every prior role produced a publishable client result. Employment history establishes experience. Selected Work states the available evidence and its limits."
        />
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {credibility.map(([title, body]) => (
            <Card key={title} className="bg-white">
              <h2 className="text-xl font-semibold">{title}</h2>
              <p className="mt-3 text-sm leading-6 text-muted">{body}</p>
            </Card>
          ))}
        </div>
        <Link
          href="/selected-work"
          className="group mt-8 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.08em] text-primary hover:text-primary-dark"
        >
          Review the evidence and its limits
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
        </Link>
      </Section>

      <Section>
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <SectionHeader
            eyebrow="What the Diagnostic resolves"
            title="A client-specific baseline before an implementation decision."
            description="The engagement stays within one organization and one defined PA workflow or specialty/payer segment. It produces evidence leadership can use whether TKO implements the next step or not."
          />
          <ul className="grid gap-3">
            {diagnosticQuestions.map((question) => (
              <li key={question} className="border border-border bg-white p-5 text-base leading-7 text-muted">
                {question}
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section className="bg-surface !py-12 md:!py-16">
        <div className="grid gap-8 lg:grid-cols-[1.25fr_0.75fr] lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.1em] text-primary">Regulatory context</p>
            <h2 className="mt-4 text-3xl font-semibold">Interoperability requirements increase the need for operating clarity.</h2>
            <p className="mt-4 max-w-[70ch] text-base leading-7 text-muted">
              CMS-0057-F advances prior-authorization process and API requirements for impacted payers. That technology and policy context is important, but it does not replace provider-side workflow design, evidence quality, exception handling, ownership, or adoption.
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
        title="Bring one prior-authorization workflow under pressure."
        description="If leadership needs to understand the operating causes before making another technology, staffing, or vendor decision, request a Diagnostic Fit Call."
        primaryLabel="Request a Diagnostic Fit Call"
        secondaryHref="/services/diagnostic"
        secondaryLabel="See Scope & Pricing"
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
