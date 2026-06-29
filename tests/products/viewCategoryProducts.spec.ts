import { test } from '@playwright/test';
import { CategoryPage } from '../../pages/CategoryPage';
import { HomePage } from '../../pages/HomePage';
import { ProductsPage } from '../../pages/ProductsPage';

test('TC18 View Category Products', async ({page})=>{
    const homePage = new HomePage(page);
    const categorypage = new CategoryPage(page);
    const productPage = new ProductsPage(page);
    
    await homePage.open();
    await productPage.openProductsPage();
    await categorypage.verifyCategoriesVisible();
    await categorypage.openWomenDressCategory();
    await categorypage.verifyWomenDresspage();
    await categorypage.openMenTshirtsCategory();
    await categorypage.verifyMenTshirtspage();
});