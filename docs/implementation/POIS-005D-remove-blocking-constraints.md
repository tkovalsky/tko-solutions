## Story Metadata

Milestone:
M0

Parent Task:
POIS-005

Story:
POIS-005D

Depends On:
POIS-005C

Blocks:
POIS-006A

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

**Business objective:** Remove the three schema constraints that currently block the target
architecture (C1, C2, C3), and enrich the offer model so the offer library (Milestone 2) has
somewhere to store recommendation data. Isolated as its own story so its rollback — a pure
constraint removal — stays a clean, single-purpose revert.

**User story:** As Codex, I need the last blocking constraints gone and `OiOffer` enriched
before the migration can be generated.

**Commercial outcome:** None directly — schema-only, but this is the story that actually
removes the constraints the whole M0 milestone exists to clear.

---

# Scope

**Included, per `POIS-DATA-MODEL.md` §3, §9.9, and the constraint list (C1–C4):**
- `OiOffer`: add the six enrichment columns from §9.9 (ideal buyer, problem solved,
  deliverables, typical objections, price band, and the sixth field §9.9 specifies).
- `OiPursuit`: add `opportunityId?`; **delete the `@@unique([personId, mode])` line** (C1, C3).
- `OiSource`: `opportunityId` → **optional**; add new relations; `retrievedAt` index (C2).

C4 (`OiOpportunityStatus` extension) was already completed in `POIS-005B` — do not repeat it
here.

**Excluded:** Do not drop the `OiPursuit` table itself (D-018 — it stays until after
2026-10-01). Do not write the `DROP INDEX` SQL for the old unique constraint — that is raw SQL
in `POIS-006D`; this story only removes the line from the Prisma schema.

---

# Files Expected

- `prisma/schema.prisma`

---

# Dependencies

`POIS-005C-relax-fact-evidence-gap-constraints.md`

---

# Referenced Documents

- `POIS-DATA-MODEL.md` §3 (`OiSource`, `OiPursuit`) and §9.9 (`OiOffer` enrichment).

---

# Acceptance Criteria

- [ ] `npx prisma validate` succeeds.
- [ ] `OiOffer` has all six §9.9 enrichment columns.
- [ ] `OiPursuit.opportunityId?` exists; `@@unique([personId, mode])` is gone from the schema
      file.
- [ ] `OiSource.opportunityId` is optional; `retrievedAt` index exists.
- [ ] `OiPursuit` model itself still exists (not dropped).

---

# Validation

```
npx prisma validate
grep -n "personId, mode" prisma/schema.prisma
```
(second command should return nothing)

---

# Rollback

Revert `OiOffer`, `OiPursuit`, and `OiSource` field changes; restore the unique constraint
line.

---

# Expected Diff Size

Small.

---

# Estimated Time

60 minutes.

---

# Next Story

`POIS-006A-generate-migration-fix-enum-values.md`
