import type { Page } from "@playwright/test";

export class ExamplePage {
  constructor(private readonly page: Page) {}

  async open() {
    await this.page.setContent(
      "<main><h1>Example Domain</h1><p> Synthetic test page </p></main>",
    );
  }

  get heading() {
    return this.page.getByRole("heading", { level: 1 });
  }
}
