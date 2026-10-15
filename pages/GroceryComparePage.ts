import type { Page } from "@playwright/test";

export class GroceryComparePage {
  constructor(private readonly page: Page) {}

  async open() {
    await this.page.setContent(`
      <main>
        <h1>Grocery Compare</h1>
        <form aria-label="Compare groceries">
          <label for="item">Grocery item</label>
          <input id="item" name="item" />
          <button type="submit">Compare prices</button>
          <p role="status" aria-live="polite"></p>
        </form>
        <section aria-labelledby="results-heading" hidden>
          <h2 id="results-heading">Price comparison</h2>
          <p data-testid="result"></p>
        </section>
      </main>
    `);
    await this.page.locator("form").evaluate((form) => {
      form.addEventListener("submit", (event) => {
        event.preventDefault();
        const input = form.querySelector("#item") as { value: string };
        const status = form.querySelector("[role=status]") as {
          textContent: string | null;
        };
        const results = form.parentElement?.querySelector("section") as
          { hidden: boolean } | undefined;
        const result = form.parentElement?.querySelector(
          "[data-testid=result]",
        ) as { textContent: string | null } | undefined;
        if (!input?.value.trim()) {
          status!.textContent = "Enter an item to compare.";
          results!.hidden = true;
          return;
        }
        status!.textContent = "Comparison ready.";
        result!.textContent = `${input.value.trim()}: Store A 2.00, Store B 2.20`;
        results!.hidden = false;
      });
    });
  }

  get itemInput() {
    return this.page.getByLabel("Grocery item");
  }

  get compareButton() {
    return this.page.getByRole("button", { name: "Compare prices" });
  }

  get status() {
    return this.page.getByRole("status");
  }

  get result() {
    return this.page.getByTestId("result");
  }
}
