## Story Metadata

Milestone:
M4

Parent Task:
POIS-401

Story:
POIS-401B

Depends On:
POIS-401A

Blocks:
POIS-402A

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

**Business objective:** A resolved decision that only Codex's test suite can see is worthless
to Todd. He needs to open the workbench and see, per opportunity, what he predicted versus what
actually happened — that visibility is what makes his judgment improvable over time.

**User story:** As Todd, I want to see decision history on the workbench, including which
decisions are still unresolved and how long they've been waiting, so I can close the loop on
my own predictions and spot the ones I'm neglecting.

**Commercial outcome:** Prediction-vs-reality becomes visible per decision — the core promise
of this vertical slice (401A + 401B) is now usable, not just tested.

---

# Scope

**Included:**
- Decision history section on the workbench, listing each decision for an opportunity with its
  prediction and (if resolved) its actual outcome, value/effort deltas, and lessons learned.
- Unresolved decisions surfaced sorted/flagged by age (oldest-unresolved-first, or an
  equivalent age-based visual cue).
- Wiring the display to the resolve-decision action built in 401A (the resolution UI/trigger
  lives here, since that action had no consumer yet).

**Excluded:**
- No changes to the delta/`wasCorrect` computation logic itself — that was finished and tested
  in 401A. This story only renders and triggers it.
- No changes to decision creation (predicting a decision in the first place is out of scope;
  this story only resolves and displays existing decisions).

This is the final letter in the 401 chain: it completes the vertical slice Rule 1 requires,
carries the user-visible claim, and includes the manual test.

---

# Files Expected

- The workbench component/route that renders decision history (exact path determined during
  implementation — wherever the existing opportunity workbench UI lives).
- Determined during implementation: the specific age-sorting/unresolved-surfacing logic, which
  may live alongside the display component or as a small selector/query helper.

---

# Dependencies

`POIS-401A-decision-resolution-logic.md`

---

# Referenced Documents

- `docs/IMPLEMENTATION_RULES.md` Rule 1 (this letter is where the vertical slice becomes
  complete and user-visible — confirm the manual test satisfies it).
- `POIS-OPERATOR-UX.md` — workbench/opportunity-detail layout conventions (for where decision
  history should sit relative to existing workbench sections).

---

# Acceptance Criteria

- [ ] Opening an opportunity's workbench view shows its decision history, including resolved
      predictions with actual outcome, value delta, effort delta, and lessons.
- [ ] Unresolved decisions are visibly distinguishable and ordered/flagged by age.
- [ ] A user can trigger resolution of a decision from this view and see the resolved state
      reflected immediately.
- [ ] Manual test: create a decision, resolve it through the UI, confirm prediction and reality
      are both visible side by side on the workbench.

---

# Validation

```
npm test -- decision-history
```

Manual test: open the workbench for an opportunity with at least one unresolved and one
resolved decision; confirm both render correctly and resolution works end-to-end.

---

# Rollback

Hide the decision history section on the workbench (remove or feature-flag the display
component). The underlying resolution logic from 401A is unaffected.

---

# Expected Diff Size

Small.

---

# Estimated Time

60 minutes.

---

# Next Story

`POIS-402A-outcome-recording-logic.md`
