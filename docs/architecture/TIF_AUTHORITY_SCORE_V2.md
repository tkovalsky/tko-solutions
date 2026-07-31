# Authority Score v2 Specification

**Status:** Future specification only. Do not implement, persist, display as an operational score, or use it to auto-publish until each input has an authoritative runtime source and review rule.

## Purpose

The existing Authority Dashboard score is a coverage-only read-model indicator. Authority Score v2 would measure governed authority health, not popularity, truth, commercial outcome, or a claim of expertise.

## Proposed components

| Component | Intended signal | Current runtime availability |
|---|---|---|
| Coverage | Reviewed subject-area coverage across Evidence and Assets. | Partial read model. |
| Evidence Strength | Claim status, proof provenance, authority basis, and freshness of Evidence. | Blocked: Evidence has free-text `claimGuard`, not structured fields. |
| Diagram Coverage | Required diagrams exist, are linked to consuming Assets, and pass review. | Partial: diagrams and joins exist; required relationships do not. |
| Publication Coverage | Approved Assets have recorded destinations and source versions. | Blocked: no Publication record. |
| Measurement Coverage | Published outputs have sourced observations with period and boundary. | Blocked: no Measurement record. |
| Freshness | Evidence, diagrams, and assets are reviewed within their stated effective window. | Blocked: no effective/review cadence metadata. |
| Claim Quality | Public claims respect inherited Evidence boundaries and have no unsupported source. | Partial: compiler contract has boundaries; runtime eligibility gate does not. |
| Broken Lineage Penalty | Missing Evidence/Opportunity/Asset/diagram trace links. | Partial: existing joins permit some checks. |
| Unsupported Claim Penalty | Unsupported Evidence or unsupported rendered claims are included in a public-ready asset. | Blocked: no structured Evidence status or rendered-claim review record. |
| Duplicate Asset Penalty | Same approved intent is represented by duplicative Assets or Opportunities. | Partial: normalized-title read-model detection and candidate marker exist. |
| Review Debt | Assets, Evidence, diagrams, and packages awaiting or past required review. | Partial: Asset review exists; upstream/downstream review records do not. |

## Design constraints

- Inputs must resolve to existing reviewed records; no component may infer facts from prose, traffic, or strategy documents.
- The score must expose every component, source record count, exclusions, and penalties. No opaque composite.
- Missing inputs are `Untracked`, not zero. A partial score must never look complete.
- Publication and measurement observations never establish causal commercial outcomes automatically.
- Score changes must be attributable to source records and human review decisions.

## Implementation prerequisite sequence

1. Add and backfill structured Evidence status, boundary, authority basis, and review/effective dates.
2. Add reviewed Experience and Problem/Pattern/Framework relational records and explicit joins.
3. Add runtime asset eligibility/claim-boundary review traces.
4. Add narrow Publication and Measurement records with source/version, destination, period, and reviewer.
5. Define weights, calibration cases, exclusions, and reviewer sign-off in a separate approved implementation change.

Until then, use the Authority Work Queue and its explicit blockers. It is actionable without pretending the future score exists.
