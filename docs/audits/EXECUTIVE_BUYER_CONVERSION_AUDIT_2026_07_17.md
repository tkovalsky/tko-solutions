# Executive Buyer Conversion Audit — 2026-07-17

Reviewer persona: skeptical Fortune 500 / healthcare / operations executive with budget authority, ~10 minutes, evaluating whether to hire TKO Consulting.
Source of truth: the implementation in this repository (routes, components, content data, proof assets), not aspirational docs.

---

## Phase 1 — First Impression (first 30 seconds)

**What Todd does:** Clear within 10 seconds. "Strategy that gets implemented—not shelved," with a four-stage ladder (Strategy → Operating Model → Product → Implementation). The positioning line is one of the best things on the site.

**Who he helps:** Stated ("healthcare and enterprise leaders") but not demonstrated. The hero's proof panel is RachelOS — a South Florida residential real-estate system. A healthcare VP's first cognitive event is a mismatch: *the headline says healthcare enterprise, the evidence says solo real-estate operator.*

**Outcomes:** Framed as capabilities ("prioritized work, human-governed AI"), not business outcomes. The only quantified outcomes on the site are three closed real-estate transactions and a 2.2% email reply rate — one is tiny, the other is a failure metric being used (admirably) as an honesty signal.

**Immediately clear:** the model, the services, the prices, the philosophy.
**Unclear:** who has ever paid TKO as a client, what Todd's actual career was, why real-estate proof transfers to my P&L.
**Creates confidence:** transparent pricing, real product screenshots, unusually disciplined claims.
**Creates doubt:** zero client evidence, zero named history, proof from an unrelated industry, dead links (see Phase 7).

---

## Phase 2 — Credibility Audit

**Verdict: Todd has clearly done the work. The site refuses to prove it.**

Evidence he has done the work:
- The healthcare content is written by someone who has lived it. Prior authorization framed as a decision-rights problem, Gold Card readiness as an operating-quality signal, program recovery as "the decision between workstreams" — consultants who haven't run these programs don't write with this specificity.
- RachelOS is real: 5 production screenshots, 1,528 single-author commits, 67 migrations, 1,341 tests, 83 logged architecture decisions, published limitations (dormant features, bus factor of one, 2.2% reply rate). This is a level of self-audit almost no consultancy publishes.
- The claim-boundary discipline (observed / implemented / measured / validated / hypothesis) is itself a credential — it demonstrates exactly the governance thinking the services sell.

Evidence withheld:
- **No employer names, no titles, no dates, no program scale, anywhere.** The Founder Proof Hub says it outright: "The timeline is intentionally capability-based until founder-approved titles, dates, role boundaries… are added." An executive reads that as: *the resume is not available.* At diligence stage this is disqualifying, because I cannot forward this site to my chief of staff and have it survive a background sniff test.
- No LinkedIn link renders unless an env var is set. No photo. No voice. No third party of any kind — no testimonial, no reference offer, no logo, no co-presenter, no publication.
- The anonymized healthcare case studies carry no scale markers (no "$XXM program," no "N-state payer," no member counts, no team size). Anonymization is fine; dimensionless anonymization is indistinguishable from fiction.

Net: he sounds like someone who did the work describing it from behind a curtain. The curtain, not the work, is the problem.

---

## Phase 3 — Storytelling Audit

The site *has* a coherent story — better than most consulting sites:
problem (strategy dies between decision and execution) → intervention (operating model + product + implementation, human-governed AI) → proof (RachelOS) → services (assessment → diagnostic → build → fractional).

**Narrative gaps:**

1. **The transfer argument is asserted, never told.** Why does a real-estate system prove healthcare capability? The delivery-model case study contains the answer (the method is the product; the governance transfers, the software doesn't) but the homepage and healthcare pages never walk the buyer across that bridge explicitly. It needs one section: "You are not buying RachelOS. You are buying the method that built and audited it — here is that method applied to prior auth."
2. **There is no Todd story.** Where he worked, what he ran, why he left, why TKO exists. The founder content is a taxonomy of epistemics (what I built / owned / got wrong / claim boundaries) with no career arc. Executives buy people; the person is structurally absent.
3. **Three overlapping self-pages** (/about, /founder, /proof/founder) tell the same story with different section schemes. Each dilutes the others; none is definitive.
4. **The site narrates its own evidence methodology more than the buyer's problem.** "Claim boundary," "evidence ladder," "proof registry" appear on nearly every page. One page of method builds trust; ten pages of method reads as a site about itself.
5. **"Rachel" is never explained.** A named system with an unexplained name invites the exact question the site doesn't answer: who is the client here? (If the answer is "a family member's business," say so — it's more credible named than implied.)

---

## Phase 4 — Proof Audit

**Strongest proof (in order):**
1. The RachelOS delivery-model case study (`rachelos-delivery-model`) — repo-verified stats, production snapshot dated 2026-07-11, published failures, FAQ that answers hostile questions ("Where is the revenue proof?" "There isn't one, and this case study says so"). This is the best single asset on the site.
2. The five product screenshots (queue, memory, approval, health, today-work) — real surfaces, honestly redacted.
3. Transparent pricing with durations and entry conditions ("Build cannot be bought cold") — reads like an operator, not a brochure.
4. The frameworks with explicit claim boundaries and mermaid decision models.

**Weakest proof:**
1. Healthcare: all experience-based, no scale, no dates, no artifacts. The claim "Anonymized enterprise proof" over case studies with no dimensions is a label the content doesn't earn.
2. The Founder Proof Hub ships four **empty sections** — "Executive timeline," "Experience atlas," "Capability atlas" are headers with no body, and the Download Center says tools "will appear here after human approval." Publishing IOUs on a page named *Proof* actively damages trust.
3. /diagrams is database-gated (`force-dynamic`, published-assets only) and, when empty, renders "Publication review in progress" — a footer-linked page that can 404-in-spirit.
4. Three closed transactions as the only commercial outcome, correctly bounded, but bounded so hard it stops functioning as proof.

**Unsupported claims:** almost none — the site's claim discipline is genuinely rigorous. The gap is inverted: claims that *could* be supported (career history, program scale) are simply missing.

---

## Phase 5 — Buyer Journey Audit

What the site answers well: engagement model (four rungs, prices, durations, process steps, deliverables, FAQs, exclusions), what's not included, where AI fits, how engagements sequence.

**Questions that remain unanswered — each one a stall point:**
- **Has anyone ever hired TKO?** The site's honest reading is: the only completed engagement is the founder's own build. No client, no reference, no testimonial. This is the single largest gap.
- Who delivers? Is TKO one person? What happens if Todd is unavailable (the site publishes RachelOS's bus factor of one but not TKO's)?
- Security/compliance posture for assessments: will he sign a BAA? How is PHI-adjacent artifact review handled? For a healthcare buyer this is a gating question the site never touches.
- References: no mechanism to request one.
- Ownership: who owns the deliverables, the operating models, any code?
- Logistics: remote/onsite, time zones, how he works alongside an existing SI or vendor.
- **Contact:** the only path is a form with five required essay questions before any conversation. No email address, no phone, no calendar link. An executive with 10 minutes does not write five essays to get a reply "within two business days." The intake philosophy is defensible; making it the *only* door is a conversion wall.

---

## Phase 6 — Content Audit

**Builds trust:** delivery-model narrative and FAQ; service exclusions and "not for" lists; "What I Got Wrong"; pricing; healthcare frameworks; the 2.2% disclosure.

**Feels generic/repetitive:** the same sentence machine runs on every page — "Bring the workflow under pressure," "operating problem," "claim boundary," "evidence-led," "one accountable path." Near-identical CTA bands close every page. Card grid → SectionHeader → CTA band, twelve times.

**Sounds AI-generated:** the uniform cadence, abstract-noun density ("deterministic capture," "intelligence visibility," "governed next action"), and total absence of concrete human detail (a date, a city, a meeting that went badly, a person's reaction) give large sections a synthetic texture. Ironically, the most AI-assisted artifact (the delivery case study) reads the most human, because it contains numbers, mistakes, and specifics.

**Executive-grade:** pricing tables, process/deliverables lists, the delivery snapshot stat block, framework claim boundaries.

**Content ranked by buyer value:** 1) rachelos-delivery-model case study, 2) services pages with pricing, 3) prior-auth frameworks/insights, 4) RachelOS proof page, 5) about page credibility ladder, 6) homepage, 7) healthcare hub, 8) selected-work healthcare studies (undimensioned), 9) founder taxonomy pages, 10) proof/founder hub (net negative while sections are empty).

---

## Phase 7 — UX Audit

**Works:** clean 7-item header, sticky nav, persistent CTA button, consistent design system, readable typography, sensible mobile nav, fast scanning via card grids.

**Problems, in order of severity:**

1. **Broken internal links (implementation-verified, all 404):**
   - `/services/enterprise-ai` — linked from the Healthcare hub ("Explore AI delivery assessment"), the AI-governance framework, and search clusters.
   - `/services/recovery` — linked from program-recovery and executive-operating-system frameworks.
   - `/services/fractional-leadership` — linked from the executive-operating-system framework.
   A buyer clicking "Explore AI delivery assessment" from the flagship healthcare page hits a 404. For a firm selling implementation reliability, this is self-refuting.
2. **Taxonomy overload:** Problems, Proof, Frameworks, Diagrams, Guides, Selected Work, Founder, About, Offers, Assessment — ten content types for one person's practice. The buyer's model needs three: What you do, Proof, Who you are.
3. **Selected Work is homeless** — referenced by hero, CTAs, and case studies, but absent from the header nav.
4. `relatedService` labels on case studies name services that don't exist ("Decision Layer Build Sprint," "AI Delivery Assessment") — stale taxonomy showing through.
5. /about vs /founder vs /proof/founder — three destinations for "who is this person," none canonical.
6. Footer links to /diagrams, which can render an empty "publication review in progress" state.
7. Contact page friction (see Phase 5) — and the CTA label "Discuss an Active Initiative" is stiff and vaguely self-important; "Book a working session" or "Talk to Todd" converts better.
8. `/offers/*` and `/tif/*` routes exist as semi-orphaned surfaces; if TIF is internal, it should not be discoverable from public link graphs.

---

## Phase 8 — Diagram Audit

**Existing diagrams:** five mermaid flowcharts inside frameworks (prior-auth decision model, Gold Card readiness, program recovery, executive operating system, AI governance). All are clean linear chains — they clarify, none confuse, but none rise to "executive-ready": they are sentence diagrams, not decision tools. The /diagrams library is DB-gated and effectively empty from a buyer's perspective.

**Missing diagrams (ranked by executive impact):** see Top 10 list below. The single most valuable missing visual is the **engagement path**: Assessment ($5–8K, 1 wk) → Diagnostic ($15–30K, 2–3 wks) → Build ($45–150K, 6–12 wks) → Fractional ($12–25K/mo), with decision gates between rungs. All of the data exists in `content.ts`; it is currently prose.

---

## Phase 9 — Conversion Audit

**What is preventing a buyer from contacting Todd, ranked by impact:**

1. **No external client evidence.** The site proves Todd built one governed system for his own operation. It contains no evidence anyone has ever engaged TKO. (Proof gap — fatal for large engagements, survivable for the $5–8K assessment.)
2. **Anonymous career.** No employers, titles, dates, or program scale; the site admits the timeline is withheld. (Trust gap.)
3. **Proof–market mismatch unbridged.** Real-estate proof for healthcare buyers, with the transfer argument buried in one long case study. (Narrative gap.)
4. **Contact wall.** Five required essays, no email, no calendar, 2-day response promise. (UX gap.)
5. **Broken links + empty proof sections** on exactly the pages a diligent buyer visits. (Trust gap.)
6. **No human presence** — no photo, no video, no voice, no LinkedIn. (Trust gap.)
7. **Insider-language tax** — "human API," "claim boundary," "system of action," "TIF" require the buyer to learn a private vocabulary before evaluating the offer. (Positioning gap.)
8. **Three duplicative founder pages** diffusing the credibility budget. (UX/narrative gap.)
9. **Repetition** creating an AI-authored texture that quietly undermines the "human judgment" brand promise. (Content gap.)
10. **Outcome framing absent** — everything is described as mechanism; almost nothing as money, time, or risk avoided. (Positioning gap.)

---

# Deliverables

## Top 10 Trust Improvements (by executive impact)

1. Publish a real career timeline: employers (or bounded descriptors: "top-5 national payer"), titles, years, program scale. The site already has the claim-boundary machinery to do this honestly.
2. Get one external engagement and publish it — even a discounted pilot assessment with a named or well-bounded client and a two-line attributed quote. One is infinitely more than zero.
3. Add a photo and a LinkedIn link (hardcode it; it's currently env-var gated).
4. Fix the three broken service links sitewide (`enterprise-ai`, `recovery`, `fractional-leadership` → existing routes).
5. Remove or complete the four empty Founder Proof Hub sections; never publish IOUs on a page named Proof.
6. Add dimensions to the healthcare case studies: program budget band, member/claim volume band, team count, duration.
7. Offer references on request ("References available after a working session") — costs nothing, signals everything.
8. Answer the solo-practice question directly: who delivers, capacity, continuity. The site audits RachelOS's bus factor; audit TKO's.
9. Add a security/compliance answer for healthcare buyers (BAA willingness, artifact-handling practice, no-PHI assessment design).
10. State who Rachel is / what the operating business is, in one sentence. Unexplained names read as concealment.

## Top 10 Proof Improvements (by executive impact)

1. Elevate the delivery-model case study — it is the best asset and is buried at `/selected-work/rachelos-delivery-model`; the homepage proof strip should point at it, not just at screenshots.
2. Create the "method transfer" proof page: RachelOS governance pattern → prior-auth workflow, side by side. This converts real-estate proof into healthcare-relevant proof.
3. Publish the promised downloads (decision-rights checklist, exception-routing ladder, operating-review one-pager). Three PDFs turn claims into artifacts.
4. Add a 2–3 minute screen-recorded walkthrough of RachelOS (queue → approval → health). Video of a running system outproves screenshots.
5. Dimension the healthcare work (bands, not names — see Trust #6).
6. Publish one sample deliverable: a redacted executive briefing from the Assessment format. Buyers of a $5–8K assessment want to see the artifact they're buying.
7. Ship the diagram library with 5 seeded diagrams or unlink it until it exists.
8. Add the production snapshot stat block (152 leads, 77 approved sends, 927 facts…) to /proof/rachelos — it currently lives only inside one case study.
9. Show the 83-decision architecture log excerpt (5 real entries, including one "decision against building") as an inspectable artifact.
10. Convert "three closed transactions" from a defensive footnote into a bounded mini-story (what the system surfaced, what the human did, what closed).

## Top 10 Storytelling Improvements (by executive impact)

1. Write the founder narrative: 10 sentences, first person, concrete — where he operated, what he ran, why TKO exists. Put it at the top of /about.
2. Merge /about, /founder, /proof/founder into one canonical founder page with anchors; redirect the others.
3. Tell the transfer story on the homepage: "The proof is real estate. The product is the method. Here's why that matters for your prior-auth queue."
4. Lead every page with the buyer's problem, not TKO's epistemology; move claim-boundary language to a single "How we make claims" page linked from footers.
5. Reframe outcomes in executive units — decisions unblocked, cycle time, rework avoided, capacity recovered — even where bounded ("in RachelOS's context, X").
6. Replace repeated CTA-band copy with page-specific next steps (healthcare page → PA assessment; proof page → sample briefing).
7. Add one concrete anecdote per framework (a real meeting, a real denial pattern, anonymized) to break the abstract cadence.
8. Translate insider vocabulary on first use ("human API — the person who is the integration layer between your systems").
9. Give the four-rung service ladder a named journey ("Week 1: know the constraint. Week 4: know the plan. Quarter 2: system in production.").
10. End the healthcare hub with a point of view, not a taxonomy — one strong argued claim ("Prior auth is a decision-rights problem; automation without it makes inconsistency faster") as the page's spine.

## Top 10 UX Improvements (by executive impact)

1. Fix the three broken links (also listed under Trust — it belongs on both lists).
2. Lower the contact wall: add a direct email and a calendar link beside the form; make the five questions optional-but-encouraged.
3. Add "Selected Work" to the header nav (or merge it into Proof) — it is the most-CTA'd destination on the site and is unreachable from the nav.
4. Collapse the ten content taxonomies into three nav concepts: Services, Proof (work + frameworks + diagrams + guides), About.
5. Consolidate the three founder pages (also a storytelling item; the UX symptom is route confusion).
6. Remove /diagrams from the footer until it has content; remove or gate /tif/* from public discovery.
7. Fix stale `relatedService` labels on case studies to point at real services.
8. Rename the CTA: "Discuss an Active Initiative" → something a human says.
9. Add a persistent, one-line engagement summary near every CTA ("Starts with a $5–8K, one-week assessment") so the ask is always concrete and low-risk.
10. Add breadcrumbs or a section landmark on deep pages (frameworks/insights/selected-work) — executives arrive mid-site from shares and need to know where they are.

## Top 10 Diagram Opportunities (by executive impact)

1. **Engagement path with gates:** Assessment → Diagnostic → Build → Fractional, with price/duration/decision gates. Data already exists in `content.ts`.
2. **The gap diagram:** where transformation stalls — executive decision → operating model → system → daily work, with the failure zone highlighted. This is the firm's thesis; it is currently only prose.
3. **RachelOS governance architecture:** signals → memory → facts → state → priority → human approval → action, annotated with the actual controls (fact immutability, approval-gated sends). Exists as a word chain; should be the flagship visual.
4. **Method transfer map:** RachelOS pattern on the left, prior-auth/care-management instantiation on the right.
5. **Decision-rights matrix example:** a filled-in (fictionalized) matrix from the workshop offer — shows the deliverable.
6. **Prior-auth exception ladder:** routine vs. exception routing with authority tiers — upgrade of the existing linear mermaid.
7. **Before/after operating review:** status-meeting agenda vs. decision-centered agenda side by side.
8. **Credibility ladder as a visual** (observed → implemented → measured → validated → hypothesis) — currently a table; it's the brand's signature idea.
9. **Program-recovery constraint register:** one annotated example row from signal to owner to review date.
10. **The ten-month delivery timeline:** commits/decisions/incidents over time for RachelOS — turns the stat block into a story.

---

# Final Question — Would you hire Todd?

## MAYBE

**What earns the maybe (and would earn a meeting):** The thinking is unmistakably real. The healthcare framing (decision rights, exception routing, Gold Card as an operating-quality output) reads like lived experience. The claim discipline — publishing the 2.2% reply rate, the bus factor, the dormant features, the decisions *against* building — is the strongest trust signal on the site and is exactly the governance instinct I'd want near an AI initiative. Pricing and engagement structure are transparent and operator-shaped. For a bounded $5–8K assessment, the downside is small and I might take the meeting.

**What blocks YES — the missing evidence, exactly:**

1. **Any evidence of an external client.** The site currently proves one thing: Todd built and governs one system for his own operation. Nothing shows TKO has ever been hired, delivered, or been worth re-hiring. One reference-able engagement changes this verdict more than everything else combined.
2. **A verifiable career.** No employers, titles, dates, or program scale — and the site says the timeline is deliberately withheld. I cannot sponsor an unknown internally; my recommendation has to survive other people's diligence.
3. **A bridged proof gap.** Until the site explicitly argues why a South Florida real-estate system de-risks a payer's prior-auth program, the flagship proof works against the healthcare positioning.
4. **Basic operational reliability of the storefront:** three broken service links and empty "Proof" sections contradict the core promise of a firm that says implementation is where it stays accountable.
5. **A door I'd walk through:** a direct email or calendar link. I will not write five essays to start a conversation.

Fix 4 and 5 this week; 3 with one page; 2 with one honest timeline; 1 with one pilot client. The underlying substance is strong enough that the gap between MAYBE and YES is almost entirely disclosure and finish, not capability.
