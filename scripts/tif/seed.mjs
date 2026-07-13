// TIF v0.1 seed — Phase 3 (Capture Inbox examples), Phase 4 (Evidence), Phase 5 (Asset Opportunities).
// Real observations only. Items that already have a verifiable artifact cite the existing
// content/proof/*/evidence.yaml record instead of duplicating it (reuse-first per CLAUDE.md).
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";
import { FLAGSHIP_DIAGRAMS, flagshipDiagramBody } from "./flagship-diagrams.mjs";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

const captureItems = [
  {
    slug: "market-signal-001",
    title: "Represented seller called Rachel despite existing representation",
    observation: "Seller already had a listing agent and still called Rachel for a second opinion before acting.",
    source: "rachel",
    status: "promoted",
    businessUnit: "rachel",
  },
  {
    slug: "inbox-buyer-strategy-citation",
    title: "Lead cited buyer strategy over listings",
    observation: "A buyer lead referenced strategy/positioning content, not property listings, as the reason for engaging.",
    source: "rachel",
    status: "promoted",
    businessUnit: "rachel",
  },
  {
    slug: "inbox-lead-lost-job-to-ai",
    title: "Lead lost job twice to AI",
    observation: "Prospect conversation: lead described being displaced from a role twice by AI-driven changes.",
    source: "conversation",
    status: "inbox",
    businessUnit: null,
  },
  {
    slug: "inbox-ai-content-consumption",
    title: "Lead consumed AI-generated content Rachel did not author",
    observation: "A lead referenced content attributed to Rachel that Rachel had not personally written.",
    source: "rachel",
    status: "promoted",
    businessUnit: "rachel",
  },
  {
    slug: "inbox-healthcare-workflow-dependency",
    title: "Healthcare workflow dependency on a single specialist",
    observation: "PA exception routing observed to depend on one person knowing payer-specific rules.",
    source: "healthcare",
    status: "promoted",
    businessUnit: "tko",
  },
  {
    slug: "inbox-cre-market-observation",
    title: "CRE market observation: reporting fragmented across sources",
    observation: "Market intelligence exists across multiple CRE sources but is not consolidated into reusable findings.",
    source: "cre",
    status: "promoted",
    businessUnit: "cre",
  },
];

const evidence = [
  {
    slug: "market-signal-001",
    domain: "rachelos",
    businessUnit: "rachel",
    observation:
      "A seller who already had representation called Rachel anyway, for a second opinion, before acting on her existing agent's advice.",
    proofRef: "Capture Inbox: market-signal-001 (founder-observed market signal; no metric).",
    claimGuard:
      "Single observed signal, not a volume claim. No client named. Pattern, not measured outcome.",
  },
  {
    slug: "ev-buyer-strategy-citation",
    domain: "rachelos",
    businessUnit: "rachel",
    observation:
      "A buyer lead engaged because of strategy/positioning content, not because of property listings — buyers are evaluating judgment, not just inventory.",
    proofRef: "Capture Inbox: inbox-buyer-strategy-citation (founder-observed; no metric).",
    claimGuard: "Single observed signal. No client named. Pattern, not conversion data.",
  },
  {
    slug: "ev-ai-content-consumption",
    domain: "rachelos",
    businessUnit: "rachel",
    observation:
      "A lead referenced AI-generated content attributed to Rachel that Rachel had not personally authored, and still trusted it as her voice.",
    proofRef: "Capture Inbox: inbox-ai-content-consumption (founder-observed; no metric).",
    claimGuard:
      "Single observed signal. Raises authorship/trust question; not a claim about content performance.",
  },
  {
    slug: "ev-rachelos-relationship-memory",
    domain: "rachelos",
    businessUnit: "rachel",
    observation:
      "Knowledge that lived in one person's head became a persistent, timeline-based per-relationship snapshot that survives outside any individual.",
    proofRef: "content/proof/rachelos/evidence.yaml#relationship-memory",
    claimGuard: "Code-backed memory layer. No outcome metric implied.",
  },
  {
    slug: "ev-rachelos-canonical-queue",
    domain: "rachelos",
    businessUnit: "rachel",
    observation:
      "One ranked, freshness-classified list of who needs attention now and why, recomputed on every signal, replaces reconstruction across four tools.",
    proofRef: "content/proof/rachelos/evidence.yaml#canonical-queue",
    claimGuard: "Code-backed priority layer. No volume or conversion metric implied.",
  },
  {
    slug: "ev-rachelos-human-approved-ai",
    domain: "rachelos",
    businessUnit: "rachel",
    observation:
      "AI drafts and recommendations wait in a dedicated operator queue for human review before anything is sent.",
    proofRef: "content/proof/rachelos/evidence.yaml#human-approved-ai",
    claimGuard: "Enforced in code, not promised. No send-rate metric.",
  },
  {
    slug: "ev-healthcare-pa-operational-burden",
    domain: "healthcare",
    businessUnit: "tko",
    observation:
      "Authorization exceptions depend on specific individuals knowing where to route a case; when those individuals are unavailable, the case waits and administrative burden accumulates silently.",
    proofRef: "content/proof/healthcare/evidence.yaml#prior-auth-exception-routing",
    claimGuard: "Advisory experience; pattern not metric; no orgs named.",
  },
  {
    slug: "ev-healthcare-human-api-dependency",
    domain: "healthcare",
    businessUnit: "tko",
    observation:
      "Across prior auth, UM, care management, interoperability, regulatory, and transformation work, the same root cause recurs: critical operational knowledge lives inside individuals instead of governed systems.",
    proofRef: "content/proof/healthcare/evidence.yaml#human-api-root-pattern",
    claimGuard: "Advisory experience; the through-line for all healthcare proof. Pattern not metric.",
  },
  {
    slug: "ev-cre-intelligence-reporting",
    domain: "cre",
    businessUnit: "cre",
    observation:
      "CRE market knowledge and observations exist but remain fragmented across sources and non-reusable — intelligence is produced once and discarded rather than accumulated.",
    proofRef: "Capture Inbox: inbox-cre-market-observation (founder-observed; no metric).",
    claimGuard: "Pattern observation. No specific market/property/client named.",
  },
  {
    slug: "ev-operational-intelligence-vs-reporting",
    domain: "tko",
    businessUnit: "tko",
    observation:
      "Across healthcare, RachelOS, and CRE engagements, dashboards and reports describe what happened, but the decision about what to do next still depends on a person — reporting is not the same capability as operational intelligence.",
    proofRef:
      "Cross-domain generalization from content/proof/healthcare/evidence.yaml#transformation-dashboard-green and content/proof/rachelos/evidence.yaml#canonical-queue.",
    claimGuard: "Generalized finding from cited code- and pattern-backed records. No metric.",
  },
];

const opportunities = [
  {
    slug: "why-buyers-choose-rachel-delray",
    title: "Why Buyers Choose Rachel Delray",
    businessUnit: "rachel",
    assetType: "article",
    angle:
      "Buyers and sellers are not choosing Rachel for inventory access — they are choosing her judgment, even when they already have representation elsewhere.",
    audience: "Prospective buyers/sellers and referral partners evaluating Rachel Delray.",
    evidenceSlugs: [
      "market-signal-001",
      "ev-buyer-strategy-citation",
      "ev-ai-content-consumption",
      "ev-rachelos-human-approved-ai",
    ],
  },
  {
    slug: "operational-intelligence-vs-reporting",
    title: "Operational Intelligence vs Reporting",
    businessUnit: "tko",
    assetType: "article",
    angle:
      "Reporting tells you what happened; operational intelligence tells you what to do next. Most organizations have built the former and call it the latter.",
    audience: "Operations, transformation, and product leaders evaluating their own reporting stack.",
    evidenceSlugs: ["ev-cre-intelligence-reporting", "ev-operational-intelligence-vs-reporting"],
  },
  {
    slug: "human-apis-become-organizational-bottlenecks",
    title: "Human APIs Become Organizational Bottlenecks",
    businessUnit: "tko",
    assetType: "article",
    angle:
      "When operational knowledge lives in a person instead of a system, that person becomes a single point of failure for the organization — a Human API.",
    audience: "Directors+ in healthcare ops, transformation, and consulting.",
    evidenceSlugs: ["ev-healthcare-human-api-dependency", "ev-rachelos-relationship-memory"],
  },
  {
    slug: "why-most-crms-fail-real-estate-teams",
    title: "Why Most CRMs Fail Real Estate Teams",
    businessUnit: "rachel",
    assetType: "article",
    angle:
      "A CRM stores records; it does not decide who needs attention today and why. That gap is where most real estate teams lose the relationship.",
    audience: "Real estate agents/teams evaluating CRM and operating systems.",
    evidenceSlugs: ["ev-rachelos-canonical-queue", "ev-rachelos-relationship-memory"],
  },
  {
    slug: "buyer-strategy-vs-listing-strategy",
    title: "Buyer Strategy vs Listing Strategy",
    businessUnit: "rachel",
    assetType: "article",
    angle:
      "Buyers increasingly choose an agent for strategic judgment about the deal, not access to listings they can already see themselves.",
    audience: "Buyers and buyer-side referral partners.",
    evidenceSlugs: ["ev-buyer-strategy-citation", "market-signal-001"],
  },
  {
    slug: "prior-authorization-operational-quality-problem",
    title: "Prior Authorization Is An Operational Quality Problem",
    businessUnit: "tko",
    assetType: "assessment",
    angle:
      "Gold Card eligibility is not the problem. Operational quality — denial reduction, exception routing, dependency risk — is the problem Gold Card readiness is an output of.",
    audience: "Practice administrators and healthcare operations leaders.",
    evidenceSlugs: ["ev-healthcare-pa-operational-burden", "ev-healthcare-human-api-dependency"],
  },
];

async function main() {
  for (const item of captureItems) {
    await prisma.captureItem.upsert({
      where: { slug: item.slug },
      update: item,
      create: item,
    });
  }

  const evidenceBySlug = new Map();
  for (const ev of evidence) {
    const record = await prisma.evidence.upsert({
      where: { slug: ev.slug },
      update: ev,
      create: ev,
    });
    evidenceBySlug.set(ev.slug, record);
  }

  await prisma.captureItem.update({
    where: { slug: "market-signal-001" },
    data: { promotedToEvidenceId: evidenceBySlug.get("market-signal-001").id },
  });
  await prisma.captureItem.update({
    where: { slug: "inbox-buyer-strategy-citation" },
    data: { promotedToEvidenceId: evidenceBySlug.get("ev-buyer-strategy-citation").id },
  });
  await prisma.captureItem.update({
    where: { slug: "inbox-ai-content-consumption" },
    data: { promotedToEvidenceId: evidenceBySlug.get("ev-ai-content-consumption").id },
  });
  await prisma.captureItem.update({
    where: { slug: "inbox-healthcare-workflow-dependency" },
    data: { promotedToEvidenceId: evidenceBySlug.get("ev-healthcare-pa-operational-burden").id },
  });
  await prisma.captureItem.update({
    where: { slug: "inbox-cre-market-observation" },
    data: { promotedToEvidenceId: evidenceBySlug.get("ev-cre-intelligence-reporting").id },
  });

  for (const opp of opportunities) {
    const { evidenceSlugs, ...oppData } = opp;
    const record = await prisma.assetOpportunity.upsert({
      where: { slug: opp.slug },
      update: oppData,
      create: oppData,
    });

    for (const slug of evidenceSlugs) {
      const ev = evidenceBySlug.get(slug);
      await prisma.assetOpportunityEvidence.upsert({
        where: { opportunityId_evidenceId: { opportunityId: record.id, evidenceId: ev.id } },
        update: {},
        create: { opportunityId: record.id, evidenceId: ev.id },
      });
    }
  }

  for (const diagram of FLAGSHIP_DIAGRAMS) {
    const linkedEvidence = diagram.evidenceSlugs.map((slug) => {
      const evidenceRecord = evidenceBySlug.get(slug);
      if (!evidenceRecord) throw new Error(`Flagship diagram ${diagram.knowledgeId} references unknown evidence: ${slug}`);
      return evidenceRecord;
    });
    const opportunity = await prisma.assetOpportunity.upsert({
      where: { slug: diagram.slug },
      update: { title: diagram.title, tenant: "tko", businessUnit: "tko", assetType: "knowledge_diagram", angle: diagram.purpose, audience: diagram.audience.join(", "), sourceType: "existing_guide", contextNotes: `P0K ${diagram.knowledgeId} · ${diagram.family}\nClaim boundary: ${diagram.boundary}` },
      create: { slug: diagram.slug, title: diagram.title, tenant: "tko", businessUnit: "tko", assetType: "knowledge_diagram", angle: diagram.purpose, audience: diagram.audience.join(", "), sourceType: "existing_guide", contextNotes: `P0K ${diagram.knowledgeId} · ${diagram.family}\nClaim boundary: ${diagram.boundary}` },
    });
    const body = flagshipDiagramBody(diagram, linkedEvidence);
    const asset = await prisma.asset.upsert({
      where: { slug: diagram.slug },
      update: { title: diagram.title, tenant: "tko", businessUnit: "tko", assetType: "knowledge_diagram", status: "published", outputPath: `asset-production/generated/${diagram.slug}.md`, opportunityId: opportunity.id },
      create: { slug: diagram.slug, title: diagram.title, tenant: "tko", businessUnit: "tko", assetType: "knowledge_diagram", status: "published", outputPath: `asset-production/generated/${diagram.slug}.md`, opportunityId: opportunity.id },
    });
    await prisma.knowledgeDiagram.upsert({
      where: { assetId: asset.id },
      update: { knowledgeId: diagram.knowledgeId, diagramFormat: diagram.format, purpose: diagram.purpose, executiveAudience: diagram.audience, businessProblem: diagram.problem, inputs: diagram.sourceRefs, outputs: [diagram.decision], claimBoundary: diagram.boundary, evidenceStatus: diagram.evidenceStatus, createdBy: "p0k-executive-diagram-factory" },
      create: { knowledgeId: diagram.knowledgeId, assetId: asset.id, diagramFormat: diagram.format, purpose: diagram.purpose, executiveAudience: diagram.audience, businessProblem: diagram.problem, inputs: diagram.sourceRefs, outputs: [diagram.decision], claimBoundary: diagram.boundary, evidenceStatus: diagram.evidenceStatus, createdBy: "p0k-executive-diagram-factory" },
    });
    await prisma.assetEvidence.createMany({ data: linkedEvidence.map((item) => ({ assetId: asset.id, evidenceId: item.id })), skipDuplicates: true });
    const existingVersion = await prisma.assetVersion.findFirst({ where: { assetId: asset.id, body }, select: { id: true } });
    if (!existingVersion) {
      const aggregate = await prisma.assetVersion.aggregate({ where: { assetId: asset.id }, _max: { versionNumber: true } });
      const versionNumber = (aggregate._max.versionNumber ?? 0) + 1;
      await prisma.assetVersion.create({ data: { assetId: asset.id, versionNumber, title: diagram.title, body, revisionNotes: "P0K executive-diagram factory review draft.", createdBy: "p0k-executive-diagram-factory" } });
      await prisma.asset.update({ where: { id: asset.id }, data: { currentVersionNumber: versionNumber } });
    }
  }

  console.log(
    `Seeded ${captureItems.length} capture items, ${evidence.length} evidence records, ${opportunities.length} asset opportunities, and ${FLAGSHIP_DIAGRAMS.length} published flagship diagrams.`,
  );
}

main()
  .catch((err) => {
    console.error(err);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
