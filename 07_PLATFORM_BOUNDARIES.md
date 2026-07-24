# TKO Platform Boundaries

**Purpose:** Separate consulting IP, reference implementations, internal production infrastructure, and future product hypotheses
**Decision rule:** Reuse operating primitives; do not collapse distinct domains into one platform narrative

## Boundary summary

| Domain | What it is | What it is not | Commercial role now |
|---|---|---|---|
| **Shared operating model** | Reusable concepts for evidence, facts, state, priority, decisions, approval, action, and outcome | A deployed shared software platform | Consulting method and design vocabulary |
| **TKO** | Principal-led consulting business, current PA offers, buyer journey, delivery methodology, and proof system | A software product company or generic AI consultancy | The entity clients hire |
| **RachelOS** | Live, Rachel-specific operating system and strongest implementation proof | A horizontal SaaS product or healthcare solution | Reference implementation and method evidence |
| **TIF** | Internal, human-reviewed evidence-to-asset production and traceability system | A complete knowledge platform, autonomous content engine, or client SaaS | Internal delivery and authority infrastructure |
| **BoundOS** | Future product hypothesis / tenant label | A proven product, platform, or current offer | Deferred |
| **General consulting platform** | Potential future composition of proven, repeated delivery primitives | Something the repository currently proves is needed | Do not build or sell |

## 1. Shared operating model

The repository supports a conceptual operating model that can be used across engagements:

```text
Signal → Memory → Fact → State → Priority → Recommendation
→ Human Approval → Action → Outcome
```

Supporting cross-domain controls include:

- evidence and provenance;
- source authority;
- missing-fact visibility;
- decision rights;
- exception and escalation;
- canonical queue or operating view;
- action and decision logs;
- operational health;
- Built / Activated / Validated gates;
- measurement and learning;
- human-reviewed reuse of evidence.

This is shared **method IP**, not proof of a shared runtime. A client may implement the model with existing systems, procedures, dashboards, work queues, or small extensions.

## 2. TKO

### TKO owns

- market positioning and offers;
- the Evidence-to-Operating-Decision Method;
- assessment instruments and delivery playbooks;
- healthcare operating frameworks and bounded experience;
- the maturity model and quality controls;
- client decision briefs, workflow maps, registers, roadmaps, and pilot methods;
- commercial qualification and engagement governance;
- claim-boundary and confidentiality discipline;
- the decision about what becomes reusable TKO IP.

### TKO does not own by default

- client source data;
- client-specific policy, rules, workflow, artifacts, or confidential knowledge;
- clinical decisions or legal interpretations;
- Rachel-specific operating logic as a generalized product;
- employer or current-client confidential information;
- outcome attribution that the evidence cannot support.

### TKO's current software

The current repository supplies:

- public positioning and service pages;
- selected work and insight content;
- qualified contact intake;
- durable inbound-lead persistence and notification;
- privacy-bounded conversion telemetry;
- protected internal TIF operator surfaces.

These capabilities support the consulting business. They are not the consulting product.

## 3. RachelOS

### RachelOS owns

- residential real-estate intake and relationship records;
- Rachel-specific fact taxonomy;
- journey and lifecycle interpretation;
- lead scoring and priority logic;
- canonical lead queue;
- Today and Needs Rachel operator views;
- daily action digest;
- outreach drafting and copy safety;
- email, SMS, nurture, referral, and content-recommendation behavior;
- Rachel-specific operational health and outcomes.

### What transfers

RachelOS proves that Todd can:

- move knowledge out of one person's head;
- preserve source authority and fact history;
- separate facts from interpreted state;
- surface the highest-value missing fact;
- create an explainable canonical work queue;
- keep consequential action under human approval;
- log action and update memory;
- expose system and workflow health;
- learn from failed or dormant features.

The deeper RachelDelray corpus also proves the ability to reconcile competing lifecycle models, close integration handoff gaps, repair production observability, design fail-closed outbound governance, and revise operator interaction models after use. These are founder delivery capabilities, not RachelOS product features.

### What does not transfer automatically

- scoring weights;
- queue ranking;
- lifecycle derivation;
- relationship-state derivation;
- lead taxonomy;
- message and nurture rules;
- referral logic;
- real-estate content and geography.

Those are domain-specific implementations. They must not be modified or generalized as part of this discovery.

## 4. TIF

### Persisted runtime truth

TIF currently persists or operates:

- `CaptureItem` for raw intake;
- `ContentInventoryItem` for inventory;
- `Evidence` as the proof registry;
- `AssetOpportunity` and evidence links;
- `Asset` with draft → review → approved → published lifecycle;
- `AssetVersion`;
- `RevisionRequest`;
- `DerivativeAsset`;
- `KnowledgeDiagram` and `AssetDiagram`;
- deterministic deliverable-readiness and authority-work read models;
- human-reviewed compose contracts and channel-package gates.

### TIF's proper role

TIF supports:

```text
Evidence → Opportunity → Asset → Version → Derivative → human publication
```

It can help TKO:

- preserve engagement evidence boundaries;
- turn reviewed findings into reusable internal assets;
- avoid unsupported claims;
- show missing proof and production blockers;
- version and revise artifacts;
- produce channel derivatives without losing traceability.

### What TIF does not currently provide

- persisted Experience, Problem, Pattern, or Framework registries;
- a complete client-engagement / assessment runtime;
- automatic fact resolution;
- autonomous research or pattern discovery;
- generalized LLM composition of client deliverables;
- publication destination records;
- measurement records or causal attribution;
- automated publishing;
- semantic or vector retrieval;
- a client-facing collaboration or consulting platform.

The strategy documents sometimes describe the full Knowledge → Insight → Deliverable → Channel Package → Publication → Measurement loop. The runtime currently proves only a bounded portion. [`docs/TIF_RUNTIME_MODEL.md`](docs/TIF_RUNTIME_MODEL.md) governs this distinction.

## 5. BoundOS

BoundOS appears as a future product idea and a TIF tenant / content context. The repository does not establish:

- a validated buyer;
- a repeated client workflow;
- multi-tenant product behavior;
- security or integration requirements;
- paid adoption;
- measurable outcomes;
- a product operating model.

BoundOS should remain a hypothesis until consulting engagements reveal a repeated, costly operating primitive that clients ask to retain.

## 6. General consulting platform

No general platform should be built for the first client.

A future platform would be justified only after multiple engagements show the same:

- source and evidence model;
- workflow state transitions;
- decision-rights structures;
- queue and prioritization needs;
- client roles and approval boundaries;
- integrations;
- security and data-handling requirements;
- adoption pattern;
- willingness to pay for retained software rather than consulting artifacts.

Even then, extension and composition should precede a new service or architecture.

## 7. Ownership matrix

| Primitive / capability | Shared method | TKO | RachelOS | TIF | BoundOS / future |
|---|:---:|:---:|:---:|:---:|:---:|
| Evidence hierarchy | ✓ | governs | applies | implements partially | may reuse |
| Consulting assessment | method | owns | proof only | may store artifacts | not established |
| Workflow map | ✓ | delivers | domain implementation | may store asset | may reuse |
| Fact / provenance model | ✓ | designs | implements | evidence lineage | may reuse |
| Domain state model | pattern | defines per engagement | owns Rachel state | not assessment state | unknown |
| Scoring / queue ranking | pattern only | designs when justified | owns Rachel logic | production readiness only | unknown |
| Human approval | ✓ | delivery control | action control | asset control | may reuse |
| Action execution | pattern | client-specific | implements Rachel actions | does not execute client work | unknown |
| Outcome measurement | ✓ | defines and assesses | partial implementation | not persisted | unknown |
| Asset production | method | owns content decision | consumes some assets | implements spine | tenant concept only |
| Publication | human gate | owns TKO channels | Rachel channels own theirs | record incomplete | unknown |
| Client data / workflow | no | client-governed | Rachel-only | do not centralize by default | unknown |

## 8. Integration principles

1. **Compose through contracts, not shared databases.**
2. **Keep domain facts and decision rules with the domain owner.**
3. **Use TIF for reviewed artifact lineage, not operational execution.**
4. **Use RachelOS as proof and a pattern library, not a dependency of client delivery.**
5. **Do not copy client evidence into public or cross-tenant assets without explicit review.**
6. **Do not infer platform requirements from one implementation.**
7. **Add a primitive only after a real engagement exposes a repeated need.**

## 9. Naming and claim controls

Use:

- “TKO consulting method”
- “RachelOS reference implementation”
- “TIF internal evidence and asset-production system”
- “BoundOS future hypothesis”
- “reusable operating primitives”

Avoid:

- “TKO platform”
- “enterprise AI platform”
- “healthcare operating system product”
- “proven horizontal SaaS”
- “autonomous intelligence factory”
- “knowledge graph” when describing a set of explicit relational links

## Primary source basis

- [`GOVERNANCE.md`](GOVERNANCE.md)
- [`CURRENT_REALITY.md`](CURRENT_REALITY.md)
- [`docs/TIF_RUNTIME_MODEL.md`](docs/TIF_RUNTIME_MODEL.md)
- [`docs/TIF_CAPABILITY_AND_USE_CASE_AUDIT_2026_07_22.md`](docs/TIF_CAPABILITY_AND_USE_CASE_AUDIT_2026_07_22.md)
- [`docs/RACHELOS_TIF_INTEGRATION_AUDIT.md`](docs/RACHELOS_TIF_INTEGRATION_AUDIT.md)
- [`asset-production/rachelos-delivery-model/11_REPLICABILITY_ASSESSMENT.md`](asset-production/rachelos-delivery-model/11_REPLICABILITY_ASSESSMENT.md)
- [`docs/FOUNDER_AUTHORITY_REWRITE.md`](docs/FOUNDER_AUTHORITY_REWRITE.md)
- [`09_TODD_OPERATING_PATTERN_ANALYSIS.md`](09_TODD_OPERATING_PATTERN_ANALYSIS.md)
