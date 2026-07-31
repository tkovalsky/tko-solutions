## Story Metadata

Milestone:
M0

Parent Task:
POIS-009

Story:
POIS-009C

Depends On:
POIS-006D

Blocks:
POIS-101A

Estimated PR Size:
Small

Expected Review Time:
5-10 minutes

Risk:
Medium

Breaking Change:
No

Migration:
Yes

Feature Flag:
No

---

# Story

**Business objective:** Get the seven scope-specific playbooks into the database so
Milestone 2's playbook display has real checklists instead of an empty table.

**User story:** As Codex, I need `seed-playbooks.mjs` to upsert 7 playbooks, one per
`OiPlaybookScope`, idempotently.

**Commercial outcome:** Direct — these are the research checklists and follow-up cadences Todd
will actually use starting Milestone 2.

---

# Scope

**Included:** `seed-playbooks.mjs`, upsert by `slug`, idempotent, 7 playbooks, exactly one per
value of `OiPlaybookScope`.

> **Codex writes the script with placeholder checklist content. Todd supplies the real content**
> **from `CURRENT_REALITY.md`. Flag as blocked-on-Todd if not populated by day 11.**

**Excluded:** No offer or proof-item seeding (POIS-009A, POIS-009B — independent of this
story). No playbook *execution* logic — this story only seeds data; `deriveNextAction()` is
never modified by playbooks (D-023), now or later.

---

# Files Expected

- `scripts/oi/seed-playbooks.mjs`
- `package.json` (extend `"oi:seed"` to run this script too)

---

# Dependencies

`POIS-006D-add-indexes-and-checks.md`

---

# Referenced Documents

- `POIS-DATA-MODEL.md` §9 (`OiPlaybook`, `OiPlaybookScope`) only.

---

# Acceptance Criteria

- [ ] Running the script twice results in exactly 7 playbooks (idempotency).
- [ ] Every value of `OiPlaybookScope` has exactly one playbook.
- [ ] `npm run oi:seed` (the combined script from POIS-009A/B/C) runs all three seeds cleanly
      twice.

---

# Validation

```
npm run oi:seed
npm run oi:seed
```

---

# Rollback

`DELETE FROM "OiPlaybook"` by slug.

---

# Expected Diff Size

Small.

---

# Estimated Time

45–60 minutes.

---

# Next Story

`POIS-101A-oi-shell-and-nav.md` — first story of Milestone 1 (Daily Driver).
