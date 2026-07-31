## Story Metadata

Milestone:
M3

Parent Task:
POIS-308

Story:
POIS-308A

Depends On:
POIS-307B

Blocks:
POIS-308B

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

**Business objective:** Applying for an FTE role and pursuing an executive relationship are two
different tracks that need to be tracked from posting through offer, with deterministic state
transitions and automatic staleness detection.

**User story:** As Todd, I want the system to track an FTE role's status — applied, interviewing,
offer, no-response — through defined transitions, so I always know where each application
actually stands.

**Commercial outcome:** Gives Todd a reliable, non-manual record of where each FTE pursuit stands,
including automatic detection of roles that have gone quiet.

---

# Scope

**Included:**
- FTE state machine defining valid transitions (e.g. posted → applied → interviewing → offer,
  plus a `no_response` terminal state).
- `markApplied()` — transitions to applied and schedules a +14 day follow-up next-action.
- `advanceInterviewStage()` — transitions through interview stages.
- `recordOffer()` — transitions to offer received.
- `verifyPostingOpen()` — re-checks and records whether a posting is still open.
- `no_response` auto-transition after 21 days with no activity.
- No UI in this story — pure state machine and action logic.

**Excluded:**
- No application tracker UI (POIS-308B).
- No dual-track prompt UI (POIS-308B).
- Rule 8 note: `markApplied()` records that Todd applied through some channel outside this repo;
  it does not submit an application anywhere. No email, messaging, social, or
  application-submission API call is introduced by this story.

---

# Files Expected

- `commercial/fte-state-machine.ts` (or equivalent)
- `action/fte-application.ts` (or equivalent, housing `markApplied`, `advanceInterviewStage`,
  `recordOffer`, `verifyPostingOpen`)
- Corresponding test file covering every transition and the 21-day `no_response` case

---

# Dependencies

`POIS-307B-role-profile-section-and-action.md`

---

# Referenced Documents

- `docs/opportunity-intelligence/POIS-CODEX-TASKS.md` — POIS-308 section.
- `docs/IMPLEMENTATION_RULES.md` — Rule 8 (no outbound send / submission capability).

---

# Acceptance Criteria

- [ ] Every defined FTE state transition (posted → applied → interviewing → offer, and any
      intermediate interview stages) is covered by a passing test.
- [ ] `markApplied()` transitions to applied and creates a +14 day follow-up next-action.
- [ ] `advanceInterviewStage()` correctly moves the role through interview stages in order.
- [ ] `recordOffer()` transitions to offer received.
- [ ] `verifyPostingOpen()` correctly records posting-open status.
- [ ] A role with no activity for 21 days auto-transitions to `no_response`.
- [ ] No code path in this story calls any application-submission API — `markApplied()` only
      records that Todd applied elsewhere.

---

# Validation

```
npm run test -- fte-state-machine
npm run test -- fte-application
npm run typecheck
```

---

# Rollback

Revert `commercial/fte-state-machine.ts`, `action/fte-application.ts`, and tests; no migration to
unwind.

---

# Expected Diff Size

Medium.

---

# Estimated Time

90 minutes.

---

# Next Story

`POIS-308B-application-tracker-and-dual-track-prompt.md`
