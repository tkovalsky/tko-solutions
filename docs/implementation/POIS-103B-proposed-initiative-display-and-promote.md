## Story Metadata

Milestone:
M1

Parent Task:
POIS-103

Story:
POIS-103B

Depends On:
POIS-103A

Blocks:
POIS-104A

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

**Business objective:** Show Todd, visually and unambiguously, when three signals at one company
mean something one signal does not — and let him promote that inference into a real initiative.

**User story:** As Todd, when the system detects a cluster of related signals at an account, I see
a clearly-marked proposed initiative (dashed border, confidence chip) with the supporting signals
listed and likely owner roles named — never guessed names.

**Commercial outcome:** This turns scattered signals into a single trackable initiative Todd can
act on, instead of requiring him to notice the pattern himself.

---

# Scope

**Included:**
- The proposed-initiative block on the intake review screen: dashed border, an
  `inferred · 0.88`-style confidence chip, a list of supporting signals with dates and source
  links, and likely owner roles (roles only, never names).
- Wiring to create `OiInitiative` and `OiInitiativeSignal` rows when Todd promotes a proposed
  initiative.

**Excluded:**
- No AI-generated narrative for the initiative (explicitly excluded from this milestone; handled
  in a later Milestone-2 story).
- No changes to the clustering algorithm itself (built in POIS-103A).
- No opportunity classification or promotion (POIS-104A/104B).

---

# Files Expected

- `src/app/tif/oi/intake/page.tsx`
- `src/app/tif/oi/intake/actions.ts`

---

# Dependencies

`POIS-103A-initiative-inference-clustering.md`

---

# Referenced Documents

- None beyond the `initiative-inference.ts` output shape from POIS-103A.

---

# Acceptance Criteria

- [ ] A proposed initiative appears whenever at least one Tier 1 signal is part of the cluster.
- [ ] A proposed initiative never appears for a Tier 2 signal alone.
- [ ] The inferred styling (dashed border, confidence chip) is visually distinct from confirmed
      content elsewhere on the page.
- [ ] Supporting signals are listed with dates and source links.
- [ ] Likely owner roles are shown; no person names are fabricated or guessed.
- [ ] Promoting a proposed initiative creates `OiInitiative` and `OiInitiativeSignal` rows.
- [ ] Manual test: pasting three related signals at one account causes the third to propose a
      0.88-confidence initiative citing all three.
- [ ] This is the final letter in the POIS-103 chain — the capability is now visible and usable
      by Todd.

---

# Validation

```
npm test
npm run build
```

---

# Rollback

Hide the proposed-initiative block on the intake page. Any `OiInitiative`/`OiInitiativeSignal`
rows already created by promotion can be left in place or deleted independently.

---

# Expected Diff Size

Medium.

---

# Estimated Time

90 minutes.

---

# Next Story

`POIS-104A-classify-opportunity-rules.md`
