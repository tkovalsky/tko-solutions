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
title: "[Assessment title]"
slug: [kebab-slug]
type: offer
asset_type: assessment
status: draft
summary: >-
  [What this assessment diagnoses and what the buyer receives.]
evidence_basis: >-
  Advisory experience and domain credentials, not deployed-product proof. No metrics, named
  organizations, or unverifiable outcomes. Patterns, not measured results.
sources:
  - [domain:record-id]
authority: /CURRENT_REALITY.md
---

# [Title]

*[One-line framing of the operational problem this assessment surfaces.]*

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
