import type { Metadata } from "next";
import Image from "next/image";
import { CtaBand } from "@/components/site/cta-band";
import { JsonLd } from "@/components/site/json-ld";
import { PageHero } from "@/components/site/page-hero";
import { Card } from "@/components/ui/card";
import { Section, SectionHeader } from "@/components/ui/section";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "RachelOS: A Founder-Built System of Action",
  description:
    "Inspect RachelOS, TKO's founder-built system in daily use for relationship memory, governed facts, trusted next actions, human approval, and operational health visibility.",
  alternates: { canonical: "/proof/rachelos" },
  openGraph: {
    title: "RachelOS: A Founder-Built System of Action",
    description:
      "Evidence-backed proof of a system that turns fragmented relationship signals into governed next actions.",
    url: absoluteUrl("/proof/rachelos"),
  },
};

const systemLayers = [
  {
    title: "Signals and memory",
    description:
      "Relationship updates preserve context from conversations and activity so the operating picture no longer depends on one person reconstructing it from multiple places.",
  },
  {
    title: "Governed facts and state",
    description:
      "Unstructured updates resolve into source-aware facts. Human and lead facts outrank AI interpretation; current state informs the recommendation but is not treated as truth itself.",
  },
  {
    title: "Priority and action",
    description:
      "A canonical queue determines one next action from facts, state, freshness, and governance. A daily action engine turns priority into an operator work surface.",
  },
  {
    title: "Human approval and reliability",
    description:
      "AI can extract, draft, and recommend, but humans approve consequential action. System health, cron logging, smoke tests, and alerts make silent operational failure visible.",
  },
];

const evidenceAssets = [
  {
    title: "Canonical Queue",
    description: "A ranked view of active work and the next action that should happen.",
    image: "/proof/rachelos/canonical-queue.png",
    alt: "RachelOS canonical queue showing active leads, queue sections, action counts, and next actions.",
  },
  {
    title: "Relationship Memory",
    description: "A durable relationship view for current reality, known facts, recent activity, and next action.",
    image: "/proof/rachelos/relationship-memory.png",
    alt: "RachelOS relationship memory workspace showing current reality, recent activity, and next recommended action.",
  },
  {
    title: "Human Approval",
    description: "An operator review surface before AI-assisted relationship updates and recommendations move the work forward.",
    image: "/proof/rachelos/human-approval.png",
    alt: "RachelOS human approval surface showing review controls before relationship updates move forward.",
  },
  {
    title: "System Health",
    description: "Operational checks and execution status make the system's own reliability visible.",
    image: "/proof/rachelos/system-health.png",
    alt: "RachelOS system health dashboard showing operational checks and system status.",
  },
];

export default function RachelOSProofPage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: "RachelOS: A Founder-Built System of Action",
          description:
            "Evidence-backed account of a system that turns fragmented relationship signals into governed next actions.",
          url: absoluteUrl("/proof/rachelos"),
          publisher: { "@type": "Organization", name: "TKO Solutions" },
        }}
      />
      <PageHero
        eyebrow="Built System / Direct Proof"
        title="A live operating system that turns relationship knowledge into revenue work."
        description="RachelOS supports a South Florida real-estate business. It replaced manual reconstruction across records, messages, notes, and activity with durable context, prioritized work, automated email nurture, and human-governed AI assistance."
        primaryHref="/contact"
        primaryLabel="Request a Program Assessment"
        secondaryHref="/proof"
        secondaryLabel="Back to proof registry"
      />

      <Section>
        <div className="space-y-12">
          <ProofSection
            title="Executive Problem"
            body="The business had information across a CRM, email, text threads, notes, calendar, and spreadsheets. The hard question, who needs attention now, why, and what should happen next, still required the operator to reconstruct the answer each day."
          />
          <ProofSection
            title="Constraint"
            body="Critical relationship context, prioritization, and exception handling lived in one person. The business had systems of record, but not a system of action. Attention, rather than information storage, was the constraint."
          />
          <ProofSection
            title="Investigation"
            body="The work identified three linked failures: information fragmented across sources, operational knowledge concentrated in a person, and no mechanism that continuously converted what was known into a ranked, trustworthy next action."
          />
        </div>
      </Section>

      <Section className="bg-surface">
        <SectionHeader
          eyebrow="System Design"
          title="Each layer exists to close a specific operating gap."
          description="The implemented pattern is signals to memory to facts to state to priority to human approval to action. It is a workflow and decision design, not an autonomous-agent claim or a real-estate software offer."
        />
        <div className="mt-12 grid gap-4 md:grid-cols-2">
          {systemLayers.map((layer) => (
            <Card key={layer.title} className="rounded-lg">
              <h2 className="text-2xl font-semibold">{layer.title}</h2>
              <p className="mt-4 text-base leading-7 text-muted">{layer.description}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section>
        <ProofSection
          title="Current State"
          body="RachelOS has implemented lead capture reliability, relationship updates, source-aware fact extraction, journey and relationship state, intelligence-gap detection, a canonical next-action queue, a daily action engine, approval-gated outreach drafting, content workflow controls, referral handling, and operational health checks. The evidence is code-, schema-, route-, and documentation-backed."
        />
      </Section>

      <Section className="bg-surface">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <SectionHeader
              eyebrow="What It Proves"
              title="A working operating system can support real commercial activity."
              description="RachelOS demonstrates that fragmented relationship context can become prioritized work, automated nurture, and human-governed execution in a live operating environment. To date, it has supported three closed transactions: one rental with plans to buy, one sale, and one purchase."
            />
          </div>
          <div>
            <SectionHeader
              eyebrow="What It Does Not Yet Prove"
              title="The proof has a clear boundary."
              description="The three closed transactions establish live commercial use, not a causal ROI, conversion-rate, or enterprise-adoption claim. RachelOS is not a healthcare product and does not establish healthcare compliance."
            />
          </div>
        </div>
      </Section>

      <Section>
        <SectionHeader
          eyebrow="Evidence"
          title="Visible operating surfaces from the built system."
          description="These redacted proof assets demonstrate implementation surfaces. They do not claim commercial performance metrics."
        />
        <div className="mt-12 grid gap-5 lg:grid-cols-2">
          {evidenceAssets.map((asset) => (
            <article key={asset.title} className="overflow-hidden border border-border bg-white">
              <div className="relative aspect-[16/10] border-b border-border bg-surface">
                <Image src={asset.image} alt={asset.alt} fill className="object-cover object-top" sizes="(min-width: 1024px) 50vw, 100vw" />
              </div>
              <div className="p-6">
                <h2 className="text-xl font-semibold">{asset.title}</h2>
                <p className="mt-3 text-base leading-7 text-muted">{asset.description}</p>
              </div>
            </article>
          ))}
        </div>
      </Section>

      <CtaBand
        title="Use the operating pattern to examine your own workflow."
        description="The Assessment starts with a concrete stalled workflow, identifies the hidden constraint, and determines the next highest-leverage move before a larger build is considered."
      />
    </>
  );
}

function ProofSection({ title, body }: { title: string; body: string }) {
  return (
    <section className="grid gap-6 border-b border-border pb-10 lg:grid-cols-[0.75fr_1.25fr]">
      <h2 className="text-3xl font-semibold leading-tight tracking-tight text-foreground md:text-4xl">{title}</h2>
      <p className="max-w-[65ch] text-lg leading-8 text-muted">{body}</p>
    </section>
  );
}
