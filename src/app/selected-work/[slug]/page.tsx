import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CtaBand } from "@/components/site/cta-band";
import { JsonLd } from "@/components/site/json-ld";
import { PageHero } from "@/components/site/page-hero";
import { Card } from "@/components/ui/card";
import { Section, SectionHeader } from "@/components/ui/section";
import { caseStudies, getCaseStudy } from "@/lib/content";
import { absoluteUrl } from "@/lib/site";

type Params = {
  params: Promise<{ slug: string }>;
};

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
        primaryLabel="Book a 30-Minute Discovery Call"
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
