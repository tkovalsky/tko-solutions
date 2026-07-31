## Story Metadata

Milestone:
M0

Parent Task:
POIS-007

Story:
POIS-007A

Depends On:
POIS-006D

Blocks:
POIS-007B

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

**Business objective:** Preserve the well-tuned pursuit-scoring logic byte-for-byte as it moves
from `OiPursuit` to stakeholder access scoring, so nothing tuned over time is silently lost in
the rename.

**User story:** As Todd, I need the existing scoring logic preserved exactly, not
reimplemented from memory.

**Commercial outcome:** None directly — this is a mechanical port. Zero design judgment is
required or wanted in this story; that's why it's separated from POIS-007B.

---

# Scope

**Included:** Create `commercial/score/access.ts`. Port **every** component and penalty from
`src/lib/oi.ts` **unchanged**: seniority points, budget/hiring/transformation/relationship
levels, source confidence, seniority gate (−20), authority gap (−8), missing source (−10),
stale role (−6), do-not-contact hard filter.

```ts
export function scoreStakeholderAccess(input: StakeholderAccessInput): StakeholderAccessResult;
// { score: number; components: ScoreComponent[]; warnings: string[]; policyVersion: string }
```

`src/lib/oi.ts` re-exports `scoreStakeholderAccess` for one release (do not delete the file).

**Excluded:** Do not add the three new components (warm path, role clarity, contact
reachability) — that is `POIS-007B`. Do not change `OI_STARTER_PEOPLE`. Do not delete
`src/lib/oi.ts`.

---

# Files Expected

- `commercial/score/access.ts`
- `commercial/score/access.test.ts`
- `src/lib/oi.ts` (re-export only, no logic change)

---

# Dependencies

`POIS-006D-add-indexes-and-checks.md`

---

# Referenced Documents

None beyond `src/lib/oi.ts` and `src/lib/oi.test.ts` themselves — this is a port, not a design
task.

---

# Acceptance Criteria

- [ ] Every test case in `src/lib/oi.test.ts` is ported to `access.test.ts` and produces an
      **identical numeric score** to the original.
- [ ] `src/lib/oi.ts` still exists and re-exports the new function.
- [ ] `OI_STARTER_PEOPLE` is unchanged.

---

# Validation

```
npm test
```

---

# Rollback

Revert; `src/lib/oi.ts` still holds the original implementation.

---

# Expected Diff Size

Medium.

---

# Estimated Time

75 minutes.

---

# Next Story

`POIS-007B-add-new-score-components.md`
