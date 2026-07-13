# TIF V2 — Problem Library

## Purpose

The Problem Library is the executive-readable canonical registry for recurring business problems. It is not a website taxonomy and not a list of keywords. Each problem links real evidence and experiences to reusable patterns, frameworks, assets, assessments, and claim boundaries.

## Canonical problem record

```yaml
knowledge_id: PROB-009
name: Decision Latency
executive_summary: >-
  Decisions wait because the context, authority, evidence, or escalation path required
  to make them is fragmented across people and systems.
business_symptoms: []
root_causes: []
industries: []
executive_owners: []
related_patterns: []
related_frameworks: []
related_evidence: []
related_experiences: []
related_assets: []
claim_boundary: >-
  A reusable diagnostic pattern; not proof that every delayed decision has the same cause.
status: candidate | reviewed | active | retired
```

The relational implementation should additionally support related case studies, Operator Notes, assessments, guides, LinkedIn packages, website pages, RachelOS proof, and supporting artifacts through the existing Asset/DerivativeAsset model. Do not store those as duplicated lists in a second content system.

## Initial active library

### Executive operations

| ID | Problem | Executive summary | Symptoms | Root causes | Owners | Related patterns | Frameworks | Evidence posture |
|---|---|---|---|---|---|---|---|---|
| PROB-001 | Executive visibility mismatch | Leadership sees status but not the work, risk, or decision that needs attention. | Green reporting; surprise escalations; meeting-based reconstruction. | Activity reporting, fragmented sources, missing decision register. | CEO, COO, transformation lead. | Executive visibility, workflow reconstruction, dependency risk. | Executive Operating Review; Recovery Assessment. | Healthcare experience based; RachelOS queue/health proof. |
| PROB-002 | Decision latency | Decisions wait because context, authority, evidence, or escalation is fragmented. | Delayed approvals; missed commitments; repeated meetings. | Unclear decision rights, missing facts, no escalation path. | CEO, COO, CIO, transformation lead. | Decision latency, source authority, approval bottleneck. | Recovery Assessment; decision register. | Experience based; RachelOS approval and fact-authority proof. |
| PROB-003 | Program recovery failure | A multi-team program drifts while local workstreams still appear healthy. | Repeated escalations; late surprises; executive distrust. | Dependency opacity, weak cadence, unresolved cross-team decisions. | CEO, COO, program sponsor. | Dependency risk, executive visibility mismatch. | Executive Operating Review; Recovery Assessment. | Healthcare experience based; requires approved artifacts. |
| PROB-004 | Dependency risk | Work crosses teams or systems with no durable view of upstream/downstream dependencies. | Blocked work, handoff delay, late escalation. | Fragmented ownership, no dependency map, status-only governance. | COO, CIO, transformation lead. | Dependency risk, organizational alignment. | Dependency map; operating review. | Experience based. |
| PROB-005 | Key-person dependency | Critical context, exception knowledge, or prioritization lives in a small number of people. | Work queues behind experts; inconsistent handling; continuity risk. | Tacit knowledge, weak memory, implicit rules. | CEO, COO, operations leader. | Knowledge fragmentation, manual reconstruction, operational memory. | Recovery Assessment; RachelOS operating loop. | RachelOS implemented proof; healthcare experience based. |
| PROB-006 | Operating-review failure | Meetings collect updates without forcing a decision, owner, evidence need, or escalation. | Long meetings; repeated issue discussion; no follow-through. | Status orientation, no decision register, diffuse ownership. | CEO, COO, business owner. | Executive operating cadence, executive visibility mismatch. | Executive Operating Review. | Experience based; sample deliverable available. |
| PROB-007 | Organizational bottleneck | A business constraint persists because ownership, workflow, and prioritization are not aligned. | Busy teams; slow throughput; unclear accountability. | Cross-functional fragmentation, unresolved priorities. | CEO, COO, operating partner. | Workflow reconstruction, organizational alignment. | Recovery Assessment. | Requires engagement evidence by industry. |
| PROB-008 | Cross-functional delivery failure | Separate teams progress locally but the shared outcome does not move. | Handoff failures, integration delays, duplicated work. | Missing shared state, dependency/decision ambiguity. | COO, CIO, product/operations leader. | Dependency risk, delivery governance. | Dependency map; delivery governance review. | Healthcare experience based. |

### AI and governance

| ID | Problem | Executive summary | Symptoms | Root causes | Owners | Related patterns | Frameworks | Evidence posture |
|---|---|---|---|---|---|---|---|---|
| PROB-009 | AI production-readiness gap | A capability is built or demoed without evidence it is safe, active, adopted, or validated. | Pilot stagnation; unclear owner; dormant features. | No activation criteria, missing observability, vague value hypothesis. | CEO, COO, CIO, product leader. | Built/Activated/Validated, AI activation. | AI Delivery Assessment. | RachelOS delivery record verified. |
| PROB-010 | AI governance failure | AI can influence consequential work without clear source authority, approval, or auditability. | Unreviewed drafts, unclear data truth, trust concerns. | Implicit authority, missing approval gates. | CIO, COO, risk/compliance leader. | Human approval, source authority, governance failure. | Approval model; governance artifact. | RachelOS implemented proof. |
| PROB-011 | Source-authority conflict | Competing human, system, and AI inputs have no explicit rule for resolving truth. | Stale facts, conflicting records, inconsistent action. | No provenance model, machine output treated as final. | COO, product leader, data/AI owner. | Source authority, knowledge fragmentation. | Fact authority model. | RachelOS implemented proof. |
| PROB-012 | Approval bottleneck | Human review is required but undefined, causing either risky automation or unscalable manual work. | Delayed action, shadow approvals, inconsistent review. | Unclear decision tiers and risk thresholds. | COO, product leader, compliance lead. | Human approval, decision latency. | Decision-rights matrix; AI Delivery Assessment. | RachelOS proof; healthcare experience based. |
| PROB-013 | AI adoption gap | A capability exists but operational behavior does not change. | Low use, workarounds, no outcome record. | No workflow fit, training, activation ownership, feedback loop. | COO, product leader. | Built/Activated/Validated, operating cadence. | AI Delivery Assessment; adoption review. | Partial RachelOS evidence; no broad outcome claim. |

### Product and operating systems

| ID | Problem | Executive summary | Symptoms | Root causes | Owners | Related patterns | Frameworks | Evidence posture |
|---|---|---|---|---|---|---|---|---|
| PROB-014 | System-of-record gap | Systems preserve activity but do not turn it into a trusted next decision. | Rich CRM, weak follow-up, meeting-based prioritization. | Missing operational memory, state, priority, action loop. | Business owner, COO, revenue leader. | Operating system vs CRM, workflow intelligence. | RachelOS operating loop; Recovery Assessment. | RachelOS implemented proof. |
| PROB-015 | Workflow reconstruction | Operators must assemble current reality manually across sources. | Context chasing; inconsistent handoffs; stale action. | Fragmented systems, no state model, human-held knowledge. | COO, operations leader. | Manual reconstruction, fragmented systems. | Workflow map; operating memory model. | RachelOS implemented proof. |
| PROB-016 | Knowledge fragmentation | High-value facts are scattered, perishable, or ungoverned. | Missing context, conflicting records, continuity risk. | Unstructured capture, no authority model. | COO, business owner, revenue leader. | Operational memory, source authority. | Memory/fact model; Recovery Assessment. | RachelOS implemented proof. |
| PROB-017 | Operating-cadence failure | A business lacks a reliable rhythm that converts current state into owned action. | Daily fire drills; priority drift; missed follow-up. | No canonical queue, decision register, health/review cadence. | COO, business owner. | Operating cadence, executive operating reviews. | Daily operating loop; Executive Operating Review. | RachelOS daily-action evidence; experience based elsewhere. |

### Healthcare operations

| ID | Problem | Executive summary | Symptoms | Root causes | Owners | Related patterns | Frameworks | Evidence posture |
|---|---|---|---|---|---|---|---|---|
| PROB-018 | Prior-authorization operational quality | Administrative burden and denial friction persist because workflow quality and exception handling are inconsistent. | Slow authorization, rework, denials, staffing burden. | Implicit documentation rules, exception routing, payer knowledge concentration. | VP Operations, PA leader, clinical/administrative leader. | Decision rights, key-person dependency, workflow governance. | Prior Authorization Assessment. | Healthcare experience based; synthetic artifacts allowed. |
| PROB-019 | Healthcare decision-rights gap | Policy and tools exist, but actual exception authority and escalation are implicit. | Different handling by staff; audit difficulty; late escalation. | Unclear tiers, no authority matrix, weak audit trail. | Operations, compliance, PA leader. | Governance failure, approval bottleneck. | Decision-rights matrix; PA workflow review. | Healthcare experience based. |
| PROB-020 | Administrative burden | Staff capacity is consumed by manual reconciliation, exception handling, and rework. | Long cycle times; repetitive work; burnout pressure. | Workflow friction, inconsistent documentation, fragmented systems. | COO, operations leader, practice administrator. | Manual reconstruction, workflow friction. | Recovery / PA Assessment. | Requires measured engagement data for capacity claim. |
| PROB-021 | Regulatory-program operating gap | Compliance work is treated as technical delivery rather than sustained operating behavior. | Delayed onboarding, audit risk, inconsistent access/exception handling. | Missing governance, operating model, role clarity. | CIO, compliance, operations leader. | Workflow governance, dependency risk. | Governance artifact; operating review. | Healthcare experience based. |

### Cross-industry validation candidates

| ID | Problem | Initial industries | Evidence posture | Rule |
|---|---|---|---|---|
| PROB-022 | Relationship-operating-system gap | Professional services, financial services, real estate, wealth management. | RachelOS verified in real estate; other industries unproven. | Do not claim cross-industry validation until separate evidence exists. |
| PROB-023 | Manufacturing handoff/exception risk | Manufacturing, insurance, banking. | No current direct evidence. | P2 only. | Treat as a research/engagement hypothesis, not authority content. |
| PROB-024 | Insurance/claims decision latency | Insurance, healthcare, financial services. | Healthcare adjacency only. | P2 only. | Require direct experience/evidence before asset production. |

## Relationship rules

- Problems may be cross-industry, but industry applicability is not proof of industry delivery.
- A pattern can support many problems; a problem may link to many patterns.
- A framework is not a solution guarantee. It documents how a problem is examined or addressed.
- Public assets must inherit the narrowest claim boundary from linked evidence.
- “Related case studies” and “related LinkedIn posts” are Asset/DerivativeAsset queries, not duplicated text fields.

## Initial framework registry candidates

| ID | Framework | Primary problems | Status |
|---|---|---|---|
| FRM-001 | Operational Recovery Assessment | PROB-001 through PROB-008, PROB-015 through PROB-017. | Existing offer; normalize as framework. |
| FRM-002 | Prior Authorization Operational Assessment | PROB-018 through PROB-021. | Existing offer; normalize as framework. |
| FRM-003 | RachelOS Operating Loop | PROB-005, PROB-010, PROB-011, PROB-014 through PROB-017. | Existing implemented reference pattern. |
| FRM-004 | Built / Activated / Validated Review | PROB-009, PROB-013. | Existing delivery model; normalize as framework. |
| FRM-005 | Executive Operating Review | PROB-001 through PROB-008. | Existing deliverable pattern; requires a reviewed sample. |

