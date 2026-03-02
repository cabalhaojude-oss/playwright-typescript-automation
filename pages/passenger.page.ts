import { Page, Locator } from "@playwright/test";

export class PassengerPage {
  readonly page: Page;
  readonly contactPersonInput: Locator;
  readonly mobileNumberInput: Locator;
  readonly emailAddressInput: Locator;
  readonly confirmEmailAddressInput: Locator;
  readonly addressInput: Locator;
  readonly flagDropdown: Locator;
  readonly flagDropdownOption: Locator;
  readonly firstNameInput: Locator;
  readonly middleNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly genderInput: Locator;
  readonly birthDateInput: Locator;
  readonly typeInput: Locator;
  readonly nationalityInput: Locator;
  readonly discountInput: Locator;

  readonly continueButton: Locator;

  constructor(page: Page) {
    this.page = page;

    // Contact Information
    this.contactPersonInput = page.locator("[formcontrolname='name']");
    this.mobileNumberInput = page.getByRole("textbox", {
      name: "Enter phone number",
    });
    this.emailAddressInput = page.locator("[formcontrolname='email']");
    this.confirmEmailAddressInput = page.locator(
      "[formcontrolname='confirmEmail']",
    );
    this.addressInput = page.locator("[formcontrolname='address']");
    this.flagDropdown = page
      .locator("international-phone-number")
      .getByRole("button");
    this.flagDropdownOption = page
      .locator("international-phone-number")
      .getByText("Philippines");

    // Passenger Details
    this.firstNameInput = page.locator("[formcontrolname='firstname']");
    this.middleNameInput = page.locator("[formcontrolname='mi']");
    this.lastNameInput = page.locator("[formcontrolname='lastname']");
    this.genderInput = page.locator("[formcontrolname='gender']");
    this.birthDateInput = page.locator("[formcontrolname='birthdate']");
    this.typeInput = page.locator("[formcontrolname='discountType']");
    this.nationalityInput = page.locator("[formcontrolname='nationality']");
    this.discountInput = page.locator("[formcontrolname='pricing']");

    this.continueButton = page.locator("a").filter({ hasText: "Continue" });
  }

  async fillContactInformation({
    contactPerson,
    mobileNumber,
    emailAddress,
    address,
  }: {
    contactPerson: string;
    mobileNumber: string;
    emailAddress: string;
    address: string;
  }) {
    await this.contactPersonInput.fill(contactPerson);
    await this.mobileNumberInput.fill(mobileNumber);
    await this.emailAddressInput.fill(emailAddress);
    await this.confirmEmailAddressInput.fill(emailAddress);
    await this.addressInput.fill(address);
    await this.flagDropdown.click();
    await this.flagDropdownOption.click();
  }

  async fillPassengersDetails({
    firstName,
    middleName,
    lastName,
    gender,
    birthDate,
    nationality,
    type,
    discount,
  }: {
    firstName: string;
    middleName: string;
    lastName: string;
    gender: string;
    birthDate: string;
    nationality: string;
    type: string;
    discount: string;
  }) {
    await this.firstNameInput.fill(firstName);
    await this.middleNameInput.fill(middleName);
    await this.lastNameInput.fill(lastName);
    await this.genderInput.selectOption({ label: gender });
    await this.birthDateInput.fill(birthDate);
    await this.typeInput.selectOption({ label: type });
    await this.nationalityInput.selectOption({ label: nationality });
    await this.discountInput.selectOption({ label: discount });

    await this.continueButton.click();
  }
}
