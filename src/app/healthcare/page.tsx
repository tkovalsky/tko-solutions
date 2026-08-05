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
  title: "Healthcare Practice",
  description:
    "Healthcare transformation recovery for health plans, healthcare services organizations, managed-care organizations, PE-backed provider platforms, and large provider organizations.",
  alternates: { canonical: "/healthcare" },
  openGraph: {
    title: "Healthcare Practice | TKO Solutions",
    description:
      "Enterprise healthcare operating experience behind a fixed-fee, three-week Program Recovery Review.",
    url: absoluteUrl("/healthcare"),
    images: [{ url: site.socialImage, width: 1200, height: 630, alt: "TKO Solutions healthcare transformation program recovery." }],
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
  ["Implementation under controls", "RachelOS, an operating system I built and run, shows workflow design, source authority, human approval, operating health, and bounded AI assistance in a working environment."],
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
          name: "TKO Solutions Healthcare Practice",
          url: absoluteUrl("/healthcare"),
          description: metadata.description,
          about: ["Healthcare Transformation", "Program Recovery", "Prior Authorization", "Utilization Management", "Healthcare Interoperability", "Administrative Cost"],
        }}
      />
      <PageHero
        eyebrow="Healthcare specialization"
        title="Transformation recovery is the work. Prior authorization is where it is sharpest."
        description="I work with health plans, healthcare services organizations, managed-care organizations, PE-backed provider platforms, and large provider organizations when a transformation program is behind, over budget, or about to fund automation on top of an unstable workflow. Prior authorization and utilization management are where my experience is sharpest; the practice extends across the operating domains below."
        primaryHref="/contact"
        primaryLabel="Request a Program Recovery Conversation"
        secondaryHref="/services/program-recovery-review"
        secondaryLabel="See Scope & Pricing"
      />

      <Section className="bg-surface !py-12 md:!py-16">
        <div className="grid gap-5 md:grid-cols-3">
          <Credential title="Primary focus" body="Healthcare transformation program recovery" />
          <Credential title="Starting engagement" body="3 weeks · $18,000–$25,000 fixed fee" />
          <Credential title="Operating principle" body="Fix the workflow before funding more automation" />
        </div>
      </Section>

      <Section>
        <SectionHeader
          eyebrow="Recognizable operating problems"
          title="The technology layer is only one part of the work."
          description="Programs stall at the boundaries between workstreams, where dependencies and decision rights are owned by no one. Prior authorization makes that failure concrete and measurable, which is why it is the sharpest proof domain. The same structure appears in every operating domain below."
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
          eyebrow="Why I am relevant here"
          title="Operations, product, regulation, technology, and implementation in one operating view."
          description="Each of these on its own is common. The combination is what lets me tell whether a stalled program is a scope problem, an authority problem, an adoption problem, or a technology problem, usually within the first week."
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
          Review the evidence
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
        </Link>
      </Section>

      <Section>
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <SectionHeader
            eyebrow="What the Recovery Review resolves"
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
        description="If leadership needs to understand the operating causes before making another technology, staffing, or vendor decision, start with a 45-minute Program Recovery Conversation."
        primaryLabel="Request a Program Recovery Conversation"
        secondaryHref="/services/program-recovery-review"
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
