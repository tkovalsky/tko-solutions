# Opportunity Intelligence Engine — Architecture and Requirements

**Status:** v0.1 contact queue and Slice A1 source-ingestion backend implemented
**Date:** 2026-07-30
**Owner:** Todd Kovalsky
**System of record:** `ENGINEERING_BACKLOG.md` EPIC 20
**Product boundary:** Private TKO operator capability; not a public feature or client-facing SaaS

## Implementation Status — 2026-07-30

Implemented:

- Private `/tif/opportunities` operator page.
- Isolated `OiOrganization`, `OiPerson`, and `OiPursuit` records.
- Four operator-defined lookalike anchors.
- Six sourced starter pursuits across Elevance Health, Humana, Availity, and Epic.
- Deterministic `oi-v1` score with visible components, warnings, and research/contact readiness.
- Explicit $20K/month consulting-value gate.
- Manual candidate intake and rescoring.
- Manual professional-contact-path capture with source and verification state.
- Contacted, conversation, pause, and close controls; contacted creates a seven-day follow-up date.
- In-app operator guide and this document's quick-start instructions.
- Immutable `OiSource` snapshots with raw and normalized content, hashes, canonical URLs, and dates.
- Person-free `OiOpportunity` records with repeated provenanced facts and verified raw-source
  offsets.
- Explicit research-gap lifecycle and rerun preservation rules.
- Immutable `OiOpportunityScore` history with a nullable current-score pointer.
- Deterministic extraction, `scoreOpportunityFit()`, and the versioned `todd-v1` profile.
- Transactional pasted-source ingestion and canonical URL/content reconciliation.

Not implemented yet:

- Automated company, initiative, ATS, public-news, or Director+ discovery connectors.
- Automated lookalike generation beyond scoring entered or seeded people.
- Organization-map and reporting-chain research.
- An OIE-to-TIF outreach adapter; TIF is currently content-specific and is not a general AI or
  outreach service.
- Activity history beyond the current pursuit/contact fields.
- A private pasted-source form and opportunity brief/correction UI over Slice A1.
- Email verification-provider integration.
- Email sending, automated applications, or autonomous outreach.

The v0.1 route answers “who in the current researched cohort deserves attention next?” Slice A1
adds the person-free funded-work record beneath the future workflow. The next increment is the
manual pasted-opportunity form and brief/correction workflow—not automated discovery.

## Executive Recommendation

Build the Opportunity Intelligence Engine as a **separate bounded workflow inside the existing
private TKO application**.

It should:

- Reuse the current Next.js application, Postgres/Prisma database, `/tif` access control, operator
  design patterns and evidence discipline.
- Keep its commercial records separate from TIF's content-production records.
- Treat job postings as one source of evidence, not as the center of the system.
- Represent possible funded work as `OiOpportunity` before requiring a known person.
- Represent `OiPursuit` as the later person-specific commercial motion.
- Turn public signals into a small daily queue of researched, scored pursuits and next actions.
- Support employment, advisory, consulting, partnership, and referral pursuits through one
  common model.
- Keep all consequential conclusions and outbound communication human-reviewed.
- Begin with a manual, end-to-end operating loop before automating source ingestion or enrichment.

The system should **not** be implemented as ten independent engines. ATS collection, initiative
research, organization mapping, persona fit, scoring, relationship memory, and outreach are stages
of one governed operating loop:

```text
Source
  → Signal
  → Organization / Initiative / Person
  → Pursuit
  → Evidence completeness
  → Deterministic score
  → Research or outreach next action
  → Human-approved action
  → Outcome
  → Learning
```

This is the same architectural lesson proven by RachelOS: the valuable product is not a larger
database. It is a trusted next action with enough context to act well.

## 1. Problem

Traditional job-search workflows optimize for visible postings and application volume. For senior
transformation, healthcare operations, product, program recovery, and AI-enabled workflow work,
that creates three problems:

1. A posting may appear only after a transformation initiative is funded and underway.
2. The budget owner, executive sponsor, and operational pain are often absent from the application
   flow.
3. High-value context remains fragmented across postings, company news, leadership changes,
   earnings material, public presentations, conversations, referrals, and personal notes.

The operator must currently reconstruct the answer to the same questions repeatedly:

- Which companies are undergoing a relevant change?
- What initiative or operating problem appears to exist?
- Who likely owns, funds, influences, or feels the problem?
- What evidence supports that inference?
- Is this a fit for employment, consulting, advisory work, or a relationship-first conversation?
- What is the next action, and why is it the next action?
- What happened after the action?

The result is research without durable memory, inconsistent prioritization, and too much time spent
in low-leverage application channels.

## 2. Intended Outcome

Every workday, Todd should be able to open one private view and see:

- The highest-value pursuits worth attention now.
- The evidence and score behind each ranking.
- Missing information that would materially change the decision.
- The likely initiative owner and other relevant people.
- The recommended next research, introduction, application, or outreach action.
- Follow-ups that are due.
- Recent changes at watched organizations.

The engine succeeds when it creates **more relevant conversations and qualified opportunities per
hour of operator effort**, not when it stores the most postings or contacts.

## 3. Users and Pursuit Modes

### Primary user

Todd is the sole operator for the first release.

### Supported pursuit modes

The underlying architecture must support:

| Mode | Meaning | Example outcome |
|---|---|---|
| `employment` | A senior operating, transformation, product, or program role | Interview or role conversation |
| `consulting` | A defined TKO diagnostic, recovery, or build engagement | Discovery or paid assessment |
| `advisory` | Fractional or retained senior advisory work | Advisory discussion |
| `partnership` | Delivery, channel, implementation, or referral partnership | Partner conversation |
| `relationship` | A strategically relevant relationship with no immediate ask | Warm connection or introduction |

The UI may default to employment and consulting, but the data model must not force every initiative
into a job application.

## 4. Goals

### Business goals

- Increase conversations with executives and leaders who own relevant transformation work.
- Find opportunities earlier than an ATS-only process.
- Reduce time spent on low-fit applications and undirected research.
- Create a durable network and organization memory.
- Support both personal career income and TKO revenue without mixing their lifecycle states.
- Make follow-up consistent without automating relationship-sensitive communication.

### Product goals

- Capture public sources and manual observations with provenance.
- Normalize organizations, initiatives, people, roles, postings, and relationships.
- Explain how every pursuit score was calculated.
- Produce a single prioritized daily work queue.
- Preserve research and relationship history.
- Preserve a future adapter boundary for evidence-grounded outreach without claiming that TIF
  currently supplies a general outreach composer.
- Learn from outcomes without allowing an opaque model to control priority.

## 5. Non-Goals

The initial system does not include:

- A general-purpose CRM.
- A replacement for LinkedIn, an ATS, or an email provider.
- Browser automation that bypasses access controls, CAPTCHAs, robots rules, or site terms.
- Scraping private profiles, gated data, or personal contact information.
- Automated mass email, connection requests, applications, or follow-ups.
- Autonomous applications or autonomous outreach.
- A new agent framework, vector database, or general knowledge graph.
- A client-facing platform, multi-tenant SaaS, or resold contact database.
- A promise that inferred reporting lines, emails, or initiatives are factual.
- AI-controlled opportunity scoring.
- Full ingestion coverage for every ATS in the first release.

## 6. Relationship to TIF

### Decision

Opportunity Intelligence is **TIF-adjacent, not a TIF content subtype**.

It belongs in the same application because the application already provides the private operator
surface, persistence, approval patterns, evidence discipline, and composition pathway. It remains a
separate bounded context because its source records, commercial pursuits, people, scores, tasks,
and interactions have different authority and lifecycle rules from content assets.

### Reuse versus separation

| Concern | Decision |
|---|---|
| Application and deployment | Reuse `tko-site` |
| Database and Prisma client | Reuse the current Postgres/Prisma infrastructure |
| Private access | Reuse the `/tif` gate for the MVP; strengthen authentication before adding another user |
| Operator UI patterns | Reuse |
| Evidence and claim discipline | Reuse the principles, not the `Evidence` table for every signal |
| AI composition | Future adapter only; no general AI or OIE outreach service exists today |
| Content opportunity | Keep `AssetOpportunity` unchanged |
| Possible funded work | `OiOpportunity`; it does not require a person |
| Person-specific motion | `OiPursuit`; contact path and relationship state live here |
| Commercial lifecycle | Owned by Opportunity Intelligence |
| Sending, applying, or publishing | Outside TIF and human-controlled |

### Boundary rule

If a future OIE adapter is implemented, it may send a structured, approved pursuit brief to an
explicitly supported composer. No such adapter exists in Slice A1. TIF must not:

- Decide which pursuit Todd should contact.
- Change a pursuit score or lifecycle state.
- Create or infer a person as fact.
- Send a message.
- Submit an application.
- Mark an interaction as having occurred.

Opportunity Intelligence owns opportunity/pursuit facts and activity history. Current TIF owns
content-specific deterministic composition only.

## 7. Product Principles

1. **Initiatives before listings.** A job posting is a signal of funded work, not the entire
   opportunity.
2. **One operating loop.** Do not create separate databases or workflows for ATS, executives,
   initiatives, contacts, and outreach.
3. **Sources are not facts.** Preserve what a source said, what the system inferred, confidence,
   freshness, and human verification separately.
4. **Deterministic priority.** The scoring policy is versioned, inspectable, and reproducible.
5. **Research only what can change a decision.** Missing information becomes a task only when it
   could change score, fit, route, or next action.
6. **One next action.** Every active pursuit should have one current recommended action and a reason.
7. **Human relationship authority.** AI may extract, summarize, compare, and draft; it does not
   assert personal facts or act externally.
8. **Relevance over volume.** The engine should suppress low-value work rather than create a bigger
   inbox.
9. **Freshness matters.** Roles, postings, initiatives, and contact details expire or require
   reverification.
10. **Outcome truth beats activity.** Conversations, replies, referrals, and qualified next steps
    matter more than records collected or drafts generated.

## 8. Canonical Operating Loop

### Stage 1 — Capture

The operator adds a URL, pastes permitted source text, records a referral or conversation, or an
approved connector retrieves a public record.

Required result:

- A source record with source type, URL or origin, captured date, published date when known,
  content hash, usage/rights note, and raw or normalized content allowed by policy.

### Stage 2 — Normalize

The system extracts candidate organizations, people, roles, job-posting fields, initiatives,
technologies, problems, and events.

Required result:

- Proposed normalized records.
- Confidence and provenance for extracted values.
- A human review state for consequential or uncertain claims.

### Stage 3 — Resolve

The system checks whether the organization, person, posting, or initiative already exists.

Required result:

- One canonical record when confidence is sufficient.
- A merge/review task when identity is ambiguous.
- No silent duplicate creation from a repeated URL or source item.

### Stage 4 — Form an opportunity

An opportunity records possible funded work supported by one or more source snapshots. It can exist
before a person, contact path, or relationship is known.

Required result:

- Opportunity title and organization.
- Extracted thesis inputs with evidence links.
- Research gaps for decision-relevant missing information.
- Immutable opportunity-fit score snapshot.

A later `OiPursuit` may connect a person-specific commercial motion to the opportunity. Slice A1
does not add that nullable link and leaves the working person-first queue unchanged.

### Stage 5 — Score

The deterministic scoring service evaluates fit, timing, access, evidence, compensation/value,
location, seniority, domain, and risk.

Required result:

- Total score.
- Policy version.
- Component scores.
- Positive and negative reasons.
- Completeness and confidence shown separately from fit.

### Stage 6 — Prioritize

The daily queue chooses the next action using score, freshness, due dates, relationship state,
missing evidence, and operator-defined focus.

Required result:

- A bounded list, defaulting to ten items or fewer.
- One next action per item.
- Clear sections: act now, research next, follow up, and watch.

### Stage 7 — Prepare action

The operator may create an application task, request an introduction, or record a manual message.
A TIF outreach request remains future adapter work.

Required result:

- No message is sent automatically.
- Drafts cite the pursuit context used.
- Unsupported personalization is blocked or labeled for verification.

### Stage 8 — Record outcome

The operator records the external action and outcome.

Required result:

- Append-only activity history.
- Current relationship and pursuit state.
- Next follow-up date or explicit closure reason.

### Stage 9 — Learn

The system reports which sources, score bands, personas, pursuit modes, and actions led to
conversations and qualified outcomes.

Required result:

- Advisory measurement only.
- Policy changes require an explicit new scoring-policy version.

## 9. Information Architecture

Recommended private routes:

```text
/tif/opportunities
  /today                 Daily action queue
  /pursuits              All commercial pursuits
  /pursuits/[id]         Evidence, score, people, activity, next action
  /organizations         Watched and pursued organizations
  /organizations/[id]    Initiatives, people, postings, signals, history
  /people                Known professional relationships
  /initiatives           Transformation initiatives and hypotheses
  /sources               Capture inbox and ingestion status
  /research              Missing-information and verification queue
  /settings/scoring      Versioned score policy and focus profile
```

The route may live below `/tif` to reuse the private shell. Domain code should not live under
`src/lib/tif`; use `src/lib/opportunity-intelligence` so the boundary remains visible.

## 10. Logical Architecture

```text
Manual capture / approved public connectors
                     │
                     ▼
           Immutable OiSource
 raw · normalized · hash · canonical URL
                     │
                     ▼
              OiOpportunity
       possible work; person optional
                     │
       ┌─────────────┼──────────────┐
       ▼             ▼              ▼
 provenanced     research-gap    immutable fit
    facts         lifecycle       score history
       │
       ▼
 operator thesis / corrections
       │
       ▼
 future Signals / Initiatives / person discovery
                     ▼
            person-specific OiPursuit
                      │
                      ▼
             daily queue / action
```

### Component boundaries

| Component | Responsibility |
|---|---|
| Source intake | Manual entry, import contracts, URL/content deduplication, provenance |
| Extraction | Deterministically extract thesis inputs with verified raw-source offsets |
| Opportunity service | Own possible funded work before person discovery |
| Entity resolution | Find or propose canonical organizations, people, roles, and initiatives |
| Pursuit service | Own later person-specific motion, contact path, and relationship state |
| Scoring service | Apply versioned deterministic policy and persist explanation |
| Queue service | Compute the bounded daily next-action view |
| Research service | Track verification and intelligence gaps |
| Future outreach adapter | Explicit integration only; not implemented TIF reuse |
| Activity service | Preserve manual actions, replies, meetings, referrals, and outcomes |
| Reporting | Measure funnel quality and operator efficiency |

## 11. Domain Model

Use an `Oi` prefix for Prisma models so their ownership is unambiguous.

### Core entities

| Entity | Purpose | Key fields |
|---|---|---|
| `OiOrganization` | Canonical company or institution | name, domain, industry, size band, headquarters, status, aliases |
| `OiPerson` | A professional person known through permitted research or relationship history | name, public profile URLs, verification state, last verified at |
| `OiOrganizationRole` | A person's current or historical role | person, organization, title, function, seniority, started/ended, confidence, source |
| `OiSource` | Immutable source snapshot for a posting, announcement, referral, event, or paste | type, canonical URL, raw/normalized content, content hash, retrieved/published dates |
| `OiOpportunity` | Possible funded need, role, engagement, advisory opening, or transformation problem | organization, title, operator thesis, status, current score |
| `OiOpportunityFact` | Repeated stated, inferred, or operator-authored fact | field, value, normalized value, ordinal, basis, confidence, override flag, evidence |
| `OiEvidence` | Exact excerpt into immutable raw source content | source, start/end offsets, excerpt |
| `OiResearchGap` | Decision-relevant missing information with durable lifecycle | stable key, question, reason, status, resolution, operator notes, timestamps |
| `OiOpportunityScore` | Immutable opportunity-fit snapshot | policy/profile versions, total, completeness, components, input snapshot |
| `OiSignal` | A typed observation derived from a source | type, summary, occurred date, confidence, verification state, source |
| `OiInitiative` | A named or hypothesized body of funded change | organization, name, category, status, owner hypothesis, start/timing, confidence |
| `OiJobPosting` | Structured projection of a job source | external ID, title, location, compensation, reporting clue, technology, status, dates |
| `OiPersona` | Reusable problem/KPI/goal archetype | name, functions, problems, KPIs, goals, fit rules |
| `OiPursuit` | A person-specific commercial motion | person, organization, mode, contact path, relationship lifecycle |
| `OiScorePolicy` | Versioned deterministic scoring configuration | name, version, active dates, rules, weights, hard filters |
| `OiScoreSnapshot` | Immutable score explanation for a pursuit at a point in time | policy version, total, completeness, components, reasons, scored at |
| `OiTask` | Research, introduction, application, outreach, or follow-up work | pursuit, type, due date, priority, status, completion result |
| `OiContactPoint` | A business contact method with provenance and verification | person, type, value, source, verified at, status, do-not-contact |
| `OiOutreachDraft` | Future versioned outreach draft | adapter run ID, channel, body, source context, status |
| `OiActivity` | Append-only relationship and pursuit history | pursuit/person, type, occurred at, summary, external reference, outcome |

### Important relationships

```text
OiOrganization 1 ── * OiOpportunity
OiOpportunity 1 ── * OiSource
OiOpportunity 1 ── * OiOpportunityFact
OiSource 1 ── * OiEvidence
OiEvidence 1 ── * OiOpportunityFact
OiOpportunity 1 ── * OiResearchGap
OiOpportunity 1 ── * OiOpportunityScore
OiOpportunity 0..1 ── 1 current OiOpportunityScore

Future:
OiSource 1 ── * OiSignal
OiOrganization 1 ── * OiInitiative
OiOrganization 1 ── * OiOrganizationRole * ── 1 OiPerson
OiOrganization 1 ── * OiJobPosting
OiSource 1 ── * OiJobPosting
OiPursuit * ── 1 OiOrganization
OiPursuit * ── 0..1 OiInitiative
OiPursuit * ── 0..1 OiJobPosting
OiPursuit 1 ── * OiScoreSnapshot
OiPursuit 1 ── * OiTask
OiPursuit 1 ── * OiOutreachDraft
OiPursuit 1 ── * OiActivity
```

Join tables should connect sources/signals to initiatives, people, and pursuits where many-to-many
provenance is required. Do not hide these relationships in unqueryable JSON.

### Authority rules

- Manual operator confirmation outranks an automated extraction.
- A direct public company source outranks an aggregator for company-controlled facts.
- A person's confirmed update outranks an inferred role.
- Conflicting values are preserved with source and dates; they are not silently overwritten.
- An inference is never displayed as verified fact.
- Contact deliverability verification does not prove identity, relationship, permission, or current
  employment.
- Opportunity score snapshots are immutable. Creation first appends a snapshot and then updates the
  nullable current-score pointer.
- A normal rerun does not reopen an operator-resolved or dismissed research gap. Contradictory
  evidence requires an explicit later workflow.
- Activities are append-only; corrections reference the original activity.

### Freshness defaults

Defaults must be configurable, but the MVP should start with:

- Job posting: stale when closed, removed, or not reverified within 14 days.
- Person/role: reverify before outreach if older than 60 days.
- Contact point: reverify before use if older than 30 days.
- Initiative signal: downgrade confidence after 90 days without reinforcing evidence.
- Relationship activity: never expires, but current-state conclusions may.

## 12. Lifecycle Models

### Pursuit lifecycle

```text
discovered
  → researching
  → qualified
  → ready_for_action
  → active_conversation
  → interview_or_discovery
  → proposal_or_offer
  → won

Any active state
  → watching
  → paused
  → closed_lost
  → disqualified
```

State changes require an actor, timestamp, and reason. The system must distinguish a job
application from a direct conversation and a consulting proposal from an employment offer.

### Initiative lifecycle

```text
hypothesized → evidenced → active → delayed → completed
                         └→ cancelled
```

`hypothesized` is valid and useful, but must never be presented as confirmed.

### Source lifecycle

```text
captured → parsed → needs_review → admitted
                  └→ rejected
                  └→ duplicate
                  └→ failed
```

### Draft lifecycle

```text
draft → reviewed → approved_for_manual_use
      → changes_requested
      → discarded
```

Approval means the text may be copied for manual use. It does not mean it was sent.

## 13. Functional Requirements

### OI-FR-01 — Manual source capture

The operator can capture:

- Public job-posting URL.
- Public company, newsroom, leadership, investor, or initiative page.
- Public article or announcement.
- Pasted notes from a conversation.
- Referral or introduction.
- Manual observation.

Acceptance requirements:

- URL-based sources are idempotent by normalized URL plus content hash.
- The operator can record published/observed date and source type.
- The system records whether content may be stored, excerpted, or only referenced.
- Capture never creates a verified person, initiative, or pursuit without review.

### OI-FR-02 — Connector contract

Each future connector must implement one common contract:

```ts
type SourceCandidate = {
  provider: string;
  providerRecordId?: string;
  sourceType: string;
  sourceUrl: string;
  capturedAt: string;
  publishedAt?: string;
  title?: string;
  permittedContent?: string;
  metadata: Record<string, unknown>;
};
```

The contract must support idempotency, cursor/checkpoint state, rate limits, retries, failure
visibility, and provider-specific terms.

Initial connector priority:

1. Manual URL/text capture.
2. Public job-board APIs or feeds with documented access.
3. Company newsroom or approved RSS feeds.
4. User-supplied CSV import.
5. Additional ATS or enrichment providers only after validation.

No implementation should promise universal Workday, iCIMS, Oracle, SuccessFactors, or profile-site
coverage before a compliant adapter is proven.

### OI-FR-03 — Structured job-posting extraction

For an admitted job source, the system proposes:

- Company.
- Title.
- Location and workplace mode.
- Requisition or external ID.
- Posted and closing dates.
- Compensation range and currency when present.
- Function and seniority.
- Reporting-line clues.
- Responsibilities and business problems.
- Named technologies, programs, regulations, and initiatives.
- Application URL and posting status.

Every proposed field must retain source, confidence, and verification state.

### OI-FR-04 — Organization and initiative intelligence

The operator can:

- Create and watch an organization.
- View all known postings, signals, initiatives, people, pursuits, and activities for it.
- Add an initiative as hypothesized or evidenced.
- Link multiple signals to one initiative.
- Record likely owner, sponsor, beneficiary, affected function, timing, and business problem.
- See when the initiative lacks recent evidence.

### OI-FR-05 — Organization and reporting-chain mapping

The operator can:

- Add a person and a current or former organization role.
- Link every role claim to at least one source or mark it as operator-confirmed.
- Record likely relationship type to an initiative: owner, sponsor, operator, influencer,
  recruiter, referral path, or unknown.
- See gaps such as “initiative owner unknown” or “no warm path identified.”
- Reverify a role before using it for outreach.

The system may propose reporting relationships but must label them as hypotheses unless directly
supported.

### OI-FR-06 — Persona modeling

The operator can define and version personas with:

- Functions and seniority.
- Common problems.
- KPIs.
- Goals.
- Trigger events.
- Relevant TKO experience or proof.
- Disqualifiers.

The initial library should include:

- Prior Authorization / Utilization Management executive.
- Healthcare Operations transformation leader.
- Enterprise Transformation / Program Recovery leader.
- Product or AI-enabled workflow leader.
- Consulting or implementation partner.

Persona fit contributes an explained score component; it is not an opaque similarity percentage.

### OI-FR-07 — Pursuit creation

A pursuit must contain:

- Pursuit mode.
- Organization.
- Optional initiative and posting.
- Fit hypothesis.
- Business-pain or change hypothesis.
- Desired outcome.
- Evidence links.
- Known people and likely decision-maker role.
- Lifecycle status.
- Disqualification reason when applicable.

The same organization may have multiple pursuits, but duplicate open pursuits with the same mode,
initiative, and target outcome must be flagged.

### OI-FR-08 — Deterministic scoring

Scoring must:

- Use an active, versioned policy.
- Separate `fitScore`, `evidenceCompleteness`, `timingConfidence`, and `relationshipAccess`.
- Persist component values and explanations.
- Support positive weights, penalties, hard filters, and operator overrides with reasons.
- Recalculate only through an explicit event or scheduled policy run.
- Never use an LLM to produce the authoritative numeric score.

Illustrative initial dimensions:

| Dimension | Example weight |
|---|---:|
| Healthcare or health-tech relevance | +15 |
| Prior authorization, utilization management, care management, claims, or admin burden | +20 |
| Transformation recovery, workflow redesign, operating model, or program governance | +15 |
| Director+ scope or direct executive-owner access | +10 |
| AI-enabled workflow with human-governance need | +8 |
| Product, operations, implementation, or cross-functional delivery fit | +10 |
| Compensation above the operator threshold or consulting value fit | +10 |
| Remote or preferred geography | +5 |
| Warm introduction or existing relationship | +12 |
| Initiative supported by two independent fresh signals | +10 |
| No identifiable owner, stale source, or weak evidence | −5 to −15 |
| Misaligned function, seniority, compensation, or location | hard filter or penalty |

These values are a starting hypothesis, not a permanent formula.

### OI-FR-09 — Evidence completeness

The system must score completeness independently from fit.

Suggested completeness checks:

- Organization identity resolved.
- Initiative or posting identified.
- Business problem stated.
- At least one fresh primary or reliable source.
- Likely owner or target function identified.
- Relevance to Todd stated.
- Appropriate proof or experience selected.
- Contact or introduction path identified.
- Unsupported claims and conflicts resolved.

A high-fit, low-completeness pursuit should generate research work, not a confident outreach
recommendation.

### OI-FR-10 — Canonical daily queue

The daily queue must:

- Default to no more than ten items.
- Show one recommended next action per item.
- Explain why the item is present.
- Separate `Act now`, `Research next`, `Follow up`, and `Watch`.
- Suppress disqualified, closed, duplicate, stale, and snoozed items.
- Respect due dates and operator focus mode.
- Allow complete, snooze, replace, or override with a reason.

Recommended action types:

- Verify initiative.
- Identify owner.
- Verify role.
- Find warm introduction.
- Review posting.
- Apply.
- Prepare outreach.
- Send manually.
- Follow up.
- Schedule conversation.
- Record outcome.
- Close or disqualify.

### OI-FR-11 — Research and verification tasks

The system creates or allows tasks for intelligence gaps that can change a decision.

Every task includes:

- The question to answer.
- Why it matters.
- The record it may change.
- Due date and priority.
- Source expectations.
- Completion result and evidence link.

The system must not create generic “research company” tasks without a decision-relevant question.

### OI-FR-12 — Contact-point handling

The system may store professional contact points only when:

- They were provided directly, published for professional use, or obtained through an approved
  provider with a documented basis.
- Provenance and verification date are stored.
- Do-not-contact, invalid, bounced, opted-out, and replaced states are supported.

The system must distinguish:

- `pattern_inferred`
- `provider_discovered`
- `publicly_listed`
- `directly_provided`
- `verified_deliverable`

Verification indicates likely deliverability, not consent or relationship.

### OI-FR-13 — Future outreach-adapter boundary

This requirement is deferred. Current TIF composition is deterministic and content-specific; there
is no implemented general AI provider or OIE outreach service. If an explicit adapter is authorized
later, a sufficiently complete pursuit may request a draft.

The adapter sends TIF:

- Pursuit mode and desired outcome.
- Verified recipient name, role, and organization.
- Initiative and business problem with evidence.
- Relevant Todd/TKO experience and approved proof.
- Warm-context or referral information.
- Tone, channel, and length constraints.
- Claims that are prohibited or require verification.

The adapter receives:

- Composer run ID and prompt/configuration version.
- Draft text.
- Source-context references.
- Warnings and unresolved fields.

Requirements:

- No implied reuse of the current content templates as an outreach engine.
- No separate `OpportunityEmailGenerator`.
- The draft is stored as a versioned `OiOutreachDraft`.
- Missing recipient identity, unsupported personalization, or missing relevance blocks approval.
- Approval does not send.

### OI-FR-14 — Activity and relationship memory

The operator can record:

- Introduction requested or received.
- Application submitted.
- Message sent manually.
- Reply.
- Call or meeting.
- Referral.
- Interview.
- Discovery.
- Proposal or offer.
- No response.
- Opt-out or do-not-contact.
- Outcome and notes.

The system derives the current relationship summary from activity but preserves the activity log as
the authority.

### OI-FR-15 — Similar-organization expansion

The operator can request candidate peers for an organization.

MVP behavior:

- Use explicit industry, business-model, geography, size, and initiative tags.
- Show why each organization is considered similar.
- Require operator admission to a watchlist.

This must not require vector search or create pursuits automatically.

### OI-FR-16 — Measurement

The system reports:

- Pursuits by score band, mode, persona, source type, and lifecycle.
- Time from discovery to first meaningful action.
- Research time per qualified pursuit.
- Decision-maker coverage.
- Outreach drafts versus manual sends.
- Replies, conversations, interviews/discovery calls, referrals, proposals/offers, wins, and losses.
- Outcomes by score band and scoring-policy version.
- Stale, duplicate, and disqualified volume.

Metrics must distinguish system activity from externally observed outcomes.

## 14. AI Requirements and Boundaries

AI may:

- Extract candidate fields from admitted source material.
- Summarize a posting or initiative.
- Propose organization, person, and initiative matches.
- Identify likely business problems and missing research questions.
- Compare a pursuit to a persona.
- Draft personalized outreach through a future explicitly implemented adapter.
- Summarize relationship history for operator review.

AI may not:

- Create an authoritative score.
- Treat a reporting line, initiative owner, email, or relationship as verified without evidence.
- Invent compensation, role scope, company activity, warm context, or personal details.
- Send communication, submit applications, or create external records.
- Change pursuit lifecycle without an explicit operator action or deterministic recorded event.
- Merge ambiguous people or organizations automatically.

Every AI-derived value must store:

- Source IDs.
- Model/configuration version when applicable.
- Timestamp.
- Confidence.
- Verification state.
- Human correction where applicable.

## 15. Security, Privacy, and Compliance Requirements

### Access

- All routes and mutations are private and fail closed.
- The current shared access key is acceptable only for a single-operator MVP.
- Before adding users, roles, sensitive exports, or third-party send capability, implement
  user-level authentication, session revocation, and an audit trail.
- Secrets remain server-side and are never exposed to the browser.

### Data minimization

- Collect only professional information relevant to a legitimate pursuit.
- Avoid sensitive personal data, personal emails, home addresses, protected-class inferences, or
  information unrelated to professional context.
- Store source references and normalized facts instead of full third-party content when full
  storage is unnecessary or not permitted.
- Provide archive and deletion controls consistent with retention policy and legal obligations.

### Source policy

- Use public, authorized, or operator-provided sources.
- Follow provider terms, robots rules, rate limits, and API restrictions.
- Do not evade login controls, blocks, or technical access restrictions.
- Do not scrape private social profiles or gated contact databases.
- Record the source basis for imported contact data.

### Outreach policy

- MVP is draft-only and manual-send.
- Messages must be individually relevant and truthful.
- Respect opt-out and do-not-contact requests across future actions.
- Do not generate misleading familiarity or imply a referral that did not occur.
- Review applicable anti-spam, privacy, employment, and provider rules before enabling any sending
  integration.

## 16. Non-Functional Requirements

### Reliability

- Source ingestion is idempotent.
- Connector retries cannot create duplicate sources, postings, or activities.
- Partial parsing failures remain visible and retryable.
- Score recomputation creates a new snapshot instead of mutating history.
- All state-changing actions are server-validated.

### Explainability

- Every score component and queue decision is inspectable.
- Every normalized fact resolves to a source or operator confirmation.
- Every outreach draft identifies the pursuit context used.
- Every override records actor, time, prior value, new value, and reason.

### Performance

- The daily queue should load within two seconds at the initial single-user scale.
- Organization and pursuit search should return within one second for 10,000 organizations,
  50,000 people, and 100,000 sources under normal database indexing.
- Connector work runs outside request/response paths when it may exceed five seconds.

### Maintainability

- Domain logic lives in `src/lib/opportunity-intelligence`.
- UI routes do not contain extraction, scoring, or queue business logic.
- Provider adapters implement the shared source-candidate contract.
- Zod validates external and AI-produced payloads.
- Score and queue policies have unit tests with fixed fixtures.
- No provider-specific fields leak into core domain contracts without a metadata escape hatch.

### Observability

- Record connector run, source counts, duplicates, failures, duration, and checkpoint.
- Record parsing failures without logging secrets or unnecessary personal data.
- Show stale sources, overdue tasks, unverified contacts, and failed draft runs in the operator UI.

## 17. MVP Definition

The MVP is the smallest complete loop that can prove whether the system improves daily opportunity
work.

### Included

- Private `/tif/opportunities` operator surface.
- Manual source and note capture.
- Organizations, people/roles, sources, signals, initiatives, postings, and pursuits.
- One versioned scoring policy.
- Immutable score snapshots and explanations.
- Research tasks.
- Daily queue with a maximum of ten recommendations.
- Activity and outcome history.
- Manual contact-point recording with provenance.
- One explicitly authorized outreach-draft adapter after a compatible composer exists.
- Basic funnel and operator-efficiency reporting.

### Explicitly excluded

- Automated harvesting across every ATS.
- Email-finder subscription or deliverability provider integration.
- Automated email or social sending.
- Automatic job applications.
- Vector search or semantic lookalikes.
- Autonomous agents.
- Multi-user permissions.
- Mobile-native application.
- Browser extension.

### MVP proof scenario

One real public source is captured and traced through:

```text
source
→ normalized organization and signal
→ initiative or posting
→ qualified pursuit
→ explained score
→ research task
→ daily queue
→ optional future approved outreach draft
→ manually recorded action
→ recorded outcome and next follow-up
```

If that complete path is not usable, additional connectors do not count as progress.

## 18. Delivery Strategy

### Phase 0 — Manual operating-model validation

**Purpose:** Prove the fields, score, and daily workflow before building ingestion automation.

Deliverables:

- Final initial personas.
- Initial scoring-policy worksheet.
- Twenty target organizations.
- Ten manually researched pursuits.
- Documented source and relationship rules.
- A one-week daily queue trial using manual records.

Exit gate:

- Todd can consistently choose the next action from the model.
- No required field exists only because it “might be useful.”
- At least 80% of active pursuits have a clear next action.
- Todd confirms the workflow saves or focuses research time.

### Phase 1 — Incremental vertical slices

**Purpose:** Implement the proof scenario in governed increments inside `tko-site`.

Suggested order:

1. **Slice A1 (implemented):** immutable pasted source, person-free opportunity, provenanced facts,
   research gaps, deterministic fit score, immutable snapshots, and tests.
2. Manual opportunity form, brief, thesis, and correction workflow.
3. Signal and initiative admission.
4. Executive and relationship discovery.
5. Narrow ATS adapters.
6. Person-specific pursuit linkage, activity history, and queue integration.
7. A future outreach adapter only after an explicit compatible composer contract exists.

Exit gate:

- One real pursuit completes the end-to-end proof scenario.
- Scores are reproducible from fixtures.
- No outbound action occurs without human action.
- Duplicate source ingestion is safe.

### Phase 2 — Narrow source automation

**Purpose:** Reduce repeated capture work only after the manual workflow is useful.

Deliverables:

- One documented public job-board connector.
- One company-news/RSS connector.
- Connector run history, checkpoints, retry, and failure UI.
- Human admission queue for extracted entities and signals.

Exit gate:

- Connectors add qualified, nonduplicate signals at an acceptable review cost.
- At least half of admitted signals can be processed without correcting core identity fields.
- No terms, access-control, or rate-limit violations.

### Phase 3 — Enrichment and organization mapping

**Purpose:** Improve owner coverage and research speed.

Possible deliverables:

- Approved professional enrichment provider.
- Contact verification provider.
- Role-freshness checks.
- Reporting-chain hypotheses.
- Similar-organization expansion.

Exit gate:

- Provider cost per qualified conversation is measured.
- False identity and stale-role rates are acceptable.
- Data provenance and opt-out controls are complete.

### Phase 4 — Outcome-informed optimization

**Purpose:** Improve policy using observed results.

Deliverables:

- Score-band outcome reporting.
- Policy comparison.
- Source and persona yield.
- Follow-up effectiveness.
- Explicit operator workflow for activating a new score-policy version.

Exit gate:

- Enough outcomes exist to justify changing weights.
- The system can explain why a new policy is better.

## 19. Validation Metrics

### Primary metrics

- Meaningful conversations per week.
- Qualified interviews, discovery calls, referrals, proposals, or offers.
- Operator hours per qualified pursuit.
- Percentage of daily queue items completed or intentionally snoozed.
- Percentage of active pursuits with an identified owner/target function and a current next action.

### Secondary metrics

- Qualified pursuits by source.
- Reply or conversation rate by score band.
- Time from signal capture to action.
- Research tasks required per qualified pursuit.
- Stale-source and duplicate rates.
- Warm-path coverage.

### Guardrail metrics

- Incorrect identity merges.
- Outreach drafts containing unsupported claims.
- Contact attempts after opt-out.
- Duplicate contact attempts.
- Connector failures or policy violations.
- High-scoring pursuits later disqualified for missing basic fit.

### Metrics that are not success by themselves

- Total job postings collected.
- Total contacts stored.
- Total companies watched.
- Total drafts generated.
- Total applications submitted.
- Total AI extractions.

## 20. Risks and Mitigations

| Risk | Consequence | Mitigation |
|---|---|---|
| Building harvesters before validating the loop | Large noisy database, little action | Manual Phase 0 and vertical-slice gate |
| Confusing content and commercial opportunities | Lifecycle and data corruption | Separate `OiPursuit`; preserve `AssetOpportunity` |
| Over-trusting inferred org charts | Misaddressed or awkward outreach | Source, confidence, freshness, human verification |
| Opaque “AI fit” scoring | Untrusted queue and bias | Deterministic versioned scoring |
| Too many daily recommendations | Recreates overwhelm | Queue cap and explicit focus mode |
| Stale roles or contact data | Poor outreach and privacy risk | Reverification rules and contact status |
| Provider lock-in | Cost and architecture drift | Common adapter contract and core-field isolation |
| Terms/privacy violations | Legal, reputation, and account risk | Approved sources, data minimization, no bypassing controls |
| Premature sending automation | Damaged relationships | Draft-only MVP and separate manual action |
| Generic outreach | Low trust and response | Evidence completeness gate and approved proof |
| Scope expanding into SaaS/agents | Delays revenue-producing use | Internal single-operator boundary and phase gates |
| Mixing personal and TKO motions | Wrong CTA or follow-up | Explicit pursuit mode and mode-specific outcomes |

## 21. Implementation File Map

This is a target layout, not authorization to create every file at once.

```text
src/lib/opportunity-intelligence/
  contracts.ts
  capability-profile.ts
  extract.ts
  ingest.ts
  research-gaps.ts
  score.ts
  sources/
    normalize.ts
  # Future slices:
  authority.ts
  sources/adapter.ts
  sources/dedupe.ts
  entities/
    resolve.ts
  scoring/
    policy.ts
    score.ts
  queue/
    next-action.ts
    daily-queue.ts
  pursuits/
    lifecycle.ts
  outreach/
    tif-adapter.ts
  reporting/
    metrics.ts

src/app/tif/opportunities/
  page.tsx
  today/page.tsx
  pursuits/page.tsx
  pursuits/[id]/page.tsx
  organizations/page.tsx
  organizations/[id]/page.tsx
  sources/page.tsx
  research/page.tsx
  settings/scoring/page.tsx
```

Server actions or route handlers should be thin adapters over these domain services.

## 22. Testing Requirements

Minimum automated coverage:

- URL normalization and content-hash deduplication.
- Exact evidence offsets into immutable raw source content.
- Repeated fact values and normalized-value deduplication.
- Operator override and resolved/dismissed gap preservation across reruns.
- Opportunity creation without a current score, immutable snapshot creation, then pointer update.
- Connector idempotency and retry behavior.
- Organization/person resolution fixtures, including ambiguous matches.
- Source-to-field provenance.
- Initiative hypothesis versus verified-state handling.
- Scoring policy validation.
- Golden scoring fixtures and component explanations.
- New immutable snapshot on policy or evidence change.
- Hard-filter and operator-override behavior.
- Daily queue suppression, cap, due-date, and next-action rules.
- Pursuit state-transition permissions.
- Contact opt-out suppression.
- Future outreach-adapter request/response validation when that adapter exists.
- Unsupported personalization blocks.
- Approval-versus-send separation.
- Activity append-only behavior.
- Access-control checks for every private route and mutation.

## 23. Definition of Done for MVP

- Todd can complete the entire MVP proof scenario with a real pursuit.
- Every score is reproducible and explainable.
- Every material fact or inference has provenance and verification state.
- `AssetOpportunity` remains unchanged and semantically content-only.
- Opportunity Intelligence domain logic is isolated from `src/lib/tif`.
- One daily queue shows no more than ten actionable items with one next action each.
- Any future outreach adapter is explicitly implemented and remains unsent until Todd acts
  externally; this is not a Slice A1 completion condition.
- An action, reply, conversation, and next follow-up can be recorded without losing history.
- Duplicate source capture is safe.
- Stale roles, sources, and contact points are visible.
- No connector bypasses access controls or provider policy.
- No automated application, message, connection request, or publication exists.
- Unit and integration tests cover scoring, queueing, provenance, lifecycle, idempotency, access,
  opt-out, and draft approval boundaries.

## 24. Decisions Made by This Specification

1. The system belongs in `tko-site`, behind the existing private operator boundary.
2. It is a separate bounded context that reuses TIF services; it is not another content asset type.
3. `OiOpportunity` owns possible funded work and does not require a person.
4. `OiPursuit` owns a person-specific commercial motion; `AssetOpportunity` remains content-only.
5. Scoring and the daily queue are deterministic and explainable.
6. AI proposes and drafts; humans verify and act.
7. The MVP starts with manual capture and one thin vertical slice.
8. Connector coverage expands only after the operating loop proves useful.
9. Outreach is draft-only in the MVP.
10. No knowledge graph, vector search, autonomous agents, or client-facing SaaS is required.

## 25. Implementation Readiness Questions

These questions do not block architecture work. They should be answered during Phase 0 before the
first migration:

1. For the first 30 days, should the default focus be employment, TKO consulting, or a fixed split?
2. What compensation, engagement-value, geography, and travel rules are true hard filters?
3. Which five personas deserve initial weights?
4. Which sources does Todd already use consistently enough to justify the first connector?
5. What counts as a meaningful conversation for measurement?
6. Which proof assets are approved for employment outreach versus TKO consulting outreach?
7. How long should closed and disqualified pursuit data be retained?
8. Is the single access key sufficient for the intended data, or should user-level authentication
   be pulled into Phase 1?

## 26. Slice A1 Implementation Contract

Slice A1 is implemented under this contract:

> Implement `OiSource`, `OiOpportunity`, `OiOpportunityFact`, `OiEvidence`, `OiResearchGap`, and
> `OiOpportunityScore`; a typed versioned `todd-v1` capability profile; pure deterministic
> extraction with verified raw-content offsets; pure deterministic `scoreOpportunityFit()`; and
> transactional pasted-source ingestion with content-hash/canonical-URL reconciliation. Preserve
> operator overrides and resolved gaps on rerun, append immutable score snapshots, and update the
> current-score pointer only after snapshot creation. Leave the working person-first `OiPursuit`
> flow and `src/lib/oi.ts` intact. Do not add UI, AI, URL fetching, Signals, Initiatives, person
> linkage, outreach, or ATS adapters.

## 27. Operator Quick Start — v0.1

The implemented first version is designed for a short daily operating rhythm.

### Initial setup

1. Open `/tif/opportunities` through the private TIF login.
2. Select **Load starter cohort** once.
3. Review the four lookalike anchors. The UnitedHealthcare anchors reflect Todd's direct context;
   their displayed traits are operator-defined and are not public title or reporting-line claims.
4. Review the sourced starter candidates. Open the public source on every card before acting.

### Daily workflow

1. Start with **Contact ready** candidates, but recheck the source if the role may have changed.
2. For a **Research ready** candidate, complete the displayed next action. Common gaps are current
   title, budget ownership, hiring influence, or a clear initiative hypothesis.
3. Use **Add and score candidate** when research finds another Director+ person. Record the public
   source, source date, visible operating problem, and why Todd is relevant.
4. Add a professional email only when it comes from a legitimate professional source. Record the
   source. Mark deliverability verified only when it has actually been checked.
5. Prepare a short, relevance-first message outside the tool or through the planned TIF draft
   adapter. Review it personally and send it manually.
6. Select **Contacted** after sending. The system records the contact date and schedules a seven-day
   follow-up.
7. Select **Conversation** when the person replies or a meeting is scheduled. Pause or close
   candidates that no longer deserve attention.

### Recommended daily limit

- Verify two research-ready people.
- Prepare no more than three highly specific contact-ready messages.
- Prefer a warm introduction when one exists.
- Stop pursuing a person when the source, authority, relevance, or professional contact basis is
  weak.

The operating objective is qualified conversations that can lead to a $20K+/month consulting
engagement or an appropriately senior FTE role. Number of emails sent is not the success metric.
