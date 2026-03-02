import { Page, Locator } from "@playwright/test";

export class HomePage {
  readonly page: Page;
  readonly bookNowButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.bookNowButton = page.getByRole("link", {
      name: "BOOK NOW",
      exact: true,
    });
  }

  async bookNow() {
    await this.bookNowButton.click();
  }
}
