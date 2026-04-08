import { test, expect } from '@playwright/test';
import ProductCatalogPage from '../../page-objects/ProductCatalogPage';

test.describe('User Story 10: Search and Filter Combination', () => {
  let productCatalogPage: ProductCatalogPage;

  test.beforeEach(async ({ page }) => {
    productCatalogPage = new ProductCatalogPage(page);
    await productCatalogPage.navigateToCatalog();
    await productCatalogPage.waitForProductList();
  });

  test('US10 - Positive: should allow search within the Screwdriver category', async () => {
    await productCatalogPage.filterByCategory('Screwdriver');
    await expect(productCatalogPage.getCategoryCheckbox('Screwdriver')).toBeChecked();

    const filteredNames = await productCatalogPage.getVisibleProductNames();
    expect(filteredNames.length).toBeGreaterThan(0);

    await productCatalogPage.searchForProduct('mini');

    const searchedNames = await productCatalogPage.getVisibleProductNames();
    expect(searchedNames.length).toBeGreaterThan(0);

    expect(searchedNames.length).toBeLessThanOrEqual(filteredNames.length);
  });

  test('US10 - Edge: should still display products after clearing the search term', async () => {
    await productCatalogPage.filterByCategory('Screwdriver');
    await expect(productCatalogPage.getCategoryCheckbox('Screwdriver')).toBeChecked();

    await productCatalogPage.searchForProduct('mini');

    const searchedNames = await productCatalogPage.getVisibleProductNames();
    expect(searchedNames.length).toBeGreaterThan(0);

    await productCatalogPage.clearSearch();

    const namesAfterClearingSearch = await productCatalogPage.getVisibleProductNames();
    expect(namesAfterClearingSearch.length).toBeGreaterThan(0);
  });
});