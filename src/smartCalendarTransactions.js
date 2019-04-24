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

import { getGoogleCalOAuth2 } from './smartCalendarAuthorization';
export { getEventsFromCalendar, getEvents2 }
const { google } = require('googleapis');

async function getEvents2(calendarId) {
    const oAuth2 = await getGoogleCalOAuth2();
    const Http = new XMLHttpRequest();
    const url = 'https://www.googleapis.com/calendar/v3/calendars/' + calendarId + '/events';
    console.log("A");
    Http.open("GET", url);
    Http.setRequestHeader('Authorization', 'Bearer ' + window.token2);
    console.log("b", window.token2);
    const j = Http.send();
    console.log("c");
    return new Promise((resolve, reject) => {
        Http.onreadystatechange = (e) => {
            console.log(Http.responseText);
            resolve(Http.responseText);
        };
        console.log("d");
    });
}

async function getEventsFromCalendar(calendarId) {
    const oAuth2 = await getGoogleCalOAuth2();
    const events = await _getEventsFromAuth(oAuth2, calendarId);
    // console.log(events);
    return events;
}

async function _getEventsFromAuth(auth, calendarId) {
    const calendarAuth = google.calendar({ version: 'v3', auth });
    const events = await _getEventsFromCalendarAuth(calendarAuth, calendarId);
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



