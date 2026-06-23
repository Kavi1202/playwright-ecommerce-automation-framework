import { BasePage } from "./BasePage";

export class AccountInformationPage extends BasePage {
    private mrRadio = this.locator('#id_gender1');
    private passwordInput = this.locator('#password');
    private daysDropdown = this.locator('#days');
    private monthsDropdown = this.locator('#months');
    private yearsDropdown = this.locator('#years')
    private firstNameInput = this.locator('#first_name');
    private lastNameInput = this.locator('#last_name');
    private addressInput = this.locator('#address1');
    private countryDropdown = this.locator('#country')
    private stateInput = this.locator('#state');
    private cityInput = this.locator('#city');
    private zipCodeInput = this.locator('#zipcode');
    private mobileNumberInput = this.locator('#mobile_number');
    private createAccountButton = this.locator('[data-qa="create-account"]');
    

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
