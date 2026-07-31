## Story Metadata

Milestone:
M4

Parent Task:
POIS-407

Story:
POIS-407

Depends On:
POIS-406

Blocks:
None (build freeze, 2026-09-14)

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

**Business objective:** An account's timeline is only a complete narrative if it runs through
to the outcome. Without decisions and outcomes on it, the timeline stops telling the story
right where the most important part — what actually happened — begins.

**User story:** As Todd, I want the account timeline to include decisions and outcomes,
rendered on the weekly review as an account-level view, so I can see the complete narrative
from first signal through to outcome in one place.

**Commercial outcome:** The timeline shows the complete narrative through outcome — closing the
loop from first signal to resolved result in a single, readable view.

---

# Scope

**Included:**
- Extension of `buildTimeline` (from POIS-112) to merge in decisions (from 401A/401B) and
  outcomes (from 402A/402B) as timeline entries.
- An account-level rendering of the extended timeline on the weekly review page (403B).
- Unit tests: merge ordering is correct when decisions and outcomes are interleaved with the
  existing timeline sources.

**Excluded:**
- No changes to the existing timeline sources or their ordering logic beyond adding the two new
  source types. This is an additive extension of `buildTimeline`, not a rewrite.
- No new UI surface beyond the weekly review's account-level view; this story does not add a
  standalone timeline page.

This story is not split. A small, additive extension of an existing function plus one render
location is small enough to ship as one slice. This is the last scheduled story in the
Milestone 4 backlog before the build freeze.

---

# Files Expected

- The `buildTimeline` module (from POIS-112) — extended, not replaced.
- The account-level timeline rendering added to the `/tif/oi/review` page.
- Accompanying unit tests for merge ordering.

---

# Dependencies

`POIS-406-lessons-library.md`

---

# Referenced Documents

- The existing `buildTimeline` implementation from POIS-112 (merge/ordering contract this
  story must extend, not break).
- `POIS-OPERATOR-UX.md` — weekly review layout conventions (for the account-level view
  placement).

---

# Acceptance Criteria

- [ ] `buildTimeline` includes decision entries and outcome entries alongside existing sources.
- [ ] Merge ordering across all sources (existing + decisions + outcomes) is correct against
      fixture data (verified by unit test).
- [ ] The account-level timeline view on the weekly review page shows the complete narrative
      from first signal through to outcome for a given account.
- [ ] No existing timeline source's ordering or content is altered beyond the addition of the
      two new source types.

---

# Validation

```
npm test -- timeline
```

---

# Rollback

Revert `buildTimeline` to its POIS-112 version, and remove the account-level timeline view from
the weekly review page.

---

# Expected Diff Size

Small.

---

# Estimated Time

60 minutes.

---

# Next Story

None — Milestone 4 is the last scheduled milestone before the build freeze on 2026-09-14.
Post-October-1 work (Milestone 5) is specified in POIS-CODEX-IMPLEMENTATION-PLAN.md but not
scheduled.
