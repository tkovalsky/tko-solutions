import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { JsonLd } from "@/components/site/json-ld";
import { AuthorityLinks } from "@/components/site/authority-links";
import { Card } from "@/components/ui/card";
import { PageHero } from "@/components/site/page-hero";
import { Section } from "@/components/ui/section";
import { founderPages } from "@/lib/authority";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = { title: "Founder Operating Record", description: "Evidence-first founder authority: built systems, operating judgment, healthcare experience, AI delivery, difficult decisions, and explicit claim boundaries.", alternates: { canonical: "/founder" }, openGraph: { title: "Founder Operating Record", description: "Follow the evidence behind the operating judgment.", url: absoluteUrl("/founder") } };
export default function FounderPage() { return <><JsonLd data={{ "@context": "https://schema.org", "@type": "CollectionPage", name: "Todd Kovalsky: Founder Operating Record", url: absoluteUrl("/founder") }} /><PageHero eyebrow="Founder authority" title="The operating record—not a resume." description="Todd helps executives recover complex operating systems by making hidden work, decision bottlenecks, governance failures, workflow ambiguity, and cross-functional dependencies visible. RachelOS demonstrates the method; healthcare is the proving ground." primaryHref="/proof/rachelos" primaryLabel="Inspect RachelOS" secondaryHref="/offers/executive-recovery" secondaryLabel="Start with an assessment" /><Section><div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">{founderPages.map((page) => <Card key={page.slug} className="rounded-lg"><h2 className="text-2xl font-semibold">{page.title}</h2><p className="mt-4 text-sm leading-6 text-muted">{page.description}</p><Link href={`/founder/${page.slug}`} className="mt-6 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.08em] text-primary hover:text-primary-dark">Review the record <ArrowRight className="size-4" aria-hidden="true" /></Link></Card>)}</div></Section><AuthorityLinks current="/founder" /></>; }
