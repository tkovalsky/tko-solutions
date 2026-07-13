import type { ClaimStatus, KnowledgeDiagramFormat } from "@prisma/client";

export const KNOWLEDGE_DIAGRAM_FORMAT_LABELS: Record<KnowledgeDiagramFormat, string> = {
  architecture: "Architecture",
  workflow: "Workflow",
  dependency_map: "Dependency map",
  decision_rights_matrix: "Decision-rights matrix",
  heat_map: "Heat map",
  timeline: "Timeline",
  governance_stack: "Governance stack",
  operating_loop: "Operating loop",
  framework: "Framework",
};

export const CLAIM_STATUS_LABELS: Record<ClaimStatus, string> = {
  verified: "Verified",
  owner_confirmed: "Owner confirmed",
  experience_based: "Experience based",
  unsupported: "Unsupported",
};

export function parseDiagramList(value: string) {
  return value
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean);
}
