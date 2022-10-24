import {user} from "../data/users.data";
import {MAX_MOVIES_PER_PAGE} from "../utils/constants.util";
import {test, expect} from "@playwright/test";
import {
  HomePage,
  LoginPage,
  ProfilePage,
  MovieListPage,
  MoviePage,
} from "../pages/index";

test.describe.parallel("Movie filter tests", () => {
  let homePage: HomePage;
  let loginPage: LoginPage;
  let profilePage: ProfilePage;

  test.beforeEach(async ({page}) => {
    homePage = new HomePage(page);
    loginPage = new LoginPage(page);
    profilePage = new ProfilePage(page);

    await homePage.getNavigationBar.clickLoginButton();
    await loginPage.loginUser(user.username, user.password);
    await profilePage.expectUserIsOnPage(page);
  });

  test("Test Description: Verify movie genre filter", async ({page}) => {
    const movieListPage: MovieListPage = new MovieListPage(page);
    const moviePage: MoviePage = new MoviePage(page);

    await profilePage.navigationBar.goTopRatedMovies();
    await movieListPage.expectTitlePageMatchWith("Top Rated Movies");

    await movieListPage.filterMovieByAction();
    await movieListPage.clickRandomMovieCard(MAX_MOVIES_PER_PAGE);
    await moviePage.expectMovieContainGenre("Action");
  });
});
