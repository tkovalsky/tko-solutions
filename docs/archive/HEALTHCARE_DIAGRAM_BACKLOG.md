# Healthcare Diagram Backlog

This backlog extends `docs/TIF_KNOWLEDGE_DIAGRAM_BACKLOG.md`. It is a healthcare-specific production queue; it does not replace existing KD IDs. Register a diagram in TIF only after its evidence link, claim boundary, and human review are present.

| ID | Diagram / purpose | Priority | Evidence posture | Required source / boundary | Consumers |
|---|---|---|---|---|---|
| HD-01 | Enterprise Prior Authorization Architecture — systems, decisions, and human-review points. | P0 | Existing synthetic source; advisory pattern. | `prior-auth-decision-rights`; illustrative, no named systems or payer rules. | PA assessment, framework, proposal. |
| HD-02 | Prior Authorization Current → Future State — routine path, exception path, feedback loop. | P0 | Existing diagrams. | Existing `.mmd` files; synthetic only. | Existing PA guides and assessment. |
| HD-03 | Gold Card Readiness as Operating Quality — readiness follows workflow discipline. | P0 | Experience-based. | PA assessment strategy; not eligibility/certification. | Gold Card module, guide. |
| HD-04 | Administrative Burden Heat Map — effort, rework, missing facts, and exception concentration. | P0 | Advisory pattern. | PA/UM records; no volume/cost visualization without source data. | PA assessment, burden guide. |
| HD-05 | Claims Intake Control Map. | P2 | No direct claims proof. | Direct claims source required. | Research only. |
| HD-06 | Claims Intake → Adjudication → Appeal Flow. | P2 | No direct claims proof. | Direct claims source required. | Research only. |
| HD-07 | Provider-Facing Handoff Map. | P1 | Composite required. | Reviewed provider/PA handoff model; no satisfaction claim. | Provider-experience guide. |
| HD-08 | Eligibility Source-Authority Map. | P2 | No direct proof. | Direct eligibility source required. | Research only. |
| HD-09 | Benefits Decision / Source Conflict Map. | P2 | No direct proof. | Direct benefits source required. | Research only. |
| HD-10 | Clinical Review Priority and Missing-Fact Loop. | P0 | Advisory UM pattern. | `um-prioritization`, `um-missing-information`; not clinical guidance. | UM module, guide. |
| HD-11 | Medical Policy → Workflow → Exception Trace. | P1 | Composite and SME review required. | No policy interpretation or legal claim. | Policy-governance guide. |
| HD-12 | Denial / Appeal / Rework Learning Loop. | P1 | PA-derived composite required. | No appeal representation or outcome claim. | Appeals module, PA proposal. |
| HD-13 | Decision Rights Matrix. | P0 | Existing reusable template. | `prior-auth-decision-rights`, `regulatory-auditability`; illustrative. | PA, regulatory, AI assets. |
| HD-14 | Exception Routing Ladder with backup coverage. | P0 | Advisory pattern. | `prior-auth-exception-routing`; no SLA claim. | PA assessment, workflow governance. |
| HD-15 | Healthcare Governance Control Stack. | P0 | Existing artifact brief. | `regulatory-auditability`; not a compliance certification. | Regulatory proposal, guide. |
| HD-16 | Portfolio Dependency / Capacity Map. | P0 | Experience-based composite. | `transformation-dashboard-green`; no program-specific data. | Recovery assessment, executive brief. |
| HD-17 | Funding Readiness Decision Tree. | P2 | No direct funding proof. | Direct investment evidence required. | Internal research. |
| HD-18 | Regulatory Program Operating Model. | P0 | Advisory pattern. | `regulatory-auditability`; no legal interpretation. | Regulatory guide, proposal. |
| HD-19 | Status → Constraint → Decision Executive Review. | P0 | Existing Recovery Assessment sample. | Sample is illustrative. | Recovery assessment, reporting guide. |
| HD-20 | Cross-Functional Delivery Handoff / Escalation Map. | P0 | Experience-based composite. | `workflow-modernization-operating-model`, `transformation-dashboard-green`. | Program recovery assets. |
| HD-21 | Healthcare AI Workflow Readiness Gate. | P1 | Hybrid proof. | RachelOS controls + healthcare context; do not imply healthcare deployment. | AI readiness assessment. |
| HD-22 | Healthcare Operational Intelligence Decision Layer. | P1 | Hybrid proof. | `interoperability-provenance` + distinct RachelOS proof label. | Architecture/operational-intelligence guide. |
| HD-23 | Enterprise Architecture: Source → Fact → Decision → Action. | P1 | Composite required. | No FHIR/product/certification claim. | Architecture proposal. |
| HD-24 | Program Recovery Evidence Flow. | P0 | Existing Recovery Assessment pattern. | Experience-based composite. | Recovery proposal and guide. |

## Build order

**P0A:** HD-13, HD-14, HD-19, HD-16, HD-24. These are reusable, claim-safe control artifacts.

**P0B:** HD-01, HD-02, HD-03, HD-04, HD-10, HD-15, HD-18, HD-20. Produce only as synthetic or composite models with labels embedded in the rendered diagram.

**P1:** HD-07, HD-11, HD-12, HD-21, HD-22, HD-23 after their evidence artifacts are reviewed.

**P2:** HD-05, HD-06, HD-08, HD-09, HD-17 remain unbuilt.

## Required footer on every healthcare diagram

> Illustrative operating model based on advisory experience and/or approved reusable patterns. It does not disclose a client workflow, patient information, payer rule, measured outcome, compliance certification, or implemented healthcare product.
