# TKO Operating Model Discovery — Executive Summary

**Status:** Repository-derived discovery, not a new product specification
**Commercial horizon:** First $100,000 engagement within 30 days
**Evidence date:** 2026-07-24

## Repository review scope

The primary discovery covered all 340 tracked TKO repository items: root governance and decision records; `docs/`; `content/`; `asset-production/`; public pages and components; TIF and lead-intake runtime code; tests; Prisma schema and migrations; scripts; configuration; proof images and diagrams; and Git history. A subsequent evidence audit reviewed the 2,049-file RachelDelray repository, its 1,634-commit history, current-state and planning authority, 102 durable decisions, 243 test files, core lead / operations logic, migrations, production reconciliations, and representative reliability, trust, and operator-UX audits. Generated dependency, build-cache, and untracked render artifacts were treated as derivatives rather than independent consulting IP.

Where sources conflict, this review uses the following authority order:

1. implemented behavior, schema, migrations, and tests for capability claims;
2. the latest dated decision or audit for commercial posture;
3. current public service and intake behavior;
4. canonical governance and reality records;
5. older strategy, backlog, wireframe, and hypothesis documents as historical evidence.

## The answer

TKO is a principal-led operating improvement consultancy for work that is measurable, exception-heavy, and overly dependent on individual knowledge.

The repository's most credible initial market is provider-side prior authorization. Its method is broader than prior authorization, but its proof does not yet justify selling a broad software platform or a general transformation practice.

TKO's recurring job is to turn an operating problem that is argued about in meetings into a governed operating decision:

```text
Observed signals
→ admitted evidence
→ shared facts
→ actual workflow and state
→ constraints, exceptions, and dependencies
→ priority and recommendation
→ human decision
→ controlled action
→ measured outcome
```

This is already expressed in the repository through the RachelOS operating spine, the Operational Truth questions, the Transformation Recovery lenses, the assessment playbooks, the Built / Activated / Validated distinction, the evidence-production method, and the current prior-authorization offers. TKO does not need another methodology invented around these assets. It needs the existing method named, packaged, and used.

## The smallest credible $100,000 product

The smallest credible product is a **Prior Authorization Performance Recovery Program** packaged from the two engagements already sold on the current site:

1. **Prior Authorization Performance Diagnostic** — 15 business days, $25,000 fixed fee.
2. **90-Day Prior Authorization Improvement Sprint** — 12 weeks, $75,000 for a tightly bounded scope, within the existing $65,000–$95,000 range.

The commercial package is one $100,000 master engagement with two separately authorized phases and a formal continue / stop decision gate after the Diagnostic. Phase 1 may conclude that the client should execute internally, use an existing vendor, retain a specialist, defer action, or stop. The $100,000 packaging must not compromise that independence.

This is not a new service. It is the repository's current $25,000 Diagnostic and existing follow-on Sprint assembled into a procurement-friendly program:

| Phase | Client decision | Core outputs |
|---|---|---|
| Diagnostic | What is actually causing delay, rework, denial, and staff dependency, and what should be done? | Baseline scorecard; current-state and exception map; driver analysis; decision-rights map; dependency register; target workflow; prioritized backlog; KPI definitions; 90-day plan; executive brief |
| Improvement Sprint | Can one accepted improvement be made operational and sustained? | Standard work; roles and decision rights; exception taxonomy; escalation paths; operating knowledge; scorecard and cadence; bounded pilot; training; handoff; scale / stop decision |

The source offer is already public in [`src/app/services/diagnostic/page.tsx`](src/app/services/diagnostic/page.tsx) and [`src/app/services/operating-system-build/page.tsx`](src/app/services/operating-system-build/page.tsx). The detailed commercial rationale appears in [`docs/TKO_POSITIONING_OFFER_AUDIT_2026_07_20.md`](docs/TKO_POSITIONING_OFFER_AUDIT_2026_07_20.md).

## What problem TKO solves

The repository repeatedly identifies the same failure in different domains:

- A system of record contains transactions but does not tell operators what matters next.
- Intended workflow and actual workflow have diverged.
- Exceptions are handled through personal memory, side channels, and unwritten escalation rules.
- Status appears green while cross-team constraints remain unresolved.
- Decision rights are implicit, so work waits or is routed inconsistently.
- Automation is considered before the workflow, evidence, control points, and failure paths are understood.
- New capability is declared complete when it is built, even though it is not activated or validated.
- Leadership receives reports but not a decision-ready operating view.

The repository calls the person who manually compensates for these gaps a **Human API**. That is a diagnostic finding, not a product. TKO reduces the organization's dependence on Human APIs by making facts, decisions, exceptions, handoffs, priority, and outcome measures explicit.

## What a Fortune 100 healthcare client could receive tomorrow

Using existing assets, TKO could credibly deliver a bounded assessment and improvement design for one prior-authorization workflow, payer / specialty segment, or comparable healthcare administrative workflow.

The engagement could include:

- executive decision framing and evidence boundary;
- baseline KPI and data-quality review;
- interviews across executive, manager, and frontline roles;
- intended-versus-actual workflow map;
- exception, escalation, and decision-rights analysis;
- denial, rework, handoff, delay, and staff-effort analysis;
- key-person and cross-team dependency register;
- source-authority and operational-memory review;
- AI / automation readiness as one module, not the product;
- current constraints ranked by evidence, value, risk, effort, and readiness;
- target operating workflow;
- 90-day implementation roadmap;
- executive readout and decision register;
- if authorized, a bounded pilot with standard work, measures, governance, training, and handoff.

TKO could not yet credibly promise an enterprise-wide platform, managed prior-authorization service, clinical-policy redesign, legal or regulatory certification, claims adjudication, production integrations, or guaranteed financial / denial outcomes. The repository is unusually clear about these claim boundaries.

## Why clients should care

TKO protects two expensive decisions:

1. **The investment decision.** The Diagnostic prevents an organization from funding software, automation, staffing, or reorganization before it knows which operating constraint is material.
2. **The implementation decision.** The Sprint prevents an accepted recommendation from dying in a slide deck by requiring an owner, baseline, operating change, pilot, adoption evidence, and sustainment cadence.

The deliverable is not analysis for its own sake. It is a shared fact base and a governed decision about what to fix, fund, automate, stop, defer, or investigate next.

## The operating philosophy already present

The repository is consistent on the following principles:

1. **Evidence before automation.** Direct implementation, production configuration, and production records outrank plans, status, or marketing language.
2. **Actual work before intended process.** The method reconstructs how work moves, especially through exceptions.
3. **Facts before interpretation.** Source facts, derived state, priority, and recommendations are distinct layers.
4. **Human authority at consequential boundaries.** AI may extract, classify, compare, or draft; a person retains approval and exception authority.
5. **One operating truth.** One canonical record, queue, next action, decision register, or evidence spine is preferred over parallel representations.
6. **Explainability before scoring.** A priority or recommendation must expose its reason, evidence, gaps, and owner.
7. **Activation is separate from implementation.** Built, Activated, and Validated are different states.
8. **Measurement closes the loop.** Work is not complete until adoption, operating behavior, and outcomes can be observed.
9. **Domain taxonomy is earned.** Reusable operating primitives may transfer; healthcare rules and Rachel-specific concepts do not transfer automatically.
10. **Small, bounded interventions beat platform ambition.** Prove one workflow and one decision before expanding.

## What the repository proves

The repository contains four different evidence classes that must remain separate:

| Evidence class | What it supports |
|---|---|
| **Implemented proof** | RachelOS demonstrates persistent memory, facts, state, prioritization, canonical work queues, human-approved actions, gap detection, and operational visibility. TIF demonstrates governed evidence-to-asset traceability and deterministic production read models. |
| **Current commercial definition** | The live site defines the $25,000 Diagnostic and $65,000–$95,000 Sprint, their scope, inputs, outputs, exclusions, and intake path. |
| **Advisory experience** | Healthcare libraries support informed assessment of prior authorization, utilization management, care management, interoperability, regulatory operations, and transformation governance. They are experience credentials, not attributed client cases. |
| **Hypothesis / deferred design** | BoundOS, generalized TIF registries, measurement infrastructure, autonomous generation, semantic retrieval, and a general consulting platform are not proof of a market-ready product. |

## What TKO actually owns as intellectual property

TKO's IP is not the codebase alone. It is the combination of:

- an evidence hierarchy and claim-boundary discipline;
- a repeatable interview and artifact-request library;
- a method for reconstructing actual workflow;
- decision-rights, exception, dependency, and Human API lenses;
- constraint and decision registers;
- an operating spine from signal to measured outcome;
- Built / Activated / Validated gates;
- assessment and executive-readout structures;
- a bounded improvement and handoff model;
- traceable conversion of delivery evidence into reusable, human-approved assets.

## What RachelDelray adds to the founder evidence

The deeper RachelDelray audit strengthens the conclusion that Todd's core skill is operating-model reconstruction rather than feature production alone. It shows him:

- separating facts, interpretations, relationship state, opportunity state, communication eligibility, recommendation, and action;
- consolidating five lifecycle representations and multiple queues around canonical ownership;
- tracing customer events through behavior, journey, recommendation, operator work, provider, audit, and continuation;
- reversing autonomous AI nurture after production hallucinations and replacing it with narrower, fail-closed governance;
- repairing a month-long webhook observability failure without pretending historical delivery became knowable;
- changing an operator interface after one day of use because it made AI appear to be the actor rather than the advisor;
- recognizing that the current highest-value constraints are message review, deployment routing, operator adoption, and outcome capture—not more engineering.

The same corpus exposes a recurring risk: Todd's architecture and documentation velocity can exceed operational adoption and outcome proof. TKO's own method should therefore enforce a work-in-progress limit and an activation gate before new capability.

See [`09_TODD_OPERATING_PATTERN_ANALYSIS.md`](09_TODD_OPERATING_PATTERN_ANALYSIS.md).

## Commercial recommendation

Sell the evidence-backed prior-authorization sequence now. Use RachelOS as inspectable proof that Todd can build governed operating intelligence. Use healthcare experience as bounded domain credibility. Use TIF privately to preserve evidence and reuse delivery learning.

Do not sell RachelOS, TIF, BoundOS, a maturity certification, an AI platform, or a general consulting platform. Those are either reference implementations, internal infrastructure, or future hypotheses.

## Primary source basis

- [`CURRENT_REALITY.md`](CURRENT_REALITY.md)
- [`GOVERNANCE.md`](GOVERNANCE.md)
- [`docs/TKO_POSITIONING_OFFER_AUDIT_2026_07_20.md`](docs/TKO_POSITIONING_OFFER_AUDIT_2026_07_20.md)
- [`docs/TIF_TKO_MARKET_READINESS_STRATEGY_2026_07_23.md`](docs/TIF_TKO_MARKET_READINESS_STRATEGY_2026_07_23.md)
- [`content/offers/recovery-assessment/RECOVERY_ASSESSMENT_PLAYBOOK.md`](content/offers/recovery-assessment/RECOVERY_ASSESSMENT_PLAYBOOK.md)
- [`content/offers/ai-delivery-assessment/AI_DELIVERY_ASSESSMENT.md`](content/offers/ai-delivery-assessment/AI_DELIVERY_ASSESSMENT.md)
- [`content/proof/rachelos/RACHELOS_EVIDENCE_LIBRARY.md`](content/proof/rachelos/RACHELOS_EVIDENCE_LIBRARY.md)
- [`docs/HEALTHCARE_ASSESSMENT_LIBRARY.md`](docs/HEALTHCARE_ASSESSMENT_LIBRARY.md)
- [`asset-production/METHOD.md`](asset-production/METHOD.md)
- [`09_TODD_OPERATING_PATTERN_ANALYSIS.md`](09_TODD_OPERATING_PATTERN_ANALYSIS.md)
