import { Locator, Page } from '@playwright/test';
import BasePage from './BasePage';

export default class HomePage extends BasePage {
  readonly productListSelector = 'a[data-test^="product-"]';
  readonly productNameSelector = '[data-test="product-name"]';
  readonly productPriceSelector = '[data-test="product-price"]';
  readonly productImageSelector = 'img';

  readonly searchInputSelector = '[data-test="search-query"]';
  readonly noResultsMessageSelector = 'text=There are no products found';

  private readonly categorySelectors: Record<string, string> = {
    'Hand Tools': '[data-test="category-01KNJGCVE109SM1FRYQ4KXQJFA"]',
    'Screwdrivers': '[data-test="category-01KNJKTXF7G4TWE8SSQB9KGND7"]',
  };

  constructor(page: Page) {
    super(page);
  }

  async navigateToHomePage(): Promise<void> {
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

  getProductCard(index: number): Locator {
    return this.getProductCards().nth(index);
  }

  getProductNameLocator(index: number): Locator {
    return this.getProductCard(index).locator(this.productNameSelector);
  }

  getProductPriceLocator(index: number): Locator {
    return this.getProductCard(index).locator(this.productPriceSelector);
  }

  getProductImageLocator(index: number): Locator {
    return this.getProductCard(index).locator(this.productImageSelector);
  }

  async getProductCount(): Promise<number> {
    return await this.getProductCards().count();
  }

  async getVisibleProductCount(): Promise<number> {
    return await this.getProductCards().count();
  }

  async getProductNames(): Promise<string[]> {
    return (await this.getProductCards()
      .locator(this.productNameSelector)
      .allTextContents())
      .map(name => name.trim())
      .filter(Boolean);
  }

  async getProductPrices(): Promise<string[]> {
    return (await this.getProductCards()
      .locator(this.productPriceSelector)
      .allTextContents())
      .map(price => price.trim())
      .filter(Boolean);
  }

  async getVisibleProductNames(): Promise<string[]> {
    return (await this.getProductCards()
      .locator(this.productNameSelector)
      .allTextContents())
      .map(name => name.trim())
      .filter(Boolean);
  }

  async getFirstProductName(): Promise<string> {
    return (await this.getProductNameLocator(0).textContent())?.trim() || '';
  }

  async getFirstProductHref(): Promise<string> {
    const href = await this.getProductCard(0).getAttribute('href');
    return href?.trim() || '';
  }

  async clickOnProduct(productName: string): Promise<void> {
    const product = this.page
      .locator(this.productListSelector, { hasText: productName })
      .first();

    await product.waitFor({ state: 'visible', timeout: 10000 });
    await product.click();
  }

  async clickFirstProduct(): Promise<void> {
    await this.getProductCard(0).click();
  }

  async goToNextPage(): Promise<void> {
    const nextButton = this.page.getByRole('button', { name: 'Next' });
    await nextButton.waitFor({ state: 'visible', timeout: 10000 });
    await nextButton.click();
  }

  async searchForProduct(searchTerm: string): Promise<void> {
    await this.waitForElementVisible(this.searchInputSelector);
    await this.fillInputField(this.searchInputSelector, searchTerm);
    await this.page.keyboard.press('Enter');
  }

  async clearSearch(): Promise<void> {
    await this.waitForElementVisible(this.searchInputSelector);
    await this.fillInputField(this.searchInputSelector, '');
    await this.page.keyboard.press('Enter');
  }

  getNoResultsMessage(): Locator {
    return this.page.locator(this.noResultsMessageSelector);
  }

  async openFiltersIfCollapsed(): Promise<void> {
    const filtersPanel = this.page.locator('#filters');
    if (!(await filtersPanel.isVisible())) {
      const filterButton = this.page.getByRole('button', { name: /filter/i });
      await filterButton.click();
    }
  }

  getCategoryCheckbox(categoryName: string): Locator {
    return this.page.locator('#filters').getByText(categoryName, { exact: true });
  }

  async filterByCategory(categoryName: string): Promise<void> {
    const checkbox = this.getCategoryCheckbox(categoryName);
    await checkbox.waitFor({ state: 'visible', timeout: 10000 });
    await checkbox.check();
  }

  async clearFilters(categoryName: string): Promise<void> {
    const checkbox = this.getCategoryCheckbox(categoryName);
    await checkbox.waitFor({ state: 'visible', timeout: 10000 });
    await checkbox.uncheck();
  }

}
