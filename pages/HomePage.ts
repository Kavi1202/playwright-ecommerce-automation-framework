import { expect, Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import {ProductCard} from './components/ProductCard';

export class HomePage extends BasePage{

    readonly continueShoppingButton;
    readonly viewCartLink;
    readonly firstViewProductButton;
    readonly signupLoginLink;
    readonly recommendedItemsHeading;
    readonly recommendedProduct;
    readonly recommendedAddToCart;
    readonly subscriptionHeading;
    readonly scrollUpButton;
    readonly homeBanner;
    
    constructor(page: Page){
        super(page);

        this.continueShoppingButton = page.getByRole('button',{name: 'Continue Shopping'});
        this.viewCartLink = page.getByRole('link',{name: 'View Cart'});
        this.firstViewProductButton = page.locator('a[href="/product_details/1"]');
        this.signupLoginLink = this.page.getByRole('link', { name: /signup\s*\/\s*login/i });
        this.recommendedItemsHeading = this.page.getByText('RECOMMENDED ITEMS');
        this.recommendedProduct = this.page.locator('.recommended_items .product-image-wrapper').first();
        this.recommendedAddToCart = this.recommendedProduct.locator('.add-to-cart');
        this.subscriptionHeading=page.getByRole('heading',{name:/subscription/i});
        this.scrollUpButton = page.locator('#scrollUp');
        this.homeBanner = page.getByRole('heading',{name:/Full-Fledged practice website/i}).first();
        
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

    async openCartFromPopup() {
        await expect(this.viewCartLink).toBeVisible();
        await this.viewCartLink.click();
    }

    async scrollToBottom(){
        await this.page.evaluate(()=> window.scrollTo(0,document.body.scrollHeight));
    }

    async verifyRecommendedItemsVisible(){
        await expect(this.recommendedItemsHeading).toBeVisible();
    }

    async addRecommendedItemToCart(){
        await this.recommendedProduct.scrollIntoViewIfNeeded();
        await this.recommendedProduct.hover();
        await this.recommendedAddToCart.click();
    }

    async verifySubscriptionVisible(){
        await expect(this.subscriptionHeading).toBeVisible();
    }

    async clickScrollUpButton(){
        await expect(this.scrollUpButton).toBeVisible();
        await this.scrollUpButton.click();
    }

    async verifyHomeBannerVisible(){
        await expect(this.homeBanner).toBeVisible();
    }

    async scrollToTop() {
        await this.page.evaluate(() => window.scrollTo(0, 0));
    }

}
