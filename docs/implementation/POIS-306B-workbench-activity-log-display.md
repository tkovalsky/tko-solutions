## Story Metadata

Milestone:
M3

Parent Task:
POIS-306

Story:
POIS-306B

Depends On:
POIS-306A

Blocks:
POIS-307A

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

**Business objective:** The append-only activity log built in POIS-306A is only useful to Todd
if he can see it. This story surfaces it in the workbench.

**User story:** As Todd, I want to see the full activity history for an opportunity — including
corrections — directly in my workbench, so I always know what's actually happened.

**Commercial outcome:** Completes the POIS-306 vertical slice — the log is now both trustworthy
(append-only, POIS-306A) and visible (this story).

---

# Scope

**Included:**
- Workbench activity log display: renders every `OiActivity` for an opportunity in chronological
  order, including corrections shown alongside (not replacing) the records they reference.
- Visual indication of scheduled next actions (from `logOutreachSent`'s `OiNextAction` creation)
  where relevant to the log view.

**Excluded:**
- No new mutation logic — reuse `appendActivity()` / `correctActivity()` / `logOutreachSent()` /
  `logActivity()` from POIS-306A unmodified.
- No edit or delete UI controls of any kind (there is no update/delete path to wire up).
- Rule 8 note: this is a read-only display of history. It introduces no send, email, messaging,
  social, or application-submission capability.

---

# Files Expected

- Workbench component displaying the activity log (path depends on existing workbench structure
  — determine during implementation)

---

# Dependencies

`POIS-306A-activity-log-service.md`

---

# Referenced Documents

- `docs/opportunity-intelligence/POIS-CODEX-TASKS.md` — POIS-306 section (workbench log display
  only).

---

# Acceptance Criteria

- [ ] Every `OiActivity` for an opportunity renders in the workbench in chronological order.
- [ ] Corrections display alongside the original record they reference, not in place of it.
- [ ] The log is read-only — no edit or delete controls are present anywhere in the UI.
- [ ] The log is append-only in observable behavior: acceptance confirmed by re-running
      POIS-306A's append-only test against the display's data source.

---

# Validation

```
npm run test -- activity
npm run typecheck
```

Manual: log an outreach-sent activity and a correction in sequence, confirm both render in the
workbench in order.

---

# Rollback

Hide the workbench activity log section; `action/activity.ts` remains intact and unaffected.

---

# Expected Diff Size

Small.

---

# Estimated Time

45 minutes.

---

# Next Story

`POIS-307A-role-profile-comp-floor-logic.md`
