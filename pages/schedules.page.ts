import { Page, Locator } from "@playwright/test";

export class SchedulesPage {
  readonly page: Page;
  readonly selectedButton: Locator;
  readonly continueButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.selectedButton = page.getByText("Selected");
    this.continueButton = page.getByRole("button", { name: "Continue" });
  }

  async continueWithPreSelected() {
    await this.continueButton.click();
  }
}
