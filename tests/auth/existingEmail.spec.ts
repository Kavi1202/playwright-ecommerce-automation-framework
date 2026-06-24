import { test} from "@playwright/test";
import { LoginPage } from "../../pages/LoginPage";
import { SignupPage } from "../../pages/SignupPage";
import { UserFactory } from "../../test-data/factories/userFactory";
import { loginAndDeleteUser, logoutUser, registerUser } from "../../utils/authHelper";

test('TC05 Register User with existing email', async ({page})=>{
    const signupPage = new SignupPage(page);
    const user = UserFactory.createUser();

    await registerUser(page,user);
    await logoutUser(page);

    await signupPage.startRegistration(user.name, user.email);
    await signupPage.verifyEmailAlreadyExistsError();
    
    await loginAndDeleteUser(page, user);


})