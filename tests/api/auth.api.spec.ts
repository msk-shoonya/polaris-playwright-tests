import { test, expect } from '@playwright/test';

test.describe('Auth API', () => {
  test('US5 positive: valid login returns token', async ({ request }) => {
    const response = await request.post('/users/login', {
      data: {
        email: 'customer@practicesoftwaretesting.com',
        password: 'welcome01',
      },
    });

    expect(response.ok()).toBeTruthy();

    const body = await response.json();
    expect(body.access_token).toBeTruthy();
  });

  test('US5 negative: invalid login returns error', async ({ request }) => {
    const response = await request.post('/users/login', {
      data: {
        email: 'customer@practicesoftwaretesting.com',
        password: 'wrongPassword123',
      },
    });

    expect(response.ok()).toBeFalsy();
    expect([400, 401, 403]).toContain(response.status());
  });
});