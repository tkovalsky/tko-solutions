## Story Metadata

Milestone:
M2

Parent Task:
POIS-207

Story:
POIS-207B

Depends On:
POIS-207A

Blocks:
POIS-208A

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

**Business objective:** Make AI-generated narrative readability improvements visible on the
workbench, without ever creating a dependency on AI availability.

**User story:** As Todd, I want the initiative section of the workbench to show a readable
narrative summary when available, and to keep working exactly as before when AI is unavailable.

**Commercial outcome:** Completes the POIS-207 vertical slice — improves readability of
initiative clusters for the operator, with zero regression risk when AI is down.

---

# Scope

**Included:**
- Narrative display on the workbench initiative section (built in POIS-103B), rendering the
  output of `generateInitiativeNarrative()` (POIS-207A) when available.
- Graceful fallback to the existing deterministic initiative name when the narrative is
  unavailable.

**Excluded:**
- No changes to narrative generation or post-validation logic (complete in POIS-207A).
- No changes to `ai/client.ts` (complete in POIS-206).

---

# Files Expected

- Workbench initiative section component (built in POIS-103B; path determined during
  implementation)
- Corresponding UI tests, including an AI-unavailable fallback test

---

# Dependencies

`POIS-207A-initiative-narrative-generation.md`

---

# Referenced Documents

- `POIS-OPERATOR-UX.md` — workbench initiative section (POIS-103B).

---

# Acceptance Criteria

- [ ] The initiative section displays the AI-generated narrative when available.
- [ ] When AI is unavailable, the section renders the existing deterministic name with no
      visible error or broken state.
- [ ] Narrative display improves readability without altering the underlying initiative data.

---

# Validation

```
npm test -- initiative-narrative-display
```

Manual: unset the AI API key and confirm the initiative section still renders correctly.

---

# Rollback

Hide the narrative display in the initiative section; leave `generateInitiativeNarrative()`
untouched.

---

# Expected Diff Size

Small.

---

# Estimated Time

45 minutes.

---

# Next Story

`POIS-208A-offer-recommendation-logic.md`
