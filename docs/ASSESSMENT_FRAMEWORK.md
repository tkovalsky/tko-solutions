# Human API Risk Assessment Framework

> **Status — supporting reference, reframed 2026-06-25.** "Human API" is a **finding type and
> diagnostic lens**, not a standalone offer, separate assessment, or pricing tier. The offers are
> the **Operational Recovery Assessment** and the **Prior Authorization Operational Assessment**
> (see the authoritative [`/CURRENT_REALITY.md`](../CURRENT_REALITY.md)). This scoring model is
> retained as the **knowledge-concentration / dependency sub-module** of the Operational Recovery
> Assessment — one of its evaluation dimensions, not a separate scored product.

## Framework Overview

The framework has five stages:

1. Identify Human APIs.
2. Measure Human API dependency.
3. Classify risk.
4. Prioritize remediation.
5. Track progress.

The framework is designed for advisory assessment. It is not a validated actuarial model or software scoring engine.

## Stage 1: Identify Human APIs

Human APIs are individuals who perform one or more unofficial operating-system functions:

- Memory: They remember context, history, exceptions, or prior decisions.
- Routing: They know where work should go next.
- Escalation: They know who needs to be involved when standard process fails.
- Translation: They convert ambiguity into action.
- Decision support: They know the facts and criteria needed to make a decision.
- System bridge: They reconcile gaps between tools, reports, and workflows.
- Governance substitute: They enforce standards informally because formal controls are weak.

Identification signals:

- "Ask [person]" is the default operating instruction.
- Work stops when a person is out.
- A spreadsheet owned by one person controls the workflow.
- Meetings exist primarily to reconstruct status.
- Exceptions are routed through personal relationships.
- Reports require manual interpretation by a specific person.
- AI or automation pilots fail because no one can define the decision logic.

## Stage 2: Measure Human API Dependency

Assess dependency across seven dimensions.

### 1. Criticality

How important is the workflow to business, regulatory, financial, member, provider, or program outcomes?

Score:

- 1: Low operational impact
- 2: Local team impact
- 3: Department-level impact
- 4: Cross-functional impact
- 5: Enterprise, regulatory, clinical, financial, or sponsor-critical impact

### 2. Concentration

How much critical knowledge or routing ability is concentrated in one or few people?

Score:

- 1: Distributed and documented
- 2: Mostly distributed
- 3: Known by a small group
- 4: Heavily dependent on one or two people
- 5: Single point of operational knowledge

### 3. Visibility

How visible is the actual workflow state without asking the Human API?

Score:

- 1: Workflow state is visible in governed systems
- 2: Mostly visible with minor manual context
- 3: Partially visible across tools
- 4: Mostly reconstructed through meetings or messages
- 5: Not visible without specific individuals

### 4. Decision Clarity

Are decision criteria, authority, required facts, and approval paths explicit?

Score:

- 1: Explicit and governed
- 2: Mostly explicit
- 3: Partially documented
- 4: Mostly tacit
- 5: Lives in individual judgment with no durable model

### 5. Escalation Fragility

How dependent are exceptions and escalations on personal routing?

Score:

- 1: Escalation paths are defined and used
- 2: Minor informal routing
- 3: Mixed formal and informal paths
- 4: Exceptions depend on personal relationships
- 5: Escalations fail or stall without named people

### 6. Transferability

How easily can another person perform the Human API function?

Score:

- 1: Fully transferable through documentation and systems
- 2: Transferable with short onboarding
- 3: Transferable with significant shadowing
- 4: Difficult to transfer
- 5: Not transferable without the person

### 7. AI Readiness

Can AI safely assist the workflow given current facts, decision rules, governance, and human approval model?

Score:

- 1: Ready for controlled AI support
- 2: Mostly ready after minor cleanup
- 3: Some prerequisites missing
- 4: Major decision and data gaps
- 5: Unsafe to apply AI beyond summarization or discovery

## Scoring Model

For each assessed workflow:

Human API Risk Score = average of the seven dimension scores.

Use the average as a directional score and the individual dimension scores as the real diagnostic value.

Suggested weighting for healthcare operations:

- Criticality: 20%
- Concentration: 20%
- Visibility: 15%
- Decision Clarity: 15%
- Escalation Fragility: 10%
- Transferability: 10%
- AI Readiness: 10%

Do not treat this as validated until field data exists.

## Risk Tiers

### Tier 1: Low Risk

Score: 1.0 to 1.9

Pattern:

- Work is visible, documented, and transferable.
- Human expertise exists but is not the operating model.

Recommended action:

- Maintain governance and documentation.
- Monitor during major change events.

### Tier 2: Moderate Risk

Score: 2.0 to 2.9

Pattern:

- Some dependency exists, but work can continue with manageable delay.
- Documentation or workflow visibility gaps are known.

Recommended action:

- Capture decision rules and exception paths.
- Improve workflow state visibility.
- Cross-train backup roles.

### Tier 3: High Risk

Score: 3.0 to 3.9

Pattern:

- Work depends materially on specific people.
- Escalation and decision rules are inconsistent.
- Visibility requires meetings, messages, or spreadsheets.

Recommended action:

- Create a remediation backlog.
- Build decision and escalation inventory.
- Reduce spreadsheet and meeting dependency.
- Establish governance cadence.

### Tier 4: Critical Risk

Score: 4.0 to 5.0

Pattern:

- A person or small group is effectively the operating system.
- Workflow continuity, compliance, transformation, or AI adoption is at risk.
- Transferability is low and business impact is high.

Recommended action:

- Sponsor-level intervention.
- Immediate capture of workflow, decision, and escalation logic.
- Backup coverage plan.
- Decision layer build sprint.
- Weekly risk tracking until dependency is reduced.

## Example Findings

Finding: Prior authorization operational quality depends on one or two experienced authorization specialists.

Evidence:

- Staff describe the same people as the source for payer-specific rules, escalation paths, exception handling, and documentation requirements.
- Denials and delays cluster around incomplete documentation, inconsistent routing, or payer-specific knowledge not captured in the workflow.
- Managers believe the workflow is documented, but ambiguous cases still route through named people.

Risk:

- High concentration, escalation fragility, transferability, and administrative burden risk.

Recommendation:

- Run a Prior Authorization Operational Assessment focused on administrative burden, denial analysis, exception patterns, Human API risk, and Gold Card readiness as an operational-quality output.
- Do not begin with Gold Card software, PA automation software, FHIR integration, claims integration, or AI.

Finding: Prior authorization exception routing depends on two senior operators.

Evidence:

- Managers and operators describe the same two names as the path for ambiguous cases.
- Formal process documentation does not describe exception handling.
- Queue status does not show why cases are waiting.

Risk:

- High escalation fragility and low transferability.

Recommendation:

- Document exception categories, decision rights, required facts, and routing rules.
- Establish a governed escalation path and backup coverage model.

Finding: Transformation status is green, but dependency risk is hidden between workstreams.

Evidence:

- Status reports track local milestones but not cross-team dependencies.
- Program leaders rely on one portfolio lead to explain real risk.
- Risk decisions occur in recurring meetings without a durable decision log.

Risk:

- High visibility and decision clarity risk.

Recommendation:

- Create dependency-layer truth map and executive decision log.
- Separate status reporting from operational risk management.

Finding: AI pilot cannot scale because decision criteria are tacit.

Evidence:

- Teams can describe examples but not formal rules.
- Reviewers disagree on when human approval is required.
- Output quality is evaluated manually without consistent feedback categories.

Risk:

- Low AI readiness.

Recommendation:

- Build decision inventory before expanding AI support.
- Define human approval gates and feedback loop.

## Remediation Prioritization

Rank remediation opportunities by:

- Risk tier
- Business criticality
- Transferability risk
- Decision latency
- Regulatory or audit exposure
- AI or automation dependency
- Effort to remediate
- Sponsor urgency

High-priority remediation usually has:

- High or critical risk
- High business importance
- Low transferability
- Clear capture path
- Sponsor ownership

## Progress Tracking

Track progress using dependency-reduction indicators:

- Number of critical decisions documented.
- Number of escalation paths made explicit.
- Number of workflows with backup ownership.
- Reduction in meeting-only status reconstruction.
- Reduction in spreadsheet or email dependency.
- Increase in workflow state visibility.
- AI readiness prerequisites completed.
- Human API risk tier reduced after reassessment.
