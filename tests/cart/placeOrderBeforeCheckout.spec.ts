import { test } from "@playwright/test";
import { AccountCreatedPage } from "../../pages/AccountCreatedPage";
import { AccountInformationPage } from "../../pages/AccountInformationPage";
import { CartPage } from "../../pages/CartPage";
import { CheckoutPage } from "../../pages/CheckoutPage";
import { ProductCard } from "../../pages/components/ProductCard";
import { HomePage } from "../../pages/HomePage";
import { LoginPage } from "../../pages/LoginPage";
import { SignupPage } from "../../pages/SignupPage";
import { UserFactory } from "../../test-data/factories/userFactory";
import { PaymentPage } from "../../pages/PaymentPage";

test ('TC15 Place Order: Register before Checkout', async({page})=>{
    const homePage = new HomePage(page);
        const product = new ProductCard(page,0);
        const cartPage = new CartPage(page);
        const checkoutPage = new CheckoutPage(page);
        const signupPage = new SignupPage(page);
        const accountInforamtionPage = new AccountInformationPage(page);
        const accountCreatedPage = new AccountCreatedPage(page);
        const loginPage = new LoginPage(page);
        const paymentPage = new PaymentPage(page);
        const user = {...UserFactory.createUser(),email:`kaviraj${Date.now()}@example.com`};
        
        await homePage.open();
        await homePage.clickSignupLogin();
        await signupPage.startRegistration(user.name, user.email);
        await accountInforamtionPage.fillAccountInformation(user);
        await accountCreatedPage.verifyAccountCreated();
        await accountCreatedPage.clickContinue();
        await loginPage.verifyLoggedInAs(user.name);
        await product.addToCart();
        await homePage.continueShopping();
        await cartPage.openCart();
        await checkoutPage.proceedToCheckout();
        await checkoutPage.verifyCheckoutPage();
        await checkoutPage.enterComment('Please deliver safely.');
        await checkoutPage.placeOrder();
        await paymentPage.fillPaymentDetails(
        'Kaviraj',
        '4111111111111111',
        '123',
        '12',
        '2030'
    );
        await paymentPage.confirmOrder();
        await paymentPage.verifyOrderPlaced();

});