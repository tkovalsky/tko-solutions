## Story Metadata

Milestone:
M2

Parent Task:
POIS-209

Story:
POIS-209B

Depends On:
POIS-209A

Blocks:
POIS-210A

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

**Business objective:** Let Todd see and select relevant, approved proof content for an
opportunity directly on the workbench.

**User story:** As Todd, I want to see proof items matched to an opportunity, with checkboxes to
select which ones to use, so I can quickly assemble supporting evidence for outreach.

**Commercial outcome:** Completes the POIS-209 vertical slice — turns the read-only matching
logic (POIS-209A) into an operator-usable selection tool.

---

# Scope

**Included:**
- Matched-proof display on the workbench, rendering the ranked results from
  `action/proof-match.ts` (POIS-209A).
- Select checkboxes on each matched proof item.

**Excluded:**
- No changes to the matching logic itself (complete in POIS-209A).
- No writes to TIF content tables — selection state is opportunity-scoped, not a content
  mutation.

---

# Files Expected

- Matched-proof display component on the workbench (path determined during implementation)
- Corresponding UI tests

---

# Dependencies

`POIS-209A-proof-match-logic.md`

---

# Referenced Documents

- `POIS-OPERATOR-UX.md` — matched-proof display section (workbench).

---

# Acceptance Criteria

- [ ] Matched proof items render on the workbench with select checkboxes.
- [ ] Manual validation: on 5 real opportunities, at least 2 relevant proof items surface per
      opportunity.

---

# Validation

```
npm test -- matched-proof-display
```

Manual: review matched proof on 5 real opportunities and confirm at least 2 relevant items per
opportunity.

---

# Rollback

Hide the matched-proof section from the workbench.

---

# Expected Diff Size

Small.

---

# Estimated Time

45 minutes.

---

# Next Story

`POIS-210A-playbook-selector-and-checklist.md`
