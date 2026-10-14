import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/site/page-hero";
import { CtaBand } from "@/components/site/cta-band";
import { Section, SectionHeader } from "@/components/ui/section";
import { absoluteUrl, site } from "@/lib/site";

const path = "/healthcare/readiness-preview";
const sprint = "/services/regulatory-implementation-readiness-sprint";
const contact = "/contact?offer=regulatory-implementation-readiness-sprint";

export const metadata: Metadata = {
  title: "Readiness Sprint Deliverables Preview",
  description: "Inspect a synthetic obligation register, impact map, ownership gaps, acceptance criteria, and sponsor readout for TKO's $15,000 readiness sprint.",
  alternates: { canonical: path },
  openGraph: { title: "What the Readiness Sprint Produces | TKO Solutions", description: "Five connected sample deliverables. One synthetic healthcare change, traced from obligation to release evidence.", url: absoluteUrl(path), images: [{ url: site.socialImage, width: 1200, height: 630, alt: "TKO readiness sprint deliverables preview" }] },
};

const chain = [
  ["Policy", "P-01", "Fictional approved interpretation: a qualified provider bypasses clinical review for the defined service population."],
  ["Obligation", "O-01", "The bypass must leave a durable record for claims. An unresolved controlling fact must enter an exception route."],
  ["Capability", "CAP-01", "Resolve effective-dated facts, select the administrative route, and record the handoff."],
  ["Workflow", "WF-01", "Receive request → resolve authorities → select route → record control → acknowledge downstream receipt."],
  ["System", "SYS-01", "Intake, eligibility, benefit and provider authorities, UM orchestration, and claims adapter."],
  ["Control", "CTL-01", "No completed bypass until its downstream control record is acknowledged; missing authority holds the determination."],
  ["Owner", "OWN-01", "UM owns the route; claims owns receipt; the program sponsor owns release acceptance."],
  ["Evidence", "E-01", "Versioned input, route trace, control-record acknowledgment, and exception history share a correlation ID."],
  ["Outcome", "M-01", "Measure correct routing, missing records, manual touches, and rework against an agreed baseline."],
] as const;

const obligations = [
  ["O-01", "P-01: defined provider qualification removes clinical review, while the claims control remains required.", "Qualification, service, plan, and effective date resolved by their named authorities.", "WF-01 / CTL-01", "UM operations + claims integration", "E-01: route trace and matched downstream acknowledgment"],
  ["O-02", "P-01: an absent or conflicting controlling fact cannot silently authorize the bypass.", "Any unresolved eligibility, coverage, policy, or provider authority.", "WF-02 / CTL-02: hold determination and assign an exception owner", "UM exception lead", "E-02: withheld determination, reason, owner, and resolution history"],
] as const;

const gaps = [
  ["G-01", "Claims acknowledgment has no agreed contract.", "Claims integration lead", "UM adapter owner", "B-01: agree record fields, acknowledgment, and replay behavior.", "Blocks release"],
  ["G-02", "A missing effective date falls through to the normal route.", "UM application owner", "Policy authority owner", "B-02: hold the determination and route to an owned exception queue.", "Blocks release"],
  ["G-03", "Manual touches have no starting measure.", "Operations measurement lead", "Sponsor and reporting owner", "B-03: agree a sampling period, denominator, segments, and review cadence.", "Blocks an outcome claim"],
] as const;

const tests = [
  { id: "AT-01", refs: "O-01 → B-01 → CTL-01 → E-01", given: "All controlling authorities resolve and the synthetic provider qualification applies.", when: "The workflow selects the clinical-review bypass.", then: "The claims control carries the same correlation ID and approved rule version. Completion requires a downstream acknowledgment.", evidence: "Input fixture, route trace, control payload, acknowledgment, and matched identifiers.", owner: "Claims integration lead", status: "Open: interface contract and observed evidence required" },
  { id: "AT-02", refs: "O-02 → B-02 → CTL-02 → E-02", given: "The policy effective date is missing or conflicting.", when: "The request reaches route selection.", then: "The determination is withheld with a reason and named exception owner; no completed bypass or clinical outcome is asserted.", evidence: "Unresolved-input fixture, withheld route, exception assignment, and resolution history.", owner: "UM application owner", status: "Open: exception route must be demonstrated" },
  { id: "AT-03", refs: "O-01 → B-01 → CTL-01 → E-01", given: "The downstream adapter times out after receiving a control record.", when: "The workflow retries delivery with the original correlation ID.", then: "The same control is acknowledged without a duplicate. A failed retry remains visible with an accountable owner.", evidence: "Timeout and replay fixture, attempt history, deduplication result, and final acknowledgment.", owner: "Claims integration lead", status: "Open: failure and replay evidence required" },
];

function DataTable({ caption, headings, rows }: { caption: string; headings: string[]; rows: readonly (readonly string[])[] }) {
  return <div className="mt-8 overflow-x-auto rounded-lg border border-border"><table className="w-full min-w-[58rem] border-collapse text-left text-sm"><caption className="bg-white p-4 text-left font-semibold">{caption}</caption><thead className="border-y border-border bg-surface"><tr>{headings.map(heading => <th key={heading} scope="col" className="p-4 align-top font-semibold">{heading}</th>)}</tr></thead><tbody>{rows.map(row => <tr key={row[0]} className="border-b border-border last:border-0">{row.map((cell, index) => index === 0 ? <th key={index} scope="row" className="p-4 align-top font-mono text-primary">{cell}</th> : <td key={index} className="p-4 align-top leading-6 text-muted">{cell}</td>)}</tr>)}</tbody></table></div>;
}

export default function ReadinessPreviewPage() {
  return <>
    <PageHero eyebrow="Deliverables preview · synthetic" title="See what the $15,000 readiness sprint produces." description="One healthcare change, followed through five connected deliverables. Inspect the obligation, the affected handoffs, the missing owner or control, the acceptance evidence, and the decision the sponsor must make." primaryHref={contact} primaryLabel="Discuss Your Readiness Sprint" secondaryHref="#executive-readout" secondaryLabel="Start with the Sponsor Readout" />
    <Section className="bg-surface !py-10">
      <p className="max-w-[90ch] text-base leading-7"><strong>Illustrative package, not a client result.</strong> The policy, IDs, roles, gaps, and readiness findings on this page are invented. They show the shape and traceability of the work. They do not interpret a real mandate, establish payer compliance, or report completed implementation tests.</p>
      <nav aria-label="Sample deliverables" className="mt-6 flex flex-wrap gap-x-6 gap-y-3 text-sm font-semibold text-primary">{[["obligation-register", "1. Obligation register"], ["impact-map", "2. Impact map"], ["ownership-gaps", "3. Gaps and backlog"], ["acceptance-criteria", "4. Acceptance criteria"], ["executive-readout", "5. Sponsor readout"]].map(([id, label]) => <Link key={id} href={`#${id}`} className="underline underline-offset-4">{label}</Link>)}</nav>
    </Section>
    <Section id="obligation-register">
      <SectionHeader eyebrow="Sample 1" title="An obligation register that names the operational consequence." description="In this fictional change, removing clinical review does not remove the record claims needs. Each obligation has an affected population, workflow, owner, and evidence requirement." />
      <DataTable caption="Synthetic obligation register" headings={["ID", "Approved interpretation", "Applies when", "Workflow and control", "Accountable roles", "Required evidence"]} rows={obligations} />
      <p className="mt-5 max-w-[80ch] text-sm leading-6 text-muted">In an engagement, your legal and compliance owners supply approved interpretations and source references. I trace their operational consequences and record unresolved questions for the accountable owner.</p>
    </Section>
    <Section id="impact-map" className="bg-surface">
      <SectionHeader eyebrow="Sample 2" title="Follow the same change across nine links." description="The impact map connects the requirement to the behavior, the owner, and the evidence. It exposes a missing link before a green workstream report conceals it." />
      <ol className="mt-8 grid gap-4 md:grid-cols-3">{chain.map(([label, id, detail], index) => <li key={id} className="border border-border bg-white p-6"><p className="font-mono text-xs text-primary">{String(index + 1).padStart(2, "0")} · {id}</p><h3 className="mt-3 text-xl font-semibold">{label}</h3><p className="mt-3 text-sm leading-6 text-muted">{detail}</p></li>)}</ol>
    </Section>
    <Section id="ownership-gaps">
      <SectionHeader eyebrow="Sample 3" title="Turn gaps into work with an owner and a release consequence." description="A finding becomes useful when someone can act on it. The backlog names the dependency, the acceptance decision, and what remains blocked." />
      <DataTable caption="Synthetic ownership gaps and implementation backlog" headings={["Gap", "Finding", "Accountable role", "Dependency", "Backlog item", "Consequence"]} rows={gaps} />
    </Section>
    <Section id="acceptance-criteria" className="bg-surface">
      <SectionHeader eyebrow="Sample 4" title="Define what must be demonstrated." description="Happy paths, missing authority, and failed handoffs belong in the same readiness review. An acceptance statement names the evidence needed; it does not pretend the test has already passed." />
      <div className="mt-8 space-y-5">{tests.map(test => <article key={test.id} className="border border-border bg-white p-6 md:p-8"><p className="font-mono text-xs text-primary">{test.id} · {test.refs}</p><dl className="mt-5 grid gap-4 md:grid-cols-[7rem_1fr]">{[["Given", test.given], ["When", test.when], ["Then", test.then], ["Evidence", test.evidence], ["Owner", test.owner], ["Status", test.status]].map(([label, detail]) => <div key={label} className="contents"><dt className="font-semibold">{label}</dt><dd className="text-sm leading-7 text-muted">{detail}</dd></div>)}</dl></article>)}</div>
    </Section>
    <Section id="executive-readout">
      <SectionHeader eyebrow="Sample 5 · synthetic findings" title="The sponsor gets a decision, with the reasons attached." description="Illustrative recommendation: hold release of the bypass workflow until G-01 and G-02 are closed with observed evidence. Continue measurement preparation without claiming an outcome improvement." />
      <div className="mt-8 grid gap-4 md:grid-cols-2">{[
        ["Readiness decision", "Hold: the claims acknowledgment contract and unresolved-policy exception route remain open. This is a synthetic finding, not a compliance opinion."],
        ["Decisions required", "The sponsor assigns the claims integration and UM exception owners. Those owners agree the interface contract and demonstrate AT-01 through AT-03 before requesting acceptance."],
        ["Baseline before an outcome claim", "The measurement lead defines eligible-request counts, route accuracy, missing controls, manual touches, and rework. Record the sampling period and exclusions before comparing a later release."],
        ["Next review", "Owners present the agreed contract, versioned test traces, and unresolved exceptions. The sponsor accepts the evidence or leaves the release gate open; an activity update alone does not close it."],
      ].map(([title, body]) => <article key={title} className="border border-border bg-surface p-6"><h3 className="text-xl font-semibold">{title}</h3><p className="mt-4 text-sm leading-7 text-muted">{body}</p></article>)}</div>
    </Section>
    <Section className="bg-surface">
      <SectionHeader eyebrow="Your engagement" title="A bounded sprint, built around your approved change." description="The $15,000 fee covers 3–4 weeks on one defined mandate, program surface, or platform transition. The sprint starts when the approved interpretation, system walkthroughs, and accountable owners are available." />
      <p className="mt-6 max-w-[80ch] leading-7 text-muted">You receive the register, impact map, gap and ownership assessment, executable backlog, and sponsor readout. The actual depth and system boundaries are agreed before work starts. Your teams retain implementation and release authority. Optional execution assurance can follow under a separate scope.</p>
      <div className="mt-6 flex flex-wrap gap-6 font-semibold text-primary"><Link href={sprint} className="underline underline-offset-4">Review the sprint scope and continuation</Link><Link href="/healthcare/impact-assessment#authorization-decision-lab" className="underline underline-offset-4">Run the synthetic decision lab</Link></div>
    </Section>
    <CtaBand title="Bring one change whose readiness you need to establish." description="We will identify the sponsor decision, approved interpretation, affected systems, and evidence you need before agreeing the engagement." primaryHref={contact} primaryLabel="Discuss the Readiness Sprint" secondaryHref={sprint} secondaryLabel="Scope and Pricing" />
  </>;
}
