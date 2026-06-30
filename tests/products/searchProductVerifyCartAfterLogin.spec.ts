import { test } from '@playwright/test';
import { HomePage } from '../../pages/HomePage';
import { ProductsPage } from '../../pages/ProductsPage';
import { CartPage } from '../../pages/CartPage';
import { LoginPage } from '../../pages/LoginPage';
import { registeredUser } from '../../test-data/userData';

test.beforeEach(async({page})=>{
    await page.route('**/ads*', route => route.abort());
});


test('TC20 Search Products and verify Cart Ater Login',async({page})=>{
    const homePage = new HomePage(page);
    const productsPage = new ProductsPage(page);
    const cartPage = new CartPage(page);
    const loginPage = new LoginPage(page);

    await homePage.open();
    await productsPage.openProducts();
    await productsPage.verifyAllProductsPageLoaded();
    await productsPage.searchProduct('Blue');
    const resultCount = await productsPage.getSearchResultCount();
    await productsPage.addAllSearchedProductsToCart();
    await homePage.openCartFromPopup();
    await cartPage.verifyProductsCount(resultCount);
    await homePage.clickSignupLogin();
    await loginPage.login(registeredUser.email,registeredUser.password);
    await loginPage.verifyLoggedInAs(registeredUser.name);
    await cartPage.openCart();
    await cartPage.verifyProductsCount(resultCount);

});