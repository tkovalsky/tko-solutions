# TKO Solutions — Positioning, Content & Market-Entry Strategy

Date: 2026-06-22
Author: Positioning / GTM audit
Status: Decision document

---

## 0. The one-sentence answer (read this first)

**TKO is in the business of building the decision layer between an organization's data and its action — diagnosing where work stalls and shipping a working system that says who needs attention and what to do next.**

Not advice. Not dashboards. Not software-as-a-product. The deliverable is *a working decision system plus the judgment to design it*. That duality — senior operator who both **designs and ships** — is the entire moat. Everything below defends and operationalizes that sentence.

The current website already lands near here ("The Missing Layer Between Data and Action," Operational Intelligence Systems). That instinct is correct. The problem is not the positioning *idea* — it is that the category is too abstract to be a customer-acquisition channel, and the revenue wedge has not been narrowed to a buyer with a budget and a deadline. This document fixes that.

---

## 1. What TKO actually does (ignoring branding, names, copy)

Strip the product names away and look at the four bodies of work:

| Work | Underlying capability demonstrated |
| --- | --- |
| Healthcare enterprise transformation | Decomposing messy, cross-functional, high-stakes work into decision tiers, dependencies, escalation, and human-approved workflow — at enterprise scale, under regulatory pressure. |
| Rachel Delray / RachelOS | Turning fragmented relationship signals into *one trusted next action*, with operational memory and human-approved AI. A shipped, live decision system. |
| Intelligence Reporting platform | Turning raw entity data into a structured pipeline — Facts → Observations → Insights → Recommendations → Asset. A repeatable "intelligence factory." |
| Consulting / program / product ownership | Owning outcomes across teams: not just recommending, but defining what gets built and making it land. |

**The recurring theme across all four is identical:** *fragmented signals → governed facts → current state → priority → human-approved next action → measured outcome.* That is the `Signals → Memory → Facts → State → Priority → Human Approval → Action` flow already encoded in `src/lib/content.ts`. TKO has independently arrived at the same primitive in healthcare, in real estate, and in reporting. **That is not a coincidence — it is the actual product.**

So the underlying capability is not "AI," not "automation," not "consulting." It is **decision-system design and build**: the connective layer most organizations are missing between the tools they already own and the actions they need to take.

---

## 2. What TKO should NOT be (positioning traps)

| Trap | Why it fails for a solo operator |
| --- | --- |
| **"AI consultancy"** | The single most commoditized label of the moment. Every freelancer, agency, and Big 4 firm claims it. Buyers are fatigued and skeptical (most AI pilots failed). It invites price compression and "show me your model" conversations TKO will lose on scale. AI is an *ingredient* in TKO's work, never the headline. |
| **"Workflow automation agency"** | Reads as "Zapier/Make/n8n implementer." Low price ceiling ($2–10K projects), race to the bottom, buyer expects tooling not judgment. Discards the enterprise-transformation credibility entirely. |
| **"Digital transformation"** | Owned by Accenture/Deloitte/Cognizant. Generic, undifferentiated, and uncredible from a solo. A category you cannot win. |
| **Generic management consulting** | Competes directly with McKinsey/BCG/Slalom on a field where brand and scale decide. No wedge. |
| **SaaS company** | Founder has explicitly rejected it, and rightly: user mgmt, billing, support, onboarding, and ops are exactly the work the founder does not want. SaaS also demands capital and a 18–36 month runway to revenue. Off the table. |
| **"Operational Intelligence" as a *search/acquisition* term** | This is the subtle one. OI is a strong *umbrella* and a strong thing to *say in the room* — but almost nobody types "operational intelligence consultancy" into Google. Leading acquisition with an uncoined category means buying expensive market education you can't afford. Keep OI as the umbrella; acquire customers through *symptom* and *vertical* language (Section 6). |

**Net:** TKO must avoid every position where scale, brand, or commodity pricing decides the winner, and every position that throws away the enterprise + shipped-product proof.

---

## 3. Recommended market position

- **Primary positioning:** *The operator who builds your decision layer.* TKO designs and ships the system that turns the data you already have into "who needs attention now and what happens next" — in weeks, not quarters, with you in control of the AI.
- **Secondary positioning:** *Senior, hands-on operational diagnostics and fractional advisory* for leaders who need execution visibility without hiring a firm or a full-time exec.
- **Umbrella category (what you say in the room):** Operational Intelligence — "the missing layer between data and action." Keep it. It frames the work; it does not acquire the customer.
- **Go-to-market wedge (what actually sells in 90 days):** Use a *symptom + vertical* entry, not the category. The beachhead is **healthcare / health-tech operations** (where credibility is deepest) plus **PE-backed mid-market companies** (where the budget and urgency are highest).

### Ideal Customer Profiles (ranked by revenue realism)

1. **PE operating partners & portfolio-company COOs** — highest budget, clearest urgency, value-creation mandate, comfortable paying for senior outside operators. *Primary revenue ICP.*
2. **Mid-market healthcare / health-tech operations & product leaders** — TKO's deepest credibility; warm-network reachable; real budgets; pain in administrative burden, prior auth, care ops, AI adoption. *Primary credibility ICP.*
3. **Scaling founder-led / relationship-driven businesses** (the RachelOS analog: advisory, real estate, professional services) — lower budgets, but the cleanest proof story and fastest to close from network. *Use for proof and first-dollar, not as the core revenue engine.*

### Business problems TKO solves
"We have data/CRMs/dashboards but still miss things." · "Our AI pilot didn't change how anyone works." · "Work stalls between teams and no one sees it until it's late." · "Our best person's knowledge isn't in any system." · "We can't see, across the portfolio, what's actually on track." · "We're scaling but margins aren't."

### Executive buyers
COO · VP/Head of Operations · Chief of Staff · PE Operating Partner · VP Customer Success / RevOps · Head of Transformation. Director-and-above economic authority; six-figure decision rights without board sign-off.

### Buying triggers (where to aim outreach and content)
- New ops/transformation leader in the first 90 days (wants a fast, credible read).
- Post-acquisition or post-merger integration.
- A failed or stalled AI initiative the board is asking about.
- A botched or underused CRM/system rollout.
- Revenue growing but margins/throughput flat (operational leverage pressure).
- Board/PE pressure on a specific operational KPI.

---

## 4. Competitive reality — where TKO wins and where it must not compete

| Competitor class | Where TKO loses (avoid) | Where TKO wins |
| --- | --- | --- |
| Accenture / Deloitte / Cognizant | Large multi-year programs, RFPs, enterprise procurement | Too slow/expensive/junior-staffed for a $15–100K, weeks-long, senior-led decision-system build |
| McKinsey / BCG / Bain | Board-level strategy, brand-decided mandates | They deliver a deck and leave; **TKO ships the working system** |
| Slalom / regional consultancies | Staffed delivery teams, platform implementations | Senior operator does the work personally; no bench markup |
| Boutique AI consultancies | "We fine-tune models / build RAG" | TKO leads with the *operating problem and the workflow*, with AI subordinate and human-approved — credible to skeptical buyers |
| Workflow automation agencies | Cheap tool wiring | TKO brings decision logic, governance, and enterprise judgment, not just connectors |
| SaaS vendors | Owning the data layer / generic product | TKO builds the *bespoke decision layer on top of* tools the buyer already owns |

**Where expertise & proof beat scale:** the $15K–$150K band, weeks-long, senior-led, outcome-specific engagements where the buyer wants *one accountable expert who will both diagnose and build*, not a staffed program. That band is too small for the big firms to serve well and too senior for the cheap shops to staff. **That is the niche.** Compete there; never compete on scale, brand, headcount, or price-per-hour.

---

## 5. Founder advantage analysis (the moat)

| Asset | Differentiated? | Copyable by a big firm? | Strength as proof |
| --- | --- | --- | --- |
| Enterprise healthcare transformation (program leadership, prior auth, care mgmt, interoperability, CMS) | **Yes** — rare to find in a solo operator | Hard — it's lived experience, not a deck | **Strongest credibility** — opens doors, justifies premium |
| **Design + Build duality** (thinks like a consultant, ships like a builder) | **Yes — the core moat** | Structurally hard: firms split these roles across seniorities and markups | Strongest *differentiator* |
| RachelOS (live, shippable decision system) | **Yes** | They can build similar, but can't show *yours, running* | **Strongest demonstrable proof** — a working artifact, not slides |
| Product ownership + program leadership | Partially | Common at firms | Supports credibility |
| Intelligence-reporting / "Intelligence Factory" pipeline | Yes as IP/method | Yes as a generic concept | Supports method, not customer-facing on its own |

**Why a big firm cannot replicate the wedge:** their economics require leveraging junior staff against a senior nameplate. They *cannot profitably* put a genuinely senior operator personally on a $15–100K, weeks-long engagement and have that person both design and build. TKO can, because TKO *is* that person. The moat is not a technology — it is the **unbundling of senior judgment from firm overhead**, proven by a working system.

**Foundation of TKO:** Design+Build duality (the differentiator) × Healthcare/enterprise credibility (the door-opener) × RachelOS (the proof). Build the brand on those three.

---

## 6. Content & SEO strategy

### Principle
Lead generation comes from **symptom and vertical searches**, not the category name. Thought leadership *coins and defends* the category ("the decision layer") for the people already in the room. Two different jobs — don't confuse them.

### Search themes people actually search (acquisition content)
- "why dashboards don't drive decisions" / "dashboards vs decisions"
- "AI pilot failed" / "why most AI projects fail" / "how to get value from AI in operations"
- "prioritize accounts in CRM" / "customer success accounts falling through cracks" / "relationship intelligence"
- "prior authorization automation" / "reduce administrative burden healthcare"
- "PE value creation operational" / "portfolio company operational visibility"
- "operational bottlenecks" / "where work stalls" / "execution visibility"
- "human in the loop AI workflow" / "AI with human approval"

These map cleanly onto the existing 12 content pillars in `content.ts` — the pillars are fine; what's missing is *published articles* hitting these long-tail phrases.

### Content pillars (consolidated from 12 → 4 to focus effort)
1. **The Decision Layer** (category-defining POV): dashboards→decisions, data→action, the missing layer, human-approved AI.
2. **Why AI Projects Fail (and what works instead)**: the highest-intent, highest-traffic, most credible-given-skepticism theme.
3. **Operational Leverage / Execution Visibility**: aimed at PE + COO buyers and scaling pain.
4. **Healthcare Operations**: the credibility vertical — prior auth, administrative burden, care ops, CMS-driven change.

### Authority content (publish, don't just architect)
- **Flagship case study:** RachelOS — *From CRM to Operating System* — with a visual walkthrough of memory, prioritization, trusted next action, and human approval. This is the single highest-leverage page on the site.
- **Conversion essays:** "Why Dashboards Don't Drive Decisions" · "The Missing Layer Between Data and Action" · "Why Most AI Projects Fail (It's Not the Model)."
- **Vertical essays:** "Administrative Burden Is a Workflow Decision Problem" (healthcare) · "Operational Leverage Requires Execution Visibility" (PE) · "Why Customer Success Teams Miss Accounts Even When the CRM Is Updated" (RevOps).
- **Intelligence reports** (only if pursuing the reporting niche — see Asset Audit): comparison / relocation / corridor / market intelligence reports as *productized lead magnets*, kept off the core consultancy narrative so they don't fragment it.

### Prioritized content roadmap
1. RachelOS visual case study (proof — unblocks everything).
2. "Why Most AI Projects Fail" (highest intent + traffic).
3. "Why Dashboards Don't Drive Decisions" (category POV + conversion).
4. Diagnostic one-pager PDF (sales asset).
5. One healthcare + one PE essay (vertical credibility).
6. Then cadence: one essay every 2 weeks rotating across the 4 pillars.

---

## 7. Revenue model analysis

Scoring 1–5 (5 = best). "Founder fit" reflects the stated desire to solve problems, not run SaaS ops.

| Model | Revenue potential | Time to $1 | Difficulty | Scalability | Founder fit | Risk | Verdict |
| --- | --- | --- | --- | --- | --- | --- | --- |
| **Operational Diagnostic (fixed)** | 3 | **5 (fast)** | 2 | 2 | 5 | 1 | **Lead with this** — entry + first dollar |
| **Fixed-price Build** | **5** | 3 | 3 | 2 | 5 | 2 | **Core revenue engine** |
| **Fractional advisory (retainer)** | 4 | 3 | 2 | 2 | 4 | 1 | **Recurring base** — stabilizes cash |
| Consulting (T&M) | 3 | 4 | 2 | 1 | 3 | 2 | Use as fallback; avoid hourly framing |
| Productized service (e.g. "AI Opportunity Audit") | 3 | 4 | 3 | **4** | 4 | 2 | Strong later — package the diagnostic |
| Intelligence subscriptions | 3 | 2 | 4 | 4 | 2 | 3 | Only if reporting niche proves out |
| Reporting services (done-for-you) | 2 | 3 | 3 | 3 | 3 | 3 | Side experiment, not core |
| Licensing (RachelOS pattern) | 3 | 1 | 5 | 4 | 2 | 4 | Premature; revisit after 3+ builds |
| SaaS | 5 | **1 (slow)** | 5 | 5 | **1** | 5 | **Rejected** — founder + capital reality |

### Path to first revenue (what can be sold in 90 days)
- **First $10K:** One **Operational Diagnostic** ($15K) sold into the warm network (PE contact, healthcare contact, or a relationship-business founder). This is the single fastest, lowest-friction dollar. Optionally seed with a smaller fixed **"Decision Audit"** ($5–8K, 1 week) to lower the barrier for the very first logo.
- **First $50K:** Diagnostic → small **Build** conversion, or 3 diagnostics across the ICPs. One diagnostic + a $35K starter build hits it.
- **First $100K:** One full **Build** ($50–100K), or Build + a **Fractional** retainer running in parallel. By here you have 2–3 named engagements and the RachelOS + one client case study to compound referrals.

**Recommended path:** Diagnostic (land) → Build (expand) → Fractional (retain). The ladder already on the site is correct; the work is *filling it with named logos*, not redesigning it.

---

## 8. Offer architecture (realistic for a solo founder, no delivery team)

The three offers in `content.ts` are well-constructed. Below they are sharpened, with one addition: a sub-$10K wedge to crack the very first customer.

### Offer 0 (optional wedge) — "Decision Audit"
- **Buyer:** Skeptical first customer / warm-network founder who won't sign $15K cold.
- **Problem:** "We're not sure where the real bottleneck is."
- **Deliverables:** 1-week, 3–4 interviews, one workflow mapped, a 5-page "where work stalls + top 3 fixes" memo.
- **Timeline:** 1 week. **Price:** $5–8K. **Outcome:** A fast credible read that converts to the full Diagnostic or Build. Use only to land the first 1–2 logos, then retire.

### Offer 1 (Entry) — Operational Diagnostic
- **Buyer:** COO / VP Ops / PE operating partner / health-tech ops leader.
- **Problem:** Data and tools exist; priorities, attention, and next actions don't.
- **Deliverables:** Workflow assessment, decision analysis, bottleneck map, visibility/prioritization gap review, AI opportunity review, implementation roadmap, executive readout, 30 days follow-up.
- **Timeline:** 2–3 weeks. **Price:** $15–25K. **Outcome:** A prioritized, owner-assigned roadmap and a clear build/don't-build decision. **This is the primary entry point.**

### Offer 2 (Core) — Operational Intelligence System Build
- **Buyer:** A diagnostic client (or warm referral with a known problem) ready to act.
- **Problem:** The decision layer doesn't exist yet — needs to be built and adopted.
- **Deliverables:** Workflow redesign, decision-layer design, operational-memory model, prioritization/action model, human-in-the-loop AI review model, action queues + escalation detection, measurement model, handoff + training.
- **Timeline:** 8–12 weeks. **Price:** $50–100K (start engagements at $35K for a single-workflow build to lower first-build risk). **Outcome:** A working decision system for one or two workflows, owned by the internal team. **This is the revenue engine.**

### Offer 3 (Ongoing) — Fractional Operational Intelligence Advisor
- **Buyer:** Leadership team post-diagnostic or post-build needing sustained execution discipline.
- **Problem:** Reviews, prioritization, governance, and AI adoption drift without a senior cadence.
- **Deliverables:** Operational reviews, workflow governance, AI-adoption guidance, prioritization reviews, execution oversight, monthly executive brief.
- **Timeline:** 3–6 months. **Price:** $12–25K/month. **Outcome:** A trusted operating view of priorities, risks, and decisions; recurring revenue base. **This is the retention layer.**

All three are deliverable by one senior operator. None requires a bench. AI/automation is used *inside* delivery to multiply the founder's output — never sold as the headline.

---

## 9. Existing asset audit (eliminate fragmentation)

| Asset | Verdict | Action |
| --- | --- | --- |
| **RachelOS** | **Keep + Reposition** | Make it the flagship public proof of "we ship working decision systems." Do **not** turn it into a SaaS. Build the visual case study. |
| **Reporting / Intelligence platform** | **Reposition / Park** | It fragments the consultancy narrative. Either (a) park it as a separate, off-site productized "Intelligence Report" experiment for the relocation/real-estate niche, or (b) fold its *method* (Facts→Insights→Recommendations) into TKO's IP. Keep it **out of** the core site until it has its own buyer. |
| **"Intelligence Factory" concept** | **Reposition as internal IP/method** | Use it as TKO's named methodology behind the Build, not as a public product. Strengthens the "we have a repeatable system" story. |
| **Healthcare transformation experience** | **Keep — foreground** | The credibility spine. Convert into 2–3 anonymized case studies + 1 vertical essay. Resolve which metrics are publishable. |
| **Healthcare case studies (gated)** | **Keep, de-risk** | Keep anonymized; get founder sign-off on any quotable metric. Don't inflate. |
| **TKO website** | **Keep + sharpen** | Already well-positioned. Add the wedge (symptom + vertical language for SEO), publish actual articles, ship the RachelOS case study, add the Decision Audit/diagnostic one-pager. |
| **Intelligence-report concepts (comparison/relocation/corridor)** | **Productize separately** | Only if pursuing the reporting niche; as lead magnets or a standalone micro-offer — never co-mingled with the consultancy story. |

**Smallest coherent business narrative:**
> "I'm a senior operator who builds the decision layer between your data and your action. I diagnose where work stalls in weeks, build a working system that tells you who needs attention and what to do next, and advise you while it sticks — with you in control of the AI. Here's RachelOS, running, as proof."

One person · three offers · one proof point · one credibility spine. Everything that doesn't serve that sentence gets parked or made internal.

---

## 10. 90-Day execution roadmap

**Days 1–15 — Sharpen & arm**
- Rewrite homepage hero + meta to lead with symptom + vertical language while keeping the "decision layer" POV. Add explicit ICP language (PE, healthcare/health-tech ops).
- Ship the **RachelOS visual case study**.
- Produce the **Diagnostic one-pager PDF** and a one-paragraph **Decision Audit** wedge offer.
- Resolve which healthcare metrics are publishable.

**Days 16–45 — Generate pipeline**
- Direct outreach to 20–30 warm contacts across the 3 ICPs with a specific trigger-based message (not "I do operational intelligence" — "I help [PE/health ops] leaders see where work stalls and ship the fix in weeks").
- Publish "Why Most AI Projects Fail" and "Why Dashboards Don't Drive Decisions."
- Goal: **3–5 diagnostic conversations**, land **first paid logo** (Decision Audit or Diagnostic) → **first $10K**.

**Days 46–75 — Convert & prove**
- Deliver first Diagnostic; convert to a Build proposal.
- Publish one healthcare + one PE essay.
- Stand up a simple referral ask into every delivered engagement.
- Goal: **first Build signed**, pipeline to **$50K** booked.

**Days 76–90 — Compound**
- Deliver/begin Build; package the diagnostic into a repeatable productized format.
- Convert one client to a **Fractional** retainer (recurring base).
- Turn the first client engagement into a second public case study.
- Goal: **path to $100K** visible (one Build + one retainer, or 2 builds), 2 case studies live, content cadence running.

---

## Final deliverables (summary)

1. **Positioning:** The operator who builds your decision layer — designs *and* ships the system between data and action.
2. **Category strategy:** Own "the decision layer / operational intelligence" as the umbrella POV; acquire via symptom + vertical search and warm network. Don't fund category education you can't afford.
3. **ICPs:** PE operating partners/portfolio COOs (revenue) · healthcare/health-tech ops leaders (credibility) · scaling relationship-led founders (proof).
4. **Offers:** Decision Audit (wedge) → Operational Diagnostic (entry) → System Build (core) → Fractional Advisor (retain).
5. **Content pillars:** The Decision Layer · Why AI Projects Fail · Operational Leverage/Execution Visibility · Healthcare Operations.
6. **SEO:** Symptom/vertical long-tail for acquisition; category POV for authority; RachelOS case study as the conversion hub.
7. **Homepage narrative:** Symptom → "the missing layer" → RachelOS proof → three offers → senior-operator credibility.
8. **Case study strategy:** RachelOS flagship (shippable proof) + anonymized healthcare + first client → compounding referral engine.
9. **Thought leadership:** Coin and defend "the decision layer"; lead with "why AI projects fail" for reach + credibility with skeptics.
10. **90-day roadmap:** Sharpen & arm → generate pipeline ($10K) → convert & prove ($50K) → compound (path to $100K).

---

## What business is TKO actually in?

**TKO is in the decision-systems business: it builds the layer between data and action — diagnosing where work stalls and shipping a working system that tells an organization who needs attention now and what to do next, with humans in control of the AI.**

Defense: it is the *only* description that is simultaneously true of all four bodies of work (healthcare, RachelOS, reporting, consulting), differentiated from every competitor (the big firms advise but don't build; the cheap shops build but don't think; SaaS sells a product not a decision), grounded in proof TKO can show running today (RachelOS), aligned with what the founder actually wants to do (solve hard operational problems, not run SaaS), and sellable inside 90 days through a senior-led diagnostic → build → advise ladder. "AI consultancy" is what everyone says; "operational intelligence" is the umbrella; but **decision systems — designed and built by one accountable senior operator — is the business.**
