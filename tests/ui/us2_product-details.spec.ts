import { test, expect } from '@playwright/test';
import HomePage from '../../page-objects/HomePage';
import ProductDetailPage from '../../page-objects/ProductDetailPage';

test.describe('User Story 2: View Product Details', () => {
  let homePage: HomePage;
  let productDetailPage: ProductDetailPage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    productDetailPage = new ProductDetailPage(page);

    await homePage.navigateToHomePage();
    await homePage.waitForProductList();
  });

  test('US2 - Positive: should display product details and enabled Add to Cart button', async ({ page }) => {
    const productName = await homePage.getFirstProductName();
    await homePage.clickOnProduct(productName);

    await productDetailPage.waitForProductDetailPage();

    await expect(page.locator(productDetailPage.productNameSelector)).toBeVisible();
    await expect(page.locator(productDetailPage.productDescriptionSelector)).toBeVisible();
    await expect(page.locator(productDetailPage.productPriceSelector)).toBeVisible();
    await expect(page.locator(productDetailPage.productImageSelector).first()).toBeVisible();

    const addToCartButton = page.locator(productDetailPage.addToCartButtonSelector);
    await expect(addToCartButton).toBeVisible();
    await expect(addToCartButton).toBeEnabled();
  });

  test('US2 - Edge: should load product detail page via direct URL', async ({ page }) => {
    const productHref = await homePage.getFirstProductHref();
    expect(productHref).not.toBe('');

    await page.goto(productHref);

    await productDetailPage.waitForProductDetailPage();
    await expect(page.locator(productDetailPage.productNameSelector)).toBeVisible();
    await expect(page.locator(productDetailPage.addToCartButtonSelector)).toBeVisible();
  });
});