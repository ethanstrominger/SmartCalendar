// TODO Add checks for errors in code and test for all async function
// TODO Remove duplicate code, create function to check valid events (const expectedAttributes = ["uid","name","starttime","endtime","description"];)

import { getOAuth2ClientFromCredentials } from '../../smartCalendarAuthorization';
import { getEventsFromCalendar } from '../../smartCalendarTransactions';

test("Get Event List ", signalEndOfTest => {
    async function testGetEventList() {
        const events = await getEventsFromCalendar("primary");
        expect(events).toBeDefined();
        expect(events.length).toBeGreaterThan(0);
        const firstEvent = events[0];
        const expectedAttributes = ["id", "summary", "start", "end", "description"];
        var attribute;
        var isAttributeValid;
        for (var i = 0; i < expectedAttributes.length; i++) {
            attribute = expectedAttributes[i].toString();
            console.log(attribute);
            isAttributeValid = firstEvent.hasOwnProperty(attribute);
            expect([attribute, isAttributeValid]).toEqual([attribute, true]);
            signalEndOfTest();
        }
    }
    testGetEventList();
});


// TODO Complete
test("Add event", function () {
    function insertEvent({ calendarUid, name, begintime, endtime }) {
        console.log("Inserting",calendarUid,name,begintime,endtime);
    }
    insertEvent(
        {
            calendarUid: "calendarid",
            name: "First event",
            begintime: "2017-01-12T10:00:03",
            endtime: "2017-01-12T10:12:03"
        }
    );
});
