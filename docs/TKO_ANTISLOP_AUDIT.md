# TKO Website — Anti-Slop Audit & Rewrite

Date: 2026-06-22
Lens: Skeptical executive buyer (COO / VP Ops / CIO) looking for reasons NOT to hire.
Optimization target: **increase the probability a qualified buyer books a call** — not better prose.

---

## Verdict first

The site is not full of AI slop. It was already cleaned once, and it shows — the language is disciplined and the narrative is internally consistent. **That is the trap.** It is a beautifully consistent essay about a *category* ("Operational Intelligence," "the missing layer between data and action") rather than a clear, purchasable *offer* with proof.

> **Interesting website ≠ Clear offer.**

A skeptical buyer with budget and no time does not fail to hire you because a sentence is generic. They fail because in 30 seconds they cannot answer: *what do you literally do, what does it cost, what do I get, and who have you done it for with a result.* The homepage answers a fourth question instead — "what is your theory of operations?" — which no buyer asked.

Three structural problems outrank every individual phrase:

1. **Category language where symptom language belongs.** The whole funnel leads with "Operational Intelligence," a term nobody searches and few buyers say out loud. The real, searched pains (AI pilot failed, work stalls between teams, CRM follow-up falling through, prior-auth burden) are buried or abstracted.
2. **The offer is hidden.** Price and timeline ($15K, 2–3 weeks) exist only on `/services/diagnostic`. The homepage — the page that decides the call — sells a concept, not a thing you can buy.
3. **The proof is hedged into nothing.** The strongest evidence on the site (a live system used daily; deep CMS prior-auth and care-management work) is wrapped in qualifiers — "Featured Proof," "Proof Governance," "Evidence is stated carefully," "metrics remain gated." To a skeptic, *advertising your caution about proof reads as not having proof.*

Fixing those three converts more calls than rewriting fifty sentences. The sentence-level findings below matter, but they are second.

---

## Phase 1 — Slop detection (with real quotes)

### Deliverable 1 — Top AI / category-jargon offenders

The dominant problem isn't classic buzzwords ("AI-powered," "next-generation") — those were already scrubbed. It's **abstract category jargon repeated until it's wallpaper**, plus a few tricolon tells.

1. `"Operational Intelligence"` — hero eyebrow ([hero.tsx:40](src/components/site/hero.tsx)). A category the buyer doesn't search and can't price.
2. `"The Missing Layer Between Data and Action"` — H1 ([hero.tsx:43](src/components/site/hero.tsx)). Evocative, but a COO can't tell what you sell from it.
3. `"TKO builds Operational Intelligence Systems"` — hero ([hero.tsx:48](src/components/site/hero.tsx)). Names a category you invented; buyer has no mental slot for it.
4. `"turn existing data into priorities, decisions, and action"` — repeated verbatim in [hero.tsx:50], [site.ts:5], [page.tsx:18], [page.tsx:40]. Tricolon + repetition: the #1 AI-cadence tell on the site.
5. `"what matters, who needs attention, and what should happen next"` — repeated in [hero.tsx:49], [page.tsx:52], [page.tsx:166], plus the About/CTA. A buyer who scrolls sees the **same sentence 4+ times** — the clearest "generated" signal here.
6. `"operational memory, priority surfacing, action queues, and human-approved AI"` — [page.tsx:71]. Feature-list jargon; means nothing to someone who hasn't seen the product.
7. `"AI is useful only when it is tied to workflow, decision rights, and human approval. It supports the system; it is not the category."` — [page.tsx:122]. Talking *about* AI positioning instead of showing a result.
8. `"Human-approved AI"` / `"human-in-the-loop AI"` — repeated as a tag in [hero.tsx:73], [content.ts], services. Good idea, worn out by repetition.
9. `"See What Matters / Know Who Needs Attention / Act With Confidence"` — [hero.tsx:8-24]. Could sit on any BI dashboard vendor's homepage unchanged → weak by your own test.
10. `"Operational Intelligence Systems for organizations that have data but need clearer priorities, decisions, and action."` — footer [footer.tsx:19]. Same triplet again.
11. `"The decision layer between data and action."` — [page.tsx:108]. The third restatement of the same abstraction in one scroll.
12. `"Operational Intelligence starts by asking better operating questions."` — [about page:81]. Category + platitude.
13. Metadata strings repeat "Operational Intelligence Systems that turn existing data into priorities, decisions, and action" across nearly every page's `<meta>` — concentrated keyword-stuffing of an unsearched term.

> Honest count: there are not 25 *distinct* AI-buzzword crimes — the site is cleaner than that. There are ~13 real offenders, and the worst ones are **repetition** and **uncoined category jargon**, not classic buzzwords. Padding to 25 would be its own kind of slop.

### Deliverable 2 — Consulting-slop offenders

1. `"Operator first. Technologist second."` — [founder.tsx:11]. Classic consultant self-label; every operator-founder says it.
2. `"The credibility is operational before it is technical."` — [about:66]. Abstract; states a posture, proves nothing.
3. `"The relevant credential is not generic consulting language."` — [about:67]. **Saying you're not generic is generic.** Don't narrate it; just be specific.
4. `"Experience in environments where decisions, workflows, and accountability matter."` — [about:66]. Every environment matters; says nothing.
5. `"Constrained, evidence-led work."` / `"avoid open-ended consulting drift"` — [service-template.tsx:69-71]. Meta-talk about how consulting works; insider framing, not buyer value.
6. `"Questions buyers should resolve before intake."` — [service-template.tsx:101]. Process-speak ("intake") that centers your funnel, not their problem.
7. `"Industry relevance is proven through shared operational complexity."` — [industries:58]. Abstract hand-wave in place of a named client or result.
8. `"TKO is organized around operational problems, not vertical sprawl."` — [industries:28]. Internal positioning logic the buyer doesn't care about.
9. `"The ladder is intentionally narrow."` / `"Engagement Logic"` — [services:35-37]. Explaining your taxonomy instead of the buyer's outcome.
10. `"Proof Governance" → "Evidence is stated carefully."` — [case-studies:34-36]. **The single most self-defeating block on the site** (see Proof Audit).
11. `"Authority content around executive operating pain."` — [insights:41]. Marketing-about-marketing; the buyer sees the scaffolding.
12. `"no empty article inventory is published"` / `"Articles are MDX-ready"` — [insights:43,77]. Tells the buyer the content doesn't exist yet. Implementation detail leaking onto a sales page.
13. `"The category architecture for future articles."` — [insights:48]. A page whose subject is *the plan to have content*.
14. `"What the engagement must make possible."` — [service-template.tsx:53]. Stilted; "Outcomes" should read like outcomes, not a thesis.
15. `"Data does not create decisions by itself."` — [page.tsx:165]. Borderline — fine as a line, but it's the 4th restatement of the same idea.

---

## Phase 2 — Proof extraction (what TKO has demonstrably done)

This is the gold, and it's underplayed. Only things that **exist today**:

**RachelOS (live, in daily use):**
- A real operating system used to run a relationship-driven business with **100+ relationships**.
- Captures relationship knowledge and preserves it beyond one person's head (institutional memory).
- Surfaces priorities and produces **action queues** — "who needs attention now."
- Generates **outreach drafts**; a human approves before anything is sent.
- Provides **one trusted next action** and **daily execution support**.
→ This is the rarest proof a solo can have: *a working system, not a slide.* It's currently described in category language ("Operational Intelligence System") instead of plain, concrete terms.

**Healthcare enterprise work (specific, credible):**
- **CMS prior authorization** workflow redesign into review tiers with escalation, auditability, exception handling, human approval.
- **Care-management modernization** across claims, eligibility, provider experience, clinical workflows, member operations.
- **Interoperability / data exchange** with access control, onboarding standardization, governance.
→ The *specificity* (CMS prior auth, care management, claims/eligibility) is itself strong proof of domain depth. It's buried under "anonymized enterprise proof" and undercut by hedging.

**Method that's repeated across domains:**
- The same `Signals → Memory → Facts → State → Priority → Human approval → Action` flow was applied in healthcare *and* in RachelOS. That's evidence of a repeatable capability, not a one-off.

---

## Phase 3 — Rewrite strategy (existing → why it fails → replacement)

**Homepage H1**
- *Existing:* "The Missing Layer Between Data and Action."
- *Why it fails:* Poetic category line; a COO can't tell what you do or buy.
- *Replacement:* **"You have the data. You still don't know who needs attention or what to do next. I build the system that tells you — in weeks."** (Sub: "I'm Todd — I diagnose where work stalls and ship a working decision system. RachelOS, below, runs on it every day.")

**Homepage subhead**
- *Existing:* "Most organizations collect information. Few can consistently turn that information into priorities, decisions, and action. TKO builds Operational Intelligence Systems…"
- *Why it fails:* Restates the abstraction; names an uncoined category; tricolon tell.
- *Replacement:* "Your dashboards show activity. Your CRM stores history. Neither tells you which account is about to slip or which case is stuck. I build the layer that does — and I've already built one that runs a 100-relationship business every day."

**Founder block**
- *Existing:* "Operator first. Technologist second." + "The credibility is operational before it is technical."
- *Why it fails:* Self-labels; proves nothing.
- *Replacement:* "I led prior-authorization and care-management modernization inside large healthcare organizations — work measured in claims processed and review cycles cut, not slides. Then I built RachelOS to prove the same approach ships outside the enterprise."

**Case-studies "Proof Governance"**
- *Existing:* "Evidence is stated carefully. RachelOS is framed as live operating proof. Enterprise healthcare examples are anonymized and avoid inflated or unverifiable metrics."
- *Why it fails:* Advertising caution about proof signals you lack proof. Buyers infer weakness.
- *Replacement:* **Delete the block.** Replace with one verifiable RachelOS metric and one concrete healthcare scope statement. Show proof; don't editorialize about how honest you're being.

**Services "Engagement Logic"**
- *Existing:* "The ladder is intentionally narrow… capabilities inside the Build. They are not separate products."
- *Why it fails:* Explains your taxonomy; buyer doesn't care.
- *Replacement:* "Three ways to work with me: a 2–3 week diagnostic ($15K) to find where work stalls; an 8–12 week build ($50–100K) to ship the fix; and a monthly advisor retainer to keep it sharp. Most start with the diagnostic."

**Insights page** — see Archive (Phase 5).

---

## Phase 4 — Executive test (per page, under 30 seconds)

| Page | VP Ops cares? | COO cares? | CIO cares? | Knows what you sell in 30s? |
| --- | --- | --- | --- | --- |
| Home | Maybe | Maybe | No | **No** — sells a concept, not an offer; no price, no client result above the fold |
| Services | Yes | Yes | Partial | **Partial** — offer is clear but framed as "rungs/ladder/logic," and price is one click away |
| Service detail (diagnostic) | Yes | Yes | Yes | **Yes** — price, timeline, deliverables present. The site's best page. |
| Case studies | Yes | Yes | Partial | **No** — leads with governance/caveats, not a result |
| Industries | Weak | Weak | No | **No** — abstract "same gap" framing, no named proof |
| About | Partial | Partial | Partial | **Partial** — credibility tags, but hedged and generic |
| Insights | No | No | No | **No** — it's a page about future content |

The pattern: **your detail pages are good and your top-of-funnel pages are abstract.** That's backwards — the homepage carries the most traffic and the least clarity.

---

## Phase 5 — Positioning consistency (does every page reinforce "TKO builds the decision layer between information and action"?)

| Page | Reinforces? | Action |
| --- | --- | --- |
| Home | Yes (too abstractly) | **Rewrite** — lead with symptom + offer + proof, not category |
| Services | Yes | **Rewrite light** — drop "ladder/logic" meta, surface price |
| Service detail pages | Yes | **Keep** — strongest pages; minor de-jargon |
| Case studies (index) | Diluted by caveats | **Rewrite** — kill Proof Governance, lead with result |
| RachelOS case study | Yes | **Keep + expand** — make it the visual proof hub |
| Healthcare case studies | Yes | **Rewrite** — replace "gated/pending" hedges with concrete scope |
| Industries | Diluted (abstract) | **Merge** into home/services as a short "where this shows up" strip; the standalone page adds abstraction, not proof |
| About | Partial | **Rewrite** — replace posture lines with specific lived work |
| Insights | **Dilutes** (advertises absent content) | **Archive** until ≥3 real articles exist; replace nav slot with the RachelOS case study |
| Contact | Neutral | **Keep** |

---

## Phase 6 — Revenue clarity test (can a buyer answer these in 30s?)

| Question | Homepage answer today | Gap |
| --- | --- | --- |
| What does TKO do? | "Builds Operational Intelligence Systems" | Unclear — undefined category. Needs plain verb: *diagnoses where work stalls and builds the system that fixes it.* |
| Who does TKO help? | Not stated above the fold | **Missing** — name the buyer (COO/ops leaders at PE-backed & health-tech mid-market). |
| What problem? | "missing layer between data and action" | Abstract — name the symptom (accounts slip, work stalls, AI pilot didn't land). |
| What proof? | "Featured Proof: RachelOS" with caveats | Present but hedged — surface 100+ relationships, daily use, one concrete healthcare scope. |
| What can I buy today? | Nothing priced above the fold | **Missing** — put "2–3 week diagnostic, from $15K" on the homepage. |

**3 of 5 answers are missing or abstract on the page that drives the call.** That is the revenue problem, stated precisely.

---

## Phase 7 — Search vs positioning analysis

| Using (category) | Should also use (symptom / searched) |
| --- | --- |
| "Operational Intelligence" | "AI project failed," "AI pilot didn't change anything" |
| "Decision layer / decision system" | "work stalls between teams," "operational bottlenecks" |
| "Operational memory" | "knowledge stuck in one person's head," "tribal knowledge" |
| "Priority surfacing / attention" | "accounts falling through the cracks," "CRM follow-up problems" |
| "Execution visibility" | "no visibility into what's on track," "portfolio operational reporting" |
| "Administrative burden" (good) | "prior authorization automation," "reduce prior auth workload" |
| "Operational Diagnostic" | "operations assessment," "where are we losing time" |

**Recommendation:** keep category language for the *in-room POV* (it's good for credibility once they're talking to you), but every headline, meta description, and the first article must be written in **symptom language**. Right now the meta descriptions repeat the category across every page — that's optimizing for a term with no search volume.

---

## Phase 8 — Moat verification (why choose TKO over Accenture/Deloitte/McKinsey/AI shops?) — using only repo evidence

A skeptic's honest read of what's *provable from the site*:

- **vs McKinsey/BCG/Deloitte:** They hand you a deck and a team of juniors. The repo shows TKO **shipped a working system (RachelOS) that runs daily** and personally led healthcare modernization. Differentiator that survives scrutiny: *one senior person designs AND builds, and can show the built thing running.*
- **vs Accenture/Cognizant/Slalom:** Staffed delivery at enterprise price/timeline. TKO offers a **2–3 week, $15K senior-led diagnostic** — too small and too senior for them to serve well.
- **vs AI consultancies:** They lead with the model. The repo leads with **the workflow and human approval**, backed by CMS-grade domain depth — credible to AI-skeptical buyers.
- **vs automation agencies:** They wire tools. The repo shows **decision logic, escalation tiers, governance** from real healthcare work — judgment, not connectors.

**Honest caveat the buyer will land on:** the moat is real but currently *under-evidenced* on the page. The RachelOS metric is soft (100+ relationships, no outcome figure) and the healthcare results are gated. The moat exists; the site half-hides it. Strengthening one verifiable RachelOS outcome and one concrete (even anonymized) healthcare result is the highest-value credibility work available.

---

## Phase 9 — Offer visibility audit

| Offer | Findable? | Understandable? | Buyable? | Gap |
| --- | --- | --- | --- | --- |
| Operational Diagnostic | Yes (nav + cards) | Yes | Yes (price, timeline, CTA) | Price not surfaced on homepage; CTA "Schedule an Operational Diagnostic" assumes the buyer already wants one |
| Operating System Build | Yes | Mostly | Partial | Deliberately not cold-buyable; fine — but make the "starts with a diagnostic" path explicit, not a gate that feels like a wall |
| Fractional Advisor | Yes | Yes | Partial | Fine |
| **Healthcare Transformation Recovery Diagnostic** | **No** | — | — | **This offer does not exist on the current site.** It was removed in the rebuild ("transformation recovery" language was stripped). Given healthcare is the credibility wedge, the *absence* of a healthcare-specific entry offer is a real gap — a generic "Operational Diagnostic" throws away the founder's strongest door-opener. **Recommend adding a healthcare-framed diagnostic variant.** |

**Biggest offer problem:** the CTA everywhere is "Schedule an Operational Diagnostic." That's a *commitment-level* ask aimed at a buyer who hasn't been convinced yet. Add a lower-friction primary CTA ("See how RachelOS works" → 90-second proof, or "Book a 20-min operations call"). Reserve "Schedule a Diagnostic" for buyers who've seen proof.

---

## Phase 10 — RachelOS proof audit

**Surface (make prominent):**
- It is **live and used daily** to run a real business — the single most persuasive fact you own.
- **100+ relationships** under management; one trusted next action each day.
- **Human approves AI outreach** before send — concrete answer to "can I trust the AI?"
- The before/after: knowledge trapped in one head → durable system memory.

**Hide / stop saying:**
- The category wrapper "Operational Intelligence System" *as the lead* — describe what it *does* in plain words first, name the category second.
- Any "evidence stated carefully / metrics gated" hedging around it.

**Make a case study (expand the existing one):** a visual walkthrough — Signal captured → Memory → Priority surfaced → Recommended action → Human approval → Outcome. Real (anonymized) screens beat prose.

**Make visual diagrams:** the Signals→Action flow as an annotated product screenshot sequence, not the abstract stage list currently on the homepage.

**Make homepage proof:** one RachelOS screenshot + one hard line ("Runs a 100-relationship business every day; every AI message is human-approved before send") above the fold. That single change does more for conversion than any copy edit.

Goal is not to sell RachelOS. It's to make a skeptic believe **TKO ships working decision systems** — because here is one, running.

---

## Deliverables summary

1. **Top AI slop:** ~13 real offenders, dominated by *repetition* of "priorities, decisions, and action" / "what matters, who needs attention, what's next" and the uncoined category "Operational Intelligence." (Not 25 — padding would be dishonest.)
2. **Top consulting slop:** 15 offenders, worst = "Proof Governance / Evidence is stated carefully," "The relevant credential is not generic consulting language," and the "ladder/logic/intake" meta-talk.
3. **Homepage rewrites:** lead with symptom + plain offer + RachelOS proof above the fold; kill the triple-restated abstraction; put price on the page. (Copy provided in Phase 3.)
4. **Services rewrites:** drop "ladder/engagement logic" meta; surface price/timeline as the first thing; soften the "can't buy this cold" gates into a path.
5. **Case-study rewrites:** delete Proof Governance; lead each study with a concrete result/scope; replace "gated/pending" hedges with specific (anonymized) facts.
6. **Archive:** Insights (until ≥3 real articles); Industries (merge into home/services as a short strip).
7. **Delete:** the "Proof Governance" section; the "MDX Architecture / no empty article inventory" section; repeated metadata boilerplate.
8. **Hidden proof to surface:** RachelOS is *live and daily* with 100+ relationships and human-approved AI; CMS prior-auth + care-management + interoperability domain depth.
9. **Strongest buyer-facing narrative:** *"You have the data. You still don't know who needs attention or what to do next. I'm a senior operator who diagnoses where work stalls and ships the system that fixes it — in weeks. Here's RachelOS, running every day, as proof."*
10. **Standard wording across the site:**
   - Replace "Operational Intelligence System(s)" *as the lead* with "the system that tells you who needs attention and what to do next" (category as the second sentence, not the first).
   - Stop repeating "priorities, decisions, and action" — say it once.
   - Every page states: who it's for, the symptom, the offer, the price/next step.
   - Primary CTA tiered: proof-first ("See how RachelOS works" / "Book a 20-min call") before commitment ("Schedule a Diagnostic").
   - Never advertise caution about evidence — show the evidence.

---

## The one instruction that overrides the rest

> Do not optimize for better copy. Optimize for the probability that a qualified buyer books a call.

By that test, the priority order is:
1. **Put a purchasable offer + one RachelOS proof point above the homepage fold** (clarity + proof).
2. **Replace category headlines with symptom headlines** (so the right buyer self-identifies).
3. **Delete the hedging** (Proof Governance, gated-metrics language) that makes a skeptic distrust you.
4. **Tier the CTA** so unconvinced buyers have a low-friction next step.
5. *Then* fix sentences.

The site is well-built and honest. Its problem is that it explains a category to people who are trying to buy a result. Make it more **believable and more obviously purchasable** — not smarter.
