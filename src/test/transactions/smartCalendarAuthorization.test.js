import { getOAuth2ClientFromCredentials } from '../../smartCalendarAuthorization';
test("Get Credentials", signalEndOfTest => {
    async function testGetCredentials() {
        const oAuth2 = await getOAuth2ClientFromCredentials();
        expect(oAuth2).toBeDefined();
        signalEndOfTest();
    }
    testGetCredentials();
});