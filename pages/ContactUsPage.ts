import { expect, Page } from '@playwright/test';
import { BasePage } from './BasePage';
import path from 'path';

export class ContactUsPage extends BasePage {
  readonly contactUsLink;
  readonly getInTouchHeading;
  readonly nameInput;
  readonly emailInput;
  readonly subjectInput;
  readonly messageInput;
  readonly fileInput;
  readonly submitButton;
  readonly successMessage;
  readonly homeButton;

  constructor(page: Page) {
    super(page);

    this.contactUsLink = page.getByRole('link', { name: /contact us/i });
    this.getInTouchHeading = page.getByRole('heading', { name: /get in touch/i });

    this.nameInput = page.locator('[data-qa="name"]');
    this.emailInput = page.locator('[data-qa="email"]');
    this.subjectInput = page.locator('[data-qa="subject"]');
    this.messageInput = page.locator('[data-qa="message"]');

    this.fileInput = page.locator('input[name="upload_file"]');
    this.submitButton = page.locator('[data-qa="submit-button"]');

    // target only the actual success banner shown after submit
    this.successMessage = page.locator('#contact-page .status.alert.alert-success');

    // home button shown after successful submission
    this.homeButton = page.locator('#form-section .btn.btn-success');
  }

  async open() {
    await this.navigate('https://automationexercise.com/');
  }

  async openContactUs() {
    await this.contactUsLink.click();
    await expect(this.getInTouchHeading).toBeVisible();
  }

  async fillContactForm(name: string, email: string, subject: string, message: string) {
    await this.nameInput.fill(name);
    await this.emailInput.fill(email);
    await this.subjectInput.fill(subject);
    await this.messageInput.fill(message);
  }

  async uploadFile(filePath: string) {
    await this.fileInput.setInputFiles(filePath);
    await expect
      .poll(async () => {
        return this.fileInput.evaluate((input: HTMLInputElement) => input.files?.[0]?.name ?? '');
      })
      .toBe(path.basename(filePath));
  
    await this.page.waitForTimeout(1500);
    }
    // const uploadedFileName = await this.fileInput.evaluate((input: HTMLInputElement) => {
    //   return input.files?.[0]?.name ?? '';
    // });

    // expect(uploadedFileName).toBe(path.basename(filePath));


  async submitForm() {
  this.page.once('dialog', async dialog => {
    await expect(dialog.message()).toBe('Press OK to proceed!');
    await dialog.accept();
  });

  await this.submitButton.click();
}


 async verifySuccessMessage() {
  // wait until the success banner is visible and has the expected text
  await expect(this.successMessage).toBeVisible({ timeout: 10000 });
  await expect(this.successMessage).toContainText(
    'Success! Your details have been submitted successfully.'
  );
}

  async clickHomeButton() {
    await expect(this.homeButton).toBeVisible({ timeout: 15000 });
    await this.homeButton.click();
  }
}