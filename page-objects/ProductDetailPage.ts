import { Locator, Page } from '@playwright/test';
import BasePage from './BasePage';

export default class ProductDetailPage extends BasePage {
  readonly productNameSelector = '[data-test="product-name"]';
  readonly productDescriptionSelector = '[data-test="product-description"]';
  readonly productPriceSelector = '[data-test="unit-price"]';
  readonly productImageSelector = 'img';
  readonly addToCartButtonSelector = '[data-test="add-to-cart"]';

  constructor(page: Page) {
    super(page);
  }

  async waitForProductDetailPage(): Promise<void> {
    await this.waitForUrlContains('/product/');
    await this.waitForElementVisible(this.productNameSelector);
  }

  async getProductName(): Promise<string> {
    return (await this.page.locator(this.productNameSelector).textContent())?.trim() || '';
  }

  async getProductPrice(): Promise<string> {
    return (await this.page.locator(this.productPriceSelector).textContent())?.trim() || '';
  }

  async addToCart(): Promise<void> {
    await this.page.locator(this.addToCartButtonSelector).click();
  }
}