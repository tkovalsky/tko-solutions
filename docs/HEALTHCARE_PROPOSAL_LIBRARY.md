# Healthcare Proposal Library

These are reusable proposal modules, not new offers. They should be assembled beneath the existing Prior Authorization Operational Assessment, Operational Recovery Assessment, AI Delivery Assessment, and optional advisory path only after a fit conversation.

| ID | Module | Priority | Buyer decision | Scope / deliverables | Evidence and exclusions |
|---|---|---:|---|---|---|
| PROP-HC-01 | Prior Authorization Operational Quality | P0 | What must be fixed before automation, Gold Card activity, or platform spend? | Actual-state workflow; burden/denial/exception analysis; Human API risk; readiness findings; executive readout. | Existing PA assessment. Excludes PA software, Gold Card platform, FHIR, claims integration, and outcome promises. |
| PROP-HC-02 | Decision Rights and Exception Routing Sprint | P0 | Who can decide what, using what evidence, and where does nonstandard work go? | Decision-rights matrix; exception taxonomy; escalation/back-up design; audit trail requirements; implementation backlog. | PA/regulatory patterns. Excludes policy interpretation, clinical judgment, and compliance certification. |
| PROP-HC-03 | Healthcare Program Recovery | P0 | What must leadership stabilize, sequence, or escalate before further spend? | Constraint register; dependency/capacity map; decision register; executive operating review; recovery roadmap. | Recovery Assessment and transformation evidence. Excludes program rescue guarantee, PMO staffing, and financial-benefit promise. |
| PROP-HC-04 | Regulatory Program Operating Model | P0 | Is the requirement embedded in daily work or only documented? | Requirement-to-workflow trace; governance stack; exception and audit path; operating-review cadence. | Regulatory advisory experience. Excludes legal advice, formal audit, and certification. |
| PROP-HC-05 | Healthcare AI / Decision-Layer Readiness | P1 | Is the workflow ready for bounded human-controlled AI or a decision-layer build? | Source authority; workflow/readiness gate; human approval; observability; build/defer backlog. | Separate RachelOS implementation proof from healthcare background. Excludes clinical AI, safety/HIPAA guarantees, and healthcare product claims. |
| PROP-HC-06 | Provider Experience Handoff Review | P1 | Which hidden handoffs are creating avoidable provider friction? | Composite-informed handoff map; ownership/status/escalation gaps; prioritized improvement backlog. | Requires reviewed source first. Excludes provider-satisfaction or access outcome claims. |

**P2 exclusion:** claims intake/adjudication, eligibility, benefits, and healthcare funding have no proposal modules. They remain evidence-capture topics, not sellable scopes.

## Proposal assembly order

1. State the executive decision and active symptom.
2. Select one primary module and only the applicable assessment components.
3. Name inputs, access required, deliverables, decision date, and sponsor.
4. Attach the matching diagram and claim boundary.
5. Explicitly list exclusions. Do not widen scope into a platform, managed service, clinical judgment, legal work, or unproven product.
