import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { JsonLd } from "@/components/site/json-ld";
import { CtaBand } from "@/components/site/cta-band";
import { Card } from "@/components/ui/card";
import { PageHero } from "@/components/site/page-hero";
import { Section, SectionHeader } from "@/components/ui/section";
import { frameworkPages } from "@/lib/authority";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Operating Frameworks",
  description:
    "Experience-based operating models for prior authorization, program recovery, executive operating reviews, and human-governed AI, each stated with its evidence boundary.",
  alternates: { canonical: "/frameworks" },
  openGraph: {
    title: "Operating Frameworks",
    description:
      "Synthesized operating models and governance methods for complex operations, separate from direct built-system proof.",
    url: absoluteUrl("/frameworks"),
  },
};

export default function FrameworksPage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "TKO Operating Frameworks",
          url: absoluteUrl("/frameworks"),
          description:
            "Experience-based operating models and governance methods for complex operations.",
        }}
      />
      <PageHero
        eyebrow="Operating Frameworks"
        title="The operating models behind the work, stated with their limits."
        description="These are synthesized operating and governance models drawn from delivery and recovery experience. They are frameworks, not client outcomes: each states the executive question, the model, and the exact claim boundary. For inspectable built-system evidence, see Proof."
        primaryHref="/contact"
        primaryLabel="Find Your Highest-Leverage Workflow"
        secondaryHref="/proof"
        secondaryLabel="Review Proof"
      />
      <Section>
        <SectionHeader
          eyebrow="How to read these"
          title="A framework is an operating model, not a measured result."
          description="Each page maps a constraint to a decision model, names the tradeoffs and failure modes, and marks where the claim ends. Use them to frame a problem before choosing a service or an assessment."
        />
      </Section>
      <Section className="bg-surface">
        <div className="grid gap-5 md:grid-cols-2">
          {frameworkPages.map((page) => (
            <Card key={page.slug} className="flex flex-col rounded-lg">
              <p className="text-sm font-semibold uppercase tracking-[0.1em] text-primary">
                {page.eyebrow}
              </p>
              <h2 className="mt-4 text-2xl font-semibold">{page.title}</h2>
              <p className="mt-4 text-base leading-7 text-muted">{page.description}</p>
              <Link
                href={`/frameworks/${page.slug}`}
                className="group mt-8 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.08em] text-primary hover:text-primary-dark"
              >
                Open the framework
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </Link>
            </Card>
          ))}
        </div>
      </Section>
      <CtaBand
        title="Bring one workflow under pressure, not a preferred tool."
        description="A framework helps frame the operating problem. The first conversation starts with the decision, the evidence available, and the constraint."
        secondaryHref="/selected-work"
        secondaryLabel="Review Selected Work"
      />
    </>
  );
}
