import { test } from '@playwright/test';
import { HomePage } from '../../pages/HomePage';
import { ProductCard } from '../../pages/components/ProductCard';
import { CartPage } from '../../pages/CartPage';
import { CheckoutPage } from '../../pages/CheckoutPage';
import { LoginPage } from '../../pages/LoginPage';
import { PaymentPage } from '../../pages/PaymentPage';
import { registeredUser } from '../../test-data/userData';

test('TC16 Place Order: Login before Checkout', async ({page})=>{
    const homePage = new HomePage(page);
            const product = new ProductCard(page,0);
            const cartPage = new CartPage(page);
            const checkoutPage = new CheckoutPage(page);
            const loginPage = new LoginPage(page);
            const paymentPage = new PaymentPage(page);

            await homePage.open();
            await homePage.clickSignupLogin();
            await loginPage.login(
                registeredUser.email,
                registeredUser.password
            );

            await loginPage.verifyLoggedInAs(registeredUser.name);
            await product.addToCart();
            await homePage.continueShopping();
            await cartPage.openCart();
            await checkoutPage.proceedToCheckout();
            await checkoutPage.enterComment('Automation Test Order');
            await checkoutPage.placeOrder();
            await paymentPage.fillPaymentDetails(
                registeredUser.name,
                '4111111111111111',
                '123',
                '12',
                '2030'
            );

            await paymentPage.confirmOrder();
            await paymentPage.verifyOrderPlaced();
});