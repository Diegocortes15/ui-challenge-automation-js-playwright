import {test, expect, Locator, Page} from "@playwright/test";

export class SearchResultPage {
  private readonly _page: Page;
  private readonly _firstResult: Locator;

  constructor(page: Page) {
    this._page = page;
    this._firstResult = page.locator(".movie .card:nth-child(1) .title h2");
  }

  public async firstTitleResult(): Promise<string> {
    return await test.step("⏩ Get title from the first result", async () => {
      return await this._firstResult.innerText();
    });
  }

  public async expectFirstTitleResultMatch(title: string): Promise<void> {
    return await test.step(`🧪 Expect that the first title result match with "${title}"`, async (): Promise<void> => {
      expect(await this.firstTitleResult()).toEqual("Fight Club");
    });
  }
}
