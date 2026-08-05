import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";
import { CtaBand } from "@/components/site/cta-band";
import { JsonLd } from "@/components/site/json-ld";
import { PageHero } from "@/components/site/page-hero";
import { Card } from "@/components/ui/card";
import { Section, SectionHeader } from "@/components/ui/section";
import { careerTimeline, executiveSummary, howIWork } from "@/lib/founder";
import { offerHref, PROGRAM_RECOVERY_CONVERSATION } from "@/lib/offers";
import { absoluteUrl, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Todd Kovalsky | Founder & Principal",
  description:
    "Twenty years across regulated operations, healthcare product, CMS interoperability, and enterprise transformation — and how I work, including capacity, conflicts, and confidentiality.",
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
  "I frame the decision, read the program artifacts, interview stakeholders, trace the workflow, and present the readout.",
  "Where continued senior accountability is warranted, I hold it myself as Fractional Transformation Lead.",
  "I may recommend internal execution, an existing vendor, a specialist partner, or no further investment. A Review creates no obligation to continue.",
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
            jobTitle: "Founder & Principal, Healthcare Transformation Recovery",
            worksFor: { "@type": "Organization", name: site.name, url: site.url },
            sameAs: [site.linkedin],
            knowsAbout: [
              "Healthcare Transformation",
              "Program Recovery",
              "Prior Authorization",
              "Utilization Management",
              "Healthcare Interoperability",
            ],
          },
        }}
      />

      <PageHero
        eyebrow="Founder & principal"
        title={executiveSummary.headline}
        description="I spent twenty years in regulated operations, healthcare product ownership, CMS interoperability, and enterprise transformation delivery. That combination matters because a stalled transformation program rarely belongs to one department or one system, and the people who can see all of it are usually the ones who have worked in most of it."
        primaryHref={PROGRAM_RECOVERY_CONVERSATION.href}
        primaryLabel={site.cta}
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
      </Section>

      <Section>
        <SectionHeader
          eyebrow="Why this background matters"
          title="The expensive problem sits between specialties."
          description="A transformation program fails when operations, clinical review, revenue cycle, policy, technology, and change adoption each see only part of it. My job is to connect those views into one operating decision leadership can act on."
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

      <Section id="how-i-work" className="bg-surface">
        <SectionHeader
          eyebrow="How I work"
          title="Capacity, conflicts, and confidentiality."
          description="The practical questions buyers ask before engaging an independent principal, answered directly."
        />
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {howIWork.map((item) => (
            <Card key={item.title} className="bg-white">
              <h2 className="text-xl font-semibold leading-tight">{item.title}</h2>
              <p className="mt-3 text-base leading-7 text-muted">{item.body}</p>
            </Card>
          ))}
        </div>
        <p className="mt-8 max-w-[76ch] text-base leading-7 text-muted">
          TKO is deliberately limited-capacity. I take a small number of fixed-scope engagements I
          can lead personally, and I confirm availability before contracting. My current enterprise
          healthcare work keeps the perspective current; it is walled off from TKO engagements by
          scope and agreement.
        </p>
        <p className="mt-4 max-w-[76ch] text-sm leading-6 text-muted">
          The career record below is verifiable on LinkedIn and is presented as experience. No
          employer or client endorses this practice.
        </p>
      </Section>

      <Section>
        <SectionHeader
          eyebrow="Career record"
          title="What each chapter contributes."
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

      <Section className="bg-surface">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr]">
          <SectionHeader
            eyebrow="What you are buying"
            title="Senior attention from first call to readout."
            description="The value is a principal-led engagement with a bounded decision, explicit evidence, and a clear next step."
          />
          <ul className="grid gap-3">
            {engagementRole.map((item) => (
              <li key={item} className="border border-border bg-white p-5 text-base leading-7 text-muted">{item}</li>
            ))}
          </ul>
        </div>
      </Section>

      <Section className="!py-12 md:!py-16">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.1em] text-primary">Referral language</p>
            <h2 className="mt-4 text-3xl font-semibold">Who to introduce me to</h2>
            <p className="mt-4 max-w-[68ch] text-lg leading-8 text-muted">
              An executive at a health plan, healthcare services organization, managed-care
              organization, PE-backed provider platform, or large provider organization whose
              transformation program is behind, over budget, or about to fund automation on top of
              a workflow nobody has mapped. Also consultancies and integrators who need senior
              healthcare specialist depth on an account they already hold.
            </p>
          </div>
          <Link
            href={offerHref("program-recovery-review")}
            className="group inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.08em] text-primary hover:text-primary-dark"
          >
            See the Program Recovery Review
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </Link>
        </div>
      </Section>

      <CtaBand
        title="Talk to the person who will do the work."
        description={PROGRAM_RECOVERY_CONVERSATION.summary}
        primaryLabel={site.cta}
        secondaryHref={offerHref("program-recovery-review")}
        secondaryLabel="See Scope & Pricing"
      />
    </>
  );
}
