# Implementation Stories — Index

This directory is the **canonical, executable POIS backlog**. Each file is one implementation
story: independently scoped, 30–90 minutes of focused work, executable by Codex in one session
with minimal context.

`docs/archive/opportunity-intelligence/POIS-CODEX-TASKS.md` and `POIS-CODEX-IMPLEMENTATION-PLAN.md`
remain as the historical, milestone-level record of the original task shape. They are **not**
loaded per Codex session. If this index and those documents ever disagree, this index wins —
it reflects the current, executable state of the backlog.

**Every Codex session reads, in order:**
1. `docs/IMPLEMENTATION_RULES.md`
2. `docs/CODEX_OPERATING_MODEL.md`
3. Exactly one story file below
4. Only the documents that story's own **Referenced Documents** section names

See `docs/CODEX_OPERATING_MODEL.md` for the full operating contract, and **D-031** in
`docs/decisions/POIS-DECISIONS.md` for why some stories in a lettered chain
ship logic with no UI (an explicit, scoped amendment to Rule 1 — the *chain* is the vertical
slice, not every letter in it).

**93 stories total**, expanded from the 47 tasks in `POIS-CODEX-TASKS.md`. Total scope,
ordering, and milestone boundaries are unchanged — this is subtraction of batch size, not
addition of work.

---

## Story Metadata block

Every story file opens with a `## Story Metadata` block, before its `# Story` section:

```
Milestone / Parent Task / Story / Depends On / Blocks / Estimated PR Size /
Expected Review Time / Risk / Breaking Change / Migration / Feature Flag
```

This is a scannable summary of facts already established in the story body — it does not
change scope, dependencies, sequencing, or acceptance criteria. `Depends On` and `Blocks`
restate the `Dependencies` and `Next Story` sections; `Estimated PR Size` restates `Expected
Diff Size`. `Risk`, `Breaking Change`, `Migration`, and `Feature Flag` are the architect's
judgment calls for that specific story, useful for triaging review order across the 93-story
backlog at a glance — e.g. filtering to `Risk: High` surfaces the migration stories
(`POIS-006A`–`D`), the blocking-constraint removal (`POIS-005D`), the scoring-weight retune
(`POIS-105C`), the golden-fixture gate (`POIS-105E`), the claim validator and approval gate
(`POIS-302A`, `POIS-304A`), the send-API compliance check (`POIS-306A`), and the comp-floor
logic (`POIS-307A`) — the handful of stories worth a second reviewer regardless of diff size.

`Feature Flag` is `No` on every story — this backlog does not use feature-flag rollout;
rollback is always via route deletion or hiding a UI block, per each story's own `Rollback`
section.

## PR checklist

`docs/PR_CHECKLIST.md` is the checklist Todd runs through before merging any story's PR. It
does not replace a story's own `Acceptance Criteria` and `Validation` sections — it's the
generic wrapper (implementation / validation / documentation / review-readiness) that applies
identically across all 93 stories, so it isn't repeated in every file.

---

## Milestone 0 — Stabilize (23 stories, days 1–3)

Not user-visible by design — the one exemption in the backlog (schema cannot be unblocked
incrementally).

| Story | What it does |
|---|---|
| `POIS-001-reorganize-module-layout.md` | Move files into bounded-context directories, no logic change |
| `POIS-002-consolidate-prisma-clients.md` | Alias the duplicate Prisma client to the canonical one |
| `POIS-003-add-todd-v2-capability-profile.md` | Add the v2 scoring thresholds constant, v1 untouched |
| `POIS-004A-add-core-enums.md` | Schema: §2 + §9 enums only |
| `POIS-004B-add-intake-evidence-models.md` | Schema: `OiSignal`, `OiInitiative`, `OiInitiativeSignal`, `OiOpportunitySource` |
| `POIS-004C-add-stakeholder-action-models.md` | Schema: `OiStakeholder`, `OiContactPoint`, `OiNextAction`, `OiActivity` |
| `POIS-004D-add-role-outcome-offer-models.md` | Schema: `OiRoleProfile`, `OiOutcome`, `OiOffer`, `OiProofItem`, `OiOpportunityProof` |
| `POIS-004E-add-decision-campaign-playbook-models.md` | Schema: §9 models + `OiScore` rename with `@@map` |
| `POIS-004F-validate-generate-schema.md` | Gate: `prisma validate`/`generate` before touching existing models |
| `POIS-005A-enrich-organization-person.md` | `OiOrganization`/`OiPerson` new fields |
| `POIS-005B-extend-opportunity-model-status.md` | `OiOpportunity` type/relations/indexes + status enum extension (C4) |
| `POIS-005C-relax-fact-evidence-gap-constraints.md` | Three-parent polymorphism on fact/evidence/gap |
| `POIS-005D-remove-blocking-constraints.md` | `OiOffer` enrichment + remove C1/C2/C3 constraints |
| `POIS-006A-generate-migration-fix-enum-values.md` | Generate migration, fix `ALTER TYPE ADD VALUE` transaction trap |
| `POIS-006B-backfill-opportunity-type.md` | `type` column: nullable → backfill → NOT NULL |
| `POIS-006C-backfill-opportunity-source.md` | Backfill `OiOpportunitySource` from `OiSource` |
| `POIS-006D-add-indexes-and-checks.md` | Raw SQL: partial unique indexes, CHECK constraints, drop old index |
| `POIS-007A-port-stakeholder-access-score.md` | Mechanical port of `scoreOpportunity()`, byte-identical fixtures |
| `POIS-007B-add-new-score-components.md` | Add warm-path/role-clarity/reachability, default 0 |
| `POIS-008-backfill-pursuits.md` | Idempotent script: `OiPursuit` → opportunity/stakeholder/next-action |
| `POIS-009A-seed-offers.md` | Seed 7 offers (blocked-on-Todd content by day 11) |
| `POIS-009B-seed-proof-items.md` | Seed ≥10 proof items (blocked-on-Todd content by day 11) |
| `POIS-009C-seed-playbooks.md` | Seed 7 playbooks, one per scope (blocked-on-Todd content by day 11) |

## Milestone 1 — Daily Driver (28 stories, days 4–10, must land on time)

| Story | What it does |
|---|---|
| `POIS-101A-oi-shell-and-nav.md` | `/tif/oi` shell, nav, Oct-1 countdown, Today placeholder |
| `POIS-101B-intake-capture-form.md` | 4-field intake capture page + action |
| `POIS-101C-ingest-returns-facts-and-gaps.md` | Ingest returns facts+gaps; facts table with source quotes |
| `POIS-102A-classify-signal-function.md` | Pure signal-tier classifier, persists `OiSignal` |
| `POIS-102B-signal-tier-display.md` | Tier + strength + reasons on the review screen |
| `POIS-103A-initiative-inference-clustering.md` | Deterministic clustering, confidence table, decay |
| `POIS-103B-proposed-initiative-display-and-promote.md` | Proposed-initiative UI block, creates `OiInitiative` on promote |
| `POIS-104A-classify-opportunity-rules.md` | Opportunity classification rules table |
| `POIS-104B-classification-checkbox-list-and-promote.md` | Candidate checklist UI, `promoteSignal`/`dismissSignal`/`watchAccount` |
| `POIS-105A-score-axes-evidence-urgency.md` | `evidence.ts` + `urgency.ts` axes |
| `POIS-105B-score-axes-value-priority-disqualify.md` | `value.ts` + `priority.ts` + `disqualify.ts` axes, hard filters |
| `POIS-105C-retune-fit-axis.md` | Retune `fit.ts` to §4 weights (add domain/seniority, remove double-counted axes) |
| `POIS-105D-composite-score-index.md` | Wire all axes into the composite function + persist `OiScore` |
| `POIS-105E-golden-fixture-tests.md` | All five §14 worked examples, determinism, PE ordering — highest-value test file in the milestone |
| `POIS-105F-score-summary-display.md` | Score summary on the review screen |
| `POIS-106A-next-action-derivation-table.md` | Next-action derivation table, first-match-wins |
| `POIS-106B-next-action-display-and-creation.md` | Next-action display + creation on promote |
| `POIS-107-pipeline-list.md` | Pipeline list: filters, PE sort, stale + no-next-action warning rows |
| `POIS-108A-opportunity-lifecycle-state-machine.md` | `canTransition` state machines |
| `POIS-108B-workbench-overview-and-initiative-sections.md` | Workbench page + overview/initiative sections |
| `POIS-108C-workbench-evidence-and-gaps-sections.md` | Evidence/gaps sections, transactional gap-resolve-and-rescore |
| `POIS-109-score-explanation-panel.md` | Collapsible full score breakdown + EV arithmetic |
| `POIS-110A-today-ranking-and-path-diversity.md` | Today ranking logic, path diversity, cap 5 |
| `POIS-110B-today-changes-and-pipeline-summary.md` | 48h changes feed + pipeline summary |
| `POIS-110C-today-page-and-card-ui.md` | Today page + opportunity card UI |
| `POIS-110D-today-actions.md` | `snoozeOpportunity`/`dismissOpportunity`/`completeNextAction` |
| `POIS-111-decision-journal-capture.md` | Inline prediction-capture modal at every decision point |
| `POIS-112-opportunity-timeline.md` | Derived timeline — no new model |

## Milestone 2 — Commercial Intelligence (17 stories, days 11–19)

| Story | What it does |
|---|---|
| `POIS-201A-stakeholder-suggest-role-map.md` | Role map for all 13 initiative categories |
| `POIS-201B-stakeholder-section-and-actions.md` | Stakeholder section/form + add/update/select/DNC actions |
| `POIS-202A-access-score-wired-into-index.md` | `accessScore` wired into composite ranking |
| `POIS-202B-access-breakdown-in-score-panel.md` | Access breakdown in the score panel |
| `POIS-203-contact-points-with-provenance.md` | Contact points, required provenance |
| `POIS-204-person-facts.md` | Person facts via `OiOpportunityFact.personId` |
| `POIS-205A-executive-brief-assembly.md` | Derived executive-brief assembly (no `OiBrief` model) |
| `POIS-205B-executive-brief-page.md` | `/tif/oi/people/[id]` rendering all 13 sections |
| `POIS-206-ai-client-adapter.md` | `ai/client.ts` — never throws, degrades to `unavailable` |
| `POIS-207A-initiative-narrative-generation.md` | AI narrative generation + post-validation |
| `POIS-207B-initiative-narrative-display.md` | Narrative display on the workbench |
| `POIS-208A-offer-recommendation-logic.md` | Deterministic offer recommendation |
| `POIS-208B-offer-section-and-select-action.md` | Offer section UI + `selectOffer` |
| `POIS-209A-proof-match-logic.md` | Deterministic tag-overlap proof matching, read-only |
| `POIS-209B-matched-proof-display.md` | Matched-proof display with select checkboxes |
| `POIS-210A-playbook-selector-and-checklist.md` | Playbook checklist display — `deriveNextAction()` explicitly unmodified |
| `POIS-210B-campaign-badges-and-rollup-page.md` | Campaign badges + `/tif/oi/campaigns` rollup |

## Milestone 3 — Manual Outreach (15 stories, days 20–29)

| Story | What it does |
|---|---|
| `POIS-301-outreach-gate.md` | `canPrepareOutreach()` + named blockers |
| `POIS-302A-claim-validator-logic.md` | Claim validator — highest-value test file in the milestone |
| `POIS-302B-claim-validator-inline-warnings.md` | Inline warnings on drafts |
| `POIS-303-research-summary-and-talking-points.md` | Two ungated artifact kinds |
| `POIS-304A-gated-draft-generation-and-approval.md` | Gated email/LinkedIn generation, `approveArtifact` throws on unsupported claims |
| `POIS-304B-draft-editor-ui.md` | Draft editor, disabled-approve state, "approving does not send" |
| `POIS-305A-meeting-prep-generation.md` | `meeting_prep` artifact |
| `POIS-305B-brief-snapshot-artifact.md` | Executive-brief snapshot into `OiArtifact` |
| `POIS-306A-activity-log-service.md` | Append-only activity log, `logOutreachSent` transaction, grep test for no send API |
| `POIS-306B-workbench-activity-log-display.md` | Workbench activity log display |
| `POIS-307A-role-profile-comp-floor-logic.md` | Comp-floor enforcement ($225,000) |
| `POIS-307B-role-profile-section-and-action.md` | Role profile section UI |
| `POIS-308A-fte-state-machine-and-actions.md` | FTE application state machine |
| `POIS-308B-application-tracker-and-dual-track-prompt.md` | Tracker UI + dual-track prompt |
| `POIS-309-proposal-outline.md` | Template + checklist, no generated prose |

## Milestone 4 — Learning (10 stories, days 30–38)

| Story | What it does |
|---|---|
| `POIS-401A-decision-resolution-logic.md` | Resolve logic — deltas, `wasCorrect` |
| `POIS-401B-decision-history-on-workbench.md` | Decision history display |
| `POIS-402A-outcome-recording-logic.md` | Outcome recording, terminal-requires-outcome |
| `POIS-402B-outcome-form-ui.md` | Outcome form UI |
| `POIS-403A-weekly-review-metrics-logic.md` | Weekly auto-metrics |
| `POIS-403B-weekly-review-page.md` | `/tif/oi/review` page |
| `POIS-404-scorecard-on-today.md` | Income replacement %, no vanity metrics |
| `POIS-405-conversion-analysis.md` | Conversion analysis — mutates no scoring weight |
| `POIS-406-lessons-library.md` | Lessons aggregation |
| `POIS-407-timeline-extension.md` | Extend timeline with decisions/outcomes — last scheduled story before the day-45 build freeze |

---

## After POIS-407

Build freeze, day 45 (2026-09-14). Milestone 5 (post-October-1) is specified in
`POIS-CODEX-IMPLEMENTATION-PLAN.md` but has no stories here — do not write any until Todd
explicitly schedules it.
