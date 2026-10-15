---
name: qa-planning
description: Turn an approved requirement brief or application journey into a risk-based QA plan. Use when a team needs scenarios, priorities, test-level recommendations, accessibility checks, data needs, ownership, handoffs, or questions before automation begins.
---

# QA planning

Write a team-ready plan to `coverage/plan-<slug>.md`.

Balance happy-path, error, boundary, and role scenarios. For each scenario record the requirement, owner, reviewer, status, priority, risk and reason, recommended test level, run stage, preconditions, steps, expected result, dependencies, synthetic data, accessibility notes, flakiness risks, evidence, and page-object hint.

Prefer the lowest test level that gives confidence. Separate observed behavior from assumptions, preserve open questions, and identify parallel work and handoffs. Do not write test code, selectors, or commits. Stop for team approval before handing the plan to the Generator.
