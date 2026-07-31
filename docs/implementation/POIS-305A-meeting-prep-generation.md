## Story Metadata

Milestone:
M3

Parent Task:
POIS-305

Story:
POIS-305A

Depends On:
POIS-304B

Blocks:
POIS-305B

Estimated PR Size:
Small

Expected Review Time:
5-10 minutes

Risk:
Low

Breaking Change:
No

Migration:
No

Feature Flag:
No

---

# Story

**Business objective:** Give Todd a `meeting_prep` artifact he can generate ahead of a call or
meeting, composed from the same evidence pipeline as the other artifact kinds.

**User story:** As Todd, I want to generate a meeting prep document for an opportunity before I
walk into a conversation, so I have the relevant evidence and context in one place.

**Commercial outcome:** Small, self-contained capability that increases Todd's preparedness for
live conversations without adding any outreach risk — `meeting_prep` is not sent to anyone.

---

# Scope

**Included:**
- `meeting_prep` artifact generation via `action/artifact-compose.ts` (extend the existing
  compose function from POIS-303/POIS-304A rather than duplicating it).
- Display of the generated `meeting_prep` artifact plus a generation button on the opportunity
  view.

**Excluded:**
- No gating via `canPrepareOutreach()` or the claim validator — `meeting_prep` is for Todd's own
  use, not sent to the prospect.
- No approval workflow — nothing to approve; this is not a sendable artifact.
- No changes to `email_draft` / `linkedin_draft` generation (POIS-304A/B).
- Rule 8 note: `meeting_prep` is never transmitted by this code. No email, messaging, social, or
  application-submission API call is introduced.

---

# Files Expected

- `action/artifact-compose.ts` (extend to add `meeting_prep` generation)
- Display/button component on the opportunity view

---

# Dependencies

`POIS-304B-draft-editor-ui.md`

---

# Referenced Documents

- `docs/opportunity-intelligence/POIS-CODEX-TASKS.md` — POIS-305 section (meeting_prep half
  only).

---

# Acceptance Criteria

- [ ] `meeting_prep` generates successfully from real linked evidence for a given opportunity.
- [ ] The generated artifact and its generation button render on the opportunity view.
- [ ] Generation is ungated — no dependency on `canPrepareOutreach()` or the claim validator.

---

# Validation

```
npm run test -- artifact-compose
npm run typecheck
```

---

# Rollback

Hide the `meeting_prep` generation button; no migration to unwind.

---

# Expected Diff Size

Small.

---

# Estimated Time

45 minutes.

---

# Next Story

`POIS-305B-brief-snapshot-artifact.md`
