import { test, expect } from '@playwright/test';
import LoginPage from '../../page-objects/LoginPage';

test.describe('User Story 5: Login', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.navigateToLoginPage();
  });

  test('US5 - Positive: should log in successfully with valid credentials', async ({ page }) => {
    await loginPage.login('customer@practicesoftwaretesting.com', 'welcome01');

    await expect(page).not.toHaveURL(/\/auth\/login/i);
    await expect(page).toHaveURL(/my-account|account|checkout|\/$/i);
  });

  test('US5 - Negative: should show an error message for invalid credentials', async () => {
    await loginPage.login('invalid@example.com', 'wrongpassword');

    await expect(loginPage.getLoginError()).toBeVisible();
  });
});