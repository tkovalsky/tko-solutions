## Story Metadata

Milestone:
M2

Parent Task:
POIS-205

Story:
POIS-205A

Depends On:
POIS-204

Blocks:
POIS-205B

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

**Business objective:** Assemble a derived, real-time briefing view from existing facts, contact
points, and stakeholder data — with no new persisted model — so Todd never walks into a
conversation cold.

**User story:** As Codex, I need the assembly logic for the executive brief — mapping all 13
sections to their underlying data sources — so the page built in the next story has something
correct and fast to render.

**Commercial outcome:** None directly visible yet — this is the logic checkpoint of a two-part
vertical slice (POIS-205). The route that makes this visible ships in POIS-205B. This story's
Definition of Done is narrower: its own tests pass, but it makes no user-visible claim.

---

# Scope

**Included:**
- `action/executive-brief.ts` implementing the derived-view assembly logic that maps all 13
  brief sections to their source data per the data model.
- Performance target: assembly completes in under 1 second against a realistic fixture.

**Excluded:**
- No `/tif/oi/people/[id]` route or any UI (POIS-205B).
- **No `OiBrief` model — this is a hard constraint (D-022). The brief is a derived view assembled
  at read time, never persisted as its own table.**
- No changes to fact, contact point, or stakeholder capture logic.

---

# Files Expected

- `action/executive-brief.ts`
- Corresponding unit tests, including a fixture-based performance test

---

# Dependencies

`POIS-204-person-facts.md`

---

# Referenced Documents

- `POIS-DATA-MODEL.md` §9.8 (executive brief section-to-source mapping).

---

# Acceptance Criteria

- [ ] Each of the 13 brief sections maps to its correct underlying data source per §9.8.
- [ ] Assembly completes in under 1 second against a realistic fixture.
- [ ] A test explicitly asserts that no `OiBrief` table or model is referenced anywhere in the
      implementation.
- [ ] No route or UI files are touched in this diff.

---

# Validation

```
npm test -- executive-brief
```

---

# Rollback

Delete `action/executive-brief.ts` and its tests.

---

# Expected Diff Size

Medium.

---

# Estimated Time

75 minutes.

---

# Next Story

`POIS-205B-executive-brief-page.md`
