# LinkedIn Series (12) + Email Series (5) — DRAFTS

Status: DRAFT — every post requires human approval before publication (TIF workflow).
TIF types: `linkedin_post`, `email_draft`. Each post cites one evidence record; the claim
audit (07_CLAIM_AUDIT.md) governs all numbers. Voice: plain, evidence-first, no hype.

---

## LinkedIn posts

**LI-1 · dm-cadence — The cadence**
1,528 commits. Ten months. One committer. The system served real production leads the entire
time it was being built. People argue about whether AI-assisted development is "real." I'd
rather publish the git log and let you audit it. Thread below on what that cadence did and
didn't buy. →

**LI-2 · dm-competency-map — The team that wasn't**
We mapped every competency evidenced in the RachelOS repo: data modeling, applied AI,
behavioral design, QA, release management — 18 in total. Conventionally that's 12–18
professional roles. Nobody was "replaced." The interesting part is what happened to the
coordination cost between those roles: it mostly disappeared into a decision log.

**LI-3 · dm-not-compressed — What AI didn't compress**
Ten months of AI-assisted delivery compressed execution and coordination enormously. It
compressed none of these: judgment, domain validation, reliability engineering, adoption,
accountability. Completed features sat switched OFF for weeks until a human decided
activation was safe. That's not a limitation of the model. That IS the model.

**LI-4 · dm-decision-log — 83 decisions**
The system has 83 numbered, dated architecture decisions — including decisions NOT to build
things (no vector DB, no Prisma migration, no speculative engines). Superseded decisions stay
in the log as history. When one person plays architect and implementer, the written record is
what keeps the two honest with each other.

**LI-5 · dm-churn — 38% deleted**
~456k lines added, ~173k deleted over the project's life. More than a third of everything
written was later removed or replaced. If your AI-assisted codebase only ever grows, that's
not velocity — that's sediment.

**LI-6 · dm-status-vocabulary — Four words that keep you honest**
Every RachelOS capability is graded: IMPLEMENTED, ACTIVATED, VALIDATED, or UNVALIDATED.
Inbound email? Implemented, dormant. Public recommendation engine? Zero production snapshots.
The state document says so, in writing. Demos conflate these four words. Operations can't
afford to.

**LI-7 · dm-same-day — The loop**
July 9: workflow gap recorded as a backlog ticket. Same day: capability live in production.
The operator-feedback-to-production loop in an operator-led AI delivery model is measured in
hours. That loop — not typing speed — is the compression that matters.

**LI-8 · dm-human-facts — One rule**
If a human recorded a fact about a relationship, the AI is architecturally prohibited from
overriding it. AI may only supersede other AI facts. One rule, enforced in code, is why the
intelligence layer stays trustworthy as it grows.

**LI-9 · dm-approval-loop — 77 messages, 77 approvals**
Every outbound message the system has ever sent through its draft workflow was reviewed and
accepted by a human first. 77 so far. Content generation literally returns a 403 without
human approval. "Human in the loop" is a checkbox on most slides. Here it's a foreign key.

**LI-10 · dm-honest-metrics — Publishing the bad number**
Our email-first outreach reply rate measured 2.2%. That number is in the system's own audit,
ranked as revenue constraint #1. If your AI case study contains no bad numbers, it isn't a
case study — it's an ad.

**LI-11 · dm-bus-factor — The honest cost**
The biggest structural weakness of a one-operator delivery model: bus factor = 1. One missed
automation day sits in the log as an open incident. Mitigation: the most complete
decision-and-state documentation the model could produce. Mitigation is not elimination, and
saying so is part of the method.

**LI-12 · dm-queue — The queue explains itself**
Every recommended action in the operator's queue carries its reasons as required metadata:
which facts triggered it, how fresh they are, what the relationship state is. "Why is this
lead in my queue?" is answerable by the system, not by the person who built it.

---

## Email series (nurture → assessment)

**EM-1 · The audit you should run on any "AI-built" system**
Subject: How to tell an AI-built system from an AI-built demo
Body: Four statuses (implemented/activated/validated/unvalidated), one evidence hierarchy
(code > config > production records > docs), and the requirement that bad numbers appear in
the story. Includes the 15-question checklist. CTA: download the AI Delivery Audit Checklist.

**EM-2 · What ten months of commit data actually shows**
Subject: 1,528 commits, one committer, zero mythology
Body: cadence, churn, and the coordination-cost argument (LI-1/2/5 material). CTA: read the
flagship case study.

**EM-3 · The approval-gated loop**
Subject: AI drafts. Humans decide. Systems remember.
Body: 77 approved sends, human-fact immutability, advisory-only recommendations. CTA:
architecture overview.

**EM-4 · The five things AI didn't compress**
Subject: The honest half of the AI delivery story
Body: judgment, validation, reliability, adoption, accountability — with the missed-cron-day
example. CTA: delivery model analysis.

**EM-5 · Is your operation a candidate?**
Subject: Where this model works — and where it doesn't
Body: the shape of a fit (work breaks across tools/handoffs/follow-up; one person is the
integration layer). CTA: book the AI Delivery Assessment.
