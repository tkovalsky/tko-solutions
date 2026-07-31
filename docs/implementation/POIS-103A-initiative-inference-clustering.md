## Story Metadata

Milestone:
M1

Parent Task:
POIS-103

Story:
POIS-103A

Depends On:
POIS-102B

Blocks:
POIS-103B

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

**Business objective:** Recognize, deterministically, when multiple signals at one company add up
to something a single signal does not — before exposing that inference to Todd.

**User story:** As Codex, I need the clustering algorithm to correctly group signals into
candidate initiatives and compute confidence, so the display story that follows (POIS-103B) has
correct data to render.

**Commercial outcome:** None directly yet — not yet user-visible. Surfaced in POIS-103B.

---

# Scope

**Included:**
- `src/lib/opportunity-intelligence/intelligence/initiative-inference.ts` — deterministic
  clustering only, per `POIS-SCORING-AND-DECISION-MODEL.md` §3.3:
  - Cluster signals at the same account within a 90-day window sharing at least one domain tag.
  - Compute confidence from the fixed table in §3.3.
  - Apply decay of −0.10 per 90 days, floored at 0.20.
  - Auto-propose only when confidence is ≥ 0.45.
  - Generate a deterministic name of the form `{Account} — {dominant tag} initiative`.

**Excluded:**
- No UI. No dashed-border/chip rendering, no supporting-signals list — that is POIS-103B.
- No AI-generated narrative (explicitly out of scope for this milestone; a later Milestone-2
  story handles that).
- No opportunity classification (POIS-104A).

---

# Files Expected

- `src/lib/opportunity-intelligence/intelligence/initiative-inference.ts`

---

# Dependencies

`POIS-102B-signal-tier-display.md`

---

# Referenced Documents

- `POIS-SCORING-AND-DECISION-MODEL.md` §3.3 (initiative confidence table and clustering rules
  only).

---

# Acceptance Criteria

- [ ] Every confidence row in §3.3 is reproduced exactly by tests.
- [ ] A single Tier 2 signal alone never proposes an initiative (explicit test).
- [ ] The 90-day clustering window boundary is correct at 89, 90, and 91 days.
- [ ] Confidence decay (−0.10 per 90 days, floor 0.20) is correct.
- [ ] When tags overlap with an existing initiative, the algorithm attaches to it rather than
      creating a new one.
- [ ] Not yet user-visible — surfaced in POIS-103B.

---

# Validation

```
npm test
```

---

# Rollback

Delete `initiative-inference.ts`. No persisted state depends on it yet.

---

# Expected Diff Size

Small.

---

# Estimated Time

75 minutes.

---

# Next Story

`POIS-103B-proposed-initiative-display-and-promote.md`
