import { Locator, Page } from '@playwright/test';

export default class BasePage {
  protected readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  locator(selector: string): Locator {
    return this.page.locator(selector);
  }

  async goto(url: string): Promise<void> {
    await this.page.goto(url);
  }

  async clickElement(selector: string): Promise<void> {
    await this.locator(selector).click();
  }

  async fillInputField(selector: string, value: string): Promise<void> {
    await this.locator(selector).fill(value);
  }

  async getElementText(selector: string): Promise<string> {
    return (await this.locator(selector).textContent())?.trim() || '';
  }

  async getElementCount(selector: string): Promise<number> {
    return await this.locator(selector).count();
  }

  async isElementVisible(selector: string): Promise<boolean> {
    return await this.locator(selector).isVisible();
  }

  async waitForElementVisible(selector: string, timeout = 10000): Promise<void> {
    await this.locator(selector).waitFor({ state: 'visible', timeout });
  }

  async waitForUrlContains(value: string, timeout = 10000): Promise<void> {
    await this.page.waitForURL(`**${value}**`, { timeout });
  }
}