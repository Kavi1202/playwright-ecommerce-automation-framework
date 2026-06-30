import { test, expect } from '@playwright/test';
import { UserFactory } from '../../test-data/factories/userFactory';
import { SignupPage } from '../../pages/SignupPage';
import { AccountInformationPage } from '../../pages/AccountInformationPage';
import { AccountCreatedPage } from '../../pages/AccountCreatedPage';
import { LoginPage } from '../../pages/LoginPage';
import { CartPage } from '../../pages/CartPage';
import { CheckoutPage } from '../../pages/CheckoutPage';
import { PaymentPage } from '../../pages/PaymentPage';
import { OrderPlacedPage } from '../../pages/OrderPlacedPage';
import { DeleteAccountPage } from '../../pages/DeleteAccountPage';
import { HomePage } from '../../pages/HomePage';
import path from 'path';
import fs from 'fs';

test('T24 Download Invoice after Purchase Order',async ({page})=>{
    const user = UserFactory.createUser();
    const homePage = new HomePage(page);
    const signupPage = new SignupPage(page);
    const accountInformationPage = new AccountInformationPage(page);
    const accountCreatedPage = new AccountCreatedPage(page);
    const loginpage = new LoginPage(page);
    const cartPage = new CartPage(page);
    const checkOutpage = new CheckoutPage(page);
    const paymentpage = new PaymentPage(page);
    const orderPlacedPage = new OrderPlacedPage(page);
    const deleteAccountPage = new DeleteAccountPage(page);

    await homePage.open();
    await homePage.clickSignupLogin();
    await signupPage.startRegistration(user.name, user.email);
    await accountInformationPage.fillAccountInformation(user);
    await accountCreatedPage.verifyAccountCreated();
    await accountCreatedPage.clickContinue();
    await loginpage.verifyLoggedInAs(user.name);

    await homePage.addFirstProduct();
    await homePage.continueShopping();
    await cartPage.openCart();

    await checkOutpage.proceedToCheckout();
    await checkOutpage.verifyCheckoutPage();
    await checkOutpage.enterComment('Automation invoice doenload verification.');
    await checkOutpage.placeOrder();

    await paymentpage.fillPaymentDetails(
        user.name,
        '4111111111111111',
        '123',
        '12',
        '2030'
    );

    await paymentpage.confirmOrder();

    await orderPlacedPage.verifyOrderPlaced();

    const downloadPromise = page.waitForEvent('download');
    await orderPlacedPage.downloadInvoice();
    const download = await downloadPromise;
    const downloadPath = path.join('downloads',download.suggestedFilename());
    await download.saveAs(downloadPath);
    expect(fs.existsSync(downloadPath)).toBeTruthy();
    
    await orderPlacedPage.clickContinue();
    
    await deleteAccountPage.clickDeleteAccount();
    await deleteAccountPage.verifyAccountDeleted();


});