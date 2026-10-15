---
name: playwright-test-generation
description: Turn an approved QA plan into maintainable Playwright tests, page objects, fixtures, and synthetic test data. Use when a reviewed plan is ready to become runnable TypeScript browser tests without raw selectors in test files.
---

# Playwright test generation

Read the approved plan and implement only its agreed scenarios. Reuse or extend objects in `pages/` and `components/`, put setup in `fixtures/`, put synthetic factories in `test-data/`, and keep scenario intent and assertions in `tests/`.

Validate selectors against the target app, link tests to requirements, run lint, formatting, traceability, and test-data checks, and report evidence. Keep changes within the repository’s review limit. Never weaken assertions, invent requirements, commit, or push without explicit approval.
