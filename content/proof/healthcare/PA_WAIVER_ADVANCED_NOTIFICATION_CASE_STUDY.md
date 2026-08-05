<!--
Healthcare transformation case study.
Audience: healthcare operations / transformation / technology leaders; Directors & VPs of administrative simplification.
Author role: Program Management and Cross-Functional Delivery Leadership ONLY.
Scope guardrails (do not violate in edits):
  - Do NOT imply ownership of medical policy, provider qualification methodology, waiver criteria, or healthcare economics models.
  - Do NOT claim responsibility for designing qualification algorithms.
  - Methodology is attributed to healthcare economics and medical leadership teams.
  - No invented metrics, percentages, timelines, savings, or outcomes. Unknowns are stated as unknown.
  - No client/organization names (none provided).
Status: COMPLETE. Reviewed by Todd Kovalsky 2026-08-05.
Every statement is classified in §10 Evidence Classification. Any edit that adds a claim
must also add its classification row, or the claim must be removed.
-->

# Prior Authorization Waiver Enablement via Advanced Notification

*A healthcare transformation case study — program management and cross-functional delivery perspective.*

> **Scope and attribution.** This account describes program management and cross-functional delivery work. The waiver qualification methodology, provider qualification criteria, medical policy, and healthcare economics models were developed and owned by separate healthcare economics and medical leadership teams. The author was not responsible for that methodology and did not design the qualification algorithms. No metrics, timelines, savings, or outcomes are claimed; where information is not known, this is stated explicitly.
>
> **How to read this document.** Every substantive statement below falls into one of five evidence classes — verified fact, direct experience, analysis or inference, generalized or anonymized detail, or explicitly unknown. Section 10 classifies them and states plainly which outcomes can and cannot be publicly claimed. Readers evaluating this as commercial proof should read Section 10 first.

---

## 1. Situation

Prior authorization was required for many services and procedures. For providers, this meant a multi-step administrative process before certain care could proceed, and corresponding review work on the payer side. Prior authorization is a recognized source of administrative burden for both providers and payers.

The transformation described here introduced a path by which certain qualifying providers could, for specific codes, bypass the traditional authorization review while keeping downstream claims and legacy systems functioning.

The scale of the program (number of providers, codes, or volume affected) and any quantified change in administrative burden are **not known** for the purposes of this account and are not claimed.

## 2. Existing Prior Authorization Operating Model

Under the traditional model, a provider would typically:

1. Verify eligibility.
2. Verify benefits.
3. Determine whether a code required prior authorization.
4. Gather documentation.
5. Create a prior authorization request.
6. Move through clinical and medical necessity review.
7. Receive an approval or denial.
8. Continue through notification and claims processes.

At a high level, this work spanned multiple systems, including Clinical Intake, Eligibility, Plan Benefits, Provider Search, Matching, and Claims Adjudication. Each authorization moved across these systems, and the medical necessity review step sat in the middle of the path before an approval or denial was reached.

## 3. Transformation Objective

The objective was to allow certain providers to become eligible for waiver programs, so that qualifying providers would not have to follow the full traditional authorization path for specific codes.

Eligibility was based on historical submission performance and other evaluation criteria. **The exact methodology was developed by healthcare economics and medical leadership teams. The author was not responsible for that methodology and did not design the qualification algorithms.**

The operational objective that program delivery supported was narrower and specific: take qualification results produced by those teams and make them function correctly inside the operational and claims environment, so that qualifying provider-code combinations could follow a different, lighter path without breaking downstream processing.

## 4. Constraints

- **Ownership boundaries.** Medical policy, provider qualification methodology, waiver criteria, and healthcare economics models were owned by other teams. Program delivery consumed qualification results; it did not define them.
- **Downstream continuity.** Claims adjudication and legacy processes had to continue functioning. A qualifying provider could not simply skip authorization; the operational record those downstream systems expected still had to be produced.
- **Program variation.** Programs existed at multiple levels — national, state, and specialty — including emerging programs for rural hospitals and children's hospitals. Specific codes varied by program, so provider-code relationships were not uniform.
- **Dynamic eligibility.** Eligibility could be recalculated periodically, and providers could appeal qualification decisions. The set of qualifying provider-code relationships was therefore subject to change over time rather than fixed at a single cutover.
- **Unknowns.** Program timelines, implementation duration, the number of providers or programs involved, and any quantified results are **not known** here and are not represented.

## 5. Operational Challenges

- **Translating qualification results into system behavior.** Qualification results had to be turned into provider-code relationships that operational systems could act on, so that a qualifying combination would route to a different path rather than the traditional authorization flow.
- **Preserving downstream processing.** Because claims adjudication and legacy systems still required an operational record, the new path had to generate that record. Removing the authorization review without producing the expected downstream artifact would have broken processing.
- **Cross-system coordination.** The work touched multiple systems — Clinical Intake, Eligibility, Plan Benefits, Provider Search, Matching, and Claims Adjudication. Changes had to be coordinated across these systems rather than within a single application.
- **Handling program variation.** National, state, and specialty programs — including rural hospital and children's hospital programs — carried different codes. The operating model had to accommodate this variation rather than assume a single code set.
- **Accommodating change over time.** Periodic recalculation and the appeals path meant qualifying relationships could change. The model had to support updates, not a one-time configuration.
- **Knowledge dependency.** During periods when key architecture resources were unavailable, additional process knowledge had to be acquired to support execution and issue resolution. Delivery depended, at those times, on individuals building enough system and workflow understanding to keep work moving.

## 6. Program Delivery Role

The author served in program management and cross-functional delivery coordination roles. The work required significant workflow understanding to support delivery across the systems and teams involved.

A specific, factual feature of this role: during periods when key architecture resources were unavailable, the author acquired additional process knowledge to support execution and issue resolution. This was delivery and coordination work — understanding how the workflow and systems behaved well enough to keep delivery moving and resolve issues — not ownership of the qualification methodology, medical policy, or system architecture itself.

The author did not own or design medical policy, provider qualification methodology, waiver criteria, healthcare economics models, or the qualification algorithms.

## 7. Future-State Operating Model

In the future-state model:

- Qualification results were provided to operational teams.
- Provider-code relationships were generated from those results.
- Providers who qualified for specific codes no longer followed the traditional authorization path for those codes.
- Instead, the qualifying case produced: **"No PA Required – Create Advanced Notification."**
- The Advanced Notification created the operational record needed for downstream systems. This allowed claims adjudication and legacy processes to continue functioning without requiring traditional authorization review for the qualifying provider-code combination.

**Example.** Radiology services that historically required prior authorization could, under qualifying circumstances, follow the Advanced Notification path instead. The specific codes varied by program.

The structural change, for qualifying provider-code combinations, was the removal of the traditional authorization review step in favor of an Advanced Notification record. Whether and to what degree this reduced administrative burden in measured terms is **not known** here and is not claimed.

## 8. Key Lessons

- **A qualification decision only creates operational value when it is correctly integrated into the systems that route and process work.** The eligibility decision was upstream; the Advanced Notification record was what allowed downstream systems to proceed. The integration step, not the decision alone, made the change usable.
- **Bypassing a process is not the same as removing it.** Legacy and claims systems still required an operational record, so the new path had to produce the artifact those systems expected. The design problem was continuity, not deletion.
- **Dynamic eligibility requires an operating model built for change.** Periodic recalculation and appeals meant the set of qualifying relationships was not static. The model had to support ongoing updates rather than a single configuration.
- **Program variation must be carried through to the operational layer.** National, state, and specialty programs — including rural and children's hospital programs — carried different codes, so provider-code handling could not assume uniformity.
- **Knowledge concentration is a delivery risk.** When key architecture resources were unavailable, delivery depended on individuals acquiring enough process knowledge to keep execution moving. This dependency is an operational risk worth recognizing, independent of any individual's performance.

## 9. Transferable Patterns

- **Decision/delivery separation.** Methodology ownership (economics and medical leadership) and operational delivery are distinct responsibilities. Transformation depends on a clean handoff of decisions into the systems that act on them.
- **Bypass-with-continuity.** When a workflow step is removed for qualifying cases, the new path must still produce the records that downstream and legacy systems expect. The integration artifact — here, the Advanced Notification — is the load-bearing element.
- **Cross-system integration as the point of success or failure.** Work that spans many systems (intake, eligibility, benefits, provider search, matching, claims) succeeds or stalls at the integration boundaries, not within any single system.
- **Designing for dynamic eligibility.** Recalculation and appeals make the qualifying set change over time; the operating model must treat eligibility as a moving input.
- **Knowledge-dependency risk.** Reliance on a small number of people for critical architecture and process knowledge is a recurring execution risk. When those resources are unavailable, delivery depends on others acquiring that knowledge under pressure — a signal that critical operating knowledge is concentrated rather than systematized.

## 10. Evidence Classification

This section exists so a reader — or a prospective client's procurement, legal, or compliance
function — can evaluate exactly what is being asserted and on what basis.

### 10.1 Verified facts

Statements that are structurally verifiable from the author's employment record and the
publicly documented nature of prior authorization as an administrative process.

| Statement | Basis |
|---|---|
| Prior authorization requires a multi-step administrative process before certain care can proceed, and creates corresponding review work on the payer side. | Publicly documented characteristic of the process; not specific to any organization. |
| Prior authorization is a recognized source of administrative burden for providers and payers. | Widely published, including CMS burden-reduction materials and AMA physician survey work. |
| The author held program management and cross-functional delivery roles in enterprise healthcare transformation during the period described. | Verifiable employment history. |
| Waiver and gold-card style programs exist at national, state, and specialty levels, including programs oriented to rural and children's hospitals. | Publicly documented category of payer program. |

### 10.2 Todd's direct experience

Statements the author personally observed or performed. These are first-hand but not
independently verifiable by a reader, and no employer or client attests to them.

| Statement | Nature of involvement |
|---|---|
| Served in program management and cross-functional delivery coordination across the systems involved. | Direct role. |
| Coordinated work spanning Clinical Intake, Eligibility, Plan Benefits, Provider Search, Matching, and Claims Adjudication. | Direct role. |
| Acquired additional process knowledge to support execution and issue resolution during periods when key architecture resources were unavailable. | Direct, first-hand. This is the specific factual detail underlying the knowledge-concentration observation in §8. |
| Consumed qualification results produced by healthcare economics and medical leadership teams and worked to make them function correctly in the operational and claims environment. | Direct role, explicitly downstream of methodology ownership. |

### 10.3 Analysis and inference

Statements that are the author's professional interpretation rather than reported fact. They
are argued, not measured, and a reasonable practitioner could disagree.

| Statement | Why it is inference |
|---|---|
| "A qualification decision only creates operational value when it is correctly integrated into the systems that route and process work." | A generalized lesson drawn from the pattern observed; no measurement supports the strength of the claim. |
| "Bypassing a process is not the same as removing it." | Interpretation of the design constraint, framed as a transferable principle. |
| "Knowledge concentration is a delivery risk." | Inference from observed dependency during resource unavailability. The risk is argued, not quantified. |
| All five transferable patterns in §9. | Deliberate generalization from a single program context to a broader class of problems. |

### 10.4 Generalized or anonymized details

Details that have been abstracted so no organization, program, individual, or contractual
term is identifiable.

| Detail | Treatment |
|---|---|
| Organization, client, employer, payer, and provider identities. | Removed entirely. None are named anywhere in this document. |
| System names (Clinical Intake, Eligibility, Plan Benefits, Provider Search, Matching, Claims Adjudication). | Described by function, not by product or vendor name. |
| The Advanced Notification artifact. | Described by its operational role. Any organization-specific naming, configuration, or data structure is omitted. |
| Radiology as the illustrative service category. | Presented as an example of a service type historically requiring authorization, not as a description of a specific program's code set. |
| Program timelines, sequencing, and team structures. | Omitted. |

### 10.5 Explicitly unknown — not claimed

Stated as unknown rather than estimated, in every case where a number would have made the
account more persuasive.

- Program scale: number of providers, codes, programs, or affected volume.
- Any quantified change in administrative burden, turnaround time, cost, or staff effort.
- Program timelines and implementation duration.
- Financial results of any kind, to the payer, to providers, or to members.
- Whether the change achieved its intended business objective.

### 10.6 What can and cannot be publicly claimed

**Can be claimed on the basis of this document:**

- Direct enterprise healthcare experience with prior authorization operating models and the
  systems that execute them.
- Cross-functional delivery coordination across intake, eligibility, benefits, provider data,
  matching, and claims adjudication.
- Working understanding of waiver and gold-card style program mechanics, including dynamic
  eligibility, appeals, and program variation.
- Practical experience with the bypass-with-continuity design problem: removing a workflow
  step for qualifying cases while preserving the operational record downstream systems require.
- Firsthand exposure to knowledge-concentration risk in enterprise delivery.

**Cannot be claimed on the basis of this document — and must not be implied in outreach,
proposals, or marketing:**

- Any quantified outcome: burden reduction, turnaround improvement, cost savings, denial-rate
  change, or return on investment.
- Ownership or design of medical policy, provider qualification methodology, waiver criteria,
  healthcare economics models, or qualification algorithms.
- Attribution of program success or failure to the author.
- Client endorsement, employer endorsement, or reference availability.
- That this experience predicts a specific result at another organization.

**Reuse rule.** When this case study supports a proposal or outreach message, the mechanism
and the role may be described. The outcome may not, because it is not known. If a claim
cannot be traced to a row in §10.1 or §10.2, it does not go in the proposal.

---

*Reviewed and completed 2026-08-05 by Todd Kovalsky. Based only on the facts supplied. Items marked "not known" are intentionally left unquantified. No metrics, timelines, savings, or outcomes are claimed, and no responsibility is implied for medical policy, qualification methodology, waiver criteria, healthcare economics models, or algorithm design.*
