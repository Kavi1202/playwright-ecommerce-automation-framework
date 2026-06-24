import { BasePage } from "./BasePage";
import { expect } from "@playwright/test";

export class LoginPage extends BasePage {

    private loginEmail = this.page.locator('[data-qa="login-email"]');
    private loginPassword = this.page.locator('[data-qa="login-password"]');
    private loginButton = this.page.locator('[data-qa="login-button"]');
    private logoutlink = this.page.locator('a[href="/logout"]');
    private loggedInAsText = this.page.locator('a:has-text("Logged in as")');
    
    async login(email: string, password: string) {
        await this.loginEmail.fill(email);
        await this.loginPassword.fill(password);
        await this.loginButton.click(); 
    }

    async clickLogout() {
        await this.logoutlink.click();
    }

    async verifyLoggedInAs(userName: string) {
        await expect (this.loggedInAsText).toContainText(userName);
    }

}