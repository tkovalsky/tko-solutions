## Story Metadata

Milestone:
M0

Parent Task:
POIS-006

Story:
POIS-006D

Depends On:
POIS-006C

Blocks:
POIS-007A

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

**Business objective:** Add the raw-SQL constraints Prisma's schema DSL cannot express —
partial unique indexes and CHECK constraints — that enforce invariants the application code
depends on (one open next action per opportunity, exactly-one-parent on facts/evidence/gaps).

**User story:** As Codex, I need the two partial unique indexes, the three-parent CHECK on
`OiOpportunityFact`, the `OiEvidence`/`OiResearchGap` CHECKs, the value-band CHECK, and the old
`OiPursuit` unique index dropped — all as raw SQL in the same migration.

**Commercial outcome:** None directly — this is what makes the earlier schema stories'
invariants actually enforced by the database rather than by convention (Rule 10).

---

# Scope

**Included**, append to the same migration file, per `POIS-DATA-MODEL.md` §5 and §9:
- The two partial unique indexes named in §5 (including "exactly one open `OiNextAction` per
  opportunity" and "exactly one selected `OiStakeholder` per opportunity").
- The widened three-parent CHECK on `OiOpportunityFact` (exactly one of
  opportunityId/initiativeId/personId is non-null).
- CHECKs on `OiEvidence`/`OiResearchGap` (exactly one of opportunityId/initiativeId is
  non-null).
- The value-band CHECK from §9.
- `DROP INDEX IF EXISTS "OiPursuit_personId_mode_key";`

**Verify the full migration file contains no `ALTER TABLE ... RENAME`** — if it does, the
`@@map("OiOpportunityScore")` from `POIS-004E` is missing or wrong, and that story must be
reopened rather than patched here.

**Excluded:** No further schema-shape changes — this story is raw SQL only, appended to an
already-generated migration.

---

# Files Expected

- `prisma/migrations/2026xxxx_add_pois_core/migration.sql` (same file, appended — this is the
  final story to touch this file)

---

# Dependencies

`POIS-006C-backfill-opportunity-source.md`

---

# Referenced Documents

- `POIS-DATA-MODEL.md` §5 (index list) and §9 (CHECK constraints and value-band rule).

---

# Acceptance Criteria

- [ ] Both partial unique indexes exist and are enforced (a test insert violating either
      fails).
- [ ] The three-parent CHECK on `OiOpportunityFact` rejects a row with zero or two+ parents set.
- [ ] The `OiEvidence`/`OiResearchGap` CHECKs behave the same way.
- [ ] The value-band CHECK is present.
- [ ] `OiPursuit_personId_mode_key` no longer exists.
- [ ] `grep` the full migration file for `RENAME` — zero matches.
- [ ] `npm test` passes; existing row counts for `OiOpportunity`, `OiPursuit`, `OiSource`,
      `OiPerson`, `OiOrganization` are unchanged from before POIS-006A.
- [ ] `/tif/opportunities` and `/tif/opportunities/sources` still work (manual check).

---

# Validation

```
npm run tif:migrate:status
npm test
grep -n "RENAME" prisma/migrations/2026xxxx_add_pois_core/migration.sql
```

---

# Rollback

`DROP TABLE` on all new tables added across POIS-004A–E, `DROP COLUMN` on all new columns
added across POIS-005A–D. No pre-existing data was modified except the `type` backfill
(POIS-006B), reversible by dropping that column.

---

# Expected Diff Size

Small (raw SQL additions to an existing file).

---

# Estimated Time

75–90 minutes (constraint-violation testing takes real time).

---

# Next Story

`POIS-007A-port-stakeholder-access-score.md`
