import { getICS } from '../smartCalendarUtils';
import fs from 'fs';
import ICAL from 'ical.js';


const BASIC_ICS_FILE = "src/test/data/basic.ics";


test("test data is legitimate ics", () => {
    const iCalData = fs.readFileSync(BASIC_ICS_FILE);
    const iCalDataString = iCalData.toString()
    const startsWithVCalendar = iCalDataString.startsWith("BEGIN:VCALENDAR")
    expect(startsWithVCalendar).toBeTruthy();
});

test("convert ICS buffer to JSON", () => {
    const iCalData = fs.readFileSync(BASIC_ICS_FILE).toString();
    const iCalJSON = ICAL.parse(iCalData);
    console.log(iCalJSON);
});

