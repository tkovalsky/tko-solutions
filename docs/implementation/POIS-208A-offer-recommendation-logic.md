## Story Metadata

Milestone:
M2

Parent Task:
POIS-208

Story:
POIS-208A

Depends On:
POIS-207B

Blocks:
POIS-208B

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

**Business objective:** Deterministically recommend the right offer for an opportunity based on
its initiative category and opportunity type, so operators aren't guessing which offer to pitch.

**User story:** As Codex, I need a deterministic recommendation function mapping initiative
category and opportunity type to an offer, so the workbench UI built in the next story has a
correct default to present.

**Commercial outcome:** None directly visible yet — this is the logic checkpoint of a two-part
vertical slice (POIS-208). The offer section that makes this visible ships in POIS-208B. This
story's Definition of Done is narrower: its own tests pass, but it makes no user-visible claim.

---

# Scope

**Included:**
- A deterministic recommendation function taking initiative category + opportunity type and
  returning an offer, using the offer enrichment shipped in POIS-005D/009A.

**Excluded:**
- No offer section UI, no `selectOffer` action (POIS-208B).
- No new offer data model or enrichment fields — reuse what POIS-005D/009A shipped.
- No changes to `estimatedValue` or rescoring logic (that lives in POIS-208B's `selectOffer`).

---

# Files Expected

- Offer recommendation function (path determined during implementation)
- Corresponding unit tests

---

# Dependencies

`POIS-207B-initiative-narrative-display.md`

---

# Referenced Documents

- `POIS-DATA-MODEL.md` — offer enrichment fields (POIS-005D/009A).

---

# Acceptance Criteria

- [ ] Given the same initiative category and opportunity type, the recommendation function
      always returns the same offer (deterministic — covered by test).
- [ ] No UI or action files are touched in this diff.

---

# Validation

```
npm test -- offer-recommendation
```

---

# Rollback

Delete the offer recommendation function and its tests.

---

# Expected Diff Size

Small.

---

# Estimated Time

45 minutes.

---

# Next Story

`POIS-208B-offer-section-and-select-action.md`
