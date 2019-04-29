import { getAccessTokenString } from "../../smartCalendarAuthorization";
test("Get Credentials default", signalEndOfTest => {
  async function testGetCredentials() {
    const accessTokenString = await getAccessTokenString();
    expect(accessTokenString).toBeDefined();
    signalEndOfTest();
  }
  testGetCredentials();
});

test("Get Credentials specify file prefix", signalEndOfTest => {
  async function testGetCredentials() {
    const accessTokenString = await getAccessTokenString(
      "smart-calendar-enduser"
    );
    expect(accessTokenString).toBeDefined();
    signalEndOfTest();
  }
  testGetCredentials();
});
