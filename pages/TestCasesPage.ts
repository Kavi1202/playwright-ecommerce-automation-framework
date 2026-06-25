import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class TestCasesPage extends BasePage{
    readonly testCasesLink: Locator;
    readonly testCasesHeading: Locator;

    constructor(page:Page){
        super(page);
    

    this.testCasesLink = page.getByRole('link',{name: ' Test Cases'});
    this.testCasesHeading = page.getByRole('heading',{name:'TEST CASES'}).nth(1);
    }

    async openHomePage(){
        await this.navigate('https://automationexercise.com/');
    }

    async openTestCasesPage(){
        await this.testCasesLink.click();
    }

    async verifyTestCasesPageLoaded(){
        await expect(this.page).toHaveURL(/\/test_cases/);
        await expect(this.testCasesHeading).toBeVisible();
    }

}