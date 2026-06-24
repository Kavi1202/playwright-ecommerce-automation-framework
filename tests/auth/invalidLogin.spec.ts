import { test } from '@playwright/test';
import { HomePage } from '../../pages/HomePage';
import { LoginPage } from '../../pages/LoginPage';  
import { invalidUser } from '../../constants/authData';

test('TC03 Login User with invalid email and password', async ({ page }) => {
    const homePage = new HomePage(page);
    const loginPage = new LoginPage(page);

    //step 1: Navigate to the login page
    await homePage.navigate('https://automationexercise.com/');
    await homePage.clickSignupLogin();

    await loginPage.login(invalidUser.email, invalidUser.password);
    await loginPage.verifyInvalidLoginError();

});