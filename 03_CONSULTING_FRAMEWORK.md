# TKO Consulting Framework

**Working name:** TKO Evidence-to-Operating-Decision Method
**Status:** Synthesis of existing repository methods; not a new branded invention
**Purpose:** Make the embedded consulting method explicit and reusable

## Framework thesis

Organizations do not primarily fail because they lack another dashboard or automation tool. They fail when operational truth, decision rights, exception knowledge, priority, and outcome evidence are fragmented across people and systems.

TKO's method establishes enough shared truth to make a responsible operating decision, then activates the smallest change that can be observed and sustained.

The method combines five existing repository structures:

1. **Operational Truth Framework:** seven questions about intended work, actual work, stalls, unused knowledge, next action, safe AI, and measurement.
2. **Transformation Recovery Framework:** Visibility, Governance, Workflow, Decisioning, Adoption, and Measurement.
3. **RachelOS operating spine:** Signals → Memory → Facts → State → Priority → Recommendation → Human Approval → Action → Outcome.
4. **Evidence production method:** Observation → Evidence → Finding → Recommendation → Asset.
5. **Activation audit:** Built → Activated → Validated.

These structures are complementary:

- Operational Truth defines the questions.
- Transformation Recovery defines the diagnostic lenses.
- The evidence method defines claim discipline.
- The operating spine defines the target control loop.
- Built / Activated / Validated defines completion.

## The eight-stage method

### Stage 1 — Frame the executive decision

The engagement begins with a decision, not a technology category.

Determine:

- What changed?
- Which operating outcome is under pressure?
- Who owns the decision?
- What workflow or segment is in scope?
- What action is leadership considering?
- By when must it decide?
- What is explicitly outside scope?
- What evidence can be handled safely?

**Required output:** Decision Charter containing sponsor, decision, scope, success definition, evidence boundary, timing, and exclusions.

**Gate:** Do not start a broad discovery effort without a named decision and bounded workflow.

### Stage 2 — Establish the evidence base

Collect and classify the available evidence:

1. production records and source transactions;
2. production configuration and implemented behavior;
3. approved operating artifacts and maintained standard work;
4. observed work and specific case examples;
5. named-owner confirmation;
6. plans, decks, status, or assertions.

The hierarchy is contextual, but evidence closest to actual operating behavior outranks representation.

Every material claim should be labeled:

- **Verified:** directly supported by an admissible source;
- **Owner confirmed:** confirmed by an accountable person but missing direct proof;
- **Experience based:** credible bounded experience, not an attributable client result;
- **Hypothesis:** plausible and testable;
- **Unsupported:** retained only as a blocked claim;
- **Restricted:** usable for delivery but not public reuse.

**Required outputs:** Evidence Register, Data Limitation Note, Claim Boundary.

**Gate:** No metric, causal claim, or public assertion without its source and boundary.

### Stage 3 — Reconstruct actual work

Map both the official process and the work operators actually perform.

Trace:

- intake and minimum evidence;
- state transitions;
- roles and handoffs;
- queues and prioritization;
- routine vs. exception paths;
- escalation and override;
- rework and reconstruction;
- side channels and local artifacts;
- closure and outcome capture;
- points where a person supplies missing integration or judgment.

The method asks for recent examples, not only descriptions of policy.

**Required outputs:** Current-State Workflow Map, Exception Map, Source / System / Dependency Inventory.

**Gate:** A workflow map that omits exception handling is not complete.

### Stage 4 — Diagnose through six lenses

Use the repository's Transformation Recovery dimensions:

| Lens | Diagnostic question | Typical evidence |
|---|---|---|
| Visibility | Can leaders and operators see current state, age, ownership, gaps, and health? | Queues, reports, status fields, work samples |
| Governance | Are source authority, approval, override, escalation, and review explicit? | Policies, decision examples, approval records |
| Workflow | Does work move through a consistent path with defined completion criteria? | Maps, timestamps, rework, exceptions |
| Decisioning | Can the next decision and rationale be made from available facts? | Decision rules, missing facts, priority logic |
| Adoption | Is the intended capability used in daily work, with accountable ownership? | Usage, observation, training, overrides |
| Measurement | Are operating behavior and outcomes observed with trusted definitions? | KPI definitions, baselines, reviews, trend records |

Apply four cross-cutting risk lenses:

- **Human API risk:** important knowledge or coordination concentrated in individuals;
- **dependency risk:** work can be locally green while blocked between teams;
- **activation risk:** capability is built but not running or owned;
- **automation risk:** technology would accelerate an unstable or ungoverned process.

**Required outputs:** Findings Register, Constraint Register, Dependency Register, Human API Register, Built / Activated / Validated Map.

### Stage 5 — Convert findings into an executive choice

For each finding, preserve the chain:

```text
Evidence → Finding → Consequence → Recommendation → Decision
```

Rank recommendations using explicit factors:

- impact on the decision and target outcome;
- evidence strength;
- operational risk;
- addressability;
- effort and dependency;
- activation readiness;
- reversibility;
- time to observable value.

The output is not automatically “build.” Allowed recommendations are:

- stabilize;
- standardize;
- clarify ownership or decision rights;
- change operating cadence;
- configure an existing tool;
- build a bounded capability;
- buy or use a specialist;
- automate with controls;
- gather more evidence;
- defer;
- stop.

**Required outputs:** Prioritized Improvement Backlog, Target Operating Requirements, Executive Decision Brief.

**Gate:** The recommendation must be explainable from admitted evidence and must identify its owner and next decision.

### Stage 6 — Design the target operating loop

Use the RachelOS spine as a design checklist, not a software mandate:

| Primitive | Target-state question |
|---|---|
| Signal | What event or observation enters the workflow? |
| Memory | What history must persist? |
| Fact | What is known, from which source, at what confidence and freshness? |
| State | Where is the work now? |
| Priority | What needs attention first, and why? |
| Recommendation | What is the next responsible action? |
| Human approval | Which actions or exceptions require authority? |
| Action | How is the decision executed and recorded? |
| Outcome | How is closure, adoption, or performance observed? |

Only implement the primitives required by the selected operating change. A spreadsheet, operating review, queue configuration, SOP, or existing system may be sufficient. The framework does not prescribe custom software.

**Required outputs:** Target Workflow, Decision-Rights Matrix, Exception / Escalation Design, KPI Definitions, 90-Day Plan.

### Stage 7 — Activate one bounded change

Implementation is governed by the Built / Activated / Validated model:

| State | Required evidence |
|---|---|
| Built | The agreed workflow, standard work, configuration, or capability exists |
| Activated | It runs in the intended environment, has an owner, is used, and exposes failures |
| Validated | Adoption and operating evidence support the expected effect within the agreed boundary |

Activation work includes:

- accountable owner and backup;
- standard work and training;
- pilot segment and entry criteria;
- operating cadence;
- issue and decision logs;
- failure and escalation visibility;
- baseline and comparison period;
- sustainment handoff;
- scale, revise, stop, or defer decision.

**Required outputs:** Pilot Package, Adoption Evidence, Issue / Decision Log, Sustainment Handoff.

**Gate:** “Deployed” or “documented” is not equivalent to activated or validated.

### Stage 8 — Close the learning loop

At the end of the engagement:

1. separate client-confidential material from reusable learning;
2. record observed outcomes with source, period, and boundary;
3. distinguish results from hypotheses and attribution from correlation;
4. update frameworks only after human review;
5. create approved assets from admitted evidence;
6. record what failed, was deferred, or should not be repeated.

TIF can support the Evidence → Opportunity → Asset → Version → Derivative traceability path. Publication and measurement remain partially manual.

**Required outputs:** Final Evidence Ledger, Lessons Record, Reuse / Confidentiality Decision, Closeout Brief.

## Standard engagement artifacts

Every flagship assessment should produce:

1. Decision Charter
2. Evidence and Data Limitation Register
3. Current-State Workflow and Exception Map
4. Source / System / Dependency Inventory
5. Baseline Scorecard
6. Findings and Constraint Register
7. Decision-Rights and Escalation Map
8. Key-Person Dependency Register
9. Built / Activated / Validated Map where technology is material
10. Target Workflow and Operating Requirements
11. Prioritized Improvement Backlog
12. KPI Definitions
13. 90-Day Roadmap
14. Executive Decision Brief

The output set may be reduced for a smaller engagement. Traceability may not be removed.

## Quality controls

### Finding test

A finding is acceptable only when it states:

- what was observed;
- the evidence and boundary;
- why it matters operationally;
- the consequence of leaving it unchanged;
- the accountable role;
- the confidence or limitation.

### Recommendation test

A recommendation is acceptable only when it:

- responds to a supported finding;
- identifies the smallest practical intervention;
- preserves required human authority;
- defines owner, measure, and decision gate;
- states dependencies and exclusions;
- avoids causal or financial claims beyond the evidence.

### Automation test

Automation is considered only when:

- input facts and source authority are defined;
- the normal path and exception path are stable enough to encode;
- decision rights and human-review points are explicit;
- failure is visible and recoverable;
- an owner is accountable for operation;
- expected value can be observed;
- the organization can stop or revert safely.

### Activation-budget test

Before adding capability, ask:

- Is an existing capability already sufficient but unused?
- Is the blocker deployment, migration, authorization, operator time, training, evidence capture, or outcome discipline?
- What current work should stop if this is started?
- Which production observation would justify the new capability?
- Can the learning be obtained through a manual or bounded pilot first?

This control is derived from RachelDelray's recurring pattern: useful systems were often implemented before the operator workflow, authorization, production routing, or outcome behavior was established. The current RachelOS plan correctly ranks clearing reviewable work, serving the verified deployment, and recording outcomes ahead of engineering.

## Reconciliation of repository conflicts

| Conflict | Resolution |
|---|---|
| Operational Recovery vs. PA Diagnostic | Recovery is the general method; PA is the current commercial wedge. Do not market both as parallel starting offers. |
| One-week assessment vs. 15-day Diagnostic | The 15-day, $25,000 Diagnostic is current. The one-week playbook remains a useful internal rapid-assessment pattern. |
| AI Delivery Assessment as an offer | Retain Built / Activated / Validated, governance, and readiness methods as modules. Retire the standalone public offer. |
| Human API Assessment | Human API is a finding and risk lens, not an offer or maturity score. |
| Operational Intelligence platform | The operating spine is a reusable design model. It does not prove a client-ready horizontal platform. |
| TIF as a complete content operating system | Strategy describes a full loop; runtime evidence proves only bounded capture, evidence, opportunity, asset, version, derivative, diagram, and deterministic read-model capabilities. |
| Knowledge graph proposals | Use typed, reviewed traceability where useful. Do not build or sell graph infrastructure. |
| Fractional advisory | A possible later conversion offer, but not part of the current public two-step path or first-sale recommendation. |

## What is general and what is not

The method generalizes because evidence, state, decisions, exceptions, dependencies, activation, and measurement exist in many operating environments.

It does not generalize RachelOS's:

- lead stages or relationship lifecycle;
- scoring weights or queue-ranking formula;
- real-estate facts and content taxonomy;
- messaging, referral, or nurture rules;
- operator-specific decisions.

Each new domain requires its own evidence, vocabulary, decision rights, failure modes, and outcome measures.

## Primary source basis

- [`docs/TKO_KNOWLEDGE_BASE.md`](docs/TKO_KNOWLEDGE_BASE.md)
- [`CURRENT_REALITY.md`](CURRENT_REALITY.md)
- [`asset-production/METHOD.md`](asset-production/METHOD.md)
- [`docs/HEALTHCARE_ASSESSMENT_LIBRARY.md`](docs/HEALTHCARE_ASSESSMENT_LIBRARY.md)
- [`docs/HEALTHCARE_FRAMEWORK_LIBRARY.md`](docs/HEALTHCARE_FRAMEWORK_LIBRARY.md)
- [`docs/RECOVERY_ASSESSMENT_SAMPLE.md`](docs/RECOVERY_ASSESSMENT_SAMPLE.md)
- [`content/offers/ai-delivery-assessment/AI_DELIVERY_ASSESSMENT.md`](content/offers/ai-delivery-assessment/AI_DELIVERY_ASSESSMENT.md)
- [`asset-production/rachelos-delivery-model/10_FAILED_BETS_AND_LESSONS.md`](asset-production/rachelos-delivery-model/10_FAILED_BETS_AND_LESSONS.md)
- [`09_TODD_OPERATING_PATTERN_ANALYSIS.md`](09_TODD_OPERATING_PATTERN_ANALYSIS.md)
