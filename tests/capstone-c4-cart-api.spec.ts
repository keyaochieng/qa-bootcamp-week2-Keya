import { expect, test } from "@playwright/test";

const api = "https://api.practicesoftwaretesting.com";

test("C4 Add to a cart", async ({ request }) => {
  const productsResponse = await request.get(`${api}/products`);
  expect(productsResponse.status()).toBe(200);

  const productsBody = await productsResponse.json();
  expect(productsBody.data.length).toBeGreaterThan(0);

  const product = productsBody.data[0];
  expect(product.id).toBeTruthy();

  // Start with a fresh cart so this test doesn't depend on another run.
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

    const addBody = await addResponse.json();
    expect(addBody.result).toBe("item added or updated");

    // Read the cart back to check the product was actually saved.
    const readBackResponse = await request.get(`${api}/carts/${cartId}`);
    expect(readBackResponse.status()).toBe(200);

    const cart = await readBackResponse.json();
    const matchingItem = cart.cart_items.find(
      (item: { product_id: string }) => item.product_id === product.id,
    );

    expect(matchingItem).toBeTruthy();
    expect(matchingItem.quantity).toBe(1);
  } finally {
    // Remove this test's cart even if one of the checks above fails.
    if (cartId) {
      const deleteResponse = await request.delete(`${api}/carts/${cartId}`);
      expect([200, 204]).toContain(deleteResponse.status());
    }
  }
});
