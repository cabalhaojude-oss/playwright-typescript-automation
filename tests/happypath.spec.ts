import { test, expect } from "@playwright/test";
import { HomePage } from "../pages/home.page";
import { SearchPage } from "../pages/search.page";
import { getNextDayString } from "../utils/helpers";
import { SchedulesPage } from "../pages/schedules.page";
import { PassengerPage } from "../pages/passenger.page";

test("can book one way", async ({ page }) => {
  await page.goto("https://www.barkota.com/");
  const homePage = new HomePage(page);
  await homePage.bookNow();

  // Search
  await expect(page).toHaveURL("https://booking.barkota.com/search");

  const searchPage = new SearchPage(page);
  await searchPage.searchSchedule({
    roundTrip: false,
    origin: "Ormoc",
    destination: "Cebu",
    departureDate: getNextDayString(1),
  });

  // Schedule
  await expect(page).toHaveURL("https://booking.barkota.com/schedules");

  const schedulesPage = new SchedulesPage(page);
  await schedulesPage.continueWithPreSelected();

  // Passenger
  await expect(page).toHaveURL("https://booking.barkota.com/passenger");

  const passengerPage = new PassengerPage(page);
  await passengerPage.fillContactInformation({
    contactPerson: "Test Test",
    mobileNumber: "9123654789",
    emailAddress: "test@test.test",
    address: "Test",
  });
  await passengerPage.fillPassengersDetails({
    firstName: "Test",
    middleName: "T",
    lastName: "Test",
    gender: "Male",
    birthDate: "03-07-1999",
    nationality: "Filipino",
    type: "Adult",
    discount: "NONE",
  });

  await page.waitForTimeout(10000);

  // Payment
  await expect(page).toHaveURL("https://booking.barkota.com/payment");
});

test("can book round trip", async ({ page }) => {
  await page.goto("https://www.barkota.com/");
  const homePage = new HomePage(page);
  await homePage.bookNow();

  // Search
  await expect(page).toHaveURL("https://booking.barkota.com/search");

  const searchPage = new SearchPage(page);
  await searchPage.searchSchedule({
    roundTrip: true,
    origin: "Ormoc",
    destination: "Cebu",
    departureDate: getNextDayString(1),
    returnDate: getNextDayString(2),
  });

  // Schedule
  await expect(page).toHaveURL("https://booking.barkota.com/schedules");

  const schedulesPage = new SchedulesPage(page);
  await schedulesPage.continueWithPreSelected();

  // Passenger
  await expect(page).toHaveURL("https://booking.barkota.com/passenger");

  const passengerPage = new PassengerPage(page);
  await passengerPage.fillContactInformation({
    contactPerson: "Test Test",
    mobileNumber: "9123654789",
    emailAddress: "test@test.test",
    address: "Test",
  });
  await passengerPage.fillPassengersDetails({
    firstName: "Test",
    middleName: "T",
    lastName: "Test",
    gender: "Male",
    birthDate: "03-07-1999",
    nationality: "Filipino",
    type: "Adult",
    discount: "NONE",
  });

  // Payment
  await expect(page).toHaveURL("https://booking.barkota.com/payment");
});
