## Story Metadata

Milestone:
M0

Parent Task:
POIS-005

Story:
POIS-005C

Depends On:
POIS-005B

Blocks:
POIS-005D

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

**Business objective:** Let facts, evidence, and research gaps attach to an initiative or a
person, not only an opportunity — the polymorphism the executive brief and person-facts
features depend on later.

**User story:** As Codex, I need `OiOpportunityFact`, `OiEvidence`, and `OiResearchGap` to
support three optional parents instead of one required parent.

**Commercial outcome:** None directly — schema-only, but this unblocks person facts
(POIS-204) and the executive brief (POIS-205) two milestones from now.

---

# Scope

**Included, per `POIS-DATA-MODEL.md` §3 and §9.9:**
- `OiOpportunityFact`: `opportunityId` → optional; add `initiativeId?`, `personId?`,
  `aiGenerated`, `aiModel`, `promptVersion` + indexes.
- `OiEvidence`: `opportunityId` → optional; add `initiativeId?`.
- `OiResearchGap`: `opportunityId` → optional; add `initiativeId?`, `priority`,
  `blocksOutreach`, `suggestedSources`.

The three-parent CHECK constraint (exactly one of opportunity/initiative/person set) is raw
SQL added in `POIS-006D-add-indexes-and-checks.md` — do not attempt to express it in the
Prisma schema DSL here.

**Excluded:** No changes to `OiOpportunity`, `OiOffer`, or `OiPursuit`. No CHECK constraints in
this story — schema shape only.

---

# Files Expected

- `prisma/schema.prisma`

---

# Dependencies

`POIS-005B-extend-opportunity-model-status.md`

---

# Referenced Documents

- `POIS-DATA-MODEL.md` §3 (fact/evidence/gap subsections) and §9.9.

---

# Acceptance Criteria

- [ ] `npx prisma validate` succeeds.
- [ ] `OiOpportunityFact.opportunityId` is optional; `initiativeId?` and `personId?` exist.
- [ ] `OiOpportunityFact` has `aiGenerated`, `aiModel`, `promptVersion`.
- [ ] `OiEvidence.opportunityId` is optional; `initiativeId?` exists.
- [ ] `OiResearchGap.opportunityId` is optional; `initiativeId?`, `priority`,
      `blocksOutreach`, `suggestedSources` exist.

---

# Validation

```
npx prisma validate
```

---

# Rollback

Revert the three models' field changes.

---

# Expected Diff Size

Small.

---

# Estimated Time

60 minutes.

---

# Next Story

`POIS-005D-remove-blocking-constraints.md`
