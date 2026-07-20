import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CtaBand } from "@/components/site/cta-band";
import { JsonLd } from "@/components/site/json-ld";
import { PageHero } from "@/components/site/page-hero";
import { Card } from "@/components/ui/card";
import { Section, SectionHeader } from "@/components/ui/section";
import {
  caseStudies,
  deliveryModelExecutiveSummary,
  deliveryModelFaq,
  deliveryModelFit,
  deliveryModelNarrative,
  deliveryModelSnapshot,
  getCaseStudy,
} from "@/lib/content";
import { absoluteUrl } from "@/lib/site";

const companionStudies: Record<string, { slug: string; label: string }> = {
  "from-crm-to-operating-system": {
    slug: "rachelos-delivery-model",
    label: "How this system was delivered: the operator-led AI delivery model",
  },
  "rachelos-delivery-model": {
    slug: "from-crm-to-operating-system",
    label: "What this system does: the operational knowledge story",
  },
};

type Params = {
  params: Promise<{ slug: string }>;
};

const rachelosProofAssets = [
  {
    title: "Canonical Queue",
    description:
      "RachelOS ranks active leads into operating lanes with visible action counts, queue sections, and next actions.",
    image: "/proof/rachelos/canonical-queue.png",
    alt: "RachelOS canonical queue showing active leads, queue sections, action counts, and next actions.",
  },
  {
    title: "Human Approval",
    description:
      "Relationship updates and recommended questions wait for review before the system moves the work forward.",
    image: "/proof/rachelos/human-approval.png",
    alt: "RachelOS human approval surface showing review controls before relationship updates move forward.",
  },
  {
    title: "Relationship Memory",
    description:
      "The lead workspace keeps current reality, recent activity, relationship state, timeline, budget, market, and next action in one place.",
    image: "/proof/rachelos/relationship-memory.png",
    alt: "RachelOS relationship memory workspace showing current reality, recent activity, and next recommended action.",
  },
  {
    title: "Today Work",
    description:
      "The daily work surface turns queue state into ranked items, missing facts, recommended asks, and action context.",
    image: "/proof/rachelos/today-work.png",
    alt: "RachelOS Today work surface showing ranked work, missing facts, and recommended ask context.",
  },
  {
    title: "System Health",
    description:
      "Operational health is visible through system checks, queue metrics, and execution status.",
    image: "/proof/rachelos/system-health.png",
    alt: "RachelOS system health dashboard showing operational checks and system status.",
  },
];

export function generateStaticParams() {
  return caseStudies.map((study) => ({ slug: study.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) return {};

  return {
    title: study.title,
    description: study.problem,
    alternates: { canonical: `/selected-work/${study.slug}` },
    openGraph: {
      title: study.title,
      description: study.problem,
      url: absoluteUrl(`/selected-work/${study.slug}`),
    },
  };
}

export default async function SelectedWorkDetailPage({ params }: Params) {
  const { slug } = await params;
  const study = getCaseStudy(slug);

  if (!study) {
    notFound();
  }

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: study.title,
          about: study.relatedProblems,
          url: absoluteUrl(`/selected-work/${study.slug}`),
          publisher: { "@type": "Organization", name: "TKO Solutions" },
        }}
      />
      <PageHero
        eyebrow={`${study.industry} / ${study.proofLevel}`}
        title={study.title}
        description={study.problem}
        primaryHref="/contact"
        primaryLabel="Find Your Highest-Leverage Workflow"
        secondaryHref="/selected-work"
        secondaryLabel="Review Selected Work"
      />
      <Section>
        <div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr]">
          <aside className="space-y-4">
            <Card>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">
                Related Service
              </p>
              <p className="mt-4 text-xl font-semibold">{study.relatedService}</p>
            </Card>
            <Card>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">
                Related Problems
              </p>
              <ul className="mt-4 space-y-2 text-sm text-muted">
                {study.relatedProblems.map((problem) => (
                  <li key={problem}>{problem}</li>
                ))}
              </ul>
            </Card>
            {companionStudies[study.slug] ? (
              <Card>
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">
                  Companion Case Study
                </p>
                <Link
                  href={`/selected-work/${companionStudies[study.slug].slug}`}
                  className="mt-4 block text-base font-semibold text-primary hover:text-primary-dark"
                >
                  {companionStudies[study.slug].label}
                </Link>
              </Card>
            ) : null}
          </aside>
          <div className="space-y-12">
            <WorkSection title="Situation" body={study.situation} />
            <WorkSection title="Operating Truth" body={study.truth} />
            <WorkSection title="What Changed" body={study.system} />
            <WorkSection title="Result" body={study.outcome} />
          </div>
        </div>
      </Section>
      <Section className="bg-surface">
        <SectionHeader eyebrow="Evidence" title="What this work proves." />
        <div className="mt-10 grid gap-3 md:grid-cols-2">
          {study.evidence.map((item) => (
            <div key={item} className="border border-border bg-white p-5">
              <p className="text-base leading-7 text-muted">{item}</p>
            </div>
          ))}
        </div>
      </Section>
      {study.slug === "rachelos-delivery-model" ? (
        <>
          <JsonLd
            data={{
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: deliveryModelFaq.map((item) => ({
                "@type": "Question",
                name: item.question,
                acceptedAnswer: { "@type": "Answer", text: item.answer },
              })),
            }}
          />
          <Section>
            <SectionHeader
              eyebrow="Executive summary"
              title="Read this first: the method is the point, not the metrics."
            />
            <div className="mt-8 grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:items-start">
              <p className="max-w-[75ch] text-lg leading-8 text-muted">
                {deliveryModelExecutiveSummary.lead}
              </p>
              <ul className="grid gap-3">
                {deliveryModelExecutiveSummary.points.map((point) => (
                  <li
                    key={point}
                    className="border border-border bg-white p-5 text-base leading-7 text-muted"
                  >
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          </Section>
          <Section className="bg-surface">
            <SectionHeader
              eyebrow={`What Exists Today, Production Snapshot, ${deliveryModelSnapshot.asOf}`}
              title="Scale, verified."
              description="Every figure below is repository- or production-record-verified. Aggregates only; no revenue attribution is claimed."
            />
            <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
              {deliveryModelSnapshot.stats.map((stat) => (
                <div key={stat.label} className="border border-border bg-white p-5">
                  <p className="text-3xl font-semibold text-primary">{stat.value}</p>
                  <p className="mt-2 text-sm leading-6 text-muted">{stat.label}</p>
                </div>
              ))}
            </div>
          </Section>
          <Section>
            <SectionHeader
              eyebrow="The Delivery Model"
              title="Most 'built it with AI' stories are demos. This one is auditable."
              description="A ten-month, evidence-audited account: what conventional delivery would have required, how it was actually done, and what the model could not compress."
            />
            <div className="mt-12 space-y-12">
              {deliveryModelNarrative.map((section) => (
                <section key={section.title} className="border-b border-border pb-10">
                  <h2 className="text-3xl font-semibold">{section.title}</h2>
                  <p className="mt-5 max-w-[75ch] text-lg leading-8 text-muted">{section.body}</p>
                </section>
              ))}
            </div>
          </Section>
          <Section className="bg-surface">
            <SectionHeader
              eyebrow="Executive FAQ"
              title="The questions executives actually ask."
              description="Every answer follows the same claim discipline as the case study: verified facts, published limitations, no revenue attribution."
            />
            <div className="mt-12 grid gap-3 md:grid-cols-2">
              {deliveryModelFaq.map((item) => (
                <div key={item.question} className="border border-border bg-white p-6">
                  <h3 className="text-xl font-semibold">{item.question}</h3>
                  <p className="mt-3 text-base leading-7 text-muted">{item.answer}</p>
                </div>
              ))}
            </div>
          </Section>
          <Section>
            <SectionHeader
              eyebrow="Next Step"
              title="The AI Delivery Assessment, for the right operation."
              description="The assessment applies this exact evidence method to your operation: a Built / Activated / Validated map of what you have, and a ranked list of what is actually constraining it. It is deliberately not for everyone."
            />
            <div className="mt-12 grid gap-8 lg:grid-cols-2">
              <div>
                <h3 className="text-xl font-semibold">Who this assessment is for</h3>
                <ul className="mt-5 grid gap-3">
                  {deliveryModelFit.for.map((item) => (
                    <li key={item} className="border border-border bg-white p-5 text-base leading-7 text-muted">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold">Who this assessment is not for</h3>
                <ul className="mt-5 grid gap-3">
                  {deliveryModelFit.notFor.map((item) => (
                    <li key={item} className="border border-border bg-surface p-5 text-base leading-7 text-muted">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <Link
              href="/contact"
              className="mt-10 inline-block text-sm font-semibold uppercase tracking-[0.08em] text-primary hover:text-primary-dark"
            >
              Find Your Highest-Leverage Workflow →
            </Link>
          </Section>
        </>
      ) : null}
      {study.slug === "from-crm-to-operating-system" ? (
        <Section>
          <SectionHeader
            eyebrow="Product Proof"
            title="RachelOS is visible operating software, not a slideware example."
            description="These current screenshots are redacted and anonymized, but they come from the live RachelOS ops UI: queue, daily work, human approval, relationship memory, and system health."
          />
          <div className="mt-12 grid gap-5 lg:grid-cols-2">
            {rachelosProofAssets.map((asset) => (
              <article
                key={asset.title}
                className="overflow-hidden border border-border bg-white"
              >
                <div className="relative aspect-[16/10] border-b border-border bg-surface">
                  <Image
                    src={asset.image}
                    alt={asset.alt}
                    fill
                    className="object-cover object-top"
                    sizes="(min-width: 1024px) 50vw, 100vw"
                  />
                </div>
                <div className="p-6">
                  <h2 className="text-xl font-semibold">{asset.title}</h2>
                  <p className="mt-3 text-base leading-7 text-muted">
                    {asset.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </Section>
      ) : null}
      <CtaBand />
    </>
  );
}

function WorkSection({ title, body }: { title: string; body: string }) {
  return (
    <section className="border-b border-border pb-10">
      <h2 className="text-3xl font-semibold">{title}</h2>
      <p className="mt-5 max-w-[65ch] text-lg leading-8 text-muted">{body}</p>
    </section>
  );
}
