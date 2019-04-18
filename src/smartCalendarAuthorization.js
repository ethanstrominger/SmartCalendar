import { google } from "googleapis/build/src/index";
import fs from 'fs';

export { getOAuth2ClientFromCredentials };
const _SCOPES = ['https://www.googleapis.com/auth/calendar'];
const _CREDENTIAL_FILE = 'smart-calendar-credentials.json'
const _TOKEN_FILE = 'smart-calendar-token.json';


async function getOAuth2ClientFromCredentials() {
    const unparsedCredentials = fs.readFileSync(_CREDENTIAL_FILE);
    const credentials = JSON.parse(unparsedCredentials);
    const { client_secret, client_id, redirect_uris } = credentials.installed;
    const oAuth2Client = new google.auth.OAuth2(
        client_id, client_secret, redirect_uris[0]);
    const token = await _getTokenAndCreateTokenFileAndStoreTokenIfApplicable(oAuth2Client);
    oAuth2Client.setCredentials(JSON.parse(token));
    return oAuth2Client;
}

async function _getTokenAndCreateTokenFile(oAuth2Client) {
    console.log("gocfc 1");
    const code = await _getCodeFromUserUsingGeneratedUrl(oAuth2Client);
    return new Promise(function (resolve, reject) {
        oAuth2Client.getToken(code, (err, token) => {
            if (err)
                return console.error('Error retrieving access token', err);
            oAuth2Client.setCredentials(token);
            // Store the token to disk for later program executions
            fs.writeFile(_TOKEN_FILE, JSON.stringify(token), (err) => {
                if (err)
                    console.error(err);
                console.log('Token stored to', _TOKEN_FILE);
            });
            resolve(JSON.stringify(token));
        });
    });
}

function _getCodeFromUserUsingGeneratedUrl(oAuth2Client) {
    return new Promise(function (resolve, reject) {
        const authUrl = oAuth2Client.generateAuthUrl({
            access_type: 'offline',
            scope: _SCOPES,
        });
        console.log('Authorize this app by visiting this url:', authUrl);
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
        });
        rl.question('Enter the code from that page here: ', (code) => {
            rl.close();
            resolve(code);
        });
    });
}

async function _getTokenAndCreateTokenFileAndStoreTokenIfApplicable(oAuth2Client) {
    let token = "";
    try {
        token = fs.readFileSync(_TOKEN_FILE)
    } catch (e) {
        token = await _getTokenAndCreateTokenFile(oAuth2Client);
    }
    return token;
}


