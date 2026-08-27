import type { Metadata } from "next";
import Link from "next/link";
import { CtaBand } from "@/components/site/cta-band";
import { JsonLd } from "@/components/site/json-ld";
import { PageHero } from "@/components/site/page-hero";
import { Section, SectionHeader } from "@/components/ui/section";
import { LinkButton } from "@/components/ui/button";
import { offerHref, PROGRAM_RECOVERY_CONVERSATION } from "@/lib/offers";
import {
  readinessInterpretation,
  readinessThemes,
  totalReadinessQuestions,
  READINESS_CHECK_PATH,
} from "@/lib/readiness-check";
import { absoluteUrl, site } from "@/lib/site";

const TITLE = "Transformation Readiness Check";
const SUBTITLE = "Twelve questions to answer before approving another dollar of transformation spend.";

export const metadata: Metadata = {
  title: TITLE,
  description:
    "Twelve executive questions covering outcomes, decision rights, workflow ownership, dependencies, operating measures, and AI readiness. No email required.",
  alternates: { canonical: READINESS_CHECK_PATH },
  openGraph: {
    title: `${TITLE} | ${site.name}`,
    description: SUBTITLE,
    url: absoluteUrl(READINESS_CHECK_PATH),
    images: [{ url: site.socialImage, width: 1200, height: 630, alt: "TKO Solutions healthcare transformation readiness check." }],
  },
};

export default function ReadinessCheckPage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "HowTo",
          name: TITLE,
          description: SUBTITLE,
          url: absoluteUrl(READINESS_CHECK_PATH),
          step: readinessThemes.flatMap((theme) =>
            theme.questions.map((question) => ({
              "@type": "HowToStep",
              position: question.number,
              name: theme.name,
              text: question.question,
            })),
          ),
        }}
      />

      <PageHero
        eyebrow="Readiness check"
        title={TITLE}
        description={`${SUBTITLE} Work through them with your program leadership. Nothing here requires an email address, a form, or a call.`}
        primaryHref="#questions"
        primaryLabel="Start the check"
        secondaryHref={offerHref("transformation-diagnostic")}
        secondaryLabel="See the Transformation Diagnostic"
      />

      <Section className="!py-12 md:!py-16">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          <SectionHeader
            eyebrow="How to use it"
            title="Answer from evidence, not from memory."
            description="Each question has a documentary answer or it does not. Where an answer would have to be reconstructed in a meeting before anyone could give it, mark it unclear. That is itself the finding."
          />
          <div className="space-y-5 text-base leading-7 text-muted">
            <p>
              Take the questions in order with the people who would have to produce the answers:
              the program lead, the sponsor, and the line executives whose operations are meant to
              change. It takes about ninety minutes.
            </p>
            <p>
              Count the answers that come back unclear, contested, or reconstructed on the spot.
              The count matters less than where the unclear answers cluster. Six unclear answers
              spread across all six themes is a different problem from six concentrated in decision
              rights.
            </p>
            <p className="font-semibold text-foreground">
              {totalReadinessQuestions} questions · six themes · no email required
            </p>
          </div>
        </div>
      </Section>

      <Section id="questions" className="bg-surface !py-14 md:!py-20">
        <SectionHeader eyebrow="The check" title="Twelve questions, six themes." />
        <div className="mt-12 space-y-14">
          {readinessThemes.map((theme) => (
            <section key={theme.slug} id={theme.slug} aria-labelledby={`${theme.slug}-heading`}>
              <h2 id={`${theme.slug}-heading`} className="text-2xl font-semibold tracking-tight md:text-3xl">
                {theme.name}
              </h2>
              <p className="mt-3 max-w-[68ch] text-base leading-7 text-muted">{theme.premise}</p>
              <ol className="mt-7 grid gap-4 lg:grid-cols-2">
                {theme.questions.map((question) => (
                  <li key={question.number} className="border border-border bg-white p-6">
                    <p className="text-sm font-semibold uppercase tracking-[0.12em] text-primary">
                      Question {question.number}
                    </p>
                    <p className="mt-4 text-lg font-semibold leading-tight text-foreground">
                      {question.question}
                    </p>
                    <p className="mt-4 border-t border-border pt-4 text-sm leading-6 text-muted">
                      <span className="font-semibold text-foreground">A weak answer sounds like: </span>
                      {question.weakAnswer}
                    </p>
                  </li>
                ))}
              </ol>
            </section>
          ))}
        </div>
      </Section>

      <Section className="!py-14 md:!py-20">
        <SectionHeader
          eyebrow="Reading the result"
          title="What the pattern of unclear answers usually means."
          description="Treat these as a guide for a leadership conversation. The value sits in which questions went unanswered and why."
        />
        <div className="mt-10 grid gap-4 lg:grid-cols-3">
          {readinessInterpretation.map((band) => (
            <div key={band.range} className="border border-border bg-white p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.12em] text-primary">{band.range}</p>
              <h3 className="mt-4 text-xl font-semibold leading-tight">{band.heading}</h3>
              <p className="mt-3 text-base leading-7 text-muted">{band.body}</p>
            </div>
          ))}
        </div>
        <p className="mt-10 max-w-[72ch] border-l-2 border-primary bg-surface p-6 text-base leading-7 text-foreground">
          If several answers are unclear, the program most likely needs an independent diagnostic
          before the next funding or automation decision. That is what the{" "}
          <Link href={offerHref("transformation-diagnostic")} className="font-semibold text-primary underline-offset-4 hover:underline">
            Transformation Diagnostic
          </Link>{" "}
          is for: three weeks, a fixed fee, and a written answer on what is wrong and what the next
          ninety days should contain.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <LinkButton href={PROGRAM_RECOVERY_CONVERSATION.href} ctaLocation="readiness_check_result">
            Discuss one program under pressure
          </LinkButton>
          <LinkButton
            href={`${offerHref("transformation-diagnostic")}#what-it-produces`}
            variant="secondary"
            ctaLocation="readiness_check_result"
          >
            See what the Diagnostic produces
          </LinkButton>
        </div>
        <div className="mt-14 border-t border-border pt-10">
          <p className="text-sm font-semibold uppercase tracking-[0.12em] text-primary">Where these questions come from</p>
          <p className="mt-4 max-w-[72ch] text-base leading-7 text-muted">
            The check condenses the diagnostic sections of two guides. Both are longer and explain
            the reasoning behind each question.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <LinkButton href="/insights/why-healthcare-transformation-programs-stall" variant="secondary">
              Why Healthcare Transformation Programs Stall
            </LinkButton>
            <LinkButton href="/insights/prior-authorization-is-a-decision-rights-problem" variant="secondary">
              Prior Authorization Is a Decision-Rights Problem
            </LinkButton>
          </div>
        </div>
      </Section>

      <CtaBand
        title="Discuss one program under pressure."
        description={PROGRAM_RECOVERY_CONVERSATION.summary}
        primaryLabel="Discuss one program under pressure"
        secondaryHref={offerHref("transformation-diagnostic")}
        secondaryLabel="See the Transformation Diagnostic"
      />
    </>
  );
}
