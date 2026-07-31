## Story Metadata

Milestone:
M2

Parent Task:
POIS-202

Story:
POIS-202B

Depends On:
POIS-202A

Blocks:
POIS-203

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

**Business objective:** Let an operator see why access changed an opportunity's ranking, not
just that it did — building trust in the score.

**User story:** As Todd, I want to see an access score breakdown in the score panel so that when
I add or update a stakeholder, I can see the ranking move and understand why.

**Commercial outcome:** Completes the POIS-202 vertical slice — access scoring becomes visible
and actionable, not just computed internally.

---

# Scope

**Included:**
- Access breakdown display in the score panel (built in POIS-109), surfacing the `accessScore`
  and the contribution of the three POIS-007B components wired in POIS-202A.
- Verification that adding or updating a stakeholder visibly changes the opportunity's ranking
  (probability/EV — "PE" in the score panel).

**Excluded:**
- No changes to the scoring math itself — that was completed in POIS-202A.
- No changes to the stakeholder form or actions (POIS-201B).

---

# Files Expected

- Score panel component (built in POIS-109; path determined during implementation)
- Corresponding UI test/assertion for the access breakdown

---

# Dependencies

`POIS-202A-access-score-wired-into-index.md`

---

# Referenced Documents

- `POIS-OPERATOR-UX.md` — score panel section (POIS-109).

---

# Acceptance Criteria

- [ ] The score panel displays an access breakdown reflecting the `accessScore` computed in
      POIS-202A.
- [ ] Adding a stakeholder with strong access visibly changes the opportunity's PE in the panel.
- [ ] Access changes visibly move the opportunity's position in the ranking.

---

# Validation

```
npm test -- score-panel
```

Manual: add a stakeholder with warm history to an opportunity and confirm the score panel and
ranking update.

---

# Rollback

Hide the access breakdown from the score panel; leave `commercial/score/index.ts` untouched.

---

# Expected Diff Size

Small.

---

# Estimated Time

45 minutes.

---

# Next Story

`POIS-203-contact-points-with-provenance.md`
