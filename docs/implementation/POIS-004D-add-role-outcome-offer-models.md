## Story Metadata

Milestone:
M0

Parent Task:
POIS-004

Story:
POIS-004D

Depends On:
POIS-004C

Blocks:
POIS-004E

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

**Business objective:** Add the models that represent what Todd is selling and what happened
when a pursuit ended — needed before offers can be seeded or outcomes recorded.

**User story:** As Codex, I need `OiRoleProfile`, `OiOutcome`, `OiOffer`, `OiProofItem`, and
`OiOpportunityProof` in the schema so the offer-library and outcome stories (Milestones 2–4)
have somewhere to write.

**Commercial outcome:** None directly — schema-only.

---

# Scope

**Included:** Add to `prisma/schema.prisma`:
- `OiRoleProfile`
- `OiOutcome`
- `OiOffer`
- `OiProofItem`
- `OiOpportunityProof`

Per `POIS-DATA-MODEL.md` §4. This story adds `OiOffer` as new-shaped for this schema pass; the
six §9.9 enrichment columns on `OiOffer` are added later in
`POIS-005D-remove-blocking-constraints.md` — do not add them here, add only the base model as
§4 defines it.

**Excluded:** No enrichment columns from §9.9. No changes to `OiOpportunity`. No migration yet.

---

# Files Expected

- `prisma/schema.prisma`

---

# Dependencies

`POIS-004C-add-stakeholder-action-models.md`

---

# Referenced Documents

- `POIS-DATA-MODEL.md` §4 (only the five models named above).

---

# Acceptance Criteria

- [ ] `npx prisma validate` succeeds.
- [ ] All five models exist with the fields and relations specified in §4.
- [ ] `OiOffer` has no §9.9 enrichment columns yet (those land in POIS-005D).

---

# Validation

```
npx prisma validate
```

---

# Rollback

Revert the five model additions.

---

# Expected Diff Size

Medium.

---

# Estimated Time

60 minutes.

---

# Next Story

`POIS-004E-add-decision-campaign-playbook-models.md`
