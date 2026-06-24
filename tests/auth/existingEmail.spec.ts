import { test, expect } from "@playwright/test";
import { AccountCreatedPage } from "../../pages/AccountCreatedPage";
import { AccountInformationPage } from "../../pages/AccountInformationPage";
import { DeleteAccountPage } from "../../pages/DeleteAccountPage";
import { HomePage } from "../../pages/HomePage"
import { LoginPage } from "../../pages/LoginPage";
import { SignupPage } from "../../pages/SignupPage";
import { UserFactory } from "../../test-data/factories/userFactory";

test('TC05 Register User with existing email', async ({page})=>{
    const homePage = new HomePage(page);
    const signupPage = new SignupPage(page);
    const accountInformationPage = new AccountInformationPage(page);
    const accountCreatedPage = new AccountCreatedPage(page);
    const loginPage = new LoginPage(page);
    const deleteAccountPage = new DeleteAccountPage(page);

    const user = UserFactory.createUser();

    //step 1: Register user
    await homePage.navigate('https://automationexercise.com/');
    await homePage.clickSignupLogin();
    await signupPage.startRegistration(user.name, user.email);
    await accountInformationPage.fillAccountInformation(user);
    
    
    await expect(page).toHaveURL(/\/account_created$/);
    await accountCreatedPage.verifyAccountCreated();
    await accountCreatedPage.clickContinue();

    //step 2: Return to Signup/login page
    await expect(page).toHaveURL('https://automationexercise.com/')
    await loginPage.clickLogout();

    await loginPage.verifyLoginPageVisible();
    
    //step 3: Try to register again with email
    await signupPage.startRegistration(user.name, user.email);
    
    //step 4: verify existing email error
    await signupPage.verifyEmailAlreadyExistsError();


    //step 5: Cleanup - log in and delete account
    await loginPage.login(user.email, user.password);
    await deleteAccountPage.clickDeleteAccount();
    await deleteAccountPage.verifyAccountDeleted();
    await deleteAccountPage.clickContinue();

})