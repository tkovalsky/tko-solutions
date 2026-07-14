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
  title: "Services | Strategy Through Implementation",
  description:
    "TKO designs the strategy, defines the operating model, builds the product, and implements it in production—for healthcare and enterprise leaders with complex operating problems.",
  alternates: { canonical: "/services" },
  openGraph: {
    title: "TKO Services | Strategy Through Implementation",
    description:
      "Start at the stage the business needs: strategy, operating model, product, or implementation—one accountable path, not a generic consulting scope.",
    url: absoluteUrl("/services"),
  },
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="The Delivery Model"
        title="From executive strategy to production implementation—one accountable path."
        description="TKO designs the strategy, defines the operating model, builds the product, and implements it in production. Each engagement starts at the stage the business actually needs."
        primaryLabel={site.cta}
      />
      <Section>
        <ServiceCards />
      </Section>
      <Section className="bg-surface">
        <SectionHeader
          eyebrow="Engagement Logic"
          title="One question: what needs to move from strategy to production first?"
          description="The services are sequenced to avoid speculative projects. TKO diagnoses the operating problem first, then recommends only the stage of work—strategy, operating model, product, or implementation—needed next."
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
