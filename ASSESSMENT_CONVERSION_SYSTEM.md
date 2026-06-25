# Assessment Conversion System

**Purpose:** Define the conversion infrastructure — landing page, intake form, routing,
follow-up, scheduling, qualification, and lightweight CRM/pipeline — that turns interest in
the **Operational Recovery Assessment** (Offer 0) into a booked, paid engagement.

**This is an operating-process specification, not software.** No code is implemented here.
It defines *what the process must do* so website and sales work can be built against it.

**Alignment:** Supports the [Recovery Assessment Playbook](content/offers/recovery-assessment/RECOVERY_ASSESSMENT_PLAYBOOK.md)
and the Stage 1 success metric (first paid assessment) in
[`CURRENT_REALITY.md`](CURRENT_REALITY.md). Note the meta-point: TKO's own conversion motion
should embody the thesis it sells — a governed `signal → qualify → prioritize → human
approval → action` flow, not a lead pile.

---

## Landing Page

### Required Sections

1. **Hero** — the problem in the buyer's words: "Your operation runs on a few key people. When they're out, it stalls." CTA: *Book an Operational Recovery Assessment.*
2. **The pattern** — the "human API" failure mode (links conceptually to Story 1); make the buyer recognize themselves.
3. **What the assessment is** — 1 week, fixed scope, the six deliverables, the executive briefing. Set price expectation ($5K–$8K).
4. **Proof block** — RachelOS as the live, deployed Operational Knowledge System (screenshots from the Visual Asset Master Plan: Queue, Digest, Needs-Rachel). "Deployed, runs daily, human-approved."
5. **Who it's for** — the target titles from the playbook; honest disqualifiers implied.
6. **What you walk away with** — the executive briefing + the highest-leverage next move.
7. **The path** — Assessment → Diagnostic → Build → Advisory (set expectation, no pressure).
8. **FAQ** — timeline, access required, confidentiality, what happens after.
9. **Primary CTA (repeated)** — the intake form / scheduling.

### Form Fields

Keep minimal to reduce friction; capture enough to qualify and route.

**Required:**
- Name
- Work email
- Company
- Role / title
- What's prompting this now? (free text — captures the trigger event)

**Optional (improves routing/qualification):**
- Team or workflow under pressure (free text)
- Company size band (select)
- "Who is the person everyone routes through?" (free text — the human-API tell)
- How did you hear about TKO? (referral source)
- Preferred timeframe (select: now / this quarter / exploring)

**Hidden/captured:** referral source / UTM, page, timestamp.

---

## Lead Routing

A signal-in → governed-action flow (mirrors the TKO framework):

1. **Intake** — every submission normalized into one record (the "signal").
2. **Auto-acknowledge** — immediate confirmation to the submitter (see Follow-Up Sequence).
3. **Qualify** — apply Qualification Rules (below) to tag **Fit / Warm-Healthcare / Nurture / Disqualify**.
4. **Prioritize** — rank by fit × trigger strength × timeframe (the "who needs attention now" of the sales pipeline).
5. **Human approval** — founder reviews before any sales outreach goes out (the human-in-the-loop gate; no automated selling).
6. **Action** — founder sends the personalized first response and scheduling link.
7. **Track** — record stage + next action in the pipeline (below).

Routing rules:
- **Fit** → fast-track to a discovery call; founder responds within 1 business day.
- **Warm-Healthcare** → only advance if warm/referral; use advisory framing, not case-study claims.
- **Nurture** → not ready/!fit-now → low-frequency follow-up; keep the trigger on file.
- **Disqualify** → polite decline or referral out; do not enter active pipeline.

---

## Follow-Up Sequence

Human-approved, not a drip blast. Cadence (business days):

- **T+0 (automatic):** acknowledgment — "received, here's what happens next, here's the RachelOS proof."
- **T+1 (founder, approved):** personalized response referencing their stated trigger; scheduling link for a 30-min discovery call.
- **T+3 (if no booking):** one nudge + a relevant proof asset (a story or RachelOS evidence matching their trigger).
- **T+7 (if no response):** final touch for now → move to Nurture with the trigger recorded.
- **Post-discovery call:** follows the Playbook Follow-Up Process (24h briefing-of-intent, day-3, day-7, day-14).

All sales sends pass through the founder (the human-approval gate). No fully automated outbound.

---

## Scheduling Flow

- Single CTA → scheduling for a **30-minute discovery call** (not the assessment itself).
- Discovery call qualifies + frames the assessment; assessment is booked *after* mutual fit.
- On booking: send confirmation + a 3-question pre-call form (what's prompting this / what would break if your key person were out / what have you already tried).
- Buffer and reschedule handling defined so the founder controls calendar load.
- After discovery → if proceeding, send assessment scope + start date + invoice terms ($5K–$8K, 1 week).

---

## Qualification Rules

Tag each lead using simple, explicit rules:

| Signal | Fit | Warm-Healthcare | Nurture | Disqualify |
|---|---|---|---|---|
| Role | COO/VP Ops, VP Rev/CS, PE operating partner, owner-operator | Healthcare ops leader | Adjacent/unclear | IC with no authority |
| Trigger present | Clear trigger event | Clear trigger | Vague | None |
| Source | Warm/referral or strong inbound | **Warm/referral required** | Cold inbound | Spam/vendor pitch |
| Intent | Wants to fix a real stall | Same | "Just researching" | Wants cheap tool-wiring / SaaS |
| Timeframe | Now / this quarter | Now / this quarter | Exploring | n/a |

**Hard gates:**
- Healthcare prospects are **Fit** only when warm/referral — otherwise Warm-Healthcare with advisory framing.
- Anyone seeking commodity automation, model-selection, staff-aug, or a platform commitment → **Disqualify** (per `CURRENT_REALITY.md` constraints).

---

## CRM Requirements

Lightweight — capability requirements, not a product choice:

- **One record per contact**, deduped on email (and company where useful).
- **Captured fields:** identity, role, company, source/UTM, trigger event, qualification tag, stage, next action + due date, last touch, notes/transcript links.
- **Single source of truth** for "what's the next action on this lead and when" — the sales analog of the Canonical Queue.
- **Human-approval flag** on any outbound so nothing sends without founder review.
- **No automated selling**; the system surfaces and drafts, the founder approves and acts.
- Must export cleanly so a later, more capable system can ingest the history.

(TKO can dogfood its own thesis here, but the mission constraint stands: **define the
process, don't build the software.**)

---

## Contact Tracking Requirements

- Every touch logged with date, channel, and outcome.
- Each active lead always has exactly one **next action + due date** (no orphaned leads).
- Trigger event preserved permanently, so a Nurture lead can be re-engaged on its next trigger.
- Proof assets sent are tracked (which story / which RachelOS evidence), to avoid repetition and to learn what converts.
- Referral source tracked end-to-end (attribution for the warm network that drives Stage 1).

---

## Pipeline Stages

A linear, auditable pipeline aligned to the offer ladder:

1. **New** — submission received, not yet qualified
2. **Qualified** — tagged Fit / Warm-Healthcare
3. **Discovery booked** — 30-min call scheduled
4. **Discovery held** — call completed, fit confirmed
5. **Assessment proposed** — scope + price sent (Offer 0)
6. **Assessment won** — paid, scheduled *(→ Stage 1 success metric met)*
7. **Assessment delivered** — briefing readout completed
8. **Expansion proposed** — Diagnostic/Build proposed (Offer 1/2)
9. **Expansion won** — advanced down the ladder
10. **Nurture** — not now; trigger retained for re-engagement
11. **Closed-lost / Disqualified** — with reason recorded

**Stage discipline:** every lead sits in exactly one stage with one next action — the
pipeline is itself a small Operational Knowledge System, proving the thesis by example.
