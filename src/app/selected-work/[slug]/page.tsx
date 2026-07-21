import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { CtaBand } from "@/components/site/cta-band";
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
    description: `${study.trigger} ${study.evidenceLimit}`,
    alternates: { canonical: `/selected-work/${study.slug}` },
    openGraph: {
      type: "article",
      title: study.title,
      description: study.trigger,
      url: absoluteUrl(`/selected-work/${study.slug}`),
      images: [{ url: site.socialImage, width: 1200, height: 630, alt: "TKO Solutions transformation recovery advisory." }],
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
          description: study.trigger,
          url: absoluteUrl(`/selected-work/${study.slug}`),
          publisher: { "@type": "Organization", name: site.name, url: site.url },
          about: [study.industry, study.classification, "Transformation recovery and execution"],
        }}
      />
      <PageHero
        eyebrow={`${study.classification} / ${study.industry}`}
        title={study.title}
        description={study.trigger}
        primaryHref={study.relatedOfferHref}
        primaryLabel={study.relatedOffer}
        secondaryHref="/selected-work"
        secondaryLabel="Review Selected Work"
      />

      <Section>
        <div className="grid gap-12 lg:grid-cols-[0.72fr_1.28fr]">
          <aside>
            <Card className="sticky top-28">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">Related engagement</p>
              <p className="mt-4 text-xl font-semibold">{study.relatedOffer}</p>
              <p className="mt-4 text-sm leading-6 text-muted">
                The related engagement establishes the client-specific fact base,
                decision boundary, and responsible next step. This evidence does not
                replace that work.
              </p>
            </Card>
          </aside>
          <div className="space-y-10">
            <WorkSection title="1. Buyer or operating context" body={study.buyerContext} />
            <WorkSection title="2. Triggering problem" body={study.trigger} />
            <WorkSection title="3. What was breaking" body={study.breaking} />
            <WorkSection title="4. Why conventional approaches were insufficient" body={study.conventionalLimits} />
            <WorkSection title="5. Todd's role" body={study.role} />
            <WorkSection title="6. Intervention" body={study.intervention} />
            <WorkSection title="7. Evidence or result" body={study.result} />
            <WorkSection title="8. Limits of the available evidence" body={study.evidenceLimit} />
            <WorkSection title="9. Why this matters to a prospective buyer" body={study.relevance} />
          </div>
        </div>
      </Section>

      <Section className="bg-surface">
        <SectionHeader
          eyebrow="Evidence record"
          title="What can be supported publicly—and where the boundary sits."
          description="These statements establish operating scope, mechanisms, or implementation capability. They do not create a quantified or attributable client outcome claim."
        />
        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <EvidenceSummary title="What this is" body={study.classification} />
          <EvidenceSummary title="What it supports" body={study.relevance} />
          <EvidenceSummary title="What it does not prove" body={study.evidenceLimit} />
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
            eyebrow="Inspectable internal proof"
            title="A working environment, shown with its limits."
            description="These current, redacted screens demonstrate operating mechanisms. They are not an enterprise client implementation or a proxy for transformation outcomes."
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

      <CtaBand
        title="Connect the evidence to a client-specific decision."
        description={`The ${study.relatedOffer} starts from the client's own program, evidence, sponsor, and decision boundary. This case establishes relevant experience; it does not replace that fact-finding.`}
        primaryHref={study.relatedOfferHref}
        primaryLabel={study.relatedOffer}
        secondaryHref="/contact"
        secondaryLabel={site.cta}
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
