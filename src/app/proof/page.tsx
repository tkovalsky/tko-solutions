import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CtaBand } from "@/components/site/cta-band";
import { JsonLd } from "@/components/site/json-ld";
import { PageHero } from "@/components/site/page-hero";
import { Card } from "@/components/ui/card";
import { Section, SectionHeader } from "@/components/ui/section";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Proof You Can Inspect",
  description:
    "Inspect TKO's direct built-system proof, bounded healthcare operating background, and supporting methods without unsupported outcome claims.",
  alternates: { canonical: "/proof" },
  openGraph: {
    title: "Proof You Can Inspect",
    description:
      "Evidence-first proof for operational bottlenecks, workflow recovery, and systems of action.",
    url: absoluteUrl("/proof"),
  },
};

const proofSections = [
  {
    eyebrow: "Founder Diligence",
    title: "The verified career record",
    description:
      "Twenty-plus years across Apollo, Sapient (Goldman Sachs AM, JPMorgan AM), FolioDynamix, ELLKAY, and Fortune 5 healthcare transformation at Cognizant, with timeline, experience atlas, and claim boundaries.",
    href: "/founder",
    linkLabel: "Review the founder record",
  },
  {
    eyebrow: "The Transfer Argument",
    title: "Why RachelOS matters outside real estate",
    description:
      "What the reference implementation proves, what transfers to healthcare and enterprise operations, and exactly where the claim stops, stated before a buyer has to ask.",
    href: "/proof/transfer",
    linkLabel: "Read the transfer argument",
  },
  {
    eyebrow: "Method & Evidence Proof",
    title: "RachelOS",
    description:
      "The reference implementation of how TKO works, not the product TKO sells. A live system that preserves operational memory, resolves facts, produces one trusted next action, and keeps human approval in the workflow, with every capability graded implemented, activated, validated, or unvalidated.",
    href: "/proof/rachelos",
    linkLabel: "Review RachelOS proof",
    image: "/proof/rachelos/canonical-queue.png",
    alt: "RachelOS canonical queue showing ranked work and next actions.",
  },
  {
    eyebrow: "Operational Reliability",
    title: "The system can make its own failure visible",
    description:
      "RachelOS includes visible system-health checks, cron logging, smoke tests, and alerts so execution does not depend on discovering failures by feel.",
    href: "/proof/rachelos",
    linkLabel: "See the current-state evidence",
    image: "/proof/rachelos/system-health.png",
    alt: "RachelOS system health view showing operational checks and execution status.",
  },
  {
    eyebrow: "Healthcare Operating Background",
    title: "Complex workflow and governance experience",
    description:
      "Prior authorization, utilization management, care management, interoperability, regulatory initiatives, and transformation programs supply relevant operating context, not a claimed deployed healthcare product or quantified case result.",
    href: "/selected-work",
    linkLabel: "Review selected healthcare work",
  },
  {
    eyebrow: "Supporting Method Proof",
    title: "The pattern travels without becoming a second offer",
    description:
      "CRE intelligence and governed content operations demonstrate the same design discipline: capture knowledge, establish source authority, surface priority, and retain human judgment where it matters.",
    href: "/selected-work/cre-intelligence-model",
    linkLabel: "Review supporting method proof",
  },
  {
    eyebrow: "Operating Frameworks",
    title: "The operating models are separate from the evidence",
    description:
      "Synthesized operating and governance models (prior authorization, program recovery, executive operating reviews, human-governed AI) live in Frameworks with their claim boundaries, so Proof stays reserved for inspectable evidence.",
    href: "/frameworks",
    linkLabel: "Review the operating frameworks",
  },
];

export default function ProofPage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "TKO Proof You Can Inspect",
          url: absoluteUrl("/proof"),
          description:
            "Evidence-first proof for TKO operational recovery and systems-of-action work.",
        }}
      />
      <PageHero
        eyebrow="Proof"
        title="Proof you can inspect, not claims you have to accept."
        description="TKO separates direct built-system proof from healthcare operating background and supporting methods. Each asset states the operating pattern it demonstrates and the evidence boundary around it."
        primaryHref="/proof/rachelos"
        primaryLabel="Inspect RachelOS"
        secondaryHref="/contact"
        secondaryLabel="Find Your Highest-Leverage Workflow"
      />

      <Section>
        <SectionHeader
          eyebrow="Executive path"
          title="Start with the operating problem, then follow evidence to a bounded next move."
          description="Every published proof page states the executive question, operating model, evidence, lessons, and claim boundary. The path continues into a relevant guide and assessment rather than a generic service pitch."
        />
      </Section>

      <Section className="bg-surface">
        <div className="grid gap-5 lg:grid-cols-2">
          {proofSections.map((item) => (
            <Card key={item.title} className="overflow-hidden rounded-lg p-0">
              {item.image ? (
                <div className="relative aspect-[16/8] border-b border-border bg-background">
                  <Image src={item.image} alt={item.alt ?? ""} fill className="object-cover object-top" sizes="(min-width: 1024px) 50vw, 100vw" />
                </div>
              ) : null}
              <div className="p-6">
                <p className="text-sm font-semibold uppercase tracking-[0.1em] text-primary">
                  {item.eyebrow}
                </p>
                <h2 className="mt-4 text-3xl font-semibold">{item.title}</h2>
                <p className="mt-4 text-base leading-7 text-muted">{item.description}</p>
                <Link
                  href={item.href}
                  className="group mt-8 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.08em] text-primary hover:text-primary-dark"
                >
                  {item.linkLabel}
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </Section>

      <Section>
        <SectionHeader
          eyebrow="Evidence Standard"
          title="A built system, an operating pattern, and a background credential are not the same claim."
          description="RachelOS is direct built-system proof. Healthcare work establishes relevant operating context. Supporting methods demonstrate portability. Measured commercial outcomes belong only where they can be substantiated."
        />
      </Section>

      <CtaBand
        title="Bring the workflow under pressure, not a preferred tool."
        description="The Assessment determines whether the immediate need is operational recovery, a deeper diagnostic, or no additional build at all."
      />
    </>
  );
}
