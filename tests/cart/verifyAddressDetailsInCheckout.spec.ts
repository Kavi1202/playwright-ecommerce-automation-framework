import { test } from '@playwright/test';
import { UserFactory } from '../../test-data/factories/userFactory';
import { HomePage } from '../../pages/HomePage';
import { SignupPage } from '../../pages/SignupPage';
import { AccountInformationPage } from '../../pages/AccountInformationPage';
import { AccountCreatedPage } from '../../pages/AccountCreatedPage';
import { LoginPage } from '../../pages/LoginPage';
import { ProductCard } from '../../pages/components/ProductCard';
import { ProductDetailsPage } from '../../pages/ProductDetailsPage';
import { CartPage } from '../../pages/CartPage';
import { CheckoutPage } from '../../pages/CheckoutPage';
import { DeleteAccountPage } from '../../pages/DeleteAccountPage';

test('TC23 Verify Address Details in Checkout', async ({page})=>{
    const user = UserFactory.createUser();
    const homePage = new HomePage(page);
    const signupPage = new SignupPage(page);
    const accountInformationPage = new AccountInformationPage(page);
    const accountCreatedPage = new AccountCreatedPage(page);
    const loginPage = new LoginPage(page);
    const cartpage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);
    const deleteAccountPage = new DeleteAccountPage(page);

    await homePage.open();
    await homePage.clickSignupLogin();
    await signupPage.startRegistration(user.name, user.email);
    await accountInformationPage.fillAccountInformation(user);
    await accountCreatedPage.clickContinue();
    await loginPage.verifyLoggedInAs(user.name);

    await homePage.addFirstProduct();
    await homePage.continueShopping();
    await cartpage.openCart();
    await checkoutPage.proceedToCheckout();

    await checkoutPage.verifyDeliveryAddress(user);
    await checkoutPage.verifyBillingAddress(user);

    await deleteAccountPage.clickDeleteAccount();
    await deleteAccountPage.verifyAccountDeleted();
        
});