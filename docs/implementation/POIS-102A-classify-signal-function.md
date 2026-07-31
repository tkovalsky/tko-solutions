## Story Metadata

Milestone:
M1

Parent Task:
POIS-102

Story:
POIS-102A

Depends On:
POIS-101C

Blocks:
POIS-102B

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

**Business objective:** Establish a deterministic, testable rule for how strongly a captured
source signals a real opportunity, before any UI shows it to Todd.

**User story:** As Codex, I need `classifySignal` to correctly tier and score every signal type
so the display story that follows (POIS-102B) has correct data to render.

**Commercial outcome:** None directly yet — Todd cannot see signal tiers until POIS-102B. This
story is not yet user-visible.

---

# Scope

**Included:**
- `src/lib/opportunity-intelligence/intake/classify-signal.ts` — a pure function implementing
  the exact contract below, per `POIS-SCORING-AND-DECISION-MODEL.md` §3.1–3.2:

```ts
export function classifySignal(input: {...}):
  { tier: OiSignalTier; signalType: OiSignalType; strength: number;
    confidence: number; domainTags: string[]; reasons: string[] };
```

- Persist `OiSignal` on capture — wire the persistence call into the ingest path built in
  POIS-101C, so every captured source gets a signal row.

**Excluded:**
- No UI. No tier display, no reason list rendering — that is POIS-102B.
- No initiative inference (POIS-103A).
- No changes to `intake/ingest.ts`'s fact/gap extraction behavior itself, only the addition of
  the signal-persistence call.

---

# Files Expected

- `src/lib/opportunity-intelligence/intake/classify-signal.ts`
- `src/lib/opportunity-intelligence/intake/ingest.ts` (persistence call only)

---

# Dependencies

`POIS-101C-ingest-returns-facts-and-gaps.md`

---

# Referenced Documents

- `POIS-SCORING-AND-DECISION-MODEL.md` §3.1–3.2 (signal tier and strength rules only).

---

# Acceptance Criteria

- [ ] All 20 signal types map to the correct tier per §3.1–3.2.
- [ ] Each strength modifier is correct in isolation (tested individually).
- [ ] Recency boundaries at 7, 30, and 90 days are handled correctly.
- [ ] An aggregator penalty is applied when the source URL host does not match
      `organization.domain`.
- [ ] Strength is clamped to the range 0–100 at both ends.
- [ ] `OiSignal` is persisted on every capture.
- [ ] Not yet user-visible — surfaced in POIS-102B.

---

# Validation

```
npm test
```

---

# Rollback

Remove the `OiSignal` persistence call from `ingest.ts` and delete `classify-signal.ts`.
`OiSignal` rows already written are harmless and can be left in place or truncated.

---

# Expected Diff Size

Small.

---

# Estimated Time

75 minutes.

---

# Next Story

`POIS-102B-signal-tier-display.md`
