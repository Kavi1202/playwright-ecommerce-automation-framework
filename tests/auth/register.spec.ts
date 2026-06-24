import { test,expect } from "@playwright/test";
import { HomePage } from "../../pages/HomePage";
import { SignupPage } from "../../pages/SignupPage";
import { AccountInformationPage } from "../../pages/AccountInformationPage";
import { AccountCreatedPage } from "../../pages/AccountCreatedPage";
import { DeleteAccountPage } from "../../pages/DeleteAccountPage";
import { UserFactory } from "../../test-data/factories/userFactory";
import { deleteUser, registerUser } from "../../utils/authHelper";
import { LoginPage } from "../../pages/LoginPage";

test('TC01 Register User', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const user = UserFactory.createUser();

    await registerUser(page, user);

    await expect(page).toHaveURL('https://automationexercise.com/');
    await loginPage.verifyLoggedInAs(user.name);

    await deleteUser(page);

});