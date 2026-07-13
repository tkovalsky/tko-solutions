# TIF Runtime Model

**Status:** Canonical architectural reference for TIF. Implementation evidence—`prisma/schema.prisma`, committed migrations, runtime code, and tests—overrides this document. Future TIF documents must reference this model rather than redefine these boundaries.

## Governing decision

TIF is a relational, human-reviewed intellectual-property production system. It extends the existing Evidence → Opportunity → Asset lifecycle. It does not use a graph database, vector store, autonomous agent, autonomous publishing path, duplicate registry, replacement Asset model, or replacement Evidence model.

```text
Runtime records → compiler contracts → Authority Orchestrator/read models
       ↓                     ↓                         ↓
Asset lifecycle          Opportunity Candidate → human review → existing Opportunity
       ↓                                                        ↓
review → manual publication (when applicable) → future measurement
```

## Runtime truth: persisted today

| Record | Runtime status | Authority |
|---|---|---|
| `CaptureItem` | Persisted | Raw intake only. It can point to `Evidence`; no implemented human promotion workflow exists. |
| `Evidence` | Persisted | The only persisted TIF proof registry. `proofRef` and `claimGuard` govern admissible claims. Structured claim status/boundary fields are not yet on `Evidence`. |
| `AssetOpportunity` + `AssetOpportunityEvidence` | Persisted | Existing production-intent registry and evidence linkage. It has no Experience, compiler-candidate, priority, Framework, or diagram relation. |
| `Asset` | Persisted | Canonical deliverable record and lifecycle: `draft → review → approved → published`. |
| `AssetVersion` | Persisted | Versioned rendered asset body and revision note. |
| `RevisionRequest` | Persisted | Existing human revision queue. |
| `DerivativeAsset` | Persisted | Channel/output derivative of an Asset and optional source version. It is not a second Asset registry. |
| `KnowledgeDiagram` + `AssetDiagram` | Persisted and deployed | Typed Asset extension and consuming-Asset relation. Parent Asset remains owner of lifecycle, versions, revisions, Evidence, and derivatives. The configured database reported all committed migrations applied on 2026-07-13. |
| `ContentInventoryItem` | Persisted | Discovery/inventory only. It is explicitly not Evidence/Opportunity/Asset lineage. |
| `InboundLead` | Persisted | Website lead intake, outside the authority model. |
| `Publication` | **Not persisted** | `Asset.status = published` is the only current publication signal. Destination, reviewer, release, and source-version metadata are absent. |
| `Measurement` | **Not persisted** | No measurement table, capture action, or analytics ingestion exists. |
| `Experience`, `Problem`, `Pattern`, `Framework` | **Not persisted** | No normalized TIF relational registries exist. Do not present documentation, page arrays, or compiler input as runtime counts. |

Asset types remain the existing `AssetType` enum. The production bundle must map its outputs to `Asset` or `DerivativeAsset`; it must not add a parallel type system merely to mirror compiler labels.

## Compiler truth: contracts, not runtime records

| Contract | Implementation status | Boundary |
|---|---|---|
| Experience source input | Implemented as validated input to `compileKnowledgePackage` | It represents a reviewed source in memory. It does not prove an `ExperienceRecord` table exists. |
| Problem / Pattern / Framework references | Implemented as validated compiler references | They carry IDs, title, and claim boundary for package planning; they are not queryable registries. |
| Knowledge Asset Package / manifest | Implemented | Pure compiler output: briefs, missing proof, lineage, boundaries, and readiness. It does not compose prose, persist a package, create Opportunities, or change Asset status. |
| Experience Compiler | Partially implemented | Capture and Evidence runtime exist; package compilation exists. Reviewed Capture → normalized Experience persistence is future work. |
| Knowledge Asset Compiler | Implemented as contract | Produces 13 draft briefs and inherits strictest evidence status/boundaries. Existing Asset Composer remains the only persistence path after review. |
| Authority Production Orchestrator | Implemented as read model | Deterministically reports coverage, gaps, package readiness, candidates, capture tasks, and quality. It never creates proof, publishes, or changes status. |
| Authority Work Queue | Implemented as read model | Ranks persisted asset/opportunity work and compiler-package blockers. It emits recommendations and Opportunity Candidates only. Fields requiring non-existent Experience/Problem records explicitly read `Untracked`. |

Compiler IDs are planning/citation references. They become runtime references only after their owning relational registry is implemented and a human has reviewed the association.

## Strategy truth: intellectual-property libraries

Healthcare Authority, Framework, Problem, Assessment, SEO, and Founder Authority libraries are strategy/IP collections. They may inform a human review or compiler input, but they are not runtime systems, claim authorities, publication approvals, or duplicate registries.

The required boundary is:

```text
strategy library → reviewed source/claim proposal → Evidence and/or compiler input
                                                ↘ never direct publication
```

No strategy document can upgrade a claim, create runtime lineage, or silently become a Problem/Pattern/Framework registry.

## Read models

Read models derive from runtime records and/or explicit compiler inputs. They never become a persistence backdoor.

| Read model | Inputs | Mutations prohibited |
|---|---|---|
| TIF operator console / deliverables | Evidence, Opportunities, Assets, Versions, Derivatives | No implicit Evidence, Opportunity, or Asset creation. |
| Proof Hub | Source-aware proof files and runtime links | No duplicate evidence store. |
| Authority Dashboard | Persisted Evidence, Assets, Knowledge Diagrams; optional compiler inputs | No invented Experience/Problem/Framework/Publication/Measurement counts. |
| Authority Work Queue | Persisted Assets, Opportunities, Evidence links, diagram links; optional package manifests | No automatic Opportunity, Asset, publication, or claim creation. |
| Authority Production Orchestrator | Explicit in-memory authority input | No database mutation. |

## Canonical runtime flow

```text
CaptureItem
  ↓ (human admission)
Evidence ──→ AssetOpportunity ──→ Asset ──→ AssetVersion ──→ DerivativeAsset
                 ↓                   ↓
             human review       draft/review/approved/published
                 ↓                   ↓
           existing composer   KnowledgeDiagram / AssetDiagram where applicable
```

The broader authority-production flow is valid only as a composition/read-model flow until its upstream/downstream records exist:

```text
reviewed Experience contract → Evidence references → Knowledge Package
→ Opportunity Candidate → human review → existing AssetOpportunity → Asset
→ manual publication → future Measurement
```

## Opportunity adapter

Compiler output does **not** persist an Opportunity. `opportunity-adapter.ts` emits review-only candidates containing a deterministic package/kind ID, Evidence IDs, inherited claim boundaries, blockers, and reviewer instruction.

```text
Compiler → Opportunity Candidate → human review → existing AssetOpportunity → Asset → publication
```

On human acceptance, the candidate ID marker (`TIF-OPPORTUNITY-CANDIDATE: <id>`) belongs in the existing Opportunity context. Before creation, the reviewer checks the marker and reuses the matching Opportunity if present. This preserves traceability and prevents duplicate candidate conversion without adding a second registry. The adapter does not write Prisma records and cannot bypass Evidence, claim boundaries, or review.

Some package briefs are not top-level current `AssetType` values (for example LinkedIn package and proposal module). They remain review candidates until a human maps them to the existing parent Asset or `DerivativeAsset`; no new Asset type is implied.

## Truth rules

1. Evidence is the source of admissible knowledge. `claimGuard` remains current runtime authority until structured Evidence fields are added and backfilled.
2. Asset status and RevisionRequest are the only implemented human review lifecycle. A compiler readiness flag is not an Asset approval.
3. `published` is a lifecycle state, not a persisted Publication record.
4. A Knowledge Diagram is an Asset subtype, never a second evidence or publishing system.
5. A read model may expose missing work; it may not create work records automatically.
6. Runtime implementation overrides documentation; when they differ, correct the documentation and open executable backlog work only where a real gap remains.

## References

- [Knowledge Asset Compiler](TIF_KNOWLEDGE_ASSET_COMPILER.md) for compiler contract details.
- [Knowledge Diagram Subsystem](TIF_KNOWLEDGE_DIAGRAM_SUBSYSTEM.md) for typed diagram behavior.
- [Implementation Backlog](TIF_IMPLEMENTATION_BACKLOG.md) for remaining executable work.
- [Authority Production](TIF_AUTHORITY_PRODUCTION.md) for composition and learning flow.
