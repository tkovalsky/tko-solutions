## Story Metadata

Milestone:
M1

Parent Task:
POIS-110

Story:
POIS-110D

Depends On:
POIS-110C

Blocks:
POIS-111

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

**Business objective:** Make the Today dashboard fully actionable — Todd needs to be able to
snooze, dismiss, and complete items directly from the queue, or the dashboard is just a read-only
report.

**User story:** As Todd, I can snooze an opportunity (3 days, 1 week, or 2 weeks, no reason
needed), dismiss one (reason required), or complete its next action (which derives the successor
action automatically) — all without leaving the Today dashboard.

**Commercial outcome:** This completes the daily operating loop: Todd can open Today, act on every
card, and close the loop in under 30 minutes.

---

# Scope

**Included:**
- `snoozeOpportunity` server action: accepts 3d/1w/2w, no reason required.
- `dismissOpportunity` server action: requires a reason.
- `completeNextAction` server action: derives the successor next action automatically (using
  `next-action.ts` from POIS-106A).
- Wire all three actions into the card component built in POIS-110C.

**Excluded:**
- No changes to the ranking, changes, pipeline-summary, page layout, or card rendering logic
  itself (built in POIS-110A/110B/110C).

---

# Files Expected

- `src/app/tif/oi/today/actions.ts`
- `src/app/tif/oi/today/opportunity-card.tsx`

---

# Dependencies

`POIS-110C-today-page-and-card-ui.md`

---

# Referenced Documents

- None beyond the existing `next-action.ts` contract from POIS-106A.

---

# Acceptance Criteria

- [ ] `snoozeOpportunity` accepts 3d/1w/2w and requires no reason.
- [ ] `dismissOpportunity` rejects an empty reason.
- [ ] `completeNextAction` derives and creates the correct successor next action.
- [ ] All three actions are reachable and functional directly from the Today dashboard cards.
- [ ] Manual test: Todd completes a full daily loop (review queue, act on each card) in under 30
      minutes.
- [ ] All elements from `POIS-OPERATOR-UX.md` §3 are present and functional.
- [ ] This is the final letter in the POIS-110 chain — the capability is now visible and fully
      usable by Todd.

---

# Validation

```
npm test
npm run build
```

---

# Rollback

Remove the three action wirings from the card component; the Today page still renders read-only
per POIS-110C.

---

# Expected Diff Size

Medium.

---

# Estimated Time

75 minutes.

---

# Next Story

`POIS-111-decision-journal-capture.md`
