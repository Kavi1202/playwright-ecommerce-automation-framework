import { test } from "@playwright/test";
import { HomePage } from "../../pages/HomePage";
import { userData } from "../../test-data/userData";
import { SignupPage } from "../../pages/SignupPage";

test('TC01 Register User', async ({ page }) => {
    const homePage = new HomePage(page);
    const signupPage = new SignupPage(page);

    await homePage.navigate('https://automationexercise.com/');
    await homePage.clickSignupLogin();
    await signupPage.startRegistration(userData.name, userData.email);
});