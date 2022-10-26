import {test, expect, Locator, Page} from "@playwright/test";

export class ActorPage {
  private readonly _page: Page;
  private readonly _actingTimelineList: Locator;
  private readonly _actingTimeline: Locator;

  constructor(page: Page) {
    this._page = page;
    this._actingTimelineList = page.locator(".zero + .credits");
    this._actingTimeline = page.locator(".zero + .credits bdi");
  }

  public async isMovieInActingTimeline(movie: string): Promise<boolean> {
    return await test.step("⏩ Verify if movie is in acting timeline", async (): Promise<boolean> => {
      await this._actingTimelineList.waitFor({
        state: "visible",
      });

      const isMovie: boolean = (
        await this._actingTimelineList.allInnerTexts()
      ).some((listMovie) => listMovie.includes(movie));
      return isMovie;
    });
  }

  public async expectMovieToBeInActingTimeline(movie: string) {
    await test.step(`🧪 Expect that movie "${movie}" to be in acting timeline`, async (): Promise<void> => {
      expect(await this.isMovieInActingTimeline(movie)).toBeTruthy();
    });
  }
}
