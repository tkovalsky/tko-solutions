# SidecarOS go-to-market playbook: what TKO must build, sign, and publish to onboard a first customer

Prepared October 18, 2026 in the `tko-site` repository. Status: Phase 1 implemented (see § 12); Phases 2–4 proposed and awaiting the decisions in § 11. Not legal, tax, or financial advice; every item tagged **[counsel]** needs a Florida real-estate attorney or a securities-compliance attorney before money moves.

Tags: **[V]** verified in a repository or a cited source · **[A]** assumption · **[R]** recommendation · **[D]** decision Todd must make · **[counsel]** professional review required.

Companion documents: the SidecarOS strategy and six-month plan (2026-10-18, pasted for this review; lives with the RachelOS repository), `rachel-realestate/docs/strategy/BUSINESS_PLAN_2026-10-17.md`, `docs/OPERATING-BOUNDARIES.md`, `docs/COMMERCIAL_OUTREACH_PLAYBOOK.md`, `docs/RELEASE_CHECKLIST.md`, `docs/implementation/TKO_RESEND_LEAD_WORKFLOW_2026_10_16.md`, and the new `docs/legal/` drafts.

---

## 1. Review of the SidecarOS plan

### 1.1 Verdict

The plan is sound where it is cautious and weak where it is silent. Its three strongest calls should stand:

1. **Offer B (done-with-you) leads; Offer A (Rachel-operated) is a capped, counsel-gated experiment.** Correct. Offer A is capacity-bound, runs into Chapter 475, and asks a local agent to hand their sphere to a competing local agent.
2. **Cell-per-client architecture around an extracted "brain" package; Rachel's production is never a tenant.** Correct, and consistent with the connector spike's conclusion.
3. **Pilot 1 with zero new infrastructure (offline FUB CLI, CSV import, hand-made Health Report).** Correct. The second paying client justifies the app, not the first.

The plan's own uncomfortable fact is the right one to lead with: Rachel's conversion is uninstrumented, so the proof the pitch needs does not exist yet. E1 (Rachel as customer zero) and B2 (tracking number, Gmail observation) must run before anyone is sold anything.

### 1.2 What the plan gets wrong or leaves out

| # | Gap | Why it matters | Where it is handled |
|---|---|---|---|
| 1 | **Three conflicting price lists are already public or drafted.** tko.solutions says a $5,000 30-day Managed Follow-Up pilot plus $1,500/month, and a $7,500–$15,000 build [V]. The BoundOS marketing site says SidecarOS $5,000–$7,500 setup plus $750–$1,500/month, Territory OS $15,000–$25,000 plus $1,500–$3,000/month, and a "Founding Partner" $7,500 setup plus $1,000/month [V]. The Sidecar plan proposes $250 assessment, $500 Core, $1,200 Managed, $2,000 Rachel Desk, setup $750/$1,500/$2,500. A prospect who reads two of these loses trust in all three. | § 3, decision D1 |
| 2 | **No contracting entity, insurance, or money path is named.** Who signs: TKO Solutions (what legal form?), who invoices, which bank, whether E&O and cyber insurance exist, W-9/1099 handling. | § 8.3 |
| 3 | **RIA is named in the brief but absent from the plan.** The plan is Florida-real-estate only. An RIA client brings SEC Regulation S-P service-provider oversight (compliance date for smaller advisers was June 3, 2026 [V]), books-and-records retention, and the Marketing Rule. These change the contract, the DPA, and what Sidecar may send. | § 7 |
| 4 | **Marketplace strategy is correct for FUB but says nothing about RIA CRMs.** Wealthbox is self-serve for personal tokens but requires OAuth and the partner program for anything distributed to mutual customers [V]. Redtail API keys are partner-level and requested through Redtail, not self-serve [V]. | § 6 |
| 5 | **No public legal surface exists on either website.** tko.solutions had a privacy notice and no terms; the BoundOS site has neither a privacy notice nor terms [V, checked October 18]. Any marketplace listing and any RIA vendor-oversight questionnaire asks for both. | § 9, Phase 1 |
| 6 | **Onboarding content has no home.** The plan describes a checklist, an authorization letter, and a Health Report but does not say where clients read them. | § 2, § 9 |
| 7 | **The plan's "Rachel's network first" acquisition motion ignores the two websites that already exist** and already rank for the problem. tko.solutions has 28 published guides and a working lead workflow with prospect receipts [V]; the BoundOS site has 31+ guides and an `/apply` form [V]. Neither is wired to the Sidecar offer as the plan defines it. | § 4, § 5 |
| 8 | **"Marketplace apps" is the right sequence (integrate → package → list) but the listing prerequisites are not enumerated.** Every marketplace asks for: OAuth (not API keys) for distributed apps, a privacy policy URL, terms URL, support contact, a logo, screenshots, and often a security questionnaire. | § 6.3 |
| 9 | **QA is engineering-only.** No acceptance test exists for the commercial surface (does the offer page, intake, receipt email, and operator brief still agree after a price change?). | § 10 |
| 10 | **Fair-housing and consent rules are correct for real estate but the RIA analogue (suitability/marketing content, pre-approval of templates by the CCO) is missing.** | § 7.3 |

### 1.3 Assumptions in the plan to hold loosely

- "Ten logged two-way conversations a month from dormant contacts" as the core promise has no prior other than Rachel's 4.8 percent nurture reply baseline. Keep it as the **measured outcome**, not a promise in copy. Site copy already forbids guaranteed outcomes; keep it that way.
- The base-case funnel (30 contacted → 10 conversations → 5 assessments → 2 paid per month) is unevidenced. The first three sales decide pricing; nothing else does.
- Capacity: the base case exceeds 20 hours/week by month 5. The cap on Managed clients is the lever. The BoundOS "Enterprise" tier should not be marketed until that cap is understood.

---

## 2. Which content lives where

Rule stated by Todd, October 18, 2026: **TKO Solutions owns RachelOS and BoundOS.** Marketing and onboarding content for the product belongs on the BoundOS marketing site; methodology, case studies, white papers, and proof of the pattern belong on tko.solutions.

Three properties, three jobs:

| Property | Repository | Job | Audience | Voice |
|---|---|---|---|---|
| **tko.solutions** | `tko-site` | The principal's practice: engagements, methodology, proof, guides, policies. Owner of the RachelOS/BoundOS story. | Healthcare sponsors; owners and managing partners who want Todd, not a product. | First person, Todd. |
| **BoundOS / SidecarOS marketing site** | `rachel-realestate-marketing` | The product front door: what Sidecar does, who it is for, pricing, demo, apply, onboarding, help. | Agents, team leads, RIA principals evaluating a service. | Product voice, "by TKO Solutions" byline. |
| **RachelOS** (racheldelray.com) | `rachel-realestate` | Rachel's business and the production system. Contributes the brain package and the proof data. | Rachel's buyers. | Rachel. |

### 2.1 Content map

| Content type | Lives on | Current state | Action |
|---|---|---|---|
| Methodology (System of Record vs System of Action, governed drafting, 9-link chain) | tko.solutions `/insights`, `/private-client-os` | Published [V] | Keep; add one Sidecar-specific guide ("What a dormant database is worth, measured against a holdout") when E1 data exists. |
| RachelOS case study and architecture explorer | tko.solutions `/selected-work/from-crm-to-operating-system` | Published [V] | Keep as the canonical proof. The BoundOS `/proof/rachelos` page should link here, not duplicate. |
| White papers / long-form (Database Health Report method, holdout measurement, consent provenance classes) | tko.solutions `/insights` with downloadable PDF later | Not written | Phase 3, after E1 produces numbers. |
| Product pages (what Sidecar is, tiers, FAQ) | BoundOS `/`, `/pricing`, `/how-this-works` | Published, but pricing conflicts with tko.solutions and the plan [V] | Reconcile under D1; BoundOS becomes the only place product prices are stated in detail; tko.solutions states one entry price and links out. |
| Apply / intake for the product | BoundOS `/apply` → `AgentLeadForm` → `/api/agent-lead` | Live [V] | Add the Sidecar qualification fields (CRM, contact count, consent evidence, who makes the calls). Decide whether leads land in TKO's `InboundLead` table or stay in the marketing repo (D4). |
| Onboarding content (checklist, authorization letter, "how to read your lineup", disposition vocabulary, FAQ) | BoundOS `/docs` (exists as a page [V]) | Page exists; content not written | Source from `docs/legal/CLIENT_ONBOARDING_CHECKLIST.md` in this repo; publish client-facing versions on BoundOS. |
| Legal: website terms and privacy | Both sites, each its own | tko.solutions: privacy existed, terms added in Phase 1. BoundOS: neither exists [V] | BoundOS needs both before any marketplace listing or RIA conversation (Phase 2). |
| Legal: service agreement, DPA, authorization letter, subprocessors | Signed per client; outlines in `tko-site/docs/legal/` | Drafted in Phase 1 (outlines) | Counsel review; publish the subprocessor list and a security summary on BoundOS `/docs`. |
| Security summary / vendor DDQ answers (for RIA oversight) | BoundOS `/docs/security` (public) + `docs/legal/SECURITY_AND_VENDOR_DDQ.md` (source) | Drafted in Phase 1 | Publish after the Sidecar app's actual controls exist; until then, the pilot-1 (offline CLI) version applies. |
| Demo and screenshots | BoundOS `/demo`, `/proof/*` | Exists [V] | Keep. Every screenshot cleared through `.private/proof-quarantine` per the release checklist. |
| Markets / territory pages | BoundOS `/markets/*` | Exists [V] | Out of scope for Sidecar Offer B; these belong to the Territory OS tier, which D1 may pause. |
| Founder story | tko.solutions `/founder` | Published [V] | BoundOS `/about` links here. |
| llms.txt, robots, security.txt | Each site | tko.solutions: added in Phase 1. BoundOS: none | Replicate on BoundOS in Phase 2. |

### 2.2 Cross-linking rules

- tko.solutions mentions SidecarOS once per relevant page (services, Private Client OS, Managed Follow-Up) and links to the BoundOS site for product detail. It does not restate tier pricing.
- The BoundOS site carries "by TKO Solutions" in the header or footer and links to tko.solutions for the founder, the methodology, and the case study.
- Claim guardrails are identical on both sites: RachelOS is an independent single-operator proof; no guaranteed outcomes; human review of every AI-assisted message. Copy the guardrail paragraph from `llms.txt` into the BoundOS footer or `/docs`.

---

## 3. Pricing reconciliation (decision D1)

Three stories exist today:

| Surface | Entry offer | Recurring | Larger scope |
|---|---|---|---|
| tko.solutions [V] | Managed Follow-Up pilot: $5,000 / 30 days | $1,500/month (4 hours support) | Build $7,500–$15,000; Operate & Improve $1,500–$3,000/month; custom from $15,000 |
| BoundOS marketing [V] | SidecarOS: $5,000–$7,500 setup; "Founding Partner" $7,500 setup | $750–$1,500/month; Founding Partner $1,000/month | Territory OS $15,000–$25,000 + $1,500–$3,000/month; Enterprise $30,000–$75,000+ + $3,500–$7,500/month |
| Sidecar plan (draft) | Assessment $250 credited; setup $750 / $1,500 / $2,500 | Core $500; Managed $1,200; Rachel Desk $2,000 | None |

**[R] Recommended resolution.** Keep one ladder, state it in one registry, and render it on both sites from that registry:

| Step | Price | Maps to |
|---|---|---|
| Database Health Assessment | $500 one-time, credited to setup within 60 days | Plan's $250 assessment, raised because the Health Report is the sales close and $250 signals a lead magnet |
| Sidecar Core | $1,500 setup + $500/month | Plan's Core; BoundOS's low end |
| Sidecar Managed | $2,500 setup + $1,200/month | Plan's Managed; replaces the tko.solutions $5,000 pilot (same first-month economics: $2,500 + $1,200 ≈ $3,700 vs $5,000, but the recurring line is the point) |
| Owned Demand & Governed AI Engine | $7,500–$15,000 build + optional $1,500–$3,000/month | Unchanged on tko.solutions; this is the "we also want content and inquiry capture" path; BoundOS Territory OS collapses into it |
| Rachel Desk | $2,000/month, broker-to-broker referral agreement separate | Offer A; not published until counsel clears § 2.3 of the plan |

Why this and not the others: the $5,000 pilot on tko.solutions is a project price for a subscription product, which is the exact mistake the plan warns about ("recovery is the onboarding, the engine is the subscription"). The BoundOS tiers are aspirational and unsupported by capacity. The plan's numbers are the only ones built from delivery hours.

Where it is implemented: `src/lib/offers.ts` and `/products/ambient-crm` in this repo; `src/lib/boundos/content.ts` in the marketing repo. Both are **claim boundaries** under `docs/OPERATING-BOUNDARIES.md`; nothing was changed in Phase 1. Decision D1 unblocks Phase 2.

---

## 4. The playbook: first customer, end to end

Owner is Todd unless stated. Artifacts in **bold** exist or were drafted in this session; artifacts in *italics* are to be produced.

| Stage | What happens | Artifact | Where it lives |
|---|---|---|---|
| 0. Prove it on Rachel (E1, month 1) | Dormant-segment definition, 10–20% holdout, approved copy, 30-day report | *E1 report*; *first pseudonymized numbers for the deck* | RachelOS repo |
| 1. Attract | Guides and the case study on tko.solutions; product pages on BoundOS; Rachel's network; one association talk | **28 guides**, **case study**, **llms.txt**; *one Sidecar-specific guide* | tko.solutions, BoundOS |
| 2. Qualify | Inquiry arrives via `/contact?offer=managed-follow-up` or BoundOS `/apply`; prospect gets a receipt; Todd gets the brief; Today shows it | **Resend lead workflow** (uncommitted; passes 487 tests) | tko-site |
| 3. Discovery call | 30 minutes: CRM, contact count, consent evidence, who makes calls, opt-out source of truth, holdout explained | *Discovery script with the six qualification questions* (§ 4.1) | `docs/COMMERCIAL_OUTREACH_PLAYBOOK.md` (add section) |
| 4. Assessment | Authorization letter signed; CSV or FUB key supplied through a form, never email; Health Report delivered | **Authorization letter draft**; *Health Report template* | `docs/legal/`, RachelOS CLI |
| 5. Contract | Service agreement + DPA (+ RIA addendum if applicable) signed; invoice for setup | **Service agreement outline**, **DPA outline**, **subprocessor list** [counsel] | `docs/legal/` |
| 6. Onboard | Checklist run; segments and copy approved; copy loaded into the client's CRM; first lineup day 10 | **Onboarding checklist** | `docs/legal/CLIENT_ONBOARDING_CHECKLIST.md` → BoundOS `/docs` |
| 7. Operate | Daily lineup; one-word dispositions; weekly segment refresh; reply triage (Managed) | Plan's M4–M5 | RachelOS CLI, later Sidecar app |
| 8. Report and renew | Day-30 report vs holdout; renewal conversation at day 30, not day 90 | *Monthly report template* | Plan's M6 |
| 9. Exit | 30 days' notice; CSV export bundle; deletion confirmed in writing | **Export/deletion terms in DPA outline**; *runbook* | `docs/legal/`, plan's B14 |

### 4.1 Six qualification questions (add to the discovery script)

1. Which CRM, and can you create an API key in it yourself today? (FUB yes; Wealthbox yes for personal use; Redtail no; KW Command no.)
2. How many contacts, and how many have a dated relationship you can point to (closing date, inquiry date, meeting)?
3. Where do opt-outs live today, and who maintains them?
4. Who will make the calls and log a one-word disposition? (If nobody, the product is a report, not a subscription.)
5. Will you accept a 10–20 percent holdout you do not contact through Sidecar for 90 days?
6. (RIA only) Who is your CCO, which archiving vendor captures your email, and has your Reg S-P vendor-oversight procedure been written?

A "no" on 1 is a CSV client. A "no" on 4 or 5 is a disqualification for Core and Managed.

---

## 5. What needs to be built, by repository

### 5.1 tko-site (this repository)

| Phase | Item | Files | Status |
|---|---|---|---|
| 1 | `robots.ts`: disallow `/api`, name answer-engine agents, point at `/llms.txt` | `src/app/robots.ts` | Done |
| 1 | `/llms.txt` generated from the offer registry, case studies, published guides, with claim guardrails | `src/app/llms.txt/route.ts` | Done |
| 1 | `/terms` website terms; footer and sitemap links; privacy notice updated (providers named, receipt email disclosed, terms linked) | `src/app/terms/page.tsx`, `src/app/privacy/page.tsx`, `src/components/site/footer.tsx`, `src/app/sitemap.ts` | Done |
| 1 | `security.txt` | `public/.well-known/security.txt` | Done |
| 1 | QA: discovery test suite; verifier seeds for robots, sitemap, llms.txt, security.txt, terms | `src/app/discovery.test.ts`, `scripts/verify-public-site.mjs` | Done |
| 1 | Legal and onboarding drafts | `docs/legal/*` | Done (outlines; counsel review pending) |
| 2 | Pricing ladder in `offers.ts`; `/products/ambient-crm` re-rendered from registry; "SidecarOS by TKO" cross-link to BoundOS | `src/lib/offers.ts`, `src/app/products/ambient-crm/page.tsx`, `src/lib/offers.test.ts` | Blocked on D1 |
| 2 | Intake: add CRM, contact count, consent-evidence, and caller fields to the managed-follow-up variant of the form; carry them into the operator brief | `src/components/site/diagnostic-form.tsx`, `src/app/contact/actions.ts`, `src/lib/leads/email-templates.ts` + tests | Ready after D1 |
| 2 | Stage and ship the Resend lead workflow (separate commit, its own package doc) | per `TKO_RESEND_LEAD_WORKFLOW_2026_10_16.md` | Ready; production env and DNS steps are Todd's |
| 3 | One Sidecar guide and one white paper after E1 numbers exist | `src/content/insights/*.md` | After E1 |
| 3 | CI: run `verify-public-site.mjs` against the built site; Playwright smoke for contact, terms, llms.txt | `.github/workflows/ci.yml`, `playwright.config.ts`, `e2e/` | Proposed |

### 5.2 rachel-realestate-marketing (BoundOS site)

| Phase | Item |
|---|---|
| 2 | Privacy notice and website terms (none exist). Reuse the tko.solutions pages' structure; name the same providers plus whatever `/api/agent-lead` stores. |
| 2 | `robots.ts`, `llms.txt`, `security.txt`, sitemap check. |
| 2 | Pricing page rendered from the single ladder (D1). Retire or hide Territory OS and Enterprise tiers until capacity exists. |
| 2 | `/apply` form: add the six qualification fields; decide the lead destination (D4). |
| 2 | `/docs`: publish the onboarding checklist, the disposition vocabulary, "how to read your lineup", the subprocessor list, and the security summary. |
| 2 | Footer: "by TKO Solutions" with links to the founder page and case study on tko.solutions; the guardrail paragraph. |
| 3 | Marketplace listing assets: 512px logo, 3–5 screenshots from cleared captures, 100-word description, support email, privacy and terms URLs. |

### 5.3 rachel-realestate (RachelOS)

Per the plan's backlog B0–B18; nothing added here. The two items the websites depend on are **B2** (conversion instrumentation, so there are numbers to publish) and **B3/B4** (CSV import and the Health Report, so stage 4 of the playbook has a deliverable).

---

## 6. Marketplaces and integrations

Sequence (from the plan, confirmed): **integrate → package → list.** A listing before five clients on that CRM invites support load without revenue.

### 6.1 Real estate

| CRM | Access | Listing path | When |
|---|---|---|---|
| Follow Up Boss | Agent's own API key today; register for `X-System` headers (self-serve) [V] | Embedded app created in Admin → Integrations with name, website, category, bio, description, HTTPS App URL; submit for review once tested against "account not found", "person not found", "unauthorized" states [V] | Pilot now; listing at ≥5 FUB clients |
| Lofty | Developer portal, OAuth or key | Partner marketplace | On demand only |
| Real Geeks, Sierra, BoldTrail, Wise Agent, KW Command, Compass | Per the plan's table: registration-gated, support-gated, or closed | CSV import path | Do not target |

### 6.2 RIA / wealth

| CRM | Access [V] | Listing path | Notes |
|---|---|---|---|
| **Wealthbox** | Personal access token from Settings → API Access (not on trials; support must enable). Partners distributing to mutual customers must use OAuth 2.0 (authorization code + refresh), per-user scope. Register by email for client ID/secret. | Wealthbox Integration Partner Program; partners can appear in the Partner Marketplace and the "Send to" menu | **First RIA integration.** A pilot RIA can create a personal token today for a done-with-you engagement; OAuth is needed before any self-serve or listed app. |
| **Redtail (Orion)** | API key is partner-level, requested through Redtail's partner support with your username and stated integration purpose; expect a developer agreement [V]. Authentication scheme is inconsistently described by third parties; confirm in Redtail's own docs. | Redtail integration partners list; Orion developer portal requires credentials, an intro call with the integrations team, and an NDA [V] | **Second.** Start the partner request in month 2 because the lead time is weeks, not days. Until then, Redtail clients are CSV clients. |
| Salesforce Financial Services Cloud, Practifi, XLR8 | Enterprise | AppExchange (security review, annual fee) | Not in six months. |

### 6.3 What every listing asks for (prepare once)

- OAuth, not API keys, for anything distributed to other people's accounts.
- Public privacy policy URL and terms URL on the product's own domain (BoundOS site, Phase 2).
- Support email and response expectation; a status or health page.
- Logo, screenshots (cleared through quarantine), 100-word and 300-word descriptions, category.
- A security summary or questionnaire: data stored, encryption at rest and in transit, access control, incident notification window, subprocessors, deletion. `docs/legal/SECURITY_AND_VENDOR_DDQ.md` is the source.
- For FUB specifically: handling of the embedded-app context states; HTTPS App URL [V].
- For Wealthbox: OAuth client registration and co-marketing review [V].

### 6.4 Where "marketplace" is a sales channel and where it is not

A marketplace listing is discovery for self-serve software. Sidecar in months 1–6 is done-with-you. The listing's value is credibility ("they are an approved Wealthbox partner") and the embedded lineup in the CRM record, not lead flow. Budget the partner-program paperwork, not a launch.

---

## 7. RIA-specific requirements [counsel]

These apply the moment the client is an SEC- or state-registered investment adviser. They change the contract, the DPA, and the service.

### 7.1 Regulation S-P (safeguards and vendor oversight) [V]

- Amended Reg S-P required smaller advisers (under $1.5 billion AUM) to comply by **June 3, 2026**; larger entities by December 3, 2025. The deadline has passed; every RIA prospect is now obliged to oversee service providers that touch customer information.
- The adviser's written policies must cover due diligence in selecting providers, ongoing monitoring, and ensuring providers notify the adviser within **72 hours** of becoming aware of a breach resulting in unauthorized access to customer information. The practical mechanism is the contract: a vendor agreement without the 72-hour clause puts the adviser out of compliance.
- Advisers must notify affected individuals within 30 days of discovering unauthorized access to sensitive customer information.
- SEC examination staff has flagged Reg S-P as a fiscal-2026 priority.

**Consequence for Sidecar:** the DPA must contain the 72-hour notification clause (drafted), name every subprocessor (Neon, Vercel, Resend, QStash, the AI provider), describe encryption and access logging, and grant the adviser audit/questionnaire rights. The RIA will send a vendor due-diligence questionnaire; `docs/legal/SECURITY_AND_VENDOR_DDQ.md` is the prepared answer set. Sidecar's contact data is "customer information" under GLBA; treat it as such regardless of how the agent-side service treats real-estate contacts.

### 7.2 Books and records and communications archiving [A, confirm with counsel]

Advisers must retain certain written communications. Any client-facing email Sidecar prepares is sent **by the adviser's own systems** (their CRM or email), which their archiving vendor already captures. Sidecar must not introduce an unarchived outbound channel. The lineup email to the adviser is an internal communication; confirm with the CCO whether they want it archived anyway (many do). Design rule: Sidecar v1 for RIAs sends nothing to end clients; it only prepares.

### 7.3 Marketing Rule (Advisers Act Rule 206(4)-1) [A, confirm with counsel]

- Nurture copy that discusses performance, services, or "we helped clients like you" is an advertisement. Templates must be **pre-approved by the adviser's CCO** and versioned; Sidecar's approval record per copy version (plan's M3) is the evidence.
- If Sidecar ever markets with an adviser's testimonial or endorsement, the rule's disclosure and compensation provisions apply to that marketing.

### 7.4 Suitability, fair treatment, and segmentation

No segmentation on protected characteristics or inferred financial condition beyond what the adviser's records state. Mirror the real-estate fair-housing rule: typed facts only, no inference from names, origin, or age.

### 7.5 Operational differences from real estate

| Topic | Real estate | RIA |
|---|---|---|
| Who may hold substantive conversations | Licensee (agent, or Rachel) | The adviser's IARs; Todd never discusses investments |
| Template approval | Agent approves | CCO approves and records |
| Data classification | Personal information under FIPA | GLBA customer information + FIPA |
| Breach notice to client | FIPA: 10 days (third-party agent) | Reg S-P: 72 hours; FIPA: 10 days (shorter governs) |
| Outbound from Sidecar | None in v1 | None, and likely never without the archiving vendor in the loop |
| Marketplace | FUB embedded app | Wealthbox OAuth partner; Redtail partner key |

---

## 8. Real-estate legal and business requirements

### 8.1 From the plan (verified there; summarized)

Referral compensation cannot flow to Todd's unlicensed entity (Fla. Stat. § 475.25(1)(h), § 475.42(1)(d)); unlicensed-assistant limits; team advertising (Rule 61J2-10.026); Florida Telephone Solicitation Act (no SMS in v1); CAN-SPAM (client's postal address and unsubscribe on every send; both parties liable); FIPA § 501.171 (10-day third-party-agent notice); fair housing in segmentation. All drafted into the DPA and service agreement outlines.

### 8.2 Still open [counsel]

- Is a flat software fee to Todd's entity, from an agent whose contacts Rachel may later be referred, defensible as payment for software and administration independent of referrals? This gates Offer A.
- Does Rachel's independent-contractor and team agreement permit "Rachel's Desk"?
- Does the client's brokerage permit the export (the authorization letter asks the agent to warrant it; the brokerage may have its own view).

### 8.3 Business prerequisites nobody has listed [D]

| Item | Status | Action |
|---|---|---|
| Contracting entity for Sidecar (TKO Solutions LLC? the same entity as the consulting practice?) | Unknown from the repository | D2: name it; it goes on the agreement, the website terms, and every invoice |
| Errors & omissions and cyber liability insurance | Unknown | Quote before client 1 signs; RIAs will ask for a certificate |
| Payment path | Plan says manual invoices for clients 1–3, Stripe from client 4 | Set up Stripe early anyway for the $500 assessment; manual invoice for setup/MRR is fine |
| Sales tax | Florida does not tax most professional services; SaaS treatment varies | Ask the accountant once the ladder is set |
| 1099/W-9 | Any referral partner or subcontractor | Standard |
| Trademark | "SidecarOS" and "BoundOS" appear on the marketing site; neither is checked | Knockout search before printing on contracts |

---

## 9. Legal and onboarding documents: inventory

| Document | Purpose | Status | Location |
|---|---|---|---|
| Website terms (tko.solutions) | Governs site use; states that engagements are separately agreed | Published in Phase 1; counsel skim recommended | `/terms` |
| Privacy notice (tko.solutions) | Inquiry data handling; providers named; receipt email disclosed | Updated in Phase 1 | `/privacy` |
| Website terms + privacy (BoundOS) | Prerequisite for marketplaces and RIAs | Missing | Phase 2, marketing repo |
| Service agreement | Scope, fees, responsibilities, exclusions, cancellation, export, IP, liability | Outline drafted [counsel] | `docs/legal/SERVICE_AGREEMENT_OUTLINE.md` |
| Data processing terms | Roles, data classes, security, subprocessors, 10-day FIPA and 72-hour Reg S-P notices, CAN-SPAM, deletion, audit | Outline drafted [counsel] | `docs/legal/DATA_PROCESSING_TERMS_OUTLINE.md` |
| Data authorization letter | Client warrants ownership/right to export and names opt-out source of truth | Draft [counsel] | `docs/legal/DATA_AUTHORIZATION_LETTER.md` |
| Subprocessor list | Named providers, purpose, region | Draft | `docs/legal/SUBPROCESSORS.md` |
| Client onboarding checklist | Weeks 0–4 for real estate and RIA | Draft | `docs/legal/CLIENT_ONBOARDING_CHECKLIST.md` |
| Security summary and vendor DDQ answers | For RIA oversight and marketplace reviews | Draft, pilot-1 scope | `docs/legal/SECURITY_AND_VENDOR_DDQ.md` |
| Broker-to-broker referral agreement (Offer A) | Rachel's broker ↔ originating broker | Not drafted; counsel-authored | After § 8.2 |
| Health Report template | The assessment deliverable | Not drafted | RachelOS repo (plan B4) |
| Monthly outcome report template | Renewal evidence | Not drafted | Plan M6 |
| Export and deletion runbook | Operational proof of the DPA promises | Not drafted | Plan B14 |

---

## 10. QA plan

### 10.1 What exists [V]

- 487 unit and component tests across 80 files; ESLint; production build with type checking; all green on the current working tree including the uncommitted Resend workflow.
- CI (`.github/workflows/ci.yml`) runs `prisma validate`, test, lint, build on push and PR.
- `scripts/verify-public-site.mjs` crawls the built site: status codes, internal links, media, fragment targets, offer-specific intake URLs, and asserts rejected captures stay 404. It is run by hand per the release checklist, not in CI.
- `npm run guides:validate` enforces guide frontmatter and the editorial gate.

### 10.2 Added in Phase 1

- `src/app/discovery.test.ts`: robots disallows `/tif` and `/api` for every agent and names answer engines; sitemap includes policy pages and every offer, excludes private routes, and every static route has a page on disk; `llms.txt` follows the llmstxt.org shape, names every offer with its registry commercial terms, links every published guide, carries the claim guardrails, and serves cacheable UTF-8 text; `security.txt` has an unexpired `Expires`.
- Verifier seeds now include `/terms`, `/robots.txt`, `/sitemap.xml`, `/llms.txt`, and `/.well-known/security.txt`.

### 10.3 Proposed (Phase 3)

| Check | How | Why |
|---|---|---|
| Commercial consistency | A test that renders `/products/ambient-crm`, `/services/*`, the contact page, and the operator brief and asserts every price string comes from `offers.ts` | Three price lists is how trust was lost; one registry is the fix, and the test keeps it that way |
| Verifier in CI | `npm run build && npm run start & node scripts/verify-public-site.mjs` as a CI job with a placeholder `DATABASE_URL` | The verifier is the only check that exercises redirects, media, and 404 guarantees |
| Browser smoke | Playwright (already a dev dependency) for: contact form validation path, `/terms` renders, `/llms.txt` is text, mobile nav | Catches the client-side regressions unit tests miss |
| Accessibility | `@axe-core/playwright` on the top ten pages | RIAs and health plans ask |
| Lighthouse budget | Performance and SEO ≥ 90 on home, services, one guide | Discovery depends on it |
| Email rendering | Snapshot tests of the receipt and operator brief HTML already exist; add a Litmus-style manual check before first real send | Receipts are now customer-facing |

### 10.4 Validation, rollback, regression risk for Phase 1

- **Validation:** `npm test`, `npm run lint`, `npm run build`; then `node scripts/verify-public-site.mjs http://localhost:3000` against the built site; browser check of `/terms`, `/llms.txt`, `/robots.txt`, footer link.
- **Rollback:** revert the Phase 1 files listed in § 5.1; no schema, data, or environment change is involved. `/terms` removal would require a redirect or 404 acceptance; `/llms.txt` and `security.txt` removal is harmless.
- **Regression risk:** low. Robots now also disallows `/api` (previously crawlable but useless). The footer gains one link. The privacy notice gains a paragraph. No offer, price, intake, or email behavior changed.

---

## 11. Decisions Todd must make (in order)

| # | Decision | Default if undecided | Unblocks |
|---|---|---|---|
| D1 | Adopt the single pricing ladder in § 3 (or amend it) | Nothing changes; three stories remain public | Phase 2 on both sites |
| D2 | Name the contracting entity, confirm insurance, choose the payment path | Cannot sign client 1 | Service agreement, terms |
| D3 | Engage counsel for § 2.3 of the plan and § 7 here; confirm whether RIA is in the first six months at all | Offer A stays an idea; RIA stays CSV-only and informal | Offer A; RIA onboarding |
| D4 | Where product leads land: TKO's `InboundLead` table via the existing API (one lead store, one Today view) or the marketing repo's `/api/agent-lead` | Two lead stores | BoundOS `/apply` rework |
| D5 | Scope of the BoundOS site: Sidecar-only (hide Territory/Enterprise) or keep the three-tier story | Three-tier story persists and conflicts | Marketing-site Phase 2 |
| D6 | Whether to pursue the Wealthbox partner program and the Redtail partner key now (weeks of lead time) or after the first RIA conversation | After | RIA marketplace path |
| D7 | Stage and deploy the Resend lead workflow (own commit) before or after Phase 1 here | Both sit uncommitted together | Release hygiene |
| D8 | Keep one Vercel team and one Neon org with separate projects (recommended), or split TKO/BoundOS onto their own accounts | Stays as is | See `docs/implementation/INFRASTRUCTURE_CONFIGURATION_ACTION_PLAN_2026_10_18.md` § 2 |

**Decision record (October 20, 2026, Todd):**

| # | Decision |
|---|---|
| D1 | Adopt the § 3 ladder as written. |
| D2 | Contracting entity: TKO Solutions LLC. No E&O or cyber insurance yet; quotes remain a pre-signing item. Payment path not yet chosen. |
| D4 | BoundOS `/apply` posts to tko.solutions `/api/contact` with inquiry type `BOUNDOS_APPLY`; one `InboundLead` store, one Today view. |
| D5 | BoundOS is Sidecar-only; Territory OS and Enterprise tiers are hidden. |
| D7 | Moot: Phase 1 (`3aef9b2`) and the Resend workflow (`648f969`) were committed and deployed before this date. |
| D3, D6, D8 | Open. |

**Configuration gap found during this review [V]:** the `tko-solutions` production project has no Resend variables, so prospect receipts and operator briefs are skipped in production today; leads are stored and visible only in `/tif/oi/today`. Stale `ANTHROPIC_API_KEY` and `AI_*` variables are set but read by no code. Both are Phase A of the configuration plan.

---

## 12. Six-month roadmap for the websites (aligned to the plan's months)

| Month | tko.solutions | BoundOS site | External |
|---|---|---|---|
| 1 (Nov) | Ship Phase 1 (done in tree) and the Resend workflow; D1–D3 taken; add discovery-script section to the outreach playbook | Privacy, terms, robots, llms.txt, security.txt; footer "by TKO Solutions" | Attorney engaged; E&O/cyber quotes; FUB `X-System` registration |
| 2 (Dec) | Pricing ladder in `offers.ts`; intake qualification fields; operator brief carries them | Pricing page from the ladder; `/apply` fields; `/docs` onboarding content live | Wealthbox partner inquiry and Redtail partner key request sent (D6) |
| 3 (Jan) | First Sidecar guide from E1 numbers | Security summary published; subprocessor list | First client signed on the drafted agreements |
| 4 (Feb) | CI verifier + Playwright smoke; commercial-consistency test | Marketplace listing assets prepared | Stripe live |
| 5 (Mar) | White paper: holdout-measured database recovery | FUB embedded app listing if ≥4–5 FUB clients | Wealthbox OAuth client registered if an RIA is live |
| 6 (Apr) | Case study #2 (first external client, with permission) | Testimonial only with written consent and Marketing-Rule review if RIA | Decide 2027 |

---

## 13. Phase 1 implementation record (October 18, 2026)

**Objective.** Give tko.solutions the discovery, legal, and QA surface the Sidecar offer and any marketplace listing will require, without touching prices, intake behavior, or email behavior.

**Scope.** Nine source/config files (five modified, four new), one new documentation directory with seven files, one strategy document. No schema, migration, environment, or dependency change. No change to scoring, queue ranking, lifecycle, or relationship derivation.

**Files modified.** `src/app/robots.ts`, `src/app/sitemap.ts`, `src/app/privacy/page.tsx`, `src/components/site/footer.tsx`, `scripts/verify-public-site.mjs`.

**Files added.** `src/lib/llms.ts`, `src/app/llms.txt/route.ts`, `src/app/terms/page.tsx`, `src/app/discovery.test.ts`, `public/.well-known/security.txt`, `docs/legal/*` (7), `docs/implementation/INFRASTRUCTURE_CONFIGURATION_ACTION_PLAN_2026_10_18.md`, this document.

**Files avoided.** `src/lib/offers.ts`, `/products/ambient-crm`, intake form and actions, lead templates, Prisma schema, anything under `src/lib/opportunity-intelligence`, the RachelOS and marketing repositories.

**Acceptance.** Tests, lint, and build pass; the verifier reports no failures against the built site; `/terms` renders with footer link; `/llms.txt` returns text/plain with every offer and published guide; `/robots.txt` disallows `/tif` and `/api` and lists the sitemap.
