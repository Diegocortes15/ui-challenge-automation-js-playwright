import {user} from "../data/users.data";
import {expect, test} from "@playwright/test";
import {
  HomePage,
  LoginPage,
  ProfilePage,
  SearchResultPage,
} from "../pages/index";

test.describe.parallel("Search successful", () => {
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

  test("Test Description: Verify successful search", async ({page}) => {
    const searchResultPage: SearchResultPage = new SearchResultPage(page);
    await profilePage.navigationBar.searchMovie("Fight Club");
    await searchResultPage.expectFirstTitleResultMatch("Fight Club");
  });
});
