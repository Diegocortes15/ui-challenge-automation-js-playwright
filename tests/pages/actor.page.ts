import {test, expect, Locator, Page} from "@playwright/test";

export class ActorPage {
  private readonly _page: Page;
  private readonly _moviesList: Locator;

  constructor(page: Page) {
    this._page = page;
    this._moviesList = page.locator(".zero + .credits bdi");
  }

  public async isMovieInActingTimeline(movie: string): Promise<boolean> {
    return await test.step("⏩ Verify if movie is in acting timeline", async (): Promise<boolean> => {
      const movies: string = (await this._moviesList.allInnerTexts()).reduce(
        (previousValue, currentValue) =>
          previousValue.concat("; ", currentValue),
        ""
      );
      return movies.includes(movie);
    });
  }

  public async expectMovieToBeInActingTimeline(movie: string) {
    await test.step(`🧪 Expect that movie "${movie}" to be in acting timeline`, async (): Promise<void> => {
      expect(await this.isMovieInActingTimeline(movie)).toBeTruthy();
    });
  }
}
