## Story Metadata

Milestone:
M0

Parent Task:
POIS-008

Story:
POIS-008

Depends On:
POIS-006D

Blocks:
POIS-009A

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

**Business objective:** Migrate every existing `OiPursuit` row into the new
opportunity/stakeholder/next-action shape without losing or duplicating data, and without
touching `OiPursuit` itself.

**User story:** As Todd, I need my existing pipeline to appear in the new model shape so I
don't start Milestone 1 with an empty pipeline.

**Commercial outcome:** Direct — this is what makes Todd's real, already-in-progress pipeline
visible in the new system from day one of Milestone 1.

---

# Scope

**Included:** `scripts/oi/backfill-pursuits.mjs` per `POIS-TARGET-ARCHITECTURE.md` §12 Step 2.
Idempotent via `WHERE "opportunityId" IS NULL`. Follows the `scripts/tif/*.mjs` adapter
pattern. Add `"oi:backfill"` to `package.json`.

**Excluded:** `OiPursuit` rows are never modified — only read. No UI. No changes to the
pursuit-status → opportunity-status mapping beyond what §12 Step 2 specifies.

---

# Files Expected

- `scripts/oi/backfill-pursuits.mjs`
- `scripts/oi/backfill-pursuits.test.ts` (or equivalent per repo test convention)
- `package.json` (add `"oi:backfill"` script)

---

# Dependencies

`POIS-006D-add-indexes-and-checks.md`

---

# Referenced Documents

- `POIS-TARGET-ARCHITECTURE.md` §12 Step 2 only.

---

# Acceptance Criteria

- [ ] Running the script twice produces identical row counts after the second run
      (idempotency).
- [ ] Every `OiPursuit` row has an `opportunityId` after running.
- [ ] Each migrated pursuit has exactly one `OiStakeholder` and one open `OiNextAction`.
- [ ] Pursuit-status → opportunity-status mapping matches §12 Step 2.
- [ ] `OiPursuit` row data is unchanged (only `opportunityId` is set where previously null —
      confirm no other pursuit column was written).

---

# Validation

```
npm run oi:backfill
npm run oi:backfill
npm test
```

---

# Rollback

Delete created `OiOpportunity` rows where `title LIKE '%(migrated)'` and null the
`OiPursuit.opportunityId` values. `OiPursuit` data itself is never modified beyond that column.

---

# Expected Diff Size

Medium.

---

# Estimated Time

75–90 minutes.

---

# Next Story

`POIS-009A-seed-offers.md`
