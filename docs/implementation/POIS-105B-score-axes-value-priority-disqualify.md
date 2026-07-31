## Story Metadata

Milestone:
M1

Parent Task:
POIS-105

Story:
POIS-105B

Depends On:
POIS-105A

Blocks:
POIS-105C

Estimated PR Size:
Small

Expected Review Time:
5-10 minutes

Risk:
Medium

Breaking Change:
No

Migration:
No

Feature Flag:
No

---

# Story

**Business objective:** Establish the value, priority, and disqualify axes — including every
hard filter that can zero out an opportunity's score — as isolated, independently-testable pure
functions.

**User story:** As Codex, I need `value.ts`, `priority.ts`, and `disqualify.ts` to each correctly
compute their axis and correctly apply every hard filter, so the composite scoring story
(POIS-105D) can trust their output.

**Commercial outcome:** None directly yet — not yet user-visible. Second of five scoring-logic
checkpoints (105A–105D).

---

# Scope

**Included:**
- `src/lib/opportunity-intelligence/commercial/score/value.ts` — the value axis, pure function.
- `src/lib/opportunity-intelligence/commercial/score/priority.ts` — the priority axis, pure
  function.
- `src/lib/opportunity-intelligence/commercial/score/disqualify.ts` — hard-filter disqualification
  logic per §10, pure function.
- Isolated tests for every hard filter in §10, each asserting the correct rule name fires, plus a
  test confirming probability is capped at 60%.

**Excluded:**
- No evidence or urgency axes (built in POIS-105A; not touched here).
- No `fit.ts` changes (POIS-105C).
- No composite scoring or `OiScore` persistence (POIS-105D).
- No UI (POIS-105E).

---

# Files Expected

- `src/lib/opportunity-intelligence/commercial/score/value.ts`
- `src/lib/opportunity-intelligence/commercial/score/priority.ts`
- `src/lib/opportunity-intelligence/commercial/score/disqualify.ts`

---

# Dependencies

`POIS-105A-score-axes-evidence-urgency.md`

---

# Referenced Documents

- `POIS-SCORING-AND-DECISION-MODEL.md` §4 (value and priority axis definitions).
- `POIS-SCORING-AND-DECISION-MODEL.md` §10 (hard filter rules and probability cap).

---

# Acceptance Criteria

- [ ] `value.ts` and `priority.ts` correctly compute their axes per §4, verified by isolated
      fixture tests.
- [ ] `disqualify.ts` correctly applies every hard filter listed in §10, each tested in isolation
      and each asserting the correct rule name fires.
- [ ] Probability is capped at 60%, verified by an explicit test.
- [ ] All three functions are pure — no side effects, no persistence.
- [ ] Not yet user-visible — surfaced in POIS-105E once the full composite is wired together.

---

# Validation

```
npm test
```

---

# Rollback

Delete `value.ts`, `priority.ts`, and `disqualify.ts`. No persisted state depends on them yet.

---

# Expected Diff Size

Medium.

---

# Estimated Time

90 minutes.

---

# Next Story

`POIS-105C-retune-fit-axis.md`
