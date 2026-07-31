## Story Metadata

Milestone:
M3

Parent Task:
POIS-309

Story:
POIS-309

Depends On:
POIS-308B

Blocks:
POIS-401A

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

**Business objective:** Give Todd a structured starting point for writing a proposal — not
AI-generated prose, but a template and completeness checklist populated from real matched-offer
and evidence data, so he doesn't start from a blank page and doesn't accidentally skip a required
section.

**User story:** As Todd, when I'm ready to write a proposal for an opportunity, I want a
generated outline with the matched offer's deliverables, cited proof, a pricing placeholder, and
a checklist of what's still missing — with the actual prose left for me to write.

**Commercial outcome:** Speeds up proposal creation while keeping Todd fully in control of the
commercial language and pricing — the outline structures the work, it never speaks for him.

---

# Scope

**Included:**
- `proposal_outline` artifact kind: a template-and-checklist generator, explicitly **not** AI
  prose generation (per D-031's related decision D-026 establishing this artifact kind is
  structural, not generative).
- Sections in the outline: the matched offer's deliverables, cited proof (linked evidence),
  a pricing placeholder (unfilled — Todd fills in pricing), and a completeness checklist noting
  any missing required section.
- Display of the generated outline plus a generation button on the opportunity view.

**Excluded:**
- No AI-generated prose anywhere in the outline body — this distinguishes `proposal_outline` from
  `research_summary` / `talking_points` (POIS-303), which do use AI generation with a template
  fallback.
- No pricing logic or pricing recommendation — the pricing field is a placeholder only.
- Rule 8 note: the proposal outline is a document Todd edits and sends himself, outside this
  repo, exactly like the other artifact kinds. No email, messaging, social, or
  application-submission API call is introduced. Generating an outline is not sending a proposal.

---

# Files Expected

- `action/artifact-compose.ts` (extend to add `proposal_outline` generation)
- Display/button component on the opportunity view

---

# Dependencies

`POIS-308B-application-tracker-and-dual-track-prompt.md`

---

# Referenced Documents

- `docs/opportunity-intelligence/POIS-CODEX-TASKS.md` — POIS-309 section.
- `POIS-DECISIONS.md` — D-026 (proposal outline is template/checklist, not AI-generated prose).

---

# Acceptance Criteria

- [ ] The generated outline includes the matched offer's deliverables.
- [ ] The generated outline includes cited proof drawn from linked evidence.
- [ ] The generated outline includes an unfilled pricing placeholder.
- [ ] The generated outline includes a completeness checklist flagging any missing required
      section.
- [ ] No AI-generated prose appears anywhere in the outline body — a test asserts the compose
      function for `proposal_outline` does not call the AI provider at all.
- [ ] The outline and its generation button render on the opportunity view.

---

# Validation

```
npm run test -- artifact-compose
npm run typecheck
```

---

# Rollback

Hide the `proposal_outline` generation button; no migration to unwind.

---

# Expected Diff Size

Small.

---

# Estimated Time

60 minutes.

---

# Next Story

`POIS-401A` (first story of Milestone 4)
