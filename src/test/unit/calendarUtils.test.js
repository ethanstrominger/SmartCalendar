import fs from 'fs';
import { getICalEvents, consoleLogMode, getCallingMode, isBrowser, isCommandLine, isTestingWithJest } from '../../smartCalendarUtils';


const BASIC_ICS_FILE = "src/test/data/basic.ics";

test("Convert iCalData to an array of events", () => {
    const iCalData = fs.readFileSync(BASIC_ICS_FILE).toString();
    const vevents = getICalEvents(iCalData);
    const firstEvent = vevents[0];
    const expectedAttributes = ["uid","name","starttime","endtime","description"];
    var attribute;
    var isAttributeValid;
    for (var i=0; i < expectedAttributes.length; i++) {
        attribute = expectedAttributes[i].toString();
        isAttributeValid = firstEvent.hasOwnProperty(attribute);
        expect([attribute,isAttributeValid]).toEqual([attribute,true]);
    } 
});

test("Mode function",() => {
    expect(isBrowser()).toEqual(true);
    expect(isCommandLine()).toEqual(false);
    expect(isTestingWithJest()).toEqual(true);
});


