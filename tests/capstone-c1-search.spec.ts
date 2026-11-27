import { expect, test } from "@playwright/test";
import { SearchPage } from "./pages/search.page";

test("C1 Search by name", async ({ page }) => {
  const searchPage = new SearchPage(page);

  await searchPage.open();
  await searchPage.searchFor("pliers");

  await expect(searchPage.productNames.first()).toContainText(/pliers/i);
});