import { expect, test } from "@playwright/test";

const api = "https://api.practicesoftwaretesting.com";

test("C4 Add to a cart", async ({ request }) => {
  const products = await (await request.get(`${api}/products`)).json();
  const product = products.data[0];

  const cart = await (await request.post(`${api}/carts`)).json();

  await request.post(`${api}/carts/${cart.id}`, {
    data: { product_id: product.id, quantity: 1 },
  });

  const saved = await (await request.get(`${api}/carts/${cart.id}`)).json();

  expect(saved.cart_items).toEqual(
    expect.arrayContaining([
      expect.objectContaining({ product_id: product.id, quantity: 1 }),
    ]),
  );
});