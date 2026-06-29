import { test } from '@playwright/test';
import { HomePage } from '../../pages/HomePage';
import { ProductCard } from '../../pages/components/ProductCard';
import { CartPage } from '../../pages/CartPage';

test('TC17 remove Products From Cart', async ({page})=>{
    const homePage = new HomePage(page);
    const product = new ProductCard(page,0);
    const cartPage = new CartPage(page);

    await homePage.open();
    await product.addToCart();
    await homePage.continueShopping();
    await cartPage.openCart();
    await cartPage.verifyProductsCount(1);
    await cartPage.removeProduct();
    await cartPage.verifyCartIsEmpty();
});