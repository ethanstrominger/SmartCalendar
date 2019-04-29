import {
  getAccessTokenString,
  GOOGLE_SCOPE_BASE_URL
} from "./smartCalendarAuthorization";

let prefix = process.argv[2];
let authorization = process.argv[3];
let url = GOOGLE_SCOPE_BASE_URL;
if (!authorization.startsWith("--")) {
  url = url + "." + authorization;
}
// creaate token file if not exists
let token = getAccessTokenString(prefix, url);
