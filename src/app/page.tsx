import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { CheckCircle2, ShieldCheck } from "lucide-react";
import { CtaBand } from "@/components/site/cta-band";
import { Faq } from "@/components/site/faq";
import { JsonLd } from "@/components/site/json-ld";
import { OperatingLayer } from "@/components/site/operating-layer";
import { ProofMediaSlots } from "@/components/site/proof-media-slots";
import { LinkButton } from "@/components/ui/button";
import { Section, SectionHeader } from "@/components/ui/section";
import { getOffer, offerContactHref, offerHref, offers } from "@/lib/offers";
import { absoluteUrl, site } from "@/lib/site";

const blueprint = getOffer("execution-gap-blueprint")!;
const readiness = getOffer("regulatory-implementation-readiness-sprint")!;

const homeTitle = "Your Business Has Enough Software. Why Is Everything Still Manual?";
const description =
  "Your systems hold the information. Your people are still connecting the pieces, chasing decisions, and making work happen. TKO builds the missing operating layer between information and execution.";

export const metadata: Metadata = {
  title: { absolute: `TKO Solutions | ${homeTitle}` },
  description,
  alternates: { canonical: "/" },
  openGraph: {
    title: homeTitle,
    description,
    url: absoluteUrl("/"),
    images: [{ url: site.socialImage, width: 1200, height: 630, alt: "TKO Solutions: the operating layer between information and execution." }],
  },
};

const enterpriseHref = "/contact?cta=homepage_enterprise";

const symptoms = [
  { title: "The owner is the router", body: "Routine decisions wait until one person notices them." },
  { title: "Work falls between tools", body: "Requests and leads stall when they move from one system to the next." },
  { title: "People re-key the same data", body: "The CRM, the spreadsheet, and the inbox each hold part of the truth, and someone reconciles them by hand." },
  { title: "Follow-up runs on memory", body: "What happens next depends on who remembers, not on a rule or an owner." },
  { title: "Status is green; readiness is not", body: "Reports say on track, and the missing dependency shows up late." },
  { title: "AI pilots stay pilots", body: "Experiments are not connected to the workflow, the owner, or a measure of whether they helped." },
];

const useCases = [
  {
    eyebrow: "Owner-led and midmarket operations",
    title: "Stop being the integration layer.",
    body: "For founders, COOs, and operations leaders whose teams carry work between a CRM, spreadsheets, and email, and whose follow-up depends on memory.",
    href: offerHref(blueprint.slug),
    cta: `Start with the Blueprint · ${blueprint.startingPrice}`,
    secondaryHref: "/operational-intelligence",
    secondaryCta: "How the operating layer works →",
    label: "Engagement",
  },
  {
    eyebrow: "Enterprise delivery and transformation",
    title: "See readiness before the release date.",
    body: "For delivery and transformation leaders with fragmented ownership, dependencies across teams, and status reports that do not establish readiness. The approach applies the same method to ownership discovery, dependency mapping, requirement traceability, and evidence preparation. It is a proposed application, scoped per program, not a packaged platform.",
    href: enterpriseHref,
    cta: "Discuss an Enterprise Engagement",
    secondaryHref: "/solutions/delivery-intelligence",
    secondaryCta: "Delivery intelligence →",
    label: "Proposed application",
  },
  {
    eyebrow: "Regulated and healthcare operations",
    title: "Trace the mandate to the work.",
    body: "For health plan and regulated operations leaders turning an approved obligation into workflows, controls, owners, and evidence: Policy → Obligation → Capability → Workflow → System → Control → Owner → Evidence → Outcome.",
    href: offerHref(readiness.slug),
    cta: `${readiness.shortName} · ${readiness.startingPrice}`,
    secondaryHref: "/healthcare/impact-assessment",
    secondaryCta: "Run the synthetic decision lab →",
    label: "Engagement",
  },
  {
    eyebrow: "Relationship-driven revenue",
    title: "Make the next action accountable.",
    body: "For brokerages, advisory practices, and boutique firms where CRM records are not actionable, follow-up is inconsistent, and relationship context gets lost. RachelOS is the working example.",
    href: "/private-client-os",
    cta: "Explore Private Client OS",
    secondaryHref: "/solutions/revenue-operations",
    secondaryCta: "Revenue operations →",
    label: "Engagement",
  },
] as const;

const rachelosProofScreens = [
  {
    title: "Operator review",
    subtitle: "Known context and open questions",
    description:
      "The operator reviews relationship context and missing information. Exact-message approval is a separate, code-backed control.",
    image: "/proof/rachelos/human-approval.png",
  },
  {
    title: "The canonical priority queue",
    subtitle: "Computed next action",
    description:
      "A daily action view groups work by the next step and makes missing qualification information visible. This screenshot does not prove a measured outcome.",
    image: "/proof/rachelos/canonical-queue.png",
  },
];

const homeFaqs = [
  {
    q: "Is TKO an AI agency?",
    a: "No. AI is one tool among several. Most execution gaps are fixed with a clear owner, an explicit rule, or a connection between two systems. Where AI helps (extracting, summarizing, drafting, flagging), a person approves anything consequential.",
  },
  {
    q: "Will you replace our CRM or other systems?",
    a: "Rarely. Your systems of record usually stay. The work is the layer beside them that turns stored records into owned, visible next actions.",
  },
  {
    q: "Do I have to start with the Blueprint?",
    a: "No. The Blueprint is the smallest paid step for one workflow. If you already have a funded program, a clear problem, or a regulatory deadline, we scope the right engagement directly.",
  },
  {
    q: "Who does the work?",
    a: "Todd Kovalsky, directly. There is no handoff to associates.",
  },
  {
    q: "What does TKO not do?",
    a: "No guaranteed ROI, lead volume, or revenue. No autonomous AI outreach. No legal, clinical, or compliance advice. No staff augmentation billed by the hour.",
  },
];

export default function HomePage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ProfessionalService",
          name: "TKO Solutions",
          url: absoluteUrl("/"),
          description,
          founder: { "@type": "Person", name: "Todd Kovalsky", url: absoluteUrl("/founder"), jobTitle: "Founder & Principal" },
        }}
      />

      {/* 1. Problem-driven hero */}
      <section className="relative overflow-hidden bg-midnight text-white">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgb(var(--accent-rgb)/0.22),_transparent_60%)]" />
        <div className="relative mx-auto w-full max-w-7xl px-6 py-16 lg:px-8 lg:py-24">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary-light/30 bg-primary/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-primary-light">
            <ShieldCheck className="size-3.5" aria-hidden />
            Todd Kovalsky · Founder &amp; Principal
          </div>
          <h1 className="mt-6 max-w-5xl text-[2.25rem] font-bold leading-[1.06] tracking-tight sm:text-5xl lg:text-[4rem]">
            Your business has enough software.{" "}
            <span className="text-primary-light">Why is everything still manual?</span>
          </h1>
          <p className="mt-8 max-w-[68ch] text-lg leading-8 text-white/80 sm:text-xl sm:leading-9">
            Your systems contain the information. Your people are still connecting the pieces, chasing
            decisions, and making work happen. TKO builds the missing operating layer.
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
            <LinkButton href={offerHref(blueprint.slug)} ctaLocation="homepage_hero" className="bg-primary hover:bg-primary-dark">
              {blueprint.ctaLabel}
            </LinkButton>
            <LinkButton href={enterpriseHref} ctaLocation="homepage_hero_enterprise" eventName="secondary_cta_click" variant="secondary" className="border-white/35 text-white hover:border-white/60 hover:bg-white/10">
              Discuss an Enterprise Engagement
            </LinkButton>
          </div>
          <p className="mt-5 text-sm text-white/70">Execution Gap Blueprint: one workflow, {blueprint.duration}, {blueprint.commercial}.</p>
        </div>
      </section>

      {/* 2. Symptoms */}
      <Section className="!py-16 md:!py-20">
        <SectionHeader
          eyebrow="Sound familiar?"
          title="The systems store the information. People still carry the work."
          description="When nobody owns the space between tools, people become the integration layer. These are the usual signs."
        />
        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {symptoms.map((symptom) => (
            <li key={symptom.title} className="border-t-2 border-primary bg-surface p-6">
              <p className="font-semibold">{symptom.title}</p>
              <p className="mt-2 text-sm leading-6 text-muted">{symptom.body}</p>
            </li>
          ))}
        </ul>
      </Section>

      {/* 3. Operating-layer model */}
      <Section className="bg-surface !py-16 md:!py-24" id="operating-layer">
        <SectionHeader
          eyebrow="The method"
          title="Connect → Understand → Decide → Execute → Verify → Improve"
          description="TKO designs and implements the layer between information and execution. It connects the tools you already have, makes the work visible, clarifies who owns it, and puts the next appropriate action in front of the right person."
        />
        <OperatingLayer />
      </Section>

      {/* 4. Use cases */}
      <Section className="!py-16 md:!py-24">
        <SectionHeader eyebrow="Where it applies" title="One operating problem. Four kinds of buyer." />
        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          {useCases.map((useCase) => (
            <article key={useCase.eyebrow} className="flex flex-col rounded-2xl border border-border bg-white p-7 md:p-8">
              <p className="flex flex-wrap items-center justify-between gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-primary">
                <span>{useCase.eyebrow}</span>
                {useCase.label === "Proposed application" ? <span className="rounded-full border border-border px-2.5 py-0.5 text-[0.65rem] text-muted">Proposed application</span> : null}
              </p>
              <h3 className="mt-4 text-2xl font-bold">{useCase.title}</h3>
              <p className="mt-3 flex-1 text-base leading-7 text-muted">{useCase.body}</p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
                <LinkButton href={useCase.href} variant="secondary" eventName="secondary_cta_click" ctaLocation="homepage_use_case">{useCase.cta}</LinkButton>
                {"secondaryHref" in useCase ? <Link href={useCase.secondaryHref} className="inline-flex min-h-11 items-center text-sm font-semibold text-primary hover:underline">{useCase.secondaryCta}</Link> : null}
              </div>
            </article>
          ))}
        </div>
      </Section>

      {/* 5. Inspectable proof */}
      <Section className="bg-surface !py-16 md:!py-24">
        <SectionHeader
          eyebrow="Work you can inspect"
          title="RachelOS: the method, built and running"
          description="RachelOS is an independent, single-operator system Todd designed and built for one real-estate practice. It shows the operating layer in working software: relationship memory, a computed daily action queue, visible information gaps, and exact-message human review before AI-assisted outreach. It is implementation evidence, not an off-the-shelf product, and it does not establish client results."
        />
        <div className="mt-10"><ProofMediaSlots kind="all" /></div>
        <div className="mt-12 grid gap-8 sm:grid-cols-2">
          {rachelosProofScreens.map((screen) => (
            <article key={screen.title} className="overflow-hidden rounded-xl border border-border bg-white shadow-sm">
              <div className="relative aspect-[16/10] border-b border-border bg-surface">
                <Image src={screen.image} alt={`RachelOS screenshot: ${screen.title}`} fill className="object-contain object-top" sizes="(min-width: 1024px) 50vw, 100vw" />
              </div>
              <div className="p-6 md:p-8">
                <p className="text-xs font-semibold uppercase tracking-wider text-primary">{screen.subtitle}</p>
                <h3 className="mt-2 text-xl font-bold">{screen.title}</h3>
                <p className="mt-3 text-sm leading-6 text-muted">{screen.description}</p>
              </div>
            </article>
          ))}
        </div>
        <div className="mt-10">
          <LinkButton href="/selected-work/from-crm-to-operating-system" variant="secondary" ctaLocation="proof_section">Read the RachelOS case study</LinkButton>
        </div>
      </Section>

      {/* 6. The Blueprint */}
      <Section className="!py-16 md:!py-24" id="blueprint">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-primary">The first paid step</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">{blueprint.name}</h2>
            <p className="mt-4 text-xl font-semibold leading-8">“{blueprint.question} I’ll identify where the work breaks down, what’s causing the friction, and the most practical next step.”</p>
            <p className="mt-6 text-lg font-semibold text-primary">{blueprint.commercial}</p>
            <p className="mt-2 text-sm leading-6 text-muted">One workflow · one business function · up to three systems · targeted {blueprint.duration.toLowerCase()} after intake. Requesting it does not charge you.</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <LinkButton href={offerHref(blueprint.slug)} ctaLocation="homepage_blueprint">See the Full Scope</LinkButton>
              <LinkButton href={offerContactHref(blueprint.slug)} variant="secondary" eventName="secondary_cta_click" ctaLocation="homepage_blueprint">Request a Blueprint</LinkButton>
            </div>
          </div>
          <ul className="space-y-3">
            {blueprint.deliverables.map((item) => (
              <li key={item} className="flex items-start gap-3 border border-border bg-surface p-4 text-base leading-7">
                <CheckCircle2 className="mt-1 size-4 shrink-0 text-primary" aria-hidden />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* 7. Founder and engagement model */}
      <Section className="bg-surface !py-16 md:!py-24">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <SectionHeader eyebrow="Who does the work" title="One accountable principal." />
            <div className="mt-6 space-y-4 text-base leading-7 text-muted">
              <p>Todd Kovalsky has spent 20+ years where operations, product, and technology meet: regulated financial operations, enterprise transformation programs, product ownership for advisor and trading platforms, and healthcare interoperability and transformation.</p>
              <p>The same person who learns your workflow designs and builds the fix. No associates, no handoff.</p>
            </div>
            <Link href="/founder" className="mt-6 inline-flex min-h-11 items-center text-sm font-semibold text-primary hover:underline">Read the full background →</Link>
          </div>
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.12em] text-primary">How engagements progress</h3>
            <ol className="mt-4 border-t border-border">
              {offers.map((offer) => (
                <li key={offer.slug} className="grid gap-1 border-b border-border py-2 sm:grid-cols-[1fr_auto] sm:items-center sm:gap-6">
                  <Link href={offerHref(offer.slug)} className="inline-flex min-h-11 items-center font-semibold hover:text-primary hover:underline">{offer.name}</Link>
                  <span className="text-sm font-semibold text-muted sm:text-right">{offer.commercial}</span>
                </li>
              ))}
            </ol>
            <p className="mt-4 text-sm leading-6 text-muted">Every engagement states its scope, exclusions, and price in writing before work starts. Enterprise buyers with a funded initiative can start at any step.</p>
          </div>
        </div>
      </Section>

      {/* 8. FAQ and boundaries */}
      <Section className="!py-16 md:!py-24">
        <SectionHeader eyebrow="Before you ask" title="What TKO is, and what it is not." />
        <div className="mt-8"><Faq items={homeFaqs} /></div>
      </Section>

      {/* 9. Final CTA */}
      <CtaBand
        title="Show me the workflow that’s wasting your team’s time."
        description={`Start with an Execution Gap Blueprint (${blueprint.commercial}), or talk about an enterprise engagement directly.`}
        primaryHref={offerHref(blueprint.slug)}
        primaryLabel={blueprint.ctaLabel}
        secondaryHref={enterpriseHref}
        secondaryLabel="Discuss an Enterprise Engagement"
      />
    </>
  );
}
