## Story Metadata

Milestone:
M0

Parent Task:
POIS-006

Story:
POIS-006B

Depends On:
POIS-006A

Blocks:
POIS-006C

Estimated PR Size:
Small

Expected Review Time:
5-10 minutes

Risk:
High

Breaking Change:
Yes

Migration:
Yes

Feature Flag:
No

---

# Story

**Business objective:** Make `OiOpportunity.type` NOT NULL without breaking existing rows —
the three-step nullable → backfill → NOT NULL pattern required whenever a required column is
added to a table that already has data.

**User story:** As Codex, I need every existing `OiOpportunity` row to have a `type` before the
column becomes required.

**Commercial outcome:** None directly — data-integrity step.

---

# Scope

**Included**, append to the same migration file from POIS-006A:

```sql
ALTER TABLE "OiOpportunity" ADD COLUMN "type" "OiOpportunityType";
UPDATE "OiOpportunity" SET "type" = 'consulting' WHERE "type" IS NULL;
ALTER TABLE "OiOpportunity" ALTER COLUMN "type" SET NOT NULL;
```

(Skip the `ADD COLUMN` step if POIS-006A's generated migration already added it as nullable —
verify before adding a duplicate column statement.)

**Excluded:** No other column changes. No `OiOpportunitySource` backfill (that's
`POIS-006C`). No index or CHECK-constraint SQL (that's `POIS-006D`).

---

# Files Expected

- `prisma/migrations/2026xxxx_add_pois_core/migration.sql` (same file, appended)

---

# Dependencies

`POIS-006A-generate-migration-fix-enum-values.md`

---

# Referenced Documents

- `POIS-CODEX-TASKS.md` POIS-006 step 2 only.

---

# Acceptance Criteria

- [ ] `npm run tif:migrate:status` reports applied.
- [ ] Every existing `OiOpportunity` row has `type = 'consulting'`.
- [ ] The column is NOT NULL.
- [ ] Row count of `OiOpportunity` unchanged from before this story.

---

# Validation

```
npm run tif:migrate:status
```
Manual: query `SELECT COUNT(*) FROM "OiOpportunity" WHERE "type" IS NULL` — expect 0.

---

# Rollback

Drop the `type` column. No other existing data was modified.

---

# Expected Diff Size

Small.

---

# Estimated Time

30–45 minutes.

---

# Next Story

`POIS-006C-backfill-opportunity-source.md`
