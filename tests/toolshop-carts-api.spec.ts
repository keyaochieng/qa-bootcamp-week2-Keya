import { expect, test } from "@playwright/test";

const api = "https://api.practicesoftwaretesting.com";

test("creates a cart, adds a product, and deletes the cart", async ({ request }) => {
  const productsResponse = await request.get(`${api}/products`);
  expect(productsResponse.status()).toBe(200);

  const productsBody = await productsResponse.json();
  const product = productsBody.data[0];
  expect(product.id).toBeTruthy();

  const cartResponse = await request.post(`${api}/carts`);
  const cartBody = await cartResponse.json();
  const cartId = cartBody.id;

  try {
    expect(cartResponse.status()).toBe(201);
    expect(cartId).toBeTruthy();

    const addResponse = await request.post(`${api}/carts/${cartId}`, {
      data: {
        product_id: product.id,
        quantity: 1,
      },
    });

    expect(addResponse.status()).toBe(200);

    const addedItem = await addResponse.json();
    expect(addedItem.result).toBe("item added or updated");
  } finally {
    if (cartId) {
      const deleteResponse = await request.delete(`${api}/carts/${cartId}`);
      expect([200, 204]).toContain(deleteResponse.status());
    }
  }
});

test("returns 404 for a cart that does not exist", async ({ request }) => {
  const response = await request.get(
    `${api}/carts/00000000-0000-4000-8000-000000000000`,
  );

  expect(response.status()).toBe(404);
});
