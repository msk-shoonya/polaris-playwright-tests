import { test, expect } from '@playwright/test';

test.describe('Products API', () => {
  test('US3 positive: search returns matching products', async ({ request }) => {
    const response = await request.get('/products/search?q=pli');
    expect(response.ok()).toBeTruthy();

    const body = await response.json();
    const items = body.data ?? body;

    expect(Array.isArray(items)).toBeTruthy();
    expect(items.length).toBeGreaterThan(0);

    for (const item of items) {
      expect(item.name.toLowerCase()).toContain('pli');
    }
  });

  test('US3 negative: invalid search returns no results', async ({ request }) => {
    const response = await request.get('/products/search?q=noSuchTool999');
    expect(response.ok()).toBeTruthy();

    const body = await response.json();
    const items = body.data ?? body;

    expect(Array.isArray(items)).toBeTruthy();
    expect(items.length).toBe(0);
  });
});