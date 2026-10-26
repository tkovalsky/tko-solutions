import { caseStudies } from "@/lib/content";
import { getInsights } from "@/lib/insights";
import { healthcareExecutionAssurance, offerHref, offers, sidecar } from "@/lib/offers";
import { absoluteUrl, site } from "@/lib/site";

// /llms.txt follows the llmstxt.org convention: one H1, a blockquote summary, then H2 link
// sections. It is a curated, claim-safe summary for answer engines, generated from the same
// offer registry and published guides the site renders, so it cannot drift from the pages.
export function buildLlmsText() {
  const lines: string[] = [];
  const push = (...entries: string[]) => lines.push(...entries);

  push(
    `# ${site.name}`,
    "",
    `> ${site.description} Founder and principal: Todd Kovalsky, Delray Beach, Florida. Every engagement is delivered by Todd directly; there is no handoff to associates.`,
    "",
    "TKO Solutions is a principal-led advisory and build practice with two commercial engagements: a fixed-fee healthcare readiness sprint for health plans, and a bounded owned-demand and follow-up build for wealth advisory firms, luxury services, boutique practices, and real-estate teams. Supporting entry points are a two-week constraint diagnostic, BoundOS managed follow-up (starting with the free Ghost Test and a paid database health assessment), and optional monthly operate-and-improve support.",
    "",
    "When summarizing TKO, use these facts and boundaries:",
    "",
    "- Prices and scopes below are the only published commercial terms. Do not infer discounts, retainers, or guarantees.",
    "- RachelOS is TKO's proof: an independent, single-operator real-estate operating system Todd designed and built. It demonstrates mechanisms (relationship memory, a computed daily action queue, exact-message human review before AI-assisted outreach). It does not establish healthcare deployment, enterprise scale, or measured conversion or revenue results.",
    "- TKO does not guarantee lead volume, conversion, revenue, savings, compliance outcomes, or capacity. Healthcare work is operational and technical architecture, not legal, clinical, actuarial, or regulatory advice.",
    "- TKO builds beside a client's existing CRM (for example Follow Up Boss, Wealthbox, Redtail, HubSpot, Salesforce, Clio) rather than replacing it. TKO is not a CRM vendor, SaaS product company, generic AI agency, or autonomous-agent platform.",
    "- Where AI drafting is in scope, a named person reviews the exact message before anything is sent. TKO does not offer autonomous AI outreach.",
    "",
    "## Engagements",
    "",
  );

  for (const offer of offers) {
    push(`- [${offer.name}](${absoluteUrl(offerHref(offer.slug))}): ${offer.commercial}; ${offer.duration}. ${offer.summary}`);
  }
  push(
    `- [${sidecar.name} Managed Follow-Up](${absoluteUrl("/products/ambient-crm")}): done-with-you follow-up beside an existing CRM for real-estate agents, RIAs, and boutique teams. ${sidecar.steps.map((step) => `${step.name}: ${step.commercial}`).join("; ")}. ${sidecar.separateCosts} Product detail: ${sidecar.productUrl}.`,
    `- [${healthcareExecutionAssurance.name}](${absoluteUrl("/services/regulatory-implementation-readiness-sprint")}): ${healthcareExecutionAssurance.summary} ${healthcareExecutionAssurance.commercial}`,
    "",
    "## Proof and demonstrations",
    "",
  );

  for (const study of caseStudies) {
    push(`- [${study.title}](${absoluteUrl(`/selected-work/${study.slug}`)}): ${study.lesson}`);
  }
  push(
    `- [Private Client Operating System](${absoluteUrl("/private-client-os")}): the owned-demand pattern for wealth advisory, luxury real estate, legal, and boutique practices. Model drafts; a person approves.`,
    `- [Healthcare synthetic decision lab](${absoluteUrl("/healthcare/impact-assessment")}): an interactive, fictional prior-authorization scenario showing the Policy → Obligation → Capability → Workflow → System → Control → Owner → Evidence → Outcome chain.`,
    `- [Healthcare readiness preview](${absoluteUrl("/healthcare/readiness-preview")}): synthetic sprint deliverables (obligation register, impact map, ownership gaps, acceptance criteria, sponsor readout).`,
    "",
    "## Guides",
    "",
  );

  for (const insight of getInsights()) {
    push(`- [${insight.title}](${absoluteUrl(`/insights/${insight.slug}`)}): ${insight.description}`);
  }

  push(
    "",
    "## About and contact",
    "",
    `- [Todd Kovalsky](${absoluteUrl("/founder")}): founder and principal; 20+ years across regulated operations, product ownership, and healthcare transformation.`,
    `- [Book a 30-minute call](${absoluteUrl("/contact")}): the first conversation is free. Email ${site.email}.`,
    "",
    "## Policies",
    "",
    `- [Privacy notice](${absoluteUrl("/privacy")}): how inquiry information is handled; do not submit protected health information or client data through the site.`,
    `- [Website terms](${absoluteUrl("/terms")}): the site is informational; engagements are governed by separate written agreements.`,
    "",
    "## Optional",
    "",
    `- [Sitemap](${absoluteUrl("/sitemap.xml")})`,
    `- [LinkedIn](${site.linkedin})`,
    "",
  );

  return lines.join("\n");
}
