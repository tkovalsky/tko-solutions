## Story Metadata

Milestone:
M2

Parent Task:
POIS-201

Story:
POIS-201B

Depends On:
POIS-201A

Blocks:
POIS-202A

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

**Business objective:** Let an operator capture and select the one stakeholder who matters for
an opportunity, using role suggestions to make the decision fast rather than open-ended.

**User story:** As Todd, I want to add a stakeholder to an opportunity, see role suggestions
drawn from the initiative category, and mark exactly one of them as the selected contact — in
under 2 minutes.

**Commercial outcome:** This is the capability that makes stakeholder intelligence usable —
without it, the role map built in POIS-201A has no operator-facing effect. Completing this
story closes the POIS-201 vertical slice.

---

# Scope

**Included:**
- A stakeholder section and add/edit form on the workbench, using the role suggestions from
  `intelligence/stakeholder-suggest.ts` (POIS-201A).
- `addStakeholder`, `updateStakeholder`, `selectStakeholder`, and `markDoNotContact` actions.
- Enforcement (in the action layer, not just the UI) that a stakeholder with no evidence and no
  operator confirmation cannot be selected.
- Enforcement that a stakeholder marked do-not-contact (DNC) cannot be selected.

**Excluded:**
- No changes to the role-map logic itself (already complete in POIS-201A).
- No re-adding or modifying the one-selected partial unique index — it was added in POIS-006D
  and must be relied on as-is, not recreated.
- No contact point capture (POIS-203) or person facts (POIS-204) — those are later stories.

---

# Files Expected

- Workbench stakeholder section/component (path determined during implementation)
- Stakeholder form component (path determined during implementation)
- Server actions: `addStakeholder`, `updateStakeholder`, `selectStakeholder`,
  `markDoNotContact` (path determined during implementation)
- Corresponding tests for the above

---

# Dependencies

`POIS-201A-stakeholder-suggest-role-map.md`

---

# Referenced Documents

- `POIS-OPERATOR-UX.md` — stakeholder capture/selection section.
- `POIS-DATA-MODEL.md` — stakeholder model and the one-selected partial unique index (POIS-006D).

---

# Acceptance Criteria

- [ ] The stakeholder section on the workbench shows role suggestions per the initiative
      category of the opportunity.
- [ ] Exactly one stakeholder can be selected at a time (existing partial unique index holds;
      not re-implemented here).
- [ ] A stakeholder with no evidence and no operator confirmation cannot be selected — enforced
      at the action layer.
- [ ] A stakeholder marked do-not-contact cannot be selected.
- [ ] Manual test: an operator can add a stakeholder in under 2 minutes.

---

# Validation

```
npm test -- stakeholder
```

Manual: open the workbench, add a new stakeholder using a suggested role, select them, and time
the flow end to end.

---

# Rollback

Hide the stakeholder section from the workbench; leave `stakeholder-suggest.ts` untouched.

---

# Expected Diff Size

Medium.

---

# Estimated Time

90 minutes.

---

# Next Story

`POIS-202A-access-score-wired-into-index.md`
