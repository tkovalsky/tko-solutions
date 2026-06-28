<!--
TEMPLATE: assessment
Produces: a healthcare (or operational) assessment asset — the Recommendation IS the offer.
Output home: content/offers/
Scoring/section logic extends: docs/ASSESSMENT_FRAMEWORK.md (Human-API dependency dimensions)
and docs/strategy/PRIOR_AUTHORIZATION_OPERATIONAL_ASSESSMENT.md.
Read METHOD.md first. Healthcare evidence is ADVISORY EXPERIENCE — never a named case study,
never paired with a metric, no orgs named. Fill every [BRACKET]; delete guidance before publishing.
-->
---
title: "Prior Authorization Is An Operational Quality Problem"
slug: prior-authorization-operational-quality-problem
type: offer
asset_type: assessment
status: draft
summary: >-
  Gold Card eligibility is not the problem. Operational quality — denial reduction, exception routing, dependency risk — is the problem Gold Card readiness is an output of.
evidence_basis: >-
  Advisory experience and domain credentials, not deployed-product proof. No metrics, named
  organizations, or unverifiable outcomes. Patterns, not measured results.
sources:
  - healthcare:ev-healthcare-pa-operational-burden
  - healthcare:ev-healthcare-human-api-dependency
authority: /CURRENT_REALITY.md
---

# Prior Authorization Is An Operational Quality Problem

*[One-line framing of the operational problem this assessment surfaces.]*

> **Composer note.** Opportunity angle: Gold Card eligibility is not the problem. Operational quality — denial reduction, exception routing, dependency risk — is the problem Gold Card readiness is an output of.
> Audience: Practice administrators and healthcare operations leaders.

> **Basis.** [Advisory-experience honesty clause: pattern-level domain credibility, no metrics,
> no named orgs.]

## 1. The Operational Problem
<!-- The recurring failure mode this assessment exists to find. From METHOD: Observation. -->
[...]

## 2. What Goes Invisible
<!-- Hidden decision latency, dependency concentration, exception routing in heads. From METHOD: Finding. -->
[...]

## 3. Assessment Dimensions
<!-- The scored lenses (e.g. Human-API dependency: criticality, concentration, ...). Reference docs/ASSESSMENT_FRAMEWORK.md; do not re-derive it. From METHOD: Evidence → Finding. -->
[...]

## 4. Findings Format
<!-- How a finding is expressed to the buyer: observation → evidence pattern → risk classification. Cite sources records. -->
[...]

## 5. Recommendation / Remediation Roadmap
<!-- The deliverable: prioritized remediation. THIS is the offer. From METHOD: Recommendation. -->
[...]

## 6. Scope, Deliverables, and Engagement Shape
<!-- What the buyer gets, duration, price band (per CURRENT_REALITY). -->
[...]

## Appendix — Experience basis
<!-- Map each finding type to the advisory-experience pattern that grounds it. No orgs, no metrics. -->
| Finding type | Experience record | Pattern basis | Claim guard |
|---|---|---|---|
| [...] | [healthcare:record-id] | [pattern, not metric] | advisory experience; not product proof |


<!-- TIF v0.1 composed evidence trail (traceability) -->
| Claim | Evidence record | proof_ref | Claim guard |
|---|---|---|---|
| [...] | healthcare:ev-healthcare-pa-operational-burden | content/proof/healthcare/evidence.yaml#prior-auth-exception-routing | Advisory experience; pattern not metric; no orgs named. |
| [...] | healthcare:ev-healthcare-human-api-dependency | content/proof/healthcare/evidence.yaml#human-api-root-pattern | Advisory experience; the through-line for all healthcare proof. Pattern not metric. |
