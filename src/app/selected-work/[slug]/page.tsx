import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { CtaBand } from "@/components/site/cta-band";
import { JsonLd } from "@/components/site/json-ld";
import { PageHero } from "@/components/site/page-hero";
import { Section } from "@/components/ui/section";
import { caseStudies, getCaseStudy, leadParagraph } from "@/lib/content";
import { CONSTRAINT_CALL } from "@/lib/offers";
import { absoluteUrl, site } from "@/lib/site";

type Params = { params: Promise<{ slug: string }> };

const rachelosScreens = [
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
];

export function generateStaticParams() {
  return caseStudies.map((study) => ({ slug: study.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const study = getCaseStudy((await params).slug);
  if (!study) return {};

  const title = study.slug === "from-crm-to-operating-system"
    ? "RachelOS: From Scattered Follow-Up to a Working System"
    : study.title;
  const lead = study.slug === "from-crm-to-operating-system"
    ? "How person-held context became a practical operating system for relationship-driven work."
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
        primaryHref={CONSTRAINT_CALL.href}
        primaryLabel={CONSTRAINT_CALL.label}
        secondaryHref={study.relatedOfferHref}
        secondaryLabel={`See the ${study.relatedOffer}`}
      />

      <Section>
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

      {study.slug === "from-crm-to-operating-system" ? (
        <Section className="bg-surface">
          <div className="max-w-[72ch]">
            <p className="text-sm font-semibold uppercase tracking-[0.1em] text-primary">Inside the system</p>
            <h2 className="mt-4 text-3xl font-semibold leading-tight tracking-tight md:text-4xl">
              Two views of the operating layer.
            </h2>
            <p className="mt-5 text-lg leading-8 text-muted">The queue makes the work visible. The review surface keeps the person in the decision.</p>
          </div>
          <div className="mt-10 grid gap-5 lg:grid-cols-2">
            {rachelosScreens.map((asset) => (
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

      <CtaBand
        title="Does your business run on someone's memory?"
        description="The mechanism is the same in most growing businesses. A diagnostic finds where it's costing you, in your own numbers."
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
