import type { Metadata } from "next";
import { CtaBand } from "@/components/site/cta-band";
import { JsonLd } from "@/components/site/json-ld";
import { PageHero } from "@/components/site/page-hero";
import { Card } from "@/components/ui/card";
import { Section, SectionHeader } from "@/components/ui/section";
import { absoluteUrl, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "90-Day Recovery Mobilization",
  description:
    "A 12-week, $75,000–$150,000+ engagement that turns an accepted recovery diagnosis into an integrated plan, accountable ownership, vendor actions, operating cadence, and measurable execution.",
  alternates: { canonical: "/services/operating-system-build" },
  openGraph: {
    title: "90-Day Recovery Mobilization",
    description:
      "Stabilize and reset one transformation program with senior, principal-led recovery leadership.",
    url: absoluteUrl("/services/operating-system-build"),
    images: [
      {
        url: site.socialImage,
        width: 1200,
        height: 630,
        alt: "TKO Solutions 90-Day Recovery Mobilization.",
      },
    ],
  },
};

const prerequisites = [
  "An accepted recovery diagnosis or equivalent fact base",
  "One major program with a defined recovery boundary",
  "An accountable executive sponsor and empowered program owner",
  "Agreement on the decisions, measures, and exposures that matter",
  "Practical access to workstream, vendor, operations, product, and technology leaders",
];

const targetChanges = [
  "One accepted scope, baseline, recovery charter, and integrated plan are operating.",
  "Workstream ownership, dependencies, decisions, and escalation paths are explicit.",
  "Vendor commitments, gaps, and commercial or delivery actions are visible to the sponsor.",
  "Milestones are connected to operational readiness, adoption, and measurable benefits.",
  "Executives review a small set of evidence-backed measures at an agreed cadence.",
  "The team can sustain the recovery controls after TKO transitions out.",
  "Any AI or automation has defined authority, human review, controls, and failure paths.",
];

const workstreams = [
  {
    title: "Recovery office and re-baseline",
    description:
      "Establish the recovery charter, integrated plan, milestone logic, operating cadence, and executive dashboard.",
  },
  {
    title: "Ownership and decisions",
    description:
      "Reset accountable owners, decision rights, escalation thresholds, aging controls, and sponsor decision forums.",
  },
  {
    title: "Vendor recovery",
    description:
      "Reconcile commitments, evidence, dependencies, acceptance criteria, and the actions required from vendors and client leaders.",
  },
  {
    title: "Workstream alignment",
    description:
      "Connect product, technology, operations, data, compliance, change, and other workstreams around one executable sequence.",
  },
  {
    title: "Operational readiness and value",
    description:
      "Tie delivery to adoption, workflow readiness, benefits evidence, controlled rollout, and the transition to accountable operators.",
  },
];

const plan = [
  ["Weeks 1–2", "Activate the recovery charter, owners, decision forums, measures, vendor actions, and integrated re-baseline."],
  ["Weeks 3–5", "Resolve critical dependencies, reset workstream sequencing, and close the highest-exposure ownership and evidence gaps."],
  ["Weeks 6–8", "Drive the recovery cadence, validate milestone confidence, and connect delivery to operational-readiness and adoption evidence."],
  ["Weeks 9–10", "Correct control failures, test transition readiness, and make remaining funding, scope, vendor, or leadership decisions explicit."],
  ["Weeks 11–12", "Complete the sustainment package, transfer ownership, and provide the executive decision on the next recovery horizon."],
];

const measures = [
  "Decision age and closure rate",
  "Critical dependency age",
  "Milestone confidence",
  "Committed versus accepted vendor output",
  "Workstream plan integrity",
  "Scope and change stability",
  "Operational-readiness evidence",
  "Adoption evidence",
  "Benefit-baseline coverage",
  "Recovery action closure",
];

export default function RecoveryMobilizationPage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: "90-Day Recovery Mobilization",
          description: metadata.description,
          url: absoluteUrl("/services/operating-system-build"),
          provider: { "@type": "Organization", name: site.name, url: site.url },
          serviceType: "Transformation program recovery mobilization",
          areaServed: "United States",
          providerMobility: "remote",
          offers: {
            "@type": "AggregateOffer",
            lowPrice: "75000",
            highPrice: "150000",
            priceCurrency: "USD",
            offerCount: "1",
            url: absoluteUrl("/services/operating-system-build"),
          },
        }}
      />

      <PageHero
        eyebrow="Program recovery offer"
        title="Mobilize the recovery—not another assessment handoff."
        description="12 weeks · $75,000–$150,000+ · One program · Principal-led recovery office, re-baseline, decision governance, vendor reset, workstream alignment, and operational readiness."
        primaryHref="/contact"
        primaryLabel={site.cta}
        secondaryHref="/services/diagnostic"
        secondaryLabel="See the Recovery Diagnostic"
      />

      <Section className="bg-surface !py-14 md:!py-20">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeader
            eyebrow="Entry criteria"
            title="Mobilization begins after leadership accepts the recovery case."
            description="The engagement starts from the TKO Transformation Recovery Diagnostic, or an equivalent fact base accepted by TKO, with a defined program boundary, executive sponsor, material exposures, and measurable recovery decisions."
          />
          <ul className="grid gap-3">
            {prerequisites.map((item) => (
              <li key={item} className="border border-border bg-white p-5 text-base leading-7 text-muted">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section className="!py-14 md:!py-20">
        <SectionHeader
          eyebrow="Target state"
          title="What should be operating by day 90."
          description="The engagement stabilizes and resets one program. It does not create an open-ended transformation office or attempt to redesign the enterprise."
        />
        <div className="mt-10 grid gap-3 md:grid-cols-2">
          {targetChanges.map((change) => (
            <div key={change} className="border border-border p-5 text-base leading-7 text-muted">
              {change}
            </div>
          ))}
        </div>
      </Section>

      <Section className="bg-surface !py-14 md:!py-20">
        <SectionHeader
          eyebrow="Recovery workstreams"
          title="The controls that must move together for recovery to hold."
        />
        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {workstreams.map((workstream) => (
            <Card key={workstream.title}>
              <h2 className="text-xl font-semibold">{workstream.title}</h2>
              <p className="mt-3 text-base leading-7 text-muted">{workstream.description}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section className="!py-14 md:!py-20">
        <SectionHeader eyebrow="12-week plan" title="A measurable recovery sequence with an explicit handoff." />
        <ol className="mt-10 grid gap-3">
          {plan.map(([period, description]) => (
            <li key={period} className="grid gap-4 border border-border p-5 sm:grid-cols-[8rem_1fr]">
              <p className="text-sm font-semibold uppercase tracking-[0.1em] text-primary">{period}</p>
              <p className="text-base leading-7 text-muted">{description}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section className="bg-surface !py-14 md:!py-20">
        <div className="grid gap-5 lg:grid-cols-2">
          <Card>
            <p className="text-sm font-semibold uppercase tracking-[0.1em] text-primary">TKO responsibilities</p>
            <ul className="mt-5 space-y-3 text-base leading-7 text-muted">
              <li>Lead the recovery office, re-baseline, decision cadence, and executive reporting.</li>
              <li>Make workstream dependencies, owners, exposures, and recovery actions explicit.</li>
              <li>Challenge vendor claims and drive agreed delivery and commercial actions.</li>
              <li>Connect program milestones to operating readiness, adoption, and value evidence.</li>
              <li>Deliver a sustainment package and transition recovery controls to client owners.</li>
            </ul>
          </Card>
          <Card>
            <p className="text-sm font-semibold uppercase tracking-[0.1em] text-primary">Client responsibilities</p>
            <ul className="mt-5 space-y-3 text-base leading-7 text-muted">
              <li>Name an executive sponsor and empowered program owner.</li>
              <li>Provide timely access to workstream, vendor, finance, risk, and operating leaders.</li>
              <li>Provide the best available plans, commitments, decisions, measures, and readiness evidence.</li>
              <li>Make recovery decisions within agreed response windows or accept documented re-sequencing.</li>
              <li>Own required legal, regulatory, privacy, security, workforce, and commercial approvals.</li>
            </ul>
          </Card>
        </div>
      </Section>

      <Section className="!py-14 md:!py-20">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeader
            eyebrow="Recovery measures"
            title="Use a small evidence set that supports executive control."
            description="The final measures and targets are set from the accepted baseline. TKO does not promise a result before that evidence exists."
          />
          <div className="grid gap-3 sm:grid-cols-2">
            {measures.map((measure) => (
              <div key={measure} className="border border-border p-4 text-sm font-semibold">
                {measure}
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section className="bg-surface !py-14 md:!py-20">
        <div className="grid gap-5 lg:grid-cols-2">
          <Card>
            <p className="text-sm font-semibold uppercase tracking-[0.1em] text-primary">Commercial range</p>
            <h2 className="mt-4 text-3xl font-semibold">$75,000–$150,000+</h2>
            <p className="mt-4 text-base leading-7 text-muted">
              The accepted Diagnostic determines the final scope and fee. Travel,
              specialist support, technology licenses, vendor services, production
              changes, and material scope expansion are separate.
            </p>
          </Card>
          <Card>
            <p className="text-sm font-semibold uppercase tracking-[0.1em] text-primary">Exclusions and claim boundary</p>
            <p className="mt-4 text-base leading-7 text-muted">
              The standard scope excludes acting as the client&apos;s legal, regulatory,
              audit, clinical, investment, or procurement authority; taking over every
              workstream; custom platform delivery; and an indefinite transformation-office role.
            </p>
            <p className="mt-4 text-base font-semibold leading-7 text-foreground">
              TKO does not guarantee schedule, cost, benefit, adoption, vendor, or
              compliance results. Recovery targets are set from the accepted baseline.
            </p>
          </Card>
        </div>
      </Section>

      <CtaBand
        title="Recovery starts with an accepted fact base and accountable sponsor."
        description="Bring the diagnosis, material exposures, executive decisions, and practical 90-day boundary. Todd will determine whether Recovery Mobilization is warranted."
        secondaryHref="/services/diagnostic"
        secondaryLabel="See the Recovery Diagnostic"
      />
    </>
  );
}
