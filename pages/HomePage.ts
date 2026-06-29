import { expect, Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import {ProductCard} from './components/ProductCard';

export class HomePage extends BasePage{

    readonly continueShoppingButton;
    readonly viewCartLink;
    readonly firstViewProductButton;
    readonly signupLoginLink;
    
    constructor(page: Page){
        super(page);

        this.continueShoppingButton = page.getByRole('button',{name: 'Continue Shopping'});
        this.viewCartLink = page.getByRole('link',{name: 'View Cart'});
        this.firstViewProductButton = page.locator('a[href="/product_details/1"]');
        this.signupLoginLink = page.locator('a[href="/login"]');
    }

    
    async clickSignupLogin() {
        await this.signupLoginLink.click();
    }

    async open(){
        await this.navigate('https://automationexercise.com/');
    }

    product(index: number){
        return new ProductCard(this.page, index);
    }

    async addFirstProduct(){
        await this.product(0).addToCart();
    }

    async addSecondProduct(){
        await this.product(1).addToCart();
    }

    async continueShopping(){
        await expect(this.continueShoppingButton).toBeVisible();
        await this.continueShoppingButton.click();
    }

    async openCart(){
        await expect(this.viewCartLink).toBeVisible();
        await this.viewCartLink.click();
    }

    async openFirstProduct(){
        await this.firstViewProductButton.click();
    }
}
