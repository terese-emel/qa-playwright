---
name: agent-router
description: Choose the smallest QA agent or skill for a request and load only the files needed for that stage. Use when a task could involve requirements, planning, test generation, healing, flakiness, coverage, data safety, Jira, or skill creation.
---

# Agent router

Route the request to one primary responsibility before loading detailed instructions:

| Request signal | Route |
| --- | --- |
| Jira story, unclear requirement, acceptance criteria | Requirement Analyst or shared `jira-acli` skill |
| Scenarios, risks, coverage design | Planner / `qa-planning` |
| Approved plan, create or extend tests | Generator / `playwright-test-generation` |
| Failed test, trace, stale locator | Healer / `playwright-test-healing` |
| Mixed pass/fail history | Flaky analyzer / `flaky-test-analysis` |
| Missing requirement links | Coverage checker / `requirement-traceability` |
| Secrets or personal data | Security validator / `test-data-safety` |
| New reusable capability | Shared `skill-creator` skill |

Load only the selected agent, its skill, and the relevant handoff artifact. If multiple responsibilities are present, sequence them rather than loading every instruction at once. Stop and ask for a human decision when the request is ambiguous, unsafe, or needs shared-system approval.

Return a short routing summary: selected role, input artifact, output artifact, reason, and next owner.
