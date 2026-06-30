import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import { User } from "../test-data/interfaces/user";

export class CheckoutPage extends BasePage {

    readonly proceedToCheckoutButton: Locator;
    readonly registerLoginButton: Locator;
    readonly addressDetailsHeading: Locator;
    readonly reviewOrderHeading: Locator;
    readonly commentBox: Locator;
    readonly placeOrderButton: Locator;
    readonly deliveryAddress:  Locator;
    readonly billingAddress: Locator;

    constructor(page: Page){
        super(page);

        this.proceedToCheckoutButton = page.getByText('Proceed To Checkout');
        this.registerLoginButton = page.getByRole('link', {name: 'Register / Login'});
        this.addressDetailsHeading = page.getByText('Address Details');
        this.reviewOrderHeading = page.getByText('Review Your Order');
        this.commentBox = page.locator('textarea[name="message"]');
        this.placeOrderButton = page.getByRole('link',{name: /place order/i});
        this.deliveryAddress = page.locator('#address_delivery');
        this.billingAddress = page.locator('#address_invoice');
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

    async enterComment(comment: string){
        await this.commentBox.fill(comment);
    }

    async placeOrder(){
        await this.placeOrderButton.click();
    }

    async verifyDeliveryAddress(user: User){
        await expect(this.deliveryAddress).toContainText(user.firstName);
        await expect(this.deliveryAddress).toContainText(user.lastName);
        
        await expect(this.deliveryAddress).toContainText(user.address1);
        await expect(this.deliveryAddress).toContainText(user.city);
        await expect(this.deliveryAddress).toContainText(user.state);
        await expect(this.deliveryAddress).toContainText(user.zipCode);
        await expect(this.deliveryAddress).toContainText(user.country);
        await expect(this.deliveryAddress).toContainText(user.mobileNumber);
    }

    async verifyBillingAddress(user: User){
        await expect(this.billingAddress).toContainText(user.firstName);
        await expect(this.billingAddress).toContainText(user.lastName);
        
        await expect(this.billingAddress).toContainText(user.address1);
        await expect(this.billingAddress).toContainText(user.city);
        await expect(this.billingAddress).toContainText(user.state);
        await expect(this.billingAddress).toContainText(user.zipCode);
        await expect(this.billingAddress).toContainText(user.country);
        await expect(this.billingAddress).toContainText(user.mobileNumber);
    }


}
