// TIF v0.3 Execution Layer — v0.1 scaffold entry point.
//
// Bridges the compose request to a reviewable draft and establishes the canonical execution path:
//
//   Payload → Validation → Run → Draft → Response
//
// `composeDraft` performs validation + deterministic composition (it throws on invalid
// payloads, satisfying the fail-fast requirement). This layer wraps it to create a Run and a Draft
// and return their identifiers, proving the integration boundary documented in
// docs/TIF_RACHEL_DRAFT_API.md and TKO_INTELLIGENCE_FACTORY_PRD.md.
//
// v0.1 scope: identifiers are generated per request and are NOT yet persisted. Durable Run/Draft
// persistence (the PRD runtime delivery spine — Run/Draft tables) is the documented next step and
// layers on top of this contract without changing it. No publishing, no external AI, no workflow.

import { randomUUID } from "node:crypto";
import { composeDraft, type ComposeDraftRequest } from "./draft-composer";
import type { ComposeResponse } from "./contract";

function generateId(prefix: string): string {
  return `${prefix}_${randomUUID().replace(/-/g, "").slice(0, 24)}`;
}

/**
 * Validate a compose payload, create a run + draft, and return the response contract.
 * Throws (ZodError or Error) on invalid payloads — callers translate to HTTP 400.
 */
export function runCompose(payload: ComposeDraftRequest): ComposeResponse {
  // Validation + composition (fail-fast: throws before any run/draft is created).
  const draft = composeDraft(payload);

  // Run creation → Draft creation.
  const runId = generateId("run");
  const draftId = generateId("draft");

  return {
    runId,
    draftId,
    status: "draft",
    ...draft,
  };
}
