## Story Metadata

Milestone:
M1

Parent Task:
POIS-101

Story:
POIS-101C

Depends On:
POIS-101B

Blocks:
POIS-102A

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

**Business objective:** Make the intake page actually useful — Todd needs to see, in seconds,
what the system extracted from a pasted source and exactly which quote backs each fact, or he
will not trust it enough to use it daily.

**User story:** As Todd, I paste a job posting into the intake form built in POIS-101B and
immediately see what the system extracted, with the exact quote behind each fact. If I paste
something I've already captured, I'm told so instead of getting a silent duplicate. If I paste too
little, I'm told it's too short.

**Commercial outcome:** This is the first moment the system produces intelligence Todd can act
on — the entry point for every opportunity that follows.

---

# Scope

**Included:**
- Extend `intake/ingest.ts` to return facts and gaps alongside its existing return value, while
  preserving every existing guarantee: transactional behavior, hash-based idempotency, verified
  source offsets, override preservation, gap reconciliation, and append-then-repoint snapshot
  behavior.
- Wire the intake page (built in POIS-101B) to display: a facts table (field, value, confidence,
  click-to-reveal exact source quote); a duplicate-source notice with a "capture anyway" option
  when the same source hash already exists; and a "Too short to extract from" error when content
  is under 200 characters.

**Excluded:**
- No signal tier classification or display (POIS-102A/102B).
- No initiative inference (POIS-103A/103B).
- No opportunity classification or promotion (POIS-104A/104B).
- No changes to the 4-field form itself beyond what's needed to render the new results below it.

---

# Files Expected

- `src/lib/opportunity-intelligence/intake/ingest.ts`
- `src/app/tif/oi/intake/page.tsx`
- `src/app/tif/oi/intake/actions.ts`

---

# Dependencies

`POIS-101B-intake-capture-form.md`

---

# Referenced Documents

- Existing `intake/ingest.ts` implementation (read only this file — not the surrounding intake
  module) to confirm the guarantees being preserved: transactional writes, hash idempotency,
  verified offsets, override preservation, gap reconciliation, append-then-repoint snapshots.

---

# Acceptance Criteria

- [ ] Pasting valid content produces a facts table where every fact links to an exact source
      quote (click-to-reveal).
- [ ] Pasting a duplicate source (same hash) shows the existing-source notice with a "capture
      anyway" action, and does not silently create a second source.
- [ ] Pasting content under 200 characters shows "Too short to extract from" and does not attempt
      extraction.
- [ ] Extraction returns facts with verified offsets; an offset mismatch throws rather than
      silently returning bad data.
- [ ] All pre-existing `ingest.ts` guarantees (transactional, hash idempotency, override
      preservation, gap reconciliation, append-then-repoint snapshots) still hold — covered by
      tests.
- [ ] Manual test: pasting a real job posting shows extracted facts in under 5 seconds, and the
      whole capture takes under 2 minutes.
- [ ] This is the final letter in the POIS-101 chain — the full vertical slice (schema, service,
      route, UI, tests) is complete and user-visible.

---

# Validation

```
npm test
npm run build
```

---

# Rollback

Revert the `intake/ingest.ts` extension and the intake page/actions changes back to their
POIS-101B state. Delete `/tif/oi/*` entirely if needed — `/tif/opportunities/sources` (the
pre-existing route) continues to work unaffected.

---

# Expected Diff Size

Medium.

---

# Estimated Time

90 minutes.

---

# Next Story

`POIS-102A-classify-signal-function.md`
