# RachelOS Screenshot Capture Plan

**Objective:** the minimum set of screenshots to make RachelOS proof *visible* across four uses
— (1) website proof, (2) case studies, (3) Recovery Assessment assets, (4) executive
presentations. Quality over quantity. Source routes verified in `rachel-realestate`
(`src/app/ops/`). Aligns to [RACHELOS_EVIDENCE_LIBRARY.md](RACHELOS_EVIDENCE_LIBRARY.md) and
[/VISUAL_ASSET_MASTER_PLAN.md](../../../VISUAL_ASSET_MASTER_PLAN.md).

**Target set: 9 screenshots.** Absolute minimum if time-constrained: the **3 P0** images.
Recommended baseline: **6 (P0 + P1)**. Full set: **9**.

---

## Capture standards (apply to every shot)

- **Redact all PII — non-negotiable.** RachelOS holds real relationship data. Replace or blur
  names, emails, phones, and addresses (use a consistent placeholder identity, e.g. "Sample
  Client"). A single un-redacted shot disqualifies the asset, especially for healthcare buyers.
- **Realistic, populated state.** Capture views with several entries — never an empty queue or
  a single record. The proof is a working book of relationships, not a demo stub.
- **Clean UI.** Light theme, no dev console, no error banners, no debug toolbars.
- **Consistent frame.** Fixed viewport (e.g. 1440px wide), retina/2x for print-clean PDF and
  deck use.
- **Two files per shot:** raw (unannotated) and annotated. Keep raw for re-annotation per use.
- **Annotation style:** one focal callout per image, a short caption, and at most 2–3
  highlights. Restraint reads as executive; clutter reads as marketing.

---

## P0 — Must-have (the conversion-grade trio; used in all four assets)

### 1. Canonical Queue
- **Screen / source:** `/ops/queue`
- **Why it matters:** the single headline image — one ranked, recomputed answer to "who needs
  attention now, and why." It proves the core claim (a *system of action*, not just record) in
  one frame.
- **Capability demonstrated:** Prioritization / decision support *(Priority stage)*.
- **Used in:** Website (hero proof) · Case study (centerpiece) · Assessment (illustrates the
  "trusted next action" outcome) · Executive deck (opening proof).
- **Annotation:** highlight the #1 ranked entry and its surfaced reason; label the freshness/
  health classes (Healthy / Aging / Stale / Critical); caption: *"One ranked list of who needs
  attention now — recomputed on every new signal."* Redact all identities.

### 2. Daily Digest (Daily Action Engine)
- **Screen / source:** rendered daily digest email (output of `/api/cron/run-all`, scheduled
  `0 11 * * *`); in-app equivalent `/ops/today`.
- **Why it matters:** strongest "this is real and running" signal — a deployed, scheduled daily
  artifact, not a mockup. Proves the action layer and the deployment claim simultaneously.
- **Capability demonstrated:** Action / workflow orchestration *(operationalized Priority)*.
- **Used in:** Website · Case study · Assessment · Executive deck.
- **Annotation:** label the three sections (Today's Focus / Do These Today / Next Up); callout:
  *"Delivered daily by a scheduled job (0 11 * * *) — operator-facing, never sent to the
  contacts."* Redact contact details.

### 3. Human Approval Surface ("Needs Rachel")
- **Screen / source:** `/ops/needs-rachel`
- **Why it matters:** the defining differentiator and the decisive image for skeptical or
  regulated buyers — AI drafts and surfaces; a human approves before anything goes out.
- **Capability demonstrated:** Human-approval loop / governed AI *(Human Approval stage)*.
- **Used in:** Website (lead differentiator) · Case study · Assessment (AI readiness /
  governance) · Executive deck.
- **Annotation:** highlight a draft in the pending-approval state and the approve/decline
  controls; caption: *"Nothing sends without human approval — enforced in the workflow, not
  promised in a deck."* Redact message content and PII.

---

## P1 — Strong supporting proof (recommended baseline; case study + assessment + exec)

### 4. Relationship Memory detail
- **Screen / source:** `/ops/leads` → relationship detail
- **Why it matters:** the key-person-dependency antidote made visible — situation, known facts,
  open questions, and a persistent timeline, all held by the system rather than one person's
  head. This is the literal "knowledge became operational memory" image.
- **Capability demonstrated:** Operational memory / knowledge capture *(Memory stage)*.
- **Used in:** Website (human-API proof) · Case study · Assessment (maps to the dependency-risk
  finding) · Executive deck.
- **Annotation:** call out the persistent timeline and the "known facts / open questions"
  blocks; caption: *"Institutional memory lives in the system, not in one person's head."*
  Redact identity.

### 5. Intelligence Gaps prompt
- **Screen / source:** relationship detail (gap prompt) — `intelligenceGaps.ts` output
- **Why it matters:** a rare, memorable differentiator — "the system that knows its blind
  spots," surfacing the single highest-value missing fact. Sticks in an executive's memory.
- **Capability demonstrated:** Proactive knowledge capture / gap-closing *(Facts stage)*.
- **Used in:** Website (differentiator) · Case study · Assessment ("what you don't know yet"
  framing) · Executive deck.
- **Annotation:** highlight the "ask this next" prompt; caption: *"The system surfaces what it
  does not know — and asks for the most valuable missing fact."* Redact.

### 6. System Health dashboard
- **Screen / source:** `/ops/system-health`
- **Why it matters:** observability = trusted execution. For technology and executive
  audiences, this proves a *monitored operating system*, not an unobservable black box —
  separating RachelOS from a one-off demo.
- **Capability demonstrated:** Operational visibility / self-monitoring *(Outcome stage)*.
- **Used in:** Case study (proves "trusted execution") · Assessment (operational risk /
  visibility) · Executive deck (technical credibility). *(Lower website weight.)*
- **Annotation:** highlight cron-run tracking and health/smoke-test status; caption: *"A
  self-monitoring operating system — runs are tracked and observable."* Minimal PII present.

---

## P2 — Depth (governance/provenance story; case study + exec, selective)

### 7. Lead Facts with source-authority labels
- **Screen / source:** relationship detail (facts with provenance) — `rie.ts`
- **Why it matters:** the "AI you can govern" proof — facts carry provenance, and human-entered
  facts supersede machine-extracted ones. Buyer-grade governance detail.
- **Capability demonstrated:** Governed facts / provenance + authority model *(Facts stage)*.
- **Used in:** Case study (governance/provenance story) · Assessment (AI readiness) · Executive
  deck (depth).
- **Annotation:** highlight a human-sourced fact overriding an AI-extracted one; label the
  source/authority tags; caption: *"Human facts outrank machine facts."* Redact values.

### 8. Outreach Draft detail (lifecycle + copy-safety)
- **Screen / source:** `/ops/needs-rachel` or `/ops/messages` → draft detail — `outreachDrafts.ts`

  explicit lifecycle (pending / sent / skipped / superseded) and a copy-safety check before
  approval.
- **Capability demonstrated:** Governed recommendation → approval → action *(Recommendation
  stage)*.
- **Used in:** Case study · Assessment (folds under governance) · Executive deck.
- **Annotation:** highlight the draft's lifecycle state and the copy-safety indicator; caption:
  *"Every outward message is a governed, reviewed state transition."* Redact content.

### 9. Journey / Lifecycle state with recommendation
- **Screen / source:** relationship detail (state + derived recommendation) — `journeyIntelligence.ts`
- **Why it matters:** shows the conversion from facts to a current read to a specific next step
  — the decision-support mechanism in one frame.
- **Capability demonstrated:** State → Recommendation / decision support *(State stage)*.
- **Used in:** Case study · Assessment (optional) · Executive deck (optional).
- **Annotation:** highlight the derived state and the recommendation it produces; caption:
  *"Facts become state; state drives the recommended next step."* Redact.

---

## Use-case coverage matrix

| # | Screenshot | Priority | Website | Case study | Assessment | Exec deck |
|---|---|---|---|---|---|---|
| 1 | Canonical Queue | P0 | ✅ | ✅ | ✅ | ✅ |
| 2 | Daily Digest | P0 | ✅ | ✅ | ✅ | ✅ |
| 3 | Human Approval (Needs Rachel) | P0 | ✅ | ✅ | ✅ | ✅ |
| 4 | Relationship Memory | P1 | ✅ | ✅ | ✅ | ✅ |
| 5 | Intelligence Gaps | P1 | ✅ | ✅ | ✅ | ✅ |
| 6 | System Health | P1 | ➖ | ✅ | ✅ | ✅ |
| 7 | Lead Facts (provenance) | P2 | ➖ | ✅ | ✅ | ✅ |
| 8 | Outreach Draft (lifecycle) | P2 | ➖ | ✅ | ➖ | ✅ |
| 9 | Journey state → recommendation | P2 | ➖ | ✅ | ➖ | ➖ |

---

## Capture sequencing

1. **Capture the 3 P0 shots first.** They unblock the most assets at once — the Recovery
   Assessment one-pager's proof strip, the RachelOS flagship case study centerpiece, and the
   opening of any executive deck all depend on Queue + Digest + Approval.
2. **Add the 3 P1 shots** to complete the case study and the assessment governance/visibility
   story.
3. **Add the 3 P2 shots** only for the long-form case study and deep-dive decks.

**Definition of done:** each shot has a redacted raw version + an annotated version, captured
at retina resolution, with PII verified absent by a second look before any external use.
