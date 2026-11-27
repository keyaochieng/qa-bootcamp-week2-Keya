import { expect, test } from "@playwright/test";
import { pathToFileURL } from "url";
import path from "path";

test("Save shows message (unfixed)", async ({ page }) => {
  await page.goto(pathToFileURL(path.join(__dirname, "index.html")).href);
  await page.locator("#save").click();

  await page.waitForTimeout(500);

  const text = await page.locator("#status").textContent();
  expect(text).toBe("Saved");
});