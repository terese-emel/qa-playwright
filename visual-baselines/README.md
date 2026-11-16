# Visual Baselines

Playwright stores screenshot baselines here when `toHaveScreenshot()` runs for the first time.

## Updating snapshots

Re-generate all baselines:

```bash
npx playwright test --update-snapshots
```

Re-generate only the visual regression suite:

```bash
npx playwright test tests/visual-regression.spec.ts --update-snapshots
```

## CI behaviour

The `visual-regression.yml` workflow runs Playwright inside the official
`mcr.microsoft.com/playwright` Docker image so that snapshots are created and
compared in a consistent, headless environment regardless of the developer's OS.

Baseline images committed to this directory are the source of truth. If a CI run
fails because a visual diff exceeds the configured threshold, run the update
command above locally (or trigger the workflow with `--update-snapshots`),
review the diff, and commit the new baselines.
