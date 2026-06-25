TKO Intelligence Factory (TIF)

Engineering PRD v2

Status: Approved for MVP Development — v2 architecture: Registry & Artifact Engine

Owner: Todd Kovalsky

North star: This PRD builds toward the future state in [`CURRENT_REALITY.md`](CURRENT_REALITY.md). Data-model authority: [`docs/KNOWLEDGE_ARCHITECTURE_REVIEW.md`](docs/KNOWLEDGE_ARCHITECTURE_REVIEW.md) (see its §12 addendum for the v2 alignment).

Purpose:
Create a structured operational knowledge system that captures experiences, extracts patterns, generates reusable intelligence assets, and powers TKO content, assessments, case studies, and consulting offers.

⸻

# TIF v2 ARCHITECTURE — REGISTRY & ARTIFACT ENGINE (CANONICAL)

This section supersedes any v1 framing that implies per-output generators or a `Questions → Report` pipeline. Where v1 sections below (Asset Generation, Phase 3 Asset Factory, Phase 5 Assessment Engine) describe "Article Generation / Assessment Generation / Case Study Generation" as distinct pipelines, read them as **entries in a registry consumed by one engine**, not as separate generators.

## The one rule

TIF must never contain `RachelReportGenerator`, `PAReportGenerator`, `RecoveryAssessmentGenerator`, `CaseStudyGenerator`, or any other per-output generator class.

TIF contains exactly **one** generation pathway and **three configuration registries**:

- **Framework Registry** — what to ask, find, recommend, score, and diagram (the domain logic).
- **Artifact Registry** — what to emit and how it must be shaped/approved (the output contract).
- **Voice Registry** — how the output reads (tone/terminology/level/format — configuration only).

Every output TKO or Rachel Delray needs is a **composition**: `Framework × Artifact × Voice`, run through the same engine. New businesses, assessments, reports, and content types are **new registry rows, not new applications.**

## The universal pipeline (replaces `Questions → Report`)

```
COLLECT                         ANALYZE                              GENERATE
Question → Answer  →  Evidence  →  Finding  →  Recommendation   →   Artifact
            (capture)  (substantiate) (per Framework            (compose per
                                       finding_rules)            Artifact type × Voice)
```

- **Collect:** a Framework's question sets are asked; Answers are captured; Answers + external inputs (documents, repos, metrics, interview notes) become **Evidence**.
- **Analyze:** the Framework's `finding_rules` turn Evidence into **Findings** (each with a confidence and optional risk tier); `recommendation_rules` turn Findings into **Recommendations**.
- **Generate:** the single composer renders one or more **Artifacts** — `compose(run, artifact_type, voice)` — pulling structure from the Artifact Registry and tone/terminology from the Voice Registry.

There is one `compose()`. Article, assessment, case study, diagram, one-pager, newsletter, landing page, executive brief, and report are all **artifact types**, not code paths.

## Deliverable 1 — Updated architecture (the engine)

Three stages, three registries, one composer. The engine is domain-agnostic:

| Layer | Responsibility | Pluggable via |
|---|---|---|
| Collect | Ask questions, capture answers, derive evidence | Framework Registry (`question_sets`) |
| Analyze | Evidence → Findings → Recommendations (+ confidence, optional scoring) | Framework Registry (`finding_rules`, `recommendation_rules`, `scoring_rules`) |
| Generate | Compose findings/recommendations/knowledge into an artifact | Artifact Registry (structure/inputs/approval) × Voice Registry (tone/terms) |

A **Run** (engagement/job) is the traceability container: `{framework, subject/business, inputs} → evidence → findings → recommendations → [artifacts]`. The same Run can emit multiple artifacts (e.g. one `operational_recovery` run → an `assessment` + an `executive_brief` + a `current_state` and `future_state` `diagram`) with **no additional generators** — just additional `compose()` calls over the same findings.

## Deliverable 2 — Updated domain model

Three layers. The durable knowledge graph is unchanged from the Knowledge Architecture Review; v2 adds a runtime delivery spine and a configuration layer around it.

**A. Durable knowledge graph** *(unchanged — Knowledge Architecture Review §5, MVP 8 entities)*
Experience · Evidence · Observation · Concept · Pattern *(kind: insight|failure|anti_pattern|play — absorbs FailureMode)* · Claim · Audience · **Artifact** *(≡ the Review's "Asset"; adopt the term "Artifact" going forward)*. Expansion: Framework · Capability · GovernanceModel · Decision · Offer.

**B. Runtime delivery spine** *(new — formalizes the Review's Assessment→Finding→Experience bridge and the assessment-delivery graph in `docs/DATA_MODEL.md`)*

| Entity | Key fields | Traces to |
|---|---|---|
| **Run** | id, framework_ref, subject/business, voice_ref, inputs, status, created_at | — |
| **Question** | id, framework_ref, prompt, dimension, response_type | Framework |
| **Answer** | id, run_ref, question_ref, value, respondent, captured_at | Question, Run |
| **Evidence** | id, type, source, uri, verifiability, confidentiality | Answer · Experience · external |
| **Finding** | id, run_ref, framework_ref, statement, dimension, risk_tier?, **confidence** | Evidence[] (`derived_from`) |
| **Recommendation** | id, finding_refs[], statement, priority, effort | Finding[] (`derived_from`) |
| **Artifact** | id, type, framework_ref, voice_ref, run_ref, body, status, **confidence**, source_refs[] | Findings/Recommendations/Evidence/Claims |

Mandatory edges (traceability): `Answer→Question`, `Evidence→Answer`, `Finding→Evidence`, `Recommendation→Finding`, `Artifact→{Finding,Recommendation,Evidence,Claim}`, and `Finding→Experience` (feedback loop; delivery refines the corpus).

**C. Configuration registries** *(new — data/config, not graph nodes; versioned in repo)*
`FrameworkDefinition` · `ArtifactType` · `VoiceProfile` (defined below).

## Deliverable 3 — Registry design

### Framework Registry
Each `FrameworkDefinition` is configuration (YAML/JSON in repo, mirrored to a `framework_definitions` table):

| Field | Meaning |
|---|---|
| `key` | `operational_recovery`, `prior_authorization`, `rachel_relocation`, `commercial_expansion`, `case_study`, `authority_content`, … |
| `question_sets` | ordered questions by dimension (sourced from `docs/QUESTION_LIBRARY.md`) |
| `finding_rules` | how Evidence → Findings; reference Concepts/Patterns (e.g. `Pattern{kind:failure}` "Human API") |
| `recommendation_rules` | how Findings → Recommendations (priority/effort) |
| `scoring_rules` *(optional)* | e.g. the 7-dimension knowledge-concentration sub-module, or PA Gold Card readiness. **Optional per framework.** |
| `diagram_rules` | which diagram types this framework emits, and from what inputs |
| `artifact_eligibility` | which Artifact types this framework may produce |
| `default_voice` | default VoiceProfile (overridable per Run) |

Example rows:

| key | question_sets | scoring | diagram_rules | artifact_eligibility |
|---|---|---|---|---|
| `operational_recovery` | workflow visibility, ownership, process adherence, decision latency, reporting, automation, AI readiness, knowledge concentration | optional (dependency index) | current_state, future_state, dependency_map | assessment, executive_brief, one_pager, diagram, report |
| `prior_authorization` | PA submissions, denials, exceptions, payer mix, staffing, dependency | optional (Gold Card readiness) | pa_workflow, current_state, future_state | assessment, one_pager, diagram, report, executive_brief |
| `case_study` | — (uses Experience + Findings) | none | optional architecture/flow | case_study, article |
| `authority_content` | — (uses Concept + Claim + Pattern) | none | optional explainer | article, newsletter, landing_page |
| `rachel_relocation` *(future)* | buyer/relocation intake | none | optional area/journey | article, landing_page, newsletter |
| `commercial_expansion` *(future CRE)* | market/entity/opportunity intake | optional | market/comparison | report, diagram, article |

### Artifact Registry
Each `ArtifactType` defines the output contract:

| key | required inputs | supported frameworks | output structure | approval |
|---|---|---|---|---|
| `assessment` | Run with Findings + Recommendations | assessment frameworks | findings → risk → recommendations → 90-day plan | human (client material) |
| `report` | Findings + Evidence | any | exec summary → analysis → evidence appendix | human |
| `case_study` | Experience + Findings + Evidence | case_study | situation → discovery → system → change → proof matrix | human |
| `article` | ≥1 Claim + Pattern (+Evidence) | authority_content, any | hook → POV → pattern → proof → CTA | review |
| `executive_brief` | Findings + top Recommendation | any assessment | 1-page: problem → findings → next move | human |
| `one_pager` | Offer/Framework summary + proof | any | problem → who → deliverables → outcome → CTA | review |
| `diagram` | Findings / workflow / process description | frameworks with `diagram_rules` | nodes/edges (see Diagram Generation) | review |
| `landing_page` | article/offer blocks + CTA | content frameworks | conversion sections | review |
| `newsletter` | ≥1 Claim/Pattern/Asset | content frameworks | issue sections + links | review |

`required_inputs` are enforced by the engine before `compose()` runs (an `article` with no Claim fails fast; an `assessment` with no Findings fails fast).

### Voice Registry
Each `VoiceProfile` is **configuration only** — applied at Generate, never a separate generator:

| key | tone | terminology | reading level | formatting / narrative |
|---|---|---|---|---|
| `todd` | operator-to-operator, skeptical-of-hype | "Operational Knowledge Systems"; avoid "Operational Intelligence" externally; "Human API" = a finding | senior/exec | concrete, evidence-led, first-person practitioner |
| `executive` | crisp, decision-oriented | risk, dependency, next move | exec | short, scannable, no jargon |
| `rachel` *(future)* | warm, relational | consumer real-estate language | general consumer | story-led, reassuring |
| `consumer` | plain, friendly | no operator jargon | general public | short paragraphs, approachable |

Switching `todd → rachel` changes a config reference on the Run. It does not touch the engine.

## Deliverable 4 — Artifact lifecycle

States: `draft → review → approved → published → retired` (+ `superseded`).

- **Approval gating** is set by `ArtifactType.approval` × `confidentiality`: any artifact derived from `client_confidential` evidence requires human approval before `approved` (mirrors RachelOS's human-in-the-loop principle). Public content requires `review`.
- **Confidence is exposed** on every artifact, derived from the aggregate verifiability of its source Findings/Evidence (`verified > self_reported > anecdotal`). Low-confidence artifacts cannot reach `published` without explicit override.
- **Full traceability** is stored on every artifact via `source_refs`, enabling the audit chain `Question → Answer → Evidence → Finding → Recommendation → Artifact`. A Finding with no Evidence, or a Recommendation with no Finding, is invalid and blocks generation.
- **Versioning:** artifacts are immutable per version; regeneration (new voice, new framework revision) creates a new version linked to the same Run.

## Deliverable 5 — Migration recommendations (no code in this task)

Pre-implementation, so "migration" = how the documented plan and the eventual schema evolve from v1:

1. **Reframe Phase 3 (Asset Factory) and Phase 5 (Assessment Engine)** from per-type generators into **one composer + three registries.** Their "generation" deliverables become registry seed data, not pipelines.
2. **Adopt `Artifact`** as the canonical term for the Review's `Asset`; document the alias once, then use Artifact everywhere.
3. **Add configuration tables/files:** `framework_definitions`, `artifact_types`, `voice_profiles` (seeded as versioned repo data first; promote to tables when dynamic editing is needed).
4. **Add the runtime delivery spine:** `run`, `question`, `answer`, `finding`, `recommendation` (Artifact already exists in the Review MVP as Asset). Add `confidence` to `finding` and `artifact`.
5. **Add Diagram as `ArtifactType{key: diagram}`** plus a renderer (Mermaid first; SVG/PNG/markdown export) — **not** a new generator.
6. **Confirm `FailureMode` is collapsed into `Pattern.kind`** (Review §4); framework `finding_rules` reference `Pattern{kind: failure}`.
7. **Keep phase-gating discipline**, but the gate for the generation phase becomes: *one artifact of two different types produced from one Run with full traceability and a confidence score* — proving the composer, not a generator.

## Diagram generation (first-class artifact)

Diagrams are `ArtifactType{key: diagram}`, produced by the same engine from structured inputs — never hand-built per framework.

- **Inputs:** Findings, workflow descriptions, process descriptions, interview responses (Answers).
- **Outputs (diagram subtypes):** workflow, operating_model, current_state, future_state, dependency_map, decision_tree.
- **Formats:** Mermaid (canonical/source of truth), SVG, PNG (rendered), and inline markdown diagrams. The model emits Mermaid as the structured representation; SVG/PNG are render targets.
- **Driven by** each Framework's `diagram_rules` (e.g. `operational_recovery` → current_state + future_state + dependency_map; `prior_authorization` → pa_workflow).

## Validation — 11 priorities, one engine, zero new generators

| # | Priority | Framework | Artifact type(s) | Voice |
|---|---|---|---|---|
| 1 | Operational Recovery Assessment | `operational_recovery` | assessment + executive_brief + diagram | executive/todd |
| 2 | RachelOS flagship case study | `case_study` | case_study | todd |
| 3 | Human API dependency findings | `operational_recovery` / `prior_authorization` | *(Finding type, not an artifact)* — via `finding_rules` → Concept "Human API" / `Pattern{kind:failure}` | — |
| 4 | Human API definition article | `authority_content` | article | todd |
| 5 | PA Assessment framework | `prior_authorization` | assessment + one_pager + diagram (optional Gold Card scoring) | executive |
| 6 | Authority articles | `authority_content` | article / newsletter | todd |
| 7 | Executive briefs | any assessment framework | executive_brief | executive |
| 8 | Workflow diagrams | framework `diagram_rules` | diagram (mermaid/svg/png) | — |
| 9 | One-pagers | `operational_recovery` / `prior_authorization` | one_pager | executive |
| 10 | Future Rachel relocation content | `rachel_relocation` *(new row)* | article / landing_page / newsletter | rachel/consumer |
| 11 | Future CRE intelligence reports | `commercial_expansion` *(new row)* | report + diagram | executive |

Every priority is a `{Framework × Artifact × Voice}` composition over the single pipeline. #10 and #11 — entirely different businesses — are **new registry rows, not new applications.** This is the proof the architecture meets the brief.

⸻

# v1 REFERENCE (below) — read through the v2 lens above

⸻

Problem Statement

Today Todd’s knowledge exists across:

* healthcare transformation work
* Cognizant engagements
* Optum/UHC programs
* RachelOS development
* CRE Intelligence development
* client conversations
* notes
* documents
* articles
* ChatGPT conversations

The knowledge is fragmented.

Patterns are repeatedly rediscovered.

Content creation is manual.

Case studies are difficult to assemble.

Consulting assets are not systematically generated.

The goal is to create a single source of truth for operational knowledge.

⸻

Product Vision

Capture:

Experience

Transform into:

Pattern
Failure Mode
Framework
Governance Model
Capability

Generate:

Articles
Case Studies
Assessments
Diagnostic Assets
LinkedIn Posts
Offers

Support:

TKO Growth
Healthcare Positioning
Thought Leadership
Consulting Revenue

⸻

Non Goals (V1)

No SaaS product

No multi-user support

No customer-facing portal

No billing

No subscriptions

No workflow engine

No CRM

No agent orchestration framework

No autonomous actions

⸻

Core Entities

Experience

Represents a real-world event, project, program, observation, or engagement.

Fields:

id
title
source
industry
organization
summary
narrative
lessons
tags
created_at
updated_at

Examples:

UHC Prior Authorization Program

RachelOS Development

Bluebolt Governance Workflow

Provider Operations Transformation

⸻

Observation

A discrete insight extracted from experience.

Fields:

id
experience_id
statement
context
confidence
tags

Example:

One person understood all approval paths.

⸻

Pattern

Recurring operational behavior.

Fields:

id
name
description
symptoms
root_causes
consequences
mitigations

Examples:

Human API

Dependency Blindness

Governance Theater

Operational Memory Loss

⸻

Failure Mode

Specific operational breakdown.

Fields:

id
name
description
indicators
causes
impacts
remediation

⸻

Framework

Reusable operating model.

Fields:

id
name
purpose
components
workflow
examples

Examples:

Signals → Memory → Facts → State → Priority → Action → Outcome

Transformation Recovery Model

⸻

Governance Model

Fields:

id
name
scope
decision_rights
approval_model
escalation_model
controls

⸻

Capability

Fields:

id
name
description
architecture
evidence
maturity

Examples:

Relationship Intelligence

Fact Extraction

Journey Engines

Decision Support

Operational Queues

⸻

Relationships

Experience
→ Observations

Observation
→ Patterns

Pattern
→ Failure Modes

Pattern
→ Frameworks

Framework
→ Governance Models

Capability
→ Frameworks

Pattern
→ Articles

Pattern
→ Assessments

Pattern
→ Offers

⸻

AI Requirements

Claude Usage

Primary reasoning engine.

Responsibilities:

Observation Extraction

Pattern Detection

Failure Mode Identification

Framework Generation

Article Drafting

Assessment Question Creation

Case Study Drafting

Prompt templates must be stored in repository.

⸻

Vector Search

Purpose:

Find similar experiences.

Questions supported:

Have I seen this before?

What patterns relate to this observation?

What frameworks apply?

Collections:

Experiences

Observations

Patterns

Failure Modes

Frameworks

Articles

Implementation:

pgvector

OpenAI embeddings or equivalent

⸻

Asset Generation

> SUPERSEDED FRAMING: the per-type "Article/Assessment/Case Study Generation" below are not separate generators. They are `ArtifactType` entries composed by the single engine in "TIF v2 ARCHITECTURE" above. Treat each "Input → Output" pair as an Artifact Registry contract, not a code path.

Articles

Input:

Pattern

Output:

Long-form article

Example:

Human API
→
The Most Important System In Your Organization Probably Isn’t A System

⸻

Assessment Questions

Input:

Pattern

Output:

Diagnostic question set

Example:

Human API

Question:

Would critical work stop if one employee left?

⸻

Case Studies

Input:

Experience + Pattern

Output:

Evidence-based case study

⸻

Technical Stack

Next.js

TypeScript

Postgres

Prisma

pgvector

OpenAI/Claude integration

Tailwind

shadcn/ui

⸻

MVP Screens

Dashboard

Experience Library

Pattern Library

Framework Library

Assessment Library

Generated Assets

Search

AI Workbench

⸻

Success Criteria

System contains:

25+ Experiences

50+ Observations

20+ Patterns

10+ Frameworks

10+ Governance Models

25+ Assessment Questions

5+ Long-form Articles

3+ Case Studies

Generated directly from the knowledge model.

⸻

Phase 1 Deliverables

Repository Created

Database Schema

Prisma Models

CRUD APIs

Experience Capture UI

Pattern Library UI

Vector Search

Claude Integration

Article Generation

Assessment Generation

Seed Data Import

⸻

Phase 2 Deliverables

Healthcare Story Library

Human API Library

Transformation Recovery Library

Administrative Burden Library

Enterprise Value & Exit Readiness Library

Offer Generation

Assessment Report Generation

TKO Content Publishing Integration

⸻

Guiding Principle

The system is not a CMS.

The system is not a note-taking application.

The system is a structured operational knowledge factory that converts experience into reusable intellectual property.

IMPLEMENTATION GOVERNANCE

This section supersedes any ambiguity in the Product Vision.

The purpose of this section is to constrain implementation scope, reduce architecture drift, and ensure the system delivers business value before platform complexity.

⸻

Development Philosophy

TIF is being developed as an intelligence asset platform, not a software product.

The objective is not to build:

* a CMS
* a note-taking application
* a second-brain tool
* an AI chat application
* a SaaS platform

The objective is to build:

A structured operational knowledge system that converts experience into reusable intellectual property.

Every feature must support one or more of the following outcomes:

* Content Creation
* Case Study Creation
* Assessment Creation
* Consulting Offer Creation
* Thought Leadership
* Revenue Generation

Features that do not support these outcomes should be deferred.

⸻

Implementation Sequence

Development must occur in phases.

Future phases must not begin until current phases are complete and validated.

⸻

PHASE 1 — Knowledge Core

Status: Approved

Objective:

Capture operational knowledge in a structured format.

This phase intentionally excludes AI generation, vectors, frameworks, assessments, and publishing.

⸻

Scope

Implement:

Experience

Observation

Pattern

FailureMode

⸻

Deliverables

Database schema

Prisma models

CRUD APIs

CRUD UI

Relationship management

Basic text search

Seed data import

⸻

Success Criteria

System contains:

25+ Experiences

50+ Observations

20+ Patterns

10+ Failure Modes

derived from:

* Healthcare Transformation
* Optum/UHC
* Cognizant
* RachelOS
* CRE Intelligence

⸻

Explicit Exclusions

No AI

No embeddings

No vector search

No article generation

No assessment generation

No publishing

No governance models

No framework library

No capability library

⸻

PHASE 2 — Knowledge Expansion

Status: Blocked until Phase 1 complete

Objective:

Add reusable intellectual property structures.

⸻

Scope

Framework

GovernanceModel

Capability

Decision

Evidence

⸻

Deliverables

Schema

Relationships

CRUD

Search

Visualization

⸻

Success Criteria

10+ Frameworks

10+ Governance Models

15+ Capabilities

25+ Evidence Records

⸻

PHASE 3 — Asset Factory

Status: Blocked until Phase 2 complete

Objective:

Generate reusable assets from structured knowledge.

⸻

Asset Types

Article

CaseStudy

AssessmentQuestion

LinkedInPost

Offer

DiagnosticAsset

⸻

AI Requirements

Claude is primary generation engine.

All outputs must be reviewable.

No automatic publishing.

Human approval required.

⸻

Deliverables

Prompt library

Generation pipelines

Asset review workflow

Asset storage

Asset version history

⸻

Success Criteria

Generate:

5 articles

3 case studies

25 assessment questions

10 LinkedIn drafts

from structured knowledge records.

⸻

PHASE 4 — Healthcare Story Library

Status: Blocked until Phase 3 complete

Objective:

Create TKO’s healthcare proof repository.

⸻

Required Story Categories

Human API

Prior Authorization

Administrative Burden

Transformation Recovery

Governance Breakdown

AI Adoption Failure

Workflow Modernization

Operational Visibility

Enterprise Value & Exit Readiness

⸻

Deliverables

Story templates

Evidence linkage

Healthcare case study generation

Healthcare article generation

Healthcare diagnostic support

⸻

PHASE 5 — Assessment Engine

Status: Blocked until Phase 4 complete

Objective:

Create revenue-generating assessment assets.

⸻

Assessment Types

Human API Risk

Transformation Recovery

Administrative Burden

Prior Authorization Operational Assessment

AI Readiness

Workflow Maturity

Operational Visibility

Enterprise Value & Exit Readiness

⸻

Deliverables

Question libraries

Scoring models

Finding generation

Recommendation generation

Executive report generation

PDF export

⸻

PHASE 6 — Vector Intelligence

Status: Blocked until Phase 5 complete

Objective:

Improve discovery across the knowledge graph.

⸻

Questions Supported

Have I seen this before?

What patterns are similar?

What stories relate?

What frameworks apply?

What assessments apply?

⸻

Collections

Experience

Observation

Pattern

FailureMode

Framework

CaseStudy

Article

⸻

Deliverables

Embedding pipeline

pgvector integration

Semantic search

Related-content engine

Similarity recommendations

⸻

Required Seed Libraries

Before any advanced AI features are implemented, the following seed content must exist.

Human API Library

Administrative Burden Library

Transformation Recovery Library

AI Adoption Library

Governance Failure Library

Enterprise Value & Exit Readiness Library

RachelOS Experience Library

Healthcare Transformation Library

CRE Intelligence Library

These libraries represent the initial intellectual property corpus.

⸻

Definition of Done

TIF is not considered successful because software exists.

TIF is successful when it produces:

* Publishable Articles
* Healthcare Stories
* Assessment Assets
* Diagnostic Assets
* Consulting Offers

directly from captured operational knowledge.

The repository should optimize for intellectual property creation, not application complexity.
