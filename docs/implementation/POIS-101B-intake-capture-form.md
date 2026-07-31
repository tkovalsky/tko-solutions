## Story Metadata

Milestone:
M1

Parent Task:
POIS-101

Story:
POIS-101B

Depends On:
POIS-101A

Blocks:
POIS-101C

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

**Business objective:** Give Todd a working capture form before the extraction pipeline is wired
in, so the intake page exists and is testable independent of the extraction logic that follows in
POIS-101C.

**User story:** As Todd, I go to `/tif/oi/intake` and see a 4-field capture form I can submit —
even though it does not yet show me extracted facts (that lands in POIS-101C).

**Commercial outcome:** None directly — this is an intermediate checkpoint in the POIS-101 chain.
No fact extraction or signal classification happens here.

---

# Scope

**Included:**
- `src/app/tif/oi/intake/page.tsx` — the 4-field capture form (per the original intake fields:
  source content, source URL/reference, organization, and role/context — whatever the four
  fields are per the existing intake data model).
- `src/app/tif/oi/intake/actions.ts` — the server action(s) that submit the form, calling
  `intake/ingest.ts` **as it exists today**, prior to the POIS-101C extension. Do not modify
  `intake/ingest.ts` in this story.
- Zod validation on the server-action input, per M1 preconditions.
- Standard M1 route preconditions: `robots: noindex`, `export const dynamic =
  "force-dynamic"`.

**Excluded:**
- No facts table, no click-to-reveal source quote, no duplicate-source notice, no
  short-content error message — all of that is wired in POIS-101C once `ingest.ts` returns facts
  and gaps.
- No changes to `intake/ingest.ts` itself.
- No signal classification, no tier display (POIS-102A/102B).

---

# Files Expected

- `src/app/tif/oi/intake/page.tsx`
- `src/app/tif/oi/intake/actions.ts`

---

# Dependencies

`POIS-101A-oi-shell-and-nav.md`

---

# Referenced Documents

- None required beyond this story file. The existing `intake/ingest.ts` function signature is the
  only external contract needed — read only that file's current exports, not the surrounding
  intake module.

---

# Acceptance Criteria

- [ ] `/tif/oi/intake` renders a form with exactly the four expected fields.
- [ ] Submitting the form calls the existing `intake/ingest.ts` without modification and without
      error on valid input.
- [ ] Invalid input is rejected by Zod validation with a visible error message.
- [ ] The route sets `robots: noindex` and `export const dynamic = "force-dynamic"`.
- [ ] Not yet user-visible as a complete capture workflow — no facts, gaps, or duplicate notice
      are shown to Todd yet. That completion happens in POIS-101C.

---

# Validation

```
npm test
npm run build
```

---

# Rollback

Delete `src/app/tif/oi/intake/page.tsx` and `src/app/tif/oi/intake/actions.ts`. No data was
created; rollback is a pure file deletion.

---

# Expected Diff Size

Small.

---

# Estimated Time

45 minutes.

---

# Next Story

`POIS-101C-ingest-returns-facts-and-gaps.md`
