import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/site/json-ld";
import { FrameworkAuthorityPage } from "@/components/site/authority-page";
import { getFrameworkPage, frameworkPages } from "@/lib/authority";
import { absoluteUrl } from "@/lib/site";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() { return frameworkPages.map((page) => ({ slug: page.slug })); }

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const page = getFrameworkPage((await params).slug);
  if (!page) return {};
  return { title: page.title, description: page.description, alternates: { canonical: `/frameworks/${page.slug}` }, openGraph: { title: page.title, description: page.description, type: "article", url: absoluteUrl(`/frameworks/${page.slug}`) } };
}

export default async function FrameworkDetailPage({ params }: Params) {
  const page = getFrameworkPage((await params).slug);
  if (!page) notFound();
  return <><JsonLd data={{ "@context": "https://schema.org", "@type": "Article", headline: page.title, description: page.description, url: absoluteUrl(`/frameworks/${page.slug}`), publisher: { "@type": "Organization", name: "TKO Solutions" }, about: page.executiveQuestion }} /><JsonLd data={{ "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") }, { "@type": "ListItem", position: 2, name: "Frameworks", item: absoluteUrl("/frameworks") }, { "@type": "ListItem", position: 3, name: page.title, item: absoluteUrl(`/frameworks/${page.slug}`) }] }} /><FrameworkAuthorityPage page={page} /></>;
}
