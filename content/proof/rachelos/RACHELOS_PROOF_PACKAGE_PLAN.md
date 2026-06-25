# RachelOS Proof Package Plan

**Objective:** the minimum set of proof artifacts that demonstrate RachelOS is a **real,
running operational system — not a concept** — to healthcare operations, transformation, and
technology leaders (Director/VP and above).

**Core principle:** this is a **proof package, not a product tour.** Each screen is selected to
*prove a specific claim* and sequenced to *build an argument*, not to walk through features. If
a screen does not move a skeptical executive from "interesting idea" to "this is operating
today," it does not belong here.

**Review basis (repository + audits):** ops routes verified directly in `rachel-realestate`
(`src/app/ops/`: `queue`, `needs-rachel`, `system-health`, `today`, `leads`, …); facts cross-checked
against [RACHELOS_EVIDENCE_LIBRARY.md](RACHELOS_EVIDENCE_LIBRARY.md) and the capability/audit
docs in `docs/capability-audit/`. Capture mechanics (framing, PII redaction, annotation detail)
live in [RACHELOS_SCREENSHOT_CAPTURE_PLAN.md](RACHELOS_SCREENSHOT_CAPTURE_PLAN.md) — this plan
defines *which proof, why, and in what order*.

---

## Which screens best demonstrate each capability

| Capability | Best screen (primary) | Supporting |
|---|---|---|
| **1. Operational memory** | Relationship Memory detail (`/ops/leads`) | Lead Facts with provenance |
| **2. Workflow orchestration** | Daily Digest / Daily Action Engine (`/api/cron/run-all` → `/ops/today`) | System Health (the orchestrated run, observable) |
| **3. Prioritization & decision support** | Canonical Queue (`/ops/queue`) | Journey state → recommendation |
| **4. Relationship intelligence** | Lead Facts / RIE (provenance + authority) | Intelligence Gaps; Journey state |
| **5. Human approval loops** | Human Approval surface (`/ops/needs-rachel`) | Outreach Draft lifecycle |

All five capabilities are covered by the P0 set below.

---

## P0 Screens — must capture (8)

> Prioritized for **this objective** — proving the system is real and operating. (This differs
> from the capture plan, which ranks by marketing weight; here **System Health is P0**, because
> "runs are tracked daily" is the strongest single answer to "is this real?")

### 1. Canonical Queue
- **Business capability:** prioritization & decision support — one ranked, recomputed answer to "who needs attention now, and why."
- **Why an executive cares:** it is the difference between a system of record and a system of action. Every leader recognizes the morning spent reconstructing priorities across tools; this replaces it with one defensible list.
- **Annotation/callout:** highlight the #1 entry + its reason and the freshness classes — *"Who needs attention now — recomputed on every signal."*

### 2. Daily Digest (Daily Action Engine)
- **Business capability:** workflow orchestration — the whole book operationalized into one daily artifact.
- **Why an executive cares:** proves the system *runs the work*, on a schedule, without someone assembling it. A deployed daily artifact is hard to dismiss as a concept.
- **Annotation/callout:** label Today's Focus / Do These Today / Next Up — *"Composed and delivered daily by a scheduled job (0 11 * * *)."*

### 3. Human Approval Surface ("Needs Rachel")
- **Business capability:** human approval loop — AI drafts and surfaces; a person approves before anything goes out.
- **Why an executive cares:** the governance answer. In any regulated or stakes-sensitive operation, "the AI won't act without a human" is the precondition for adoption.
- **Annotation/callout:** highlight a pending item + approve/decline controls — *"Nothing sends without human approval — enforced in code."*

### 4. Relationship Memory detail
- **Business capability:** operational memory — situation, known facts, open questions, and timeline held by the system across time and source.
- **Why an executive cares:** this is the key-person-dependency antidote made visible. It shows institutional knowledge surviving outside one person — the exact risk leaders worry about.
- **Annotation/callout:** highlight the persistent timeline + known-facts block — *"Institutional memory lives in the system, not one person's head."*

### 5. Lead Facts with source authority
- **Business capability:** relationship intelligence — governed facts with provenance, where human-entered facts supersede machine-extracted ones.
- **Why an executive cares:** "AI you can govern." It shows trustworthy facts with a clear authority model — not an opaque model output.
- **Annotation/callout:** show a human fact overriding an AI-extracted one + source tags — *"Human facts outrank machine facts."*

### 6. Intelligence Gaps
- **Business capability:** relationship intelligence / proactive decision support — the system names the single highest-value missing fact.
- **Why an executive cares:** a system that surfaces its own blind spots is rare and memorable; it signals genuine reasoning, not just storage.
- **Annotation/callout:** highlight the "ask this next" prompt — *"The system surfaces what it does not know — and asks for it."*

### 7. System Health dashboard
- **Business capability:** orchestration observability — cron-run tracking, smoke tests, health status.
- **Why an executive cares:** the clincher for "is this real?" A monitored, self-reporting system that runs daily is operating infrastructure, not a demo. Technology leaders trust what they can observe.
- **Annotation/callout:** highlight run tracking + health status — *"A self-monitoring system — daily runs are tracked and observable."*

### 8. Journey state → recommendation
- **Business capability:** decision support — facts roll into a current state that drives a specific recommended next step.
- **Why an executive cares:** shows the actual conversion from information to decision — the mechanism most organizations are missing — in one frame.
- **Annotation/callout:** highlight derived state + the recommendation it produces — *"Facts become state; state drives the next step."*

**Coverage check:** memory (#4) · orchestration (#2, #7) · prioritization/decision support (#1, #8) · relationship intelligence (#5, #6) · human approval (#3). All five capabilities proven.

---

## P1 Screens — nice-to-have supporting proof

- **Outreach Draft lifecycle (`/ops/needs-rachel` / `/ops/messages`)** — deepens the approval story: a draft with an explicit state machine (pending / sent / skipped / superseded) and a copy-safety check. *Proves governance has depth.*
- **Content Recommendation in context** — a specific next asset derived from facts + state. *Proves recommendation is governed, not a marketing blast.*
- **Referral action in the queue** — value captured at the edge of the workflow (non-fit routed to a partner). *Relevant to PE/ops audiences focused on leakage.*

Use P1 only in the long-form case study and deep-dive decks; they are not needed to establish "real system."

---

## Proof Narrative — how to sequence the screens

The same eight images make four different arguments depending on context. **Sequence for the
argument, not the feature list.**

### 1. Website proof — *fewest images, highest impact*
Three images, in this order, as a proof strip:
**Canonical Queue → Human Approval → Relationship Memory** (optionally + Intelligence Gaps).
The argument: *we turn a full book into one ranked action (Queue), keep humans in control
(Approval), and hold the knowledge in the system, not a person (Memory).* Do not put all eight
on the site — that becomes a product tour and dilutes the proof.

### 2. RachelOS case study — *the full argument along the operating spine*
All eight, ordered to the spine so each screen earns the next:
**Relationship Memory → Lead Facts → Journey state → Canonical Queue → Intelligence Gaps →
Human Approval → Daily Digest → System Health.**
The argument: *knowledge becomes memory → memory becomes governed facts → facts become state →
state becomes priority → the system knows its gaps → action is human-approved → work is
operationalized daily → and the whole thing is observably running.* This is the spine of the
flagship case study, made visible.

### 3. Executive presentation — *a three-act arc, ~5–6 slides*
- **Act 1 — the problem, made concrete:** Relationship Memory + Intelligence Gaps ("the
  knowledge that runs the work, and what's missing — today it lives in a person").
- **Act 2 — the system decides:** Canonical Queue + Journey state ("information becomes a
  ranked, defensible next action").
- **Act 3 — governed action, and it's real:** Human Approval + Daily Digest, closing on **System
  Health** ("AI assists, humans approve, it runs daily — and here's the proof it's running").
End on System Health: it converts the room from "interesting" to "operating."

### 4. TKO sales conversations — *reactive, matched to stated pain*
Not a linear walkthrough. Open with the **Canonical Queue** (fastest "aha"), then pull the
screen that answers the buyer's actual objection:
- "How is this different from our CRM/dashboard?" → **Queue** + **Journey state** (decision, not display).
- "We can't let AI act on its own." → **Human Approval**.
- "Our problem is one person knows everything." → **Relationship Memory** + **Intelligence Gaps**.
- "Is this actually built, or a concept?" → **System Health** + **Daily Digest**.
Show the one screen that resolves the doubt in front of you. Restraint is the proof.

---

## Reconciliation with the Screenshot Capture Plan
Same underlying screen set; the only ranking difference is **System Health = P0 here** (it is
the strongest "real system, not a concept" evidence) versus P1 in the capture plan (which ranks
by marketing weight). Capture mechanics, PII redaction, and per-shot annotation detail are not
restated here — see [RACHELOS_SCREENSHOT_CAPTURE_PLAN.md](RACHELOS_SCREENSHOT_CAPTURE_PLAN.md).

**Minimum to act:** capture the 8 P0 screens (redacted, retina, annotated). That set alone
proves all five capabilities and answers "is this real?" across all four contexts.
