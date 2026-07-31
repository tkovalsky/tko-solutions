## Story Metadata

Milestone:
M1

Parent Task:
POIS-106

Story:
POIS-106B

Depends On:
POIS-106A

Blocks:
POIS-107

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

**Business objective:** Ensure every opportunity tells Todd the single next thing to do, with a
time estimate, the moment it's created.

**User story:** As Todd, every opportunity I look at shows me exactly one next action and how
long it takes — I never have to guess what to do next.

**Commercial outcome:** This closes the loop from "an opportunity exists" to "I know what to do
about it," which is the core operator promise of the system.

---

# Scope

**Included:**
- Next-action display on the intake review screen, rendering the output of `next-action.ts`
  (built in POIS-106A).
- Creation of the next action wired into the promote flow (`promoteSignal`, built in POIS-104B),
  so every promoted opportunity gets exactly one `open` next action.

**Excluded:**
- No changes to the derivation table itself (built in POIS-106A).

---

# Files Expected

- `src/app/tif/oi/intake/page.tsx`
- `src/app/tif/oi/intake/actions.ts`

---

# Dependencies

`POIS-106A-next-action-derivation-table.md`

---

# Referenced Documents

- None beyond the `next-action.ts` output shape from POIS-106A.

---

# Acceptance Criteria

- [ ] Every newly promoted opportunity has exactly one `open` next action with a time estimate,
      verified by test.
- [ ] The next-action display renders on the intake review screen for any opportunity.
- [ ] Manual test: promoting an opportunity results in exactly one next action with a time
      estimate, visible immediately.
- [ ] 100% of created opportunities have exactly one open next action.
- [ ] This is the final letter in the POIS-106 chain — the capability is now visible and usable
      by Todd.

---

# Validation

```
npm test
npm run build
```

---

# Rollback

Hide the next-action display from the intake page. Next-action rows already created by promotion
are harmless and require no cleanup.

---

# Expected Diff Size

Small.

---

# Estimated Time

45 minutes.

---

# Next Story

`POIS-107-pipeline-list.md`
