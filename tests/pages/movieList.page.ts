import {test, expect, Locator, Page} from "@playwright/test";

export class MovieListPage {
  private readonly _page: Page;
  private readonly _titlePage: Locator;
  private readonly _sortButton: Locator;
  private readonly _filtersButton: Locator;
  private readonly _sortResultByButton: Locator;
  private readonly _dateAscendingButton: Locator;
  private readonly _actionGenre: Locator;
  private readonly _searchSideBarButton: Locator;
  private readonly _searchFooterButton: Locator;
  private readonly _listMovieCards: Locator;
  private readonly _listMovieDates: Locator;

  constructor(page: Page) {
    this._page = page;
    this._titlePage = page.locator(".title h2");
    this._sortButton = page.locator(".filter_panel.card:nth-child(1)");
    this._filtersButton = page.locator(".filter_panel.card:nth-child(2)");
    this._sortResultByButton = page.locator(
      ".filter_panel.card:nth-child(1) h3 + .k-dropdown"
    );
    this._dateAscendingButton = page.locator(
      "#sort_by_listbox .k-item:nth-child(6)"
    );
    this._actionGenre = page.locator("#with_genres > li:nth-child(1)");
    this._searchSideBarButton = page.locator(".apply.small");
    this._searchFooterButton = page.locator(".apply.full");
    this._listMovieCards = page.locator(".card.style_1");
    this._listMovieDates = page.locator(
      ".card.style_1:nth-child(-n+4) .content p"
    );
  }

  public async getTextTitlePage(): Promise<string> {
    return await test.step("⏩ Get title page", async (): Promise<string> => {
      return await this._titlePage.innerText();
    });
  }

  public async filterMovieByAction(): Promise<void> {
    await test.step("⏩ Filter movies by action", async (): Promise<void> => {
      await this._filtersButton.click();
      await this._actionGenre.click();
      await this._searchFooterButton.click();
      await this._searchFooterButton.waitFor({state: "hidden"});
    });
  }

  public async clickRandomMovieCard(maxMoviesCard: number): Promise<void> {
    await test.step(`⏩ Click on random movie from ${maxMoviesCard} viewable movies`, async (): Promise<void> => {
      const movieId: number = Math.floor(Math.random() * maxMoviesCard);
      await this._listMovieCards.nth(movieId).click();
    });
  }

  public async expectTitlePageMatchWith(title: string): Promise<void> {
    await test.step(`🧪 Expect that the title page match with "${title}"`, async (): Promise<void> => {
      expect(await this.getTextTitlePage()).toEqual(title);
    });
  }
}
