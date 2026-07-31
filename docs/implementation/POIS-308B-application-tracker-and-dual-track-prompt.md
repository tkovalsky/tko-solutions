## Story Metadata

Milestone:
M3

Parent Task:
POIS-308

Story:
POIS-308B

Depends On:
POIS-308A

Blocks:
POIS-309

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

**Business objective:** Make the FTE state machine from POIS-308A visible and actionable, and
surface the dual-track opportunity: for FTE roles, Todd should be prompted to both apply through
the normal channel and separately reach out to the hiring executive directly.

**User story:** As Todd, I want to see a role's application status at a glance, and when a role
is an FTE posting I haven't yet reached out about, I want to be reminded that applying and
contacting the hiring executive are two separate, complementary tracks.

**Commercial outcome:** Completes the POIS-308 vertical slice — a role now visibly tracks from
posting to offer, and Todd is nudged toward the dual-track strategy that maximizes his chances
(formal application plus direct executive outreach) rather than relying on the application queue
alone.

---

# Scope

**Included:**
- Application tracker UI displaying current FTE state (per POIS-308A's state machine),
  interview stage, posting-open status, and staleness/no-response indicators.
- Dual-track prompt: renders when `type = fte` and no `outreach_sent` `OiActivity` exists yet for
  that opportunity, prompting Todd to consider direct executive outreach in addition to the
  formal application.
- Controls to trigger `markApplied()`, `advanceInterviewStage()`, `recordOffer()`, and
  `verifyPostingOpen()` from POIS-308A.

**Excluded:**
- No changes to the state machine or transition logic (POIS-308A owns that).
- Rule 8 note: the dual-track prompt is a reminder to Todd, not an automated outreach or
  application trigger. It contains no button or control that sends, submits, or applies anything
  on Todd's behalf — those actions happen outside this repo; the UI only reflects and records
  what Todd tells it he did (via `markApplied()` and the activity log from POIS-306A).

---

# Files Expected

- Application tracker component on the opportunity view
- Dual-track prompt component

---

# Dependencies

`POIS-308A-fte-state-machine-and-actions.md`

---

# Referenced Documents

- `docs/opportunity-intelligence/POIS-CODEX-TASKS.md` — POIS-308 section.
- `docs/IMPLEMENTATION_RULES.md` — Rule 8 (no outbound send / submission capability).

---

# Acceptance Criteria

- [ ] The application tracker displays current state, interview stage, posting-open status, and
      staleness indicators for a given FTE role, sourced from POIS-308A.
- [ ] A role visibly progresses through the tracker UI from posted through offer as its
      underlying state changes.
- [ ] The dual-track prompt renders only when `type = fte` and no `outreach_sent` activity
      exists for the opportunity; it does not render otherwise.
- [ ] Triggering the UI controls correctly calls `markApplied()`, `advanceInterviewStage()`,
      `recordOffer()`, and `verifyPostingOpen()` with no duplicated transition logic in the UI
      layer.
- [ ] No control in the tracker or the dual-track prompt sends, submits, or applies anything
      automatically.

---

# Validation

```
npm run test -- fte-application
npm run typecheck
```

Manual: create an FTE opportunity with no outreach logged, confirm the dual-track prompt renders;
log outreach via POIS-306A's `logOutreachSent`, confirm the prompt disappears.

---

# Rollback

Hide the application tracker and dual-track prompt UI; `commercial/fte-state-machine.ts` and
`action/fte-application.ts` remain intact and unaffected.

---

# Expected Diff Size

Medium.

---

# Estimated Time

90 minutes.

---

# Next Story

`POIS-309-proposal-outline.md`
