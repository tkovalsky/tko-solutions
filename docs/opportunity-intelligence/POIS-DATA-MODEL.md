# POIS Data Model

**Date:** 2026-07-31
**Status:** Specification for Codex. **No schema changes were made by this document.**
**Source of truth for current state:** `prisma/schema.prisma` (verified 2026-07-31)

All Prisma definitions below are **proposed**. `prisma/schema.prisma` is unmodified.

---

## 1. Disposition of existing models

### 1.1 TIF content models — untouched

`CaptureItem` · `InboundLead` · `ContentInventoryItem` · `Evidence` · `AssetOpportunity` ·
`AssetOpportunityEvidence` · `Asset` · `KnowledgeDiagram` · `AssetDiagram` · `AssetVersion` ·
`RevisionRequest` · `DerivativeAsset` · `AssetEvidence`

**No changes.** `AssetOpportunity` remains content-only. POIS never writes to these tables.
POIS reads none of them directly; proof matching uses a separate pointer table (§4.14).

### 1.2 Existing `Oi*` models

| Model | Disposition | Change summary |
|---|---|---|
| `OiOrganization` | **Preserve + extend** | Add `domain`, `sizeBand`, `isWatched`, `tier`, `aliases` |
| `OiPerson` | **Preserve + extend** | Add `lastVerifiedAt`, `doNotContact`, `linkedinUrl`; authority fields move to `OiStakeholder` over time |
| `OiSource` | **Preserve + relax** | `opportunityId` → **nullable**; add `OiOpportunitySource` join; add `signals` relation |
| `OiOpportunity` | **Refactor** | Add `type`, `initiativeId`, `offerId`, `estimatedValueLow/High`, `conversionProbability`, `estimatedHours`, expanded status |
| `OiEvidence` | **Preserve + extend** | `opportunityId` → nullable; add nullable `initiativeId` |
| `OiOpportunityFact` | **Preserve + extend** | `opportunityId` → nullable; add nullable `initiativeId`; add `aiGenerated` |
| `OiResearchGap` | **Preserve + extend** | `opportunityId` → nullable; add nullable `initiativeId`; add `priority`, `blocksOutreach` |
| `OiOpportunityScore` | **Rename → `OiScore`** + extend | Add EV/probability/effort/priority fields, `scoreType` |
| `OiPursuit` | **RETIRE** | Backfill into `OiOpportunity` + `OiStakeholder` + `OiNextAction`; drop `@@unique([personId, mode])`; drop table post-deadline |

### 1.3 The four blocking constraints

| # | Current | Change | Migration |
|---|---|---|---|
| C1 | `OiPursuit @@unique([personId, mode])` | **Drop** | `DROP INDEX` — non-destructive |
| C2 | `OiSource.opportunityId` required | **Nullable** + join table | `ALTER COLUMN DROP NOT NULL`, backfill join |
| C3 | No `OiPursuit.opportunityId` | **Add nullable** (transitional) | `ADD COLUMN` |
| C4 | `OiOpportunityStatus` 4 values | **Extend** to full lifecycle | `ALTER TYPE ADD VALUE` (Postgres-safe, additive) |

All four are additive or relaxing. **None loses data.**

---

## 2. New enums

```prisma
// ─── Opportunity classification ────────────────────────────────────────────

enum OiOpportunityType {
  fte                 // full-time role, >= comp floor
  consulting          // project engagement
  fractional          // recurring fractional / advisory
  assessment          // paid diagnostic (the wedge)
  partnership         // subcontract / channel / referral
  rfp                 // formal solicitation
}

// Full commercial lifecycle. Shared prefix, then type-specific states.
// Extends the existing OiOpportunityStatus additively.
enum OiOpportunityStatus {
  // shared prefix
  identified
  qualifying
  qualified
  researching
  dismissed
  paused

  // consulting / fractional / assessment / partnership
  outreach_ready
  contacted
  conversation
  nurturing
  diagnostic_scoped
  proposal_sent
  capability_shared
  agreement_discussion

  // fte
  application_ready
  applied
  recruiter_screen
  hiring_manager
  interview_loop
  offer
  no_response

  // rfp
  rfp_intake
  seeking_partner
  bid_as_prime
  bid_as_sub
  no_bid
  submitted
  shortlisted

  // terminal
  won
  accepted
  lost
  declined
  rejected

  // legacy — retained so existing rows remain valid; not produced by new code
  reviewing
  closed
}

// ─── Signals ───────────────────────────────────────────────────────────────

enum OiSignalTier { tier_1  tier_2  tier_3 }

enum OiSignalType {
  senior_role_posting
  domain_role_posting
  rfp_published
  leadership_appointment
  leadership_departure
  concentrated_hiring
  stated_operational_problem
  transformation_announcement
  stalled_program
  acquisition_merger
  funding_round
  vendor_selection
  earnings_statement
  regulatory_deadline
  technology_modernization
  partnership_announcement
  conference_presentation
  partner_change
  general_news
  operator_note
  referral
}

enum OiSignalStatus { captured  classified  promoted  watched  dismissed }

// ─── Initiatives ───────────────────────────────────────────────────────────

enum OiInitiativeStatus {
  hypothesized   // inferred, not operator-approved — never render as fact
  evidenced      // operator-approved, multi-signal
  active         // confirmed underway
  delayed
  completed
  cancelled
}

enum OiInitiativeCategory {
  prior_authorization
  utilization_management
  interoperability
  workflow_modernization
  care_management
  claims_operations
  program_recovery
  ai_adoption
  operating_model
  regulatory_compliance
  post_merger_integration
  platform_implementation
  other
}

// ─── Stakeholders ──────────────────────────────────────────────────────────

enum OiStakeholderRole {
  economic_buyer
  executive_sponsor
  operational_owner
  technical_owner
  hiring_manager
  recruiter
  champion
  influencer
  procurement
  partner
  blocker
  unknown
}

enum OiAuthorityLevel { none  low  medium  high  unknown }

enum OiRelationshipType {
  cold
  warm_referral       // mutual connection can introduce
  warm_history        // prior direct interaction
  existing_client
}

// ─── Contact ───────────────────────────────────────────────────────────────

enum OiContactPointType   { email  phone  linkedin  other }

enum OiContactProvenance {
  pattern_inferred      // guessed — lowest trust, blocked from outreach
  provider_discovered
  publicly_listed
  directly_provided
  verified_deliverable
}

enum OiContactStatus { active  bounced  invalid  opted_out  replaced }

// ─── Action ────────────────────────────────────────────────────────────────

enum OiNextActionType {
  approve_initiative
  close_research_gap
  identify_stakeholder
  select_stakeholder
  select_offer
  complete_role_profile
  prepare_outreach
  review_draft
  send_outreach
  submit_application
  follow_up
  log_conversation
  bid_no_bid_decision
  find_partner
  send_proposal
  review_stale
  record_outcome
}

enum OiNextActionStatus { open  completed  snoozed  cancelled }

enum OiActivityType {
  outreach_sent
  application_submitted
  reply_received
  no_reply
  call_scheduled
  call_completed
  conversation
  intro_requested
  intro_received
  referral_made
  interview
  proposal_sent
  assessment_delivered
  status_change
  note
  correction
}

enum OiActivitySentiment { positive  neutral  deflecting  rejection  unknown }

enum OiOutreachChannel { email  linkedin_dm  application_note  intro_request  call_script  follow_up }

enum OiDraftStatus { draft  operator_review  approved_for_manual_use  changes_requested  discarded }

// ─── Outcome ───────────────────────────────────────────────────────────────

enum OiOutcomeType {
  engagement_won
  role_accepted
  proposal_declined
  role_rejected
  no_response
  disqualified
  withdrawn
  expired
}

// ─── Offers ────────────────────────────────────────────────────────────────

enum OiOfferKind { assessment  diagnostic  recovery  build  fractional  workshop  subcontract }

// ─── RFP ───────────────────────────────────────────────────────────────────

enum OiBidDecision { undecided  bid_prime  bid_sub  no_bid }
```

---

## 3. Modifications to existing models

```prisma
model OiOrganization {
  id      String             @id @default(cuid())
  name    String             @unique
  website String?
  kind    OiOrganizationKind
  notes   String?

  // NEW
  domain      String?          // normalized apex domain — dedupe key
  sizeBand    String?          // "1-200" | "201-1000" | "1001-5000" | "5000+"
  tier        Int      @default(2)     // 1 = priority industry, 2 = secondary, 3 = deferred
  isWatched   Boolean  @default(false)
  aliases     String[] @default([])
  headquarters String?

  people        OiPerson[]
  pursuits      OiPursuit[]      // legacy, retire post-deadline
  opportunities OiOpportunity[]
  sources       OiSource[]
  signals       OiSignal[]       // NEW
  initiatives   OiInitiative[]   // NEW

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@index([kind])
  @@index([domain])      // NEW
  @@index([isWatched])   // NEW
}

model OiPerson {
  id                      String      @id @default(cuid())
  name                    String
  title                   String
  seniority               OiSeniority
  publicProfileUrl        String?
  sourceUrl               String?
  sourceLabel             String?
  sourcePublishedAt       DateTime?
  sourceConfidence        Int         @default(0)
  isLookalikeAnchor       Boolean     @default(false)
  domainTags              String[]    @default([])
  budgetAuthority         Int         @default(0)   // legacy; superseded by OiStakeholder.authority
  hiringAuthority         Int         @default(0)   // legacy
  transformationRelevance Int         @default(0)   // legacy
  relationshipStrength    Int         @default(0)   // legacy
  notes                   String?

  // NEW
  linkedinUrl    String?
  lastVerifiedAt DateTime?
  doNotContact   Boolean  @default(false)

  organizationId String
  organization   OiOrganization @relation(fields: [organizationId], references: [id], onDelete: Cascade)
  pursuits       OiPursuit[]        // legacy
  stakeholders   OiStakeholder[]    // NEW
  contactPoints  OiContactPoint[]   // NEW

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@unique([organizationId, name, title])
  @@index([isLookalikeAnchor])
  @@index([seniority])
  @@index([doNotContact])   // NEW
}

model OiSource {
  id                String       @id @default(cuid())
  sourceType        OiSourceType
  canonicalUrl      String?
  rawContent        String       @db.Text
  normalizedContent String       @db.Text
  contentHash       String
  retrievedAt       DateTime
  publishedAt       DateTime?

  organizationId String
  organization   OiOrganization @relation(fields: [organizationId], references: [id], onDelete: Cascade)

  // CHANGED: was `String` (required). Now nullable — a source may exist before
  // any opportunity does, and may support several. Kept for backward compatibility;
  // new code reads the OiOpportunitySource join instead.
  opportunityId String?
  opportunity   OiOpportunity? @relation(fields: [opportunityId], references: [id], onDelete: SetNull)

  evidence       OiEvidence[]
  signals        OiSignal[]              // NEW
  opportunities  OiOpportunitySource[]   // NEW

  createdAt DateTime @default(now())

  @@unique([organizationId, contentHash])
  @@unique([canonicalUrl, contentHash])
  @@index([canonicalUrl])
  @@index([opportunityId, retrievedAt])
  @@index([retrievedAt])   // NEW — "what arrived today"
}

model OiOpportunity {
  id             String              @id @default(cuid())
  title          String
  status         OiOpportunityStatus @default(identified)
  operatorThesis String?
  thesisBasis    OiFactBasis?

  // ─── NEW: classification ───
  type OiOpportunityType

  // ─── NEW: initiative link (optional — opportunity may precede inference) ───
  initiativeId String?
  initiative   OiInitiative? @relation(fields: [initiativeId], references: [id], onDelete: SetNull)

  // ─── NEW: commercial estimate (operator-approved, never AI-authored) ───
  offerId               String?
  offer                 OiOffer? @relation(fields: [offerId], references: [id])
  estimatedValueLow     Int?     // USD, annualized (see scoring doc §7)
  estimatedValueHigh    Int?
  conversionProbability Int?     // 0-100, operator-adjustable
  estimatedHours        Decimal? @db.Decimal(6, 2)
  valueBasis            String?  // why this band was chosen
  valueApprovedAt       DateTime?

  // ─── NEW: lifecycle bookkeeping ───
  disqualifiedReason String?
  closedReason       String?
  lastActivityAt     DateTime?
  firstSignalAt      DateTime?   // for signal->action elapsed metric

  organizationId String
  organization   OiOrganization @relation(fields: [organizationId], references: [id], onDelete: Cascade)

  sources      OiSource[]              // legacy direct relation
  sourceLinks  OiOpportunitySource[]   // NEW canonical
  facts        OiOpportunityFact[]
  evidence     OiEvidence[]
  researchGaps OiResearchGap[]
  scoreHistory OiScore[]               @relation("OiScoreHistory")

  stakeholders   OiStakeholder[]       // NEW
  nextActions    OiNextAction[]        // NEW
  activities     OiActivity[]          // NEW
  outreachDrafts OiOutreachDraft[]     // NEW
  proofLinks     OiOpportunityProof[]  // NEW
  rfpProfile     OiRfpProfile?         // NEW
  roleProfile    OiRoleProfile?        // NEW
  outcome        OiOutcome?            // NEW

  currentScoreId String?  @unique
  currentScore   OiScore? @relation("OiCurrentScore", fields: [currentScoreId], references: [id], onDelete: SetNull)

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@index([organizationId, status])
  @@index([createdAt])
  @@index([type, status])        // NEW — Today view
  @@index([initiativeId])        // NEW
  @@index([lastActivityAt])      // NEW — stale sweep
}
```

`OiEvidence`, `OiOpportunityFact`, and `OiResearchGap` each take the same three-part change:
`opportunityId` becomes nullable, a nullable `initiativeId` is added, and a CHECK constraint
requires at least one parent.

```prisma
model OiOpportunityFact {
  id                 String      @id @default(cuid())
  field              String
  value              String      @db.Text
  normalizedValue    String      @db.Text
  ordinal            Int         @default(0)
  basis              OiFactBasis
  confidence         Int
  isOperatorOverride Boolean     @default(false)

  // NEW — AI-derived values are marked and can never be promoted to `stated`
  aiGenerated  Boolean @default(false)
  aiModel      String?
  promptVersion String?

  opportunityId String?         // CHANGED: nullable
  opportunity   OiOpportunity? @relation(fields: [opportunityId], references: [id], onDelete: Cascade)
  initiativeId  String?         // NEW
  initiative    OiInitiative?  @relation(fields: [initiativeId], references: [id], onDelete: Cascade)
  evidenceId    String?
  evidence      OiEvidence?    @relation(fields: [evidenceId], references: [id], onDelete: SetNull)

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@unique([opportunityId, field, normalizedValue, basis])
  @@index([opportunityId, field, ordinal])
  @@index([initiativeId, field, ordinal])   // NEW
  @@index([evidenceId])
  // CHECK (opportunityId IS NOT NULL OR initiativeId IS NOT NULL) — raw SQL in migration
}

model OiResearchGap {
  id            String              @id @default(cuid())
  gapKey        String
  question      String              @db.Text
  reason        String              @db.Text
  status        OiResearchGapStatus @default(open)
  resolution    String?             @db.Text
  operatorNotes String?             @db.Text
  resolvedAt    DateTime?

  // NEW
  priority       Int     @default(2)      // 1 = blocking, 2 = important, 3 = nice-to-have
  blocksOutreach Boolean @default(false)  // gate for outreach preparation
  suggestedSources String[] @default([])  // "LinkedIn", "10-K", "newsroom"

  opportunityId String?         // CHANGED: nullable
  opportunity   OiOpportunity? @relation(fields: [opportunityId], references: [id], onDelete: Cascade)
  initiativeId  String?         // NEW
  initiative    OiInitiative?  @relation(fields: [initiativeId], references: [id], onDelete: Cascade)

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@unique([opportunityId, gapKey])
  @@index([status, createdAt])
  @@index([initiativeId, status])            // NEW
  @@index([blocksOutreach, status])          // NEW
}
```

---

## 4. New models

### 4.1 `OiSignal` — typed observation

```prisma
model OiSignal {
  id         String         @id @default(cuid())
  tier       OiSignalTier
  signalType OiSignalType
  status     OiSignalStatus @default(captured)

  summary    String   @db.Text   // one line, operator-readable
  occurredAt DateTime?           // when the event happened (not when captured)
  confidence Int      @default(50)
  domainTags String[] @default([])

  dismissedReason String?
  dismissedAt     DateTime?

  sourceId       String
  source         OiSource       @relation(fields: [sourceId], references: [id], onDelete: Cascade)
  organizationId String
  organization   OiOrganization @relation(fields: [organizationId], references: [id], onDelete: Cascade)

  initiativeLinks OiInitiativeSignal[]

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@index([organizationId, tier, status])
  @@index([status, createdAt])       // triage queue
  @@index([occurredAt])
}
```

### 4.2 `OiInitiative` — the central intelligence object

```prisma
model OiInitiative {
  id       String               @id @default(cuid())
  name     String
  status   OiInitiativeStatus   @default(hypothesized)
  category OiInitiativeCategory

  // The hypothesis. AI may PROPOSE; only Todd APPROVES.
  hypothesis      String   @db.Text
  hypothesisBasis OiFactBasis @default(inferred)
  confidence      Int      @default(45)     // 0-100, from DETERMINISTIC clustering
  domainTags      String[] @default([])

  // Owner hypothesis — ROLES only, never a named person without evidence
  likelyOwnerRoles String[] @default([])

  // Timing
  estimatedStartAt DateTime?
  urgencyBasis     String?     // "CMS deadline 2027-01-01"
  lastEvidenceAt   DateTime?   // freshness — 90d without reinforcement downgrades

  // Approval — hypothesized -> evidenced requires this
  approvedAt DateTime?
  approvedBy String?

  // AI provenance for the narrative (never authoritative)
  aiGenerated   Boolean @default(false)
  aiModel       String?
  promptVersion String?

  organizationId String
  organization   OiOrganization @relation(fields: [organizationId], references: [id], onDelete: Cascade)

  signalLinks   OiInitiativeSignal[]
  opportunities OiOpportunity[]
  facts         OiOpportunityFact[]
  evidence      OiEvidence[]
  researchGaps  OiResearchGap[]

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@index([organizationId, status])
  @@index([status, confidence])
  @@index([category])
  @@index([lastEvidenceAt])
}

// Many-to-many: THE CLUSTERING MECHANISM.
// One signal may support several initiatives; an initiative is evidenced by several signals.
model OiInitiativeSignal {
  initiativeId String
  initiative   OiInitiative @relation(fields: [initiativeId], references: [id], onDelete: Cascade)
  signalId     String
  signal       OiSignal     @relation(fields: [signalId], references: [id], onDelete: Cascade)

  contribution String?  // why this signal supports this initiative
  weight       Int      @default(1)
  addedBy      String   @default("system")   // "system" | "operator"

  createdAt DateTime @default(now())

  @@id([initiativeId, signalId])
  @@index([signalId])
}
```

### 4.3 `OiOpportunitySource` — many-to-many replacement for C2

```prisma
model OiOpportunitySource {
  opportunityId String
  opportunity   OiOpportunity @relation(fields: [opportunityId], references: [id], onDelete: Cascade)
  sourceId      String
  source        OiSource      @relation(fields: [sourceId], references: [id], onDelete: Cascade)

  isPrimary Boolean  @default(false)
  createdAt DateTime @default(now())

  @@id([opportunityId, sourceId])
  @@index([sourceId])
}
```

### 4.4 `OiStakeholder` — person × opportunity × role

**Role lives on the join**, which is what lets one person be economic buyer on one
opportunity and influencer on another.

```prisma
model OiStakeholder {
  id        String            @id @default(cuid())
  role      OiStakeholderRole @default(unknown)
  authority OiAuthorityLevel  @default(unknown)

  relationshipType OiRelationshipType @default(cold)
  warmPathNotes    String?            @db.Text
  referralSourceName String?

  // Hypotheses — rendered visually distinct from sourced fact
  likelyMotivation String? @db.Text
  likelyObjection  String? @db.Text
  relevanceToTodd  String? @db.Text   // required before outreach prep

  // Evidence for the ROLE claim
  roleEvidenceUrl   String?
  roleEvidenceLabel String?
  roleConfidence    Int      @default(50)
  roleVerifiedAt    DateTime?

  // Ranking + selection
  accessScore Int?     // from scoreStakeholderAccess()
  isSelected  Boolean  @default(false)   // the chosen outreach target
  selectedAt  DateTime?

  opportunityId String
  opportunity   OiOpportunity @relation(fields: [opportunityId], references: [id], onDelete: Cascade)
  personId      String
  person        OiPerson      @relation(fields: [personId], references: [id], onDelete: Cascade)

  activities OiActivity[]
  drafts     OiOutreachDraft[]

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@unique([opportunityId, personId])
  @@index([opportunityId, isSelected])
  @@index([personId])
  @@index([role])
  // Partial unique: at most one selected stakeholder per opportunity.
  // Raw SQL: CREATE UNIQUE INDEX ... ON "OiStakeholder"("opportunityId") WHERE "isSelected";
}
```

### 4.5 `OiContactPoint`

```prisma
model OiContactPoint {
  id         String              @id @default(cuid())
  type       OiContactPointType
  value      String
  provenance OiContactProvenance
  status     OiContactStatus     @default(active)

  sourceLabel String?
  verifiedAt  DateTime?
  lastUsedAt  DateTime?

  personId String
  person   OiPerson @relation(fields: [personId], references: [id], onDelete: Cascade)

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@unique([personId, type, value])
  @@index([personId, status])
}
```

> **Rule:** `provenance = pattern_inferred` may be stored but **must not be used for
> outreach**. The outreach gate rejects it. Verified deliverability proves reachability,
> never consent or relationship.

### 4.6 `OiScore` — renamed from `OiOpportunityScore`, extended

```prisma
model OiScore {
  id String @id @default(cuid())

  // Existing
  total                    Int
  completeness             Int
  components               Json
  inputSnapshot            Json
  scorePolicyVersion       String
  capabilityProfileVersion String

  // NEW — decomposed dimensions
  fitScore     Int
  evidenceScore Int
  accessScore  Int
  urgencyScore Int

  // NEW — commercial math (see POIS-SCORING-AND-DECISION-MODEL.md §7)
  estimatedValue        Int?     // annualized USD, midpoint of band
  conversionProbability Int?     // 0-100
  expectedValue         Int?     // estimatedValue * probability / 100
  estimatedHours        Decimal? @db.Decimal(6, 2)
  priorityEfficiency    Decimal? @db.Decimal(12, 2)   // expectedValue / hours

  // NEW — disqualification
  isDisqualified     Boolean @default(false)
  disqualifyingRules String[] @default([])

  opportunityId String
  opportunity   OiOpportunity  @relation("OiScoreHistory", fields: [opportunityId], references: [id], onDelete: Cascade)
  currentFor    OiOpportunity? @relation("OiCurrentScore")

  createdAt DateTime @default(now())

  @@index([opportunityId, createdAt])
  @@index([total])
  @@index([priorityEfficiency])   // NEW — Today view ranking
}
```

### 4.7 `OiNextAction`

```prisma
model OiNextAction {
  id     String             @id @default(cuid())
  type   OiNextActionType
  status OiNextActionStatus @default(open)

  description    String   @db.Text
  rationale      String?  @db.Text   // why this is the next action
  estimatedMinutes Int    @default(15)
  dueAt          DateTime?
  snoozedUntil   DateTime?

  completedAt  DateTime?
  completedNote String?  @db.Text

  isSystemGenerated Boolean @default(true)

  opportunityId String
  opportunity   OiOpportunity @relation(fields: [opportunityId], references: [id], onDelete: Cascade)

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@index([status, dueAt])
  @@index([opportunityId, status])
  // Partial unique: exactly one OPEN next action per opportunity.
  // Raw SQL: CREATE UNIQUE INDEX ... ON "OiNextAction"("opportunityId") WHERE status = 'open';
}
```

### 4.8 `OiActivity` — append-only

```prisma
model OiActivity {
  id         String              @id @default(cuid())
  type       OiActivityType
  occurredAt DateTime
  summary    String              @db.Text
  sentiment  OiActivitySentiment @default(unknown)

  channel      OiOutreachChannel?
  externalRef  String?            // message id, ATS confirmation, calendar link
  outcomeNote  String?            @db.Text

  // status_change bookkeeping
  fromStatus String?
  toStatus   String?
  reason     String? @db.Text

  correctsActivityId String?   // corrections reference, never mutate

  opportunityId String
  opportunity   OiOpportunity  @relation(fields: [opportunityId], references: [id], onDelete: Cascade)
  stakeholderId String?
  stakeholder   OiStakeholder? @relation(fields: [stakeholderId], references: [id], onDelete: SetNull)
  draftId       String?
  draft         OiOutreachDraft? @relation(fields: [draftId], references: [id], onDelete: SetNull)

  createdAt DateTime @default(now())

  @@index([opportunityId, occurredAt])
  @@index([type, occurredAt])
  @@index([stakeholderId])
}
```

> **Append-only is enforced in the service layer**, not by the database: `activity.ts`
> exposes `appendActivity()` and `correctActivity()` and no update or delete path.

### 4.9 `OiOutreachDraft` — SUPERSEDED by `OiArtifact` (§9.5)

> **Do not implement this model.** It is generalized into `OiArtifact` with a `kind` enum in
> §9.5, which absorbs executive brief, research summary, email draft, LinkedIn draft, talking
> points, meeting prep, and proposal outline. Retained here for the field-level detail that
> carries over unchanged (provenance, claim validation, context snapshot).

```prisma
model OiOutreachDraft {
  id      String            @id @default(cuid())
  channel OiOutreachChannel
  status  OiDraftStatus     @default(draft)
  version Int               @default(1)

  subject String?
  body    String  @db.Text

  // Provenance
  aiGenerated   Boolean  @default(true)
  aiModel       String?
  promptVersion String?
  contextSnapshot Json              // exact context passed to the model
  citedEvidenceIds String[] @default([])
  citedProofIds    String[] @default([])

  // Claim validation gate
  unsupportedClaims String[] @default([])   // non-empty => approval blocked
  validationPassed  Boolean  @default(false)

  approvedAt DateTime?
  operatorEditedAt DateTime?

  opportunityId String
  opportunity   OiOpportunity  @relation(fields: [opportunityId], references: [id], onDelete: Cascade)
  stakeholderId String?
  stakeholder   OiStakeholder? @relation(fields: [stakeholderId], references: [id], onDelete: SetNull)

  activities OiActivity[]

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@index([opportunityId, status])
  @@unique([opportunityId, channel, version])
}
```

> **There is no `sentAt` field, by design.** A draft is never sent by the system. Sending is
> an `OiActivity(type=outreach_sent)` that Todd logs after sending from his own client.

### 4.10 `OiRoleProfile` — FTE extension (1:0..1)

```prisma
model OiRoleProfile {
  id String @id @default(cuid())

  // Compensation — drives the hard filter
  compMin           Int?
  compMax           Int?
  compCurrency      String  @default("USD")
  compSource        String?   // "posting" | "recruiter" | "levels.fyi" | "operator_estimate"
  meetsCompFloor    Boolean @default(false)
  totalCompEstimate Int?      // base + bonus + equity, annualized

  // Work arrangement
  isRemote        Boolean?
  location        String?
  travelPercent   Int?
  remoteCompatible Boolean @default(true)

  // Role shape
  reportsToTitle  String?
  teamSize        String?
  scopeNotes      String? @db.Text
  seniorityBand   String?   // "Director" | "VP" | "SVP" | "C-suite"

  // Application mechanics
  applicationUrl   String?
  requisitionId    String?
  postedAt         DateTime?
  closesAt         DateTime?
  postingLastCheckedAt DateTime?
  postingIsOpen    Boolean @default(true)

  resumeVariant    String?   // which tailored resume was used
  applicationNote  String?  @db.Text
  appliedAt        DateTime?

  // Interview tracking
  currentStage     String?
  nextInterviewAt  DateTime?
  offerAmount      Int?
  offerReceivedAt  DateTime?

  opportunityId String        @unique
  opportunity   OiOpportunity @relation(fields: [opportunityId], references: [id], onDelete: Cascade)

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@index([meetsCompFloor])
  @@index([closesAt])
}
```

### 4.11 `OiRfpProfile` — RFP extension (1:0..1)

```prisma
model OiRfpProfile {
  id String @id @default(cuid())

  issuer            String
  solicitationNumber String?
  sourcePortal      String?
  portalUrl         String?

  // Deadlines — the whole point of a separate intake
  postedAt            DateTime?
  questionDeadlineAt  DateTime?
  submissionDeadlineAt DateTime?
  mandatoryConferenceAt DateTime?
  conferenceIsMandatory Boolean @default(false)

  // Qualification
  budgetLow  Int?
  budgetHigh Int?
  scopeSummary          String?  @db.Text
  qualificationRequirements String[] @default([])
  evaluationCriteria    String[] @default([])
  requiredCertifications String[] @default([])
  incumbentName         String?

  // Decision
  canPrime       Boolean       @default(false)
  primeBlockers  String[]      @default([])
  bidDecision    OiBidDecision @default(undecided)
  bidDecisionReason String?    @db.Text
  bidDecisionAt  DateTime?
  partnerSearchDeadlineAt DateTime?
  partnerCandidates String[]  @default([])
  selectedPartner   String?

  requiredDocuments String[] @default([])
  submittedAt       DateTime?

  opportunityId String        @unique
  opportunity   OiOpportunity @relation(fields: [opportunityId], references: [id], onDelete: Cascade)

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@index([submissionDeadlineAt])
  @@index([bidDecision])
}
```

### 4.12 `OiOutcome` — learning capture

```prisma
model OiOutcome {
  id   String        @id @default(cuid())
  type OiOutcomeType

  // Commercial result
  proposedValue Int?
  actualValue   Int?     // annualized
  isRecurring   Boolean @default(false)
  monthlyValue  Int?
  contractStartAt DateTime?
  contractEndAt   DateTime?

  closeReason String  @db.Text
  lesson      String? @db.Text   // what to do differently

  // Attribution
  daysFromFirstSignal Int?
  daysFromFirstOutreach Int?
  originatingSignalType OiSignalType?
  scorePolicyVersion    String?
  scoreAtClose          Int?

  opportunityId String        @unique
  opportunity   OiOpportunity @relation(fields: [opportunityId], references: [id], onDelete: Cascade)

  createdAt DateTime @default(now())

  @@index([type, createdAt])
}
```

### 4.13 `OiOffer` — seeded reference table

```prisma
model OiOffer {
  id   String      @id @default(cuid())
  slug String      @unique
  name String
  kind OiOfferKind

  description   String  @db.Text
  valueLow      Int
  valueHigh     Int
  isRecurring   Boolean @default(false)
  typicalWeeks  Int?
  domainTags    String[] @default([])
  problemTags   String[] @default([])
  publicUrl     String?
  isActive      Boolean @default(true)

  opportunities OiOpportunity[]

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@index([kind, isActive])
}
```

**Seed (from `CURRENT_REALITY.md` §Service Architecture):**

| slug | kind | value | recurring |
|---|---|---|---|
| `operational-recovery-assessment` | assessment | $5K–$8K | no |
| `prior-auth-operational-assessment` | assessment | $5K–$8K | no |
| `operational-truth-diagnostic` | diagnostic | $15K–$30K | no |
| `decision-layer-build-sprint` | build | $45K–$150K | no |
| `fractional-operational-advisor` | fractional | $12K–$25K/mo | yes |
| `executive-briefing-workshop` | workshop | $3K–$6K | no |
| `specialist-subcontract` | subcontract | $10K–$40K | no |

### 4.14 `OiProofItem` + `OiOpportunityProof`

```prisma
model OiProofItem {
  id   String @id @default(cuid())
  slug String @unique
  title String
  kind  String   // "case_study" | "assessment_framework" | "article" | "diagram"

  summary     String   @db.Text
  publicUrl   String?          // safe to share in outreach
  internalRef String?          // e.g. Asset.slug — pointer only, no FK
  domainTags  String[] @default([])
  problemTags String[] @default([])
  isApprovedForOutreach Boolean @default(false)

  opportunityLinks OiOpportunityProof[]

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@index([kind, isApprovedForOutreach])
}

model OiOpportunityProof {
  opportunityId String
  opportunity   OiOpportunity @relation(fields: [opportunityId], references: [id], onDelete: Cascade)
  proofItemId   String
  proofItem     OiProofItem   @relation(fields: [proofItemId], references: [id], onDelete: Cascade)

  matchScore      Int?
  relevanceReason String?
  isSelected      Boolean @default(false)

  createdAt DateTime @default(now())

  @@id([opportunityId, proofItemId])
  @@index([proofItemId])
}
```

> **No foreign key to `Asset`.** `internalRef` is a soft pointer by slug. This keeps the
> commercial and content contexts decoupled and avoids modifying the content spine.

---

## 5. Constraints requiring raw SQL

Prisma cannot express these; they go in the migration as raw SQL.

```sql
-- Exactly one open next action per opportunity
CREATE UNIQUE INDEX "OiNextAction_one_open_per_opportunity"
  ON "OiNextAction" ("opportunityId") WHERE "status" = 'open';

-- At most one selected stakeholder per opportunity
CREATE UNIQUE INDEX "OiStakeholder_one_selected_per_opportunity"
  ON "OiStakeholder" ("opportunityId") WHERE "isSelected";

-- Facts, evidence, and gaps must hang off something
ALTER TABLE "OiOpportunityFact" ADD CONSTRAINT "fact_has_parent"
  CHECK ("opportunityId" IS NOT NULL OR "initiativeId" IS NOT NULL);
ALTER TABLE "OiEvidence" ADD CONSTRAINT "evidence_has_parent"
  CHECK ("opportunityId" IS NOT NULL OR "initiativeId" IS NOT NULL);
ALTER TABLE "OiResearchGap" ADD CONSTRAINT "gap_has_parent"
  CHECK ("opportunityId" IS NOT NULL OR "initiativeId" IS NOT NULL);

-- Value band sanity
ALTER TABLE "OiOpportunity" ADD CONSTRAINT "value_band_ordered"
  CHECK ("estimatedValueLow" IS NULL OR "estimatedValueHigh" IS NULL
         OR "estimatedValueLow" <= "estimatedValueHigh");

-- Drop the blocking pursuit constraint (C1)
DROP INDEX IF EXISTS "OiPursuit_personId_mode_key";
```

---

## 6. Migration plan

### Migration 1 — `add_pois_core` (additive, Slice 0)

1. `CREATE TYPE` for all new enums.
2. `ALTER TYPE "OiOpportunityStatus" ADD VALUE ...` for each new status (additive; Postgres
   requires these outside a transaction — Prisma handles this with separate statements).
3. `CREATE TABLE` for all new models.
4. `ALTER TABLE` additions to `OiOrganization`, `OiPerson`, `OiOpportunity`,
   `OiOpportunityFact`, `OiEvidence`, `OiResearchGap`, `OiSource`.
5. `ALTER TABLE "OiSource" ALTER COLUMN "opportunityId" DROP NOT NULL;`
6. `ALTER TABLE "OiPursuit" ADD COLUMN "opportunityId" TEXT;`
7. `DROP INDEX "OiPursuit_personId_mode_key";`
8. Rename `OiOpportunityScore` → `OiScore` via `@@map` (no physical rename in migration 1 —
   Prisma model rename with `@@map("OiOpportunityScore")` avoids a table rewrite).
9. Raw SQL constraints from §5.

**`OiOpportunity.type` is required.** Backfill in the same migration:
`UPDATE "OiOpportunity" SET "type" = 'consulting' WHERE "type" IS NULL;` then set NOT NULL.
Existing rows all came from pasted job/work sources, so `consulting` is the honest default;
Todd reclassifies in the UI.

### Migration 2 — data backfill (idempotent script, not a migration)

`scripts/oi/backfill-pursuits.mjs` — algorithm in `POIS-TARGET-ARCHITECTURE.md` §12 Step 2.
Safe to re-run: keyed on `OiPursuit.opportunityId IS NULL`.

### Migration 3 — seeds

`scripts/oi/seed-offers.mjs` (7 offers), `scripts/oi/seed-proof.mjs` (~15 proof items from
`docs/CASE_STUDY_LIBRARY.md`, `docs/HEALTHCARE_FRAMEWORK_LIBRARY.md`).

### Migration 4 — retire (POST-OCTOBER-1, do not run before)

`DROP TABLE "OiPursuit"` after Todd confirms nothing is lost.

### Rollback

Migrations 1–3 are additive; rollback is `DROP TABLE`/`DROP COLUMN` on new objects only. No
existing data is modified except the `OiOpportunity.type` backfill, which is reversible by
dropping the column.

---

## 7. Index rationale

| Index | Query it serves |
|---|---|
| `OiScore(priorityEfficiency)` | Today view ranking — the hottest query |
| `OiOpportunity(type, status)` | Path filters (FTE vs consulting pipeline) |
| `OiOpportunity(lastActivityAt)` | Weekly stale sweep |
| `OiNextAction(status, dueAt)` | Overdue and due-today |
| `OiSignal(status, createdAt)` | Triage queue |
| `OiSignal(organizationId, tier, status)` | Clustering candidates for an account |
| `OiInitiative(lastEvidenceAt)` | 90-day confidence decay |
| `OiRfpProfile(submissionDeadlineAt)` | Deadline alerts |
| `OiRoleProfile(closesAt)` | Posting expiry |
| `OiActivity(opportunityId, occurredAt)` | Workbench timeline |
| `OiOrganization(domain)` | Entity resolution / dedupe |
| `OiPerson(doNotContact)` | Outreach suppression |

---

## 8. Model-to-question map

| Brief §8.1 concept | Canonical model |
|---|---|
| source | `OiSource` |
| signal | `OiSignal` |
| organization / account | `OiOrganization` |
| buying initiative | `OiInitiative` |
| opportunity | `OiOpportunity` |
| person | `OiPerson` |
| stakeholder relationship | `OiStakeholder` |
| evidence / claim | `OiEvidence` + `OiOpportunityFact` |
| research gap | `OiResearchGap` |
| commercial hypothesis | `OiInitiative.hypothesis` + `OiOpportunity.operatorThesis` |
| offer | `OiOffer` |
| proof item | `OiProofItem` |
| activity | `OiActivity` |
| next action | `OiNextAction` |
| outreach draft | `OiOutreachDraft` |
| application | `OiRoleProfile` (application fields) |
| conversation | `OiActivity(type=conversation)` |
| proposal | `OiActivity(type=proposal_sent)` + `OiOutcome` |
| engagement / role | `OiOutcome` |
| outcome | `OiOutcome` |
| decision + prediction | `OiDecision` (§9.1) |
| campaign | `OiCampaign` (§9.3) |
| playbook | `OiPlaybook` (§9.4) |
| generated artifact | `OiArtifact` (§9.5) |
| weekly review | `OiWeeklyReview` (§9.6) |
| **opportunity timeline** | **derived — no model** (§9.7) |
| **executive brief** | **derived — no model** (§9.8) |

---

# 9. Milestone 2–4 additions

Five new models, one join, two field extensions. **Two of the requested concepts require no
schema at all** — see §9.7 and §9.8.

## 9.1 `OiDecision` — the decision journal

**Ships in Milestone 1 (write side), not Milestone 4.** See
`POIS-IMPLEMENTATION-READINESS-REVIEW.md` §2 for why.

```prisma
enum OiDecisionType {
  promote_signal
  dismiss_signal
  qualify_opportunity
  disqualify_opportunity
  select_stakeholder
  select_offer
  select_playbook
  approve_artifact
  send_outreach
  submit_application
  bid_no_bid
  send_proposal
  pause_opportunity
  close_opportunity
}

enum OiDecisionConfidence { low  medium  high }

model OiDecision {
  id   String         @id @default(cuid())
  type OiDecisionType

  // ─── Captured AT decision time, before the outcome is known ───
  decision String @db.Text   // what Todd decided, one line
  reason   String @db.Text   // why — REQUIRED, this is the learning signal
  confidence OiDecisionConfidence

  // Prediction. PRE-FILLED from the current OiScore snapshot so capture stays under 20s.
  expectedValue       Int?      // USD annualized, from score.estimatedValue
  expectedEffortHours Decimal?  @db.Decimal(6, 2)   // from score.estimatedHours
  expectedProbability Int?      // 0-100, from score.conversionProbability
  expectedOutcome     String?   @db.Text            // what Todd expects to happen

  scoreIdAtDecision String?     // the snapshot the prediction came from
  scoreId           OiScore?    @relation(fields: [scoreIdAtDecision], references: [id], onDelete: SetNull)

  // ─── Filled in later, when reality is known ───
  actualOutcome   String?   @db.Text
  actualValue     Int?
  actualEffortHours Decimal? @db.Decimal(6, 2)
  lessonsLearned  String?   @db.Text
  resolvedAt      DateTime?

  // Derived on resolve — the delta is what the learning loop reads
  valueDelta   Int?      // actualValue - expectedValue
  effortDelta  Decimal?  @db.Decimal(6, 2)
  wasCorrect   Boolean?  // operator's own verdict on the decision

  opportunityId String?
  opportunity   OiOpportunity? @relation(fields: [opportunityId], references: [id], onDelete: Cascade)
  signalId      String?
  signal        OiSignal?      @relation(fields: [signalId], references: [id], onDelete: SetNull)

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@index([type, createdAt])
  @@index([opportunityId, createdAt])
  @@index([resolvedAt])                 // unresolved predictions = weekly review input
}
```

**Design constraints that make this work:**

- `reason` and `confidence` are the **only** required operator inputs. Everything else
  pre-fills from the score.
- Capture is **inline at the decision point** — a modal on the existing action, never a
  separate screen.
- Decisions are **not** deleted. A reversed decision produces a new `OiDecision`.
- `resolvedAt IS NULL` with an aged `createdAt` is what the weekly review surfaces as
  "predictions awaiting reality."

## 9.2 `OiOpportunityFact` — add `personId`

**Extension, not a new model.** This is what lets Executive Brief reuse the existing
provenance machinery instead of getting its own table.

```prisma
model OiOpportunityFact {
  // … all existing fields unchanged …

  personId String?      // NEW — person-scoped facts: career, talks, interviews, priorities
  person   OiPerson? @relation(fields: [personId], references: [id], onDelete: Cascade)

  @@index([personId, field, ordinal])   // NEW
  // CHECK widened to three parents:
  // (opportunityId IS NOT NULL OR initiativeId IS NOT NULL OR personId IS NOT NULL)
}
```

The model name stays `OiOpportunityFact` — renaming costs a migration and buys nothing.

## 9.3 `OiCampaign`

```prisma
model OiCampaign {
  id   String @id @default(cuid())
  slug String @unique
  name String

  thesis      String   @db.Text   // why this theme is commercially live now
  domainTags  String[] @default([])
  isActive    Boolean  @default(true)

  targetAccountNames String[] @default([])   // aspirational targets not yet in the system

  opportunityLinks OiCampaignOpportunity[]

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@index([isActive])
}

model OiCampaignOpportunity {
  campaignId    String
  campaign      OiCampaign    @relation(fields: [campaignId], references: [id], onDelete: Cascade)
  opportunityId String
  opportunity   OiOpportunity @relation(fields: [opportunityId], references: [id], onDelete: Cascade)

  addedBy   String   @default("operator")
  createdAt DateTime @default(now())

  @@id([campaignId, opportunityId])
  @@index([opportunityId])
}
```

**Seed example:** `prior-authorization` — "CMS interoperability deadlines plus denial-rework
cost pressure make PA modernization funded across major payers in 2026." Targets: Humana,
UnitedHealthcare, Elevance, GuideWell.

**Campaigns are a grouping and a rollup, not a workflow.** An opportunity belongs to zero or
more. No campaign-level actions in the first release.

## 9.4 `OiPlaybook`

**Data and display only in Milestone 2. No execution engine.** Playbooks do **not** replace
`deriveNextAction()` — see `POIS-IMPLEMENTATION-READINESS-REVIEW.md` §3.

```prisma
enum OiPlaybookScope {
  healthcare_executive
  job_application
  consulting_assessment
  warm_referral
  cold_outreach
  partnership
  program_recovery
}

model OiPlaybook {
  id    String          @id @default(cuid())
  slug  String          @unique
  name  String
  scope OiPlaybookScope

  // When this playbook applies — matched, never auto-applied
  appliesToTypes         OiOpportunityType[]  @default([])
  appliesToRelationships OiRelationshipType[] @default([])
  domainTags             String[]             @default([])

  // ─── Content: checklists and guidance, not executable steps ───
  researchSteps    String[] @default([])   // ordered checklist
  decisionPoints   String[] @default([])   // what to decide, and when
  proofGuidance    String?  @db.Text
  offerGuidance    String?  @db.Text
  draftGuidance    String?  @db.Text       // tone, angle, what to lead with
  followUpRhythmDays Int[]  @default([])   // e.g. [7, 14, 30] — informs due dates only
  commonObjections String[] @default([])

  isActive Boolean @default(true)

  opportunities OiOpportunity[]

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@index([scope, isActive])
}
```

Plus on `OiOpportunity`: `playbookId String?` — operator-selected, never auto-assigned.

**Seed:** the seven scopes above, one playbook each.

## 9.5 `OiArtifact` — replaces `OiOutreachDraft`

One model, seven kinds. This is the consolidation described in the readiness review §0.

```prisma
enum OiArtifactKind {
  executive_brief
  research_summary
  email_draft
  linkedin_draft
  talking_points
  meeting_prep
  proposal_outline
  intro_request
  application_note
  follow_up_draft
}

enum OiArtifactStatus { draft  operator_review  approved_for_manual_use  changes_requested  discarded }

model OiArtifact {
  id      String           @id @default(cuid())
  kind    OiArtifactKind
  status  OiArtifactStatus @default(draft)
  version Int              @default(1)

  title String?
  body  String  @db.Text

  // Provenance — identical rules to the superseded OiOutreachDraft
  aiGenerated     Boolean  @default(false)
  aiModel         String?
  promptVersion   String?
  contextSnapshot Json                        // exact context passed to the model
  citedEvidenceIds String[] @default([])
  citedProofIds    String[] @default([])

  // Claim validation gate — non-empty unsupportedClaims BLOCKS approval
  unsupportedClaims String[] @default([])
  validationPassed  Boolean  @default(false)

  approvedAt       DateTime?
  operatorEditedAt DateTime?

  opportunityId String
  opportunity   OiOpportunity  @relation(fields: [opportunityId], references: [id], onDelete: Cascade)
  stakeholderId String?
  stakeholder   OiStakeholder? @relation(fields: [stakeholderId], references: [id], onDelete: SetNull)

  activities OiActivity[]

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@index([opportunityId, kind, status])
  @@unique([opportunityId, kind, stakeholderId, version])
}
```

> **There is no `sentAt` field, by design.** Nothing is transmitted by the system. Sending is
> an `OiActivity(type=outreach_sent)` that Todd logs after sending from his own client.

Artifacts requiring the full outreach gate (`canPrepareOutreach`): `email_draft`,
`linkedin_draft`, `intro_request`, `application_note`, `follow_up_draft`, `proposal_outline`.

Artifacts available any time evidence exists: `executive_brief`, `research_summary`,
`talking_points`, `meeting_prep`.

## 9.6 `OiWeeklyReview`

```prisma
model OiWeeklyReview {
  id          String   @id @default(cuid())
  periodStart DateTime
  periodEnd   DateTime

  // Auto-computed snapshot at review time
  metrics Json
  // { signalsCaptured, signalsPromoted, signalsDismissed,
  //   opportunitiesCreated, opportunitiesClosed, opportunitiesStalled,
  //   outreachPrepared, outreachSent, applicationsSubmitted,
  //   conversations, proposalsOutstanding,
  //   pipelineExpectedValue, incomeReplacementPercent,
  //   decisionsRecorded, decisionsResolved, predictionsWrong }

  // Operator reflection — the part that cannot be computed
  whatChanged      String? @db.Text
  whatStalled      String? @db.Text
  wrongPredictions String? @db.Text
  timeSpentNotes   String? @db.Text
  lessons          String? @db.Text
  nextWeekFocus    String? @db.Text

  completedAt DateTime?

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@unique([periodStart, periodEnd])
  @@index([completedAt])
}
```

## 9.7 Opportunity Timeline — **derived, no model**

Do not create `OiTimeline` or `OiTimelineEvent`.

```ts
// action/timeline.ts
export type TimelineEvent = {
  at: Date;
  kind: "signal" | "activity" | "status_change" | "decision";
  label: string;
  detail: string | null;
  sourceUrl: string | null;
  refId: string;
};

export async function buildTimeline(opportunityId: string): Promise<TimelineEvent[]>;
// Merge, sorted ascending by `at`:
//   OiSignal   (via the opportunity's initiative)  → occurredAt ?? createdAt
//   OiActivity (opportunityId)                     → occurredAt
//   OiActivity (type = status_change)              → occurredAt
//   OiDecision (opportunityId)                     → createdAt
```

This produces exactly the requested narrative — executive hired → transformation announced →
role opened → RFP released → proposal → outcome — from data the schema already holds.

## 9.8 Executive Brief — **derived, optionally snapshotted**

Do not create `OiBrief`.

```ts
// action/executive-brief.ts
export type ExecutiveBrief = {
  person: {...};
  sections: {
    career: BriefSection;             // OiOpportunityFact where personId
    responsibilities: BriefSection;   // OiOpportunityFact where personId
    recentAnnouncements: BriefSection;// OiSignal at account, last 180d
    knownInitiatives: BriefSection;   // OiInitiative at account
    likelyPriorities: BriefSection;   // INFERRED — playbook + initiative category
    likelyKpis: BriefSection;         // INFERRED — playbook
    publicInterviews: BriefSection;   // OiOpportunityFact where personId
    conferenceTalks: BriefSection;    // OiOpportunityFact where personId
    authority: BriefSection;          // OiStakeholder.authority + access components
    relationship: BriefSection;       // OiStakeholder.relationshipType
    warmPath: BriefSection;           // OiStakeholder.warmPathNotes
    recommendedApproach: BriefSection;// playbook + selected offer
    researchGaps: BriefSection;       // OiResearchGap where blocksOutreach
  };
};

export type BriefSection = {
  items: { text: string; basis: OiFactBasis; confidence: number; sourceUrl: string | null }[];
  isEmpty: boolean;
  gapPrompt: string | null;   // what to research if empty
};
```

Every section carries `basis` per item, so inferred content renders visually distinct — the
same treatment used everywhere else. **Empty sections show a research prompt, never blank
space**; that is what turns the brief into a work surface rather than a report.

Snapshotting: when Todd prepares outreach, the brief is written to `OiArtifact` with
`kind = executive_brief`. The canonical brief always reflects current data.

## 9.9 `OiOffer` — enrichment

```prisma
model OiOffer {
  // … all existing fields unchanged …

  idealBuyer        String?  @db.Text   // NEW — role and situation
  problemSolved     String?  @db.Text   // NEW
  deliverables      String[] @default([])  // NEW
  typicalObjections String[] @default([])  // NEW
  proofItemIds      String[] @default([])  // NEW — soft pointers to OiProofItem
  positioningNotes  String?  @db.Text   // NEW — how to frame it
}
```

Todd populates these once, at seed time. They feed the offer recommendation on the workbench
and the draft guidance passed to artifact generation.

## 9.10 Migration and index summary

**Migration 5 — `add_pois_milestone_2_4`** (additive, runs before Milestone 1 UI work so the
decision journal is available from day one):

1. New enums: `OiDecisionType`, `OiDecisionConfidence`, `OiPlaybookScope`, `OiArtifactKind`,
   `OiArtifactStatus`.
2. New tables: `OiDecision`, `OiCampaign`, `OiCampaignOpportunity`, `OiPlaybook`,
   `OiArtifact`, `OiWeeklyReview`.
3. `OiOpportunityFact`: add `personId` + index; widen the CHECK constraint to three parents.
4. `OiOpportunity`: add `playbookId String?`.
5. `OiOffer`: add six enrichment columns.
6. `OiOutreachDraft` is **not created** — `OiArtifact` supersedes it.

**Seeds:** `scripts/oi/seed-playbooks.mjs` (7), `scripts/oi/seed-campaigns.mjs` (1–3, Todd
supplies the themes). Offer enrichment extends the existing `seed-offers.mjs`.

| New index | Query it serves |
|---|---|
| `OiDecision(resolvedAt)` | Weekly review: unresolved predictions |
| `OiDecision(opportunityId, createdAt)` | Workbench decision history |
| `OiOpportunityFact(personId, field, ordinal)` | Executive brief assembly |
| `OiArtifact(opportunityId, kind, status)` | Workbench artifact lookup |
| `OiCampaignOpportunity(opportunityId)` | Campaign badges on the workbench |
| `OiWeeklyReview(completedAt)` | Review history |
