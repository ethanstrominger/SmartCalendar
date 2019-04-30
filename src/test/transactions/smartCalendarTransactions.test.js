// TODO Add checks for errors in code and test for all async function
// TODO Remove duplicate code, create function to check valid events (const expectedAttributes = ["uid","name","starttime","endtime","description"];)

import {
  getCalDavEventsById,
  getGoogleGetEventURL,
  getICalEvents,
  getCalDavIdByName
} from "../../smartCalendarTransactions";
import { BASIC_ICS_FILE } from "./smartCalendarTransactionGlobals";

function verifyValidEvent(vevent) {
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
    isAttributeValid = vevent.hasOwnProperty(attribute);
    expect([attribute, isAttributeValid]).toEqual([attribute, true]);
  }
}

test("Get Event ID by name", signalEndOfTest => {
  async function testGetEventIdByName() {
    const id = await getCalDavIdByName(
      "Sample Public Calendar",
      "smartcalendar-publiccal-readonly"
    );
    expect(id).toBeDefined();
    signalEndOfTest();
  }
  testGetEventIdByName();
});

test("Get Event ID by name not found", signalEndOfTest => {
  async function testGetEventIdByName() {
    let errored = false;
    const id = await getCalDavIdByName(
      "xxxxxxx",
      "smartcalendar-publiccal-readonly"
    )
      .then(result => {
        errored = false;
      })
      .catch(e => {
        errored = true;
      });
    expect(errored).toBeTruthy();
    signalEndOfTest();
  }
  testGetEventIdByName();
});

test("Get Events List Using http", signalEndOfTest => {
  async function testGetEventListUsingHttp() {
    const events = await getCalDavEventsById(
      "primary",
      "smartcalendar-publiccal-readonly"
    );
    expect(events).toBeDefined();
    verifyValidEvent(events[0]);
    signalEndOfTest();
  }
  testGetEventListUsingHttp();
});

test("Convert iCalData to an array of events", () => {
  const vevents = getICalEvents(BASIC_ICS_FILE);
  verifyValidEvent(vevents[0]);
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
