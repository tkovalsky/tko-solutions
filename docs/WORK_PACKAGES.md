# POIS Work Packages

This document is the canonical execution plan for the Personal Opportunity Intelligence
System (POIS).

Implementation stories remain the source of truth. This document groups those stories into
reviewable, sequential work packages so future sessions can start from a single instruction:

> Implement Work Package WP-00X.

## Execution Rules

- Only one Work Package may be active at a time.
- Merge the current package before beginning the next.
- Never skip a work package.
- Never reorder work packages.
- If one story blocks the package, stop implementation.
- Implementation stories remain the source of truth.
- Read only the implementation stories assigned to the active work package.
- Read only documents explicitly referenced by those stories.
- Do not modify milestone sequencing, dependencies, story scope, or acceptance criteria.

## Package Index

| Work Package | Name | Milestone | Stories |
|---|---|---:|---:|
| WP-001 | Repository Foundation | M0 | 3 |
| WP-002 | Schema Foundation | M0 | 6 |
| WP-003 | Existing Model Updates | M0 | 4 |
| WP-004 | Migration, Scoring Port, and Backfill | M0 | 7 |
| WP-005 | Seed Data | M0 | 3 |
| WP-006 | Intake | M1 | 3 |
| WP-007 | Classification and Initiative Decisioning | M1 | 6 |
| WP-008 | Scoring and Next Actions | M1 | 8 |
| WP-009 | Opportunity Pipeline and Workbench | M1 | 5 |
| WP-010 | Today Dashboard and Decision Capture | M1 | 6 |
| WP-011 | Commercial Intelligence | M2 | 8 |
| WP-012 | Commercial Assets and Campaigns | M2 | 9 |
| WP-013 | Manual Outreach | M3 | 15 |
| WP-014 | Learning | M4 | 10 |

Total: 14 work packages, 93 stories.

---

## WP-001

**Name**

Repository Foundation

**Milestone**

M0 - Stabilize

**Purpose**

Create the module layout, Prisma client baseline, and Todd v2 capability profile needed by
all later POIS work.

**Business Outcome**

The repository has a stable, low-risk foundation for the MSP implementation without changing
runtime behavior.

**Stories**

1. `docs/implementation/POIS-001-reorganize-module-layout.md`
2. `docs/implementation/POIS-002-consolidate-prisma-clients.md`
3. `docs/implementation/POIS-003-add-todd-v2-capability-profile.md`

**Deliverable**

Bounded POIS module organization, one canonical Prisma client path, and v2 capability
threshold constants available for later scoring work.

**Exit Criteria**

All stories complete; all story acceptance criteria satisfied; required validation complete;
lint passing; tests passing; production build passing; `docs/PR_CHECKLIST.md` complete; ready
for review.

**Estimated Session Length**

3 focused implementation sessions.

**Review Size**

Medium total. The package is mostly mechanical and should be reviewable as three small PRs.

**Dependencies**

None.

---

## WP-002

**Name**

Schema Foundation

**Milestone**

M0 - Stabilize

**Purpose**

Add the core POIS enums and new schema models in the dependency order required by the
implementation stories.

**Business Outcome**

POIS has the data structures needed for intake evidence, initiatives, stakeholders, actions,
offers, proof, decisions, campaigns, and playbooks.

**Stories**

1. `docs/implementation/POIS-004A-add-core-enums.md`
2. `docs/implementation/POIS-004B-add-intake-evidence-models.md`
3. `docs/implementation/POIS-004C-add-stakeholder-action-models.md`
4. `docs/implementation/POIS-004D-add-role-outcome-offer-models.md`
5. `docs/implementation/POIS-004E-add-decision-campaign-playbook-models.md`
6. `docs/implementation/POIS-004F-validate-generate-schema.md`

**Deliverable**

Validated generated schema for the new POIS model surface, including the `OiScore` rename
with mapping preserved.

**Exit Criteria**

All stories complete; all story acceptance criteria satisfied; required validation complete;
lint passing; tests passing; production build passing; `docs/PR_CHECKLIST.md` complete; ready
for review.

**Estimated Session Length**

6 focused implementation sessions.

**Review Size**

Medium to large total because it touches schema foundations, but each story remains a small
review checkpoint.

**Dependencies**

WP-001 merged.

---

## WP-003

**Name**

Existing Model Updates

**Milestone**

M0 - Stabilize

**Purpose**

Extend existing organization, person, opportunity, fact, evidence, gap, and offer models
without changing the architecture or creating new capability scope.

**Business Outcome**

Existing POIS records can support the new MSP workflows while preserving backward-compatible
behavior where the stories require it.

**Stories**

1. `docs/implementation/POIS-005A-enrich-organization-person.md`
2. `docs/implementation/POIS-005B-extend-opportunity-model-status.md`
3. `docs/implementation/POIS-005C-relax-fact-evidence-gap-constraints.md`
4. `docs/implementation/POIS-005D-remove-blocking-constraints.md`

**Deliverable**

Existing POIS schema models enriched and unblocked for intake, offers, and polymorphic fact,
evidence, and gap ownership.

**Exit Criteria**

All stories complete; all story acceptance criteria satisfied; required validation complete;
lint passing; tests passing; production build passing; `docs/PR_CHECKLIST.md` complete; ready
for review.

**Estimated Session Length**

4 focused implementation sessions.

**Review Size**

Medium. One high-risk story requires careful review of constraint removal.

**Dependencies**

WP-002 merged.

---

## WP-004

**Name**

Migration, Scoring Port, and Backfill

**Milestone**

M0 - Stabilize

**Purpose**

Create and harden the migration path, port the existing stakeholder access score, add new
score component placeholders, and backfill existing pursuits.

**Business Outcome**

The database can move into the POIS MSP shape safely, with existing pursuits carried forward
and existing access scoring preserved.

**Stories**

1. `docs/implementation/POIS-006A-generate-migration-fix-enum-values.md`
2. `docs/implementation/POIS-006B-backfill-opportunity-type.md`
3. `docs/implementation/POIS-006C-backfill-opportunity-source.md`
4. `docs/implementation/POIS-006D-add-indexes-and-checks.md`
5. `docs/implementation/POIS-007A-port-stakeholder-access-score.md`
6. `docs/implementation/POIS-007B-add-new-score-components.md`
7. `docs/implementation/POIS-008-backfill-pursuits.md`

**Deliverable**

Safe generated migration, required raw SQL protections, existing pursuit backfill, and
access scoring logic available for downstream ranking.

**Exit Criteria**

All stories complete; all story acceptance criteria satisfied; required validation complete;
lint passing; tests passing; production build passing; `docs/PR_CHECKLIST.md` complete; ready
for review.

**Estimated Session Length**

7 focused implementation sessions.

**Review Size**

Large. This package contains multiple high-risk migration stories and should receive a second
review before merge.

**Dependencies**

WP-003 merged.

---

## WP-005

**Name**

Seed Data

**Milestone**

M0 - Stabilize

**Purpose**

Seed the offers, proof items, and playbooks needed by the MSP operating workflow.

**Business Outcome**

The system has the commercial primitives needed for recommendation, proof matching, and
manual outreach preparation.

**Stories**

1. `docs/implementation/POIS-009A-seed-offers.md`
2. `docs/implementation/POIS-009B-seed-proof-items.md`
3. `docs/implementation/POIS-009C-seed-playbooks.md`

**Deliverable**

Seven offers, at least ten proof items, and seven playbooks seeded according to the story
acceptance criteria.

**Exit Criteria**

All stories complete; all story acceptance criteria satisfied; required validation complete;
lint passing; tests passing; production build passing; `docs/PR_CHECKLIST.md` complete; ready
for review.

**Estimated Session Length**

3 focused implementation sessions.

**Review Size**

Small to medium. Content completeness is the main review concern.

**Dependencies**

WP-004 merged.

---

## WP-006

**Name**

Intake

**Milestone**

M1 - Daily Driver

**Purpose**

Create the operator shell and the first intake flow for capturing signals, facts, and gaps.

**Business Outcome**

Todd can enter opportunity signals into POIS and see sourced facts and gaps produced from
that intake.

**Stories**

1. `docs/implementation/POIS-101A-oi-shell-and-nav.md`
2. `docs/implementation/POIS-101B-intake-capture-form.md`
3. `docs/implementation/POIS-101C-ingest-returns-facts-and-gaps.md`

**Deliverable**

`/tif/oi` shell and navigation, intake capture form, and review output with provenance-aware
facts and gaps.

**Exit Criteria**

All stories complete; all story acceptance criteria satisfied; required validation complete;
lint passing; tests passing; production build passing; `docs/PR_CHECKLIST.md` complete; ready
for review.

**Estimated Session Length**

3 focused implementation sessions.

**Review Size**

Medium. This is the first user-visible package and should be checked in browser.

**Dependencies**

WP-005 merged.

---

## WP-007

**Name**

Classification and Initiative Decisioning

**Milestone**

M1 - Daily Driver

**Purpose**

Classify raw signals, infer initiatives, and let the operator promote, dismiss, or watch
candidate opportunities.

**Business Outcome**

Raw intake becomes structured opportunity intelligence with deterministic reasoning and clear
operator decisions.

**Stories**

1. `docs/implementation/POIS-102A-classify-signal-function.md`
2. `docs/implementation/POIS-102B-signal-tier-display.md`
3. `docs/implementation/POIS-103A-initiative-inference-clustering.md`
4. `docs/implementation/POIS-103B-proposed-initiative-display-and-promote.md`
5. `docs/implementation/POIS-104A-classify-opportunity-rules.md`
6. `docs/implementation/POIS-104B-classification-checkbox-list-and-promote.md`

**Deliverable**

Signal tiering, initiative inference, opportunity classification, and promotion/dismiss/watch
controls.

**Exit Criteria**

All stories complete; all story acceptance criteria satisfied; required validation complete;
lint passing; tests passing; production build passing; `docs/PR_CHECKLIST.md` complete; ready
for review.

**Estimated Session Length**

6 focused implementation sessions.

**Review Size**

Medium. Deterministic classification and UI actions should be reviewed together for operator
clarity.

**Dependencies**

WP-006 merged.

---

## WP-008

**Name**

Scoring and Next Actions

**Milestone**

M1 - Daily Driver

**Purpose**

Implement deterministic scoring axes, composite scoring, golden fixtures, score display, and
next-action derivation.

**Business Outcome**

Todd can see why an opportunity matters, trust the ranking math, and get the next useful
action after promotion.

**Stories**

1. `docs/implementation/POIS-105A-score-axes-evidence-urgency.md`
2. `docs/implementation/POIS-105B-score-axes-value-priority-disqualify.md`
3. `docs/implementation/POIS-105C-retune-fit-axis.md`
4. `docs/implementation/POIS-105D-composite-score-index.md`
5. `docs/implementation/POIS-105E-golden-fixture-tests.md`
6. `docs/implementation/POIS-105F-score-summary-display.md`
7. `docs/implementation/POIS-106A-next-action-derivation-table.md`
8. `docs/implementation/POIS-106B-next-action-display-and-creation.md`

**Deliverable**

Pure scoring functions, persisted score snapshots, golden-fixture coverage, score summaries,
and derived next actions.

**Exit Criteria**

All stories complete; all story acceptance criteria satisfied; required validation complete;
lint passing; tests passing; production build passing; `docs/PR_CHECKLIST.md` complete; ready
for review.

**Estimated Session Length**

8 focused implementation sessions.

**Review Size**

Large. This package includes high-risk scoring retune and golden-fixture stories; review the
math and fixtures carefully.

**Dependencies**

WP-007 merged.

---

## WP-009

**Name**

Opportunity Pipeline and Workbench

**Milestone**

M1 - Daily Driver

**Purpose**

Create the pipeline list, opportunity lifecycle state machine, workbench shell, evidence/gap
resolution, and score explanation panel.

**Business Outcome**

Todd can inspect active opportunities, understand their state, resolve gaps, and see the full
score rationale.

**Stories**

1. `docs/implementation/POIS-107-pipeline-list.md`
2. `docs/implementation/POIS-108A-opportunity-lifecycle-state-machine.md`
3. `docs/implementation/POIS-108B-workbench-overview-and-initiative-sections.md`
4. `docs/implementation/POIS-108C-workbench-evidence-and-gaps-sections.md`
5. `docs/implementation/POIS-109-score-explanation-panel.md`

**Deliverable**

Pipeline view, lifecycle transition logic, workbench overview, evidence/gap UI, transactional
gap resolution, and score breakdown.

**Exit Criteria**

All stories complete; all story acceptance criteria satisfied; required validation complete;
lint passing; tests passing; production build passing; `docs/PR_CHECKLIST.md` complete; ready
for review.

**Estimated Session Length**

5 focused implementation sessions.

**Review Size**

Medium. The package is user-facing but composed of small sequential stories.

**Dependencies**

WP-008 merged.

---

## WP-010

**Name**

Today Dashboard and Decision Capture

**Milestone**

M1 - Daily Driver

**Purpose**

Build the Today ranking workflow, dashboard cards, action handling, decision journal capture,
and derived opportunity timeline.

**Business Outcome**

Todd can open POIS each morning, see the highest-value work, act on it, and capture the
prediction needed for future learning.

**Stories**

1. `docs/implementation/POIS-110A-today-ranking-and-path-diversity.md`
2. `docs/implementation/POIS-110B-today-changes-and-pipeline-summary.md`
3. `docs/implementation/POIS-110C-today-page-and-card-ui.md`
4. `docs/implementation/POIS-110D-today-actions.md`
5. `docs/implementation/POIS-111-decision-journal-capture.md`
6. `docs/implementation/POIS-112-opportunity-timeline.md`

**Deliverable**

Today ranking capped at five, changes feed, pipeline summary, Today page/cards, action
mutations, decision journal modal, and derived timeline.

**Exit Criteria**

All stories complete; all story acceptance criteria satisfied; required validation complete;
lint passing; tests passing; production build passing; `docs/PR_CHECKLIST.md` complete; ready
for review.

**Estimated Session Length**

6 focused implementation sessions.

**Review Size**

Medium to large. This package is the M1 daily-driver finish line and should receive full
manual browser validation.

**Dependencies**

WP-009 merged.

---

## WP-011

**Name**

Commercial Intelligence

**Milestone**

M2 - Commercial Intelligence

**Purpose**

Add stakeholder role mapping, access scoring, contact provenance, person facts, and executive
brief assembly/display.

**Business Outcome**

Todd can understand who matters in an account, what access exists, and what is known about
the person before preparing outreach.

**Stories**

1. `docs/implementation/POIS-201A-stakeholder-suggest-role-map.md`
2. `docs/implementation/POIS-201B-stakeholder-section-and-actions.md`
3. `docs/implementation/POIS-202A-access-score-wired-into-index.md`
4. `docs/implementation/POIS-202B-access-breakdown-in-score-panel.md`
5. `docs/implementation/POIS-203-contact-points-with-provenance.md`
6. `docs/implementation/POIS-204-person-facts.md`
7. `docs/implementation/POIS-205A-executive-brief-assembly.md`
8. `docs/implementation/POIS-205B-executive-brief-page.md`

**Deliverable**

Stakeholder section/actions, access score integration, contact provenance, person facts, and
executive brief page.

**Exit Criteria**

All stories complete; all story acceptance criteria satisfied; required validation complete;
lint passing; tests passing; production build passing; `docs/PR_CHECKLIST.md` complete; ready
for review.

**Estimated Session Length**

8 focused implementation sessions.

**Review Size**

Large. Commercial data quality and provenance should receive careful review.

**Dependencies**

WP-010 merged.

---

## WP-012

**Name**

Commercial Assets and Campaigns

**Milestone**

M2 - Commercial Intelligence

**Purpose**

Add the AI client adapter, initiative narrative, deterministic offer and proof matching, and
campaign/playbook UI.

**Business Outcome**

Todd can turn commercial intelligence into prepared, traceable assets and campaign context
without allowing AI to drive scores or state.

**Stories**

1. `docs/implementation/POIS-206-ai-client-adapter.md`
2. `docs/implementation/POIS-207A-initiative-narrative-generation.md`
3. `docs/implementation/POIS-207B-initiative-narrative-display.md`
4. `docs/implementation/POIS-208A-offer-recommendation-logic.md`
5. `docs/implementation/POIS-208B-offer-section-and-select-action.md`
6. `docs/implementation/POIS-209A-proof-match-logic.md`
7. `docs/implementation/POIS-209B-matched-proof-display.md`
8. `docs/implementation/POIS-210A-playbook-selector-and-checklist.md`
9. `docs/implementation/POIS-210B-campaign-badges-and-rollup-page.md`

**Deliverable**

Resilient AI prose adapter, validated initiative narrative, offer recommendation/select,
proof matching/display, playbook checklist, campaign badges, and campaign rollup page.

**Exit Criteria**

All stories complete; all story acceptance criteria satisfied; required validation complete;
lint passing; tests passing; production build passing; `docs/PR_CHECKLIST.md` complete; ready
for review.

**Estimated Session Length**

9 focused implementation sessions.

**Review Size**

Large. Review AI degradation behavior, deterministic recommendation logic, and campaign UI
carefully.

**Dependencies**

WP-011 merged.

---

## WP-013

**Name**

Manual Outreach

**Milestone**

M3 - Manual Outreach

**Purpose**

Prepare gated outreach artifacts, manual activity tracking, role-profile evaluation, FTE
application tracking, and proposal outlines without adding outbound send capability.

**Business Outcome**

Todd can prepare and approve outreach materials, track manual actions, and manage consulting
and FTE paths while preserving human approval for every external communication.

**Stories**

1. `docs/implementation/POIS-301-outreach-gate.md`
2. `docs/implementation/POIS-302A-claim-validator-logic.md`
3. `docs/implementation/POIS-302B-claim-validator-inline-warnings.md`
4. `docs/implementation/POIS-303-research-summary-and-talking-points.md`
5. `docs/implementation/POIS-304A-gated-draft-generation-and-approval.md`
6. `docs/implementation/POIS-304B-draft-editor-ui.md`
7. `docs/implementation/POIS-305A-meeting-prep-generation.md`
8. `docs/implementation/POIS-305B-brief-snapshot-artifact.md`
9. `docs/implementation/POIS-306A-activity-log-service.md`
10. `docs/implementation/POIS-306B-workbench-activity-log-display.md`
11. `docs/implementation/POIS-307A-role-profile-comp-floor-logic.md`
12. `docs/implementation/POIS-307B-role-profile-section-and-action.md`
13. `docs/implementation/POIS-308A-fte-state-machine-and-actions.md`
14. `docs/implementation/POIS-308B-application-tracker-and-dual-track-prompt.md`
15. `docs/implementation/POIS-309-proposal-outline.md`

**Deliverable**

Outreach gate, claim validator, draft warnings, research/talking-point artifacts, gated
draft approval, meeting prep, brief snapshots, activity log, role profile, FTE tracker, and
proposal outline.

**Exit Criteria**

All stories complete; all story acceptance criteria satisfied; required validation complete;
lint passing; tests passing; production build passing; `docs/PR_CHECKLIST.md` complete; ready
for review.

**Estimated Session Length**

15 focused implementation sessions.

**Review Size**

Oversized. Keep one PR per story, and consider a human checkpoint after `POIS-306B` before
starting the FTE/proposal stories.

**Dependencies**

WP-012 merged.

---

## WP-014

**Name**

Learning

**Milestone**

M4 - Learning

**Purpose**

Resolve decisions, record outcomes, generate weekly review metrics, show scorecard progress,
analyze conversion, aggregate lessons, and extend the timeline.

**Business Outcome**

POIS closes the learning loop by comparing predictions to outcomes and surfacing what should
change in operator behavior without mutating scoring weights.

**Stories**

1. `docs/implementation/POIS-401A-decision-resolution-logic.md`
2. `docs/implementation/POIS-401B-decision-history-on-workbench.md`
3. `docs/implementation/POIS-402A-outcome-recording-logic.md`
4. `docs/implementation/POIS-402B-outcome-form-ui.md`
5. `docs/implementation/POIS-403A-weekly-review-metrics-logic.md`
6. `docs/implementation/POIS-403B-weekly-review-page.md`
7. `docs/implementation/POIS-404-scorecard-on-today.md`
8. `docs/implementation/POIS-405-conversion-analysis.md`
9. `docs/implementation/POIS-406-lessons-library.md`
10. `docs/implementation/POIS-407-timeline-extension.md`

**Deliverable**

Decision resolution, decision history, outcome recording, weekly review, Today scorecard,
conversion analysis, lessons library, and decision/outcome timeline extension.

**Exit Criteria**

All stories complete; all story acceptance criteria satisfied; required validation complete;
lint passing; tests passing; production build passing; `docs/PR_CHECKLIST.md` complete; ready
for review.

**Estimated Session Length**

10 focused implementation sessions.

**Review Size**

Large. Review carefully because this package closes the prediction/outcome learning loop.

**Dependencies**

WP-013 merged.

---

## Oversized Packages

- WP-013 is oversized at 15 stories. It is intentionally kept together because M3 is one
  coherent manual-outreach capability and splitting it would add another work package beyond
  the target range. Use a checkpoint after the activity-log display story.
- WP-014 is large at 10 stories, but it is the complete learning loop and should remain one
  package unless review load becomes a problem.
- WP-012 is large at 9 stories, but it is one commercial-asset capability chain.

## Standard Implementation Prompt

Use this prompt for future implementation sessions:

```text
Implement Work Package WP-00X.

Read:
1. docs/IMPLEMENTATION_RULES.md
2. docs/CODEX_OPERATING_MODEL.md
3. docs/WORK_PACKAGES.md

Then read only the implementation stories referenced by Work Package WP-00X.

Read only documents explicitly referenced by those stories. If a referenced document names a
section, read only that section. Do not inspect unrelated source files or planning documents
before implementation.

Implement the work package in story order. Implement the work package in story order. Complete the entire work package before opening the pull request unless a blocking issue requires stopping.
Keep one work package per PR unless Todd explicitly changes the operating model. Do not skip stories, reorder stories, change dependencies,
change acceptance criteria, or modify implementation story files.

Run:
1. required validation from each story
2. lint
3. tests
4. production build

Complete docs/PR_CHECKLIST.md.

Return:
- Executive Summary
- Stories Completed
- Files Changed
- Validation Results
- Remaining Risks
- Suggested Commit Message
- Suggested PR Title
- Ready for Review

Then stop.
```
