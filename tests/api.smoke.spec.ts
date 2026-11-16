/**
 * API smoke tests.
 *
 * These tests use the `api` fixture from fixtures/api.ts and never open a browser.
 * They are intentionally thin placeholders that demonstrate the pattern; real API
 * tests are generated from an approved Planner output.
 *
 * To add a new API test:
 *  1. Add the endpoint to config/testing.json if it needs configuration.
 *  2. Import `test, expect` from `../fixtures/api`.
 *  3. Use `api.get(...)`, `api.post(...)` etc. — no `page` fixture needed.
 *  4. Assert status codes, response shapes, and business rules; avoid UI checks here.
 */

import { expect, test } from "../fixtures/api";

// Skipped until a real API endpoint is configured via API_BASE_URL.
test.skip(!process.env.API_BASE_URL, "Set API_BASE_URL to enable API smoke tests.");

test.describe("API smoke", () => {
  test("health endpoint returns 200", async ({ api }) => {
    // Replace /health with the real health-check path for the application under test.
    const response = await api.get("/health");
    expect(response.status()).toBe(200);
  });
});
