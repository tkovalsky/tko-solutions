## Story Metadata

Milestone:
M2

Parent Task:
POIS-201

Story:
POIS-201A

Depends On:
POIS-112

Blocks:
POIS-201B

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

**Business objective:** Give the workbench a deterministic source of role suggestions so that
stakeholder capture (POIS-201B) never presents an operator with a blank "who do I add" decision.

**User story:** As Codex, I need a role-suggestion function that maps every one of the 13
initiative categories to the roles most likely to matter, so the stakeholder form built in the
next story can prompt with sensible defaults instead of a free-text field.

**Commercial outcome:** None directly visible — this is the logic checkpoint of a two-part
vertical slice (POIS-201). The user-facing capability (adding a stakeholder) ships in POIS-201B.
This story's Definition of Done is narrower: its own tests pass, but it makes no user-visible
claim yet.

---

# Scope

**Included:**
- `intelligence/stakeholder-suggest.ts` implementing a role map covering all 13 initiative
  categories defined in the data model.
- Special-case handling: an FTE opportunity type additionally suggests `hiring_manager`.
- Unit tests only — no wiring into any action, form, or UI.

**Excluded:**
- No stakeholder section, form, or workbench UI (POIS-201B).
- No `addStakeholder`, `updateStakeholder`, `selectStakeholder`, or `markDoNotContact` actions
  (POIS-201B).
- No changes to the one-selected-invariant partial unique index — it already exists from
  POIS-006D and must not be re-added or modified here.
- No database migration of any kind.

---

# Files Expected

- `intelligence/stakeholder-suggest.ts`
- Corresponding unit test file for `stakeholder-suggest.ts`

---

# Dependencies

`POIS-112` (last story of Milestone 1)

---

# Referenced Documents

- `POIS-DATA-MODEL.md` — initiative category enum (13 categories) and any existing role
  vocabulary section referenced by stakeholder roles.

---

# Acceptance Criteria

- [ ] `stakeholder-suggest.ts` exports a function that, given any of the 13 initiative
      categories, returns at least 2 suggested roles.
- [ ] When the opportunity type is FTE, the suggestion list includes `hiring_manager`.
- [ ] No UI, action, or migration files are touched in this diff.
- [ ] All new unit tests pass.

---

# Validation

```
npm test -- stakeholder-suggest
```

---

# Rollback

Delete `intelligence/stakeholder-suggest.ts` and its test file.

---

# Expected Diff Size

Small.

---

# Estimated Time

45 minutes.

---

# Next Story

`POIS-201B-stakeholder-section-and-actions.md`
