import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class CartPage extends BasePage{
    
    readonly cartLink: Locator;
    readonly cartRows;
    
    constructor(page: Page){
        super(page);

        this.cartLink = page.getByRole('link',{name:/cart/i});
        this.cartRows = page.locator('#cart_info tbody tr');
        
    }

    async openHomePage(){
        await this.navigate('https://automationexercise.com/');
    }

    async openCart(){
        await this.cartLink.click();
        await expect(this.page).toHaveURL(/\/view_cart/);
    }

    async verifyProductsCount(count: number){
        await expect(this.cartRows).toHaveCount(count);
    }
}