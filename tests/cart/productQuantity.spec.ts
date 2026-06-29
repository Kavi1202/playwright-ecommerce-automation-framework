import { test } from '@playwright/test';
import { CartPage } from "../../pages/CartPage";
import { HomePage } from "../../pages/HomePage"
import { ProductDetailsPage } from "../../pages/ProductDetailsPage";

test('TC13 Verify Product Quantity in Cart', async ({page}) => {
    
    const homePage = new HomePage(page);
    const productDetailsPage = new ProductDetailsPage(page);
    const cartPage = new CartPage(page);

    await homePage.open();
    await homePage.openFirstProduct();
    await productDetailsPage.verifyLoaded();
    await productDetailsPage.setQuantity(4);
    await productDetailsPage.addToCart();
    await productDetailsPage.viewCart();
    await cartPage.verifyProductQuantity(4);
});