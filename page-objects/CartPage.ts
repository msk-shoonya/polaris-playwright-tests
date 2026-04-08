import { Locator, Page } from '@playwright/test';
import BasePage from './BasePage';

export default class CartPage extends BasePage {
  readonly cartLinkSelector = '[data-test="nav-cart"]';
  readonly cartQuantityBadgeSelector = '[data-test="cart-quantity"]';

  readonly cartItemNameSelector = '[data-test="product-title"]';
  readonly cartItemQuantitySelector = '[data-test="product-quantity"]';
  readonly cartItemPriceSelector = '[data-test="product-price"]';
  readonly cartItemTotalSelector = '[data-test="line-price"]';
  readonly removeItemButtonSelector = '[data-test="cart-remove"]';

  readonly proceedToCheckoutButtonSelector = '[data-test="proceed-1"]';
  readonly cartTotalSelector = '[data-test="cart-total"]';

  constructor(page: Page) {
    super(page);
  }

  async openCart(): Promise<void> {
    await this.page.locator(this.cartLinkSelector).click();
    await this.page.waitForURL(/\/checkout/i);
  }

  getCartQuantityBadge(): Locator {
    return this.page.locator(this.cartQuantityBadgeSelector);
  }

  getFirstCartItemName(): Locator {
    return this.page.locator(this.cartItemNameSelector).first();
  }

  getFirstCartItemQuantity(): Locator {
    return this.page.locator(this.cartItemQuantitySelector).first();
  }

  getFirstCartItemPrice(): Locator {
    return this.page.locator(this.cartItemPriceSelector).first();
  }

  getFirstCartItemTotal(): Locator {
    return this.page.locator(this.cartItemTotalSelector).first();
  }

  getProceedToCheckoutButton(): Locator {
    return this.page.locator(this.proceedToCheckoutButtonSelector);
  }

  getCartTotal(): Locator {
    return this.page.locator(this.cartTotalSelector);
  }

  async updateFirstCartItemQuantity(quantity: string): Promise<void> {
    const quantityInput = this.getFirstCartItemQuantity();
    await quantityInput.fill(quantity);
    await quantityInput.blur();
  }

  getRemoveItemButton(): Locator {
  return this.page.locator('.btn.btn-danger').first();
}

async removeFirstCartItem(): Promise<void> {
  await this.getRemoveItemButton().click();
}
}