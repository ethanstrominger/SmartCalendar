import { getICalEvents } from "./smartCalendarTransactions";
export { consoleLogICSEvents };
function consoleLogICSEvents(iCalFile) {
  let events = getICalEvents(iCalFile);
  console.table(events);
}
