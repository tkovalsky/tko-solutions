import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";
import { CtaBand } from "@/components/site/cta-band";
import { JsonLd } from "@/components/site/json-ld";
import { PageHero } from "@/components/site/page-hero";
import { Card } from "@/components/ui/card";
import { Section, SectionHeader } from "@/components/ui/section";
import { careerTimeline, executiveSummary } from "@/lib/founder";
import { absoluteUrl, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Todd Kovalsky | Founder & Principal",
  description:
    "Buyer-relevant diligence on Todd Kovalsky's experience across healthcare operations, prior authorization, interoperability, product, transformation, technology, and implementation.",
  alternates: { canonical: "/founder" },
  openGraph: {
    title: "Todd Kovalsky | Founder & Principal, TKO Solutions",
    description:
      "The operator behind TKO's Prior Authorization Performance Diagnostic and 90-Day Improvement Sprint.",
    url: absoluteUrl("/founder"),
    images: [{ url: site.socialImage, width: 1200, height: 630, alt: "TKO Solutions prior authorization performance advisory." }],
  },
};

const operatingIntersection = [
  ["Operations", "Controls, reconciliation, exception handling, handoffs, and accountable execution under consequence."],
  ["Healthcare", "Prior authorization, utilization management, provider operations, payer workflows, and administrative transformation."],
  ["Product and technology", "Translating workflow requirements into usable systems, standards, controls, and implementation choices."],
  ["Transformation", "Making cross-functional dependencies, decision ownership, adoption risk, and executive tradeoffs visible."],
  ["Regulation and governance", "Embedding access, auditability, authority, and human review into the operating design."],
  ["Implementation", "Moving from a measured baseline to a bounded pilot, operating playbook, training, and handoff."],
];

const engagementRole = [
  "Todd leads the Diagnostic personally; it is not delegated to a junior assessment team.",
  "He frames the decision, reviews evidence, interviews stakeholders, traces the workflow, and leads the executive readout.",
  "If implementation is warranted, he remains accountable for the 90-Day Sprint, pilot measures, and handoff.",
  "TKO may recommend internal execution, an existing vendor, a specialist partner, no further implementation, or the Sprint.",
];

export default function FounderPage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ProfilePage",
          name: "Todd Kovalsky | Founder & Principal, TKO Solutions",
          url: absoluteUrl("/founder"),
          mainEntity: {
            "@type": "Person",
            name: "Todd Kovalsky",
            jobTitle: "Founder & Principal, Prior Authorization Operations Advisor",
            worksFor: { "@type": "Organization", name: site.name, url: site.url },
            sameAs: [site.linkedin],
            knowsAbout: ["Prior Authorization", "Utilization Management", "Healthcare Operations", "Healthcare Interoperability", "Workflow Improvement"],
          },
        }}
      />

      <PageHero
        eyebrow="Founder & principal"
        title={executiveSummary.headline}
        description="Todd Kovalsky brings an uncommon combination of regulated operations, healthcare workflow, product ownership, transformation governance, technology, and hands-on implementation. That intersection matters because prior-authorization performance rarely belongs to one department or one system."
        primaryHref="/contact"
        primaryLabel="Request a Diagnostic Fit Call"
        secondaryHref="/selected-work"
        secondaryLabel="Review the Evidence"
      />

      <Section className="bg-surface !py-12 md:!py-16">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {executiveSummary.facts.map((fact) => (
            <div key={fact} className="border border-border bg-white p-5 text-sm leading-6 text-muted">
              {fact}
            </div>
          ))}
        </div>
        <p className="mt-6 text-xs leading-5 text-muted">
          Employment history is verifiable and is presented as experience—not employer endorsement, client endorsement, or evidence of a quantified TKO result.
        </p>
      </Section>

      <Section>
        <SectionHeader
          eyebrow="Why this background matters"
          title="The expensive workflow problem sits between specialties."
          description="A prior-authorization improvement can fail because operations, clinical review, revenue cycle, policy, technology, and change adoption each see only part of the workflow. Todd's role is to connect those views into one measured operating decision."
        />
        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {operatingIntersection.map(([title, body]) => (
            <Card key={title}>
              <h2 className="text-xl font-semibold">{title}</h2>
              <p className="mt-3 text-sm leading-6 text-muted">{body}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section className="bg-surface">
        <SectionHeader
          eyebrow="Verified career record"
          title="Each chapter contributes a buyer-relevant operating capability."
          description="This is a diligence record, not a list of logos presented as endorsements."
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
                <span className="font-semibold text-primary">Buyer relevance: </span>{entry.buyerRelevance}
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

      <Section>
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr]">
          <SectionHeader
            eyebrow="What the client is buying"
            title="Senior accountability from fit call through executive readout."
            description="The commercial value is not access to a résumé. It is a principal-led engagement with a bounded decision, explicit evidence, and a clear next step."
          />
          <ul className="grid gap-3">
            {engagementRole.map((item) => (
              <li key={item} className="border border-border bg-white p-5 text-base leading-7 text-muted">{item}</li>
            ))}
          </ul>
        </div>
      </Section>

      <Section className="bg-surface !py-12 md:!py-16">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.1em] text-primary">Referral language</p>
            <h2 className="mt-4 text-3xl font-semibold">Who to introduce to Todd</h2>
            <p className="mt-4 max-w-[68ch] text-lg leading-8 text-muted">
              Introduce Todd to a specialty medical group, MSO, or provider-side healthcare operator when prior-authorization delays, rework, avoidable denials, inconsistent payer handling, or reliance on a few experienced staff is forcing a technology, staffing, or operating decision.
            </p>
          </div>
          <Link
            href="/services/diagnostic"
            className="group inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.08em] text-primary hover:text-primary-dark"
          >
            See the Prior Authorization Diagnostic
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </Link>
        </div>
      </Section>

      <CtaBand
        title="Discuss the operating problem with the principal who will lead the work."
        description="The first step is a qualified 30-minute conversation about the workflow, trigger, evidence, decision owner, and fit for the $25,000 Diagnostic."
        primaryLabel="Request a Diagnostic Fit Call"
        secondaryHref="/services/diagnostic"
        secondaryLabel="See Scope & Pricing"
      />
    </>
  );
}
