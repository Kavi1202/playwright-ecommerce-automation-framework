import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class ProductsPage extends BasePage{
    readonly productsLink : Locator ;
    readonly allProductsTitle: Locator;
    readonly productList: Locator;
    readonly firstViewProductLink: Locator;
    
    readonly productDetailContainer: Locator;
    readonly productName: Locator;
    readonly category: Locator;
    readonly price: Locator;
    readonly availability: Locator;
    readonly condition: Locator;
    readonly brand: Locator;

    readonly searchInput: Locator;
    readonly searchButton: Locator;
    readonly searchedProductsHeading: Locator;
    readonly searchedProducts: Locator;

    constructor(page: Page){
        super(page);

        this.productsLink = page.getByRole('link',{name: /products/i});
        this.allProductsTitle = page.getByRole('heading',{name:/all products/i});
        this.productList = page.locator('.features_items .col-sm-4');
        this.firstViewProductLink = page.locator('a[href*="/product_details/"]').first();

        this.productDetailContainer = page.locator('.product-information');
        this.productName = this.productDetailContainer.locator('h2');
        this.category = this.productDetailContainer.locator('p').filter({hasText:'Category:'});
        this.price = this.productDetailContainer.locator('span>span');
        this.availability = this.productDetailContainer.locator('p').filter({hasText: 'Availability:' });
        this.condition = this.productDetailContainer.locator('p').filter({hasText: 'Condition:' });
        this.brand = this.productDetailContainer.locator('p').filter({hasText: 'Brand:' });

        this.searchInput = page.locator('#search_product');
        this.searchButton = page.locator('#submit_search');
        
        this.searchedProductsHeading = page.getByRole('heading',{name:/searched products/i});
        this.searchedProducts = page.locator('.features_items .productinfo p');
        
    }

    async openHomePage(){
        await this.navigate('https://automationexercise.com/');
    }

    async openProductsPage(){
        await this.productsLink.click();
    }

    async verifyAllProductsPageLoaded(){
        await expect(this.page).toHaveURL(/\/products/);
        await expect(this.allProductsTitle).toBeVisible();
    }

    async verifyProductsListVisible(){
        await expect(this.productList.first()).toBeVisible();
        const count = await this.productList.count();
        expect(count).toBeGreaterThan(0);
    }

    async openFirstProductDetail(){
        await this.firstViewProductLink.click();
    }

    async verifyProductDetailPageLoaded(){
        await expect(this.page).toHaveURL('https://automationexercise.com/product_details/1');
        await expect(this.productDetailContainer).toBeVisible();
    }

    async verifyProductDetailsVisible(){
        await expect(this.productName).toBeVisible();
        await expect(this.category).toBeVisible();
        await expect(this.price).toBeVisible();
        await expect(this.availability).toBeVisible();
        await expect(this.condition).toBeVisible();
        await expect(this.brand).toBeVisible();
    }

    async searchProduct(productName: string){
        await this.searchInput.fill(productName);
        await this.searchButton.click();
    }

    async verifySearchResults(productName: string){
        await expect(this.searchedProductsHeading).toBeVisible();
        
        const count = await this.searchedProducts.count();
        expect(count).toBeGreaterThan(0);

        for(let i=0; i< count; i++){
            await expect(this.searchedProducts.nth(i)).toContainText(productName);
        }
    }
}