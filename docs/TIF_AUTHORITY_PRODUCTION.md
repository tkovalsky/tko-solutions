# Authority Production Bundle and Growth Loop

**Status:** Composition policy. This document does not create Asset types, registries, publishing automation, or measurement records.

## Authority Production Bundle

One approved Experience **contract** may be compiled into a reviewed package only after Evidence, problem/pattern/framework references, and diagram requirements have been evaluated. The package is a manifest, not a persisted runtime object.

```text
Experience → Evidence → Knowledge Diagram → Framework → Assessment
→ Executive Summary → Guide → Operator Note → Case Study → Checklist → FAQ
→ Presentation → Proposal Module → LinkedIn Package → Recovery Assessment Insert
→ SEO Cluster → Book Chapter
```

Every output maps to the current production spine:

| Bundle output | Current representation |
|---|---|
| Knowledge Diagram | `Asset(assetType=knowledge_diagram)` + `KnowledgeDiagram`; consuming works use `AssetDiagram`. |
| Framework, Assessment, Executive Summary, Guide, Operator Note, Case Study, Checklist, FAQ, Presentation, SEO Cluster, Book Chapter | An existing `Asset` only after a reviewer selects an existing compatible `AssetType`; the compiler brief is not a new type. |
| Proposal Module, LinkedIn Package, Recovery Assessment Insert | `DerivativeAsset` of a reviewed parent Asset when the existing derivative type fits; otherwise a review candidate awaiting an approved compatible mapping. |

The existing `Asset` lifecycle is mandatory for every output: draft → review → approved → published. An output can narrow inherited claim boundaries but never broaden them. No bundle member is auto-created, auto-approved, or auto-published.

## Composition controls

1. Evidence IDs and proof references remain attached through existing `AssetEvidence` lineage.
2. Compiler candidates preserve inherited claim boundaries and strictest source status.
3. The Opportunity Adapter sends candidates through human duplicate/lineage review before the existing `AssetOpportunity` is created.
4. Knowledge Diagram metadata stays on the `KnowledgeDiagram` Asset extension, not on a parallel visual registry.
5. Channel work belongs to `DerivativeAsset`; it does not justify copying the source Asset or Evidence.

## Authority Growth Loop

```text
manual publication → future measurement → observed lesson → CaptureItem
→ human Evidence admission → updated Framework contract → reviewed Asset revision
→ improved authority
```

Current implementation reaches only this safe, observable portion:

```text
Asset status: published → human observation → CaptureItem → Evidence → revised Asset
```

Publication destination and measurement are not persisted yet. Until they are, an observed lesson must be captured with source context and re-admitted as Evidence; it may not be treated as an attributed result. The learning loop is therefore continuous in operating practice, but not yet a complete runtime lifecycle.
