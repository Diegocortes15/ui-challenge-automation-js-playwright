import {test, Locator, Page} from "@playwright/test";

export class LoginPage {
  private readonly _page: Page;
  private readonly _usernameInput: Locator;
  private readonly _passwordInput: Locator;
  private readonly _loginButton: Locator;

  constructor(page: Page) {
    this._page = page;
    this._usernameInput = page.locator("#username");
    this._passwordInput = page.locator("#password");
    this._loginButton = page.locator("#login_button");
  }

  public async loginUser(username: string, password: string): Promise<void> {
    await test.step("⏩ Login user with username and password", async (): Promise<void> => {
      await this._usernameInput.fill(username);
      await this._passwordInput.fill(password);
      await this._loginButton.click();
    });
  }
}
