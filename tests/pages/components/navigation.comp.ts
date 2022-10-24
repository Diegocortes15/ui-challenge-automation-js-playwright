import {test, Locator, Page} from "@playwright/test";

export class NavigationBar {
  private readonly _page: Page;
  private readonly _loginButton: Locator;
  private readonly _searchButton: Locator;
  private readonly _searchBar: Locator;
  private readonly _moviesLink: Locator;
  private readonly _topRatedMoviesLink: Locator;

  constructor(page: Page) {
    this._page = page;
    this._loginButton = page.locator(".primary li:nth-child(3) a");
    this._searchButton = page.locator('.search[href="/search"]');
    this._searchBar = page.locator("#search_v4");
    this._moviesLink = page.locator(
      ".navigation > .k-menu-item:nth-child(1) > .k-menu-link"
    );
    this._topRatedMoviesLink = page.locator('a[href="/movie/top-rated"]');
  }

  public async clickLoginButton(): Promise<void> {
    await test.step("⏩ Click on login button", async (): Promise<void> => {
      await this._loginButton.click();
    });
  }

  public async searchMovie(movie: string): Promise<void> {
    await test.step(`⏩ Search ${movie} movie`, async (): Promise<void> => {
      await this._searchButton.click();
      await this._searchBar.fill(movie);
      await this._searchBar.press("Enter");
    });
  }

  public async goTopRatedMovies(): Promise<void> {
    await test.step("⏩ Click on top rated movies", async (): Promise<void> => {
      await this._moviesLink.click();
      await this._topRatedMoviesLink.click();
    });
  }
}
