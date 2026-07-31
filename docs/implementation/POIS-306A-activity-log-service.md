## Story Metadata

Milestone:
M3

Parent Task:
POIS-306

Story:
POIS-306A

Depends On:
POIS-305B

Blocks:
POIS-306B

Estimated PR Size:
Small

Expected Review Time:
5-10 minutes

Risk:
High

Breaking Change:
No

Migration:
No

Feature Flag:
No

---

# Story

**Business objective:** Todd needs an append-only, tamper-evident record of what actually
happened on an opportunity (outreach sent, calls made, corrections), plus automatic scheduling
of the next follow-up — without any code in this repo ever being capable of sending anything on
his behalf.

**User story:** As Todd, when I log that I sent an outreach message, I want the system to record
that fact and automatically schedule my follow-up in one step, and I want the log itself to be
permanently append-only so it stays trustworthy.

**Commercial outcome:** Establishes the trust backbone of the pursuit workflow: a log Todd can
rely on as a true record, and a follow-up cadence that doesn't depend on Todd remembering to set
it manually. This story also carries the milestone's highest-stakes compliance check — proof
that no code path can send anything automatically.

---

# Scope

**Included:**
- `action/activity.ts` exporting exactly two mutation functions: `appendActivity()` and
  `correctActivity()`. No update or delete path exists or is exported.
- `logOutreachSent`: in a single transaction, creates one `OiActivity(outreach_sent)` and one
  `OiNextAction(follow_up, +7 days)`, and closes any prior open next-action for that opportunity.
- `logActivity`: general-purpose append for other activity kinds.
- **A grep test proving no email, messaging, social, or application-submission API call exists
  anywhere in POIS code** (e.g. `action/`, `commercial/` directories under the opportunity-
  intelligence feature area) — this is the highest-stakes compliance check in the milestone and
  must run as part of this story's test suite, not just as a manual check.

**Excluded:**
- No update or delete function for activities, ever, in this story or any future one without an
  explicit, separate architectural decision.
- No workbench UI display (POIS-306B).
- Rule 8 note — **this is the story that enforces Rule 8 mechanically.** `logOutreachSent` logs
  the fact that Todd sent something himself, through some channel outside this repo; it never
  performs the send. `OiActivity` records history, it does not trigger action. The grep test in
  this story's Acceptance Criteria is the proof artifact for this constraint going forward.

---

# Files Expected

- `action/activity.ts`
- `action/activity.test.ts` (or equivalent) including the append-only assertion, the
  `logOutreachSent` transaction test, and the no-outbound-API grep test

---

# Dependencies

`POIS-305B-brief-snapshot-artifact.md`

---

# Referenced Documents

- `docs/opportunity-intelligence/POIS-CODEX-TASKS.md` — POIS-306 section.
- `docs/IMPLEMENTATION_RULES.md` — Rule 8 (no outbound send capability).

---

# Acceptance Criteria

- [ ] `action/activity.ts` exports exactly `appendActivity()` and `correctActivity()` — a test
      asserts no `updateActivity` or `deleteActivity` (or equivalent) is exported.
- [ ] `correctActivity()` creates a new record referencing the original rather than mutating it.
- [ ] `logOutreachSent()` creates exactly one `OiActivity(outreach_sent)` and exactly one
      `OiNextAction(follow_up, +7d)` in a single transaction.
- [ ] Calling `logOutreachSent()` closes the prior open next-action for that opportunity, if one
      exists.
- [ ] A grep test scans POIS code (action/, commercial/ under the opportunity-intelligence
      feature area) for known email/messaging/social/application-submission API signatures
      (e.g. `sendgrid`, `nodemailer`, `smtp`, `twilio`, `linkedin.*api`, `fetch(.*mailto`, known
      ATS submission endpoints) and asserts zero matches.

---

# Validation

```
npm run test -- activity
npm run test -- no-outbound-api-grep
npm run typecheck
```

---

# Rollback

Revert `action/activity.ts` and its tests; no migration to unwind (the `OiActivity` /
`OiNextAction` tables already exist from earlier milestones).

---

# Expected Diff Size

Small.

---

# Estimated Time

75 minutes.

---

# Next Story

`POIS-306B-workbench-activity-log-display.md`
