import { test, expect, APIRequestContext } from '@playwright/test';

async function login(request: APIRequestContext) {
  const response = await request.post('/users/login', {
    data: {
      email: 'customer@practicesoftwaretesting.com',
      password: 'welcome01',
    },
  });

  expect(response.ok()).toBeTruthy();
  const body = await response.json();
  return body.access_token;
}

test.describe('Cart API', () => {
  test('US6 positive: add product to cart', async ({ request }) => {
    const token = await login(request);

    const response = await request.post('/carts', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        product_id: '01J95KBNM3XJ8A2VMCF4KQ4XXT',
        quantity: 1,
      },
    });

    expect(response.ok()).toBeTruthy();

    const body = await response.json();
    expect(body.id || body.cart_id).toBeTruthy();
  });

  test('US6/US7: get cart by id shows items', async ({ request }) => {
    const token = await login(request);

    const createCart = await request.post('/carts', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        product_id: '01J95KBNM3XJ8A2VMCF4KQ4XXT',
        quantity: 1,
      },
    });

    expect(createCart.ok()).toBeTruthy();
    const cartBody = await createCart.json();
    const cartId = cartBody.id || cartBody.cart_id;

    const getCart = await request.get(`/carts/${cartId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    expect(getCart.ok()).toBeTruthy();

    const body = await getCart.json();
    expect(body.id || body.cart_id).toBeTruthy();
  });
});