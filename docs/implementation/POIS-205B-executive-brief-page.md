## Story Metadata

Milestone:
M2

Parent Task:
POIS-205

Story:
POIS-205B

Depends On:
POIS-205A

Blocks:
POIS-206

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

**Business objective:** Give Todd a single page that briefs him on a stakeholder before any
conversation, built entirely from existing evidence with no new persisted model.

**User story:** As Todd, I open a stakeholder and get a real briefing before any conversation —
every item shows its basis and confidence, inferred content is visually distinct, and I never
see a blank section, only a prompt to go research it.

**Commercial outcome:** Completes the POIS-205 vertical slice — turns assembled brief data
(POIS-205A) into an operator-usable page, directly supporting outreach preparation.

---

# Scope

**Included:**
- `/tif/oi/people/[id]` route rendering all 13 sections assembled by
  `action/executive-brief.ts` (POIS-205A), per UX §6.5.
- Every item displays its basis and confidence.
- Inferred content is styled visually distinct from confirmed/sourced content.
- Empty sections render a research prompt — never blank space.

**Excluded:**
- No changes to the assembly logic itself (complete in POIS-205A).
- No `OiBrief` model — this remains a derived view (D-022).

---

# Files Expected

- `/tif/oi/people/[id]` route/page (path determined during implementation)
- Corresponding UI tests, including an empty-section test

---

# Dependencies

`POIS-205A-executive-brief-assembly.md`

---

# Referenced Documents

- `POIS-OPERATOR-UX.md` §6.5 (executive brief page).
- `POIS-DATA-MODEL.md` §9.8 (section-to-source mapping, for cross-reference only).

---

# Acceptance Criteria

- [ ] All 13 sections render on `/tif/oi/people/[id]`.
- [ ] Every item shows basis and confidence.
- [ ] Inferred items are visually distinct from sourced/confirmed items.
- [ ] An empty section renders a research-gap prompt, never blank space — covered by test.
- [ ] The brief assembles and renders in under 1 second against a realistic fixture.

---

# Validation

```
npm test -- executive-brief-page
```

---

# Rollback

Delete the `/tif/oi/people/[id]` route.

---

# Expected Diff Size

Medium.

---

# Estimated Time

90 minutes.

---

# Next Story

`POIS-206-ai-client-adapter.md`
