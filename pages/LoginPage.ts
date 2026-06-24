import { BasePage } from "./BasePage";
import { expect } from "@playwright/test";

export class LoginPage extends BasePage {

    private loginEmail = this.page.locator('[data-qa="login-email"]');
    private loginPassword = this.page.locator('[data-qa="login-password"]');
    private loginButton = this.page.locator('[data-qa="login-button"]');
    private logoutlink = this.page.locator('a[href="/logout"]');
    private loggedInAsText = this.page.locator('a:has-text("Logged in as")');
    private loginErrorMessage = this.page.locator('p:has-text("Your email or password is incorrect!")');
    private loginToYourAccountHeading = this.page.getByRole('heading',{name: 'Login to your account'});

    
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

    async verifyInvalidLoginError(){
        await expect(this.loginErrorMessage).toHaveText('Your email or password is incorrect!');
    }

    async verifyLoginPageVisible(){
        await expect(this.loginToYourAccountHeading).toBeVisible();
    }

}