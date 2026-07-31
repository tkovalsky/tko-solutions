## Story Metadata

Milestone:
M3

Parent Task:
POIS-303

Story:
POIS-303

Depends On:
POIS-302B

Blocks:
POIS-304A

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

**Business objective:** Give Todd two ungated, low-risk artifact kinds — `research_summary` and
`talking_points` — that compose directly from real evidence, so he has something useful to
generate before the higher-stakes gated drafts (POIS-304A/B) come online.

**User story:** As Todd, I want to generate a research summary or talking points for an
opportunity directly from the evidence I've captured, so I can prepare for a conversation without
writing it from scratch.

**Commercial outcome:** First tangible artifact-generation capability in the milestone — proves
the evidence-to-artifact pipeline end-to-end on the two artifact kinds that carry no outreach
risk (they are not sent to anyone; they are for Todd's own use).

---

# Scope

**Included:**
- `action/artifact-compose.ts` — a compose function generating `OiArtifact` records for exactly
  two kinds: `research_summary` and `talking_points`.
- Both kinds are "ungated" — they do not go through `canPrepareOutreach()` (POIS-301) or the
  claim validator (POIS-302A), since they are not outreach and are not sent anywhere.
- `contextSnapshot` is recorded on generation, capturing what evidence was used.
- AI-unavailable fallback: when generation can't call the AI provider, degrade gracefully to a
  structured template (headings and evidence bullet points) rather than failing.
- Display of both artifact kinds on the opportunity view.

**Excluded:**
- No `email_draft` or `linkedin_draft` generation (POIS-304A/B) — those are gated and carry the
  approval/claim-validation requirements.
- No `approveArtifact` action or approval workflow — these two kinds are informational, not
  sent, so there is nothing to approve or send.
- No schema/migration work — the `OiArtifact` table already shipped in POIS-004E.
- Rule 8 note: neither artifact kind is ever transmitted by this code. `OiArtifact` has no
  `sentAt` field, and this story adds no email, messaging, social, or application-submission API
  call of any kind.

---

# Files Expected

- `action/artifact-compose.ts`
- Display component(s) on the opportunity view for `research_summary` and `talking_points`

---

# Dependencies

`POIS-302B-claim-validator-inline-warnings.md`

---

# Referenced Documents

- `docs/opportunity-intelligence/POIS-CODEX-TASKS.md` — POIS-303 section.
- `POIS-004E` migration notes (table already exists — for field reference only, do not modify
  the schema).

---

# Acceptance Criteria

- [ ] Both `research_summary` and `talking_points` generate successfully from real linked
      evidence for a given opportunity.
- [ ] When the AI provider is unavailable, generation still succeeds by falling back to a
      structured template rather than erroring out.
- [ ] `contextSnapshot` is recorded on every generated artifact and reflects the evidence used.
- [ ] Both artifact kinds render on the opportunity view.
- [ ] Neither kind requires passing through `canPrepareOutreach()` or the claim validator.

---

# Validation

```
npm run test -- artifact-compose
npm run typecheck
```

Manual: trigger generation with the AI provider disabled/mocked-unavailable and confirm the
structured-template fallback renders.

---

# Rollback

Hide the generation buttons for `research_summary` and `talking_points` on the opportunity view;
no migration to unwind.

---

# Expected Diff Size

Medium.

---

# Estimated Time

90 minutes.

---

# Next Story

`POIS-304A-gated-draft-generation-and-approval.md`
