## Story Metadata

Milestone:
M4

Parent Task:
POIS-402

Story:
POIS-402B

Depends On:
POIS-402A

Blocks:
POIS-403A

Estimated PR Size:
Small

Expected Review Time:
5-10 minutes

Risk:
Low

Breaking Change:
No

Migration:
No

Feature Flag:
No

---

# Story

**Business objective:** The outcome-required guard built in 402A is invisible and unusable
without a form for Todd to actually record what happened. This story makes closing an
opportunity a real, usable action instead of a blocked dead end.

**User story:** As Todd, when I close a pursuit I want a form that asks for the outcome and
(if reopening) a reason, so my history stays complete without extra effort.

**Commercial outcome:** Every close now records an outcome and a reason — the promise of the
402 vertical slice (402A + 402B) is fully usable, not just enforced in tests.

---

# Scope

**Included:**
- An outcome form UI, wired to the terminal lifecycle transitions introduced in POIS-108A,
  that collects the outcome (and any other fields `action/outcome.ts` requires) at the moment
  of a terminal transition.
- A reason prompt/field shown when reopening a closed opportunity, wired to the reopen guard
  from 402A.
- Wiring so the form calls `action/outcome.ts` and surfaces its validation errors (e.g. "outcome
  required") to the user instead of failing silently.

**Excluded:**
- No changes to the outcome-computation logic (`daysFromFirstSignal`,
  `daysFromFirstOutreach`, `scoreAtClose`, `wasCorrect`-adjacent guards) — that was finished and
  tested in 402A. This story only renders and triggers it.
- No changes to the lifecycle state machine's set of transitions.

This is the final letter in the 402 chain: it completes the vertical slice Rule 1 requires and
carries the user-visible claim.

---

# Files Expected

- The outcome form component and its integration point in the lifecycle-transition UI (exact
  path determined during implementation — wherever the existing terminal-transition trigger
  from POIS-108A lives).

---

# Dependencies

`POIS-402A-outcome-recording-logic.md`

---

# Referenced Documents

- `docs/IMPLEMENTATION_RULES.md` Rule 1 (this letter is where the vertical slice becomes
  complete and user-visible).
- `POIS-OPERATOR-UX.md` — lifecycle transition / close-pursuit UX conventions.
- The existing terminal-transition trigger from POIS-108A (the UI entry point this form must
  attach to).

---

# Acceptance Criteria

- [ ] Attempting to close an opportunity without filling in the outcome form is blocked with a
      visible error, not a silent failure.
- [ ] Completing the outcome form on close successfully records the outcome and transitions the
      opportunity to its terminal state.
- [ ] Reopening a closed opportunity prompts for and requires a reason before the reopen
      succeeds.
- [ ] Manual test: close an opportunity through the UI, confirm the outcome is recorded; reopen
      it, confirm a reason is required and recorded.

---

# Validation

```
npm test -- outcome-form
```

Manual test: run the app, close a pursuit through the UI without an outcome (expect block),
then with an outcome (expect success); reopen it without a reason (expect block).

---

# Rollback

Remove/hide the outcome form and its wiring to the terminal-transition trigger, reverting the
close flow to its pre-402B UI. The underlying guard from 402A can remain or be reverted
independently.

---

# Expected Diff Size

Small.

---

# Estimated Time

75 minutes.

---

# Next Story

`POIS-403A-weekly-review-metrics-logic.md`
