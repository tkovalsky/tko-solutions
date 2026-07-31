# POIS Implementation Readiness Review

**Date:** 2026-07-31
**Status:** Architecture frozen. This is the final review before implementation.
**Scope:** Per-document readiness assessment + the traps Codex will fall into.

This document does not redesign anything. It records what survives untouched, what gets
simplified, what moves later, and what was missing. Read it alongside
`docs/IMPLEMENTATION_RULES.md`.

---

## 0. Headline findings

**Five things materially reduce implementation risk, and four of them are subtractions.**

1. **Two of the eight new concepts need no schema at all.** Opportunity Timeline is a query
   over `OiSignal.occurredAt` + `OiActivity.occurredAt` + status-change activities. Executive
   Brief is a derived view over person, stakeholder, facts, and signals. Codex would very
   likely build tables for both. It must not.
2. **Six generated artifact types collapse into one model.** Executive brief, research
   summary, email draft, LinkedIn draft, talking points, meeting prep — plus proposal outline
   — become `OiArtifact` with a `kind` enum, replacing `OiOutreachDraft`. Six tables avoided.
3. **Decision Journal must move from Milestone 4 to Milestone 1.** This is the single most
   important correction in this review. See §2.
4. **Playbooks must not replace `deriveNextAction()`.** They supply research checklists and
   follow-up cadences. The deterministic next-action table stays. See §3.
5. **Milestone 5 is entirely post-October-1** and should be labeled that way in the plan so
   nobody schedules against it.

**One honest note on scope.** The instruction was "do not expand scope," and then eight
concepts were added. Five are genuinely small (Campaigns, Offer enrichment, Timeline,
Executive Brief, Decision Journal). Three are not: Playbooks, Proposal Builder, and all of
Milestone 5. I have placed them accordingly rather than pretending they are free — Playbooks
land in Milestone 2 as data-only, Proposal Builder is reduced to a template, and Milestone 5
is marked post-deadline.

---

## 1. Per-document review

### 1.1 `PERSONAL-OPPORTUNITY-OPERATING-SYSTEM.md`

| | |
|---|---|
| **Keep as-is** | Mission, deadline math, the three income paths, operator constraints, Signal→Initiative→Opportunity model, signal tiers, both commercial ladders, freshness rules, automation boundaries, decision rules, the four worked examples (A–D), non-goals, assumptions A1–A10. This document needed the least change of any in the set. |
| **Simplify** | The 60-day operating plan (§17) is superseded by the milestone plan. Replace it with a pointer rather than maintaining two schedules that will drift. |
| **Defer** | Nothing. |
| **Missing** | Weekly Review is described as a rhythm (§10) but has no operator surface. Added as `/tif/oi/review` in Milestone 4. Decision Journal is absent entirely. |
| **Codex will misunderstand** | The four worked examples read like illustrations. **They are acceptance tests.** Example C in particular — a lone executive appointment produces *no opportunity* — is a behavior Codex will get wrong by default, because building something always feels more correct than building nothing. |
| **Make explicit** | Todd sends everything manually. That is now Rule 8, not a preference. |

**Edits made:** §10 gains a Weekly Review surface reference; §14 gains the artifact list; §17
replaced with a pointer to the milestone plan.

---

### 1.2 `POIS-TARGET-ARCHITECTURE.md`

| | |
|---|---|
| **Keep as-is** | §1 verified current-state inventory (this is the most valuable section in the entire set — it is the only place documenting that extraction is regex, not AI, and that no AI client exists). §1.5 blocking constraints C1–C4. §3.1 rationale for retiring `OiPursuit`. §4 cardinalities. §5 state machines. §7.6 next-action derivation. §11 provenance rules. §12 migration strategy. |
| **Simplify** | §6 service layout lists directories that will not exist until Milestone 3–4. Mark them by milestone so Codex does not create empty folders in Milestone 0. |
| **Defer** | §13's `OiPersonRole` (already deferred, correct). Scheduled recompute. |
| **Missing** | Canonical record list (§3) predates the eight new concepts. Added. No statement that Timeline and Executive Brief are *derived* — the highest-risk omission in the document. |
| **Codex will misunderstand** | §7.2's two-stage initiative inference. Codex will let the AI supply the confidence because the AI is producing the narrative in the same call. **Confidence comes from Stage 1 clustering. Always.** Also: §10's proof-matching adapter is read-only and must never write to `Asset`. |
| **Make explicit** | The `ai/` directory is created in Milestone 2, not Milestone 0. |

**Edits made:** §3 canonical records updated; new §3.2 "Derived, not stored"; §6 annotated by
milestone.

---

### 1.3 `POIS-DATA-MODEL.md`

| | |
|---|---|
| **Keep as-is** | §1 disposition table. §2 enums. §3 modifications to existing models. §4.1–4.14 new models. §5 raw-SQL constraints (the two partial unique indexes are load-bearing). §6 migration plan. §7 index rationale. |
| **Simplify** | `OiOutreachDraft` → `OiArtifact` with a `kind` enum. This absorbs all six requested artifact types plus proposal outline. Net: −5 tables versus the naive reading. |
| **Defer** | `OiRfpProfile` moves to post-October-1 with the rest of the RFP path. The model stays specified; it is simply not built yet. |
| **Missing** | `OiDecision`, `OiCampaign`, `OiCampaignOpportunity`, `OiPlaybook`, `OiWeeklyReview`. Offer enrichment fields. `OiOpportunityFact.personId` — needed so Executive Brief sections (career, talks, interviews) reuse the existing fact/provenance machinery instead of getting a new table. |
| **Codex will misunderstand** | The `@@map("OiOpportunityScore")` on the renamed `OiScore` model. Without it, Prisma emits a table rename and rewrites the table. Also: `ALTER TYPE ... ADD VALUE` cannot run inside a transaction in Postgres — the generated migration must be hand-edited. Both are called out in POIS-006 but are easy to skim past. |
| **Make explicit** | Adding `personId` to `OiOpportunityFact` makes it a general fact table. The model name stays (renaming costs a migration for nothing) but the CHECK constraint widens to three possible parents. |

**Edits made:** New §9 with all Milestone 2–4 models. §4.9 annotated as superseded by
`OiArtifact`.

---

### 1.4 `POIS-SCORING-AND-DECISION-MODEL.md`

| | |
|---|---|
| **Keep as-is** | Everything. §14's five worked examples are the golden fixtures and must reproduce exactly. §8.6 Priority Efficiency. §10 hard filters. §3.3 initiative confidence table. This document required no changes. |
| **Simplify** | Nothing. |
| **Defer** | §13 learning loop needs ≥10 closed outcomes. Those will not exist until roughly October. It ships in Milestone 4 and produces nothing useful until after the deadline — that is fine and expected, but say so. |
| **Missing** | The link between score and Decision Journal. The score already computes `estimatedValue`, `conversionProbability`, and `estimatedHours` — **these are the prediction.** The journal should pre-fill from the current score snapshot so Todd only supplies reason and confidence. This is what makes journaling low-friction enough to actually happen. |
| **Codex will misunderstand** | That fit retuning removes `evidence_strength` and `reporting_line` from `fit.ts`. Codex will preserve them because they exist in the shipped code. They move to the evidence and access axes; leaving them in double-counts. |
| **Make explicit** | The 60% probability cap is deliberate, not a bug. |

**Edits made:** New §16 documenting prediction capture. No other changes.

---

### 1.5 `POIS-OPERATOR-UX.md`

| | |
|---|---|
| **Keep as-is** | §1 design principles. §3 Today view (this is the daily driver and the wireframe is right). §4 intake including the duplicate and error states. §6 workbench with the `[ why? ]` panel — that panel is the trust mechanism for the whole system. §9 states. §10 duplicate handling. §12 accessibility. |
| **Simplify** | §7's RFP section moves out with the RFP path. |
| **Defer** | RFP section → post-October-1. |
| **Missing** | Executive Brief view (now the primary stakeholder surface, per the instruction). Weekly Review route. Campaign view. Timeline rendering in the workbench. Decision Journal capture — which must be inline at the point of decision, never a separate screen. |
| **Codex will misunderstand** | Two things. (a) The Today empty state gives a *directive*, not congratulations — there is an explicit test for this because Codex will write "You're all caught up!" by default. (b) Executive Brief is a **view assembled at request time**, not a stored document. It may be *snapshotted* into an `OiArtifact` when Todd prepares outreach, but the canonical brief is always derived from current data. |
| **Make explicit** | Route count moves from seven to nine (adding `/review` and `/campaigns`). Executive Brief lives at `/tif/oi/people/[id]` — it does not get its own route. |

**Edits made:** §2 route table updated to nine; new §6.5 Executive Brief; new §8.5 Weekly
Review; §7 RFP marked deferred.

---

### 1.6 `POIS-CODEX-IMPLEMENTATION-PLAN.md`

| | |
|---|---|
| **Keep as-is** | Slice 0 content (the schema unblock is unchanged and correct). The cross-slice testing standard. The "what Codex must not do" list. |
| **Simplify** | Slice-numbered structure replaced by milestones. The old numbering was already being executed out of order, which is a smell. |
| **Defer** | RFP (old Slice 7) → post-October-1. Proposal builder reduced from generator to template + checklist. |
| **Missing** | Decision Journal, Executive Brief, Playbooks, Campaigns, Weekly Review, Timeline had no home. Milestone structure now carries them. |
| **Codex will misunderstand** | The day-45 build freeze. Codex will treat it as advisory. It is not — it is the point where build time stops being worth more than conversion time. |
| **Make explicit** | Milestone 5 is post-deadline by definition and nothing should be scheduled against it before October 1. |

**Action:** Rewritten into Milestones 0–5.

---

### 1.7 `POIS-CODEX-TASKS.md`

| | |
|---|---|
| **Keep as-is** | The Milestone 0 tasks (POIS-001…008) are already correctly scoped and independently testable. |
| **Simplify** | Several Milestone 1 tasks were horizontal — POIS-101 through POIS-105 delivered pure services with no UI, violating the vertical-slice rule. Merged into vertical tasks that each ship something visible. |
| **Defer** | RFP tasks (POIS-701…703) → post-October-1 section, retained verbatim. |
| **Missing** | Rollback plan and migration plan were not stated per task. Now required on all. |
| **Codex will misunderstand** | That "no forward dependencies" means a task may not stub something a later task completes. If POIS-1xx needs a display of something POIS-2xx computes, it computes a simple version now — it does not stub. |
| **Make explicit** | Every task states rollback and migration, even when both are "none." |

**Action:** Rewritten to the nine-point contract.

---

### 1.8 `POIS-DECISIONS.md`

| | |
|---|---|
| **Keep as-is** | All 18 existing decisions. D-005 (draft-only) and D-017 (LinkedIn manual-only) are now reinforced as Rules 8 and in the escalation list. |
| **Simplify** | Nothing. |
| **Defer** | Nothing. |
| **Missing** | Decisions for the eight new concepts, plus the artifact-model consolidation and the decision-journal timing correction. |
| **Codex will misunderstand** | That D-004 (Anthropic) being unapproved blocks work. It does not — Milestones 0 and 1 are fully deterministic and ship without any AI. |
| **Make explicit** | Milestone 1 has zero AI dependency. That is a deliberate property, not an accident. |

**Action:** D-019 through D-030 appended.

---

### 1.9 `POIS-TRACEABILITY-MATRIX.md`

| | |
|---|---|
| **Keep as-is** | The chain structure, all ten BO traces, metric definitions, the "explicitly not tracked" list, and the rejected-features table. |
| **Simplify** | Nothing. |
| **Defer** | BO-10 (RFP) marked post-October-1. |
| **Missing** | Traces for the new concepts. |
| **Codex will misunderstand** | Nothing — this document is for scope control, not implementation. |

**Edits made:** New traces BO-11 (Decision Journal), BO-12 (Executive Brief), BO-13
(Campaigns), BO-14 (Weekly Review). BO-10 marked deferred.

---

## 2. The Decision Journal timing correction

**This is the most important finding in the review.**

The instruction places Decision Journal in Milestone 4. That is too late, and it would
silently destroy the capability's value.

The journal's purpose is capturing a **prediction before the outcome is known**. If it ships
in Milestone 4 (roughly week 5), every decision Todd makes in weeks 1–4 — which signals to
promote, which opportunities to qualify, which stakeholders to target, which offers to
propose, which outreach to send — is recorded only retrospectively, if at all. Retrospective
journaling is memory, not measurement, and it is exactly the bias the journal exists to
correct.

**Correction:** split the capability.

| Part | Milestone | Content |
|---|---|---|
| **Write side** | **1** | `OiDecision` model + inline capture at each decision point. Pre-filled from the current score snapshot. Todd adds reason + confidence. ~20 seconds. |
| **Read side** | **4** | Journal review, prediction-vs-reality delta, lessons, and the aggregate learning report. |

The write side is small — one table, one modal, pre-filled fields — and it is the thing that
makes Milestone 4 worth building at all.

**Low-friction design is mandatory.** The score already computes `estimatedValue`,
`conversionProbability`, `estimatedHours`, and `priorityEfficiency`. Those *are* the
prediction. The capture modal shows them read-only and asks for two things: why, and how
confident. If capture takes longer than 20 seconds, Todd will stop doing it within a week and
the entire learning loop dies quietly.

---

## 3. Playbooks must not replace the next-action engine

Codex will read "Instead of hardcoding workflows, store reusable commercial playbooks" and
delete `deriveNextAction()`. That would remove working, tested, deterministic logic and
replace it with data-driven indirection nobody has validated.

**The correct relationship:**

| Concern | Owner | Status |
|---|---|---|
| What is the single next action right now? | `deriveNextAction()` — deterministic table | **Ships Milestone 1. Do not remove.** |
| What research should I do for this kind of opportunity? | `OiPlaybook.researchSteps[]` | Milestone 2 |
| What is the follow-up cadence for this relationship type? | `OiPlaybook.followUpRhythmDays[]` | Milestone 2 |
| Which proof and offer usually fit? | `OiPlaybook.proofGuidance`, `offerGuidance` | Milestone 2 |

Playbooks are **checklists and cadences**, not a workflow engine. They inform the *due date*
of a follow-up action and populate a research checklist. They never decide *which* action is
next.

**Milestone 2 ships playbooks as data plus display only.** No execution engine. If playbooks
prove useful by mid-September, wiring cadence into due-date calculation is a small follow-up.

---

## 4. What is derived, not stored

Codex will build tables for both of these. It must not.

### Opportunity Timeline — derived

```
timeline(opportunityId) =
    OiSignal      where linked via initiative, ordered by occurredAt
  ⊎ OiActivity    where opportunityId, ordered by occurredAt
  ⊎ status changes (already OiActivity rows with type=status_change)
  → merge, sort by date, render
```

One query, one sort. **No `OiTimeline` model. No `OiTimelineEvent` model.** The narrative the
instruction describes (executive hired → transformation announced → role opened → RFP → proposal
→ outcome) is exactly this merge, already fully supported by the existing schema.

### Executive Brief — derived, optionally snapshotted

Assembled at request time from `OiPerson`, `OiStakeholder`, `OiOrganization`,
`OiOpportunityFact` (person-scoped), `OiSignal`, `OiResearchGap`, and `OiActivity`.

**No `OiBrief` model.** When Todd prepares outreach and wants the brief frozen alongside the
draft, it is written as an `OiArtifact` with `kind = executive_brief`. The canonical brief is
always current data; the artifact is a point-in-time copy.

The brief's sections (career, responsibilities, recent announcements, known initiatives,
likely priorities, likely KPIs, public interviews, conference talks, authority, relationship,
warm path, recommended approach, research gaps) map to:

| Section | Source |
|---|---|
| Career, responsibilities, interviews, talks | `OiOpportunityFact` with `personId` set |
| Recent announcements | `OiSignal` at the account, last 180 days |
| Known initiatives | `OiInitiative` at the account |
| Likely priorities, likely KPIs | `OiPlaybook` guidance + initiative category (**inferred — label it**) |
| Authority | `OiStakeholder.authority`, `accessScore` components |
| Relationship, warm path | `OiStakeholder.relationshipType`, `warmPathNotes` |
| Recommended approach | `OiPlaybook` + selected offer |
| Research gaps | `OiResearchGap` where `blocksOutreach` |

Adding `personId` to `OiOpportunityFact` is what makes this work without a new table — person
facts get the same provenance, confidence, and evidence-offset machinery everything else has.

---

## 5. What moves after October 1

Per the instruction: defer, do not delete. All specifications are retained.

| Capability | Was | Now | Why |
|---|---|---|---|
| RFP qualification | Slice 7 | Post-Oct-1 | Lowest-probability path; ~4 days that buy little before the deadline |
| Proposal **builder** | Slice 4 stretch | Post-Oct-1 | Reduced to a template + checklist in Milestone 3. Generated proposals are too high-stakes and too few to justify. |
| Relationship graph | — | Milestone 5 | Needs relationship density that will not exist by October |
| Pattern learning | Slice 8 | Milestone 5 | Requires ≥10 closed outcomes; earliest is roughly October |
| Market themes | — | Milestone 5 | Needs a corpus |
| Heat maps | — | Milestone 5 | Visualization of data that does not exist yet |
| Portfolio analytics | — | Milestone 5 | Same |
| ATS connectors | Deferred | Still deferred | Manual intake handles real volume |
| Contact enrichment | Deferred | Still deferred | Todd finds an email in five minutes |
| `OiPersonRole` history | Deferred | Still deferred | One current employer is sufficient |

**Milestone 5 in full is post-October-1.** Every capability in it depends on accumulated data
that will not exist before the deadline. Nothing should be scheduled against it.

---

## 6. What Codex will get wrong

Ranked by likelihood × damage.

| # | Trap | Prevention |
|---|---|---|
| 1 | Builds `OiTimeline` and `OiBrief` tables | §4 above; explicit "no new model" in the tasks |
| 2 | Deletes `deriveNextAction()` when adding Playbooks | §3 above; Playbooks are data-only in M2 |
| 3 | Lets the AI supply initiative confidence | Confidence comes from Stage-1 clustering; there is a test asserting the AI response's confidence field is ignored |
| 4 | Writes "You're all caught up!" for the Today empty state | Explicit test asserts the directive copy and the absence of congratulatory text |
| 5 | Creates an opportunity from a lone executive appointment | Worked Example C is a test fixture |
| 6 | Keeps `evidence_strength` / `reporting_line` in `fit.ts` | Golden fixtures fail if they remain |
| 7 | Misses `@@map("OiOpportunityScore")` → table rewrite | Called out in POIS-006 and in the migration checklist |
| 8 | Runs `ALTER TYPE ... ADD VALUE` inside a transaction | Same |
| 9 | Adds an SDK for the AI client | Rule: raw `fetch`, matching `src/lib/leads/notify.ts` |
| 10 | Makes AI a hard dependency of a page | Rule 7; the client returns `unavailable` and never throws |
| 11 | Builds Decision Journal as a separate screen | Capture is inline at the decision point, pre-filled |
| 12 | Treats the day-45 freeze as advisory | It is a hard stop |
| 13 | Wires Resend into POIS "since it is already there" | Rule 8; POIS-406 includes a grep test |
| 14 | Builds six artifact tables | One `OiArtifact` with a `kind` enum |
| 15 | Ships a service with no UI | Rule 1; the task contract requires user-visible output |

---

## 7. Assumptions now explicit

| # | Assumption | Consequence if wrong |
|---|---|---|
| A11 | Todd will journal a decision if it takes ≤20 seconds and is pre-filled | Learning loop dies; Milestone 4 becomes worthless |
| A12 | Todd will manually log sends | Follow-up scheduling breaks; the +7d next action is the mitigation |
| A13 | ~15 proof items and 7 offers are enough for credible matching | Matching returns weak results; fix is data, not code |
| A14 | 5–20 signals/day is real volume | If it is 100+/day, manual intake breaks and connectors become urgent |
| A15 | Playbooks as checklists are sufficient; no execution engine needed | Playbooks become shelfware; cost is one table |
| A16 | Executive Brief assembled at request time is fast enough (<1s) | Needs caching; unlikely at this data volume |
| A17 | Campaigns are a grouping, not a workflow | If Todd wants campaign-level actions, that is Milestone 5 |
| A18 | One weekly review per week is the right cadence | Adjust the period; the model stores an arbitrary date range |
| A19 | Milestone 1 needs zero AI | If the initiative narrative proves essential to usability, D-004 becomes urgent |
| A20 | Todd tests each milestone within 48 hours of ship | Defects compound; the schedule assumes fast feedback |

---

## 8. Remaining architecture risks

| Risk | Severity | Likelihood | Mitigation | Residual |
|---|---|---|---|---|
| Initiative clustering produces wrong groupings | **High** | Medium | Deterministic confidence table; Tier 2 alone cannot propose; operator approval required | Todd rejects bad clusters; friction but not failure |
| Todd stops journaling decisions | **High** | Medium | ≤20s capture, pre-filled from score, inline at decision point | Learning loop degrades to outcome-only |
| Value/probability estimates are badly calibrated | Medium | **High** | Estimates are for *ranking*, not forecasting; overrides always available; M4 measures accuracy | Ranking is directionally right even when absolute numbers are wrong |
| Manual logging discipline slips | Medium | Medium | Follow-up next actions create pull; weekly review surfaces gaps | Some activity unrecorded |
| AI drafts are not good enough to use | Medium | Medium | Claim validator blocks unsupported content; Todd edits; template fallback | Todd writes more himself; system still filters and researches |
| Build overruns into conversion time | **High** | Medium | Day-45 freeze; milestones ordered so M1 alone is useful | Ship less, still usable |
| Schema churn from the new M2–M4 models | Medium | Low | All additive; specified before implementation | Migration cost only |
| Two Prisma clients cause connection exhaustion | Low | Low | POIS-002 consolidates in M0 | None |
| Proof/offer seed data is thin | Medium | **High** | Todd populates; ~1 hour of work | Weak matching until populated — **this is Todd's task, not Codex's** |

**The two risks that actually decide the outcome:** Todd not journaling, and build time eating
conversion time. Both are behavioral, not technical, and both are addressed by making
Milestone 1 genuinely usable within a week.

---

## 9. Verdict

The architecture is implementable as specified, with the corrections in §2, §3, and §4
applied. The updated documents carry those corrections.

**Codex should not need to infer product behavior.** Where behavior was previously
inferable-but-unstated, it is now either an explicit acceptance criterion, a test, or a rule
in `docs/IMPLEMENTATION_RULES.md`.

**Stop architecting. Start with POIS-001.**
