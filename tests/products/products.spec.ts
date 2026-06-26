import { test } from "@playwright/test";
import { ProductsPage } from '../../pages/ProductsPage';

test('TC08 Verify All  Products and Product Detail Page', async ({page}) => {
    const productsPage = new ProductsPage(page);

    await productsPage.openHomePage();
    await productsPage.openProductsPage();
    await productsPage.verifyAllProductsPageLoaded();
    await productsPage.verifyProductsListVisible();
    await productsPage.openFirstProductDetail();
    await productsPage.verifyProductDetailPageLoaded();
    await productsPage.verifyProductDetailsVisible();
});
