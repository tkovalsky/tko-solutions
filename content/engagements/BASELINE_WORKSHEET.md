# Baseline Worksheet: {client} · {workflow}

Measure before anything changes, so the fix can be proven or disproven. Use the client's own
records over a fixed window (usually the last 90 days). Write down the method, so the same
measurement can be repeated after the build.

**Window:** {start} to {end} · **Source:** {CRM report, export, sample of N records} · **Measured by:** {name}, {date}

## Core measures (pick the 3–5 that fit)

| Measure | How to count it | Value | n | Confidence |
|---|---|---|---|---|
| Items that entered the workflow | count in window | | | |
| Items with no real action taken | no logged contact or work | | | |
| Median time to first action | entry → first logged action | | | |
| Items with no named owner | owner field empty or generic | | | |
| Items with no dated next step | | | | |
| Items stalled more than {X} days | no activity in X days | | | |
| Reply or progression rate by channel | (call, text, email) responses ÷ attempts | | | |
| Owner / key-person touches per day | estimated from interviews | | | |
| Hours per week of manual re-entry | estimated from interviews | | | |

**Confidence:** High = counted from records. Medium = a sample of 20 or more. Low = an estimate
from interviews. Label every number.

## Rough cost of the gap (an estimate, labeled as one)

> {untouched or stalled items per year} × {typical conversion rate} × {average value} = **${estimate}**
>
> {hours per week of manual work} × {loaded hourly cost} × 50 = **${estimate}** per year

Show the inputs, round down, and call it an estimate. The point is to size the problem honestly,
not to promise a return.

## Re-measure after the build

Same window length, same method, 30 days after launch. Record it in the build's post-launch review.
