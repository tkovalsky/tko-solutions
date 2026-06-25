# TKO_CONTENT_INVENTORY.md
**Phase 1 — Inventory of the public-facing TKO website**
Repo: `tko-site` (Next.js 15 App Router). Audited: 2026-06-24.

> Method note: The site renders copy from `src/lib/content.ts` (the canonical content model) plus per-page TSX. Files under `content/*.md` (capabilities, offerings, vision, roadmap, competitive-positioning, architecture-overview, case-studies) are **internal strategy docs — not imported anywhere in `src/`** and therefore are NOT public-facing. Only `content/selected-work/*.md` is rendered (the long-form RachelOS narrative).

---

## Site-wide positioning (from `src/lib/content.ts`, `src/app/page.tsx`)

- **Category:** "Operational Intelligence Systems — the missing layer between data and action."
- **Master promise:** "Your organization has data. It lacks a decision system."
- **Operating framework (the spine):** Signals → Memory → Facts → State → Priority → Human Approval → Action (`operatingFramework`, `systemFlow`).
- **Primary nav** (`src/components/site/header.tsx`): Services · Industries · Case Studies · Insights · About · Contact.
- **Featured proof everywhere:** RachelOS.

---

## Page-by-page inventory

### 1. Home — `/` (`src/app/page.tsx`)
- **Title:** "The Missing Layer Between Data and Action"
- **Core promise:** Organizations have data but lack a decision system; TKO builds the Operational Intelligence layer.
- **Target buyer:** COO / CIO / VP Operations / operating partner (named in selected-work narrative).
- **Services presented:** Diagnostic (front door), Build, Fractional Advisor (cards).
- **Proof presented:** RachelOS as "Featured Proof… live operating environment"; enterprise healthcare as supporting.
- **Case studies referenced:** RachelOS + 3 anonymized healthcare (via `CaseStudyCards`).
- **Technologies referenced:** None named. AI referenced only as "human-approved AI support."
- **Op-intelligence concepts:** operational memory, priority surfacing, action queues, human approval, escalation, the 7-stage framework.

### 2. Services index — `/services` (`src/app/services/page.tsx`)
- **Core promise:** "Diagnose the decision gap. Then build or govern the system."
- **Services presented:** the 3 offerings with price/duration/entry from `services[]`.
- **Proof:** sequencing language (diagnostic → build → fractional).

### 3. Operational Diagnostic — `/services/diagnostic`
- **Core promise:** Find where work stalls / decisions break / which fixes matter first.
- **Price/duration:** "Starting at $15K" · 2–3 weeks · "Primary entry point."
- **Deliverables:** workflow assessment, decision analysis, bottleneck map, visibility/prioritization gap review, **AI opportunity review**, roadmap, executive readout, 30-day follow-up.

### 4. Operational Intelligence System Build — `/services/operating-system-build`
- **Core promise:** Convert diagnostic findings into a working decision layer.
- **Price/duration:** "$50K–$100K" · 8–12 weeks · "Downstream conversion offer."
- **Deliverables:** workflow redesign, decision-layer design, operational-memory model, prioritization/action model, **human-in-the-loop AI review model**, action queues + escalation detection, intelligence-capture workflow, measurement model, handoff/training.

### 5. Fractional Operational Intelligence Advisor — `/services/fractional-advisor`
- **Core promise:** Keep operational reviews, prioritization, governance, AI adoption tied to evidence.
- **Price/duration:** "$12K–$25K / month" · 3–6 months · "Post-diagnostic/build retainer."

### 6. Industries — `/industries` (`src/app/industries/page.tsx`)
- **Core promise:** "Different industries. The same gap between information and action."
- **Segments:** Healthcare (Operations focus), Financial Services (Relationship focus), Technology (Execution focus), Private Equity (Value-creation focus) — from `industries[]`.
- **Proof:** none segment-specific; pattern claims only.

### 7. Case Studies — `/case-studies` + `/case-studies/[slug]` (`src/app/case-studies/`)
- **Cases referenced** (from `caseStudies[]`):
  1. **RachelOS Operational Intelligence System** — "Featured proof," "Live operating environment."
  2. **Prior Authorization Workflow Modernization** — Healthcare, "Anonymized enterprise proof," metrics gated.
  3. **Enterprise Care Management Modernization** — Healthcare, gated.
  4. **Healthcare Interoperability Modernization** — Healthcare, gated.
- **Proof posture:** RachelOS stated in operational terms (no revenue claims); 3 healthcare cases explicitly "gated/pending founder confirmation."

### 8. RachelOS long-form — `/case-studies/from-crm-to-operating-system` (renders `content/selected-work/rachelos-from-crm-to-operating-system.md`)
- 6-part narrative (Situation → Discovery → Build → What Changed → Why It Matters → Executive Takeaway).
- **Op-intelligence concepts:** signals capture, relationship memory outside one head, fact resolution, state, prioritized morning queue, approval-gated outreach, operational visibility, "system of record vs system of action."
- **Explicitly disclaims** any revenue/business-outcome metric.

### 9. About — `/about` (`src/app/about/page.tsx`)
- **Positioning:** "Operator first" — enterprise healthcare leadership, modernization programs, workflow transformation, prior-auth/admin burden, care management, interoperability/compliance, "RachelOS as a real-world proof point."
- **Method:** 7-question truth framework (`truthFramework`).

### 10. Insights — `/insights` + `/insights/[slug]`
- **State: EMPTY.** "Articles are MDX-ready, but no article inventory is published." Category architecture only (12 `contentPillars`).

### 11. Contact — `/contact` (`src/app/contact/page.tsx`, `actions.ts`, `diagnostic-form.tsx`)
- Diagnostic-intake form (server action + zod). Primary CTA target site-wide.

---

## What the website claims to be able to do (capability surface)

| Claimed capability | Where stated | Proof attached |
|---|---|---|
| Operational memory / institutional knowledge capture | Home, Build, RachelOS | RachelOS (live) |
| Priority surfacing / "who needs attention now" | Home, framework, RachelOS | RachelOS (live) |
| Action queues + trusted next action | Build, RachelOS | RachelOS (live) |
| Human-in-the-loop AI / approval gating | Home, Build, RachelOS | RachelOS (live) |
| Escalation detection | Build deliverables | Asserted (no public proof) |
| Fact resolution / source authority | Framework, Build | RachelOS (live) |
| Workflow diagnostics / bottleneck mapping | Diagnostic | Enterprise healthcare (gated) |
| AI opportunity review | Diagnostic | Asserted |
| Measurement model | Build, Fractional | Asserted |
| Healthcare workflow modernization (prior-auth, care mgmt, interop) | About, 3 case studies | Resume-cited, **gated** |

---

## Phase 1 conclusions

1. **The site is positioned as a generic "Operational Intelligence" consultancy** with one live proof (RachelOS) and three gated healthcare references.
2. **RachelOS carries nearly all verifiable proof weight.** Every concrete capability claim that has public evidence traces to RachelOS.
3. **CRE Intelligence does not appear on the website at all** — zero mentions in pages, content model, or nav.
4. **Insights/thought-leadership is empty** — a stated SEO pillar with no inventory.
5. **The healthcare case studies are aspirational/gated**, not currently provable to a prospect.
6. **The website describes the RachelOS architecture in abstract terms** ("operational memory," "action queues") but shows none of the specific, demonstrable subsystems that actually exist in the code (canonical queue, relationship intelligence engine, intelligence-gap detection, daily action engine, outreach drafting, referral intelligence). See `TKO_ALIGNMENT_MATRIX.md`.
