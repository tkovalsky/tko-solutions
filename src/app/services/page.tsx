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
    "The TKO service ladder for healthcare workflow modernization: Recovery Assessment, Truth Diagnostic, Decision Layer Build Sprint, and Fractional Advisor.",
  alternates: { canonical: "/services" },
  openGraph: {
    title: "TKO Services",
    description:
      "One diagnostic entry point, followed by build and advisory paths when workflow evidence identifies the right next step.",
    url: absoluteUrl("/services"),
  },
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="One service ladder for healthcare workflow recovery and modernization."
        description="TKO offers a narrow engagement model: Operational Recovery Assessment for fast workflow clarity, Operational Truth Diagnostic for deeper evidence, Decision Layer Build Sprint for implementation, and Fractional Advisor for ongoing governance."
      />
      <Section>
        <ServiceCards />
      </Section>
      <Section className="bg-surface">
        <SectionHeader
          eyebrow="Engagement Logic"
          title="The ladder is intentionally narrow."
          description="Workflow orchestration, prioritization systems, operational memory, action queues, escalation detection, intelligence capture, and human-in-the-loop AI are capabilities inside the Build. They are not separate products, SaaS plans, or disconnected AI experiments."
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
              Healthcare Wedge
            </p>
            <h2 className="mt-4 text-2xl font-semibold md:text-3xl">
              Prior Authorization Operational Assessment
            </h2>
            <p className="mt-4 text-base leading-7 text-muted">
              A Tier-1 healthcare specialization of the Recovery Assessment. It diagnoses
              administrative burden, denial drivers, exception handling, and human
              dependency risk in prior authorization — before automation, AI, FHIR, or
              Gold Card work.
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
