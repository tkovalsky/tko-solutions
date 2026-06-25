# Product Requirements Document: Human API Risk Assessment

## Product Definition

Human API Risk Assessment is a diagnostic and advisory offering that identifies operational dependency on individuals who function as memory, routing, escalation, decision translation, and institutional knowledge layers for the organization.

The offering produces an evidence-based view of where work depends on people instead of governed workflows, systems, decision models, and reusable knowledge assets.

This PRD defines the assessment baseline only. It does not define application code, infrastructure, database implementation, or a frontend.

## Problem Statement

Organizations cannot reliably improve workflows, modernize operations, or adopt AI when critical workflow knowledge lives inside people rather than systems.

In complex operating environments, especially healthcare payer operations, work often depends on a small number of people who know:

- How work actually moves.
- Which system has the trusted information.
- Which exception path is real.
- Which leader can make a decision.
- Which spreadsheet or meeting keeps the process alive.
- Which undocumented rule prevents failure.

These Human APIs are valuable, but unmanaged dependency on them creates operational risk.

## Target Customers

### Primary ICP

Healthcare payer operations and adjacent healthcare transformation environments:

- Prior authorization
- Utilization management
- Care management
- Provider operations
- Member operations
- Transformation offices
- Administrative burden reduction programs
- AI adoption and automation programs

Likely buyers:

- VP Operations
- VP Utilization Management
- VP Care Management
- Chief Transformation Officer
- COO
- CIO
- Transformation Office leader
- Administrative burden reduction leader

### Secondary ICP

- Health tech companies whose product success depends on client workflow adoption.
- Consulting firms that need a diagnostic layer before transformation, modernization, or AI implementation.

## Core Hypothesis

Organizations cannot improve workflows if critical workflow knowledge lives inside people rather than systems.

AI, automation, reporting, and modernization programs fail when the operating model is not explicit. Human API dependency is an observable signal that the organization lacks a governed decision, escalation, memory, or routing layer.

## Objectives

- Identify Human APIs and the workflows dependent on them.
- Measure operational dependency risk by workflow, business function, and role.
- Surface hidden bottlenecks, decision delays, escalation gaps, and shadow processes.
- Evaluate AI readiness based on workflow visibility, decision clarity, and knowledge transferability.
- Produce a prioritized 90-day action plan to reduce dependency risk.
- Create a repeatable assessment method that can later guide implementation, content, GTM, and product development.

## Non-Objectives

- Do not build a software application.
- Do not create a database.
- Do not implement integrations.
- Do not replace enterprise knowledge management.
- Do not conduct a broad employee performance assessment.
- Do not identify individuals as problems.
- Do not automate work before the operating model is understood.
- Do not produce unvalidated ROI estimates.

## Success Metrics

Initial success should be measured by assessment usefulness, not software adoption.

Assessment delivery metrics:

- Current-state workflow inventory completed for agreed scope.
- Key Human APIs identified and validated through interviews and artifacts.
- Dependency map accepted by sponsor as directionally accurate.
- Risk tiers assigned to assessed workflows.
- Findings linked to concrete evidence.
- Recommendations prioritized by risk, effort, and operational value.
- 90-day action plan reviewed with accountable owners.

Commercial and GTM validation metrics:

- Buyer can clearly articulate the risk after readout.
- Buyer agrees the assessment revealed dependency not visible through existing reporting.
- Assessment produces follow-on advisory, decision layer, or remediation work.
- Content generated from anonymized patterns creates qualified conversations.

Do not use numeric improvement claims until client baselines exist.

## Functional Requirements

### Assessment Inputs

The assessment must be able to collect and analyze:

- Workflow inventory
- Systems inventory
- Decision inventory
- Escalation paths
- Dependency mapping
- Knowledge concentration
- Operational risk scoring
- AI readiness
- Governance readiness
- Artifact review
- Interview evidence
- Shadow process evidence
- Meeting and reporting cadence evidence

### Input Detail

Workflow inventory:

- Name, owner, business purpose, start trigger, end state, volume indicators if available, participating roles, and known pain points.

Systems inventory:

- Systems used, source of truth claims, manual handoffs, duplicate entry, spreadsheets, email inboxes, shared drives, and reporting tools.

Decision inventory:

- Decisions made in the workflow, decision owner, decision criteria, required facts, approval authority, exception rules, and audit needs.

Escalation paths:

- Standard escalation path, actual escalation path, named people relied upon, delay points, and undocumented exception routes.

Dependency mapping:

- People, teams, systems, meetings, spreadsheets, inboxes, and informal channels required to keep work moving.

Knowledge concentration:

- Critical knowledge held by one or few people, transferability, documentation quality, and substitution risk.

Operational risk scoring:

- Risk tier by workflow and dependency, based on concentration, business criticality, frequency, visibility, governance, and recoverability.

AI readiness:

- Workflow clarity, fact quality, decision authority, human approval model, exception handling, and feedback loop maturity.

Governance readiness:

- Decision rights, ownership, policy alignment, auditability, escalation discipline, and operating cadence.

### Assessment Outputs

The assessment must produce:

- Human API Risk Score
- Workflow Dependency Map
- Knowledge Concentration Analysis
- Bottleneck Analysis
- Operational Risk Assessment
- Modernization Opportunities
- AI Readiness Assessment
- Governance Readiness Assessment
- 90-Day Action Plan

### Output Detail

Human API Risk Score:

- A directional score by workflow and business function, supported by evidence and risk tier. It is not a validated benchmark until field-tested.

Workflow Dependency Map:

- A visual or tabular map showing where work depends on specific people, meetings, spreadsheets, email chains, or informal escalation paths.

Knowledge Concentration Analysis:

- Identification of critical knowledge domains with high individual concentration and low transferability.

Bottleneck Analysis:

- Where decisions, approvals, handoffs, missing facts, and escalations slow work.

Operational Risk Assessment:

- Risk classification with business impact narrative, recoverability, and governance gaps.

Modernization Opportunities:

- Workflow, decision layer, documentation, governance, automation, or AI opportunities ranked by readiness and risk reduction potential.

AI Readiness Assessment:

- A realistic view of where AI can help safely, where it needs human approval, and where prerequisites are missing.

90-Day Action Plan:

- Sequenced remediation work across capture, governance, workflow redesign, decision clarity, and operating cadence.

## Key Principles

- Treat Human APIs as signals of system design debt, not as personal failures.
- Preserve the value of expert people while reducing unmanaged dependency on them.
- Focus on operating model risk before technology.
- Prefer evidence over anecdotes, but use interviews to discover hidden reality.
- Separate current state, hypothesis, and validation.
- Keep human authority explicit in any AI-related recommendation.

