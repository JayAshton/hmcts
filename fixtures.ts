import { test as base } from '@playwright/test';
import { LoginPage, InventoryPage } from './page-objects';
import { AccessibilityUtils } from './utils/a11y.utils';

type CustomFixtures = {
  loginPage: LoginPage;
  inventoryPage: InventoryPage;
  a11yHelper: AccessibilityUtils;
};

export const test = base.extend<CustomFixtures>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  inventoryPage: async ({ page }, use) => {
    await use(new InventoryPage(page));
  },
  a11yHelper: async ({}, use) => {
    await use(new AccessibilityUtils());
  },
});

export { expect } from '@playwright/test';
