import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ServiceCards } from "@/components/site/cards";
import { CtaBand } from "@/components/site/cta-band";
import { PageHero } from "@/components/site/page-hero";
import { Section, SectionHeader } from "@/components/ui/section";
import { services } from "@/lib/content";
import { absoluteUrl, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Engagements | Transformation & Program Recovery",
  description:
    "Start with a bounded assessment of where a transformation or program is actually failing. TKO recommends deeper diagnostic, build, or advisory work only when the evidence supports it.",
  alternates: { canonical: "/services" },
  openGraph: {
    title: "TKO Engagements | Transformation & Program Recovery",
    description:
      "Assessment first. Evidence, then a bounded next move: diagnostic, operating-model or product build, or ongoing advisory.",
    url: absoluteUrl("/services"),
  },
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Engagements"
        title="Start with a bounded assessment of where the initiative is failing."
        description="TKO diagnoses the operating problem first, then recommends only the work the evidence supports: a deeper diagnostic, an operating-model or product build, or ongoing advisory. Each engagement starts at the stage the business actually needs."
        primaryLabel={site.cta}
      />
      <Section>
        <ServiceCards />
      </Section>
      <Section className="bg-surface">
        <SectionHeader
          eyebrow="Engagement Logic"
          title="One question: where is the initiative actually failing, and what deserves action first?"
          description="The engagements are sequenced to avoid speculative projects. TKO diagnoses the operating problem first, then recommends only the stage of work (diagnostic, operating model, product, or implementation) needed next."
        />
        <div className="mt-12 grid gap-3 lg:grid-cols-4">
          {services.map((service, index) => (
            <div key={service.slug} className="border border-border bg-white p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">
                Rung {index + 1}
              </p>
              <h2 className="mt-5 text-2xl font-semibold">{service.shortTitle}</h2>
              <p className="mt-4 text-base leading-7 text-muted">{service.summary}</p>
            </div>
          ))}
        </div>
        <p className="mt-8 text-base leading-7 text-muted">
          Prefer to start from a specific problem?{" "}
          <Link
            href="/offers"
            className="inline-flex items-center gap-1.5 font-semibold text-primary hover:underline"
          >
            See the topic-specific assessments
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </p>
      </Section>
      <Section>
        <div className="grid gap-8 border border-border bg-surface p-8 md:grid-cols-[1.2fr_auto] md:items-center md:p-12">
          <div className="max-w-[60ch]">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">
              Healthcare specialization
            </p>
            <h2 className="mt-4 text-2xl font-semibold md:text-3xl">
              Prior Authorization Operational Assessment
            </h2>
            <p className="mt-4 text-base leading-7 text-muted">
              A focused assessment for prior authorization, utilization management, and
              provider operations leaders who need to reduce administrative burden,
              denial friction, and key-person dependency before investing in technology.
            </p>
          </div>
          <Link
            href="/services/prior-authorization-assessment"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
          >
            View the Prior Authorization assessment
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>
      </Section>
      <CtaBand />
    </>
  );
}
