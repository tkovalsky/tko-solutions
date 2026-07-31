## Story Metadata

Milestone:
M0

Parent Task:
POIS-007

Story:
POIS-007B

Depends On:
POIS-007A

Blocks:
POIS-008

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

**Business objective:** Add the three access-score components the target scoring model
requires that didn't exist in the old pursuit scorer, without disturbing any ported fixture's
score.

**User story:** As Todd, I need warm-path history, role clarity, and contact reachability to
influence access scoring once they're known — but not before, so old fixtures keep scoring
identically.

**Commercial outcome:** None directly — precondition for POIS-202 (access score wired into
ranking) two milestones later.

---

# Scope

**Included:** Add the three new components from `POIS-SCORING-AND-DECISION-MODEL.md` §6 (warm
path, role clarity, contact reachability) to `scoreStakeholderAccess()` as **optional inputs
defaulting to 0**, so every fixture ported in POIS-007A continues to score identically when
these inputs are omitted.

**Excluded:** Do not wire this into the composite ranking yet — that's POIS-202. Do not modify
any of the ported components from POIS-007A.

---

# Files Expected

- `commercial/score/access.ts`
- `commercial/score/access.test.ts`

---

# Dependencies

`POIS-007A-port-stakeholder-access-score.md`

---

# Referenced Documents

- `POIS-SCORING-AND-DECISION-MODEL.md` §6 only.

---

# Acceptance Criteria

- [ ] Each of the three new components is tested in isolation.
- [ ] All POIS-007A fixtures still produce identical scores when the new inputs are omitted
      (default 0).
- [ ] DNC hard filter still asserted and unaffected.

---

# Validation

```
npm test
```

---

# Rollback

Revert the three new component additions; POIS-007A's port is unaffected.

---

# Expected Diff Size

Small.

---

# Estimated Time

45 minutes.

---

# Next Story

`POIS-008-backfill-pursuits.md`
