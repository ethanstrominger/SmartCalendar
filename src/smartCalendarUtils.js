// Learning TODOs
// TODO Learn how to print out order of lines executed - or add statements to print this out
// TODO Learn how to debug from command line

import ICAL from 'ical.js';
import moment from 'moment';
// If modifying these scopes, delete token.json.
export { getICalEvents, consoleLogFormatEvents, isBrowser, isTestingWithJest, isCommandLine, getCallingMode };

function getCallingMode()
{
    console.log("Xyz");
    console.log("Browser",isBrowser(),"command",isCommandLine(),"jest",isTestingWithJest());
    let browseMode = "";
    if (isBrowser()) {
        browseMode = "TRUE";
    } else {
        browseMode = "FALSE";
    }
    // console.log("What is going on");
    console.log("isbrowser",isBrowser());
    console.log("Browser",browseMode);

    return true;
}

// TODO Refactor?  Would making detectFunction an actual function work?
// TODO See 
function isBrowser() {
    const detectFunction=new Function("try {return this===window;}catch(e){ return false;}");
    return detectFunction();
}

function isCommandLine() {
    var detectFunction=new Function("try {return this===global;}catch(e){return false;}");
    return detectFunction();
}

function isTestingWithJest() {
    return process.env.JEST_WORKER_ID !== undefined;
}

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

