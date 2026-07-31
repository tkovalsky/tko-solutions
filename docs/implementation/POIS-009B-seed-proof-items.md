## Story Metadata

Milestone:
M0

Parent Task:
POIS-009

Story:
POIS-009B

Depends On:
POIS-006D

Blocks:
POIS-009C

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

**Business objective:** Get real proof items (case studies, credentials) into the database so
proof matching (POIS-209) has something to match against instead of an empty table.

**User story:** As Codex, I need `seed-proof.mjs` to upsert at least 10 `OiProofItem` rows,
idempotently.

**Commercial outcome:** Direct — this is the proof data that gets cited in real drafts starting
Milestone 3.

---

# Scope

**Included:** `seed-proof.mjs`, upsert by `slug`, idempotent, ≥10 `OiProofItem` rows.

> **Codex writes the script with placeholder tag values. Todd supplies the real content from**
> **`docs/CASE_STUDY_LIBRARY.md`. Flag as blocked-on-Todd if not populated by day 11.**

**Excluded:** No offer or playbook seeding (POIS-009A, POIS-009C). This story does not depend
on those two — all three seed scripts are independent of each other.

---

# Files Expected

- `scripts/oi/seed-proof.mjs`
- `package.json` (extend `"oi:seed"` to run this script too)

---

# Dependencies

`POIS-006D-add-indexes-and-checks.md`

---

# Referenced Documents

- `POIS-DATA-MODEL.md` §4 (`OiProofItem` fields) only.

---

# Acceptance Criteria

- [ ] Running the script twice results in identical row count, ≥10 (idempotency).
- [ ] `isApprovedForOutreach` is set explicitly per row (Q3 in `POIS-DECISIONS.md` — Todd flags
      this at seed time; do not default it to `true`).
- [ ] Flagged in the report if Todd's real content isn't supplied yet.

---

# Validation

```
npm run oi:seed
npm run oi:seed
```

---

# Rollback

`DELETE FROM "OiProofItem"` by slug.

---

# Expected Diff Size

Small.

---

# Estimated Time

45–60 minutes.

---

# Next Story

`POIS-009C-seed-playbooks.md`
