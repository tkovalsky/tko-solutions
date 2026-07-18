import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CtaBand } from "@/components/site/cta-band";
import { JsonLd } from "@/components/site/json-ld";
import { PageHero } from "@/components/site/page-hero";
import { Card } from "@/components/ui/card";
import { Section, SectionHeader } from "@/components/ui/section";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Why RachelOS Matters Outside Real Estate",
  description:
    "Why a real-estate operating system is TKO's reference implementation: what it proves, what transfers to healthcare and enterprise operations, and what explicitly does not.",
  alternates: { canonical: "/proof/transfer" },
  openGraph: {
    title: "Why RachelOS Matters Outside Real Estate",
    description:
      "The transfer argument: what RachelOS proves, what carries to healthcare operations, and where the claim stops.",
    url: absoluteUrl("/proof/transfer"),
  },
};

const transfers = [
  {
    pattern: "The operating architecture",
    detail:
      "Signals → memory → governed facts → state → priority → human approval → action. The pipeline that turns fragmented context into one trusted next action is domain-independent.",
    healthcare: "Prior authorization intake, evidence checks, and exception routing have exactly this shape.",
  },
  {
    pattern: "Human-approval governance",
    detail:
      "Approval-gated sends, human-fact immutability, advisory-only recommendations, activation gates—enforced in code, not policy.",
    healthcare: "The same control set healthcare AI adoption requires before a model may touch a member- or provider-facing workflow.",
  },
  {
    pattern: "The decision log",
    detail:
      "83 numbered, dated architecture decisions with rationale and supersession history—including decisions against building.",
    healthcare: "Transformation programs fail between workstreams; a governed decision record is the recovery mechanism.",
  },
  {
    pattern: "The honesty scale",
    detail:
      "Every capability graded implemented, activated, validated, or unvalidated—and reported that way.",
    healthcare: "The audit method TKO applies to a client's 'built with AI' inventory: what is real, what is dormant, what is unproven.",
  },
  {
    pattern: "The evidence hierarchy",
    detail:
      "Code and production records outrank documentation; claims may not outrun their source.",
    healthcare: "The standard an executive should demand from any vendor's transformation or AI claim—including TKO's.",
  },
];

const nonTransfers = [
  "The real-estate domain logic: relocation taxonomy, community recommendation engine, and content inventory are specific to one market and unvalidated even there.",
  "Scale: RachelOS is one deployment operated by one person. It is not evidence of enterprise concurrency, multi-team adoption, or organizational change management.",
  "Healthcare compliance: RachelOS is not a healthcare product. It establishes no HIPAA posture, no payer integration, and no clinical or regulatory claim.",
  "ROI: three closed transactions establish live commercial use, not a causal revenue, conversion, or efficiency claim. No revenue attribution chain exists, and none is claimed.",
];

export default function TransferPage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: "Why RachelOS Matters Outside Real Estate",
          description:
            "The transfer argument between TKO's reference implementation and healthcare or enterprise operations.",
          url: absoluteUrl("/proof/transfer"),
          publisher: { "@type": "Organization", name: "TKO Solutions" },
        }}
      />
      <PageHero
        eyebrow="The Transfer Argument"
        title="You are not buying RachelOS. You are buying the method that built and audited it."
        description="RachelOS is a live real-estate operating system. TKO's buyers run healthcare and enterprise operations. This page states—in plain terms—why the proof carries, and exactly where it stops."
        primaryHref="/proof/rachelos"
        primaryLabel="Inspect RachelOS"
        secondaryHref="/founder"
        secondaryLabel="See who built it"
      />

      {/* 1. Why it exists */}
      <Section>
        <div className="grid gap-6 border-b border-border pb-10 lg:grid-cols-[0.75fr_1.25fr]">
          <h2 className="text-3xl font-semibold leading-tight tracking-tight md:text-4xl">
            1. Why it exists
          </h2>
          <div className="max-w-[65ch] space-y-5 text-lg leading-8 text-muted">
            <p>
              Twenty years of enterprise work—Apollo operations, Goldman Sachs
              and JPMorgan platform transformation, CMS Cures Act
              interoperability, Fortune 5 payer programs—produced a thesis: the
              missing layer in complex operations is the decision layer, and it
              fails the same way everywhere.
            </p>
            <p>
              No enterprise engagement lets one advisor implement that thesis
              end to end. Scope is negotiated, governance is inherited, and no
              consultant is permitted to own memory, priority, approval, and
              action at once. The only way to test the whole thesis was to
              build the whole thesis, in a real business, with real
              consequences for being wrong—and publish the results without an
              NDA in the way.
            </p>
            <p>
              Choosing a small live business was not a limit of ambition. It
              was the only environment where the experiment could run
              uncompromised and be audited in public.
            </p>
          </div>
        </div>

        {/* 2. What it proves */}
        <div className="mt-10 grid gap-6 border-b border-border pb-10 lg:grid-cols-[0.75fr_1.25fr]">
          <h2 className="text-3xl font-semibold leading-tight tracking-tight md:text-4xl">
            2. What it proves
          </h2>
          <div className="max-w-[65ch] space-y-5 text-lg leading-8 text-muted">
            <p>
              <span className="font-semibold text-foreground">Delivery capability.</span>{" "}
              One accountable operator, with AI under written governance,
              carried a production system across roughly eighteen competency
              boundaries: 1,528 commits, 67 migrations, 1,341 test cases, ten
              months, live throughout. Bounded to one system and one operator.
            </p>
            <p>
              <span className="font-semibold text-foreground">Governance architecture.</span>{" "}
              Human-approval gates, source-authority rules, advisory-only
              recommendations, and observable system health exist in production
              and can be inspected—demonstrated, not proposed.
            </p>
            <p>
              <span className="font-semibold text-foreground">Evidence discipline.</span>{" "}
              The system audits itself and publishes its failures: a 2.2%
              email-first reply rate, dormant capabilities named as dormant, a
              bus factor of one. That discipline is the actual product TKO
              sells—the assessment applies the same method to your operation.
            </p>
          </div>
        </div>
      </Section>

      {/* 3. What transfers */}
      <Section className="bg-surface">
        <SectionHeader
          eyebrow="3. What transfers"
          title="The operating model transfers. Each pattern has a healthcare instantiation."
        />
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {transfers.map((item) => (
            <Card key={item.pattern}>
              <h3 className="text-xl font-semibold">{item.pattern}</h3>
              <p className="mt-3 text-base leading-7 text-muted">{item.detail}</p>
              <p className="mt-4 border-t border-border pt-4 text-sm leading-6 text-foreground">
                <span className="font-semibold text-primary">In healthcare terms — </span>
                {item.healthcare}
              </p>
            </Card>
          ))}
        </div>
      </Section>

      {/* 4. What does not transfer */}
      <Section>
        <SectionHeader
          eyebrow="4. What does not transfer"
          title="Stated here first, so no buyer has to discover it."
          description="Transfer claims are architectural inference from one deployment—not a demonstrated second deployment. These boundaries are explicit."
        />
        <ul className="mt-10 grid gap-3 md:grid-cols-2">
          {nonTransfers.map((item) => (
            <li key={item} className="border border-border bg-white p-5 text-base leading-7 text-muted">
              {item}
            </li>
          ))}
        </ul>
      </Section>

      {/* 5. Healthcare relevance */}
      <Section className="bg-surface">
        <SectionHeader
          eyebrow="5. Healthcare relevance"
          title="The syllogism, stated plainly."
        />
        <div className="mt-10 max-w-[75ch] space-y-5 text-lg leading-8 text-muted">
          <p>
            Healthcare AI adoption fails on governance, not on models—most
            healthcare executives already believe this. Governance must be
            architecture, not policy; that was proven at payer scale in Cures
            Act interoperability work, where compliance was embedded in FHIR
            platform logic. RachelOS is a production system where that
            architecture exists and can be inspected. And the enterprise
            context where the same failure lives—prior authorization exception
            handling, program dependency risk, status reporting that hides
            decisions—is where the founder has operated since 2022, inside a
            Fortune 5 healthcare transformation portfolio.
          </p>
          <p>
            RachelOS supplies the inspectable half of the argument. The career
            supplies the scale half. The engagement that connects them is a
            fixed-scope assessment that applies the same evidence hierarchy to
            your workflow before any build is recommended.
          </p>
        </div>
        <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3">
          <Link
            href="/selected-work/rachelos-delivery-model"
            className="group inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.08em] text-primary hover:text-primary-dark"
          >
            Read the full delivery record
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </Link>
          <Link
            href="/founder#experience"
            className="group inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.08em] text-primary hover:text-primary-dark"
          >
            See the experience atlas
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </Link>
        </div>
      </Section>

      <CtaBand
        title="Apply the same evidence standard to your operation."
        description="The Assessment is a one-week, fixed-scope review that identifies the constraint, the exposure, and the next decision—before any technology or AI investment."
      />
    </>
  );
}
