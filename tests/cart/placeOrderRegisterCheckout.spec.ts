import { test } from '@playwright/test';
import { HomePage } from '../../pages/HomePage';
import { CartPage } from '../../pages/CartPage';
import { ProductCard } from '../../pages/components/ProductCard';
import { CheckoutPage } from '../../pages/CheckoutPage';
import { SignupPage } from '../../pages/SignupPage';
import { timeStamp } from 'node:console';
import { AccountInformationPage } from '../../pages/AccountInformationPage';
import { LoginPage } from '../../pages/LoginPage';
import { UserFactory } from '../../test-data/factories/userFactory';
import { AccountCreatedPage } from '../../pages/AccountCreatedPage';

test('TC14 Place Order: Register while checkout', async ({page}) => {
    const homePage = new HomePage(page);
    const product = new ProductCard(page,0);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);
    const signupPage = new SignupPage(page);
    const accountInforamtionPage = new AccountInformationPage(page);
    const accountCreatedPage = new AccountCreatedPage(page);
    const loginPage = new LoginPage(page);
    const user = {...UserFactory.createUser(),email:`kaviraj${Date.now()}@example.com`};
    
    await homePage.open();
    await product.addToCart();
    await homePage.continueShopping();
    await cartPage.openCart();
    await checkoutPage.proceedToCheckout();
    await checkoutPage.clickRegisterLogin();
    await signupPage.startRegistration(user.name, user.email);
    await accountInforamtionPage.fillAccountInformation(user);
    await accountCreatedPage.clickContinue();
    await loginPage.verifyLoggedInAs(user.name);
    await cartPage.openCart();
    await checkoutPage.proceedToCheckout();
    await checkoutPage.verifyCheckoutPage();
});