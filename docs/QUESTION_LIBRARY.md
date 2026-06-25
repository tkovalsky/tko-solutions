# Human API Risk Assessment Question Library

> **Status — supporting reference, reframed 2026-06-25.** "Human API" is a **finding type and
> diagnostic lens**, not a standalone offer, separate assessment, or pricing tier. The offers are
> the **Operational Recovery Assessment** and the **Prior Authorization Operational Assessment**
> (see the authoritative [`/CURRENT_REALITY.md`](../CURRENT_REALITY.md)). This is the interview
> instrument for those assessments; the dependency questions surface Human API findings.

## Interview Guide Principles

Questions should identify dependency without blaming individuals. The interviewer should frame Human APIs as signals of operating model risk, not personal failure.

Use follow-up prompts to ask for examples, artifacts, and specific recent cases.

## Executive Questions

### Strategic Risk

- Which workflows would create the greatest operational risk if they slowed down for two weeks?
- Where do you suspect the organization depends too much on specific people?
- Which areas become fragile during PTO, turnover, reorganization, or vendor change?
- Where do you get status but still lack confidence in what is actually happening?
- Which transformation or AI initiatives are not producing the expected operational change?

### Decision Latency

- Which decisions take longer than they should?
- Where do approvals get stuck?
- Which decisions require a specific person to interpret context before action can happen?
- Where do leaders debate the facts instead of deciding?

### Governance And AI Readiness

- Which workflows are candidates for AI, automation, or modernization?
- What would make AI unsafe or unreliable in those workflows today?
- Where are decision rights unclear?
- Where would an audit ask for evidence that the current process cannot easily produce?

### Dependency Signals

- Who are the people everyone goes to when the process breaks?
- Which meetings exist because systems do not show the truth?
- Which reports require a person to explain what they really mean?

## Director Questions

### Prior Authorization Operational Assessment

- Why are authorization requests most often denied?
- Why does authorization take longer than leadership expects?
- Which specialties, payers, or authorization types create the most friction?
- Which denial reasons repeat?
- Which payer-specific rules are known by staff but not captured in workflow documentation?
- Where do incomplete documentation, coding issues, eligibility issues, or medical necessity issues appear most often?
- Which exceptions follow a repeatable pattern?
- Which exceptions require personal escalation?
- Who knows how to get difficult authorizations unstuck?
- Who trains new staff on payer-specific authorization behavior?
- What happens if the most experienced authorization specialist leaves?
- What would need to be true operationally before Gold Card readiness was credible?

### Workflow Reality

- Walk me through what is supposed to happen in this workflow.
- What actually happens when the case, request, or program does not follow the standard path?
- Where does work wait?
- Where does work get reworked?
- Which handoffs are most fragile?

### Knowledge Concentration

- What does your team know that is not documented anywhere?
- Which person understands the exceptions best?
- Who knows which system or report to trust?
- If your most experienced person left, what would be hardest to replace?

### Escalation Patterns

- What types of issues get escalated?
- Who decides whether something is an exception?
- How do operators know where to send ambiguous work?
- What happens when the normal escalation owner is unavailable?

### Shadow Processes

- Which spreadsheets are required to run the workflow?
- Which email inboxes or distribution lists control work movement?
- Which chat channels, side meetings, or personal trackers are essential?
- Which manual trackers duplicate system data because the system is not trusted?

## Manager Questions

### Day-To-Day Bottlenecks

- What do operators ask you for most often?
- Which decisions cannot be made at the front line?
- Where does work come back because something was missing or unclear?
- Which queue, report, or tracker do you check first each day?
- What do you manually reconcile?

### Human Routing Dependence

- When someone does not know where work goes, who do they ask?
- Who knows how to get exceptions unstuck?
- Who understands the informal priority rules?
- Who translates leadership direction into actual team work?

### Meeting Dependence

- Which recurring meetings are needed to keep work moving?
- What information is reconstructed in meetings?
- What decisions happen in meetings but are not captured afterward?
- Which meetings would create operational risk if cancelled for a month?

### Email And Spreadsheet Dependence

- Which work arrives or moves through email?
- Which decisions are buried in email threads?
- Which spreadsheets are treated as the real source of truth?
- Who maintains those spreadsheets?
- What breaks if the spreadsheet owner is unavailable?

## Operator Questions

### Work Execution

- What tells you what to work on next?
- How do you know whether something is urgent?
- What information do you need before you can act?
- Where do you look first when something is unclear?
- What do you do when required information is missing?

### Informal Knowledge

- What do experienced people know that new people do not?
- What rules are not written down but everyone learns over time?
- Which cases require judgment beyond the documented process?
- What exceptions do you handle differently from the standard process?

### Bottlenecks And Delays

- Where do cases, requests, or tasks sit the longest?
- What causes avoidable rework?
- What approvals slow things down?
- What questions do you repeatedly ask other people?

### Escalation And Routing

- Who do you ask when you are stuck?
- How do you decide who to escalate to?
- What happens if that person is unavailable?
- Which issues require personal follow-up to move forward?

### Shadow Work

- What personal notes, trackers, or reminders do you keep?
- What information do you copy from one place to another?
- What do you track outside the official system?
- What would be hard for someone else to understand if they had to cover your work tomorrow?

## Artifact Requests

Ask for examples where available:

- Workflow documentation
- Process maps
- Queue reports
- Status reports
- Decision logs
- Escalation matrices
- SOPs
- Training materials
- Spreadsheets and trackers
- Meeting agendas and minutes
- Email templates
- Audit or compliance evidence
- AI pilot documentation
- Transformation roadmap artifacts

## Evidence Tags

During synthesis, tag evidence by pattern:

- Knowledge concentration
- Workflow bottleneck
- Approval delay
- Escalation fragility
- Shadow process
- Spreadsheet dependence
- Email dependence
- Meeting dependence
- Human routing dependence
- Decision clarity gap
- Governance readiness gap
- AI readiness gap
