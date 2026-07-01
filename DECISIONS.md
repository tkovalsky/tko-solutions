# Decisions

## DEC-2026-07-01-TIF-Content-Operating-Model

**Status:** Ratified as documentation/backlog baseline

**Context:** TIF documentation had evolved from the original knowledge architecture into a live
v0.1 Evidence/Opportunity/Asset spine, a v0.2 operator console, a deliverable-centric production
view, and a future Registry & Artifact Execution Layer. The remaining strategic gap was that TIF
was still framed mainly as an evidence-to-asset generator. That framing did not fully cover content
strategy, demand generation, channel adaptation, publication ownership, or measurement feedback.

**Decision:** Adopt the complete TIF content operating model:

```text
Knowledge → Insight → Deliverable → Channel Package → Publication → Measurement
```

**Terminology:** Existing implementation terms remain valid where precise:

- `Evidence` = proof-grade admitted Knowledge.
- `Asset` = current v0.1 storage and historical implementation term.
- `Artifact` = registry/output contract term in the PRD.
- `Deliverable` = strategy/backlog term for the core producible content or intelligence artifact.
- `Channel Package` = channel-specific adaptation of a deliverable.
- `Publication` = rendered or deployed output of a channel package.
- `Measurement` = performance and coverage feedback loop.

**Comparison:** Comparison is a first-class deliverable type, not an article subtype and not only a
`comparison_page` or `comparison_guide` format. Examples include Boca vs Delray, Delray vs Boynton,
Valencia Sound vs Valencia Bay, GL Homes vs Toll Brothers, and 55+ vs All-Age Communities.

**Implementation constraint:** This decision is documentation/backlog alignment only. It does not
authorize feature implementation, migrations, schema changes, new tables, new routes, production
behavior changes, auto-publishing, analytics integrations, or CRM integrations.

**Rationale:** TIF's business value is not only generating a draft from evidence. It is operating a
content and demand-generation system where reusable knowledge becomes insights, insights become
deliverables, deliverables become channel packages, packages become approved publications, and
measurement informs the next production priority.

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

**Supported deliverable types:** `article`, `assessment`, `report`, `executive_brief`,
`case_study`, `offer_asset`, `sales_asset`, `comparison`, `guide`, `email_sequence`,
`landing_page`, `linkedin_post`, `facebook_ad`, `reddit_post`, `crm_next_touch_asset`.

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

## DEC-2026-07-01-TIF-Deliverable-Taxonomy-Expansion

**Status:** Ratified and implemented

**Context:** The content operating model recognizes additional deliverable categories beyond the
initial seven supported by the Deliverable-Centric production view. Operators need these categories
to appear in readiness and queue planning without adding generators, publishing integrations, or
new storage.

**Decision:** Expand the deterministic Deliverable Registry taxonomy to include `comparison`,
`guide`, `email_sequence`, `landing_page`, `linkedin_post`, `facebook_ad`, `reddit_post`, and
`crm_next_touch_asset` alongside the legacy `article`, `assessment`, `report`, `executive_brief`,
`case_study`, `offer_asset`, and `sales_asset` types.

**Implementation:** Readiness remains rule-based and in memory. New types use deterministic
title/audience/topic/evidence/source/CTA/offer/next-action checks and flow through the existing
Next Best Deliverables, Ready To Produce, Publish Today, Blocked, and Ignore For Now queue logic.

**Constraints:** No migrations, schema changes, database writes, generation logic, publishing
support, channel automation, or production workflow changes are authorized by this decision.
Deliverables remain read-only planning objects over existing Evidence, Asset Opportunity, and Asset
records.
