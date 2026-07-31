# Work Packages

This is the canonical work-package map for POIS implementation.

Rules:

- Every executable story appears exactly once.
- Story content lives only in `implementation/`.
- Work packages preserve the milestone order from `implementation/README.md`.
- Older milestone plans in `archive/opportunity-intelligence/` are historical context only.

## Summary

| Work Package | Stories | Status |
|---|---:|---|
| Milestone 0 — Stabilize | 23 | Next |
| Milestone 1 — Daily Driver | 28 | Pending |
| Milestone 2 — Commercial Intelligence | 17 | Pending |
| Milestone 3 — Manual Outreach | 15 | Pending |
| Milestone 4 — Learning | 10 | Pending |
| Total | 93 |  |

## Milestone 0 — Stabilize

| Story | Implementation Story |
|---|---|
| POIS-001 | `implementation/POIS-001-reorganize-module-layout.md` |
| POIS-002 | `implementation/POIS-002-consolidate-prisma-clients.md` |
| POIS-003 | `implementation/POIS-003-add-todd-v2-capability-profile.md` |
| POIS-004A | `implementation/POIS-004A-add-core-enums.md` |
| POIS-004B | `implementation/POIS-004B-add-intake-evidence-models.md` |
| POIS-004C | `implementation/POIS-004C-add-stakeholder-action-models.md` |
| POIS-004D | `implementation/POIS-004D-add-role-outcome-offer-models.md` |
| POIS-004E | `implementation/POIS-004E-add-decision-campaign-playbook-models.md` |
| POIS-004F | `implementation/POIS-004F-validate-generate-schema.md` |
| POIS-005A | `implementation/POIS-005A-enrich-organization-person.md` |
| POIS-005B | `implementation/POIS-005B-extend-opportunity-model-status.md` |
| POIS-005C | `implementation/POIS-005C-relax-fact-evidence-gap-constraints.md` |
| POIS-005D | `implementation/POIS-005D-remove-blocking-constraints.md` |
| POIS-006A | `implementation/POIS-006A-generate-migration-fix-enum-values.md` |
| POIS-006B | `implementation/POIS-006B-backfill-opportunity-type.md` |
| POIS-006C | `implementation/POIS-006C-backfill-opportunity-source.md` |
| POIS-006D | `implementation/POIS-006D-add-indexes-and-checks.md` |
| POIS-007A | `implementation/POIS-007A-port-stakeholder-access-score.md` |
| POIS-007B | `implementation/POIS-007B-add-new-score-components.md` |
| POIS-008 | `implementation/POIS-008-backfill-pursuits.md` |
| POIS-009A | `implementation/POIS-009A-seed-offers.md` |
| POIS-009B | `implementation/POIS-009B-seed-proof-items.md` |
| POIS-009C | `implementation/POIS-009C-seed-playbooks.md` |

## Milestone 1 — Daily Driver

| Story | Implementation Story |
|---|---|
| POIS-101A | `implementation/POIS-101A-oi-shell-and-nav.md` |
| POIS-101B | `implementation/POIS-101B-intake-capture-form.md` |
| POIS-101C | `implementation/POIS-101C-ingest-returns-facts-and-gaps.md` |
| POIS-102A | `implementation/POIS-102A-classify-signal-function.md` |
| POIS-102B | `implementation/POIS-102B-signal-tier-display.md` |
| POIS-103A | `implementation/POIS-103A-initiative-inference-clustering.md` |
| POIS-103B | `implementation/POIS-103B-proposed-initiative-display-and-promote.md` |
| POIS-104A | `implementation/POIS-104A-classify-opportunity-rules.md` |
| POIS-104B | `implementation/POIS-104B-classification-checkbox-list-and-promote.md` |
| POIS-105A | `implementation/POIS-105A-score-axes-evidence-urgency.md` |
| POIS-105B | `implementation/POIS-105B-score-axes-value-priority-disqualify.md` |
| POIS-105C | `implementation/POIS-105C-retune-fit-axis.md` |
| POIS-105D | `implementation/POIS-105D-composite-score-index.md` |
| POIS-105E | `implementation/POIS-105E-golden-fixture-tests.md` |
| POIS-105F | `implementation/POIS-105F-score-summary-display.md` |
| POIS-106A | `implementation/POIS-106A-next-action-derivation-table.md` |
| POIS-106B | `implementation/POIS-106B-next-action-display-and-creation.md` |
| POIS-107 | `implementation/POIS-107-pipeline-list.md` |
| POIS-108A | `implementation/POIS-108A-opportunity-lifecycle-state-machine.md` |
| POIS-108B | `implementation/POIS-108B-workbench-overview-and-initiative-sections.md` |
| POIS-108C | `implementation/POIS-108C-workbench-evidence-and-gaps-sections.md` |
| POIS-109 | `implementation/POIS-109-score-explanation-panel.md` |
| POIS-110A | `implementation/POIS-110A-today-ranking-and-path-diversity.md` |
| POIS-110B | `implementation/POIS-110B-today-changes-and-pipeline-summary.md` |
| POIS-110C | `implementation/POIS-110C-today-page-and-card-ui.md` |
| POIS-110D | `implementation/POIS-110D-today-actions.md` |
| POIS-111 | `implementation/POIS-111-decision-journal-capture.md` |
| POIS-112 | `implementation/POIS-112-opportunity-timeline.md` |

## Milestone 2 — Commercial Intelligence

| Story | Implementation Story |
|---|---|
| POIS-201A | `implementation/POIS-201A-stakeholder-suggest-role-map.md` |
| POIS-201B | `implementation/POIS-201B-stakeholder-section-and-actions.md` |
| POIS-202A | `implementation/POIS-202A-access-score-wired-into-index.md` |
| POIS-202B | `implementation/POIS-202B-access-breakdown-in-score-panel.md` |
| POIS-203 | `implementation/POIS-203-contact-points-with-provenance.md` |
| POIS-204 | `implementation/POIS-204-person-facts.md` |
| POIS-205A | `implementation/POIS-205A-executive-brief-assembly.md` |
| POIS-205B | `implementation/POIS-205B-executive-brief-page.md` |
| POIS-206 | `implementation/POIS-206-ai-client-adapter.md` |
| POIS-207A | `implementation/POIS-207A-initiative-narrative-generation.md` |
| POIS-207B | `implementation/POIS-207B-initiative-narrative-display.md` |
| POIS-208A | `implementation/POIS-208A-offer-recommendation-logic.md` |
| POIS-208B | `implementation/POIS-208B-offer-section-and-select-action.md` |
| POIS-209A | `implementation/POIS-209A-proof-match-logic.md` |
| POIS-209B | `implementation/POIS-209B-matched-proof-display.md` |
| POIS-210A | `implementation/POIS-210A-playbook-selector-and-checklist.md` |
| POIS-210B | `implementation/POIS-210B-campaign-badges-and-rollup-page.md` |

## Milestone 3 — Manual Outreach

| Story | Implementation Story |
|---|---|
| POIS-301 | `implementation/POIS-301-outreach-gate.md` |
| POIS-302A | `implementation/POIS-302A-claim-validator-logic.md` |
| POIS-302B | `implementation/POIS-302B-claim-validator-inline-warnings.md` |
| POIS-303 | `implementation/POIS-303-research-summary-and-talking-points.md` |
| POIS-304A | `implementation/POIS-304A-gated-draft-generation-and-approval.md` |
| POIS-304B | `implementation/POIS-304B-draft-editor-ui.md` |
| POIS-305A | `implementation/POIS-305A-meeting-prep-generation.md` |
| POIS-305B | `implementation/POIS-305B-brief-snapshot-artifact.md` |
| POIS-306A | `implementation/POIS-306A-activity-log-service.md` |
| POIS-306B | `implementation/POIS-306B-workbench-activity-log-display.md` |
| POIS-307A | `implementation/POIS-307A-role-profile-comp-floor-logic.md` |
| POIS-307B | `implementation/POIS-307B-role-profile-section-and-action.md` |
| POIS-308A | `implementation/POIS-308A-fte-state-machine-and-actions.md` |
| POIS-308B | `implementation/POIS-308B-application-tracker-and-dual-track-prompt.md` |
| POIS-309 | `implementation/POIS-309-proposal-outline.md` |

## Milestone 4 — Learning

| Story | Implementation Story |
|---|---|
| POIS-401A | `implementation/POIS-401A-decision-resolution-logic.md` |
| POIS-401B | `implementation/POIS-401B-decision-history-on-workbench.md` |
| POIS-402A | `implementation/POIS-402A-outcome-recording-logic.md` |
| POIS-402B | `implementation/POIS-402B-outcome-form-ui.md` |
| POIS-403A | `implementation/POIS-403A-weekly-review-metrics-logic.md` |
| POIS-403B | `implementation/POIS-403B-weekly-review-page.md` |
| POIS-404 | `implementation/POIS-404-scorecard-on-today.md` |
| POIS-405 | `implementation/POIS-405-conversion-analysis.md` |
| POIS-406 | `implementation/POIS-406-lessons-library.md` |
| POIS-407 | `implementation/POIS-407-timeline-extension.md` |
