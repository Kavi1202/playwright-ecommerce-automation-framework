import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class ProductDetailsPage extends BasePage {
    readonly quantityInput: Locator;
    readonly addToCartButton: Locator;
    readonly viewCartLink: Locator;

    constructor(page:Page){
        super(page);

    this.quantityInput = page.locator('#quantity');
    this.addToCartButton = page.locator('button.cart');
    this.viewCartLink = page.getByRole('link',{name: 'View Cart'});
}

async verifyLoaded(){
    await expect(this.page).toHaveURL(/product_details/);
    await expect(this.quantityInput).toBeVisible();
}

async setQuantity(quantity: number){
    await this.quantityInput.fill(quantity.toString());
}

async addToCart(){
    await this.addToCartButton.click();
}

async viewCart() {
    await this.viewCartLink.click();
}

}