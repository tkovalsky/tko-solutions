# TIF V2 — Architecture Review

**Date:** 2026-07-13  
**Disposition:** Evolve the current TIF. Do not replace it.

## Executive conclusion

TIF already has the right production spine for governed asset creation:

```text
Capture → Evidence → Opportunity → Asset → Version → Derivative package → Human review
```

It also has a read-only proof intelligence layer and a deliverable-centric operator view. Those are meaningful implementation assets, not planning concepts. TIF can evolve into the canonical **Operating Knowledge Graph** without a rewrite if it adds a small relational knowledge layer between raw capture/evidence and opportunities/assets.

The target is not a generic graph platform, agent framework, or vector database. The target is a traceable operating knowledge system where an experience, decision, incident, pattern, problem, framework, asset, and publication can be connected with explicit relations and stable identifiers.

## Implementation evidence reviewed

| Surface | What is implemented | Architectural value |
|---|---|---|
| `CaptureItem` | Lightweight source intake with source, tags, time, location, rights, transcript, and promotion pointer. | Correct raw-experience entry point. |
| `Evidence` | Governed proof records with domain, business unit, observation, proof reference, and claim guard. | Correct proof-grade source layer. |
| `AssetOpportunity` | Audience, angle, type, tenant, context, and many-to-many evidence linkage. | Correct bridge from evidence to production intent. |
| `Asset` / `AssetVersion` | Draft/review/approved/published state, output path, versions, hash support, and manual-edit protection. | Correct human-review and versioning backbone. |
| `DerivativeAsset` | Channel packages tied to an Asset and source version with context and strategy. | Correct “one source, many packages” implementation. |
| Proof intelligence | `/tif/proof` feature, decision, changelog, and architecture read models derived from real source material. | Correct discoverability layer without duplicate storage. |
| Deliverable view | Deterministic readiness and channel-package readiness based on opportunities/assets/evidence. | Correct operator prioritization layer. |
| Content inventory | Cross-repo inventory from a deterministic scan. | Useful discovery layer, but currently not traceable to evidence or assets. |
| Compose runtime | Validated deterministic draft composition with draft status only. | A narrow, safe execution boundary. |

## Existing architecture mapped to the desired lifecycle

| Desired lifecycle stage | Existing TIF capability | Status | Required evolution |
|---|---|---|---|
| Experience | `CaptureItem`, source files, decision/changelog read models. | Partial | Normalize important experiences, decisions, and incidents into durable linked records. |
| Evidence | `Evidence`, `proofRef`, `claimGuard`, evidence YAML libraries. | Implemented, partial metadata | Add structured claim status, authority/confidentiality, dates, and stable human-readable IDs. |
| Patterns | Narrative/derived concepts exist in docs, proof read models, and content strategy. | Partial / not canonical | Add a reusable Operating Pattern library linked to evidence and assets. |
| Problems | Problems exist as website/content arrays and diagnostics language. | Partial / not canonical | Add the Problem Library as a first-class relational model. |
| Frameworks | Frameworks exist in content and delivery documentation. | Partial / not canonical | Add a Framework registry rather than duplicating framework text in assets. |
| Assets | `Asset`, `AssetVersion`, `DerivativeAsset`. | Implemented | Preserve. Extend traceability to patterns/problems/frameworks. |
| Human review | Asset status, revision requests, manual-edit guard. | Implemented | Preserve; make claim-boundary review explicit before status changes. |
| Publication | `published` status exists; publication remains manual. | Partial | Persist publication destination, time, reviewer, and release notes. |
| Measurement | Context can store destination; no durable measurement model. | Missing | Add an optional, narrow publication measurement record. |
| Learning | Revision requests, new captures, readiness views. | Partial | Feed measurement and observed outcomes back to experience/evidence records. |

## Architectural validation

| Requirement | Finding | Decision |
|---|---|---|
| Evidence | Strong implemented Evidence registry plus proof YAML. | Preserve. |
| Facts | RachelOS proof layer has source-aware facts; TIF has text observations, not a fact model. | Do not copy RachelOS facts into TIF. Add only claim/evidence metadata needed for IP traceability. |
| Relationships | Explicit Evidence↔Opportunity↔Asset links; static proof relationships in code. | Extend with typed joins for experience, pattern, problem, and framework. |
| Source authority | `proofRef` and `claimGuard` exist; source authority is not structured in TIF. | Extend Evidence; do not create a parallel evidence system. |
| Context | Capture and channel context exist. | Extend normalized experience context where needed. |
| Timeline | Timestamps exist; proof changelog is read-model based. | Add event/effective dates to new normalized records. |
| Traceability | Asset evidence joins and source-version derivative links are strong. | Preserve and expand links. |
| Metadata | Tenant, business unit, asset type/status, audience/context exist. | Add taxonomy metadata to the new reusable knowledge records. |
| Search | Deterministic inventory and read views; no database full-text or semantic retrieval. | Add simple relational/metadata search first; defer vector search. |
| Semantic retrieval | Not implemented. | Not a V2 prerequisite. Do not introduce embeddings infrastructure yet. |
| Versioning | Asset versions and edit detection exist; evidence/source records do not have explicit revisions. | Version only records that become publishable/decision-critical. |
| Auditability | Asset revisions, status, manual-edit protection, and source refs exist. | Add actor/review rationale to promoted experience/evidence and publication events. |

## What already exists

- The canonical Evidence → Opportunity → Asset traceability model.
- A human-approved asset lifecycle and version record.
- Channel-package derivation from a specific source asset version.
- Source-aware proof intelligence for RachelOS architecture, features, decisions, and changelog.
- Cross-repo inventory, capture inbox, and deterministic readiness computation.
- Content tenant support for `tko`, `boundos`, `rachel_delray`, and `cre_advisory`.
- Claim-guard language and privacy context at different points in the system.

## What is partial

- Capture promotion is represented in schema but no implemented promotion/classification workflow exists.
- Claim guards are text, not structured evidence classification.
- Proof relationships are available through static/read-model definitions, not a canonical relational taxonomy.
- Asset approval status exists, but publication records and outcome measurement do not.
- Content inventory is discoverable but explicitly not linked to Evidence/Opportunity/Asset traceability.
- Compose contracts are intentionally narrow and do not support TKO/BoundOS authority assets.

## Duplicates to avoid

| Proposed idea | Existing concept to reuse | Direction |
|---|---|---|
| Knowledge source | `CaptureItem` and `Evidence` | Use Capture for raw intake and Evidence for admitted proof. Do not create a second knowledge inbox. |
| Content item | `Asset`, `AssetVersion`, `DerivativeAsset` | Use Asset as the canonical deliverable record. Do not create a parallel content registry. |
| Human review | `AssetStatus`, `RevisionRequest`, manual-edit protection | Extend the existing workflow; do not create a second approval system. |
| Channel package | `DerivativeAsset` | Preserve it as the channel-specific child of Asset. |
| Claim guard | `Evidence.claimGuard` | Convert/extend it to structured fields; do not add an unrelated “trust score” table. |
| Proof library | Evidence YAML and proof intelligence layer | Import or link it; do not duplicate YAML content into a separate document database. |
| Decision records | `DECISIONS.md` plus proof decision read model | Promote only reusable/publicly relevant decisions into normalized records; preserve the existing decision log as source. |

## Preserve, consolidate, extend, remove

### Preserve

- All current Prisma models and their IDs.
- Evidence-to-asset joins, asset versioning, derivative source-version linkage, and manual-edit guard.
- TIF proof intelligence as additive read model.
- Deterministic, human-reviewed composition. No autonomous publishing.

### Consolidate

- Use **Deliverable** as planning language and `Asset` as persisted implementation language, exactly as `TIF_CONTENT_OPERATING_MODEL.md` prescribes.
- Consolidate evidence status and claim-boundary language into Evidence rather than copying it into every opportunity or asset.
- Consolidate reusable named problems/patterns/frameworks into registries rather than arrays in page files, markdown notes, and strategy documents.
- Link ContentInventoryItem to the canonical records after a human classification step; do not treat inventory as proof.

### Extend

- Permanent Knowledge Asset IDs for material experiences, decisions, incidents, evidence, patterns, problems, and frameworks.
- A minimal normalized Experience Record and typed Pattern, Problem, and Framework registries.
- Explicit joins from those records to existing Evidence and Asset.
- Structured claim classification and boundary fields on Evidence.
- Publication and measurement records downstream of existing Asset approval.

### Remove or stop creating

- New unlinked lists of “problems,” “patterns,” or “frameworks” in page components as canonical sources.
- Strategy-only claims that cannot trace to Capture, Evidence, or an approved Experience Record.
- Proposals for a vector store, generic graph engine, agent framework, or autonomous publishing layer before the relational source model is populated.

## Can TIF become the canonical Operating Knowledge Graph?

**Yes, conditionally.** It already owns the downstream half of the graph: proof, opportunities, assets, versions, channel packages, and review. It needs the smallest possible upstream normalization and relationship layer to represent experience and reusable operating knowledge. The graph should be implemented as explicit relational records and joins—not as a replacement platform.

## Recommended architecture target

```text
CaptureItem (raw source)
  → ExperienceRecord (normalized event / decision / incident)
  → Evidence (admitted claim-grade proof)
  → OperatingPattern / OperatingProblem / OperatingFramework
  → AssetOpportunity
  → Asset → AssetVersion → DerivativeAsset
  → PublicationRecord → MeasurementRecord
  ↘ review finding / new CaptureItem
```

Every arrow must preserve source references, claim status, claim boundary, and a permanent Knowledge Asset ID. Assets consume the graph; they do not become the graph's only source of truth.

