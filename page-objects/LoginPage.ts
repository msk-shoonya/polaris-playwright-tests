import { Locator, Page } from '@playwright/test';
import BasePage from './BasePage';

export default class LoginPage extends BasePage {
  readonly emailInputSelector = '[data-test="email"]';
  readonly passwordInputSelector = '[data-test="password"]';
  readonly loginButtonSelector = '[data-test="login-submit"]';
  readonly loginErrorSelector = '[data-test="login-error"]';

  constructor(page: Page) {
    super(page);
  }

  async navigateToLoginPage(): Promise<void> {
    await this.goto('/auth/login');
  }

  async login(email: string, password: string): Promise<void> {
    await this.waitForElementVisible(this.emailInputSelector);
    await this.fillInputField(this.emailInputSelector, email);
    await this.fillInputField(this.passwordInputSelector, password);
    await this.clickElement(this.loginButtonSelector);
  }

  getLoginError(): Locator {
    return this.page.locator(this.loginErrorSelector);
  }

  getUserMenu(): Locator {
    return this.page.getByRole('button', { name: /menu/i });
  }
}