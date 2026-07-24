# TKO Capability Map

**Purpose:** Inventory the consulting capabilities already represented by repository evidence
**Rule:** A documented idea is not treated as an implemented platform capability

## Capability status legend

| Status | Meaning |
|---|---|
| **Operational proof** | Demonstrated by working code, persisted records, tests, operator UI, or current production workflow |
| **Delivery-ready** | A defined consulting method, input, output, template, or playbook that can be used manually now |
| **Experience-backed** | Supported by bounded founder experience but not an attributable client case or TKO outcome |
| **Partial** | Useful components exist, but the end-to-end operating capability is incomplete |
| **Deferred** | Proposed or historical; not current proof and not required for the first engagement |

## 1. Executive diagnosis and decision support

| Capability | Actual deliverable or action | Status | Repository evidence |
|---|---|---|---|
| Decision framing | Define sponsor, operating pressure, scope, evidence boundary, timing, and decision required | Delivery-ready | Diagnostic page; Recovery Playbook; Question Library |
| Intended vs. actual workflow | Reconstruct current work, including side channels and exceptions | Delivery-ready | Assessment libraries; Operational Truth Framework |
| Constraint diagnosis | Separate symptoms from bottlenecks, dependencies, capacity, governance, and technology constraints | Delivery-ready | Recovery Assessment Sample; Problem Library |
| Executive decision brief | Present evidence, tradeoffs, recommendation, owner, and decision gate | Delivery-ready | Diagnostic deliverables; assessment sample and templates |
| Decision register | Record decisions, owner, rationale, date, dependencies, and review point | Delivery-ready | Healthcare Assessment Library; Recovery sample |
| Operating review design | Convert status meetings into constraint- and decision-centered reviews | Delivery-ready | Healthcare Framework Library; Executive Operating Review candidate |

## 2. Workflow intelligence

| Capability | Actual deliverable or action | Status |
|---|---|---|
| Current-state workflow map | Map intake, evidence, routing, handoffs, review, escalation, follow-up, closure, and rework | Delivery-ready |
| Exception taxonomy | Identify routine paths, exception types, owners, escalation triggers, and failure paths | Delivery-ready |
| Handoff analysis | Find work that changes owner without a reliable state, service expectation, or closure rule | Delivery-ready |
| Bottleneck analysis | Identify where work waits, loops, is reconstructed, or depends on informal coordination | Delivery-ready |
| Standard-work design | Define completion criteria, minimum evidence, roles, and work-advance conditions | Delivery-ready |
| Target workflow | Specify the smallest future-state change that addresses accepted causes | Delivery-ready |
| Workflow adherence | Define observable measures for whether the target process is actually used | Delivery-ready; measurement implementation depends on client systems |

## 3. Decision governance

| Capability | Actual deliverable or action | Status |
|---|---|---|
| Decision-rights map | Clarify who recommends, decides, approves, overrides, and serves as backup | Delivery-ready |
| Escalation design | Define trigger, path, authority, service expectation, and closure | Delivery-ready |
| Human-approval design | Preserve human approval for consequential messages, exceptions, or decisions | Operational proof in RachelOS; reusable delivery pattern |
| Source authority | Establish which human, system, or document is authoritative for each fact | Operational proof in RachelOS; reusable delivery pattern |
| Claim boundaries | Distinguish verified, owner-confirmed, experience-based, restricted, and unsupported claims | Operational / partial in TIF; delivery-ready as a manual control |
| Governance control stack | Connect policy, decision rights, workflow rules, evidence, monitoring, escalation, and review | Experience-backed and delivery-ready |
| Auditability | Preserve source, rationale, version, approval, action, and observed result | Operational proof in RachelOS/TIF; reusable delivery pattern |

## 4. Operational knowledge and dependency

| Capability | Actual deliverable or action | Status |
|---|---|---|
| Human API analysis | Identify work that relies on one person's undocumented judgment or relationships | Delivery-ready diagnostic lens |
| Key-person dependency register | Record concentrated knowledge, criticality, backup, visibility, and transferability | Delivery-ready |
| Operational memory model | Define durable facts, events, open questions, state, and source history | Operational proof in RachelOS |
| Knowledge transferability | Determine whether another trained operator can execute and explain the work | Delivery-ready |
| Missing-fact analysis | Identify the highest-value unknown preventing a responsible action | Operational proof in RachelOS; reusable pattern |
| Knowledge capture | Capture decisions, payer / specialty rules, exception logic, and escalation knowledge in maintainable form | Delivery-ready |

## 5. Prior-authorization operating performance

| Capability | Actual deliverable or action | Status |
|---|---|---|
| Baseline scorecard | Establish available volume, approval / denial, turnaround, touch, effort, backlog, payer, specialty, and staffing measures | Delivery-ready; depends on available evidence |
| Denial and rework analysis | Identify operationally addressable driver patterns without making clinical claims | Delivery-ready |
| Administrative-burden analysis | Trace staff touches, waiting, follow-up, correction, reconstruction, and exception effort | Experience-backed and delivery-ready |
| Payer / specialty variation | Compare performance and workflow by bounded segment | Delivery-ready |
| Clean-submission / first-pass analysis | Define and measure completeness and first-pass performance where data permits | Delivery-ready |
| Aged-exception analysis | Identify open work outside normal paths and the reason it remains unresolved | Delivery-ready |
| Gold Card readiness | Treat eligibility/readiness as an output of operating quality, not the product | Experience-backed module |
| Controlled PA improvement pilot | Implement one accepted workflow change with measures, training, and handoff | Commercially defined; TKO client outcome proof not yet established |

## 6. AI and automation readiness

| Capability | Actual deliverable or action | Status |
|---|---|---|
| Built / Activated / Validated audit | Distinguish implementation, production activation, and evidence of operating value | Delivery-ready and derived from RachelOS delivery lessons |
| Workflow suitability | Determine whether the process is stable and explicit enough for automation | Delivery-ready |
| Source and fact control | Define input authority, provenance, freshness, and missing-data behavior | Operational proof in RachelOS/TIF |
| Human-control design | Define approval, override, escalation, and fail-safe boundaries | Operational proof in RachelOS |
| AI task decomposition | Limit AI to supported work such as extraction, classification, comparison, or drafting | Delivery-ready |
| Production-readiness review | Inspect configuration, records, health, failure visibility, adoption, and outcome evidence | Delivery-ready |
| Build / buy / defer / stop recommendation | Make an evidence-backed automation decision | Delivery-ready |

The prior **AI Delivery Assessment** is best retained as a module inside an operating assessment. The latest commercial evidence does not support selling it as a separate public offer.

## 7. Prioritization and action management

| Primitive | Platform-level meaning | RachelOS evidence |
|---|---|---|
| State | A governed representation of where work is now | Journey and lifecycle state |
| Priority | A deterministic ordering based on facts, age, risk, and value | Canonical Queue and attention tiers |
| Recommendation | A reasoned next action with explanation | Journey and content recommendations |
| Canonical queue | One operator-facing list of work and why it matters | Queue and Today views |
| Approval queue | Work waiting for authorized human review | Needs Rachel |
| Next-best question | Highest-value missing fact to resolve | Intelligence-gap engine |
| Action log | Record what was sent, skipped, superseded, or completed | Outreach lifecycle and relationship memory |
| Outcome state | Resolve the work and retain the result | Outcome and recovery models |

These are reusable operating primitives. RachelOS's lead scoring weights, relationship lifecycle, content taxonomy, and queue-ranking logic are Rachel-specific and must not be represented as generalized consulting IP without a new domain design.

## 8. Measurement, observability, and learning

| Capability | Actual deliverable or action | Status |
|---|---|---|
| KPI definition | Specify metric, source, boundary, owner, cadence, and decision use | Delivery-ready |
| Baseline vs. pilot comparison | Compare observed behavior with the accepted baseline | Delivery-ready where client data exists |
| Adoption evidence | Observe training, use, adherence, overrides, and failure modes | Delivery-ready |
| System health | Surface cron, intake, notification, backlog, and processing failures | Operational proof in RachelOS |
| Conversion telemetry | Privacy-bounded qualified-intake and funnel events | Operational proof in current TKO site |
| Measurement feedback into IP | Convert sourced observations into reviewed evidence and revised assets | Manual/partial in TIF; no complete persisted measurement loop |

## 9. Evidence and intellectual-property production

| Capability | Actual deliverable or action | Status |
|---|---|---|
| Evidence capture | Admit source material with provenance and claim guard | Operational proof in TIF |
| Opportunity creation | Connect an evidence-backed need to a proposed asset | Operational proof in TIF |
| Asset lifecycle | Draft → review → approved → published | Operational proof in TIF |
| Evidence-to-asset traceability | Link assets and versions to source evidence | Operational proof in TIF |
| Revision control | Preserve versions, revision requests, and manual-edit protection | Operational proof in TIF |
| Derivative packages | Create channel-specific derivatives subject to approval and privacy gates | Operational proof / partial |
| Deliverable readiness | Compute blockers and next production action deterministically | Operational proof as a read model |
| Authority work queue | Rank missing proof and production work without fabricating records | Operational proof as a read model |
| Knowledge diagrams | Govern visual assets under the same evidence and review lifecycle | Operational proof |
| Publication record | Record destination, approved version, reviewer, and release | Deferred; asset status is the only current signal |
| Measurement record | Attach sourced performance observations to published assets | Deferred |

TIF is internal delivery infrastructure. Its output can improve consulting consistency, but it is not a client-facing consulting platform.

## 10. Commercial and buyer-conversion capabilities

| Capability | Status | Evidence |
|---|---|---|
| One current flagship offer | Operational | Current service pages and site positioning |
| Transparent price, duration, scope, inputs, outputs, and exclusions | Operational | Diagnostic and Sprint pages |
| Qualified intake | Operational | Contact form, durable `InboundLead`, validation, privacy consent, notification |
| Privacy-bounded conversion events | Operational | Conversion event contract and tests |
| Sample assessment output | Delivery-ready | Recovery Assessment Sample |
| Interview and artifact request library | Delivery-ready | Question Library |
| Evidence-safe proof package | Operational / partial | RachelOS screenshots and evidence library |
| Attributed external client case | Missing | Repository explicitly records this proof gap |
| Repeatable proposal / SOW for current PA offer | Content exists across documents; final sales artifact not established as canonical | Partial |

## 11. Rachel-specific capabilities that must remain bounded

The following prove implementation skill but are not general platform features:

- residential real-estate lead facts and journey taxonomy;
- intent, expected-value, attention, and priority scoring;
- lead freshness and recovery states;
- buyer / seller / relocation content recommendations;
- referral-partner logic;
- guide-download attribution;
- email drip and SMS workflows;
- daily lead digest and operator wording;
- Rachel-specific approval and escalation decisions;
- relocation / community and commercial-real-estate prototype taxonomies.

The transferable method is how facts, state, priority, recommendation, approval, action, and outcome are separated and governed—not the domain-specific rules themselves.

## 12. Capability gaps that matter commercially

The first engagement does **not** require new software. The important gaps are commercial and evidentiary:

1. no external TKO client case or attributed outcome;
2. no validated benchmark data or calibrated maturity model;
3. no canonical $100,000 two-phase SOW;
4. no confirmed employer / client conflict and IP firewall record;
5. no final reusable client-handling protocol for security, PHI, BAA, retention, and deletion;
6. no proof yet that the 90-Day Sprint has been delivered by TKO as an engagement.

## 13. Founder capabilities additionally evidenced by RachelDelray

| Founder capability | Direct evidence | Consulting relevance |
|---|---|---|
| Operating-model decomposition | Independent fact, relationship, timing, communication, opportunity, recommendation, and action dimensions | Diagnose where one overloaded status or workflow hides several decisions |
| Canonicalization | One lifecycle, action queue, action registry, planning baseline, and current-state authority | Consolidate without replacing a functioning system |
| Integration auditing | End-to-end Trust Engine event and continuation audit | Find silent stops between teams, tools, and lifecycle stages |
| Human-governed AI | Exact-message approval, human fact precedence, fail-closed policy, autonomous nurture reversal | Design AI assistance that preserves responsibility |
| Operator workflow design | Mobile-first priority, one decision per card, stable Action launcher, deliberate Skip | Turn intelligence into usable daily work |
| Reliability engineering | Idempotency, audit records, suppression continuation, webhook repair, health visibility | Make operating controls observable and recoverable |
| Activation governance | Explicit implemented / deployed / authorized / observed / validated states | Prevent false completion and premature scale |
| Content and acquisition systems | Structured content, source governance, trust-first capture, indexing and conversion controls | Connect authority assets to measurable buyer journeys |
| Reality reconciliation | Production and implementation override stale plans; unknown remains unknown | Establish an executive fact base when reports conflict |
| Constraint recognition | Current top priorities are operational use and outcome capture, not feature development | Recommend process or adoption work when software is not the bottleneck |

These capabilities are analyzed in [`09_TODD_OPERATING_PATTERN_ANALYSIS.md`](09_TODD_OPERATING_PATTERN_ANALYSIS.md). They strengthen delivery credibility but do not create healthcare outcome proof.

## Primary source basis

- [`content/proof/rachelos/RACHELOS_EVIDENCE_LIBRARY.md`](content/proof/rachelos/RACHELOS_EVIDENCE_LIBRARY.md)
- [`docs/capability-audit/RACHELOS_CAPABILITY_MATRIX.md`](docs/capability-audit/RACHELOS_CAPABILITY_MATRIX.md)
- [`docs/HEALTHCARE_FRAMEWORK_LIBRARY.md`](docs/HEALTHCARE_FRAMEWORK_LIBRARY.md)
- [`docs/HEALTHCARE_ASSESSMENT_LIBRARY.md`](docs/HEALTHCARE_ASSESSMENT_LIBRARY.md)
- [`docs/PROBLEM_LIBRARY.md`](docs/PROBLEM_LIBRARY.md)
- [`docs/TIF_RUNTIME_MODEL.md`](docs/TIF_RUNTIME_MODEL.md)
- [`docs/TIF_CAPABILITY_AND_USE_CASE_AUDIT_2026_07_22.md`](docs/TIF_CAPABILITY_AND_USE_CASE_AUDIT_2026_07_22.md)
- [`prisma/schema.prisma`](prisma/schema.prisma)
- [`src/lib/tif`](src/lib/tif)
- [`09_TODD_OPERATING_PATTERN_ANALYSIS.md`](09_TODD_OPERATING_PATTERN_ANALYSIS.md)
