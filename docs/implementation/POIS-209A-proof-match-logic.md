## Story Metadata

Milestone:
M2

Parent Task:
POIS-209

Story:
POIS-209A

Depends On:
POIS-208B

Blocks:
POIS-209B

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

**Business objective:** Deterministically match approved proof content to an opportunity by tag
overlap, without ever writing to TIF's content tables.

**User story:** As Codex, I need a read-only proof-matching function ranking approved proof
items by tag overlap, so the display story that follows has correct, safe matches to render.

**Commercial outcome:** None directly visible yet — this is the logic checkpoint of a two-part
vertical slice (POIS-209). The display that makes this visible ships in POIS-209B. This story's
Definition of Done is narrower: its own tests pass, but it makes no user-visible claim.

---

# Scope

**Included:**
- `action/proof-match.ts` implementing deterministic tag-overlap ranking of proof content
  against an opportunity.
- Filtering to only proof items where `isApprovedForOutreach` is true.
- Strictly read-only: this action never writes to any TIF content table.

**Excluded:**
- No matched-proof display or select checkboxes (POIS-209B).
- No changes to TIF content models, approval workflow, or `isApprovedForOutreach` itself.

---

# Files Expected

- `action/proof-match.ts`
- Corresponding unit tests

---

# Dependencies

`POIS-208B-offer-section-and-select-action.md`

---

# Referenced Documents

- `POIS-DATA-MODEL.md` — proof/content model and the `isApprovedForOutreach` field.

---

# Acceptance Criteria

- [ ] Proof items are ranked by tag overlap with the opportunity, deterministically.
- [ ] Proof items where `isApprovedForOutreach` is false are excluded from results.
- [ ] An opportunity with no matching proof returns an empty result without error.
- [ ] A test explicitly asserts `action/proof-match.ts` performs no writes to any TIF content
      table.
- [ ] No UI files are touched in this diff.

---

# Validation

```
npm test -- proof-match
```

---

# Rollback

Delete `action/proof-match.ts` and its tests.

---

# Expected Diff Size

Small.

---

# Estimated Time

60 minutes.

---

# Next Story

`POIS-209B-matched-proof-display.md`
