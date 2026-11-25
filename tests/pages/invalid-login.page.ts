import type { Locator, Page } from "@playwright/test";

export class InvalidLoginPage {
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;

  constructor(private readonly page: Page) {
    this.emailInput = page.getByRole("textbox", { name: /email address/i });
    this.passwordInput = page.getByRole("textbox", { name: /password/i });
    this.loginButton = page.getByRole("button", { name: "Login", exact: true });
    this.errorMessage = page.getByText("Invalid email or password", {
      exact: true,
    });
  }

  async open() {
    await this.page.goto("/auth/login");
  }

  async login(email: string, password: string) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
}