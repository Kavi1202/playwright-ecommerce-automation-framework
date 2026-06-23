import { expect } from "playwright/test";
import { BasePage } from "./BasePage";

export class AccountCreatedPage extends BasePage {
    private accountCreatedMessage = this.page.locator('h2[data-qa="account-created"]');

    async verifyAccountCreatedText() {
        await expect(this.accountCreatedMessage).toBeVisible();
    }
}
