import { expect, test } from "@playwright/test";
import { pathToFileURL } from "url";
import path from "path";

test("Save shows message (fixed)", async ({ page }) => {
  await page.goto(pathToFileURL(path.join(__dirname, "index.html")).href);
  await page.locator("#save").click();

  // Retries until the message appears (the page takes at most 1 s).
  await expect(page.locator("#status")).toHaveText("Saved");
});