import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { CtaBand } from "@/components/site/cta-band";
import { JsonLd } from "@/components/site/json-ld";
import { PageHero } from "@/components/site/page-hero";
import { ProofMediaSlots } from "@/components/site/proof-media-slots";
import { RachelOSUseCaseExplorer } from "@/components/site/rachelos-use-case-explorer";
import { Section } from "@/components/ui/section";
import { caseStudies, getCaseStudy, leadParagraph } from "@/lib/content";
import { CONSTRAINT_CALL } from "@/lib/offers";
import { absoluteUrl, site } from "@/lib/site";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return caseStudies.map((study) => ({ slug: study.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const study = getCaseStudy((await params).slug);
  if (!study) return {};

  const title = study.slug === "from-crm-to-operating-system"
    ? "RachelOS: Explore Three Business Workflow Problems"
    : study.title;
  const lead = study.slug === "from-crm-to-operating-system"
    ? "Explore missed follow-up, key-person dependency, and human-controlled AI through RachelOS examples, redacted screenshots, and questions for your business."
    : leadParagraph(study.situation);

  return {
    title,
    description: lead,
    alternates: { canonical: `/selected-work/${study.slug}` },
    openGraph: {
      type: "article",
      title,
      description: lead,
      url: absoluteUrl(`/selected-work/${study.slug}`),
      images: [{ url: site.socialImage, width: 1200, height: 630, alt: `${title} | TKO Solutions` }],
    },
  };
}

export default async function SelectedWorkDetailPage({ params }: Params) {
  const study = getCaseStudy((await params).slug);
  if (!study) notFound();
  const isRachelOS = study.slug === "from-crm-to-operating-system";

  // The hero carries the opening of the situation, so the body picks up from
  // whatever is left. Nothing in the case is rendered to the reader twice.
  const [situationLead, ...situationRest] = study.situation.split("\n\n");

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: study.title,
          description: leadParagraph(study.situation),
          url: absoluteUrl(`/selected-work/${study.slug}`),
          author: { "@type": "Person", name: "Todd Kovalsky", url: absoluteUrl("/founder") },
          publisher: { "@type": "Organization", name: site.name, url: site.url },
          about: [study.industry, "Business operating systems", "Lead follow-up", "Human-in-the-loop AI"],
        }}
      />
      <PageHero
        eyebrow={study.industry}
        title={study.title}
        description={situationLead}
        primaryHref={isRachelOS ? "#use-cases" : CONSTRAINT_CALL.href}
        primaryLabel={isRachelOS ? "Explore a Business Problem" : CONSTRAINT_CALL.label}
        secondaryHref={isRachelOS ? "#build-story" : study.relatedOfferHref}
        secondaryLabel={isRachelOS ? "Read the Build Story" : `See the ${study.relatedOffer}`}
      />

      {isRachelOS ? (
        <Section className="!py-10 bg-midnight text-white">
          <div className="mx-auto max-w-4xl">
            <ProofMediaSlots kind="all" />
          </div>
        </Section>
      ) : null}

      {isRachelOS ? <RachelOSUseCaseExplorer /> : null}

      <Section id="build-story">
        <div className="max-w-[72ch] space-y-10">
          {situationRest.length > 0 ? (
            <WorkSection title="Situation" body={situationRest.join("\n\n")} />
          ) : null}
          <WorkSection title="Why it was hard" body={study.complexity} />
          <WorkSection title="My role" body={study.role} />
          <WorkSection title="How it was built" body={study.intervention} />
        </div>
        {study.stages ? (
          <ol className="mt-10 max-w-[72ch] border-t border-border">
            {study.stages.map((stage, index) => (
              <li key={stage.name} className="grid gap-3 border-b border-border py-6 sm:grid-cols-[3rem_1fr]">
                <span className="font-mono text-sm text-primary">{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <h3 className="text-xl font-semibold">{stage.name}</h3>
                  <p className="mt-2 text-base leading-7 text-muted">{stage.body}</p>
                </div>
              </li>
            ))}
          </ol>
        ) : null}
        <div className="mt-10 max-w-[72ch] space-y-10">
          <WorkSection title="Where it stands" body={study.result} />
          <WorkSection
            title="What this means for your business"
            body={`${study.lesson}\n\n${study.relevance}`}
          />
        </div>
      </Section>

      {isRachelOS ? (
        <Section className="bg-surface !py-16 md:!py-20">
          <div className="max-w-[72ch]">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-primary">
              Living technical proof
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              Inside the Production System
            </h2>
            <p className="mt-4 text-base leading-7 text-muted">
              RachelOS is an independent, single-operator system. These snapshots show its
              operator review and action queue. They do not display an exact-message approval
              or a live model failure; those mechanisms require separate demonstrations.
            </p>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {[
              {
                title: "Operator Review",
                desc: "Recorded context, open questions, and operator controls. The image does not display a message approval.",
                img: "/proof/rachelos/human-approval.png",
              },
              {
                title: "Canonical Priority Queue",
                desc: "One ranked list of who needs attention, recomputed deterministically on every inbound signal.",
                img: "/proof/rachelos/canonical-queue.png",
              },

            ].map((screen) => (
              <article
                key={screen.title}
                className="overflow-hidden rounded-xl border border-border bg-white shadow-sm"
              >
                <div className="relative aspect-[16/10] border-b border-border bg-surface">
                  <Image
                    src={screen.img}
                    alt={screen.title}
                    fill
                    className="object-contain object-top"
                    sizes="(min-width: 1024px) 50vw, 100vw"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold">{screen.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted">{screen.desc}</p>
                </div>
              </article>
            ))}
          </div>
        </Section>
      ) : null}

      <CtaBand
        title={isRachelOS ? "Which part of this looks like your business?" : "Does your business run on someone's memory?"}
        description={isRachelOS ? "Tell me where context, decisions, or follow-up get stuck. We can discuss what a useful version would look like for your team." : "The mechanism is the same in most growing businesses. A diagnostic finds where it's costing you, in your own numbers."}
        secondaryHref={study.relatedOfferHref}
        secondaryLabel={`See the ${study.relatedOffer}`}
      />
    </>
  );
}

function WorkSection({ title, body }: { title: string; body: string }) {
  return (
    <section className="border-b border-border pb-10 last:border-0">
      <h2 className="text-2xl font-semibold md:text-3xl">{title}</h2>
      {body.split("\n\n").map((paragraph) => (
        <p key={paragraph} className="mt-4 text-lg leading-8 text-muted">
          {paragraph}
        </p>
      ))}
    </section>
  );
}
