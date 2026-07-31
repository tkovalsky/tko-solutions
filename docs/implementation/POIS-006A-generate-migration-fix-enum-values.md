## Story Metadata

Milestone:
M0

Parent Task:
POIS-006

Story:
POIS-006A

Depends On:
POIS-005D

Blocks:
POIS-006B

Estimated PR Size:
Medium

Expected Review Time:
10-15 minutes

Risk:
High

Breaking Change:
No

Migration:
Yes

Feature Flag:
No

---

# Story

**Business objective:** Generate the migration and get the one Postgres trap that breaks most
enum-extension migrations — `ALTER TYPE ... ADD VALUE` inside a transaction — out of the way
first, before any data-dependent SQL is layered on top.

**User story:** As Codex, I need the base migration generated and its enum statements fixed so
every later 006 sub-story has a working migration file to add to.

**Commercial outcome:** None directly — this is the riskiest single step in Milestone 0,
isolated so a failure here doesn't also implicate the backfill or index SQL.

---

# Scope

**Included:**
1. Run `npm run tif:migrate -- --name add_pois_core`.
2. Hand-edit the generated SQL: every `ALTER TYPE "OiOpportunityStatus" ADD VALUE '…'` becomes
   its own statement, **outside any transaction block** (Postgres requires this — a single
   `BEGIN...COMMIT` wrapping multiple `ADD VALUE` statements fails).
3. Apply the migration.
4. Verify with `npm run tif:migrate:status`.

**Excluded:** No data backfill in this story (that's `POIS-006B` and `POIS-006C`). No raw SQL
for indexes or CHECK constraints (that's `POIS-006D`). Do not touch the `type` column beyond
what Prisma generates automatically from the POIS-005B schema change.

---

# Files Expected

- `prisma/migrations/2026xxxx_add_pois_core/migration.sql`

---

# Dependencies

`POIS-005D-remove-blocking-constraints.md`

---

# Referenced Documents

- `POIS-CODEX-TASKS.md` POIS-006 step 1 only (for the exact Postgres trap description). No
  architecture or data-model reading required — this is a mechanical SQL-generation step.

---

# Acceptance Criteria

- [ ] Migration generated and applied.
- [ ] Every `ALTER TYPE ... ADD VALUE` statement is its own statement, not batched inside a
      transaction block.
- [ ] `npm run tif:migrate:status` reports the migration as applied.
- [ ] `npm test` still passes (no data-dependent SQL has run yet, so this should be a no-op
      check).

---

# Validation

```
npm run tif:migrate -- --name add_pois_core
npm run tif:migrate:status
npm test
```

---

# Rollback

Mark the migration as rolled back and drop any new tables/columns it created. No existing data
was modified in this story.

---

# Expected Diff Size

Medium (generated SQL is verbose; hand-edit is small).

---

# Estimated Time

60–90 minutes (the hand-edit requires care).

---

# Next Story

`POIS-006B-backfill-opportunity-type.md`
