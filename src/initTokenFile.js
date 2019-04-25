import { getAccessTokenString } from "./smartCalendarAuthorization"
let credentialFile = "../smart-calendar-enduser-credentials.json";
let tokenFile = "../smart-calendar-enduser-token.json";
let token = getAccessTokenString(credentialFile, tokenFile);