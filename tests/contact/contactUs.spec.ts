import { test, expect } from '@playwright/test';
import path from 'path';
import { ContactUsPage } from '../../pages/ContactUsPage';

test('TC06 Contact Us Form', async ({ page }) => {
  const contactUsPage = new ContactUsPage(page);

  const filePath = path.resolve('test-data/files/contact-message.txt'); 
  // or path.resolve('test-data/files/contact-message.txt') if that file exists

  await contactUsPage.open();
  await contactUsPage.openContactUs();

  await contactUsPage.fillContactForm(
    'Kaviraj',
    'kaviraj@example.com',
    'Automation Exercise',
    'I want to learn automation'
  );

  await contactUsPage.uploadFile(filePath);
  await contactUsPage.submitForm();
  await contactUsPage.verifySuccessMessage();
  await contactUsPage.clickHomeButton();

  await expect(page).toHaveURL(/https:\/\/automationexercise\.com\/?/);
});