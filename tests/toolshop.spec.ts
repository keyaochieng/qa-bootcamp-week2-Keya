import { expect, test } from "@playwright/test";

test("home page has the expected title", async ({ page }) => {
  await page.goto("/");

  await expect(page).toHaveTitle("Practice Software Testing - Toolshop - v5.0");
});

test('searching for "pliers" only shows product names containing "pliers"', async ({ page }) => {
  await page.goto("/");

  await page.getByRole("textbox", { name: "Search" }).fill("pliers");
  await page.getByRole("button", { name: "Search", exact: true }).click();

  const productNames = page.getByRole("heading", { level: 5 });
  await expect
    .poll(async () => {
      const names = await productNames.allTextContents();
      return names.length > 0 && names.every((name) => name.toLowerCase().includes("pliers"));
    })
    .toBe(true);
});

test("invalid login is rejected with the expected message", async ({ page }) => {
  await page.goto("/auth/login");

  await page.getByRole("textbox", { name: /email address/i }).fill("invalid@example.com");
  await page.getByRole("textbox", { name: /password/i }).fill("wrong-password");
  await page.getByRole("button", { name: "Login", exact: true }).click();

  await expect(page.getByText("Invalid email or password", { exact: true })).toBeVisible();
});
