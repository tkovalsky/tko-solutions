import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/site/page-hero";
import { CtaBand } from "@/components/site/cta-band";
import { Section, SectionHeader } from "@/components/ui/section";
import { JsonLd } from "@/components/site/json-ld";
import { getOffer, sidecar } from "@/lib/offers";
import { absoluteUrl, site } from "@/lib/site";

const path = "/products/ambient-crm";
const contact = sidecar.contactHref;
const [assessment, core, managed] = sidecar.steps;
const build = getOffer("operating-system-build")!;
export const metadata: Metadata = {
  title: "Managed Follow-Up for Real-Estate Agents & Small Teams",
  description: `Done-with-you follow-up beside your existing CRM. Start with a ${assessment.price} ${assessment.name}; ${core.name} is ${core.commercial}, ${managed.name} ${managed.commercial}.`,
  alternates: { canonical: path },
  openGraph: { title: "Managed Follow-Up | TKO Solutions", description: "Know who needs attention, keep the context, and prepare the next conversation.", url: absoluteUrl(path), images: [{ url: site.socialImage, width: 1200, height: 630, alt: "TKO Solutions managed follow-up service" }] },
};
const steps = [
  ["Check the fit", "The Database Health Assessment imports your contacts, confirms access and tool compatibility, and shows which relationships are dated and eligible before any monthly service starts."],
  ["Set up the workflow", "Organize the agreed contacts, configure supported connections and follow-up rules, and establish a practical daily view using existing tools wherever possible."],
  ["Use it and review", "Train the operator, run the agreed workflow, inspect exceptions, and compare follow-up coverage and overdue work with the starting baseline."],
];
const included = [
  "One team and one supported CRM, with the users and contact population agreed in writing",
  "A baseline review of follow-up coverage and overdue work",
  "A daily work view with contact context and clear next actions",
  "Templates or drafting assistance where the tools and workflow support them",
  "Operator training, a written handoff, and a monthly outcome report",
  "Important relationship decisions and communications remain subject to human review",
];
export default function ManagedFollowUpPage() {
  return <>
    <JsonLd data={{ "@context": "https://schema.org", "@type": "Service", name: "Managed Follow-Up", url: absoluteUrl(path), description: metadata.description, provider: { "@type": "ProfessionalService", name: site.name, url: site.url } }} />
    <PageHero eyebrow="BoundOS Managed Follow-Up · For Real-Estate Agents, RIAs & Boutique Teams" title="Keep the relationship. Lose the scramble." description="Your CRM holds contacts. Your inbox holds conversations. You still have to remember who needs attention and why. TKO sets up an ambient follow-up operating layer around your supported tools—capturing context and surfacing the next action without replacing your CRM." primaryHref={contact} primaryLabel="Discuss Managed Follow-Up" secondaryHref="#pricing" secondaryLabel="See Scope & Pricing" />
    <Section className="bg-surface !py-10">
      <div className="grid gap-4 text-base font-semibold sm:grid-cols-3"><p>{assessment.name} · {assessment.price}</p><p>Ongoing service from {core.monthly}</p><p>Delivered by Todd Kovalsky</p></div>
    </Section>
    <Section>
      <div className="grid gap-10 lg:grid-cols-2"><SectionHeader eyebrow="Why traditional CRMs stall" title="You have a System of Record. You are missing a System of Action." description="Operators do not ignore CRMs because they are undisciplined—they ignore tools that demand manual data entry and give back 300 overdue tasks. BoundOS keeps your existing CRM as the filing cabinet and adds a daily execution view beside it." /><ul className="divide-y divide-border border-y border-border text-lg leading-8 text-muted">{["You have to reconstruct context across texts, emails, and notes before reaching out.", "New inquiries get attention, but high-value past clients and long-cycle prospects quietly drift.", "Nobody can reliably tell which follow-ups actually need human judgment today.", "A busy transaction week means the entire follow-up process goes quiet."].map(x=><li key={x} className="py-5">{x}</li>)}</ul></div>
    </Section>
    <Section className="bg-surface">
      <SectionHeader eyebrow="The Morning Cockpit View" title="Context, missing facts, and a prepared next step in one place." description="Illustrative work view using fictional contacts. This shows the service’s intended daily batting-lineup workflow, not a ready-to-install software product or a guaranteed customer result." />
      <div className="mt-10 overflow-x-auto border border-border bg-white"><table className="w-full min-w-[38rem] text-left text-sm"><caption className="p-5 text-left font-semibold">Synthetic example · today’s prioritized follow-up lineup</caption><thead className="border-y border-border bg-surface"><tr>{["Relationship", "Why it needs attention", "Prepared next step"].map(x=><th key={x} className="p-5">{x}</th>)}</tr></thead><tbody>{[
        ["Alex · prospective buyer", "Asked about timing; follow-up is due", "Review a check-in draft and confirm next steps"],
        ["Morgan · past client", "Requested a contractor referral", "Confirm the referral and record the handoff"],
        ["Taylor · website inquiry", "No first response is recorded", "Review the inquiry and assign an owner"],
      ].map(row=><tr key={row[0]} className="border-b border-border last:border-0">{row.map(x=><td key={x} className="p-5 align-top leading-7">{x}</td>)}</tr>)}</tbody></table></div>
      <p className="mt-5 text-sm leading-6 text-muted">The operator checks the context and decides what to send. Configuration and interface depend on the supported tools agreed for your engagement.</p>
    </Section>
    <Section>
      <SectionHeader eyebrow="How it starts" title="One contact base. A usable process. A clear readout." />
      <ol className="mt-10 grid gap-6 md:grid-cols-3">{steps.map(([title,body],i)=><li key={title} className="border-t-2 border-primary pt-6"><p className="font-mono text-sm text-primary">0{i+1}</p><h3 className="mt-3 text-xl font-semibold">{title}</h3><p className="mt-4 leading-7 text-muted">{body}</p></li>)}</ol>
      <ul className="mt-10 grid gap-4 sm:grid-cols-2">{included.map(x=><li key={x} className="border border-border bg-surface p-5 leading-7">{x}</li>)}</ul>
    </Section>
    <Section id="pricing" className="bg-surface">
      <SectionHeader eyebrow="Scope & pricing" title="Start small. Continue only if it is useful." description="Scope, access, timing, and compatibility are confirmed in writing before work starts." />
      <div className="mt-10 grid gap-6 lg:grid-cols-3">
        {sidecar.steps.map((step, index) => <article key={step.id} className={`border bg-white p-7 ${index === 0 ? "border-primary" : "border-border"}`}><h3 className="text-xl font-semibold">{step.name}</h3><p className="mt-4 text-3xl font-semibold">{step.price}</p>{"monthly" in step ? <p className="mt-1 text-lg font-semibold">+ {step.monthly}</p> : null}<p className="mt-2 text-sm leading-6 text-muted">{step.commercial}</p><p className="mt-4 leading-7 text-muted">{step.summary}</p><ul className="mt-4 space-y-2 text-sm leading-6">{step.includes.map(item => <li key={item}>{item}</li>)}</ul></article>)}
      </div>
      <p className="mt-6 max-w-[85ch] text-sm leading-7 text-muted">{sidecar.separateCosts} Any additional tools and costs must be agreed before use. Monthly service requires an operator who makes the calls and logs a disposition, and a holdout group we do not contact. No appointments, closings, revenue increase, or lead volume are guaranteed.</p>
      <p className="mt-4 max-w-[85ch] text-sm leading-7 text-muted">Product detail, onboarding, and the application for {sidecar.name} live on the BoundOS site, by TKO Solutions: <a href={sidecar.productUrl} className="font-semibold text-primary underline underline-offset-4">boundos.com</a>.</p>
    </Section>
    <Section>
      <div className="grid gap-10 lg:grid-cols-2"><SectionHeader eyebrow="RachelOS is the proof" title="Built around a real operator’s day." description="Todd designed and built RachelOS to connect relationship context, daily work, and human-reviewed communication. It demonstrates the approach. It does not establish a conversion or revenue result for your business." /><div className="space-y-5 leading-8 text-muted"><p>You bring an accountable operator, an existing contact base, permission to use the relevant data, and access to the supported tools. TKO brings workflow design, configuration, implementation judgment, and a measured readout.</p><p>You retain ownership of your data and receive a written handoff. Configuration, exports, access, and any custom-code ownership are documented in the scope.</p><Link href="/selected-work/from-crm-to-operating-system" className="inline-block font-semibold text-primary underline underline-offset-4">Read the RachelOS case study</Link></div></div>
    </Section>
    <Section className="bg-surface !py-10"><div className="max-w-[75ch]"><h2 className="text-2xl font-semibold">Need buyer content and inquiry capture as well?</h2><p className="mt-4 leading-7 text-muted">{sidecar.name} improves follow-up around an existing contact base. The broader Owned Demand &amp; Governed AI Engine adds a defined buyer-content and inquiry path, supported integrations, and review controls in a separately scoped build.</p><Link href="/private-client-os" className="mt-5 inline-flex min-h-11 items-center font-semibold text-primary hover:underline">Explore the {build.commercial.split(" · ")[0]} →</Link></div></Section>
    <CtaBand title="Which follow-up keeps slipping?" description="Tell me about your team, CRM, and one recurring gap. The first conversation is free. We’ll confirm fit and compatibility before proposing an assessment." primaryHref={contact} primaryLabel="Discuss Managed Follow-Up" secondaryHref="/private-client-os" secondaryLabel="Owned Demand & Governed AI" />
  </>;
}
