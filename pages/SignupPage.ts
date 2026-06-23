import { BasePage } from "./BasePage";


export class SignupPage extends BasePage {

    private signupName = this.page.locator('[data-qa="signup-name"]');
    private signupEmail = this.page.locator('[data-qa="signup-email"]');
    private signupButton = this.page.locator('[data-qa="signup-button"]');

    async startRegistration(name: string, email: string) {
        await this.signupName.fill(name);
        await this.signupEmail.fill(email);
        await this.signupButton.click();
    }
}