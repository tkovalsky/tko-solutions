# Decisions

## DEC-2026-07-01-TIF-Deliverable-Centric-View

**Status:** Ratified and implemented

**Context:** The TIF audit found that the repo already had Evidence, Asset Opportunity, Asset,
Artifact Registry, lifecycle, and v0.3 Execution Layer concepts. It did not have a primary
operator view centered on deliverables or readiness. The live `/tif` console still answered
"what evidence/opportunities/assets exist?" more directly than "what can be shipped?"

**Decision:** Add Deliverable-Centric TIF as a read model over existing records, not as a new
storage architecture.

**Implementation:** `/tif/deliverables` groups deliverables by type and computed production status:
`ready`, `in_progress`, `blocked`, and `published`. Readiness is deterministic and rule-based. No
LLM scoring, drafting workflow, content generation, approval workflow, publishing workflow, or
schema migration is introduced.

**Supported deliverable types:** `executive_brief`, `assessment`, `case_study`, `article`,
`report`, `offer_asset`, `sales_asset`.

**Current reality after implementation:**
- `article`: exists in live TIF opportunities/assets.
- `assessment`: exists in live TIF opportunities/assets.
- `report`: partially exists through the existing `intelligence_report` asset type mapping.
- `executive_brief`: supported in templates/registry concepts, no live rows.
- `case_study`: supported in templates/registry concepts, no live rows.
- `offer_asset`: supported in the deliverable registry, no live rows.
- `sales_asset`: supported in the deliverable registry, no live rows.

**Rationale:** TIF's business value is production management. Operators need to answer what can be
produced, published, or unblocked today. Deliverable readiness is the smallest layer that turns the
current inventory spine into a factory console while preserving the no-auto-publish and no-storage-
redesign constraints.

## DEC-2026-07-01-TIF-Production-Queue

**Status:** Ratified and implemented

**Context:** A follow-up operator audit found that the first Deliverable-Centric view answered what
existed, what was ready, and what was blocked, but still led with counts, status labels, and
readiness percentages. For a 2-hour operator window, that was not enough. It did not immediately
answer what to finish first, what to publish today, what to ignore, or which deliverable had the
highest completion probability.

**Decision:** Add a deterministic production queue on top of the deliverable registry.

**Implementation:** `/tif/deliverables` now leads with **Next Best Deliverables**, **Publish
Today**, **Blocked**, and **Ignore For Now**. Each deliverable gets a priority score, business value
score, completion probability, estimated effort, next action, and structured blocker details. Scores
are computed from readiness, missing components, evidence count, and status. Business value is a
separate deterministic type/business-unit score; it does not call AI and does not mutate records.

**Anti-pattern removed:** The page no longer opens with "we know things" dashboard reporting. Counts
and type snapshots remain available below the queue, but the first operator decision is now "do this
next."
