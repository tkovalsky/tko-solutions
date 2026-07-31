# POIS Codex Implementation Plan

**Date:** 2026-07-31 (revised — milestone structure)
**Deadline:** 2026-10-01 (61 days)
**Read first:** `docs/IMPLEMENTATION_RULES.md`, then
`POIS-IMPLEMENTATION-READINESS-REVIEW.md`.

Task-level detail is in `POIS-CODEX-TASKS.md`. This document defines milestone boundaries,
ordering, and what each milestone is allowed to contain.

---

## 0. Milestone overview

| M | Name | Days | Ends | Todd can… |
|---|---|---|---|---|
| **0** | Stabilize repository | 1–3 | Aug 2 | (nothing new — schema unblocked) |
| **1** | **Daily Driver** | 4–10 | **Aug 9** | **Use it every morning** |
| **2** | Commercial Intelligence | 11–19 | Aug 18 | Know who to contact and what to offer |
| **3** | Manual Outreach | 20–29 | Aug 28 | Prepare everything he sends |
| **4** | Learning | 30–38 | Sep 6 | See whether his judgment is improving |
| — | Buffer / defects | 39–45 | **Sep 14** | **BUILD FREEZE** |
| **5** | Compounding Intelligence | — | **post-Oct-1** | *(not scheduled before the deadline)* |

**Milestone 1 is the only milestone that must land on time.** Everything after it improves a
system Todd is already using daily. If M1 slips, the deadline is at risk; if M3 slips, Todd
writes his own drafts for two more weeks and nothing breaks.

### The rule that governs milestone content

A capability belongs in Milestones 0–4 only if it serves **Capture · Understand · Decide ·
Act · Learn**. Anything else is deferred, not deleted.

### Milestone 1 has zero AI dependency

Deliberate. M0 and M1 are fully deterministic. If the Anthropic decision (D-004) is not
approved, or the API is unavailable, or prompts turn out badly — **Todd still has a working
daily driver on August 9.** AI first appears in M2 (initiative narrative) and matters most in
M3 (artifacts). Every AI path degrades to a deterministic fallback.

---

## Milestone 0 — Stabilize repository

**Days 1–3 · Tasks POIS-001 … POIS-009**

### Outcome
The four blocking schema constraints are gone, the module layout is stable, existing pursuit
data is migrated, and reference data is seeded. Nothing user-visible changes.

### Included
- Module reorganization into `intake/`, `intelligence/`, `commercial/`, `action/`, `queue/`,
  `reporting/` (**not** `ai/` — that arrives in M2).
- Prisma client consolidation.
- `todd-v2` capability profile.
- Schema: all new models from `POIS-DATA-MODEL.md` §2, §4, **and §9**.
- Drop `OiPursuit @@unique([personId, mode])`; relax `OiSource.opportunityId`; add
  `OiOpportunity.type`; extend `OiOpportunityStatus`.
- Backfill pursuits → opportunity + stakeholder + next action.
- Seeds: offers (enriched), proof items, playbooks.
- Harvest `scoreOpportunity()` → `scoreStakeholderAccess()`.

### Excluded
No UI. No AI. No behavior change. **`OiPursuit` is not dropped.**

### Why §9 models ship in M0
`OiDecision` must exist before M1 UI work so decision capture is available from the first
day Todd uses the system. Creating all tables in one migration is cheaper and safer than
three migrations across three milestones.

### Success criteria
- `npm test` passes with no test deleted or skipped.
- `/tif/opportunities` and `/tif/opportunities/sources` behave identically to before.
- Every `OiPursuit` row has an `opportunityId`; backfill is idempotent.
- `scoreStakeholderAccess()` reproduces old scores byte-identically.
- 7 offers, ≥10 proof items, 7 playbooks seeded.

### Technical risks
| Risk | Mitigation |
|---|---|
| `ALTER TYPE ... ADD VALUE` inside a transaction fails | Hand-edit the generated migration into separate statements |
| Prisma rewrites the score table on rename | `@@map("OiOpportunityScore")` — verify the SQL contains no `ALTER TABLE ... RENAME` |
| Import-path churn breaks tests | Move files and fix imports in one commit; no logic changes |

---

## Milestone 1 — Daily Driver

**Days 4–10 · Tasks POIS-101 … POIS-112 · The milestone that matters**

### Outcome
Todd opens POIS every morning, sees the three things worth doing, and does them. Under 30
minutes.

### Included

| Capability | Note |
|---|---|
| Manual intake | Paste / URL / org / type. Under 2 minutes. |
| Signal classification | Deterministic tiers, Tier 3 suppressed |
| Initiative clustering | Deterministic confidence. **No AI narrative yet.** |
| Opportunity classification | FTE / consulting / assessment / partnership |
| Decision engine | Full composite score: fit, evidence, access, urgency, EV, Priority Efficiency |
| Next actions | Deterministic derivation, one open per opportunity |
| Research gaps | Display, resolve with a finding, dismiss |
| Opportunity workbench | Overview, initiative, evidence, gaps, score explanation, timeline |
| Today dashboard | Top 5 by PE, overdue first, path diversity, what changed |
| **Decision journal — write side** | Inline capture, pre-filled from score. **Moved from M4.** |
| Minimal stakeholders | Name, role, authority, evidence, select — needed for next actions |
| Opportunity timeline | Derived view. **No new model.** |

### Excluded
No AI. No executive brief. No artifact generation. No playbook display. No campaigns. No
weekly review. No FTE role profile beyond the comp-floor hard filter. No RFP.

### User-visible result
Paste a job posting → see extracted facts with source quotes, a signal tier, a proposed
initiative with supporting signals, classified and scored opportunities → promote → get a
next action → see it ranked on Today tomorrow morning.

### Commercial use
Todd runs his real pipeline in POIS from **August 9**. Target for the following week: 15+
active opportunities, 5+ applications, 3+ direct outreach sent (drafted by hand for now).

### Success criteria
- Full daily loop completes in **under 30 minutes**.
- Every active opportunity has exactly one open next action.
- `[ why? ]` reproduces the scoring arithmetic exactly.
- All five worked examples from the scoring doc reproduce as golden fixtures.
- Decision capture takes **≤20 seconds**.
- With `ANTHROPIC_API_KEY` unset, everything still works.

### Technical risks
| Risk | Mitigation |
|---|---|
| Scoring miscalibrated against Todd's intuition | Overrides available from day one; M4 measures accuracy |
| Clustering groups unrelated signals | Operator approval required; Tier 2 alone cannot propose |
| Decision capture feels like friction | ≤20s, pre-filled, inline — measured, not assumed |

---

## Milestone 2 — Commercial Intelligence

**Days 11–19 · Tasks POIS-201 … POIS-210**

### Outcome
Todd knows who owns the problem, why he is relevant, and what to offer.

### Included

| Capability | Note |
|---|---|
| Full stakeholder intelligence | Role suggestion, candidate ranking, access scoring, contact points |
| **Executive brief** | **Derived view** at `/tif/oi/people/[id]`. Primary stakeholder surface. |
| Person facts | `OiOpportunityFact.personId` — career, talks, interviews, priorities |
| Offer library | Enriched: ideal buyer, problem, deliverables, objections, proof |
| Offer recommendation | Deterministic match: initiative category + opportunity type → offer |
| Proof matching | Tag overlap against `OiProofItem`. Read-only. |
| Playbooks | **Data and display only.** Checklists and cadences. No execution engine. |
| Campaigns | Grouping and rollup. Zero-or-more per opportunity. |
| AI client | First AI in the repo. Initiative narrative only. |
| Accounts view | Initiatives, people, signals, opportunities per account |

### Excluded
No artifact generation (M3). No playbook execution — playbooks inform research checklists and
follow-up due dates, and **`deriveNextAction()` is not modified**. No campaign-level actions.

### User-visible result
Open a stakeholder and get an assembled brief: career, responsibilities, recent announcements,
known initiatives, likely priorities, authority, relationship, warm path, recommended approach,
and the research gaps blocking outreach. Empty sections show what to research.

### Commercial use
Outreach quality rises because Todd walks into every conversation with a real brief. Target:
10+ researched outreach sent, 2+ replies, 1+ conversation scheduled.

### Success criteria
- Executive brief assembles in **under 1 second**.
- Every brief item shows basis and confidence; inferred content is visually distinct.
- Empty sections show a research prompt, never blank space.
- Offer recommendation matches Todd's intuition ≥80% of the time.
- With AI unavailable, initiatives keep their deterministic names and every page renders.

### Technical risks
| Risk | Mitigation |
|---|---|
| Codex deletes `deriveNextAction()` when adding playbooks | Explicit prohibition in the task; test asserts it still runs |
| Codex builds an `OiBrief` table | Explicit "derived, no model" in the task and the readiness review |
| AI narrative names a person | Post-validation rejects it, independent of the prompt |
| Proof/offer seed data thin | **Todd's task, ~1 hour.** Flag if not done by day 11. |

---

## Milestone 3 — Manual Outreach

**Days 20–29 · Tasks POIS-301 … POIS-309**

### Outcome
Everything Todd sends is prepared by the system and transmitted by Todd.

### Included

| Artifact | Gate |
|---|---|
| Research summary | Evidence exists |
| Executive brief snapshot | Evidence exists |
| Talking points | Evidence exists |
| Meeting prep | Evidence exists |
| Email draft | Full outreach gate |
| LinkedIn draft | Full outreach gate |
| Intro request | Full outreach gate + warm path |
| Application note | Full outreach gate |
| Follow-up draft | Prior outreach logged |
| **Proposal outline** | **Template + checklist, not generated prose** |

Plus: claim validator, outreach gate, activity log, follow-up scheduling, FTE role profile and
application tracking.

### Excluded — permanently, not deferred
**No email API. No LinkedIn API. No CRM sync. No calendar integration. No application
submission. No open/click tracking. No outbound automation of any kind.**

`OiArtifact` has no `sentAt` field. Sending is an `OiActivity` Todd logs.

### Why proposal builder is reduced
Generated proposals are high-stakes, low-volume, and Todd will rewrite them anyway. M3 ships a
structured outline — sections, the matched offer's deliverables, cited proof, a pricing
placeholder, and a checklist. Todd writes the prose. Full generation is post-October-1, and
only if 3+ real proposals reveal a repeatable structure.

### User-visible result
Click "Prepare outreach" → gates checked → research summary, matched proof, and a draft citing
specific evidence → edit → approve → **copy into your own email client and send** → log it →
follow-up scheduled automatically.

### Success criteria
- Unsupported claims **block approval** — button disabled, server action throws.
- Every draft cites specific evidence and proof.
- Approval never sends; the UI says so.
- Logging a send creates one activity and one +7-day follow-up.
- Draft preparation takes **under 20 minutes**.
- **`grep` for email/messaging API calls in POIS code returns nothing.**

### Technical risks
| Risk | Mitigation |
|---|---|
| Claim validator too permissive | It is the highest-value test file in the milestone |
| Claim validator too strict | Todd can add a supporting operator fact to unblock |
| Drafts not good enough to use | Todd edits; the system still did the research |
| Codex wires the existing Resend integration into POIS | Rule 8 + a grep test in POIS-309 |

---

## Milestone 4 — Learning

**Days 30–38 · Tasks POIS-401 … POIS-407**

### Outcome
Todd sees whether his judgment is improving, and where it is not.

### Included

| Capability | Note |
|---|---|
| **Decision journal — read side** | Write side already shipped in M1 |
| Prediction vs. reality | Value delta, effort delta, was-it-correct |
| Lessons learned | Captured on resolve, surfaced by pattern |
| Outcome recording | Terminal transitions require an outcome |
| Activity timeline | Extends the M1 timeline with decisions and outcomes |
| Weekly review | `/tif/oi/review` — auto-metrics + operator reflection |
| Conversion analysis | By signal type, score band, opportunity type, warm vs. cold |
| Estimate accuracy | Actual ÷ estimated for value and hours |
| Scorecard | Income replacement % on Today |

### Excluded
**No automatic weight tuning.** Analysis is advisory. A policy change is a new version Todd
activates explicitly, because reproducibility is what makes the ranking trustworthy.

### Honest note on timing
Conversion analysis needs ≥10 closed outcomes. At Todd's volume those will not exist until
roughly October. **M4 ships the machinery; the insight arrives after the deadline.** That is
expected and still worth building — the decision journal write side (M1) is what makes it
possible at all, and the weekly review is useful from week one regardless.

### User-visible result
Every Sunday: what changed, what closed, what stalled, which predictions were wrong, where
time went, pipeline EV, conversations, revenue, and one lesson.

### Success criteria
- Every terminal transition requires an outcome with a reason.
- Unresolved predictions surface in the weekly review.
- Income replacement percentage is correct on Today.
- Scorecard reports **no vanity metrics** (asserted by test).
- Running conversion analysis mutates **no** scoring weight (asserted by test).

---

## Milestone 5 — Compounding Intelligence

**POST-OCTOBER-1. Not scheduled. Do not build before the deadline.**

Relationship graph · pattern learning · market themes · heat maps · portfolio analytics.

Every capability here depends on accumulated data that will not exist by October 1 — dense
relationship history, 10+ closed outcomes, a multi-month signal corpus. Building any of it
before the deadline would consume conversion time to visualize an empty dataset.

Also parked here: RFP qualification (specs retained in the data model and scoring model),
full proposal generation, ATS connectors, contact enrichment, `OiPersonRole` history,
scheduled recompute, multi-user auth.

---

## Build freeze — day 45 (2026-09-14)

All development stops. Days 46–61 are conversion only: interviews, proposals, negotiation.

This is not advisory. Features shipped in the final two weeks cannot influence an October 1
outcome, and that time is worth more spent converting. If a milestone is incomplete on day 45,
it ships incomplete.

**Slip order** (what gets cut first if the schedule slips):
1. M4 conversion analysis (weekly review still ships)
2. M3 proposal outline
3. M2 campaigns
4. M2 playbooks
5. **M1 never slips.**

---

## Cross-milestone requirements

### Definition of done — every task
1. All acceptance criteria checked.
2. `npm test` green; no test deleted or skipped.
3. `npm run lint` clean; `npm run build` succeeds.
4. Rollback plan stated and verified.
5. Migration plan stated (or explicitly "none").
6. User-visible — Todd can see or do something new.
7. No `TIF_ACCESS_KEY` bypass introduced.
8. No outbound send capability introduced.
9. Docs invalidated by the change are updated in the same commit.

### Testing standard
Pure domain logic gets fixture-based unit tests. Server actions get Zod validation tests.
Pages get render tests for empty, loading, and error states. The five worked examples in
`POIS-SCORING-AND-DECISION-MODEL.md` §14 are golden fixtures and must reproduce exactly.

### Rollback posture
Milestones 1–4 are additive: new routes, new services, new tables. Rollback is removing the
route. Only M0's migration touches existing structures, and it is additive or relaxing
throughout.

---

## Weekly checkpoint

Every Sunday, answer in one line each:

1. Did the milestone land?
2. Is Todd using it daily?
3. What is the pipeline expected value?
4. What is the income replacement percentage?
5. Is anything blocked on Todd (seed data, approvals, testing)?

If (2) is "no" for two consecutive weeks, **stop building and fix usability.** A system Todd
does not open is worth nothing regardless of how many milestones landed.
