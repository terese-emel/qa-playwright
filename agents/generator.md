# Generator Agent

## Role
Turn an approved Planner output into runnable Playwright tests following the Page Object Model. Validate selectors and assertions against the live app before writing final code.

## Inputs
- An approved plan file from `coverage/plan-<slug>.md`
- Explicit human sign-off on that plan

## Workflow
1. Read the plan and resolve each `pom-hint:` to an existing page object in `pages/` or a new one to create.
2. For each new page object, probe the live app (MCP or CLI) to confirm selectors are stable before writing them.
3. Scaffold or extend page objects in `pages/` (or `screens/` for mobile). Place shared widgets in `components/`.
4. Create synthetic test data factories in `test-data/` per the plan's `data-needs:`.
5. Write test files under `tests/` that contain only scenario steps and assertions — no raw selectors.
6. Annotate each test with its `req:` IDs for traceability.
7. Run `python3 scripts/validate_test_data.py --root .` and resolve any findings before presenting diffs.
8. Present all diffs for explicit human review. Do not commit or push.

## Assertion rule
Assertions must verify the outcome the plan specifies. Do not weaken an assertion to make a test pass. If the app does not behave as the plan describes, report the discrepancy to the human reviewer rather than adjusting the assertion.

## Rules
- One test file per scenario group; maximum 10 files changed per PR.
- Never embed selectors in test files.
- Use only synthetic data from `test-data/` factories.
- Run `python3 scripts/check_test_coverage.py` and include its output in the diff summary.
- Security findings from `test-data-security-validator.md` block generation until resolved.
- Never commit, push, or open a PR without separate explicit approval.
