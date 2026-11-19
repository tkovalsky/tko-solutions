import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/site/page-hero";
import { CtaBand } from "@/components/site/cta-band";
import { Section, SectionHeader } from "@/components/ui/section";
import { JsonLd } from "@/components/site/json-ld";
import { absoluteUrl, site } from "@/lib/site";

// The BoundOS Referral Network is run from boundos.com; this page introduces it and hands off.
// Wording follows the live boundos.com copy. Referral-fee, compensation, and territory terms are
// deliberately left to boundos.com (they are being revised there) and must not be restated here.
const referralNetwork = {
  name: "BoundOS Referral Network",
  url: "https://www.boundos.com",
  applyUrl: "https://www.boundos.com/apply",
} as const;

const path = "/products/referral-network";
const description = "A South Florida and Northeast relocation referral network for real-estate agents, powered by owned AI-search (AEO) guides and BoundOS follow-up governance.";
export const metadata: Metadata = {
  title: "BoundOS Referral Network for Real-Estate Agents",
  description,
  alternates: { canonical: path },
  openGraph: { title: "BoundOS Referral Network | TKO Solutions", description, url: absoluteUrl(path), images: [{ url: site.socialImage, width: 1200, height: 630, alt: "BoundOS Referral Network by TKO Solutions" }] },
};
const steps = [
  ["Owned relocation demand", "Relocation and neighborhood comparison guides built for AI search, paired with local partner walkthrough videos and corridor media."],
  ["Routing to a local partner", "When a buyer wants a market outside the flagship, or needs to sell in the Northeast first, the referral routes to a vetted partner in that market."],
  ["BoundOS follow-up governance", "Relocation can take months. BoundOS keeps the relationship memory, surfaces a short morning lineup with context, and a person approves every message."],
  ["Brokerage-to-brokerage referrals", "Referral agreements are executed between licensed real-estate brokerages."],
];
const markets = [
  ["South Florida", "Port St. Lucie & Stuart, Jupiter & Palm Beach Gardens, Fort Lauderdale, and Naples, around the Delray Beach & Boca Raton flagship."],
  ["Northeast feeder corridors", "Fairfield County CT, Northern New Jersey, and Westchester & Long Island NY."],
];
export default function ReferralNetworkPage() {
  return <>
    <JsonLd data={{ "@context": "https://schema.org", "@type": "Service", name: referralNetwork.name, url: absoluteUrl(path), description, provider: { "@type": "ProfessionalService", name: site.name, url: site.url } }} />
    <PageHero eyebrow="BoundOS Referral Network · For Real-Estate Agents" title="A relocation referral network built on owned demand." description="The BoundOS Referral Network connects relocation buyers and sellers across South Florida and Northeast feeder corridors with vetted local agents, using AI-search (AEO) relocation guides and BoundOS follow-up so warm referrals are not lost in a crowded CRM." primaryHref={referralNetwork.applyUrl} primaryLabel="Apply to the Network" secondaryHref={referralNetwork.url} secondaryLabel="Details on boundos.com" />
    <Section className="bg-surface">
      <SectionHeader eyebrow="How the network works" title="Owned demand in. Governed handoff. Clean referral out." />
      <ol className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">{steps.map(([title, body], i) => <li key={title} className="border-t-2 border-primary pt-6"><p className="font-mono text-sm text-primary">0{i + 1}</p><h3 className="mt-3 text-xl font-semibold">{title}</h3><p className="mt-4 leading-7 text-muted">{body}</p></li>)}</ol>
    </Section>
    <Section>
      <div className="grid gap-10 lg:grid-cols-2"><SectionHeader eyebrow="Markets" title="South Florida and the Northeast feeder corridors." description="Current market availability and partner standards are listed on boundos.com." /><ul className="divide-y divide-border border-y border-border text-lg leading-8 text-muted">{markets.map(([title, body]) => <li key={title} className="py-5"><span className="font-semibold text-foreground">{title}.</span> {body}</li>)}</ul></div>
    </Section>
    <Section className="bg-surface">
      <div className="grid gap-10 lg:grid-cols-2"><SectionHeader eyebrow="RachelOS is the proof" title="Built first for one Delray Beach practice." description="Todd Kovalsky built RachelOS for a single Delray Beach & Boca Raton relocation practice: hyper-local guides, a morning lineup, and human-approved follow-up. The network extends that approach to partner markets. It does not establish a result for your business." /><div className="space-y-5 leading-8 text-muted"><p>Partner economics, standards, and the application live on boundos.com, where Todd reviews every application personally.</p><p className="text-sm leading-7">TKO Solutions LLC is a technology and marketing operator, not a licensed real-estate brokerage. No lead volume, conversion rate, or revenue is guaranteed.</p><Link href="/selected-work/from-crm-to-operating-system" className="inline-block font-semibold text-primary underline underline-offset-4">Read the RachelOS case study</Link></div></div>
    </Section>
    <CtaBand title="Work a relocation market?" description="Apply on boundos.com with your market and brokerage. Todd reviews every application personally." primaryHref={referralNetwork.applyUrl} primaryLabel="Apply to the Network" secondaryHref={referralNetwork.url} secondaryLabel="Details on boundos.com" />
  </>;
}
