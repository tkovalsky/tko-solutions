import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { CtaBand } from "@/components/site/cta-band";
import { EvidenceNoteLink } from "@/components/site/evidence-note";
import { JsonLd } from "@/components/site/json-ld";
import { PageHero } from "@/components/site/page-hero";
import { Card } from "@/components/ui/card";
import { Section, SectionHeader } from "@/components/ui/section";
import { caseStudies, getCaseStudy } from "@/lib/content";
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

  return {
    title: study.title,
    description: `${study.situation} ${study.relevance}`,
    alternates: { canonical: `/selected-work/${study.slug}` },
    openGraph: {
      type: "article",
      title: study.title,
      description: study.situation,
      url: absoluteUrl(`/selected-work/${study.slug}`),
      images: [{ url: site.socialImage, width: 1200, height: 630, alt: "TKO Solutions selected work and evidence." }],
    },
  };
}

export default async function SelectedWorkDetailPage({ params }: Params) {
  const study = getCaseStudy((await params).slug);
  if (!study) notFound();

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: study.title,
          description: study.situation,
          url: absoluteUrl(`/selected-work/${study.slug}`),
          publisher: { "@type": "Organization", name: site.name, url: site.url },
          about: [study.industry, study.classification, "Healthcare transformation", "Operating model design"],
        }}
      />
      <PageHero
        eyebrow={`${study.classification} / ${study.industry}`}
        title={study.title}
        description={study.situation}
        primaryHref={study.relatedOfferHref}
        primaryLabel={`See the ${study.relatedOffer}`}
        secondaryHref="/selected-work"
        secondaryLabel="Review the Evidence"
      />

      <Section className="bg-surface !py-12 md:!py-16">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <EvidenceSummary title="What this is" body={study.classification} />
          <EvidenceSummary title="My role" body={study.role} />
          <EvidenceSummary title="Why it matters here" body={study.relevance} />
        </div>
      </Section>

      <Section>
        <div className="grid gap-12 lg:grid-cols-[0.72fr_1.28fr]">
          <aside>
            <Card className="sticky top-28">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">Related engagement</p>
              <p className="mt-4 text-xl font-semibold">{study.relatedOffer}</p>
              <p className="mt-4 text-sm leading-6 text-muted">
                Experience shapes where I look first. The engagement establishes what is true in your program.
              </p>
            </Card>
          </aside>
          <div className="space-y-10">
            <WorkSection title="1. Situation" body={study.situation} />
            <WorkSection title="2. Complexity" body={study.complexity} />
            <WorkSection title="3. Todd's role" body={study.role} />
            <WorkSection title="4. Intervention" body={study.intervention} />
            <WorkSection title="5. Result" body={study.result} />
            <WorkSection title="6. Generalized lesson" body={study.lesson} />
            <WorkSection title="7. Why this matters to a prospective buyer" body={study.relevance} />
          </div>
        </div>
      </Section>

      <Section className="bg-surface">
        <SectionHeader
          eyebrow="Evidence record"
          title="What can be supported publicly."
        />
        <div className="mt-10 grid gap-3 md:grid-cols-3">
          {study.evidence.map((item) => (
            <div key={item} className="border border-border bg-white p-5 text-sm leading-6 text-muted">
              {item}
            </div>
          ))}
        </div>
      </Section>

      {study.slug === "from-crm-to-operating-system" ? (
        <Section>
          <SectionHeader
            eyebrow="Inspectable proof"
            title="The operating mechanisms, in current screens."
            description="Redacted views of the system as it runs today."
          />
          <div className="mt-10 grid gap-5 lg:grid-cols-2">
            {rachelosProofAssets.map((asset) => (
              <article key={asset.title} className="overflow-hidden border border-border bg-white">
                <div className="relative aspect-[16/10] border-b border-border bg-surface">
                  <Image src={asset.image} alt={asset.alt} fill className="object-cover object-top" sizes="(min-width: 1024px) 50vw, 100vw" />
                </div>
                <div className="p-6">
                  <h2 className="text-xl font-semibold">{asset.title}</h2>
                  <p className="mt-3 text-sm leading-6 text-muted">{asset.description}</p>
                </div>
              </article>
            ))}
          </div>
        </Section>
      ) : null}

      <Section className="!py-10">
        <details className="max-w-[72ch] border border-border bg-white p-6">
          <summary className="cursor-pointer text-base font-semibold">
            Limits of this evidence
          </summary>
          <p className="mt-4 text-base leading-7 text-muted">{study.evidenceLimit}</p>
          <EvidenceNoteLink className="mt-4" />
        </details>
      </Section>

      <CtaBand
        title="Bring one operating problem under pressure."
        description="Experience shapes where TKO looks first. A diagnostic establishes what is true in your environment and what leadership should do next."
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
      <p className="mt-4 max-w-[68ch] text-lg leading-8 text-muted">{body}</p>
    </section>
  );
}

function EvidenceSummary({ title, body }: { title: string; body: string }) {
  return (
    <div className="border border-border bg-white p-5">
      <p className="text-xs font-semibold uppercase tracking-[0.12em] text-primary">{title}</p>
      <p className="mt-3 text-sm leading-6 text-muted">{body}</p>
    </div>
  );
}
