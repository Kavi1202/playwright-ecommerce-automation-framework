import { expect, Page } from "@playwright/test";
import { HomePage } from "../pages/HomePage";
import { SignupPage } from "../pages/SignupPage";
import { AccountInformationPage } from "../pages/AccountInformationPage";
import { AccountCreatedPage } from "../pages/AccountCreatedPage";
import { LoginPage } from "../pages/LoginPage";
import { DeleteAccountPage } from "../pages/DeleteAccountPage";


export async function registerUser(page: Page, user: any){
    const homePage = new HomePage(page);
    const signupPage = new SignupPage(page);
    const accountInformationPage = new AccountInformationPage(page);
    const accountCreatedPage = new AccountCreatedPage(page);

    await homePage.navigate('https://automationexercise.com/');
    await homePage.clickSignupLogin();
    await signupPage.startRegistration(user.name, user.email);
    await accountInformationPage.fillAccountInformation(user);

    await expect(page).toHaveURL(/\/account_created$/);
    await accountCreatedPage.verifyAccountCreated();
    await accountCreatedPage.clickContinue();
    
}

export async function loginUser(page: Page, user: any){
    const homePage = new HomePage(page);
    const loginPage = new LoginPage(page);
    await homePage.navigate('https://automationexercise.com/')
    await homePage.clickSignupLogin();
    await loginPage.login(user.email, user.password);
    await loginPage.verifyLoggedInAs(user.name);

}
export async function logoutUser(page: Page){
    const loginPage = new LoginPage(page);
    await loginPage.clickLogout();
    await expect(page).toHaveURL(/\/login$/);
    await loginPage.verifyLoginPageVisible();
}

export async function deleteUser(page: Page){
    const deleteAccountPage = new DeleteAccountPage(page);

    await deleteAccountPage.clickDeleteAccount();
    await deleteAccountPage.verifyAccountDeleted();
    await deleteAccountPage.clickContinue();
}

export async function loginAndDeleteUser(page: Page, user: any){
    const loginPage = new LoginPage(page);
    await loginPage.login(user.email, user.password);
    await loginPage.verifyLoggedInAs(user.name);
    await deleteUser(page);
}