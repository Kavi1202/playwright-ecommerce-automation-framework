import { test } from '@playwright/test';
import { HomePage } from '../../pages/HomePage';
import { CartPage } from '../../pages/CartPage';

test('TC22 Add to cart from Recommended Items',async ({page})=>{
    const homePage = new HomePage(page);
    const cartPage = new CartPage(page);

    await homePage.open();
    await homePage.scrollToBottom();
    await homePage.verifyRecommendedItemsVisible();
    await homePage.addRecommendedItemToCart();
    await homePage.openCartFromPopup();
    await cartPage.verifyProductsCount(1);

});