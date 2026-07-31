## Story Metadata

Milestone:
M1

Parent Task:
POIS-107

Story:
POIS-107

Depends On:
POIS-106B

Blocks:
POIS-108A

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

**Business objective:** Give Todd a single place to find any opportunity and immediately see what
is stalled, so nothing silently goes cold in the pipeline.

**User story:** As Todd, I can find any opportunity and see what is stalled, filtered and sorted
the way I need.

**Commercial outcome:** This is the first pipeline-wide view — it converts a growing list of
individually-promoted opportunities into a manageable, auditable pipeline.

---

# Scope

**Included:**
- `src/app/tif/oi/opportunities/page.tsx` per `POIS-OPERATOR-UX.md` §5:
  - Filters by path and by state.
  - Sort by PE (priority-effort score).
  - A stale-warning row for opportunities with an `open` next action untouched for 14+ days.
  - A "no next action" defect row for opportunities missing an `open` next action entirely.
- Standard M1 route preconditions: `robots: noindex`, `export const dynamic =
  "force-dynamic"`.

**Excluded:**
- No changes to next-action derivation or creation logic (built in POIS-106A/106B).
- No workbench detail page (POIS-108).

---

# Files Expected

- `src/app/tif/oi/opportunities/page.tsx`

---

# Dependencies

`POIS-106B-next-action-display-and-creation.md`

---

# Referenced Documents

- `POIS-OPERATOR-UX.md` §5 (pipeline list layout, filters, sort, and warning rows).

---

# Acceptance Criteria

- [ ] Filters (path, state) compose correctly — applying more than one narrows results as
      expected.
- [ ] Stale detection fires correctly at the 14-day boundary (13/14/15-day fixtures).
- [ ] Opportunities with no `open` next action are counted in the defect row.
- [ ] Both warning rows (stale, no-next-action) render and link to the affected opportunity
      records.
- [ ] Manual test: filtering to FTE only and sorting by PE both work correctly together.
- [ ] The route sets `robots: noindex` and `export const dynamic = "force-dynamic"`.

---

# Validation

```
npm test
npm run build
```

---

# Rollback

Delete `src/app/tif/oi/opportunities/page.tsx`.

---

# Expected Diff Size

Medium.

---

# Estimated Time

75 minutes.

---

# Next Story

`POIS-108A-opportunity-lifecycle-state-machine.md`
