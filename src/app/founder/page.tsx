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
      "The senior operator behind TKO's Program Recovery Review, Fractional Transformation Lead, and Specialist Subcontract engagements.",
    url: absoluteUrl("/founder"),
    images: [{ url: site.socialImage, width: 1200, height: 630, alt: "TKO Solutions healthcare transformation program recovery." }],
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
  "Todd leads every engagement personally; nothing is delegated to a junior assessment team.",
  "He frames the decision, reviews evidence, interviews stakeholders, traces the workflow, and leads the executive readout.",
  "Where continued senior accountability is warranted, he holds it himself as Fractional Transformation Lead.",
  "TKO may recommend internal execution, an existing vendor, a specialist partner, or no further investment. A Review creates no obligation to continue.",
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
        primaryLabel="Request a Program Recovery Conversation"
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
        <p className="mt-3 max-w-[78ch] text-sm leading-6 text-muted">
          TKO is a separate, limited-capacity advisory practice. Todd accepts fixed-scope work he can lead personally;
          availability and fit are confirmed before contracting. Current employment and client work are not TKO
          engagements or endorsements.
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
              Introduce Todd to an executive at a health plan, healthcare services organization, managed-care organization, PE-backed provider platform, or large provider organization when a transformation program is behind, over budget, or about to fund automation on top of a workflow nobody has mapped. Also introduce him to consultancies and integrators who need senior healthcare specialist depth on an account they already hold.
            </p>
          </div>
          <Link
            href="/services/program-recovery-review"
            className="group inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.08em] text-primary hover:text-primary-dark"
          >
            See the Program Recovery Review
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </Link>
        </div>
      </Section>

      <CtaBand
        title="Discuss the operating problem with the principal who will lead the work."
        description="The first step is a 45-minute Program Recovery Conversation about the program, the trigger, the evidence available, and who owns the decision."
        primaryLabel="Request a Program Recovery Conversation"
        secondaryHref="/services/program-recovery-review"
        secondaryLabel="See Scope & Pricing"
      />
    </>
  );
}
