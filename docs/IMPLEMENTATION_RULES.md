# Implementation Rules

**Read this before every task. These rules are immutable.**

They override convenience, elegance, and any inference you might draw from other
documentation. If a rule conflicts with something else you read, the rule wins.

---

## The 15 rules

**1. Build vertical slices only.**
Every task ships schema → service → route → UI → test. No task delivers a service with no
UI, or a table with no reader. If you cannot see it in the browser, it is not done.

**2. No placeholder implementations.**
No `TODO`, no stub returning mock data, no "wire this up later." If a capability cannot be
completed in this task, it is not in this task's scope.

**3. Every feature must be usable from the UI.**
A server action with no form, or a computed field with no display, is incomplete work.

**4. Every workflow ends with a clear next action.**
No screen leaves the operator asking "now what?" Every terminal state either shows the next
action or explicitly says the work is finished.

**5. Preserve provenance for all inferred facts.**
Every fact carries `basis` (stated / inferred / operator) and a confidence. Every `stated`
fact resolves to exact offsets in immutable source text. AI output is never promoted to
`stated`. Inferred content renders visually distinct from sourced fact — always.

**6. Prefer deterministic logic over AI.**
AI is permitted for prose (narratives, drafts, summaries). AI is forbidden for scores,
rankings, confidences, classifications, and state transitions. If a rule can be written, write
the rule.

**7. AI is never on the critical path.**
Every AI-dependent flow must work when the provider is unavailable. The AI client returns
`unavailable`; it never throws. Degraded output is acceptable; a broken page is not.

**8. Human approval is required before any external communication.**
The system prepares. Todd sends. **No code in this repository may call an email, messaging,
social, or application-submission API on Todd's behalf.** Not behind a flag, not in a
comment, not "for later."

**9. Capture the prediction at decision time.**
Any action that commits Todd's time or reputation writes a decision record *before* the
outcome is known. Retrospective journaling is not a learning loop.

**10. One open next action per opportunity.**
Enforced by a partial unique index, not by convention. An opportunity with zero open next
actions is a defect the UI must surface.

**11. Scores are reproducible.**
Scoring functions are pure — inputs in, result out, no I/O. Identical inputs produce
byte-identical output. Every weight change creates a new policy version; snapshots are
immutable.

**12. Suppress rather than accumulate.**
Dismissed, closed, disqualified, stale, and snoozed records never appear in working views.
The system earns trust by refusing to show work that cannot pay.

**13. Never merge entities silently.**
Ambiguous organizations, people, or opportunities produce an operator prompt. The system
proposes; it does not decide identity.

**14. Every completed task includes tests and updates the docs it invalidates.**
`npm test` green, `npm run lint` clean, `npm run build` succeeds. If a task changes behavior
described in `docs/architecture/`, update that document in the same commit.

**15. If behavior is ambiguous, stop and document the decision.**
Do not guess. Add an entry to `POIS-DECISIONS.md` with context, the options, and your
recommendation, then proceed with the recommendation. A recorded wrong decision is
recoverable; an unrecorded guess is not.

---

## Task contract

No task is complete until all nine hold:

| # | Requirement |
|---|---|
| 1 | **Independently implementable** — no work from a future task is required |
| 2 | **Independently testable** — has its own tests that pass in isolation |
| 3 | **User-visible** — Todd can see or do something new |
| 4 | **Vertically sliced** — schema through UI |
| 5 | **No forward dependencies** — depends only on completed tasks |
| 6 | **Acceptance criteria** — explicit, checkable, in the task |
| 7 | **Rollback plan** — stated, and it works |
| 8 | **Test plan** — automated and manual, both stated |
| 9 | **Migration plan** — stated, or explicitly "none" |

---

## Escalate, do not decide

Stop and ask Todd before:

1. Adding any outbound send capability (email, LinkedIn, application submission).
2. Automating LinkedIn access or scraping any access-controlled source.
3. Changing the FTE comp floor ($225,000) or the income target ($300,000/yr).
4. Adding any paid third-party service.
5. Running a destructive migration, including dropping `OiPursuit` before 2026-10-01.
6. Creating a public-facing surface or anything externally attributable to Todd.
7. Letting AI produce or adjust a score.
8. Adding a route beyond those listed in `POIS-OPERATOR-UX.md` §2.

---

## Where to look

| Question | Document |
|---|---|
| Why does this exist? | `docs/architecture/PERSONAL-OPPORTUNITY-OPERATING-SYSTEM.md` |
| How do the parts fit? | `docs/architecture/POIS-TARGET-ARCHITECTURE.md` |
| What is stored? | `docs/architecture/POIS-DATA-MODEL.md` |
| How is it ranked? | `docs/architecture/POIS-SCORING-AND-DECISION-MODEL.md` |
| What does the screen show? | `docs/architecture/POIS-OPERATOR-UX.md` |
| What order do I build in? | `docs/WORK_PACKAGES.md` |
| What exactly do I build now? | `docs/implementation/` |
| Why was it decided this way? | `docs/decisions/POIS-DECISIONS.md` |
| Known gaps and traps | `docs/archive/opportunity-intelligence/POIS-IMPLEMENTATION-READINESS-REVIEW.md` |

---

## The standard

Todd opens this on a Monday morning, sees the three things worth doing, understands why,
does them, and is measurably closer to replacing his income.

Nothing else counts.
