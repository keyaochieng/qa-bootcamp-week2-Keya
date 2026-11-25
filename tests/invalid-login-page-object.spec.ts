import { expect, test } from "@playwright/test";
import { InvalidLoginPage } from "./pages/invalid-login.page";

test("invalid login shows an error message", async ({ page }) => {
  const loginPage = new InvalidLoginPage(page);

  await loginPage.open();
  await loginPage.login("invalid@example.com", "wrong-password");

  await expect(loginPage.errorMessage).toBeVisible();
});