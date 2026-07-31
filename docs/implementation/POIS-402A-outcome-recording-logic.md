## Story Metadata

Milestone:
M4

Parent Task:
POIS-402

Story:
POIS-402A

Depends On:
POIS-401B

Blocks:
POIS-402B

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

**Business objective:** Pursuits that close without a recorded outcome silently destroy the
data the whole intelligence layer depends on. Terminal transitions must be forced to carry an
outcome so every close becomes usable history.

**User story:** As Codex, I need `action/outcome.ts` to enforce that terminal lifecycle
transitions require an outcome, compute the elapsed-time and score-at-close fields, and require
a reason when an opportunity is reopened — so the outcome-form story (402B) has a reliable
action to wire into.

**Commercial outcome:** None directly claimable yet — this is the logic half of one vertical
slice (402A → 402B). The user-visible claim ("every close records an outcome and a reason")
lands in 402B.

---

# Scope

**Included:**
- `action/outcome.ts`: enforcement that any terminal lifecycle transition requires an
  `OiOutcome` to be recorded — the transition must fail/block without one.
- Computation of `daysFromFirstSignal` and `daysFromFirstOutreach` from existing timeline data.
- Snapshotting `scoreAtClose` at the moment of the terminal transition.
- Enforcement that reopening a closed opportunity requires a reason.
- Unit tests: terminal transition requires an outcome; elapsed-day math is correct; reopen
  without a reason is rejected.

**Excluded:**
- No outcome form or any other UI — that is `POIS-402B-outcome-form-ui.md`.
- No changes to the lifecycle state machine itself beyond adding the outcome-required guard and
  reopen-reason guard (the transitions themselves are the existing lifecycle from POIS-108A).

This split is allowed under the lettered-chain amendment (D-031): a logic-only checkpoint with
no user-visible claim is acceptable as an intermediate letter, provided the final letter (402B)
completes the vertical slice.

---

# Files Expected

- `action/outcome.ts`
- Its accompanying unit test file.

---

# Dependencies

`POIS-401B-decision-history-on-workbench.md`

---

# Referenced Documents

- `docs/IMPLEMENTATION_RULES.md` Rule 1, together with `POIS-DECISIONS.md` D-031 and
  `docs/CODEX_OPERATING_MODEL.md` §2.3 (lettered-chain amendment for logic-only checkpoints).
- `POIS-DATA-MODEL.md` — `OiOutcome` model fields (`daysFromFirstSignal`,
  `daysFromFirstOutreach`, `scoreAtClose`).
- The existing lifecycle transition logic from POIS-108A (terminal states and reopen
  transition) — do not modify the transitions themselves, only guard them.

---

# Acceptance Criteria

- [ ] Attempting a terminal lifecycle transition without an outcome fails/blocks (verified by
      unit test).
- [ ] `daysFromFirstSignal` and `daysFromFirstOutreach` are computed correctly against known
      fixture timelines (verified by unit test).
- [ ] `scoreAtClose` is snapshotted correctly at the moment of terminal transition (verified by
      unit test).
- [ ] Reopening a closed opportunity without a reason is rejected (verified by unit test).
- [ ] No UI, route, or component is added in this diff.

---

# Validation

```
npm test -- outcome
```

---

# Rollback

Revert `action/outcome.ts` and its test file, restoring the prior lifecycle transitions with no
outcome/reason guard.

---

# Expected Diff Size

Small.

---

# Estimated Time

60 minutes.

---

# Next Story

`POIS-402B-outcome-form-ui.md`
