## Story Metadata

Milestone:
M4

Parent Task:
POIS-403

Story:
POIS-403A

Depends On:
POIS-402B

Blocks:
POIS-403B

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

**Business objective:** A weekly review is only trustworthy if its numbers are computed
correctly and its snapshots are protected from duplication. That correctness needs to be
locked down before there is a page for Todd to look at.

**User story:** As Codex, I need `reporting/weekly.ts` to compute the auto-metrics for a
period, list unresolved predictions, and enforce uniqueness on `(periodStart, periodEnd)`, so
the weekly review page story (403B) can render trustworthy data without duplicating snapshots.

**Commercial outcome:** None directly claimable yet — this is the logic half of one vertical
slice (403A → 403B). The user-visible claim ("review completes in under 15 minutes") lands in
403B.

---

# Scope

**Included:**
- `reporting/weekly.ts`: computation of the auto-metrics feeding a weekly `OiWeeklyReview`
  snapshot (drawing on the decisions and outcomes recorded in the 401/402 stories).
- Listing of decisions that remain unresolved as of the review period.
- Enforcement of uniqueness on `(periodStart, periodEnd)` — a second review for the same period
  must be rejected or must update the existing one rather than duplicate it.
- Unit tests: metric snapshot correctness against known fixtures; unresolved predictions
  correctly listed; uniqueness constraint enforced.

**Excluded:**
- No `/tif/oi/review` route or any UI/form — that is `POIS-403B-weekly-review-page.md`.
- No persistence of operator reflection fields (free-text reflection is entered through the UI
  in 403B; this story only computes and validates the automatic side).

This split is allowed under the lettered-chain amendment (D-031): a logic-only checkpoint with
no user-visible claim is acceptable as an intermediate letter, provided the final letter (403B)
completes the vertical slice.

---

# Files Expected

- `reporting/weekly.ts`
- Its accompanying unit test file.

---

# Dependencies

`POIS-402B-outcome-form-ui.md`

---

# Referenced Documents

- `docs/IMPLEMENTATION_RULES.md` Rule 1, together with `POIS-DECISIONS.md` D-031 and
  `docs/CODEX_OPERATING_MODEL.md` §2.3 (lettered-chain amendment for logic-only checkpoints).
- `POIS-DATA-MODEL.md` — `OiWeeklyReview` model fields, including the `(periodStart,
  periodEnd)` uniqueness constraint.

---

# Acceptance Criteria

- [ ] Auto-metric computation matches expected values against known fixture data (verified by
      unit test).
- [ ] Decisions unresolved as of the review period are correctly listed (verified by unit
      test).
- [ ] Creating a second `OiWeeklyReview` for an already-covered `(periodStart, periodEnd)` is
      rejected/deduplicated rather than silently duplicated (verified by unit test).
- [ ] No UI, route, or component is added in this diff.

---

# Validation

```
npm test -- weekly-review
```

---

# Rollback

Revert `reporting/weekly.ts` and its test file. No route exists yet to roll back.

---

# Expected Diff Size

Small.

---

# Estimated Time

60 minutes.

---

# Next Story

`POIS-403B-weekly-review-page.md`
