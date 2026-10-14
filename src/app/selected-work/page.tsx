import type { Metadata } from "next";
import Image from "next/image";
import { CtaBand } from "@/components/site/cta-band";
import { PageHero } from "@/components/site/page-hero";
import { ArrowLink } from "@/components/ui/arrow-link";
import { Section, SectionHeader } from "@/components/ui/section";
import { caseStudies, leadParagraph } from "@/lib/content";
import { CONSTRAINT_CALL, offerHref } from "@/lib/offers";
import { absoluteUrl, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Work You Can Inspect",
  description:
    "Inspect RachelOS workflow controls and TKO's synthetic healthcare decision lab. Working mechanisms, clear boundaries, and a direct path to the relevant engagement.",
  alternates: { canonical: "/selected-work" },
  openGraph: {
    title: "Work You Can Inspect | TKO Solutions",
    description: "A real operating problem, turned into a working system.",
    url: absoluteUrl("/selected-work"),
    images: [{ url: site.socialImage, width: 1200, height: 630, alt: "RachelOS by TKO Solutions." }],
  },
};

const experience = [
  ["Operations", "Years inside work where ownership, controls, and exception handling had to be explicit—not left to memory."],
  ["Product", "Experience translating how people actually work into systems, workflows, and decisions a team can use."],
  ["Implementation", "RachelOS brought those disciplines together in one system designed and built from the operating problem outward."],
] as const;

export default function SelectedWorkPage() {
  const [flagship, ...others] = caseStudies;
  return (
    <>
      <PageHero
        eyebrow="Selected work"
        title="Inspect the work. Then discuss yours."
        description="RachelOS shows a relationship workflow I designed, built, and operate. The synthetic healthcare lab makes cross-system decisions inspectable. Together they show how I move from an operating problem to explicit rules, controls, and usable interfaces."
        primaryHref={CONSTRAINT_CALL.href}
        primaryLabel={CONSTRAINT_CALL.label}
        secondaryHref="/services"
        secondaryLabel="Scope and Pricing"
      />

      {flagship ? (
        <Section className="bg-surface !py-14 md:!py-20">
          <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.1em] text-primary">{flagship.industry}</p>
              <h2 className="mt-4 text-3xl font-semibold leading-tight tracking-tight md:text-4xl">{flagship.title}</h2>
              <p className="mt-5 text-lg leading-8 text-muted">{leadParagraph(flagship.situation)}</p>
              {flagship.stages ? (
                <ol className="mt-6 space-y-2">
                  {flagship.stages.map((stage, index) => (
                    <li key={stage.name} className="flex gap-3 text-base"><span className="font-mono text-primary">{index + 1}</span><span>{stage.name}</span></li>
                  ))}
                </ol>
              ) : null}
              <ArrowLink href={`/selected-work/${flagship.slug}`} className="mt-8">Read the full case</ArrowLink>
            </div>
            <figure className="border border-border bg-white p-3">
              <div className="relative aspect-[4/5] overflow-hidden bg-white">
                <Image src="/proof/rachelos/canonical-queue.png" alt="Redacted RachelOS queue: active leads grouped by next action, with new leads missing qualification information flagged." fill className="object-cover object-[62%_0%]" sizes="(min-width: 1024px) 60vw, 160vw" />
              </div>
              <figcaption className="px-2 pb-1 pt-3 text-sm leading-6 text-muted">The queue: every active relationship grouped by what it needs next. Contact details are redacted.</figcaption>
            </figure>
          </div>
        </Section>
      ) : null}

      <Section>
        <div className="grid gap-8 rounded-xl border border-border bg-surface p-6 md:p-10 lg:grid-cols-2">
          <div><p className="text-xs font-semibold uppercase tracking-wider text-primary">Healthcare proof · synthetic</p><h2 className="mt-4 text-3xl font-semibold">Change one fact. Inspect the downstream decision.</h2><p className="mt-5 leading-7 text-muted">Eligibility, benefit coverage, procedure policy, provider qualification, UM routing, and the claims-control artifact remain separate decisions. The lab shows the questions a real release must answer.</p><ArrowLink href="/healthcare/impact-assessment" className="mt-6">Run the decision lab</ArrowLink></div>
          <div className="flex flex-col justify-center"><p className="font-mono text-sm leading-8 text-foreground">Policy → Obligation → Capability → Workflow → System → Control → Owner → Evidence → Outcome</p><p className="mt-5 text-sm leading-7 text-muted">The prototype uses synthetic rules and identifiers. It demonstrates decision decomposition; it is not a deployed payer system or a compliance certification.</p><ArrowLink href={offerHref("regulatory-implementation-readiness-sprint")} className="mt-6">See the $15,000 Readiness Sprint</ArrowLink></div>
        </div>
      </Section>

      {others.length > 0 ? (
        <Section className="!py-14">
          <SectionHeader title="More work" />
          <ul className="mt-8 space-y-4">
            {others.map((study) => (
              <li key={study.slug}><ArrowLink href={`/selected-work/${study.slug}`}>{study.title}</ArrowLink></li>
            ))}
          </ul>
        </Section>
      ) : null}

      <Section className="!py-14 md:!py-18">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeader eyebrow="Why this work" title="Built from an operator's point of view." description="The work combines operating discipline, product thinking, and hands-on implementation. That mix is the point of TKO." />
          <div className="border-t border-border">
            {experience.map(([heading, body]) => (
              <article key={heading} className="border-b border-border py-6">
                <h3 className="text-xl font-semibold">{heading}</h3>
                <p className="mt-3 text-base leading-7 text-muted">{body}</p>
              </article>
            ))}
          </div>
        </div>
      </Section>

      <Section className="bg-surface !py-14 md:!py-18">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeader eyebrow="From proof to your project" title="Leave with a scope somebody can execute." />
          <div className="space-y-5 text-base leading-7 text-muted">
            <p>For healthcare readiness, I trace one approved obligation through the teams and systems that must deliver it. For owned demand, I connect buyer content, inquiry capture, context, and an accountable next action.</p>
            <p>Each engagement names the deliverables, owners, acceptance criteria, dependencies, and commercial terms before the work starts. You work with me through the agreed handoff.</p>
            <ArrowLink href="/services">Compare the engagements</ArrowLink>
          </div>
        </div>
      </Section>

      <CtaBand description={CONSTRAINT_CALL.summary} secondaryHref="/services" secondaryLabel="Services and Pricing" />
    </>
  );
}
