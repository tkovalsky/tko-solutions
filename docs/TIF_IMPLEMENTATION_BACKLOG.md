# TIF V2 — Implementation Backlog

## Governing decision

Evolve TIF in phases. Preserve the current Evidence → Opportunity → Asset → Version → DerivativeAsset spine, its proof read models, and human review workflow. No phase introduces vector search, a generic graph database, an agent framework, autonomous publishing, or a replacement content registry.

## Phase 0 — Canonical terminology and ID policy

**Outcome:** One stable language and citation convention before data model changes.

| Item | Scope | Acceptance criteria | Risk |
|---|---|---|---|
| TIF vocabulary decision | Ratify `Capture → Experience → Evidence → Pattern/Problem/Framework → Opportunity → Asset → Publication → Measurement`. Retain current persisted names. | Docs and implementation plans use the same terms without renaming existing tables. | Documentation drift only. |
| Knowledge Asset ID policy | Define prefixes, generation, immutability, and display rules. | `EXP`, `DEC`, `INC`, `EVD`, `PAT`, `PROB`, `FRM`, `AST`, `PUB` policy approved. | IDs could be created ad hoc if no central allocator is chosen. |
| Claim-status policy | Ratify Verified, Owner Confirmed, Experience Based, Unsupported. | Every new public claim has one status and a boundary. | None to current runtime. |

**No migration required.**

## Phase 1 — Evidence maturity and stable IDs

**Outcome:** Existing proof is classified and cited consistently.

### Objective

Extend existing `Evidence`; do not create a parallel claim store.

### Scope

- Add a ClaimStatus enum and structured evidence metadata.
- Add immutable human-readable `knowledgeId` to Evidence.
- Backfill current Evidence rows from existing proof YAML / source records through a reviewed script.
- Surface status and boundary in TIF proof and asset-review views.

### Files to modify

- `prisma/schema.prisma`
- New Prisma migration under `prisma/migrations/`
- `src/lib/tif/proof.ts`
- `src/app/tif/proof/page.tsx` and/or relevant proof detail views
- `scripts/tif/seed.mjs`
- New focused tests under `src/lib/tif/`

### Files to avoid

- `src/lib/tif/draft-composer.ts`
- `src/lib/tif/contract.ts`
- RachelOS queue, state, lifecycle, or scoring code

### Implementation steps

1. Add nullable metadata fields first: `knowledgeId`, `claimStatus`, `claimBoundary`, `authorityBasis`, `confidentiality`, `observedAt`, `effectiveUntil`.
2. Build a deterministic ID allocator or seed-time allocation that never reuses an ID.
3. Backfill all existing Evidence rows with reviewed status/boundary values; retain `claimGuard` unchanged.
4. Make structured fields required only after backfill validates.
5. Render the structured status/boundary as read-only proof metadata.

### Test plan

- Migration applies to an existing database.
- Existing compose, seed, proof, and deliverable tests pass.
- Unsupported evidence cannot be selected by future public-composition eligibility logic.
- IDs remain stable across seed reruns.

### Rollback

New fields are additive and nullable during rollout. Revert UI/read-model use without deleting fields; do not roll back data migration destructively.

### Acceptance criteria

- Every current Evidence row has a permanent `EVD-*` ID, claim status, and claim boundary.
- Existing Evidence→Opportunity→Asset links are unchanged.
- No public asset flow treats Unsupported evidence as eligible proof.

## Phase 2 — Experience normalization and reviewed promotion

**Outcome:** Meetings, incidents, decisions, product work, and healthcare experience can become reusable source material without bypassing CaptureItem.

### Objective

Add one normalized `ExperienceRecord` model. Use `recordType` to distinguish experience, decision, and incident; do not create three unrelated tables.

### Scope

- `ExperienceRecord` with `EXP-*`, `DEC-*`, or `INC-*` Knowledge Asset ID.
- Optional link back to `CaptureItem`.
- Typed fields for context, stakeholders, business/technical/organizational problem, options, tradeoffs, decision, result, boundary, confidentiality, and dates.
- Experience↔Evidence joins.
- Extend existing Capture Inbox with a human-only “promote to experience” review action.

### Files to modify

- `prisma/schema.prisma`
- New Prisma migration
- `src/app/tif/inbox/actions.ts`
- `src/app/tif/inbox/page.tsx`
- New `src/lib/tif/experience.ts`
- New experience review/detail route under `src/app/tif/`
- Tests for validation and capture promotion

### Files to avoid

- Existing `Asset`, `AssetVersion`, `DerivativeAsset` behavior
- API compose contract and deterministic draft composer
- Public website rendering routes

### Implementation steps

1. Create the additive model and joins.
2. Create a reviewer form prefilled from CaptureItem; never auto-promote.
3. Require a claim boundary and confidentiality selection before save.
4. Allow a reviewer to link existing Evidence or request evidence creation.
5. Keep CaptureItem status semantics intact: raw capture remains the original source even after promotion.

### Test plan

- Capture can produce an experience record only with required review fields.
- Experience cannot be public-ready without a boundary and confidentiality status.
- Linking/unlinking Evidence does not affect existing Assets.
- Auth-protected TIF routes remain protected.

### Rollback

Disable promotion UI; preserve raw capture and created experience records. New records are additive and do not alter current compose behavior.

### Acceptance criteria

- A reviewer can normalize a RachelOS incident, a founder decision, and an anonymized healthcare experience.
- Each normalized record can cite Evidence and be cited by a future Asset.

## Phase 3 — Reusable Problem, Pattern, and Framework registries

**Outcome:** One canonical library powers website problems, assessment content, founder authority, Operator Notes, and future BoundOS validation content.

### Objective

Introduce `OperatingProblem`, `OperatingPattern`, and `OperatingFramework` with explicit joins. Seed only the P0 library in `PROBLEM_LIBRARY.md`.

### Scope

- Add registries with stable `PROB-*`, `PAT-*`, and `FRM-*` IDs.
- Add typed joins to Evidence, ExperienceRecord, each other, and existing Asset.
- Create a read-only TIF library view with filters by business unit, industry, executive owner, claim status, and readiness.
- Seed the P0 problems/frameworks only after human review.

### Files to modify

- `prisma/schema.prisma`
- New Prisma migration
- `scripts/tif/seed.mjs` or a dedicated reviewed seed script
- New `src/lib/tif/knowledge-library.ts`
- New `/tif/library` route and protected navigation link
- Focused registry and relation tests

### Files to avoid

- Public page copy and `src/lib/content.ts` until the library has sufficient reviewed data.
- Any generic graph engine or vector-search package.

### Implementation steps

1. Implement models and join tables as optional/additive relations.
2. Seed P0 Problems/Frameworks and only reviewed Patterns.
3. Add evidence and asset linkage from the TIF library UI.
4. Add a deterministic “asset trace” read view: Asset → Evidence → Experience → Problem/Pattern/Framework.
5. Do not migrate public website arrays until parity and editorial ownership are proven.

### Test plan

- Every seeded P0 problem has a boundary and at least one evidence/experience link.
- Trace view resolves without orphaned joins.
- Asset trace does not alter Asset generation or derivatives.

### Rollback

Hide `/tif/library`; leave additive records intact. Do not rewrite public pages or existing content in this phase.

### Acceptance criteria

- RachelOS proof, Recovery Assessment sample, and three Operator Note outlines can each be traced to P0 problem/pattern/framework IDs and evidence IDs.

## Phase 4 — Asset eligibility and human review integration

**Outcome:** TIF will not produce a public asset that outruns its evidence.

### Objective

Extend existing Opportunity/Asset review rather than changing composition behavior.

### Scope

- Add optional Opportunity/Asset links to problems, patterns, frameworks, and experiences.
- Add a computed eligibility report: eligible evidence, strictest claim boundary, missing proof, required human review.
- Expose this report in `/tif/deliverables` and Asset detail.

### Files to modify

- `prisma/schema.prisma` only if Asset joins were not completed in Phase 3
- `src/lib/tif/deliverables.ts`
- `src/lib/tif/proof.ts`
- `src/app/tif/deliverables/page.tsx`
- `src/app/tif/assets/[slug]/page.tsx`
- Focused tests

### Files to avoid

- Compose API/publication behavior
- Existing manual-edit protection behavior

### Acceptance criteria

- A reviewer sees the strictest claim status/boundary before approving an Asset.
- A generated founder story, case study, or LinkedIn package retains source IDs and boundary text.
- Unsupported evidence is visibly blocked from public asset eligibility.

## Phase 5 — Publication and measurement feedback

**Outcome:** The lifecycle reaches publication and learning without overstating attribution.

### Objective

Add narrow downstream records; do not add marketing automation or analytics ingestion.

### Scope

- `PublicationRecord`: Asset/Version/Derivative reference, destination URL/channel, published time, reviewer, release note, status.
- `MeasurementRecord`: publication reference, metric name/value/unit, observation period, source, notes, claim boundary.
- A manual “record observation” action that can create a follow-up CaptureItem.

### Files to modify

- `prisma/schema.prisma`
- New Prisma migration
- New `src/lib/tif/publication.ts`
- Protected TIF publication/measurement UI
- Focused tests

### Files to avoid

- External platform credentials, automatic publication, CRM lead state, and RachelOS queue logic.

### Acceptance criteria

- A published LinkedIn derivative and website asset can be recorded with source version and destination.
- A metric is stored with source and period, not interpreted as causation automatically.
- A new observed lesson can return to CaptureItem with a source link.

## Deferred work

| Item | Why deferred | Revisit when |
|---|---|---|
| Vector search / embeddings | Taxonomy, evidence eligibility, and corpus size are not mature enough to justify opaque retrieval. | Canonical records are populated and operators cannot find records using metadata/full text. |
| Graph database | Explicit relational joins meet current query needs and preserve integrity. | Join/query complexity demonstrably exceeds PostgreSQL relational model. |
| Autonomous pattern extraction | Claim risk and confidentiality require human judgment. | There is a reviewed corpus and clear human-approval workflow for suggestions. |
| Autonomous publishing | Conflicts with current TIF human approval principles. | Never without an explicit new authorization. |

## Overall implementation estimate

This is not one implementation task. It exceeds the repository's scope-control threshold and must be delivered in phases.

| Phase | Modified files (estimate) | New directories/services | Migration | Operational risk |
|---|---:|---:|---:|---|
| 0 | 2–4 docs | 0 | 0 | Low |
| 1 | 6–9 | 0 | 1 | Low–medium |
| 2 | 7–10 | 0–1 | 1 | Medium |
| 3 | 8–12 | 1 | 1 | Medium |
| 4 | 5–8 | 0 | 0–1 | Low–medium |
| 5 | 7–10 | 0–1 | 1 | Medium |

**Recommended next implementation package:** Phase 1 only. It creates the claim and identifier foundation needed for every later extension while leaving current runtime behavior intact.

