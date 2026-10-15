import { expect, test } from "../fixtures/test";

test.describe("grocery price comparison", () => {
  test.beforeEach(async ({ groceryComparePage }) => {
    await groceryComparePage.open();
  });

  test("shows comparable prices for an item", async ({
    groceryComparePage,
  }) => {
    await groceryComparePage.itemInput.fill("Oats");
    await groceryComparePage.compareButton.click();

    await expect(groceryComparePage.status).toHaveText("Comparison ready.");
    await expect(groceryComparePage.result).toHaveText(
      "Oats: Store A 2.00, Store B 2.20",
    );
  });

  test("explains what is needed when the item is missing", async ({
    groceryComparePage,
  }) => {
    await groceryComparePage.compareButton.click();

    await expect(groceryComparePage.status).toHaveText(
      "Enter an item to compare.",
    );
  });
});
