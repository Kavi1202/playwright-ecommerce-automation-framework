import { expect } from "allure-playwright";
import { BasePage } from "./BasePage";
import { Messages } from "../constants/messages";

export class DeleteAccountPage extends BasePage {
    private deleteAccountLink = this.page.locator('a[href="/delete_account"]');
    private accountDeletedMessage = this.page.locator('h2[data-qa="account-deleted"]');
    private continueButton = this.page.locator('[data-qa="continue-button"]');

    async clickDeleteAccount() {
        await this.deleteAccountLink.click();
    }

    async verifyAccountDeleted() {
        await expect(this.accountDeletedMessage).toBeVisible();
        await expect(this.accountDeletedMessage).toHaveText(Messages.ACCOUNT_DELETED);
    }

    async clickContinue() {
        await this.continueButton.click();
    }
}