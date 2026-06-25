TKO Intelligence Factory (TIF)

Engineering PRD v1

Status: Approved for MVP Development

Owner: Todd Kovalsky

Purpose:
Create a structured operational knowledge system that captures experiences, extracts patterns, generates reusable intelligence assets, and powers TKO content, assessments, case studies, and consulting offers.

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

AI Readiness

Workflow Maturity

Operational Visibility

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

