import { Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class HomePage extends BasePage{
    
    constructor(page: Page){
        super(page);
    }

    private signupLoginLink = this.page.locator('a[href="/login"]');
    async clickSignupLogin() {
        await this.signupLoginLink.click();
    }

    async open(){
        await this.navigate('https://automationexercise.com/');
    }
}