import { test, expect } from '../fixtures';
import users from '../data/users.json';

test.describe('Login tests for saucedemo.com @regression', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('');
  });

  test('Wrong credentials error is shown when using an invalid username and valid password', async ({
    loginPage,
  }) => {
    await loginPage.usernameInput.fill('invalid-username');
    await loginPage.passwordInput.fill(users.standard.password);
    await loginPage.loginButton.click();
    expect(await loginPage.validationFragment.allInputErrors()).toContain(
      loginPage.validationFragment.wrongCredentialsMessage
    );
  });

  test('Wrong credentials error is shown when using a valid username and invalid password', async ({
    loginPage,
  }) => {
    await loginPage.usernameInput.fill(users.standard.username);
    await loginPage.passwordInput.fill('invalid-password');
    await loginPage.loginButton.click();
    expect(await loginPage.validationFragment.allInputErrors()).toContain(
      loginPage.validationFragment.wrongCredentialsMessage
    );
  });

  test('Wrong credentials error is shown when using an invalid username and password', async ({
    loginPage,
  }) => {
    await loginPage.usernameInput.fill(users.standard.username);
    await loginPage.passwordInput.fill('invalid-password');
    await loginPage.loginButton.click();
    expect(await loginPage.validationFragment.allInputErrors()).toContain(
      loginPage.validationFragment.wrongCredentialsMessage
    );
  });

  test('When a user does not use any input an error is shown', async ({
    loginPage,
  }) => {
    await loginPage.loginButton.click();
    expect(await loginPage.validationFragment.allInputErrors()).toContain(
      loginPage.validationFragment.usernameRequiredError
    );
    expect(await loginPage.validationFragment.inputErrors.count()).toBe(2);
  });

  test('When a user does not input a username an error is shown', async ({
    loginPage,
  }) => {
    await loginPage.passwordInput.fill(users.standard.password);
    await loginPage.loginButton.click();
    expect(await loginPage.validationFragment.allInputErrors()).toContain(
      loginPage.validationFragment.usernameRequiredError
    );
    expect(await loginPage.validationFragment.inputErrors.count()).toBe(2);
  });

  test('When a user does not input a password an error is shown', async ({
    loginPage,
  }) => {
    await loginPage.usernameInput.fill(users.standard.username);
    await loginPage.loginButton.click();
    expect(await loginPage.validationFragment.allInputErrors()).toContain(
      loginPage.validationFragment.passwordRequiredError
    );
    expect(await loginPage.validationFragment.inputErrors.count()).toBe(2);
  });

  test('A user can dismiss errors', async ({ loginPage }) => {
    await loginPage.loginButton.click();
    expect(await loginPage.validationFragment.allInputErrors()).toContain(
      loginPage.validationFragment.usernameRequiredError
    );
    expect(await loginPage.validationFragment.inputErrors.count()).toBe(2);

    await loginPage.validationFragment.errorButton.click();
    await expect(loginPage.validationFragment.errorMessage).not.toBeVisible();
    expect(await loginPage.validationFragment.inputErrors.count()).toBe(0);
  });
});
