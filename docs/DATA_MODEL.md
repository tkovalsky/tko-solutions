# Logical Data Model: Human API Risk Assessment

> **Status — supporting reference, reframed 2026-06-25.** "Human API" is a **finding type and
> diagnostic lens**, not a standalone offer, separate assessment, or pricing tier. The offers are
> the **Operational Recovery Assessment** and the **Prior Authorization Operational Assessment**
> (see the authoritative [`/CURRENT_REALITY.md`](../CURRENT_REALITY.md)). `Human API` is one entity
> in this assessment-delivery model — a dependency/finding node, not the product.

## Purpose

This document defines a future-state logical data model for Human API Risk Assessment. It is conceptual only. It does not define tables, fields, APIs, schemas, storage, infrastructure, or implementation.

## Entity Summary

- Organization
- Business Function
- Workflow
- System
- Decision
- Knowledge Asset
- Human API
- Dependency
- Risk
- Assessment
- Finding
- Recommendation
- Action Plan

## Entities

### Organization

The company, business unit, payer, vendor, or consulting client being assessed.

Relationships:

- Has many Business Functions.
- Has many Assessments.
- Has many Systems.

### Business Function

A functional area within the organization, such as Prior Authorization, Utilization Management, Care Management, Provider Operations, or Transformation Office.

Relationships:

- Belongs to one Organization.
- Has many Workflows.
- Has many Human APIs.
- Has many Risks.

### Workflow

A defined sequence of work that produces an operational outcome.

Relationships:

- Belongs to one Business Function.
- Uses many Systems.
- Contains many Decisions.
- Depends on many Human APIs through Dependencies.
- Has many Risks.
- Is assessed in one or more Assessments.
- Can produce many Findings.

### System

A formal or informal tool used to perform, track, route, report, or govern work. Systems may include enterprise platforms, spreadsheets, email inboxes, shared drives, reporting tools, or meeting cadences.

Relationships:

- Belongs to one Organization.
- Supports many Workflows.
- Stores or exposes many Knowledge Assets.
- May be involved in many Dependencies.

### Decision

A judgment, approval, prioritization, escalation, or routing choice required within a Workflow.

Relationships:

- Belongs to one Workflow.
- Requires many Knowledge Assets.
- May depend on one or more Human APIs.
- May create Risks when authority, criteria, or facts are unclear.
- Can be addressed by Recommendations.

### Knowledge Asset

A durable or tacit source of operational knowledge. Examples include policy documents, decision rules, process maps, spreadsheets, reports, meeting notes, historical context, and undocumented expert knowledge.

Relationships:

- Supports many Decisions.
- May belong to a System.
- May be owned or maintained by a Human API.
- May be formal or informal.
- May create Dependency when access or interpretation is concentrated.

### Human API

An individual or role that performs a critical memory, routing, escalation, decision translation, or governance function not sufficiently handled by systems or documented workflows.

Relationships:

- Belongs to one Organization.
- May be associated with one or more Business Functions.
- Supports many Workflows through Dependencies.
- Owns or interprets many Knowledge Assets.
- Supports or influences many Decisions.
- May be linked to many Risks.

### Dependency

A relationship showing that a Workflow, Decision, System, or Knowledge Asset relies on a Human API or other fragile operating mechanism.

Relationships:

- Connects a Human API to a Workflow, Decision, Knowledge Asset, System, or Business Function.
- Has one or more Risks.
- Is evaluated during an Assessment.
- May be addressed by Recommendations and Action Plans.

### Risk

An identified exposure created by dependency, lack of visibility, unclear decision rights, low transferability, weak escalation, poor governance, or low AI readiness.

Relationships:

- Belongs to an Organization, Business Function, Workflow, Decision, or Dependency.
- Is identified during an Assessment.
- Supports one or more Findings.
- Can be reduced by Recommendations and Action Plans.

### Assessment

A bounded evaluation of Human API dependency across an Organization, Business Function, or set of Workflows.

Relationships:

- Belongs to one Organization.
- Covers one or more Business Functions and Workflows.
- Evaluates many Dependencies and Risks.
- Produces Findings.
- Produces Recommendations.
- Produces one or more Action Plans.

### Finding

An evidence-backed conclusion from an Assessment.

Relationships:

- Belongs to one Assessment.
- References one or more Workflows, Decisions, Human APIs, Dependencies, Risks, Systems, or Knowledge Assets.
- Supports one or more Recommendations.

### Recommendation

A proposed action to reduce dependency risk, improve visibility, clarify decisions, strengthen governance, or increase readiness for modernization or AI.

Relationships:

- Belongs to one Assessment.
- Addresses one or more Findings or Risks.
- May be included in an Action Plan.
- May require owners, timing, prerequisites, and success criteria.

### Action Plan

A sequenced plan for remediation over a defined period, usually 90 days.

Relationships:

- Belongs to one Assessment.
- Contains many Recommendations.
- Assigns ownership to business roles or functions.
- Targets specific Workflows, Decisions, Dependencies, or Risks.
- Can be tracked over time for progress.

## Relationship Patterns

Organization > Business Function > Workflow > Decision is the operating hierarchy.

Workflow + Decision + Knowledge Asset reveal where work depends on memory and judgment.

Human API + Dependency + Risk reveal where operational fragility exists.

Assessment + Finding + Recommendation + Action Plan define the diagnostic output.

System is intentionally broad because Human API dependency often lives in informal systems such as spreadsheets, inboxes, and meetings.

