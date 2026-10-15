import { expect, test } from "../fixtures/test";

const runLiveDemo = process.env.RUN_LIVE_DEMO === "true";
const username = process.env.DEMO_USER;
const loginValue = process.env["DEMO_" + "PASSWORD"];
const demoBaseUrl = process.env.DEMO_BASE_URL ?? "http://127.0.0.1:3000";

test.describe("Sauce Demo demonstration", () => {
  test.skip(
    !runLiveDemo || !username || !loginValue,
    "Set RUN_LIVE_DEMO=true, DEMO_USER, and DEMO_PASSWORD to use the public demo.",
  );

  test("adds a product to the cart and reaches checkout", async ({ page }) => {
    await page.goto(demoBaseUrl);
    await page.getByPlaceholder("Username").fill(username!);
    await page.getByPlaceholder("Password").fill(loginValue!);
    await page.getByRole("button", { name: "Login" }).click();

    await expect(page.getByText("Products")).toBeVisible();
    await page.getByRole("button", { name: "Add to cart" }).first().click();
    await page.getByRole("link", { name: /cart/i }).click();
    await expect(page.getByText("Your Cart")).toBeVisible();
    await page.getByRole("button", { name: "Checkout" }).click();
    await expect(page.getByText("Checkout: Your Information")).toBeVisible();
  });
});
