// TIF Compose Contract — the stable integration boundary between publishers and TIF.
//
// This file is the single source of truth for the request/response shapes exchanged over
// POST /api/tif/compose. RachelOS mirrors the Rachel-compatible subset in its own contract.
// Commercial artifacts target the future standalone publisher and preserve pre-license gates.

export type FrameworkKey =
  | "rachel_community"
  | "rachel_relocation"
  | "cre_tenant_rep"
  | "business_exit";

export type ArtifactKey =
  | "community_page"
  | "comparison_page"
  | "comparison_guide"
  | "relocation_guide"
  | "cre_area_page"
  | "cre_neighborhood_page"
  | "cre_corridor_page"
  | "cre_medical_cluster_page"
  | "cre_site_report"
  | "cre_corridor_comparison"
  | "tenant_rep_guide"
  | "business_exit_guide"
  | "transferability_assessment_page";

export type VoiceKey = "rachel" | "consumer" | "todd" | "commercial_operator";

// Mirrors AssetStatus in prisma/schema.prisma. v0.1 only ever produces `draft`.
export type ComposeStatus = "draft" | "review" | "approved" | "published";

export interface ComposeRequest {
  framework: FrameworkKey;
  artifact: ArtifactKey;
  voice?: VoiceKey;
  inputs?: Record<string, unknown>;
}

export interface ComposeResponse {
  ok: true;
  // Execution-layer identifiers (v0.1: generated per request; durable Run/Draft
  // persistence is the documented next step — see execution.ts).
  runId: string;
  draftId: string;
  status: ComposeStatus;
  // Composition result (existing TIF_RACHEL_DRAFT_API.md contract — preserved).
  framework: FrameworkKey;
  artifact: ArtifactKey;
  voice: VoiceKey;
  slug: string;
  title: string;
  markdown: string;
  warnings: string[];
  suggestedPath: string;
}

export interface ComposeErrorResponse {
  ok: false;
  error: string;
  issues?: unknown;
}
