# Lead-Questions → Content Opportunity Analysis

**Role:** Principal Architect (audit) · **Date:** 2026-07-07
**Source:** live RachelOS DB (`rachel-realestate`), read-only. `lead_questions` (183 open) + `lead_facts`.
**Companion to:** [`RACHELOS_TIF_INTEGRATION_AUDIT.md`](RACHELOS_TIF_INTEGRATION_AUDIT.md)

---

## 0. Honesty gate — read this before the tables

I analyzed **all 183 open `lead_questions`**. Two findings change how this should be read:

1. **`lead_questions` is mostly an *operator to-do list*, not a buyer-FAQ backlog.** The rows are
   AI-generated intelligence-acquisition prompts *for Rachel*, not questions buyers typed. Breakdown
   by `gap_type`:

   | gap_type | count | Content value |
   |---|---|---|
   | `familiarity_validation` ("Do you recognize {name}?") | 79 | **~none** — CRM recognition prompt |
   | `(null)` (chase/"any update"/"what is X looking for") | 57 | **~none** — per-lead operational nudge |
   | `buy_vs_rent` ("buy, or rent first and buy later?") | **34** | **HIGH — a real theme** |
   | `contact_validation` ("have you spoken with X yet?") | 5 | none |
   | `timeline_validation` | 3 | medium |
   | `geography` ("Delray, Boca, Boynton, or deciding?") | 2 | HIGH (theme, under-sampled) |
   | `relationship_update` / `budget` | 2 / 1 | low/medium |

   So the raw question **text** alone supports essentially **one** strong content theme
   (`buy_vs_rent`, 34 leads) plus a thinly-sampled geography theme. Everything else is operational.

2. **The real content-demand signal lives in `lead_facts`, not `lead_questions`.** That is where the
   buyer's actual intent is captured. This analysis therefore themes on `lead_facts` (the demand),
   validated against the `lead_questions` themes where they overlap. This is the intellectually
   honest source — I will not manufacture 50 themes out of 183 mostly-operational rows.

**Who the demand actually is** (from `lead_facts`): 55+/active-adult retirees relocating from the
Northeast (NJ 21, NY 18, Long Island 4, PA 3) to the **Delray (58) – Boynton (42) – Boca (36)**
corridor (`target_market` "south florida" 76). Timelines skew 3–12 months (`timeline` 150 facts;
"still figuring out timing" 29). Many are **buy-vs-rent undecided** and many are **gated on selling a
Northeast home** (`sale_dependency` 13 + "NJ home sale" blockers).

---

## 1. Themes (evidence-ranked)

Frequency = distinct `lead_facts`/`lead_questions` records backing the theme (cited). Revenue impact
is a tier (see §3 model): **H** ≈ late-funnel, decision-blocking, touches many leads; **M** ≈
mid-funnel; **L** ≈ early/nurture.

### T1 · Buy vs. Rent First — the relocating-retiree decision  ·  Freq: 34+ · **Rev: H**
- **Example questions:** "Are you planning to buy, or rent first and buy later?" (×34);
  motivation "renting first before purchasing"; blocker "considering rental first for one year".
- **Opportunity title:** *Should You Rent First or Buy When Relocating to South Florida (55+)?*
- **Asset:** decision-framework article + comparison table (cost, lock-in, market-timing, trial-run).
- **Guide:** "Rent-First vs. Buy Now: A Relocating Retiree's Decision Guide (Delray/Boynton/Boca)."
- **Why H:** 34 leads are stuck at this exact fork; resolving it converts a browser into a buyer.

### T2 · Selling the Northeast home while buying in FL (contingency/logistics) · Freq: 16 · **Rev: H**
- **Evidence:** `sale_dependency` 13 ("NJ home sale within 3 months", "selling large home", "under
  contract $660k cash") + blockers "nj home sale" ×3.
- **Title:** *How to Buy in South Florida Before (or While) Selling Your Northeast Home.*
- **Asset:** logistics + financing article (bridge timing, contingent offers, cash-out sequencing).
- **Guide:** "The Two-Home Transition Guide: Selling Up North, Buying Down South."
- **Why H:** this is the single biggest *blocker* to closing for out-of-state buyers.

### T3 · Corridor selection — Delray vs. Boynton vs. Boca · Freq: 76 (+geo Qs) · **Rev: H**
- **Evidence:** `target_market` south florida 76, Delray 58, Boynton 42, Boca 36; geography Q
  "Which areas — Delray, Boca, Boynton, or still deciding?"
- **Title:** *Delray Beach vs. Boynton Beach vs. Boca Raton for 55+ Buyers.*
- **Asset:** first-class **comparison** deliverable (price, lifestyle, HOA, commute, vibe).
- **Guide:** "Which South Florida Beach Town Fits You? A 55+ Corridor Comparison."
- **Why H:** almost every lead must make this choice; it's the top-of-search decision.

### T4 · Northeast → South Florida relocation (origin-specific) · Freq: 46 · **Rev: H**
- **Evidence:** origin NJ 21, NY 18, Long Island 4, PA 3; `relocation_interest` true 74; motivations
  "fleeing ny", "relocation from nyc/philadelphia".
- **Title:** *Relocating from New Jersey / New York to South Florida (55+).*
- **Asset:** origin-tailored relocation articles (taxes, climate, timeline, what-your-$-buys).
- **Guide:** "NJ-to-Delray Relocation Guide" + "NY/Long-Island-to-Delray Relocation Guide."
- **Why H:** origin-specific content converts far better than generic; two guides cover 39 leads.

### T5 · 55+ / active-adult community buyer's guide · Freq: 68 · **Rev: H**
- **Evidence:** `active_adult_interest` 23, lifestyle `active_adult` 23, `age_restriction` 22.
- **Title:** *The 55+ Active-Adult Community Buyer's Guide (Palm Beach County).*
- **Asset:** category primer (age rules, amenities, HOA, resale, new vs. resale).
- **Guide:** "How to Choose a 55+ Community in the Delray–Boynton Corridor."
- **Why H:** defines the category most leads are shopping in.

### T6 · Specific communities — Valencia / Del Webb style · Freq: 57 · **Rev: H**
- **Evidence:** `community` 33 + `community_interest` 24; values "Valencia Sound", "Valencia (wants to
  tour)", "Del Webb style community".
- **Title:** *The Valencia Communities Compared (Sound, Grand & more).*
- **Asset:** community comparison + individual community profiles (**already a live TIF/Rachel draft
  path** — `rachel_community` framework, `comparison_guide` artifact).
- **Guide:** "Valencia vs. Del Webb-Style Living: Which 55+ Community Fits?"
- **Why H:** community-level intent = tour-ready intent; directly feeds showings.

### T7 · Timeline / "when should I start" nurture · Freq: 150 · **Rev: M**
- **Evidence:** `timeline` 150; "still figuring out timing" 29, 6–12mo 33, 3–6mo 26.
- **Title:** *When Should You Start Your South Florida Home Search? A Relocation Timeline.*
- **Asset:** timeline/checklist article by month-to-move band.
- **Guide:** "Your 12-Month Relocation Countdown."
- **Why M:** huge volume but early-funnel; nurtures the "still figuring out timing" 29 toward action.

### T8 · Budget — what $X buys across the corridor · Freq: 70 · **Rev: M/H**
- **Evidence:** `budget` 70; blocker "nj pricing too high".
- **Title:** *What Your Budget Buys in Delray vs. Boynton vs. Boca (55+).*
- **Asset:** price-tier comparison article/table.
- **Guide:** "The 55+ Corridor Price Guide."
- **Why M/H:** anchors expectations; pairs with T3/T4.

### T9 · HOA fees & rules (incl. pets) · Freq: ~10 (high-friction) · **Rev: M**
- **Evidence:** blockers "lower hoa monthly fees", "reasonable fees requirement", "hoa confirmation
  two saint bernards allowed"; family_req "pet friendly".
- **Title:** *What 55+ Community HOA Fees Actually Cover (and Pet Rules).*
- **Asset:** explainer + pet-policy angle.
- **Guide:** "Decoding HOA Fees in 55+ Communities."
- **Why M:** small count but a recurring deal-blocker; removes friction late-funnel.

### T10 · Lifestyle / amenities (pickleball, tennis, beach, social) · Freq: 52 · **Rev: M**
- **Evidence:** `lifestyle` 52 — active_adult 23, beach 10, social 6, restaurants 3, pickleball/tennis.
- **Title:** *Best 55+ Communities for Pickleball, Tennis & Beach Access.*
- **Asset:** amenity-indexed community roundup(s).
- **Guide:** "The Active-Lifestyle Community Guide."
- **Why M:** strong engagement/SEO; mid-funnel differentiator.

### T11 · Property type — condo vs. townhome vs. single-family · Freq: 19 · **Rev: M**
- **Evidence:** `property_type` 19 (townhome 4, condo 4, SF 2, "privacy in single family vs condo").
- **Title:** *Condo vs. Townhome vs. Single-Family for FL Retirement.*
- **Asset:** trade-off article (maintenance, cost, privacy, resale).
- **Guide:** "Which Home Type Fits Your Florida Retirement?"

### T12 · Multigenerational / family requirements · Freq: 23 · **Rev: L/M**
- **Evidence:** `family_requirement` 23 (grandchildren, caregiver, "son at FAU", pets, family of 5).
- **Title:** *55+ Communities That Welcome Family & Grandkids.*
- **Asset:** guest-policy + family-friendly amenity article.

### T13 · Proximity — airport / beach / cruise port · Freq: ~6 · **Rev: L**
- **Evidence:** blockers "within 45 min–1hr of airport", "easy access to cruise port and airport",
  "close to beach within 10 min".
- **Title:** *55+ Communities by Airport & Beach Proximity.*
- **Asset:** location-logistics roundup.

---

## 2. Top 50 ranked opportunities

Ranked by composite score = **demand (leads backing) × intent-proximity to a transaction** (§3).
Each concrete opportunity is a **theme × entity** cross, so each is a distinct shippable asset.

> **Confidence tiers.** **A (1–14):** directly backed by ≥15 records or a decision-blocking gap —
> build these. **B (15–33):** backed by real but smaller counts, or a sound cross of two A-themes —
> strong candidates. **C (34–50):** thin/extrapolated demand — validate before investing. I am
> flagging C explicitly rather than presenting all 50 as equally proven.

| # | Opportunity (asset) | Theme | Demand backing | Intent | Rev |
|---|---|---|---|---|---|
| 1 | Rent-first vs. buy-now decision guide (55+ relocation) | T1 | 34 buy_vs_rent | late | **H** |
| 2 | Delray vs. Boynton vs. Boca — 55+ corridor comparison | T3 | 76 s.fl / 58/42/36 | top-of-search | **H** |
| 3 | Buy in FL while selling your Northeast home (contingency) | T2 | 16 sale-dep | blocker | **H** |
| 4 | NJ → South Florida relocation guide (55+) | T4 | 21 NJ | high | **H** |
| 5 | NY / Long Island → South Florida relocation guide | T4 | 22 NY+LI | high | **H** |
| 6 | The 55+ active-adult community buyer's guide (PBC) | T5 | 68 | high | **H** |
| 7 | Valencia communities compared (Sound/Grand) | T6 | 57 comm | tour-ready | **H** |
| 8 | Delray Beach 55+ buyer/relocation guide | T3 | 58 | high | **H** |
| 9 | Boynton Beach 55+ buyer/relocation guide | T3 | 42 | high | **H** |
| 10 | Boca Raton 55+ buyer/relocation guide | T3 | 36 | high | **H** |
| 11 | What your budget buys across the corridor (55+) | T8 | 70 budget | mid | **H** |
| 12 | Del Webb-style vs. Valencia-style 55+ living | T6 | 57 comm | high | **H** |
| 13 | 12-month relocation countdown / when to start | T7 | 150 timeline | nurture | **M** |
| 14 | HOA fees & pet rules in 55+ communities, decoded | T9 | ~10 blockers | blocker | **M** |
| 15 | Best 55+ communities for pickleball & tennis | T10 | 52 lifestyle | mid | **M** |
| 16 | Beach-access 55+ communities (Delray–Boynton) | T10 | 10 beach | mid | **M** |
| 17 | Condo vs. townhome vs. single-family for FL retirement | T11 | 19 | mid | **M** |
| 18 | "Still figuring out timing" nurture guide | T7 | 29 | nurture | **M** |
| 19 | PA / Philadelphia → South Florida relocation guide | T4 | 3 PA | high | **M** |
| 20 | Selling a large NE home & downsizing to 55+ FL | T2/T11 | 13 sale-dep | blocker | **M** |
| 21 | New-construction vs. resale in 55+ communities | T6/T11 | comm+prop | mid | **M** |
| 22 | Gated-community guide (security, access, guests) | T5 | age_restr 22 | mid | **M** |
| 23 | Pet-friendly 55+ communities (large-dog / HOA rules) | T9/T12 | pets | blocker | **M** |
| 24 | Snowbird / second-home vs. full-time relocation | T4 | motivations | mid | **M** |
| 25 | 55+ communities that welcome grandkids & family | T12 | 23 fam | mid | **M** |
| 26 | Tax & cost-of-living: leaving NJ/NY for FL | T4 | 46 origin | high | **M** |
| 27 | 3–6 month move: the fast-track relocation plan | T7 | 26 | mid | **M** |
| 28 | 6–12 month move: the planning-ahead relocation plan | T7 | 33 | nurture | **M** |
| 29 | Low-maintenance living: why retirees pick 55+ FL | T5/T10 | motiv | mid | **M** |
| 30 | Boynton's Valencia cluster deep-dive | T6 | Valencia | tour-ready | **M** |
| 31 | What "active adult (55+)" legally means (age rules) | T5 | 22 age_restr | mid | **M** |
| 32 | Proximity guide: airport & cruise-port access | T13 | ~6 | mid | **L** |
| 33 | Corridor price map: entry to luxury by community | T8/T3 | 70 budget | mid | **M** |
| 34 | Waterfront / ocean-access 55+ options | T10 | ocean_access | mid | **L** |
| 35 | Single-family privacy vs. condo lifestyle in 55+ | T11 | prop | mid | **L** |
| 36 | Financing a FL purchase before your NE home sells | T2 | sale-dep | blocker | **M** |
| 37 | Restaurants & downtown-walkable 55+ areas (Pineapple Grove) | T10 | restaurants | early | **L** |
| 38 | Golf-cart / walkable community roundup | T10 | lifestyle | early | **L** |
| 39 | Best communities for social calendars & clubs | T10 | social 6 | early | **L** |
| 40 | Accessibility / aging-in-place features in 55+ homes | T5 | accessibility 7 | mid | **L** |
| 41 | Caregiver-friendly living arrangements | T12 | caregiver | niche | **L** |
| 42 | "Fleeing NY" — fast relocation checklist | T4 | motiv | high | **L** |
| 43 | West-coast FL vs. east-coast (Delray) for 55+ | T3 | west-coast facts | early | **L** |
| 44 | Port St. Lucie / Stuart alternatives to Delray | T3 | tail markets | early | **L** |
| 45 | Investment + personal-use second home in FL | T4 | motiv | niche | **L** |
| 46 | HOA reserves & special assessments explained | T9 | fees | blocker | **L** |
| 47 | Bringing large dogs to a 55+ community (breed/weight) | T9 | pet blocker | blocker | **L** |
| 48 | Manufactured/mobile-home 55+ option (budget tier) | T8/T11 | prop tail | niche | **L** |
| 49 | Round-robin tennis & racquet-sport communities | T10 | tennis | niche | **L** |
| 50 | Jewish-community / cultural-fit neighborhood guide | T3 | "jewish area" | niche | **L** |

---

## 3. Revenue-impact model (how the tiers were set)

No fabricated dollar precision. The model:

- **Per-closing value (anchor):** a 55+ corridor home ≈ $400k–$700k; buy-side commission ≈ 2.5% ≈
  **$10k–$17k per incremental closing** (~$12k midpoint). One extra closing pays for the entire
  content program many times over.
- **Impact = leads-touched × intent-proximity.** An asset that resolves a *decision-blocking* gap for
  many leads (T1 rent-vs-buy, T2 sell-first, T3 corridor) is **H**: it moves stuck late-funnel leads.
  High-volume but early-funnel (T7 timeline) is **M**: it nurtures. Niche/thin (C-tier) is **L**.
- **The multiplier is the next-touch loop, not the asset.** Value is realized when Rachel sends the
  finished asset to the specific leads whose fact/question it answers ("I made this for you") — see
  the audit's Action #2. An H asset with 34 waiting leads and a next-touch is worth far more than its
  SEO traffic.

**If I had to name the 3 that most plausibly cause an incremental closing in 90 days:**
#1 (rent-vs-buy, 34 stuck leads), #3 (sell-first contingency, the top blocker), #2/#4/#5 (corridor +
origin relocation guides, the top-of-search decision every lead makes).

---

## 4. What this means for the integration (ties back to the audit)

- The **Opportunity Feeder MVP** should ingest from **`lead_facts`, not `lead_questions`** — that is
  where content demand actually lives. `buy_vs_rent` questions are the one worthwhile question-text
  source; everything else in `lead_questions` is operational.
- Revise the audit's "hidden opportunity" note accordingly: *`lead_facts` (target_market, origin,
  motivation, community, blocker, lifestyle) is the free content backlog — not the question log.*
- The top themes (T1–T6) map cleanly onto TIF's existing **comparison / relocation-guide / community
  deliverable** types and the live `rachel_community` / `rachel_relocation` compose frameworks —
  so most of these can be produced through the pipeline that already exists.

### STOP
Analysis only, per operating mode. No code changed. Say the word to (a) re-scope the Feeder MVP onto
`lead_facts`, or (b) draft any of the top opportunities through the existing composer.
