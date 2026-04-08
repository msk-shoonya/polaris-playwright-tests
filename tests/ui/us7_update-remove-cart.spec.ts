import { test, expect } from '@playwright/test';
import LoginPage from '../../page-objects/LoginPage';
import HomePage from '../../page-objects/HomePage';
import ProductDetailPage from '../../page-objects/ProductDetailPage';
import CartPage from '../../page-objects/CartPage';

test.describe('User Story 7: Update or Remove from Cart', () => {
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

    const productName = await homePage.getFirstProductName();
    await homePage.clickOnProduct(productName);

    await productDetailPage.waitForProductDetailPage();
    await productDetailPage.addToCart();

    await cartPage.openCart();
  });

  test('US7 - Positive: should update product quantity in the cart and reflect the change', async () => {
    await expect(cartPage.getFirstCartItemQuantity()).toHaveValue('1');

    await cartPage.updateFirstCartItemQuantity('2');

    await expect(cartPage.getFirstCartItemQuantity()).toHaveValue('2');
  });

  test('US7 - Edge: should remove product from the cart', async () => {
    await expect(cartPage.getFirstCartItemName()).toBeVisible();

    await cartPage.removeFirstCartItem();

    await expect(cartPage.getFirstCartItemName()).not.toBeVisible();
  });
});