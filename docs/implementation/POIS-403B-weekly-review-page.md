## Story Metadata

Milestone:
M4

Parent Task:
POIS-403

Story:
POIS-403B

Depends On:
POIS-403A

Blocks:
POIS-404

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

**Business objective:** The weekly review is the operating ritual that turns recorded decisions
and outcomes into learning. Without a page, the metrics logic from 403A is correct but unused.

**User story:** As Todd, I want a `/tif/oi/review` page that shows my auto-computed metrics
alongside a place to reflect, so a weekly review takes minutes, not a spreadsheet exercise.

**Commercial outcome:** The weekly review becomes a usable ritual — completable in under 15
minutes — fulfilling the promise of the 403 vertical slice (403A + 403B).

---

# Scope

**Included:**
- The `/tif/oi/review` route/page, rendering the auto-metrics and unresolved-predictions list
  computed in 403A.
- Operator reflection fields per `POIS-OPERATOR-UX.md` §8.5 (the free-text/qualitative inputs
  Todd fills in during the review).
- Persistence of the completed `OiWeeklyReview` (auto-metrics + reflection fields together),
  using the uniqueness enforcement from 403A.

**Excluded:**
- No changes to the metric computation or uniqueness logic itself — that was finished and
  tested in 403A. This story only renders and persists through it.
- No conversion-analysis section, scorecard, lessons library, or timeline — those are separate
  stories later in this milestone (404–407) and must not be pulled forward into this page yet.

This is the final letter in the 403 chain: it completes the vertical slice Rule 1 requires and
carries the user-visible claim, including the manual timing test.

---

# Files Expected

- The `/tif/oi/review` route/page component (exact path determined during implementation,
  following the existing `/tif/oi/...` route conventions from earlier milestones).

---

# Dependencies

`POIS-403A-weekly-review-metrics-logic.md`

---

# Referenced Documents

- `docs/IMPLEMENTATION_RULES.md` Rule 1 (this letter is where the vertical slice becomes
  complete and user-visible).
- `POIS-OPERATOR-UX.md` §8.5 (weekly review layout — auto-metrics + operator reflection
  fields).

---

# Acceptance Criteria

- [ ] Visiting `/tif/oi/review` displays the auto-computed metrics and unresolved-predictions
      list for the current period.
- [ ] The operator reflection fields specified in `POIS-OPERATOR-UX.md` §8.5 are present and
      persist on save.
- [ ] Saving a review persists a single `OiWeeklyReview` per `(periodStart, periodEnd)`,
      respecting the uniqueness constraint from 403A.
- [ ] Manual test: complete a weekly review end-to-end and confirm it takes under 15 minutes.

---

# Validation

```
npm test -- weekly-review-page
```

Manual test: time a full run through `/tif/oi/review` from open to saved; confirm under 15
minutes.

---

# Rollback

Delete the `/tif/oi/review` route. The underlying metrics logic from 403A can remain or be
reverted independently.

---

# Expected Diff Size

Small.

---

# Estimated Time

75 minutes.

---

# Next Story

`POIS-404-scorecard-on-today.md`
