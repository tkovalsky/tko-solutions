# TKO Website Buyer Credibility & Conversion Audit — Round 1

**Date:** 2026-07-02
**Method:** Full read of buyer-facing site content (homepage, hero, about, services ladder, prior-authorization specialization, selected work, insights, contact/intake, header, footer, content.ts) evaluated as a skeptical executive buyer with budget authority and no prior relationship.

---

## The One Finding That Frames Everything Else

**The site talks to itself about its own marketing strategy, in front of the buyer.** This is the single largest credibility problem, and it appears on nearly every page:

- The hero sidebar is literally titled **"Proof Ladder — Existing proof, ordered by credibility"** and ends with: *"The page moves from healthcare credibility to built-system proof to second-domain portability, then asks leaders to start with a fixed-scope recovery assessment."* That is a positioning memo shipped as customer-facing copy. A CIO reading it thinks: *I'm watching someone explain how they intend to persuade me.*
- Homepage section eyebrows: "Healthcare Credibility," "Proof Ladder / 1," "Proof Ladder / 2."
- The service page hero eyebrow renders the internal `entry` field — a buyer opening the Build page sees **"Downstream conversion offer"** as the page label. Fractional shows **"Post-diagnostic or post-build retainer."** These are funnel-stage annotations, not value propositions.
- Case study cards display "Featured proof," "Anonymized enterprise proof," "Internal proof" as their headline labels. "Primary conversion path" appears as a badge in the hero.
- The About page title is *"The category came after the operating work"* — a defense of a positioning decision no buyer knows was made.

An executive buyer never asks "is this proof ordered by credibility?" They ask "can this person fix my problem?" Every instance of self-referential strategy language reads as an early-stage founder workshopping positioning in public — which directly answers the Real Business Test below.

---

## 1. What Is Confusing

**Category jargon carries the whole site.** "Operational Knowledge Systems," "Human API," "decision layer," "operating layer," "operational truth," "governed next action" — an invented category plus invented vocabulary, with no plain-English on-ramp. The hero headline ("Operational Knowledge Systems for Complex Workflows") requires the buyer to already believe in a category that doesn't exist in their vocabulary. "Human API" is actually a good, sticky metaphor — but it's used before it's ever defined on most pages.

**Who is this for?** The site oscillates between "healthcare is the wedge" (footer, services page, intake question 1 assumes a *healthcare* workflow) and universal positioning (hero says "organizations," proof includes CRE and a relationship-driven business, an Industries page lists Financial Services, Technology, and PE). A hospital VP wonders if this is really a healthcare firm; a non-healthcare COO is told by the intake form question #1 that he's in the wrong place.

**What is RachelOS?** It's the flagship proof, but the case study describes "a relationship-driven business" with "100+ relationships" — anonymized to the point of vapor. A skeptical buyer suspects (correctly, it appears) that it's the founder's own internal tool. Presenting your own tool as your flagship client proof without saying so is the kind of thing that, once detected, poisons trust in everything else.

**Two overlapping entry offers.** Recovery Assessment vs. Truth Diagnostic — the distinction (1 week triage vs. 2–3 week evidence) is explained only in an FAQ. The hero offers both as parallel CTAs. Buyers don't want to diagnose which diagnostic they need.

**Navigation:** "Assessment" and "Services" as separate nav items is odd (the assessment is a service). "Selected Work" contains things that aren't client work. Insights exists but isn't in the nav. Industries page exists but is orphaned (later confirmed to be a redirect to Selected Work — see Round 2 correction).

## 2. What Is Missing

The most consequential gaps, in order:

1. **Todd's identity.** No last name anywhere on the buyer-facing site. No photo. No LinkedIn link. No bio with employers, titles, years, program scale. The About page describes "phases" of an unnamed person's career in category language. For **all four** target conversations — consulting, fractional, networking, recruiting — the buyer is being asked to trust a first name. This is disqualifying for the recruiting and networking goals and severely damaging for the other two.
2. **Any way to actually book a call.** The only CTA is a five-question essay intake. There is no calendar link, no email address, no phone, nothing in the footer.
3. **A single named client, testimonial, quote, or logo.** Every case study ends with a disclaimer that no names or metrics are published. One disclaimer reads as integrity; five in a row reads as "there are no clients."
4. **Any quantified outcome.** Outcomes are stated as "supported clearer review tiers" and "stronger governance" — activity descriptions, not results. Even anonymized ranges would change the read.
5. **Screenshots of RachelOS.** The flagship proof is a live software system and there is not one pixel of it on the site.
6. **What happens after you submit the form.** No response-time commitment, no description of the intro call, no "who you'll talk to."

## 3. What Reduces Trust

- The self-referential strategy language (covered above) — #1 by a wide margin.
- **Repeated defensive disclaimers.** "Operational outcomes are stated without inflated revenue claims or unverifiable metrics" appears, in variants, on every proof item. Preemptively defending against an accusation nobody made signals anxiety about proof, and draws attention to its absence.
- **Anonymization of the founder himself.** Anonymizing clients is normal. Anonymizing *yourself* is not — it reads as either an operating-under-the-radar side project (current employer?) or something to hide.
- **All four insights published the same day** (today's date). A dated content batch drop reads as AI-generated filler, not accumulated expertise.
- **The intake form's tone.** "The Assessment starts only when the workflow problem is concrete." "More detail is required." Qualifying hard is fine when you have deal flow; from an unknown solo brand it reads as arrogance the proof hasn't earned.
- **"Rung 1 / Rung 2" service framing** — buyers don't want to be told they're on a ladder designed to upsell them.
- Pricing up to **$150K builds and $25K/month retainers** next to zero named clients creates a proof-price mismatch.

## 4. What Pages Feel Unfinished

| Page | Why |
|---|---|
| **About** | No name, no photo, no history, no LinkedIn. Six abstract "phases" and a wall of credential *categories* with zero specifics. |
| **Selected Work index** | Sections that are just headers with no content beneath. |
| **CRE Intelligence Model case study** | Labeled "Internal proof," explains itself as "supporting proof, not a separate service line." |
| **Contact** | No fallback contact channel, no post-submit expectations. |
| **Industries** | Appeared orphaned from nav and contradicted the healthcare-wedge story (confirmed in Round 2 to redirect to Selected Work — a dead `IndustryPattern` component is never rendered). |
| **Insights** | Four posts, one datestamp, no author byline. |

## 5. What Proof Is Missing

- **Career proof:** employers (or at least "a top-5 national payer"), titles, years, team sizes, program budgets.
- **Artifact proof:** RachelOS screenshots, a sample redacted assessment deliverable, a sanitized workflow map or executive briefing excerpt.
- **Human proof:** even two or three attributed quotes would outperform all five anonymized case studies combined.
- **Scale proof:** every case study says "large program," "enterprise," "complex" — no numbers of any kind.

## 6. Unresolved Buyer Objections

1. Who is this person? — unanswerable from the site. Fatal.
2. Has anyone ever paid for these services? — never stated; absence implies zero.
3. Why not McKinsey/Accenture/a boutique healthcare firm? — never addressed, though the implicit answer is strong.
4. Why not hire an employee? — never addressed.
5. Is this person's day job something else? — the anonymity invites this question.
6. If I pay $8K, what do I physically receive? — deliverables named but never shown.
7. Is RachelOS a product I'd be buying, or proof of skill? — ambiguous throughout.

## 7. What Would Prevent Booking A Call

1. There is no "book a call" — only an essay-length qualification form with no human contact fallback.
2. No full name, so the standard LinkedIn diligence check is impossible.
3. No evidence anyone has paid.
4. The strategy-memo language makes the buyer feel like a conversion target, not a peer.
5. Form tone implies the buyer needs to prove worthiness of the founder's time.
6. No post-submit expectation.

## 8. What Should Be Added

1. A real About/founder section: full name, headshot, LinkedIn, concrete bio with scale facts.
2. A calendar link as the primary CTA.
3. RachelOS screenshots inside its case study.
4. A sample deliverable (one redacted page).
5. A "Why TKO instead of a big firm" block.
6. 2–3 attributed endorsements.
7. One number per case study.
8. An email address in the footer.

## 9. What Should Be Removed

1. All meta-marketing language ("Proof Ladder," "Primary conversion path," "Downstream conversion offer," "Rung 1," proof-level labels, self-narrating hero copy).
2. The CRE Intelligence case study from the homepage.
3. Repeated "no unverifiable metrics" disclaimers (keep one, methodology-level).
4. "Operational Knowledge Systems" as the hero headline — lead with the buyer's problem instead.
5. The Industries page in its current orphaned form (or clarify it).
6. Gatekeeping copy on the contact page.

## 10. Minimum Credibility Threshold

- **Paid consulting:** real identity + deliverable proof + one-click booking.
- **Fractional advisory:** all of the above + attributed endorsements (fractional is sold on personal trust).
- **Executive networking:** name + photo + LinkedIn + real bio.
- **Recruiting (Director/VP/CIO):** same, plus concrete career facts (scope, scale, titles).

One fix — real founder identity — unlocks all four goals, and it's the thing the site most deliberately withholds.

---

## Executive Recognition Test — Brutal Version

*Why trust Todd?* Can't — identity unknown.
*Why trust TKO?* Presented as a firm with no people, no clients, no address, no history.
*Why over a consulting firm?* Never argued (though the real answer is strong).
*Why over an employee?* Unaddressed.
*Why over doing nothing?* The problem framing (Human API dependency, transformation recovery) is the strongest writing on the site and would make a healthcare ops leader nod.

## Delivery Confidence Test

Evidence Todd has solved these problems before: three anonymized enterprise narratives with no scale, no dates, no employer class, no outcomes; one self-built tool with no screenshots; one internal exercise. The site creates confidence that Todd *understands* these problems but not that he has *delivered.*

## Engagement Clarity Test

Strong: published pricing, fixed durations, enumerated process/deliverables, FAQs, explicit scope exclusions. Weak: three overlapping front doors (Assessment / Diagnostic / PA Assessment), no clarity on what happens post-intake, no identity of who does the work.

## Authority & Searchability Test

Expertise signals strong (problem taxonomy, four substantive insights, defensible prior-auth niche). Authority signals nearly absent (no author identity, no bylines, no external validation, one-day publication history). The attribution layer is missing, not the content quality.

## Real Business Test

**B — an individual experimenting with consulting.** Tells: strategy vocabulary in customer copy, anonymized founder, zero client signals, same-day content batch, funnel-stage labels visible to buyers, prices without proof.

## Executive Attention Test

**10 seconds:** Competent dark hero, unclear offer, unclear audience, "Proof Ladder" sidebar is confusing.
**30 seconds:** Learn it's about knowledge trapped in people, healthcare-flavored, assessment offer — but the funnel-narration has created wariness.
**2 minutes:** Understand ladder, prices, Human API idea — still no name, no history, no clients, no deliverable sample, no easy way to call.

---

## Prioritization — 20-Hour Plan

### Top 5 Critical Fixes (~12 hours)
1. Strip all meta-marketing/funnel language sitewide (~3h)
2. Rebuild About as a real founder page (~4h)
3. Add a calendar booking link as primary CTA; soften intake tone; add post-submit expectations (~2h)
4. Add RachelOS screenshots + honest framing to its case study (~2h)
5. Rewrite hero headline to a plain problem statement; byline insights, stagger dates (~1h)

### Top 5 Important Fixes (~6 hours)
6. Add "Why TKO vs. a big firm / vs. an employee" section (~1h)
7. Publish one redacted sample deliverable page (~2h)
8. Collapse the front door to one primary entry offer (~1h)
9. Get and post 2–3 attributed endorsements (~1h)
10. Remove CRE from homepage; fix empty Selected Work section; resolve Industries page (~1h)

### Nice-to-Have
One number/scale marker per case study; more bylined prior-auth insights on a real cadence; a short "what the intro call covers" block; a downloadable PA assessment one-pager; LinkedIn/OG sharing polish.

---

## Final Verdict

**Probably No**, as a CIO/COO with budget, today. Not because the thinking is weak — the problem framing is among the best seen from a solo consultancy at this stage, and the fixed-scope, priced, deliverable-defined offers are exactly right. The site breaks the standard executive diligence loop (*name → LinkedIn → one proof point → book*) at step one, deliberately.

**Final buying decision:**
- *Hire Todd (employment/fractional)?* Can't evaluate — not on the site. Fix that and the underlying material is genuinely hireable at VP/Director level.
- *Hire TKO for a $5–8K assessment?* Maybe, via warm referral. Cold traffic will not convert.
- *Take a meeting?* Yes if a colleague vouched. No from the site alone.
- *Refer someone?* Not yet — referring lends personal credibility that can't be extended to an unverifiable party.

The gap between current state and credible is unusually small and unusually cheap: an identity reveal plus a copy pass, not a rebuild. Roughly 12 of the 20 hours (Critical Fixes 1–5) move the verdict from Probably No to Probably Yes for the consulting conversation, and from Impossible to Viable for networking and recruiting.
