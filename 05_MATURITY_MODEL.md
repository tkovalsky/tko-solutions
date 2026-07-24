# TKO Operational Intelligence Maturity Model

**Status:** Directional assessment model derived from repository patterns
**Not:** An industry benchmark, certification, validated psychometric instrument, or composite performance score

## Repository basis

The repository does imply maturity progression. The clearest explicit seed appears in [`asset-production/templates/knowledge-diagram.md`](asset-production/templates/knowledge-diagram.md):

1. Ad hoc
2. Email approvals
3. Governed
4. Measured
5. Operational intelligence

The rest of the repository supplies the meaning of those levels:

- Human API and dependency analysis describes ad hoc, person-dependent work.
- Email and side-channel coordination describes recorded but reconstructive work.
- Source authority, decision rights, exceptions, and human approval define governed work.
- Built / Activated / Validated and operational telemetry define measured work.
- The RachelOS spine defines closed-loop operational intelligence.

The model below consolidates that evidence. It does not claim external validation.

## The five levels

| Level | Repository label | Operating description | Executive implication |
|---:|---|---|---|
| **1** | Ad hoc | Work depends on individual memory, local artifacts, tacit judgment, and heroic recovery. State and ownership are reconstructed. | Continuity, quality, and capacity are person-dependent. Automation would encode instability. |
| **2** | Email approvals | Work is recorded and coordinated through systems, email, meetings, and spreadsheets, but the operating truth remains fragmented. Approvals exist without a reliable decision model. | Leadership receives activity and status but cannot consistently see causes, exceptions, or next decisions. |
| **3** | Governed | Source authority, state, workflow, decision rights, exceptions, escalation, approval, and ownership are explicit. One canonical operating view is emerging. | The organization can standardize work and make controlled technology choices. |
| **4** | Measured | Governed work is activated. Baselines, adoption, health, failure modes, adherence, and outcomes are reviewed with trusted definitions. | Leadership can distinguish implementation from operating value and adjust based on evidence. |
| **5** | Operational intelligence | Signals continuously update memory, facts, state, priority, recommendation, human decision, action, and outcome. Learning improves the governed workflow. | Safe automation and decision support can compress coordination without surrendering authority. |

Level 5 is not “fully automated.” Human judgment may remain central. Maturity is the ability to place human authority deliberately and support it with reliable operational intelligence.

## Assessment dimensions

### 1. Governance

| Level | Observable condition |
|---:|---|
| 1 | Ownership and authority depend on tenure or personal relationships. |
| 2 | Approvals and committees exist, but rationale, override, and closure are inconsistent. |
| 3 | Decision rights, source authority, approval, escalation, and review cadence are explicit. |
| 4 | Governance behavior, exceptions, overrides, and unresolved decisions are measured. |
| 5 | Governance adapts through reviewed evidence without weakening control or accountability. |

### 2. Workflow

| Level | Observable condition |
|---:|---|
| 1 | Actual work varies by operator and is poorly documented. |
| 2 | A documented process exists, while exceptions and side channels drive real work. |
| 3 | Current and target workflows define entry, state, handoffs, exceptions, escalation, and closure. |
| 4 | Adherence, rework, delay, touch, and exception behavior are visible. |
| 5 | Workflow state and constraints continuously inform prioritized intervention. |

### 3. Decision quality

| Level | Observable condition |
|---:|---|
| 1 | Decisions rely on individual recall and cannot be reconstructed. |
| 2 | Decisions are discussed in meetings or email, but evidence and rationale remain fragmented. |
| 3 | Required facts, authority, recommendation, rationale, and decision are recorded. |
| 4 | Decision timeliness, reversals, escalations, and downstream effects are reviewed. |
| 5 | The system surfaces missing facts and explains the next decision while preserving human authority. |

### 4. Automation readiness

| Level | Observable condition |
|---:|---|
| 1 | Automation is proposed as a substitute for understanding the workflow. |
| 2 | Tools exist, but activation, ownership, exception behavior, and failure handling are unclear. |
| 3 | Stable tasks, inputs, controls, exception paths, owners, and stop conditions are defined. |
| 4 | Automation is activated, observable, recoverable, and compared with an accepted baseline. |
| 5 | Bounded automation adapts through governed evidence and remains subordinate to decision rights. |

### 5. AI trust and control

| Level | Observable condition |
|---:|---|
| 1 | AI outputs are accepted or rejected informally; source and responsibility are unclear. |
| 2 | Human review is claimed but inconsistently placed or evidenced. |
| 3 | AI tasks, sources, claim boundaries, approvals, overrides, and failure paths are explicit. |
| 4 | Quality, adoption, exceptions, failure, and human edits are observed. |
| 5 | AI reliably compresses supported coordination or drafting while consequential judgment remains governed. |

### 6. Data quality and source authority

| Level | Observable condition |
|---:|---|
| 1 | Conflicting values circulate without an accountable source. |
| 2 | Data is available but provenance, freshness, and authority are unclear. |
| 3 | Material facts have source, owner, confidence, freshness, and correction rules. |
| 4 | Missing, stale, contradictory, and low-confidence facts are visible and acted upon. |
| 5 | Source-governed facts update operational state and decision support continuously. |

### 7. Operational visibility

| Level | Observable condition |
|---:|---|
| 1 | State is discovered by asking experienced people. |
| 2 | Dashboards and reports show activity but not dependable priority, cause, or next action. |
| 3 | A canonical view shows work state, owner, age, gaps, exceptions, and required decisions. |
| 4 | System health, backlog, failure, adherence, and outcomes are visible at operating cadence. |
| 5 | Visibility triggers explainable recommendations and targeted interventions. |

### 8. Measurement

| Level | Observable condition |
|---:|---|
| 1 | Success is anecdotal or inferred from completion. |
| 2 | Metrics exist but definitions, sources, boundaries, and decision use vary. |
| 3 | KPIs have accepted definitions, owners, sources, cadence, and limitations. |
| 4 | Baseline, adoption, operating performance, and outcomes are reviewed together. |
| 5 | Measurement feeds controlled learning without overstating causality or attribution. |

### 9. Adoption and change

| Level | Observable condition |
|---:|---|
| 1 | Change depends on individual champions and workarounds. |
| 2 | Training or launch occurred, but daily use and ownership are uncertain. |
| 3 | Owner, standard work, training, support, feedback, and escalation are defined. |
| 4 | Use, adherence, overrides, friction, and sustainment are observed and corrected. |
| 5 | The operating system incorporates reviewed user evidence and safely retires weak practices. |

### 10. Knowledge transferability

| Level | Observable condition |
|---:|---|
| 1 | Critical work stops or degrades when a key person is absent. |
| 2 | Notes and documents exist but do not capture exception judgment or practical sequencing. |
| 3 | Facts, rules, exceptions, escalation, rationale, and backup ownership are maintainable. |
| 4 | Another trained operator can execute, explain, and improve the work with measured consistency. |
| 5 | Operational learning is captured, reviewed, reused, and traceable without exposing restricted knowledge. |

## How to score responsibly

### Unit of assessment

Score a **specific workflow or workflow segment**, not an entire enterprise. Organization-wide averages hide the variation the framework is designed to expose.

### Evidence rubric

For each dimension:

1. assign the lowest level whose required evidence is consistently observed;
2. cite at least one artifact, record, observation, or interview source;
3. state contradictions and missing evidence;
4. label confidence High, Medium, or Low;
5. record whether the condition is Built, Activated, and Validated where applicable.

### No false precision

- Do not convert missing evidence to zero.
- Do not average dimensions into a universal maturity score by default.
- Do not use decimal scores.
- Do not compare clients to an invented industry percentile.
- Do not claim that Level 5 is always economically justified.

A profile is more useful than a composite:

```text
Governance                 3
Workflow                   2
Decision quality           2
Automation readiness       1
AI trust and control       2
Data/source authority      2
Operational visibility     2
Measurement                2
Adoption                   2
Knowledge transferability  1
```

The recommendation should target the constraint that matters to the executive decision, not mechanically raise every dimension.

## Minimum evidence by level

| Level | Minimum acceptable evidence |
|---:|---|
| 1 | Repeated specific examples of person-dependent or unreconstructable work |
| 2 | Artifacts showing recorded process plus observed fragmentation, side-channel work, or ambiguous approval |
| 3 | Approved workflow, roles, source authority, decision and exception controls, and accountable owner |
| 4 | Production or operating records showing activation, adoption, health, and outcome measures over an agreed period |
| 5 | Traceable closed-loop behavior from signal through outcome, plus reviewed evidence of learning and control |

## Use in the flagship Diagnostic

Use maturity results to answer:

- Which operating condition is causing or amplifying the target performance problem?
- What must reach Level 3 before automation is responsible?
- Which existing capability is built but not activated?
- Which Level 4 measures are necessary for a controlled pilot?
- Where is Level 2 coordination appropriate and sufficient, rather than a software gap?

The maturity model is a diagnostic aid. The paid output remains a decision, target workflow, and improvement plan.

## Validation path

Before describing the model as validated:

1. apply it to at least three bounded workflows;
2. use two reviewers on a shared evidence set;
3. record scoring disagreements and refine observable criteria;
4. test whether scores predict the same priority findings as the qualitative method;
5. confirm clients understand the profile without interpreting it as certification;
6. retain version history and never rewrite prior scores silently.

Until that work exists, label every assessment **directional and repository-derived**.

## Primary source basis

- [`asset-production/templates/knowledge-diagram.md`](asset-production/templates/knowledge-diagram.md)
- [`docs/ASSESSMENT_FRAMEWORK.md`](docs/ASSESSMENT_FRAMEWORK.md)
- [`docs/TKO_KNOWLEDGE_BASE.md`](docs/TKO_KNOWLEDGE_BASE.md)
- [`content/offers/ai-delivery-assessment/AI_DELIVERY_ASSESSMENT.md`](content/offers/ai-delivery-assessment/AI_DELIVERY_ASSESSMENT.md)
- [`asset-production/rachelos-delivery-model/10_FAILED_BETS_AND_LESSONS.md`](asset-production/rachelos-delivery-model/10_FAILED_BETS_AND_LESSONS.md)
- [`content/proof/rachelos/RACHELOS_EVIDENCE_LIBRARY.md`](content/proof/rachelos/RACHELOS_EVIDENCE_LIBRARY.md)
