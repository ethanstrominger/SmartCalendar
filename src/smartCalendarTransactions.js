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

import { XMLHttpRequest } from "xmlhttprequest";
import { google } from "googleApis";

import moment from "moment";
import fs from "fs";
import ICAL from "ical.js";
import {
  getAccessTokenString,
  getGoogleCalOAuth2
} from "./smartCalendarAuthorization";
// import { start } from "repl";
export {
  getCalDavEventsById,
  getGoogleGetEventURL,
  getICalEvents,
  getCalDavIdByName,
  getCalDavEventsByName
};
const _CALENDARID_STR = "$calendarId";
const _GOOGLE_GET_EVENT_URL =
  "https://www.googleapis.com/calendar/v3/calendars/$calendarId/events";

function getGoogleGetEventURL(calendarId) {
  let url = _GOOGLE_GET_EVENT_URL.replace(_CALENDARID_STR, calendarId);
  return url;
}

function _getCalDavEventAttribute(vevent) {
  var element = {
    uid: vevent.iCalUID,
    name: vevent.summary,
    starttime: vevent.start.datetime,
    endtime: vevent.end.datetime,
    //   vevent.getFirstPropertyValue("dtstart").toString()
    // ).format(),
    // endtime: moment(vevent.getFirstPropertyValue("dtend").toString()).format(),
    description: vevent.description,
    location: vevent.location
  };
  return element;
}

async function getCalDavIdByName(calendarName, prefix) {
  const oauth2Client = await getGoogleCalOAuth2(prefix);
  var calendar = await google.calendar("v3");
  return new Promise((resolve, reject) => {
    calendar.calendarList.list({ auth: oauth2Client }, function(err, resp) {
      var found = resp.data.items.some(function(cal) {
        if (cal.summary == calendarName) {
          resolve(cal.id);
          return true;
        }
        // return false;
      });
      if (!found) {
        reject("No such calendar " + calendarName);
      }
    });
  });
}

async function getCalDavEventsByName(calendarName, prefix) {
  const calendarId = getCalDavIdByName(calendarName, prefix);
  return getCalDavEventsById(calendarId, prefix);
}

async function getCalDavEventsById(calendarId, prefix) {
  const accessTokenString = await getAccessTokenString(prefix);
  const Http = new XMLHttpRequest();
  Http.open("GET", getGoogleGetEventURL(calendarId));
  Http.setRequestHeader("Authorization", "Bearer " + accessTokenString);
  const j = await Http.send();
  return new Promise((resolve, reject) => {
    Http.onload = e => {
      const mapFunction = _getCalDavEventAttribute;
      const veventsJson = JSON.parse(Http.responseText)["items"];
      const vevents = veventsJson.map(mapFunction);
      resolve(vevents);
    };
  });
}

function getICalEvents(iCalFile) {
  var vevents = _getICALSubcomponents(iCalFile);
  // console.log(vevents);
  return vevents.map(_getICalEventAtrributes);
}

function _getICALSubcomponents(iCalFile) {
  const iCalData = fs.readFileSync(iCalFile).toString();
  var jcal = ICAL.parse(iCalData);
  var vcal = new ICAL.Component(jcal);
  var vevents = vcal.getAllSubcomponents("vevent");

  return vevents;
}

function _getICalEventAtrributes(vevent) {
  var element = {
    uid: vevent.getFirstPropertyValue("uid"),
    name: vevent.getFirstPropertyValue("summary"),
    starttime: moment(
      vevent.getFirstPropertyValue("dtstart").toString()
    ).format(),
    endtime: moment(vevent.getFirstPropertyValue("dtend").toString()).format(),
    description: vevent.getFirstPropertyValue("description"),
    location: vevent.getFirstPropertyValue("location")
  };
  return element;
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
