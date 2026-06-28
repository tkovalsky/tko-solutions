# TKO Intelligence Factory (TIF)
## Engineering Backlog v1
Status: **SPLIT** — TIF **v0.1 Asset Production Spine = SANCTIONED NEXT**; the speculative platform tail (knowledge graph, vectors, agents) **stays DEFERRED** (see [`GOVERNANCE.md`](GOVERNANCE.md) §2 and `/dev/PORTFOLIO_GOVERNANCE.md`)
Owner: Todd Kovalsky

> **⚠️ Governance status (updated 2026-06-28): RECLASSIFIED.** This backlog is no longer DEFERRED
> as a whole. TIF has materially changed: it is now a **production accelerator** — a multiplier for
> the revenue-producing initiatives across **Rachel Delray · CRE Intelligence · TKO Solutions**,
> not a speculative platform. The old framing ("build TIF *after* revenue; not software") is
> **removed**. New framing: **TIF is a multiplier for revenue-producing initiatives and may advance
> in parallel when it directly supports Rachel, CRE, or TKO asset production.**
>
> The reclassification is **scoped**, not a blanket reopen:
> - **TIF v0.1 — Asset Production Spine = SANCTIONED NEXT.** Scope: **Evidence Registry · Asset
>   Opportunity Registry · Asset Composer · Traceability · Capture Inbox.** Un-gated; may consume
>   *excess* capacity. It does **not** jump ahead of active revenue work and does **not** raise the
>   active-work limits (≤3 active / ≤5 portfolio still hold).
> - **Still DEFERRED (original concerns remain valid):** Knowledge Graph, Vector Search (pgvector),
>   Agent Framework, and any generic platform / client-facing SaaS infrastructure. The full
>   relational Knowledge Core (Epics 1/5/6) and Vector Intelligence (Epic 10) below are this tail.
>
> See the [TIF v0.1 — Asset Production Spine](#tif-v01--asset-production-spine-sanctioned-next)
> scope block below for the authoritative in/out list.

> **North star:** This backlog builds toward the future state defined in
> [`CURRENT_REALITY.md`](CURRENT_REALITY.md). TIF is the internal engine that produces the
> proof, content, and assessment assets that document requires — not a product TKO sells.
> **Content flywheel:** EPIC 11 (Content Intelligence Pipeline) is the canonical spec for the
> `Observation → … → Publish` flywheel across Rachel / CRE / TKO. Its **Capture Inbox** and **Asset
> Opportunity Registry** are part of the SANCTIONED-NEXT v0.1 spine; the full cron-driven automation
> (state machine, refinement cycles, Rachel GPT) is the sanctioned *direction* sequenced after the
> spine. It automates the already-real manual method in
> [`asset-production/METHOD.md`](asset-production/METHOD.md).
> **Domain-model authority:** [`docs/KNOWLEDGE_ARCHITECTURE_REVIEW.md`](docs/KNOWLEDGE_ARCHITECTURE_REVIEW.md)
> supersedes the Knowledge Core schema in this backlog (FailureMode collapses into
> `Pattern.kind`; Concept, Claim, Asset, and Evidence move into the MVP).

---

# IMPLEMENTATION PRINCIPLES

The objective is NOT to build:

- a CMS
- a note-taking application
- a second-brain application
- a SaaS platform
- an AI chat application

The objective IS to build:

A structured operational knowledge system that converts experience into reusable intellectual property.

Every feature must support at least one of:

- Content Creation
- Case Study Creation
- Assessment Creation
- Consulting Offer Creation
- Thought Leadership
- Revenue Generation

---

# TIF v0.1 — Asset Production Spine (SANCTIONED NEXT)

**This is the only part of TIF that is sanctioned to advance now.** It is the narrow, non-speculative
production accelerator: it turns admitted evidence into trust assets with full traceability, for
Rachel Delray, CRE Intelligence, and TKO Solutions. It automates the manual
[`asset-production/METHOD.md`](asset-production/METHOD.md) spine — it does not replace its human
approval gate.

**Governance:** SANCTIONED NEXT — un-gated, but *behind* active revenue work and bound by the
portfolio's ≤3-active / ≤5-total limits. It may consume **excess** capacity; it may **not** displace
a revenue-producing initiative. Advance it only when it directly supports Rachel / CRE / TKO asset
production.

| v0.1 scope (IN) | Maps to | Explicitly EXCLUDED from v0.1 (stays DEFERRED) |
|---|---|---|
| **Evidence Registry** — admitted evidence records with resolving `proof_ref` + `claim_guard` | `content/proof/*/evidence.yaml`, EPIC 6 TIF-604 | **Knowledge Graph** — full relational Experience→Observation→Pattern→FailureMode core (Epics 1/5/6) |
| **Asset Opportunity Registry** — `asset_opportunity` records | EPIC 11 TIF-1103 | **Vector Search / pgvector** (Epic 10) |
| **Asset Composer** — template-fill generation of articles / case studies / assessments / reports / comparison guides | EPIC 7 (TIF-701…706) + `asset-production/templates/` | **Agent Framework** / autonomous multi-agent orchestration |
| **Traceability** — every claim cites an evidence `id`; evidence rule + claim guards enforced | METHOD.md §3–§5 | **Generic platform infrastructure** / any client-facing SaaS |
| **Capture Inbox** — lightweight idea intake | EPIC 11 TIF-1101 | |

The numbered Epics below remain the design of record. Read them through this scope block: Epics
1/5/6 (relational Knowledge Core) and Epic 10 (Vector Intelligence) are the **deferred tail**, not
part of v0.1.

---

# ENGINEERING DEFINITION OF DONE

No story is complete until:

- Unit tests pass
- Integration tests pass
- Typecheck passes
- Lint passes
- CI passes
- Coverage thresholds met

Coverage Targets:

- Domain Layer: 90%
- API Layer: 90%
- UI Layer: 80%
- Repository Overall: 85%

---

# EPIC 0 — FOUNDATION

## Goal

Create a production-ready engineering foundation.

---

## TIF-001 Repository Bootstrap

### Acceptance Criteria

Create:

- Next.js application
- TypeScript
- Prisma
- PostgreSQL
- Tailwind
- shadcn/ui
- Environment configuration

### Testing

- Build succeeds
- Typecheck succeeds
- Lint succeeds

---

## TIF-002 Testing Infrastructure

### Acceptance Criteria

Install:

- Vitest
- React Testing Library
- Playwright
- Coverage reporting

### Testing

- Sample unit test passes
- Sample integration test passes
- Sample E2E test passes

### Coverage

Minimum 80%

---

# EPIC 1 — KNOWLEDGE CORE (PHASE 1 MVP)

## Goal

Capture operational knowledge in structured form.

This is the true MVP.

Everything else is blocked until complete.

---

## TIF-101 Experience Entity

### Acceptance Criteria

Implement:

Experience

Fields:

- id
- title
- source
- industry
- organization
- summary
- narrative
- lessons
- tags
- created_at
- updated_at

### Tests

- create
- update
- delete
- validation

### Coverage

90%

---

## TIF-102 Observation Entity

### Acceptance Criteria

Implement:

Observation

Fields:

- id
- experience_id
- statement
- context
- confidence
- tags

Relationship:

Experience
→ Observation

### Tests

- create
- update
- delete
- relationship integrity

### Coverage

90%

---

## TIF-103 Pattern Entity

### Acceptance Criteria

Implement:

Pattern

Fields:

- id
- name
- description
- symptoms
- root_causes
- consequences
- mitigations

### Tests

- CRUD
- validation

### Coverage

90%

---

## TIF-104 Failure Mode Entity

### Acceptance Criteria

Implement:

FailureMode

Fields:

- id
- name
- description
- indicators
- causes
- impacts
- remediation

### Tests

- CRUD
- validation

### Coverage

90%

---

## TIF-105 Core Relationship Model

### Acceptance Criteria

Support:

Experience
→ Observation

Observation
→ Pattern

Pattern
→ FailureMode

### Tests

- relationship creation
- deletion behavior
- referential integrity

### Coverage

90%

---

# EPIC 2 — API LAYER

## Goal

Expose the knowledge model through stable APIs.

---

## TIF-201 Experience API

Endpoints:

GET /api/experiences

GET /api/experiences/:id

POST /api/experiences

PUT /api/experiences/:id

DELETE /api/experiences/:id

### Tests

- unit
- integration

### Coverage

90%

---

## TIF-202 Observation API

Same CRUD structure.

Coverage: 90%

---

## TIF-203 Pattern API

Same CRUD structure.

Coverage: 90%

---

## TIF-204 Failure Mode API

Same CRUD structure.

Coverage: 90%

---

# EPIC 3 — KNOWLEDGE WORKSPACE

## Goal

Provide the first usable interface for knowledge capture.

---

## TIF-301 Experience Library

### Capabilities

- create
- edit
- delete
- search
- view detail

### Tests

- component tests
- Playwright happy path

Coverage: 80%

---

## TIF-302 Observation Library

Same capabilities.

Coverage: 80%

---

## TIF-303 Pattern Library

Same capabilities.

Coverage: 80%

---

## TIF-304 Failure Mode Library

Same capabilities.

Coverage: 80%

---

# EPIC 4 — SEARCH

## Goal

Enable retrieval before introducing vectors.

---

## TIF-401 Full Text Search

### Search Targets

- Experiences
- Observations
- Patterns
- Failure Modes

### Supported Queries

- exact match
- partial match
- multi-field match

### Tests

- search ranking
- filtering
- pagination

Coverage: 85%

---

# EPIC 5 — SEED LIBRARY IMPORT

## Goal

Populate the system with real operational knowledge.

---

## TIF-501 Seed Import Framework

### Acceptance Criteria

Support import of:

- markdown
- json
- yaml

### Tests

- import success
- duplicate prevention
- rollback handling

Coverage: 90%

---

## TIF-502 Initial Knowledge Corpus

### Required Libraries

Human API Library

Administrative Burden Library

Transformation Recovery Library

AI Adoption Library

Governance Failure Library

Enterprise Value & Exit Readiness Library

RachelOS Library

Healthcare Transformation Library

CRE Intelligence Library

### Success Criteria

Minimum:

- 25 Experiences
- 50 Observations
- 20 Patterns
- 10 Failure Modes

---

# GATE CHECKPOINT

DO NOT PROCEED UNTIL:

- Knowledge Core complete
- APIs complete
- Workspace complete
- Search complete
- Seed libraries populated

The system must demonstrate real knowledge capture before additional architecture is added.

---

# EPIC 6 — KNOWLEDGE EXPANSION

## Goal

Introduce reusable intellectual property structures.

---

## TIF-601 Framework Entity

Fields:

- name
- purpose
- workflow
- components
- examples

Coverage: 90%

---

## TIF-602 Governance Model Entity

Fields:

- scope
- decision_rights
- approval_model
- escalation_model
- controls

Coverage: 90%

---

## TIF-603 Capability Entity

Fields:

- name
- description
- evidence
- maturity

Coverage: 90%

---

## TIF-604 Evidence Entity

Fields:

- title
- source
- repository
- screenshots
- documents
- references

Coverage: 90%

---

## TIF-605 Decision Entity

Fields:

- decision
- rationale
- alternatives
- outcomes

Coverage: 90%

---

# EPIC 7 — ASSET FACTORY

## Goal

Generate reusable consulting assets.

---

## TIF-701 Claude Integration

### Capabilities

- prompt execution
- retries
- logging
- output persistence

### Tests

- mocked generation
- retry handling
- failure recovery

Coverage: 85%

---

## TIF-702 Article Generation

Input:

Pattern

Output:

Article

### Examples

Human API

→ The Most Important System In Your Organization Probably Isn't A System

Coverage: 85%

---

## TIF-703 Case Study Generation

Input:

Experience + Pattern

Output:

Case Study

Coverage: 85%

---

## TIF-704 Assessment Question Generation

Input:

Pattern

Output:

Question Library

Coverage: 85%

---

## TIF-705 LinkedIn Draft Generation

Input:

Pattern

Output:

LinkedIn Post

Coverage: 85%

---

## TIF-706 Offer Generation

Input:

Framework + Pattern + Capability

Output:

Offer Draft

Coverage: 85%

---

# EPIC 8 — HEALTHCARE STORY LIBRARY

## Goal

Create healthcare credibility assets.

---

## Required Story Categories

- Human API
- Prior Authorization
- Administrative Burden
- Transformation Recovery
- Governance Breakdown
- AI Adoption Failure
- Workflow Modernization
- Operational Visibility
- Enterprise Value & Exit Readiness

---

## Deliverables

### Story Templates

- Situation
- Complexity
- Failure Mode
- Decision Rights
- Governance Issues
- Resolution
- Lessons

### Generated Outputs

- Articles
- Case Studies
- Diagnostic Content
- Sales Assets

---

# EPIC 9 — ASSESSMENT ENGINE

## Goal

Create revenue-generating assessments.

---

## TIF-901 Human API Risk Assessment

Deliverables:

- Questions
- Scoring
- Findings
- Recommendations
- PDF Report

---

## TIF-902 Administrative Burden Assessment

Same structure.

---

## TIF-902A Prior Authorization Operational Assessment

Tier-1 opportunity.

Assessment focus:

- Administrative burden
- Denial reduction
- Workflow quality
- Operational consistency
- Human dependency risk
- Gold Card readiness as an operational-quality output

Inputs:

- PA submissions
- Denial reasons
- Specialty
- Payer mix
- Workflow documentation
- Staffing model

Explicitly not:

- Gold Card Platform
- Prior Authorization Platform
- Claims Platform
- Payer Technology Product
- FHIR infrastructure
- AI platform

Future prototype only:

- Phase 1: spreadsheet plus lightweight web application; Provider, Payer, Authorization, Denial Reason, Exception, Staff Member; track/categorize denials; identify repeat patterns and Human APIs; no AI, no FHIR, no claims integration.
- Phase 2: workflow mapping, bottleneck analysis, administrative burden scoring.
- Phase 3: Gold Card Readiness Score based on Documentation Quality, Approval Rate, Exception Dependency, and Workflow Standardization.

---

## TIF-903 Transformation Recovery Assessment

Same structure.

---

## TIF-904 AI Readiness Assessment

Same structure.

---

## TIF-905 Enterprise Value & Exit Readiness Assessment

Future-state assessment only.

Potential scope:

- Human API Risk Assessment
- Organizational Dependency Analysis
- Operational Memory Assessment
- Workflow Scalability Assessment
- AI Readiness Assessment
- Enterprise Value Risk Review

---

## TIF-905 Operational Visibility Assessment

Same structure.

---

# EPIC 10 — VECTOR INTELLIGENCE

## Goal

Improve knowledge discovery.

This phase is intentionally last.

---

## TIF-1001 pgvector Integration

### Capabilities

- embedding storage
- vector indexing
- retrieval

Coverage: 85%

---

## TIF-1002 Similarity Search

Questions Supported:

- Have I seen this before?
- What patterns are similar?
- What stories relate?
- What frameworks apply?
- What assessments apply?

Coverage: 85%

---

## TIF-1003 Related Content Engine

Generate:

- related experiences
- related patterns
- related frameworks
- related assessments

Coverage: 85%

---

# EPIC 11 — CONTENT INTELLIGENCE PIPELINE

> **Status:** Planned · **Priority:** P1 (mid-term) · **Owner:** TKO Solutions ·
> **Governance:** **partly SANCTIONED NEXT.** The **Capture Inbox** (TIF-1101) and **Asset
> Opportunity Registry** (TIF-1103) are part of the v0.1 spine and may advance now on excess
> capacity. The full cron-driven automation (state machine, refinement cycles, approval queue,
> Rachel GPT) is the sanctioned *direction*, sequenced **after** the spine — it is not deferred
> platform work, but it does not run ahead of active revenue work either. This is the canonical,
> single-source spec for the content flywheel; governance and `CURRENT_REALITY.md` point here.

## Where this fits

The **v0.1 Asset Production Spine already exists as a manual method** —
[`asset-production/METHOD.md`](asset-production/METHOD.md) walks
`Observation → Evidence → Finding → Recommendation → Asset` with markdown + YAML + Claude and a
hard human gate. EPIC 11 is *not* knowledge-graph or vector infrastructure (those stay DEFERRED).
It is the **automation and capture front-end** that turns the manual spine into a repeatable,
multi-business content production system shared across **Rachel Delray · CRE Intelligence · TKO
Solutions** from one evidence base — the production accelerator, not a speculative platform.

It advances under the portfolio's standing discipline: behind active revenue work, within the
≤3-active / ≤5-total limits, consuming excess capacity, only when it directly supports Rachel /
CRE / TKO asset production.

## The problem (today)

```
Observation → Todd remembers it → Todd manually writes something → maybe becomes content
```

Most valuable observations never become assets. Examples that should have become assets and
didn't: a represented seller calling Rachel anyway; a lead citing buyer strategy over listings;
a prospect who lost a job twice to AI; prior-auth operational bottlenecks; healthcare
transformation lessons; CRE market observations. Asset production depends entirely on manual
effort.

## The target state

```
Observation → Evidence → Opportunity → Research → Draft → Refinement → Approval → Publish
```

A scalable content + marketing flywheel across all three proof domains. **Human approval stays
mandatory; nothing auto-publishes and nothing auto-distributes.**

## Goal

Transform Ideas / Observations / Market Signals / Client Conversations / Research into Articles /
Case Studies / Landing Pages / Assessments / Comparison Guides / Executive Briefs / Intelligence
Reports through a structured, governed workflow.

## Core workflow

```
Capture → Classification → Research → Asset Recommendation → Draft → Refinement → Review → Approval → Publish
```

## TIF-1101 — Phase 1: Capture Inbox

A lightweight capture layer so ideas enter the system immediately, without requiring a fully
normalized evidence record first.

- **Sources:** `conversation`, `phone_call`, `client_work`, `healthcare`, `cre`, `rachel`,
  `personal_observation`, `reddit`, `linkedin`, `web_research`.
- **Capture status:** `inbox` → `reviewed` → `promoted` → `archived`.
- **Record example:**
  ```yaml
  id: inbox-001
  title: Lead lost job twice to AI
  source: conversation
  status: inbox
  ```

## TIF-1102 — Phase 2: Content Work Queue

A `content_work_item` entity that tracks content through its production lifecycle.

- **Schema:** `id`, `title`, `business_unit`, `asset_type`, `source_evidence`, `stage`, `owner`,
  `priority`, `next_action`, `generated_assets`, `notes`.
- **Stages:** `inbox` → `research` → `drafting` → `refining` → `review` → `approved` →
  `published` → `archived`.

## TIF-1103 — Phase 3: Classification

Daily processing assigns:

- `business_unit`: `rachel` | `cre` | `tko`
- `asset_type`: `article` | `landing-page` | `case-study` | `assessment` | `executive-brief` |
  `comparison-guide` | `intelligence-report`

Output: `asset_opportunity` records.

## TIF-1104 — Phase 4: Research Layer

Gather supporting evidence before drafting: web research, market intelligence, supporting data,
counterarguments, related observations. Output stored alongside the work item:
`supporting_sources`, `related_patterns`, `counter_arguments`.

## TIF-1105 — Phase 5: Asset Recommendation

Determine and rank `recommended_assets` (`primary_asset`, `secondary_asset`).

> Observation: *Represented seller called Rachel despite existing representation* →
> 1. Landing Page  2. Article  3. Case Study

## TIF-1106 — Phase 6: Draft Generation

Generate **Draft v1**. Store it. Do not publish. Drafts remain reviewable and editable.

## TIF-1107 — Phase 7: Refinement Workflow

Subsequent cycles improve title, structure, evidence support, and asset completeness. Store
**Draft v2, v3, …** with full revision history.

## TIF-1108 — Phase 8: Approval Queue

Ensure all content stays human-approved. Reviewer: **Todd**. Actions: **Approve / Reject /
Request Revision**. Example queue: *"3 Assets Ready For Review — Why Buyers Choose Rachel Delray ·
Operational Intelligence vs Reporting · How Human APIs Become Organizational Bottlenecks."*

## TIF-1109 — Phase 9: Publishing

Publishing occurs **only after approval**. No automatic publishing. No automatic distribution.
Every published asset still passes the [`asset-production/METHOD.md`](asset-production/METHOD.md)
evidence rule, claim guards, and §5 anti-slop checklist — the pipeline automates the *motion*,
not the *gate*.

## TIF-1110 — Cron strategy (single Vercel cron, state machine)

Constraint: **one** Vercel cron. Drive the lifecycle with a state machine, one transition per day:

| Day | Transition |
|---|---|
| Day 1 | Inbox → Opportunity |
| Day 2 | Opportunity → Research |
| Day 3 | Research → Draft |
| Day 4 | Draft → Review Queue |
| Day 5+ | Review reminder |

No additional cron infrastructure required.

## TIF-1111 — Rachel GPT integration (future, gated within this epic)

Rachel's ChatGPT environment can participate in *refinement* only:

```
Capture → Research → Draft → Rachel GPT Refinement → Review Queue → Todd Approval → Publish
```

Rachel GPT becomes a drafting participant. **Rachel GPT does not become the publisher.** Human
approval remains mandatory.

## Success criteria

A new observation can travel `Captured → Classified → Researched → Drafted → Refined → Reviewed →
Approved → Published` through a repeatable workflow **without manual orchestration** — e.g.
represented-seller second-opinion, lead-cites-buyer-strategy, AI-displacement conversation,
prior-authorization insight, CRE market observation.

## Strategic outcome

TIF evolves from `Evidence → Asset` to
`Observation → Evidence → Opportunity → Research → Draft → Refinement → Approval → Publish`,
creating a scalable content + marketing flywheel across Rachel Delray, CRE Intelligence, and TKO
Solutions — one shared evidence base, three proof domains, one production system.

---

# EPIC 12 — ASSET NORMALIZATION & CONTENT MIGRATION FRAMEWORK (TIF v0.2)

> **Status:** SANCTIONED NEXT — **analysis and migration planning only, not software.** Depends on
> the TIF v0.1 spine (Evidence Registry, Opportunity Registry, Asset Composer, Traceability), which
> exists. This epic produces documents (inventory, classification, evidence coverage, opportunity
> backlog, migration plan, template definitions, publication ownership model) — it does not build
> migration scripts, new schema, or cross-repo automation. See `GOVERNANCE.md` §2 (N2).

## Objective

Create a repeatable process for auditing, classifying, and mapping **existing** content across
`tko-site`, `rachel-realestate`, and `cre-intelligence` onto the v0.1 asset model
(`Evidence → Opportunity → Asset → Publication`), and a migration plan to bring it under TIF
governance with traceability preserved. The goal is normalization, not new content generation.

## Problem

Content exists across three repos with no unified taxonomy, no standard asset model, and no
migration strategy: duplication, evidence disconnected from outputs, and automation blocked.

## TIF-1201 — Phase 1: Repository Content Audit

Inventory content in `tko-site` (pages, articles, case studies, service pages, assessments,
reports, thought pieces), `rachel-realestate` (guides, relocation, comparison, buyer/neighborhood/
development resources), and `cre-intelligence` (market/intelligence reports, tenant-rep content,
healthcare-RE content, opportunity assessments). For every item: title, location, repo, current
format, current purpose.

## TIF-1202 — Phase 2: Asset Classification

Classify every item into exactly one primary type (secondary optional): `article`,
`landing_page`, `service_page`, `case_study`, `assessment`, `comparison_guide`,
`intelligence_report`, `executive_brief`, `thought_piece`, `proof_asset`.

## TIF-1203 — Phase 3: Evidence Mapping

For each asset, determine what evidence (existing `evidence.yaml` records, capture inbox items,
or undocumented support) backs it. Output: evidence coverage matrix — assets with evidence,
assets missing evidence, evidence without assets.

## TIF-1204 — Phase 4: Asset Opportunity Detection

Identify evidence with no corresponding asset (the inverse of TIF-1203). Output: ranked
(high/medium/low) opportunity backlog by business value — feeds the existing Asset Opportunity
Registry (EPIC 11 TIF-1103), it does not replace it.

## TIF-1205 — Phase 5: Canonical Template Definitions

For each asset type (including the four already templated in `asset-production/templates/` —
article, case-study, assessment, intelligence-report — plus the newly scoped `landing_page`,
`comparison_guide`, `executive_brief`, `thought_piece`, `proof_asset`), define purpose, required
sections, optional sections, evidence requirements, and CTA requirements. Extend existing
templates before authoring new ones.

## TIF-1206 — Phase 6: Migration Strategy

Per existing asset, assign a disposition: **Keep As-Is** (already aligned), **Normalize** (minor
structural change), **Rewrite** (wrong structure), **Decompose** (contains multiple assets), or
**Archive** (no longer useful).

## TIF-1207 — Phase 7: Publication Architecture

Define ownership: TIF owns evidence, opportunities, templates, and generated assets (the spine).
Publication layers own placement and voice — `tko-site` (consulting, healthcare, operational
intelligence), Rachel (relocation, real estate, comparisons, developments), CRE (market
intelligence, tenant representation, opportunity reports).

## TIF-1208 — Phase 8: Content Work Queue Integration (forward-compatibility only)

Migrated assets must be representable with `status: draft | review | approved | published |
archived` — the same lifecycle as `Asset.status` in the v0.1 spine (`prisma/schema.prisma`) and
the future Content Work Queue (EPIC 11 TIF-1102). No new workflow is implemented in this epic.

## Deliverables

A. Repository Content Inventory · B. Asset Classification Matrix · C. Evidence Coverage Matrix ·
D. Opportunity Backlog · E. Canonical Template Definitions · F. Migration Strategy ·
G. Publication Ownership Model · H. Recommended First 25 Assets To Normalize

**Completed:** [`archive/2026-06-28/TIF_V0.2_CONTENT_AUDIT.md`](archive/2026-06-28/TIF_V0.2_CONTENT_AUDIT.md)
delivers A–H across `tko-site`, `rachel-realestate`, `cre-intelligence`.

## Success criteria

Claude (or a human) can answer, for any piece of existing content: what it is, what type it is,
what evidence supports it, where it should live, what template it should use, and whether it
should be kept, normalized, rewritten, decomposed, or archived — and a legacy asset can be
migrated into the TIF asset model with traceability preserved. **Implementation of migration
tooling is explicitly out of scope for this epic.**

---

# BUSINESS SUCCESS CRITERIA

TIF is NOT successful because software exists.

TIF is successful when it produces:

- Publishable Articles
- Healthcare Stories
- Case Studies
- Assessment Assets
- Diagnostic Assets
- Consulting Offers

directly from captured operational knowledge.

The repository optimizes for intellectual property creation, not application complexity.
