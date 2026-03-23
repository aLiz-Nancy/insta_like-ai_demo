import type { Locator, Page } from "@playwright/test";
import { BasePage } from "./base.page";

export class HomePage extends BasePage {
  readonly heading: Locator;
  readonly sandboxCardTitle: Locator;
  readonly sandboxCardDescription: Locator;

  constructor(page: Page) {
    super(page);
    this.heading = this.page.getByRole("heading", { level: 1 });
    this.sandboxCardTitle = this.page.getByRole("heading", { level: 2 });
    this.sandboxCardDescription = this.sandboxCardTitle.locator(
      "xpath=following-sibling::p",
    );
  }
}
