## Story Metadata

Milestone:
M0

Parent Task:
POIS-005

Story:
POIS-005B

Depends On:
POIS-005A

Blocks:
POIS-005C

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

**Business objective:** Give `OiOpportunity` the fields the entire commercial-scoring and
lifecycle system depends on. This is the highest-surface-area schema change in Milestone 0 —
isolated in its own story on purpose so it can be reviewed and rolled back independently of
everything else in POIS-005.

**User story:** As Codex, I need `OiOpportunity` to carry type, value/probability/hours,
lifecycle bookkeeping, and every new relation Milestone 1–3 stories will need.

**Commercial outcome:** None directly — schema-only, but this is the constraint most directly
blocking the daily-driver milestone (C4).

---

# Scope

**Included, per `POIS-DATA-MODEL.md` §3 and §9.2:**
- `OiOpportunity`: `type` (required — nullable in the Prisma schema for now; NOT NULL is
  enforced by the migration in `POIS-006B`, not here), `initiativeId?`, `offerId?`,
  `playbookId?`, value/probability/hours fields, lifecycle bookkeeping fields, all new
  relations (to `OiInitiative`, `OiOffer`, `OiPlaybook`, `OiNextAction`,
  `OiOpportunitySource`, etc.), and the 3 new indexes named in §3.
- Extend `OiOpportunityStatus` with every value listed in §2 (C4).

**Excluded:** Do not mark `type` `NOT NULL` in the Prisma schema in this story — the column
must exist as nullable until `POIS-006B` backfills existing rows, or `prisma migrate` will
attempt to add a NOT NULL column with no default against existing data. No changes to
`OiOpportunityFact`, `OiEvidence`, `OiResearchGap`, `OiOffer`, or `OiPursuit` — those are
`POIS-005C`/`POIS-005D`.

---

# Files Expected

- `prisma/schema.prisma`

---

# Dependencies

`POIS-005A-enrich-organization-person.md`

---

# Referenced Documents

- `POIS-DATA-MODEL.md` §2 (`OiOpportunityStatus` full value list), §3 (`OiOpportunity` fields,
  relations, indexes), §9.2.

---

# Acceptance Criteria

- [ ] `npx prisma validate` succeeds.
- [ ] `OiOpportunity` has `type` (nullable), `initiativeId?`, `offerId?`, `playbookId?`, and
      every value/probability/hours/lifecycle field from §3.
- [ ] All 3 new indexes exist.
- [ ] `OiOpportunityStatus` contains every value in §2.

---

# Validation

```
npx prisma validate
```

---

# Rollback

Revert `OiOpportunity` field/relation additions and the `OiOpportunityStatus` extension.

---

# Expected Diff Size

Medium.

---

# Estimated Time

75 minutes.

---

# Next Story

`POIS-005C-relax-fact-evidence-gap-constraints.md`
