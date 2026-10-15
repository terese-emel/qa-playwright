---
name: requirement-analysis
description: Clarify product requests, user stories, bug reports, and acceptance criteria before test planning. Use when a team needs shared requirements, risks, open questions, user roles, business rules, or a handoff brief for QA planning.
---

# Requirement analysis

Create a concise shared brief at `coverage/requirement-<slug>.md`. When the source is a Jira story or bug, use the shared `jira-acli` skill in `qa-orchestrator/.agents/skills/jira-acli/` to read the ticket, acceptance criteria, labels, components, and linked work before drafting the brief.

Capture the user or business goal, source, owner, contributors, confirmed behavior, assumptions, roles, permissions, business rules, data, integrations, risks, and questions. Separate facts from guesses and give every unanswered question an owner. Include expected success, error, boundary, and role behavior without writing test steps.

Keep the brief useful to product, development, QA, accessibility, security, and operations. Use synthetic examples only. Do not choose selectors, create tests, or silently resolve ambiguity. Stop at `needs-answers`, `ready-for-planning`, or `approved`; do not commit or push.

If the team asks to update Jira, hand the proposed command and content to the shared Jira skill. Never comment, edit, transition, assign, or create a work item automatically as part of requirement analysis.
