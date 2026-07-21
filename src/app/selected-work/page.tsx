import type { Metadata } from "next";
import { CaseStudyCards } from "@/components/site/cards";
import { CtaBand } from "@/components/site/cta-band";
import { PageHero } from "@/components/site/page-hero";
import { Section, SectionHeader } from "@/components/ui/section";
import { absoluteUrl } from "@/lib/site";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Selected Work & Evidence",
  description:
    "Buyer-relevant evidence from prior authorization, healthcare transformation, interoperability, and live operating environments, with the limits of each claim stated plainly.",
  alternates: { canonical: "/selected-work" },
  openGraph: {
    title: "Selected Work & Evidence",
    description:
      "Healthcare experience, live operating proof, and method-portability evidence behind TKO's Prior Authorization Performance Diagnostic.",
    url: absoluteUrl("/selected-work"),
    images: [{ url: site.socialImage, width: 1200, height: 630, alt: "TKO Solutions prior authorization performance advisory." }],
  },
};

export default function SelectedWorkPage() {
  return (
    <>
      <PageHero
        eyebrow="Selected work & evidence"
        title="Relevant experience, with the evidence boundary stated."
        description="TKO's public record combines healthcare operating experience, an inspectable live operating environment, and supporting method evidence. These are not interchangeable claims. Each case states what Todd did, what can be supported, what cannot be claimed, and why it matters to a prior-authorization buyer."
        primaryHref="/services/diagnostic"
        primaryLabel="See the Prior Authorization Diagnostic"
        secondaryHref="/contact"
        secondaryLabel="Request a Diagnostic Fit Call"
      />
      <Section className="bg-surface !py-12 md:!py-16">
        <div className="grid gap-5 md:grid-cols-3">
          {[
            ["Healthcare experience", "Prior authorization, utilization management, interoperability, and enterprise transformation establish domain and operating context. They are not presented as quantified TKO client outcomes."],
            ["Live operating proof", "RachelOS shows that Todd can design, build, govern, and audit a working operating environment. It is not a healthcare product or proof of prior-authorization performance."],
            ["Method portability", "Supporting work shows that the method for making expert knowledge, exceptions, and decisions explicit can travel. Domain logic and outcome claims do not transfer automatically."],
          ].map(([title, body]) => (
            <div key={title} className="border border-border bg-white p-6">
              <h2 className="text-xl font-semibold">{title}</h2>
              <p className="mt-3 text-sm leading-6 text-muted">{body}</p>
            </div>
          ))}
        </div>
      </Section>
      <Section>
        <SectionHeader
          eyebrow="Evidence record"
          title="Start with the case closest to the operating question."
          description="Healthcare cases establish relevant operating experience. RachelOS establishes direct implementation capability. Method-portability evidence answers a narrower objection about whether the underlying approach can travel."
        />
        <div className="mt-10">
        <CaseStudyCards />
        </div>
      </Section>
      <Section id="method-portability" className="bg-surface">
        <SectionHeader
          eyebrow="Does the method apply here?"
          title="The method transfers only at the operating-mechanism level."
          description="Prior authorization and the supporting proof environments share a structural problem: work crosses systems and roles, exceptions depend on experienced staff, and leadership needs reliable evidence before changing the workflow. TKO does not claim that real-estate software, financial-services logic, or one enterprise program proves a healthcare result. The transferable capability is the disciplined work of tracing the workflow, clarifying evidence and authority, designing controls, and measuring the change."
        />
      </Section>
      <CtaBand
        title="Use the evidence to decide whether the Diagnostic fits."
        description="If prior-authorization performance is under pressure and leadership needs a defensible operating baseline before another investment, start with the 15-business-day Diagnostic."
        primaryHref="/services/diagnostic"
        primaryLabel="See the Prior Authorization Diagnostic"
        secondaryHref="/contact"
        secondaryLabel="Request a Diagnostic Fit Call"
      />
    </>
  );
}
