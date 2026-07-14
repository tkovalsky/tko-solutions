# TKO Site Executive Messaging, SEO & Conversion Audit

**Audit date:** July 13, 2026  
**Scope:** Production site, local production build, all public routes, metadata, schema, sitemap, navigation, contact flow, mobile/desktop rendering, public content sources, and internally linked diagram pages. The authenticated `/tif` application and API routes are intentionally excluded.

## 1. Executive Summary

TKO has a valuable core: disciplined thinking, a credible bias toward operational evidence, unusually honest claim boundaries, clear healthcare workflow knowledge, and direct proof that Todd can build a working system. Those assets differentiate TKO from generic AI consultancies.

The current site does not yet turn those assets into an enterprise buying case. It behaves like three overlapping sites:

1. a broad operating-performance consultancy;
2. a legacy assessment/diagnostic/build/fractional services catalog; and
3. a new offers/proof/founder authority system.

Executives must reconstruct what TKO sells, which page is authoritative, whether Todd advises or implements, and how RachelOS relates to a regulated enterprise engagement. Public labels such as “Primary search query,” “downstream conversion offer,” “healthcare assessment wedge,” and downloadable “placeholder” text make internal content and funnel mechanics visible. That is a launch-blocking trust problem.

The site presently positions TKO most strongly as a careful operating-diagnostic specialist with a founder-built real-estate system. The stated growth goal requires a broader and clearer position: an executive partner who can define strategy, redesign an operating model, shape a product, design governed AI-enabled systems, and remain accountable through implementation.

### Scorecard

| Dimension | Score | Assessment |
|---|---:|---|
| Messaging | 55/100 | Intelligent and restrained, but category language shifts and the scope feels narrower than the intended offer. |
| SEO | 48/100 | Good canonical/schema baseline; commercial cannibalization, thin indexation, weak query ownership, and sitemap gaps suppress growth. |
| Authority | 58/100 | Strong evidence discipline and direct build proof; insufficient role, scale, chronology, and enterprise outcome evidence. |
| Readability | 68/100 | Good visual hierarchy and short paragraphs; too many concepts, pages, labels, caveats, and paths for a 30-second scan. |
| Conversion | 38/100 | Conflicting CTAs, duplicative offers, a high-friction form, and unanswered delivery/procurement questions. |
| Differentiation | 62/100 | Real differentiation exists—senior continuity, operating-model rigor, human-controlled AI—but is not stated simply enough. |
| Enterprise credibility | 45/100 | Healthcare experience is relevant, but anonymized summaries and RachelOS alone do not support a $25K–$250K decision. |

### Recommended Positioning

**Category:** Executive strategy through implementation for complex operations.

**Core promise:**

> TKO helps healthcare and enterprise leaders turn complex operating problems into working strategies, operating models, products, and AI-enabled systems—from executive decision through production implementation.

**Differentiation:**

> Senior operating judgment and hands-on delivery stay connected. TKO defines the strategy, redesigns the work, shapes the product and system, and remains accountable through implementation—without the handoff between a strategy team and a delivery team.

### Recommended Homepage Above the Fold

**Eyebrow:** Strategy, operating models, and AI-enabled execution

**H1:** Turn complex operating problems into systems that work.

**Subhead:** TKO helps healthcare and enterprise leaders define strategy, redesign operating models, build AI-enabled workflows, and carry critical initiatives through implementation—from decision to production.

**Primary CTA:** Discuss an active initiative

**Secondary CTA:** Review selected work

**Proof strip:** Healthcare transformation · Enterprise modernization · Founder-built production systems · Human-governed AI

### Why TKO, in Buyer Language

| Executive concern | TKO answer |
|---|---|
| Will strategy survive the handoff? | The same senior operator stays accountable through implementation. |
| Will AI be forced into the answer? | AI is used only where the workflow, evidence, economics, and authority support it. |
| Can this work in a regulated enterprise? | Decision rights, auditability, source authority, exceptions, and human approval are designed into the operating model. |
| Will this become open-ended consulting? | Work begins with a bounded decision, scope, timeline, and executive output. |
| Can TKO actually build? | TKO must state precisely what Todd builds directly, where specialists participate, and who owns architecture, integration, QA, deployment, adoption, and support. |

## 2. P0 Issues — Must Fix Before Launch

### P0.1 Consolidate the Commercial Architecture

Three clusters compete for the same buyer intent:

- `/assessment`, `/services/recovery-assessment`, and `/offers/executive-recovery`;
- `/assessment/ai-delivery` and `/offers/executive-ai`;
- `/services/prior-authorization-assessment`, `/offers/prior-authorization`, and `/offers/healthcare-operating`.

Choose one commercial namespace. Recommended: `/services`. Redirect or noindex duplicates, and give every surviving page one buyer, one problem, one primary query, one scope, and one CTA.

### P0.2 Remove Internal Strategy, SEO, and Production Language

Remove buyer-visible labels including:

- Executive Discoverability
- Commercial offer / bounded assessment
- Primary search query
- healthcare assessment wedge
- downstream conversion offer
- low-friction entry point
- post-diagnostic or post-build retainer
- publication status / published after human review
- proposal/downloadable asset placeholders

This language makes the site feel unfinished and exposes internal funnel mechanics.

### P0.3 Make the CTA Promise Truthful and Consistent

The header says “Book an operating performance conversation” but routes to `/offers`. Other CTAs say “schedule,” “book,” “start,” “discuss,” and “assessment.” If no calendar follows, “book” and “schedule” are inaccurate.

Use:

- Primary: **Discuss an active initiative**
- Secondary: **Review selected work**
- Form submit: **Request a conversation**

At the observed 1280-pixel desktop viewport, the long header CTA clips. On mobile, the primary navigation becomes a long horizontal strip. Shorter CTA copy and a conventional mobile menu are required.

### P0.4 Establish Enterprise Credibility Beyond RachelOS

RachelOS proves product and system-building ability. It does not, by itself, prove enterprise scale, healthcare implementation, procurement readiness, or repeatable commercial outcomes. Repetition of its three transactions makes the company feel smaller.

For each permissible enterprise experience, publish:

- Todd’s role and accountability;
- organization type and buyer context;
- functions, applications, workstreams, geographies, or teams in scope;
- decisions Todd personally owned;
- artifacts and systems produced;
- implementation responsibility;
- measured or observable change;
- exact evidence boundary.

When client metrics cannot be disclosed, use credible scope facts rather than generic outcome claims.

### P0.5 Clarify Strategy-to-Production Delivery

The site promises working systems, while the Build FAQ says development, integration, or vendor management may require separate scope. An executive cannot tell whether TKO advises, oversees, or implements.

Publish a delivery-responsibility model covering:

- strategy and business case;
- operating-model and product design;
- architecture and engineering;
- data/integration responsibilities;
- security, QA, deployment, adoption, and support;
- specialist/partner model;
- IP ownership and client responsibilities;
- continuity and bus-factor mitigation.

### P0.6 Reserve “Proof” for Proof

`/proof/prior-authorization`, `/proof/gold-card`, `/proof/program-recovery`, `/proof/executive-operating-system`, and `/proof/ai-governance` are primarily frameworks or synthesized operating patterns. They are useful, but they are not the same evidence class as screenshots, production records, measured outcomes, or client-approved implementation artifacts.

Move them to **Frameworks** or **Insights**. Reserve Proof for direct build evidence, verified artifacts, case evidence, role/scope evidence, and bounded outcomes.

### P0.7 Remove or Noindex Unfinished and Thin Pages

- `/proof/founder` contains empty/placeholder sections.
- proof and offer templates publish downloadable/proposal placeholder copy.
- eight founder detail pages repeat short claims and evidence bullets without enough independent value.
- diagram pages expose internal IDs and workflow language.
- an empty diagrams state can be indexed.

Complete, consolidate, hide, redirect, or noindex these pages before launch.

### P0.8 Fix Technical SEO Defects

- Five insight pages render two H1s: one from the page hero and one from Markdown.
- `/assessment` and `/services/recovery-assessment` have the same rendered title.
- `/selected-work/enterprise-care-management-modernization` has a URL/topic mismatch with the title “Enterprise Program Recovery.”
- 25 crawlable diagram detail pages are missing from the sitemap.
- `/services` and `/proof/gold-card` are sitemap-listed but have no contextual path from the crawled link graph.
- Sitemap `lastModified` is hard-coded to the same date for every route and all non-home priorities are identical.
- Child pages with their own Open Graph object have no `og:image`; Twitter titles inherit the site-wide “Healthcare Workflow Modernization” title even on unrelated pages.
- Article schema is missing important author/image/mainEntity/dateModified properties; Breadcrumb schema coverage is inconsistent.
- Build pages for operating-system build and fractional advisory lack Service schema; generic service FAQs lack FAQ schema.

### P0.9 Reduce Contact Friction

The form requires five long answers, requires an AI/automation answer even for non-AI work, and asks healthcare-specific questions despite a broad site position. It does not request company/role/timing, provide a response-time expectation, explain next steps, or offer privacy reassurance. Its submit button says “Schedule” even though no scheduling occurs.

Recommended fields:

1. Name
2. Work email
3. Company and role
4. What initiative or operating problem is under pressure?
5. Optional: timing and AI involvement

Confirmation copy: “Todd will review your note and respond within two business days. If the issue fits TKO’s work, the next step is a 30-minute working conversation—no sales sequence.”

### P0.10 Add Measurement

No public conversion analytics or event instrumentation was found. Implement measurement for:

- organic landing pages and query clusters;
- header/hero/inline CTA clicks by source page;
- proof-to-service and service-to-contact paths;
- form starts, completions, validation failures, and qualified submissions;
- assessment/service interest;
- Search Console and Bing verification.

## 3. P1 Improvements — High Value

1. Replace eight overlapping problem cards with four executive buying situations: capacity-draining workflow, stalled transformation, AI pilot-to-production risk, and key-person dependency.
2. Consolidate `/about`, `/founder`, `/proof/founder`, and founder detail pages into one executive bio plus one substantive Method page.
3. Add a conventional executive bio: roles, chronology, sectors, program scope, education/certifications where relevant, headshot, LinkedIn, location, and how TKO engagements are staffed.
4. Turn anonymized case studies into **experience briefs** until role, scope, implementation, and result evidence meet the case-study standard.
5. Publish redacted or illustrative sample deliverables: workflow map, decision-rights matrix, constraint register, AI control model, architecture diagram, 90-day roadmap, and before/after operating review.
6. Add procurement reassurance: confidentiality, data handling, security approach, IP/work-product ownership, contracting readiness, geography, partner model, and reference availability.
7. Rewrite generic page titles (`Services`, `Insights`, `Selected Work`) into query- and buyer-specific titles; keep SEO titles separate from H1 copy.
8. Add visible breadcrumbs and BreadcrumbList schema to service, offer, founder, insight, selected-work, healthcare, and diagram templates.
9. Replace global hub links with deliberate topic clusters: problem → guide → framework → experience/proof → service → contact.
10. Add author/reviewer identity, reviewed/updated dates, and public source notes to healthcare and AI content. Replace raw internal evidence IDs.
11. Clarify provider-organization versus health-plan buyer paths on healthcare and prior-authorization pages.
12. Add FAQ schema where FAQs are visible and expand social metadata with page-specific OG images and Twitter titles.

## 4. P2 Enhancements — Future Authority

- Publish polished executive one-page briefs for major services.
- Launch a Frameworks library only after at least three polished, self-contained assets are ready.
- Add short walkthrough videos for redacted systems and deliverables.
- Add client-approved references, testimonials, or reference-call availability.
- Publish a quarterly operational-transformation or governed-AI executive briefing.
- Add role-specific pathways for CIO, COO, healthcare operations, product, and transformation leaders.
- Create a low-pressure email subscription for buyers not ready to engage.
- Add updated-date and editorial review governance for healthcare/AI content.
- Expand diagrams only when each page has crawlable explanatory content, a stable query, schema, and deliberate cluster links.

## Recommended Information Architecture

### Primary Navigation

1. What We Do
2. Healthcare
3. Selected Work
4. Insights
5. About
6. Discuss an Initiative

Remove Home and Founder from the desktop navigation. Replace the mobile horizontal link strip with a menu.

### Commercial Architecture

- `/services` — What We Do hub
- `/services/operational-transformation-recovery`
- `/services/enterprise-ai-strategy-implementation`
- `/services/healthcare-operations-modernization`
- `/services/product-operating-model-advisory`
- `/services/fractional-transformation-product-leadership`
- `/services/prior-authorization-modernization`

Assessments become entry offers within the relevant service page, not a parallel taxonomy.

### Authority Architecture

- `/selected-work` — direct proof and bounded experience briefs
- `/insights` — informational articles and topic clusters
- `/frameworks` — substantive tools/models, launched only when complete
- `/about` — executive bio, enterprise record, delivery model

### Buyer Journey

`Problem or search query → service/guide → relevant experience or proof → delivery model → request a conversation`

## Keyword and Intent Ownership

| Primary query / topic | Intent | Recommended owner | Required content |
|---|---|---|---|
| Enterprise AI & operational transformation consulting | Commercial investigation | Homepage | Clear category, three outcome lanes, enterprise proof, delivery continuity. |
| AI transformation consulting | Commercial | Enterprise AI service | Strategy-to-production method, scope, team, roadmap, proof. |
| Enterprise AI implementation | Commercial/transactional | Enterprise AI service | Architecture, integration, controls, deployment, adoption, support. |
| AI implementation roadmap | Commercial/informational | Enterprise AI service + template | 30/60/90 sequence, decision gates, sample roadmap. |
| AI operating model | Informational/commercial | AI Operating Model pillar | Roles, decisions, governance, workflow, funding, metrics. |
| AI governance framework | Informational/commercial | AI Governance pillar | Source authority, decision rights, human approval, audit, exceptions, model risk. |
| Healthcare AI strategy | Commercial | Healthcare AI strategy page | Use cases, constraints, governance, roadmap, implementation model. |
| Healthcare transformation | Commercial | Healthcare pillar | Administrative burden, program recovery, workflow modernization, proof. |
| Healthcare operations | Commercial/informational | Healthcare operations page | Provider/plan pathways, workflow examples, operating metrics. |
| Prior authorization modernization | Commercial | Prior authorization service | Buyer-specific scope, denial/exception model, proof, roadmap. |
| Product operating model | Commercial/informational | Product operating model service | Portfolio-to-team decisions, funding, discovery/delivery, governance, metrics. |
| Enterprise product strategy | Commercial | Product strategy service | Market/problem framing, portfolio choices, operating model, product delivery. |
| AI product strategy | Commercial | Product strategy or AI service | Value case, workflow, data, controls, activation, adoption. |
| Operational excellence | Broad commercial | Operational transformation service | Business outcomes, baseline, constraints, measurable operating change. |
| Operational intelligence | Informational | Existing reporting-vs-intelligence pillar | Definition, comparison, examples, operating-review checklist. |
| Executive operating system | Informational/commercial | Framework pillar | Definition, decision cadence, constraint/decision registers, examples. |
| Business operating system | Informational/commercial | Framework/case-study cluster | Distinguish from ERP/OS; process, decision, and action model. |
| Enterprise architecture | Commercial/informational | Create only with credible scope proof | Current/target state, integration, governance, decision principles. |
| Workflow automation | Commercial | Service capability section | Human-in-loop workflow design, integration, exceptions, measurement. |
| Digital transformation consultant | Commercial | Homepage/About | Executive role, sectors, strategy-to-delivery proof, engagement model. |
| Operational transformation | Commercial | Core service | Recovery, operating model, implementation, measures. |

Avoid creating a thin landing page for every keyword. A page earns indexation only when it owns a distinct buyer, decision, intent, evidence set, and conversion path.

## New Content Opportunities

### Highest value (publish in first 90 days)

1. **Enterprise AI Strategy & Implementation** — commercial pillar for AI transformation consulting, enterprise AI implementation, and AI implementation roadmap.
2. **Healthcare AI Strategy** — healthcare-specific commercial page with governance, workflow, and implementation depth.
3. **Product Operating Model & Enterprise Product Strategy** — closes a major gap between current positioning and the requested buyer set.
4. **AI Operating Model: Roles, Decisions, Controls, and Metrics** — substantive pillar with a downloadable model.
5. **AI Governance Framework for Enterprise Operations** — framework with source authority, approvals, exceptions, auditability, and escalation.
6. **Prior Authorization Modernization** — canonical commercial page consolidating current duplicates.
7. **How TKO Delivers: Strategy Through Production** — team/responsibility, security, IP, partner, implementation, and support model.
8. **Enterprise Experience Brief Library** — role/scope/artifact/result evidence for healthcare modernization, program recovery, interoperability, and product work.

### Second wave

- Product operating model diagnostic checklist
- AI implementation roadmap template
- Executive operating review template
- Decision-rights matrix template
- Current-state to target-state workflow example
- Human-controlled AI reference architecture
- Healthcare administrative burden operating model
- Provider vs health-plan prior authorization workflow comparison
- Transformation recovery playbook
- Operational intelligence maturity model

## 90-Day SEO and Conversion Roadmap

### Days 1–30: Remove Risk and Establish One Story

**Business impact: highest**

- Select the primary positioning and one commercial namespace.
- Map every current URL to keep, merge, redirect, noindex, or remove.
- Remove internal labels and all placeholder language.
- Rewrite homepage, header, footer, About, Healthcare, Services, Contact.
- Fix CTA destinations and contact form friction.
- Fix duplicate H1s, duplicate titles, social metadata, schema gaps, sitemap dates/routes, and URL/title mismatch.
- Add analytics, Search Console, Bing verification, and conversion events.
- Publish delivery-responsibility and procurement reassurance.

**Exit criteria:** no unfinished public page; one primary CTA; one canonical commercial path; every indexable page has one intent and one owner.

### Days 31–60: Build Commercial and Proof Depth

**Business impact: high**

- Publish the five core service pages.
- Consolidate assessments into service-page entry offers.
- Rebuild Selected Work around Direct Build Proof, Enterprise Experience, and Methods.
- Publish at least three enterprise experience briefs with role, scale, artifacts, and evidence boundaries.
- Publish redacted/illustrative sample deliverables.
- Add breadcrumbs, contextual internal links, page-specific OG images, and author/reviewer modules.
- Reclassify proof-pattern pages into Frameworks/Insights.

**Exit criteria:** every core service has relevant experience, a sample output, clear scope, and a truthful implementation model.

### Days 61–90: Create Search Demand Capture

**Business impact: compounding**

- Publish Enterprise AI Strategy & Implementation, Healthcare AI Strategy, Product Operating Model, AI Operating Model, and AI Governance pillars.
- Consolidate prior-authorization articles into one pillar plus supporting cluster.
- Publish an AI implementation roadmap/template and executive operating review tool.
- Add role- and sector-specific paths from homepage/service pages.
- Review early query, engagement, and conversion data; improve titles, internal links, and CTAs.
- Establish quarterly refresh and evidence-review cadence.

**Exit criteria:** three coherent clusters—Operational Transformation, Healthcare Operations, Enterprise AI/Product—with a problem → guide → framework → proof → service path.

## Technical Audit Evidence

- The production build completed successfully and generated 63 application pages/routes.
- A read-only crawl found 77 internally reachable public URLs and no broken internal destinations.
- The sitemap contains 54 URLs.
- Twenty-five crawlable diagram detail pages are not in the sitemap.
- `/services` and `/proof/gold-card` are sitemap-listed but were not reached through a contextual content link in the crawl.
- `/assessment` and `/services/recovery-assessment` share the title “Operational Recovery Assessment | TKO Solutions.”
- All five insight articles render two H1 elements.
- The production homepage and local production build have the same H1 and core description, confirming the audited positioning is deployed.
- The tested child offer page rendered no Open Graph image; its Twitter title inherited an unrelated healthcare-wide title.
- The production build reports 129 kB shared first-load JavaScript and 168 kB on the homepage. This is not the primary conversion problem, but the client-rendered animation and diagram stack should be monitored in Core Web Vitals.
- Authenticated `/tif/*` pages are disallowed in robots and protected by middleware. Preserve that boundary.

## 5. Page-by-Page Audit

### How to Read the Matrix

Every row covers the required audit dimensions. In the **Issues** column:

- **SEO** = query ownership, metadata, schema, internal linking, indexation, or cannibalization.
- **Msg** = positioning, specificity, credibility, or differentiation.
- **Read** = scanability, hierarchy, length, labels, or cognitive load.
- **Conv** = CTA, objections, buying path, or trust friction.

### Core Hubs and Conversion Pages

| Page | Purpose / Audience / Search intent | Strengths | Issues | Recommended rewrite / disposition | Priority |
|---|---|---|---|---|---|
| `/` | Establish category and next action; C-suite, VP, product, transformation, healthcare; commercial investigation + brand navigation. | Direct problem language, restrained AI position, inspectable build proof. | **SEO:** ambiguous query owner and weak match to AI/product/healthcare transformation. **Msg:** generic operating-performance category; RachelOS dominates. **Read:** very long homepage with repeated method/proof/offers. **Conv:** no concise Why TKO; CTAs route to different taxonomies. | Use recommended homepage hero. Show three outcome lanes—define strategy, redesign the operating model, implement the system—and three proof lanes. Move detailed RachelOS content to Selected Work. | P0 |
| `/problems` | Help executives recognize an active operating problem; informational/commercial investigation. | Useful symptom-led framing; strong distinction between activity and control. | **SEO:** eight broad problems lack distinct query owners. **Msg:** “Executive Discoverability” is internal language. **Read:** overlapping cards. **Conv:** little business-exposure framing and routes into duplicate assessment architecture. | Retitle “Where execution breaks down between strategy, systems, and teams.” Use four buying situations with exposure, trigger, proof, and relevant service. | P1 |
| `/services` | Explain how TKO can be engaged; executive commercial investigation. | Price/timeline transparency; logical assessment → diagnostic → build → advisory sequence. | **SEO:** generic title and sitemap orphan. **Msg:** sales-funnel labels. **Read:** parallel `/offers` catalog forces comparison. **Conv:** absent from primary navigation. | Make this the sole What We Do hub. Organize around Operational Transformation, Enterprise AI, Healthcare Operations, Product/Operating Model, and Fractional Leadership. | P0 |
| `/assessment` | Sell a fixed-scope recovery assessment; transactional. | Clear inputs, outputs, sponsor fit, and no-obligation framing. | **SEO:** duplicates Recovery Assessment title/query. **Msg:** repeats another offer. **Read:** long for a duplicate. **Conv:** unclear why this exists beside service and offer pages. | Merge into `/services/recovery-assessment` and 301. | P0 |
| `/assessment/ai-delivery` | Evaluate AI delivery evidence/readiness; CIO, product, transformation leaders; commercial investigation. | Distinct Built/Activated/Validated method; candid evidence standard. | **SEO:** overlaps `/offers/executive-ai`. **Msg:** too centered on RachelOS as transferable method. **Read:** method precedes buyer decision. **Conv:** price, duration, access, security, and next step unclear. | Make one canonical AI assessment within the Enterprise AI service. Lead with “Is this initiative ready for controlled production?” Add scope, investment, artifacts, access, controls, and roadmap. | P0/P1 |
| `/healthcare` | Establish healthcare relevance and route healthcare buyers; commercial investigation/informational. | Relevant domain vocabulary and responsible claim boundaries. | **SEO:** unnatural “authority” title; competes with founder/PA pages. **Msg:** leads with what cannot be claimed; provider and plan contexts blur. **Read:** caveats interrupt momentum. **Conv:** no role/scale evidence or clear healthcare service architecture. | Retitle “Healthcare AI Strategy & Operations Transformation.” Lead with verified roles/scope, then provider and health-plan paths, selected experience, frameworks, and services. | P0 |
| `/selected-work` | Prove delivery; executive diligence/commercial investigation. | Separates several operating contexts and includes evidence boundaries. | **SEO:** generic title and no filters. **Msg:** “Evidence before category” is opaque; direct proof and experience summaries mix. **Read:** cards do not expose Role/Scope/Change. **Conv:** buyer cannot quickly match work to need. | Retitle “Selected transformations, products, and operating systems.” Group Direct Build Proof, Enterprise Experience, and Methods. Every card shows Role / Scope / Artifact / Change / Evidence. | P0/P1 |
| `/proof` | Support diligence; commercial investigation. | Exceptional claim discipline. | **SEO:** not a primary search landing page; framework children compete with guides. **Msg:** “proof registry” sounds internal; evidence classes mix. **Read:** too many routes. **Conv:** buyers must perform excessive diligence. | Rename “Case Studies & Evidence” or split Evidence from Frameworks. Use three evidence classes and remove unfinished children. | P0 |
| `/offers` | Catalog entry assessments; commercial investigation. | Buyer-question framing. | **SEO:** nine templated pages compete with Services. **Msg:** visible keywords and internal catalog logic. **Read:** choice overload. **Conv:** no clear recommended path. | 301 to `/services`, or reduce to three complete assessment families embedded in services. | P0 |
| `/insights` | Organic discovery and authority; informational. | Evidence-oriented articles and clear summaries. | **SEO:** generic title and no cluster taxonomy. **Msg:** “Guides” in nav vs “Insights” on page. **Read:** no executive-summary/filtering layer. **Conv:** repeated assessment push. | Use one name. Organize around Operational Transformation, Healthcare Operations, Enterprise AI, and Product/Delivery. Add author, reviewed date, tools, and contextual next steps. | P1 |
| `/diagrams` | Demonstrate thinking visually; informational. | Potentially strong authority and linkable assets. | **SEO:** 25 detail pages omitted from sitemap; empty state can index. **Msg:** internal IDs/evidence status. **Read:** large undifferentiated library. **Conv:** weak connection to buyer decisions. | Hide/noindex until 3–5 flagship diagrams are polished. Relaunch as “Operating Model & AI Governance Frameworks,” grouped by executive question. | P0/P2 |
| `/about` | Establish trust in Todd; navigational/commercial diligence. | Candid decisions, failures, and evidence boundaries; shows judgment. | **SEO:** title underplays enterprise/AI expertise; no ProfilePage schema. **Msg:** missing roles, chronology, scale, credentials, team model. **Read:** 944 words reads like a manifesto. **Conv:** one-person accountability also raises continuity risk. | Lead with a 150-word executive bio, verified role/scope timeline, what Todd leads/builds, staffing/partner model, references, and selected decisions. | P0 |
| `/founder` | Founder authority collection; navigational/diligence. | Attempts to make judgment inspectable. | **SEO:** duplicates About. **Msg:** internal “operating record” framing. **Read:** eight thin choices. **Conv:** fragments trust instead of concentrating it. | Merge unique content into `/about`; 301 this route. | P0 |
| `/contact` | Convert interested buyers; transactional. | Concrete business-problem orientation; no aggressive sales sequence. | **SEO:** fine as branded conversion page. **Msg:** questions are healthcare-specific despite broad position. **Read:** five required long responses. **Conv:** no company/role/timing/response time/privacy; “Schedule” does not schedule; AI field is mandatory. | Use five-field form described in P0.9, “Request a conversation,” two-business-day expectation, and no-PHI/sensitive-data notice. | P0 |

### Services and Assessments

| Page | Purpose / Audience / Search intent | Strengths | Issues | Recommended rewrite / disposition | Priority |
|---|---|---|---|---|---|
| `/services/recovery-assessment` | Fixed-scope entry engagement; COO/CEO/transformation sponsor; transactional. | Strongest complete offer: price, duration, process, fit, confidentiality, FAQ. | **SEO:** cannibalized by `/assessment` and executive-recovery offer. **Msg:** RachelOS does not prove assessment quality. **Read:** funnel labels. **Conv:** no sample deliverable or exact access limits. | Keep as canonical. H1: “In one week, identify the constraint, business exposure, and next move worth funding.” Add redacted briefing, map, decision register, access limits, and sensitive-data boundary. | P0 |
| `/services/diagnostic` | Deeper evidence and roadmap engagement; executive commercial/transactional. | Clear price, timing, interviews, and outputs. | **SEO:** invented product term has low query recognition; lacks FAQ schema. **Msg:** generic template. **Read:** output list lacks example. **Conv:** no proof or sample roadmap. | SEO title around Operational Excellence & Transformation Diagnostic; subhead can retain product name. Show workflow comparison, bottleneck map, AI control model, and 90-day roadmap. | P1 |
| `/services/operating-system-build` | Strategy-to-production engagement; CIO/COO/product leaders; transactional. | Signals that TKO goes beyond diagnosis. | **SEO:** unclear whether target is AI operating model, business operating system, or implementation. **Msg:** “working system” conflicts with “build oversight.” **Read:** abstract deliverables. **Conv:** architecture, team, IP, security, deployment, support, and acceptance unclear. | Rename based on real scope. Publish delivery RACI, reference architecture, acceptance gates, direct-build vs partner responsibilities, handoff, adoption, and support. | P0 |
| `/services/fractional-advisor` | Ongoing executive support; COO/CPO/transformation sponsor; transactional. | Price/duration and governance cadence are visible. | **SEO:** invented “Operational Intelligence Advisor” term. **Msg:** role boundary vague. **Read:** abstract outcome list. **Conv:** no time allocation, authority, sponsor model, 30/60/90 plan, or exit criteria. | Position as Fractional Transformation & Product Leadership if accurate. State capacity, cadence, decisions owned, interfaces, exclusions, and 30/60/90 plan. | P1 |
| `/services/prior-authorization-assessment` | Specialized healthcare assessment; PA/provider operations leaders; transactional. | Most specific buyer/problem page; good inputs, outputs, FAQ, and Service schema. | **SEO:** cannibalized by two offers; target buyer side unclear. **Msg:** public “wedge/Tier-1” language; some generalizations. **Read:** internal labels. **Conv:** no sample workflow/decision matrix or role boundary. | Make canonical owner of prior authorization modernization/assessment. Choose provider or plan primary buyer; add current/target workflow, exception taxonomy, decision-rights matrix, baseline plan, and exact scope. | P0 |

### Offer Detail Pages

All nine pages use the same thin template. Shared issues: visible “Primary search query,” generic evidence bullets, repeated caveats, no price/duration/FAQ/examples, proposal placeholders, and no precise implementation path.

| Page | Purpose / Audience / Search intent | Strengths | Issues | Recommended rewrite / disposition | Priority |
|---|---|---|---|---|---|
| `/offers/executive-recovery` | Recovery assessment; executives; transactional. | Clear executive question. | **SEO/Msg/Conv:** direct duplicate of recovery service; thin template. | 301 into canonical Recovery Assessment. | P0 |
| `/offers/healthcare-operating` | Broad healthcare workflow assessment; healthcare operations leaders; commercial. | Useful administrative-burden and governance scope. | **SEO:** overlaps healthcare pillar/recovery/PA. **Msg:** buyer side and distinct scope unclear. **Conv:** no commercial terms. | Expand as a distinct Healthcare Operations Assessment within the healthcare service or merge. | P0/P1 |
| `/offers/prior-authorization` | PA assessment; healthcare transactional. | Specific denial/exception language. | **SEO/Msg/Conv:** duplicates stronger service page. | 301 to canonical PA service. | P0 |
| `/offers/program-recovery` | Recover stalled transformation; CIO/COO/portfolio leaders; commercial. | Distinct and valuable executive problem. | **SEO:** thin for commercial intent. **Msg:** no scale/experience proof. **Conv:** no price/timeline/artifacts. | Keep only after adding dependency map, decision calendar, constraint register, recovery sequence, terms, and experience brief; otherwise noindex. | P1 |
| `/offers/executive-ai` | AI pilot-to-production assessment; CIO/CPO/AI sponsor; commercial. | Strong governed-AI frame. | **SEO:** overlaps AI Delivery Assessment. **Msg:** generic. **Conv:** no security/access/scope details. | Merge into canonical Enterprise AI assessment/service. | P0 |
| `/offers/operational-intelligence` | Diagnose reporting-to-action gap; operations leaders; commercial. | Clear problem. | **SEO:** overlaps diagnostic, article, and executive-operating-system framework. **Msg:** term needs explanation. **Conv:** no unique scope. | Fold into Diagnostic or define as a target-state design phase. | P1 |
| `/offers/decision-rights-workshop` | Make authority/exceptions explicit; leaders preparing automation; transactional. | Narrow, practical deliverable. | **SEO:** potentially distinct query. **Msg:** too small beside major engagements. **Conv:** no agenda, duration, sample matrix, or sectors. | Retain as add-on or fixed workshop after publishing a complete sample matrix and agenda. | P2 |
| `/offers/portfolio-recovery` | Portfolio-level intervention; executive/PE/portfolio leaders; commercial. | High-value problem. | **SEO/Msg:** high-scale claim without evidence. **Read/Conv:** templated and commercially incomplete. | Fold into Program Recovery/fractional leadership until portfolio evidence exists. | P1 |
| `/offers/executive-operating-review` | Design executive decision cadence; executive teams; commercial. | Productizable method. | **SEO:** competes with diagram/framework. **Msg/Conv:** unsupported by a complete artifact. | Offer as workshop/advisory module; publish review template, decision register, and agenda. | P2 |

### Selected Work

| Page | Purpose / Audience / Search intent | Strengths | Issues | Recommended rewrite / disposition | Priority |
|---|---|---|---|---|---|
| `/selected-work/from-crm-to-operating-system` | RachelOS business case; product/operations buyers; commercial investigation. | Inspectable screenshots and direct implementation evidence. | **SEO:** overlaps `/proof/rachelos`. **Msg:** jargon-heavy title and unmeasured visibility claims. **Read:** implementation and outcome evidence mix. **Conv:** small-business context is overweighted. | Define this as the business story—problem, system, operating use, bounded result. Title: “How TKO built a daily operating system for a relationship-driven business.” Keep technical proof on `/proof/rachelos`. | P1 |
| `/selected-work/rachelos-delivery-model` | Demonstrate AI-assisted delivery model; CIO/CPO/engineering leaders; informational/commercial. | Strongest differentiated authority asset; candid production facts and limitations. | **SEO:** long title/meta. **Msg:** “12–18 roles” comparison invites skepticism. **Read:** executive implications arrive late. **Conv:** enterprise transfer model not explicit. | Lead with delivery-speed, governance, activation, reliability, and accountability implications. Replace role-equivalence rhetoric with artifact/competency map; add architecture/security/testing detail. | P1 |
| `/selected-work/prior-authorization-modernization` | Show relevant PA experience; healthcare executives; commercial investigation. | Highly relevant problem and decision-rights framing. | **SEO:** can target PA modernization but competes with service. **Msg:** role, organization type, scale, timeline, artifacts, implementation, and result are missing. **Read:** only ~191 rendered words. **Conv:** not enough evidence for a case-study claim. | Relabel “Experience brief” until stronger proof is approved. Add exact ownership, stakeholder context, current/target workflow, review tiers, and observable change. | P0/P1 |
| `/selected-work/enterprise-care-management-modernization` | Show program recovery/healthcare modernization experience; executives; commercial. | Relevant multi-function transformation pattern. | **SEO:** slug says care management; title says Enterprise Program Recovery. **Msg:** “stronger executive confidence” is not evidence. **Read/Conv:** scope and decision mechanism are vague. | Rename/301 to `/selected-work/enterprise-program-recovery` or rewrite narrowly around care management. Add verified scope dimensions, Todd’s role, artifact, and operational change. | P0 |
| `/selected-work/healthcare-interoperability-platform` | Show interoperability modernization experience; healthcare CIO/product leaders; commercial. | Demonstrates requirements/governance familiarity. | **SEO:** “platform” slug may overstate work. **Msg:** implementation responsibility/result unclear. **Read:** abstract summary. **Conv:** no inspectable artifact. | Rename to accurate scope. Add redacted requirements, architecture/governance artifact, stakeholders, ownership, and implementation boundary. | P1 |
| `/selected-work/cre-intelligence-model` | Show method portability; operations/business-owner audience; informational. | Demonstrates application beyond healthcare. | **SEO:** dilutes primary enterprise/healthcare topical focus. **Msg:** internal model is not client work. **Read/Conv:** weak primary-buyer relevance. | Move to Lab/Methods or noindex until it becomes a working implementation with inspectable evidence. | P2 |

### Proof and Framework Pages

| Page | Purpose / Audience / Search intent | Strengths | Issues | Recommended rewrite / disposition | Priority |
|---|---|---|---|---|---|
| `/proof/rachelos` | Technical/production diligence; product, technology, operations executives; informational/commercial. | Best direct proof; screenshots, controls, and limitations are inspectable. | **SEO:** overlaps case study. **Msg:** “revenue-producing” and transaction references can imply causality. **Read:** repeated across site. **Conv:** enterprise architecture and handoff controls are thin. | Make this the single definitive technical proof page. Use “used in live revenue operations.” Add current-state architecture, activation/adoption evidence, security/reliability controls, dated audit, and external operator voice if available. | P1 |
| `/proof/prior-authorization` | Explain decision model; healthcare leaders; informational. | Strong operating-model framework. | **SEO:** useful support query but mislabeled as proof. **Msg:** experience-based synthesis, not direct outcome proof. **Read:** repeated claim boundary/placeholder. **Conv:** wrong evidence expectation. | Move to `/frameworks/prior-authorization-decision-rights`; link to PA experience and service. | P0/P1 |
| `/proof/gold-card` | Explain Gold Card readiness; PA leaders; informational. | Distinct point of view and query opportunity. | **SEO:** sitemap orphan; overlaps operational-quality article. **Msg:** framework presented as proof. **Read/Conv:** insufficient current sourcing and direct evidence. | Merge into PA quality pillar or expand as a reviewed framework with current sources and service link. | P0/P1 |
| `/proof/program-recovery` | Explain program-recovery model; transformation sponsors; informational/commercial support. | Useful cross-workstream decision pattern. | **SEO:** overlaps commercial offer. **Msg:** framework, not proof. **Read/Conv:** generic evidence list and placeholder. | Move to Frameworks; target how-to/framework intent; attach real experience artifacts before calling it proof. | P0/P1 |
| `/proof/executive-operating-system` | Define executive operating system; COO/transformation leaders; informational. | Strong potential query owner and useful decision-centered model. | **SEO:** needs fuller definition/examples and competes with offer/diagram. **Msg:** may sound like meeting design. **Read/Conv:** thin evidence. | Expand into pillar with definition, comparison vs reporting, templates, examples, and relevant service. Reclassify as Framework. | P1 |
| `/proof/ai-governance` | Explain human-governed AI controls; CIO/CPO/AI sponsor; informational. | Distinct operating-control perspective. | **SEO:** too thin to own broad AI governance framework query. **Msg:** framework presented as proof. **Read/Conv:** no full control architecture or implementation evidence. | Create substantive AI Governance pillar; use this page only as implementation evidence if artifacts justify it. | P1 |
| `/proof/founder` | Founder diligence/profile; navigational. | Attempts to separate evidence classes. | **SEO:** thin/unfinished indexation. **Msg:** titles, dates, experience, capabilities, and downloads “will appear.” **Read/Conv:** visibly unfinished. | Remove before launch; merge completed content into About. | P0 |

### Founder Detail Pages

All eight pages use an almost identical thin template: hero, one operating point, three evidence bullets, a claim boundary, and generic links. They do not independently satisfy search or executive diligence intent.

| Page | Purpose / Audience / Search intent | Strengths | Issues | Recommended rewrite / disposition | Priority |
|---|---|---|---|---|---|
| `/founder/what-i-have-built` | Build record; diligence. | Points to direct system evidence. | **SEO:** duplicates About/RachelOS. **Msg:** lacks breadth. **Read/Conv:** thin. | Merge into About and RachelOS proof; 301. | P0 |
| `/founder/what-i-have-owned` | Responsibility record; diligence. | Ownership framing is useful. | **SEO/Msg:** duplicates About; no roles/scale/chronology. **Read/Conv:** thin. | Merge into executive bio and role/scope timeline; 301. | P0 |
| `/founder/how-i-think` | Method; informational/diligence. | Clear operating philosophy. | **SEO:** overlaps operating principles. **Msg:** abstract without artifacts. **Read/Conv:** thin. | Combine with operating principles into one substantive Method page. | P1 |
| `/founder/operating-principles` | Principles; informational. | Memorable decision rules. | **SEO/Msg:** duplicates How I Think/About. **Read/Conv:** list-like and thin. | Merge into Method page with examples and decision artifacts. | P1 |
| `/founder/difficult-decisions` | Demonstrate judgment; diligence. | Honest tradeoffs differentiate. | **SEO:** overlaps About and AI delivery article. **Msg:** lacks context/impact. **Read/Conv:** thin. | Consolidate into About or a substantive essay with complete decision records. | P1 |
| `/founder/what-i-got-wrong` | Demonstrate learning; diligence. | Candor builds trust. | **SEO/Msg:** overlaps About/delivery model; thin. **Conv:** shortcomings without surrounding execution system can amplify risk. | Consolidate into delivery-model case or a full lessons essay. | P1 |
| `/founder/healthcare` | Healthcare authority; commercial diligence. | Relevant experience boundary. | **SEO:** cannibalizes `/healthcare`. **Msg:** no role/scope evidence. **Read/Conv:** thin. | Merge into Healthcare and About; 301. | P0 |
| `/founder/ai-delivery` | AI delivery authority; informational/diligence. | Sensible judgment/activation distinction. | **SEO:** overlaps AI article/assessment/service. **Msg/Read/Conv:** templated and thin. | Merge into RachelOS delivery case and Enterprise AI service; 301. | P0/P1 |

### Insight Articles

Shared issue: every article has two H1s, and public evidence trails sometimes expose internal YAML/repository identifiers that readers cannot inspect. Fix hierarchy and replace internal evidence records with readable public sources/methodology notes.

| Page | Purpose / Audience / Search intent | Strengths | Issues | Recommended rewrite / disposition | Priority |
|---|---|---|---|---|---|
| `/insights/operational-intelligence-vs-reporting` | Own comparison/definition query; operations and transformation leaders; informational. | Best differentiation pillar; clear forward-looking decision frame. | **SEO:** duplicate H1; needs richer comparison intent. **Msg:** good. **Read:** long prose without executive table. **Conv:** links to duplicate assessment path. | Add executive summary, reporting-vs-operational-intelligence table, before/after example, operating-review checklist, and one diagnostic CTA. | P0/P1 |
| `/insights/human-apis-become-organizational-bottlenecks` | Explain key-person dependency; operations leaders; informational. | Differentiated and memorable concept. | **SEO:** “Human API” has limited search familiarity; duplicate H1. **Msg:** needs immediate plain-language translation. **Read:** repeated concept. **Conv:** generic assessment links. | Retitle “Key-Person Dependency: When Critical Knowledge Lives in One Person.” Keep Human API as the named model; add risk checklist and relevant service. | P1 |
| `/insights/prior-authorization-is-a-decision-rights-problem` | PA decision-rights education; provider/plan operations; informational. | Strong domain point of view. | **SEO:** duplicate H1; overlaps PA pillar but has defensible sub-intent. **Msg:** hypothetical example needs labeling; provider/plan roles blur. **Read:** raw evidence IDs. **Conv:** duplicate service paths. | Keep as supporting cluster. Add reviewer/dateModified/public sources, provider/plan distinctions, a decision-rights matrix, and canonical PA service link. | P1 |
| `/insights/prior-authorization-operational-quality-problem` | PA quality/Gold Card education; healthcare leaders; informational. | Useful quality and exception dimensions. | **SEO:** duplicate H1 and overlap with decision-rights/Gold Card pages. **Msg:** broad claims need reviewed sources. **Read:** prose-heavy. **Conv:** two competing assessments. | Make this the PA operational-quality pillar or narrow it to measurable quality dimensions. Fold Gold Card content here if distinct value is insufficient. | P1 |
| `/insights/what-ai-assisted-delivery-compresses` | AI-assisted delivery authority; CIO/CPO/engineering; informational/commercial. | Strongest authority article; specific, candid, and unusual. | **SEO:** duplicate H1; long title. **Msg:** role-equivalence claim can sound like AI hype. **Read:** executive implication too late. **Conv:** transfer to enterprise engagement not explicit. | Lead with the executive governance checklist; add construction-vs-judgment diagram, methodology, limitations, and links to AI implementation roadmap/service. | P1 |

### Diagram Detail Pages

Shared technical/content issues across every `/diagrams/[slug]` page: missing from the sitemap, incomplete social metadata, no Breadcrumb/CreativeWork schema, client-rendered Mermaid, exposed internal knowledge IDs/evidence records, and insufficient contextual linking. Keep only diagrams that answer a distinct executive question and can stand alone as crawlable content.

| Page | Purpose / Audience / Search intent | Strengths | Issues | Recommended rewrite / disposition | Priority |
|---|---|---|---|---|---|
| `/diagrams/decision-rights-matrix` | Show routine/exception authority; operations/AI leaders; informational. | Highly practical buyer artifact. | **SEO/Read:** shared defects. **Msg:** needs a worked example. **Conv:** no workshop/service path. | Make flagship framework: definition, sample matrix, use cases, download preview, Decision Rights Workshop link. | P1 |
| `/diagrams/rachelos-operating-loop` | Explain RachelOS workflow; product/technology diligence; informational. | Directly supports build proof. | **SEO:** overlaps proof page. **Msg:** context absent. **Read/Conv:** standalone page adds little. | Embed prominently in RachelOS proof; keep separate only with architecture narrative and evidence links. | P1 |
| `/diagrams/ai-governance-stack` | Explain enterprise AI controls; CIO/AI governance; informational. | Strong strategic topic and visual fit. | **SEO:** too thin for AI governance query. **Msg:** needs control ownership and implementation detail. **Conv:** no service link. | Make a flagship diagram within the AI Governance pillar; show layers, owners, decisions, and artifacts. | P1 |
| `/diagrams/operating-memory` | Explain durable organizational memory; operations/product; informational. | Differentiated concept. | **SEO:** low query familiarity. **Msg:** abstract. **Read/Conv:** lacks example and next action. | Pair with key-person dependency content; add before/after example and diagnostic link. | P2 |
| `/diagrams/executive-operating-review` | Show decision-centered review; COO/transformation; informational/commercial. | Productizable operating artifact. | **SEO:** duplicate title with offer. **Msg:** framework vs service unclear. **Conv:** no sample agenda/register. | Use distinct SEO title “Executive Operating Review Framework”; attach template and service/workshop path. | P1 |
| `/diagrams/built-activated-validated` | Explain AI/product evidence stages; CIO/CPO; informational. | Distinctive and credible method. | **SEO:** needs definition and examples. **Msg:** internal method language. **Read/Conv:** no assessment connection. | Make core Enterprise AI framework with definitions, examples, gates, and AI readiness service link. | P1 |
| `/diagrams/system-of-record-to-system-of-action` | Compare reporting/storage with action; operations/product; informational. | Strong search/differentiation opportunity. | **SEO:** needs substantive page copy. **Msg:** familiar concept requires TKO-specific proof. **Conv:** no related service. | Build into operational-intelligence pillar; add comparison and RachelOS example. | P1 |
| `/diagrams/workflow-reconstruction-map` | Show current-state discovery; operations/transformation; informational. | Demonstrates assessment method. | **SEO:** narrow supporting asset. **Msg:** process without artifact detail. **Conv:** no assessment bridge. | Add illustrative input/output and embed in Recovery Assessment. | P1 |
| `/diagrams/key-person-dependency-loop` | Visualize key-person risk; COO/operations; informational. | Clear supporting concept. | **SEO:** overlaps Human API article. **Msg:** needs business impact. **Read/Conv:** standalone thin page. | Embed in key-person dependency guide; keep indexable only with risk checklist and service link. | P2 |
| `/diagrams/source-authority-model` | Explain trusted source hierarchy; data/AI/product leaders; informational. | Important AI-governance concept. | **SEO:** broad “source authority” ambiguity. **Msg:** lacks enterprise example. **Conv:** no implementation path. | Include in AI Governance/AI Operating Model pillar with roles, conflict handling, and audit example. | P1 |
| `/diagrams/human-approval-flow` | Explain human-in-loop control; CIO/risk/operations; informational. | Directly supports governed-AI differentiation. | **SEO:** crowded generic topic. **Msg:** needs consequential-decision context. **Conv:** no service/proof bridge. | Use in AI Governance pillar and RachelOS proof; add approval states, overrides, audit trail, and owner. | P1 |
| `/diagrams/recommendation-flow` | Explain bounded AI recommendation; product/AI leaders; informational. | Useful practical model. | **SEO:** thin/overlaps human approval. **Msg:** context and failure modes absent. **Conv:** weak path. | Consolidate with Human Approval Flow unless it has a distinct worked example. | P2 |
| `/diagrams/daily-operating-loop` | Show daily execution cadence; COO/operations; informational. | Can make operating-system idea concrete. | **SEO:** generic and unsupported. **Msg:** unclear domain. **Conv:** no service fit. | Add a role-specific scenario or merge into Executive Operating System pillar. | P2 |
| `/diagrams/status-constraint-decision` | Show move from reporting to decision; executive teams; informational. | Strong executive scan value. | **SEO:** overlaps operational-intelligence article and operating-review diagram. **Msg:** needs one clear owner. **Conv:** duplicated path. | Merge into operational-intelligence pillar as its primary visual. | P1 |
| `/diagrams/prior-authorization-current-state` | Show PA friction/decision gaps; provider/plan ops; informational/commercial. | High-value healthcare artifact. | **SEO:** strong support but lacks reviewed context. **Msg:** may generalize a “typical” workflow. **Conv:** no direct PA service bridge. | Publish with explicit provider/plan scope, assumptions, reviewed sources, and PA assessment CTA. | P1 |
| `/diagrams/prior-authorization-future-state` | Show governed PA target state; healthcare operations; informational/commercial. | Demonstrates practical modernization thinking. | **SEO:** should pair with current state. **Msg:** future state could imply universal design. **Conv:** no implementation sequence. | Publish as paired before/after framework with assumptions, decision tiers, evidence, owners, measures, and service link. | P1 |
| `/diagrams/operational-constraint-register` | Show assessment output; COO/transformation; informational/commercial. | Excellent sample-deliverable candidate. | **SEO:** narrow template intent. **Msg:** current page exposes internal evidence mechanics. **Conv:** no preview/download/service path. | Convert into redacted/illustrative sample deliverable within Recovery Assessment. | P1 |
| `/diagrams/decision-register` | Show decision governance artifact; transformation leaders; informational. | Concrete and reusable. | **SEO:** generic term. **Msg:** needs example and owner cadence. **Conv:** no service path. | Pair with Executive Operating Review/Program Recovery; provide non-gated preview. | P1 |
| `/diagrams/recovery-assessment-evidence-flow` | Explain assessment method; executive buyers; commercial support. | Helps reduce “black-box consulting” concern. | **SEO:** not a standalone search page. **Msg:** internal process framing. **Read/Conv:** extra click. | Embed in canonical Recovery Assessment; noindex standalone unless expanded substantially. | P1 |
| `/diagrams/assessment-to-build-decision-tree` | Help choose next intervention; executive buyers; commercial investigation. | Directly reduces buying ambiguity. | **SEO:** supporting rather than standalone intent. **Msg:** valuable after commercial consolidation. **Conv:** current taxonomy may encode duplicates. | Redesign after IA consolidation; embed on Services and Recovery Assessment. | P1 |
| `/diagrams/claim-boundary-ladder` | Explain evidence discipline; diligence audience; informational. | Reinforces honest claims. | **SEO:** low external demand. **Msg:** internal governance becomes buyer story. **Read/Conv:** defensive emphasis. | Use as a small module on Evidence/Method pages; noindex standalone. | P2 |
| `/diagrams/credibility-ladder` | Explain evidence maturity; diligence/AI leaders; informational. | Useful evaluation tool. | **SEO/Msg:** overlaps claim-boundary and Built/Activated/Validated. **Read/Conv:** too many adjacent frameworks. | Consolidate into one evidence-maturity framework. | P2 |
| `/diagrams/founder-evidence-map` | Navigate founder proof; diligence. | Could orient readers. | **SEO:** no independent query. **Msg:** highlights fragmented founder architecture. **Read/Conv:** more navigation than evidence. | Remove after About consolidation; noindex/redirect. | P0/P2 |
| `/diagrams/experience-compiler-lifecycle` | Explain internal authority-content process; internal/editorial audience. | Good internal governance. | **SEO/Msg/Read/Conv:** not buyer-facing and exposes content machinery. | Remove from public site; retain inside TIF/internal documentation only. | P0 |
| `/diagrams/evidence-asset-traceability` | Explain internal evidence-to-content lineage; internal/compliance audience. | Strong internal control concept. | **SEO/Msg/Read/Conv:** content-production mechanism, not an executive buying asset. | Remove from public site; retain internally. | P0 |

### Redirect and Legacy Routes

| Page | Purpose / Audience / Search intent | Strengths | Issues | Recommended rewrite / disposition | Priority |
|---|---|---|---|---|---|
| `/case-studies` | Legacy navigation. | Permanent redirect preserves old path. | **SEO:** fine if single-hop and excluded from sitemap. | Keep 308/301 to `/selected-work`; standardize public label as Case Studies or Selected Work, not both. | P2 |
| `/case-studies/[slug]` | Legacy detail paths. | Slug-preserving permanent redirects. | **SEO:** validate all historical slugs and backlink targets. | Retain redirects indefinitely and monitor 404s. | P2 |
| `/industries` | Legacy industry intent. | Avoids 404. | **SEO/Msg:** redirect to `/selected-work` discards industry intent and surprises users. **Conv:** wrong destination. | Create a real evidence-backed industries hub, or redirect to `/healthcare` while healthcare is the only supported industry pillar. | P1 |

## Enterprise Objections the Site Must Answer

- What enterprise roles has Todd held, and what did he own?
- What scale of programs, teams, stakeholders, systems, or budgets has he led?
- What changed because of his work?
- Is TKO Todd alone, a partner network, or a delivery team?
- Who writes code, performs integration, tests, deploys, trains, and supports?
- What happens if Todd is unavailable?
- Can TKO work through enterprise procurement, architecture, security, legal, and incumbent vendors?
- Are NDA, MSA, DPA, BAA, and insurance support available where appropriate?
- Will TKO access PHI, PII, client source code, or production systems?
- Is client data used with third-party AI services?
- Who owns code, IP, documentation, and work product?
- How are baseline performance and success measures established?
- Can TKO provide references after mutual fit?
- Does TKO work with provider organizations, health plans, or both?
- What happens after the contact form, and when will Todd respond?

## Proof Assets Required

### P0

- Verified executive biography and career timeline
- Redacted Recovery Assessment deliverable
- Redacted current-state workflow map
- Redacted decision-rights matrix
- Redacted dependency/decision view for program recovery
- Two healthcare experience briefs with explicit role and ownership boundaries
- TKO/client delivery-responsibility matrix
- Engagement lifecycle: diagnose → decide → design → build → adopt → measure
- Enterprise implementation architecture: sources → governed facts → decision layer → human approval → action → audit → outcomes
- Data-handling, confidentiality, and no-sensitive-data statement

### P1

- RachelOS technical architecture and operating model
- Before/after workflow examples
- Implementation acceptance/handoff checklist
- 30/60/90-day fractional-leadership plan
- Executive operating-review template
- Prior-authorization current/target-state pair
- AI-governance control model
- Reference availability or anonymized quotes where approved
- Case-study KPI framework: baseline, leading indicator, operational outcome, evidence boundary

## Final Verdict

An enterprise executive could reasonably accept an introductory call today because the site demonstrates rigorous thinking, responsible AI judgment, and direct product-building ability.

The site is not yet strong enough to independently support a $25K–$250K buying decision. The gap is not polish. It is proof of the enterprise delivery system around Todd: clear category and services, verified role/scale evidence, exact implementation responsibility, procurement readiness, coherent conversion paths, and a smaller number of complete pages.

Preserve the best idea already present: **start with the operating decision, make workflow and authority visible, and use AI only where it improves a governed business process.** Build the next version around that idea—but translate it into the language, evidence, and risk controls an executive buyer needs.
