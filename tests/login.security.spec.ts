import { test, expect } from '../fixtures';
import users from '../data/users.json';

test.describe('Security tests for saucedemo.com @regression @security', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('');
  });

  // A check to test whether the application protects against account enumeration attacks
  test('Login attempts with a valid username and invalid password does not reveal account existance', async ({
    loginPage,
  }) => {
    await loginPage.login('user', 'user');
    expect(await loginPage.validationFragment.allInputErrors()).toContain(
      loginPage.validationFragment.wrongCredentialsMessage
    );
  });

  test('Username and Password inputs are not vulnerable to SQL injection', async ({
    loginPage,
    page,
  }) => {
    const payloads = [
      "' OR '1'='1' AND '1'='1",
      "' OR '1'='1' OR '1'='1",
      "' OR '1'='1' /*",
    ];

    for await (const payload of payloads) {
      await loginPage.login(payload, users.standard.password);
      expect(await loginPage.validationFragment.allInputErrors()).toContain(
        loginPage.validationFragment.wrongCredentialsMessage
      );
      await page.reload();
    }
  });
});
