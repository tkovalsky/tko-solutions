# TKO Solutions — Canonical Business Architecture Decisions

Status: **AUTHORITATIVE — single source of truth**
Date ratified: 2026-06-17
Authors: Principal Business Architect · Principal Product Strategist · Principal Brand Strategist · Information Architect
Supersedes (on any conflict): every other document in `/content`, `/docs`, and `README.md`.

---

## Part 0 — Repository Inspection & Documents Reviewed

### Repository structure (as inspected 2026-06-17)

```
tko-site/
├── README.md                         # doc-set governance (modified in working tree)
├── content/                          # current doc set (06-15), code-grounded — UNTRACKED
│   ├── vision.md
│   ├── capabilities.md
│   ├── offerings.md
│   ├── architecture-overview.md
│   ├── roadmap.md
│   ├── case-studies.md
│   └── competitive-positioning.md
├── docs/                             # strategy + history — UNTRACKED
│   ├── reality-audit-2026-06-15.md
│   ├── EXECUTIVE_SUMMARY.md           (06-16)
│   ├── FOUNDER_INTERVIEW.md           (06-16)
│   ├── TKO_KNOWLEDGE_BASE.md          (06-16)
│   ├── TKO_DECISION_MEMO.md           (06-16)
│   ├── TKO_STRATEGY_UPDATE.md         (06-16)
│   ├── OFFERINGS_V2.md                (06-16)
│   ├── CASE_STUDIES_V2.md             (06-16)
│   ├── WEBSITE_STRATEGY.md            (06-16)
│   ├── TKO_STRATEGIC_POSITIONING_REPORT.md        (06-12, self-superseded)
│   ├── TKO_CLIENT_ACQUISITION_OPERATING_PLAN.md   (06-12, self-superseded)
│   ├── TKO_ROADMAP.md                 (undated, Jun–Sep)
│   ├── ORIGINAL_README.md             (Next.js boilerplate)
│   └── TKO_ARCHITECTURE_DECISIONS.md  (this document)
└── assets/                           # empty (.DS_Store only)
```

**Material fact from `git status`:** the entire Next.js application — `src/app/page.tsx`, `layout.tsx`, API routes, configs — is **deleted** in the working tree. The live site that sold "$750 diagnostic · no-code/AI prototypes" no longer exists in code. The repo is now docs-only. The old positioning is already dead; this document ensures it cannot be resurrected.

### Documents reviewed (20)

| # | Document | Date | Lines |
|---|---|---|---|
| 1 | `README.md` | 06-15 | 29 |
| 2 | `content/vision.md` | 06-15 | 62 |
| 3 | `content/capabilities.md` | 06-15 | 47 |
| 4 | `content/offerings.md` | 06-15 | 135 |
| 5 | `content/architecture-overview.md` | 06-15 | 70 |
| 6 | `content/roadmap.md` | 06-15 | 53 |
| 7 | `content/case-studies.md` | 06-15 | 113 |
| 8 | `content/competitive-positioning.md` | 06-15 | 45 |
| 9 | `docs/reality-audit-2026-06-15.md` | 06-15 | 238 |
| 10 | `docs/EXECUTIVE_SUMMARY.md` | 06-16 | 91 |
| 11 | `docs/FOUNDER_INTERVIEW.md` | 06-16 | 138 |
| 12 | `docs/TKO_KNOWLEDGE_BASE.md` | 06-16 | 259 |
| 13 | `docs/TKO_DECISION_MEMO.md` | 06-16 | 171 |
| 14 | `docs/TKO_STRATEGY_UPDATE.md` | 06-16 | 364 |
| 15 | `docs/OFFERINGS_V2.md` | 06-16 | 270 |
| 16 | `docs/CASE_STUDIES_V2.md` | 06-16 | 213 |
| 17 | `docs/WEBSITE_STRATEGY.md` | 06-16 | 276 |
| 18 | `docs/TKO_STRATEGIC_POSITIONING_REPORT.md` | 06-12 | 940 |
| 19 | `docs/TKO_CLIENT_ACQUISITION_OPERATING_PLAN.md` | 06-12 | 1117 |
| 20 | `docs/TKO_ROADMAP.md` | undated | 143 |
| — | `docs/ORIGINAL_README.md` (boilerplate, no business content) | n/a | 36 |

### Decision rules applied (in priority order)

1. **Most recent + most concrete wins** — unless an older document carries stronger strategic logic, in which case the logic wins.
2. **No averaging.** Where two documents conflict, one is chosen and the other is marked superseded. Blends are forbidden.
3. **Hard decisions only.** Every conflict resolves to a single answer.
4. **Weak, vague, or too-broad → superseded.** Any offer, ICP, or narrative that cannot be sold to a specific buyer is killed, not softened.
5. **30-day sellability beats agency breadth.** A business that can close one engagement in the next 30 days outranks a broad "operational intelligence systems for everyone" vision. The broad vision is the *destination*, earned through delivered work — not the *launch position*.

> **Note on a reversal:** an earlier draft of this document made "Operating System Design / operational intelligence systems" the primary narrative. Applying rule 5, that is reversed. That framing is the broad agency vision `TKO_DECISION_MEMO` explicitly says is "earned through delivered engagements, not documentation." It is demoted to the *supporting differentiator*. The primary narrative is now the thing that actually sells in 30 days: **Healthcare Transformation Recovery** (see Part 8).

---

## Part 1 — Document Classification

| Document | Class | Rationale |
|---|---|---|
| `TKO_ARCHITECTURE_DECISIONS.md` (this) | **Authoritative** | Resolves all conflicts. Source of truth. |
| `reality-audit-2026-06-15.md` | **Authoritative** | Truth standard for *capability/implementation status* (treats code as truth). Binding on any proof claim. |
| `content/capabilities.md` | **Authoritative** | Current live/gated/partial capability matrix. |
| `content/architecture-overview.md` | **Authoritative** | The reusable system pattern — TKO's core IP and differentiator. |
| `content/competitive-positioning.md` | **Authoritative** | Differentiation + "what not to say" rules. Binding on copy. |
| `content/case-studies.md` | **Authoritative** | Code-cited proof, used with `CASE_STUDIES_V2` attribution rules. |
| `content/roadmap.md` | **Authoritative** | The real 90-day operating roadmap (replaces `TKO_ROADMAP.md`). |
| `TKO_DECISION_MEMO.md` | **Authoritative (commercial)** | Most concrete + strongest strategic logic on what sells now. **The tie-breaker document for all 30-day decisions.** |
| `TKO_KNOWLEDGE_BASE.md` | **Authoritative (synthesis)** | Most complete synthesis; its "Contradictions" list is the agenda this doc closes. Unresolved items are NOT decided by it. |
| `content/vision.md` | **Supporting** | Current vision; subordinate to Part 2/8 wording. |
| `content/offerings.md` | **Supporting (module catalog)** | Valid as the list of *capability modules*, not top-line offers (AD-5). |
| `OFFERINGS_V2.md` | **Supporting** | Best offer-design detail (Diagnostic/Build/Fractional). Source for Part 5 deliverables. |
| `CASE_STUDIES_V2.md` | **Supporting** | Binding only as the *attribution-rules* authority; metrics gated by AD-11. |
| `WEBSITE_STRATEGY.md` | **Supporting** | Best website detail; self-labeled "do not implement without confirming positioning/pricing" — this doc supplies that confirmation. |
| `EXECUTIVE_SUMMARY.md` | **Supporting** | Accurate risk read-out; not a decision authority. |
| `FOUNDER_INTERVIEW.md` | **Supporting (open questions)** | The unresolved-decisions list. Working answers ratified here; genuinely founder-gated items marked PROVISIONAL (Part 11). |
| `README.md` (root) | **Supporting (governance)** | Doc-index; contains an IA defect (AD-13). |
| `TKO_STRATEGY_UPDATE.md` | **Superseded (in part)** | The "broaden to operational-intelligence-systems-for-all + 3 ICPs + professional-service teams" expansion is the agency vision rejected under rule 5. Its layered *messaging* model survives as support; its *broadening of ICP and narrative* is superseded by `DECISION_MEMO`. See AD-2, AD-4. |
| `TKO_STRATEGIC_POSITIONING_REPORT.md` | **Historical / Superseded** | Self-superseded 06-15. Healthcare wedge still valid; "Advisor" identity and stale capability evidence superseded. Evidence only. |
| `TKO_CLIENT_ACQUISITION_OPERATING_PLAN.md` | **Historical / Superseded** | Self-superseded 06-15. **Its 90-day network-led acquisition plan + referral scripts remain the operating playbook** (strong concrete logic, rule 1); its offer-name sprawl superseded by AD-5. |
| `TKO_ROADMAP.md` | **Superseded + Contradictory** | Source of the $5k–$15k floor and the CRE/$2,500 report phase. Both killed (AD-6, AD-9). Do not cite. |
| `ORIGINAL_README.md` | **Historical** | Next.js boilerplate. Ignore. |
| `src/app/page.tsx` (deleted) | **Killed** | "$750 / no-code." Already deleted in working tree. Positioning permanently void (AD-10). |

---

## Part 2 — Conflict Register (eight domains, each resolved to one answer)

| # | Domain | Conflict | Hard resolution |
|---|---|---|---|
| C-1 | **Positioning** | "Healthcare Recovery Advisor" (06-12) vs "operational intelligence systems for relationship-driven work" (06-15) vs "business operating systems consultancy" (KB) vs "operational intelligence systems for everyone" (STRATEGY_UPDATE). | **Healthcare Transformation Recovery** is the position; "we leave a system that runs" is the differentiator inside it. The broad systems-for-everyone framing is superseded as a *launch* position (rule 5). Part 3. |
| C-2 | **ICP** | One healthcare ICP (DECISION_MEMO) vs three ICPs incl. professional-service teams (STRATEGY_UPDATE). | Primary = healthcare enterprise. Secondary = health-tech vendor ops. **Professional-service-teams ICP = SUPERSEDED (too broad/dilutive).** Part 4 + AD-4. |
| C-3 | **Offerings** | 9+ names: Diagnostic, Blueprint, Sprint, Recovery Engagement, OS Build, Fractional, + 7 capability "offerings." | **Exactly 3 rungs: Diagnostic → Build → Fractional.** Sprint superseded as standalone (folded into Build). 7 capability offerings become *modules*. Part 5 + AD-5. |
| C-4 | **Pricing** | $5k–$15k (`TKO_ROADMAP`) vs $25k (everyone else) vs $750 (live site). | **$25k fixed diagnostic floor.** $5k–$15k and $750 killed. AD-6. |
| C-5 | **Business model** | Solo consulting (DECISION_MEMO) vs SaaS packaging (06-12) vs "systems product." | **Productized consulting** (systematized custom deployment). Not SaaS. Productization gated at 5+ deployments. AD-7. |
| C-6 | **Website goal** | $750 packages / competing CTAs vs "credibility confirmation, one CTA." | Job = credibility confirmation for warm leads; **one action.** Part 7 + AD-8. |
| C-7 | **Lead generation** | Network/referral-first (06-16) vs SEO/inbound machine (06-12) vs CRE cold report sales. | **Network-led / referral-first.** SEO deferred. CRE killed. Part 8 + AD-9. |
| C-8 | **Content strategy** | TKO authority content vs Rachel's content-ops capability vs CRE reports. | Split the meanings. TKO authority content = minimal support assets first. Rachel content-ops = a module. CRE = killed. AD-12. |

---

## Part 3 — Canonical Positioning Statement

> **TKO Solutions helps healthcare organizations recover stalled transformations — finding exactly where the work is actually stalling and building the operating system that makes AI and modernization investments produce measurable results. Where strategy firms leave a deck, software shops build tickets, and AI vendors ship autonomous tools nobody trusts, TKO leaves a system that runs after it departs: scattered signals become governed facts, facts become one canonical next action per case, and a human approves before anything happens. The method is the Operational Truth Framework; the proof is a production operating system, RachelDelray.com, and a healthcare modernization record spanning prior-authorization, interoperability, and $12M–$20M+ transformation portfolios.**

Binding usage rules:
- The position is **healthcare transformation recovery.** Lead with the buyer's problem, not the category.
- The differentiator — **"a system that runs after we leave"** — must appear and must be defensible (`competitive-positioning.md`, `DECISION_MEMO`).
- "Operational intelligence systems / business operating systems" is the **long-term category, earned through delivered work.** It is the *how*, never the headline (rule 5).
- Forbidden self-descriptions: SaaS platform · CRM vendor · content agency · no-code/automation agency · autonomous-agent company · report engine · staff augmentation · "AI consultant" · PMO · generic digital transformation · real-estate tech · product-strategy advisor.

---

## Part 4 — Canonical Ideal Customer Profile

### Primary ICP — Healthcare Enterprise Transformation Buyer · RATIFIED

| Attribute | Definition |
|---|---|
| **Company size** | Health plans / payer operations groups and provider organizations large enough to run a funded transformation or AI program (≈1,000+ employees), plus funded enterprise health-tech vendors selling into them. |
| **Buyer title** | VP Operations · VP Utilization Management · VP Provider Operations · Chief Transformation Officer · CIO / VP Technology · Head of AI/Automation · Health-tech COO. Budget owner exists; a $25k diagnostic needs no committee. |
| **Business pain** | Investing in transformation/AI but cannot see where work stalls. Administrative burden grows despite spend; AI pilots demo well but don't get adopted; operational metrics are debated, not trusted; many systems, no workflow owner. |
| **Buying trigger** | Sponsor/board/client asking why transformation isn't producing results; AI initiative 12+ months with no adoption; new leader inheriting a stalled program; a regulatory deadline (CMS Interoperability & Prior Authorization, pressure toward 1 Jan 2027) forcing accountability; prior authorization denials, delays, payer friction, staff dependency, or administrative burden creating urgent operational-quality pressure. |

Why primary: highest credibility, highest deal value, strongest brand. Accepted cost: 45–120 day cycle — may not close in 30 days without a warm contact (which is why the 30-day motion is network-led, Part 8).

### Secondary ICP — Health-Tech Vendor Operations · RATIFIED

| Attribute | Definition |
|---|---|
| **Company size** | Health-tech companies ≈50–500 employees selling into payer/provider networks. |
| **Buyer title** | Head of Customer Success · VP Operations · founding team / COO. Authority with 1–2 people; departmental budget. |
| **Business pain** | Customer relationships/implementations at risk: inconsistent follow-up, leadership-invisible status, at-risk accounts surfacing too late. CRM + spreadsheets + Slack, still dropping balls. |
| **Buying trigger** | A churned/at-risk marquee account; an investor question on net retention; an implementation backlog leadership can't see into; a CS/ops leader newly accountable for a number they can't observe. |

Why secondary (not competing): stays **inside healthcare** (reinforces the brand), shorter cycle (2–6 weeks), and is a referral path into the health plans these vendors already sell to. Deal size $15k–$30k. This is the realistic **30-day** revenue ICP that does not damage positioning.

### SUPERSEDED — "Relationship-Intensive Professional-Service Teams" ICP

`TKO_STRATEGY_UPDATE` proposed a third ICP: real-estate teams, mortgage branches, insurance agencies, wealth advisors, property managers at $10k–$20k. **Killed as an ICP** under rules 4 and 5:
- **Too broad** — five unrelated verticals netted together is the definition of an agency-vision target, not an ICP.
- **Dilutive** — `DECISION_MEMO` and `KNOWLEDGE_BASE` both flag it as the same trap as the $750 site; it undercuts the healthcare credibility that is TKO's only durable advantage.
- It does **not** appear on the website as an audience, ever.

Narrow carve-out (not an ICP, a tactic): **one** named, warm professional-service deal already in the founder's network may be taken opportunistically as a single proof deployment — described *only* as "an operational intelligence system deployment," anonymized into a case study, never repriced below the $25k healthcare floor, and the first thing cut under time pressure. One deal is a proof asset. A vertical is a distraction.

---

## Part 5 — Canonical Offer Hierarchy (exactly three rungs)

Nine-plus names collapse to three. Each has one job. (AD-5)

### Rung 1 — Operational Intelligence Diagnostic *(the only cold-sellable offer; the 30-day product)*
- **Healthcare framing:** Healthcare Transformation Recovery Diagnostic · **Burden framing:** Administrative Burden Reduction Diagnostic · **PA framing:** Prior Authorization Operational Assessment (same method, frame to trigger).
- **Purpose:** Establish operational truth, produce the proof asset, open the expansion path. This is the front door of the entire business.
- **Price:** **$25,000 fixed** (band $20k–$35k by scope/access). 50% start, 50% readout. **Nothing below $20k.**
- **Duration:** 3 weeks. Max 6–8 interviews, max 2 workflow areas.
- **Deliverables:** Operational Truth Assessment (supposed-to-happen vs actually-happens) · failure-point & manual-handoff inventory · visibility-gap map · administrative-burden/leakage inventory · AI opportunity & control model · Top 10 recovery opportunities ranked by value/risk/effort · 90-day recovery roadmap · 60-min executive readout · 30-day follow-up Q&A.
- **Outcome:** Evidence-based view of where work stalls that the client could not produce internally, a prioritized 90-day plan, and a natural follow-on proposal.

### Rung 2 — Operating System Build *(highest value; conversion only)*
- **Healthcare framing:** Healthcare Operating System Design & Implementation / Healthcare Transformation Recovery Engagement.
- **Purpose:** Build the working decision system the diagnostic identified — the proof the pattern is reusable beyond Rachel.
- **Price:** $50,000–$100,000 fixed. 33/33/33. **Sold only after a diagnostic or warm referral — never cold.**
- **Duration:** 8–12 weeks. *(The former standalone "$35–50k Design Sprint" is superseded; it survives only as an optional design phase folded inside this rung when a spec is needed before build.)*
- **Deliverables:** workflow redesign (1–2 areas) · deterministic decision-system design · relationship/work memory layer · intelligence-gap acquisition · operator workflow · operational alerting & reliability · measurement model · handoff docs + operator training. Excludes net-new software build beyond design/oversight unless separately scoped.
- **Outcome:** A running decision system with canonical next actions, human-controlled AI, alerting, and a measurement loop the internal team can operate unaided.

### Rung 3 — Fractional Operating System Advisor *(retainer; conversion only)*
- **Purpose:** Sustain transformation momentum and AI governance after a diagnostic/build. **Convert into — never sell cold** (reads as staff-aug otherwise).
- **Price:** $12,000–$25,000 / month. **Nothing below $12k/month.**
- **Duration:** 3–6 months, monthly renewal.
- **Deliverables:** weekly operating cadence · monthly operating-system review · monthly one-page sponsor brief · backlog/priority guidance · AI-governance guidance.
- **Outcome:** Momentum held through the critical window; sponsor has a trusted monthly view; internal discipline grows.

**Capability modules** (sold *inside* Rung 2, never standalone — the seven items in `content/offerings.md`): Relationship Intelligence · Lead Recovery & Follow-Up · Human-Controlled AI Workflow Automation · Reporting Workflow Modernization · Referral & Exception Routing · Content-to-Relationship Workflow · Operational Reliability/Alerting. They describe what a Build contains; they are not à-la-carte products.

**Do-not-sell (binding):** Multi-tenant SaaS · autonomous AI/agents · CRE reports (no evidence, AD-9) · automated report engine · CRM-integration product · model gateway · intelligence-graph service · full content-strategy engine · $750 diagnostics · no-code prototypes · generic SMB automation · hourly help · project management.

---

## Part 6 — Canonical Service Ladder

```
              NETWORK / REFERRAL  (primary motion, Part 8)
                        │
                        ▼
1. FIRST ENGAGEMENT  — referral ask / warm intro / problem-validation call.
   Job: confirm an urgent, FUNDED operational pain and a sponsor.
   Assets: one-page diagnostic offer + one-page proof sheet. Website confirms credibility.
                        │  (qualified → propose)
                        ▼
2. DIAGNOSTIC  — Operational Intelligence Diagnostic · $25k · 3 wks.
   Job: establish operational truth; produce proof; rank fixes.
   THE PAID FRONT DOOR. The only rung sold cold. The 30-day target.
                        │  (build-ready)
                        ▼
3. IMPLEMENTATION  — Operating System Build · $50–100k · 8–12 wks.
   Job: leave a system that runs. (Optional design phase if a spec is needed first.)
                        │  (momentum to protect)
                        ▼
4. RETAINER  — Fractional Operating System Advisor · $12–25k/mo · 3–6 mo.
   Job: sustain momentum + AI governance. Renews monthly.
```

Binding rules: only the **Diagnostic is cold-sellable**; Build and Retainer are conversions. The website funnels to exactly **one place — the start of stage 2** (Part 7). Lead with the offer; earn the category (`DECISION_MEMO`).

---

## Part 7 — Canonical Website Objective

**Single most important conversion action: REQUEST AUDIT** — i.e. **"Start the Diagnostic"**, the Operational Intelligence Diagnostic intake (the diagnostic *is* the audit), captured via a five-question qualifying form. · RATIFIED

- **Rejected — book consultation:** generic; attracts low-intent traffic; "book a call with a solo advisor" undercuts enterprise positioning.
- **Rejected — schedule discovery:** that's the *mechanism* (the close happens in conversation), not the headline; it commits the visitor to nothing specific.
- **Rejected — download guide:** a lead-magnet belongs to an inbound/SEO motion TKO is explicitly NOT running in 0–90 days (Part 8). A gated PDF is, at most, a tertiary CTA on thought-leadership pages.

Binding CTA rules: **one primary CTA per page**, identical site-wide — **"Start the Diagnostic →"**; never two competing CTAs; never "Learn More"/"Get Started." Destination = the five-question intake (operational problem · systems/workflows involved · what isn't working · AI already deployed? · decision needed in next 90 days). Website job for months 0–3 = **credibility confirmation for a warm lead**, not a lead source. Build the **one-page launch site first**; defer the multi-page site until ≥1 case study exists and ≥1 engagement is signed.

---

## Part 8 — Canonical Narrative

| Option | Verdict |
|---|---|
| **A. AI Consulting** | **Forbidden.** Crowded, vague, commoditized; erases the recovery + governance differentiators. AI appears only as a governed *mechanism* ("human-controlled AI"), never the identity. |
| **B. Transformation Consulting** | **PRIMARY — sharpened to "Healthcare Transformation Recovery."** It is what sells in 30 days: a funded, urgent, credible buyer problem the founder can speak to with authority. |
| **C. Operating System Design** | **Supporting (the differentiator / the "how").** "We leave a system that runs" is what makes B win against other consultants. It is the long-term category — earned, not claimed. Not the launch headline (rule 5). |
| **D. Fractional Leadership** | **Supporting (retainer rung only).** Real downstream offer; never the headline (cold, it reads as staff-aug). |

**Primary narrative: B — Healthcare Transformation Recovery.** · RATIFIED

Layered messaging (the surviving part of `STRATEGY_UPDATE` §10), each subordinate to B:
- **Healthcare buyer (lead):** "We help healthcare organizations find where transformation is actually stalling and build the operating system that makes AI and modernization produce measurable results."
- **Health-tech vendor (secondary):** "Your customer relationships are at risk from inconsistent follow-up and invisible status. We build the system that surfaces what matters, what's missed, and what's next — with human approval on every action."
- **Capability one-liner (support, never the homepage headline):** "We build operational intelligence systems — systems that tell you what matters, what's next, and what's being missed."

The website leads with the healthcare problem (B) and uses the systems capability (C) as proof of *how*. It must not present TKO as an "operational intelligence systems" firm-for-everyone (the broad vision, superseded as a launch position) nor as an AI-consulting firm (forbidden).

**Lead generation (inseparable from narrative):** network-led / referral-first — warm former-healthcare colleagues → consulting partners needing specialist delivery → health-tech founders → payer/provider ops one degree removed → LinkedIn inbound → cold outbound (last). Website + content are support, not the engine, for 0–90 days. SEO deferred. **CRE / $2,500 report sales (TKO_ROADMAP Phase 3) killed** — no data, app, template, or client exists (AD-9). · RATIFIED

---

## Part 8A — Narrative Load Test (Six-Surface Activation)

A narrative is only "decided" if it is specific enough to generate every downstream surface without re-opening the strategy. This section proves the selected narrative — **Healthcare Transformation Recovery** — is load-bearing, and binds *how* each surface inherits it. (This is the activation architecture, not the finished assets; copy/pages are produced downstream from this spine.)

### The Narrative Spine (every surface inherits this, in this order)

| Level | Element | Fixed wording (the controlling line) |
|---|---|---|
| **L1 — Who** | The buyer | Healthcare operations & transformation leaders (payer / provider / funded health-tech) — Part 4 Primary ICP. |
| **L2 — Problem (controlling thesis)** | The contrarian idea TKO owns | *"Transformation and AI programs don't fail because the tools are wrong. They fail because no one can see where the work is actually stalling — and there's no operating system to fix it once they do."* |
| **L3 — Difference** | The differentiator | *"Strategy firms leave a deck. Software shops build tickets. We leave a system that runs after we leave."* |
| **L4 — Method** | The repeatable proof of rigor | The **Operational Truth Framework** — seven questions (supposed-to-happen → actually-happens → where it stalls → what's known-but-unused → next action → where AI helps without taking control → how success is measured). |
| **L5 — Proof** | Why believe it | A production operating system (**RachelDelray.com**) + a healthcare modernization record (PA, interoperability, $12–20M+ portfolios) — **gated per AD-11**. |
| **L6 — Action** | The one ask | The **$25k Operational Intelligence Diagnostic** → *"Start the Diagnostic."* |

This spine answers the five questions a narrative must answer to be load-bearing — **who, what problem, what's different, what proof, what action** — with no blanks. That is the test, and it passes.

### Surface-by-surface activation

| Surface | Job | Inherits | Controlling idea for the surface | Must NOT |
|---|---|---|---|---|
| **Homepage copy** | Confirm credibility for a warm lead; drive one CTA | L2 hero → L3 → L4 → L5 → L6 | "You can't fix what you can't see. We find where your transformation is actually stalling and build the system that fixes it." | Lead with "operational intelligence systems" (L3 is support, not the H1); show two CTAs; claim a Rachel business outcome (AD-11) |
| **Service pages** | Turn interest into a scoped, priced offer | L6 + Part 5 ladder; each rung = one page, Diagnostic is the hero | Diagnostic page: "3 weeks, fixed fee, the ten highest-value fixes ranked, a 90-day roadmap, a brief you can show your sponsor that week." | List the 7 capability modules as à-la-carte offers; sell Build/Fractional cold; price below the floors |
| **Case studies** | Prove the pattern with evidence | L4 as the spine of each story; L5 proof, gated | Each case = Situation → Operational Truth applied (the 7 questions) → System built → Outcome. Rachel = *operational* proof; PA/Optum/ELLKAY = anonymized, attribution-cleared. | Publish employment metrics before attribution clears; call Rachel a commercial/healthcare result; name clients without permission (AD-11, `CASE_STUDIES_V2` rules) |
| **Outbound positioning** | Open a referral/intro conversation | L1 + L2 + L6; referral-ask & buyer scripts from `CLIENT_ACQUISITION` | Referral ask: "a fixed-scope diagnostic for healthcare leaders dealing with stalled transformation, AI that isn't producing results, or growing administrative burden — who's one person I should talk to?" | Cold-pitch the engagement on first touch; lead with AI; pitch professional-service verticals (superseded ICP) |
| **LinkedIn content** | Build authority + referral surface | L2 as the post engine; L4 as the framework series | Pillar posts off the thesis: "most AI failures are workflow-visibility failures," "automation doesn't fix broken workflows, it scales them," "what 'human-in-the-loop' actually means operationally." | "Job-seeker" tone; generic AI commentary/prompt tips; volume before the first conversation (AD-12) |
| **Paid diagnostic offer** | Be the purchasable form of the narrative | The whole spine, made buyable: L4 *is* the deliverable; L6 *is* the price | The Operational Truth Framework applied to the buyer's workflow = the Top-10 + 90-day roadmap. The narrative and the product are the same object. | Discount below $20k; expand scope past 2 workflow areas/8 interviews; promise implementation inside the diagnostic |

### Verdict, constraints, and the one failure mode

**Verdict: PASS.** Every surface derives from a single spine with no missing element; the diagnostic offer and the narrative are literally the same object (the strongest possible sign a narrative is specific, not abstract).

Two honest constraints (limits on *proof*, not on the narrative):
1. **Proof is gated (AD-11).** Case studies and homepage proof run on Rachel's *operational* evidence + anonymized employment work until (a) attribution clears and (b) Rachel produces measured business outcomes. The narrative is fully supportable today; the *quantified* proof tier unlocks later.
2. **Secondary message stays subordinate.** The health-tech-vendor framing (Part 8) may appear on a service page or in outbound, but never displaces the healthcare-recovery thesis on the homepage or in the brand line.

**The single failure mode to guard against:** dropping L2 (the contrarian thesis) and L3 (system-not-deck), which collapses the narrative into generic "healthcare consulting" — undifferentiated, unsellable at $25k, and indistinguishable from every SI. L2 and L3 are mandatory on every surface. If a draft surface doesn't carry both, it's off-narrative.

---

## Part 9 — Superseded / Killed Register

Explicit kills, so nothing weak survives by inertia.

| Element | Source | Why killed | Replaced by |
|---|---|---|---|
| "Operational intelligence systems for everyone" as the **launch identity** | STRATEGY_UPDATE | Broad agency vision; unsellable in 30 days (rule 5) | Healthcare Transformation Recovery (B), with systems as the differentiator |
| **"Healthcare … Advisor"** as the identity | 06-12 reports | Ties brand to a person + one vertical; superseded by problem-led recovery position | Part 3 positioning |
| **AI Consulting** narrative | implied across docs | Vague, commoditized, erases differentiators | Forbidden (Part 8) |
| **Professional-service-teams ICP** (real estate/insurance/wealth/property) | STRATEGY_UPDATE | Too broad (5 verticals); dilutes healthcare credibility | Killed as ICP; one opportunistic proof deal only (Part 4) |
| **Standalone Design Sprint** ($35–50k) | 06-12 / CLIENT_ACQUISITION | Adds a 4th offer name; ambiguous boundary with Build | Optional design *phase* inside Build (Part 5) |
| **7 capability offerings** as peer top-line offers | `content/offerings.md` | Created the "six names for one thing" confusion | Modules inside Build (Part 5) |
| **$5k–$15k diagnostic floor** | `TKO_ROADMAP` | Wrong buyer; cannot deliver at quality; signals SMB | $25k fixed floor (AD-6) |
| **$750 diagnostic / no-code prototypes** | live `page.tsx` | SMB positioning; poisons enterprise conversations; already deleted | Void (AD-10) |
| **CRE intelligence reports** ($2,500) | `TKO_ROADMAP` Phase 3 | No evidence anywhere (data, app, template, client) | Removed entirely (AD-9) |
| **SaaS / multi-tenant product** framing | 06-12 story #9 | No product, no infra, no motion; needs 6–12 mo full-time eng | Productized consulting (AD-7) |
| **SEO/insights-first lead gen** | 06-12 website strategy | No content, no case studies yet; slow; wrong for 0–90 days | Network-led/referral-first (Part 8) |

---

## Part 10 — Architecture Decision Log

**AD-1 — Position = Healthcare Transformation Recovery; "operational intelligence systems" is the differentiator, not the identity.** · RATIFIED — closes C-1. Rule 5: sell the funded, urgent, credible problem now; earn the category later.

**AD-2 — Primary narrative = B (Transformation Consulting, healthcare-recovery); A forbidden; C/D supporting.** · RATIFIED — closes the narrative half of C-1/C-7. Reverses the earlier C-primary lean (rule 5). `STRATEGY_UPDATE`'s broadening of the narrative is superseded by `DECISION_MEMO`'s stronger 30-day logic (rule 1).

**AD-3 — Primary ICP = healthcare enterprise; Secondary = health-tech vendor ops.** · RATIFIED — closes part of C-2. Both stay inside healthcare; secondary gives the realistic 30-day deal without brand damage.

**AD-4 — Professional-service-teams ICP superseded; one opportunistic proof deal permitted.** · RATIFIED — closes C-2 (rules 4–5). Detail in Part 4.

**AD-5 — Exactly three rungs (Diagnostic → Build → Fractional); Sprint folded into Build; 7 offerings → modules.** · RATIFIED — closes C-3. Eliminates offer sprawl.

**AD-6 — $25k diagnostic floor; $5k–$15k and $750 killed.** · RATIFIED — closes C-4. Pricing signals positioning. *Note: `FOUNDER_INTERVIEW` Q11 asks the founder to confirm; $25k is the working floor, lowerable only by an explicit written founder decision — not by a buyer's first objection.*

**AD-7 — Business model = productized consulting; not SaaS; productization gated at 5+ deployments.** · RATIFIED — closes C-5.

**AD-8 — Website objective = one action ("Start the Diagnostic" / request audit); one CTA per page.** · RATIFIED — closes C-6.

**AD-9 — CRE intelligence reporting removed entirely (capability, case study, roadmap phase, lead source).** · RATIFIED — no evidence in any repo; must be re-introduced with evidence via a new decision if ever real.

**AD-10 — The $750/no-code live-site positioning is void and cannot return.** · RATIFIED — already deleted in the working tree; the build starts from Parts 3/7/8.

**AD-11 — Proof is gated.** · RATIFIED (process), PROVISIONAL (specific metrics) — PA/Optum/ELLKAY metrics are employment-attributed; publish only per `CASE_STUDIES_V2` rules after the founder confirms NDA/attribution (`FOUNDER_INTERVIEW` Q18–20). RachelDelray is **operationally** proven, **not commercially** proven (no measured appointments/transactions); the website may not claim a business outcome Rachel has not produced.

**AD-12 — "Content" split: TKO authority content = minimal support assets first (one-pager + proof sheet + one case study; LinkedIn within 30 days; posts only after the first conversation). Rachel content-ops = a module. CRE content killed.** · RATIFIED — closes C-8.

**AD-13 — Fix IA defects.** · RATIFIED — `README.md` index links resolve to repo root but the files live in `/content/`; the 06-12 reports point to a non-existent `docs/tko/` path. Make this document the canonical entry point and correct README paths to actual `/content` and `/docs` locations. (Doc hygiene; not page-building.)

**AD-14 — Healthcare-first, not healthcare-only.** · PROVISIONAL — `FOUNDER_INTERVIEW` Q3. The architecture is healthcare-first (Primary ICP + wedge) while the secondary ICP keeps adjacent regulated/relationship-intensive ops reachable. If the founder declares healthcare-*only*, the secondary ICP and the proof carve-out tighten; nothing else changes.

---

## Part 11 — Open Questions That Gate Finalization (not blockers to website architecture)

| Ref | Question | Working default |
|---|---|---|
| FI-Q3 | Healthcare-only or healthcare-first? | Healthcare-first (AD-14) |
| FI-Q11 | Confirm pricing floor | $25k (AD-6) |
| FI-Q2 | Sell as "Todd Kovalsky, advisor" or "TKO Solutions, firm"? | Firm name over a named-advisor practice (About copy only) |
| FI-Q18–20 | NDA/attribution scope for PA/Optum/ELLKAY metrics | Unconfirmed; anonymized until cleared (AD-11) |
| FI-Q17 | Is Rachel producing measurable business outcomes yet? | Assume no; claim operational proof only (AD-11) |
| FI-Q23 | Domain / LLC / bank account status | Not a website-architecture blocker; required before signing a $25k contract |

---

## Summary — The One-Paragraph Source of Truth

TKO Solutions is a **healthcare transformation recovery** practice (primary narrative B; "we leave a system that runs" is the differentiator; AI-consulting forbidden; operating-systems-for-everyone is the earned destination, not the launch position). It sells **one three-rung ladder** — Operational Intelligence Diagnostic ($25k/3wk, the only cold-sellable offer and the 30-day target) → Operating System Build ($50–100k) → Fractional Advisor ($12–25k/mo) — through a **network-led, referral-first** motion, to a **primary healthcare-enterprise ICP** and a **secondary health-tech-vendor ICP**; the professional-service-teams ICP is **superseded** (one opportunistic proof deal aside). The **business model is productized consulting**, not SaaS (gated at 5 deployments). The **website's single job** is credibility confirmation driving **one action — Start the Diagnostic** — never the now-deleted $750/no-code positioning. Proof is **gated**: operationally real on RachelDelray.com, commercially unproven until outcomes are measured, and employment metrics unusable until attribution clears. Everything weak, vague, or broad — the third ICP, the fourth offer, the $5–15k floor, the CRE phase, the SaaS framing, the SEO-first plan — is **killed**, not averaged.
