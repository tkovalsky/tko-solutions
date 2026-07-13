# Healthcare Authority Artifact Program

**Goal:** Create publishable healthcare evidence that demonstrates operational judgment without exposing clients, proprietary systems, patient information, or confidential outcomes.

## Publication rules

- Use composite or anonymized examples only after confirming they do not reconstruct a real client or patient.
- Remove client, payer, provider, program, employer, financial, contract, and patient identifiers.
- Do not use protected health information, real case data, or screenshots of client systems.
- Label every artifact as a **representative operating model** or **anonymized example** unless it is an approved client deliverable.
- Do not imply a measured clinical, financial, compliance, or implementation result without approved evidence.

---

# 1. Enterprise Dependency Map Template

| Field | Specification |
|---|---|
| Purpose | Show how delivery risk accumulates between teams, systems, decisions, and dependencies even when individual workstreams report progress. |
| Visual layout | Network map: workstreams across the top; shared systems and decisions in the center; executive sponsor/escalation paths at the bottom. Use color only for dependency status, not client names. |
| Core fields | Dependency; upstream/downstream owner; decision required; evidence needed; risk if delayed; escalation path; current confidence. |
| Redaction approach | Replace all named applications, teams, vendors, and programs with functional labels such as “eligibility platform,” “care operations,” “integration team,” or “executive sponsor.” Use fabricated but realistic dates only if clearly labeled illustrative. |
| Publishability | High as a blank template; medium as an anonymized example after confidentiality review. |
| Credibility impact | Demonstrates that Todd understands enterprise execution risk at the dependency layer, not merely project status reporting. |

# 2. Decision Rights Matrix

| Field | Specification |
|---|---|
| Purpose | Show how routine work, exceptions, evidence requirements, authority, auditability, and escalation fit together. |
| Visual layout | Matrix with rows for decision type and columns for trigger, required evidence, decision owner, approver, escalation, audit record, and automation eligibility. |
| Core fields | Routine vs exception; authority tier; required documentation; human-review requirement; SLA/decision timing; record of rationale. |
| Redaction approach | Use generic decisions such as “standard authorization intake,” “missing documentation,” “payer-specific exception,” and “appeal/escalation.” Do not show real payer rules or internal policy language. |
| Publishability | High as a generic template; high as a composite example if reviewed. |
| Credibility impact | Makes the decision-rights point tangible and differentiates operating-model work from platform marketing. |

# 3. Prior Authorization Workflow

| Field | Specification |
|---|---|
| Purpose | Show why prior authorization is an operational-quality and decision-rights problem before it is an automation problem. |
| Visual layout | Swimlane workflow: intake → documentation review → payer rules → routine path / exception path → human review → submission → denial/rework → learning loop. |
| Core fields | Intake completeness, documentation, payer-specific rules, exception routing, decision tier, audit trail, denial reason, rework trigger. |
| Redaction approach | Use a fully synthetic composite workflow. Never show actual patient facts, provider names, payer rule details, denial records, or operational volumes. |
| Publishability | High as an illustrative operating model with a clear disclaimer; medium as a case-derived visual after legal review. |
| Credibility impact | Gives executives a concrete model of the complexity Todd is prepared to inspect. |

# 4. Executive Operating Review

| Field | Specification |
|---|---|
| Purpose | Demonstrate how an operating review differs from a status meeting. |
| Visual layout | One-page review with six areas: operating condition, top constraints, exposed work, decisions required, owners/dates, and escalations/unknowns. |
| Core fields | Constraint; business exposure; evidence; decision; accountable owner; due date; confidence; escalation. |
| Redaction approach | Use a fictionalized composite with labels such as “workflow A,” “integration B,” and “decision C.” Avoid internal program names and metrics. |
| Publishability | High as a blank template; high as a composite sample. |
| Credibility impact | Shows exactly how Todd turns operational ambiguity into executive action. |

# 5. Governance Artifact

| Field | Specification |
|---|---|
| Purpose | Make governance concrete: authority, source trust, approval, auditability, activation, and incident response. |
| Visual layout | Governance control stack: source authority → decision rights → approval gate → audit record → health/incident review. Include a short scenario showing a flagged exception. |
| Core fields | Authoritative source; who may change a fact; who may approve an action; audit record; exception trigger; incident owner; review cadence. |
| Redaction approach | Use generic policy roles and functional controls. Do not represent a real client's compliance program, certification, or regulation as an implemented client control. |
| Publishability | High as a framework; medium as an anonymized applied example. |
| Credibility impact | Demonstrates practical governance design beyond generic “responsible AI” language. |

## Production sequence

1. Publish the blank Executive Operating Review and Decision Rights Matrix first.
2. Create the synthetic Prior Authorization Workflow and Governance Artifact with clear “illustrative operating model” labels.
3. Add a dependency-map template.
4. Convert one artifact into a redacted, approved experience-based example only after confidentiality review.

## Claim boundary to include on every artifact

> This is an anonymized or illustrative operating model. It demonstrates the questions, controls, and decision structures used to examine complex healthcare work. It does not disclose a client workflow, patient information, client result, compliance certification, or measured outcome.
