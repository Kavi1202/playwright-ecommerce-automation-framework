import { test } from '@playwright/test';
import { ProductsPage } from '../../pages/ProductsPage';
import { ReviewSection } from '../../pages/components/ReviewSection';

test ('TC21 Add review on Product',async ({page})=>{
    const productspage = new ProductsPage(page);
    const reviewSection = new ReviewSection(page);

    await productspage.openHomePage();
    await productspage.openProducts();
    await productspage.verifyAllProductsPageLoaded();
    await productspage.openFirstProductDetail();
    await productspage.verifyProductDetailPageLoaded();
    await reviewSection.verifyVisible();
    await reviewSection.submitReview(
        'Kaviraj',
        'Kaviraj@example.com',
        'Excellent product. Automamtion review submiited using Playwright.'
    );
    await reviewSection.verifySuccessMessage();
});

