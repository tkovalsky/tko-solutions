## Story Metadata

Milestone:
M2

Parent Task:
POIS-208

Story:
POIS-208B

Depends On:
POIS-208A

Blocks:
POIS-209A

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

**Business objective:** Let Todd see a recommended offer for an opportunity and select it,
updating the deal's estimated value and score accordingly.

**User story:** As Todd, I want to see the recommended offer for an opportunity — ideal buyer,
problem solved, deliverables, typical objections, and price band — and select it so the deal's
estimated value and score update immediately.

**Commercial outcome:** Completes the POIS-208 vertical slice. A well-matched offer recommendation
directly shapes deal value and pitch quality; Todd's own judgment is the final validation
signal.

---

# Scope

**Included:**
- Offer section UI on the workbench, displaying ideal buyer, problem solved, deliverables,
  typical objections, and price band, seeded by the recommendation function from POIS-208A.
- `selectOffer` action that updates `estimatedValue` and triggers rescoring.

**Excluded:**
- No changes to the recommendation function itself (complete in POIS-208A).
- No changes to the scoring engine internals beyond triggering the existing rescore path.

---

# Files Expected

- Offer section component on the workbench (path determined during implementation)
- `selectOffer` action (path determined during implementation)
- Corresponding tests

---

# Dependencies

`POIS-208A-offer-recommendation-logic.md`

---

# Referenced Documents

- `POIS-OPERATOR-UX.md` — offer section (workbench).

---

# Acceptance Criteria

- [ ] The offer section displays ideal buyer, problem solved, deliverables, typical objections,
      and price band for the recommended offer.
- [ ] Selecting an offer updates the opportunity's `estimatedValue` and triggers a rescore —
      covered by test.
- [ ] Manual validation: on 5 real opportunities, the recommendation matches Todd's intuition
      at least 80% of the time.

---

# Validation

```
npm test -- offer-section
```

Manual: run the recommendation against 5 real opportunities and record the match rate against
Todd's own judgment.

---

# Rollback

Hide the offer section from the workbench.

---

# Expected Diff Size

Medium.

---

# Estimated Time

75 minutes.

---

# Next Story

`POIS-209A-proof-match-logic.md`
