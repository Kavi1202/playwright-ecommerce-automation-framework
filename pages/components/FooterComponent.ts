import { expect, Locator, Page } from "@playwright/test";

export class FooterComponent{
    readonly page: Page;
    readonly subscriptionHeading: Locator;
    readonly emailInput : Locator;
    readonly subscribeButton: Locator;
    readonly successMessage: Locator;

    constructor(page: Page){
        this.page = page;
        this.subscriptionHeading = page.getByRole('heading', { name: 'Subscription' })
        this.emailInput = page.getByRole('textbox', { name: 'Your email address' });
        this.subscribeButton = page.locator('#subscribe');
        this.successMessage = page.locator('#success-subscribe .alert-success');
    }

    async subscribe (email:string){
        await this.subscriptionHeading.scrollIntoViewIfNeeded();
        await expect(this.subscriptionHeading).toBeVisible();
        await this.emailInput.fill(email);
        await this.subscribeButton.click();
    }

    async verifySubscriptionSuccess(){
        await expect(this.successMessage).toBeVisible();
        await expect(this.successMessage).toHaveText('You have been successfully subscribed!');
    }
}