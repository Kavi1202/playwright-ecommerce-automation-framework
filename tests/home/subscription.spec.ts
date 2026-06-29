import { test } from '@playwright/test'
import { FooterComponent } from "../../pages/components/FooterComponent";
import { HomePage } from "../../pages/HomePage";

test('TC10 Verify Subscription in Home Page', async ({page})=>{
    const homePage = new HomePage(page);
    const footer = new FooterComponent(page);

    await homePage.open();

    await footer.subscribe('kaviraj@example.com');
    await footer.verifySubscriptionSuccess();

});