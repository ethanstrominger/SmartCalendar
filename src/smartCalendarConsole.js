import { getICalEvents, getEvents } from "./smartCalendarTransactions";
export { consoleLogICSEvents, consoleLogCalDavEvents };
function consoleLogICSEvents(iCalFile) {
  let events = getICalEvents(iCalFile);
  console.table(events);
}

function consoleLogCalDavEvents(calendarId, prefix) {
  let events = getEvents(calendarId, prefix);
  console.table(events);
}
