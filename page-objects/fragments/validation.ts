import { Locator } from '@playwright/test';

export class ValidationFragment {
  readonly errorMessage = this.root.locator('[data-test="error"]');
  readonly inputErrors = this.root.locator('.input_error.error');
  readonly errorButton = this.root.locator('[data-test="error-button"]');
  readonly errorMessageContainer = this.root.locator(
    '.error-message-container'
  );
  readonly wrongCredentialsMessage =
    'Epic sadface: Username and password do not match any user in this service';
  readonly passwordRequiredError = 'Epic sadface: Password is required';
  readonly usernameRequiredError = 'Epic sadface: Username is required';
  readonly lockedError = 'Epic sadface: Sorry, this user has been locked out.';
  readonly restrictedError = (path: string) => {
    return `Epic sadface: You can only access '${path}' when you are logged in.`;
  };

  constructor(private root: Locator) {}

  async allInputErrors(): Promise<Array<string>> {
    const rawErrors = await this.errorMessage.allTextContents();
    const errors = rawErrors.map((text) => {
      return text.trim();
    });
    return errors;
  }
}
