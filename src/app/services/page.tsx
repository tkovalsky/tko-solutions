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
  title: "Engagements | AI-Assisted Operations Modernization",
  description:
    "Start with a fixed-scope, three-week Operational Truth & AI Workflow Diagnostic, then implement the prioritized operating model through a bounded three-month engagement.",
  alternates: { canonical: "/services" },
  openGraph: {
    title: "TKO Engagements | AI-Assisted Operations Modernization",
    description:
      "One flagship diagnostic, followed only when warranted by a bounded three-month implementation.",
    url: absoluteUrl("/services"),
  },
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Engagements"
        title="One critical workflow. Three weeks to expose the truth and decide what deserves implementation."
        description="TKO starts with a fixed-scope Diagnostic, not a broad transformation program. If the evidence supports implementation, a separate three-month engagement installs the workflow, controls, measures, knowledge system, and first practical AI-assisted use cases."
        primaryLabel={site.cta}
      />
      <Section>
        <ServiceCards />
      </Section>
      <Section className="bg-surface">
        <SectionHeader
          eyebrow="Engagement Logic"
          title="A simple commercial path, with explicit boundaries."
          description="The Diagnostic creates the fact base and executive decision. Implementation follows only when there is a defined workflow, accountable owner, practical control model, and measurable business case."
        />
        <div className="mt-12 grid gap-3 lg:grid-cols-2">
          {services.filter((service) => service.featured).map((service, index) => (
            <div key={service.slug} className="border border-border bg-white p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">
                Step {index + 1}
              </p>
              <h2 className="mt-5 text-2xl font-semibold">{service.shortTitle}</h2>
              <p className="mt-4 text-base leading-7 text-muted">{service.summary}</p>
            </div>
          ))}
        </div>
        <p className="mt-8 max-w-[70ch] text-base leading-7 text-muted">
          TKO is not an outsourced operations department, staffing provider,
          general-purpose AI trainer, or software-development agency. Each scope
          is bounded around a business decision and a measurable operating improvement.
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
