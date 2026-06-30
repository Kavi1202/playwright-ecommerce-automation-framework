import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class CartPage extends BasePage{
    
    readonly cartLink: Locator;
    readonly cartRows;
    readonly firstProductQuantity;
    private deleteButton;
    private emptyCartMessage; 
    
    constructor(page: Page){
        super(page);

        this.cartLink = page.locator('header a[href="/view_cart"]');
        this.cartRows = page.locator('#cart_info tbody tr');
        this.firstProductQuantity = page.locator('.cart_quantity button').first();
        this.deleteButton = page.locator('.cart_quantity_delete');
        this.emptyCartMessage = page.locator('#empty_cart');
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

    async verifyProductQuantity(expected: number){
        await expect(this.firstProductQuantity).toHaveText(expected.toString());
    }

    async removeProduct(){
        await this.deleteButton.first().click();
    }

    async verifyCartIsEmpty(){
        await expect(this.cartRows).toHaveCount(0);
        await expect(this.emptyCartMessage).toBeVisible();
    }
}