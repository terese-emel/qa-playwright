import { test as base, type APIRequestContext } from "@playwright/test";
import { validate } from "../contracts";
export { validate };

type ApiFixtures = {
  api: APIRequestContext;
};

// Provides a pre-configured `api` fixture for API-level tests.
// The base URL is read from the environment so tests are environment-agnostic.
// Tests that only use `api` never open a browser page, keeping them fast and cheap.
export const test = base.extend<ApiFixtures>({
  api: async ({ playwright }, use) => {
    const context = await playwright.request.newContext({
      baseURL:
        process.env.API_BASE_URL ??
        process.env.DEMO_BASE_URL ??
        "http://127.0.0.1:3000",
      extraHTTPHeaders: {
        Accept: "application/json",
      },
    });
    await use(context);
    await context.dispose();
  },
});

export { expect } from "@playwright/test";
