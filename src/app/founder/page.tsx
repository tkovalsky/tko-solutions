import type { Metadata } from "next";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { CtaBand } from "@/components/site/cta-band";
import { JsonLd } from "@/components/site/json-ld";
import { PageHero } from "@/components/site/page-hero";
import { Section, SectionHeader } from "@/components/ui/section";
import { careerTimeline, executiveSummary, founderArchetypes, howIWork } from "@/lib/founder";
import { CONSTRAINT_CALL } from "@/lib/offers";
import { absoluteUrl, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About Todd Kovalsky",
  description:
    "Todd Kovalsky, founder of TKO Solutions: an operator, product leader, and hands-on builder of business operating systems.",
  alternates: { canonical: "/founder" },
  openGraph: {
    title: "About Todd Kovalsky | TKO Solutions",
    description: "The person who diagnoses the problem builds the fix.",
    url: absoluteUrl("/founder"),
    images: [{ url: site.socialImage, width: 1200, height: 630, alt: "Todd Kovalsky, founder of TKO Solutions." }],
  },
};

export default function FounderPage() {
  return (
    <>
      <JsonLd data={{ "@context": "https://schema.org", "@type": "ProfilePage", name: "Todd Kovalsky", url: absoluteUrl("/founder"), mainEntity: { "@type": "Person", name: "Todd Kovalsky", jobTitle: "Founder & Principal", worksFor: { "@type": "Organization", name: site.name, url: site.url }, sameAs: [site.linkedin], knowsAbout: ["Business Operations", "Operating Model Design", "CRM and Lifecycle Systems", "Workflow Automation", "Human-in-the-Loop AI Systems", "Program and Product Leadership"] } }} />
      <PageHero eyebrow="Todd Kovalsky · Founder & Principal" title={executiveSummary.headline} description="I bring 20+ years across regulated operations, product ownership, and healthcare transformation to the work I lead personally. I translate the operating problem into decisions, controls, and a delivery scope—and stay responsible for the result I have agreed to deliver." primaryHref={CONSTRAINT_CALL.href} primaryLabel="Discuss Your Project" secondaryHref="/selected-work" secondaryLabel="Inspect My Work" />

      <Section className="bg-surface !py-12 md:!py-16"><div className="grid gap-3 md:grid-cols-2">{executiveSummary.facts.map((fact) => <p key={fact} className="border-l-2 border-primary bg-white p-5 text-sm leading-6 text-muted">{fact}</p>)}</div></Section>

      <Section>
        <SectionHeader eyebrow="Where I put that experience to work" title="Two engagements. The same accountable principal." />
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <article className="border border-border p-6"><h2 className="text-xl font-semibold">Healthcare transformation and readiness</h2><p className="mt-4 leading-7 text-muted">Trace an approved mandate or platform change through capabilities, workflows, systems, controls, and owners. Give delivery teams a backlog and the evidence required to accept the work.</p><Link href="/services/regulatory-implementation-readiness-sprint" className="mt-5 inline-flex min-h-11 items-center font-semibold text-primary hover:underline">Explore the Readiness Sprint →</Link></article>
          <article className="border border-border p-6"><h2 className="text-xl font-semibold">Owned demand and governed AI</h2><p className="mt-4 leading-7 text-muted">Connect buyer education, inquiry capture, relationship context, and an accountable next action. RachelOS demonstrates how I build the operating layer and controls around model assistance.</p><Link href="/private-client-os" className="mt-5 inline-flex min-h-11 items-center font-semibold text-primary hover:underline">Explore the Owned-Demand Build →</Link></article>
        </div>
      </Section>

      <Section>
        <SectionHeader eyebrow="What I notice" title="Different businesses get stuck in familiar ways." description="The vocabulary changes. The operating problem usually comes back to ownership, context, handoffs, and decisions that never made it into the system." />
        <div className="mt-10 border-t border-border">{founderArchetypes.map((item, index) => <article key={item.title} className="grid gap-4 border-b border-border py-7 md:grid-cols-[3rem_0.65fr_1.35fr]"><span className="font-mono text-sm text-primary">0{index + 1}</span><h2 className="text-2xl font-semibold">{item.title}</h2><p className="text-base leading-7 text-muted">{item.body}</p></article>)}</div>
      </Section>

      <Section className="bg-surface">
        <SectionHeader eyebrow="Career" title="Where the operating perspective came from." description="Operations taught me to respect controls and exceptions. Product taught me to turn that reality into usable systems. TKO brings both to the same engagement." />
        <ol className="mt-10 border-l-2 border-border">{careerTimeline.map((entry) => <li key={`${entry.years}-${entry.organization}`} className="relative pb-10 pl-8 last:pb-0"><span aria-hidden className="absolute -left-[7px] top-1.5 size-3 rounded-full border-2 border-primary bg-white" /><p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">{entry.years} · {entry.era}</p><h2 className="mt-2 text-xl font-semibold">{entry.organization}</h2><p className="mt-1 text-sm font-semibold text-primary">{entry.role}</p><p className="mt-3 max-w-[72ch] text-base leading-7 text-muted">{entry.scope}</p><p className="mt-4 max-w-[72ch] border-l-2 border-primary/40 pl-4 text-sm leading-6 text-foreground">{entry.buyerRelevance}</p></li>)}</ol>
        <a href={site.linkedin} target="_blank" rel="noreferrer" data-conversion-event="linkedin_click" data-cta-location="founder" data-cta-label="LinkedIn" className="mt-10 inline-flex min-h-11 items-center gap-2 border border-border px-5 text-sm font-semibold uppercase tracking-[0.08em] transition-colors hover:border-foreground/40">Full profile on LinkedIn <ExternalLink className="size-4" aria-hidden /></a>
      </Section>

      <Section><SectionHeader eyebrow="How I work" title="One person, clear terms." /><div className="mt-10 grid gap-4 md:grid-cols-2">{howIWork.map((item) => <article key={item.title} className="border border-border bg-white p-6"><h2 className="text-xl font-semibold">{item.title}</h2><p className="mt-3 text-base leading-7 text-muted">{item.body}</p></article>)}</div></Section>
      <CtaBand title="Talk to the person who will do the work." description={CONSTRAINT_CALL.summary} secondaryHref="/services" secondaryLabel="Services and Pricing" />
    </>
  );
}
