import { test,expect } from "@playwright/test";
import { AccountCreatedPage } from "../../pages/AccountCreatedPage";
import { AccountInformationPage } from "../../pages/AccountInformationPage";
import { DeleteAccountPage } from "../../pages/DeleteAccountPage";
import { HomePage } from "../../pages/HomePage";
import { LoginPage } from "../../pages/LoginPage";
import { SignupPage } from "../../pages/SignupPage";
import { UserFactory } from "../../test-data/factories/userFactory";

test('TC04 Logout User', async ({ page }) => {
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

    //step 2: App redirects to login page, so log in explicitly
    //await loginPage.verifyLoginPageVisible();
    //await loginPage.login(user.email, user.password);

    //step 3: Verify logged in
    await expect(page).toHaveURL('https://automationexercise.com/')
    await loginPage.verifyLoggedInAs(user.name);

    //step 4: logout
    await loginPage.clickLogout();

    //step 5: Verify redirected to login page
    await expect(page).toHaveURL(/\/login$/);
    await loginPage.verifyLoginPageVisible();

    //step 6: Login again for cleanup
    await loginPage.login(user.email, user.password);
    await loginPage.verifyLoggedInAs(user.name);

    //Step 7: Delete account cleanup
    await deleteAccountPage.clickDeleteAccount();
    await deleteAccountPage.verifyAccountDeleted();
    await deleteAccountPage.clickContinue();
});