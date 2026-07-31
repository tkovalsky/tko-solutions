## Story Metadata

Milestone:
M4

Parent Task:
POIS-404

Story:
POIS-404

Depends On:
POIS-403B

Blocks:
POIS-405

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

**Business objective:** Todd needs a daily, at-a-glance read on whether the pursuit system is
actually producing income-replacing outcomes — not just activity. The scorecard puts that
signal where he already looks every day.

**User story:** As Todd, I want a scorecard on my Today view showing income replacement
percentage, pipeline expected value, conversations, and revenue, so I can tell in seconds
whether the system is working without opening a report.

**Commercial outcome:** The scorecard on Today is correct and trustworthy — a single glance
replaces a manual check of the numbers that matter most.

---

# Scope

**Included:**
- `reporting/metrics.ts`: computation of income replacement percentage, pipeline expected
  value, conversation count, and revenue.
- A scorecard block rendered on the existing Today view, displaying these four figures.
- Unit tests: income replacement math is correct against known fixtures; the metrics function
  returns no vanity metrics (no raw record counts, no AI call counts, no other non-outcome
  figures).

**Excluded:**
- No changes to the weekly review page or its metrics (403A/403B) — this is a separate,
  smaller metrics surface for the Today view specifically.
- No new lifecycle, scoring, or decision logic. This story only reads and aggregates existing
  outcome/pipeline data.

This story is not split. The metrics file and the scorecard block are small enough, and
cohesive enough, to ship as one slice — the "no vanity metrics" check is one assertion, not
grounds for a separate story.

---

# Files Expected

- `reporting/metrics.ts`
- The Today view scorecard block component (exact path determined during implementation,
  wherever the existing Today view lives).
- Accompanying unit tests.

---

# Dependencies

`POIS-403B-weekly-review-page.md`

---

# Referenced Documents

- `POIS-OPERATOR-UX.md` — Today view conventions (for where the scorecard block should sit).
- `docs/IMPLEMENTATION_RULES.md` Rule 1 (full vertical slice — logic and UI ship together in
  this story, no chain needed).

---

# Acceptance Criteria

- [ ] Income replacement percentage is computed correctly against known fixture data (verified
      by unit test).
- [ ] Pipeline expected value, conversation count, and revenue are computed correctly against
      known fixture data.
- [ ] A unit test asserts the metrics function returns no vanity metrics (no record counts, no
      AI call counts, or any other non-outcome figures).
- [ ] The scorecard renders on the Today view showing all four figures correctly for a given
      user/period.

---

# Validation

```
npm test -- scorecard
```

---

# Rollback

Hide the scorecard block on the Today view (remove or feature-flag the display component).
`reporting/metrics.ts` can remain unused if reverted independently.

---

# Expected Diff Size

Small.

---

# Estimated Time

75 minutes.

---

# Next Story

`POIS-405-conversion-analysis.md`
