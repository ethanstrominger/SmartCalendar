
const fs = require('fs');
const readline = require('readline');
const { google } = require('googleapis');

// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/calendar'];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_FILE = 'token.json';

/**
 * Create an OAuth2 client using credentials.json
 * Create token.json if necessary
 */
async function getOAuth2ClientFromCredentials() {
    const unparsedCredentials = fs.readFileSync('credentials.json');
    const credentials = JSON.parse(unparsedCredentials);
    const { client_secret, client_id, redirect_uris } = credentials.installed;
    const oAuth2Client = new google.auth.OAuth2(
        client_id, client_secret, redirect_uris[0]);
    const token = await getTokenAndCreateTokenFileAndStoreTokenIfApplicable(oAuth2Client);
    oAuth2Client.setCredentials(JSON.parse(token));
    return oAuth2Client;
}
export default getOAuth2ClientFromCredentials;

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

/**
 * Lists the next 10 events on the user's primary calendar.
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */
function listEvents(auth) {
    const calendar = google.calendar({ version: 'v3', auth });
    calendar.events.list({
        calendarId: 'primary',
        timeMin: (new Date()).toISOString(),
        maxResults: 10,
        singleEvents: true,
        orderBy: 'startTime',
    }, (err, res) => {
        if (err) return console.log('The API returned an error: ' + err);
        const events = res.data.items;
        if (events.length) {
            console.log('Upcoming 10 events:');
            events.map((event, i) => {
                const start = event.start.dateTime || event.start.date;
                console.log(`${start} - ${event.summary}`);
            });
        } else {
            console.log('No upcoming events found.');
        }
    });
}