import { test } from '@playwright/test';
import { HomePage } from '../../pages/HomePage';

test('T26 Verify Scroll Up without Arrow Button', async ({page})=>{
    const homePage = new HomePage(page);
    await homePage.open();
    await homePage.scrollToBottom();
    await homePage.verifySubscriptionVisible();
    await homePage.scrollToTop();
    await homePage.verifyHomeBannerVisible();
});