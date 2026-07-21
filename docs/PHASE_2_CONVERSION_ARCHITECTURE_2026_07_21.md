# TKO Solutions Phase 2 Conversion Architecture

Date: 2026-07-21

## Executive assessment

The approved offer was focused, but the surrounding authority architecture still told the previous story. Proof, Transfer, Frameworks, broad industry/problem hubs, duplicate RachelOS pages, and old assessment pages created several competing explanations of what TKO sold. A qualified referral could reach credible material and still leave unsure whether TKO was an AI consultancy, a framework library, a software company, or a prior-authorization advisory firm.

Phase 2 makes the approved path explicit:

Referral or search → recognizable prior-authorization problem → bounded evidence → Prior Authorization Performance Diagnostic → qualified conversation.

## Before and after information architecture

### Before

- Homepage
- Services plus several retired assessment/service implementations
- Healthcare plus Industries plus Problems
- Selected Work plus Proof plus Transfer plus Frameworks
- Two overlapping RachelOS selected-work pages plus a RachelOS proof page
- Founder page functioning partly as a résumé and partly as a method library
- Insights linking to retired offers

### After

- Homepage: commercial position and first decision
- Healthcare: specialization, operating problem, and relevant healthcare credibility
- Selected Work: single evidence center
  - Prior Authorization Workflow Design Experience
  - Enterprise Program Recovery
  - Healthcare Interoperability Modernization
  - RachelOS: A Live Operating Environment
  - CRE Intelligence Model, demoted method-portability evidence
- Diagnostic: fixed-fee starting engagement
- 90-Day Sprint: bounded follow-on
- Founder: buyer diligence and referral language
- Insights: supporting objection and problem education, linked to the Diagnostic
- Contact: qualified intake and fit-call expectation

## Route-decision matrix

| Route or family | Decision | Reason | Canonical destination |
| --- | --- | --- | --- |
| `/selected-work` | Rewrite / Keep | Single center of evidence and claim boundaries | `/selected-work` |
| `/selected-work/from-crm-to-operating-system` | Rewrite / Keep | One bounded RachelOS case with inspectable mechanisms | Same route |
| `/selected-work/rachelos-delivery-model` | Merge / Redirect | Duplicated RachelOS narrative and over-weighted AI delivery | `/selected-work/from-crm-to-operating-system` |
| `/selected-work/prior-authorization-modernization` | Rewrite / Keep | Closest healthcare experience to the flagship problem | Same route |
| `/selected-work/enterprise-care-management-modernization` | Rewrite / Keep | Supports cross-functional workflow and governance credibility | Same route |
| `/selected-work/healthcare-interoperability-platform` | Rewrite / Keep | Supports regulated product, evidence, access, and control credibility | Same route |
| `/selected-work/cre-intelligence-model` | Rewrite / Demote | Narrow method-portability evidence; not equivalent to client proof | Same route, lower narrative weight |
| `/proof` | Merge / Redirect | Competed with Selected Work for the proof-hub role | `/selected-work` |
| `/proof/rachelos` | Merge / Redirect | Duplicated the retained RachelOS case | `/selected-work/from-crm-to-operating-system` |
| `/proof/transfer` | Merge / Redirect | Portability objection is now answered on Selected Work | `/selected-work#method-portability` |
| `/proof/prior-authorization` | Merge / Redirect | Healthcare method content belongs in the specialization page | `/healthcare` |
| `/proof/gold-card` | Merge / Redirect | Gold Card is not a separate offer or evidence category | `/healthcare` |
| `/proof/program-recovery` | Merge / Redirect | Best evidence match is the enterprise recovery case | `/selected-work/enterprise-care-management-modernization` |
| `/proof/executive-operating-system` | Merge / Redirect | Broad method no longer warrants an independent route | `/selected-work` |
| `/proof/ai-governance` | Merge / Redirect | Inspectable controls are shown in the RachelOS case | `/selected-work/from-crm-to-operating-system` |
| `/frameworks` | Merge / Redirect | Appeared to be a separate IP/product library | `/healthcare` |
| `/frameworks/prior-authorization` | Merge / Redirect | Core ideas integrated into healthcare and Diagnostic pages | `/healthcare` |
| `/frameworks/gold-card` | Merge / Redirect | No independent commercial job | `/healthcare` |
| `/frameworks/program-recovery` | Merge / Redirect | Evidence belongs with the enterprise recovery case | `/selected-work/enterprise-care-management-modernization` |
| `/frameworks/executive-operating-system` | Merge / Redirect | Broad method page fragments the referral story | `/selected-work` |
| `/frameworks/ai-governance` | Merge / Redirect | Control evidence belongs with RachelOS | `/selected-work/from-crm-to-operating-system` |
| Other `/frameworks/:slug` | Demote / Redirect | No retained route has a distinct buying-journey job | `/healthcare` |
| `/industries` | Merge / Redirect | Made healthcare appear to be one market among several | `/healthcare` |
| `/problems` | Merge / Redirect | Duplicated the homepage and healthcare problem narrative | `/healthcare` |
| `/case-studies/*` | Redirect | Legacy namespace; Selected Work remains canonical | Matching `/selected-work/*` route |
| Retired `/offers/*`, `/assessment/*`, and old service routes | Remove / Redirect | Preserve equity without compiling obsolete offers | Nearest current service route in one hop |

## Narrative inconsistencies corrected

- The deployed site still uses the former AI-assisted operations homepage, retired Diagnostic name, and old CTA. The repository is current; deployment remains an owner action.
- Proof, Selected Work, Transfer, and Frameworks all claimed to be the credibility center.
- RachelOS had three public narratives and could appear to be the product being sold.
- Healthcare was described as one proving ground within a cross-industry practice rather than TKO's primary commercial specialization.
- Prior-authorization evidence pages used outcome-shaped language without publishable baselines or post-change measures.
- The founder page mixed verified employment, internal proof, inferred method portability, and commercial offers without a buyer-friendly hierarchy.
- Insight articles and dead route implementations still linked to retired assessments and CTA language.
- The default social image embedded the former broad AI/workflow proposition.

## Revised referral narrative

Introduce Todd to a specialty medical group, MSO, or provider-side healthcare operator when prior-authorization delays, rework, avoidable denials, inconsistent payer handling, or reliance on a few experienced staff is forcing a technology, staffing, or operating decision. TKO's 15-business-day, $25,000 Diagnostic establishes the workflow baseline, root causes, target workflow, and a responsible 90-day improvement plan. Todd is credible because his record combines healthcare operations and interoperability with regulated operations, product ownership, transformation governance, technology, and hands-on implementation.

## Case-study classification map

| Case | Classification | Public evidence role |
| --- | --- | --- |
| Prior Authorization Workflow Design Experience | Client or enterprise experience | Relevant PA/UM workflow and control experience; no quantified outcome |
| Enterprise Program Recovery | Client or enterprise experience | Cross-functional healthcare governance and dependency experience |
| Healthcare Interoperability Modernization | Client or enterprise experience | Regulated product, FHIR, access, audit, and governance experience |
| RachelOS: A Live Operating Environment | Live operating environment | Direct founder-built implementation and control evidence; not healthcare proof |
| CRE Intelligence Model | Method-portability evidence | Narrow evidence that expert judgment can be structured; not client-result proof |

No retained public case is labeled “anonymized enterprise proof” because the available public material establishes employment-period experience and mechanisms, not independently verifiable TKO client outcomes.

## Prior-authorization evidence registry

| Claim or claim family | Classification | Public-use decision | Evidence or limitation |
| --- | --- | --- | --- |
| Diagnostic duration, scope, fee, and payment terms | Verified and publishable | Publish | Approved commercial source of truth |
| Sprint duration, range, prerequisites, and exclusions | Verified and publishable | Publish | Approved commercial source of truth |
| Todd's ELLKAY and Cognizant employment and role scope | Verified and publishable | Publish as employment experience | Verified career record; no endorsement implied |
| PA workflow tiers, exception handling, auditability, and human review experience | Directional or anecdotal | Publish as experience and mechanism | Healthcare experience library; no baseline or post-change measure |
| PA/UM work can depend on experienced staff for routing, escalation, and prioritization | Directional or anecdotal | Publish as recurring operating pattern | Healthcare experience registry; pattern, not prevalence or outcome metric |
| CMS-0057-F advances PA process and API requirements for impacted payers | Supported by a cited third-party source | Publish with CMS link | CMS final-rule page; industry context, not a TKO result |
| A Gold Card program reduced administrative burden in Todd's experience | Unsupported for public outcome use | Removed | Scope and quantified change are not known in the internal draft |
| TKO reduced denial rate, turnaround time, cost, staff effort, or headcount | Evidence not yet available | Do not publish | No attributable baseline and post-change client dataset |
| TKO improved approval or first-pass approval rates | Evidence not yet available | Do not publish | No attributable baseline and post-change client dataset |
| TKO created revenue, reimbursement, or savings impact | Evidence not yet available | Do not publish | No defensible attribution chain |
| AI or automation improved PA performance | Evidence not yet available | Do not publish as outcome | Automation remains a conditional implementation mechanism |
| Confidential client metrics | Verified but confidential | No current entries qualify | Do not use until verification, permission, and claim boundary are documented |

### PA measurement plan for future engagements

At scope, record the workflow boundary, specialty, payer segment, locations, teams, time window, data-quality caveats, and operational definitions. Baseline two to four measures from: touches per case, staff minutes per case, clean-submission rate, first-pass approval, avoidable denial rate, median turnaround time, aged exceptions, escalation cycle time, workflow adherence, and training/adoption. Preserve numerator, denominator, exclusions, source, owner, and extraction date. Re-measure during the controlled pilot using the same definitions. Record confounders such as payer-policy changes, staffing changes, seasonal volume, case mix, and concurrent vendor releases. Obtain written permission before publishing any client result; otherwise retain it as confidential evidence.

## Social-preview inventory

| Asset or usage | Before | After | Status |
| --- | --- | --- | --- |
| `public/og.png` | Embedded former “messy work / team and AI” proposition | Replaced with current PA performance card | Updated |
| `public/og-pa-v2.svg` | None | Editable 1200 × 630 source | Added |
| `public/og-pa-v2.png` | None | Versioned 1200 × 630 production asset | Added |
| Root Open Graph and Twitter/X metadata | Old asset path and dimensions | Versioned current asset, 1200 × 630 | Updated |
| Homepage, Services, Diagnostic, Sprint, Healthcare, Selected Work, Founder, Contact | Child metadata could drop the inherited image | Explicit current image reference | Updated |
| Retained case studies and insights | Dynamic metadata omitted an image | Explicit current image reference | Updated |

One restrained default card is used across commercial, evidence, founder, case, and insight pages. Page-specific artwork was intentionally deferred because it would add asset and cache complexity without changing the buyer decision; page-specific titles and descriptions still vary.

## Conversion-event specification

Primary conversion: `contact_form_submit_success`. CTA clicks and form starts are diagnostic funnel signals only.

| Event | Trigger | Allowed properties | Business question | Validation | Status |
| --- | --- | --- | --- | --- | --- |
| `service_view` | Retained service-detail route loads | pagePath, referencedService, referralSource, utmSource, deviceCategory | Which service pages attract qualified traffic? | Inspect `window.__tkoConversionEvents` and custom event | Abstraction live; provider unconnected |
| `case_study_view` | Retained case route loads | pagePath, caseStudy, referralSource, utmSource, deviceCategory | Which evidence creates buyer interest? | Same | Abstraction live; provider unconnected |
| `primary_cta_click` | Primary tracked link clicked | pagePath, CTA location/label, referencedService, source/device | Where do qualified journeys advance? | Click each primary CTA and inspect payload | Abstraction live; provider unconnected |
| `secondary_cta_click` | Secondary tracked link clicked | Same allow-list | Which supporting paths assist conversion? | Click each secondary CTA | Abstraction live; provider unconnected |
| `contact_form_start` | First focus inside intake form | pagePath, CTA location, source/device | How many visitors begin qualification? | Focus a visible field | Abstraction live; provider unconnected |
| `contact_form_submit_attempt` | Valid form submit event | pagePath, CTA location, source/device | How many started forms reach an attempt? | Submit a valid local test form | Abstraction live; provider unconnected |
| `contact_form_submit_success` | Contact page loads with submitted status | pagePath, source/device | How many successful qualified intakes occur? | Load success state after tested action | Abstraction live; provider unconnected |
| `contact_form_submit_error` | Client validation, server validation, or persistence failure state | pagePath, errorType, source/device | Where is the form failing? | Trigger required-field and server-state paths | Abstraction live; provider unconnected |
| `email_link_click` | Tracked mail link clicked | pagePath, CTA location/label, source/device | Where do buyers prefer direct email? | Inspect click payload without opening mail client | Abstraction live; provider unconnected |
| `linkedin_click` | Tracked LinkedIn link clicked | pagePath, CTA location/label, source/device | Which pages prompt external diligence? | Inspect click payload | Abstraction live; provider unconnected |
| `qualified_intake_indicator` | Form submit attempt | qualified boolean only | What share of attempts meets the minimum commercial/timing threshold? | Inspect boolean-only payload | Abstraction live; provider unconnected |

The abstraction emits a `tko:conversion` browser event, stores the last 50 non-sensitive events in memory for validation, and pushes the same allow-listed payload to `dataLayer` when a future provider supplies it. It never emits names, emails, organizations, free text, workflow descriptions, PHI, or arbitrary query parameters. Referrer is reduced to hostname; only `utm_source` is retained from the URL.

## Remaining owner decisions

1. Deploy the repository. The live domain remains on the former positioning until deployment.
2. Select an analytics destination if durable reporting is required. The event contract is ready for a lightweight provider or tag manager.
3. Decide whether verified client evidence can be obtained with publication permission after the first PA engagements.
4. Confirm whether the public contact email should remain a personal Gmail address or move to a TKO domain address.

## Intentionally deferred

- Page-specific OG artwork: the shared current card is more coherent and avoids low-value asset proliferation.
- Quantified PA outcome claims: no defensible attributable evidence is available.
- Broad historical content under `content/` and TIF source registries: retained as internal evidence/history where not publicly routed; changing those systems would exceed the public conversion-architecture objective.

## Codex implementation handoff

### Objective

Deploy and observe the consolidated buyer journey without reopening the approved positioning.

### Scope

Deployment, cache refresh, analytics-provider connection if selected, and post-launch funnel review.

### Files to modify

Only deployment configuration or the provider adapter attached to the existing conversion-event contract.

### Files to avoid

The approved homepage, Diagnostic scope, Sprint scope, case evidence boundaries, and PA evidence registry unless new verified evidence or an owner decision changes the source of truth.

### Implementation steps

1. Deploy the current repository build.
2. Confirm the live redirect manifest and social-card refresh.
3. Connect a provider to the existing `tko:conversion` or `dataLayer` contract if selected.
4. Review qualified-intake and funnel events after sufficient traffic.

### Test plan

Repeat the production crawl, metadata inspection, redirect checks, desktop/mobile QA, form success/error validation, and event payload privacy inspection.

### Acceptance criteria

- Live pages match the approved PA position.
- Retired evidence and framework routes resolve in one permanent hop.
- No event payload contains PII, PHI, free text, or arbitrary query parameters.
- The primary reported conversion is a successful qualified intake submission.

### Rollback strategy

Rollback the deployment artifact, not the content architecture route by route. If an analytics adapter misbehaves, remove the adapter while retaining the provider-neutral event contract.

### Regression risk

The main operational risks are redirect-order conflicts, social-cache lag, and an analytics adapter broadening event payloads beyond the allow-list.
