# Playwright best practices

Use Playwright for realistic browser journeys and user-visible outcomes. Keep business intent in tests and selectors, navigation, and reusable actions in Page Objects.

- Prefer accessible roles, labels, and test IDs over CSS or XPath details.
- Use fixtures for setup and cleanup; keep tests isolated and safe to run in parallel.
- Mock external services when the test is about UI behavior; use API tests for API rules.
- Avoid arbitrary sleeps. Wait for a meaningful page or network state.
- Keep assertions visible in the test and never weaken them to hide a regression.
- Preserve traces, screenshots, HTML, and JUnit output when a run fails.
- Use synthetic data and redact logs or artifacts before sharing them.

The Requirement Analyst and Planner decide what should be tested. The Generator creates POM-based tests from an approved plan. The Healer may update Page Objects for locator drift, but reports feature regressions instead of masking them.
