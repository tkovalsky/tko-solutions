import type { OiInitiativeCategory, OiSignalTier } from "@prisma/client";

export type InitiativeInferenceSignal = {
  id: string;
  tier: OiSignalTier;
  signalType: string;
  summary: string;
  occurredAt: Date | null;
  createdAt?: Date | null;
  domainTags: string[];
  source?: {
    canonicalUrl?: string | null;
    retrievedAt?: Date | null;
  } | null;
};

export type ExistingInitiativeForInference = {
  id: string;
  name: string;
  domainTags: string[];
  lastEvidenceAt?: Date | null;
  confidence?: number | null;
};

export type ProposedInitiative = {
  name: string;
  category: OiInitiativeCategory;
  confidence: number;
  domainTags: string[];
  likelyOwnerRoles: string[];
  supportingSignals: InitiativeInferenceSignal[];
  attachToInitiativeId: string | null;
  hypothesis: string;
};

export type InferInitiativesInput = {
  accountName: string;
  signals: InitiativeInferenceSignal[];
  existingInitiatives?: ExistingInitiativeForInference[];
  asOf?: Date;
};

export function inferInitiatives(input: InferInitiativesInput): ProposedInitiative[] {
  const asOf = input.asOf ?? new Date();
  const eligible = input.signals.filter((signal) => signal.domainTags.length > 0);
  const clusters = buildClusters(eligible);

  return clusters
    .map((cluster) => toProposal(input.accountName, cluster, input.existingInitiatives ?? [], asOf))
    .filter(
      (proposal): proposal is ProposedInitiative =>
        proposal !== null && proposal.confidence >= 0.45,
    )
    .sort((a, b) => b.confidence - a.confidence || a.name.localeCompare(b.name));
}

function buildClusters(signals: InitiativeInferenceSignal[]) {
  const clusters: InitiativeInferenceSignal[][] = [];
  const sorted = [...signals].sort((a, b) => signalDate(a).getTime() - signalDate(b).getTime());
  for (const signal of sorted) {
    const matching = clusters.find((cluster) => canJoinCluster(signal, cluster));
    if (matching) {
      matching.push(signal);
    } else {
      clusters.push([signal]);
    }
  }
  return clusters;
}

function canJoinCluster(signal: InitiativeInferenceSignal, cluster: InitiativeInferenceSignal[]) {
  return cluster.some((other) => {
    const ageDays = Math.abs(signalDate(signal).getTime() - signalDate(other).getTime()) / 86_400_000;
    return ageDays <= 90 && signal.domainTags.some((tag) => other.domainTags.includes(tag));
  });
}

function toProposal(
  accountName: string,
  cluster: InitiativeInferenceSignal[],
  existingInitiatives: ExistingInitiativeForInference[],
  asOf: Date,
): ProposedInitiative | null {
  const confidenceBeforeDecay = confidenceFor(cluster);
  const lastEvidenceAt = latestDate(cluster.map(signalDate));
  const confidence = applyDecay(confidenceBeforeDecay, lastEvidenceAt, asOf);
  const domainTags = dominantTags(cluster);
  const dominantTag = domainTags[0] ?? "opportunity";
  const existing = existingInitiatives.find((initiative) =>
    initiative.domainTags.some((tag) => domainTags.includes(tag)),
  );

  return {
    name: existing?.name ?? `${accountName} — ${humanize(dominantTag)} initiative`,
    category: categoryFor(dominantTag),
    confidence,
    domainTags,
    likelyOwnerRoles: likelyOwnerRolesFor(domainTags, cluster),
    supportingSignals: [...cluster].sort((a, b) => signalDate(b).getTime() - signalDate(a).getTime()),
    attachToInitiativeId: existing?.id ?? null,
    hypothesis: `${accountName} has related ${humanize(dominantTag)} signals within a 90-day evidence window.`,
  };
}

export function confidenceFor(signals: Pick<InitiativeInferenceSignal, "tier">[]) {
  const tier1Count = signals.filter((signal) => signal.tier === "tier_1").length;
  const tier2Count = signals.filter((signal) => signal.tier === "tier_2").length;
  if (signals.length >= 3 && tier1Count >= 2) return 0.88;
  if (tier1Count >= 2) return 0.78;
  if (tier1Count === 1 && tier2Count >= 1) return 0.62;
  if (tier1Count === 1) return 0.45;
  if (tier2Count >= 2) return 0.40;
  if (tier2Count === 1) return 0.30;
  return 0.20;
}

export function applyDecay(confidence: number, lastEvidenceAt: Date, asOf: Date) {
  const elapsedDays = Math.max(0, Math.floor((asOf.getTime() - lastEvidenceAt.getTime()) / 86_400_000));
  const periods = Math.floor(elapsedDays / 90);
  return Math.max(0.2, Number((confidence - periods * 0.1).toFixed(2)));
}

function dominantTags(cluster: InitiativeInferenceSignal[]) {
  const counts = new Map<string, number>();
  for (const signal of cluster) {
    for (const tag of signal.domainTags) {
      counts.set(tag, (counts.get(tag) ?? 0) + 1);
    }
  }
  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .map(([tag]) => tag);
}

function signalDate(signal: InitiativeInferenceSignal) {
  return signal.occurredAt ?? signal.source?.retrievedAt ?? signal.createdAt ?? new Date(0);
}

function latestDate(dates: Date[]) {
  return new Date(Math.max(...dates.map((date) => date.getTime())));
}

function categoryFor(tag: string): OiInitiativeCategory {
  const allowed = new Set<OiInitiativeCategory>([
    "prior_authorization",
    "utilization_management",
    "interoperability",
    "workflow_modernization",
    "care_management",
    "claims_operations",
    "program_recovery",
    "ai_adoption",
    "operating_model",
    "regulatory_compliance",
    "post_merger_integration",
    "platform_implementation",
    "other",
  ]);
  return allowed.has(tag as OiInitiativeCategory) ? (tag as OiInitiativeCategory) : "other";
}

function likelyOwnerRolesFor(tags: string[], cluster: InitiativeInferenceSignal[]) {
  const roles = new Set<string>();
  if (cluster.some((signal) => signal.signalType.includes("role_posting"))) roles.add("Hiring manager");
  if (tags.some((tag) => ["prior_authorization", "utilization_management", "care_management", "claims_operations"].includes(tag))) {
    roles.add("Operational owner");
  }
  if (tags.some((tag) => ["interoperability", "platform_implementation", "ai_adoption"].includes(tag))) {
    roles.add("Technical owner");
  }
  if (tags.includes("regulatory_compliance")) roles.add("Compliance owner");
  if (roles.size === 0) roles.add("Executive sponsor");
  return [...roles];
}

function humanize(value: string) {
  return value.replaceAll("_", " ");
}
