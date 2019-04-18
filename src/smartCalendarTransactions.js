// TODO Add checks for errors in code and test for all async function
// TODO Add parameter for calendar id
// TODO Add javascript docs
// TODO Add tracing/debugging based on environmental parameter
// TODO Add linting
// TODO Consider typeScript?
// TODO Create function that takes only calendarID, don't expose authorization
// TODO Move consoleLogEvents to smartCalendarUtils
// TODO Create separate file for authorization code
// TODO Oganize tests by file

// Learning TODOs
// TODO Learn how to get caldav to work
// TODO Learn how to print out order of lines executed - or add statements to print this out
// TODO Learn how to debug from command line
// TODO Figure out why babel-node does not work, expects 7.0 and I can't install

const { google } = require('googleapis');
export { consoleLogEvents, getEventsFromCalendarAuth, getEventsFromAuth }

async function getEventsFromCalendarAuth(calendarAuth) {
    return new Promise((resolve, reject) => {

        let dateRequest = {
            calendarId: 'primary',
            timeMin: (new Date()).toISOString(),
            maxResults: 10,
            singleEvents: true,
            orderBy: 'startTime',
        };

        calendarAuth.events.list(dateRequest, (err, res) => {
            if (err) {
                console.log("Error ===>", err, "<====")
                reject(err);
            } else {
                resolve(res.data.items);
            }
        });
    });
}

async function getEventsFromAuth(auth) {
    const calendar = google.calendar({ version: 'v3', auth });
    const events = await getEventsFromCalendarAuth(calendar);
    return events;
}

async function consoleLogEvents(auth) {
    const calendar = google.calendar({ version: 'v3', auth });
    const events = await getEventsFromCalendarAuth(calendar);
    consoleLogFormatEvents(events);
}


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

