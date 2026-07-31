# P0A — TIF Knowledge Diagram Subsystem

## Decision

Knowledge Diagrams are first-class, reusable **Asset** subtypes. They are not a new publishing system, a second evidence store, or an artwork generator.

```text
Evidence → Asset (knowledge_diagram) → KnowledgeDiagram metadata
                                  ↘ AssetDiagram ↗
                    Guide / Assessment / Proposal / Operator Note / Case Study
```

The parent `Asset` remains authoritative for:

- draft → review → approved → published status;
- asset versions;
- revision requests;
- manual-edit protection;
- Evidence traceability through `AssetEvidence`;
- channel derivatives through `DerivativeAsset`.

`KnowledgeDiagram` holds only diagram-specific operating metadata: purpose, executive audience, business problem, inputs, outputs, claim boundary, evidence status, format, and permanent `KD-*` identifier.

## Updated architecture

```text
Capture / Experience (future normalized layer)
       ↓
Evidence ───────────────────────────┐
       ↓                             │
AssetOpportunity → Asset ────────────┼→ KnowledgeDiagram
       ↓              ↓              │       ↓
AssetVersion     AssetEvidence ──────┘   AssetDiagram
       ↓                                      ↓
DerivativeAsset                       consuming Assets
                                   (guide, assessment, proposal,
                                    Operator Note, case study)
```

Future `ExperienceRecord`, `OperatingProblem`, `OperatingPattern`, and `OperatingFramework` registries must link to a KnowledgeDiagram through typed joins when those models are implemented. They are intentionally not represented as JSON or duplicate text fields now because those registries do not yet exist in the running schema.

## Canonical KnowledgeDiagram model

| Field | Purpose |
|---|---|
| `knowledgeId` | Permanent `KD-001` style citation identifier. |
| `assetId` | One-to-one parent Asset; preserves current workflow and traceability. |
| `diagramFormat` | Architecture, workflow, dependency map, decision-rights matrix, heat map, timeline, governance stack, operating loop, or framework. |
| `purpose` | Executive question the visual answers. |
| `executiveAudience` | Intended buyer/operator roles. |
| `businessProblem` | Operating problem made visible. |
| `inputs` | Reviewed sources/artifacts required to create the diagram. |
| `outputs` | Understanding or decision the executive should gain. |
| `claimBoundary` | What cannot be inferred from the diagram. |
| `evidenceStatus` | Verified, Owner Confirmed, Experience Based, or Unsupported. |
| `Asset.status` | Publication readiness; inherited from the existing human-review workflow. |

## Traceability rules

1. A diagram's evidence links are the parent Asset's existing `AssetEvidence` links.
2. A guide, assessment, proposal, Operator Note, case study, or other asset references a diagram through `AssetDiagram`.
3. A Knowledge Diagram cannot reference itself as a consuming asset.
4. An Unsupported diagram may be drafted as a research specification but cannot be approved as public proof.
5. Every consuming Asset must preserve the diagram's claim boundary; it may narrow but never broaden it.
6. A diagram without linked Evidence cannot be approved as a proof asset.
7. Diagrams do not generate or imply visual artwork. Their draft output is an evidence-backed visual specification.

## Registry and review workflow

### Implemented registry

- `/tif/diagrams` lists all registered Knowledge Diagrams with `KD-*` ID, format, Asset status, linked Evidence count, consuming Asset count, and evidence status.
- Registering a diagram creates a draft AssetOpportunity, a draft Asset, a KnowledgeDiagram metadata record, and optional AssetEvidence links in one transaction.
- `/tif/diagrams/[slug]` shows metadata, claim boundary, linked Evidence, consuming Assets, and an action to link an existing Asset.

### Review workflow

```text
Register metadata + evidence
→ compose diagram specification using existing Asset Composer
→ review purpose / labels / inputs / outputs / boundary
→ revision request if needed
→ Asset status: draft → review → approved → published
→ link consuming assets
→ observe publication use through future publication/measurement layer
```

No new approval workflow has been introduced. Existing Asset status and RevisionRequest mechanisms remain the human gate.

## Migration strategy

### Migration contents

- Adds `knowledge_diagram` to the existing `AssetType` enum.
- Adds reusable `ClaimStatus` enum.
- Adds `KnowledgeDiagramFormat` enum.
- Adds `KnowledgeDiagram` one-to-one extension table.
- Adds `AssetDiagram` consuming-asset join table.

### Compatibility

- Additive only: no existing Asset, Evidence, Opportunity, AssetVersion, or DerivativeAsset is changed or removed.
- Existing composer gains a Knowledge Diagram specification template; it does not generate graphics.
- Existing database primary keys and slugs are preserved.
- No data backfill is required because no existing assets are converted automatically.

### Apply procedure

1. Deploy `prisma/migrations/20260713150000_add_knowledge_diagrams/migration.sql` to an environment with the project database migration role.
2. Record the migration using the project's normal Prisma migration process.
3. Run `npx prisma generate`.
4. Run focused diagram tests, `npm run lint`, and `npm run build`.
5. Register only reviewed P0 diagrams. Do not bulk-create the backlog.

### Rollback

- Before any diagram records exist, revert the migration using the standard database change process.
- After records exist, disable the registry route and UI while preserving Assets and metadata; do not delete diagrams or their evidence links as a rollback shortcut.

## Deployment verification

On 2026-07-13, `npm run tif:migrate:status` against the configured PostgreSQL database reported that all seven committed migrations were applied and the database schema was up to date. The registry remains subject to the existing human-review workflow; this confirmation does not authorize bulk diagram creation.
