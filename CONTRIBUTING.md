# Contributing to the QA workflow

This project is designed for a team. A small change should be easy to understand, review, and hand over.

## Suggested flow

1. Start with a requirement, bug, or user need and record what is known and what still needs an answer.
2. Ask the Planner to map the important user journeys, risks, and the right level of testing.
3. Have the team review the brief and plan before writing test code.
4. Add or update Page Objects, fixtures, synthetic data, and scenario tests.
5. Link the test case to the requirement in `coverage/manifest.json`.
6. Run the checks locally and open a pull request using the review template.

The agents help with preparation and investigation; product and engineering decisions remain with the team. Do not commit secrets, personal information, production data, or unredacted logs.

## Local checks

```bash
npm install
npx playwright install chromium
npm run lint
npm run format:check
npm run test:playwright
python3 scripts/check_test_coverage.py
python3 scripts/validate_test_data.py --root .
```
