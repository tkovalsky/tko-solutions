# TKO Competitive Positioning & Executive Battlecards

Last updated: 2026-10-15

## 1. Unified Positioning & Terminology Architecture

TKO Solutions helps regulated healthcare organizations and high-consideration advisory firms turn scattered operational signals into governed, human-approved daily execution.

| Term | Role in the TKO Architecture | How to Explain It to a Buyer |
|---|---|---|
| **TKO Solutions** (`tko.solutions`) | The principal-led operating improvement & advisory practice. | "You work directly with Todd Kovalsky—20+ years across Apollo Global Management, Goldman Sachs AM, JPMorgan AM, FolioDynamix, ELLKAY, and Cognizant. The person who diagnoses the bottleneck builds the fix." |
| **RachelOS** | Live, single-operator production flagship in South Florida real estate. | "Our inspectable living proof (1,634+ commits, 149+ app DB migrations, 240+ test files). It proves we build working systems with fail-closed AI governance, not slide decks." |
| **SidecarOS** (The Sidecar Operating Layer) | Deployment architecture beside the client's existing CRM. | "Keep HubSpot, Follow Up Boss, Wealthbox, Clio, or Salesforce as your System of Record. Our Sidecar layer bolts on beside it as your System of Action." |
| **Ambient CRM** (`/products/ambient-crm`) | Entry wedge for teams losing follow-up momentum (SidecarOS: $500 Database Health Assessment, then Core $1,500 setup + $500/month or Managed $2,500 setup + $1,200/month; ladder in `src/lib/offers.ts`). | "Operators hate manual CRM data entry. An Ambient CRM workflow captures context from inquiries, emails, and notes and surfaces a daily action lineup." |
| **BoundOS** ("Bounded Autonomy") | Governance philosophy for regulated & high-trust environments. | "Models extract and draft; deterministic rules control state and priority; human facts supersede AI; and a named operator approves consequential outbound messages." |

---

## 2. Competitive Differentiators ("David vs. Goliath")

| Competitor Type | Typical Weakness | TKO Difference |
|---|---|---|
| **Big 4 / Strategy Consultants** | Charge $250K–$500K for junior associates to produce a slide deck, then leave before anything works. | Principal-led, fixed-price, bounded engagements ($7,500–$15,000) where the architect who maps the constraint builds the working mechanism. |
| **Traditional CRM Vendors** (HubSpot, Salesforce, FUB, Wealthbox, Clio) | Passive filing cabinets built for management reporting; operators drown in 300+ overdue tasks. | We keep your CRM as the System of Record and add the Sidecar System of Action (daily priority queue, missing-fact prompts, exact-message review). |
| **Marketing / Lead Agencies** | Sell rented clicks or generic blog posts disconnected from downstream follow-up and relationship memory. | TKO connects pre-intent buyer education and permissioned inquiry capture directly to relationship context and accountable follow-up. |
| **Autonomous AI SDRs & Wrapper Agencies** | Stitch raw LLM prompts to outbound email with zero source precedence—creating hallucination, compliance, and brand-reputation risk. | Fail-closed governance: human facts strictly override AI extraction, templates can be hash-locked, and AI-assisted outreach requires exact-message human approval. |

---

## 3. C-Suite Battlecards (CEO · CFO · COO · CTO)

### Battlecard 1: The CEO / Managing Partner / Rainmaker
* **Their Core Concern:** "Our best leads slip through the cracks when we get busy, our partners hate logging into the CRM, and we cannot afford robotic AI spam damaging our reputation in the market."
* **Their Question:** *"How is this different from HubSpot, Follow Up Boss, Wealthbox, or hiring an agency?"*
* **TKO Answer:**
  > "Agencies sell rented clicks, and CRMs are passive filing cabinets. Neither one helps a senior partner close a high-trust client. We build the layer between your reputation and your morning coffee: useful authority content answers the questions buyers research in private, captures permissioned inquiries with their context intact, and hands your operator a focused morning action queue with a prepared draft waiting for human sign-off."
* **Proof to Show:** The RachelOS **Canonical Priority Queue** and **Operator Review** surfaces on `/selected-work/from-crm-to-operating-system`.

### Battlecard 2: The CFO / Head of Procurement
* **Their Core Concern:** "Another open-ended consulting retainer or shelfware software contract that triggers a costly migration and never proves ROI."
* **Their Question:** *"Why shouldn't we just use the tools we already pay for, and how is this scoped?"*
* **TKO Answer:**
  > "You should use the tools you already pay for—that is why we do not rip-and-replace your CRM. You do not have a software licensing shortage; you have an activation gap between stored records and daily execution. Every TKO engagement is fixed-price and bounded in writing before work starts: $5,000 for a 30-day Managed Follow-Up pilot, $7,500 for a 2-week Constraint Diagnostic, $7,500–$15,000 for a bounded Owned-Demand & Governed AI build, or $15,000 for an Enterprise Readiness Sprint. You own the agreed deliverables, configurations, and specifications outright."
* **Proof to Show:** The fixed-scope commercial table and explicit boundaries on `/services`.

### Battlecard 3: The COO / VP of Operations
* **Their Core Concern:** "My team is already overloaded with spreadsheets and manual workarounds, and our best operator is a single point of failure."
* **Their Question:** *"Our people barely update the CRM today. How do you get adoption without creating more administrative burden?"*
* **TKO Answer:**
  > "Operators do not reject systems because they are lazy; they reject systems that demand manual data entry and give nothing back. Right now, your best people are acting as Human APIs—reconstructing context across inboxes, texts, spreadsheets, and personal memory every morning. We remove reconstruction by surfacing one canonical queue with known facts, open questions, and the next action in one place."
* **Proof to Show:** The **9-Link Implementation Chain** (`Policy → Obligation → Capability → Workflow → System → Control → Owner → Evidence → Outcome`) and `/healthcare/readiness-preview`.

### Battlecard 4: The CTO / CIO / CISO / General Counsel
* **Their Core Concern:** "Hallucinated AI commitments, regulatory violations (CMS/HIPAA, Fair Housing, SEC, State Bar), unmonitored webhook failures, and brittle integrations."
* **Their Question:** *"What are the controls around the model, and what happens when an integration or LLM call fails?"*
* **TKO Answer:**
  > "In RachelOS, we turned off autonomous AI nurture after observing factual and quality failures in production, and we documented that reversal in our engineering decision records. Our pattern enforces strict boundaries:
  > 1. **Source Precedence:** Recorded human facts take precedence over model suggestions.
  > 2. **Deterministic State & Routing:** Queue ranking, lifecycle state, and eligibility rules are deterministic code, not LLM guesses.
  > 3. **Audited Model Wrapper:** Model attempts run through a wrapper with timeouts and failure classification.
  > 4. **Exact-Message Human Approval:** AI prepares proposed prose; an authenticated operator reviews and approves the exact message before sending."
* **Proof to Show:** `/selected-work/from-crm-to-operating-system#architecture-explorer` and `/healthcare/impact-assessment#authorization-decision-lab`.

---

## 4. Founder Credibility Track ("Who Is Todd Kovalsky?")

When an executive asks why they should trust an independent principal over a large firm:

> "I spent 20+ years inside regulated operations, product ownership, and healthcare transformation—at **Apollo Global Management** (leveraged-loan and credit operations through the post-2008 restructuring cycle), **Goldman Sachs AM** and **JPMorgan AM** (via Sapient), **FolioDynamix** (wealth and advisor platforms through its Envestnet acquisition), **ELLKAY** (CMS Cures Act FHIR interoperability), and **Cognizant** (Senior Manager in Healthcare Transformation, AI & Analytics).
>
> Large firms sell with a senior partner and deliver with junior associates who have never run an operation under consequence. At TKO, I take a small client load and lead every engagement personally. The person who diagnoses your workflow constraint is the same person who designs the controls and builds the system."

---

## 5. Claim Boundaries (What To Say vs. What Not To Say)

### Always Say
* RachelOS is an independent, single-operator production system that demonstrates our mechanisms: signal capture, relationship memory, fact precedence, deterministic queues, and exact-message human approval.
* The healthcare Decision Lab and Readiness Preview are synthetic demonstrations showing how TKO traces obligations to workflows, systems, controls, owners, and evidence.
* Every project has a written scope, named systems, explicit acceptance criteria, and a starting baseline before work begins.

### Never Claim
* Do not claim TKO sells a multi-tenant horizontal SaaS product or an autonomous AI agent that replaces human accountability.
* Do not claim RachelOS proves healthcare deployment, enterprise scale, or guaranteed client revenue/lead-volume outcomes.
* Do not quote unverified acquisition multipliers, competitor pricing, or automatic diagnostic fee credits.
