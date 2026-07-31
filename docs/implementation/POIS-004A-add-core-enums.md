## Story Metadata

Milestone:
M0

Parent Task:
POIS-004

Story:
POIS-004A

Depends On:
POIS-003

Blocks:
POIS-004B

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

**Business objective:** Establish the vocabulary the rest of the schema depends on before any
model is added — enums must exist before the models that reference them.

**User story:** As Codex, I need every new enum in place so the model stories that follow can
reference them without editing this file again.

**Commercial outcome:** None directly — this is 1 of 6 schema sub-stories (§ POIS-004) that
collectively unblock the whole M0 migration.

---

# Scope

**Included:** Add to `prisma/schema.prisma`, **enums only, no models**:
- Every enum from `POIS-DATA-MODEL.md` §2 (signal tiers, signal types, initiative categories,
  opportunity types, etc. — whatever §2 defines).
- The §9 enums: `OiDecisionType`, `OiDecisionConfidence`, `OiPlaybookScope`, `OiArtifactKind`,
  `OiArtifactStatus`.

**Excluded:** No model definitions. No changes to any existing enum (that is
`POIS-005B-extend-opportunity-model-status.md`, which extends `OiOpportunityStatus`
specifically). Do not touch `OiOpportunityStatus` in this story even though it is an existing
enum — it is out of scope here and handled later with its own migration concerns.

---

# Files Expected

- `prisma/schema.prisma`

---

# Dependencies

`POIS-003-add-todd-v2-capability-profile.md`

---

# Referenced Documents

- `POIS-DATA-MODEL.md` §2 and §9 (enum definitions only — do not read the model sections yet).

---

# Acceptance Criteria

- [ ] `npx prisma validate` succeeds.
- [ ] Every enum named in §2 and the five §9 enums exist in the schema.
- [ ] No model was added or modified in this diff — enums only.

---

# Validation

```
npx prisma validate
```

---

# Rollback

Revert the enum additions in `prisma/schema.prisma`.

---

# Expected Diff Size

Small.

---

# Estimated Time

30 minutes.

---

# Next Story

`POIS-004B-add-intake-evidence-models.md`
