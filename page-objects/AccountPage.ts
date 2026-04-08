import { Locator, Page } from '@playwright/test';
import BasePage from './BasePage';

export default class AccountPage extends BasePage {
  readonly invoicesLink = '[data-test="nav-invoices"]';
  readonly invoiceRows = 'table tbody tr';

  constructor(page: Page) {
    super(page);
  }

  async goToMyInvoices(): Promise<void> {
    await this.page.locator(this.invoicesLink).click();
  }

  getInvoices(): Locator {
    return this.page.locator(this.invoiceRows);
  }

  getFirstInvoice(): Locator {
    return this.getInvoices().first();
  }

  getFirstInvoiceDetailsButton(): Locator {
    return this.getFirstInvoice().getByRole('link', { name: 'Details' });
  }

  async openFirstInvoice(): Promise<void> {
    await this.getFirstInvoiceDetailsButton().click();
  }

  getFirstInvoiceNumber(): Locator {
    return this.getFirstInvoice().locator('td').first();
  }

  getFirstInvoiceDate(): Locator {
    return this.getFirstInvoice().locator('td').nth(2);
  }

  getFirstInvoiceTotal(): Locator {
    return this.getFirstInvoice().locator('td').nth(3);
  }
}