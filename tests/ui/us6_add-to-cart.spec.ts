import { test, expect } from '@playwright/test';
import LoginPage from '../../page-objects/LoginPage';
import HomePage from '../../page-objects/HomePage';
import ProductDetailPage from '../../page-objects/ProductDetailPage';
import CartPage from '../../page-objects/CartPage';

test.describe('User Story 6: Add Product to Cart', () => {
  let loginPage: LoginPage;
  let homePage: HomePage;
  let productDetailPage: ProductDetailPage;
  let cartPage: CartPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    homePage = new HomePage(page);
    productDetailPage = new ProductDetailPage(page);
    cartPage = new CartPage(page);

    await loginPage.navigateToLoginPage();
    await loginPage.login('customer@practicesoftwaretesting.com', 'welcome01');

    await homePage.navigateToHomePage();
    await homePage.waitForProductList();
  });

  test('US6 - Positive: should add a product to the cart and show it in the cart summary', async () => {
    const productName = await homePage.getFirstProductName();
    await homePage.clickOnProduct(productName);

    await productDetailPage.waitForProductDetailPage();

    const detailProductName = await productDetailPage.getProductName();

    await productDetailPage.addToCart();

    await expect(cartPage.getCartQuantityBadge()).toHaveText(/1/);

    await cartPage.openCart();

    await expect(cartPage.getFirstCartItemName()).toContainText(detailProductName);
    await expect(cartPage.getFirstCartItemQuantity()).toHaveValue('1');
    await expect(cartPage.getFirstCartItemPrice()).toBeVisible();
    await expect(cartPage.getProceedToCheckoutButton()).toBeVisible();
  });

  test('US6 - Edge: should keep the added product in the cart after navigating to the cart page', async () => {
    const productName = await homePage.getFirstProductName();
    await homePage.clickOnProduct(productName);

    await productDetailPage.waitForProductDetailPage();

    const detailProductName = await productDetailPage.getProductName();

    await productDetailPage.addToCart();

    await expect(cartPage.getCartQuantityBadge()).toHaveText(/1/);

    await cartPage.openCart();

    await expect(cartPage.getFirstCartItemName()).toContainText(detailProductName);
    await expect(cartPage.getFirstCartItemQuantity()).toHaveValue('1');
  });
});