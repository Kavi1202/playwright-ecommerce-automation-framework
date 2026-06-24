import { User } from "../test-data/interfaces/user";
import { BasePage } from "./BasePage";

export class AccountInformationPage extends BasePage {
    private mrRadio = this.page.locator('#id_gender1');
    private passwordInput = this.page.locator('#password');
    private daysDropdown = this.page.locator('#days');
    private monthsDropdown = this.page.locator('#months');
    private yearsDropdown = this.page.locator('#years')
    private firstNameInput = this.page.locator('#first_name');
    private lastNameInput = this.page.locator('#last_name');
    private addressInput = this.page.locator('#address1');
    private countryDropdown = this.page.locator('#country')
    private stateInput = this.page.locator('#state');
    private cityInput = this.page.locator('#city');
    private zipCodeInput = this.page.locator('#zipcode');
    private mobileNumberInput = this.page.locator('#mobile_number');
    private createAccountButton = this.page.locator('[data-qa="create-account"]');
    

    async fillAccountInformation(user: User) {
        await this.mrRadio.check();
        await this.passwordInput.fill(user.password);
        await this.daysDropdown.selectOption({ value: '1' });
        await this.monthsDropdown.selectOption({ value: '1' });
        await this.yearsDropdown.selectOption({ value: '2000' });
        await this.firstNameInput.fill(user.firstName);
        await this.lastNameInput.fill(user.lastName);
        await this.addressInput.fill(user.address);
        await this.countryDropdown.selectOption({ label: user.country });
        await this.stateInput.fill(user.state);
        await this.cityInput.fill(user.city);
        await this.zipCodeInput.fill(user.zipCode);
        await this.mobileNumberInput.fill(user.mobileNumber);

        await this.createAccountButton.click();
    }

}
