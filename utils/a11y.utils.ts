import AxeBuilder from '@axe-core/playwright';
import { expect, Page } from '@playwright/test';

export class AccessibilityUtils {
  async check(page: Page) {
    // Wait for any loading/animations that may cause false positives
    await page.waitForLoadState('domcontentloaded');
    const axeBuilder = new AxeBuilder({ page }).withTags([
      'wcag21a',
      'wcag21aa',
      'wcag2aa',
      'wcag2a',
    ]);
    const result = await axeBuilder.analyze();
    expect(result.violations).toEqual([]);
  }
}
