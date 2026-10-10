# qa-playwright agent instructions

Only use the playwright framework for test generation and execution. Read README.md and config/testing.json. Analyze requirements, design cases, implement isolated tests, run the suite and report evidence. Never claim execution without logs. Request approval before destructive operations.

## Repository ownership contract
- This repository owns only its framework's test code, dependencies, fixtures, configuration, and CI workflow.
- The central `qa-orchestrator` may dispatch this repository's GitHub Actions workflow, but must not edit its tests or framework configuration.
- Keep test generation, debugging, and maintenance here; do not depend on another QA repository's source tree.
- Publish run artifacts in this repository. Report actual results and links, never inferred pass/fail.
- External orchestration is optional: tests must remain runnable from this repository alone.


## Mandatory review and PR limits
- Never commit before presenting diffs, test evidence, and risks and obtaining explicit user approval.
- Never push or open a pull request without separate explicit approval.
- Limit each pull request to 10 changed files (added, modified, renamed, deleted). Split larger work into logical PRs.
- Any change after approval requires renewed review.

## Flaky analysis
Delegate intermittent-failure investigation to `agents/flaky-test-analyzer.md`; preserve original failed run status.

## Mandatory synthetic test data policy
- All test cases, mocks and fixtures must use synthetic data only. Never use real personal, patient, customer, employee, or production records.
- Never store real credentials, tokens, or secrets in source or test artifacts. Redact logs, traces, screenshots, and AI prompts.
- Delegate security review to `agents/test-data-security-validator.md`; run `python3 scripts/validate_test_data.py --root .` before requesting commit approval.
- Security findings block changes until resolved. Existing explicit review-before-commit and 10-file PR rules remain mandatory.

## Mandatory synthetic test data policy
- All test cases, mocks and fixtures must use synthetic data only. Never use real personal, patient, customer, employee, or production records.
- Never store real credentials, tokens, or secrets in source or test artifacts. Redact logs, traces, screenshots, and AI prompts.
- Delegate security review to `agents/test-data-security-validator.md`; run `python3 scripts/validate_test_data.py --root .` before requesting commit approval.
- Security findings block changes until resolved. Existing explicit review-before-commit and 10-file PR rules remain mandatory.

## Mandatory synthetic test data policy
- All test cases, mocks and fixtures must use synthetic data only. Never use real personal, patient, customer, employee, or production records.
- Never store real credentials, tokens, or secrets in source or test artifacts. Redact logs, traces, screenshots, and AI prompts.
- Delegate security review to `agents/test-data-security-validator.md`; run `python3 scripts/validate_test_data.py --root .` before requesting commit approval.
- Security findings block changes until resolved. Existing explicit review-before-commit and 10-file PR rules remain mandatory.

## Mandatory synthetic test data policy
- All test cases, mocks and fixtures must use synthetic data only. Never use real personal, patient, customer, employee, or production records.
- Never store real credentials, tokens, or secrets in source or test artifacts. Redact logs, traces, screenshots, and AI prompts.
- Delegate security review to `agents/test-data-security-validator.md`; run `python3 scripts/validate_test_data.py --root .` before requesting commit approval.
- Security findings block changes until resolved. Existing explicit review-before-commit and 10-file PR rules remain mandatory.

## Test coverage checker
Run `python3 scripts/check_test_coverage.py` to check requirement traceability. See `agents/test-coverage-checker.md`. Do not claim execution or line coverage from this metric. Approval required before commits; 10-file PR maximum.

## Mandatory test creation architecture: Page Object Model (POM)
- Every newly generated UI test case MUST follow Page Object Model. No new test may embed raw selectors or reusable UI interaction/navigation logic in its test file.
- Place locators and page/screen interaction methods in `pages/` (mobile: `screens/` is also acceptable). Prefer stable accessibility roles and test IDs; avoid brittle selectors.
- Tests contain scenario steps and assertions. Use `fixtures/` for setup/teardown and `test-data/` for isolated synthetic data factories.
- Share components through reusable component objects; do not create duplicate page objects for the same page.
- Page/screen objects must not hide business assertions; keep outcome verification visible in tests, except reusable page-ready checks.
- Review generated tests against `docs/test-architecture.md` before presenting diffs for approval.
- Preserve existing tests and files; refactor legacy nonconforming tests only with explicit scope and approval.
