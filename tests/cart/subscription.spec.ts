import { test } from "@playwright/test"
import { CartPage } from "../../pages/CartPage"
import { FooterComponent } from "../../pages/components/FooterComponent";

test('TC11 erify subscription in Cart Page', async ({ page })=> {
    const cartPage = new CartPage(page);
    const footer = new FooterComponent(page);
    
    await cartPage.openHomePage();
    await cartPage.openCart();

    await footer.subscribe('kaviraj@example.com');
    await footer.verifySubscriptionSuccess();

});