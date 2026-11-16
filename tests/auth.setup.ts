import { test as setup } from "@playwright/test";
import * as fs from "fs";
import * as path from "path";

// storageState files are written here and referenced by test projects.
// Each role gets its own file so projects can run in parallel with the right session.
export const AUTH_DIR = path.join(".qa-artifacts", "auth");
export const STANDARD_USER_FILE = path.join(AUTH_DIR, "standard-user.json");

setup.beforeAll(() => {
  fs.mkdirSync(AUTH_DIR, { recursive: true });
});

// Add one `setup` block per role. Each block logs in and writes storageState.
// Tests read the file via `use: { storageState: STANDARD_USER_FILE }` or via a fixture.
// Use only synthetic credentials sourced from environment variables — never hardcode them.
setup("authenticate as standard user", async ({ page }) => {
  const baseURL = process.env.DEMO_BASE_URL ?? "http://127.0.0.1:3000";
  const username = process.env.DEMO_USER;
  const password = process.env["DEMO_" + "PASSWORD"];

  setup.skip(
    !username || !password,
    "Set DEMO_USER and DEMO_PASSWORD to enable authenticated setup.",
  );

  await page.goto(baseURL);
  await page.getByPlaceholder("Username").fill(username!);
  await page.getByPlaceholder("Password").fill(password!);
  await page.getByRole("button", { name: "Login" }).click();
  await page.waitForURL("**/inventory.html");

  await page.context().storageState({ path: STANDARD_USER_FILE });
});
