## Story Metadata

Milestone:
M4

Parent Task:
POIS-401

Story:
POIS-401A

Depends On:
POIS-309

Blocks:
POIS-401B

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

**Business objective:** Every decision Todd makes on a pursuit (go/no-go, invest more, wait) is
a prediction. Until the prediction is checked against what actually happened, the operating
system cannot tell him whether his judgment is improving. This story builds the logic that
turns a decision into a resolved prediction.

**User story:** As Codex, I need a resolve-a-decision action that records the actual outcome,
actual value, actual effort, and lessons learned, and computes `valueDelta`, `effortDelta`, and
`wasCorrect` on save — so that the workbench display story (401B) has real data to render.

**Commercial outcome:** None directly claimable yet — this is the logic half of one vertical
slice (401A → 401B). The user-visible claim ("prediction vs. reality visible per decision")
lands in 401B.

---

# Scope

**Included:**
- A resolve-decision action (server action / mutation) that accepts, for an existing
  `OiDecision`: actual outcome, actual value realized, actual effort spent, and free-text
  lessons learned.
- On save, compute and persist:
  - `valueDelta` = actual value − predicted/estimated value at time of decision.
  - `effortDelta` = actual effort − predicted/estimated effort at time of decision.
  - `wasCorrect` — a boolean/derived judgment of whether the original decision matched the
    actual outcome (per the existing `OiDecision` semantics already in the schema).
- Unit tests proving the delta math is correct across the range of decision types.

**Excluded:**
- Any UI. There is no workbench display, form, or route in this story — that is
  `POIS-401B-decision-history-on-workbench.md`.
- "Unresolved decisions surface by age" — that is a display concern and belongs to 401B.
- Any schema/migration change. The `OiDecision` model and its resolution fields are assumed to
  already exist (Milestone 0 schema work); if any field needed here is missing from the schema,
  stop and flag it rather than adding a migration in this story.

This split is allowed under the lettered-chain amendment (D-031): a logic-only checkpoint with
no user-visible claim is acceptable as an intermediate letter in a chain, provided the final
letter (401B) completes the vertical slice. See Referenced Documents.

---

# Files Expected

- The decision-resolution action/logic file (exact path determined during implementation —
  likely colocated with the existing `OiDecision` action module introduced earlier in the
  project, e.g. `action/decision.ts` or equivalent).
- Its accompanying unit test file.

---

# Dependencies

`POIS-309` (last Milestone 3 story).

---

# Referenced Documents

- `docs/IMPLEMENTATION_RULES.md` Rule 1 (vertical-slice requirement — read together with the
  amendment below; do not treat this story as a self-contained exception without it).
- `POIS-DECISIONS.md` D-031 (amendment permitting a logic-only intermediate letter in a
  lettered chain).
- `docs/CODEX_OPERATING_MODEL.md` §2.3 (how lettered chains satisfy Rule 1 as one slice).
- `POIS-DATA-MODEL.md` — `OiDecision` model fields (`valueDelta`, `effortDelta`, `wasCorrect`,
  `lessonsLearned` and the prediction fields they are computed against).

---

# Acceptance Criteria

- [ ] Resolving a decision with an actual outcome, actual value, actual effort, and lessons
      persists all four inputs on the `OiDecision` record.
- [ ] `valueDelta` and `effortDelta` are computed correctly against the decision's original
      predicted value/effort (verified by unit test with known fixture deltas).
- [ ] `wasCorrect` is computed correctly for both correct and incorrect predictions (verified by
      unit test).
- [ ] No UI, route, or component is added in this diff.
- [ ] No schema/migration change is included in this diff.

---

# Validation

```
npm test -- decision-resolution
```

(Adjust the test path/pattern to match wherever the new unit test file lands.)

---

# Rollback

Revert the resolve-decision action and its test file. No schema change to roll back.

---

# Expected Diff Size

Small.

---

# Estimated Time

45 minutes.

---

# Next Story

`POIS-401B-decision-history-on-workbench.md`
