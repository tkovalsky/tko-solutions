## Story Metadata

Milestone:
M1

Parent Task:
POIS-109

Story:
POIS-109

Depends On:
POIS-108C

Blocks:
POIS-110A

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

**Business objective:** Let Todd audit any ranking on demand — a score he cannot inspect is a
score he will eventually stop following.

**User story:** As Todd, I can open a panel on any opportunity and see the full breakdown of its
score: every component with its points, its max, and the reason it received that value, plus the
complete expected-value arithmetic.

**Commercial outcome:** This is what makes the score trustworthy enough to drive daily
prioritization decisions — Todd can verify any number instead of taking it on faith.

---

# Scope

**Included:**
- `score-panel.tsx` — a client-side, collapsible component rendering the full score breakdown
  per `POIS-OPERATOR-UX.md` §6: every component with its points, max, and reason, plus the
  complete EV arithmetic, including each probability multiplier and the effort-reduction
  factors.
- Wire the panel into the workbench (built in POIS-108C).

**Excluded:**
- No changes to any scoring logic file (the score-computation chain is complete as of
  POIS-105D).

---

# Files Expected

- `src/app/tif/oi/opportunities/[id]/score-panel.tsx`

---

# Dependencies

`POIS-108C-workbench-evidence-and-gaps-sections.md`

---

# Referenced Documents

- `POIS-OPERATOR-UX.md` §6 (score panel layout).
- `POIS-SCORING-AND-DECISION-MODEL.md` §14.2 (worked-example arithmetic for tests).

---

# Acceptance Criteria

- [ ] The panel reproduces the §14.2 worked-example arithmetic exactly, including the 60%
      probability cap and the `× 0.7 researched × 0.8 known-stakeholder` effort-reduction factors.
- [ ] A Todd-readable derivation of PE is visible for any opportunity opened in the workbench.
- [ ] Manual test: opening the panel on a real opportunity produces arithmetic Todd can follow
      step by step.
- [ ] This is a single, complete vertical slice — the panel is user-visible immediately.

---

# Validation

```
npm test
npm run build
```

---

# Rollback

Collapse the panel permanently (remove it from the workbench render), or delete
`score-panel.tsx` entirely.

---

# Expected Diff Size

Small.

---

# Estimated Time

60 minutes.

---

# Next Story

`POIS-110A-today-ranking-and-path-diversity.md`
