// TODO Add checks for errors in code and test for all async function
// TODO Add parameter for calendar id
// TODO Add javascript docs
// TODO Add tracing/debugging based on environmental parameter
// TODO Add linting
// TODO Consider typeScript?
// TODO Add location
// TODO Add tests with and without description
// TODO Try repeating events
// TODO Try all day meetings
// TODO See if _getEventsFromCalendarAuth and _getEventsFromAuth can be combined 
// TODO Why does unterminated literal red squiggly appear in random place?

import { getOAuth2ClientFromCredentials } from './smartCalendarAuthorization';
export { getEventsFromCalendar }
const { google } = require('googleapis');

async function getEventsFromCalendar (calendarId) {
    // Issue
    const oAuth2 = await getOAuth2ClientFromCredentials();
    console.log("gefc 2");
    // const calendarAuth = google.calendar({ version: 'v3', auth });
    const events = await _getEventsFromAuth(oAuth2,calendarId);
    return events;
}

async function _getEventsFromAuth(auth, calendarId) {
    const calendarAuth = google.calendar({ version: 'v3', auth });
    const events = await _getEventsFromCalendarAuth(calendarAuth,calendarId);
    return events;
}

async function _getEventsFromCalendarAuth(calendarAuth, calendarId) {
    return new Promise((resolve, reject) => {

        let dateRequest = {
            calendarId: calendarId,
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



