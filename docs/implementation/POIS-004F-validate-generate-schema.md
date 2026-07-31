## Story Metadata

Milestone:
M0

Parent Task:
POIS-004

Story:
POIS-004F

Depends On:
POIS-004E

Blocks:
POIS-005A

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

**Business objective:** Close out the schema-addition phase with one explicit gate before any
existing-model modification begins, so a broken schema is never inherited by POIS-005.

**User story:** As Codex, I need confirmation that the full set of new models and enums from
POIS-004A–E generates a valid Prisma client before existing models are touched.

**Commercial outcome:** None directly — a verification checkpoint.

---

# Scope

**Included:** Run `npx prisma validate` and `npx prisma generate`. Confirm the generated
client exposes every model added in POIS-004A–E. Confirm the excluded models
(`OiOutreachDraft`, `OiRfpProfile`, `OiTimeline`, `OiTimelineEvent`, `OiBrief`) do not exist.

**Excluded:** No schema edits in this story. If validation fails, the fix belongs in whichever
of POIS-004A–E introduced the problem — reopen that story rather than patching here.

---

# Files Expected

None — this is a verification-only story. If a defect is found, report which prior story
(POIS-004A–E) needs to be reopened; do not fix it in this story.

---

# Dependencies

`POIS-004E-add-decision-campaign-playbook-models.md`

---

# Referenced Documents

None beyond the schema itself.

---

# Acceptance Criteria

- [ ] `npx prisma validate` succeeds with no errors or warnings.
- [ ] `npx prisma generate` succeeds.
- [ ] The generated client's type exports include every model added across POIS-004A–E.
- [ ] `grep` the schema for `OiOutreachDraft`, `OiRfpProfile`, `OiTimeline`, `OiTimelineEvent`,
      `OiBrief` — none found.

---

# Validation

```
npx prisma validate
npx prisma generate
grep -E "OiOutreachDraft|OiRfpProfile|OiTimeline|OiBrief" prisma/schema.prisma
```

---

# Rollback

Not applicable — no changes made in this story.

---

# Expected Diff Size

Small (none expected).

---

# Estimated Time

15–30 minutes.

---

# Next Story

`POIS-005A-enrich-organization-person.md`
