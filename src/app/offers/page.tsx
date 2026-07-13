import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { JsonLd } from "@/components/site/json-ld";
import { AuthorityLinks } from "@/components/site/authority-links";
import { Card } from "@/components/ui/card";
import { PageHero } from "@/components/site/page-hero";
import { Section } from "@/components/ui/section";
import { offerPages } from "@/lib/authority";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = { title: "Executive Assessments", description: "Bounded executive assessments for workflow recovery, healthcare operations, decision rights, program recovery, and governed AI delivery.", alternates: { canonical: "/offers" }, openGraph: { title: "Executive Assessments", description: "Start with a bounded operating assessment, not a generic consulting scope.", url: absoluteUrl("/offers") } };
export default function OffersPage() { return <><JsonLd data={{ "@context": "https://schema.org", "@type": "CollectionPage", name: "TKO Executive Assessments", url: absoluteUrl("/offers") }} /><PageHero eyebrow="Commercial offers" title="Start with the operating problem under pressure." description="Each offer is a bounded assessment that turns a hidden constraint into an evidence-backed next decision. AI is considered only where it can improve a governed workflow." primaryHref="/contact" primaryLabel="Discuss an assessment" secondaryHref="/proof" secondaryLabel="Review proof first" /><Section><div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">{offerPages.map((offer) => <Card key={offer.slug} className="rounded-lg"><p className="text-xs font-semibold uppercase tracking-[0.1em] text-primary">{offer.primaryQuery}</p><h2 className="mt-3 text-2xl font-semibold">{offer.title}</h2><p className="mt-4 text-sm leading-6 text-muted">{offer.description}</p><Link href={`/offers/${offer.slug}`} className="mt-6 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.08em] text-primary hover:text-primary-dark">Review assessment <ArrowRight className="size-4" aria-hidden="true" /></Link></Card>)}</div></Section><AuthorityLinks current="/offers" /></>; }
