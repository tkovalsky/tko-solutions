import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { AuthorityLinks } from "@/components/site/authority-links";
import { MermaidDiagram } from "@/components/site/mermaid-diagram";
import type { FounderPage, OfferPage, FrameworkPage } from "@/lib/authority";
import { Card } from "@/components/ui/card";
import { CtaBand } from "@/components/site/cta-band";
import { PageHero } from "@/components/site/page-hero";
import { Section, SectionHeader } from "@/components/ui/section";

function List({ values }: { values: string[] }) {
  return <ul className="mt-4 list-disc space-y-2 pl-5 text-base leading-7 text-muted">{values.map((value) => <li key={value}>{value}</li>)}</ul>;
}

function RelatedLink({ item, heading }: { item: { label: string; href: string; description: string }; heading: string }) {
  return <Card className="rounded-lg"><p className="text-xs font-semibold uppercase tracking-[0.12em] text-primary">{heading}</p><h3 className="mt-3 text-xl font-semibold">{item.label}</h3><p className="mt-3 text-sm leading-6 text-muted">{item.description}</p><Link href={item.href} className="mt-5 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.08em] text-primary hover:text-primary-dark">Open asset <ArrowRight className="size-4" aria-hidden="true" /></Link></Card>;
}

export function FrameworkAuthorityPage({ page }: { page: FrameworkPage }) {
  return <>
    <PageHero eyebrow={page.eyebrow} title={page.title} description={page.description} primaryHref="/contact" primaryLabel="Discuss an Active Initiative" secondaryHref="/frameworks" secondaryLabel="Back to frameworks" />
    <Section>
      <div className="grid gap-8 lg:grid-cols-[0.78fr_1.22fr]">
        <div><p className="text-sm font-semibold uppercase tracking-[0.1em] text-primary">Executive question</p><h2 className="mt-4 text-3xl font-semibold leading-tight tracking-tight">{page.executiveQuestion}</h2></div>
        <div className="space-y-6 text-lg leading-8 text-muted"><p><strong className="text-foreground">Operating problem:</strong> {page.problem}</p><p><strong className="text-foreground">Observed constraint:</strong> {page.constraint}</p><p><strong className="text-foreground">Decision:</strong> {page.decision}</p></div>
      </div>
    </Section>
    <Section className="bg-surface">
      <SectionHeader eyebrow="Operating model" title="Make the path from constraint to recovery inspectable." description={page.operatingModel} />
      <div className="mt-10"><MermaidDiagram title={page.title} source={page.diagram} textAlternative={`${page.title}. ${page.operatingModel} Claim boundary: ${page.claimBoundary}`} /></div>
    </Section>
    <Section>
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        <Card className="rounded-lg"><h2 className="text-xl font-semibold">Tradeoffs</h2><List values={page.tradeoffs} /></Card>
        <Card className="rounded-lg"><h2 className="text-xl font-semibold">Failure modes</h2><List values={page.failureModes} /></Card>
        <Card className="rounded-lg"><h2 className="text-xl font-semibold">Recovery opportunities</h2><List values={page.recoveryOpportunities} /></Card>
      </div>
    </Section>
    <Section className="bg-surface">
      <div className="grid gap-10 lg:grid-cols-2"><div><SectionHeader eyebrow="Evidence" title="What supports this page." /><List values={page.evidence} /></div><div><SectionHeader eyebrow="What changed" title="The operating lens changes before the technology does." description={page.whatChanged} /><h3 className="mt-8 text-xl font-semibold">Lessons</h3><List values={page.lessons} /></div></div>
    </Section>
    <Section>
      <div className="border border-border bg-midnight p-8 text-white md:p-10"><p className="text-sm font-semibold uppercase tracking-[0.1em] text-primary-light">Claim boundary</p><p className="mt-4 max-w-4xl text-xl leading-8 text-white/85">{page.claimBoundary}</p></div>
      <div className="mt-8 grid gap-4 lg:grid-cols-3"><RelatedLink heading="Related guide" item={page.relatedGuide} /><RelatedLink heading="Related assessment" item={page.relatedAssessment} /><RelatedLink heading="Related service" item={page.relatedOffer} /></div>
    </Section>
    <AuthorityLinks current={`/frameworks/${page.slug}`} />
    <CtaBand title="Bring one workflow under pressure." description="The first conversation starts with the decision, the evidence available, and the operating constraint—not a preferred platform." />
  </>;
}

export function FounderAuthorityPage({ page }: { page: FounderPage }) {
  return <>
    <PageHero eyebrow="Founder authority / evidence-first" title={page.title} description={page.description} primaryHref={page.relatedProof.href} primaryLabel={page.relatedProof.label} secondaryHref="/proof/founder" secondaryLabel="Founder proof hub" />
    <Section><div className="grid gap-10 lg:grid-cols-2"><div><SectionHeader eyebrow="Operating point" title="The record is the argument." description={page.operatingPoint} /></div><Card className="rounded-lg"><h2 className="text-xl font-semibold">Evidence available for inspection</h2><List values={page.evidence} /></Card></div></Section>
    <Section className="bg-surface"><div className="border border-border bg-white p-8"><p className="text-sm font-semibold uppercase tracking-[0.1em] text-primary">Claim boundary</p><p className="mt-4 max-w-4xl text-lg leading-8 text-muted">{page.claimBoundary}</p></div><div className="mt-8 max-w-md"><RelatedLink heading="Related proof" item={page.relatedProof} /></div></Section>
    <AuthorityLinks current={`/founder/${page.slug}`} />
    <CtaBand title="Use the operating record to frame the problem." description="If the work under pressure is real, start with a bounded assessment rather than a generic transformation program." />
  </>;
}

export function OfferAuthorityPage({ page }: { page: OfferPage }) {
  return <>
    <PageHero eyebrow="Commercial offer / bounded assessment" title={page.title} description={page.description} primaryHref="/contact" primaryLabel="Discuss an Active Initiative" secondaryHref={page.relatedProof.href} secondaryLabel="Review related proof" />
    <Section><div className="grid gap-8 lg:grid-cols-2"><div><SectionHeader eyebrow="Who this is for" title={page.forWhom} /><h2 className="mt-10 text-xl font-semibold">Signals you may need this</h2><List values={page.signals} /></div><Card className="rounded-lg"><p className="text-xs font-semibold uppercase tracking-[0.1em] text-primary">Executive question</p><p className="mt-4 text-2xl font-semibold leading-tight">{page.executiveQuestion}</p><p className="mt-8 text-xs font-semibold uppercase tracking-[0.1em] text-primary">Primary search query</p><p className="mt-3 text-lg text-muted">{page.primaryQuery}</p></Card></div></Section>
    <Section className="bg-surface"><div className="grid gap-5 md:grid-cols-2"><Card className="rounded-lg"><h2 className="text-xl font-semibold">What happens during the engagement</h2><List values={page.process} /></Card><Card className="rounded-lg"><h2 className="text-xl font-semibold">Deliverables</h2><List values={page.deliverables} /></Card></div></Section>
    <Section><div className="grid gap-8 lg:grid-cols-2"><div><SectionHeader eyebrow="Evidence" title="The offer begins with what can be inspected." /><List values={page.evidence} /></div><div className="border border-border bg-midnight p-8 text-white"><p className="text-sm font-semibold uppercase tracking-[0.1em] text-primary-light">Claim boundary</p><p className="mt-4 text-lg leading-8 text-white/85">{page.claimBoundary}</p><p className="mt-6 text-sm leading-6 text-white/65">Proposal and downloadable asset placeholders are released only after the engagement scope and evidence conditions are confirmed.</p></div></div><div className="mt-8 max-w-md"><RelatedLink heading="Related proof" item={page.relatedProof} /></div></Section>
    <AuthorityLinks current={`/offers/${page.slug}`} />
    <CtaBand title="Start with the constraint, not a generic scope." description="Request a conversation to confirm the executive question, evidence available, and whether this assessment is the right next move." />
  </>;
}
