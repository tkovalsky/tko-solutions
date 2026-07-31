## Story Metadata

Milestone:
M0

Parent Task:
POIS-006

Story:
POIS-006C

Depends On:
POIS-006B

Blocks:
POIS-006D

Estimated PR Size:
Small

Expected Review Time:
5-10 minutes

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

**Business objective:** Populate the new `OiOpportunitySource` join table from existing
`OiSource` rows so no historical source-to-opportunity link is lost when `OiSource` becomes
many-to-many capable.

**User story:** As Codex, I need every existing `OiSource.opportunityId` link preserved as an
`OiOpportunitySource` row.

**Commercial outcome:** None directly — data-migration step, but losing this data would break
traceability for every opportunity captured before this migration.

---

# Scope

**Included**, append to the same migration file:

```sql
INSERT INTO "OiOpportunitySource" ("opportunityId","sourceId","isPrimary","createdAt")
SELECT "opportunityId","id",TRUE,"createdAt" FROM "OiSource"
WHERE "opportunityId" IS NOT NULL ON CONFLICT DO NOTHING;
```

**Excluded:** No changes to `OiSource` rows themselves. No index or CHECK-constraint SQL
(that's `POIS-006D`).

---

# Files Expected

- `prisma/migrations/2026xxxx_add_pois_core/migration.sql` (same file, appended)

---

# Dependencies

`POIS-006B-backfill-opportunity-type.md`

---

# Referenced Documents

- `POIS-CODEX-TASKS.md` POIS-006 step 3 only.

---

# Acceptance Criteria

- [ ] `OiOpportunitySource` row count equals the prior count of `OiSource` rows where
      `opportunityId IS NOT NULL`.
- [ ] Every backfilled row has `isPrimary = TRUE`.
- [ ] Re-running the insert (idempotency check) creates no duplicate rows
      (`ON CONFLICT DO NOTHING` holds).

---

# Validation

Manual: compare `SELECT COUNT(*) FROM "OiOpportunitySource"` against the pre-migration
`SELECT COUNT(*) FROM "OiSource" WHERE "opportunityId" IS NOT NULL`.

---

# Rollback

`DELETE FROM "OiOpportunitySource"` — no source data was modified, only a new join table was
populated.

---

# Expected Diff Size

Small.

---

# Estimated Time

30 minutes.

---

# Next Story

`POIS-006D-add-indexes-and-checks.md`
