import { expect, Locator, Page } from "@playwright/test";

export class ReviewSection{
    readonly reviewHeading: Locator;
    readonly nameInput: Locator;
    readonly emailInput: Locator;
    readonly reviewTextarea: Locator;
    readonly submitButton: Locator;
    readonly successMessage: Locator;

    constructor(private page: Page){
        this.reviewHeading = page.getByText('Write Your Review');
        this.nameInput = page.locator('#name');
        this.emailInput = page.locator('#email');
        this.reviewTextarea = page.locator('#review');
        this.submitButton = page.locator('#button-review');
        this.successMessage = page.locator('#review-section .alert-success');
    }

    async verifyVisible(){
        await expect(this.reviewHeading).toBeVisible();
    }

    async submitReview(
        name: string,
        email: string,
        review: string
    ){
        await this.nameInput.fill(name);
        await this.emailInput.fill(email);
        await this.reviewTextarea.fill(review);
        await this.submitButton.click();
    }

    async verifySuccessMessage(){
        await expect(this.successMessage).toContainText('Thank you for your review.');
    }

}