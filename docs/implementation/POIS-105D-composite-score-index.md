## Story Metadata

Milestone:
M1

Parent Task:
POIS-105

Story:
POIS-105D

Depends On:
POIS-105C

Blocks:
POIS-105E

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

**Business objective:** Wire all five scoring axes into a single composite function with the
correct API shape and persistence — the mechanical assembly step, separated from the exhaustive
fixture verification (POIS-105E) so this story stays inside the 30–90 minute band.

**User story:** As Codex, I need `commercial/score/index.ts` to combine fit, evidence, urgency,
value, priority, and disqualify into one composite score with the exact §15 API contract,
persisting `OiScore`.

**Commercial outcome:** None directly yet — not yet user-visible. This is the fourth of six
scoring-logic checkpoints; the composite score becomes visible to Todd in POIS-105F.

---

# Scope

**Included:**
- `src/lib/opportunity-intelligence/commercial/score/index.ts` — wires the fit axis
  (POIS-105C), evidence and urgency axes (POIS-105A), and value/priority/disqualify axes
  (POIS-105B) into the composite score exactly per `POIS-SCORING-AND-DECISION-MODEL.md` §15.
- Persists `OiScore` on computation.
- Basic shape/sanity tests confirming the function accepts the documented inputs and returns
  every field the §15 contract requires (axis values, `$/hr`, probability, EV, hours, PE) —
  enough to prove the wiring is structurally correct.

**Excluded:**
- No changes to any individual axis file (`fit.ts`, `evidence.ts`, `urgency.ts`, `value.ts`,
  `priority.ts`, `disqualify.ts`) — those are complete as of POIS-105A/105B/105C.
- **No golden worked-example fixtures, determinism test, or PE-ordering test — those are
  POIS-105E**, deliberately separated out because that test suite alone is a 60–90 minute unit
  of work and combining it with the wiring pushed this story past the 90-minute ceiling.
- No UI — the score summary display is POIS-105F.

---

# Files Expected

- `src/lib/opportunity-intelligence/commercial/score/index.ts`
- `src/lib/opportunity-intelligence/commercial/score/index.test.ts` (shape/sanity tests only)

---

# Dependencies

`POIS-105C-retune-fit-axis.md`

---

# Referenced Documents

- `POIS-SCORING-AND-DECISION-MODEL.md` §15 (composite score API contract — exact).

---

# Acceptance Criteria

- [ ] `index.ts` exports a single composite-scoring function matching the §15 contract exactly
      (every field present: axis values, `$/hr`, probability, EV, hours, PE).
- [ ] `OiScore` is persisted with every computed score.
- [ ] Shape/sanity tests confirm the function runs end-to-end on a representative input without
      asserting specific documented values yet (that's POIS-105E).
- [ ] Not yet user-visible — surfaced in POIS-105F.

---

# Validation

```
npm test
```

---

# Rollback

Delete `commercial/score/index.ts`. `OiScore` rows already persisted can be left in place or
truncated independently.

---

# Expected Diff Size

Medium.

---

# Estimated Time

60 minutes.

---

# Next Story

`POIS-105E-golden-fixture-tests.md`
