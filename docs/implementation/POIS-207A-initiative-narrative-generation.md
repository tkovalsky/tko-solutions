## Story Metadata

Milestone:
M2

Parent Task:
POIS-207

Story:
POIS-207A

Depends On:
POIS-206

Blocks:
POIS-207B

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

**Business objective:** Turn a cluster of evidence into a readable narrative without ever
letting the model invent facts, name a person, or override the deterministic confidence already
computed by clustering.

**User story:** As Codex, I need `generateInitiativeNarrative()` and its prompt, with
post-validation that rejects unsafe output, so the display story that follows has a safe,
correct narrative to render.

**Commercial outcome:** None directly visible yet — this is the logic checkpoint of a two-part
vertical slice (POIS-207). The display that makes this visible ships in POIS-207B. This story's
Definition of Done is narrower: its own tests pass, but it makes no user-visible claim.

---

# Scope

**Included:**
- `generateInitiativeNarrative()` using the adapter from `ai/client.ts` (POIS-206) and a new
  prompt, `initiative-narrative-v1`.
- Post-validation enforced in code, not just prompted for:
  - The narrative never names a person — reject the response if it does.
  - The narrative cites only supplied excerpts — reject anything else.
  - Confidence is always taken from the POIS-103 clustering output; the AI response's own
    confidence field, if present, is explicitly ignored.

**Excluded:**
- No workbench display of the narrative (POIS-207B).
- No changes to `ai/client.ts` itself (complete in POIS-206).
- No changes to POIS-103 clustering logic — its confidence output is consumed, not modified.

---

# Files Expected

- `generateInitiativeNarrative()` function (path determined during implementation)
- `initiative-narrative-v1` prompt (path determined during implementation)
- Corresponding tests

---

# Dependencies

`POIS-206-ai-client-adapter.md`

---

# Referenced Documents

- `POIS-DATA-MODEL.md` — POIS-103 clustering confidence field (consumed, not modified).

---

# Acceptance Criteria

- [ ] When the AI adapter is unavailable, the deterministic initiative name is retained
      unchanged.
- [ ] A generated response that names a person is rejected by post-validation.
- [ ] The AI response's own confidence field, if present, is explicitly ignored — covered by a
      test asserting the final confidence always matches POIS-103 clustering output.
- [ ] The narrative cites only supplied excerpts.
- [ ] No UI files are touched in this diff.

---

# Validation

```
npm test -- initiative-narrative
```

---

# Rollback

Delete `generateInitiativeNarrative()` and the `initiative-narrative-v1` prompt.

---

# Expected Diff Size

Medium.

---

# Estimated Time

75 minutes.

---

# Next Story

`POIS-207B-initiative-narrative-display.md`
