import { expect, test } from "@playwright/test";

test("GET products returns the expected total", async ({ request }) => {
  const response = await request.get(
    "https://api.practicesoftwaretesting.com/products",
  );

  expect(response.status()).toBe(200);

  const products = await response.json();
expect(products.total).toEqual(expect.any(Number));
expect(products.total).toBeGreaterThan(0);});
