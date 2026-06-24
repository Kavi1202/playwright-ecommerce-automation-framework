import { expect } from "playwright/test";
import { BasePage } from "./BasePage";

export class AccountCreatedPage extends BasePage {
    private accountCreatedMessage = this.page.locator('h2[data-qa="account-created"]');
    private continueButton = this.page.locator('[data-qa="continue-button"]');

    async verifyAccountCreated() {
        await expect(this.accountCreatedMessage).toBeVisible();
        await expect(this.accountCreatedMessage).toHaveText("Account Created!");
    }

    async clickContinue() {
        await this.continueButton.click();
    }
}
