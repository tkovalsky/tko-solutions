import fs from "node:fs";
import path from "node:path";

export const PROOF_TYPES = [
  "Screenshot",
  "Workflow",
  "Architecture Diagram",
  "Sequence Diagram",
  "Feature Demonstration",
  "Decision Record",
  "Changelog Entry",
  "Case Study",
  "Assessment Sample",
  "Executive Brief",
  "Sales Asset",
] as const;

export type ProofType = (typeof PROOF_TYPES)[number];

export type SourceReference = {
  label: string;
  path: string;
};

export type ProofAsset = {
  id: string;
  type: ProofType;
  title: string;
  description: string;
  sourceType: string;
  sourceId: string;
  relatedFeatures: string[];
  relatedDecisions: string[];
  screenshotPaths?: string[];
  createdAt: string;
  sourceRefs: SourceReference[];
  frameworkStage?: string;
  claimGuard?: string;
  confidence?: string;
  maturity?: string;
};

export type FeatureIntelligence = {
  slug: string;
  title: string;
  status: "implemented" | "documented" | "partial";
  problem: string;
  solution: string;
  architecture: string;
  businessImpact: string;
  relatedFeatures: string[];
  relatedDecisions: string[];
  relatedProof: string[];
  sourceRefs: SourceReference[];
};

export type DecisionIntelligence = {
  id: string;
  title: string;
  status: string;
  problem: string;
  decision: string;
  implementation: string;
  impact: string;
  relatedFeatures: string[];
  relatedScreenshots: string[];
  relatedChangelogEntries: string[];
  sourceRefs: SourceReference[];
};

export type ChangelogEntry = {
  slug: string;
  release: string;
  date: string;
  changes: string[];
  relatedFeatures: string[];
  relatedDecisions: string[];
  relatedScreenshots: string[];
  sourceRefs: SourceReference[];
  milestone: boolean;
};

export type ArchitectureIntelligence = {
  slug: string;
  title: string;
  overview: string;
  diagram: string;
  dataFlow: string[];
  decisionFlow: string[];
  relatedFeatures: string[];
  relatedDecisions: string[];
  relatedProof: string[];
  sourceRefs: SourceReference[];
};

export type EvidenceCoverage = {
  decisions: number;
  audits: number;
  screenshots: number;
  architectureDocuments: number;
  proofAssets: number;
  sourceRelationships: number;
};

type EvidenceRecord = {
  id: string;
  observation: string;
  proof_ref: string;
  visual?: string;
  framework_stage?: string;
  claim_guard?: string;
  confidence?: string;
  maturity?: string;
};

const ROOT = process.cwd();
const RACHELOS_EVIDENCE_PATH = "content/proof/rachelos/evidence.yaml";
const DECISIONS_PATH = "DECISIONS.md";

const FEATURE_DEFINITIONS: FeatureIntelligence[] = [
  {
    slug: "lead-intelligence",
    title: "Lead Intelligence",
    status: "implemented",
    problem:
      "Lead information existed across notes, emails, texts, guide downloads, and CRM state, but did not reliably become governed facts or next actions.",
    solution:
      "RachelOS turns updates into structured facts, interpreted state, intelligence gaps, and queue recommendations.",
    architecture:
      "Signals feed memory and fact extraction; facts become state; state and gaps feed priority and recommendation layers.",
    businessImpact:
      "Makes relationship work visible enough to prioritize, ask the next missing question, and avoid reconstructing context manually.",
    relatedFeatures: ["relationship-intelligence", "queue-intelligence", "needs-first-contact"],
    relatedDecisions: [],
    relatedProof: ["lead-facts-rie", "journey-intelligence", "intelligence-gaps", "canonical-queue"],
    sourceRefs: [
      source("CURRENT_REALITY.md"),
      source("docs/capability-audit/RACHELOS_CAPABILITY_MATRIX.md"),
      source(RACHELOS_EVIDENCE_PATH),
    ],
  },
  {
    slug: "relationship-intelligence",
    title: "Relationship Intelligence",
    status: "implemented",
    problem:
      "Critical relationship context depended on one person knowing who mattered, what changed, and what question to ask next.",
    solution:
      "RachelOS keeps a persistent per-relationship memory layer with facts, open questions, situation, and timeline.",
    architecture:
      "Relationship updates and signal capture preserve memory before interpretation; the fact layer then creates reusable state.",
    businessImpact:
      "Reduces dependency on a human operating as institutional memory and makes continuity demonstrable.",
    relatedFeatures: ["lead-intelligence", "queue-intelligence"],
    relatedDecisions: [],
    relatedProof: ["relationship-memory", "lead-facts-rie"],
    sourceRefs: [
      source("CURRENT_REALITY.md"),
      source("content/architecture-overview.md"),
      source(RACHELOS_EVIDENCE_PATH),
    ],
  },
  {
    slug: "queue-intelligence",
    title: "Queue Intelligence",
    status: "implemented",
    problem:
      "Operators needed to rebuild priority from scattered signals instead of seeing one trusted list of who needs attention now.",
    solution:
      "The canonical queue ranks relationships with freshness classes and recomputes on every signal.",
    architecture:
      "Facts, state, gaps, freshness, and governance feed a deterministic priority layer that surfaces one next action.",
    businessImpact:
      "Turns the book of relationships into an executable operating list rather than a reporting artifact.",
    relatedFeatures: ["lead-intelligence", "executive-visibility", "outcome-framework"],
    relatedDecisions: [],
    relatedProof: ["canonical-queue", "daily-action-engine", "intelligence-gaps"],
    sourceRefs: [
      source("content/architecture-overview.md"),
      source("docs/capability-audit/RACHELOS_CAPABILITY_MATRIX.md"),
      source(RACHELOS_EVIDENCE_PATH),
    ],
  },
  {
    slug: "needs-first-contact",
    title: "Needs First Contact",
    status: "implemented",
    problem:
      "AI-assisted outreach and first-contact decisions require a human approval point before anything is sent.",
    solution:
      "The operator queue surfaces pending recommendations and drafts for human review, send, skip, or update.",
    architecture:
      "Recommendations and drafts enter an approval gate; only approved actions move into outbound workflow state.",
    businessImpact:
      "Makes human-controlled AI visible and auditable instead of relying on a promise that automation will be supervised.",
    relatedFeatures: ["communications", "lead-intelligence", "reality-editor"],
    relatedDecisions: [],
    relatedProof: ["human-approved-ai", "outreach-intelligence"],
    sourceRefs: [
      source("docs/reality-audit-2026-06-15.md"),
      source("docs/capability-audit/RACHELOS_CAPABILITY_MATRIX.md"),
      source(RACHELOS_EVIDENCE_PATH),
    ],
  },
  {
    slug: "outcome-framework",
    title: "Outcome Framework",
    status: "partial",
    problem:
      "The system can show operational work and health, while conversion and outcome measurement remain incomplete in the current documentation.",
    solution:
      "Use operational visibility, outcome/recovery status, and score snapshots as the current evidence base without claiming revenue metrics.",
    architecture:
      "Operational health and outcome records sit at the end of the framework spine: Action -> Outcome -> loop.",
    businessImpact:
      "Supports credibility by showing what is measured today and where measurement is still a documented gap.",
    relatedFeatures: ["executive-visibility", "queue-intelligence"],
    relatedDecisions: [],
    relatedProof: ["operational-visibility"],
    sourceRefs: [
      source("CURRENT_REALITY.md"),
      source("docs/capability-audit/RACHELOS_CAPABILITY_MATRIX.md"),
      source(RACHELOS_EVIDENCE_PATH),
    ],
  },
  {
    slug: "reality-editor",
    title: "Reality Editor",
    status: "documented",
    problem:
      "Operational truth changes through human updates; those updates need to override AI interpretation instead of being treated as comments.",
    solution:
      "The documented authority model preserves raw updates and lets human-entered facts supersede AI-derived facts.",
    architecture:
      "Raw updates are preserved, facts are source-aware, and journey state remains interpretation rather than final truth.",
    businessImpact:
      "Creates a governance story for AI-assisted operations: humans own truth, AI assists interpretation and drafting.",
    relatedFeatures: ["relationship-intelligence", "communications", "needs-first-contact"],
    relatedDecisions: [],
    relatedProof: ["lead-facts-rie", "relationship-memory", "human-approved-ai"],
    sourceRefs: [
      source("content/architecture-overview.md"),
      source("docs/reality-audit-2026-06-15.md"),
      source(RACHELOS_EVIDENCE_PATH),
    ],
  },
  {
    slug: "communications",
    title: "Communications",
    status: "implemented",
    problem:
      "Email, SMS, drip, and AI-drafted outreach create risk when they are disconnected from relationship state and approval.",
    solution:
      "RachelOS connects communication workflows to intake, facts, draft lifecycle, and human approval.",
    architecture:
      "Inbound signals enter the lead model; outbound drafts and drips remain governed by workflow state and approval gates.",
    businessImpact:
      "Shows communication as controlled operational execution, not autonomous outreach.",
    relatedFeatures: ["needs-first-contact", "lead-intelligence", "content-intelligence"],
    relatedDecisions: [],
    relatedProof: ["outreach-intelligence", "human-approved-ai", "daily-action-engine"],
    sourceRefs: [
      source("docs/capability-audit/RACHELOS_CAPABILITY_MATRIX.md"),
      source("docs/reality-audit-2026-06-15.md"),
      source(RACHELOS_EVIDENCE_PATH),
    ],
  },
  {
    slug: "sales-enablement",
    title: "Sales Enablement",
    status: "documented",
    problem:
      "Proof assets, one-pagers, executive briefings, and sales collateral were specified but not easy to discover from the source library.",
    solution:
      "Use the proof library, content strategy, and deliverable taxonomy to expose sales assets as proof-oriented deliverables.",
    architecture:
      "Knowledge and evidence become deliverables, then channel packages such as PDFs, sales one-pagers, decks, and executive briefs.",
    businessImpact:
      "Moves proof out of raw audits and into buyer-facing sales material without inventing new claims.",
    relatedFeatures: ["executive-visibility", "content-intelligence"],
    relatedDecisions: ["DEC-2026-07-01-TIF-Content-Operating-Model", "DEC-2026-07-01-TIF-Deliverable-Centric-View"],
    relatedProof: ["rachelos-proof-package-plan", "proof-and-revenue-foundation-report"],
    sourceRefs: [
      source("docs/CONTENT_STRATEGY.md"),
      source("PROOF_AND_REVENUE_FOUNDATION_REPORT.md"),
      source("DECISIONS.md"),
    ],
  },
  {
    slug: "executive-visibility",
    title: "Executive Visibility",
    status: "implemented",
    problem:
      "Leaders need to know what needs attention, why, and whether the operating system itself is running.",
    solution:
      "RachelOS uses daily action output, system health, and queue visibility as executive-readable operational proof.",
    architecture:
      "Priority and action outputs are paired with reliability signals: cron runs, smoke tests, ops alerts, and failure logging.",
    businessImpact:
      "Reframes visibility from dashboard reporting into demonstrable operational control.",
    relatedFeatures: ["queue-intelligence", "outcome-framework", "sales-enablement"],
    relatedDecisions: [],
    relatedProof: ["daily-action-engine", "operational-visibility", "canonical-queue"],
    sourceRefs: [
      source("CURRENT_REALITY.md"),
      source("content/architecture-overview.md"),
      source(RACHELOS_EVIDENCE_PATH),
    ],
  },
  {
    slug: "content-intelligence",
    title: "Content Intelligence",
    status: "partial",
    problem:
      "Content exists, but its relationship to buyer state, lead context, and proof coverage is not always visible.",
    solution:
      "Use content recommendation, TIF inventory, deliverable readiness, and proof coverage to show where content can support action.",
    architecture:
      "Content is treated as an operational recommendation and as a TIF deliverable/channel package, not only a publication.",
    businessImpact:
      "Makes content reusable across relationship work, sales enablement, and proof publication while keeping automation explicitly limited.",
    relatedFeatures: ["communications", "sales-enablement", "lead-intelligence"],
    relatedDecisions: [
      "DEC-2026-07-01-TIF-Content-Operating-Model",
      "DEC-2026-07-01-TIF-Channel-Package-Readiness",
    ],
    relatedProof: ["content-recommendation"],
    sourceRefs: [
      source("CURRENT_REALITY.md"),
      source("docs/reality-audit-2026-06-15.md"),
      source("DECISIONS.md"),
      source(RACHELOS_EVIDENCE_PATH),
    ],
  },
];

const ARCHITECTURE_DEFINITIONS: ArchitectureIntelligence[] = [
  {
    slug: "lead-lifecycle",
    title: "Lead Lifecycle",
    overview:
      "The lead lifecycle follows the proven RachelOS pattern from input signals through relationship updates, structured facts, state, queue, approval, action, and outcome log.",
    diagram:
      "Input signals -> Relationship updates -> Structured facts -> Journey and relationship state -> Canonical action queue -> Human operator workflow -> Approved action or draft -> Activity/outcome log",
    dataFlow: [
      "Forms, notes, replies, texts, events, and manual updates enter signal capture.",
      "Relationship updates preserve raw context before interpretation.",
      "Facts and state feed gap acquisition and queue priority.",
    ],
    decisionFlow: [
      "Human and lead facts outrank AI facts.",
      "Journey state is interpretation, not truth.",
      "Canonical queue rows are the operator next-action truth.",
    ],
    relatedFeatures: ["lead-intelligence", "queue-intelligence", "needs-first-contact"],
    relatedDecisions: [],
    relatedProof: ["lead-facts-rie", "journey-intelligence", "canonical-queue", "human-approved-ai"],
    sourceRefs: [source("content/architecture-overview.md"), source(RACHELOS_EVIDENCE_PATH)],
  },
  {
    slug: "relationship-lifecycle",
    title: "Relationship Lifecycle",
    overview:
      "Relationship lifecycle documentation centers on memory: updates become durable context, facts, open questions, and timeline instead of staying inside one person's head.",
    diagram:
      "Multi-source updates -> Relationship memory -> Source-aware facts -> Open questions -> Current situation -> Next action",
    dataFlow: [
      "Updates from people and systems are preserved as memory.",
      "Resolved facts and open questions form the relationship snapshot.",
      "High-value timeline events make relationship state inspectable.",
    ],
    decisionFlow: [
      "Human updates supersede AI-derived facts.",
      "Open questions feed intelligence-gap selection.",
      "The queue uses persisted or derived relationship state.",
    ],
    relatedFeatures: ["relationship-intelligence", "reality-editor", "lead-intelligence"],
    relatedDecisions: [],
    relatedProof: ["relationship-memory", "lead-facts-rie", "intelligence-gaps"],
    sourceRefs: [
      source("content/architecture-overview.md"),
      source("content/proof/healthcare/diagrams/operational-memory-pattern.mmd"),
      source(RACHELOS_EVIDENCE_PATH),
    ],
  },
  {
    slug: "outreach-lifecycle",
    title: "Outreach Lifecycle",
    overview:
      "Outreach is governed by recommendation, draft lifecycle, human approval, send/skip state, and queue recalculation.",
    diagram:
      "Facts + state -> Recommendation -> AI draft or suggested action -> Human approval -> Send/skip/update -> Queue recalculation",
    dataFlow: [
      "Facts and journey state select recommended content or outreach.",
      "Drafts carry explicit lifecycle states.",
      "Approved sends become governed action transitions.",
    ],
    decisionFlow: [
      "AI drafts do not send themselves.",
      "Human approval is a mandatory gate.",
      "Queue priority recalculates after send or state change.",
    ],
    relatedFeatures: ["communications", "needs-first-contact", "content-intelligence"],
    relatedDecisions: [],
    relatedProof: ["outreach-intelligence", "human-approved-ai", "content-recommendation"],
    sourceRefs: [
      source("docs/capability-audit/RACHELOS_CAPABILITY_MATRIX.md"),
      source("docs/reality-audit-2026-06-15.md"),
      source(RACHELOS_EVIDENCE_PATH),
    ],
  },
  {
    slug: "content-lifecycle",
    title: "Content Lifecycle",
    overview:
      "TIF content moves from Knowledge through Insight, Deliverable, Channel Package, Publication, and Measurement, with Evidence as proof-grade admitted knowledge.",
    diagram:
      "Knowledge -> Insight -> Deliverable -> Channel Package -> Publication -> Measurement",
    dataFlow: [
      "Evidence records and source material become insights.",
      "Insights become deliverables and channel packages.",
      "Publication and measurement remain visible as the next operating stages.",
    ],
    decisionFlow: [
      "Deliverable readiness is computed from existing records.",
      "Channel readiness is computed metadata, not a stored entity.",
      "No auto-publishing or autonomous generation is introduced.",
    ],
    relatedFeatures: ["content-intelligence", "sales-enablement", "executive-visibility"],
    relatedDecisions: [
      "DEC-2026-07-01-TIF-Content-Operating-Model",
      "DEC-2026-07-01-TIF-Deliverable-Centric-View",
      "DEC-2026-07-01-TIF-Channel-Package-Readiness",
    ],
    relatedProof: ["content-recommendation", "rachelos-proof-package-plan"],
    sourceRefs: [
      source("CURRENT_REALITY.md"),
      source("DECISIONS.md"),
      source("docs/TIF_CONTENT_OPERATING_MODEL.md"),
    ],
  },
];

const CHANGELOG_DEFINITIONS: ChangelogEntry[] = [
  {
    slug: "proof-and-revenue-foundation",
    release: "Proof & Revenue Foundation",
    date: "2026-06-24",
    changes: [
      "Created the RachelOS evidence library.",
      "Created healthcare and transformation proof libraries.",
      "Documented the visual asset plan, assessment playbook, conversion system, and proof gaps.",
    ],
    relatedFeatures: ["sales-enablement", "executive-visibility", "content-intelligence"],
    relatedDecisions: [],
    relatedScreenshots: [],
    sourceRefs: [source("PROOF_AND_REVENUE_FOUNDATION_REPORT.md")],
    milestone: true,
  },
  {
    slug: "wave-1-alignment",
    release: "Wave 1 Alignment",
    date: "2026-06-24",
    changes: [
      "Aligned homepage, navigation, offers, selected work, and proof ladder to CURRENT_REALITY.",
      "Kept RachelOS as primary build proof and added explicit proof-library coverage.",
      "Documented remaining screenshot and production-asset gaps.",
    ],
    relatedFeatures: ["sales-enablement", "executive-visibility"],
    relatedDecisions: [],
    relatedScreenshots: [],
    sourceRefs: [source("docs/implementation/WAVE1_COMPLETION_REPORT.md")],
    milestone: true,
  },
  {
    slug: "tif-asset-production-spine",
    release: "TIF Asset Production Spine",
    date: "2026-06-28",
    changes: [
      "TIF v0.1 went live with Evidence, Opportunity, Asset registries, and Asset Composer.",
      "TIF v0.2 added read-only operator console, Capture Inbox, and Content Inventory.",
      "Manual edit protection was added to prevent accidental asset overwrite.",
    ],
    relatedFeatures: ["content-intelligence", "sales-enablement"],
    relatedDecisions: ["DEC-2026-07-01-TIF-Content-Operating-Model"],
    relatedScreenshots: [],
    sourceRefs: [source("CURRENT_REALITY.md"), source("ENGINEERING_BACKLOG.md")],
    milestone: true,
  },
  {
    slug: "tif-deliverable-centric-view",
    release: "TIF Deliverable-Centric View",
    date: "2026-07-01",
    changes: [
      "Added /tif/deliverables as a deterministic read model over existing records.",
      "Added production queue visibility and deliverable taxonomy expansion.",
      "Added channel package readiness without creating a channel package table or workflow.",
    ],
    relatedFeatures: ["content-intelligence", "sales-enablement"],
    relatedDecisions: [
      "DEC-2026-07-01-TIF-Deliverable-Centric-View",
      "DEC-2026-07-01-TIF-Production-Queue",
      "DEC-2026-07-01-TIF-Deliverable-Taxonomy-Expansion",
      "DEC-2026-07-01-TIF-Channel-Package-Readiness",
    ],
    relatedScreenshots: [],
    sourceRefs: [source("DECISIONS.md"), source("CURRENT_REALITY.md")],
    milestone: true,
  },
  {
    slug: "tif-proof-intelligence-layer",
    release: "TIF Proof Intelligence Layer",
    date: "2026-07-03",
    changes: [
      "Added a computed proof registry over evidence YAML, screenshots, decisions, architecture docs, and implementation history.",
      "Added proof hub, feature intelligence, decision intelligence, architecture intelligence, and changelog intelligence pages.",
      "Added coverage metadata from actual source relationships only.",
    ],
    relatedFeatures: ["content-intelligence", "sales-enablement", "executive-visibility"],
    relatedDecisions: [
      "DEC-2026-07-01-TIF-Content-Operating-Model",
      "DEC-2026-07-01-TIF-Deliverable-Centric-View",
    ],
    relatedScreenshots: [],
    sourceRefs: [source("docs/implementation/TIF_PROOF_INTELLIGENCE_LAYER_REPORT.md")],
    milestone: true,
  },
];

export function buildProofRegistry(): ProofAsset[] {
  const evidenceRecords = parseRachelOSEvidence();
  const evidenceProof = evidenceRecords.map(evidenceRecordToProofAsset);
  const screenshotProof = buildScreenshotProofAssets(evidenceRecords, evidenceProof);
  const decisionProof = buildDecisionIntelligence().map((decision) => ({
    id: decision.id,
    type: "Decision Record" as const,
    title: decision.title,
    description: decision.decision,
    sourceType: "decision_log",
    sourceId: decision.id,
    relatedFeatures: decision.relatedFeatures,
    relatedDecisions: [],
    screenshotPaths: decision.relatedScreenshots,
    createdAt: decisionDate(decision.id),
    sourceRefs: decision.sourceRefs,
  }));
  const changelogProof = buildChangelogIntelligence().map((entry) => ({
    id: entry.slug,
    type: "Changelog Entry" as const,
    title: entry.release,
    description: entry.changes.join(" "),
    sourceType: "implementation_history",
    sourceId: entry.slug,
    relatedFeatures: entry.relatedFeatures,
    relatedDecisions: entry.relatedDecisions,
    screenshotPaths: entry.relatedScreenshots,
    createdAt: entry.date,
    sourceRefs: entry.sourceRefs,
  }));
  const architectureProof = buildArchitectureIntelligence().map((entry) => ({
    id: entry.slug,
    type: "Architecture Diagram" as const,
    title: entry.title,
    description: entry.overview,
    sourceType: "architecture_doc",
    sourceId: entry.slug,
    relatedFeatures: entry.relatedFeatures,
    relatedDecisions: entry.relatedDecisions,
    screenshotPaths: [],
    createdAt: sourceModifiedAt(entry.sourceRefs[0]?.path ?? "content/architecture-overview.md"),
    sourceRefs: entry.sourceRefs,
  }));

  return [
    ...evidenceProof,
    ...screenshotProof,
    ...decisionProof,
    ...changelogProof,
    ...architectureProof,
    ...staticProofAssets(),
  ].sort((a, b) => a.title.localeCompare(b.title));
}

export function buildFeatureIntelligence() {
  const proofs = buildProofRegistry();
  return FEATURE_DEFINITIONS.map((feature) => ({
    ...feature,
    relatedProof: feature.relatedProof.filter((id) => proofs.some((proof) => proof.id === id)),
  }));
}

export function buildDecisionIntelligence(): DecisionIntelligence[] {
  const sections = parseDecisionSections(readSource(DECISIONS_PATH));
  return sections.map((section) => {
    const relatedFeatures = decisionFeatureMap(section.id);
    const relatedProof = proofIdsForFeatures(relatedFeatures);
    const relatedScreenshots = screenshotPathsForProofIds(relatedProof);
    return {
      id: section.id,
      title: section.id.replace(/^DEC-\d{4}-\d{2}-\d{2}-/, "").replaceAll("-", " "),
      status: section.fields.Status || "Documented",
      problem: section.fields.Context || section.body,
      decision: section.fields.Decision || "",
      implementation: section.fields.Implementation || "Implementation detail is not separated in the decision record.",
      impact: section.fields.Rationale || section.fields["Current reality after implementation"] || "",
      relatedFeatures,
      relatedScreenshots,
      relatedChangelogEntries: changelogIdsForDecision(section.id),
      sourceRefs: [source(DECISIONS_PATH)],
    };
  });
}

export function buildChangelogIntelligence() {
  return CHANGELOG_DEFINITIONS;
}

export function buildArchitectureIntelligence() {
  return ARCHITECTURE_DEFINITIONS;
}

export function computeEvidenceCoverage(): EvidenceCoverage {
  const proofAssets = buildProofRegistry();
  const sourceRelationships = new Set<string>();
  for (const proof of proofAssets) {
    for (const feature of proof.relatedFeatures) sourceRelationships.add(`feature:${proof.id}:${feature}`);
    for (const decision of proof.relatedDecisions) sourceRelationships.add(`decision:${proof.id}:${decision}`);
    for (const ref of proof.sourceRefs) sourceRelationships.add(`source:${proof.id}:${ref.path}`);
  }

  return {
    decisions: buildDecisionIntelligence().length,
    audits: countExistingSources([
      "docs/reality-audit-2026-06-15.md",
      "docs/implementation/WAVE1_ALIGNMENT_AUDIT.md",
      "docs/capability-audit/RACHELOS_CAPABILITY_MATRIX.md",
      "docs/capability-audit/SERVICE_ALIGNMENT_AUDIT.md",
      "docs/BUYER_CREDIBILITY_AUDIT_2026_07_02_ROUND1.md",
      "docs/BUYER_CREDIBILITY_AUDIT_2026_07_02_ROUND2.md",
      "docs/TKO_ANTISLOP_AUDIT.md",
    ]),
    screenshots: screenshotPaths().length,
    architectureDocuments: countExistingSources([
      "content/architecture-overview.md",
      "docs/KNOWLEDGE_ARCHITECTURE_REVIEW.md",
      "docs/TKO_ARCHITECTURE_DECISIONS.md",
      "docs/WEBSITE_ARCHITECTURE.md",
      "content/proof/healthcare/diagrams/operational-memory-pattern.mmd",
      "content/proof/healthcare/diagrams/decision-latency-pattern.mmd",
      "content/proof/healthcare/diagrams/prior-auth-current-state.mmd",
      "content/proof/healthcare/diagrams/prior-auth-waiver-state.mmd",
      "content/proof/healthcare/diagrams/knowledge-concentration-risk.mmd",
    ]),
    proofAssets: proofAssets.length,
    sourceRelationships: sourceRelationships.size,
  };
}

export function proofTypeLabel(type: ProofType) {
  return type;
}

export function webPath(sourcePath: string) {
  return sourcePath.startsWith("public/") ? `/${sourcePath.slice("public/".length)}` : sourcePath;
}

function evidenceRecordToProofAsset(record: EvidenceRecord): ProofAsset {
  const relatedFeatures = featureSlugsForProof(record.id);
  return {
    id: record.id,
    type: record.visual ? "Feature Demonstration" : "Workflow",
    title: titleFromId(record.id),
    description: record.observation,
    sourceType: "evidence_yaml",
    sourceId: `rachelos:${record.id}`,
    relatedFeatures,
    relatedDecisions: decisionsForFeatures(relatedFeatures),
    screenshotPaths: record.visual ? [record.visual] : [],
    createdAt: sourceModifiedAt(RACHELOS_EVIDENCE_PATH),
    sourceRefs: [source(RACHELOS_EVIDENCE_PATH)],
    frameworkStage: record.framework_stage,
    claimGuard: record.claim_guard,
    confidence: record.confidence,
    maturity: record.maturity,
  };
}

function buildScreenshotProofAssets(records: EvidenceRecord[], existing: ProofAsset[]) {
  const claimed = new Set(existing.flatMap((proof) => proof.screenshotPaths ?? []));
  const recordByVisual = new Map(records.filter((record) => record.visual).map((record) => [record.visual, record]));
  return screenshotPaths()
    .filter((screenshotPath) => !claimed.has(screenshotPath))
    .map((screenshotPath) => {
      const relatedRecord = recordByVisual.get(screenshotPath);
      const id = `screenshot-${path.basename(screenshotPath, path.extname(screenshotPath))}`;
      const relatedFeatures = relatedRecord ? featureSlugsForProof(relatedRecord.id) : [];
      return {
        id,
        type: "Screenshot" as const,
        title: titleFromId(id),
        description: relatedRecord?.observation ?? `Screenshot captured at ${screenshotPath}.`,
        sourceType: "screenshot_directory",
        sourceId: screenshotPath,
        relatedFeatures,
        relatedDecisions: decisionsForFeatures(relatedFeatures),
        screenshotPaths: [screenshotPath],
        createdAt: sourceModifiedAt(screenshotPath),
        sourceRefs: [source(screenshotPath)],
      };
    });
}

function staticProofAssets(): ProofAsset[] {
  return [
    {
      id: "rachelos-proof-package-plan",
      type: "Sales Asset",
      title: "RachelOS Proof Package Plan",
      description: "A source plan for which RachelOS proof assets should be used and in what order.",
      sourceType: "proof_plan",
      sourceId: "content/proof/rachelos/RACHELOS_PROOF_PACKAGE_PLAN.md",
      relatedFeatures: ["sales-enablement", "executive-visibility"],
      relatedDecisions: [],
      screenshotPaths: [],
      createdAt: sourceModifiedAt("content/proof/rachelos/RACHELOS_PROOF_PACKAGE_PLAN.md"),
      sourceRefs: [source("content/proof/rachelos/RACHELOS_PROOF_PACKAGE_PLAN.md")],
    },
    {
      id: "proof-and-revenue-foundation-report",
      type: "Executive Brief",
      title: "Proof & Revenue Foundation Report",
      description: "Implementation report summarizing proof libraries, remaining gaps, and Wave 2 production needs.",
      sourceType: "implementation_report",
      sourceId: "PROOF_AND_REVENUE_FOUNDATION_REPORT.md",
      relatedFeatures: ["sales-enablement", "content-intelligence"],
      relatedDecisions: [],
      screenshotPaths: [],
      createdAt: "2026-06-24",
      sourceRefs: [source("PROOF_AND_REVENUE_FOUNDATION_REPORT.md")],
    },
  ];
}

function parseRachelOSEvidence(): EvidenceRecord[] {
  const text = readSource(RACHELOS_EVIDENCE_PATH);
  const chunks = text.split(/\n  - id: /).slice(1);
  return chunks.map((chunk) => {
    const block = `id: ${chunk}`;
    return {
      id: readYamlScalar(block, "id"),
      observation: readYamlScalar(block, "observation"),
      proof_ref: readYamlScalar(block, "proof_ref"),
      visual: readYamlScalar(block, "visual") || undefined,
      framework_stage: readYamlScalar(block, "framework_stage") || undefined,
      claim_guard: readYamlScalar(block, "claim_guard") || undefined,
      confidence: readYamlScalar(block, "confidence") || undefined,
      maturity: readYamlScalar(block, "maturity") || undefined,
    };
  });
}

function readYamlScalar(block: string, key: string) {
  const lines = block.split("\n");
  const index = lines.findIndex((line) => line.trimStart().startsWith(`${key}:`));
  if (index === -1) return "";
  const first = lines[index].slice(lines[index].indexOf(":") + 1).trim();
  if (first === ">-" || first === "|-") {
    const values: string[] = [];
    for (let i = index + 1; i < lines.length; i += 1) {
      const line = lines[i];
      if (/^\s{4}[a-zA-Z0-9_]+:/.test(line) || /^\s{2}- id:/.test(line)) break;
      values.push(line.trim());
    }
    return values.join(" ").replace(/\s+/g, " ").trim();
  }
  return first.replace(/^"|"$/g, "").trim();
}

function parseDecisionSections(markdown: string) {
  return markdown
    .split(/\n## /)
    .slice(1)
    .map((section) => {
      const [heading = "", ...bodyLines] = section.split("\n");
      const body = bodyLines.join("\n").trim();
      return {
        id: heading.trim(),
        body,
        fields: parseDecisionFields(body),
      };
    });
}

function parseDecisionFields(body: string) {
  const matches = [...body.matchAll(/\*\*([^*]+):\*\*\s*([\s\S]*?)(?=\n\*\*[^*]+:\*\*|\n## |\s*$)/g)];
  return Object.fromEntries(
    matches.map((match) => [
      match[1].trim(),
      match[2].trim().replace(/\n{3,}/g, "\n\n"),
    ]),
  ) as Record<string, string>;
}

function source(pathname: string): SourceReference {
  return { label: path.basename(pathname), path: pathname };
}

function readSource(pathname: string) {
  try {
    return fs.readFileSync(path.join(ROOT, pathname), "utf8");
  } catch {
    return "";
  }
}

function sourceModifiedAt(pathname: string) {
  try {
    return fs.statSync(path.join(ROOT, pathname)).mtime.toISOString();
  } catch {
    return "";
  }
}

function screenshotPaths() {
  const roots = ["public/proof/rachelos", "public/proof/screenshots/rachelos"];
  return roots.flatMap((root) => {
    try {
      return fs
        .readdirSync(path.join(ROOT, root))
        .filter((name) => /\.(png|jpe?g|webp)$/i.test(name))
        .map((name) => `${root}/${name}`);
    } catch {
      return [];
    }
  });
}

function countExistingSources(paths: string[]) {
  return paths.filter((pathname) => fs.existsSync(path.join(ROOT, pathname))).length;
}

function titleFromId(id: string) {
  return id
    .replace(/^ev-/, "")
    .replaceAll("-", " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function featureSlugsForProof(proofId: string) {
  return FEATURE_DEFINITIONS
    .filter((feature) => feature.relatedProof.includes(proofId))
    .map((feature) => feature.slug);
}

function proofIdsForFeatures(featureSlugs: string[]) {
  const ids = new Set<string>();
  for (const feature of FEATURE_DEFINITIONS) {
    if (featureSlugs.includes(feature.slug)) {
      for (const proofId of feature.relatedProof) ids.add(proofId);
    }
  }
  return [...ids];
}

function decisionsForFeatures(featureSlugs: string[]) {
  return [...new Set(featureSlugs.flatMap((slug) => FEATURE_DEFINITIONS.find((feature) => feature.slug === slug)?.relatedDecisions ?? []))];
}

function decisionFeatureMap(decisionId: string) {
  return FEATURE_DEFINITIONS
    .filter((feature) => feature.relatedDecisions.includes(decisionId))
    .map((feature) => feature.slug);
}

function changelogIdsForDecision(decisionId: string) {
  return CHANGELOG_DEFINITIONS
    .filter((entry) => entry.relatedDecisions.includes(decisionId))
    .map((entry) => entry.slug);
}

function decisionDate(decisionId: string) {
  const match = decisionId.match(/^DEC-(\d{4}-\d{2}-\d{2})-/);
  return match?.[1] ?? sourceModifiedAt(DECISIONS_PATH);
}

function screenshotPathsForProofIds(proofIds: string[]) {
  const records = parseRachelOSEvidence();
  return records
    .filter((record) => proofIds.includes(record.id) && record.visual)
    .map((record) => record.visual as string);
}

function changelogIdsForFeature(featureSlug: string) {
  return CHANGELOG_DEFINITIONS
    .filter((entry) => entry.relatedFeatures.includes(featureSlug))
    .map((entry) => entry.slug);
}

export function changelogForFeature(featureSlug: string) {
  return changelogIdsForFeature(featureSlug);
}
