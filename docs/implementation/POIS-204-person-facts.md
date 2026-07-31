## Story Metadata

Milestone:
M2

Parent Task:
POIS-204

Story:
POIS-204

Depends On:
POIS-203

Blocks:
POIS-205A

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

**Business objective:** Capture durable facts about a specific person — career history,
responsibilities, interviews, talks — using the same provenance machinery already trusted for
every other fact in the system.

**User story:** As Todd, I want to record facts about a person (not just about the opportunity or
account) so that a stakeholder's background informs how I approach them.

**Commercial outcome:** Deepens stakeholder intelligence with person-specific evidence, feeding
directly into the executive brief (POIS-205).

---

# Scope

**Included:**
- `addPersonFact` action writing an `OiOpportunityFact` row with a `personId` set, covering
  career history, responsibilities, interviews, and talks.
- Reuse of the same provenance, basis, and confidence machinery used by every other fact type —
  no new provenance model.
- Display of person facts on the person page.

**Excluded:**
- No new database migration — the `personId` column was already shipped in POIS-005C.
- No changes to the three-parent CHECK constraint — it was added in POIS-006D and must be relied
  on as-is.
- No contact point changes (POIS-203, already complete).

---

# Files Expected

- `addPersonFact` action (path determined during implementation)
- Person page fact display (path determined during implementation)
- Corresponding tests

---

# Dependencies

`POIS-203-contact-points-with-provenance.md`

---

# Referenced Documents

- `POIS-DATA-MODEL.md` — `OiOpportunityFact` model, `personId` column (POIS-005C), and the
  three-parent CHECK constraint (POIS-006D).

---

# Acceptance Criteria

- [ ] `addPersonFact` writes an `OiOpportunityFact` row with `personId` set and no opportunity
      or account parent, satisfying the existing three-parent CHECK constraint.
- [ ] Person facts carry basis, confidence, and source, identically to other fact types.
- [ ] Person facts appear on the person page.

---

# Validation

```
npm test -- person-fact
```

---

# Rollback

Hide the person-fact form from the person page.

---

# Expected Diff Size

Small.

---

# Estimated Time

45 minutes.

---

# Next Story

`POIS-205A-executive-brief-assembly.md`
