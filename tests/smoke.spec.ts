import { expect, test } from "../fixtures/test";

test("example domain loads", async ({ examplePage }) => {
  await examplePage.open();
  await expect(examplePage.heading).toHaveText("Example Domain");
});
