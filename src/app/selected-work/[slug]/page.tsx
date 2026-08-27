import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { CtaBand } from "@/components/site/cta-band";
import { EvidenceNoteLink } from "@/components/site/evidence-note";
import { JsonLd } from "@/components/site/json-ld";
import { PageHero } from "@/components/site/page-hero";
import { Section } from "@/components/ui/section";
import { caseStudies, getCaseStudy, leadParagraph } from "@/lib/content";
import { absoluteUrl, site } from "@/lib/site";

type Params = { params: Promise<{ slug: string }> };

const rachelosProofAssets = [
  {
    title: "Prioritized work",
    description: "The queue makes active work, next actions, and operating lanes visible.",
    image: "/proof/rachelos/canonical-queue.png",
    alt: "Redacted RachelOS queue showing active work and next actions.",
  },
  {
    title: "Human approval",
    description: "Recommended relationship actions remain under human review before execution.",
    image: "/proof/rachelos/human-approval.png",
    alt: "Redacted RachelOS review surface showing human approval controls.",
  },
  {
    title: "Durable context",
    description: "Current context, recent activity, and the next recommended action share one working surface.",
    image: "/proof/rachelos/relationship-memory.png",
    alt: "Redacted RachelOS workspace showing relationship context and next action.",
  },
  {
    title: "Operating health",
    description: "System checks and execution status make failures visible instead of leaving them to operator intuition.",
    image: "/proof/rachelos/system-health.png",
    alt: "Redacted RachelOS system-health view showing operating checks.",
  },
];

export function generateStaticParams() {
  return caseStudies.map((study) => ({ slug: study.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const study = getCaseStudy((await params).slug);
  if (!study) return {};

  const lead = leadParagraph(study.situation);

  return {
    title: study.title,
    description: lead,
    alternates: { canonical: `/selected-work/${study.slug}` },
    openGraph: {
      type: "article",
      title: study.title,
      description: lead,
      url: absoluteUrl(`/selected-work/${study.slug}`),
      images: [{ url: site.socialImage, width: 1200, height: 630, alt: "TKO Solutions selected work and evidence." }],
    },
  };
}

export default async function SelectedWorkDetailPage({ params }: Params) {
  const study = getCaseStudy((await params).slug);
  if (!study) notFound();

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
          publisher: { "@type": "Organization", name: site.name, url: site.url },
          about: [study.industry, study.classification, "Healthcare transformation", "Operating model design"],
        }}
      />
      <PageHero
        eyebrow={study.industry}
        title={study.title}
        description={situationLead}
        primaryHref={study.relatedOfferHref}
        primaryLabel={`See the ${study.relatedOffer}`}
        secondaryHref="/contact"
        secondaryLabel="Discuss a Transformation"
      />

      <Section>
        <div className="max-w-[72ch] space-y-10">
          {situationRest.length > 0 ? (
            <WorkSection title="Situation" body={situationRest.join("\n\n")} />
          ) : null}
          <WorkSection title="Complexity" body={study.complexity} />
          <WorkSection title="My role" body={study.role} />
          <WorkSection title="What I changed" body={study.intervention} />
          <WorkSection title="Result" body={study.result} />
          <WorkSection
            title="What this means for your transformation"
            body={`${study.lesson}\n\n${study.relevance}`}
          />
        </div>
      </Section>

      {study.slug === "from-crm-to-operating-system" ? (
        <Section className="bg-surface">
          <div className="max-w-[72ch]">
            <p className="text-sm font-semibold uppercase tracking-[0.1em] text-primary">Inspectable proof</p>
            <h2 className="mt-4 text-3xl font-semibold leading-tight tracking-tight md:text-4xl">
              The operating mechanisms, in current screens.
            </h2>
            <p className="mt-5 text-lg leading-8 text-muted">Redacted views of the system as it runs today.</p>
          </div>
          <div className="mt-10 grid gap-5 lg:grid-cols-2">
            {rachelosProofAssets.map((asset) => (
              <article key={asset.title} className="overflow-hidden border border-border bg-white">
                <div className="relative aspect-[16/10] border-b border-border bg-surface">
                  <Image src={asset.image} alt={asset.alt} fill className="object-cover object-top" sizes="(min-width: 1024px) 50vw, 100vw" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold">{asset.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-muted">{asset.description}</p>
                </div>
              </article>
            ))}
          </div>
        </Section>
      ) : null}

      <Section className="!py-12 md:!py-14">
        <div className="max-w-[72ch] border-l-2 border-border pl-6">
          <h2 className="text-sm font-semibold uppercase tracking-[0.12em] text-muted">About this work</h2>
          <p className="mt-4 text-sm leading-6 text-muted">{study.evidenceLimit}</p>
          <EvidenceNoteLink className="mt-3" />
        </div>
      </Section>

      <CtaBand
        title="Bring one operating problem under pressure."
        description="Experience shapes where I look first. A diagnostic establishes what is true in your environment and what leadership should do next."
        primaryHref={study.relatedOfferHref}
        primaryLabel={`See the ${study.relatedOffer}`}
        secondaryHref="/contact"
        secondaryLabel="Discuss a Transformation"
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
