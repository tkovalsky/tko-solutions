## Story Metadata

Milestone:
M0

Parent Task:
POIS-009

Story:
POIS-009A

Depends On:
POIS-006D

Blocks:
POIS-009B

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

**Business objective:** Get the seven consulting/FTE offers into the database so the offer
library (Milestone 2) and the daily-driver scoring (Milestone 1) have real data to reference
instead of an empty table.

**User story:** As Codex, I need `seed-offers.mjs` to upsert 7 offers with the §9.9 enrichment
fields, idempotently.

**Commercial outcome:** Direct — this is the offer data Todd will actually recommend to
prospects starting Milestone 2.

---

# Scope

**Included:** `seed-offers.mjs`, upsert by `slug`, idempotent. 7 offers with the §9.9
enrichment fields (ideal buyer, problem solved, deliverables, typical objections, price band,
and the sixth §9.9 field). Add `"oi:seed"` to `package.json` if it doesn't already exist as a
combined script (this story creates the script entry; POIS-009B/C add their own seed calls to
it).

> **Codex writes the script with placeholder tag values. Todd supplies the real content from**
> **`docs/CASE_STUDY_LIBRARY.md`, `docs/HEALTHCARE_FRAMEWORK_LIBRARY.md`, and**
> **`CURRENT_REALITY.md`. Flag as blocked-on-Todd if not populated by day 11.**

**Excluded:** No proof-item or playbook seeding — those are POIS-009B and POIS-009C. Do not
block this story on Todd's real content; ship with placeholders and flag it.

---

# Files Expected

- `scripts/oi/seed-offers.mjs`
- `package.json` (add or extend `"oi:seed"`)

---

# Dependencies

`POIS-006D-add-indexes-and-checks.md`

---

# Referenced Documents

- `POIS-DATA-MODEL.md` §9.9 (`OiOffer` enrichment fields) only.

---

# Acceptance Criteria

- [ ] Running the script twice results in exactly 7 offers (idempotency via upsert-by-slug).
- [ ] Every offer has all six §9.9 fields populated (placeholder or real).
- [ ] Flagged in the report if Todd's real content isn't supplied yet.

---

# Validation

```
npm run oi:seed
npm run oi:seed
```

---

# Rollback

`DELETE FROM "OiOffer"` by slug.

---

# Expected Diff Size

Small.

---

# Estimated Time

45–60 minutes.

---

# Next Story

`POIS-009B-seed-proof-items.md`
