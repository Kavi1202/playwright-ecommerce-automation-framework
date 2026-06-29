import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class CartPage extends BasePage{
    readonly cartLink: Locator;
    constructor(page: Page){
        super(page);

        this.cartLink = page.getByRole('link',{name:/cart/i});
        
    }

    async openHomePage(){
        await this.navigate('https://automationexercise.com/');
    }

    async openCart(){
        await this.cartLink.click();
        await expect(this.page).toHaveURL(/\/view_cart/);
    }
}