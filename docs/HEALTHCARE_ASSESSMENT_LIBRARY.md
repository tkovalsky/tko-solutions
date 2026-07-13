# Healthcare Assessment Library

All assessments are fixed-scope diagnostic offers or modules. Scores are directional diagnostic aids, never validated benchmarks, actuarial measures, clinical determinations, or compliance certifications.

| ID | Assessment | Priority | Trigger / sponsor decision | Inputs | Outputs | Reuse / boundary |
|---|---|---:|---|---|---|---|
| ASM-HC-01 | Prior Authorization Operational Assessment | P0 | PA, UM, or provider-operations leader deciding what to fix before automation or Gold Card work. | Submissions, denials, workflow, staffing model, payer mix, interviews. | Burden, denial-driver, exception, Human API, and readiness findings; prioritized next move. | Existing service and strategy. No outcome/eligibility promise. |
| ASM-HC-02 | Decision Rights and Exception Routing Module | P0 | Sponsor needs to make routine, exception, and escalation authority explicit. | Decision samples, exception examples, existing policy/process, owner interviews. | Decision-rights matrix, exception taxonomy, escalation/back-up map, evidence gaps. | Reusable PA/regulatory module; illustrative control design. |
| ASM-HC-03 | Administrative Burden Diagnostic | P0 | Operations leader needs to see where rework and manual reconstruction concentrate. | Workflow observation, queue/state examples, rework samples, interviews. | Burden heat map, wait/rework map, missing-fact and Human API findings. | Module within PA or Recovery Assessment; no savings or staffing estimate. |
| ASM-HC-04 | Provider Experience Handoff Review | P1 | Provider operations leader needs to identify avoidable workflow friction. | Reviewed composite or authorized interviews, intake/status/escalation artifacts. | External handoff map, communication/ownership gaps, improvement backlog. | Create evidence first; no provider-satisfaction claim. |
| ASM-HC-05 | Clinical Review Priority / Missing-Fact Review | P0 | UM leader needs a visible priority rationale and missing-information control. | Queue examples, review criteria, missing-information examples, escalation samples. | Priority model, missing-fact inventory, override/escalation control. | Advisory UM pattern; no clinical judgment or medical-necessity decision. |
| ASM-HC-06 | Workflow and Regulatory Governance Review | P0 | Compliance or operations sponsor needs to test whether documented requirements operate in practice. | Requirement trace, workflow, approvals, audit artifacts, change process. | Governance control stack, decision/audit gaps, operating-review design. | Experience-based; not a compliance audit or legal opinion. |
| ASM-HC-07 | Denial / Appeals Feedback Review | P1 | PA leader needs to determine whether rework is producing operational learning. | Authorized denial/appeal categories, workflow, routing, feedback artifacts. | Rework loop, exception taxonomy, upstream improvement backlog. | Composite required; no appeals representation or outcome claim. |
| ASM-HC-08 | Claims / Eligibility / Benefits Discovery | P2 | Exploratory buyer conversation only. | Direct domain evidence required before a scoped assessment. | Discovery hypothesis and evidence-capture plan. | Not a sellable assessment. |
| ASM-HC-09 | Healthcare Program Recovery Assessment | P0 | Executive sponsor needs to decide what to stabilize, sequence, fund, or defer. | Program plan, status, dependencies, decisions, capacity, operating reviews. | Constraint register, dependency map, decision register, prioritized recovery roadmap, executive readout. | Reuses Operational Recovery Assessment. Experience-based composite; no recovery-success guarantee. |
| ASM-HC-10 | Healthcare AI Workflow Readiness Review | P1 | CIO/COO needs to decide whether a bounded AI use case has operating prerequisites. | Workflow, source authority, decision tiers, human review, monitoring, ownership. | Readiness gate, prerequisites, risks, build/defer recommendation. | Hybrid evidence; no safety, HIPAA, or deployed-healthcare-AI claim. |
| ASM-HC-11 | Operational Intelligence / Architecture Review | P1 | Executive team needs to decide whether the constraint is data movement, operating state, or decision governance. | Systems/source map, data conflicts, queue/review artifacts, interviews. | Source-authority map, decision-layer architecture, phased backlog. | Composite required; no FHIR/platform implementation claim. |

## Recovery Assessment components

Every P0 healthcare assessment should select the relevant components below rather than inventing a new maturity model:

1. Executive problem and investment decision.
2. Actual versus intended workflow.
3. Source, system, and dependency inventory.
4. Human API / key-person concentration review.
5. Decision rights, exception, and escalation analysis.
6. Constraint and evidence register.
7. Executive operating review and decision register.
8. Prioritized next move: stabilize, redesign, build, buy, defer, or gather evidence.
