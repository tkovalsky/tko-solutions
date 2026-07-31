## Story Metadata

Milestone:
M1

Parent Task:
POIS-108

Story:
POIS-108A

Depends On:
POIS-107

Blocks:
POIS-108B

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

**Business objective:** Establish, as pure deterministic logic, which opportunity status
transitions are valid and which require a reason — before any workbench UI enforces it.

**User story:** As Codex, I need `lifecycle.ts` to correctly implement `canTransition` and the
state machines for every opportunity type, so the workbench stories that follow (POIS-108B/108C)
can enforce valid transitions without re-deriving the rules.

**Commercial outcome:** None directly yet — not yet user-visible. Surfaced in POIS-108B/108C.

---

# Scope

**Included:**
- `src/lib/opportunity-intelligence/commercial/lifecycle.ts` — `canTransition` and the state
  machines per `POIS-ARCHITECTURE.md` §5, for every opportunity type.
- Tests for every valid and invalid transition per opportunity type.
- A test confirming a reason is required for `paused` and for terminal statuses.

**Excluded:**
- No UI. No workbench page, no transition enforcement in a route — that is POIS-108B/108C.
- No `resolveResearchGap`, `dismissResearchGap`, `addOperatorFact`, `recomputeScore`, or any other
  workbench action.

---

# Files Expected

- `src/lib/opportunity-intelligence/commercial/lifecycle.ts`

---

# Dependencies

`POIS-107-pipeline-list.md`

---

# Referenced Documents

- `POIS-ARCHITECTURE.md` §5 (opportunity status state machines).

---

# Acceptance Criteria

- [ ] Every valid transition per opportunity type succeeds; every invalid transition per
      opportunity type is rejected — both covered by tests.
- [ ] A reason is required to transition into `paused` or into any terminal status; omitting it
      is rejected.
- [ ] Not yet user-visible — surfaced in POIS-108B/108C.

---

# Validation

```
npm test
```

---

# Rollback

Delete `lifecycle.ts`. No persisted state depends on it yet.

---

# Expected Diff Size

Small.

---

# Estimated Time

75 minutes.

---

# Next Story

`POIS-108B-workbench-overview-and-initiative-sections.md`
