## Story Metadata

Milestone:
M1

Parent Task:
POIS-108

Story:
POIS-108B

Depends On:
POIS-108A

Blocks:
POIS-108C

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

**Business objective:** Give every opportunity a real, navigable detail page — the workbench —
starting with the two sections that establish its identity and its parent initiative, so Todd can
see and act on individual opportunities instead of only the pipeline list.

**User story:** As Todd, I open an opportunity and see its overview and its parent initiative,
with anchored navigation ready for the sections that follow, and I can change its status or edit
the initiative hypothesis directly from this page.

**Commercial outcome:** This makes the workbench real and navigable — Todd can now drill from the
pipeline list into a specific opportunity and take real actions on it, even though two of the four
UX sections (evidence, gaps) are still missing.

---

# Scope

**Included:**
- `src/app/tif/oi/opportunities/[id]/page.tsx` — the workbench shell with anchored jump
  navigation, plus the overview and initiative sections per `POIS-OPERATOR-UX.md` §6 (first two
  of four sections).
- `src/app/tif/oi/opportunities/[id]/actions.ts` — `updateOpportunityStatus` (enforced by
  `canTransition` from POIS-108A), `approveInitiative`, `editInitiativeHypothesis`.
- A test confirming hypothesis styling uses different class names than fact styling (inferred
  content must remain visually distinguishable from confirmed facts).

**Excluded:**
- No evidence or gaps sections (POIS-108C).
- No `resolveResearchGap`, `dismissResearchGap`, `addOperatorFact`, or `recomputeScore` actions
  (POIS-108C).
- No changes to `lifecycle.ts` itself (built in POIS-108A).

---

# Files Expected

- `src/app/tif/oi/opportunities/[id]/page.tsx`
- `src/app/tif/oi/opportunities/[id]/actions.ts`

---

# Dependencies

`POIS-108A-opportunity-lifecycle-state-machine.md`

---

# Referenced Documents

- `POIS-OPERATOR-UX.md` §6 (overview and initiative sections only — evidence and gaps sections
  are out of scope for this story).

---

# Acceptance Criteria

- [ ] The workbench page renders with anchored jump navigation.
- [ ] The overview and initiative sections render per §6.
- [ ] `updateOpportunityStatus` enforces `canTransition`; blocked transitions surface the specific
      blocking reason to Todd.
- [ ] `approveInitiative` and `editInitiativeHypothesis` work correctly.
- [ ] Inferred/hypothesis content is styled with different class names than confirmed fact
      content, verified by test.
- [ ] Sibling opportunities on the same initiative are listed with their PE.
- [ ] This page is real and user-visible now, even though the evidence and gaps sections are not
      yet present (they arrive in POIS-108C).

---

# Validation

```
npm test
npm run build
```

---

# Rollback

Delete `src/app/tif/oi/opportunities/[id]/page.tsx` and its `actions.ts`.

---

# Expected Diff Size

Medium.

---

# Estimated Time

90 minutes.

---

# Next Story

`POIS-108C-workbench-evidence-and-gaps-sections.md`
