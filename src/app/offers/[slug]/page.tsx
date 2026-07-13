import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/site/json-ld";
import { OfferAuthorityPage } from "@/components/site/authority-page";
import { getOfferPage, offerPages } from "@/lib/authority";
import { absoluteUrl } from "@/lib/site";

type Params = { params: Promise<{ slug: string }> };
export function generateStaticParams() { return offerPages.map((page) => ({ slug: page.slug })); }
export async function generateMetadata({ params }: Params): Promise<Metadata> { const page = getOfferPage((await params).slug); return page ? { title: page.title, description: page.description, alternates: { canonical: `/offers/${page.slug}` }, openGraph: { title: page.title, description: page.description, url: absoluteUrl(`/offers/${page.slug}`) } } : {}; }
export default async function OfferDetailPage({ params }: Params) { const page = getOfferPage((await params).slug); if (!page) notFound(); return <><JsonLd data={{ "@context": "https://schema.org", "@type": "Service", name: page.title, description: page.description, serviceType: "Executive operating assessment", provider: { "@type": "Organization", name: "TKO Solutions", url: absoluteUrl("/") }, areaServed: "United States", url: absoluteUrl(`/offers/${page.slug}`) }} /><OfferAuthorityPage page={page} /></>; }
