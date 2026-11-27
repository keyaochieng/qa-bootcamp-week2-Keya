import { expect, test } from "@playwright/test";
import { SearchPage } from "./pages/search.page";

test("C1 Search by name", async ({ page }) => {
  const searchPage = new SearchPage(page);

  await searchPage.open();
  await searchPage.searchFor("pliers");

  // Make sure an empty result list can't pass the search check.
  await expect(searchPage.productNames.first()).toBeVisible();

  // Wait until the search has removed any unrelated product names.
  const unrelatedProducts = searchPage.productNames.filter({
    hasNotText: /pliers/i,
  });
  await expect(unrelatedProducts).toHaveCount(0);
});
