## Story Metadata

Milestone:
M0

Parent Task:
POIS-004

Story:
POIS-004C

Depends On:
POIS-004B

Blocks:
POIS-004D

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

**Business objective:** Add the models that represent who Todd is trying to reach and what he
does next — the backbone of the daily-driver workflow in Milestone 1.

**User story:** As Codex, I need `OiStakeholder`, `OiContactPoint`, `OiNextAction`, and
`OiActivity` in the schema so the stakeholder and next-action stories in Milestone 1 have
somewhere to write.

**Commercial outcome:** None directly — schema-only.

---

# Scope

**Included:** Add to `prisma/schema.prisma`:
- `OiStakeholder`
- `OiContactPoint`
- `OiNextAction`
- `OiActivity`

Per `POIS-DATA-MODEL.md` §4. Include the partial unique index concept for "exactly one open
`OiNextAction` per opportunity" as a model-level note — the actual raw-SQL index is added in
`POIS-006D-add-indexes-and-checks.md`; do not attempt to express it in the Prisma schema DSL
if Prisma cannot express a partial unique index natively.

**Excluded:** No changes to `OiOpportunity` or `OiPerson`. No migration yet.

---

# Files Expected

- `prisma/schema.prisma`

---

# Dependencies

`POIS-004B-add-intake-evidence-models.md`

---

# Referenced Documents

- `POIS-DATA-MODEL.md` §4 (only the four models named above) and §5 (index list, for context on
  what `POIS-006D` will need — read only to confirm field names match, not to implement the
  index here).

---

# Acceptance Criteria

- [ ] `npx prisma validate` succeeds.
- [ ] All four models exist with the fields and relations specified in §4.
- [ ] No existing model was modified.

---

# Validation

```
npx prisma validate
```

---

# Rollback

Revert the four model additions.

---

# Expected Diff Size

Medium.

---

# Estimated Time

60 minutes.

---

# Next Story

`POIS-004D-add-role-outcome-offer-models.md`
