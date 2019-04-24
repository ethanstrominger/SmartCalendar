import { getGoogleCalOAuth2 } from '../../smartCalendarAuthorization';
test("Get Credentials", signalEndOfTest => {
    async function testGetCredentials() {
        const oAuth2 = await getGoogleCalOAuth2();
        expect(oAuth2).toBeDefined();
        signalEndOfTest();
    }
    console.log("1");
    testGetCredentials();
});

test("Get Credentials2", signalEndOfTest => {
    async function testGetCredentials() {
        console.log("2");
        const oAuth2 = await getGoogleCalOAuth2(
            "smart-calendar-enduser-credentials.json",
            "smart-calendar-enduser-token.json"
            );
        console.log("3");
        expect(oAuth2).toBeDefined();
        signalEndOfTest();
    }
    testGetCredentials();
});