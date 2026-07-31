## Story Metadata

Milestone:
M1

Parent Task:
POIS-110

Story:
POIS-110C

Depends On:
POIS-110B

Blocks:
POIS-110D

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

**Business objective:** Replace the placeholder Today page (from POIS-101A) with the real
dashboard Todd opens every morning, so the ranked queue, recent changes, and pipeline summary
built in POIS-110A/110B become visible.

**User story:** As Todd, I open one screen every morning and know what to do — the header (Oct-1
countdown and pipeline percentage) paints before the cards, overdue items sit above everything
else, and I never see more than 5 cards.

**Commercial outcome:** This is the primary daily-use screen for the entire system — the page
Todd is expected to open every single morning.

---

# Scope

**Included:**
- `src/app/tif/oi/today/page.tsx` — replaces the POIS-101A placeholder, rendering per
  `POIS-OPERATOR-UX.md` §3: header (Oct-1 countdown + pipeline percentage) paints before cards;
  overdue items ordered above everything else; a maximum of 5 cards; an empty state that gives a
  directive and names the gap to target — never congratulatory text.
- `src/app/tif/oi/today/opportunity-card.tsx` — the card component, with a `[ Start ]` control
  that deep-links to the relevant workbench anchor for the action type.
- Wires in the data from `queue/today.ts` (POIS-110A) and `queue/changes.ts` /
  `reporting/pipeline-summary.ts` (POIS-110B).

**Excluded:**
- No changes to the ranking, changes, or pipeline-summary logic itself (built in POIS-110A/110B).
- No `snoozeOpportunity` / `dismissOpportunity` / `completeNextAction` actions (POIS-110D) — cards
  render but their action buttons are not yet wired to working mutations.

---

# Files Expected

- `src/app/tif/oi/today/page.tsx`
- `src/app/tif/oi/today/opportunity-card.tsx`

---

# Dependencies

`POIS-110B-today-changes-and-pipeline-summary.md`

---

# Referenced Documents

- `POIS-OPERATOR-UX.md` §3 (Today dashboard layout, header, card, and empty-state copy).

---

# Acceptance Criteria

- [ ] The header (countdown + pipeline percentage) renders and paints before the cards.
- [ ] Overdue opportunities are ordered above all other cards.
- [ ] No more than 5 cards render at once.
- [ ] `[ Start ]` deep-links to the correct workbench anchor for the action type.
- [ ] The empty state contains the directive copy naming the gap to target, and explicitly does
      not contain congratulatory text — verified by test.
- [ ] The POIS-101A placeholder text ("Today arrives in POIS-110") no longer appears anywhere.
- [ ] Not yet fully user-actionable — card action buttons (snooze/dismiss/complete) are wired to
      working mutations in POIS-110D.

---

# Validation

```
npm test
npm run build
```

---

# Rollback

Restore the POIS-101A placeholder page in place of the real Today page.

---

# Expected Diff Size

Medium.

---

# Estimated Time

90 minutes.

---

# Next Story

`POIS-110D-today-actions.md`
