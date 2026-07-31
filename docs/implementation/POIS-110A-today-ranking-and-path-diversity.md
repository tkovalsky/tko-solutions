## Story Metadata

Milestone:
M1

Parent Task:
POIS-110

Story:
POIS-110A

Depends On:
POIS-109

Blocks:
POIS-110B

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

**Business objective:** Establish, as pure deterministic logic, which opportunities belong on
Todd's daily queue and in what order — including forcing path diversity so consulting
opportunities never crowd out FTE ones by PE alone — before any UI renders the queue.

**User story:** As Codex, I need `queue/today.ts` to correctly rank, cap, suppress, and diversify
the daily queue, so the page story that follows (POIS-110C) has correct data to render.

**Commercial outcome:** None directly yet — not yet user-visible. First of four checkpoints
(110A–110D) building the Today dashboard.

---

# Scope

**Included:**
- `src/lib/opportunity-intelligence/queue/today.ts` — ranking logic per
  `POIS-SCORING-AND-DECISION-MODEL.md` §9, including:
  - Path diversity enforcement.
  - Cap of 5 opportunities.
  - Suppression of dismissed, paused, snoozed, and terminal-status opportunities.
  - Exclusion of opportunities whose initiative confidence is below 0.30.
  - Overdue-first ordering.
- A fixture test proving path diversity: a fixture where pure PE ranking would return 5
  consulting items must return at least 1 FTE item instead.

**Excluded:**
- No `queue/changes.ts` or `reporting/pipeline-summary.ts` (POIS-110B).
- No UI (POIS-110C).
- No `snoozeOpportunity` / `dismissOpportunity` / `completeNextAction` actions (POIS-110D).

---

# Files Expected

- `src/lib/opportunity-intelligence/queue/today.ts`

---

# Dependencies

`POIS-109-score-explanation-panel.md`

---

# Referenced Documents

- `POIS-SCORING-AND-DECISION-MODEL.md` §9 (queue ranking and path diversity rules only).

---

# Acceptance Criteria

- [ ] The queue is capped at 5 opportunities.
- [ ] Dismissed, paused, snoozed, and terminal-status opportunities are suppressed, each verified
      by test.
- [ ] Opportunities with initiative confidence below 0.30 are excluded.
- [ ] Overdue opportunities are ordered ahead of everything else.
- [ ] The path-diversity fixture test passes: a fixture where pure PE ranking would return 5
      consulting items instead returns at least 1 FTE item.
- [ ] Not yet user-visible — surfaced in POIS-110C.

---

# Validation

```
npm test
```

---

# Rollback

Delete `queue/today.ts`. No persisted state depends on it yet.

---

# Expected Diff Size

Small.

---

# Estimated Time

90 minutes.

---

# Next Story

`POIS-110B-today-changes-and-pipeline-summary.md`
