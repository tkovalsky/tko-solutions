# TKO Website Architecture

Status: Canonical website and information architecture blueprint
Date: 2026-06-17
Purpose: Define the site structure, page hierarchy, URL architecture, proof model, conversion paths, and authority architecture before any page copy or content is written.

---

## Summary

Architecture decision: **TKO is an Operational Intelligence firm.**

- Primary launch market: Healthcare.
- Secondary markets: Financial Services, Wealth and Asset Management, Capital Markets Operations.
- Category: Operational Intelligence Systems for complex enterprises.
- Core promise: TKO helps organizations discover where work is actually stalling, establish operational truth, and implement systems that continue functioning after the consultants leave.

Healthcare remains the launch wedge because it has the strongest current proof and most direct path to a $25k-$50k diagnostic. Financial services, wealth, asset management, and capital markets are credible secondary markets from Todd's career history, but they should not receive equal homepage weight until current proof exists.

---

## Site Map And URL Architecture

### Launch Site

- `/` - Homepage
- `/services` - Service ladder overview
- `/services/diagnostic` - Operational Intelligence Diagnostic
- `/services/operating-system-build` - Operating System Build
- `/services/fractional-advisor` - Fractional Operating System Advisor
- `/industries` - Industry architecture overview
- `/case-studies` - Case study index
- `/case-studies/from-crm-to-operating-system` - RachelDelray Operational Intelligence System
- `/case-studies/prior-authorization-modernization` - Prior Authorization Modernization
- `/case-studies/enterprise-care-management-modernization` - Enterprise Care Management Modernization
- `/case-studies/healthcare-interoperability-platform` - Healthcare Interoperability Platform
- `/insights` - Authority content index, only when content exists
- `/insights/[slug]` - Individual insight article
- `/about` - Founder credibility and pattern-recognition page
- `/contact` - Diagnostic intake
- `/privacy` - Utility page
- `/terms` - Utility page

### Future URLs, Not Published Empty

- `/industries/healthcare`
- `/industries/financial-services`
- `/industries/wealth-asset-management`
- `/industries/capital-markets-operations`
- `/industries/insurance`
- `/industries/government`
- `/industries/professional-services`

### Navigation

- Header: Services, Industries, Case Studies, Insights, About, `Start the Diagnostic`.
- CTA destination: `/contact`.
- Do not make healthcare and financial services equal in homepage navigation.
- Do not add insurance, government, or professional services to the homepage before proof exists.

---

## Problem Architecture

TKO organizes expertise around operational problems, not industries.

### Core Problems

- Transformation Recovery.
- Workflow Visibility Failure.
- Decision Latency.
- Program Execution Failure.
- Governance Breakdown.
- AI Adoption Failure.
- Cross-Team Coordination Failure.
- Operational Intelligence Design.

Industries are examples of where these problems occur.

Healthcare is the launch market. Financial Services and Wealth Management are secondary markets. The underlying operational problems remain constant.

### Operational Complexity Patterns

- Work crosses teams.
- Decisions cross systems.
- Workflows become invisible.
- Accountability becomes unclear.
- Transformation programs stall.
- AI adoption is constrained by trust, governance, or operational ambiguity.

---

## Industry Architecture

### Launch Industries

- Healthcare.
- Financial Services.
- Wealth and Asset Management.
- Capital Markets Operations.

### Future Industries

- Insurance.
- Government.
- Professional Services.

### Industry Framing Rule

- Healthcare is the primary launch wedge.
- Financial Services, Wealth and Asset Management, and Capital Markets Operations are secondary markets based on career credibility.
- Other regulated or workflow-heavy industries remain future expansion paths.

---

## Page Architecture

| Page | Purpose | Audience | Primary Question Answered | Proof Required | CTA | Supporting Content |
|---|---|---|---|---|---|---|
| Home | Position TKO as an Operational Intelligence firm and route qualified buyers to Diagnostic. | Healthcare leaders first; regulated enterprise operations leaders second. | Can TKO help us see where complex work is stalling and build a system that keeps running? | Founder pattern across industries, RachelOS, healthcare proof, financial services background. | Start the Diagnostic | Category, problem architecture, healthcare wedge, secondary markets, offer ladder. |
| Services | Explain the three-rung engagement ladder. | Buyers evaluating how to engage. | What does TKO sell and where do we enter? | Diagnostic as entry point; Build and Fractional as downstream offers. | Start the Diagnostic | Domain-neutral method, examples by industry, scope and pricing rules. |
| Diagnostic | Make the $25k diagnostic concrete. | Leaders with stalled programs, invisible workflows, unclear accountability. | What will TKO diagnose and what decision will we be able to make afterward? | Operational Truth Framework, enterprise workflow experience, proof examples. | Start the Diagnostic | Deliverables, timeline, inputs, outputs, limits, follow-on path. |
| Operating System Build | Show how TKO converts findings into a working operational system. | Buyers with a known workflow or decision-system problem. | How does TKO build a system that turns signals into trusted action? | RachelOS, source-aware facts, canonical action queue, human approval model. | Start the Diagnostic | Signals -> memory -> facts -> state -> canonical action -> human approval -> outcome. |
| Fractional Advisor | Explain advisory support after a diagnostic or build. | Prior clients, sponsors, consulting partners. | How does TKO maintain execution discipline after the initial engagement? | Program leadership, operating model design, governance experience. | Start the Diagnostic | Cadence, backlog governance, sponsor visibility, AI governance. |
| Industries | Establish market architecture without diluting launch focus. | Buyers outside healthcare validating relevance. | Does this apply to my industry? | Founder history across healthcare, financial services, wealth, capital markets, enterprise operations. | Start the Diagnostic | Launch industries, future industries, shared operational complexity patterns. |
| Case Studies | Organize proof by operating problem, not only by industry. | Skeptical buyers and referral partners. | Has TKO solved structurally similar problems? | Proof tiers and attribution status. | Start the Diagnostic | Case cards tagged by industry, problem type, method, proof level. |
| Insights | Build authority around the category. | Warm leads, partners, future inbound readers. | Does TKO have a serious point of view on operational complexity? | Framework-led content. | Start the Diagnostic | Content categories listed below; no empty index. |
| About | Demonstrate Todd's pattern recognition across industries. | Enterprise buyers validating credibility. | Why should I trust Todd with a complex operating problem? | Career evidence across healthcare, financial services, wealth, capital markets, product, program, workflow modernization. | Start the Diagnostic | Founder credibility architecture, method, category thesis. |
| Contact | Qualify diagnostic demand. | Buyers with an active operational problem. | Is my situation qualified for a diagnostic? | Intake specificity. | Submit Diagnostic Intake | Five-question diagnostic form. |

---

## Founder Credibility Architecture

The About page should demonstrate cross-industry pattern recognition, not position Todd as only a healthcare specialist.

### Healthcare

- Prior Authorization.
- Care Management.
- Enterprise Transformation.
- AI Governance.
- Interoperability.
- UHC / Optum / Cognizant credibility.

### Financial Services

- Hedge Fund Operations.
- Institutional Asset Management.
- Wealth Management.
- Portfolio Management Platforms.
- Advisor Technology.
- TAMP Operations.
- Loan Administration.
- Trade Support & Settlement Operations.
- Enterprise Workflow Modernization.

### Enterprise Operations

- Product Ownership.
- Program Leadership.
- PMO Transformation.
- Operating Model Design.
- Enterprise Program Recovery.
- AI-enabled Decision Systems.

---

## Case Study Architecture

### Current Case Studies

- RachelDelray Operational Intelligence System.
- Prior Authorization Modernization.
- Enterprise Care Management Modernization.
- Healthcare Interoperability Platform.

### Future Case Study Architecture, Placeholders Only

- Enterprise Program Recovery.
- Wealth Management Platform Transformation.
- Capital Markets Operations Modernization.
- Portfolio Operations Workflow Recovery.
- Operational Intelligence System Design.
- AI Adoption Governance.
- Workflow Visibility and Decision Support.
- Transformation Recovery.

### Case Study Structure

- Situation.
- Operational complexity pattern.
- What was invisible or stalled.
- Operational Truth Framework application.
- System, model, or operating change created.
- Outcome.
- Evidence available.
- Evidence missing or gated.
- Industry tag.
- Problem tag.
- Related service.
- CTA.

---

## Content And Authority Architecture

### Insights Categories

- Operational Intelligence.
- Operating Models.
- Transformation Recovery.
- Decision Systems.
- Human-Controlled AI.
- Healthcare Operations.
- Financial Services Operations.
- Wealth Management Technology.
- Capital Markets Operations.
- Workflow Visibility.
- Enterprise Program Recovery.
- Governance and Accountability.

### Authority Architecture

- Lead with the category: Operational Intelligence Systems.
- Use operating models as a first-class intellectual pillar.
- Use healthcare as the first proof-backed market.
- Use financial services, wealth, asset management, and capital markets as credible secondary markets from Todd's career history.
- Use RachelOS as proof of system-building capability.
- Avoid presenting TKO as healthcare-only, AI consulting, PMO consulting, or generic transformation consulting.

---

## SEO Architecture

### Primary Launch SEO

- Operational intelligence systems.
- Healthcare operational intelligence consulting.
- Healthcare transformation recovery.
- Prior authorization workflow modernization.
- Healthcare AI governance.
- Administrative burden reduction.
- Enterprise program recovery.
- Operating model design consulting.

### Secondary Scaffolded SEO

- Financial services operations consulting.
- Wealth management technology transformation.
- Asset management operations consulting.
- Capital markets operations modernization.
- Hedge fund operations workflow.
- Portfolio operations modernization.
- Trade support workflow modernization.
- Settlement operations modernization.
- TAMP operations modernization.
- Regulated operations consulting.
- Enterprise operating systems.

### SEO Rules

- Healthcare pages and proof lead at launch.
- Financial services, wealth, asset management, and capital markets SEO should be scaffolded through metadata, content categories, and future URL reservations.
- Do not publish empty secondary-market landing pages.

---

## Linking And Conversion Architecture

### Primary Conversion Paths

- Homepage -> Diagnostic -> Contact.
- Problem architecture -> Diagnostic -> Contact.
- Industries -> Diagnostic -> Contact.
- Case Study -> Related Service -> Diagnostic -> Contact.
- About -> Diagnostic -> Contact.
- Insight -> Related Case Study or Service -> Diagnostic -> Contact.

### Internal Linking Rules

- Every major page should reinforce the category, the method, the operating problems, and the diagnostic entry point.
- Service pages must stay domain-neutral in structure.
- Industry examples should support relevance without creating separate unproven offers.
- Build and Fractional remain conversion offers, not cold-entry offers.
- Case studies should be tagged by industry and operating problem so future financial services or capital markets proof fits without redesign.

---

## Do Not Change

- Do not make healthcare equal to financial services on the homepage.
- Do not add insurance to the homepage.
- Do not add government to the homepage.
- Do not create six industry landing pages during launch.
- Do not change the CTA.
- Do not change the service ladder.
- Do not publish empty future industry or case study pages.

---

## Assumptions

- The core category is Operational Intelligence Systems for complex enterprises.
- The underlying career pattern is operational complexity, not healthcare.
- Healthcare is the launch wedge because it has the strongest current proof and most direct path to a $25k-$50k diagnostic.
- Financial Services, Wealth and Asset Management, and Capital Markets Operations are valid secondary markets because Todd's history supports them.
- Historical credibility is not the same as current proof; secondary market pages should not be published until they have sufficient content or evidence.
