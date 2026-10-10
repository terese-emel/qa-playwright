# qa-playwright

Independent playwright QA automation repository. Includes its own tests, dependencies, AI instructions, and GitHub Actions. No dependency on the other repositories.

## Local usage

```bash
npm install
npx playwright install chromium

npm run test:playwright
```

GitHub Actions: `.github/workflows/playwright.yml`.

Sample smoke test uses a public demonstration endpoint; replace it with your application and assertions.

To publish: `gh repo create YOUR-ACCOUNT/qa-playwright --private --source=. --remote=origin --push` after `git init -b main && git add . && git commit -m "Initial QA framework"`.

## Independent ownership and orchestration
This repository owns its own tests, dependencies, fixtures, configuration and GitHub Actions. It can run without the orchestrator. The separate `qa-orchestrator` repository may trigger its workflow and read the resulting status; it does not modify this repository. Make test changes here and review them independently.

## Flaky test analysis
The independent subagent is defined in `agents/flaky-test-analyzer.md`. Collect JUnit XML reports across runs, then run `python3 scripts/analyze_flakiness.py path/to/junit-history --output flaky-report.json`. A mixed pass/fail history is flagged for investigation, not automatically fixed. Review is required before commits; PRs may change at most 10 files.

### Synthetic test data validation
All test cases and fixtures must use generated/mock data, never production or personal information. Run `python3 scripts/validate_test_data.py --root .`. The GitHub Actions security check runs on PRs and main-branch pushes. This heuristic scan is a first line of defense, not a substitute for human review or comprehensive secret scanning.

### Synthetic test data validation
All test cases and fixtures must use generated/mock data, never production or personal information. Run `python3 scripts/validate_test_data.py --root .`. The GitHub Actions security check runs on PRs and main-branch pushes. This heuristic scan is a first line of defense, not a substitute for human review or comprehensive secret scanning.

### Synthetic test data validation
All test cases and fixtures must use generated/mock data, never production or personal information. Run `python3 scripts/validate_test_data.py --root .`. The GitHub Actions security check runs on PRs and main-branch pushes. This heuristic scan is a first line of defense, not a substitute for human review or comprehensive secret scanning.

### Synthetic test data validation
All test cases and fixtures must use generated/mock data, never production or personal information. Run `python3 scripts/validate_test_data.py --root .`. The GitHub Actions security check runs on PRs and main-branch pushes. This heuristic scan is a first line of defense, not a substitute for human review or comprehensive secret scanning.

### Requirement coverage checker
Populate `coverage/manifest.json` with requirement IDs and test case IDs (`test_cases[].requirements` is an array of requirement IDs). Run `python3 scripts/check_test_coverage.py`. Empty manifests intentionally fail CI until populated. This is requirement traceability, not line or executed-test coverage.
