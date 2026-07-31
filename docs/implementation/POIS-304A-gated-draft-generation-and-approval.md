## Story Metadata

Milestone:
M3

Parent Task:
POIS-304

Story:
POIS-304A

Depends On:
POIS-303

Blocks:
POIS-304B

Estimated PR Size:
Small

Expected Review Time:
5-10 minutes

Risk:
High

Breaking Change:
No

Migration:
No

Feature Flag:
No

---

# Story

**Business objective:** `email_draft` and `linkedin_draft` are the two artifact kinds that
actually get sent to a prospect by Todd — so unlike POIS-303's ungated kinds, these must be
gated on both readiness (POIS-301) and claim safety (POIS-302A) before Todd can approve them.

**User story:** As Todd, when I generate an email or LinkedIn draft, I want it blocked from
generation unless the opportunity is outreach-ready, and blocked from approval unless every
claim in it is supported — so I can never approve something I can't back up.

**Commercial outcome:** This is the enforcement core of the milestone's most important safety
property: unsupported claims never reach an approved, sendable state.

---

# Scope

**Included:**
- Gated generation logic for `email_draft` and `linkedin_draft`, using `canPrepareOutreach()`
  (POIS-301) to gate generation and `action/claim-validator.ts` (POIS-302A) to evaluate the
  generated draft.
- `approveArtifact` action: throws a server-side error if `unsupportedClaims` is non-empty for
  the artifact being approved.
- Version-increments-on-regenerate logic: regenerating a draft increments its version rather
  than overwriting silently.
- Minimal UI only as needed to trigger generation and approval for testing — the full draft
  editor UI is POIS-304B.

**Excluded:**
- No draft editor UI, no disabled-button UI state, no `operatorEditedAt` tracking (POIS-304B).
- No inline warning display wiring beyond what POIS-302B already established.
- Rule 8 note — **critical for this story:** `approveArtifact` approves an artifact; it never
  sends one. `OiArtifact` has no `sentAt` field. This action must not call, and must never be
  extended to call, any email, messaging, social, or application-submission API. Approving does
  not send.

---

# Files Expected

- `action/artifact-compose.ts` (extend to add gated `email_draft` / `linkedin_draft` generation)
- `action/approve-artifact.ts` (or equivalent — new `approveArtifact` action)
- Corresponding test files

---

# Dependencies

`POIS-303-research-summary-and-talking-points.md`

---

# Referenced Documents

- `docs/opportunity-intelligence/POIS-CODEX-TASKS.md` — POIS-304 section.
- `docs/IMPLEMENTATION_RULES.md` — Rule 8 (no outbound send capability).

---

# Acceptance Criteria

- [ ] `email_draft` and `linkedin_draft` generation is blocked when `canPrepareOutreach()`
      reports the opportunity is not ready.
- [ ] Every generated draft is evaluated by `action/claim-validator.ts` and its
      `unsupportedClaims` are recorded.
- [ ] `approveArtifact` throws a server-side error when called on an artifact with a non-empty
      `unsupportedClaims` list.
- [ ] Regenerating a draft increments its version rather than overwriting the prior version.
- [ ] `approveArtifact` contains no call, direct or indirect, to any email, messaging, social, or
      application-submission API.

---

# Validation

```
npm run test -- approve-artifact
npm run test -- artifact-compose
npm run typecheck
```

---

# Rollback

Hide gated generation for `email_draft` and `linkedin_draft`; revert `approveArtifact`. No
migration to unwind.

---

# Expected Diff Size

Medium.

---

# Estimated Time

90 minutes.

---

# Next Story

`POIS-304B-draft-editor-ui.md`
