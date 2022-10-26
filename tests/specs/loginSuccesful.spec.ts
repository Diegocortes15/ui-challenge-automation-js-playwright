import {user} from "../data/users.data";
import {expect, test} from "@playwright/test";
import {HomePage, LoginPage, ProfilePage} from "../pages/index";

test.describe.parallel("💼 Login", () => {
  test("Test Description: The user should be able to login", async ({page}) => {
    const homePage: HomePage = new HomePage(page);
    const loginPage: LoginPage = new LoginPage(page);
    const profilePage: ProfilePage = new ProfilePage(page);

    await homePage.getNavigationBar.clickLoginButton();
    await loginPage.loginUser(user.username, user.password);
    await profilePage.expectUserIsOnPage(page);
  });
});
