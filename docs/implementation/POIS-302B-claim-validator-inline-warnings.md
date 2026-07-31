## Story Metadata

Milestone:
M3

Parent Task:
POIS-302

Story:
POIS-302B

Depends On:
POIS-302A

Blocks:
POIS-303

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

**Business objective:** Detection logic alone doesn't help Todd unless the warnings are visible
on the draft itself, at the point of decision. This story surfaces POIS-302A's validator output
inline on whatever draft surface currently exists.

**User story:** As Todd, I want to see exactly which claims in a draft are unsupported, inline,
next to the text they refer to, so I can fix or remove them before I consider approving anything.

**Commercial outcome:** Closes the loop on claim safety — detection without visibility is
useless. This is the final letter of the POIS-302 chain and the vertical slice that makes the
capability real.

---

# Scope

**Included:**
- Wire `action/claim-validator.ts` (POIS-302A) into whatever draft display surface exists at
  this point in the build (a minimal or placeholder surface is acceptable — POIS-304 will extend
  this into the full draft editor).
- Render each unsupported claim as an inline warning attached to the relevant text.
- This is a display-only integration: no blocking, no approval gating yet (that arrives in
  POIS-304A/B).

**Excluded:**
- No new detection logic — reuse POIS-302A's validator as-is.
- No `approveArtifact` changes or disabled-button behavior (POIS-304A/B).
- No draft editing capability (POIS-304B).
- Rule 8 note: this story only displays warnings; it introduces no outbound send, email,
  messaging, or application-submission capability of any kind.

---

# Files Expected

- Draft display component (path depends on what surface exists at this point — determine during
  implementation)
- Minor wiring in `action/claim-validator.ts` call sites if needed (no logic changes)

---

# Dependencies

`POIS-302A-claim-validator-logic.md`

---

# Referenced Documents

- `docs/opportunity-intelligence/POIS-CODEX-TASKS.md` — POIS-302 section ("inline warnings on
  drafts").

---

# Acceptance Criteria

- [ ] Every unsupported claim returned by `action/claim-validator.ts` is rendered as a visible
      inline warning on the draft surface.
- [ ] A clean draft (zero unsupported claims) shows zero warnings.
- [ ] Warnings do not block or disable anything at this point — display only.
- [ ] No new claim-detection logic was added; POIS-302A's validator is reused unmodified.

---

# Validation

```
npm run test -- claim-validator
npm run typecheck
```

Manual: open a draft with a known unsupported claim fixture and confirm the inline warning
renders next to it.

---

# Rollback

Revert the display wiring; POIS-302A's validator remains intact and unaffected.

---

# Expected Diff Size

Small.

---

# Estimated Time

45 minutes.

---

# Next Story

`POIS-303-research-summary-and-talking-points.md`
