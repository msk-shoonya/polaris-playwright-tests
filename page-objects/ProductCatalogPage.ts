import { Locator, Page } from '@playwright/test';
import BasePage from './BasePage';

export default class ProductCatalogPage extends BasePage {
  readonly productListSelector = 'a[data-test^="product-"]';
  readonly productNameSelector = '[data-test="product-name"]';
  readonly searchInputSelector = '[data-test="search-query"]';

  constructor(page: Page) {
    super(page);
  }

  async navigateToCatalog(): Promise<void> {
    await this.goto('/');
  }

  async waitForProductList(): Promise<void> {
    await this.page.locator(this.productListSelector).first().waitFor({
      state: 'visible',
      timeout: 10000,
    });
  }

  getProductCards(): Locator {
    return this.page.locator(this.productListSelector);
  }

  async getVisibleProductNames(): Promise<string[]> {
    return (await this.getProductCards()
      .locator(this.productNameSelector)
      .allTextContents())
      .map(name => name.trim())
      .filter(Boolean);
  }

  getCategoryCheckbox(categoryName: string): Locator {
    return this.page.locator('#filters').getByText(categoryName, { exact: true });
  }

  async filterByCategory(categoryName: string): Promise<void> {
    const checkbox = this.getCategoryCheckbox(categoryName);
    await checkbox.waitFor({ state: 'visible', timeout: 10000 });
    await checkbox.check();
  }

  async clearCategoryFilter(categoryName: string): Promise<void> {
    const checkbox = this.getCategoryCheckbox(categoryName);
    await checkbox.waitFor({ state: 'visible', timeout: 10000 });
    await checkbox.uncheck();
  }

  async searchForProduct(searchTerm: string): Promise<void> {
    const searchInput = this.page.locator(this.searchInputSelector);
    await searchInput.waitFor({ state: 'visible', timeout: 10000 });
    await searchInput.click();
    await searchInput.fill(searchTerm);
    await this.page.keyboard.press('Enter');
  }

  async clearSearch(): Promise<void> {
    const searchInput = this.page.locator(this.searchInputSelector);
    await searchInput.waitFor({ state: 'visible', timeout: 10000 });
    await searchInput.click();
    await searchInput.fill('');
    await this.page.keyboard.press('Enter');
  }
}