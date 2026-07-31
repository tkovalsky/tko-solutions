## Story Metadata

Milestone:
M2

Parent Task:
POIS-210

Story:
POIS-210B

Depends On:
POIS-210A

Blocks:
POIS-301

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

**Business objective:** Let Todd see which campaigns an opportunity belongs to and view a
rolled-up view of probability-weighted and estimated value across each campaign.

**User story:** As Todd, I want to see campaign badges on an opportunity and a
`/tif/oi/campaigns` page that rolls up PE and EV per campaign, so I can track campaign
performance at a glance.

**Commercial outcome:** Gives campaign-level visibility into pipeline value, supporting
portfolio-level decisions rather than only opportunity-level ones. This closes Milestone 2.

---

# Scope

**Included:**
- Campaign badges on the workbench, reflecting an opportunity's many-to-many campaign
  membership.
- `/tif/oi/campaigns` rollup page showing, per campaign, aggregated PE (probability-weighted
  estimate) and EV (estimated value).

**Excluded:**
- No playbook or checklist changes — that is a separate, unrelated capability (POIS-210A,
  already complete).
- No changes to `deriveNextAction()` or scoring internals — this story only aggregates existing
  per-opportunity values.

---

# Files Expected

- Campaign badge component on the workbench (path determined during implementation)
- `/tif/oi/campaigns` rollup page (path determined during implementation)
- Corresponding tests

---

# Dependencies

`POIS-210A-playbook-selector-and-checklist.md`

---

# Referenced Documents

- `POIS-DATA-MODEL.md` — campaign membership model (many-to-many).
- `POIS-OPERATOR-UX.md` — campaign badges and rollup page section.

---

# Acceptance Criteria

- [ ] Campaign membership is many-to-many — an opportunity can belong to multiple campaigns and
      a campaign can have multiple opportunities, covered by test.
- [ ] Campaign badges render on the workbench for each opportunity's campaign memberships.
- [ ] `/tif/oi/campaigns` rolls up PE and EV per campaign correctly.

---

# Validation

```
npm test -- campaign
```

---

# Rollback

Hide campaign badges from the workbench and remove the `/tif/oi/campaigns` route.

---

# Expected Diff Size

Medium.

---

# Estimated Time

75 minutes.

---

# Next Story

`POIS-301` (first story of Milestone 3)
