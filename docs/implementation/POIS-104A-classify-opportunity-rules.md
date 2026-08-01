## Story Metadata

Milestone:
M1

Parent Task:
POIS-104

Story:
POIS-104A

Depends On:
POIS-103B

Blocks:
POIS-104B

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

**Business objective:** Establish the deterministic rules for what kind of opportunity a source
represents, including the case where one posting legitimately implies more than one opportunity
type, before any UI exposes those candidates to Todd.

**User story:** As Codex, I need `classifyOpportunity` to correctly apply every classification
rule — including hard filters that disqualify a candidate type — so the checkbox-list story that
follows (POIS-104B) has correct data to render.

**Commercial outcome:** None directly yet — not yet user-visible. Surfaced in POIS-104B.

---

# Scope

**Included:**
- `src/lib/opportunity-intelligence/commercial/classify-opportunity.ts` — the classification
  rules table per `POIS-SCORING-AND-DECISION-MODEL.md` §2, including hard filters (e.g.
  compensation-floor disqualification) and multi-type output (a single posting can yield both an
  `fte` and a `consulting` candidate).

**Excluded:**
- No UI. No checkbox list, no rule-name explanation display — that is POIS-104B.
- No `promoteSignal` / `dismissSignal` / `watchAccount` actions or persistence — that is
  POIS-104B.
- No score computation (POIS-105 chain).

---

# Files Expected

- `src/lib/opportunity-intelligence/commercial/classify-opportunity.ts`

---

# Dependencies

`POIS-103B-proposed-initiative-display-and-promote.md`

---

# Referenced Documents

- `POIS-SCORING-AND-DECISION-MODEL.md` §2 (opportunity classification rules table only).
- `POIS-SCORING-AND-DECISION-MODEL.md` §14.1 (FTE below comp floor fixture).
- `POIS-SCORING-AND-DECISION-MODEL.md` §2 and §3.3 (leadership appointment watch-only
  behavior for Example C fixture).

---

# Acceptance Criteria

- [ ] Every classification rule in §2 is covered by an isolated test.
- [ ] A Director-level posting at a payer organization yields both `fte` and `consulting`
      candidates.
- [ ] A lone `leadership_appointment` signal yields an empty candidate list, matching the
      watch-only behavior documented in §2 and §3.3.
- [ ] A signal from a procurement domain yields an `rfp` candidate.
- [ ] Dismiss logic (validated in POIS-104B) rejecting an empty reason is not implemented here —
      only the classification rules are in scope for this story.
- [ ] Not yet user-visible — surfaced in POIS-104B.

---

# Validation

```
npm test
```

---

# Rollback

Delete `classify-opportunity.ts`. No persisted state depends on it yet.

---

# Expected Diff Size

Small.

---

# Estimated Time

75 minutes.

---

# Next Story

`POIS-104B-classification-checkbox-list-and-promote.md`
