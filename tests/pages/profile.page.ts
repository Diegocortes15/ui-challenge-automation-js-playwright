import {test, expect, Page} from "@playwright/test";
import {NavigationBar} from "./components/navigation.comp";

export class ProfilePage {
  private readonly _page: Page;
  private readonly _navigationBar: NavigationBar;

  constructor(page: Page) {
    this._page = page;
    this._navigationBar = new NavigationBar(page);
  }

  public get navigationBar(): NavigationBar {
    return this._navigationBar;
  }

  public async expectUserIsOnPage(page: Page): Promise<void> {
    await test.step('🧪 Expect that user is on profile "My Profile" page', async (): Promise<void> => {
      await expect(page).toHaveTitle("My Profile — The Movie Database (TMDB)");
    });
  }
}
