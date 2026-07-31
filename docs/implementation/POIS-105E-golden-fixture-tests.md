## Story Metadata

Milestone:
M1

Parent Task:
POIS-105

Story:
POIS-105E

Depends On:
POIS-105D

Blocks:
POIS-105F

Estimated PR Size:
Small

Expected Review Time:
5-10 minutes

Risk:
High

Breaking Change:
No

Migration:
No

Feature Flag:
No

---

# Story

**Business objective:** Prove the composite scorer reproduces every documented worked example
exactly. This is the single most important test file in the milestone — if the composite score
is wrong, every ranking downstream is wrong and Todd will stop trusting the system. It is its
own story, separated from the wiring in POIS-105D, specifically so this test suite gets a full,
unhurried session rather than being squeezed in alongside the wiring work.

**User story:** As Todd, I need the composite score to match the documented worked examples
exactly, not approximately — the ranking is only trustworthy if the arithmetic behind it is
verifiably correct.

**Commercial outcome:** None directly yet — not yet user-visible. This is the fifth of six
scoring-logic checkpoints; the composite score becomes visible to Todd in POIS-105F.

---

# Scope

**Included:**
- Golden fixture tests against `commercial/score/index.ts` (built in POIS-105D) reproducing all
  five worked examples in `POIS-SCORING-AND-DECISION-MODEL.md` §14, each asserting every axis
  value, the computed `$/hr` value, probability, expected value (EV), estimated hours, and PE.
- A test for the assessment-expansion arithmetic: `$6,500 + 0.40 × $60,000 = $30,500`.
- A determinism test: the same input scored 100 times produces identical output every time.
- A test that the §14 PE ordering holds when the five worked examples are sorted by PE.

**Excluded:**
- No changes to `index.ts` or any axis file — this story is tests only, against logic that
  already exists.
- No UI — the score summary display is POIS-105F.
- Do not compress or shorten this test list during implementation. This is explicitly the
  single most important test file in the milestone.

---

# Files Expected

- `src/lib/opportunity-intelligence/commercial/score/index.test.ts` (extended with the golden
  fixtures — the shape/sanity tests from POIS-105D already live here)

---

# Dependencies

`POIS-105D-composite-score-index.md`

---

# Referenced Documents

- `POIS-SCORING-AND-DECISION-MODEL.md` §14 (all five worked examples and PE ordering) only.

---

# Acceptance Criteria

- [ ] All five worked examples in §14 are reproduced exactly: every axis value, the `$/hr`
      value, probability, EV, estimated hours, and PE match the documented figures.
- [ ] The assessment-expansion arithmetic (`$6,500 + 0.40 × $60,000 = $30,500`) is verified by
      an explicit test.
- [ ] Scoring the same input 100 times produces identical output every time (determinism test).
- [ ] Sorting the five §14 worked examples by PE matches the documented ordering.
- [ ] Not yet user-visible — surfaced in POIS-105F.

---

# Validation

```
npm test
```

---

# Rollback

Remove the golden-fixture test cases. `index.ts` itself is untouched by this story, so there is
nothing else to revert.

---

# Expected Diff Size

Small (test file only).

---

# Estimated Time

75 minutes.

---

# Next Story

`POIS-105F-score-summary-display.md`
