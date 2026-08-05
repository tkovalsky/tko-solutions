import type { Metadata } from "next";
import { CaseStudyCards } from "@/components/site/cards";
import { CtaBand } from "@/components/site/cta-band";
import { EvidenceNote } from "@/components/site/evidence-note";
import { PageHero } from "@/components/site/page-hero";
import { Section, SectionHeader } from "@/components/ui/section";
import { offerHref, PROGRAM_RECOVERY_CONVERSATION } from "@/lib/offers";
import { READINESS_CHECK_PATH } from "@/lib/readiness-check";
import { absoluteUrl, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Evidence",
  description:
    "Healthcare transformation, prior authorization, utilization management, and interoperability experience behind the Program Recovery Review, with my role in each described plainly.",
  alternates: { canonical: "/selected-work" },
  openGraph: {
    title: "Evidence",
    description:
      "The healthcare experience and implementation record behind the Program Recovery Review.",
    url: absoluteUrl("/selected-work"),
    images: [{ url: site.socialImage, width: 1200, height: 630, alt: "TKO Solutions healthcare transformation program recovery." }],
  },
};

export default function SelectedWorkPage() {
  return (
    <>
      <PageHero
        eyebrow="Evidence"
        title="Where the judgment comes from."
        description="Enterprise healthcare programs, described by the operating problem I was brought into and what I did about it. Prior authorization, utilization management, transformation recovery, and CMS interoperability carry the domain weight. RachelOS shows the implementation discipline."
        primaryHref={offerHref("program-recovery-review")}
        primaryLabel="See the Program Recovery Review"
        secondaryHref={READINESS_CHECK_PATH}
        secondaryLabel="Use the Readiness Check"
      />

      <Section>
        <SectionHeader
          eyebrow="Evidence record"
          title="Start with the case closest to your operating question."
        />
        <div className="mt-10">
          <CaseStudyCards />
        </div>
      </Section>

      <Section id="how-to-read-this-evidence" className="bg-surface !py-12 md:!py-16">
        <EvidenceNote />
        <p className="mt-6 max-w-[72ch] text-sm leading-6 text-muted">
          Each case page carries the specific limits of its own evidence in a short expandable
          note at the end.
        </p>
      </Section>

      <Section id="method-portability">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          <SectionHeader
            eyebrow="Does this apply here?"
            title="What transfers is the operating mechanism."
          />
          <div className="space-y-5 text-base leading-7 text-muted">
            <p>
              Healthcare transformation and the supporting environments above share one structure:
              work crosses systems and roles, exceptions depend on experienced staff, and
              leadership needs reliable evidence before changing the workflow.
            </p>
            <p>
              What travels between them is the disciplined work of tracing a workflow, clarifying
              evidence and authority, designing controls, and measuring the change. Domain logic
              and performance results stay where they were earned. A real-estate system does not
              predict a healthcare result, and one enterprise program does not predict yours.
            </p>
          </div>
        </div>
      </Section>

      <CtaBand
        title="Bring one program under pressure."
        description={PROGRAM_RECOVERY_CONVERSATION.summary}
        primaryLabel={site.cta}
        secondaryHref={offerHref("program-recovery-review")}
        secondaryLabel="See the Program Recovery Review"
      />
    </>
  );
}
