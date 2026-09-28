import type { Metadata } from "next";
import Image from "next/image";
import { CtaBand } from "@/components/site/cta-band";
import { EvidenceNote } from "@/components/site/evidence-note";
import { PageHero } from "@/components/site/page-hero";
import { ArrowLink } from "@/components/ui/arrow-link";
import { Section, SectionHeader } from "@/components/ui/section";
import { caseStudies, leadParagraph } from "@/lib/content";
import { CONSTRAINT_CALL, offerHref } from "@/lib/offers";
import { absoluteUrl, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Proof",
  description:
    "RachelOS: a production operating system built and run by Todd Kovalsky, plus the operating experience behind TKO. What is claimed, what isn't, and why.",
  alternates: { canonical: "/selected-work" },
  openGraph: {
    title: "Proof | TKO Solutions",
    description: "A system built and run, not a slide about one.",
    url: absoluteUrl("/selected-work"),
    images: [{ url: site.socialImage, width: 1200, height: 630, alt: "TKO Solutions proof." }],
  },
};

const experience = [
  ["Financial-services operations", "Loan settlement and fund operations at Apollo and earlier firms, where every exception had to be reconciled and owned. A system of record that holds the transaction is not the same as one that runs the work."],
  ["Enterprise programs", "Platform programs for large asset managers, and healthcare transformation programs spanning dozens of applications and teams. Every workstream had an owner. The end-to-end outcome often didn't."],
  ["Product ownership", "Advisor, CRM, and healthcare-interoperability platforms, where requirements, controls, and day-to-day behavior had to be designed together to work in production."],
] as const;

export default function SelectedWorkPage() {
  const [flagship, ...others] = caseStudies;
  return (
    <>
      <PageHero
        eyebrow="Proof"
        title="A system built and run, not a slide about one."
        description="The best evidence that I can build your operating layer is one I built for a real business, still run, and keep improving. Here it is, including what it doesn't prove yet."
        primaryHref={CONSTRAINT_CALL.href}
        primaryLabel={CONSTRAINT_CALL.label}
        secondaryHref={offerHref("constraint-diagnostic")}
        secondaryLabel="See the Diagnostic"
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
          <SectionHeader eyebrow="Where the pattern was learned" title="Twenty years inside operations that had to work." description="Before RachelOS, I saw the same failure from the inside of much larger organizations: information everywhere, and people doing the integration by hand." />
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
          <SectionHeader eyebrow="Founding clients" title="The next case study could be yours." />
          <div className="space-y-5 text-base leading-7 text-muted">
            <p>TKO is taking on its first outside clients now. The first three diagnostics are offered at a founding rate of $5,000 instead of $7,500, in exchange for permission to publish the results (anonymized if you prefer) and a short reference call.</p>
            <p>Every engagement starts with a baseline, so whatever changes can be measured and shown, not just described.</p>
            <ArrowLink href={offerHref("constraint-diagnostic")}>See the Diagnostic</ArrowLink>
          </div>
        </div>
      </Section>

      <Section id="how-to-read-this-evidence" className="!py-12 md:!py-16">
        <EvidenceNote />
      </Section>

      <CtaBand description={CONSTRAINT_CALL.summary} secondaryHref="/services" secondaryLabel="Services and Pricing" />
    </>
  );
}
