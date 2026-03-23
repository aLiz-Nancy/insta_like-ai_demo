import { expect, test } from "@playwright/test";
import { HomePage } from "@/pages";

test.describe("Home page", () => {
  let homePage: HomePage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.goto("/");
  });

  test("displays the greeting heading", async () => {
    await expect(homePage.heading).toHaveText("Hello, Portal!");
  });

  test("displays the sandbox card", async () => {
    await expect(homePage.sandboxCardTitle).toHaveText("Sandbox");
    await expect(homePage.sandboxCardDescription).toHaveText(
      "This page renders the shared sandbox slice for verification.",
    );
  });

  test("has the correct page title", async ({ page }) => {
    await expect(page).toHaveTitle("My Portal");
  });
});
