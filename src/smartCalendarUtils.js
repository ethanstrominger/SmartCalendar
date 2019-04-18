import ICAL from 'ical.js';
import moment from 'moment';
import fs from 'fs';
import readline from 'readline';
import { google } from 'googleapis';

// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/calendar'];

const CREDENTIAL_FILE ='smart-calendar-credentials.json'
const TOKEN_FILE = 'smart-calendar-token.json';

function getICalEvents(iCalData) {
    var jcal = ICAL.parse(iCalData);
    var vcal = new ICAL.Component(jcal);
    var vevents = vcal.getAllSubcomponents("vevent");
    return vevents.map(getICalEventAtrributes);
};

function getICalEventAtrributes(vevent) {
    var element = {
        uid: vevent.getFirstPropertyValue("uid"),
        name: vevent.getFirstPropertyValue("summary"),
        starttime: moment(vevent.getFirstPropertyValue("dtstart")).format(),
        endtime: moment(vevent.getFirstPropertyValue("dtend")).format(),
        description: vevent.getFirstPropertyValue("description")
    };
    return element;
};

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

async function getOAuth2ClientFromCredentials() {
    const unparsedCredentials = fs.readFileSync(CREDENTIAL_FILE);
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
    console.log("gocfc 1");
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

export {getICalEvents,getOAuth2ClientFromCredentials};