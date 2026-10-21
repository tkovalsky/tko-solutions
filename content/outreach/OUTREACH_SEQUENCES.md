# Outreach Sequences: Growing-Business Lane

**Status:** Draft for Todd's review, 2026-10-21.
**Offer:** Constraint Diagnostic, 2 weeks, $7,500 fixed. Matches `src/lib/offers.ts`.
**One-pager:** `content/outreach/constraint-diagnostic-one-pager.pdf` (source: the `.html` beside it).
**Tracking:** log every touch in `content/outreach/target-accounts.csv`.

## Rules for every message

1. **One specific observation per prospect, or don't send.** Examples: a slow or missing reply to a
   website inquiry you tested, a job post for an "operations coordinator" or "CRM admin," or a
   recent new office, acquisition, or service line. Generic messages cost reputation, and you only
   have time for about 10 a week.
2. **Use only verified RachelOS facts.** Until the Codex re-audit lands
   (`docs/strategy/CODEX_PROMPT_REVIEW_AND_REAUDIT.md`), the messages use qualitative facts only:
   - the ranked queue
   - human approval of every customer-facing message
   - AI follow-up being turned off after it got facts wrong

   After the audit, swap in **one** verified number per message. Never use more than one.
3. **Ask for 30 minutes, not a purchase.** The diagnostic is mentioned once, with its price, so
   nobody feels baited.
4. **Stop after three touches.** No reply means no, for now. Re-approach only after a new trigger.
5. **Cold email compliance (CAN-SPAM):** send from `todd@tko.solutions`, include a postal address
   in the signature, and honor any opt-out immediately. Use plain text, no tracking pixels, and no
   attachment on the first touch. Send the PDF on request or in touch 2.
6. **Availability:** never imply you're available full-time. "I take on a small number of clients"
   is true and works in your favor.

## Placeholders

- `{first_name}`, `{company}`
- `{observation}`: the specific thing you saw (required)
- `{symptom}`: the problem that observation suggests, in their words

## Sequence A: Wealth advisory / RIA / family office

**Subject lines (pick one):**
- `{company}: follow-up after the first meeting`
- `question about how {company} handles new inquiries`

**Touch 1 (day 0)**

> Hi {first_name},
>
> {observation}. In advisory firms I usually see the same pattern behind that: the CRM holds the
> records, but what happens next with each prospect still lives in an advisor's head or inbox.
>
> I built and run a system for an independent South Florida firm with exactly that problem: one
> ranked list each morning of who needs attention and why, with a person approving every message
> before it goes to a client. It isn't a new CRM. It sits beside the one they already had.
>
> Would a 30-minute call be useful to see whether {company} has the same leak? If it doesn't, I'll
> tell you.
>
> Todd Kovalsky
> TKO Solutions · tko.solutions
> {postal address}

**Touch 2 (day 4–5), reply in the same thread**

> {first_name}, one more thought, then I'll leave it.
>
> The most useful thing I learned building that system: automating more email wasn't the answer.
> When AI follow-up started stating things that weren't true, I switched it off. Now a person
> approves every message, and the system's job is to make sure nothing important is forgotten.
>
> If it's useful, I can send a one-page summary of how I find where follow-up breaks down (a
> two-week, fixed-price diagnostic, $7,500).
>
> Todd

**Touch 3 (day 10–12)**

> {first_name}, closing the loop. If prospect follow-up becomes a priority at {company}, I've
> written up how I find where leads leak:
> https://tko.solutions/insights/why-leads-fall-through-the-cracks
>
> Happy to talk whenever it's useful.
>
> Todd

## Sequence B: Luxury services / boutique practices

*Examples: high-end home services, private clinics, design firms, charter, concierge.*

**Subject lines:**
- `your inquiry from {company}'s website`
- `{company}: what happens after someone fills in the form`

**Touch 1**

> Hi {first_name},
>
> {observation}. For a business where every client is worth a lot, the expensive problem is
> rarely getting inquiries. It's what happens in the first few days after someone reaches out:
> who owns the reply, what was promised, and when the next touch is due.
>
> I build small systems that sit beside the tools you already use and make that visible: one list
> each morning of who needs a response and why. A person still writes or approves every message.
>
> Worth 30 minutes to see if that's where {company} loses clients? I'll tell you plainly if it
> isn't.
>
> Todd Kovalsky
> TKO Solutions · tko.solutions
> {postal address}

**Touches 2–3:** same structure as Sequence A, with "client" in place of "prospect."

## Sequence C: Owner-led service business ($5M+)

**Subject line:** `does everything at {company} still go through you?`

**Touch 1**

> Hi {first_name},
>
> {observation}. That usually means the business has outgrown the way it was set up: the tools
> hold the information, but deciding what happens next still routes through you or one or two key
> people.
>
> That's the problem I work on. I find where the work actually stalls, then build the small layer
> that fixes it, on the tools you already have. The proof I can show you is a system I built and
> still run for a South Florida business with exactly that pattern.
>
> Would 30 minutes be useful?
>
> Todd Kovalsky
> TKO Solutions · tko.solutions
> {postal address}

**Touches 2–3:** same structure as Sequence A. Touch 3 links to the guide that best matches their
symptom.

## LinkedIn

**Connection note (300 characters max):**

> {first_name}, I build follow-up and operating systems for advisory and service firms (the CRM
> holds the records; nothing decides what happens next). Saw {observation_short}. Would be glad to
> connect.

**After they accept (send once, then stop):**

> Thanks for connecting. No pitch. If follow-up or handoffs at {company} ever feel like they run
> on memory, this is how I find the leaks:
> https://tko.solutions/insights/why-leads-fall-through-the-cracks

## Referral ask (anyone who knows owners)

> Quick favor: I'm taking on a small number of clients for TKO, where I find where a growing
> business loses leads or time between its tools and its people, then build the fix. Do you know
> an owner or COO who complains that everything still routes through them? An intro email is
> perfect; I'll take it from there.

## Handling replies

| They say | You reply |
|---|---|
| "Send me more info" | The one-pager PDF, plus two times you're free for a call this week. |
| "We already have a CRM" | "Good. I don't replace it. The question is whether it tells anyone what to do next." |
| "What does it cost?" | "The diagnostic is $7,500 fixed for two weeks. A build, if it's worth doing, is quoted from what we find." |
| "Not now" | "Understood. Mind if I check back in a quarter?" Log the date. |
| "Is this AI?" | "Sometimes AI drafts. A person approves anything that goes to a client. The point is that nothing gets forgotten." |

## Weekly rhythm (about 2 hours)

- **Monday:** pick 10 prospects and find one real observation for each.
- **Tuesday and Wednesday:** send touch 1. Send touch 2 and touch 3 where they're due.
- **Friday:** update `target-accounts.csv` and note which subject line and segment got replies.

**Scorecard:** messages sent → replies → calls booked → diagnostics sold. Reconsider the segment
or message after 30 sends with zero calls, not before.
