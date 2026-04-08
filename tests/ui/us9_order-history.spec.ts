import { test, expect } from '@playwright/test';
import AccountPage from '../../page-objects/AccountPage';
import OrderDetailsPage from '../../page-objects/OrderDetailsPage';

test.describe('User Story 9: Order History (Invoices)', () => {
  let accountPage: AccountPage;
  let orderDetailsPage: OrderDetailsPage;

  test.beforeEach(async ({ page }) => {
    accountPage = new AccountPage(page);
    orderDetailsPage = new OrderDetailsPage(page);
  });

  test('US9 - Positive: should display invoice history and open order details', async ({ page }) => {
    await page.goto('/');

    // 🔐 Login
    await page.locator('[data-test="nav-sign-in"]').click();
    await page.locator('[data-test="email"]').fill('customer2@practicesoftwaretesting.com');
    await page.locator('[data-test="password"]').fill('welcome01');
    await page.locator('[data-test="login-submit"]').click();

    // 📄 Go to invoices
    await accountPage.goToMyInvoices();

    // ✅ Validate list
    await expect(accountPage.getFirstInvoice()).toBeVisible();
    await expect(accountPage.getFirstInvoiceNumber()).toBeVisible();
    await expect(accountPage.getFirstInvoiceDate()).toBeVisible();
    await expect(accountPage.getFirstInvoiceTotal()).toBeVisible();

    // 🔍 Open details
    await accountPage.openFirstInvoice();

    // ✅ Validate details page sections
    await expect(orderDetailsPage.getGeneralInfoHeading()).toBeVisible();
    await expect(orderDetailsPage.getBillingAddressHeading()).toBeVisible();
    await expect(orderDetailsPage.getPaymentInfoHeading()).toBeVisible();
    await expect(orderDetailsPage.getProductsHeading()).toBeVisible();

    // ✅ Validate key fields (based on your codegen)
    await expect(orderDetailsPage.getInvoiceNumberLabel()).toBeVisible();
    await expect(orderDetailsPage.getInvoiceDateLabel()).toBeVisible();
    await expect(orderDetailsPage.getTotalLabel()).toBeVisible();
    await expect(orderDetailsPage.getPaymentMethodLabel()).toBeVisible();
  });

  test('US9 - Negative: should not allow unauthenticated user to access invoice history', async ({ page }) => {
    await page.goto('/account/invoices');

    await expect(page).toHaveURL(/auth\/login|login|sign-in/i);
  });
});