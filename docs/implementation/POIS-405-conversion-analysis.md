## Story Metadata

Milestone:
M4

Parent Task:
POIS-405

Story:
POIS-405

Depends On:
POIS-404

Blocks:
POIS-406

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

**Business objective:** Todd needs to know which kinds of signals and opportunities actually
convert — by signal type, score band, opportunity type, and warm vs. cold — so his judgment
about where to spend effort improves. This analysis is advisory: it informs Todd, it never
changes the scoring system itself.

**User story:** As Todd, I want a conversion-analysis section on my weekly review showing
conversion rates and estimate accuracy broken down by signal type, score band, opportunity
type, and warm/cold, so I can see patterns without hand-tallying my own history.

**Commercial outcome:** Conversion analysis surfaces where Todd already reviews his week,
turning historical outcomes into an advisory signal — without ever touching the scoring
weights that produce the queue ranking.

---

# Scope

**Included:**
- `reporting/conversion.ts`: conversion-rate computation broken down by signal type, score
  band, opportunity type, and warm vs. cold; estimate-accuracy computation for value and hours
  (predicted vs. actual, drawing on the deltas from 401A/402A).
- A conversion-analysis section added to the weekly review page (403B).
- Graceful degradation below 10 outcomes (e.g., a clear "not enough data yet" state rather than
  a misleading rate computed on a tiny sample).
- Unit tests: fixture outcomes produce correct rates and accuracy figures.
- **A unit test that explicitly asserts running this analysis mutates no scoring weight** —
  this is a standing constraint for the entire milestone (see Referenced Documents), and this
  story is the one place in the milestone where the constraint is directly at risk, since it is
  the only story that reads historical outcomes in aggregate.

**Excluded:**
- No automatic weight tuning, adjustment, or suggestion of any kind. This story reads outcomes
  and computes rates; it must not write to any scoring weight, scoring policy, or scoring
  version record. A scoring-policy change remains a new version Todd activates explicitly.
- No changes to the scoring system, queue ranking, lifecycle derivation, or relationship-state
  derivation.

This story is not split. The reporting file and the weekly-review section are cohesive enough
to ship as one slice.

---

# Files Expected

- `reporting/conversion.ts`
- The conversion-analysis section added to the `/tif/oi/review` page from 403B.
- Accompanying unit tests, including the scoring-weight-immutability test.

---

# Dependencies

`POIS-404-scorecard-on-today.md`

---

# Referenced Documents

- `docs/IMPLEMENTATION_RULES.md` Rule 11 (reproducible scoring — no automatic weight tuning;
  a scoring-policy change is a new version activated explicitly).
- `POIS-SCORING-AND-DECISION-MODEL.md` — score band definitions (for the score-band breakdown).
- `POIS-DATA-MODEL.md` — outcome/decision fields this analysis reads (`valueDelta`,
  `effortDelta`, signal type, opportunity type).

---

# Acceptance Criteria

- [ ] Conversion rates by signal type, score band, opportunity type, and warm/cold are computed
      correctly against fixture outcome data (verified by unit test).
- [ ] Estimate accuracy for value and hours is computed correctly against fixture data.
- [ ] With fewer than 10 outcomes, the analysis degrades gracefully (clear insufficient-data
      state, not a misleading computed rate).
- [ ] With 10 or more outcomes, the full analysis runs and renders on the weekly review.
- [ ] A unit test explicitly asserts that running the conversion analysis does not write to,
      mutate, or otherwise change any scoring weight, scoring policy, or scoring version record.

---

# Validation

```
npm test -- conversion-analysis
```

---

# Rollback

Hide the conversion-analysis section on the weekly review page. `reporting/conversion.ts` can
remain unused if reverted independently.

---

# Expected Diff Size

Small.

---

# Estimated Time

90 minutes.

---

# Next Story

`POIS-406-lessons-library.md`
