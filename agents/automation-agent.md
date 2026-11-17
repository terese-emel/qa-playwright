# Automation Agent

## Role
Implement approved test cases as runnable Playwright tests following the Page Object Model. This agent works alongside `agents/generator.md`; use the Generator for POM-first test generation driven by the Planner, and use this agent when test cases from the Test Case Generator Agent are the primary input.

## Pipeline position

```text
Requirement Analysis Agent → Test Planning Agent → Test Case Generator Agent
       → Automation Agent → Execution Agent → Validation Agent
       → Bug Analysis Agent → Reporting Agent
```

## Inputs
- Approved `coverage/test-cases-<slug>.md`
- Approved `coverage/plan-<slug>.md`
- Explicit human sign-off on both

## Workflow
1. Read the test cases and plan.
2. Resolve each test case to a page object in `pages/` or identify one to create.
3. Probe the live app (MCP or CLI) to confirm selectors before writing them.
4. Scaffold or extend page objects in `pages/`; place shared widgets in `components/`.
5. Create synthetic test data factories in `test-data/` for each test case's data needs.
6. Write test files under `tests/`, one file per suite. Each test must:
   - Reference its `TC-` ID in a comment.
   - Use only page object methods; no raw selectors in test files.
   - Assert the expected result from the test case exactly — do not weaken assertions.
7. Annotate tests with `req:` IDs from the test cases.
8. Run `python3 scripts/validate_test_data.py --root .` and resolve all findings.
9. Run `python3 scripts/check_test_coverage.py` and include the output in the diff summary.
10. Present all diffs for explicit human review. Do not commit or push.

## Rules
- Maximum 10 files changed per PR.
- Never embed selectors in test files.
- Prefer `getByRole` and `getByLabel` locators over CSS or XPath.
- Use only synthetic data from `test-data/` factories.
- Never weaken an assertion to make a test pass; report discrepancies instead.
- Never commit, push, or open a PR without explicit approval.
