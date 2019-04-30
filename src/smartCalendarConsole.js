import {
  getICalEvents,
  getCalDavEventsByName
} from "./smartCalendarTransactions";
export { consoleLogICSEvents, consoleLogCalDavEventsByName };
function consoleLogICSEvents(iCalFile) {
  let events = getICalEvents(iCalFile);
  console.table(events);
}

async function consoleLogCalDavEventsByName(calendarName, prefix) {
  let events = await getCalDavEventsByName(calendarName, prefix);
  console.table(events);
}
