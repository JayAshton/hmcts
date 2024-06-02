import { test, expect } from '../fixtures';

test.describe('Accessibility tests for saucedemo.com @regression @a11y', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('');
  });

  test('Login page is accessible', async ({ a11yHelper, page }) => {
    await a11yHelper.check(page);
  });

  // Fails according to https://dequeuniversity.com/rules/axe/4.9/button-name
  test('Login page with validation errors is accessible', async ({
    a11yHelper,
    loginPage,
    page,
  }) => {
    await loginPage.loginButton.click();
    await a11yHelper.check(page);
  });
});
