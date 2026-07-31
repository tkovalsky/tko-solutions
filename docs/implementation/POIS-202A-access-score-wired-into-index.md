## Story Metadata

Milestone:
M2

Parent Task:
POIS-202

Story:
POIS-202A

Depends On:
POIS-201B

Blocks:
POIS-202B

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

**Business objective:** Make stakeholder access a first-class input to opportunity ranking, so
opportunities with warm, high-access contacts surface above cold ones.

**User story:** As Codex, I need `accessScore` computed as the max across an opportunity's
stakeholders and wired into `commercial/score/index.ts`, enabling the three scoring components
already added in POIS-007B, so that ranking reflects real access rather than treating every
opportunity as equally reachable.

**Commercial outcome:** None directly visible yet — this is the logic checkpoint of a two-part
vertical slice (POIS-202). The score panel that makes this visible ships in POIS-202B. This
story's Definition of Done is narrower: its own tests pass, but it makes no user-visible claim.

---

# Scope

**Included:**
- Compute `accessScore` as the max access value across all stakeholders on an opportunity.
- Wire `accessScore` into `commercial/score/index.ts`, enabling the three scoring components
  added in POIS-007B (previously present but unused/disabled).
- Enforce the existing 60% cap on the combined access contribution.

**Excluded:**
- No score panel UI changes (POIS-202B).
- No new scoring components beyond the three already added in POIS-007B — this story wires
  existing components in, it does not design new ones.
- No changes to `deriveNextAction()` or any lifecycle/queue ranking logic outside
  `commercial/score/index.ts`.

---

# Files Expected

- `commercial/score/index.ts`
- Corresponding unit tests for `commercial/score/index.ts`

---

# Dependencies

`POIS-201B-stakeholder-section-and-actions.md`

---

# Referenced Documents

- `POIS-DATA-MODEL.md` — scoring section covering the three components added in POIS-007B.

---

# Acceptance Criteria

- [ ] A stakeholder with warm history contributes a ×2.5 multiplier to probability.
- [ ] A stakeholder with access ≥70 contributes a ×1.4 multiplier.
- [ ] The combined access contribution is capped at 60%, verified by test.
- [ ] `accessScore` is computed as the max across an opportunity's stakeholders.
- [ ] No UI files are touched in this diff.

---

# Validation

```
npm test -- commercial/score
```

---

# Rollback

Default the three POIS-007B scoring components back to 0 in `commercial/score/index.ts`.

---

# Expected Diff Size

Small.

---

# Estimated Time

60 minutes.

---

# Next Story

`POIS-202B-access-breakdown-in-score-panel.md`
