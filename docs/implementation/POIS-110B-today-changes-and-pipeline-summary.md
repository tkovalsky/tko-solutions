## Story Metadata

Milestone:
M1

Parent Task:
POIS-110

Story:
POIS-110B

Depends On:
POIS-110A

Blocks:
POIS-110C

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

**Business objective:** Establish, as pure deterministic logic, what changed recently and how the
pipeline is trending overall — including the income-replacement calculation that anchors the
Oct-1 goal — before any UI renders it.

**User story:** As Codex, I need `queue/changes.ts` and `reporting/pipeline-summary.ts` to
correctly compute recent changes and pipeline-wide summary figures, so the page story that
follows (POIS-110C) has correct data to render.

**Commercial outcome:** None directly yet — not yet user-visible. Second of four checkpoints
(110A–110D) building the Today dashboard.

---

# Scope

**Included:**
- `src/lib/opportunity-intelligence/queue/changes.ts` — recent-changes computation over a 48-hour
  window, capped at 6 items.
- `src/lib/opportunity-intelligence/reporting/pipeline-summary.ts` — pipeline-wide summary
  figures, including income replacement computed as `expectedValueTotal / 300000`.

**Excluded:**
- No changes to `queue/today.ts` (built in POIS-110A).
- No UI (POIS-110C).
- No `snoozeOpportunity` / `dismissOpportunity` / `completeNextAction` actions (POIS-110D).

---

# Files Expected

- `src/lib/opportunity-intelligence/queue/changes.ts`
- `src/lib/opportunity-intelligence/reporting/pipeline-summary.ts`

---

# Dependencies

`POIS-110A-today-ranking-and-path-diversity.md`

---

# Referenced Documents

- `POIS-SCORING-AND-DECISION-MODEL.md` §9 (48-hour changes window and pipeline summary
  definitions).

---

# Acceptance Criteria

- [ ] `queue/changes.ts` correctly returns changes within a 48-hour window, capped at 6 items.
- [ ] `reporting/pipeline-summary.ts` correctly computes income replacement as
      `expectedValueTotal / 300000`, verified by test.
- [ ] Both functions are pure — no side effects, no persistence.
- [ ] Not yet user-visible — surfaced in POIS-110C.

---

# Validation

```
npm test
```

---

# Rollback

Delete `queue/changes.ts` and `reporting/pipeline-summary.ts`. No persisted state depends on
them yet.

---

# Expected Diff Size

Small.

---

# Estimated Time

60 minutes.

---

# Next Story

`POIS-110C-today-page-and-card-ui.md`
