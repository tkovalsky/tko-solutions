# TKO Intelligence Factory (TIF)
## Engineering Backlog v1
Status: Approved for Implementation
Owner: Todd Kovalsky

> **North star:** This backlog builds toward the future state defined in
> [`CURRENT_REALITY.md`](CURRENT_REALITY.md). TIF is the internal engine that produces the
> proof, content, and assessment assets that document requires — not a product TKO sells.
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
