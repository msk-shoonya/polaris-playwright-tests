import { test, expect } from '@playwright/test';
import HomePage from '../../page-objects/HomePage';
import ProductDetailPage from '../../page-objects/ProductDetailPage';

test.describe('User Story 1: View Product List', () => {
  let homePage: HomePage;
  let productDetailPage: ProductDetailPage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    productDetailPage = new ProductDetailPage(page);

    await homePage.navigateToHomePage();
    await homePage.waitForProductList();
  });

  test('US1 - Positive: should display product cards with name, image, and price, and open product details on click', async ({ page }) => {
    const productCount = await homePage.getProductCount();
    expect(productCount).toBeGreaterThan(0);

    await expect(homePage.getProductCard(0)).toBeVisible();
    await expect(homePage.getProductNameLocator(0)).toHaveText(/.+/);
    await expect(homePage.getProductImageLocator(0)).toBeVisible();
    await expect(homePage.getProductPriceLocator(0)).toHaveText(/.+/);

    const firstProductName = await homePage.getFirstProductName();
    await homePage.clickOnProduct(firstProductName);

    await productDetailPage.waitForProductDetailPage();
    await expect(page).toHaveURL(/\/product\//);
  });

  // test('US1 - Edge: should show a different set of products when navigating to the next page', async () => {
  //   const firstProductNameBefore = await homePage.getFirstProductName();
  //   expect(firstProductNameBefore).not.toBe('');

  //   await homePage.goToNextPage();

  //   const firstProductNameAfter = await homePage.getFirstProductName();
  //   expect(firstProductNameAfter).not.toBe('');
  //   expect(firstProductNameAfter).not.toBe(firstProductNameBefore);
  // });

  test('US1 - Edge: should show a different set of products when navigating to the next page', async ({ page }) => {
    const firstProductNameBefore = await homePage.getFirstProductName();
    expect(firstProductNameBefore).not.toBe('');

    await homePage.goToNextPage();

    await expect
      .poll(async () => await homePage.getFirstProductName())
      .not.toBe(firstProductNameBefore);
  });
});