## Story Metadata

Milestone:
M0

Parent Task:
POIS-004

Story:
POIS-004E

Depends On:
POIS-004D

Blocks:
POIS-004F

Estimated PR Size:
Small

Expected Review Time:
5-10 minutes

Risk:
Medium

Breaking Change:
Yes

Migration:
No

Feature Flag:
No

---

# Story

**Business objective:** Add the Milestone 2–4 models now — while the schema is already open —
so `OiDecision` exists before any Milestone 1 UI work needs it (D-030), and rename the score
table without a table rewrite.

**User story:** As Codex, I need `OiDecision`, `OiCampaign`, `OiCampaignOpportunity`,
`OiPlaybook`, `OiArtifact`, and `OiWeeklyReview` in the schema, and `OiOpportunityScore`
renamed to `OiScore`, so later milestones never need a second migration for these tables.

**Commercial outcome:** None directly — schema-only. This is what makes decision capture
available from Todd's very first day using the system (D-019).

---

# Scope

**Included:** Add to `prisma/schema.prisma`:
- `OiDecision`
- `OiCampaign`
- `OiCampaignOpportunity`
- `OiPlaybook`
- `OiArtifact`
- `OiWeeklyReview`

Rename `OiOpportunityScore` → `OiScore` **with `@@map("OiOpportunityScore")`** so the
underlying table is not renamed (renaming without `@@map` produces a table rewrite in the
generated migration, which `POIS-006A` explicitly checks for and rejects).

**Excluded — do not create these models, ever, in this schema pass:**
- `OiOutreachDraft` — `OiArtifact` supersedes it (D-020).
- `OiRfpProfile` — deferred post-October-1 (D-028).
- `OiTimeline`, `OiTimelineEvent`, `OiBrief` — both are derived views, never models (D-021,
  D-022).

---

# Files Expected

- `prisma/schema.prisma`

---

# Dependencies

`POIS-004D-add-role-outcome-offer-models.md`

---

# Referenced Documents

- `POIS-DATA-MODEL.md` §9 (only the six models and the `OiScore` rename note).

---

# Acceptance Criteria

- [ ] `npx prisma validate` succeeds.
- [ ] All six models exist.
- [ ] `OiScore` exists with `@@map("OiOpportunityScore")`.
- [ ] No `OiOutreachDraft`, `OiRfpProfile`, `OiTimeline`, `OiTimelineEvent`, or `OiBrief` model
      exists anywhere in the schema.

---

# Validation

```
npx prisma validate
```

---

# Rollback

Revert the six model additions and the rename.

---

# Expected Diff Size

Medium.

---

# Estimated Time

60 minutes.

---

# Next Story

`POIS-004F-validate-generate-schema.md`
