import { test } from '@playwright/test';
import { CartPage } from "../../pages/CartPage";
import { HomePage } from "../../pages/HomePage";

test('TC12 Add Products in Cart', async ({page})=>{
    const home = new HomePage(page);
    const cart = new CartPage(page);

    await home.open();
    await home.addFirstProduct();
    await home.continueShopping();
    await home.addSecondProduct();
    await home.openCart();
    await cart.verifyProductsCount(2);

});