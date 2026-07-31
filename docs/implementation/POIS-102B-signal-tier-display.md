## Story Metadata

Milestone:
M1

Parent Task:
POIS-102

Story:
POIS-102B

Depends On:
POIS-102A

Blocks:
POIS-103A

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

**Business objective:** Let Todd immediately judge whether what he just pasted is worth his
attention, in plain language, without having to interpret raw numbers.

**User story:** As Todd, after I paste a source, I see its signal tier and strength (e.g.
`Tier 1 · Senior role posting · strength 87`) with an expandable list of the reasons that produced
that score.

**Commercial outcome:** This is the first moment Todd can triage incoming signals by importance
instead of reading every source in full.

---

# Scope

**Included:**
- Add the signal tier display block to the intake review screen (built in POIS-101C), rendering
  the output of `classifySignal` (built in POIS-102A): tier, signal type, strength, and an
  expandable reason list.

**Excluded:**
- No changes to `classify-signal.ts` itself.
- No initiative inference or proposed-initiative UI (POIS-103A/103B).

---

# Files Expected

- `src/app/tif/oi/intake/page.tsx`

---

# Dependencies

`POIS-102A-classify-signal-function.md`

---

# Referenced Documents

- None beyond the `classifySignal` return type defined in POIS-102A — no new document sections
  are required to render existing structured output.

---

# Acceptance Criteria

- [ ] The tier and strength display renders in the format `Tier 1 · Senior role posting ·
      strength 87` (label text matching the underlying signal type).
- [ ] Reasons are shown in an expandable list, in plain language (not raw rule identifiers).
- [ ] Manual test: pasting a Tier 1 posting and a Tier 3 news item shows visibly different tiers.
- [ ] This is the final letter in the POIS-102 chain — the capability is now visible and usable
      by Todd.

---

# Validation

```
npm test
npm run build
```

---

# Rollback

Hide the tier display block (remove it from the intake page). The underlying `OiSignal` rows are
harmless and require no cleanup.

---

# Expected Diff Size

Small.

---

# Estimated Time

45 minutes.

---

# Next Story

`POIS-103A-initiative-inference-clustering.md`
