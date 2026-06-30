import { expect, Locator, Page } from "@playwright/test";

export class ProductCard{
    readonly page : Page;
    readonly root: Locator;

    constructor(page: Page, index: number){
        this.page = page;
        this.root = page.locator('.features_items .product-image-wrapper').nth(index);
    }

    get addToCartButton(){
        return this.root.locator('.product-overlay .add-to-cart');
    }

    get name(){
        return this.root.locator('.productinfo p');
    }

    get price(){
        return this.root.locator(".productinfo h2");
    }

    async addToCart(){
       await this.root.scrollIntoViewIfNeeded();
       await expect(async () =>{
       await this.root.hover();
       await expect(this.addToCartButton).toBeVisible();
       await this.addToCartButton.click();
       await expect(this.page.getByText('Added!')).toBeVisible();
       }).toPass();
    }

    async verifyVisible(){
        await expect(this.root).toBeVisible();
    }
}