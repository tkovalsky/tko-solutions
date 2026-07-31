## Story Metadata

Milestone:
M1

Parent Task:
POIS-105

Story:
POIS-105C

Depends On:
POIS-105B

Blocks:
POIS-105D

Estimated PR Size:
Small

Expected Review Time:
5-10 minutes

Risk:
High

Breaking Change:
Yes

Migration:
No

Feature Flag:
No

---

# Story

**Business objective:** Correct the existing fit axis so it reflects the current scoring model
without double-counting factors that have moved to other axes — this touches a pre-existing
scoring file and warrants isolated review.

**User story:** As Codex, I need `fit.ts` retuned to the §4 weights so the composite score
(POIS-105D) does not double-count evidence strength or reporting line, which now belong to the
evidence and access axes respectively.

**Commercial outcome:** None directly yet — not yet user-visible. Third of five scoring-logic
checkpoints (105A–105D). This story is isolated on its own because it edits an existing scoring
file rather than adding a new one, which warrants higher review scrutiny than new code.

---

# Scope

**Included:**
- Retune `src/lib/opportunity-intelligence/commercial/score/fit.ts`:
  - Add a `domain` weight (15).
  - Add a `seniority_scope` weight (10).
  - Remove `evidence_strength` (now owned by `evidence.ts`, built in POIS-105A).
  - Remove `reporting_line` (now owned by the access axis).

**Excluded:**
- No changes to `evidence.ts`, `urgency.ts`, `value.ts`, `priority.ts`, or `disqualify.ts` — those
  are already correct as built in POIS-105A/105B.
- No composite scoring or `OiScore` persistence (POIS-105D).
- No UI (POIS-105E).

---

# Files Expected

- `src/lib/opportunity-intelligence/commercial/score/fit.ts`

---

# Dependencies

`POIS-105B-score-axes-value-priority-disqualify.md`

---

# Referenced Documents

- `POIS-SCORING-AND-DECISION-MODEL.md` §4 (fit axis weight table only).

---

# Acceptance Criteria

- [ ] `fit.ts` includes a `domain` weight of 15.
- [ ] `fit.ts` includes a `seniority_scope` weight of 10.
- [ ] `fit.ts` no longer includes `evidence_strength` or `reporting_line`.
- [ ] Existing `fit.ts` tests are updated to reflect the new weight table; no double-counting of
      evidence strength or reporting line remains anywhere in the fit calculation.
- [ ] Not yet user-visible — surfaced in POIS-105E once the full composite is wired together.

---

# Validation

```
npm test
```

---

# Rollback

Revert `fit.ts` to its pre-retune state (restore `evidence_strength` and `reporting_line`, remove
`domain` and `seniority_scope`).

---

# Expected Diff Size

Small.

---

# Estimated Time

45 minutes.

---

# Next Story

`POIS-105D-composite-score-index.md`
