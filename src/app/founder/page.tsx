import type { Metadata } from "next";
import { ExternalLink } from "lucide-react";
import { CtaBand } from "@/components/site/cta-band";
import { JsonLd } from "@/components/site/json-ld";
import { PageHero } from "@/components/site/page-hero";
import { Card } from "@/components/ui/card";
import { Section, SectionHeader } from "@/components/ui/section";
import { careerTimeline, executiveSummary } from "@/lib/founder";
import { absoluteUrl, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Todd Kovalsky | Transformation Recovery & Execution Advisor",
  description:
    "Todd Kovalsky brings more than 20 years across regulated operations, enterprise transformation, product ownership, healthcare interoperability, healthcare transformation, and hands-on implementation.",
  alternates: { canonical: "/founder" },
  openGraph: {
    title: "Todd Kovalsky | Transformation Recovery & Execution Advisor",
    description:
      "Senior accountability when a transformation needs an honest reset.",
    url: absoluteUrl("/founder"),
    images: [
      {
        url: site.socialImage,
        width: 1200,
        height: 630,
        alt: "Todd Kovalsky, Transformation Recovery and Execution Advisor.",
      },
    ],
  },
};

const trustedProblems = [
  ["Enterprise program recovery", "Making cross-workstream dependencies, decision ownership, delivery confidence, vendor exposure, and executive tradeoffs visible when local status no longer explains program risk."],
  ["Regulated product delivery", "Turning policy, access, auditability, governance, technical requirements, and operating behavior into one implementable product and delivery model."],
  ["Operating workflow failure", "Tracing evidence, handoffs, exceptions, escalation, key-person dependency, and adoption before recommending technology, automation, staffing, or process change."],
  ["Product and platform execution", "Connecting operator requirements, product priorities, technology sequencing, controls, and implementation decisions in financial, wealth, and healthcare environments."],
];

const environments = [
  ["Healthcare transformation", "Enterprise modernization, payer and provider operations, care management, clinical and administrative workflows, utilization management, and prior authorization."],
  ["Healthcare interoperability", "CMS Cures Act, FHIR, payer-facing requirements, access control, auditability, governance, onboarding, and regulated product ownership."],
  ["Financial and wealth operations", "Credit and fund operations, institutional platforms, investment operations, advisor technology, trading, settlement, and post-acquisition delivery."],
  ["Inspectable implementation", "Founder-built operating systems demonstrating workflow design, source authority, traceability, human approval, operating controls, and disciplined AI assistance."],
];

const recoveryCapabilities = [
  "Establish an accepted delivery baseline before another replan.",
  "Expose cross-workstream dependencies, aging decisions, and missing owners.",
  "Separate program symptoms from the control failures leadership can change.",
  "Reset governance, vendor actions, sequencing, and operational-readiness expectations.",
  "Build a measurable 90-day recovery plan with explicit decision gates.",
  "Stay through mobilization, handoff, and sustainment when the recovery requires it.",
];

const engagementRole = [
  "Todd leads the fact-finding, evidence review, stakeholder interviews, diagnosis, and executive readout personally.",
  "He works across operations, product, technology, governance, vendors, adoption, and value rather than assessing one workstream in isolation.",
  "The work begins with a bounded executive decision and the smallest engagement that can protect it.",
  "TKO remains independent and vendor-neutral; the recommendation may be to continue, reset, narrow, renegotiate, change ownership, use another partner, or stop.",
  "If mobilization is warranted, Todd remains accountable for the recovery cadence, measurable actions, and transition to client owners.",
];

export default function FounderPage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ProfilePage",
          name: "Todd Kovalsky | Transformation Recovery & Execution Advisor",
          url: absoluteUrl("/founder"),
          mainEntity: {
            "@type": "Person",
            name: "Todd Kovalsky",
            jobTitle: "Transformation Recovery & Execution Advisor",
            worksFor: { "@type": "Organization", name: site.name, url: site.url },
            sameAs: [site.linkedin],
            knowsAbout: [
              "Transformation Recovery",
              "Program Recovery",
              "Delivery Governance",
              "Healthcare Transformation",
              "Healthcare Interoperability",
              "Prior Authorization",
              "Regulated Product Delivery",
              "Financial and Wealth Operations",
            ],
          },
        }}
      />

      <PageHero
        eyebrow="Todd Kovalsky · Founder & principal"
        title={executiveSummary.headline}
        description="Todd has spent more than 20 years working where operations, product, technology, vendors, governance, and executive decisions collide. He leads TKO's fact-finding, diagnosis, executive readout, and recovery mobilization personally."
        primaryHref="/contact"
        primaryLabel={site.cta}
        secondaryHref="/selected-work"
        secondaryLabel="Review Selected Work"
      />

      <Section className="bg-surface !py-12 md:!py-16">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {executiveSummary.facts.map((fact) => (
            <div key={fact} className="border border-border bg-white p-5 text-sm leading-6 text-muted">
              {fact}
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <SectionHeader
          eyebrow="Problems Todd has been trusted to solve"
          title="Execution problems that sit between functions, systems, vendors, and executive decisions."
        />
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {trustedProblems.map(([title, body]) => (
            <Card key={title}>
              <h2 className="text-2xl font-semibold">{title}</h2>
              <p className="mt-4 text-base leading-7 text-muted">{body}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section className="bg-surface">
        <SectionHeader
          eyebrow="Relevant operating environments"
          title="Healthcare depth with regulated-enterprise portability."
        />
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {environments.map(([title, body]) => (
            <Card key={title} className="bg-white">
              <h2 className="text-xl font-semibold">{title}</h2>
              <p className="mt-3 text-sm leading-6 text-muted">{body}</p>
            </Card>
          ))}
        </div>
        <p className="mt-6 max-w-4xl text-xs leading-5 text-muted">
          Employment experience establishes relevant scope and accountability. It is
          not presented as employer endorsement, client endorsement, or an attributable
          TKO result. RachelOS is internal, non-healthcare proof of implementation discipline.
        </p>
      </Section>

      <Section>
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeader
            eyebrow="Recovery capabilities"
            title="From delivery reality to an executable 90-day reset."
            description="Todd's role is to connect the program views that functions and vendors hold separately, make the material control failures explicit, and give the sponsor a defensible path forward."
          />
          <ul className="grid gap-3">
            {recoveryCapabilities.map((item) => (
              <li key={item} className="border border-border bg-white p-5 text-base leading-7 text-muted">{item}</li>
            ))}
          </ul>
        </div>
      </Section>

      <Section className="bg-surface">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeader
            eyebrow="How Todd leads an engagement"
            title="Senior operator accountability—not a junior assessment team or slide-deck handoff."
            description="The commercial value is a bounded, principal-led intervention with explicit evidence, accountable decisions, and a measurable next step."
          />
          <ul className="grid gap-3">
            {engagementRole.map((item) => (
              <li key={item} className="border border-border bg-white p-5 text-base leading-7 text-muted">{item}</li>
            ))}
          </ul>
        </div>
      </Section>

      <Section>
        <SectionHeader
          eyebrow="Career chronology"
          title="Each chapter contributes a recovery-relevant operating capability."
          description="This is a verifiable diligence record, not a list of logos presented as endorsements."
        />
        <ol className="mt-10 space-y-0 border-l-2 border-border">
          {careerTimeline.map((entry) => (
            <li key={`${entry.years}-${entry.organization}`} className="relative pb-10 pl-8 last:pb-0">
              <span aria-hidden="true" className="absolute -left-[7px] top-1.5 size-3 rounded-full border-2 border-primary bg-white" />
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">{entry.years} · {entry.era}</p>
              <h2 className="mt-2 text-xl font-semibold">{entry.organization}</h2>
              <p className="mt-1 text-sm font-semibold text-primary">{entry.role}</p>
              <p className="mt-3 max-w-[72ch] text-base leading-7 text-muted">{entry.scope}</p>
              <p className="mt-3 max-w-[72ch] text-sm leading-6 text-foreground">
                <span className="font-semibold text-primary">Recovery relevance: </span>{entry.buyerRelevance}
              </p>
            </li>
          ))}
        </ol>
        <a
          href={site.linkedin}
          target="_blank"
          rel="noreferrer"
          data-conversion-event="linkedin_click"
          data-cta-location="founder_career_record"
          data-cta-label="Review LinkedIn"
          className="mt-10 inline-flex min-h-11 items-center gap-2 border border-border bg-white px-5 text-sm font-semibold uppercase tracking-[0.08em] text-foreground hover:border-primary hover:text-primary"
        >
          Review LinkedIn
          <ExternalLink className="size-4" aria-hidden="true" />
        </a>
      </Section>

      <CtaBand
        title="Bring the transformation that needs an honest reset."
        description="The first step is a confidential 30-minute conversation about the trigger, program boundary, evidence, sponsor, timing, and executive decision required within 90 days."
        secondaryHref="/selected-work"
        secondaryLabel="Review Selected Work"
      />
    </>
  );
}
