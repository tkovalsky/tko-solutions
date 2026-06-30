// TIF Compose Contract (v0.1) — the stable integration boundary between RachelOS and TIF.
//
// This file is the single source of truth for the request/response shapes exchanged over
// POST /api/tif/compose. rachel-realestate mirrors these types in its own src/lib/tif/contract.ts.
// Keep the two in sync; the contract is what both sides depend on.

export type FrameworkKey = "rachel_community" | "rachel_relocation";

export type ArtifactKey =
  | "community_page"
  | "comparison_page"
  | "comparison_guide"
  | "relocation_guide";

export type VoiceKey = "rachel" | "consumer";

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
