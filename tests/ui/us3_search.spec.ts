import { test, expect } from '@playwright/test';
import HomePage from '../../page-objects/HomePage';

test.describe('User Story 3: Search for a Product', () => {
  let homePage: HomePage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.navigateToHomePage();
    await homePage.waitForProductList();
  });

  test('US3 - Positive: should show matching results when searching for a valid product', async () => {
    const searchTerm = 'Pliers';

    await homePage.searchForProduct(searchTerm);

    await expect
      .poll(async () => await homePage.getVisibleProductNames())
      .not.toHaveLength(0);

    const productNames = await homePage.getVisibleProductNames();
    expect(productNames.some(name => name.toLowerCase().includes(searchTerm.toLowerCase()))).toBeTruthy();
  });

  test('US3 - Negative: should show a no-results message for a non-existing product', async () => {
    const invalidSearchTerm = 'DefinitelyNotARealTool123';

    await homePage.searchForProduct(invalidSearchTerm);

    await expect(homePage.getNoResultsMessage()).toBeVisible();
  });
});