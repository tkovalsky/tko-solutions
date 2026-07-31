## Story Metadata

Milestone:
M3

Parent Task:
POIS-302

Story:
POIS-302A

Depends On:
POIS-301

Blocks:
POIS-302B

Estimated PR Size:
Small

Expected Review Time:
5-10 minutes

Risk:
High

Breaking Change:
No

Migration:
No

Feature Flag:
No

---

# Story

**Business objective:** Todd must never approve an outreach artifact that contains a claim he
cannot actually support — a fabricated headcount, an invented person, an implied conversation
that never happened, or an implied referral that doesn't exist. This story builds the detection
logic; it is the highest-value test file in the entire milestone.

**User story:** As Todd, I want the system to catch unsupported claims in a draft before I ever
see it framed as ready, so I never accidentally send something I can't stand behind.

**Commercial outcome:** Protects TKO's credibility and Todd's personal reputation with
prospects — a single fabricated or unsupportable claim in outreach is a trust-destroying event.
This logic is the foundation every drafting story downstream (POIS-302B, POIS-304A/B) relies on.

---

# Scope

**Included:**
- `action/claim-validator.ts` — pure validation logic only, no UI.
- Detection for each of the six fixture cases:
  1. Fabricated headcount (a number not backed by any linked evidence).
  2. Invented person name (a name not present in any linked evidence or contact record).
  3. Unsupported "as we discussed" / implied-prior-conversation language with no corresponding
     `OiActivity` on record.
  4. Implied referral (language suggesting a mutual connection or introduction that isn't backed
     by evidence).
  5. Clean draft passes (no false positives on a fully-supported draft).
  6. Allowlisted numbers pass (numbers explicitly sourced from linked evidence, or otherwise
     allowlisted, do not trigger a false positive).
- The validator returns a structured list of unsupported claims (empty list = clean).

**Excluded:**
- No UI, no inline warnings display (that is POIS-302B).
- No blocking of approval (that enforcement point is POIS-304A's `approveArtifact`).
- No changes to the outreach gate (POIS-301).
- Rule 8 note: this validator never contacts, sends, or submits anything on Todd's behalf — it
  only inspects draft text against evidence records. It has no dependency on any email,
  messaging, social, or application-submission API.

---

# Files Expected

- `action/claim-validator.ts`
- Corresponding test file (e.g. `action/claim-validator.test.ts`) with all six fixture cases

---

# Dependencies

`POIS-301-outreach-gate.md`

---

# Referenced Documents

- `docs/opportunity-intelligence/POIS-CODEX-TASKS.md` — POIS-302 section (fixture descriptions).

---

# Acceptance Criteria

- [ ] Fabricated headcount is caught by the validator.
- [ ] Invented person name is caught.
- [ ] Unsupported "as we discussed" language is caught when no matching `OiActivity` exists.
- [ ] Implied referral language is caught.
- [ ] A fully clean, fully-supported draft produces zero flagged claims.
- [ ] Allowlisted / evidence-sourced numbers do not produce false positives.
- [ ] Validator is pure logic with no UI or side effects — it does not read from or write to any
      outbound communication API.

---

# Validation

```
npm run test -- claim-validator
npm run typecheck
```

---

# Rollback

Revert `action/claim-validator.ts` and its test file — no migration, no downstream data affected
since nothing yet calls this validator to block anything.

---

# Expected Diff Size

Small.

---

# Estimated Time

90 minutes.

---

# Next Story

`POIS-302B-claim-validator-inline-warnings.md`
