import { Locator, Page } from '@playwright/test';
import BasePage from './BasePage';

export default class InvoiceDetailsPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  getInvoiceNumberLabel(): Locator {
    return this.page.getByText('Invoice Number', { exact: true });
  }

  getInvoiceDateLabel(): Locator {
    return this.page.getByText('Invoice Date', { exact: true });
  }

  getTotalLabel(): Locator {
    return this.page.locator('label').filter({ hasText: 'Total' }).first();
  }

  getPaymentMethodLabel(): Locator {
    return this.page.getByText('Payment Method', { exact: true });
  }

  getGeneralInfoHeading(): Locator {
    return this.page.getByRole('heading', { name: 'General Information' });
  }

  getBillingAddressHeading(): Locator {
    return this.page.getByRole('heading', { name: 'Billing Address' });
  }

  getPaymentInfoHeading(): Locator {
    return this.page.getByRole('heading', { name: 'Payment Information' });
  }

  getProductsHeading(): Locator {
    return this.page.getByRole('heading', { name: 'Products' });
  }
}