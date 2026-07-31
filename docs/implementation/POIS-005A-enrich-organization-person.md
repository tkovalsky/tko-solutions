## Story Metadata

Milestone:
M0

Parent Task:
POIS-005

Story:
POIS-005A

Depends On:
POIS-004F

Blocks:
POIS-005B

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

**Business objective:** Add the account- and person-level fields the intake and stakeholder
stories need — domain matching, account watching, do-not-contact — without touching any
higher-risk model.

**User story:** As Codex, I need `OiOrganization` and `OiPerson` enriched so account
identification and DNC filtering work in later stories.

**Commercial outcome:** None directly — lowest-risk of the four POIS-005 sub-stories, purely
additive columns.

---

# Scope

**Included, per `POIS-DATA-MODEL.md` §3:**
- `OiOrganization`: `domain`, `sizeBand`, `tier`, `isWatched`, `aliases`, `headquarters` +
  indexes.
- `OiPerson`: `linkedinUrl`, `lastVerifiedAt`, `doNotContact` + index.

**Excluded:** No changes to `OiSource`, `OiOpportunity`, `OiOpportunityFact`, `OiEvidence`,
`OiResearchGap`, `OiOffer`, or `OiPursuit` — those are separate stories. No migration yet.

---

# Files Expected

- `prisma/schema.prisma`

---

# Dependencies

`POIS-004F-validate-generate-schema.md`

---

# Referenced Documents

- `POIS-DATA-MODEL.md` §3 (only the `OiOrganization` and `OiPerson` subsections).

---

# Acceptance Criteria

- [ ] `npx prisma validate` succeeds.
- [ ] All six `OiOrganization` fields and all three `OiPerson` fields exist with the specified
      indexes.
- [ ] No other model in the diff.

---

# Validation

```
npx prisma validate
```

---

# Rollback

Revert the field additions on both models.

---

# Expected Diff Size

Small.

---

# Estimated Time

45 minutes.

---

# Next Story

`POIS-005B-extend-opportunity-model-status.md`
