## Story Metadata

Milestone:
M1

Parent Task:
POIS-105

Story:
POIS-105A

Depends On:
POIS-104B

Blocks:
POIS-105B

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

**Business objective:** Establish two of the five scoring axes — evidence strength and urgency —
as isolated, independently-testable pure functions, before they're combined into a composite
score.

**User story:** As Codex, I need `evidence.ts` and `urgency.ts` to each correctly compute their
axis in isolation, so the composite scoring story (POIS-105D) can trust their output without
re-deriving axis logic.

**Commercial outcome:** None directly yet — not yet user-visible. This is the first of five
scoring-logic checkpoints (105A–105D) that together produce the composite score surfaced in
105E.

---

# Scope

**Included:**
- `src/lib/opportunity-intelligence/commercial/score/evidence.ts` — the evidence-strength axis,
  pure function, with isolated fixture tests.
- `src/lib/opportunity-intelligence/commercial/score/urgency.ts` — the urgency axis, pure
  function, with isolated fixture tests.

**Excluded:**
- No value, priority, or disqualify axes (POIS-105B).
- No `fit.ts` changes (POIS-105C).
- No composite scoring or `OiScore` persistence (POIS-105D).
- No UI (POIS-105E).

---

# Files Expected

- `src/lib/opportunity-intelligence/commercial/score/evidence.ts`
- `src/lib/opportunity-intelligence/commercial/score/urgency.ts`

---

# Dependencies

`POIS-104B-classification-checkbox-list-and-promote.md`

---

# Referenced Documents

- `POIS-SCORING-AND-DECISION-MODEL.md` §4 (evidence and urgency axis definitions only).

---

# Acceptance Criteria

- [ ] `evidence.ts` correctly computes evidence strength per §4, verified by isolated fixture
      tests covering its full input range.
- [ ] `urgency.ts` correctly computes urgency per §4, verified by isolated fixture tests covering
      its full input range.
- [ ] Both functions are pure — no side effects, no persistence.
- [ ] Not yet user-visible — surfaced in POIS-105E once the full composite is wired together.

---

# Validation

```
npm test
```

---

# Rollback

Delete `evidence.ts` and `urgency.ts`. No persisted state depends on them yet.

---

# Expected Diff Size

Small.

---

# Estimated Time

60 minutes.

---

# Next Story

`POIS-105B-score-axes-value-priority-disqualify.md`
