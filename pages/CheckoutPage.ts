import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class CheckoutPage extends BasePage {

    readonly proceedToCheckoutButton: Locator;
    readonly registerLoginButton: Locator;
    readonly addressDetailsHeading: Locator;
    readonly reviewOrderHeading: Locator;
    readonly commentBox: Locator;
    readonly placeOrderButton: Locator;

    constructor(page: Page){
        super(page);

        this.proceedToCheckoutButton = page.getByText('Proceed To Checkout');
        this.registerLoginButton = page.getByRole('link', {name: 'Register / Login'});
        this.addressDetailsHeading = page.getByText('Address Details');
        this.reviewOrderHeading = page.getByText('Review Your Order');
        this.commentBox = page.locator('textarea[name="message"]');
        this.placeOrderButton = page.getByRole('link',{name: /place order/i});
    }

    async proceedToCheckout(){
        await this.proceedToCheckoutButton.click();
    }

    async clickRegisterLogin(){
        await this.registerLoginButton.click();
    }

    async verifyCheckoutPage(){
        await expect(this.addressDetailsHeading).toBeVisible();
        await expect(this.reviewOrderHeading).toBeVisible();
    }

    async enterCommet(comment: string){
        await this.commentBox.fill(comment);
    }

    async placeOrder(){
        await this.placeOrderButton.click();
    }
}
