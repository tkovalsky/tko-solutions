import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/site/page-hero";
import { CtaBand } from "@/components/site/cta-band";
import { Section, SectionHeader } from "@/components/ui/section";
import { JsonLd } from "@/components/site/json-ld";
import { absoluteUrl, site } from "@/lib/site";

const path = "/products/ambient-crm";
const contact = "/contact?offer=managed-follow-up";
export const metadata: Metadata = {
  title: "Managed Follow-Up for Real-Estate Agents & Small Teams",
  description: "A $5,000, 30-day pilot to establish a consistent follow-up process around your existing contacts and supported tools. Optional ongoing service at $1,500/month.",
  alternates: { canonical: path },
  openGraph: { title: "Managed Follow-Up | TKO Solutions", description: "Know who needs attention, keep the context, and prepare the next conversation.", url: absoluteUrl(path), images: [{ url: site.socialImage, width: 1200, height: 630, alt: "TKO Solutions managed follow-up service" }] },
};
const steps = [
  ["Check the fit", "We inspect the current process, confirm access and tool compatibility, and agree on one workflow and contact population before accepting the pilot."],
  ["Set up the workflow", "Organize the agreed contacts, configure supported connections and follow-up rules, and establish a practical daily view using existing tools wherever possible."],
  ["Use it and review", "Train the operator, run the agreed workflow, inspect exceptions, and compare follow-up coverage and overdue work with the starting baseline."],
];
const included = [
  "One team and one supported CRM, with the users and contact population agreed in writing",
  "A baseline review of follow-up coverage and overdue work",
  "A daily work view with contact context and clear next actions",
  "Templates or drafting assistance where the tools and workflow support them",
  "Operator training, written handoff, and an end-of-pilot readout",
  "Important relationship decisions and communications remain subject to human review",
];
export default function ManagedFollowUpPage() {
  return <>
    <JsonLd data={{ "@context": "https://schema.org", "@type": "Service", name: "Managed Follow-Up", url: absoluteUrl(path), description: metadata.description, provider: { "@type": "ProfessionalService", name: site.name, url: site.url } }} />
    <PageHero eyebrow="For established real-estate agents & small teams" title="Keep the relationship. Lose the scramble." description="Your CRM holds contacts. Your inbox holds conversations. You still have to remember who needs attention and why. TKO sets up a consistent follow-up process around your supported tools, then helps keep it working." primaryHref={contact} primaryLabel="Discuss a Follow-Up Pilot" secondaryHref="#pricing" secondaryLabel="See Scope & Pricing" />
    <Section className="bg-surface !py-10">
      <div className="grid gap-4 text-base font-semibold sm:grid-cols-3"><p>30-day pilot · $5,000</p><p>Optional ongoing service · $1,500/month</p><p>Delivered by Todd Kovalsky</p></div>
    </Section>
    <Section>
      <div className="grid gap-10 lg:grid-cols-2"><SectionHeader eyebrow="A recognizable problem" title="The tools are there. The follow-up still slips." description="This is for a business with an existing book of relationships and an operator ready to use the process. It is useful when the gap is execution across your tools." /><ul className="divide-y divide-border border-y border-border text-lg leading-8 text-muted">{["You have to search several places before reaching out.", "New inquiries get attention, but older relationships disappear from the day.", "Nobody can reliably say which follow-ups are overdue.", "A busy week means the process goes quiet."].map(x=><li key={x} className="py-5">{x}</li>)}</ul></div>
    </Section>
    <Section className="bg-surface">
      <SectionHeader eyebrow="What the day can look like" title="Context and a next step, in one place." description="Illustrative work view using fictional contacts. This shows the service’s intended workflow, not a ready-to-install software product or a customer result." />
      <div className="mt-10 overflow-x-auto border border-border bg-white"><table className="w-full min-w-[38rem] text-left text-sm"><caption className="p-5 text-left font-semibold">Synthetic example · today’s follow-up</caption><thead className="border-y border-border bg-surface"><tr>{["Relationship", "Why it needs attention", "Prepared next step"].map(x=><th key={x} className="p-5">{x}</th>)}</tr></thead><tbody>{[
        ["Alex · prospective buyer", "Asked about timing; follow-up is due", "Review a check-in draft and confirm next steps"],
        ["Morgan · past client", "Requested a contractor referral", "Confirm the referral and record the handoff"],
        ["Taylor · website inquiry", "No first response is recorded", "Review the inquiry and assign an owner"],
      ].map(row=><tr key={row[0]} className="border-b border-border last:border-0">{row.map(x=><td key={x} className="p-5 align-top leading-7">{x}</td>)}</tr>)}</tbody></table></div>
      <p className="mt-5 text-sm leading-6 text-muted">The operator checks the context and decides what to send. Configuration and interface depend on the supported tools agreed for your pilot.</p>
    </Section>
    <Section>
      <SectionHeader eyebrow="The paid pilot" title="One workflow. A usable process. A clear readout." />
      <ol className="mt-10 grid gap-6 md:grid-cols-3">{steps.map(([title,body],i)=><li key={title} className="border-t-2 border-primary pt-6"><p className="font-mono text-sm text-primary">0{i+1}</p><h3 className="mt-3 text-xl font-semibold">{title}</h3><p className="mt-4 leading-7 text-muted">{body}</p></li>)}</ol>
      <ul className="mt-10 grid gap-4 sm:grid-cols-2">{included.map(x=><li key={x} className="border border-border bg-surface p-5 leading-7">{x}</li>)}</ul>
    </Section>
    <Section id="pricing" className="bg-surface">
      <SectionHeader eyebrow="Scope & pricing" title="Start small. Continue only if it is useful." description="Scope, access, timing, and compatibility are confirmed in writing before work starts." />
      <div className="mt-10 grid gap-6 lg:grid-cols-3">
        <article className="border border-primary bg-white p-7"><h3 className="text-xl font-semibold">30-day pilot</h3><p className="mt-4 text-3xl font-semibold">$5,000</p><p className="mt-4 leading-7 text-muted">One bounded follow-up workflow, setup, training, and readout. The goal is a usable process, not a report alone.</p><p className="mt-4 text-sm leading-6">No obligation to continue. Timeline begins once agreed access and inputs are available.</p></article>
        <article className="border border-border bg-white p-7"><h3 className="text-xl font-semibold">Keep it working</h3><p className="mt-4 text-3xl font-semibold">$1,500/month</p><p className="mt-4 leading-7 text-muted">Optional monitoring, troubleshooting, one monthly review, and up to four hours of support and small configuration adjustments per month.</p><p className="mt-4 text-sm leading-6">Larger changes are separately scoped. Service hours and response expectations are agreed before continuation.</p></article>
        <article className="border border-border bg-white p-7"><h3 className="text-xl font-semibold">Custom implementation</h3><p className="mt-4 text-3xl font-semibold">From $15,000</p><p className="mt-4 leading-7 text-muted">New integrations, a bespoke application, website or content systems, or additional workflows require a separate fixed-scope proposal.</p><p className="mt-4 text-sm leading-6">The pilot does not include rebuilding RachelOS for your business.</p></article>
      </div>
      <p className="mt-6 max-w-[85ch] text-sm leading-7 text-muted">CRM subscriptions, messaging, hosting, and AI usage are separate from service fees. Any additional tools and costs must be agreed before use. No appointments, closings, revenue increase, or lead volume are guaranteed.</p>
    </Section>
    <Section>
      <div className="grid gap-10 lg:grid-cols-2"><SectionHeader eyebrow="RachelOS is the proof" title="Built around a real operator’s day." description="Todd designed and built RachelOS to connect relationship context, daily work, and human-reviewed communication. It demonstrates the approach. It does not establish a conversion or revenue result for your business." /><div className="space-y-5 leading-8 text-muted"><p>You bring an accountable operator, an existing contact base, permission to use the relevant data, and access to the supported tools. TKO brings workflow design, configuration, implementation judgment, and a measured readout.</p><p>You retain ownership of your data and receive a written handoff. Configuration, exports, access, and any custom-code ownership are documented in the scope.</p><Link href="/selected-work/from-crm-to-operating-system" className="inline-block font-semibold text-primary underline underline-offset-4">Read the RachelOS case study</Link></div></div>
    </Section>
    <CtaBand title="Which follow-up keeps slipping?" description="Tell me about your team, CRM, and one recurring gap. The first conversation is free. We’ll confirm fit and compatibility before proposing a paid pilot." primaryHref={contact} primaryLabel="Discuss a Follow-Up Pilot" secondaryHref="/services" secondaryLabel="Other Workflow Services" />
  </>;
}
