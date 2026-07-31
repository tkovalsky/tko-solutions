# TKO Solutions Positioning Rebuild Report

Date: 2026-06-20

## Executive Summary

The public site has been repositioned from a framework-first operational consulting narrative into an Operational Intelligence consultancy narrative.

The new spine is:

1. Organizations already have data, dashboards, CRMs, reports, workflows, meetings, and spreadsheets.
2. The missing layer is a decision system: what matters, who needs attention, and what action should happen next.
3. TKO builds Operational Intelligence Systems: the layer between data and action.
4. RachelOS is the featured proof point, presented second in the discovery sequence after the problem statement.
5. Services are framed as Operational Diagnostic, Operational Intelligence System Build, and Fractional Operational Intelligence Advisor.

## Audit Scope

Audited rendered public-facing routes:

- `/`
- `/services`
- `/services/diagnostic`
- `/services/operating-system-build`
- `/services/fractional-advisor`
- `/industries`
- `/case-studies`
- `/case-studies/[slug]`
- `/about`
- `/insights`
- `/contact`
- Global layout, metadata, navigation CTA, footer, reusable hero/CTA/card/template components, shared content constants, sitemap-fed content.

Non-rendered strategy/content documents under `content/` and historical documents under `docs/` were reviewed through search but not rewritten as part of this implementation.

## Conflicting Messaging Found

- Homepage led with "Operational Intelligence Systems for Complex Organizations," which was category-first rather than symptom-first.
- Existing service language used "Operational Intelligence Diagnostic," "Operating System Build," and "Fractional Operating System Advisor," which made the offer feel more framework-oriented than executive-problem oriented.
- Rachel proof was present but not sequenced as featured proof immediately after the problem statement.
- Industry messaging leaned toward healthcare-first launch architecture and older regulated-industry categories instead of the requested Healthcare, Financial Services, Technology, and Private Equity emphasis.
- About page positioned credibility around pattern recognition and chronology more than operator-first decision-system building.
- Some copy leaned on "framework," "operating system," "transformation recovery," and proof-governance language that was useful internally but less resonant for Director+ buyers.
- Metadata did not consistently support the requested SEO terms around operational intelligence, workflow optimization, revenue operations, healthcare operations, process modernization, human-in-the-loop AI, operating model design, and operational decision making.

## Page-by-Page Change Plan and Implementation

| Page | Old narrative | New narrative | Implemented |
| --- | --- | --- | --- |
| Homepage | Category-first: Operational Intelligence Systems for complex organizations. | Symptom-first: "The Missing Layer Between Data and Action"; first discovery is the decision-system problem; second discovery is RachelOS as proof. | Yes |
| `/services` | Three-rung ladder framed around operational truth and operating-system language. | Operational Diagnostic -> Operational Intelligence System Build -> Fractional Operational Intelligence Advisor. Capabilities live inside Build, not as products. | Yes |
| `/services/diagnostic` | $25K-$50K Operational Intelligence Diagnostic, 3 weeks, recovery-roadmap framing. | 2-3 week Operational Diagnostic, starting at $15K, focused on workflow assessment, decision analysis, bottlenecks, AI opportunity review, and roadmap. | Yes |
| `/services/operating-system-build` | Operating System Build, technical-system framing. | Operational Intelligence System Build as the decision layer between data and action. | Yes |
| `/services/fractional-advisor` | Fractional Operating System Advisor focused on cadence and transformation momentum. | Fractional Operational Intelligence Advisor focused on reviews, workflow governance, AI adoption guidance, prioritization, and execution oversight. | Yes |
| `/case-studies` | Proof organized by operating problem and evidence status. | Proof that the decision-system gap can be solved; RachelOS is the featured proof point after the problem statement. | Yes |
| `/case-studies/from-crm-to-operating-system` | RachelDelray relationship intelligence proof with platform-oriented capability evidence. | RachelOS as live Operational Intelligence proof: 100+ relationships, fragmented information, institutional memory, trusted next action, human-approved AI. | Yes |
| Healthcare case studies | Included gated resume-attributed metrics and stronger platform language. | Kept as anonymized enterprise proof, reduced inflated metrics, focused on workflow modernization, administrative burden, care operations, process visibility, and AI adoption. | Yes |
| `/industries` | Healthcare-first launch wedge plus older secondary markets. | Healthcare, Financial Services, Technology, and Private Equity, each tied to operational intelligence and execution visibility. | Yes |
| `/about` | Pattern-recognition credibility architecture. | Todd as operator first, technologist second; enterprise healthcare leadership, modernization, workflow transformation, operational execution, RachelOS proof. | Yes |
| `/insights` | Transformation recovery, workflow visibility, governance, human-controlled AI content architecture. | Future content pillars aligned to Operational Intelligence, Workflow Optimization, Operational Excellence, Revenue Operations, Customer Lifecycle Management, Healthcare Operations, AI Workflow Automation, Operational Strategy, Process Modernization, Human-in-the-Loop AI, Operating Model Design, and Operational Decision Making. | Yes |
| `/contact` | Start the Diagnostic intake for active visibility/transformation problems. | Schedule an Operational Diagnostic for teams with data but unclear priorities, attention, and next actions. | Yes |
| Global metadata/layout/footer/CTA | Generic Operational Intelligence Systems and "Start the Diagnostic." | Missing layer between data and action, Operational Diagnostic CTA, broader SEO-aligned `knowsAbout`. | Yes |

## Pages and Files Changed

Rendered page files:

- `src/app/page.tsx`
- `src/app/services/page.tsx`
- `src/app/services/diagnostic/page.tsx`
- `src/app/services/operating-system-build/page.tsx`
- `src/app/services/fractional-advisor/page.tsx`
- `src/app/industries/page.tsx`
- `src/app/case-studies/page.tsx`
- `src/app/case-studies/[slug]/page.tsx`
- `src/app/about/page.tsx`
- `src/app/insights/page.tsx`
- `src/app/contact/page.tsx`
- `src/app/layout.tsx`

Shared content/components:

- `src/lib/content.ts`
- `src/lib/site.ts`
- `src/components/site/hero.tsx`
- `src/components/site/service-template.tsx`
- `src/components/site/cta-band.tsx`
- `src/components/site/diagnostic-form.tsx`
- `src/components/site/founder.tsx`
- `src/components/site/footer.tsx`
- `src/components/site/cards.tsx`
- `src/components/site/industry-pattern.tsx`
- `src/components/site/problem-grid.tsx`
- `src/components/site/page-hero.tsx`

## Metadata Updates

Updated metadata to naturally support:

- Operational Intelligence
- Workflow Optimization
- Operational Excellence
- Revenue Operations
- Customer Lifecycle Management
- Healthcare Operations
- AI Workflow Automation
- Operational Strategy
- Process Modernization
- Human-in-the-Loop AI
- Operating Model Design
- Operational Decision Making

The terms are included in page descriptions, content pillars, organization JSON-LD, service metadata, and page copy where contextually relevant.

## Remaining Gaps

- The route slug `/services/operating-system-build` remains unchanged for continuity. Visible copy now uses "Operational Intelligence System Build."
- The case study slug is now `/case-studies/from-crm-to-operating-system` to describe the business problem before the reader knows RachelOS. Visible copy now uses "RachelOS."
- Non-rendered `content/` documents still contain older language such as RachelDelray, CRM comparisons, Operating System Build, and Operational Intelligence Diagnostic. These appear to be internal strategy/source docs, not rendered pages.
- No new industry-specific landing pages were created. The current implementation keeps industries consolidated to avoid unsupported vertical claims.
- The insights area is still an architecture page, not a published article library.
- The contact submission success message still notes that production storage must be connected; the server action behavior was preserved.

## Recommended Future Content

- Publish a focused RachelOS case study page with visual walkthrough sections for operational memory, prioritization, trusted next action, and human approval.
- Add one executive explainer: "Operational Intelligence vs. Business Intelligence."
- Add one conversion article: "Why Dashboards Do Not Create Decisions."
- Add one healthcare article: "Administrative Burden Is a Workflow Decision Problem."
- Add one revenue/customer lifecycle article: "Why Customer Success Teams Miss Accounts Even When the CRM Is Updated."
- Add one private equity article: "Operational Leverage Requires Execution Visibility."
- Add one service one-pager PDF for the 2-3 week Operational Diagnostic.
- Later, consider preserving old route slugs with redirects if the visible service URLs are changed to `/services/operational-intelligence-system-build`.

## Verification

- `npm run lint` passed.
- `npm run build` passed.
