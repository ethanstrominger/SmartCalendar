import { getAccessTokenString } from "./smartCalendarAuthorization"

let prefix = process.argv[2];
let token = getAccessTokenString(prefix);
