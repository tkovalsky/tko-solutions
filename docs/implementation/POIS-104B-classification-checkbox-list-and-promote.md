## Story Metadata

Milestone:
M1

Parent Task:
POIS-104

Story:
POIS-104B

Depends On:
POIS-104A

Blocks:
POIS-105A

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

**Business objective:** Let Todd decide what a captured source actually becomes, including
promoting more than one opportunity type from a single source when that's genuinely what the
evidence supports.

**User story:** As Todd, I see each candidate opportunity type with its reason and, where a hard
filter disqualified it, the rule name and what it means in plain language (e.g. "comp max
$210,000 < $225,000 floor; keep as a consulting signal"). I can select which candidates to
promote, dismiss others with a required reason, or flag an account for watching.

**Commercial outcome:** This is the moment a captured source becomes a real, trackable
opportunity in the pipeline.

---

# Scope

**Included:**
- The classification checkbox list on the intake review screen, rendering the output of
  `classifyOpportunity` (built in POIS-104A): type, reason, and — where a hard filter fired — the
  rule name and plain-language explanation.
- `promoteSignal` server action: persists `OiInitiative` (if approved), one `OiOpportunity` per
  selected type, and `OiOpportunitySource` links.
- `dismissSignal` server action: requires a non-empty reason.
- `watchAccount` server action.

**Excluded:**
- No changes to `classify-opportunity.ts` itself.
- No score computation or display (POIS-105 chain).

---

# Files Expected

- `src/app/tif/oi/intake/page.tsx`
- `src/app/tif/oi/intake/actions.ts`

---

# Dependencies

`POIS-104A-classify-opportunity-rules.md`

---

# Referenced Documents

- `POIS-OPERATOR-UX.md` §18 (Worked Examples A and C, for the end-to-end manual test).

---

# Acceptance Criteria

- [ ] Each candidate displays its type and reason; disqualified candidates show the rule name and
      a plain-language explanation.
- [ ] Dismissing a candidate with an empty reason is rejected.
- [ ] `promoteSignal` persists `OiInitiative` (when approved), one `OiOpportunity` per selected
      type, and the corresponding `OiOpportunitySource` links.
- [ ] Worked Example A (from §18) produces two candidates with the FTE one disqualified.
- [ ] Worked Example C (from §18) produces no opportunity and sets an account watch.
- [ ] Manual test: Worked Examples A and C run end to end and match the documented outcomes.
- [ ] This is the final letter in the POIS-104 chain — the capability is now visible and usable
      by Todd.

---

# Validation

```
npm test
npm run build
```

---

# Rollback

Delete any `OiOpportunity` / `OiOpportunitySource` rows created during testing, and hide the
checkbox list and actions from the intake page.

---

# Expected Diff Size

Medium.

---

# Estimated Time

90 minutes.

---

# Next Story

`POIS-105A-score-axes-evidence-urgency.md`
