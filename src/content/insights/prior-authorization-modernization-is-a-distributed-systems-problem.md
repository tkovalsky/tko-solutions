---
title: "Prior Authorization Modernization Is a Distributed Systems Problem"
description: >-
  Why removing clinical review still requires coordinated benefit, policy, provider,
  workflow, and claims decisions—and where AI can and cannot help.
business_unit: healthcare
voice: tko-advisory
cluster: prior-authorization-operations
primary_buyer: >-
  Health-plan operations, utilization-management, provider-experience, transformation,
  and technology executives responsible for prior-authorization modernization.
buyer_problem: >-
  A burden-reduction commitment has been translated into projects, but no artifact shows
  whether every plan, provider, service, workflow, and downstream claims system will produce
  the intended behavior.
trigger_signal: >-
  A Gold Card, rural-access, code-reduction, delegated-UM, interoperability, or legacy-platform
  migration initiative is approaching implementation and end-to-end readiness remains unclear.
search_intent: >-
  Understand the operating model and architecture required to implement prior-authorization
  modernization across payer systems without creating claims fallout or new manual work.
problem_hypothesis: >-
  Prior-authorization modernization stalls when benefit coverage, authorization policy,
  provider qualification, clinical routing, and claims controls are treated as one decision
  even though different systems and teams own them.
point_of_view: >-
  Announcing that a requirement is going away is a policy decision. Making it disappear safely
  across plans, providers, services, workflows, and claims systems is an operating-model
  transformation.
relevant_proof: >-
  Anonymized payer experience leading integrated governance, dependency management, testing
  coordination, escalation, and readiness downstream of provider-program and policy decisions;
  plus a public synthetic decision model that makes the boundaries inspectable without using PHI
  or reproducing a payer's rules.
ai_useful: >-
  AI can extract candidate facts from policy documents, summarize assembled cases, classify
  exception and fallout patterns, and draft reviewable artifacts when source provenance,
  confidence, and human authority remain explicit.
ai_not_answer: >-
  AI should not invent the controlling benefit, policy, qualification, or clinical rule; resolve
  conflicting source authority; or silently issue consequential determinations when required
  inputs are missing.
diagnostic_questions:
  - "Which system is authoritative for benefit coverage, authorization policy, provider qualification, clinical routing, and the claims control artifact?"
  - "Can one service require authorization in one plan and not another, and is that variation effective-dated and testable?"
  - "When clinical review is waived, what record must still exist for downstream claims processing?"
  - "How are provider appeals, requalification, TIN changes, and program-effective dates reflected in operational routing?"
  - "What evidence proves the intended population reached the new path without creating claims fallout or manual rework?"
recommended_action: >-
  Reconstruct one bounded change as an effective-dated decision context, trace it through every
  authority and downstream consumer, and define activation and burden measures before expanding.
offer: transformation-diagnostic
cta: "Discuss a Transformation"
status: published
reviewer: "Todd Kovalsky"
reviewed_date: "2026-09-03"
sources:
  - healthcare:prior-auth-modernization-experience
  - /healthcare/impact-assessment
  - https://www.cms.gov/initiatives/burden-reduction/overview/interoperability/policies-regulations/cms-interoperability-prior-authorization-final-rule-cms-0057-f
  - https://hl7.org/fhir/us/davinci-crd/
  - https://hl7.org/fhir/us/davinci-dtr/
  - https://hl7.org/fhir/us/davinci-pas/
date: "2026-09-03"
slug: prior-authorization-modernization-is-a-distributed-systems-problem
featured: false
---

Prior-authorization modernization is often announced as a reduction: fewer codes, fewer clinical reviews, faster decisions, less work for providers. The commitment can be stated in one sentence. The operational change cannot.

A payer may need to know which coverage is active, whether the service is a covered benefit, whether the effective procedure policy requires authorization, whether the submitted provider entity qualifies for a program, where any remaining review belongs, and which record downstream claims processing expects to find. Those answers may come from different systems, be owned by different teams, change on different schedules, and use different identifiers.

That is why a burden-reduction commitment can be correct at the policy level and still fail in production. The real work is not removing a step. It is making multiple systems produce one consistent, reconstructable result.

## Five Decisions That Should Never Be Collapsed Into One Flag

The most important architecture move is separating questions that sound similar but have different authorities.

1. **Is the member eligible for this plan on the service date?** Member and eligibility systems answer this.
2. **Is the service a covered benefit?** Benefit and product configuration answer this. Coverage is not an authorization determination.
3. **Does the plan require prior authorization for this service?** An effective-dated procedure policy answers this for the relevant line of business, plan, service, state, place of service, and other applicable dimensions.
4. **Does a provider-program qualification change that requirement?** The answer may depend on the billing or rendering entity, TIN, service, plan participation, qualification period, and program type.
5. **What does the next system need?** The clinical review path may be removed while claims processing still needs an authorization-shaped control record, such as an advance notification.

The relationships are conditional. A service can be covered and require authorization. It can be covered and not require authorization. It can normally require authorization while an active provider qualification waives review for a specific provider-service-plan combination. Removing review may or may not remove the downstream notification requirement.

If those states are compressed into `waived = yes`, the implementation loses the reason, scope, effective date, and downstream obligation. That produces a fast answer nobody can safely use.

## A Better Central Object: the Effective-Dated Decision Context

The modernization layer should not try to replace every source system. It should assemble the minimum controlling facts for one request, preserve where they came from, apply governed logic, and record the outcome.

For a bounded scenario, that context includes:

- member and plan identity for the service date;
- line of business and applicable account or product variation;
- requested service and relevant classification;
- provider identity, role, network relationship, and TIN match;
- effective procedure-policy version;
- active provider-program qualification and included services;
- delegated or internal clinical-review route;
- required advance-notification or prior-authorization artifact;
- decision timestamp, rule version, source references, and exceptions.

This is an orchestration record, not a new master repository. Eligibility remains authoritative for eligibility. Benefit configuration remains authoritative for coverage. The procedure-policy source remains authoritative for the base requirement. Provider-program sources remain authoritative for qualification. The orchestration layer is accountable for resolving those inputs into a governed path and making the result reconstructable.

That boundary matters during a multiyear platform migration. A legacy intake or clinical-review platform and its target replacement can coexist without each independently reimplementing the full decision model. Both can consume the same explicit determination, subject to integration and cutover controls, while migration testing proves that the new route produces the intended downstream behavior.

## The Claims Artifact Is Part of the Product

One of the easiest ways to create avoidable provider friction is to declare that authorization is no longer required while leaving claims behavior unchanged or undefined.

Clinical authorization review and claims control are related, but they are not identical. A payer can remove medical-necessity review for a qualified scenario and still need a durable notification record so adjudication can recognize that the service followed the approved administrative path.

That record is not a trivial implementation detail. It is part of the operating promise. If the record is missing, late, attached to the wrong provider entity, or created under the wrong policy version, the provider experiences the modernization as a denial, status call, correction, or appeal.

The end-to-end acceptance test therefore cannot stop at “the authorization screen was bypassed.” It must prove that the intended decision reached intake, orchestration, the clinical route or bypass, the durable control artifact, and downstream claims behavior.

## Provider Qualification Is a Lifecycle, Not a Static List

Performance-based programs and rural-access programs should not be modeled as the same qualification with a different label.

A performance-based qualification may be calculated from historical activity and approved for a defined period. A rural-access qualification may be established from network and geographic criteria. Other programs may use regulatory, specialty, facility, or contractual criteria. Each has a different source authority, appeal process, refresh cadence, and evidence requirement.

The shared implementation pattern is temporal:

- candidate;
- qualified or not qualified;
- active for a defined period;
- appealed or manually reviewed;
- renewed, changed, or expired;
- applied only to the services and plans the program includes.

A provider that qualified last year is not automatically qualified for a future service date. A group TIN and an individual identifier are not interchangeable. A qualification for one service category does not imply qualification for all services. Those are deterministic controls, not opportunities for probabilistic interpretation.

## Where Deterministic Logic, AI Assistance, and Human Judgment Belong

The architecture needs three separate lanes.

**Deterministic logic** belongs where the organization has an authoritative, computable rule: effective dates, exact identifiers, plan applicability, service inclusion, qualification status, route selection, required artifact, and fail-closed behavior when a required fact is missing.

**AI assistance** is useful around unstructured work: extracting candidate policy changes from documents, comparing versions for human review, identifying missing case information, summarizing assembled evidence, clustering exception reasons, and drafting correspondence. Every model-produced fact should retain its source and confidence and remain a candidate until a governed process accepts it.

**Human judgment** remains necessary when source authorities conflict, an exception has no approved rule, an appeal requires review, clinical criteria must be evaluated, or a policy owner must decide how a new scenario should work. The human role should be named and auditable, not represented by a generic “manual review” box.

The most important AI control is architectural: the model never becomes the silent source of benefit, policy, qualification, or clinical authority.

## What to Measure Before Claiming Impact

A working decision service proves that a rule can execute. It does not prove that administrative burden fell.

Impact requires three evidence layers.

**Activation evidence** shows that the intended plan-provider-service population reached the new route, under the correct effective policy and qualification versions.

**Operational evidence** measures staff touches, active minutes, calls, rework, elapsed time, clean notification or authorization creation, exception volume, and appeals. These measures need a pre-change baseline and useful segmentation.

**Downstream evidence** measures missing or mismatched artifacts, claim fallout connected to the changed path, and unintended routing behavior. Without this layer, a program can report fewer authorization reviews by moving the burden into claims and provider service.

The baseline must distinguish work removed from work displaced. It must also distinguish administrative improvement from clinical outcomes, which this operating model does not establish.

## A Practical First Slice

Do not begin by rebuilding the payer ecosystem. Begin with one scenario that forces the important boundaries into view.

For example: a member is eligible, the service is covered, the plan normally requires prior authorization, the provider has an active qualification for that service, clinical review is therefore waived, and claims still requires an advance-notification record.

Implement five things:

1. a synthetic input contract containing the minimum decision context;
2. deterministic rules with explicit source authorities;
3. a step-by-step decision trace;
4. a fail-closed route for missing or conflicting facts;
5. an outcome measurement plan that makes unproven impact visible as a gap.

That slice is small enough to build and rich enough to expose the real transformation problem. It can later be extended with FHIR-aligned exchange, synthetic member and provider data, policy-version ingestion, delegated workflows, legacy-to-target migration scenarios, appeals, and measured observations. Each extension should answer a specific evidence gap rather than becoming a generic healthcare platform.

You can [run the synthetic Healthcare Change Execution Assessment](/healthcare/impact-assessment) and inspect the current decision path. The rules are illustrative and process no patient data. The point is not the sample answer; it is whether your real organization can identify the authoritative source, effective rule, accountable owner, failure path, and downstream evidence for each step.

For the broader operating pattern, see [Prior Authorization Is a Decision-Rights Problem](/insights/prior-authorization-is-a-decision-rights-problem), the [Healthcare Transformation Practice](/healthcare), and [selected healthcare experience](/selected-work/prior-authorization-modernization).

## Public Sources and Claim Boundaries

- [CMS Interoperability and Prior Authorization Final Rule](https://www.cms.gov/initiatives/burden-reduction/overview/interoperability/policies-regulations/cms-interoperability-prior-authorization-final-rule-cms-0057-f): regulatory context, API requirements, and public reporting requirements for impacted payers.
- [HL7 Da Vinci Coverage Requirements Discovery](https://hl7.org/fhir/us/davinci-crd/): a standard pattern for discovering coverage-related requirements in clinical workflow.
- [HL7 Da Vinci Documentation Templates and Rules](https://hl7.org/fhir/us/davinci-dtr/): a standard pattern for retrieving and executing documentation requirements.
- [HL7 Da Vinci Prior Authorization Support](https://hl7.org/fhir/us/davinci-pas/): a FHIR-based implementation guide for prior-authorization request and response exchange.

The decision decomposition, architecture, synthetic scenarios, and measurement plan are TKO advisory work. The prototype does not claim conformance with these implementation guides, reproduce a payer's policy, process PHI, make coverage or clinical decisions, or demonstrate client outcomes. Todd's enterprise healthcare experience supports the problem framing and execution perspective; RachelOS independently demonstrates governed-system implementation and is not healthcare deployment evidence.
