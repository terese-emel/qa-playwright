# Test Architecture

## Agent workflow: Planner → Generator → Healer

Tests in this repository are produced and maintained through three co-operating agents. Each has a defined role and a hard boundary. Full definitions live in `agents/`.

```text
           ┌──────────┐   approved plan   ┌───────────┐
           │ Planner  │ ───────────────▶  │ Generator │
           └──────────┘                   └───────────┘
                │                               │
          plan file                       test + page
        coverage/plan-*                   object diffs
                │                               │
                ▼                               ▼
          Human review ◀──────────────── Human approval
                                               │
                                      failing CI run
                                               │
                                               ▼
                                         ┌─────────┐
                                         │ Healer  │
                                         └─────────┘
```

**Planner** (`agents/planner.md`) — explores the app using MCP or CLI snapshots and writes a Markdown plan to `coverage/plan-<slug>.md`. No code is generated. A human must approve the plan before the Generator runs.

**Generator** (`agents/generator.md`) — turns an approved plan into Page Object-based specs, validating selectors against the live app. Writes page objects to `pages/` (or `screens/`), shared components to `components/`, synthetic data factories to `test-data/`, and scenarios to `tests/`. Requires explicit human approval before committing.

**Healer** (`agents/healer.md`) — runs on failing CI. Distinguishes locator drift (stale selector → fix in the page object) from feature regression (app changed → skip the test and report). Never weakens an assertion. Requires explicit human approval before committing.

### One rule the agents cannot break

> Agents can write and repair tests, but they do not decide what a test is supposed to prove. A "fix" that quietly weakens an assertion is a hidden bug.

If the live app would only pass with a weaker check, the Healer skips the test, logs the skip in `coverage/skips.md`, and surfaces it for human review.

---

## Mandatory Page Object Model (POM)

```text
pages/          # selectors, page/screen actions and navigation
components/     # shared widgets, dialogs and reusable elements
fixtures/       # setup, teardown, dependency injection
test-data/      # synthetic factories and unique identifiers
tests/          # scenario intent and assertions only
coverage/       # plans, traceability manifest, skip log
```

For every new test case: identify the requirement and test ID; inspect existing page/screen objects; reuse or extend the right object; create unique synthetic data; implement scenario and assertions in the test; update traceability; run the framework suite and validators.

Do not embed selectors (`locator`, `getBy*`, `cy.get`, `findElement`, accessibility IDs, XPath/CSS selectors) in new test files. Prefer semantic and stable selectors inside page objects. Page objects should expose meaningful actions such as `loginAs(...)`, not low-level test steps. Avoid hiding business assertions inside page objects.

Review checklist: page/screen objects reused; no selectors in test code; assertions in tests; mock/synthetic data only; independent parallel-safe tests; traceability updated; security and flaky checks considered.

This rule applies to new or modified test cases; pre-existing examples are retained and are not claimed to have been refactored.

---

## Agent mode: CLI vs MCP

The default agent mode is **CLI**: Playwright runs commands and saves snapshots to disk. This keeps agent context-window usage low (approximately 27K tokens per task vs 114K for MCP).

**MCP mode** sends live page state to the agent at every step and is better for exploration and debugging. Enable it with:

```bash
PLAYWRIGHT_AGENT_MODE=mcp npx playwright test
```

CI runs always use the default (CLI) mode. Reserve MCP for local investigation.
