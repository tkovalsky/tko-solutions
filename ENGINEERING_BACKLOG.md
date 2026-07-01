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
> **Content operating model authority:** TIF is now documented as
> `Knowledge → Insight → Deliverable → Channel Package → Publication → Measurement` in
> [`docs/TIF_CONTENT_OPERATING_MODEL.md`](docs/TIF_CONTENT_OPERATING_MODEL.md). Existing
> `Evidence`, `Asset`, and `Artifact` language remains valid where it describes shipped records,
> proof-grade source material, or registry contracts. New planning should distinguish the core
> deliverable from channel packages and publications.
> **Content flywheel:** EPIC 11 (Content Intelligence Pipeline) is the canonical spec for the
> `Observation → … → Publish` flywheel across Rachel / CRE / TKO. Its **Capture Inbox** and **Asset
> Opportunity Registry** are part of the SANCTIONED-NEXT v0.1 spine; the full cron-driven automation
> (state machine, refinement cycles, Rachel GPT) is the sanctioned *direction* sequenced after the
> spine. It automates the already-real manual method in
> [`asset-production/METHOD.md`](asset-production/METHOD.md).
> **Domain-model authority:** [`docs/KNOWLEDGE_ARCHITECTURE_REVIEW.md`](docs/KNOWLEDGE_ARCHITECTURE_REVIEW.md)
> supersedes the Knowledge Core schema in this backlog (FailureMode collapses into
> `Pattern.kind`; Concept, Claim, Asset, and Evidence move into the MVP).
> **Execution authority:** TIF v0.3 adds the runtime execution contract:
> `Payload → Validation → Framework → Artifact → Fact Resolution → Template Population → Draft
> Generation → Voice Refinement → Review → Approval → Publish`. This operationalizes the existing
> registries and Asset Composer. It is not a new product, not client-facing SaaS, and not an agent
> framework.

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
| **Asset Composer** — template-fill generation of current assets and future deliverables such as articles / case studies / assessments / reports / comparison guides | EPIC 7 (TIF-701…706), EPIC 18 + `asset-production/templates/` | **Agent Framework** / autonomous multi-agent orchestration |
| **Execution Layer contract** — deterministic runtime path from payload validation through facts, template population, draft, voice refinement, and human review | EPIC 15 (TIF v0.3) + `TKO_INTELLIGENCE_FACTORY_PRD.md` | **Generic workflow platform** / autonomous publishing |
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
Knowledge → Insight → Deliverable → Channel Package → Publication → Measurement
```

The earlier `Observation → Evidence → Opportunity → Research → Draft → Refinement → Approval →
Publish` path remains the current v0.1/v0.2 implementation spine. The strategic operating model is
broader: a single insight can support multiple deliverables; one deliverable can produce multiple
channel packages; each channel package can produce one or more publications; measurement feeds the
next priority decision. This creates a scalable content + demand-generation flywheel across all
three proof domains. **Human approval stays mandatory; nothing auto-publishes and nothing
auto-distributes.**

## Goal

Transform Ideas / Observations / Market Signals / Client Conversations / Research into reusable
Knowledge and Insights, then into Deliverables, Channel Packages, Publications, and Measurement
feedback through a structured, governed workflow.

## Core workflow

```
Capture → Classification → Research → Deliverable Recommendation → Draft → Channel Package → Review → Approval → Publication → Measurement
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

A future `content_work_item` entity that tracks content through its production lifecycle. Do not
implement this entity in the documentation rebaseline.

- **Planning fields:** `id`, `title`, `business_unit`, `deliverable_type`, `content_archetype`,
  `source_knowledge`, `source_evidence`, `readiness_stage`, `owner`, `priority`, `next_action`,
  `channel_packages`, `publications`, `measurement_status`, `notes`.
- **Readiness stages:** `knowledge_ready` → `insight_ready` → `deliverable_draft_ready` →
  `channel_package_ready` → `publication_ready` → `measurement_active`.

## TIF-1103 — Phase 3: Classification

Daily processing assigns:

- `business_unit`: `rachel` | `cre` | `tko`
- `deliverable_type`: `guide` | `comparison` | `report` | `assessment` | `executive_brief` |
  `article` | `case_study` | `sales_asset` | `offer_asset` | `email_sequence` |
  `landing_page` | `ad_concept` | `social_post` | `reddit_post` | `linkedin_post` |
  `linkedin_carousel` | `facebook_post` | `facebook_ad` | `crm_next_touch_asset`
- `content_archetype`: `educational` | `comparison` | `decision_support` | `proof` |
  `authority` | `conversion`

Output: `asset_opportunity` records.

Migration note: the existing `asset_opportunity` storage term is retained. Future planning should
classify deliverables and archetypes even if the current implementation stores those as asset
opportunity metadata.

## TIF-1104 — Phase 4: Research / Knowledge Layer

Gather supporting knowledge before drafting: web research, market intelligence, supporting data,
counterarguments, related observations, CRM notes, conversations, transcripts, screenshots, metrics,
existing guides, case studies, reports, and proof records. Evidence remains the proof-grade subset
of this knowledge. Output stored alongside the work item:
`supporting_sources`, `related_patterns`, `counter_arguments`.

## TIF-1105 — Phase 5: Deliverable Recommendation

Determine and rank `recommended_deliverables` (`primary_deliverable`, `secondary_deliverables`) and
potential channel packages.

> Observation: *Represented seller called Rachel despite existing representation* →
> 1. Case Study  2. Sales Asset  3. LinkedIn Post

> Insight: *NJ retirees compare Boca and Delray before choosing where to buy* →
> 1. Comparison  2. SEO Page package  3. Email Sequence package  4. Facebook Ad package

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

Publication is distinct from channel packaging. A channel package is the reviewed adaptation for a
target channel; a publication is the rendered or deployed output such as a website URL, PDF, email
draft, CRM item, social draft, or ad creative.

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
`Knowledge → Insight → Deliverable → Channel Package → Publication → Measurement`, creating a
scalable content + demand-generation flywheel across Rachel Delray, CRE Intelligence, and TKO
Solutions — one shared knowledge base, three proof domains, one production system.

---

# EPIC 12 — ASSET NORMALIZATION & CONTENT MIGRATION FRAMEWORK (TIF v0.2)

> **Status:** SANCTIONED NEXT — **analysis and migration planning only, not software.** Depends on
> the TIF v0.1 spine (Evidence Registry, Opportunity Registry, Asset Composer, Traceability), which
> exists. This epic produces documents (inventory, classification, evidence coverage, opportunity
> backlog, migration plan, template definitions, publication ownership model) — it does not build
> migration scripts, new schema, or cross-repo automation. See `GOVERNANCE.md` §2 (N2).

## Objective

Create a repeatable process for auditing, classifying, and mapping **existing** content across
`tko-site`, `rachel-realestate`, and `cre-intelligence` onto the content operating model
(`Knowledge → Insight → Deliverable → Channel Package → Publication → Measurement`), while
preserving the current v0.1 implementation model (`Evidence → Opportunity → Asset → Publication`)
where it reflects shipped records. The goal is normalization, not new content generation.

## Problem

Content exists across three repos with no unified taxonomy, no standard asset model, and no
migration strategy: duplication, evidence disconnected from outputs, and automation blocked.

## TIF-1201 — Phase 1: Repository Content Audit

Inventory content in `tko-site` (pages, articles, case studies, service pages, assessments,
reports, thought pieces), `rachel-realestate` (guides, relocation, comparison, buyer/neighborhood/
development resources), and `cre-intelligence` (market/intelligence reports, tenant-rep content,
healthcare-RE content, opportunity assessments). For every item: title, location, repo, current
format, current purpose.

## TIF-1202 — Phase 2: Deliverable Classification

Classify every item into:

- A primary deliverable type: `guide`, `comparison`, `report`, `assessment`, `executive_brief`,
  `article`, `case_study`, `sales_asset`, `offer_asset`, `email_sequence`, `landing_page`,
  `ad_concept`, `social_post`, `reddit_post`, `linkedin_post`, `linkedin_carousel`,
  `facebook_post`, `facebook_ad`, `crm_next_touch_asset`.
- A content archetype: `educational`, `comparison`, `decision_support`, `proof`, `authority`,
  `conversion`.
- Optional current implementation alias: `asset_type` / `artifact_type` where needed for existing
  TIF records.

Comparison is classified as a first-class deliverable. `comparison_page` and `comparison_guide` are
channel/package or publication formats of the comparison deliverable, not the only comparison model.

## TIF-1203 — Phase 3: Evidence Mapping

For each asset, determine what evidence (existing `evidence.yaml` records, capture inbox items,
or undocumented support) backs it. Output: evidence coverage matrix — assets with evidence,
assets missing evidence, evidence without assets.

## TIF-1204 — Phase 4: Asset Opportunity Detection

Identify evidence with no corresponding asset (the inverse of TIF-1203). Output: ranked
(high/medium/low) opportunity backlog by business value — feeds the existing Asset Opportunity
Registry (EPIC 11 TIF-1103), it does not replace it.

## TIF-1205 — Phase 5: Canonical Deliverable and Channel Package Definitions

For each deliverable type and channel package type (including the four already templated in
`asset-production/templates/` —
article, case-study, assessment, intelligence-report — plus the newly scoped `landing_page`,
`comparison_guide`, `executive_brief`, `thought_piece`, `proof_asset`), define purpose, required
sections, optional sections, evidence requirements, and CTA requirements. Extend existing
templates before authoring new ones. The definition must distinguish core deliverable structure
from channel-specific requirements such as SEO metadata, PDF layout, social copy constraints, ad
creative requirements, email sequence steps, CRM next-touch usage, and sales collateral format.

**Status (2026-06-28): 4 of 5 originally-scoped gaps authored.** `templates/landing-page.md`,
`templates/comparison-guide.md`, and `templates/executive-brief.md` are now live, extending the
existing four with the same comment-header + frontmatter + section convention (no new mechanism).
`templates/one-pager.md` was added in addition to the original five (covers the "finalize
one-page offers" deliverable under `GOVERNANCE.md` ACTIVE A1). `thought_piece` and `proof_asset`
remain un-authored — still real gaps. All eight templates now also carry normalized frontmatter:
`business_unit`, `source_opportunity`, `voice` (see `asset-production/METHOD.md` §2). A worked
executive-brief example exists at
`asset-production/generated/prior-authorization-is-a-decision-rights-problem.md`.

## TIF-1206 — Phase 6: Migration Strategy

Per existing asset, assign a disposition: **Keep As-Is** (already aligned), **Normalize** (minor
structural change), **Rewrite** (wrong structure), **Decompose** (contains multiple assets), or
**Archive** (no longer useful).

## TIF-1207 — Phase 7: Publication Architecture

Define ownership: TIF owns evidence, opportunities, templates, and generated assets (the spine).
Publication layers own placement and voice — `tko-site` (consulting, healthcare, operational
intelligence), Rachel (relocation, real estate, comparisons, developments), CRE (market
intelligence, tenant representation, opportunity reports).

Publication architecture must explicitly separate:

- Deliverable: core producible artifact.
- Channel Package: channel-specific adaptation.
- Publication: rendered/deployed output.
- Measurement: performance and coverage feedback.

## TIF-1208 — Phase 8: Content Work Queue Integration (forward-compatibility only)

Migrated assets must be representable with `status: draft | review | approved | published |
archived` — the same lifecycle as `Asset.status` in the v0.1 spine (`prisma/schema.prisma`) and
the future Content Work Queue (EPIC 11 TIF-1102). They must also be mappable to staged readiness:
Knowledge Ready, Insight Ready, Deliverable Draft Ready, Channel Package Ready, Publication Ready,
and Measurement Active. No new workflow is implemented in this epic.

## Deliverables

A. Repository Content Inventory · B. Deliverable Classification Matrix · C. Evidence/Knowledge
Coverage Matrix · D. Opportunity Backlog · E. Canonical Deliverable and Channel Package
Definitions · F. Migration Strategy · G. Publication Ownership Model · H. Measurement Readiness
Map · I. Recommended First 25 Assets To Normalize

**Completed:** [`archive/2026-06-28/TIF_V0.2_CONTENT_AUDIT.md`](archive/2026-06-28/TIF_V0.2_CONTENT_AUDIT.md)
delivers A–H across `tko-site`, `rachel-realestate`, `cre-intelligence`.

## Success criteria

Claude (or a human) can answer, for any piece of existing content: what it is, what type it is,
what evidence supports it, where it should live, what template it should use, and whether it
should be kept, normalized, rewritten, decomposed, or archived — and a legacy asset can be
migrated into the TIF asset model with traceability preserved. **Implementation of migration
tooling is explicitly out of scope for this epic.**

---

# EPIC 13 — TIF OPERATOR CONSOLE v0.2 (OBSERVATION CAPTURE & CONTENT INVENTORY)

> **Status (2026-07-01):** Priority 1, Priority 2, Priority 4, and Priority 6 **shipped**. Priority 3 and
> Priority 5 below are **planned, not implemented** — documented here per the standing-rule that new scope gets
> recorded in the docs of record before (not instead of) building it. Do not build P3 or P5 until
> separately instructed.
>
> Naming note: this is the *software* counterpart to EPIC 12's TIF v0.2 — EPIC 12 was the
> markdown audit/analysis deliverable (`archive/2026-06-28/TIF_V0.2_CONTENT_AUDIT.md`); EPIC 13
> is the DB-backed Operator Console that implements TIF-1101 (Capture Inbox) and a Neon-backed
> counterpart to TIF-1201 (Repository Content Inventory).

## Shipped

**Priority 1 — Capture Inbox.** `/tif/inbox` — a capture-only form (title, observation,
business unit, source, tags; status defaults to `inbox`) writing to the `CaptureItem` model,
plus a read-only list of everything captured. No edit endpoint exists. Schema: `CaptureItem.note`
renamed to `observation` (data backfilled, not dropped) and `tags: String[]` added.

**Priority 2 — Content Inventory.** `scripts/tif/inventory-scan.mjs` (`npm run tif:inventory`)
walks `tko-site`, `rachel-realestate`, and `cre-intelligence` and upserts `ContentInventoryItem`
rows (title, location, repo, assetType, businessUnit) — 156 items as of the first run. `/tif/inventory`
renders them grouped by repo. Not linked into Evidence/Opportunity/Asset traceability — see EPIC 12
TIF-1203/1204 for that mapping, which remains a separate, not-yet-built deliverable.

**Priority 4 — Manual Edit Protection.** **Implemented 2026-07-01.** TIF-generated assets now
record `generatedAt` and `generatedHash` on the `Asset` row when composed. The console computes the
current markdown file hash before regeneration; if it differs from `generatedHash`, the asset is
treated as manually edited. For legacy rows without `generatedHash`, the console falls back to the
existing `Asset.updatedAt` timestamp and file mtime. Edited assets show a "Manual Edits Detected"
confirmation dialog with Cancel as the default action. The server action also blocks unconfirmed
regeneration of edited assets. Files changed: `prisma/schema.prisma`, `scripts/tif/compose-asset.mjs`,
`src/lib/tif/manual-edit-protection.ts`, `src/app/tif/actions.ts`, `src/app/tif/page.tsx`,
`src/app/tif/assets/[slug]/page.tsx`, `src/app/tif/regenerate-asset-form.tsx`,
`package.json`, `vitest.config.ts`, `vitest.setup.ts`, and migration
`prisma/migrations/20260701120000_add_asset_manual_edit_protection/migration.sql`. Tests added:
`src/lib/tif/manual-edit-protection.test.ts` and
`src/app/tif/regenerate-asset-form.test.tsx`.

**Priority 6 — Deliverable-Centric Production View.** **Implemented 2026-07-01.** `/tif/deliverables`
adds a deterministic production-management layer over the existing Evidence, Asset Opportunity, and
Asset records. It implements the missing operator answer to "what can be shipped?" without changing
storage or introducing content generation. Supported deliverable types: `executive_brief`,
`assessment`, `case_study`, `article`, `report`, `offer_asset`, and `sales_asset`. Readiness is
rules-only and returns a percentage plus missing components. Status is computed as `ready`,
`in_progress`, `blocked`, or `published`; `published` still comes only from the existing `Asset`
status. The dashboard reports Ready to Produce, Ready to Publish, Blocked, and Published, grouped by
deliverable type. Files changed: `src/lib/tif/deliverables.ts`,
`src/app/tif/deliverables/page.tsx`, and `src/app/tif/page.tsx`. Tests added:
`src/lib/tif/deliverables.test.ts`.

## Planned, not implemented (do not build without explicit instruction)

**Priority 3 — Asset Health.** Summary counts on the console: total Evidence/Opportunities/Assets,
Unconverted Evidence (Evidence with zero linked Assets), Opportunities Without Assets (status
still `opportunity`), Draft Assets, Published Assets. Read-only, no charts.

**Priority 5 — Traceability Improvements.** Better in-console visibility of Evidence → Opportunity
→ Asset counts and links than the v0.1 console's anchor-link approach. Read-only, no graph
visualization.

## Explicitly out of scope (unchanged from v0.1)

Approval workflow, publishing workflow, email notifications, cron jobs, scheduled generation, AI
generation, research agents, vector search, knowledge graph, framework registry, voice registry,
diagram engine, workflow orchestration.

---

# EPIC 14 — INTERACTIVE CONTENT ENGINE & PAGE TEMPLATE SYSTEM

> **Status:** Proposed · **Priority:** P1 — Growth & Lead Qualification ·
> **Classification:** BACKLOG (Phase 1 may be implemented when explicitly selected) ·
> **Requirements:** [`docs/INTERACTIVE_CONTENT_ENGINE_REQUIREMENTS.md`](docs/INTERACTIVE_CONTENT_ENGINE_REQUIREMENTS.md)
>
> **Governance:** This is a RachelDelray growth extension of the existing TIF Asset Composer and
> registry architecture, not a new product or client-facing SaaS. The split remains: Rachel-owned
> pages and lead-capture surfaces live in `rachel-realestate`; TIF owns the template definitions,
> module contracts, generated page artifacts, and traceability. No auto-publishing, no new CRM,
> no new lead routing system, no autonomous agents, and no per-page generators.

## Objective

Transform the TKO Report Tool from a report generator into a reusable content production and
qualification platform that can generate structured SEO pages and attach reusable interactive
modules. The engine should support community pages, comparison pages, relocation guides, buyer
guides, seller guides, lifestyle pages, and development pages while capturing representation-ready
lead signals.

Rebaseline note: EPIC 14 is a Rachel channel-package/publication initiative over core TIF
deliverables. **Comparison is the first-class deliverable.** Comparison pages, comparison guides,
PDFs, email sequences, social posts, and ads are channel packages or publications derived from the
same comparison deliverable.

## Flagship — Community Intelligence Assessment (Community-Match framework)

The named flagship of EPIC 14 Phase 1 is the **Community Intelligence Assessment**, a guided
RachelDelray experience built on the `rachel_community` **Community-Match** framework. It is the
first concrete RachelOS consumer of a TIF-composed asset (rachel `DECISIONS.md` DEC-49 / DEC-56;
ROS §0E.11).

**Community-Match framework contract:**

- **Inputs:** age · budget · timeline · lifestyle · golf · pickleball · social preferences ·
  full-time vs seasonal · new-construction preference.
- **Outputs:** recommended communities (4–5) · comparison guide · personalized report ·
  lead intelligence.

**Classification:** documentation-grade promotion only. The framework is fully specified here but is
**not** reclassified ACTIVE — doing so would breach the ≤3-active / ≤5-portfolio caps in
`GOVERNANCE.md`. A build requires **revenue validation + a new operator approval** (DEC-49). The
front end (lead-capture widget) is owned by `rachel-realestate`; TIF owns generation of the
comparison guide/report and its traceability. The RachelOS completion contract is **TIF-1409**.

## Product principles

- Page types are `ArtifactType` or template definitions, not bespoke generators.
- Comparison is a first-class deliverable type, not a subtype of article or only a page template.
- Interactive modules are reusable configuration-driven components, not page-specific logic.
- Assessment answers become structured lead intelligence, not just form submissions.
- Every generated page remains human-reviewable before publication.
- This extends the existing `Framework x Artifact x Voice` TIF model.

## TIF-1401 — Page Type Registry

Create canonical page/channel package definitions for:

- `community_page`
- `comparison_page`
- `relocation_guide`
- `buyer_guide`
- `seller_guide`
- `development_page`
- `lifestyle_page`

Each page type must define required sections, optional sections, SEO fields, CTA rules, FAQ rules,
internal link rules, related content rules, supported interactive modules, and supported voice
profiles.

For `comparison_page`, the registry must link back to the core `comparison` deliverable and preserve
the compared entities, decision criteria, source knowledge, claim guards, and recommended channel
packages.

Acceptance criteria:

- Operators can select a page type before generation.
- The selected page type determines the required page structure.
- Missing required sections fail validation before approval.
- Page type definitions are reusable across multiple pages.

## TIF-1402 — Page Template Contracts

Extend the template system so each page type has a canonical output contract:

- Community Pages: Hero, Community Overview, Lifestyle Fit, Homes & Pricing, Amenities, Pros,
  Cons, Similar Communities, FAQ, CTA.
- Comparison Pages: Hero, Quick Comparison Table, Cost Comparison, Lifestyle Comparison,
  Amenities Comparison, Buyer Recommendations, FAQ, CTA.
- Relocation Guides: Why People Move, Cost Differences, Taxes, Healthcare, Housing, Common
  Mistakes, Relocation Timeline, FAQ, CTA.
- Buyer Guides: Market Overview, Budget Expectations, Financing, Competition, Common Buyer
  Mistakes, FAQ, CTA.
- Seller Guides: Market Conditions, Pricing Strategy, Preparation Checklist, Timing
  Considerations, Common Seller Mistakes, FAQ, CTA.
- Development Pages: Builder Overview, Community Overview, Floorplans, Amenities, Pricing,
  Construction Timelines, FAQ, CTA.
- Lifestyle Pages: Lifestyle Overview, Benefits, Drawbacks, Recommended Communities, Cost
  Expectations, FAQ, CTA.

Acceptance criteria:

- Existing templates are extended before new mechanisms are introduced.
- Each template includes metadata for business unit, page type, module assignment, source
  opportunity, voice, and approval status.
- Templates support internal links, FAQ blocks, related content, and CTA variants.

## TIF-1403 — Interactive Module Registry

Define reusable interactive module contracts:

- `community_fit_assessment`
- `comparison_match_tool`
- `relocation_readiness_assessment`
- `buyer_readiness_assessment`
- `seller_readiness_assessment`
- `model_recommendation_tool`
- `lifestyle_match_assessment`

Each module definition must include supported page types, questions, input schema, scoring rules,
recommendation rules, output schema, lead-signal mapping, and CTA rules.

Acceptance criteria:

- The same module can be reused across multiple pages.
- Module logic is not hardcoded to a single community, city, or guide.
- Modules support radio selections, multi-select options, budget ranges, timeline ranges, and
  lifestyle preferences.
- Modules can output match scores, readiness scores, recommended communities, recommended
  content, and recommended next steps.

## TIF-1404 — Phase 1 Page Types

Implement the recommended first slice:

1. Community Pages.
2. Comparison Deliverables and Comparison Pages.
3. Relocation Guides.

Rationale: this sequence prioritizes the highest-value Rachel growth intents first. Community pages
capture specific neighborhood/development demand, comparison pages capture active decision-making,
and relocation guides capture timeline and readiness signals from out-of-state movers. Together
they prove the reusable page template system, interactive module assignment, and lead intelligence
capture model before expanding to buyer, seller, lifestyle, and development pages.

Acceptance criteria:

- Community pages can attach the Community Fit Assessment.
- Comparison deliverables can support Boca vs Delray, Delray vs Boynton, Valencia Sound vs Valencia
  Bay, GL Homes vs Toll Brothers, and 55+ vs All-Age Communities.
- Comparison pages can attach the Comparison Match Tool.
- Comparison channel packages can include SEO page, PDF, LinkedIn post, LinkedIn carousel, Facebook
  post, Facebook ad, Reddit post, email sequence, CRM next-touch asset, and sales one-pager.
- Relocation guides can attach the Relocation Readiness Assessment.
- Generated artifacts include FAQ, CTA, internal link recommendations, and related content
  recommendations.

## TIF-1405 — Lead Intelligence Capture

Capture structured visitor signals from completed modules.

Required fields:

- Assessment type.
- Completion date.
- Page URL and page type.
- Timeline.
- Budget range.
- Preferred communities.
- Match scores.
- Readiness scores.
- Recommended communities.
- Recommended content.
- Recommended next step.
- Contact/consent fields where collected.

Acceptance criteria:

- Completed assessments persist as structured records.
- Captured data can be exported or consumed by future CRM/routing integrations.
- This story does not implement new CRM, outreach automation, or lead routing.

## TIF-1406 — Operator Workflow Enhancements

Add TKO Report Tool support for:

- Page type selection.
- Section generation.
- Interactive module assignment.
- FAQ generation.
- CTA generation.
- Internal link recommendations.
- Related content recommendations.

Acceptance criteria:

- Operators can generate a complete page structure from a selected page type.
- The tool recommends a default interactive module based on page type.
- Operators can review and override CTA and related content recommendations before approval.

## TIF-1407 — Phase 2 Page Types

Add:

- Buyer Guides.
- Seller Guides.
- Lifestyle Pages.

Acceptance criteria:

- Buyer guides attach Buyer Readiness Assessment.
- Seller guides attach Seller Readiness Assessment.
- Lifestyle pages attach Lifestyle Match Assessment.
- Phase 2 modules write to the same lead intelligence capture model as Phase 1.

## TIF-1408 — Phase 3 Page Types & Personalization

Add:

- Development Pages.
- Model Recommendation Tool.
- Personalized recommendations.
- Dynamic content linking.

Acceptance criteria:

- Development pages attach Model Recommendation Tool.
- Recommendations can use available community/development metadata without creating a new search
  product.
- Dynamic linking remains reviewable and does not auto-publish.

## TIF-1409 — RachelOS Assessment Integration Contract

> **Status:** Specification (Discovery) · gated with the Community Intelligence Assessment on
> revenue validation + new operator approval (DEC-49). This story defines the eventual cross-repo
> contract; it does not authorize a build.

When a visitor completes the Community Intelligence Assessment, the flow must — with **no manual
copy/paste** — perform the following. Steps 1–4, 6–7 are owned by `rachel-realestate`; step 5 calls
TIF (this repo):

1. **Create / match a lead** via RachelDelray's existing guide-download capture (`leads` UPSERT — no
   new CRM or capture surface).
2. **Store the assessment answers** as structured signals on the lead (existing fact/event capture;
   no new scoring model, no new state machine).
3. **Generate an assessment summary** of the visitor's normalized inputs.
4. **Generate recommended communities** (4–5) via deterministic match — recommendations only; does
   not touch scoring, queue ranking, lifecycle, or relationship-state derivation.
5. **Create a TIF compose request:** `POST /api/tif/compose` with framework `rachel_community`,
   artifact `comparison_guide` (or `community_page`), voice `rachel`. TIF returns a reviewable
   draft only — it does not publish, write into `rachel-realestate`, or create CRM records
   (`docs/TIF_RACHEL_DRAFT_API.md`).
6. **Attach the generated report** to the lead as a content asset (existing `content_versions`
   pattern); the human-approval gate is retained — nothing auto-publishes.
7. **Surface the results in RachelOS** — matched communities, the report, and qualification signals
   appear on the lead and feed follow-up personalization (existing RIE/queue).

Acceptance criteria:

- The TKO side exposes the documented compose contract and returns a draft + `VERIFY` markers.
- No step in this contract publishes content or mutates RachelOS scoring/queue/lifecycle.
- The mirror of this contract lives in `rachel-realestate` ROS §0E.11.

## Success metrics

- Assessment completion rate.
- Lead conversion rate.
- Time on page.
- Pages per session.
- Consultation requests.
- Community page coverage.
- Comparison page coverage.

## Explicitly out of scope

New CRM, new predictive scoring models, new AI agent systems, new lead routing systems, outreach
automation, client-facing SaaS, vector search, knowledge graph expansion, and automatic publishing.

---

# EPIC 15 — TIF v0.3 EXECUTION LAYER

> **Status:** v0.1 scaffold AUTHORIZED & BUILT (2026-06-30) · **Priority:** P1 architecture
> alignment · **Classification:** SANCTIONED (integration boundary) — the operator lifted the build
> gate (`GOVERNANCE.md` §6).
>
> **Built (v0.1 scaffold):** `Payload → Validation → Run → Draft → Response` via
> `src/lib/tif/execution.ts` (`runCompose`), the shared `src/lib/tif/contract.ts`, and
> `POST /api/tif/compose` (now returns `{ runId, draftId, status, … }` alongside the existing
> markdown draft). Run/Draft identifiers are generated per request; **durable Run/Draft persistence
> is the next step** (the PRD runtime delivery spine — Run/Draft tables) and layers on top of this
> contract without changing it.
>
> **Governance:** The Execution Layer is the deterministic runtime contract that makes the existing
> registries operational. It is not a new product, not a new platform, not client-facing SaaS, and
> not an autonomous agent system. It preserves the one-composer rule and the human approval gate.
> Fact Resolution / Voice Refinement / Review→Publish remain documented future stages, not yet
> built.

## Objective

Formalize how a composition request becomes a reviewable draft:

```
Payload
→ Validation
→ Framework
→ Artifact
→ Fact Resolution
→ Template Population
→ Draft Generation
→ Voice Refinement
→ Review
→ Approval
→ Publish
```

This layer bridges the Framework Registry, Artifact Registry, Voice Registry, Prompt Registry, and
Asset Composer.

## TIF-1501 — Execution API Contract

Document the future composition endpoint:

```http
POST /api/tif/compose
```

Example payload:

```json
{
  "framework": "rachel_community",
  "artifact": "comparison_guide",
  "voice": "rachel",
  "inputs": {
    "communities": ["Valencia Sound", "Valencia Grand"],
    "county": "Palm Beach County",
    "budget": "750000-1200000"
  }
}
```

Request structure:

- `framework`: Framework Registry key.
- `artifact`: Artifact Registry key.
- `voice`: Voice Registry key.
- `inputs`: structured payload values to validate and resolve into facts.

Validation expectations:

- Registry keys exist.
- Framework allows the requested artifact.
- Required framework inputs are present.
- Required artifact facts can be resolved.
- Unsupported or unresolved claims block generation.

## TIF-1502 — Framework Registry Execution Fields

Extend framework definitions with:

- `required_inputs`
- `optional_inputs`
- `validation_rules`

Purpose: the execution engine must know whether a request is complete before generation begins.

Required examples:

- `rachel_community`
- `rachel_relocation`
- `rachel_buyer`
- `rachel_seller`

## TIF-1503 — Artifact Registry Section Contracts

Extend artifact definitions with:

- `required_sections`
- `optional_sections`
- `required_facts`

Example:

```yaml
comparison_guide:
  required_sections:
    - hero
    - quick_comparison
    - pricing
    - lifestyle
    - amenities
    - recommendations
    - faq
    - cta
```

Artifacts are structured outputs, not freeform text blobs. The composer populates sections.

## TIF-1504 — Fact Resolution Layer

Introduce a conceptual Fact Resolution Layer:

```ts
resolveFacts(payload, framework, artifact)
```

Responsibilities:

- Normalize payloads.
- Resolve structured facts.
- Prepare generation context.
- Prevent unsupported content generation.

Facts become the source of truth. The composer must not generate unsupported claims.

## TIF-1505 — Voice Registry Expansion

Extend voice profiles with:

- `tone`
- `avoid`
- `prefers`
- `cta_style`
- `faq_style`
- `perspective`

Voice remains configuration. Voice is not a generator.

## TIF-1506 — Prompt Registry

Create a documented Prompt Registry with:

- `key`
- `framework`
- `artifact`
- `voice`
- `version`

Prompts are versioned configuration. Prompts are not business logic.

## TIF-1507 — Draft Lifecycle

Document and eventually support:

```
draft → review → revision_requested → approved → published
```

Acceptance criteria:

- Revision history is preserved.
- Drafts are immutable versions.
- Review and approval remain human-controlled.

## TIF-1508 — Composer Architecture

Canonical composer contract:

```ts
compose(framework, artifact, voice, facts)
```

Explicitly prohibited:

- `CommunityPageGenerator`
- `ComparisonGuideGenerator`
- `AssessmentGenerator`
- `CaseStudyGenerator`
- Any equivalent per-output generator family.

All outputs are `Framework x Artifact x Voice` compositions through one composer.

## TIF-1509 — LLM Abstraction Layer

Document future model-agnostic interfaces:

```ts
generateDraft(context)
refineDraft(draft, voice)
```

No commitment is made to Anthropic, OpenAI, local models, or any specific provider.

## TIF-1510 — TIF Fact Registry (promoted to EPIC 16)

> **Status:** Future capability · **Do not design implementation in this phase.**
> **Promoted:** the Fact Registry is now a first-class initiative — see **EPIC 16** below. This
> story remains as the Execution-Layer touchpoint: the Fact Resolution Layer *consumes* the
> Fact Registry. EPIC 16 is the canonical definition.

Purpose: create canonical structured records for Rachel content facts:

- Communities.
- Developments.
- Neighborhoods.
- Cities.
- Counties.
- Guides.
- Lifestyle profiles.

Goal: allow all future Rachel assets to share the same fact base and prevent unsupported content
generation. The Fact Registry is a future capability supporting Fact Resolution; it is not part of
the current implementation scope.

## Success criteria

- TIF documentation can explain how a payload becomes a draft.
- Registries define eligibility, sections, facts, voice, and prompts.
- The composer remains singular and model-agnostic.
- Human review and approval remain mandatory before publication.

## Explicitly out of scope

Implementation, new infrastructure, production functionality changes, client-facing SaaS,
autonomous agents, new CRM, lead routing, outreach automation, vector search, knowledge graph
expansion, and automatic publishing.

---

# EPIC 16 — TIF FACT REGISTRY

> **Status:** Proposed · **Classification:** BACKLOG / future capability ·
> **Do not design implementation in this phase.** · **Sequenced after EPIC 15 (Execution Layer).**
>
> **Governance:** The Fact Registry is internal TIF data infrastructure, not a product, platform,
> client-facing SaaS, knowledge graph, or vector store. It is the canonical *source of truth* that
> the runtime **Fact Resolution Layer** (EPIC 15 / TIF-1510) consumes — the two are distinct: the
> Registry *stores* canonical facts; Fact Resolution *resolves a payload against them*. Building it
> is not authorized here; this epic defines the initiative.

## Objective

Create canonical, reusable, structured records that become the single source of truth for every
generated asset, so the same facts power SEO pages, reports, assessments, emails, social content,
and comparison guides — and so the composer can never invent unsupported pricing, community, or
market claims.

## Canonical record types

- Communities.
- Developments.
- Neighborhoods.
- Cities.
- Counties.
- Lifestyle profiles.
- Buyer personas.

(Supersedes the narrower TIF-1510 list by adding lifestyle profiles and buyer personas as
first-class record types.)

## Principles

- One fact, one canonical record — assets reference facts, they do not restate them.
- Facts carry verifiability/confidence so the approval and confidence gates (PRD Deliverable 4) can
  use them.
- The Fact Registry feeds **all three publication targets** (RachelDelray, TKO, CRE — `GOVERNANCE.md`
  §5), not only Rachel.
- No knowledge graph, no embeddings, no vector search (those remain DEFERRED).

## TIF-1601 — Fact record type definitions

Define the schema/contract for each canonical record type (fields, identity/slug, source refs,
verifiability, relationships to other facts). Configuration/spec only in this phase.

Acceptance criteria:

- Each record type has a documented field contract and identity rule.
- Records can express relationships (e.g. a community belongs to a city/county; a development sits
  in a community).
- Every fact can carry a source ref and verifiability tier.

## TIF-1602 — Fact Resolution binding

Document how the Execution Layer's Fact Resolution (TIF-1510) reads the registry: required-fact
resolution, fail-fast when a required fact is missing, and the rule that unresolved facts block
draft generation.

Acceptance criteria:

- The compose contract's `required_facts` resolve against registry records.
- A missing required fact stops execution before draft generation (no invented claims).

## Explicitly out of scope

Implementation, schema/migrations, new infrastructure, knowledge graph, vector search, embeddings,
client-facing SaaS, and automatic publishing.

---

# EPIC 17 — PUBLICATION INTEGRATION (DEFERRED)

> **Status:** Proposed · **Classification:** DEFERRED · **Do not build.**
>
> **Governance:** Documents the placement/distribution layer that sits *downstream* of TIF
> generation. It is DEFERRED because it touches the standing **no-auto-publish** gate and depends on
> the Execution Layer (EPIC 15), Fact Registry (EPIC 16), and the assessment integration (TIF-1409)
> shipping first. No autonomous distribution, ever, without a human approval gate.

## Objective

Define how generated, approved channel packages reach each publication target and, later, external channels —
while preserving the rule that **TIF generates and publication layers place/present**, and that a
human approves every publication.

This epic is downstream of EPIC 18's channel package model. TIF may prepare a channel package; the
publication layer owns the rendered/deployed publication.

## Publication targets and publication formats

| Target | Repo | Publication formats |
|---|---|---|
| RachelDelray | `rachel-realestate` | community/comparison/relocation/buyer/seller/lifestyle pages |
| TKO Site | `tko-site` | articles · assessments · executive briefs · case studies · one-pagers |
| CRE Intelligence | `cre-intelligence` | intelligence · market · opportunity reports |

## TIF-1701 — Publication adapters (deferred)

Per-target adapters that accept an approved asset and hand it to the target's own publishing
pipeline. TIF never writes into a publication repo directly; it exposes drafts/approved assets and
the target pulls them (today: `POST /api/tif/compose`, drafts only — `docs/TIF_RACHEL_DRAFT_API.md`).

## TIF-1702 — External distribution (deferred)

Google, Facebook, Email, YouTube, landing/community pages. **DEFERRED** behind the no-auto-publish
gate; every distribution requires explicit human approval. Roadmap Phases 8–10 in
`docs/CONTENT_PIPELINE_ROADMAP.md`.

## Explicitly out of scope

Any auto-publishing, autonomous distribution, client-facing SaaS, new CRM, or outreach automation.

---

# EPIC 18 — TIF CONTENT OPERATING MODEL REBASELINE

> **Status:** Documentation/backlog alignment · **Classification:** BACKLOG / docs only ·
> **Do not build.**
>
> **Authority:** [`docs/TIF_CONTENT_OPERATING_MODEL.md`](docs/TIF_CONTENT_OPERATING_MODEL.md)
> defines the model. This epic records the future backlog items created by the rebaseline. It does
> not authorize feature work, migrations, schema changes, new routes, production behavior changes,
> analytics integrations, or publishing automation.

## Objective

Rebaseline TIF as a complete content operating system:

```text
Knowledge → Insight → Deliverable → Channel Package → Publication → Measurement
```

## TIF-1801 — Complete Content Operating Model

Document the full operating model and its terminology.

Acceptance criteria:

- Docs define Knowledge, Insight, Deliverable, Channel Package, Publication, and Measurement.
- Docs explain how a deliverable differs from a channel package.
- Docs explain how a channel package differs from a publication.
- Docs include Rachel examples.
- Docs include TKO examples.

## TIF-1802 — Comparison Deliverable Support

Document future support for comparison deliverables.

Requirements:

- Comparison is a first-class deliverable type.
- Comparison readiness calculation is defined.
- Comparison production workflow is defined.
- Comparison publication support is defined.
- Comparison channel packages are defined.

Example comparisons:

- Boca vs Delray.
- Delray vs Boynton.
- Valencia Sound vs Valencia Bay.
- GL Homes vs Toll Brothers.
- 55+ vs All-Age Communities.

Acceptance criteria:

- Docs do not treat Comparison as an article subtype.
- Docs distinguish `comparison` deliverable from SEO page, PDF, social, email, ad, and CRM packages.
- Docs define readiness inputs: compared entities, decision criteria, source knowledge, proof/claim
  guards, audience, CTA, and publication target.

## TIF-1803 — Channel Package System

Document future support for generating channel-specific packages from a core deliverable.

Supported channel package types:

- SEO Page.
- PDF.
- LinkedIn Post.
- LinkedIn Carousel.
- Facebook Post.
- Facebook Ad.
- Reddit Post.
- Email Sequence.
- CRM Next-Touch Asset.
- Sales One-Pager.
- Landing Page.

Acceptance criteria:

- One deliverable can produce many channel packages.
- Each channel package has channel-specific requirements.
- Channel packages can be drafted, reviewed, approved, or published.
- Publications are tracked separately from packages.

## TIF-1804 — Content Coverage Intelligence

Document future coverage visibility.

Example:

```text
Topic: Delray

Guides: 12
Comparisons: 8
Reports: 2
Assessments: 0
Case Studies: 0
Email Sequences: 4
Facebook Ads: 3
LinkedIn Posts: 5

Coverage: 55%
```

Acceptance criteria:

- Coverage can be viewed by topic.
- Coverage can be viewed by funnel stage.
- Coverage can be viewed by archetype.
- Coverage can be viewed by channel.
- Coverage can identify missing deliverables.

## TIF-1805 — Deliverable Readiness Model

Replace binary readiness thinking with staged readiness.

Readiness stages:

- Knowledge Ready.
- Insight Ready.
- Deliverable Draft Ready.
- Channel Package Ready.
- Publication Ready.
- Measurement Active.

Acceptance criteria:

- Docs define each readiness stage.
- Docs explain blocked states.
- Docs include examples of ready, partially ready, and blocked deliverables.

## TIF-1806 — Scenario-Based Validation Framework

Document future validation around realistic business scenarios, not only synthetic records.

Example scenario:

```text
Scenario:
NJ Couple Relocating

Knowledge:
- Current location
- Budget
- Timeline
- Preferred lifestyle
- Tax concerns
- Community preferences

Expected Deliverables:
- Delray Relocation Guide
- Boca vs Delray Comparison
- Rent Before Buying Decision Guide
- Florida Tax Explainer
- Relocation Consultation CTA

Expected Channel Packages:
- SEO page
- Email sequence
- Facebook ad
- LinkedIn post
- CRM next-touch asset
```

Another scenario:

```text
Scenario:
Healthcare Governance Assessment

Knowledge:
- Fragmented ownership
- Manual status reporting
- Defect aging
- Intake confusion
- Executive visibility gaps

Expected Deliverables:
- Assessment
- Executive Brief
- Case Study
- Sales Asset
- LinkedIn Post
```

Acceptance criteria:

- Docs define scenario-based validation.
- Docs identify expected outputs.
- Docs distinguish validation from implementation.
- No test framework implementation yet.

## TIF-1807 — Measurement Feedback Loop

Document future measurement integration.

Measurement inputs:

- Google Search Console.
- GA4.
- Meta Ads.
- CRM usage.
- Email engagement.
- Guide downloads.
- Lead conversion.
- Manual operator feedback.

Acceptance criteria:

- Docs explain how measurement informs future deliverables.
- Docs explain how stale content should be flagged.
- Docs explain how high-performing topics should trigger expansion.

## Strategy Priorities

Rachel / relocation content priority:

1. Comparison.
2. Decision Support.
3. Proof.
4. Educational.
5. Authority.
6. Conversion.

TKO / consulting content priority:

1. Case Study.
2. Assessment.
3. Report.
4. Executive Brief.
5. Authority Article.
6. Sales Asset.

## Explicitly out of scope

Feature implementation, schema changes, migrations, new database tables, new routes, production
behavior changes, automated publishing, autonomous distribution, analytics integration, CRM
integration, or a new test framework.

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
