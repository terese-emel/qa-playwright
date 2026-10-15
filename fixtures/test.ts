import { test as base } from "@playwright/test";
import { ExamplePage } from "../pages/ExamplePage";
import { GroceryComparePage } from "../pages/GroceryComparePage";

type Fixtures = {
  examplePage: ExamplePage;
  groceryComparePage: GroceryComparePage;
};

export const test = base.extend<Fixtures>({
  examplePage: async ({ page }, use) => {
    await use(new ExamplePage(page));
  },
  groceryComparePage: async ({ page }, use) => {
    await use(new GroceryComparePage(page));
  },
});

export { expect } from "@playwright/test";
