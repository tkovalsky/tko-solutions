## Story Metadata

Milestone:
M2

Parent Task:
POIS-203

Story:
POIS-203

Depends On:
POIS-202B

Blocks:
POIS-204

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

**Business objective:** Ensure every contact point captured for a stakeholder carries
provenance, so outreach decisions are never based on an unverifiable channel.

**User story:** As Todd, I want to add a contact point (email, phone, etc.) to a stakeholder and
always know where it came from, so I can trust — or knowingly discount — the channel before
reaching out.

**Commercial outcome:** Directly enables safe outreach: a contact point without provenance is a
liability, not an asset. This story closes that gap in a single vertical slice.

---

# Scope

**Included:**
- `addContactPoint` action and its display on the workbench.
- Provenance is required on every contact point at the action layer, not just the UI.
- `pattern_inferred` provenance is storable but explicitly excluded from outreach eligibility.
- Uniqueness enforcement on `(personId, type, value)`.

**Excluded:**
- No changes to person facts (POIS-204).
- No changes to stakeholder selection or DNC logic (POIS-201B).
- No outreach-sending logic — only the eligibility gate that excludes `pattern_inferred`.

---

# Files Expected

- `addContactPoint` action (path determined during implementation)
- Contact point display component (path determined during implementation)
- Corresponding tests

---

# Dependencies

`POIS-202B-access-breakdown-in-score-panel.md`

---

# Referenced Documents

- `POIS-DATA-MODEL.md` — contact point model, provenance field, and uniqueness constraint.

---

# Acceptance Criteria

- [ ] `addContactPoint` rejects a contact point submitted without provenance.
- [ ] A contact point with `pattern_inferred` provenance can be stored but is excluded from the
      outreach-eligibility gate.
- [ ] Attempting to add a duplicate `(personId, type, value)` is rejected by the uniqueness
      constraint.
- [ ] Contact points display on the workbench with their provenance visible.

---

# Validation

```
npm test -- contact-point
```

---

# Rollback

Hide the contact point form and display from the workbench.

---

# Expected Diff Size

Small.

---

# Estimated Time

60 minutes.

---

# Next Story

`POIS-204-person-facts.md`
