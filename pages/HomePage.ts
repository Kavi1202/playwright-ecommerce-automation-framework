import { BasePage } from "./BasePage";

export class HomePage extends BasePage{

    private signupLoginLink = this.page.locator('a[href="/login"]');
    async clickSignupLogin() {
        await this.signupLoginLink.click();
    }
}