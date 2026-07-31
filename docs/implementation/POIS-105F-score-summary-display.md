## Story Metadata

Milestone:
M1

Parent Task:
POIS-105

Story:
POIS-105F

Depends On:
POIS-105E

Blocks:
POIS-106A

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

**Business objective:** Show Todd the score and its breakdown on the intake review screen, so he
can see what an opportunity is worth and trust the number instead of treating it as a black box.

**User story:** As Todd, when I review a captured opportunity, I see a score summary like
`Fit 100 · Evidence 65 · Access 0 · $626/hr` with the value math shown beneath it.

**Commercial outcome:** This is the moment scoring becomes visible and actionable — Todd can now
see, for any opportunity, what it's worth and why, directly on the review screen he already uses.

---

# Scope

**Included:**
- The score summary block on the intake review screen, rendering the output of
  `commercial/score/index.ts` (built in POIS-105D, proven correct in POIS-105E): axis values in
  the format `Fit 100 · Evidence 65 · Access 0 · $626/hr`, with the value math shown beneath.

**Excluded:**
- No changes to any scoring logic file — this story is UI only.
- No score explanation panel (that is a separate, more detailed component built in POIS-109).

---

# Files Expected

- `src/app/tif/oi/intake/page.tsx`

---

# Dependencies

`POIS-105E-golden-fixture-tests.md`

---

# Referenced Documents

- `POIS-SCORING-AND-DECISION-MODEL.md` §14 (worked example values, for the manual test only).

---

# Acceptance Criteria

- [ ] The score summary renders in the format `Fit 100 · Evidence 65 · Access 0 · $626/hr` with
      value math shown beneath.
- [ ] Manual test: the displayed score matches the documented worked-example values exactly for a
      known fixture.
- [ ] This is the final letter in the POIS-105 chain — the capability is now visible and usable
      by Todd.

---

# Validation

```
npm test
npm run build
```

---

# Rollback

Revert `fit.ts` to its pre-POIS-105C state if the whole chain is being rolled back, and hide the
score summary block from the intake page.

---

# Expected Diff Size

Small.

---

# Estimated Time

45 minutes.

---

# Next Story

`POIS-106A-next-action-derivation-table.md`
