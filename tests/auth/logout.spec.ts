import { test,expect } from "@playwright/test";
import { LoginPage } from "../../pages/LoginPage";
import { UserFactory } from "../../test-data/factories/userFactory";
import { deleteUser, loginUser, logoutUser, registerUser } from "../../utils/authHelper";

test('TC04 Logout User', async ({ page }) => {

    const loginPage = new LoginPage(page);
    const user = UserFactory.createUser();

    await registerUser(page, user);
    await expect(page).toHaveURL('https://automationexercise.com/');
    await loginPage.verifyLoggedInAs(user.name);
    
    await logoutUser(page);

    await loginUser(page, user);
    
    await deleteUser(page);

});
