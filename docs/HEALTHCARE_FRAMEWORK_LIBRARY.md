# Healthcare Framework Library

Frameworks explain how an operating problem is examined. They are not healthcare products, compliance controls, legal opinions, clinical protocols, or outcome guarantees.

| ID | Framework | Priority | Executive decision it supports | Core dimensions / artifacts | Evidence and boundary |
|---|---|---:|---|---|---|
| FRM-HC-01 | Prior Authorization Operational Quality | P0 | Fix workflow conditions before funding automation, FHIR, or a Gold Card effort. | Intake completeness; documentation; decision tiers; exception routing; denial/rework; Human API risk. `HD-01/02/04/14`. | PA records; advisory pattern only. |
| FRM-HC-02 | Healthcare Decision Rights | P0 | Make authority, evidence, approval, escalation, and audit record explicit. | Routine/exception/override tiers; required facts; accountable owner; approver; audit trail. `HD-13`. | PA and regulatory records; illustrative matrix. |
| FRM-HC-03 | Exception-to-Learning Loop | P0 | Turn exceptions and denials into controlled routing and upstream improvement. | Taxonomy; routing; backup; evidence; decision; feedback; review cadence. `HD-12/14`. | PA-derived pattern; no turnaround or denial claim. |
| FRM-HC-04 | Gold Card Readiness as Operating Quality | P0 | Decide whether operational discipline is ready before pursuing program goals. | Workflow consistency; documentation discipline; exception control; feedback loop; management review. `HD-03`. | Positioning lens only; not eligibility or certification. |
| FRM-HC-05 | Administrative Burden Anatomy | P0 | Find where repeat work, missing facts, rework, and handoffs consume capacity. | Work steps; wait states; missing facts; repeat touches; exception volume; Human API concentration. `HD-04`. | Non-metric pattern; no savings/capacity promise. |
| FRM-HC-06 | Clinical Review Priority and Missing Facts | P0 | Decide how work is prioritized and what information must be resolved before review. | Urgency; completeness; review criteria; priority rationale; override; escalation. `HD-10`. | UM advisory experience; not clinical guidance. |
| FRM-HC-07 | Workflow Governance Control Stack | P0 | Convert a process map into governed operating behavior. | Source authority; decision rights; approval gate; audit record; change control; drift review. `HD-15`. | Regulatory/modernization pattern; not an audit control opinion. |
| FRM-HC-08 | Regulatory Program Operating Model | P0 | Embed a regulatory requirement in daily work rather than documentation alone. | Requirement-to-workflow trace; owners; evidence; exception path; training; operating review. `HD-18`. | Advisory experience; no legal interpretation. |
| FRM-HC-09 | Enterprise Program Recovery | P0 | Re-establish enterprise truth before funding, replanning, or escalating a program. | Constraint register; dependency map; capacity; decision register; risk cadence; sponsor actions. `HD-16/19/20/24`. | Experience-based and Recovery Assessment sample; no recovery result claim. |
| FRM-HC-10 | Healthcare AI Workflow Readiness | P1 | Determine whether AI can safely assist a defined workflow. | Authoritative facts; decision tiers; human approval; observability; adoption owner; incident path. `HD-21`. | RachelOS implementation proof is separate from healthcare context. |
| FRM-HC-11 | Operational Intelligence / Decision Layer | P1 | Decide what operating layer is required above systems of record and reporting. | Source; governed fact; memory/state; priority; decision; action; learning. `HD-22/23`. | Interoperability experience plus non-healthcare implementation proof; do not conflate. |
| FRM-HC-12 | Claims / Eligibility / Benefits Discovery Model | P2 | Frame initial discovery without claiming a service capability. | Source authority; intake; policy; decision; handoff; exception; audit questions. | No direct proof; internal use only. |

## Standard framework publication package

Each promoted framework requires: one diagram; a two-page executive explainer; an assessment question set; one bounded Operator Note; one LinkedIn package; a proposal module; source evidence IDs; and the standing claim boundary. Do not promote a P1 framework until its composite or reviewed source exists.
