import { APIRequestContext, expect } from '@playwright/test';

export async function loginAndGetToken(
  request: APIRequestContext,
  email: string,
  password: string
): Promise<string> {
  const response = await request.post('/users/login', {
    data: { email, password },
  });

  expect(response.ok()).toBeTruthy();

  const body = await response.json();
  const token = body?.access_token || body?.token;

  expect(token, 'Expected auth token in login response').toBeTruthy();
  return token;
}

export async function getFirstProductId(request: APIRequestContext): Promise<string> {
  const response = await request.get('/products');
  expect(response.ok()).toBeTruthy();

  const body = await response.json();
  const items = body?.data || body;
  expect(Array.isArray(items)).toBeTruthy();
  expect(items.length).toBeGreaterThan(0);

  return String(items[0].id);
}