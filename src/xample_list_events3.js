
const fs = require('fs');
const readline = require('readline');
const { google } = require('googleapis');
const { listEvents } = require('./smartCalendarTransactions');

// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/calendar'];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_FILE = 'smart-calendar-token.json';

main();

async function main() {
    let oAuth2Client = await getOAuth2ClientFromCredentials();
    listEvents(oAuth2Client);
}

/**
 * Create an OAuth2 client using credentials.json
 * Create token.json if necessary
 */
async function getOAuth2ClientFromCredentials() {
    const unparsedCredentials = fs.readFileSync('smart-calendar-credentials.json');
    const credentials = JSON.parse(unparsedCredentials);
    const { client_secret, client_id, redirect_uris } = credentials.installed;
    const oAuth2Client = new google.auth.OAuth2(
        client_id, client_secret, redirect_uris[0]);
    const token = await getTokenAndCreateTokenFileAndStoreTokenIfApplicable(oAuth2Client);
    oAuth2Client.setCredentials(JSON.parse(token));
    return oAuth2Client;
}

async function getTokenAndCreateTokenFileAndStoreTokenIfApplicable(oAuth2Client) {
    let token = "";
    try {
        token = fs.readFileSync(TOKEN_FILE)
    } catch (e) {
        token = await getTokenAndCreateTokenFile(oAuth2Client);
    }
    return token;
}


async function getTokenAndCreateTokenFile(oAuth2Client) {
    const code = await getCodeFromUserUsingGeneratedUrl(oAuth2Client);
    return new Promise(function (resolve, reject) {
        oAuth2Client.getToken(code, (err, token) => {
            if (err)
                return console.error('Error retrieving access token', err);
            oAuth2Client.setCredentials(token);
            // Store the token to disk for later program executions
            fs.writeFile(TOKEN_FILE, JSON.stringify(token), (err) => {
                if (err)
                    console.error(err);
                console.log('Token stored to', TOKEN_FILE);
            });
            resolve(JSON.stringify(token));
        });
    });
}

function getCodeFromUserUsingGeneratedUrl(oAuth2Client) {
    return new Promise(function (resolve, reject) {
        const authUrl = oAuth2Client.generateAuthUrl({
            access_type: 'offline',
            scope: SCOPES,
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