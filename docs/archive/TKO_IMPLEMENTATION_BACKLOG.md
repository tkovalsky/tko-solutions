# TKO Site Repositioning Implementation Backlog

**Source baseline:** `CURRENT_REALITY.md`, `DECISIONS.md`, existing TKO site
architecture, proof libraries, guides, case studies, and RachelOS documentation.

**Dependency note:** `TKO_POSITIONING_V2.md` was requested as an input but is not present in
this repository. This backlog records the approved Phase 1 scope and uses the authoritative
reality and proof documents available here. No capability or proof claim is added by this
backlog.

## P0 — Phase 1

### Navigation

- **Objective:** Make the primary path problem-, proof-, and assessment-led while retaining
  every existing route.
- **Files impacted:** `src/components/site/header.tsx`, `src/components/site/footer.tsx`,
  `src/app/sitemap.ts`.
- **Dependencies:** New `/problems`, `/proof`, and `/assessment` routes.
- **Status:** NOT STARTED

### Homepage

- **Objective:** Answer what operational problem TKO solves before describing systems,
  technology, or services.
- **Files impacted:** `src/app/page.tsx`, `src/components/site/hero.tsx`,
  `src/components/site/cta-band.tsx`, `src/lib/site.ts`.
- **Dependencies:** Existing RachelOS proof assets and problem taxonomy.
- **Status:** NOT STARTED

### Problems Hub

- **Objective:** Create an executive discoverability hub for hidden work, decision latency,
  human API dependency, operational bottlenecks, and systems of action.
- **Files impacted:** `src/app/problems/page.tsx`, `src/lib/content.ts`,
  `src/app/sitemap.ts`.
- **Dependencies:** Existing problem statements and published guides; detailed problem pages
  remain Phase 2.
- **Status:** NOT STARTED

### Proof Hub

- **Objective:** Create an evidence-first registry that distinguishes built systems,
  operational recovery, healthcare transformation background, and supporting methods.
- **Files impacted:** `src/app/proof/page.tsx`, `src/app/sitemap.ts`.
- **Dependencies:** `CURRENT_REALITY.md`, `content/case-studies.md`, and the proof libraries.
- **Status:** NOT STARTED

### Assessment Page

- **Objective:** Establish `/assessment` as the primary conversion page for a concrete
  workflow, execution, or transformation-recovery problem.
- **Files impacted:** `src/app/assessment/page.tsx`, `src/components/site/cta-band.tsx`,
  `src/components/site/page-hero.tsx`, `src/app/sitemap.ts`.
- **Dependencies:** Existing intake at `/contact` and recovery-assessment deliverables.
- **Status:** NOT STARTED

### RachelOS Proof Page

- **Objective:** Publish the evidence-backed flagship proof asset without asserting revenue,
  adoption, ROI, or client outcomes that have not been measured.
- **Files impacted:** `src/app/proof/rachelos/page.tsx`, `src/app/sitemap.ts`.
- **Dependencies:** `content/proof/rachelos/evidence.yaml`,
  `content/proof/rachelos/RACHELOS_EVIDENCE_LIBRARY.md`,
  `content/architecture-overview.md`, and `public/proof/rachelos/*`.
- **Status:** NOT STARTED

### SEO Preservation

- **Objective:** Preserve all existing indexable routes, canonical URLs, structured data,
  sitemap coverage, and internal-link paths while adding P0 pages.
- **Files impacted:** `src/app/layout.tsx`, `src/lib/site.ts`, `src/app/sitemap.ts`,
  existing route metadata.
- **Dependencies:** Existing route inventory and canonical metadata.
- **Status:** NOT STARTED

### Redirect Strategy

- **Objective:** Retain existing URLs; add redirects only when a future canonical replacement
  is approved and ensure no page is orphaned.
- **Files impacted:** `src/app/case-studies/page.tsx`, `src/app/industries/page.tsx`,
  `src/app/case-studies/[slug]/page.tsx`, future redirect configuration if needed.
- **Dependencies:** Final canonical-route decisions for Phase 2 or Phase 3.
- **Status:** NOT STARTED

#### Phase 1 redirect decision

No redirect is required in Phase 1 because no existing public route is removed, renamed, or
replaced. The new routes are additive:

- `/problems`
- `/proof`
- `/proof/rachelos`
- `/assessment`

Existing URLs remain canonical to themselves, including `/services/*`, `/selected-work/*`,
`/insights/*`, and `/contact`. Existing `/case-studies/*` and `/industries` redirects remain
unchanged. Any later move from `/selected-work` to `/proof` requires a specific 301 map,
canonical update, sitemap change, and internal-link migration before implementation.

## P1 — Phase 2

### Problem Pages

- **Objective:** Expand the P0 Problems Hub into individual, evidence-linked executive pages.
- **Files impacted:** New `src/app/problems/[slug]/page.tsx` or explicit route pages,
  `src/lib/content.ts`, `src/app/sitemap.ts`.
- **Dependencies:** P0 Problems Hub, approved problem-page content model, and proof mapping.
- **Status:** NOT STARTED

### Human API Dependency

- **Objective:** Explain key-person dependency as a diagnostic finding and knowledge-
  concentration risk, not a standalone product.
- **Files impacted:** Future `/problems/human-api-dependency` route and related guide links.
- **Dependencies:** RachelOS relationship-memory proof and healthcare evidence library.
- **Status:** NOT STARTED

### Decision Latency

- **Objective:** Explain the cost of decisions stalled between signals, ownership, and action.
- **Files impacted:** Future `/problems/decision-latency` route and guide content.
- **Dependencies:** Transformation and canonical-queue evidence.
- **Status:** NOT STARTED

### Revenue Leakage

- **Objective:** Connect neglected relationships, stale follow-up, and silent workflow failure
  to recoverable value without claiming unmeasured revenue.
- **Files impacted:** Future `/problems/revenue-leakage` route.
- **Dependencies:** RachelOS outcome instrumentation and approved measurement language.
- **Status:** NOT STARTED

### Transformation Recovery

- **Objective:** Show how dependency risk, decision rights, and visibility gaps derail
  multi-team programs.
- **Files impacted:** Future `/problems/transformation-recovery` route.
- **Dependencies:** Healthcare transformation story library and role-boundary review.
- **Status:** NOT STARTED

### AI Without Operational Control

- **Objective:** Explain why governed workflow, exception handling, and human approval must
  precede AI deployment.
- **Files impacted:** Future `/problems/ai-without-operational-control` route.
- **Dependencies:** RachelOS authority, approval, and safety evidence.
- **Status:** NOT STARTED

## P2 — Phase 3

### Guide Expansion

- **Objective:** Build an executive guide cluster around operational bottlenecks, systems of
  action, decision latency, and workflow recovery.
- **Files impacted:** `src/content/insights/*`, `src/lib/insights.ts`, guide templates.
- **Dependencies:** P1 problem-page taxonomy and approved editorial priorities.
- **Status:** NOT STARTED

### Outcome Pages

- **Objective:** Add pages for decision speed, throughput, accountability, revenue protection,
  and governed AI adoption after measurement language is approved.
- **Files impacted:** Future `src/app/outcomes/*` routes and sitemap.
- **Dependencies:** Measurable baselines and client-approved evidence where outcomes are named.
- **Status:** NOT STARTED

### Healthcare Proof Expansion

- **Objective:** Turn healthcare advisory patterns into explicitly bounded background proof.
- **Files impacted:** Future `/proof/healthcare-*` routes and proof assets.
- **Dependencies:** Claim review, client anonymity, and role-boundary validation.
- **Status:** NOT STARTED

### Content Factory Proof

- **Objective:** Package content operations as supporting workflow proof, not a separate
  agency offering.
- **Files impacted:** Future `/proof/content-factory` route and TIF evidence references.
- **Dependencies:** Production evidence and measurement that can be publicly stated.
- **Status:** NOT STARTED

### Additional Proof Assets

- **Objective:** Add verified product ownership, operational recovery, and supporting-method
  proof assets only after their evidence dossiers are complete.
- **Files impacted:** Future proof routes, content registries, screenshots, and diagrams.
- **Dependencies:** Proof-admission review and claim guards.
- **Status:** NOT STARTED
