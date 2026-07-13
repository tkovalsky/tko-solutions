# TIF Implementation Backlog

**Status:** Remaining executable work only. The [TIF Runtime Model](TIF_RUNTIME_MODEL.md) is the canonical architecture reference; this file does not redefine the model.

## Workstream disposition

| Workstream | Status | Evidence / next disposition |
|---|---|---|
| Evidence → Opportunity → Asset → Version → DerivativeAsset spine | Completed | Persisted schema, composer, versions, revision requests, and derivative flow exist. Preserve; do not replace. |
| Capture inbox and Content Inventory | Completed | Persisted read/entry surfaces exist. Capture promotion and inventory lineage remain separate remaining work. |
| Knowledge Diagram subsystem (P0A) | Completed | Schema, migration, Asset extension, registry routes, and tests exist; the configured database reported all committed migrations applied on 2026-07-13. |
| Knowledge Asset Compiler (P0B) | Completed | Pure validated package contract and tests exist. It is not persistence. |
| Authority Production Orchestrator (P0C) | Completed | Pure deterministic read model and tests exist. |
| Runtime consolidation, Opportunity Adapter, and Authority Work Queue (P0D) | Completed | Canonical model, review-only adapter, deterministic queue, dashboard report, and focused tests exist. |
| Structured Evidence maturity | Not started | Required before trustworthy evidence-strength, claim-quality, freshness, or unsupported-claim reporting. |
| Normalized Experience promotion | Not started | Required before compiler sources can be queryable runtime records. |
| Problem/Pattern/Framework registries | Not started | Required after Experience/Evidence maturity; current compiler references and strategy libraries are not registries. |
| Asset eligibility / claim-boundary review | Not started | Required before runtime approval can consistently enforce compiler/Evidence constraints. |
| Publication record | Not started | Required to distinguish lifecycle status from a traceable release. |
| Measurement record / feedback capture | Not started | Required for a persisted authority growth loop. |

## P0 — prerequisites for trustworthy authority runtime

1. **Add structured Evidence maturity additively.** Add nullable `knowledgeId`, `claimStatus`, `claimBoundary`, authority basis/confidentiality, observed/effective/review dates; backfill from reviewed sources; retain `claimGuard`; only then make required fields strict. Add eligibility tests that block Unsupported Evidence from public-ready flows.
2. **Add reviewed `ExperienceRecord` and Capture promotion.** One normalized model for experience/decision/incident, optional Capture link, confidentiality and claim boundary required, explicit Evidence join, human-only promotion. Preserve `CaptureItem` source semantics.
3. **Add relational Problem/Pattern/Framework registries and joins.** Add reviewed records with stable IDs and typed joins to Experience, Evidence, diagrams, and existing Assets. Seed only reviewed records; do not migrate strategy lists or page arrays as if they were proof.
4. **Implement Asset eligibility read model and review gate.** Resolve strictest Evidence status/boundary, missing lineage, and required review for the existing Asset lifecycle. Do not change the composer’s draft-only behavior.

## P1 — close downstream traceability and reuse gaps

1. **Add `PublicationRecord`.** Link an approved Asset/Version/Derivative to destination, channel, release time, reviewer, and note. Keep publication manual; no credentials or auto-publishing.
2. **Add reviewed inventory traceability.** Optional human-approved links from `ContentInventoryItem` to existing Evidence/Assets only after classification; inventory remains non-proof by default.
3. **Add controlled relational discovery.** Filters/search over canonical fields and explicit joins after the registries are populated; no semantic retrieval infrastructure.
4. **Calibrate the Authority Work Queue against populated runtime records.** Keep the queue a report/candidate generator. Adopt persisted business priorities only if a reviewed field and owner are introduced deliberately.

## P2 — learning and future score inputs

1. **Add `MeasurementRecord` and a manual observation-to-Capture action.** Store source, period, unit, observation, reviewer, and boundary. Never infer causal outcome.
2. **Add freshness/review cadence reporting.** Use effective/review timestamps from structured Evidence, diagrams, Assets, Publications, and Measurements.
3. **Implement Authority Score v2 only after its documented inputs exist and calibration is approved.** See [Authority Score v2](TIF_AUTHORITY_SCORE_V2.md).

## Deferred — not executable under the current architecture

- Graph database
- Vectors/embeddings/semantic retrieval
- Autonomous agents or pattern extraction
- Autonomous Opportunity creation
- Autonomous publishing
- Duplicate Evidence, Asset, Experience, or knowledge registries
- Replacement Asset or Evidence lifecycle

These items remain out of scope until an evidence-backed architecture decision explicitly changes the Runtime Model.
