import {
  consoleLogICSEvents,
  consoleLogCalDavEvents
} from "../../smartCalendarConsole";
import { BASIC_ICS_FILE } from "./smartCalendarTransactionGlobals";
consoleLogICSEvents(BASIC_ICS_FILE);
consoleLogCalDavEvents("primary", "smartcalendar-publiccal-readonly");
