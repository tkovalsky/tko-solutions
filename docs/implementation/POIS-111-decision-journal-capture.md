## Story Metadata

Milestone:
M1

Parent Task:
POIS-111

Story:
POIS-111

Depends On:
POIS-110D

Blocks:
POIS-112

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

**Business objective:** Record what Todd predicted at the moment he makes a call, so later he can
find out whether he was right. This was originally scheduled for Milestone 4, but a journal that
starts in week 5 has no record of weeks 1–4 — it is moved here so capture begins from day one.

**User story:** As Todd, when I make a decision (promote, dismiss, qualify, disqualify, close, or
pause), a modal shows my prediction — pre-filled from the current score — and asks me for a
reason and a confidence level, in a few seconds.

**Commercial outcome:** This is the foundation for later self-correction: without a prediction
captured at decision time, there is nothing to check the outcome against.

---

# Scope

**Included:**
- `src/lib/opportunity-intelligence/action/decision.ts` — persists a decision record with
  `scoreIdAtDecision`, the prediction fields (expected value, expected effort hours, expected
  probability) pre-filled from the current `OiScore`, plus Todd-supplied `reason` (required),
  `confidence` (low/medium/high), and optional `expectedOutcome`.
- An inline capture modal wired into each of the six existing decision points: promote, dismiss,
  qualify, disqualify, close, pause.

**Excluded:**
- No review, no delta computation, no lessons-learned — those remain a Milestone-4 story.

---

# Files Expected

- `src/lib/opportunity-intelligence/action/decision.ts`
- Decision-point call sites for promote, dismiss, qualify, disqualify, close, and pause
  (whichever existing files contain these six actions — determined during implementation).
- A shared decision-capture modal component.

---

# Dependencies

`POIS-110D-today-actions.md`

---

# Referenced Documents

- None beyond the field list specified in this story (prediction fields, reason, confidence,
  optional expected outcome). No new document sections are required.

---

# Acceptance Criteria

- [ ] The modal pre-fills prediction fields (expected value, expected effort hours, expected
      probability) from the current `OiScore`, read-only.
- [ ] Submitting without a `reason` is rejected.
- [ ] `scoreIdAtDecision` is set on every decision record.
- [ ] Reversing a decision creates a new decision row rather than editing the existing one.
- [ ] Every one of the six decision-point actions (promote, dismiss, qualify, disqualify, close,
      pause) opens the modal.
- [ ] Manual test: capture completes in 20 seconds or less, measured directly.

---

# Validation

```
npm test
npm run build
```

---

# Rollback

Skip the modal at each of the six decision points; the underlying action still completes without
capturing a decision record.

---

# Expected Diff Size

Medium.

---

# Estimated Time

90 minutes.

---

# Next Story

`POIS-112-opportunity-timeline.md`
