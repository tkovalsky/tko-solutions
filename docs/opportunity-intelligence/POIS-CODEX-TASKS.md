# POIS Codex Task Backlog

**Date:** 2026-07-31 (revised — vertical slices, nine-point contract)
**Read first:** `docs/IMPLEMENTATION_RULES.md`
**Ordering:** Strict. Execute top to bottom.

Every task below satisfies the nine-point contract: independently implementable ·
independently testable · user-visible · vertically sliced · no forward dependencies ·
acceptance criteria · rollback plan · test plan · migration plan.

**Standing preconditions** (not repeated per task): routes under `/tif/oi/*`;
`robots: noindex`; `export const dynamic = "force-dynamic"`; Zod on every server-action input;
domain logic in `src/lib/opportunity-intelligence/`; `npm test` green before done.

---

# Milestone 0 — Stabilize (POIS-001 … POIS-009)

M0 is the one milestone whose tasks are *not* user-visible. That is deliberate and it is the
only exemption in the backlog — the schema cannot be unblocked incrementally.

---

## POIS-001 — Reorganize the OI module into bounded contexts

**Story:** As Codex, I need a stable module layout so later tasks land in predictable places.

**Scope:** Move files. **Change no logic.**

| From | To |
|---|---|
| `sources/normalize.ts` | `intake/normalize.ts` |
| `extract.ts` | `intake/extract.ts` |
| `ingest.ts` | `intake/ingest.ts` |
| `research-gaps.ts` | `intelligence/research-gaps.ts` |
| `score.ts` | `commercial/score/fit.ts` |

Move each `*.test.ts` alongside its subject. Create `action/`, `queue/`, `reporting/` with
`.gitkeep`. **Do not create `ai/`** — that is POIS-206.

**Files:** the five above + tests; `src/app/tif/opportunities/actions.ts`,
`src/app/tif/opportunities/sources/page.tsx` (import paths only).

**Data model:** none. **Migration:** none.
**API contract:** unchanged — identical exported symbols.
**UI behavior:** unchanged.

**Automated tests:** existing suite passes with import-path changes only.
**Manual test:** `/tif/opportunities/sources` still ingests a pasted posting.
**Acceptance:** `git diff` shows only renames and import lines. `npm test` and
`npm run build` pass.
**Rollback:** `git revert` — pure file moves.
**Dependencies:** none.
**Excluded:** any behavior change.

---

## POIS-002 — Consolidate the duplicate Prisma clients

**Story:** As Codex, I need one Prisma client so connection pooling is predictable.

**Rationale:** `src/lib/db/prisma.ts` and `src/lib/tif/db.ts` each instantiate a
`PrismaClient` with identical config against the same database.

**Scope:** `src/lib/tif/db.ts` becomes:
```ts
// Alias retained so existing TIF imports keep working.
// Canonical client: src/lib/db/prisma.ts
export { prisma as tifDb } from "@/lib/db/prisma";
```
Do **not** rewrite the ~20 `tifDb` call sites.

**Data model:** none. **Migration:** none.
**Automated tests:** existing suite passes.
**Manual test:** `/tif`, `/tif/opportunities`, `/tif/inbox` all render.
**Acceptance:** exactly one `new PrismaClient()` in `src/`.
**Rollback:** restore the file.
**Dependencies:** none.

---

## POIS-003 — Add the `todd-v2` capability profile

**Scope:** Add `TODD_CAPABILITY_PROFILE_V2` per `POIS-SCORING-AND-DECISION-MODEL.md` §4,
including the `thresholds` object. **Keep v1 exported unchanged** — historical snapshots must
stay reproducible.

**Files:** `capability-profile.ts`.
**Data model:** none (code constant). **Migration:** none.
**Automated tests:** v1 byte-identical; v2 is a superset of v1 domains;
`thresholds.fteCompFloor === 225000`; `thresholds.targetAnnualIncome === 300000`.
**Acceptance:** both versions export; v1 untouched.
**Rollback:** remove the v2 export.
**Dependencies:** POIS-001.
**Excluded:** do not change any scoring function yet.

---

## POIS-004 — Add all POIS models to the Prisma schema

**Scope:** Add every enum and model from `POIS-DATA-MODEL.md` §2, §4, **and §9** in one pass:

- §2 enums + §9 enums (`OiDecisionType`, `OiDecisionConfidence`, `OiPlaybookScope`,
  `OiArtifactKind`, `OiArtifactStatus`).
- §4 models: `OiSignal`, `OiInitiative`, `OiInitiativeSignal`, `OiOpportunitySource`,
  `OiStakeholder`, `OiContactPoint`, `OiNextAction`, `OiActivity`, `OiRoleProfile`,
  `OiOutcome`, `OiOffer`, `OiProofItem`, `OiOpportunityProof`.
- §9 models: `OiDecision`, `OiCampaign`, `OiCampaignOpportunity`, `OiPlaybook`, `OiArtifact`,
  `OiWeeklyReview`.
- Rename `OiOpportunityScore` → `OiScore` **with `@@map("OiOpportunityScore")`**.

**Do NOT create `OiOutreachDraft`** — `OiArtifact` supersedes it.
**Do NOT create `OiRfpProfile`** — deferred to post-October-1.
**Do NOT create `OiTimeline`, `OiTimelineEvent`, or `OiBrief`** — both are derived (§9.7, §9.8).

**Files:** `prisma/schema.prisma`.
**Migration:** none yet (POIS-006).
**Automated tests:** N/A.
**Manual test:** `npx prisma validate` and `npx prisma generate` succeed; the generated client
exposes every new model.
**Acceptance:** schema validates; no `OiOutreachDraft`, `OiTimeline`, or `OiBrief` model exists.
**Rollback:** revert the schema file.
**Dependencies:** POIS-003.

---

## POIS-005 — Modify existing models; remove the four blocking constraints

**Scope:** Per `POIS-DATA-MODEL.md` §3 and §9.2/§9.9:

- `OiOrganization`: `domain`, `sizeBand`, `tier`, `isWatched`, `aliases`, `headquarters` + indexes.
- `OiPerson`: `linkedinUrl`, `lastVerifiedAt`, `doNotContact` + index.
- `OiSource`: `opportunityId` → **optional**; new relations; `retrievedAt` index. **(C2)**
- `OiOpportunity`: `type` (required), `initiativeId?`, `offerId?`, `playbookId?`, value/
  probability/hours fields, lifecycle bookkeeping, all new relations, 3 indexes.
- `OiOpportunityFact`: `opportunityId` → optional; add `initiativeId?`, **`personId?`**,
  `aiGenerated`, `aiModel`, `promptVersion` + indexes.
- `OiEvidence`, `OiResearchGap`: `opportunityId` → optional; add `initiativeId?`;
  `OiResearchGap` gains `priority`, `blocksOutreach`, `suggestedSources`.
- `OiOffer`: six enrichment columns (§9.9).
- `OiPursuit`: add `opportunityId?`; **delete the `@@unique([personId, mode])` line. (C1, C3)**
- Extend `OiOpportunityStatus` with every value in §2. **(C4)**

**Files:** `prisma/schema.prisma`.
**Migration:** none yet.
**Manual test:** `npx prisma validate` passes.
**Acceptance:** `@@unique([personId, mode])` is gone; `OiOpportunityFact.personId` exists.
**Rollback:** revert the schema file.
**Dependencies:** POIS-004.

---

## POIS-006 — Generate and apply the `add_pois_core` migration

**Scope:** `npm run tif:migrate -- --name add_pois_core`, then **hand-edit the generated SQL**:

1. `ALTER TYPE "OiOpportunityStatus" ADD VALUE '…'` — one statement per value, **outside any
   transaction block**. Postgres requires this.
2. `OiOpportunity.type` — add nullable, backfill, then set NOT NULL:
   ```sql
   ALTER TABLE "OiOpportunity" ADD COLUMN "type" "OiOpportunityType";
   UPDATE "OiOpportunity" SET "type" = 'consulting' WHERE "type" IS NULL;
   ALTER TABLE "OiOpportunity" ALTER COLUMN "type" SET NOT NULL;
   ```
3. Backfill `OiOpportunitySource`:
   ```sql
   INSERT INTO "OiOpportunitySource" ("opportunityId","sourceId","isPrimary","createdAt")
   SELECT "opportunityId","id",TRUE,"createdAt" FROM "OiSource"
   WHERE "opportunityId" IS NOT NULL ON CONFLICT DO NOTHING;
   ```
4. Raw SQL from §5 + §9: two partial unique indexes, the widened three-parent CHECK on
   `OiOpportunityFact`, CHECKs on `OiEvidence`/`OiResearchGap`, the value-band CHECK, and
   `DROP INDEX IF EXISTS "OiPursuit_personId_mode_key";`

**Verify the SQL contains no `ALTER TABLE … RENAME`** — if it does, `@@map` is missing.

**Files:** `prisma/migrations/2026xxxx_add_pois_core/migration.sql`.
**Automated tests:** existing suite passes post-migration.
**Manual test:** `npm run tif:migrate:status` reports applied; row counts for
`OiOpportunity`, `OiPursuit`, `OiSource`, `OiPerson`, `OiOrganization` unchanged;
`/tif/opportunities` and `/tif/opportunities/sources` still work.
**Acceptance:** migration applied; every `OiOpportunity.type = 'consulting'`;
`OiOpportunitySource` count equals the prior non-null `OiSource.opportunityId` count.
**Rollback:** `DROP TABLE` on new tables, `DROP COLUMN` on new columns. No existing data was
modified except the `type` backfill, reversible by dropping the column.
**Dependencies:** POIS-005.

---

## POIS-007 — Harvest `scoreOpportunity()` → `scoreStakeholderAccess()`

**Story:** As Todd, I need the well-tuned pursuit-scoring logic preserved as stakeholder access
scoring rather than discarded with `OiPursuit`.

**Scope:** Create `commercial/score/access.ts`. Port **every** component and penalty from
`src/lib/oi.ts` unchanged: seniority points, budget/hiring/transformation/relationship levels,
source confidence, seniority gate (−20), authority gap (−8), missing source (−10), stale role
(−6), do-not-contact hard filter.

Add the three new components from `POIS-SCORING-AND-DECISION-MODEL.md` §6 (warm path, role
clarity, contact reachability) as **optional inputs defaulting to 0**, so ported fixtures score
identically. `src/lib/oi.ts` re-exports for one release.

**API contract:**
```ts
export function scoreStakeholderAccess(input: StakeholderAccessInput): StakeholderAccessResult;
// { score: number; components: ScoreComponent[]; warnings: string[]; policyVersion: string }
```
**Data model:** none. **Migration:** none.
**Automated tests:** every case in `src/lib/oi.test.ts` ported and producing an **identical
numeric score**; each new component tested in isolation; DNC hard filter asserted.
**Acceptance:** ported fixtures match exactly.
**Rollback:** revert; `src/lib/oi.ts` still holds the original.
**Dependencies:** POIS-006.
**Excluded:** do not delete `src/lib/oi.ts`; do not change `OI_STARTER_PEOPLE`.

---

## POIS-008 — Backfill pursuits

**Scope:** `scripts/oi/backfill-pursuits.mjs` per `POIS-TARGET-ARCHITECTURE.md` §12 Step 2.
Idempotent via `WHERE "opportunityId" IS NULL`. Follows the `scripts/tif/*.mjs` adapter
pattern. Add `"oi:backfill"` to `package.json`.

**Data model:** writes only. **Migration:** data migration, not schema.
**Automated tests:** `backfill.test.ts` — idempotency with fixtures; pursuit-status → opportunity-status mapping.
**Manual test:** run twice; row counts identical after the second run. Every `OiPursuit` has an
`opportunityId`; each has one `OiStakeholder` and one open `OiNextAction`.
**Acceptance:** all pursuits migrated; script is idempotent.
**Rollback:** delete created `OiOpportunity` rows where `title LIKE '%(migrated)'` and null the
`OiPursuit.opportunityId` values. **`OiPursuit` data is never modified.**
**Dependencies:** POIS-006.

---

## POIS-009 — Seed offers, proof items, and playbooks

**Scope:** Three seeds, upsert by `slug`, idempotent:
- `seed-offers.mjs` — 7 offers with the §9.9 enrichment fields.
- `seed-proof.mjs` — ≥10 `OiProofItem` rows.
- `seed-playbooks.mjs` — 7 playbooks, one per `OiPlaybookScope`.

Add `"oi:seed"` to `package.json` running all three.

> **Codex writes the scripts with placeholder tag values. Todd supplies the real content**
> from `docs/CASE_STUDY_LIBRARY.md`, `docs/HEALTHCARE_FRAMEWORK_LIBRARY.md`, and
> `CURRENT_REALITY.md`. Flag as blocked-on-Todd if not populated by day 11.

**Migration:** data seed.
**Automated tests:** idempotency; 7 offers, ≥10 proof items, 7 playbooks after two runs.
**Acceptance:** all three seeds run clean twice.
**Rollback:** `DELETE` by slug.
**Dependencies:** POIS-006.

---

# Milestone 1 — Daily Driver (POIS-101 … POIS-112)

**Every task from here is user-visible.** No task ships a service with no UI.

---

## POIS-101 — Intake page: capture a source and see extracted facts

**Story:** As Todd, I paste a job posting and immediately see what the system extracted, with
the exact quote behind each fact.

**Scope — vertical:**
- `src/app/tif/oi/layout.tsx` — shell, nav (Today / Intake / Pipeline / Accounts), Oct-1
  countdown, badge counts from one aggregate query.
- `src/app/tif/oi/page.tsx` — `redirect("/tif/oi/today")`.
- `src/app/tif/oi/today/page.tsx` — placeholder ("Today arrives in POIS-110").
- `src/app/tif/oi/intake/page.tsx` + `actions.ts` — 4-field capture form.
- Service: extend `intake/ingest.ts` to return facts + gaps. Preserve **every** existing
  guarantee (transactional, hash idempotency, verified offsets, override preservation, gap
  reconciliation, append-then-repoint snapshots).

**UI behavior:** Paste → facts table with field, value, confidence, and a click-to-reveal
source quote. Duplicate paste shows the existing-source notice with "capture anyway."
Content < 200 chars → "Too short to extract from."

**Data model:** none new. **Migration:** none.
**Automated tests:** form validation; duplicate notice; short-content error; extraction returns
facts with verified offsets; offset mismatch throws.
**Manual test:** paste a real posting; facts appear in under 5 seconds; capture takes under 2
minutes.
**Acceptance:** every fact links to an exact quote; duplicates do not create a second source.
**Rollback:** delete `/tif/oi/*`; `/tif/opportunities/sources` still works.
**Dependencies:** POIS-009.

---

## POIS-102 — Signal tier on the intake review screen

**Story:** As Todd, I see whether what I just pasted is worth my attention.

**Scope — vertical:** `intake/classify-signal.ts` (pure, per scoring §3.1–3.2) + tier display
on the review screen with the reasons that produced the strength.

**API contract:**
```ts
export function classifySignal(input: {...}):
  { tier: OiSignalTier; signalType: OiSignalType; strength: number;
    confidence: number; domainTags: string[]; reasons: string[] };
```
Persist `OiSignal` on capture.

**UI behavior:** `Tier 1 · Senior role posting · strength 87` with an expandable reason list.

**Data model:** writes `OiSignal`. **Migration:** none.
**Automated tests:** all 20 signal types map to the right tier; each strength modifier in
isolation; recency boundaries at 7/30/90 days; aggregator penalty when the URL host ≠
`organization.domain`; clamp at 0 and 100.
**Manual test:** paste a Tier 1 posting and a Tier 3 news item; tiers differ correctly.
**Acceptance:** tier and strength display with plain-language reasons.
**Rollback:** hide the tier block; `OiSignal` rows are harmless.
**Dependencies:** POIS-101.

---

## POIS-103 — Proposed initiative on the intake review screen

**Story:** As Todd, I see when three signals at one company mean something one signal does not.

**Scope — vertical:** `intelligence/initiative-inference.ts` (deterministic clustering only,
per scoring §3.3) + the proposed-initiative block on the review screen.

**Clustering:** same account, 90-day window, ≥1 shared domain tag. Confidence from the fixed
table. Decay −0.10/90d, floor 0.20. **Auto-propose only at ≥0.45.** Deterministic name
`{Account} — {dominant tag} initiative`.

**UI behavior:** dashed border + `inferred · 0.88` chip; supporting signals listed with dates
and source links; likely owner **roles** (never names).

**Data model:** creates `OiInitiative` + `OiInitiativeSignal` on promote. **Migration:** none.
**Automated tests:** every confidence row in §3.3; **Tier 2 alone never proposes** (explicit
test); 90-day boundary at 89/90/91; decay; attach-to-existing preferred over creating new when
tags overlap.
**Manual test:** paste three related signals at one account; the third proposes a 0.88
initiative citing all three.
**Acceptance:** proposal appears at ≥1 Tier 1 signal; never for Tier 2 alone; inferred styling
is visually distinct.
**Rollback:** hide the block.
**Dependencies:** POIS-102.
**Excluded:** no AI narrative (that is POIS-207).

---

## POIS-104 — Opportunity classification and promotion

**Story:** As Todd, I decide what this source becomes — and one posting can legitimately become
both an FTE role and a consulting engagement.

**Scope — vertical:** `commercial/classify-opportunity.ts` (rules table, scoring §2) +
checkbox list on the review screen + `promoteSignal` / `dismissSignal` / `watchAccount` actions.

`promoteSignal` persists: `OiInitiative` (if approved), one `OiOpportunity` per selected type,
`OiOpportunitySource` links.

**UI behavior:** each candidate shows type, reason, and — where a hard filter fires — the rule
name and what it means (e.g. "comp max $210,000 < $225,000 floor; keep as a consulting signal").
Dismiss requires a reason.

**Data model:** creates `OiOpportunity`. **Migration:** none.
**Automated tests:** each classification rule; a Director posting at a payer yields **both**
`fte` and `consulting`; a lone `leadership_appointment` yields **empty** (Worked Example C);
procurement domain yields `rfp`; dismiss rejects an empty reason.
**Manual test:** run Worked Examples A and C from the operating manual §18 end to end.
**Acceptance:** Example A produces two candidates with the FTE one disqualified; Example C
produces **no opportunity** and sets an account watch.
**Rollback:** delete created opportunities.
**Dependencies:** POIS-103.

---

## POIS-105 — Composite score with a visible breakdown

**Story:** As Todd, I need to know what an opportunity is worth and why, or I will not trust the
ranking.

**Scope — vertical:** `commercial/score/` — `evidence.ts`, `urgency.ts`, `value.ts`,
`priority.ts`, `disqualify.ts`, `index.ts` — plus retuning `fit.ts` to the §4 weights, plus a
score summary on the intake review screen.

**Retune `fit.ts`:** add `domain` (15) and `seniority_scope` (10); **remove
`evidence_strength` and `reporting_line`** — they move to the evidence and access axes.
Leaving them double-counts.

**API contract:** exactly `POIS-SCORING-AND-DECISION-MODEL.md` §15. Pure. Persists `OiScore`.

**UI behavior:** `Fit 100 · Evidence 65 · Access 0 · $626/hr` with value math beneath.

**Data model:** creates `OiScore`. **Migration:** none.
**Automated tests — highest-value file in the milestone:** golden fixtures reproducing **all
five** worked examples in §14 (asserting every axis, value, probability, EV, hours, PE); each
hard filter in §10 firing in isolation with the right rule name; probability capped at 60%;
assessment expansion `$6,500 + 0.40 × $60,000 = $30,500`; determinism across 100 runs; the §14
PE ordering holds when the five are sorted.
**Manual test:** score matches the documented example values exactly.
**Acceptance:** all five worked examples reproduce.
**Rollback:** revert `fit.ts` and hide the summary.
**Dependencies:** POIS-104.

---

## POIS-106 — Next action on every opportunity

**Story:** As Todd, every opportunity tells me the single next thing to do and how long it takes.

**Scope — vertical:** `commercial/next-action.ts` (table from architecture §7.6, **first match
wins**) + next-action display on the intake review screen + creation on promote.

Enforced by the partial unique index: exactly one `status = open` per opportunity.

**Data model:** creates `OiNextAction`. **Migration:** none.
**Automated tests:** every row of the derivation table; ordering respected when multiple
conditions hold; the 14-day stale rule; the partial unique index rejects a second open action.
**Manual test:** promote an opportunity; it has exactly one next action with a time estimate.
**Acceptance:** 100% of created opportunities have exactly one open next action.
**Rollback:** hide the display; rows are harmless.
**Dependencies:** POIS-105.

---

## POIS-107 — Pipeline list

**Story:** As Todd, I can find any opportunity and see what is stalled.

**Scope — vertical:** `src/app/tif/oi/opportunities/page.tsx` per UX §5 — filters (path,
state), sort by PE, the stale warning row (14+ days), and the **"no next action" defect row**.

**Data model:** none new. **Migration:** none.
**Automated tests:** filters compose; stale detection at the 14-day boundary; opportunities
with no open next action are counted in the defect row.
**Manual test:** filter to FTE only; sort by PE; both work.
**Acceptance:** both warning rows render and link to the affected records.
**Rollback:** delete the route.
**Dependencies:** POIS-106.

---

## POIS-108 — Workbench: overview, initiative, evidence, gaps

**Story:** As Todd, one page shows me everything known about an opportunity and how we know it.

**Scope — vertical:** `src/app/tif/oi/opportunities/[id]/page.tsx` + `actions.ts` — the first
four sections of UX §6 plus anchored jump nav. Service: `commercial/lifecycle.ts`
(`canTransition`, state machines from architecture §5).

Actions: `updateOpportunityStatus`, `approveInitiative`, `editInitiativeHypothesis`,
`resolveResearchGap`, `dismissResearchGap`, `addOperatorFact`, `recomputeScore`.

`resolveResearchGap` creates an operator fact (`basis = operator`,
`isOperatorOverride = true`), resolves the gap, and rescores — one transaction.

**UI behavior:** facts show quote + offset on click; inferred content dashed + chipped; blocked
transitions name their blockers; sibling opportunities on the same initiative listed with PE.

**Data model:** none new. **Migration:** none.
**Automated tests:** every valid/invalid transition per type; reason required for paused and
terminals; gap resolution creates a fact and rescores; hypothesis styling uses different class
names than fact styling.
**Manual test:** resolve a gap in under 30 seconds; score updates within 2 seconds.
**Acceptance:** all four sections render; invalid transitions blocked with specific reasons.
**Rollback:** delete the route.
**Dependencies:** POIS-107.

---

## POIS-109 — Score explanation panel

**Story:** As Todd, I can audit any ranking — otherwise I will stop following it.

**Scope — vertical:** `score-panel.tsx` (client, collapsible) rendering the full breakdown from
UX §6: every component with points/max/reason, and the complete EV arithmetic including each
probability multiplier and the effort-reduction factors.

**Data model:** none. **Migration:** none.
**Automated tests:** panel reproduces the §14.2 worked example arithmetic exactly, including the
60% cap and the `× 0.7 researched × 0.8 known-stakeholder` effort reductions.
**Manual test:** open the panel on a real opportunity; the arithmetic is followable.
**Acceptance:** a Todd-readable derivation of PE is visible for any opportunity.
**Rollback:** collapse the panel permanently.
**Dependencies:** POIS-108.

---

## POIS-110 — Today dashboard

**Story:** As Todd, I open one screen every morning and know what to do.

**Scope — vertical:** `queue/today.ts` (ranking per scoring §9 **including path diversity**),
`queue/changes.ts` (48h window, cap 6), `reporting/pipeline-summary.ts`, and
`src/app/tif/oi/today/page.tsx` + `opportunity-card.tsx` per UX §3 — replacing the POIS-101
placeholder.

Actions: `snoozeOpportunity` (3d/1w/2w, no reason), `dismissOpportunity` (**reason required**),
`completeNextAction` (derives the successor).

**UI behavior:** header (countdown + pipeline %) paints before cards. Overdue above everything.
Max 5 cards. `[ Start ]` deep-links to the workbench anchor for the action type.
**Empty state gives a directive and the gap to target — never congratulations.**

**Data model:** none new. **Migration:** none.
**Automated tests:** cap 5; dismissed/paused/snoozed/terminal suppressed; initiative confidence
< 0.30 excluded; overdue ordering; **path diversity asserted** (a fixture where pure PE would
return 5 consulting items must return ≥1 FTE); empty state contains the directive copy and
**does not** contain congratulatory text; income replacement = `expectedValueTotal / 300000`.
**Manual test:** **complete a full daily loop in under 30 minutes.**
**Acceptance:** all UX §3 elements present; loop under 30 minutes.
**Rollback:** restore the placeholder.
**Dependencies:** POIS-109.

---

## POIS-111 — Decision journal: capture

**Story:** As Todd, when I make a call, the system records what I predicted — so later I can
find out whether I was right.

**Rationale:** Moved from Milestone 4. A journal that starts in week 5 has no record of weeks
1–4. See `POIS-IMPLEMENTATION-READINESS-REVIEW.md` §2.

**Scope — vertical:** `action/decision.ts` + an inline capture modal on each decision point
(promote, dismiss, qualify, disqualify, close, pause).

**The modal shows the prediction read-only, pre-filled from the current `OiScore`:**
expected value, expected effort hours, expected probability. **Todd supplies two things:**
`reason` (required) and `confidence` (low/medium/high). Optional: `expectedOutcome`.

**Data model:** creates `OiDecision` with `scoreIdAtDecision`. **Migration:** none (table
shipped in POIS-004).
**Automated tests:** prediction fields pre-fill from the current score; `reason` required;
`scoreIdAtDecision` set; a reversed decision creates a **new** row rather than editing.
**Manual test:** **capture completes in ≤20 seconds** — measure it.
**Acceptance:** every decision-point action opens the modal; ≤20s capture; predictions
pre-filled.
**Rollback:** skip the modal; the action still completes.
**Dependencies:** POIS-110.
**Excluded:** no review, no delta, no lessons (POIS-401).

---

## POIS-112 — Opportunity timeline

**Story:** As Todd, I see the narrative of an opportunity — what happened, in order.

**Scope — vertical:** `action/timeline.ts` (`buildTimeline`) + a timeline section on the
workbench.

> **DERIVED. Create no model.** Merge `OiSignal` (via initiative), `OiActivity`,
> status-change activities, and `OiDecision`, sorted by date. See data model §9.7.

**UI behavior:** vertical list, oldest first, each entry with date, kind icon, label, and a
source link where one exists.

**Data model:** **none — read-only.** **Migration:** none.
**Automated tests:** merge ordering across all four sources; empty timeline renders a hint;
**assert no `OiTimeline` table is referenced**.
**Manual test:** an opportunity with 3 signals and 2 activities shows 5+ ordered entries.
**Acceptance:** produces the executive-hired → role-opened → outreach → outcome narrative from
existing data.
**Rollback:** hide the section.
**Dependencies:** POIS-111.

---

# Milestone 2 — Commercial Intelligence (POIS-201 … POIS-210)

---

## POIS-201 — Stakeholder capture and selection
**Vertical:** `intelligence/stakeholder-suggest.ts` (role map for all 13 initiative
categories) + stakeholder section and form on the workbench + `addStakeholder`,
`updateStakeholder`, `selectStakeholder`, `markDoNotContact`.
**Tests:** every category returns ≥2 roles; FTE adds `hiring_manager`; one-selected invariant
holds (partial unique index); **a stakeholder with no evidence and no operator confirmation
cannot be selected**; DNC blocks selection.
**Manual:** add a stakeholder in under 2 minutes.
**Acceptance:** suggested roles per category; exactly one selectable.
**Rollback:** hide the section. **Migration:** none. **Deps:** POIS-112.

## POIS-202 — Access score wired into ranking
**Vertical:** `accessScore` = max across stakeholders in `commercial/score/index.ts`; the three
new components enabled; access breakdown visible in the score panel.
**Tests:** warm history yields ×2.5 on probability; access ≥70 yields ×1.4; 60% cap holds;
adding a stakeholder changes PE.
**Acceptance:** access changes visibly move the ranking. **Rollback:** default the new
components to 0. **Migration:** none. **Deps:** POIS-201.

## POIS-203 — Contact points with provenance
**Vertical:** `addContactPoint` + display. Provenance **required**. `pattern_inferred` storable
but excluded from outreach eligibility.
**Tests:** missing provenance rejected; `pattern_inferred` excluded from the gate; uniqueness on
`(personId, type, value)`.
**Acceptance:** provenance always captured. **Rollback:** hide the form. **Migration:** none.
**Deps:** POIS-202.

## POIS-204 — Person facts
**Vertical:** `addPersonFact` writing `OiOpportunityFact` with `personId` — career,
responsibilities, interviews, talks. Same provenance machinery as every other fact.
**Tests:** three-parent CHECK accepts a person-only fact; person facts appear on the person page.
**Acceptance:** person facts carry basis, confidence, and source. **Rollback:** hide the form.
**Migration:** none (column shipped in POIS-005). **Deps:** POIS-203.

## POIS-205 — Executive brief
**Story:** As Todd, I open a stakeholder and get a real briefing before any conversation.
**Vertical:** `action/executive-brief.ts` + `/tif/oi/people/[id]` per UX §6.5.
> **DERIVED. Create no `OiBrief` model.** Sections map per data model §9.8.
**UI:** every item shows basis + confidence; inferred visually distinct; **empty sections show a
research prompt, never blank space**.
**Tests:** each section maps to the right source; empty sections render a gap prompt;
inferred items styled distinctly; **assembly under 1 second** with a realistic fixture;
**assert no `OiBrief` table is referenced**.
**Acceptance:** all 13 sections render; brief assembles in <1s.
**Rollback:** delete the route. **Migration:** none. **Deps:** POIS-204.

## POIS-206 — AI client adapter
**Vertical:** `ai/client.ts` — `generateStructured<T>()`, raw `fetch`, **no new SDK**, honoring
the already-declared env vars. **Never throws** — returns `{ status: "unavailable", reason }`.
Surfaced as an AI-status indicator in the shell.
**Tests:** missing key / timeout / non-2xx / malformed JSON / schema mismatch all return
`unavailable`; **assert it never throws** across all cases; success returns `ok` with model and
prompt version.
**Acceptance:** all failure modes degrade; `package.json` unchanged.
**Rollback:** unset `ANTHROPIC_API_KEY`. **Migration:** none. **Deps:** POIS-205.

## POIS-207 — AI initiative narrative
**Vertical:** `generateInitiativeNarrative()` + prompt `initiative-narrative-v1` + narrative
display on the workbench initiative section.
**Constraints enforced by post-validation, not just the prompt:** never names a person;
cites only supplied excerpts; **confidence always comes from POIS-103 clustering, never the
model**.
**Tests:** unavailable → deterministic name retained; a response naming a person is rejected;
**the AI response's confidence field is ignored** (explicit assertion).
**Acceptance:** narrative improves readability; nothing breaks without AI.
**Rollback:** unset the key. **Migration:** none. **Deps:** POIS-206.

## POIS-208 — Offer library and recommendation
**Vertical:** offer section on the workbench + `selectOffer` + deterministic recommendation
(initiative category + opportunity type → offer).
**UI:** ideal buyer, problem solved, deliverables, typical objections, price band.
**Tests:** recommendation deterministic per category; selecting an offer updates
`estimatedValue` and rescores.
**Acceptance:** recommendation matches Todd's intuition ≥80% on 5 real opportunities.
**Rollback:** hide the section. **Migration:** none (enrichment shipped in POIS-005/009).
**Deps:** POIS-207.

## POIS-209 — Proof matching
**Vertical:** `action/proof-match.ts` (deterministic tag overlap, only
`isApprovedForOutreach`) + matched-proof display with select checkboxes.
> **Read-only. Never writes to TIF content tables.**
**Tests:** tag-overlap ranking; unapproved excluded; empty result handled.
**Acceptance:** 2+ relevant proof items per opportunity on 5 real cases.
**Rollback:** hide the section. **Migration:** none. **Deps:** POIS-208.

## POIS-210 — Playbooks and campaigns
**Vertical:** playbook selector + checklist display on the workbench; campaign badges and
`/tif/oi/campaigns` rollup.
> **CRITICAL: do NOT modify `deriveNextAction()`.** Playbooks supply research checklists and
> follow-up cadences for display only. See readiness review §3.
**Tests:** playbook selection displays its checklist; campaign membership is many-to-many;
**an explicit test asserts `deriveNextAction()` is unchanged and still authoritative**.
**Acceptance:** checklists visible; campaigns roll up PE and EV.
**Rollback:** hide both sections. **Migration:** none. **Deps:** POIS-209.

---

# Milestone 3 — Manual Outreach (POIS-301 … POIS-309)

## POIS-301 — Outreach gate
**Vertical:** `canPrepareOutreach()` + blocked-state UI naming every unmet requirement.
**Tests:** each blocker fires in isolation and is named.
**Acceptance:** blocked state lists specific, actionable reasons. **Rollback:** allow all.
**Migration:** none. **Deps:** POIS-210.

## POIS-302 — Claim validator
**Story:** As Todd, the system refuses to let me approve something I cannot support.
**Vertical:** `action/claim-validator.ts` + inline warnings on drafts.
**Tests — highest-value file in the milestone:** fabricated headcount caught; invented person
name caught; unsupported "as we discussed" caught; implied referral caught; clean draft passes;
allowlisted numbers pass.
**Acceptance:** unsupported claims detected and surfaced. **Rollback:** warn without blocking.
**Migration:** none. **Deps:** POIS-301.

## POIS-303 — Research summary and talking points
**Vertical:** `action/artifact-compose.ts` + generation for the two ungated kinds
(`research_summary`, `talking_points`) + display.
**Tests:** AI-unavailable degrades to a structured template; `contextSnapshot` recorded.
**Acceptance:** both generate from real evidence. **Rollback:** hide the buttons.
**Migration:** none (table shipped in POIS-004). **Deps:** POIS-302.

## POIS-304 — Email and LinkedIn drafts
**Vertical:** gated generation for `email_draft` and `linkedin_draft` + draft editor +
`approveArtifact`.
**`approveArtifact` throws if `unsupportedClaims` is non-empty; the button is `disabled`.**
Copy states explicitly: *"Approving does not send."*
**Tests:** approval blocked with unsupported claims (server throw **and** client disabled);
edits set `operatorEditedAt`; version increments on regenerate.
**Acceptance:** drafts cite specific evidence and proof; approval never sends.
**Rollback:** hide generation. **Migration:** none. **Deps:** POIS-303.

## POIS-305 — Meeting prep and executive brief snapshot
**Vertical:** `meeting_prep` generation + snapshotting the derived brief into an `OiArtifact`.
**Tests:** snapshot captures the brief at a point in time; the live brief still reflects current
data.
**Acceptance:** both artifacts generate. **Rollback:** hide the buttons. **Migration:** none.
**Deps:** POIS-304.

## POIS-306 — Activity log and follow-up scheduling
**Vertical:** `action/activity.ts` — **`appendActivity()` and `correctActivity()` only, no
update or delete path** — plus `logOutreachSent`, `logActivity`, and the workbench log.
`logOutreachSent` creates one `OiActivity(outreach_sent)` + one `OiNextAction(follow_up, +7d)`
in one transaction.
**Tests:** append-only (assert no update/delete is exported); corrections reference the
original; exactly one activity and one next action created; the prior open action closes.
**Manual test:** **grep POIS code for any email/messaging API call — must return nothing.**
**Acceptance:** log is append-only; follow-up auto-scheduled.
**Rollback:** hide the log. **Migration:** none. **Deps:** POIS-305.

## POIS-307 — FTE role profile and comp floor
**Vertical:** `commercial/role-profile.ts` + role profile section + `upsertRoleProfile`.
**Tests:** $224,999 disqualifies, $225,000 passes; below-floor retained as consulting; stale
posting at 30 days; total comp annualization.
**Acceptance:** comp floor enforced and explained. **Rollback:** hide the section.
**Migration:** none. **Deps:** POIS-306.

## POIS-308 — Application tracking and interview stages
**Vertical:** FTE state machine + `markApplied` (+14d follow-up), `advanceInterviewStage`,
`recordOffer`, `verifyPostingOpen`, and the **dual-track prompt** (apply *and* contact the
hiring executive).
**Tests:** every FTE transition; `no_response` after 21 days; dual-track prompt renders when
`type = fte` and no `outreach_sent` exists.
**Acceptance:** a role tracks from posting to offer. **Rollback:** hide the tracker.
**Migration:** none. **Deps:** POIS-307.

## POIS-309 — Proposal outline
**Vertical:** `proposal_outline` artifact — **template + checklist, not generated prose.**
Sections, the matched offer's deliverables, cited proof, a pricing placeholder, and a
completeness checklist. Todd writes the prose.
**Tests:** outline includes offer deliverables and selected proof; no AI prose in the body.
**Acceptance:** outline is usable as a starting structure. **Rollback:** hide the button.
**Migration:** none. **Deps:** POIS-308.

---

# Milestone 4 — Learning (POIS-401 … POIS-407)

## POIS-401 — Decision resolution
**Vertical:** resolve a decision — actual outcome, actual value, actual effort, lessons — with
`valueDelta`, `effortDelta`, `wasCorrect` computed on save. Decision history on the workbench.
**Tests:** deltas computed correctly; unresolved decisions surface by age.
**Acceptance:** prediction vs. reality visible per decision. **Rollback:** hide resolution.
**Migration:** none. **Deps:** POIS-309.

## POIS-402 — Outcome recording
**Vertical:** `action/outcome.ts` + outcome form. Terminal transitions require an outcome.
Computes `daysFromFirstSignal`, `daysFromFirstOutreach`, snapshots `scoreAtClose`.
**Tests:** terminal requires an outcome; elapsed-day math; reopen requires a reason.
**Acceptance:** every close records an outcome and a reason. **Rollback:** allow close without
outcome. **Migration:** none. **Deps:** POIS-401.

## POIS-403 — Weekly review
**Vertical:** `/tif/oi/review` + `reporting/weekly.ts`. Auto-metrics + operator reflection
fields per UX §8.5. Persists `OiWeeklyReview`.
**Tests:** metric snapshot correctness; unresolved predictions listed; unique on
`(periodStart, periodEnd)`.
**Acceptance:** review completes in under 15 minutes. **Rollback:** delete the route.
**Migration:** none. **Deps:** POIS-402.

## POIS-404 — Scorecard on Today
**Vertical:** `reporting/metrics.ts` + scorecard block. Income replacement %, pipeline EV,
conversations, revenue.
**Tests:** income replacement math; **assert no vanity metrics returned** (no record counts, no
AI call counts).
**Acceptance:** scorecard on Today is correct. **Rollback:** hide the block. **Migration:**
none. **Deps:** POIS-403.

## POIS-405 — Conversion analysis
**Vertical:** `reporting/conversion.ts` + a section on the weekly review. By signal type, score
band, opportunity type, warm vs. cold. Estimate accuracy for value and hours.
**Tests:** fixture outcomes produce correct rates; **assert running the analysis mutates no
scoring weight**.
**Acceptance:** analysis runs with ≥10 outcomes and degrades gracefully below that.
**Rollback:** hide the section. **Migration:** none. **Deps:** POIS-404.

## POIS-406 — Lessons library
**Vertical:** lessons aggregated from `OiDecision.lessonsLearned` and `OiOutcome.lesson`,
grouped by opportunity type and signal type, shown on the weekly review.
**Tests:** grouping correct; empty state handled.
**Acceptance:** lessons surface where they will be re-read. **Rollback:** hide the section.
**Migration:** none. **Deps:** POIS-405.

## POIS-407 — Timeline extension
**Vertical:** extend `buildTimeline` with decisions and outcomes; render on the weekly review as
an account-level view.
**Tests:** merge ordering with the new sources.
**Acceptance:** timeline shows the complete narrative through outcome. **Rollback:** revert to
the POIS-112 version. **Migration:** none. **Deps:** POIS-406.

---

# Post-October-1 (specifications retained, not scheduled)

| ID | Task | Source spec |
|---|---|---|
| POIS-701 | RFP field extraction | Data model §4.11, scoring §14.5 |
| POIS-702 | RFP qualification and bid/no-bid | Scoring §10, operating manual Example D |
| POIS-703 | RFP workbench section | UX §7 |
| POIS-501 | Relationship graph | — |
| POIS-502 | Pattern learning | Scoring §13 |
| POIS-503 | Market themes | — |
| POIS-504 | Heat maps | — |
| POIS-505 | Portfolio analytics | — |
| POIS-506 | Full proposal generation | Only after 3+ real proposals reveal a structure |
| POIS-507 | ATS connectors | Operating manual §12 Phase 2 |
| POIS-508 | Contact enrichment | Architecture §9.2 |

---

## Summary

| Milestone | Tasks | Count | Ends |
|---|---|---|---|
| 0 — Stabilize | POIS-001 … 009 | 9 | day 3 |
| 1 — Daily Driver | POIS-101 … 112 | 12 | **day 10** |
| 2 — Commercial Intelligence | POIS-201 … 210 | 10 | day 19 |
| 3 — Manual Outreach | POIS-301 … 309 | 9 | day 29 |
| 4 — Learning | POIS-401 … 407 | 7 | day 38 |
| Buffer / defects | — | — | **day 45 freeze** |
| Post-Oct-1 | POIS-5xx, 7xx | 11 | not scheduled |

**47 scheduled tasks. 12 of them make the system a daily driver.**
