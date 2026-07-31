## Story Metadata

Milestone:
M2

Parent Task:
POIS-210

Story:
POIS-210A

Depends On:
POIS-209B

Blocks:
POIS-210B

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

**Business objective:** Give operators a research checklist and follow-up cadence per playbook,
displayed on the workbench, without ever touching the authoritative next-action logic.

**User story:** As Todd, I want to select a playbook for an opportunity and see its research
checklist, so I know what to do next without guessing — while trusting that the system's
authoritative next-action recommendation is untouched.

**Commercial outcome:** Improves operator workflow consistency by surfacing playbook guidance,
with zero risk to the existing, trusted next-action ranking.

---

# Scope

**Included:**
- A playbook selector on the workbench.
- Checklist display rendering the selected playbook's research checklist and follow-up cadence,
  for display only.

**Excluded:**
- **`deriveNextAction()` must NOT be modified in any way (D-023 / readiness review §3). It
  remains the sole authoritative source for next-action recommendations.** Playbooks supply
  research checklists and follow-up cadences for display only — never a substitute or input
  for `deriveNextAction()`.
- No campaign badges or `/tif/oi/campaigns` rollup page (POIS-210B — a separate, unrelated
  capability).

---

# Files Expected

- Playbook selector component on the workbench (path determined during implementation)
- Checklist display component (path determined during implementation)
- Corresponding tests, including a `deriveNextAction()` regression test

---

# Dependencies

`POIS-209B-matched-proof-display.md`

---

# Referenced Documents

- `POIS-OPERATOR-UX.md` — playbook selector and checklist section.
- Readiness review §3 / decision D-023 — `deriveNextAction()` must remain authoritative and
  unmodified.

---

# Acceptance Criteria

- [ ] Selecting a playbook displays its research checklist on the workbench.
- [ ] **An explicit test asserts `deriveNextAction()` is byte-for-byte unchanged and still the
      sole authoritative source of next-action recommendations.** This is the single
      highest-risk regression in this milestone and must not be skipped.
- [ ] Checklists are read-only/display-only — no code path from the playbook selector writes to
      or influences `deriveNextAction()`.

---

# Validation

```
npm test -- playbook
npm test -- deriveNextAction
```

---

# Rollback

Hide the playbook selector and checklist display from the workbench.

---

# Expected Diff Size

Small.

---

# Estimated Time

60 minutes.

---

# Next Story

`POIS-210B-campaign-badges-and-rollup-page.md`
