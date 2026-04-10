import { Locator, Page } from '@playwright/test';
import BasePage from './BasePage';

export default class CheckoutPage extends BasePage {
    readonly proceedToSignInSelector = '[data-test="proceed-1"]';
    readonly proceedToBillingSelector = '[data-test="proceed-2"]';
    readonly proceedToPaymentSelector = '[data-test="proceed-3"]';
    readonly finishButtonSelector = '[data-test="finish"]';

    readonly emailInputSelector = '[data-test="email"]';
    readonly passwordInputSelector = '[data-test="password"]';
    readonly loginSubmitSelector = '[data-test="login-submit"]';

    readonly stateInputSelector = '[data-test="state"]';
    readonly postalCodeInputSelector = '[data-test="postal_code"]';

    readonly paymentMethodSelector = '[data-test="payment-method"]';
    readonly bankNameInputSelector = '[data-test="bank_name"]';
    readonly accountNameInputSelector = '[data-test="account_name"]';
    readonly accountNumberInputSelector = '[data-test="account_number"]';

    readonly orderSuccessMessageSelector = 'text=Thanks for your order!';

    constructor(page: Page) {
        super(page);
    }

    getProceedToSignInButton(): Locator {
        return this.page.locator(this.proceedToSignInSelector);
    }

    getProceedToBillingButton(): Locator {
        return this.page.locator(this.proceedToBillingSelector);
    }

    getProceedToPaymentButton(): Locator {
        return this.page.locator(this.proceedToPaymentSelector);
    }

    getFinishButton(): Locator {
        return this.page.locator(this.finishButtonSelector);
    }

    getOrderSuccessMessage(): Locator {
        return this.page.getByText(/Thanks for your order!/i);
    }

    async proceedFromCart(): Promise<void> {
        await this.getProceedToSignInButton().click();
    }

    async loginDuringCheckout(email: string, password: string): Promise<void> {
        await this.waitForElementVisible(this.emailInputSelector);
        await this.fillInputField(this.emailInputSelector, email);
        await this.fillInputField(this.passwordInputSelector, password);
        await this.clickElement(this.loginSubmitSelector);
    }

    async proceedToBilling(): Promise<void> {
        await this.getProceedToBillingButton().click();
        await this.page.getByRole('heading', { name: 'Billing Address' }).waitFor({
            state: 'visible',
            timeout: 10000,
        });
    }


    async proceedToPayment(): Promise<void> {
        await this.getProceedToPaymentButton().click();
        await this.page.getByRole('heading', { name: 'Payment' }).waitFor({
            state: 'visible',
            timeout: 10000,
        });
    }

    async selectPaymentMethod(methodValue: string): Promise<void> {
        await this.page.locator(this.paymentMethodSelector).selectOption(methodValue);
    }

    async fillBankTransferDetails(
        bankName: string,
        accountName: string,
        accountNumber: string
    ): Promise<void> {
        await this.fillInputField(this.bankNameInputSelector, bankName);
        await this.fillInputField(this.accountNameInputSelector, accountName);
        await this.fillInputField(this.accountNumberInputSelector, accountNumber);
    }

    async confirmOrder(): Promise<void> {
        const finishButton = this.getFinishButton();

        await finishButton.click();

        if (await finishButton.isVisible().catch(() => false)) {
            await finishButton.click();
        }
    }

    getStateInput(): Locator {
        return this.page.locator('[data-test="state"]');
    }

    getPostalCodeInput(): Locator {
        return this.page.locator('[data-test="postal_code"]');
    }

    async fillBillingAddress(state: string, postalCode: string): Promise<void> {
    const stateInput = this.page.locator(this.stateInputSelector);
    const postalInput = this.page.locator(this.postalCodeInputSelector);

    await stateInput.click();
    await stateInput.press('Control+A');
    await stateInput.press('Backspace');
    await stateInput.type(state, { delay: 50 });

    await postalInput.click();
    await postalInput.press('Control+A');
    await postalInput.press('Backspace');
    await postalInput.type(postalCode, { delay: 50 });


    await postalInput.press('Tab');
}
}