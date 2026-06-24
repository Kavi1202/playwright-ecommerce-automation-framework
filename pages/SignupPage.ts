import { BasePage } from "./BasePage";
import { expect } from "@playwright/test";


export class SignupPage extends BasePage {

    private signupName = this.page.locator('[data-qa="signup-name"]');
    private signupEmail = this.page.locator('[data-qa="signup-email"]');
    private signupButton = this.page.locator('[data-qa="signup-button"]');
    private emailAlreadyExitsMessage = this.page.locator('form[action="/signup"] p');

    async startRegistration(name: string, email: string) {
        await this.signupName.fill(name);
        await this.signupEmail.fill(email);
        await this.signupButton.click();
    }
    
    async verifyEmailAlreadyExistsError(){
        await expect(this.emailAlreadyExitsMessage).toHaveText('Email Address already exist!');
    }
}