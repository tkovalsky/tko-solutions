## Story Metadata

Milestone:
M1

Parent Task:
POIS-112

Story:
POIS-112

Depends On:
POIS-111

Blocks:
POIS-201A

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

**Business objective:** Show Todd the narrative of an opportunity — what happened, in order —
entirely from data that already exists, with no new model and no new table.

**User story:** As Todd, I see the story of an opportunity: executive hired, role opened,
outreach sent, outcome — in chronological order, on the workbench.

**Commercial outcome:** This closes Milestone 1 by making the accumulated evidence and activity
legible as a narrative, not just a pile of records.

---

# Scope

**Included:**
- `src/lib/opportunity-intelligence/action/timeline.ts` — `buildTimeline`, a derived function.
  It creates no new model. It merges `OiSignal` (via the opportunity's initiative), `OiActivity`,
  status-change activities, and `OiDecision`, sorted by date.
- A timeline section on the workbench (built in POIS-108C/109), rendering a vertical list, oldest
  first, each entry showing date, kind icon, label, and a source link where one exists.

**Excluded:**
- No new `OiTimeline` table or model of any kind — explicitly verified by test.

---

# Files Expected

- `src/lib/opportunity-intelligence/action/timeline.ts`
- `src/app/tif/oi/opportunities/[id]/page.tsx`

---

# Dependencies

`POIS-111-decision-journal-capture.md`

---

# Referenced Documents

- None beyond the four source types named above (`OiSignal`, `OiActivity`, status-change
  activities, `OiDecision`) — no new document sections are required to merge existing data.

---

# Acceptance Criteria

- [ ] `buildTimeline` correctly merges and orders entries from all four sources: `OiSignal` (via
      initiative), `OiActivity`, status-change activities, and `OiDecision`.
- [ ] An opportunity with no history renders an empty-timeline hint rather than an empty list.
- [ ] A test asserts no `OiTimeline` table or model is referenced anywhere in the implementation.
- [ ] Manual test: an opportunity with 3 signals and 2 activities shows 5 or more ordered entries.
- [ ] The timeline reproduces the executive-hired to role-opened to outreach to outcome narrative
      using only existing data.

---

# Validation

```
npm test
npm run build
```

---

# Rollback

Hide the timeline section on the workbench. No model or migration to revert.

---

# Expected Diff Size

Small.

---

# Estimated Time

60 minutes.

---

# Next Story

`POIS-201A` (first story of Milestone 2).
