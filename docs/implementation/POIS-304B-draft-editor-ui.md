## Story Metadata

Milestone:
M3

Parent Task:
POIS-304

Story:
POIS-304B

Depends On:
POIS-304A

Blocks:
POIS-305A

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

**Business objective:** Make the gated draft-generation and approval logic from POIS-304A
actually usable — Todd needs to see, edit, and approve `email_draft` / `linkedin_draft` artifacts
through a real editor, with unsupported claims visibly blocking approval.

**User story:** As Todd, I want to edit a generated draft, see any unsupported claims called out
inline, and have the approve button disabled until they're resolved, with unambiguous copy
telling me that approving never sends anything.

**Commercial outcome:** Completes the POIS-304 vertical slice — drafts that cite specific
evidence and proof, with an approval workflow that is safe by construction and impossible to
accidentally mistake for sending.

---

# Scope

**Included:**
- Draft editor UI for `email_draft` and `linkedin_draft`, extending POIS-302B's inline-warning
  display onto the full editor surface.
- Disabled-approve-button state: the approve button is `disabled` whenever the draft's
  `unsupportedClaims` list is non-empty, mirroring the server-side throw from POIS-304A.
- `operatorEditedAt` is set whenever Todd edits draft text.
- Explicit, visible copy on the approval control: **"Approving does not send."**

**Excluded:**
- No new generation or validation logic (POIS-304A, POIS-302A own that).
- No changes to `approveArtifact`'s server-side throw behavior.
- Rule 8 note: this UI must never introduce a send action. The only actions available are edit,
  regenerate, and approve. There is no "send" button, and none may be added without an explicit,
  separate instruction — sending is an `OiActivity` Todd logs manually (see POIS-306A).

---

# Files Expected

- Draft editor component (path depends on existing draft-display surface from POIS-302B —
  extend rather than replace)
- Corresponding component test asserting the disabled-button state

---

# Dependencies

`POIS-304A-gated-draft-generation-and-approval.md`

---

# Referenced Documents

- `docs/opportunity-intelligence/POIS-CODEX-TASKS.md` — POIS-304 section.
- `docs/IMPLEMENTATION_RULES.md` — Rule 8 (no outbound send capability).

---

# Acceptance Criteria

- [ ] The draft editor renders `email_draft` and `linkedin_draft` artifacts with inline
      unsupported-claim warnings visible on the relevant text.
- [ ] The approve button is `disabled` whenever `unsupportedClaims` is non-empty, and enabled
      when it is empty.
- [ ] Editing draft text sets `operatorEditedAt`.
- [ ] The copy "Approving does not send." (or equivalent unambiguous phrasing) is visibly
      present next to the approve control.
- [ ] Approved drafts cite specific evidence and proof (i.e., generation output references
      linked evidence, not invented content).
- [ ] No send, email, messaging, or application-submission control exists anywhere in this UI.

---

# Validation

```
npm run test -- draft-editor
npm run typecheck
```

Manual: open a draft with a known unsupported claim, confirm the approve button is disabled and
the warning is visible; resolve the claim and confirm the button enables.

---

# Rollback

Hide the draft editor entry point; POIS-304A's generation and approval logic remain intact and
unaffected.

---

# Expected Diff Size

Medium.

---

# Estimated Time

90 minutes.

---

# Next Story

`POIS-305A-meeting-prep-generation.md`
