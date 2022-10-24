import {user} from "../data/users.data";
import {MAX_MOVIES_PER_PAGE} from "../utils/constants.util";
import {test, expect} from "@playwright/test";
import {
  HomePage,
  LoginPage,
  ProfilePage,
  MovieListPage,
  MoviePage,
  ActorPage,
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

  test("Test Description: Verify acting timeline", async ({page}) => {
    const movieListPage: MovieListPage = new MovieListPage(page);
    const moviePage: MoviePage = new MoviePage(page);
    const actorPage: ActorPage = new ActorPage(page);

    await profilePage.navigationBar.goTopRatedMovies();
    await movieListPage.expectTitlePageMatchWith("Top Rated Movies");

    await movieListPage.clickRandomMovieCard(MAX_MOVIES_PER_PAGE);
    const movieTitle: string = await moviePage.getTextMovieTitle();
    await moviePage.clickFirstActorTopBilledCast();
    await actorPage.expectMovieToBeInActingTimeline(movieTitle);
  });
});
