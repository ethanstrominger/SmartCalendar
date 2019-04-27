// TODO Add checks for errors in code and test for all async function
// TODO Remove duplicate code, create function to check valid events (const expectedAttributes = ["uid","name","starttime","endtime","description"];)

import fs from "fs";
import {
  getEvents,
  getGoogleGetEventURL
} from "../../smartCalendarTransactions";
import { getICalEvents } from "../../smartCalendarTransactions";
const BASIC_ICS_FILE = "src/test/data/basic.ics";

test("Get Events List Using http", signalEndOfTest => {
  async function testGetEventListUsingHttp() {
    const events = await getEvents("primary", getGoogleGetEventURL());
    expect(events).toBeDefined();
    signalEndOfTest();
  }
  testGetEventListUsingHttp();
});

test("Convert iCalData to an array of events", () => {
  const iCalData = fs.readFileSync(BASIC_ICS_FILE).toString();
  const vevents = getICalEvents(iCalData);
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

// test("Get Event List ", signalEndOfTest => {
//     async function testGetEventList() {
//         const events = await getEventsFromCalendar("primary");
//         expect(events).toBeDefined();
//         expect(events.length).toBeGreaterThan(0);
//         const firstEvent = events[0];
//         const expectedAttributes = ["id", "summary", "start", "end", "description"];
//         var attribute;
//         var isAttributeValid;
//         for (var i = 0; i < expectedAttributes.length; i++) {
//             attribute = expectedAttributes[i].toString();
//             console.log(attribute);
//             isAttributeValid = firstEvent.hasOwnProperty(attribute);
//             expect([attribute, isAttributeValid]).toEqual([attribute, true]);
//             signalEndOfTest();
//         }
//     }
//     testGetEventList();
// });
