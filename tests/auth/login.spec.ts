import { test } from "allure-playwright";
import { UserFactory } from "../../test-data/factories/userFactory";
import { LoginPage } from "../../pages/LoginPage";
import { deleteUser, loginAndDeleteUser, logoutUser, registerUser } from "../../utils/authHelper";

test('TC02 Login User with correct correct email and passowrd', async ({ page }) => {
    
    const loginPage = new LoginPage(page);
    const user = UserFactory.createUser();

    await registerUser(page, user);
    
    await loginPage.verifyLoggedInAs(user.name);
    
    await logoutUser(page);
    
    await loginPage.login(user.email, user.password);
    await loginPage.verifyLoggedInAs(user.name);
    
    await deleteUser(page);

});