<!--
TEMPLATE: intelligence-report
Produces: a CRE (or market) intelligence report.
Output home: cre-intelligence repo (CROSS-REPO). Evidence proof_refs point into that repo.
Read METHOD.md first. Every data point needs a dated source (proof_ref). No interpretation
without an underlying evidence record. Fill every [BRACKET]; delete guidance before publishing.
-->
---
title: "[Report title — names the market and the signal]"
slug: [kebab-slug]
type: intelligence-report
asset_type: intelligence-report
status: draft
period: "[reporting period / as-of date]"
summary: >-
  [The signal, the interpretation, and the recommended action in 2–3 sentences.]
evidence_basis: >-
  Every data point carries a dated source. Interpretation is labeled as interpretation,
  separate from fact.
sources:
  - [cre:record-id]
authority: /CURRENT_REALITY.md
---

# [Title]

*[One-line framing: what market, what changed, why it matters now.]*

## 1. Signal / Observation
<!-- The specific market movement or data point noticed. From METHOD: Observation. -->
[...]

## 2. Evidence
<!-- The dated data points and their sources. Fact only — no interpretation here. From METHOD: Evidence. -->
[...]

## 3. Interpretation / Finding
<!-- What the evidence means. Clearly labeled as interpretation, distinct from §2 fact. From METHOD: Finding. -->
[...]

## 4. Recommendation
<!-- What an owner / investor / operator should do about it. From METHOD: Recommendation. -->
[...]

## 5. What Would Change This View
<!-- The disconfirming signals to watch — keeps the report honest. -->
[...]

## Appendix — Sources
<!-- Each data point → its dated source proof_ref. -->
| Data point | Evidence record | Source (dated) | Confidence |
|---|---|---|---|
| [...] | [cre:record-id] | [source + date] | [high/med/low] |
