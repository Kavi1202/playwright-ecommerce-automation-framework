import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class OrderPlacedPage extends BasePage{

    readonly orderPlacedHeading: Locator;
    readonly downloadInvoiceButton: Locator;
    readonly continueButton:Locator;

    constructor(page:Page){
        super(page);

        this.orderPlacedHeading = page.getByText('Order Placed!');
        this.downloadInvoiceButton = page.getByRole('link',{name:/download invoice/i});
        this.continueButton = page.getByRole('link',{name:/^continue$/i});
    }

    async verifyOrderPlaced(){
        await expect(this.orderPlacedHeading).toBeVisible();
    }

    async downloadInvoice(){
        await this.downloadInvoiceButton.click();
    }

    async clickContinue(){
        await this.continueButton.click();
    }

}