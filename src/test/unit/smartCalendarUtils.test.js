import {
  isBrowser,
  isCommandLine,
  isTestingWithJest
} from "../../smartCalendarUtils";

test("Mode function", () => {
  expect(isBrowser()).toEqual(true);
  expect(isCommandLine()).toEqual(false);
  expect(isTestingWithJest()).toEqual(true);
});
