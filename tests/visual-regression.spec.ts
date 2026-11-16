/**
 * Visual regression tests.
 *
 * These tests use `toHaveScreenshot` to compare rendered pages against baseline
 * images stored in `visual-baselines/`. Run once with `--update-snapshots` to
 * create the initial baselines; subsequent runs compare against them.
 *
 * Baselines are generated inside the official Playwright Docker image in CI so
 * that font rendering and anti-aliasing are identical across environments.
 *
 * To add a new visual test:
 *  1. Add a `test` block below that navigates to the page under test.
 *  2. Run `npx playwright test tests/visual-regression.spec.ts --update-snapshots`
 *     to capture the initial baseline.
 *  3. Commit the new `.png` file from `visual-baselines/`.
 */

import { expect, test } from "@playwright/test";

// Skipped unless RUN_VISUAL_REGRESSION=true is explicitly set.
// This prevents the spec from running in the general sharded CI suite
// before baselines have been generated with --update-snapshots.
test.skip(
  !process.env.RUN_VISUAL_REGRESSION,
  "Set RUN_VISUAL_REGRESSION=true to enable visual regression tests.",
);

const baseURL =
  process.env.DEMO_BASE_URL ?? process.env.BASE_URL ?? "http://127.0.0.1:3000";

test.describe("Visual regression", () => {
  test("home page matches baseline", async ({ page }) => {
    await page.goto(baseURL);
    await expect(page).toHaveScreenshot("home.png");
  });

  test("login page matches baseline", async ({ page }) => {
    await page.goto(`${baseURL}/login`);
    // Wait for the form to be visible before snapping.
    await page.waitForSelector("form", { state: "visible" });
    await expect(page).toHaveScreenshot("login.png");
  });
});
