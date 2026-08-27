import type { Metadata } from "next";
import { CtaBand } from "@/components/site/cta-band";
import { JsonLd } from "@/components/site/json-ld";
import { LinkButton } from "@/components/ui/button";
import { Section, SectionHeader } from "@/components/ui/section";
import { offerHref, offers } from "@/lib/offers";
import { absoluteUrl, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Healthcare Transformation & Operating Model Advisory",
  description: site.description,
  alternates: { canonical: "/" },
  openGraph: { title: "Make complex healthcare change executable.", description: site.description, url: absoluteUrl("/"), images: [{ url: site.socialImage, width: 1200, height: 630, alt: "TKO Solutions healthcare transformation and operating-model advisory." }] },
};

const problems = [
  ["Administrative friction", "Manual review, duplicate work, rework, escalation, provider burden, and cost accumulate across workflows nobody sees end to end."],
  ["Operating-model transformation", "Roles, controls, decision rights, segmentation, exception handling, and governance must be redesigned before technology can improve them."],
  ["Technology and governed AI", "Workflows, rules, data, integrations, automation, and human review have to operate as one accountable decision system."],
  ["Execution and recovery", "Hidden dependencies, fragmented ownership, release collisions, and local green status prevent complex programs from converging."],
] as const;

const contrast = [
  ["Collects workstream status", "Reconstructs enterprise truth"],
  ["Tracks reported dependencies", "Finds the dependencies nobody reported"],
  ["Records assigned owners", "Finds the work with no accountable owner"],
  ["Reports red, yellow, green", "Tests whether status is supported by evidence"],
  ["Escalates overdue actions", "Identifies the unresolved decision preventing closure"],
  ["Produces dashboards", "Creates executive decision intelligence"],
  ["Coordinates meetings", "Drives cross-system convergence"],
  ["Reports readiness", "Establishes what ready means, then tests it"],
] as const;

const proof = [
  "20+ years across regulated operations, enterprise transformation, product, and implementation",
  "Healthcare experience across payer operations, provider workflows, prior authorization, UM, and interoperability",
  "Delivery environments involving dozens of applications and workstreams",
  "Governance contexts involving more than 100 cross-functional participants",
] as const;

export default function HomePage() {
  return (
    <>
      <JsonLd data={{ "@context": "https://schema.org", "@type": "WebPage", name: "TKO Solutions | Healthcare Transformation & Operating Model Advisory", url: absoluteUrl("/"), description: site.description }} />

      <section className="relative overflow-hidden bg-midnight text-white">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgb(var(--accent-rgb)/0.18),_transparent_58%)]" />
        <div className="relative mx-auto grid w-full max-w-7xl gap-12 px-6 py-16 lg:grid-cols-[1.25fr_0.75fr] lg:px-8 lg:py-24">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary-light">Healthcare transformation &amp; operating model advisory</p>
            <h1 className="mt-6 max-w-4xl text-4xl font-bold leading-[1.02] tracking-tight sm:text-6xl lg:text-7xl">Make complex healthcare change executable.</h1>
            <p className="mt-7 max-w-[66ch] text-lg leading-8 text-white/75 sm:text-xl sm:leading-9">Large healthcare transformations rarely fail because nobody is working. They fail because the outcome is distributed across dozens of teams, systems, decisions, and dependencies—and therefore owned by nobody end to end. TKO becomes the integration and operational-truth layer that closes that gap.</p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <LinkButton href="/contact" ctaLocation="homepage_hero">Discuss a Transformation</LinkButton>
              <LinkButton href="/services/executive-diagnostic" ctaLocation="homepage_hero" variant="secondary" className="border-white/35 text-white hover:border-white/60 hover:bg-white/10">Start with a Diagnostic</LinkButton>
            </div>
          </div>
          <div className="self-end border-l border-white/25 pl-6 lg:pl-8">
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-primary-light">The point of view</p>
            <p className="mt-5 text-2xl font-semibold leading-snug">Every part has an owner.<br />The whole does not.</p>
            <p className="mt-5 text-sm leading-6 text-white/65">Reporting depends on an execution system that someone has to establish first: who owns what, what depends on what, which decision is stuck, and whether ready means anything.</p>
          </div>
        </div>
      </section>

      <Section className="!py-14 md:!py-18">
        <div className="grid gap-12 lg:grid-cols-[0.72fr_1.28fr]">
          <SectionHeader eyebrow="The recognizable problem" title="Healthcare operating models were not designed for today’s pressure." description="Providers expect less friction. Regulators expect faster action. Leaders expect lower cost. Technology teams are being asked to deploy AI. The controls still matter." />
          <div className="border-t border-border">
            {problems.map(([title, body], index) => (
              <article key={title} className="grid gap-3 border-b border-border py-6 sm:grid-cols-[3rem_0.65fr_1.35fr]">
                <p className="font-mono text-sm text-primary">0{index + 1}</p><h2 className="text-xl font-semibold">{title}</h2><p className="text-base leading-7 text-muted">{body}</p>
              </article>
            ))}
          </div>
        </div>
      </Section>

      <Section className="bg-surface !py-14 md:!py-20">
        <SectionHeader eyebrow="How TKO engages" title="Land with a bounded question. Expand only when the evidence supports it." description="Every engagement defines the objective, scope, deliverables, access, client responsibilities, exclusions, and the decision for handoff or expansion." />
        <ol className="mt-12 border-t border-border">
          {offers.map((offer, index) => (
            <li key={offer.slug} className="grid gap-4 border-b border-border py-7 md:grid-cols-[3rem_0.85fr_1.35fr_0.55fr_auto] md:items-center">
              <span className="font-mono text-sm text-primary">{String(index + 1).padStart(2, "0")}</span>
              <div><p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted">{offer.level}</p><h3 className="mt-1 text-xl font-semibold">{offer.name}</h3></div>
              <p className="text-sm leading-6 text-muted">{offer.question}</p>
              <p className="text-sm font-semibold">{offer.duration}<br /><span className="text-primary">{offer.commercial}</span></p>
              <LinkButton href={offerHref(offer.slug)} variant="secondary">Details</LinkButton>
            </li>
          ))}
        </ol>
      </Section>

      <Section className="!py-14 md:!py-18">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeader eyebrow="Why Todd" title="The work happens between specialties." description="Todd operates where healthcare operations, provider experience, technology, controls, governance, and implementation collide. He has served as the integration point across business, operations, technology, compliance, finance, provider workflows, testing, and production readiness on deadline-driven enterprise programs." />
          <div>
            <ul className="grid gap-3 sm:grid-cols-2">{proof.map((item) => <li key={item} className="border-l-2 border-primary bg-surface p-5 text-sm leading-6 text-muted">{item}</li>)}</ul>
            <p className="mt-6 text-sm leading-6 text-muted">Employment history establishes experience, not employer endorsement. Enterprise work is anonymized and bounded to Todd’s actual role.</p>
            <div className="mt-7 flex gap-3"><LinkButton href="/founder" variant="secondary">About Todd</LinkButton><LinkButton href="/selected-work" variant="secondary">Review the Evidence</LinkButton></div>
          </div>
        </div>
      </Section>

      <Section className="bg-surface !py-14 md:!py-18">
        <SectionHeader eyebrow="What this is not" title="You already have a PMO. This is a different job." description="A program office collects and reports what teams say. The execution layer establishes whether what they say is complete, connected, owned, current, and sufficient to support go-live. Both are necessary. They are not the same work." />
        <div className="mt-10 border-t border-border">
          <div className="hidden gap-8 border-b border-border py-3 sm:grid sm:grid-cols-2">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted">Conventional program office</p>
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-primary">TKO</p>
          </div>
          {contrast.map(([conventional, tko]) => (
            <div key={tko} className="grid gap-2 border-b border-border py-5 sm:grid-cols-2 sm:gap-8">
              <p className="text-base leading-7 text-muted">{conventional}</p>
              <p className="text-base font-semibold leading-7">{tko}</p>
            </div>
          ))}
        </div>
        <LinkButton href="/approach" variant="secondary" className="mt-10">Explore the Approach</LinkButton>
      </Section>

      <CtaBand title="Bring the messy problem." description="What is changing? What is stuck? Where is the burden? Which teams and systems are involved? Start there." primaryLabel="Discuss a Transformation" secondaryHref="/services/executive-diagnostic" secondaryLabel="Start with a Diagnostic" />
    </>
  );
}
