import { test } from '@playwright/test';
import { HomePage } from '../../pages/HomePage';
import { ProductsPage } from '../../pages/ProductsPage';

test('TC19 View & Cart Brand Products', async ({page})=>{
    const homePage = new HomePage(page);
    const productPage = new ProductsPage(page);

    await homePage.open();
    await productPage.openProducts();
    await productPage.verifyBrandsVisible();
    await productPage.openPoloBrand();
    await productPage.verifyPoloProducts();
    await productPage.openHMBrand();
    await productPage.verifyHMProducts();
});