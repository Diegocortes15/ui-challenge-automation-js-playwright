import {test, expect, Locator, Page} from "@playwright/test";

export class MoviePage {
  private readonly _page: Page;
  private readonly _genres: Locator;
  private readonly _movieTitle: Locator;
  private readonly _firstActorTopBilledCast: Locator;

  constructor(page: Page) {
    this._page = page;
    this._genres = page.locator(".genres");
    this._movieTitle = page.locator(".header .title h2 a");
    this._firstActorTopBilledCast = page.locator(
      ".people.scroller li:nth-child(1)"
    );
  }

  public async getTextGenres(): Promise<string> {
    return await test.step("⏩ Get genres from the movie", async (): Promise<string> => {
      return await this._genres.innerText();
    });
  }

  public async getTextMovieTitle(): Promise<string> {
    return await test.step("⏩ Get movie title", async (): Promise<string> => {
      return await this._movieTitle.innerText();
    });
  }

  public async clickFirstActorTopBilledCast(): Promise<void> {
    return await test.step("⏩ Click on the first actor from the billed cast", async (): Promise<void> => {
      return await this._firstActorTopBilledCast.click();
    });
  }

  public async expectMovieContainGenre(genre: string): Promise<void> {
    return await test.step(`🧪 Expect movie genre will be ${genre}`, async (): Promise<void> => {
      expect((await this.getTextGenres()).toLowerCase()).toContain(
        genre.toLowerCase()
      );
    });
  }
}
