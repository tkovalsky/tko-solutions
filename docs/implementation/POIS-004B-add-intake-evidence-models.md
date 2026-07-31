## Story Metadata

Milestone:
M0

Parent Task:
POIS-004

Story:
POIS-004B

Depends On:
POIS-004A

Blocks:
POIS-004C

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

**Business objective:** Add the models that capture inbound signal and cluster it into
initiatives — the first stage of the Evidence → Opportunity pipeline.

**User story:** As Codex, I need `OiSignal`, `OiInitiative`, `OiInitiativeSignal`, and
`OiOpportunitySource` in the schema so intake and clustering stories (Milestone 1) have
somewhere to write.

**Commercial outcome:** None directly — schema-only.

---

# Scope

**Included:** Add to `prisma/schema.prisma`:
- `OiSignal`
- `OiInitiative`
- `OiInitiativeSignal`
- `OiOpportunitySource`

Per `POIS-DATA-MODEL.md` §4.

**Excluded:** No changes to `OiOpportunity`, `OiSource`, or any existing model — those relation
fields are added in `POIS-005` stories, not here. No migration yet.

---

# Files Expected

- `prisma/schema.prisma`

---

# Dependencies

`POIS-004A-add-core-enums.md`

---

# Referenced Documents

- `POIS-DATA-MODEL.md` §4 (only the four models named above).

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

`POIS-004C-add-stakeholder-action-models.md`
