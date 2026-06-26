import {test} from '@playwright/test';
import { ProductsPage } from '../../pages/ProductsPage';

test('TC09 Search Product', async ({page})=>{
    const productsPage = new ProductsPage(page);
    const productName = 'Blue Top';

    await productsPage.openHomePage();
    await productsPage.openProductsPage();

    await productsPage.verifyAllProductsPageLoaded();

    await productsPage.searchProduct(productName);
    
    await productsPage.verifySearchResults(productName);


});