Implement Work Package WP-001.

Stories

- POIS-001-reorganize-module-layout
- POIS-002-consolidate-prisma-clients
- POIS-003-add-todd-v2-capability-profile

Read only:

- docs/IMPLEMENTATION_RULES.md
- docs/CODEX_OPERATING_MODEL.md
- the implementation stories listed above
- only the documents explicitly referenced by those stories

Requirements

Implement the stories sequentially.

Honor every story's scope.

Do not widen scope.

Do not redesign architecture.

Do not implement stories outside this work package.

If one story blocks the package:

STOP.

Explain exactly why.

Otherwise continue.

When the package is complete:

• Run every validation command required by the stories.

• Run lint.

• Run tests.

• Run build.

• Verify every acceptance criterion.

• Update documentation if required.

Return:

1. Summary
2. Files changed
3. Validation results
4. Remaining risks
5. Ready for review

Stop.