import { Page } from '@playwright/test';
import { ValidationFragment } from './fragments';
import BasePage from './base.po';

export class LoginPage extends BasePage {
  readonly loginForm = this.page.locator('login-box');
  readonly loginContainer = this.page.locator('[data-test="login-container"]');
  readonly loginLogo = this.page.locator('.login_logo');
  readonly usernameInput = this.page.locator('[data-test="username"]');
  readonly passwordInput = this.page.locator('[data-test="password"]');
  readonly loginButton = this.page.locator('[data-test="login-button"]');
  readonly validationFragment = new ValidationFragment(this.loginContainer);

  constructor(page: Page) {
    super(page);
  }

  async login(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
}
