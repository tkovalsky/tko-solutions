## Story Metadata

Milestone:
M3

Parent Task:
POIS-307

Story:
POIS-307A

Depends On:
POIS-306B

Blocks:
POIS-307B

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

**Business objective:** FTE roles below a defined compensation floor are not worth pursuing as
employment and should be redirected toward a consulting relationship instead. This story builds
the deterministic comp-floor logic that makes that judgment automatically and explainably.

**User story:** As Todd, when I look at an FTE role's profile, I want the system to tell me
whether it clears the compensation floor, and if not, to retain it as a consulting opportunity
rather than silently dropping it.

**Commercial outcome:** Protects Todd's time by disqualifying employment paths that don't meet
his minimum viable compensation, while preserving the underlying relationship as a consulting
lead rather than discarding it.

---

# Scope

**Included:**
- `commercial/role-profile.ts` — comp-floor enforcement logic:
  - $224,999 total comp disqualifies the role as FTE.
  - $225,000 total comp passes.
  - A below-floor role is retained (not deleted) and reclassified as a consulting opportunity.
  - Stale-posting detection at 30 days since last verified.
  - Total-comp annualization logic (normalizing hourly/monthly/partial-year comp figures to an
    annualized total for floor comparison).

**Excluded:**
- No UI (POIS-307B).
- No `upsertRoleProfile` action (POIS-307B).
- No change to the $225,000 floor value itself. Per `docs/IMPLEMENTATION_RULES.md`
  ("Escalate, do not decide" #3), the comp floor is a business decision reserved for Todd's
  explicit sign-off — this story implements the existing floor as a constant, it does not choose
  or adjust it. If the floor value is not already documented as a decided constant somewhere in
  the repo, escalate before hardcoding it rather than guessing.

---

# Files Expected

- `commercial/role-profile.ts`
- Corresponding test file with the floor, stale-posting, and annualization fixture cases

---

# Dependencies

`POIS-306B-workbench-activity-log-display.md`

---

# Referenced Documents

- `docs/opportunity-intelligence/POIS-CODEX-TASKS.md` — POIS-307 section.
- `docs/IMPLEMENTATION_RULES.md` — "Escalate, do not decide" #3 (comp-floor value ownership).

---

# Acceptance Criteria

- [ ] A role with $224,999 total annualized comp is disqualified from FTE classification.
- [ ] A role with $225,000 total annualized comp passes.
- [ ] A disqualified (below-floor) role is retained in the system and reclassified as a
      consulting opportunity, not deleted or hidden.
- [ ] A posting last verified 30+ days ago is flagged as stale.
- [ ] Non-annual comp figures (e.g. hourly, monthly, or partial-year) are correctly annualized
      before floor comparison.
- [ ] The $225,000 floor value exists as a single named constant, not duplicated or
      re-derived in multiple places.

---

# Validation

```
npm run test -- role-profile
npm run typecheck
```

---

# Rollback

Revert `commercial/role-profile.ts` and its tests; no migration to unwind.

---

# Expected Diff Size

Small.

---

# Estimated Time

75 minutes.

---

# Next Story

`POIS-307B-role-profile-section-and-action.md`
