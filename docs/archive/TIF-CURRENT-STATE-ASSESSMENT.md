# TIF Current State Assessment

**Date:** 2026-07-31  
**Status:** Comprehensive operational audit of v0.1 + v0.2 implementation  
**Scope:** What is actually built, what is intended, gaps between them, and commercial readiness

---

## Executive Summary

The TIF is a **dual-system architecture** with two separate operating models:

1. **Content Production Spine** (TIF v0.1–v0.2, mature): Evidence → Opportunity → Asset → Derivative pipeline. Complete, deterministic, human-reviewed. Serves content production for TKO, Rachel, CRE.

2. **Commercial Pursuit System** (Opportunity Intelligence, v0.1-early, incomplete): Organization → Person → Pursuit scoring and organization-first opportunity records. Partially implemented. Disconnected from content system and missing critical commercial workflows.

**Current maturity:** TIF can produce and manage content. TIF cannot yet run a repeatable commercial pursuit workflow that converts signals into diagnostic conversations and advisory engagements.

**Highest-priority blockers to operational use:**
- No unified commercial dashboard answering "What is my best opportunity today?"
- OI and content systems are separate, with no data flow between them
- No outreach preparation workflow (research + draft generation)
- No next-action assignment or follow-up tracking
- No engagement wedge or offer selection
- No outcome learning loop

---

## What Is Implemented

### Content Production (TIF v0.1–v0.2)

**Schema models:**
- `CaptureItem`: Lightweight observation intake with source, tags, timestamps, optional media reference, and transcript field. Entry point for raw observations. Status model (inbox → reviewed → promoted → archived) exists but promotion workflow is not implemented.
- `Evidence`: Proof-grade admitted source material with domain, business unit, observation, proof reference, claim guard. Intended as traceable foundation for asset composition. Claim metadata is text-based, not structured.
- `AssetOpportunity`: Content production intent. Links title, tenant, asset type, angle, audience, source type/URL, context notes. Many-to-many evidence linkage. Status is binary (opportunity → composed).
- `Asset` + `AssetVersion`: Produced content with draft/review/approved/published status, output path, version history, hash support, manual-edit detection. Revision requests model for feedback. Derivative assets per source version.
- `KnowledgeDiagram`: Typed extension of Asset for architecture, workflow, dependency, governance, heat map, timeline formats. Includes purpose, business problem, execution audience, evidence status, and diagram-specific metadata.
- `DerivativeAsset`: Channel-specific package (LinkedIn post, email, PDF, etc.) tied to specific Asset version with context and behavioral strategy.

**Workflows:**
1. **Capture:** Raw intake without classification or AI processing. Immutable append-only.
2. **Evidence curation:** Manual asset-grade record creation with claim guard language (external model; YAML files in `content/proof/*/evidence.yaml` are canonical, DB is exploratory).
3. **Opportunity creation:** Title, angle, asset type, audience, source type selection → stored record ready for composition.
4. **Asset generation:** Deterministic template-fill composition (not yet AI) from evidence and opportunity context. Draft-only output; no autonomous publishing.
5. **Revision management:** Open revisions per asset. Manual application or dismissal. No automated re-composition.
6. **Derivative generation:** Channel-specific adaptations from approved asset version.

**Operator surface:**
- `/tif`: Console dashboard showing evidence, opportunities, assets, and workflow queue (unstarted opportunities, in-progress assets, review needed, rejected, published).
- `/tif/inbox`: Capture form and captured items list.
- `/tif/opportunities`: Asset opportunity registry with creation form.
- `/tif/assets/[slug]`: Asset detail, version history, evidence traceability, revision requests.
- `/tif/deliverables`: Readiness view (not fully implemented; referenced in PRD but limited scope).
- `/tif/inventory`: Cross-repo content inventory scan results.
- `/tif/diagrams`: Knowledge diagram registry and detail view.
- `/tif/proof`: Read-only intelligence layer derived from RachelOS and TKO proof sources.

**Maturity level:** Production-ready for content creation workflows within defined scope (TKO, Rachel, CRE). Compose only produces draft status; human review gates all publication.

---

### Commercial Pursuit System (Opportunity Intelligence, v0.1-early)

**Schema models:**
- `OiOrganization`: Company with kind (payer, health_tech, health_system, consulting, other), website, notes. Container for people and opportunities.
- `OiPerson`: Executive with name, title, seniority (director through c_suite), sourced-from URL/label, source confidence (0–3), domain tags, and operator-assigned authority scores (budget, hiring, transformation, relationship strength). Unique per (organization, name, title). Many pursuits per person.
- `OiPursuit`: Person + opportunity pair representing a potential engagement path (consulting, employment, or both). Mode, status (prospect → research_ready → contact_ready → contacted → conversation → paused → closed), monthly value target, problem hypothesis, fit hypothesis, evidence summary, next action, and professional email. Scored by pursuit-fit policy. Pursuits cannot exist without a known person.
- `OiOpportunity`: Funded work, problem, initiative, or role within organization. Status (reviewing → qualified → paused → closed). Operator thesis and basis (stated/inferred/operator). Optional current score snapshot. **Does not require a known person.** Separate fact/evidence/research-gap models.
- `OiSource`: Immutable snapshot of source material (job posting, announcement, referral, regulatory event, pasted text, etc.). Raw and normalized content, hash, retrieval time, optional publish time and canonical URL. Linked to opportunity.
- `OiEvidence`: Text excerpt from source with start/end offsets into raw content. Immutable. Links opportunity → source → facts.
- `OiOpportunityFact`: Extracted or operator-overridden fact (field: opportunity_title, reporting_line, business_problem, technology, urgency, responsibility, compensation, transformation_language). Basis (stated/inferred/operator), confidence (0–100), ordinal, operator-override flag.
- `OiResearchGap`: Open question needing research. Status (open → resolved → dismissed). Links to opportunity. Auto-resolved when source extraction answers the gap.
- `OiOpportunityScore`: Append-only fit score snapshot. Total, completeness %, components with points/reasons, input snapshot, policy version. Linked to opportunity as current score.

**Workflows:**
1. **Bootstrap:** Load starter person cohort (operator-defined anchors + sourced research across four target companies). Creates organizations, people, lookalike anchors, and initial pursuits.
2. **Pasted opportunity ingest:** Paste job posting, announcement, or opportunity text. System:
   - Normalizes and hashes content; checks duplicate.
   - Extracts facts (field, value, normalized value, ordinal, basis, confidence, source offset).
   - Plans research gaps (questions still needing answers).
   - Scores fit against Todd's capability profile.
   - Updates current score.
   - Does not automatically create a person or pursuit.
3. **Opportunity fact extraction:** Claude-based extraction from pasted text using contracts for fields. Confidence and evidence offsets verified.
4. **Research gap planning:** Identifies questions needing answers (missing fields, thesis missing, etc.). Auto-resolves gaps when newly extracted source answers them.
5. **Fit scoring:** Deterministic scoring against TODD_CAPABILITY_PROFILE (business problems, transformation language, responsibilities, technologies, domain tags, etc.). Max 125 points. Produces readable component breakdown with reasons.
6. **Person creation and pursuit link:** Manual operator workflow (not automated). Create person, link to organization, set authority scores, link person to opportunity as pursuit.
7. **Pursuit status management:** Manual status transitions from prospect → research_ready → contact_ready → contacted → conversation → paused/closed. Score and email preserved per pursuit.

**Operator surface:**
- `/tif/opportunities`: Ranking dashboard showing contact-ready pursuits, research-next candidates, lookalike anchors, consulting pipeline value. Bootstrap button. Status and score management forms.
- `/tif/opportunities/sources`: Paste opportunity form and ingestion result display.

**Implementation level:** Core data model and extraction/scoring logic complete. Pasted opportunity → extraction → scoring → research gap planning implemented and tested. Bootstrap starter cohort implemented. Person-first pursuit creation partially implemented (manual actions, no UI workflows). **Contact email discovery not implemented. Outreach generation not implemented. Follow-up tracking not implemented.**

**Maturity level:** Early proof-of-concept. Data model is sound. Extraction and scoring are deterministic and tested. Navigation and operator experience are thin; many workflows require direct form submission or API calls.

---

## Major Inconsistencies and Gaps

### 1. Two Separate Commercial Models

**Issue:** Content TIF (AssetOpportunity) and Commercial TIF (OiOpportunity) are independent systems with no data bridge.

- `AssetOpportunity` is content-centric: "What should we write?" Serves TKO/Rachel/CRE production.
- `OiOpportunity` is pursuit-centric: "What company/problem should we pursue?" Serves Todd's advisory business.

**Evidence:**
- No shared organization model between systems.
- No way to link a commercial opportunity (OiOpportunity) to Todd's proof assets or case studies.
- No way to track "which content does Todd need to prepare for this opportunity?"
- No way to say "this job posting is relevant to case study XYZ" or "send them this assessment framework."

**Commercial consequence:** Todd cannot use content and commercial intelligence together. He must manually track which opportunities need what proof.

---

### 2. No Commercial Workflow After Scoring

**Issue:** OI system can extract and score a job posting, but provides no path from "contact_ready pursuit" to "outreach sent."

**Missing steps:**
1. **Stakeholder hypothesis:** Who is the likely owner/sponsor/buyer? Multiple possible stakeholders per opportunity. No model for this.
2. **Research synthesis:** What research already exists (from sources) that should inform outreach? No research summary.
3. **Proof matching:** Which of Todd's case studies, assessments, or assets are relevant? No matching.
4. **Engagement wedge selection:** What offer (assessment, advisory retainer, fractional role)? No offer model linked to opportunities.
5. **Outreach preparation:** Research-informed email draft + key talking points. No generation workflow.
6. **Contact discovery:** Email address for target person. Not yet implemented.
7. **Activity tracking:** "Emailed X at Y on date Z." No activity log.
8. **Follow-up scheduling:** When to follow up? Calendar management? Not implemented.

**Evidence:**
- `OiPursuit` has `nextAction` (text field) and `nextFollowUpAt` (date field), but no workflow to create, assign, or track these.
- No form or page to generate outreach.
- No email template system.
- No contact database integration.
- Pursuit `lastContactedAt` is a timestamp but no contact record stores what was said or how it was sent.

**Commercial consequence:** Todd can identify a promising opportunity but has no system to prepare and send first outreach. He must switch to email and CRM manually.

---

### 3. No Unified Commercial Dashboard

**Issue:** Todd must check two separate pages and manually synthesize priorities.

**Current state:**
- `/tif`: Content production queue (what should we write next?).
- `/tif/opportunities`: Pursuit ranking (who should I contact next?).

**What Todd actually needs:** One dashboard answering:
- What are the **five most important opportunities** for Todd to act on this week?
- Why are they important? (score, urgency, recent signals, stakeholder fit)
- What changed since yesterday? (new evidence, new sources, status transitions)
- What is the **next action** for each? (research, draft outreach, send email, follow up)
- Why should Todd pick this over that? (expected value, time to close, strategic fit)

**Evidence:**
- No unified priority or ranking.
- No "most important" view across both systems.
- No "what changed" feed.
- No next-action calendar or task list.

**Commercial consequence:** Todd must manually review both systems and manually decide what to do next. This is friction-heavy and misses opportunities.

---

### 4. Opportunity Scoring Does Not Predict Revenue

**Issue:** `OiOpportunityScore` measures Todd's fit to the *problem statement*, not his path to revenue.

**Current scoring (opportunity-fit-v1):**
- Business problem alignment (20 pts max)
- Transformation mandate (20 pts)
- Delivery responsibility (15 pts)
- Technology alignment (10 pts)
- Urgency (10 pts)
- Sponsor proximity (10 pts)
- Economic signal (10 pts)
- Evidence strength (5 pts)
- **Max: 125 pts**

**What is missing:**
- Seniority of contact person (captured per person in `OiPerson`, but not used in opportunity scoring).
- Decision-making authority (budget authority on `OiPerson`, but not rolled up to opportunity).
- Company cash flow / ability to pay.
- Typical engagement size for that company/role/problem.
- Competitive noise or other vendors already in place.
- Time to decision or budget cycle.
- Whether Todd has a warm path or must cold-outreach.

**Evidence:**
- Separate `scoreOpportunity()` for pursuits (in `/lib/oi.ts`) uses person authority, seniority, relationship strength, organization kind, source confidence—a richer model.
- Separate `scoreOpportunityFit()` for opportunities (in `/lib/opportunity-intelligence/score.ts`) uses only capability profile match and evidence completeness.
- No model linking person authority scores to opportunity value.

**Commercial consequence:** A high-scoring problem opportunity might be owned by a junior person with no authority. Todd wastes time on unrealistic pursuits.

---

### 5. No Relationship State or Warm-Path Tracking

**Issue:** `OiPerson` and `OiPursuit` have relationship-strength scores, but no record of how Todd knows them or what has happened between them.

**Current state:**
- `OiPerson.relationshipStrength`: 0–3 operator-assigned score.
- `OiPursuit.lastContactedAt`: Timestamp, but no record of what happened.
- No "how did we meet?" field.
- No history of interactions.
- No email exchange record.
- No "mutual connection" or "referral source."
- No "reason we paused."

**Evidence:**
- No contact activity model.
- No relationship event log.
- No reason/note fields for status transitions.

**Commercial consequence:** Todd cannot answer "why am I paused with this person?" or "have we already talked about this problem?" He cannot leverage warm paths or referral introductions.

---

### 6. Capture Inbox Not Integrated to Commercial Workflow

**Issue:** `/tif/inbox` captures observations, but they do not flow into commercial opportunities or evidence.

**Current state:**
- CaptureItem has status (inbox, reviewed, promoted, archived).
- Promotion pointer to `Evidence` exists in schema.
- But no promotion workflow is implemented. No form, no action, no data migration.
- No way to say "this market signal means this company is a better opportunity."
- No way to say "this news changes what we should research about this person."

**Evidence:**
- `/tif/inbox/actions.ts` only has `createCaptureItem()`.
- No `promoteToEvidence()` action.
- No integration to OiOpportunity or OiSource.
- Capture status is never transitioned.

**Commercial consequence:** Valuable observations rot in the inbox. No feedback loop from "I found this signal" to "this changes my opportunity prioritization."

---

### 7. Evidence Model Does Not Support Field-Level Provenance

**Issue:** Evidence is stored as narrative text, not structured claims with source citations.

**Current state:**
- `Evidence.observation`: Text description of what is known.
- `Evidence.proofRef`: Citation ID (not a field-level pointer).
- `Evidence.claimGuard`: Text guard (e.g., "This applies to Payer X only").
- No structured claim types (stated fact, inferred, operator assertion, etc.).
- No evidence status beyond text in claimGuard.

**OiEvidence does better:**
- `OiOpportunityFact` has basis (stated/inferred/operator), confidence (0–100).
- `OiEvidence` has start/end offsets into raw source text (immutable audit trail).

**Evidence:**
- TIF `Evidence` model is narrative; OI `OiEvidence` is granular and immutable.

**Commercial consequence:** Todd cannot confidently cite evidence to a prospect ("Here is what we found in your 10-K filing") because the evidence is not trace-backed to a specific source offset with confidence metadata.

---

### 8. Opportunity State and Next Action Are Not First-Class

**Issue:** `OiOpportunity` and `OiPursuit` have `status`, but no state machine enforces transitions or required fields.

**Current state:**
- `OiOpportunity.status`: Enum (reviewing, qualified, paused, closed).
- `OiPursuit.status`: Enum (prospect → research_ready → contact_ready → contacted → conversation → paused → closed).
- But no workflow enforces what fields must be set before transition.
- No "what is the next action?" model.
- No due dates or follow-up calendar.

**Evidence:**
- `OiPursuit.nextAction`: Text field, manually written. No automation or template.
- `OiPursuit.nextFollowUpAt`: Date field, but no reminder or workflow.
- No state machine validation in actions.ts.

**Commercial consequence:** Todd can mark an opportunity "contact_ready" without actually preparing outreach. Status does not guarantee readiness. Follow-up dates are set but not enforced.

---

### 9. No Account Planning or Multi-Stakeholder Model

**Issue:** OI assumes one person per opportunity. Real opportunities involve multiple stakeholders with different authority and interests.

**Current state:**
- `OiPursuit` is a person-opportunity pair (1:1).
- One person per pursuit.
- No way to model "sponsor, operator, and technical lead" for the same problem.
- No way to track "these three people at different companies face the same problem."

**Evidence:**
- `OiPerson.organizationId` is required; person belongs to one org only.
- Pursuit data structure doesn't support multiple stakeholder paths.
- No "account" model higher than organization.

**Commercial consequence:** Todd treats each person as an isolated pursuit. He cannot build "account strategies" where he researches multiple entry points into one company.

---

### 10. No Learning Loop or Outcome Tracking

**Issue:** TIF captures pursuits and assets but not what happened (outcome, lessons, revenue).

**Current state:**
- No closed-won or closed-lost record.
- No engagement outcome (conversation happened, proposal sent, assessment purchased, retainer signed, recovered, etc.).
- No revenue tracked or attributed.
- No feedback from "we tried approach A and it worked/failed."

**Evidence:**
- `OiPursuit.status` ends at "paused" or "closed" with no reason.
- No engagement outcome model.
- No learning record.

**Commercial consequence:** Todd cannot improve his opportunity selection or outreach approach because he has no data on what worked.

---

## Operational Blockers

### Blocker A: No Operator Dashboard

**Blocks:** Daily commercial operations.

**Specific issues:**
- `/tif/opportunities` shows all pursuits ranked by score, but no filtering by urgency, recency, or "action needed today."
- No "what's my next action" view.
- No calendar of follow-ups.
- No "new signals this week" feed.

**File references:** `/src/app/tif/opportunities/page.tsx` (pursuit list and score display, but no prioritization logic).

---

### Blocker B: No Outreach Preparation Workflow

**Blocks:** From "contact_ready" to "email sent."

**Specific issues:**
- No research summary generation (what do we know about this person and company?).
- No proof matching (which case studies or assessments are relevant?).
- No email draft generation (what should Todd say?).
- No contact discovery (what is their email?).

**File references:**
- No outreach route at all.
- No template system.
- No draft model.

---

### Blocker C: No Integration Between Content and Commercial Systems

**Blocks:** Connecting Todd's proof to his opportunities.

**Specific issues:**
- AssetOpportunity and OiOpportunity are separate.
- No way to say "send this case study to this prospect."
- No way to discover "which case studies are relevant to this problem?"
- No way to build account-specific landing pages or briefs.

**File references:**
- Two parallel opportunity models with no bridge.

---

### Blocker D: Evidence Is Not Structured

**Blocks:** Trustworthy claims in outreach and proposals.

**Specific issues:**
- Evidence metadata is text-based, not structured.
- No evidence status or confidence metadata.
- No immutable audit trail from fact to source.

**File references:** `/src/lib/tif/db.ts` Evidence model is narrative; OI Evidence is better but not used for TIF.

---

### Blocker E: Scoring Does Not Consider Person Authority

**Blocks:** Realistic opportunity ranking.

**Specific issues:**
- OiOpportunityScore uses only capability match and completeness.
- Person authority (budget, hiring, transformation) is not factored into opportunity value.
- No model for "this problem is high-value but owned by a junior person."

**File references:**
- `/src/lib/opportunity-intelligence/score.ts` (opportunity-fit-v1 scoring).
- `/src/lib/oi.ts` (pursuit scoring, which is richer).

---

### Blocker F: No State Machine or Required Fields by Status

**Blocks:** Ensuring readiness before action.

**Specific issues:**
- Opportunity can be "contact_ready" without outreach prepared.
- No enforced workflow.
- No validation that required research exists.

**File references:** `/src/app/tif/opportunities/actions.ts` (status updates have no guards).

---

### Blocker G: No Activity Log or Relationship History

**Blocks:** Continuity between engagements and learning.

**Specific issues:**
- No record of "email sent on date X."
- No reason for status transitions.
- No "how do we know this person?" field.
- No conversation notes.

**File references:**
- No activity model in schema.

---

## Commercial Readiness Assessment

### Can Todd use TIF today to generate consulting engagements?

**Short answer:** Partially. He can manage content production and identify promising opportunities, but cannot execute a repeatable pursuit workflow.

**Breakdown:**

| Step | Implemented? | Functional? | Notes |
|---|---|---|---|
| **1. Detect signal** | Partial | Inbox captures observations; OI can ingest job postings. | Observation-to-opportunity conversion not automated. |
| **2. Determine fit** | Yes | Opportunity scoring works deterministically. | Scoring ignores person authority (contact-ready scoring richer than opportunity scoring). |
| **3. Identify stakeholder** | Partial | Person model exists; can capture multiple people per org. | No stakeholder discovery or hypothesis workflow. No way to find other stakeholders. |
| **4. Gather evidence** | Yes | Fact extraction from pasted text works. Research gaps detected. | Limited to pasted text; no company research, news monitoring, or web integration. |
| **5. Form point of view** | Partial | Operator can write problem/fit/evidence summary. | No thesis formulation workflow; no guidance on what makes a strong hypothesis. |
| **6. Select wedge** | No | No offer model or engagement type selection. | No link between problems and applicable engagement types. |
| **7. Generate outreach** | No | No draft generation, template, or research summary. | No email composition or research-to-outreach workflow. |
| **8. Track follow-up** | No | Status and date fields exist but no workflow. | No activity log, no reminders, no calendar integration. |
| **9. Convert to engagement** | No | No diagnostic call tracking or proposal workflow. | No engagement type, no engagement outcome model. |
| **10. Learn and improve** | No | No outcome tracking or feedback loop. | No closed-won/closed-lost, no revenue attribution, no lessons capture. |

**Functional coverage: ~30–40% of commercial workflow.**

---

## What the Operator Actually Needs

### Daily view:

Todd opens the dashboard and sees:
- **Top 5 priority opportunities** (ranked by expected value, not just fit score).
- Why each matters (problem urgency, stakeholder authority, likelihood).
- **What changed since yesterday** (new sources, new signals, status transitions).
- **Evidence summary** (what we know about each opportunity).
- **Next action** for each (research this gap, draft email, send outreach, follow up).
- **How much time** each action will take.

### Weekly rhythm:

- Review new signals and new leads.
- Research top gaps for high-priority opportunities.
- Prepare outreach for contact-ready pursuits.
- Follow up on paused or stalled opportunities.
- Update outcome records from completed conversations.

### Monthly learning:

- Which signals led to engagements?
- Which outreach approaches worked?
- Which stakeholders or companies are best fit?
- What problems are most common?
- Where should research focus shift?

### System integration:

- Link opportunities to Todd's case studies and proof assets.
- Generate outreach informed by actual research (not template boilerplate).
- Auto-draft follow-up reminders and next-action recommendations.
- Track engagement outcomes and attribute revenue.

---

## What Should Be Preserved, Refactored, Deferred, or Removed

### Preserve (production-critical):

- `CaptureItem` → `Evidence` → `AssetOpportunity` → `Asset` spine.
- Human review gates and revision workflow.
- Asset versioning and manual-edit protection.
- `KnowledgeDiagram` model and Asset integration.
- Proof intelligence layer (read-only, derived).
- Content inventory scan.
- Compose contract (deterministic, draft-only).

### Refactor (extend with minimal change):

- `OiOpportunityScore`: Add person authority and company context inputs. Rename to reflect "pursuit opportunity value" not just "fit." Add time-to-decision and likelihood factors.
- `OiPerson.relationshipStrength`: Add relationship event log. Track how Todd knows them, referral source, past interactions.
- `OiPursuit.nextAction`: Formalize as a state-driven field; remove freetext; add action type, due date, and completion status.
- Opportunity ingestion: Add contact discovery workflow (email lookup).
- Navigation: Consolidate content and commercial TIF into one operator surface.

### Defer (not prerequisites for commercial operations):

- Vector search or semantic retrieval.
- Graph database or generic platform.
- Autonomous agent for opportunity discovery.
- Autonomous publishing or outreach.
- Measurement integrations (Google Analytics, CRM sync, email tracking).
- Multi-team collaboration or approval workflows.

### Remove (no longer strategic):

- Binary "opportunity/composed" status on AssetOpportunity (replace with readiness enum).
- Unlinked lists of problems/patterns/frameworks in page components (move to first-class models only after content is proven).
- Duplicated evidence or claim-status fields (consolidate into one Evidence model with field-level metadata).

---

## Summary: Current State vs. Target State

**Current:** Two mature but disconnected systems (content production + early-stage pursuit tracking) with missing commercial workflows.

**Target:** One unified commercial system where signal detection, research, stakeholder analysis, outreach preparation, and outcome tracking are integrated and repeatable.

**Gap:** ~6–8 weeks of focused work on commercial workflow integration, operator experience, and automation bridges.
