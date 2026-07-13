import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/site/json-ld";
import { ProofAuthorityPage } from "@/components/site/authority-page";
import { getProofPage, proofPages } from "@/lib/authority";
import { absoluteUrl } from "@/lib/site";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() { return proofPages.map((page) => ({ slug: page.slug })); }

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const page = getProofPage((await params).slug);
  if (!page) return {};
  return { title: page.title, description: page.description, alternates: { canonical: `/proof/${page.slug}` }, openGraph: { title: page.title, description: page.description, type: "article", url: absoluteUrl(`/proof/${page.slug}`) } };
}

export default async function ProofDetailPage({ params }: Params) {
  const page = getProofPage((await params).slug);
  if (!page) notFound();
  return <><JsonLd data={{ "@context": "https://schema.org", "@type": "Article", headline: page.title, description: page.description, url: absoluteUrl(`/proof/${page.slug}`), publisher: { "@type": "Organization", name: "TKO Solutions" }, about: page.executiveQuestion }} /><JsonLd data={{ "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") }, { "@type": "ListItem", position: 2, name: "Proof", item: absoluteUrl("/proof") }, { "@type": "ListItem", position: 3, name: page.title, item: absoluteUrl(`/proof/${page.slug}`) }] }} /><ProofAuthorityPage page={page} /></>;
}
