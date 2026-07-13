import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/site/json-ld";
import { FounderAuthorityPage } from "@/components/site/authority-page";
import { founderPages, getFounderPage } from "@/lib/authority";
import { absoluteUrl } from "@/lib/site";

type Params = { params: Promise<{ slug: string }> };
export function generateStaticParams() { return founderPages.map((page) => ({ slug: page.slug })); }
export async function generateMetadata({ params }: Params): Promise<Metadata> { const page = getFounderPage((await params).slug); return page ? { title: page.title, description: page.description, alternates: { canonical: `/founder/${page.slug}` }, openGraph: { title: page.title, description: page.description, url: absoluteUrl(`/founder/${page.slug}`) } } : {}; }
export default async function FounderDetailPage({ params }: Params) { const page = getFounderPage((await params).slug); if (!page) notFound(); return <><JsonLd data={{ "@context": "https://schema.org", "@type": "Article", headline: page.title, description: page.description, url: absoluteUrl(`/founder/${page.slug}`), author: { "@type": "Person", name: "Todd Kovalsky" }, publisher: { "@type": "Organization", name: "TKO Solutions" } }} /><FounderAuthorityPage page={page} /></>; }
