import { Page, Locator } from "@playwright/test";

export class PaymentPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }
}
