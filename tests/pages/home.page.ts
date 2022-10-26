import {test, Page} from "@playwright/test";
import {NavigationBar} from "./components/navigation.comp";

export class HomePage {
  private readonly _page: Page;
  private readonly _navigationBar: NavigationBar;

  constructor(page: Page) {
    this._page = page;
    this._navigationBar = new NavigationBar(page);
    this.open();
  }

  public async open(): Promise<void> {
    await test.step("⏩ Go to home page", async (): Promise<void> => {
      await this._page.goto("/");
    });
  }

  public get getNavigationBar(): NavigationBar {
    return this._navigationBar;
  }
}
