## Story Metadata

Milestone:
M3

Parent Task:
POIS-307

Story:
POIS-307B

Depends On:
POIS-307A

Blocks:
POIS-308A

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

**Business objective:** The comp-floor logic from POIS-307A only helps Todd if he can see the
role profile and understand, in plain terms, why a role was or wasn't disqualified.

**User story:** As Todd, I want to view a role's profile in the opportunity view and see clearly
why it did or didn't clear the compensation floor, so I don't have to reverse-engineer the logic
myself.

**Commercial outcome:** Completes the POIS-307 vertical slice — the comp floor is now both
enforced (POIS-307A) and explained (this story), which is the actual acceptance bar for the
original task.

---

# Scope

**Included:**
- Role profile section UI on the opportunity view, showing total annualized comp, floor status
  (pass/fail), and — when disqualified — a plain-language explanation of why (e.g. "Total comp of
  $210,000 is below the $225,000 floor; retained as a consulting opportunity").
- `upsertRoleProfile` action for creating/updating a role profile's underlying data, calling into
  `commercial/role-profile.ts` (POIS-307A) for floor evaluation.
- Stale-posting indicator surfaced in the section.

**Excluded:**
- No changes to the comp-floor logic or the $225,000 constant itself (POIS-307A owns that; this
  story only calls it).
- No changes to consulting-opportunity reclassification logic beyond displaying its result.

---

# Files Expected

- Role profile section component on the opportunity view
- `action/upsert-role-profile.ts` (or equivalent — new `upsertRoleProfile` action)

---

# Dependencies

`POIS-307A-role-profile-comp-floor-logic.md`

---

# Referenced Documents

- `docs/opportunity-intelligence/POIS-CODEX-TASKS.md` — POIS-307 section.

---

# Acceptance Criteria

- [ ] The role profile section displays total annualized comp and floor pass/fail status.
- [ ] When a role is disqualified, the UI explains why in plain language, referencing the
      specific comp figure and the floor.
- [ ] Stale postings (30+ days, per POIS-307A) are visibly flagged in the section.
- [ ] `upsertRoleProfile` correctly creates and updates role profile records and triggers
      re-evaluation against the comp floor.
- [ ] No comp-floor logic was duplicated in the UI layer — the section calls
      `commercial/role-profile.ts`, it does not reimplement the comparison.

---

# Validation

```
npm run test -- role-profile
npm run typecheck
```

Manual: enter a role at $210,000 and confirm the disqualification explanation renders; enter one
at $225,000 and confirm it passes.

---

# Rollback

Hide the role profile section; `commercial/role-profile.ts` remains intact and unaffected.

---

# Expected Diff Size

Medium.

---

# Estimated Time

75 minutes.

---

# Next Story

`POIS-308A-fte-state-machine-and-actions.md`
