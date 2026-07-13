# P0B — TIF Knowledge Asset Compiler

## Decision

TIF extends from evidence-to-content into a **Knowledge Asset Package compiler**. One reviewed Experience, Decision, or Incident can produce a complete, linked draft package without inventing proof, upgrading claims, or replacing the current compiler.

The package compiler is a pure planning and eligibility step. It creates no prose, does not persist an Asset, and cannot publish. Existing `AssetOpportunity → Asset → AssetVersion → DerivativeAsset` composition and human approval remain authoritative.

```text
Operating experience
  → CaptureItem (existing raw intake)
  → ExperienceRecord (planned reviewed normalization)
  → Evidence (existing registry; structured maturity planned)
  → Knowledge Diagram + Problem + Pattern + Framework
  → Knowledge Asset Package (P0B manifest and readiness report)
  → existing AssetOpportunity → Asset → AssetVersion → DerivativeAsset
  → existing human review / future PublicationRecord → MeasurementRecord
```

## Validation of the existing implementation

The extension is intentionally constrained by what is already present:

| Existing capability | Status | P0B decision |
|---|---|---|
| `Evidence → AssetOpportunity → Asset` joins | Implemented | Preserve as the sole proof-to-asset trace. |
| Asset versions, revisions, draft/review/approved/published statuses | Implemented | Keep the existing human gate; package output is always a draft brief. |
| `DerivativeAsset` channel packages | Implemented | Retain it for final channel derivatives; P0B's LinkedIn Package is a source brief, not a second derivative store. |
| Deterministic draft composer and `POST /api/tif/compose` contract | Implemented, narrow | Do not modify either contract. |
| `KnowledgeDiagram` as an Asset subtype and `AssetDiagram` join | Implemented additively | Use it as the canonical diagram link. |
| `CaptureItem` | Implemented | Keep it as raw source; never use it directly as public proof. |
| `ExperienceRecord`, `OperatingProblem`, `OperatingPattern`, `OperatingFramework` | Planned, not persisted | Package contract accepts reviewed references now; database records arrive through the planned additive migrations. |

No current compiler logic is replaced. P0B adds [knowledge-package.ts](../src/lib/tif/knowledge-package.ts), a pure contract compiler, and focused tests.

## Scope and non-goals

**Input:** one human-reviewed Experience, Decision, or Incident, with zero or more linked records.

**Output:** a complete draft package manifest containing the asset briefs and the control reports below. Missing links do not cause fabricated output; they become publication blockers and implementation work.

**Not in scope:** autonomous pattern discovery, automatic source promotion, copy generation from unreviewed notes, a new content store, a new approval workflow, graphics generation, automatic publication, vector retrieval, or a graph database.

## Input and lineage contract

`KnowledgePackageInput` is exported from `src/lib/tif/knowledge-package.ts`. It accepts the following normalized shape:

```ts
{
  source: {
    knowledgeId: "EXP-*" | "DEC-*" | "INC-*",
    recordType: "experience" | "decision" | "incident",
    title, context, businessProblem, claimBoundary,
    confidentiality: "public" | "anonymized" | "restricted" | "consent_backed",
    reviewedBy
  },
  evidence: [{ knowledgeId: "EVD-*", title, proofRef, claimStatus, claimBoundary }],
  problems: [{ knowledgeId: "PROB-*", title, claimBoundary }],
  patterns: [{ knowledgeId: "PAT-*", title, claimBoundary }],
  frameworks: [{ knowledgeId: "FRM-*", title, claimBoundary }],
  knowledgeDiagrams: [{ knowledgeId: "KD-*", title, claimBoundary }]
}
```

Every generated asset brief contains the same lineage ledger:

| Link | Required representation | Why |
|---|---|---|
| Experience | one `EXP-*`, `DEC-*`, or `INC-*` source | The asset retains the reviewed operating context. |
| Evidence | zero or more `EVD-*` citations and proof references | Claims cannot detach from proof. |
| Problem | `PROB-*` citations | The asset uses a canonical executive problem rather than inventing one. |
| Pattern | `PAT-*` citations | Reuse is explicit and reviewable. |
| Framework | `FRM-*` citations | A method is not implied by an isolated anecdote. |
| Knowledge Diagram | `KD-*` citations | Every asset points to the visual model it relies on. |

An unresolved link is represented by an empty list plus `Missing Proof`; it is never silently omitted from the package's readiness decision.

## Output contracts

The compiler returns a `KnowledgePackage` with `packageId`, source identity, exactly thirteen draft asset briefs, and five control reports.

### Asset briefs

| Brief | Existing downstream destination | Required focus |
|---|---|---|
| Executive Diagram | `AssetType.knowledge_diagram` + `KnowledgeDiagram` | Make the executive problem, decision, inputs, outputs, and boundary visible. |
| Framework | future framework registry + Asset | State decision job, components, use conditions, exclusions, and source links. |
| Executive Summary | `executive_brief` Asset | State context, decision, evidence posture, and next executive decision. |
| Operator Note | Asset + derivative package | Preserve options, tradeoffs, and operational lesson. |
| Website Guide | article/guide Asset | Explain the linked problem/pattern/framework with bounded examples. |
| Assessment | `assessment` Asset | Turn the framework into observable questions and evidence requests. |
| Checklist | assessment/guide Asset | Produce action checks tied to framework components; no unsupported outcome promises. |
| FAQ | guide Asset | Answer only questions supported by the source ledger. |
| LinkedIn Package | existing `DerivativeAsset` after source approval | Use an approved source Asset version, audience context, and inherited boundary. |
| Proposal Module | executive brief/sales Asset | Frame diagnosis, scope boundary, evidence request, and decision—not a guaranteed outcome. |
| Presentation Outline | executive brief Asset | Slide-level decision narrative with citations. |
| Recovery Assessment Insert | `assessment` Asset | Link constraints, decision register, and source evidence. |
| SEO Cluster | guide/article Asset opportunities | Create topics and internal-link intent only from approved problem/pattern language. |

Every brief has status `draft`, the source lineage, strictest evidence status, all inherited claim-boundary statements, and `blocked` or `review_required` publication readiness. The package intentionally does not contain generated prose; prose belongs to the existing reviewed Asset workflow.

### Control reports

| Report | Contract | Use |
|---|---|---|
| Evidence Requirements | Non-negotiable requirements for evidence, dated observations, proof references, and confidentiality | Evidence-review checklist. |
| Missing Proof | Explicit missing links, unsupported evidence, and confidentiality blockers | Prevents claims from being filled in by a writer or model. |
| Implementation Backlog | Deterministic next records/actions required to complete the package | Operator work queue. |
| Claim Boundary | Strictest linked claim status, all inherited boundary text, and no-broadening rule | Required source metadata for every derivative. |
| Publication Readiness | `blocked` or `review_required`, blockers, and required reviewers | Handoff to the existing Asset status workflow. |

## Claim and evidence rules

1. Evidence is the only claim-classification authority. P0B does not create another claim model.
2. Status severity is `Verified < Owner Confirmed < Experience Based < Unsupported`; a package inherits the strictest linked Evidence status.
3. Source, Evidence, Problem, Pattern, Framework, and Diagram boundaries are preserved as a set. A writer may narrow a statement, never delete a boundary, broaden scope, or change status.
4. `Unsupported` Evidence blocks public readiness. It may remain in the package only as a missing-proof item.
5. No linked Evidence blocks public readiness. A real reviewed experience is still useful as a draft source, not as public proof.
6. `restricted` source material blocks publication until an approved anonymized or consent-backed derivative exists.
7. Observed behavior does not become revenue, causality, scale, repeatability, clinical, legal, or product-performance proof without a separately admitted source.

## Review workflow

```text
1. Source review
   confirm context, decision/incident, confidentiality, and source boundary
2. Evidence review
   admit proof references; classify status; reject or retain Unsupported only as a gap
3. Knowledge review
   link canonical Problem, Pattern, Framework, and Knowledge Diagram—or record each gap
4. Package review
   run the deterministic contract compiler; accept its lineage, boundary, and backlog
5. Asset opportunity review
   select which draft briefs merit existing AssetOpportunity records
6. Existing asset review
   compose, revise, and approve Asset/AssetVersion under current controls
7. Publication review
   approve destination, audience, privacy, CTA, and inherited boundary
8. Learning review
   record measured observations as new Capture/Evidence inputs; never infer attribution
```

Reviewer roles may be the same human in a small team, but the decisions remain distinct and auditable. P0B does not move an Asset from `draft` to `review`, `approved`, or `published`.

## Knowledge Package schema and persistence path

The TypeScript schema is the immediate, non-persistent interface. It is deliberately shaped to map to the planned relational registry rather than introducing a `KnowledgePackage` database table.

```text
ExperienceRecord ─── ExperienceEvidence ─── Evidence
       │                    │
       ├── ExperienceProblem ─── OperatingProblem ─── ProblemFramework ─── OperatingFramework
       ├── ExperiencePattern ─── OperatingPattern ─── PatternEvidence ─── Evidence
       │                                      │
       └──────── future typed links ──────────┴── KnowledgeDiagram / Asset

AssetOpportunity → Asset → AssetVersion → DerivativeAsset
                    │               └── AssetDiagram → KnowledgeDiagram
                    └── AssetEvidence → Evidence
```

The compiler output is a computed manifest. Persisting another `KnowledgePackage` table would duplicate existing Asset lifecycle state and create a second source of truth. If package audit history becomes necessary, persist a versioned **review snapshot** only after Experience/registry migrations exist; never persist generated copies of Evidence or Asset data.

## Implementation backlog

| Order | Extension | Why it is required for persistent P0B packages |
|---:|---|---|
| 1 | Evidence maturity: `EVD-*`, structured status, boundary, authority, confidentiality, observed/effective dates | Lets compiler consume canonical evidence instead of an adapter reference. |
| 2 | `ExperienceRecord` promotion from Capture Inbox | Makes `EXP-*`, `DEC-*`, and `INC-*` reviewed sources durable. |
| 3 | Problem, Pattern, Framework registries and typed joins | Makes the package's complete lineage queryable and reviewable. |
| 4 | Package review/read view on deliverables and asset detail | Shows readiness before any existing Asset status change. |
| 5 | Map approved briefs to AssetOpportunity and use current composer | Maintains a single asset lifecycle. |
| 6 | Publication/measurement records | Closes the learning loop without attribution inference. |

This refines, rather than supersedes, the phase ordering in [TIF_IMPLEMENTATION_BACKLOG.md](TIF_IMPLEMENTATION_BACKLOG.md). The P0B compiler contract can be used immediately for reviewed planning; persistent use begins only as the prerequisite rows land.

## Validation tests

Focused executable tests live in [knowledge-package.test.ts](../src/lib/tif/knowledge-package.test.ts):

- emits all thirteen required draft briefs;
- attaches Experience, Evidence, Problem, Pattern, Framework, and Diagram lineage to each brief;
- inherits the strictest evidence status and all linked boundaries;
- blocks readiness for missing evidence or any required knowledge link;
- blocks readiness when `Unsupported` Evidence is present.

The next integration-test slice must add:

1. a reviewed Capture promotion produces a valid `ExperienceRecord` input;
2. a database-backed package trace resolves all IDs through existing Evidence and Asset joins;
3. the package review report cannot move an Asset to `approved` if it is blocked;
4. an approved LinkedIn derivative retains the source Asset version and inherited boundary;
5. existing compose API, deterministic draft composer, diagram registration, and manual-edit protection stay unchanged.

## Migration impact

**P0B implementation in this change:** no Prisma migration and no database mutation. The pure contract is additive and does not read or write current models.

**Future persistence:** follow the additive migrations already defined in the implementation backlog:

| Migration slice | Additions | Compatibility control |
|---|---|---|
| Evidence maturity | nullable structured fields and stable `EVD-*` ID on existing `Evidence` | Keep `claimGuard`; backfill under review before making fields required. |
| Experience | `ExperienceRecord` and `ExperienceEvidence` with optional `CaptureItem` link | Preserve raw capture and existing Evidence/Asset relations. |
| Knowledge library | Problem/Pattern/Framework tables and typed joins | Do not alter existing Asset composer or replace `KnowledgeDiagram`. |
| Eligibility read model | optional Asset/Opportunity links or computed joins | Read-only gate before existing Asset approval. |
| Publication/measurement | downstream records only | Do not reinterpret a metric as causal proof. |

No existing primary key, slug, Evidence join, Asset version, derivative, compose request, or public route is renamed or removed. Rollback for the P0B contract is simply to stop invoking the package compiler; no data requires deletion.
