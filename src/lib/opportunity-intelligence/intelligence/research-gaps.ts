import type { ResearchGapCandidate } from "../contracts";

export type ExistingResearchGap = {
  id: string;
  gapKey: string;
  status: "open" | "resolved" | "dismissed";
};

export type ResearchGapReconciliation = {
  create: ResearchGapCandidate[];
  autoResolveIds: string[];
};

// Resolved and dismissed gaps are deliberately never reopened by a normal deterministic rerun.
// Contradictory-evidence handling is a later, explicit workflow.
export function planResearchGapReconciliation(
  existing: ExistingResearchGap[],
  candidates: ResearchGapCandidate[],
): ResearchGapReconciliation {
  const candidateKeys = new Set(candidates.map((candidate) => candidate.gapKey));
  const existingKeys = new Set(existing.map((gap) => gap.gapKey));

  return {
    create: candidates.filter((candidate) => !existingKeys.has(candidate.gapKey)),
    autoResolveIds: existing
      .filter((gap) => gap.status === "open" && !candidateKeys.has(gap.gapKey))
      .map((gap) => gap.id),
  };
}
