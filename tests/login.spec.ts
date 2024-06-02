import { test, expect } from '../fixtures';
import users from '../data/users.json';

test.describe('Login tests for saucedemo.com @regression', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('');
  });

  test('A user can log in to the application', async ({
    loginPage,
    inventoryPage,
  }) => {
    await loginPage.login(users.standard.username, users.standard.password);
    await expect(inventoryPage.inventoryContainer).toBeVisible();
  });

  test('A locked user cannot log in to the application', async ({
    loginPage,
  }) => {
    await loginPage.login(users.locked.username, users.locked.password);
    const errors = await loginPage.validationFragment.allInputErrors();
    expect(errors).toContain(loginPage.validationFragment.lockedError);
  });

  test('A user who has not logged in, cannot access another area of the site', async ({
    loginPage,
    page,
  }) => {
    const path = '/inventory.html';
    await page.goto(path);
    const errors = await loginPage.validationFragment.allInputErrors();
    expect(errors).toContain(
      loginPage.validationFragment.restrictedError(path)
    );
  });
});
