## Story Metadata

Milestone:
M1

Parent Task:
POIS-108

Story:
POIS-108C

Depends On:
POIS-108B

Blocks:
POIS-109

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

**Business objective:** Complete the workbench so it shows everything known about an opportunity
and how we know it — including the evidence behind every fact and the gaps still open — and let
Todd close those gaps directly, with the score updating immediately.

**User story:** As Todd, one page shows me everything known about an opportunity and how we know
it. I can resolve a research gap by supplying the answer myself, and the score updates right
away.

**Commercial outcome:** This completes the workbench as the single source of truth for an
opportunity — Todd no longer has to leave the page to close a gap, add a fact, or see the score
recompute.

---

# Scope

**Included:**
- The evidence and gaps sections of the workbench per `POIS-OPERATOR-UX.md` §6 (remaining two of
  four sections) — facts show their quote and offset on click.
- `resolveResearchGap` action: creates an operator fact (`basis = operator`,
  `isOperatorOverride = true`), resolves the gap, and rescores — all in one transaction.
- `dismissResearchGap`, `addOperatorFact`, and `recomputeScore` actions.

**Excluded:**
- No changes to the overview or initiative sections (built in POIS-108B).
- No changes to `lifecycle.ts` (built in POIS-108A).

---

# Files Expected

- `src/app/tif/oi/opportunities/[id]/page.tsx`
- `src/app/tif/oi/opportunities/[id]/actions.ts`

---

# Dependencies

`POIS-108B-workbench-overview-and-initiative-sections.md`

---

# Referenced Documents

- `POIS-OPERATOR-UX.md` §6 (evidence and gaps sections only).

---

# Acceptance Criteria

- [ ] The evidence section renders facts with click-to-reveal quote and offset.
- [ ] The gaps section renders open research gaps.
- [ ] `resolveResearchGap` creates an operator fact, resolves the gap, and rescores the
      opportunity, all within a single transaction.
- [ ] `dismissResearchGap`, `addOperatorFact`, and `recomputeScore` all work correctly.
- [ ] All four workbench sections (overview, initiative, evidence, gaps) now render — this
      acceptance criterion is only true as of this story.
- [ ] Manual test: resolving a gap takes under 30 seconds, and the score visibly updates within 2
      seconds.
- [ ] This is the final letter in the POIS-108 chain — the capability is now visible and usable
      by Todd.

---

# Validation

```
npm test
npm run build
```

---

# Rollback

Revert the evidence and gaps sections and the four actions added in this story. The workbench
falls back to the POIS-108B state (overview and initiative only).

---

# Expected Diff Size

Medium.

---

# Estimated Time

90 minutes.

---

# Next Story

`POIS-109-score-explanation-panel.md`
