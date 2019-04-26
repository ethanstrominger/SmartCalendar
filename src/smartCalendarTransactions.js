// TODO Try setting up new token file
// TODO Investigate if possible to use URL for authorizing token

// Story TODOs backlog
// TODO Add checks for errors in code and test for all async function
// TODO Add javascript docs
// TODO Add tracing/debugging based on environmental parameter
// TODO Add linting
// TODO Consider typeScript?
// TODO Add location
// TODO Add tests with and without description
// TODO Try repeating events
// TODO Try all day meetings

// Expand to other calendars TODOs
// TODO Read from configuration file to determine credential and token files
// TODO Add meetup
// TODO Add facebook
// TODO Add eventBrite
// TODO Figure out if google, meetup, facebook, eventbrite based on credentials

import { getAccessTokenString } from "./smartCalendarAuthorization";
export { getEvents, getGoogleGetEventURL };
const _CALENDARID_STR = "$calendarId";
const _GOOGLE_GET_EVENT_URL =
  "https://www.googleapis.com/calendar/v3/calendars/$calendarId/events";

function getGoogleGetEventURL(calendarId) {
  let url = _GOOGLE_GET_EVENT_URL.replace(_CALENDARID_STR, calendarId);
  return url;
}

async function getEvents(calendarId) {
  const accessTokenString = await getAccessTokenString();
  const Http = new XMLHttpRequest();
  Http.open("GET", getGoogleGetEventURL(calendarId));
  Http.setRequestHeader("Authorization", "Bearer " + accessTokenString);
  const j = await Http.send();
  console.log("A", Http.readyState);
  return new Promise((resolve, reject) => {
    Http.onload = e => {
      console.log(Http.responseText.items);
      resolve(Http.responseText);
    };
  });
}

// async function getEventsFromCalendar(calendarId) {
//     const oAuth2 = await getGoogleCalOAuth2();
//     const events = await _getEventsFromAuth(oAuth2, calendarId);
//     // console.log(events);
//     return events;
// }

// async function _getEventsFromAuth(auth, calendarId) {
//     const calendarAuth = google.calendar({ version: 'v3', auth });
//     const events = await _getEventsFromCalendarAuth(calendarAuth, calendarId);
//     return events;
// }

// async function _getEventsFromCalendarAuth(calendarAuth, calendarId) {
//     return new Promise((resolve, reject) => {

//         let dateRequest = {
//             calendarId: calendarId,
//             timeMin: (new Date()).toISOString(),
//             maxResults: 10,
//             singleEvents: true,
//             orderBy: 'startTime',
//         };

//         calendarAuth.events.list(dateRequest, (err, res) => {
//             if (err) {
//                 console.log("Error ===>", err, "<====")
//                 reject(err);
//             } else {
//                 resolve(res.data.items);
//             }
//         });
//     });
// }
