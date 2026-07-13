# TIF V2 — Gap Analysis

## Summary

TIF does not need a replacement. It needs five small, ordered extensions to become a canonical operating knowledge graph: stable IDs, experience normalization, reusable knowledge registries, structured evidence classification, and downstream publication/measurement feedback.

## Genuine gaps

| Gap | Current state | Why it matters | Smallest extension | Priority |
|---|---|---|---|---|
| Permanent Knowledge Asset IDs | Database IDs/slugs exist, but no cross-source human-readable ID convention. | Makes source citation, review, and reuse durable across docs, code, assets, and future engagements. | Add `knowledgeId` to material records; generate IDs by type. | P0 |
| Normalized experience record | Capture is raw; decisions/changelog are read from files; incidents have no canonical record. | A real engagement cannot become reusable IP without context, decision, tradeoff, result, and boundary. | Add `ExperienceRecord` with record type `experience`, `decision`, or `incident`; link to Capture and Evidence. | P0 |
| Claim classification | Evidence has free-text `claimGuard`; status is inferred. | Prevents a reliable Verified / Owner Confirmed / Experience Based / Unsupported gate. | Add a `ClaimStatus` enum and required structured boundary/rationale fields on Evidence. | P0 |
| Problem library | Website arrays and documents have problem concepts but no canonical relational registry. | Content, assessment, sales, and proof cannot share one source of truth. | Add `OperatingProblem` and joins to Evidence, Patterns, Frameworks, and Assets. | P0 |
| Pattern / framework registry | Concepts exist in docs/static read models. | Cannot detect reusable patterns or assemble evidence-backed assets consistently. | Add `OperatingPattern`, `OperatingFramework`, and joins. | P1 |
| Experience extraction workflow | Capture-only inbox has no classification/promotion UI. | Raw meetings, incidents, and delivery lessons remain stranded. | Extend existing inbox with review/promote actions; do not create a separate intake app. | P1 |
| Inventory traceability | Content inventory is intentionally unlinked. | Existing IP cannot be reused with claim discipline. | Add optional inventory-to-evidence/asset links after human classification. | P1 |
| Publication record | Asset can be marked published, but destination/reviewer/release metadata is absent. | The system cannot establish where an approved asset actually went. | Add `PublicationRecord` linked to AssetVersion/DerivativeAsset. | P1 |
| Measurement feedback | No durable measurement model. | The learning loop ends at publication. | Add narrow `MeasurementRecord`; attach source/period/metric/observation, never inferred attribution. | P2 |
| Search | No relational search surface beyond deterministic lists/read models. | Knowledge reuse becomes difficult as corpus grows. | Add tag/filter/full-text search across canonical fields. | P2 |
| Semantic retrieval | Explicitly deferred; no embeddings. | Not required until canonical records and relevance data exist. | Keep deferred. | Deferred |

## Evidence classification validation

The current system can express the four requested states only informally through `claimGuard` text. It should reuse Evidence rather than introduce a second claim model.

```text
Verified          → direct source, production record, approved artifact
Owner Confirmed   → named owner confirmation; supporting artifact pending
Experience Based  → accurate experience with restricted or unpublishable outcome detail
Unsupported       → retained as a blocked claim / not available to composition
```

### Minimum field changes

```text
Evidence.claimStatus       ClaimStatus (required)
Evidence.claimBoundary     String     (required; replace semantic use of claimGuard gradually)
Evidence.authorityBasis    String?    (human, system, approved document, etc.)
Evidence.confidentiality   String?    (public, anonymized, restricted, consent-backed)
Evidence.observedAt        DateTime?
Evidence.effectiveUntil    DateTime?
Evidence.knowledgeId       String     (unique, e.g. EVD-001)
```

Keep `claimGuard` during migration for backwards compatibility. Backfill it into `claimBoundary`; do not silently reinterpret it.

## Knowledge Asset ID system

### Rule

Every material source or reusable conclusion receives one permanent, human-readable identifier. IDs are stable even if titles, slugs, pages, or output paths change.

| Prefix | Record | Example | Source of truth |
|---|---|---|---|
| EXP | Experience record | `EXP-001` | `ExperienceRecord` |
| DEC | Decision record | `DEC-014` | `ExperienceRecord` with type `decision`, or promoted decision source |
| INC | Incident record | `INC-003` | `ExperienceRecord` with type `incident` |
| EVD | Evidence | `EVD-042` | Existing `Evidence` |
| PAT | Operating pattern | `PAT-021` | `OperatingPattern` |
| PROB | Operating problem | `PROB-009` | `OperatingProblem` |
| FRM | Operating framework | `FRM-004` | `OperatingFramework` |
| AST | Asset | `AST-118` | Existing `Asset` (optional public-facing ID) |
| PUB | Publication record | `PUB-026` | `PublicationRecord` |

### Constraints

- Do not replace current CUID primary keys or slugs.
- IDs must be generated centrally and never reused.
- IDs must be visible in TIF review views, source citations, asset metadata, and generated claim ledgers.
- A website page should cite underlying records, not only a prior case study URL.

## Proposed minimal relational additions

```text
ExperienceRecord
  id, knowledgeId, recordType, title, context, stakeholders, decisions,
  tradeoffs, constraints, failures, lessons, businessProblem, technicalProblem,
  organizationalProblem, observedResult, claimBoundary, sourceCaptureId,
  occurredAt, confidentiality, createdAt, updatedAt

OperatingPattern
  id, knowledgeId, name, executiveSummary, definition, scope, claimBoundary,
  industries, owners, status

OperatingProblem
  id, knowledgeId, name, executiveSummary, symptoms, rootCauses,
  industries, executiveOwners, claimBoundary, status

OperatingFramework
  id, knowledgeId, name, purpose, steps, useWhen, claimBoundary, status
```

Use explicit join tables rather than a generic polymorphic graph table:

```text
ExperienceEvidence      ExperienceRecord ↔ Evidence
ExperiencePattern       ExperienceRecord ↔ OperatingPattern
ExperienceProblem       ExperienceRecord ↔ OperatingProblem
PatternEvidence         OperatingPattern ↔ Evidence
PatternProblem          OperatingPattern ↔ OperatingProblem
ProblemFramework        OperatingProblem ↔ OperatingFramework
ProblemEvidence         OperatingProblem ↔ Evidence
ProblemAsset            OperatingProblem ↔ Asset
PatternAsset            OperatingPattern ↔ Asset
FrameworkAsset          OperatingFramework ↔ Asset
```

This is an Operating Knowledge Graph in the useful sense: named, queryable relationships with provenance. It is not graph-database infrastructure.

## Duplications and anti-patterns

| Do not add | Why | Reuse instead |
|---|---|---|
| A second “knowledge” table for raw notes | Duplicates CaptureItem and Evidence. | CaptureItem → ExperienceRecord → Evidence. |
| A separate claims database | Duplicates Evidence claim guard/boundary. | Extend Evidence. |
| A separate publishing engine | Duplicates Asset status and DerivativeAsset. | Add downstream publication records. |
| A vector store now | Produces opaque retrieval before source taxonomy and review gates are ready. | Metadata filters and source links. |
| An autonomous “pattern detection” agent | Risks manufacturing reusable knowledge from weak evidence. | Human review queue with suggested links/classification. |
| A generic graph table | Makes integrity and query intent opaque. | Explicit typed join tables. |

## Architecture risks and controls

| Risk | Control |
|---|---|
| Turning confidential experience into public claims | Required confidentiality and claim-boundary fields; publication blocks for restricted/unsupported evidence. |
| Over-normalization slows capture | Keep CaptureItem as the fast raw intake; promotion happens later. |
| Parallel truth sources | Existing Evidence/Asset IDs remain canonical; new models only add reusable knowledge links. |
| Taxonomy explosion | Seed a small controlled vocabulary; add patterns/problems through reviewed proposals only. |
| Measurement becomes false attribution | Store source, period, metric, and observation; do not infer causal impact. |
| Schema migration destabilizes current compose flow | Make new relations optional initially; preserve all existing contracts and tables. |

