// TODO Add checks for errors in code and test for all async function
// TODO Remove duplicate code, create function to check valid events (const expectedAttributes = ["uid","name","starttime","endtime","description"];)

import {
  getEvents,
  getGoogleGetEventURL,
  getICalEvents
} from "../../smartCalendarTransactions";
import { BASIC_ICS_FILE } from "./smartCalendarTransactionGlobals";
test("Get Events List Using http", signalEndOfTest => {
  async function testGetEventListUsingHttp() {
    const events = await getEvents("primary", getGoogleGetEventURL());
    expect(events).toBeDefined();
    signalEndOfTest();
  }
  testGetEventListUsingHttp();
});

test("Convert iCalData to an array of events", () => {
  const vevents = getICalEvents(BASIC_ICS_FILE);
  const firstEvent = vevents[0];
  const expectedAttributes = [
    "uid",
    "name",
    "starttime",
    "endtime",
    "description"
  ];
  var attribute;
  var isAttributeValid;
  for (var i = 0; i < expectedAttributes.length; i++) {
    attribute = expectedAttributes[i].toString();
    isAttributeValid = firstEvent.hasOwnProperty(attribute);
    expect([attribute, isAttributeValid]).toEqual([attribute, true]);
  }
});

// TODO Complete
test("Add event", function() {
  function insertEvent({ calendarUid, name, begintime, endtime }) {
    console.log("Inserting", calendarUid, name, begintime, endtime);
  }
  insertEvent({
    calendarUid: "calendarid",
    name: "First event",
    begintime: "2017-01-12T10:00:03",
    endtime: "2017-01-12T10:12:03"
  });
});
