import { test, expect } from "allure-playwright";
import { UserFactory } from "../../test-data/factories/userFactory";
import { DeleteAccountPage } from "../../pages/DeleteAccountPage";
import { LoginPage } from "../../pages/LoginPage";
import { AccountCreatedPage } from "../../pages/AccountCreatedPage";
import { SignupPage } from "../../pages/SignupPage";
import { HomePage } from "../../pages/HomePage";
import { AccountInformationPage } from "../../pages/AccountInformationPage";

test('TC02 Login User with correct correct email and passowrd', async ({ page }) => {
    const homePage = new HomePage(page);
    const signupPage = new SignupPage(page);
    const accountInformationPage = new AccountInformationPage(page);
    const accountCreatedPage = new AccountCreatedPage(page);
    const loginPage = new LoginPage(page);
    const deleteAccountPage = new DeleteAccountPage(page);

    const user = UserFactory.createUser();

    //step 1: Register a new user
    await homePage.navigate('https://automationexercise.com/');
    await homePage.clickSignupLogin();
    await signupPage.startRegistration(user.name, user.email);
    await accountInformationPage.fillAccountInformation(user);

    await expect(page).toHaveURL(/\/account_created$/);
    await accountCreatedPage.verifyAccountCreated();
    await accountCreatedPage.clickContinue();

    //step 2: Verify logged in and logout
    await loginPage.verifyLoggedInAs(user.name);
    await expect(page.locator('a[href="/logout"]')).toBeVisible();
    await loginPage.clickLogout();

    //step 3: Login with the same user
    await expect(page).toHaveURL(/\/login$/);
    await expect(page.locator('[data-qa="login-email"]')).toBeVisible();
    await loginPage.login(user.email, user.password);

    //step 4: Verify logged in and delete account
    await loginPage.verifyLoggedInAs(user.name);
    await expect(page.locator('a[href="/delete_account"]')).toBeVisible();

    //step 5: Delete the account
    await expect(page.locator('a[href="/delete_account"]')).toBeVisible();
    await deleteAccountPage.clickDeleteAccount();
    await deleteAccountPage.verifyAccountDeleted();
    await deleteAccountPage.clickContinue();    

});
