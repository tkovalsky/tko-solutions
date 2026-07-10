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
  title: "Operational Recovery and Workflow Proof",
  description:
    "Evidence-first TKO proof: RachelOS as a built system, operational recovery patterns, healthcare transformation background, and supporting methods.",
  alternates: { canonical: "/proof" },
  openGraph: {
    title: "Operational Recovery and Workflow Proof",
    description:
      "Evidence-first proof for operational bottlenecks, workflow recovery, and systems of action.",
    url: absoluteUrl("/proof"),
  },
};

const proofSections = [
  {
    eyebrow: "Built Systems",
    title: "RachelOS",
    description:
      "A live relationship intelligence and action system that preserves operational memory, resolves facts, produces one trusted next action, and keeps human approval in the workflow.",
    href: "/proof/rachelos",
    linkLabel: "Review RachelOS proof",
    image: "/proof/rachelos/canonical-queue.png",
    alt: "RachelOS canonical queue showing ranked work and next actions.",
  },
  {
    eyebrow: "Operational Recovery",
    title: "Silent failure recovery",
    description:
      "RachelOS also demonstrates the recovery pattern: expose a failure that was previously discovered by feel, repair the constraint, and install a visible validation loop.",
    href: "/proof/rachelos",
    linkLabel: "See the current-state evidence",
    image: "/proof/rachelos/system-health.png",
    alt: "RachelOS system health view showing operational checks and execution status.",
  },
  {
    eyebrow: "Healthcare Transformation Background",
    title: "Complex workflow and governance experience",
    description:
      "Prior authorization, utilization management, care management, interoperability, regulatory initiatives, and transformation programs supply advisory background—not a claimed deployed healthcare product or quantified case result.",
    href: "/selected-work",
    linkLabel: "Review selected healthcare work",
  },
  {
    eyebrow: "Supporting Methods",
    title: "Method portability",
    description:
      "CRE intelligence and governed content operations demonstrate the same design discipline: capture knowledge, establish source authority, surface priority, and preserve human judgment where it matters.",
    href: "/selected-work/cre-intelligence-model",
    linkLabel: "Review supporting method proof",
  },
];

export default function ProofPage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "TKO Proof Registry",
          url: absoluteUrl("/proof"),
          description:
            "Evidence-first proof registry for TKO operational recovery and systems-of-action work.",
        }}
      />
      <PageHero
        eyebrow="Proof Registry"
        title="Evidence before category."
        description="TKO separates direct built-system proof from healthcare advisory background and supporting methods. Each asset is clear about what it demonstrates—and what it does not claim."
        primaryHref="/proof/rachelos"
        primaryLabel="Review RachelOS proof"
        secondaryHref="/assessment"
        secondaryLabel="Explore the Assessment"
      />

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
          title="A system, an operating pattern, and a background credential are not the same claim."
          description="RachelOS is the direct product proof. Healthcare transformation work establishes relevant operating context. Supporting methods demonstrate portability. TKO does not turn unmeasured outcomes into marketing claims."
        />
      </Section>

      <CtaBand
        title="Bring the workflow under pressure—not a preferred tool."
        description="The Assessment determines whether the immediate need is operational recovery, a deeper diagnostic, or no additional build at all."
      />
    </>
  );
}
