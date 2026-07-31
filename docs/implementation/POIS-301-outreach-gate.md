## Story Metadata

Milestone:
M3

Parent Task:
POIS-301

Story:
POIS-301

Depends On:
POIS-210B

Blocks:
POIS-302A

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

**Business objective:** Before any outreach artifact can be prepared for an opportunity, the
system must be able to state, deterministically, whether Todd has done enough groundwork to
reach out credibly — and if not, exactly what is missing.

**User story:** As Todd, when I open an opportunity that isn't ready for outreach, I want to see
the specific, named reasons it's blocked (not a generic "not ready" message), so I know exactly
what to do next.

**Commercial outcome:** Prevents premature or under-researched outreach, which is the single
biggest risk to TKO's credibility with a prospect. This is the gate every later drafting story
(POIS-304A/B) depends on.

---

# Scope

**Included:**
- `canPrepareOutreach()` — a pure, deterministic gate function that evaluates an opportunity and
  returns either "ready" or a list of specific, named unmet requirements (e.g. "no evidence
  linked," "no matched offer," "no named contact").
- Inline blocked-state UI on the opportunity view: when the gate fails, render the list of named
  reasons directly (no generic placeholder copy).

**Excluded:**
- No changes to scoring, queue ranking, lifecycle derivation, or relationship-state derivation
  (RachelOS Rules — out of scope regardless).
- No claim validation (that is POIS-302A/B).
- No artifact generation of any kind (that is POIS-303 onward).
- No changes to what counts as "evidence" or "offer match" upstream — this story only reads
  existing fields and evaluates them.

---

# Files Expected

- `action/outreach-gate.ts` (or equivalent — new file housing `canPrepareOutreach()`)
- Opportunity view component that renders the blocked-state list

If exact paths differ from repo convention, determine the correct location during
implementation and note it in the PR description.

---

# Dependencies

`POIS-210B` (last Milestone 2 story)

---

# Referenced Documents

- `docs/opportunity-intelligence/POIS-CODEX-TASKS.md` — POIS-301 section (original scope,
  superseded in detail by this file but useful for field names).

---

# Acceptance Criteria

- [ ] `canPrepareOutreach()` returns a structured result distinguishing "ready" from "blocked."
- [ ] Each individual blocking condition (missing evidence, missing offer match, missing named
      contact, etc.) can be triggered in isolation and is named specifically in the result — no
      condition is silently merged into a generic "not ready" message.
- [ ] The blocked-state UI lists every unmet requirement returned by the gate, each as its own
      actionable line item.
- [ ] When all requirements are met, the gate returns "ready" and the blocked-state UI does not
      render.
- [ ] No scoring, queue ranking, lifecycle, or relationship-state logic was modified.

---

# Validation

```
npm run test -- outreach-gate
npm run typecheck
```

---

# Rollback

Revert the gate to always return "ready" (allow all), or revert the commit entirely — the gate
is additive and has no migration to unwind.

---

# Expected Diff Size

Small.

---

# Estimated Time

60 minutes.

---

# Next Story

`POIS-302A-claim-validator-logic.md`
