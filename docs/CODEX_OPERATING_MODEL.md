# Codex Operating Model

**Read this second, after `docs/IMPLEMENTATION_RULES.md`, before every implementation session.**

This document governs *how* Codex executes work. `IMPLEMENTATION_RULES.md` governs *what*
is true of the finished product. Where they overlap, `IMPLEMENTATION_RULES.md` wins — except
for the one explicit amendment in §2 below, which Todd has authorized.

---

## 1. Implementation philosophy

Claude plans. Codex implements. One story, one PR, one focused session.

```
Claude → writes a story → Codex → implements exactly ONE story → tests → stops
                                                                            ↓
                                                              Todd reviews → merges → repeat
```

Codex never needs to hold the whole project in context. Every session needs exactly:

1. `docs/IMPLEMENTATION_RULES.md`
2. `docs/CODEX_OPERATING_MODEL.md` (this file)
3. One file from `docs/implementation/`
4. Only the documents that story's **Referenced Documents** section names — and only the
   sections it names, not the whole document.

If a story seems to require reading something outside that list to be implementable, the
story is defective. Stop and report it as defective rather than reading further afield.

---

## Architecture Freeze

Architecture is frozen after WP-005.

No redesigns.

No repository-wide refactors.

No renaming.

No reorganizing.

No "better architecture."

Implementation only.

---

## Completion Bias

When multiple reasonable implementations exist:

- prefer the smallest implementation
- prefer the implementation requiring the fewest files
- prefer existing patterns
- prefer shipping over elegance

The objective is a usable Personal Opportunity Intelligence System before October 1.

Repository elegance is secondary to shipping.

---

## 2. Scope boundaries

### 2.1 One story per session, no exceptions
Implement exactly the story in front of you. Do not implement its "Next Story" pointer in
the same session, even if it looks trivial or related.

### 2.2 No forward dependencies
A story's **Dependencies** section lists every prior story it needs merged. If a dependency
is not yet merged, stop and report — do not implement out of order and do not implement the
dependency yourself.

### 2.3 Sub-lettered story chains are the one amendment to Rule 1
`IMPLEMENTATION_RULES.md` Rule 1 requires every task to ship schema → service → route → UI →
test, and Rule 3 forbids a service with no UI. The story backlog now splits some of those
vertical slices into a lettered chain (`POIS-105A` … `POIS-105E`) so each PR stays small.

**This is intentional, not a violation.** A lettered chain is one vertical slice divided into
sequential checkpoints:

- Intermediate letters (`105A`, `105B`, `105C`, `105D`) may land logic, schema, or a service
  with **no UI change**. Their Definition of Done is scoped to their own story only — their
  own tests pass, the build succeeds, nothing regresses. They are explicitly **not**
  Todd-user-visible yet, and their acceptance criteria must say so.
- The **final letter** in the chain (`105E`) is where Rules 1 and 3 apply in full: it must
  make the completed logic visible and usable, and only then is the parent capability "done"
  in the Rule-1 sense.
- A chain must complete within the same milestone. Do not leave a milestone with logic merged
  and no story yet scheduled to surface it.
- M0 stories remain the sole exception where *no* letter in the chain is user-visible — this
  was already true before this refactor (`POIS-CODEX-TASKS.md` M0 preamble) and is unchanged.

This amendment is recorded as **D-031** in `POIS-DECISIONS.md`.

### 2.4 Never widen scope
If implementation reveals the story is incomplete or wrong, do not silently expand it. Stop,
implement what is correctly scoped, and report the gap for Claude to turn into a new story.

### 2.5 Never touch files outside "Files Expected"
If a story's file list turns out to be wrong, stop and report rather than editing files the
story didn't name. Exception: a story marked "Determined during implementation" — in that
case, list the files you touched in your report.

**Exception:** Mechanical updates to imports, exports, barrel files, type imports, test
imports, and generated references that are strictly required by an approved file move or
rename are permitted. These changes must not alter behavior and do not constitute scope
expansion.

---

## 3. Documentation loading rules

- Load only what the story's **Referenced Documents** section names.
- When a reference names a section (`POIS-SCORING-AND-DECISION-MODEL.md §6`), read only that
  section, not the whole document.
- Never read `POIS-TARGET-ARCHITECTURE.md`, `POIS-DATA-MODEL.md`, or
  `POIS-SCORING-AND-DECISION-MODEL.md` in full "just in case." If a story under-references and
  you cannot proceed without more context, stop and report the gap — do not go exploring.
- `POIS-CODEX-TASKS.md` and `POIS-CODEX-IMPLEMENTATION-PLAN.md` are historical master
  documents. They are **not** loaded per session. They exist so a human can see the original
  milestone-level shape; the story file is always the authority for what to build.

---

## 4. Definition of done

A story is done only when all of these hold:

1. Every item in **Acceptance Criteria** is checked.
2. `npm test` is green. No test deleted, skipped, or weakened to pass.
3. `npm run lint` is clean.
4. `npm run build` succeeds.
5. Every command in **Validation** has been run and passed.
6. **Rollback** has been stated and is actually true of the diff produced (don't state a
   rollback plan that doesn't match what you built).
7. If the story is a **final letter** in a chain (§2.3), the capability is visible/usable by
   Todd. If it is an **intermediate letter**, no user-visible claim is made.
8. No `TIF_ACCESS_KEY` bypass introduced.
9. No outbound send capability introduced (email, LinkedIn, application submission, or any
   messaging/social API) — this is absolute, per `IMPLEMENTATION_RULES.md` Rule 8.
10. Any doc under `docs/architecture/` that the change invalidates is updated in
    the same commit.

---

## 5. Testing requirements

- Pure domain logic (scoring, classification, derivation tables): fixture-based unit tests,
  deterministic, no I/O.
- Server actions: Zod validation tests (reject malformed input; accept valid input).
- Pages/components: render tests for empty, loading, and error states at minimum.
- Golden fixtures named in a story (e.g., the five §14 worked examples) must reproduce
  **exactly** — not approximately, not "close enough."
- Never delete or skip an existing test to make a story pass. If a story's change makes an
  existing test obsolete, that must be explicit in the story's Scope; if it isn't, stop and
  report rather than deleting the test yourself.

---

## 6. Validation requirements

Run only the commands the story's **Validation** section lists. Common ones:

- `npm test`
- `npm run lint`
- `npm run build`
- `npx prisma validate`
- `npx prisma generate`
- `npm run tif:migrate:status`

Do not run a broader validation suite than the story asks for — if the story's list is
insufficient to be confident the change is safe, that is a defect in the story; report it
rather than silently expanding validation.

---

## 7. Stopping rules

Stop and report back to Todd/Claude — do not proceed — when:

1. A dependency story is not yet merged.
2. The story requires touching a file not in "Files Expected" (and isn't marked "Determined
   during implementation").
3. Implementation reveals the story's scope is ambiguous or internally inconsistent.
4. Any of the eight escalation triggers in `IMPLEMENTATION_RULES.md` ("Escalate, do not
   decide") would be crossed.
5. A test would need to be deleted, skipped, or weakened to make the story pass.
6. The story is the final letter of a chain and the prior letters aren't actually merged yet.

Escalation is not failure. A story that stops with a clear reason is more valuable than one
that guesses past a real ambiguity.

---

## 8. Output format

Every session ends with a short report, not a narrative:

```
Story: POIS-105D
Status: Done | Blocked | Partial
Files changed: <list>
Tests added/changed: <list>
Validation run: <commands + pass/fail>
Rollback verified: yes/no
Notes: <anything Claude needs to know before writing the next story>
```

Then stop. Do not start the next story. Do not re-summarize the whole milestone.

---

## 9. Pull request expectations

- One story = one PR = one reviewable diff.
- PR title: the story's ID + slug (e.g., `POIS-105D — composite score index and golden
  fixtures`). The filename already gives you this.
- PR description: paste the story's **Story** and **Acceptance Criteria** sections. Do not
  write a new summary from scratch.
- Expected diff size is stated in the story (Small/Medium/Large). If your diff is
  meaningfully larger than stated, say so in the report — it may mean the story should have
  been split further, which is feedback for Claude, not a reason to trim your own tests.

---

## 10. Things Codex must never do

1. Never implement more than one story per session.
2. Never add an outbound communication capability of any kind.
3. Never let AI output become a score, ranking, confidence, or state transition
   (`IMPLEMENTATION_RULES.md` Rule 6).
4. Never introduce a vector database, graph database, or agent framework.
5. Never add a new route not already listed in `POIS-OPERATOR-UX.md` §2.
6. Never change the FTE comp floor ($225,000) or income target ($300,000) without Todd's
   explicit sign-off.
7. Never run a destructive migration or drop `OiPursuit` before 2026-10-01.
8. Never delete, skip, or weaken a test to make a story pass.
9. Never read architecture/data-model/scoring documents beyond what the story references.
10. Never treat a story's "Next Story" pointer as authorization to start it.
11. Never merge two stories' diffs into one PR, even if they touch the same file.
12. Never guess past an ambiguity — stop and report, per §7.

---

## Success criteria for this operating model

Every implementation session looks like:

```
Read: IMPLEMENTATION_RULES.md → CODEX_OPERATING_MODEL.md → one story file
Implement.
Validate.
Report.
Stop.
```

Nothing more. If a session needs more than that to succeed, the story was written wrong —
that's a defect to report to Claude, not a gap for Codex to fill by reading further.
