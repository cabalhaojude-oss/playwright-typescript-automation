import type { Page } from "@playwright/test";

export class BasePage {
  constructor(protected page: Page) {}

  async waitForLoader() {
    await this.page.locator(".loading-page").waitFor({ state: "detached" });
  }
}
