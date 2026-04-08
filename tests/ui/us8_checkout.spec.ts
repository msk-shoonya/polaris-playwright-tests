import { test, expect } from '@playwright/test';
import HomePage from '../../page-objects/HomePage';
import ProductDetailPage from '../../page-objects/ProductDetailPage';
import CartPage from '../../page-objects/CartPage';
import CheckoutPage from '../../page-objects/CheckoutPage';

test.describe('User Story 8: Complete Checkout', () => {
    let homePage: HomePage;
    let productDetailPage: ProductDetailPage;
    let cartPage: CartPage;
    let checkoutPage: CheckoutPage;

    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page);
        productDetailPage = new ProductDetailPage(page);
        cartPage = new CartPage(page);
        checkoutPage = new CheckoutPage(page);

        await homePage.navigateToHomePage();
        await homePage.waitForProductList();

        const productName = await homePage.getFirstProductName();
        await homePage.clickOnProduct(productName);

        await productDetailPage.waitForProductDetailPage();
        await productDetailPage.addToCart();

        await cartPage.openCart();
    });

    test('US8 - Positive: should complete checkout with valid shipping and payment details', async () => {
        await checkoutPage.proceedFromCart();

        await checkoutPage.loginDuringCheckout(
            'customer2@practicesoftwaretesting.com',
            'welcome01'
        );

        await checkoutPage.proceedToBilling();
        await checkoutPage.fillBillingAddress('london', 'e1 6n8');
        await expect(checkoutPage.getProceedToPaymentButton()).toBeEnabled();
        await checkoutPage.proceedToPayment();

    });

    test('US8 - Negative: should not allow checkout to continue when required billing details are missing', async () => {
        await checkoutPage.proceedFromCart();

        await checkoutPage.loginDuringCheckout(
            'customer@practicesoftwaretesting.com',
            'welcome01'
        );

        await checkoutPage.proceedToBilling();

        await checkoutPage.fillBillingAddress('', '');

        await expect(checkoutPage.getProceedToPaymentButton()).toBeDisabled();
    });
});