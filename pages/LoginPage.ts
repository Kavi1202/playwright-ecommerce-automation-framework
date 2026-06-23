import { BasePage } from "./BasePage";

export class LoginPage extends BasePage {

    private loginEmail = this.page.locator('[data-qa="login-email"]');
    private loginPassword = this.page.locator('[data-qa="login-password"]');
    private loginButton = this.page.locator('[data-qa="login-button"]');
    
    async login(email: string, password: string) {
        await this.loginEmail.fill(email);
        await this.loginPassword.fill(password);
        await this.loginButton.click(); 
    }

}