# TIF V2 — Experience Compiler

## Purpose

The Experience Compiler turns a real operating event into reusable intellectual property without turning it into unsupported marketing. It is a human-reviewed normalization workflow layered on the existing Capture → Evidence → Opportunity → Asset spine.

It does not autonomously declare a pattern, approve a claim, publish content, or infer an outcome.

## P0B Knowledge Asset Package extension

After Experience, Evidence, Problem, Pattern, Framework, and Knowledge Diagram links have been reviewed, the compiler can create a draft Knowledge Asset Package manifest. The manifest supplies the required asset briefs, evidence requirements, missing proof, implementation backlog, inherited claim boundary, and publication readiness without generating unsupported prose or replacing the existing Asset Composer. The executable contract and full review/migration specification are in [TIF_KNOWLEDGE_ASSET_COMPILER.md](TIF_KNOWLEDGE_ASSET_COMPILER.md).

## Compiler lifecycle

```text
Raw experience
→ CaptureItem
→ ExperienceRecord review
→ Evidence admission and claim classification
→ Pattern / Problem / Framework mapping
→ Asset opportunity
→ Asset and derivative package
→ Human review and publication
→ Measurement / observed outcome
→ New capture or evidence update
```

## Inputs

| Input | Capture source | Required raw material |
|---|---|---|
| Meeting or executive discussion | `conversation`, `phone_call` | Context, participants/roles, decision requested, notes, follow-up. |
| Program or healthcare initiative | `client_work`, `healthcare` | Scope, workflow, constraint, decision rights, confidentiality boundary. |
| Product work | `rachel`, `personal_observation` | Problem, alternatives, decision, implementation reference, result/limitation. |
| Architecture review | `rachel`, `client_work` | System boundary, tradeoff, decision, proof reference. |
| Production incident | `rachel`, `client_work` | Expected behavior, observed failure, impact, response, remediation, status. |
| Customer interaction | `conversation`, `phone_call` | Exact expressed need, operating symptom, permission/rights, no inferred traits. |
| Failure or abandoned recommendation | `personal_observation`, `client_work` | Assumption, evidence that changed it, option abandoned, updated control. |

## ExperienceRecord normalization contract

The following fields are required before an experience can be considered for a public asset:

| Field | Why it exists |
|---|---|
| Knowledge Asset ID | Permanent citation across assets and reviews. |
| Record type | Experience, decision, or incident. |
| Context | Makes the situation understandable without relying on a client name. |
| Stakeholder roles | Distinguishes executive, operator, approver, customer, and system responsibilities. |
| Business problem | States the commercial or operational condition. |
| Technical problem | States only the system constraint that mattered. |
| Organizational problem | Captures ownership, governance, or dependency failure. |
| Options and tradeoffs | Shows judgment rather than a post-hoc success story. |
| Decision | What was actually chosen, designed, stopped, or deferred. |
| Observed result | A fact, behavior change, or explicit absence of measurement. |
| Claim boundary | What cannot be inferred from the record. |
| Source references | Capture, repository, document, screenshot, or approved record. |
| Confidentiality | Public, anonymized, restricted, or consent-backed. |
| Human reviewer | Accountable reviewer of the normalized record. |

## Evidence admission rules

1. A raw capture is not proof.
2. An experience can create one or more Evidence records, but each Evidence record must have a specific observation and proof reference.
3. Claim status is assigned by a human reviewer:
   - Verified
   - Owner Confirmed
   - Experience Based
   - Unsupported
4. Unsupported records remain useful as questions or blocked claims, but cannot compose public claims.
5. Every public-facing asset must inherit the strictest claim boundary among its linked evidence.

## Pattern detection workflow

Pattern detection is a reviewed comparison task—not automated summarization.

```text
Two or more ExperienceRecords
  + linked evidence
  + a shared mechanism
  → candidate OperatingPattern
  → reviewer compares supporting and contradictory evidence
  → pattern accepted, narrowed, or rejected
```

### Candidate pattern requirements

- A named mechanism, not a slogan.
- At least two supporting experience/evidence links, unless explicitly labeled a single-environment implementation pattern.
- A statement of scope and counterexamples/limitations.
- Related business symptoms and executive owners.
- A claim boundary.

Example: **Decision latency** is not “slow decisions.” It is an operating pattern in which required context, authority, or escalation is fragmented enough that a decision waits for manual reconstruction.

## Problem mapping workflow

```text
Experience / Evidence
→ observed symptom
→ reusable OperatingProblem
→ related Pattern(s)
→ Framework(s) used to inspect or address it
→ appropriate Asset opportunities
```

The Problem Library owns the executive-readable description. Assets reference the problem rather than inventing a new definition each time.

## Framework generation workflow

Frameworks are reusable methods, not content wrappers. A framework is admitted only when it has:

- a defined decision job;
- steps or components that can be inspected;
- known use conditions and exclusions;
- linked evidence/experience;
- an explicit claim boundary.

Examples that should be modeled as frameworks when confirmed: Operational Recovery Assessment, Prior Authorization Assessment, RachelOS operating loop, Built/Activated/Validated review, and Executive Operating Review.

## Asset generation rules

| Asset type | Minimum graph inputs |
|---|---|
| Founder story / Operator Note | One ExperienceRecord or Decision/Incident; evidence; claim boundary; one original artifact. |
| Case study | Problem; one or more experiences; evidence; system/change; observed result; claim boundary. |
| Website guide | Problem; pattern; framework; evidence-backed examples; target executive persona. |
| LinkedIn post | Approved source Asset version; channel context; inherited claim boundary. |
| Executive checklist | Framework; related problem; decision questions; source evidence. |
| Recovery Assessment | Framework; problem(s); pattern(s); evidence map; decision register. |
| Sales material | Approved proof Asset; persona; offer; claim boundary; CTA. |

Generated content must never upgrade `Experience Based` evidence to `Verified`, turn an observed behavior change into financial attribution, or convert a hypothesis into a product claim.

## Human review gates

| Gate | Reviewer question | Output |
|---|---|---|
| Capture review | Is the source worth preserving and does it have rights/confidentiality metadata? | Archive, retain, or promote. |
| Experience review | Are the context, decision, result, and boundary accurate? | Normalized ExperienceRecord. |
| Evidence review | Is this claim-grade proof and how strong is it? | Evidence with structured status. |
| Pattern/problem review | Is it reusable, bounded, and supported? | Approved, narrowed, or rejected registry record. |
| Asset review | Does every claim trace to eligible evidence? | Draft/review/approved status. |
| Publication review | Is destination, audience, privacy, and CTA appropriate? | Publication record. |
| Learning review | What was observed and should it alter a pattern, framework, or future asset? | Measurement or new CaptureItem. |

## Example compilation: RachelOS missed automation run

```text
Capture: missed scheduled automation run
→ INC-003 ExperienceRecord: expected run, observed miss, detection, response
→ EVD-042: system-health control evidence (Verified once logs/postmortem are attached)
→ PAT-021: observability is required for daily operating systems
→ PROB-009: invisible operational failure
→ FRM-004: production readiness review
→ Operator Note, RachelOS proof section, executive checklist
→ publication review
→ observed control outcome / future incident capture
```

## Non-goals

- No agent that invents patterns from arbitrary notes.
- No autonomous use of customer data for public assets.
- No vector search requirement.
- No automatic publication.
- No replacement of the existing Asset Composer or Proof Intelligence read models.
