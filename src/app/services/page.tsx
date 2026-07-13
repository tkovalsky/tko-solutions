import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ServiceCards } from "@/components/site/cards";
import { CtaBand } from "@/components/site/cta-band";
import { PageHero } from "@/components/site/page-hero";
import { Section, SectionHeader } from "@/components/ui/section";
import { services } from "@/lib/content";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Services",
  description:
    "TKO helps leaders find operational bottlenecks, protect revenue, and improve execution through focused assessments, builds, and advisory support.",
  alternates: { canonical: "/services" },
  openGraph: {
    title: "TKO Services",
    description:
      "Start with the operating constraint. Then decide whether focused recovery, a deeper diagnostic, a build, or ongoing operating support is warranted.",
    url: absoluteUrl("/services"),
  },
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Solve the operating problem before you buy another solution."
        description="TKO helps leaders find the bottleneck, understand the business exposure, and choose the right intervention—from a focused assessment to a build or ongoing operating support."
      />
      <Section>
        <ServiceCards />
      </Section>
      <Section className="bg-surface">
        <SectionHeader
          eyebrow="Engagement Logic"
          title="One commercial question: what is preventing the business from performing better?"
          description="The services are sequenced to avoid speculative projects. TKO diagnoses the constraint first, then recommends only the level of work needed to improve execution."
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
