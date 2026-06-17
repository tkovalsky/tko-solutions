import type { Metadata } from "next";
import { ServiceCards } from "@/components/site/cards";
import { CtaBand } from "@/components/site/cta-band";
import { PageHero } from "@/components/site/page-hero";
import { Section, SectionHeader } from "@/components/ui/section";
import { services } from "@/lib/content";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Services",
  description:
    "The TKO service ladder: Operational Intelligence Diagnostic, Operating System Build, and Fractional Operating System Advisor.",
  alternates: { canonical: "/services" },
  openGraph: {
    title: "TKO Services",
    description:
      "One diagnostic entry point, followed by build and advisory paths when operational truth identifies the right next step.",
    url: absoluteUrl("/services"),
  },
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="One service ladder for establishing operational truth and acting on it."
        description="TKO sells a three-rung ladder: Diagnostic, Build, and Fractional Advisor. The Diagnostic is the paid entry point. Build and advisory work follow when evidence shows what should happen next."
      />
      <Section>
        <ServiceCards />
      </Section>
      <Section className="bg-surface">
        <SectionHeader
          eyebrow="Engagement Logic"
          title="The ladder is intentionally narrow."
          description="Capability modules live inside the Build. They are not separate offers. The site routes qualified buyers to the Diagnostic because that is where operational truth is established."
        />
        <div className="mt-12 grid gap-3 lg:grid-cols-3">
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
      <CtaBand />
    </>
  );
}

