## Story Metadata

Milestone:
M1

Parent Task:
POIS-106

Story:
POIS-106A

Depends On:
POIS-105F

Blocks:
POIS-106B

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

**Business objective:** Establish, as pure deterministic logic, exactly which single next action
applies to any opportunity — before any UI shows it to Todd.

**User story:** As Codex, I need `next-action.ts` to correctly derive the single next action for
any opportunity state, using first-match-wins ordering, so the display story that follows
(POIS-106B) has correct data to render.

**Commercial outcome:** None directly yet — not yet user-visible. Surfaced in POIS-106B.

---

# Scope

**Included:**
- `src/lib/opportunity-intelligence/commercial/next-action.ts` — the derivation table per
  architecture §7.6, first-match-wins.
- Tests for every row of the derivation table.
- A test confirming correct ordering when multiple conditions hold simultaneously.
- A test for the 14-day stale rule.
- A test confirming the pre-existing partial unique index (added in POIS-006D — do not re-add it
  here) correctly rejects a second `open` next action for the same opportunity.

**Excluded:**
- No UI. No next-action display, no creation-on-promote wiring — that is POIS-106B.
- No changes to the partial unique index itself; it already exists from POIS-006D.

---

# Files Expected

- `src/lib/opportunity-intelligence/commercial/next-action.ts`

---

# Dependencies

`POIS-105F-score-summary-display.md`

---

# Referenced Documents

- `POIS-ARCHITECTURE.md` §7.6 (next-action derivation table only).

---

# Acceptance Criteria

- [ ] Every row of the derivation table in §7.6 is covered by a test.
- [ ] Ordering is respected when multiple conditions hold — first match wins.
- [ ] The 14-day stale rule is correctly implemented and tested.
- [ ] A test confirms the existing partial unique index (from POIS-006D) rejects a second `open`
      next action for the same opportunity.
- [ ] Not yet user-visible — surfaced in POIS-106B.

---

# Validation

```
npm test
```

---

# Rollback

Delete `next-action.ts`. No persisted state depends on it yet, and the partial unique index from
POIS-006D is untouched.

---

# Expected Diff Size

Small.

---

# Estimated Time

60 minutes.

---

# Next Story

`POIS-106B-next-action-display-and-creation.md`
