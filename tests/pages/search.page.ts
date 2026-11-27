import { Locator, Page } from "@playwright/test";

export class SearchPage {
  readonly searchInput: Locator;
  readonly searchButton: Locator;
  readonly productNames: Locator;

  constructor(private readonly page: Page) {
    // Keep the page's controls in one place so the test can focus on results.
    this.searchInput = page.getByRole("textbox", { name: "Search" });
    this.searchButton = page.getByRole("button", {
      name: "Search",
      exact: true,
    });
    this.productNames = page.getByRole("heading", { level: 5 });
  }

  async open() {
    await this.page.goto("/");
  }

  async searchFor(term: string) {
    await this.searchInput.fill(term);
    await this.searchButton.click();
  }
}
