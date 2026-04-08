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

test.describe('Checkout API', () => {
  test('US8: payment check succeeds with valid payload', async ({ request }) => {
    const token = await login(request);

    const response = await request.post('/payment/check', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        payment_method: 'cash-on-delivery',
      },
    });

    expect([200, 201, 204].includes(response.status())).toBeTruthy();
  });

  test('US9 positive: order history returns invoices', async ({ request }) => {
    const token = await login(request);

    const response = await request.get('/invoices?page=1', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    expect(response.ok()).toBeTruthy();

    const body = await response.json();
    const items = body.data ?? body;

    expect(Array.isArray(items)).toBeTruthy();
  });
});