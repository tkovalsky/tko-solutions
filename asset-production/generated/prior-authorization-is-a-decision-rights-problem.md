<!--
TEMPLATE: executive-brief
Produces: a one-page leadership communication of a single finding (used for the PA assessment
and Operational Recovery Assessment sales motion -- the brief IS pre-sales collateral, not the
full assessment deliverable).
Output home: content/offers/
Read METHOD.md first. Healthcare evidence is ADVISORY EXPERIENCE -- never a named case study,
never paired with a metric, no orgs named. Findings must cite sources: records exactly as a
case study or assessment does. Fill every [BRACKET]; delete guidance before publishing.
-->
---
title: "Prior Authorization Is A Decision-Rights Problem, Not A Technology Problem"
slug: prior-authorization-is-a-decision-rights-problem
published_url: https://tko.solutions/insights/prior-authorization-is-a-decision-rights-problem
type: offer
asset_type: executive-brief
business_unit: tko
status: draft
summary: >-
  The same prior authorization case is handled differently depending on who touches it, because
  the authority to decide lives in individual heads instead of a governed model — a Human API
  pattern that any prior-auth technology purchase will leave unaddressed.
evidence_basis: >-
  Advisory experience and domain credentials, not deployed-product proof. No metrics, named
  organizations, or unverifiable outcomes. Patterns, not measured results.
sources:
  - healthcare:prior-auth-decision-rights
  - healthcare:human-api-root-pattern
source_opportunity: null  # demonstration asset for EPIC 12 Phase 5 (executive-brief template); no Opportunity Registry record exists yet
voice: tko-advisory
authority: /CURRENT_REALITY.md
---

# Prior Authorization Is A Decision-Rights Problem, Not A Technology Problem

## Situation

A prior authorization request arrives. Whether it gets approved, delayed, or denied depends less
on the clinical facts than on which staff member picks it up — what they know, who they call when
the case doesn't fit the standard pattern, and how they were trained to handle exceptions. None of
that authority model is written down anywhere a system can see it.

## Finding

Prior authorization is treated as a technology problem — faster forms, better integrations, AI
triage — when it is a decision-rights, exception-routing, and auditability problem. The same case
handled by two different people produces two different outcomes, not because the policy changed,
but because the authority to decide which exceptions apply lives in individual heads. This is the
same root pattern that recurs across utilization management, care management, interoperability,
and transformation governance: critical operational knowledge lives inside people instead of
governed systems, and the person becomes the operating system.

## Risk if unaddressed

Any prior-auth technology investment — a faster portal, an AI-assisted intake, a new EHR
integration — automates the parts of the process that were never the bottleneck. The
decision-rights gap survives the migration unchanged: the new system still routes exceptions to
whichever person happens to know how, denial variance persists, and the technology spend produces
motion without the operational-quality improvement it was bought to deliver.

## Recommended next step

Before committing to a prior-auth platform, automation vendor, or Gold Card program, run a
short operational diagnostic that maps where authority to decide actually lives today, which
exceptions depend on specific individuals, and what that costs in denial variance and delay. That
diagnostic is the Prior Authorization Operational Assessment — schedule it before the larger
technology decision, not after.

---
<!-- TIF v0.1 composed evidence trail (traceability) -->
| Claim | Evidence record | proof_ref | Claim guard |
|---|---|---|---|
| Same case, different outcome depending on who handles it; authority model lives in individual heads | healthcare:prior-auth-decision-rights | content/proof/healthcare/evidence.yaml#prior-auth-decision-rights — HEALTHCARE_EXPERIENCE_LIBRARY.md #1 Prior Authorization; diagrams/prior-auth-current-state.mmd | Advisory experience; pattern not metric; no orgs named; PA is decision-latency, not a model-quality problem. |
| Same root cause recurs across PA, UM, care management, interoperability, regulatory, transformation work | healthcare:human-api-root-pattern | content/proof/healthcare/evidence.yaml#human-api-root-pattern — HEALTHCARE_EXPERIENCE_LIBRARY.md (cross-cutting pattern); diagrams/knowledge-concentration-risk.mmd | Advisory experience; the through-line for all healthcare proof. Pattern not metric; no orgs named. |
