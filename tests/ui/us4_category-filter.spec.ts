import { test, expect } from '@playwright/test';
import HomePage from '../../page-objects/HomePage';

test.describe('User Story 4: Filter Products by Category', () => {
  let homePage: HomePage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.navigateToHomePage();
    await homePage.waitForProductList();
  });

  test('US4 - Positive: should filter products by Screwdriver category', async () => {
    const initialProducts = await homePage.getVisibleProductNames();

    await homePage.filterByCategory('Screwdriver');

    await expect(homePage.getCategoryCheckbox('Screwdriver')).toBeChecked();

    await expect
      .poll(async () => await homePage.getVisibleProductNames())
      .not.toEqual(initialProducts);
  });

  test('US4 - Edge: should remove filter when unchecked', async () => {
    const initialProducts = await homePage.getVisibleProductNames();

    await homePage.filterByCategory('Screwdriver');

    await expect(homePage.getCategoryCheckbox('Screwdriver')).toBeChecked();

    await expect
      .poll(async () => await homePage.getVisibleProductNames())
      .not.toEqual(initialProducts);

    await homePage.clearFilters('Screwdriver');

    await expect(homePage.getCategoryCheckbox('Screwdriver')).not.toBeChecked();

    await expect
      .poll(async () => await homePage.getVisibleProductNames())
      .toEqual(initialProducts);
  });
});