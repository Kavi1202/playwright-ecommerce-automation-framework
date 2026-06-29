import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class CategoryPage extends BasePage{
    readonly categoriesHeading: Locator;
    readonly womenCategory: Locator;
    readonly womenDress: Locator;
    readonly menCategory: Locator;
    readonly menTshirts: Locator;
    readonly categoryTitle: Locator;

    constructor(page: Page){
        super(page);

        this.categoriesHeading=page.getByRole('heading',{name:'Category'});
        this.womenCategory = page.locator('a[href="#Women"]');
        this.womenDress = page.locator('a[href="/category_products/1"]');
        this.menCategory =  page.locator('a[href="#Men"]');
        this.menTshirts = page.locator('a[href="/category_products/3"]');
        this.categoryTitle=page.locator('.features_items h2.title');
    }

    async verifyCategoriesVisible(){
        await expect(this.categoriesHeading).toBeVisible();
    }

    async openWomenDressCategory(){
        await this.womenCategory.click();
        await this.womenDress.click();
    }

    async verifyWomenDresspage(){
        await expect(this.categoryTitle).toContainText('Women - Dress Products')   
    }

    async openMenTshirtsCategory(){
        await this.menCategory.click();
        await this.menTshirts.click();
    }

    async verifyMenTshirtspage() {
        await expect(this.categoryTitle).toContainText('Men - Tshirts Products');
    }

}