## Story Metadata

Milestone:
M4

Parent Task:
POIS-406

Story:
POIS-406

Depends On:
POIS-405

Blocks:
POIS-407

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

**Business objective:** Lessons Todd already writes down when resolving decisions and outcomes
are wasted if they are never re-read. Aggregating them where he already reviews his week turns
scattered notes into an actual library he'll use.

**User story:** As Todd, I want the lessons I've recorded on resolved decisions and outcomes
aggregated and grouped by opportunity type and signal type on my weekly review, so patterns in
what I've learned are visible instead of buried in individual records.

**Commercial outcome:** Lessons surface exactly where they will be re-read — the weekly review
— instead of sitting inert on individual decision and outcome records.

---

# Scope

**Included:**
- An aggregation query over `OiDecision.lessonsLearned` and `OiOutcome.lesson`, grouped by
  opportunity type and signal type.
- A lessons-library section added to the weekly review page (403B).
- Handling of the empty state (no lessons recorded yet, or none for a given group).
- Unit tests: grouping is correct against fixture data; empty state is handled without error.

**Excluded:**
- No changes to how lessons are captured (that is 401A's `lessonsLearned` field and 402A's
  `lesson` field — this story only reads and displays them).
- No editing of lessons from this view; this is a read-only aggregation/display.

This story is not split. A single aggregation query plus one display section is small enough
to ship as one slice.

---

# Files Expected

- The lessons-aggregation query/module (exact path determined during implementation, likely
  alongside `reporting/weekly.ts` or `reporting/conversion.ts`).
- The lessons-library section added to the `/tif/oi/review` page.
- Accompanying unit tests.

---

# Dependencies

`POIS-405-conversion-analysis.md`

---

# Referenced Documents

- `POIS-DATA-MODEL.md` — `OiDecision.lessonsLearned` and `OiOutcome.lesson` fields.
- `POIS-OPERATOR-UX.md` — weekly review layout conventions (for where this section sits
  relative to the conversion-analysis section from 405).

---

# Acceptance Criteria

- [ ] Lessons from resolved decisions and outcomes are aggregated and grouped correctly by
      opportunity type and signal type (verified by unit test against fixture data).
- [ ] The empty state (no lessons yet) renders without error.
- [ ] The lessons-library section renders on the weekly review page.

---

# Validation

```
npm test -- lessons-library
```

---

# Rollback

Hide the lessons-library section on the weekly review page.

---

# Expected Diff Size

Small.

---

# Estimated Time

45 minutes.

---

# Next Story

`POIS-407-timeline-extension.md`
