import { Page, Locator } from "@playwright/test";

export class SearchPage {
  readonly page: Page;
  readonly oneWayRadioLabel: Locator;
  readonly roundTripRadioLabel: Locator;
  readonly originDropdown: Locator;
  readonly destinationDropdown: Locator;
  readonly departureDateInput: Locator;
  readonly returnDateInput: Locator;
  readonly searchTripButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.oneWayRadioLabel = page.getByText("One Way");
    this.roundTripRadioLabel = page.getByText("Round Trip");
    this.originDropdown = page.locator('[formcontrolname="origin"]');
    this.destinationDropdown = page.locator('[formcontrolname="destination"]');
    this.departureDateInput = page.locator('[formcontrolname="departureDate"]');
    this.returnDateInput = page.locator('[formcontrolname="returnDate"]');
    this.searchTripButton = page.getByText("Search Trips");
  }

  async searchSchedule({
    roundTrip,
    origin,
    destination,
    departureDate,
    returnDate,
  }: {
    roundTrip: boolean;
    origin: string;
    destination: string;
    departureDate: string;
    returnDate?: string;
  }) {
    if (roundTrip && returnDate) {
      await this.roundTripRadioLabel.click();
    } else {
      await this.oneWayRadioLabel.click();
    }

    await this.originDropdown.selectOption({ label: origin });
    await this.destinationDropdown.selectOption({ label: destination });
    await this.departureDateInput.fill(departureDate);
    if (returnDate) await this.departureDateInput.fill(departureDate);

    await this.searchTripButton.click();
  }
}
