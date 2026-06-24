import { test,expect } from "@playwright/test";
import { HomePage } from "../../pages/HomePage";
import { SignupPage } from "../../pages/SignupPage";
import { AccountInformationPage } from "../../pages/AccountInformationPage";
import { AccountCreatedPage } from "../../pages/AccountCreatedPage";
import { DeleteAccountPage } from "../../pages/DeleteAccountPage";
import { UserFactory } from "../../test-data/factories/userFactory";

test('TC01 Register User', async ({ page }) => {
    const homePage = new HomePage(page);
    const signupPage = new SignupPage(page);
    const accountInformationPage = new AccountInformationPage(page);
    const accountCreatedPage = new AccountCreatedPage(page);
    const deleteAccountPage = new DeleteAccountPage(page);

    const user = UserFactory.createUser();
    
    await homePage.navigate('https://automationexercise.com/');
    await homePage.clickSignupLogin();
    await signupPage.startRegistration(user.name, user.email);
    await accountInformationPage.fillAccountInformation(user);
    await expect(page).toHaveURL(/\/account_created$/);
    await accountCreatedPage.verifyAccountCreated();
    await accountCreatedPage.clickContinue();

    await expect(page.locator('a:has-text("Logged in as")')).toContainText(user.name);
    await deleteAccountPage.clickDeleteAccount();
    await deleteAccountPage.verifyAccountDeleted();
    await deleteAccountPage.clickContinue();

});