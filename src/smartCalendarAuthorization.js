// 4/NAFZ51mIEnqApWpwaL9-Hdo5kf42A2nW2FBA5ZAO3KHkzq1nAsDCyls
// 4/NAF-PRx1PpMtFamKmEuLcKiH__J0jNtI7URBurvmgYtVAR9umS0hRDg
// https://accounts.google.com/o/oauth2/v2/auth?access_type=offline&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fcalendar&response_type=code&client_id=346860590561-gp3lf3l1hp6c3hf4ld9kdlffr3m1kf16.apps.googleusercontent.com&redirect_uri=urn%3Aietf%3Awg%3Aoauth%3A2.0%3Aoob
import { google } from "googleapis/build/src/index";
import fs from 'fs';
import readline from 'readline';

export { getGoogleCalOAuth2 };
const _SCOPES = ['https://www.googleapis.com/auth/calendar'];
const _CREDENTIAL_FILE = 'smart-calendar-credentials.json'
const _TOKEN_FILE = 'smart-calendar-token.json';


async function getGoogleCalOAuth2(credentialFile = _CREDENTIAL_FILE, tokenFile = _TOKEN_FILE) {
    const unparsedCredentials = fs.readFileSync(credentialFile);
    const credentials = JSON.parse(unparsedCredentials);
    const { client_secret, client_id, redirect_uris } = credentials.installed;
    const oAuth2Client = new google.auth.OAuth2(
        client_id, client_secret, redirect_uris[0]);
    const tokenData = await _getGoogleCalTokenData(oAuth2Client, tokenFile);
    oAuth2Client.setCredentials(JSON.parse(tokenData));
    window.token1 = await oAuth2Client.getAccessToken();
    window.token2 = window.token1.token;
    // console.log("token 2", window.token2);
    return oAuth2Client;
}

async function _getGoogleCalTokenDataFirstTime(oAuth2Client,tokenFile) {
    const code = await _getGoogleCalCodeFromUser(oAuth2Client);
    return new Promise(function (resolve, reject) {
        oAuth2Client.getToken(code, (err, tokenData) => {
            if (err) {
                console.error('Error retrieving access token', err);
                reject('Error retrieving access token ' + err);
            } else {
                // oAuth2Client.setCredentials(tokenData);
                // Store the token to disk for later program executions
                fs.writeFileSync(tokenFile, JSON.stringify(tokenData));
                console.log('Token stored to ', tokenFile);
                resolve(JSON.stringify(tokenData));
            };
        });
    });
}

function _getGoogleCalCodeFromUser(oAuth2Client) {
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
};

async function _getGoogleCalTokenData(oAuth2Client, tokenFile) {
    let token = "";
    try {
        console.log("A ",tokenFile)
        token = fs.readFileSync(tokenFile)
        console.log("B");
    } catch (e) {
        console.log("C");
        token = await _getGoogleCalTokenDataFirstTime(oAuth2Client,tokenFile);
        console.log("D");
    }
    return token;
}


