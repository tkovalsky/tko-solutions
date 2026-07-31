## Story Metadata

Milestone:
M0

Parent Task:
POIS-003

Story:
POIS-003

Depends On:
POIS-001

Blocks:
POIS-004A

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

**Business objective:** Make the new scoring thresholds ($225K FTE floor, $300K income target)
available as a named, versioned profile without disturbing any historical score that used v1.

**User story:** As Codex, I need a `todd-v2` capability profile so later scoring stories have
somewhere to read thresholds from.

**Commercial outcome:** None directly — precondition for every later scoring story.

---

# Scope

**Included:** Add `TODD_CAPABILITY_PROFILE_V2` to `capability-profile.ts` per
`POIS-SCORING-AND-DECISION-MODEL.md` §4, including the `thresholds` object
(`fteCompFloor: 225000`, `targetAnnualIncome: 300000`, and the rest of §4).

**Excluded:** Do not change or remove the v1 export — historical snapshots must stay
byte-reproducible. Do not change any scoring function; this story only adds a data constant.

---

# Files Expected

- `capability-profile.ts` (wherever v1 currently lives — same file)
- `capability-profile.test.ts`

---

# Dependencies

`POIS-001-reorganize-module-layout.md`

---

# Referenced Documents

- `POIS-SCORING-AND-DECISION-MODEL.md` §4 only.

---

# Acceptance Criteria

- [ ] Both `TODD_CAPABILITY_PROFILE_V1` and `_V2` are exported.
- [ ] v1 is byte-identical to its pre-story value (test asserts this).
- [ ] v2 is a superset of v1's domains.
- [ ] `thresholds.fteCompFloor === 225000`.
- [ ] `thresholds.targetAnnualIncome === 300000`.

---

# Validation

```
npm test
npm run build
```

---

# Rollback

Remove the v2 export; v1 is untouched.

---

# Expected Diff Size

Small.

---

# Estimated Time

45 minutes.

---

# Next Story

`POIS-004A-add-core-enums.md`
