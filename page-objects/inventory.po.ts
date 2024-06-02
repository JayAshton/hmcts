import { Page } from '@playwright/test';
import BasePage from './base.po';

export class InventoryPage extends BasePage {
  readonly inventoryContainer = this.page.locator(
    '[data-test="inventory-container"]'
  );

  constructor(page: Page) {
    super(page);
  }
}
