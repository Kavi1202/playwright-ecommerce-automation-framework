import { test } from '@playwright/test';
import { HomePage } from '../../pages/HomePage';

test('T25 Verify Scroll up using Arrow Button', async ({page})=>{
    const homePage = new HomePage(page);
    
    await homePage.open();
    await homePage.scrollToBottom();
    await homePage.verifySubscriptionVisible();
    await homePage.clickScrollUpButton();
    await homePage.verifyRecommendedItemsVisible();
});