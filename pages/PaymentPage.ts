import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class PaymentPage extends BasePage{

    readonly nameOnCard : Locator;
    readonly cardNumber : Locator;
    readonly cvc: Locator;
    readonly expiryMonth: Locator;
    readonly expiryYear: Locator;
    readonly payAndConfirmButton: Locator;
    readonly successMessage: Locator;

    constructor(page: Page){
        super(page);

        this.nameOnCard = page.locator('[data-qa="name-on-card"]');
        this.cardNumber = page.locator('[data-qa="card-number"]');
        this.cvc = page.locator('[data-qa="cvc"]');
        this.expiryMonth = page.locator('[data-qa="expiry-month"]');
        this.expiryYear = page.locator('[data-qa="expiry-year"]');
        this.payAndConfirmButton = page.locator('[data-qa="pay-button"]');
        this.successMessage = page.locator('[data-qa="order-placed"]');
    }

    async fillPaymentDetails(
        name: string,
        card: string,
        cvc: string,
        month: string,
        year: string
    ){
        await this.nameOnCard.fill(name);
        await this.cardNumber.fill(card);
        await this.cvc.fill(cvc);
        await this.expiryMonth.fill(month);
        await this.expiryYear.fill(year);
    }

    async confirmOrder(){
        await this.payAndConfirmButton.click();
    }

    async verifyOrderPlaced(){
        await expect(this.successMessage).toHaveText('Order Placed!');
    }

}