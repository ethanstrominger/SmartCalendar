import {
  consoleLogICSEvents,
  consoleLogCalDavEventsByName
} from "../../smartCalendarConsole";
import { BASIC_ICS_FILE } from "./smartCalendarTransactionGlobals";
consoleLogICSEvents(BASIC_ICS_FILE);
consoleLogCalDavEventsByName(
  "Sample Public Calendar",
  "smartcalendar-publiccal-readonly"
);
