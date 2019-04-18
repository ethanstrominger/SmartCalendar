// Learning TODOs
// TODO Learn how to get caldav to work
// TODO Learn how to print out order of lines executed - or add statements to print this out
// TODO Learn how to debug from command line
// TODO Figure out why babel-node does not work, expects 7.0 and I cant install
// TODO Why does unterminated literal red squiggly appear in random place?

import ICAL from 'ical.js';
import moment from 'moment';
// If modifying these scopes, delete token.json.
export { getICalEvents, consoleLogFormatEvents };

function getICalEvents(iCalData) {
    var jcal = ICAL.parse(iCalData);
    var vcal = new ICAL.Component(jcal);
    var vevents = vcal.getAllSubcomponents("vevent");
    return vevents.map(_getICalEventAtrributes);
};

function consoleLogFormatEvents(events) {
    if (events.length) {
        console.log('Upcoming 10 events:');
        events.map((event, i) => {
            const start = event.start.dateTime || event.start.date;
            console.log(`${start} - ${event.summary}`);
        });
    } else {
        console.log('No upcoming events found.');
    }
}

function _getICalEventAtrributes(vevent) {
    var element = {
        uid: vevent.getFirstPropertyValue("uid"),
        name: vevent.getFirstPropertyValue("summary"),
        starttime: moment(vevent.getFirstPropertyValue("dtstart")).format(),
        endtime: moment(vevent.getFirstPropertyValue("dtend")).format(),
        description: vevent.getFirstPropertyValue("description")
    };
    return element;
};

