# TKO Knowledge Base

Generated: 2026-06-16
Source: All docs in this repository plus live site review. Implementation evidence treated as truth; strategy docs treated as intent until verified.

---

## Mission

TKO builds operational intelligence systems for complex, relationship-driven work — turning fragmented workflows, scattered data, and manual coordination into visible, governed, and actionable operating systems.

---

## Vision

TKO exists to do what strategy consultants, software shops, and automation agencies do not: leave a working system behind, not a deck. The deliverable is not a recommendation. It is a running decision engine that improves visibility, accountability, and execution.

---

## Core Thesis

Most AI and transformation failures are not tool failures. They are workflow and visibility failures. Organizations cannot get value from AI when the work, decisions, data, ownership, and measurement are too fragmented for any tool to operate effectively. The fix is a business operating system — a defined, governed method for capturing signals, extracting facts, surfacing next actions, keeping humans in control, and measuring outcomes.

Proven architecture pattern:
`Signals → Relationship Memory → Facts → State → Canonical Action → Human Approval → Outcome`

---

## Services

| Offer | Status | Price Range | Timeline |
|---|---|---|---|
| Operational Intelligence Diagnostic | Sellable now | $20k–$35k | 3 weeks |
| Healthcare Transformation Recovery Diagnostic | Sellable now | $25k | 3 weeks |
| Prior Authorization Operational Assessment | Tier-1 opportunity | TBD | TBD |
| Relationship Intelligence System | Sellable now | $35k–$75k | 4–8 weeks |
| Lead Recovery & Follow-Up Intelligence | Sellable now | $25k–$50k | 3–6 weeks |
| Human-Controlled AI Workflow Automation | Sellable now | $35k–$60k | 4–6 weeks |
| Healthcare Transformation Recovery Engagement | Sell after diagnostic | $60k–$100k | 8–10 weeks |
| Fractional Operational Transformation Advisor | Sell after engagement | $15k–$25k/month | 3–6 months |
| Enterprise Value & Exit Readiness Assessment | Future opportunity only | TBD | TBD |
| Reporting Workflow Modernization | Sell with caveats | $15k–$30k | 3–5 weeks |
| CRE Intelligence Reporting | Do not sell yet | — | No evidence |
| Multi-tenant SaaS / autonomous AI / CRM product | Do not sell | — | Not built |

---

## Capabilities

| Capability | Status | Evidence |
|---|---|---|
| Operational truth audit | Live as method | Forensic audits, stabilization docs, closure reports in RachelDelray repo |
| Relationship memory | Live | `relationship_updates`, `captureRelationshipUpdate()` |
| Fact extraction + source authority | Live | `lead_facts`, `rie.ts`, supersession model |
| Human-authoritative facts | Live | AI cannot override human-entered facts |
| Journey / relationship state | Live | `lead_journey_state`, relationship_state fact |
| Canonical next-action queue | Live | `canonicalQueue.ts`, one next action per active lead |
| Queue explainability | Live | Triggering facts, freshness, rationale stored per queue row |
| Intelligence gap detection | Live in code | `intelligenceGaps.ts`, gap-type classification |
| Needs Rachel / operator workflow | Live in code | `/ops/needs-rachel`, gap questions, freeform input |
| Daily action engine | Live | `dailyActionEngine.ts`, cron, heartbeat, digest |
| Approval-gated AI outreach drafts | Built, not activated | `outreach_drafts`, env-gated; no autonomous sends |
| Content ops workflow | Live | `/api/ops/content/generate`, versioned, human approval |
| Lead capture reliability + failsafe | Live | `failed_leads`, status normalization, alerting |
| Operational alerting | Live | Cron logging, heartbeat, zero-lead / drip-backlog alerts |
| Referral intelligence | Live, partial lifecycle | Queue action exists; close-loop states incomplete |
| Behavioral signal consumption | Partial | Email events exist; full event-to-intelligence conversion not built |
| Conversion / outcome analytics | Partial | Activities exist; appointments / closings / revenue not measured |
| Shared platform services | Not built | No multi-tenant runtime, CRM integration, model gateway |

---

## Industries

**Primary (credibility + buyer urgency + funding):**
- Health plan / payer operations
- Healthcare provider operations
- Utilization management / prior authorization
- Care management and patient access
- Health-tech vendors selling into payer/provider networks
- Healthcare consulting firms (as delivery partner)

**Secondary (credible proof, not primary market):**
- Financial services operations
- Regulated enterprise service operations
- B2B services with high-value relationship management
- Business owners, founders, healthcare practice groups, PE, search funds, business brokers, M&A advisors, and fractional operators evaluating operational dependency as an enterprise value or exit-readiness risk.

**Avoid as first market:**
- Generic SMB automation
- Real estate agent market (RachelDelray.com is proof of pattern, not the product)
- General AI training

---

## Buyers

**Highest-probability:** VP Operations · VP Utilization Management · VP Provider Operations · Chief Transformation Officer · CIO · Health-tech COO · Healthcare consulting partner (delivery use case)

**Budget sources:** Operations transformation · IT modernization · AI/automation program · Administrative burden reduction · Consulting delivery

**Do not target first:** Startup founders needing cheap automation · SMB owners below $20k decision authority · Individual real estate agents

---

## Differentiators

| vs. | TKO difference |
|---|---|
| Strategy consultants | TKO converts findings into working queues, workflows, and decision rules. The deliverable is a system. |
| Agencies | TKO ties content and outreach to relationship state and canonical decisions — not just campaigns. |
| Software shops | TKO starts from operational failure and workflow truth, not feature tickets. |
| Offshore teams | TKO owns problem definition, governance, operating model design, and adoption. |
| Large SIs | TKO is faster and proof-gated — useful when a stalled program needs fast clarity without platform overhead. |
| Generic AI consultants | TKO leads with operational truth, source authority, and human approval — not tools and prompts. |

**Contrarian idea to own:**
> Most AI transformation failures are not AI failures. They are operational visibility and workflow failures.

**Healthcare wedge idea to own:**
> Gold Card eligibility is not the problem. Operational quality is the problem. Prior authorization leaders buy help with denials, delays, burden, variation, and staff dependency before they buy platforms.

**Enterprise value extension:**
> The same operational visibility failures that break transformation and AI adoption also reduce enterprise value when buyers see founder dependency, key-employee dependency, tribal knowledge, undocumented workflows, and missing organizational memory.

---

## Methodologies

**The Operational Truth Framework** (signature method — named, documented)
Seven questions applied at every engagement start:
1. What is supposed to happen?
2. What actually happens?
3. Where does work stall?
4. What does the organization already know but fail to use?
5. What should the next action be?
6. Where can AI help without taking control from humans?
7. How will success be measured?

**The Transformation Recovery Framework** (delivery model — named, not yet published)
Six layers: Visibility · Governance · Workflow · Decisioning · Adoption · Measurement

**The Business Operating System Architecture** (reusable pattern — implemented in code)
`Signals → Relationship Memory → Facts → State → Canonical Action → Human Approval → Outcome`

---

## Intellectual Property

Named and usable now:
- Operational Truth Framework (7 questions)
- Transformation Recovery Framework (6 layers)
- Business Operating System architecture pattern
- Source-aware fact model with human-override rules
- Deterministic recommendation layer (queue not AI-decided)
- Canonical queue with decision explainability
- Approval-gated AI drafting pattern
- Enterprise Value & Exit Readiness framing as a future application of Human API dependency, organizational memory, workflow scalability, and AI readiness analysis.

Not yet created:
- No published framework PDF
- No named diagnostic questionnaire
- No authority content in market (LinkedIn, thought leadership)
- No public case study

---

## Existing Proof

Ranked by strength and publishability:

| Rank | Proof Point | Type | Publishable? |
|---:|---|---|---|
| 1 | RachelDelray.com operating system | First-party, code-backed | Yes — confirm operator consent for name use |
| 2 | PA / admin burden reduction: 40–60% manual review reduction, $200M+ annualized value, 15–25% productivity gain | Resume-cited employment metrics | Verify NDA / attribution limits before publishing |
| 3 | Optum care management modernization: ~$20M program, ~24 critical enterprise apps | Resume-cited employment | Verify attribution; anonymize org if needed |
| 4 | ELLKAY interoperability: CMS Cures Act, FHIR/HL7, 20–30% integration timeline improvement | Resume-cited employment | Verify attribution; anonymize org if needed |
| 5 | Financial services (WBI, Sapient, Apollo) | Resume | Supporting proof only; not primary |

---

## Existing Assets

**In this repository:**
- `docs/` — vision, capabilities, offerings, architecture, roadmap, case studies, competitive positioning, reality audit (all grounded in implementation evidence)
- `TKO_STRATEGIC_POSITIONING_REPORT.md`, `TKO_CLIENT_ACQUISITION_OPERATING_PLAN.md` — older strategic docs, partially valid, superseded by June 15 reality audit
- `TKO_ROADMAP.md` — founder roadmap with employment-exit targets

**Software (RachelDelray.com — separate repo):**
- Working relationship intelligence and action system
- 50+ migration files documenting capability evolution
- Production-validated code

**Website (this repo):**
- Next.js site exists but is in placeholder state with wrong positioning (see Contradictions)

**Not yet created:**
- Diagnostic one-pager PDF
- Proof sheet
- Case study PDFs
- LinkedIn rewrite
- Authority PDFs
- Any published thought leadership

---

## Contradictions

These are the most important findings. Each one is a decision that must be made before any public-facing content is published.

**1. Live website vs. enterprise strategy (critical)**
The current `page.tsx` shows: "Automation Strategy & Workflow Design · no-code/AI prototypes · $750 diagnostic · $3k–$5k sprint · $1.5k–$3k/month retainer." This is SMB no-code agency positioning. The strategy docs target healthcare VP-level buyers at $25k–$100k. Anyone who receives TKO outreach and visits the site today will not recognize a credible healthcare transformation advisor. This must be fixed before outreach begins.

**2. Pricing floor is undefined**
`TKO_ROADMAP.md` Phase 2: "First paid diagnostic — target $5k–$15k."
`TKO_CLIENT_ACQUISITION_OPERATING_PLAN.md`: "$25k fixed fee, 3 weeks."
These are different markets and different buyers. No current document resolves which price is correct. Pricing signals positioning. A $10k floor attracts different buyers than a $25k floor.

**3. CRE intelligence phase has no evidence**
`TKO_ROADMAP.md` Phase 3 describes selling CRE (commercial real estate) intelligence reports at $2,500. No CRE data, app, template, or client exists in this repo. This appears to be aspiration only. Treat as deferred until evidence exists.

**4. Rachel outcome metrics are missing**
RachelDelray.com is positioned as the primary proof asset. But appointments, showings, contracts, closings, and revenue attribution are not yet measured. The system is operationally proven (it works as designed); it is not commercially proven (it has produced measurable business outcomes). This distinction matters in every sales conversation.

**5. Outreach drafts have not been activated**
The approval-gated AI outreach system is complete and gated by an environment flag. It is described as a live capability. It has not yet been used in production. This is a minor concern for now but will become a stronger proof point once activated.

**6. Multiple offer names for the same thing**
Across documents, similar offers appear under six or more different names. There is no canonical offer menu. This creates confusion in any sales conversation.

---

## Missing Information

Cannot be determined from the repository. Requires founder answers.

1. Whether the founder is currently employed and what constraints that creates for consulting availability.
2. Whether any healthcare outreach or informal consulting conversations have happened since June 2026.
3. The size and heat of the professional network available for initial outreach.
4. Whether the Gold Card / PA metrics are subject to NDA or attribution restrictions.
5. Current operational status of RachelDelray.com — is the operator using the system daily?
6. Whether the CRE Phase 3 item represents a real client opportunity or a hypothetical.
7. The founder's realistic availability (hours/week for TKO outside employment).
8. Whether any consulting revenue has been earned under TKO.
9. Domain ownership: is tko-solutions.com or equivalent owned and live?
10. Agreed pricing floor for the first engagement.

---

## Recommended Primary Category

**Business operating systems for complex, workflow-driven organizations.**

Not: AI consulting. Not: PMO. Not: automation agency.

The category is "business operating system" — the output is a working system, not a deck or a prototype. The primary commercial wedge is healthcare transformation recovery and operational intelligence, because the credibility is strongest there, the buyer problems are most urgent and funded, and engagement sizes are large enough to replace employment income.

---

## Categories TKO Should Avoid Leading With

| Category | Why |
|---|---|
| AI consulting | Crowded, vague, commoditized. Erases the operational recovery and governance differentiators. |
| PMO / program management | Positions TKO as a process administrator. Wrong price bracket, wrong buyer. |
| No-code / automation agency | What the current site says. Attracts $750–$5k buyers. Incompatible with enterprise positioning. |
| Generic digital transformation | Every large SI claims it. Too broad to win. |
| Real estate tech | The RachelDelray system is proof of method. Not the market. |
| Product strategy | Sounds like a startup advisor. Does not match the operational recovery narrative. |
